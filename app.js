/**
 * DealerSim — Car Dealership Simulator
 * Vanilla JS ES Module — no external libraries.
 *
 * NOTE: ES modules require a web server (HTTP/HTTPS).
 * Open via `npx serve .` or GitHub Pages — direct file:// won't work.
 */

import { CAR_CATALOG } from './data/cars.js';

// ============================================================
// DEFAULT STATE
// ============================================================
const DEFAULT_STATE = {
  cash: 25000,
  day: 1,
  reputation: 1.0,
  garage: [],
  garageSlots: 5,
  deliveries: [],
  tradeInOffers: [],
  upgrades: {
    garageLevel: 1,
    marketing: 0,
    inspectionTool: false,
    detailing: false,
    reputationBoosts: 0,
    expressDelivery: false,
  },
  salesHistory: [],
  notifications: [],
};

let state = JSON.parse(JSON.stringify(DEFAULT_STATE));

// ============================================================
// CONSTANTS
// ============================================================
const CONDITIONS = ['A', 'B', 'C', 'D'];
const CONDITION_NAMES  = { A: 'Excellent', B: 'Good', C: 'Fair', D: 'Poor' };
const CONDITION_FACTOR = { A: 1.20, B: 1.00, C: 0.78, D: 0.52 };
const CONDITION_VALUE  = { A: 1.05, B: 0.92, C: 0.75, D: 0.58 };
const TRANSACTION_FEE  = 0.02;

const HIDDEN_ISSUES = [
  { name: 'Engine knock',              cost: 800  },
  { name: 'Transmission slip',         cost: 1200 },
  { name: 'Brake wear',                cost: 400  },
  { name: 'Suspension damage',         cost: 600  },
  { name: 'AC compressor failure',     cost: 500  },
  { name: 'Oil leak',                  cost: 350  },
  { name: 'Rust spots',                cost: 200  },
  { name: 'Electrical issues',         cost: 450  },
  { name: 'Coolant leak',              cost: 300  },
  { name: 'Timing belt due',           cost: 700  },
  { name: 'Power steering leak',       cost: 380  },
  { name: 'Catalytic converter issue', cost: 950  },
];

const UPGRADES_CONFIG = [
  {
    id: 'garage2', name: 'Garage Tier 2', icon: '🏗️', category: 'Garage', cost: 15000,
    desc: 'Expand to 10 garage slots.',
    requires: u => u.garageLevel === 1,
    apply: s => { s.upgrades.garageLevel = 2; s.garageSlots = 10; },
  },
  {
    id: 'garage3', name: 'Garage Tier 3', icon: '🏢', category: 'Garage', cost: 40000,
    desc: 'Expand to 20 garage slots.',
    requires: u => u.garageLevel === 2,
    apply: s => { s.upgrades.garageLevel = 3; s.garageSlots = 20; },
  },
  {
    id: 'garage4', name: 'Garage Tier 4', icon: '🏭', category: 'Garage', cost: 90000,
    desc: 'Expand to 35 garage slots.',
    requires: u => u.garageLevel === 3,
    apply: s => { s.upgrades.garageLevel = 4; s.garageSlots = 35; },
  },
  {
    id: 'marketing', name: 'Marketing Campaign', icon: '📣', category: 'Marketing', cost: 8000,
    desc: 'Boost daily customer traffic by 20%. Stackable up to 3×.',
    requires: u => u.marketing < 3,
    apply: s => { s.upgrades.marketing++; },
  },
  {
    id: 'inspectionTool', name: 'Inspection Tool', icon: '🔧', category: 'Tools', cost: 5000,
    desc: 'Reduces inspection cost from $300 to $150 and improves accuracy.',
    requires: u => !u.inspectionTool,
    apply: s => { s.upgrades.inspectionTool = true; },
  },
  {
    id: 'detailing', name: 'Detailing Bay', icon: '✨', category: 'Tools', cost: 12000,
    desc: 'Detail cars for $500 each to improve condition by one tier and boost market value by 7%.',
    requires: u => !u.detailing,
    apply: s => { s.upgrades.detailing = true; },
  },
  {
    id: 'reputationBoost', name: 'Reputation Boost', icon: '⭐', category: 'Marketing', cost: 10000,
    desc: 'Permanently multiplies daily sale chance. Stackable up to 3×.',
    requires: u => u.reputationBoosts < 3,
    apply: s => { s.upgrades.reputationBoosts++; s.reputation = Math.min(s.reputation + 0.1, 2.0); },
  },
  {
    id: 'expressDelivery', name: 'Delivery Express', icon: '🚚', category: 'Factory', cost: 7500,
    desc: 'Reduces factory delivery time by 1 day (minimum 1 day).',
    requires: u => !u.expressDelivery,
    apply: s => { s.upgrades.expressDelivery = true; },
  },
];

// ============================================================
// HELPERS
// ============================================================
const randomInt   = (min, max) => Math.floor(Math.random() * (max - min + 1)) + min;
const randomFloat = (min, max) => Math.random() * (max - min) + min;
const clamp       = (v, lo, hi) => Math.max(lo, Math.min(hi, v));
const randomFrom  = arr => arr[Math.floor(Math.random() * arr.length)];
const formatCurrency = n => '$' + Math.round(n).toLocaleString();
const generateId  = () => Date.now().toString(36) + Math.random().toString(36).slice(2, 7);

// ============================================================
// PERSISTENCE
// ============================================================
function saveState() {
  try {
    localStorage.setItem('dealerSim_v1', JSON.stringify(state));
  } catch (err) {
    showToast('⚠️ Save failed: ' + (err?.message || 'storage quota exceeded'), 'error');
  }
}

function loadState() {
  try {
    const raw = localStorage.getItem('dealerSim_v1');
    if (raw) { state = JSON.parse(raw); return true; }
  } catch (_) {}
  return false;
}

// ============================================================
// CAR GENERATION
// ============================================================

/** Pick a condition tier given weighted probabilities [A, B, C, D]. */
function pickCondition(weights) {
  let r = Math.random();
  for (let i = 0; i < weights.length; i++) {
    r -= weights[i];
    if (r <= 0) return CONDITIONS[i];
  }
  return 'C';
}

/** Generate a random subset of hidden issues based on condition tier. */
function genHiddenIssues(condition) {
  let count;
  if (condition === 'A')      count = 0;
  else if (condition === 'B') count = Math.random() < 0.2 ? 1 : 0;
  else if (condition === 'C') count = randomInt(0, 2);
  else                        count = randomInt(1, 3); // D
  const pool = [...HIDDEN_ISSUES];
  const issues = [];
  for (let i = 0; i < count && pool.length; i++) {
    const idx = Math.floor(Math.random() * pool.length);
    issues.push({ ...pool[idx] });
    pool.splice(idx, 1);
  }
  return issues;
}

/** Build a full car object from a catalog entry. */
function buildCar(entry, condition, source, inspected = false) {
  const year      = randomInt(entry.yearRange[0], entry.yearRange[1]);
  const mileage   = randomInt(entry.baseMileage[0], entry.baseMileage[1]);
  const issues    = inspected || source === 'factory' ? [] : genHiddenIssues(condition);
  const repairCost = issues.reduce((s, i) => s + i.cost, 0);
  // Market value adjusted for condition and mileage
  const marketValue = Math.round(
    entry.marketValue * CONDITION_VALUE[condition] * (1 - mileage / 600000)
  );
  return {
    id: generateId(),
    make: entry.make, model: entry.model, year, category: entry.category,
    mileage, condition,
    hiddenIssues: issues,
    inspected,
    purchasePrice: 0,
    marketValue,
    repairCost,
    demandFactor: entry.demandFactor,
    daysInLot: 0,
    isForSale: false,
    listPrice: 0,
    source,
  };
}

/** Generate a fresh batch of trade-in offers (3–5 random cars). */
function generateTradeIns() {
  const count = randomInt(3, 5);
  const offers = [];
  for (let i = 0; i < count; i++) {
    const entry     = randomFrom(CAR_CATALOG);
    const condition = pickCondition([0.08, 0.28, 0.37, 0.27]); // skewed worse
    const car       = buildCar(entry, condition, 'tradein', false);
    // Owner may or may not factor in issues
    const ownerAwareOfIssues = Math.random() < 0.4;
    const effectiveMV = ownerAwareOfIssues ? car.marketValue - car.repairCost * 0.5 : car.marketValue;
    const offerPrice  = Math.round(effectiveMV * randomFloat(0.62, 0.84));
    car.purchasePrice  = offerPrice;
    car.tradeInPrice   = offerPrice; // display alias
    offers.push(car);
  }
  return offers;
}

// ============================================================
// SALE PROBABILITY
// ============================================================
function computeSaleChance(car) {
  if (!car.isForSale || car.listPrice <= 0) return 0;
  // Base chance per day
  let chance = 0.08;
  // Price attractiveness: cheaper than market = more buyers
  const priceRatio = car.marketValue / car.listPrice;
  const priceAtt   = clamp(priceRatio * 0.88, 0.25, 1.9);
  // Condition
  const condFactor = CONDITION_FACTOR[car.condition] || 1;
  // Days on lot: slight penalty after 1 week, bigger after 2 weeks
  const daysLot = car.daysInLot;
  const lotFactor = daysLot > 14 ? 0.68 : daysLot > 7 ? 0.84 : 1.0;
  // Upgrades
  const marketingFactor  = 1 + 0.20 * state.upgrades.marketing;
  const repBoostFactor   = 1 + 0.15 * state.upgrades.reputationBoosts;
  const repFactor        = state.reputation;
  const demandFactor     = car.demandFactor || 1;

  chance = chance * priceAtt * condFactor * lotFactor * marketingFactor * repFactor * repBoostFactor * demandFactor;
  return clamp(chance, 0.01, 0.85);
}

// ============================================================
// NEXT DAY — sub-steps
// ============================================================
function processDeliveries() {
  const stillPending = [];
  for (const d of state.deliveries) {
    if (d.arrivalDay <= state.day) {
      if (state.garage.length < state.garageSlots) {
        state.garage.push(d.car);
        addNote(`📦 ${d.car.year} ${d.car.make} ${d.car.model} arrived from the factory!`, 'info');
      } else {
        // Garage full — keep it pending until space frees up
        stillPending.push(d);
        addNote(`⚠️ ${d.car.year} ${d.car.make} ${d.car.model} arrived but the garage is FULL. Free a slot!`, 'warning');
      }
    } else {
      stillPending.push(d);
    }
  }
  state.deliveries = stillPending;
}

function processForSale() {
  const remaining = [];
  for (const car of state.garage) {
    if (!car.isForSale || car.listPrice <= 0) { remaining.push(car); continue; }
    const chance = computeSaleChance(car);
    if (Math.random() < chance) {
      const fee    = Math.round(car.listPrice * TRANSACTION_FEE);
      const profit = car.listPrice - fee - car.purchasePrice;
      state.cash  += car.listPrice - fee;
      // Reputation drift
      state.reputation = profit > 0
        ? Math.min(state.reputation + 0.02, 2.0)
        : Math.max(state.reputation - 0.01, 0.1);
      state.salesHistory.unshift({
        ...car, soldDay: state.day, salePrice: car.listPrice, fee, profit,
      });
      addNote(
        `🎉 SOLD: ${car.year} ${car.make} ${car.model} for ${formatCurrency(car.listPrice)}! ` +
        `Profit: ${profit >= 0 ? '+' : ''}${formatCurrency(profit)}`,
        profit >= 0 ? 'success' : 'warning'
      );
    } else {
      remaining.push(car);
    }
  }
  state.garage = remaining;
}

function tickDaysInLot() {
  state.garage.forEach(c => { if (c.isForSale) c.daysInLot++; });
}

function addNote(message, type = 'info') {
  state.notifications.unshift({ message, type, day: state.day });
  if (state.notifications.length > 60) state.notifications.pop();
}

// ============================================================
// NEXT DAY — main entry
// ============================================================
function nextDay() {
  state.day++;
  processDeliveries();
  processForSale();
  tickDaysInLot();
  state.tradeInOffers = generateTradeIns();
  saveState();
  renderAll();
  showToast(`Day ${state.day} — new trade-in offers waiting!`);
}

// ============================================================
// PLAYER ACTIONS
// ============================================================
function buyFromFactory(catalogIdx) {
  const entry = CAR_CATALOG[catalogIdx];
  if (!entry) return;

  if (state.cash < entry.basePrice) { showToast('Not enough cash!', 'error'); return; }
  const occupied = state.garage.length + state.deliveries.length;
  if (occupied >= state.garageSlots) {
    showToast('No garage space (including pending deliveries)!', 'error'); return;
  }

  state.cash -= entry.basePrice;
  const condition  = pickCondition([0.40, 0.45, 0.13, 0.02]);
  const car        = buildCar(entry, condition, 'factory', true);
  car.purchasePrice = entry.basePrice;
  const days       = state.upgrades.expressDelivery ? Math.max(1, entry.deliveryDays - 1) : entry.deliveryDays;
  const arrivalDay = state.day + days;
  state.deliveries.push({ car, arrivalDay });

  addNote(`🏭 Ordered ${car.year} ${car.make} ${car.model} — arrives Day ${arrivalDay}.`, 'info');
  saveState();
  renderAll();
  showToast(`Ordered! Arrives on Day ${arrivalDay}.`);
}

function acceptTradeIn(offerId) {
  const offer = state.tradeInOffers.find(o => o.id === offerId);
  if (!offer) return;
  if (state.cash < offer.purchasePrice)       { showToast('Not enough cash!', 'error'); return; }
  if (state.garage.length >= state.garageSlots) { showToast('Garage is full!', 'error'); return; }

  state.cash -= offer.purchasePrice;
  const car = { ...offer };
  delete car.tradeInPrice;
  state.garage.push(car);
  state.tradeInOffers = state.tradeInOffers.filter(o => o.id !== offerId);

  addNote(`🤝 Accepted trade-in: ${car.year} ${car.make} ${car.model} for ${formatCurrency(offer.purchasePrice)}.`, 'info');
  saveState();
  renderAll();
}

function declineTradeIn(offerId) {
  state.tradeInOffers = state.tradeInOffers.filter(o => o.id !== offerId);
  saveState();
  renderTradeIns();
}

function inspectTradeIn(offerId) {
  const cost  = state.upgrades.inspectionTool ? 150 : 300;
  const offer = state.tradeInOffers.find(o => o.id === offerId);
  if (!offer) return;
  if (state.cash < cost) { showToast(`Inspection costs ${formatCurrency(cost)} — not enough cash!`, 'error'); return; }

  state.cash   -= cost;
  offer.inspected = true;
  // Issues were already generated at trade-in creation; inspection just reveals them.
  // Recalculate repairCost in case it wasn't set (e.g. old save data).
  offer.repairCost = offer.hiddenIssues.reduce((s, i) => s + i.cost, 0);

  addNote(
    `🔍 Inspected ${offer.year} ${offer.make} ${offer.model}: ` +
    `${offer.hiddenIssues.length} issue(s), repair cost ${formatCurrency(offer.repairCost)}.`,
    'info'
  );
  saveState();
  renderAll();
}

function markForSale(carId) {
  const car = state.garage.find(c => c.id === carId);
  if (!car) return;
  car.isForSale = !car.isForSale;
  if (car.isForSale && car.listPrice === 0) car.listPrice = car.marketValue;
  if (!car.isForSale) car.daysInLot = 0;
  saveState();
  renderGarage();
  renderForSale();
}

function updateListPrice(carId, rawValue) {
  const car = state.garage.find(c => c.id === carId);
  if (!car) return;
  const p = parseFloat(rawValue);
  if (!isNaN(p) && p > 0) { car.listPrice = Math.round(p); saveState(); }
}

function setListPriceMultiplier(carId, mult) {
  const car = state.garage.find(c => c.id === carId);
  if (!car) return;
  car.listPrice = Math.round(car.marketValue * mult);
  saveState();
  renderForSale();
}

function buyUpgrade(upgradeId) {
  const upg = UPGRADES_CONFIG.find(u => u.id === upgradeId);
  if (!upg) return;
  if (!upg.requires(state.upgrades)) { showToast('Upgrade unavailable or already purchased!', 'error'); return; }
  if (state.cash < upg.cost)         { showToast('Not enough cash!', 'error'); return; }

  state.cash -= upg.cost;
  upg.apply(state);
  addNote(`⬆️ Purchased: ${upg.name}`, 'success');
  saveState();
  renderAll();
  showToast(`${upg.name} purchased!`, 'success');
}

function detailCar(carId) {
  if (!state.upgrades.detailing) { showToast('You need the Detailing Bay upgrade first!', 'error'); return; }
  const car = state.garage.find(c => c.id === carId);
  if (!car) return;
  if (car.condition === 'A') { showToast('Car is already in excellent condition!', 'error'); return; }
  if (state.cash < 500) { showToast('Not enough cash for detailing ($500)!', 'error'); return; }

  state.cash -= 500;
  const idx = CONDITIONS.indexOf(car.condition);
  car.condition   = CONDITIONS[idx - 1];
  car.marketValue = Math.round(car.marketValue * 1.07);
  addNote(`✨ Detailed ${car.year} ${car.make} ${car.model} → condition now ${car.condition}.`, 'success');
  saveState();
  renderAll();
}

// ============================================================
// SAVE MANAGEMENT
// ============================================================
function confirmNewGame() {
  showModal(
    'Start New Game',
    'All progress will be lost. Are you sure?',
    () => {
      state = JSON.parse(JSON.stringify(DEFAULT_STATE));
      state.tradeInOffers = generateTradeIns();
      saveState();
      renderAll();
      showToast('New game started! Good luck.', 'success');
    }
  );
}

function exportSave() {
  const blob = new Blob([JSON.stringify(state, null, 2)], { type: 'application/json' });
  const url  = URL.createObjectURL(blob);
  const a    = Object.assign(document.createElement('a'), {
    href: url, download: `dealersim-day${state.day}.json`,
  });
  a.click();
  URL.revokeObjectURL(url);
  showToast('Save exported!', 'success');
}

function importSave(file) {
  const reader = new FileReader();
  reader.onload = e => {
    try {
      state = JSON.parse(e.target.result);
      saveState();
      renderAll();
      showToast('Save imported successfully!', 'success');
    } catch (_) {
      showToast('Invalid save file.', 'error');
    }
  };
  reader.readAsText(file);
}

// ============================================================
// RENDER — helpers
// ============================================================
function condBadge(c) {
  const cls = { A: 'badge-green', B: 'badge-blue', C: 'badge-yellow', D: 'badge-red' };
  return `<span class="badge ${cls[c] || ''}">${c} – ${CONDITION_NAMES[c]}</span>`;
}

function renderStats() {
  document.getElementById('stat-cash').textContent   = `💵 ${formatCurrency(state.cash)}`;
  document.getElementById('stat-day').textContent    = `📅 Day ${state.day}`;
  document.getElementById('stat-rep').textContent    = `⭐ Rep ${state.reputation.toFixed(2)}`;
  document.getElementById('stat-garage').textContent = `🏠 ${state.garage.length} / ${state.garageSlots}`;
}

// ============================================================
// RENDER — Dashboard
// ============================================================
function renderDashboard() {
  const totalProfit = state.salesHistory.reduce((s, h) => s + h.profit, 0);
  const forSaleCount = state.garage.filter(c => c.isForSale).length;

  const deliveryRows = state.deliveries.length
    ? state.deliveries.map(d => `
        <div class="delivery-item">
          <span>${d.car.year} ${d.car.make} ${d.car.model}</span>
          <span class="badge badge-blue">Day ${d.arrivalDay}</span>
        </div>`).join('')
    : '<p class="empty-msg">No pending deliveries.</p>';

  const recentSales = state.salesHistory.length
    ? state.salesHistory.slice(0, 6).map(s => `
        <div class="sale-item">
          <span>${s.year} ${s.make} ${s.model}</span>
          <span>${formatCurrency(s.salePrice)}</span>
          <span class="${s.profit >= 0 ? 'text-green' : 'text-red'}" style="font-weight:700">
            ${s.profit >= 0 ? '+' : ''}${formatCurrency(s.profit)}
          </span>
        </div>`).join('')
    : '<p class="empty-msg">No sales yet.</p>';

  const logs = state.notifications.length
    ? state.notifications.slice(0, 12).map(n => `
        <div class="notif-item notif-${n.type}">
          <span class="notif-day">Day ${n.day}</span>
          <span>${n.message}</span>
        </div>`).join('')
    : '<p class="empty-msg">No events yet — press Next Day to begin!</p>';

  document.getElementById('tab-dashboard').innerHTML = `
    <div class="dashboard-grid">

      <div class="dash-card">
        <h3>📊 Business Overview</h3>
        <div class="stat-row"><span>Cash</span><strong>${formatCurrency(state.cash)}</strong></div>
        <div class="stat-row"><span>Day</span><strong>${state.day}</strong></div>
        <div class="stat-row"><span>Reputation</span><strong>${state.reputation.toFixed(2)}</strong></div>
        <div class="stat-row"><span>Garage</span><strong>${state.garage.length} / ${state.garageSlots} slots</strong></div>
        <div class="stat-row"><span>Listed for Sale</span><strong>${forSaleCount}</strong></div>
        <div class="stat-row"><span>Pending Deliveries</span><strong>${state.deliveries.length}</strong></div>
        <div class="stat-row"><span>Total Cars Sold</span><strong>${state.salesHistory.length}</strong></div>
        <div class="stat-row"><span>Cumulative Profit</span>
          <strong class="${totalProfit >= 0 ? 'text-green' : 'text-red'}">${formatCurrency(totalProfit)}</strong>
        </div>
      </div>

      <div class="dash-card">
        <h3>📦 Incoming Deliveries (${state.deliveries.length})</h3>
        ${deliveryRows}
      </div>

      <div class="dash-card">
        <h3>💰 Recent Sales</h3>
        ${recentSales}
      </div>

      <div class="dash-card dash-card-wide">
        <h3>🔔 Activity Log</h3>
        ${logs}
      </div>

    </div>

    <div class="save-controls">
      <button class="btn btn-danger"    onclick="confirmNewGame()">🗑️ New Game / Reset</button>
      <button class="btn btn-secondary" onclick="exportSave()">📤 Export Save</button>
      <button class="btn btn-secondary" onclick="document.getElementById('import-file').click()">📥 Import Save</button>
    </div>`;
}

// ============================================================
// RENDER — Factory
// ============================================================
function renderFactory() {
  const CATEGORY_ICONS = { Economy: '🏙️', Sedan: '🚗', SUV: '🚙', Truck: '🛻', Sports: '🏎️', Luxury: '💎' };
  const grouped = {};
  CAR_CATALOG.forEach((entry, idx) => {
    (grouped[entry.category] = grouped[entry.category] || []).push({ ...entry, idx });
  });

  const garageFull = state.garage.length + state.deliveries.length >= state.garageSlots;

  let html = '';
  for (const [cat, cars] of Object.entries(grouped)) {
    html += `<div class="category-section">
      <h3>${CATEGORY_ICONS[cat] || ''} ${cat}</h3>
      <div class="card-grid">`;

    for (const car of cars) {
      const delivDays = state.upgrades.expressDelivery ? Math.max(1, car.deliveryDays - 1) : car.deliveryDays;
      const margin    = car.marketValue - car.basePrice;
      const canBuy    = !garageFull && state.cash >= car.basePrice;
      const stars     = '⭐'.repeat(Math.round(car.demandFactor * 2));

      html += `
        <div class="car-card factory-card">
          <div class="car-card-header">
            <span class="car-name">${car.make} ${car.model}</span>
            <span class="badge badge-gray">${cat}</span>
          </div>
          <div class="car-details">
            <div class="detail-row"><span>Years</span><span>${car.yearRange[0]}–${car.yearRange[1]}</span></div>
            <div class="detail-row"><span>Wholesale</span><span class="text-blue">${formatCurrency(car.basePrice)}</span></div>
            <div class="detail-row"><span>Market Value</span><span class="text-green">${formatCurrency(car.marketValue)}</span></div>
            <div class="detail-row"><span>Est. Margin</span><span class="text-green">+${formatCurrency(margin)}</span></div>
            <div class="detail-row"><span>Delivery</span><span>${delivDays} day${delivDays !== 1 ? 's' : ''}</span></div>
            <div class="detail-row"><span>Demand</span><span title="${car.demandFactor}">${stars}</span></div>
          </div>
          <button class="btn btn-primary btn-full" onclick="buyFromFactory(${car.idx})" ${canBuy ? '' : 'disabled'}>
            ${garageFull ? '🚫 Garage Full' : state.cash < car.basePrice ? `💸 Need ${formatCurrency(car.basePrice - state.cash)} more` : `Buy — ${formatCurrency(car.basePrice)}`}
          </button>
        </div>`;
    }
    html += `</div></div>`;
  }
  document.getElementById('tab-factory').innerHTML = html;
}

// ============================================================
// RENDER — Trade-Ins
// ============================================================
function renderTradeIns() {
  const el = document.getElementById('tab-tradeins');
  const inspectCost = state.upgrades.inspectionTool ? 150 : 300;
  const garageFull  = state.garage.length >= state.garageSlots;

  if (!state.tradeInOffers.length) {
    el.innerHTML = `<div class="empty-state">
      <p>No trade-in offers today. Press <strong>Next Day</strong> to generate new offers.</p></div>`;
    return;
  }

  const cards = state.tradeInOffers.map(offer => {
    const issuesHtml = offer.inspected
      ? (offer.hiddenIssues.length === 0
          ? '<p class="text-green" style="font-size:.82rem">✅ No hidden issues found!</p>'
          : offer.hiddenIssues.map(i =>
              `<span class="issue-tag">⚠️ ${i.name} (${formatCurrency(i.cost)})</span>`).join(''))
      : '<p class="text-muted" style="font-size:.82rem">🔍 Unknown issues — inspect to reveal</p>';

    const canAccept = !garageFull && state.cash >= offer.purchasePrice;
    const canInspect = !offer.inspected && state.cash >= inspectCost;

    return `
      <div class="car-card tradein-card">
        <div class="car-card-header">
          <span class="car-name">${offer.year} ${offer.make} ${offer.model}</span>
          ${condBadge(offer.condition)}
        </div>
        <div class="car-details">
          <div class="detail-row"><span>Category</span><span>${offer.category}</span></div>
          <div class="detail-row"><span>Mileage</span><span>${offer.mileage.toLocaleString()} mi</span></div>
          <div class="detail-row"><span>Asking Price</span><span class="text-blue">${formatCurrency(offer.purchasePrice)}</span></div>
          <div class="detail-row"><span>Est. Market Value</span><span class="text-green">${formatCurrency(offer.marketValue)}</span></div>
          ${offer.inspected ? `<div class="detail-row"><span>Repair Cost</span><span class="text-red">${formatCurrency(offer.repairCost)}</span></div>` : ''}
          ${offer.inspected ? `<div class="detail-row"><span>Net Margin</span><span class="${offer.marketValue - offer.repairCost - offer.purchasePrice >= 0 ? 'text-green' : 'text-red'}">${formatCurrency(offer.marketValue - offer.repairCost - offer.purchasePrice)}</span></div>` : ''}
        </div>
        <div class="issues-section">${issuesHtml}</div>
        <div class="car-actions">
          ${!offer.inspected
            ? `<button class="btn btn-secondary" onclick="inspectTradeIn('${offer.id}')" ${canInspect ? '' : 'disabled'}>🔍 Inspect (${formatCurrency(inspectCost)})</button>`
            : ''}
          <button class="btn btn-success" onclick="acceptTradeIn('${offer.id}')" ${canAccept ? '' : 'disabled'}>
            ✅ Accept ${formatCurrency(offer.purchasePrice)}
          </button>
          <button class="btn btn-danger" onclick="declineTradeIn('${offer.id}')">❌ Decline</button>
        </div>
      </div>`;
  }).join('');

  el.innerHTML = `
    <div class="tab-info">
      💡 ${state.tradeInOffers.length} offer(s) available today. Offers refresh each day.
      Garage: ${state.garage.length}/${state.garageSlots} slots used.
    </div>
    <div class="card-grid">${cards}</div>`;
}

// ============================================================
// RENDER — Garage
// ============================================================
function renderGarage() {
  const el = document.getElementById('tab-garage');

  if (!state.garage.length) {
    el.innerHTML = `<div class="empty-state">
      <p>Your garage is empty. Order from the <strong>Factory</strong> tab or accept a <strong>Trade-In</strong>.</p></div>`;
    return;
  }

  const cards = state.garage.map(car => {
    const issuesHtml = car.inspected
      ? (car.hiddenIssues.length === 0
          ? '<span class="text-green">✅ None</span>'
          : car.hiddenIssues.map(i => `<span class="issue-tag">⚠️ ${i.name}</span>`).join(''))
      : '<span class="text-muted">Unknown (not inspected)</span>';

    const saleChance = car.isForSale && car.listPrice > 0
      ? `${(computeSaleChance(car) * 100).toFixed(1)}% / day` : '—';

    return `
      <div class="car-card garage-card ${car.isForSale ? 'for-sale' : ''}">
        <div class="car-card-header">
          <span class="car-name">${car.year} ${car.make} ${car.model}</span>
          ${condBadge(car.condition)}
        </div>
        ${car.isForSale ? '<div class="for-sale-banner">🏷️ LISTED FOR SALE</div>' : ''}
        <div class="car-details">
          <div class="detail-row"><span>Category</span><span>${car.category}</span></div>
          <div class="detail-row"><span>Mileage</span><span>${car.mileage.toLocaleString()} mi</span></div>
          <div class="detail-row"><span>Purchased For</span><span>${formatCurrency(car.purchasePrice)}</span></div>
          <div class="detail-row"><span>Market Value</span><span class="text-green">${formatCurrency(car.marketValue)}</span></div>
          <div class="detail-row"><span>Source</span><span>${car.source === 'factory' ? '🏭 Factory' : '🤝 Trade-In'}</span></div>
          ${car.isForSale ? `<div class="detail-row"><span>Days on Lot</span><span>${car.daysInLot}</span></div>` : ''}
          ${car.isForSale ? `<div class="detail-row"><span>Sale Chance</span><span>${saleChance}</span></div>` : ''}
        </div>
        <div class="issues-row">Issues: ${issuesHtml}</div>
        ${car.isForSale ? `
          <div class="price-input-row">
            <label>List Price:</label>
            <input type="number" class="price-input" value="${car.listPrice}" min="1"
              onchange="updateListPrice('${car.id}', this.value); renderGarage()">
          </div>` : ''}
        <div class="car-actions">
          <button class="btn ${car.isForSale ? 'btn-warning' : 'btn-primary'}" onclick="markForSale('${car.id}')">
            ${car.isForSale ? '📤 Unlist' : '🏷️ Mark for Sale'}
          </button>
          ${state.upgrades.detailing && car.condition !== 'A'
            ? `<button class="btn btn-secondary" onclick="detailCar('${car.id}')"
                 ${state.cash < 500 ? 'disabled' : ''} title="Improve condition by one tier">
                 ✨ Detail ($500)
               </button>`
            : ''}
        </div>
      </div>`;
  }).join('');

  el.innerHTML = `
    <div class="tab-info">
      🏠 Garage: ${state.garage.length}/${state.garageSlots} slots occupied.
      ${state.garage.filter(c => c.isForSale).length} car(s) currently listed for sale.
    </div>
    <div class="card-grid">${cards}</div>`;
}

// ============================================================
// RENDER — For Sale
// ============================================================
function renderForSale() {
  const el     = document.getElementById('tab-forsale');
  const listed = state.garage.filter(c => c.isForSale);

  if (!listed.length) {
    el.innerHTML = `<div class="empty-state">
      <p>No cars are listed for sale. Go to <strong>Garage</strong> and click "Mark for Sale".</p></div>`;
    return;
  }

  const cards = listed.map(car => {
    const chance = car.listPrice > 0 ? (computeSaleChance(car) * 100).toFixed(1) : '0.0';
    const fee    = Math.round(car.listPrice * TRANSACTION_FEE);
    const profit = car.listPrice - fee - car.purchasePrice;
    const chanceClass = parseFloat(chance) >= 30 ? 'text-green' : parseFloat(chance) >= 15 ? 'text-yellow' : 'text-red';

    return `
      <div class="car-card forsale-card">
        <div class="car-card-header">
          <span class="car-name">${car.year} ${car.make} ${car.model}</span>
          ${condBadge(car.condition)}
        </div>
        <div class="car-details">
          <div class="detail-row"><span>Purchased For</span><span>${formatCurrency(car.purchasePrice)}</span></div>
          <div class="detail-row"><span>Market Value</span><span class="text-green">${formatCurrency(car.marketValue)}</span></div>
          <div class="detail-row"><span>Days on Lot</span><span>${car.daysInLot}</span></div>
          <div class="detail-row"><span>Sale Chance / Day</span><span class="${chanceClass}">${chance}%</span></div>
          <div class="detail-row"><span>Transaction Fee (2%)</span><span class="text-red">−${formatCurrency(fee)}</span></div>
          <div class="detail-row"><span>Est. Profit</span>
            <span class="${profit >= 0 ? 'text-green' : 'text-red'}" style="font-weight:700">
              ${profit >= 0 ? '+' : ''}${formatCurrency(profit)}
            </span>
          </div>
        </div>
        <div class="price-input-row">
          <label>List Price:</label>
          <input type="number" class="price-input" value="${car.listPrice}" min="1"
            onchange="updateListPrice('${car.id}', this.value); renderForSale()">
        </div>
        <div class="price-buttons">
          <button class="btn btn-sm btn-secondary" onclick="setListPriceMultiplier('${car.id}', 1.0)" title="Set to market value">Market</button>
          <button class="btn btn-sm btn-secondary" onclick="setListPriceMultiplier('${car.id}', 1.1)" title="+10% above market">+10%</button>
          <button class="btn btn-sm btn-warning"   onclick="setListPriceMultiplier('${car.id}', 0.9)" title="-10% below market">−10%</button>
          <button class="btn btn-sm btn-warning"   onclick="setListPriceMultiplier('${car.id}', 0.8)" title="-20% below market">−20%</button>
        </div>
        <button class="btn btn-danger btn-full" onclick="markForSale('${car.id}')">📤 Unlist</button>
      </div>`;
  }).join('');

  el.innerHTML = `
    <div class="tab-info">
      🏷️ ${listed.length} car(s) listed. Press <strong>Next Day</strong> to simulate customer visits and potential sales.
    </div>
    <div class="card-grid">${cards}</div>`;
}

// ============================================================
// RENDER — Upgrades
// ============================================================
function renderUpgrades() {
  const grouped = {};
  UPGRADES_CONFIG.forEach(u => (grouped[u.category] = grouped[u.category] || []).push(u));

  let html = '';
  for (const [cat, upgrades] of Object.entries(grouped)) {
    html += `<div class="category-section"><h3>${cat}</h3><div class="card-grid">`;
    for (const upg of upgrades) {
      const available = upg.requires(state.upgrades);
      const canAfford = state.cash >= upg.cost;
      let stackInfo = '';
      if (upg.id === 'marketing')       stackInfo = ` (${state.upgrades.marketing}/3)`;
      if (upg.id === 'reputationBoost') stackInfo = ` (${state.upgrades.reputationBoosts}/3)`;

      html += `
        <div class="car-card upgrade-card ${!available ? 'disabled-card' : ''}">
          <div class="upgrade-icon">${upg.icon}</div>
          <h4>${upg.name}${stackInfo}</h4>
          <p class="upgrade-desc">${upg.desc}</p>
          <p class="upgrade-cost">${formatCurrency(upg.cost)}</p>
          <button class="btn btn-primary btn-full" onclick="buyUpgrade('${upg.id}')"
            ${!available || !canAfford ? 'disabled' : ''}>
            ${!available
              ? '✅ Purchased / Max Level'
              : !canAfford
                ? `💸 Need ${formatCurrency(upg.cost - state.cash)} more`
                : `Buy — ${formatCurrency(upg.cost)}`}
          </button>
        </div>`;
    }
    html += `</div></div>`;
  }
  document.getElementById('tab-upgrades').innerHTML = html;
}

// ============================================================
// RENDER — All (re-renders only the active tab + stats)
// ============================================================
function renderAll() {
  renderStats();
  const activeId = document.querySelector('.tab-panel.active')?.id;
  if (!activeId) return;
  switch (activeId.replace('tab-', '')) {
    case 'dashboard': renderDashboard(); break;
    case 'factory':   renderFactory();   break;
    case 'tradeins':  renderTradeIns();  break;
    case 'garage':    renderGarage();    break;
    case 'forsale':   renderForSale();   break;
    case 'upgrades':  renderUpgrades();  break;
  }
}

// ============================================================
// TAB SWITCHING
// ============================================================
function switchTab(name) {
  document.querySelectorAll('.tab-btn').forEach(b => b.classList.toggle('active', b.dataset.tab === name));
  document.querySelectorAll('.tab-panel').forEach(p => p.classList.toggle('active', p.id === 'tab-' + name));
  // Render the newly visible tab
  switch (name) {
    case 'dashboard': renderDashboard(); break;
    case 'factory':   renderFactory();   break;
    case 'tradeins':  renderTradeIns();  break;
    case 'garage':    renderGarage();    break;
    case 'forsale':   renderForSale();   break;
    case 'upgrades':  renderUpgrades();  break;
  }
}

// ============================================================
// TOAST
// ============================================================
function showToast(message, type = 'info') {
  const container = document.getElementById('toast-container');
  const el = document.createElement('div');
  el.className = `toast toast-${type}`;
  el.textContent = message;
  container.appendChild(el);
  requestAnimationFrame(() => el.classList.add('show'));
  setTimeout(() => {
    el.classList.remove('show');
    setTimeout(() => el.remove(), 300);
  }, 3200);
}

// ============================================================
// MODAL
// ============================================================
function showModal(title, message, onConfirm) {
  document.getElementById('modal-title').textContent   = title;
  document.getElementById('modal-message').textContent = message;
  document.getElementById('modal-confirm').onclick = () => { closeModal(); onConfirm(); };
  document.getElementById('modal').classList.remove('hidden');
}
function closeModal() { document.getElementById('modal').classList.add('hidden'); }

// ============================================================
// INIT
// ============================================================
function init() {
  // Load persisted state or start fresh
  if (!loadState()) {
    state.tradeInOffers = generateTradeIns();
    saveState();
  }

  // Tab buttons
  document.querySelectorAll('.tab-btn').forEach(btn => {
    btn.addEventListener('click', () => switchTab(btn.dataset.tab));
  });

  // Next Day
  document.getElementById('btn-next-day').addEventListener('click', nextDay);

  // Modal
  document.getElementById('modal-cancel').addEventListener('click', closeModal);
  document.getElementById('modal').addEventListener('click', e => {
    if (e.target === document.getElementById('modal')) closeModal();
  });

  // Import file picker
  document.getElementById('import-file').addEventListener('change', e => {
    if (e.target.files[0]) { importSave(e.target.files[0]); e.target.value = ''; }
  });

  // Expose functions for inline onclick handlers in dynamically rendered HTML
  Object.assign(window, {
    buyFromFactory, acceptTradeIn, declineTradeIn, inspectTradeIn,
    markForSale, updateListPrice, setListPriceMultiplier,
    buyUpgrade, detailCar,
    confirmNewGame, exportSave,
    renderGarage, renderForSale,   // called from price input onchange
  });

  renderAll();
}

init();

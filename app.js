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
  usedMarketOffers: [],    // buy-used cars with negotiation (was tradeInOffers)
  tradeInRequests: [],     // customers proposing to swap their car for one of yours
  customerOffers: [],      // pending below-list-price offers on your listed cars
  upgrades: {
    garageLevel: 1,
    marketing: 0,
    inspectionTool: false,
    detailing: false,
    reputationBoosts: 0,
    expressDelivery: false,
    serviceBay: false,
    performanceShop: false,
    negotiationTraining: false,
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

const PERF_ELIGIBLE = ['Sports', 'SUV', 'Truck']; // categories eligible for parts upgrade

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
    id: 'negotiationTraining', name: 'Negotiation Training', icon: '🤝', category: 'Tools', cost: 8000,
    desc: 'Improves negotiation outcomes when buying used cars and handling customer offers.',
    requires: u => !u.negotiationTraining,
    apply: s => { s.upgrades.negotiationTraining = true; },
  },
  {
    id: 'detailing', name: 'Detailing Bay', icon: '✨', category: 'Reconditioning', cost: 12000,
    desc: 'Detail cars for $500 each — improves condition one tier and boosts market value by 7%.',
    requires: u => !u.detailing,
    apply: s => { s.upgrades.detailing = true; },
  },
  {
    id: 'serviceBay', name: 'Service Bay', icon: '🔩', category: 'Reconditioning', cost: 18000,
    desc: 'Enables Basic Repair ($800, 1 day): fixes mechanical issues, improves condition one tier.',
    requires: u => !u.serviceBay,
    apply: s => { s.upgrades.serviceBay = true; },
  },
  {
    id: 'performanceShop', name: 'Performance Shop', icon: '🏎️', category: 'Reconditioning', cost: 30000,
    desc: 'Enables Parts Upgrade on Sports/SUV/Truck ($1,500, 1 day): +15% market value.',
    requires: u => !u.performanceShop,
    apply: s => { s.upgrades.performanceShop = true; },
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
    if (raw) {
      const loaded = JSON.parse(raw);
      // Migrate old saves: tradeInOffers → usedMarketOffers
      if (loaded.tradeInOffers && !loaded.usedMarketOffers) {
        loaded.usedMarketOffers = loaded.tradeInOffers;
        delete loaded.tradeInOffers;
      }
      if (!loaded.tradeInRequests) loaded.tradeInRequests = [];
      if (!loaded.customerOffers)  loaded.customerOffers  = [];
      // Migrate upgrade keys
      if (!loaded.upgrades) loaded.upgrades = {};
      if (loaded.upgrades.serviceBay      === undefined) loaded.upgrades.serviceBay      = false;
      if (loaded.upgrades.performanceShop === undefined) loaded.upgrades.performanceShop = false;
      if (loaded.upgrades.negotiationTraining === undefined) loaded.upgrades.negotiationTraining = false;
      // Migrate car objects
      for (const car of loaded.garage || []) migrateCar(car);
      for (const d of loaded.deliveries || []) migrateCar(d.car);
      for (const o of loaded.usedMarketOffers || []) migrateCar(o);
      state = loaded;
      return true;
    }
  } catch (_) {}
  return false;
}

function migrateCar(car) {
  if (!car) return;
  if (car.inServiceUntilDay === undefined) car.inServiceUntilDay = null;
  if (car.pendingService    === undefined) car.pendingService    = null;
  if (car.reconditionLog    === undefined) car.reconditionLog    = [];
  if (car.washBoostDays     === undefined) car.washBoostDays     = 0;
  // Old offers had 'tradein' source — normalise
  if (car.source === 'tradein') car.source = 'used';
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
    // Reconditioning
    inServiceUntilDay: null,
    pendingService: null,
    reconditionLog: [],
    washBoostDays: 0,
  };
}

/** Generate a fresh batch of Used Market offers (cars available to buy). */
function generateUsedMarket() {
  const count = randomInt(4, 7);
  const offers = [];
  for (let i = 0; i < count; i++) {
    const entry     = randomFrom(CAR_CATALOG);
    const condition = pickCondition([0.08, 0.28, 0.37, 0.27]);
    const car       = buildCar(entry, condition, 'used', false);
    const ownerAwareOfIssues = Math.random() < 0.4;
    const effectiveMV = ownerAwareOfIssues ? car.marketValue - car.repairCost * 0.5 : car.marketValue;
    const askingPrice    = Math.round(effectiveMV * randomFloat(0.72, 0.92));
    // Hidden floor — seller won't accept below this
    const minAcceptPrice = Math.round(askingPrice * randomFloat(0.74, 0.91));
    car.purchasePrice  = askingPrice;
    car.askingPrice    = askingPrice;
    car.minAcceptPrice = minAcceptPrice;
    car.negotiationState = null; // null | 'countered'
    car.playerOffer    = null;
    car.sellerCounter  = null;
    car.patience       = randomInt(1, 3); // max counter rounds
    offers.push(car);
  }
  return offers;
}

/** Generate trade-in requests: customers who want to swap their car for one of yours. */
function generateTradeInRequests() {
  const listed = state.garage.filter(c => c.isForSale && c.listPrice > 0 && !c.inServiceUntilDay);
  if (!listed.length) return [];
  const newRequests = [];
  const numRequests = randomInt(0, Math.min(2, listed.length));
  for (let i = 0; i < numRequests; i++) {
    const targetCar   = randomFrom(listed);
    const entry       = randomFrom(CAR_CATALOG);
    const condition   = pickCondition([0.05, 0.25, 0.40, 0.30]);
    const customerCar = buildCar(entry, condition, 'used', false);
    customerCar.purchasePrice = 0;
    // Their car's value at ~55–80% market (they inflate a bit)
    const customerCarValue = Math.round(customerCar.marketValue * randomFloat(0.55, 0.80));
    // cashDelta: positive = customer adds cash, negative = customer wants you to pay extra
    const rawDelta    = targetCar.listPrice - customerCarValue;
    // Cap the customer's asks — they won't demand more than 20% of your car's list
    const cashDelta   = Math.max(rawDelta, -Math.round(targetCar.listPrice * 0.20));
    newRequests.push({
      id: generateId(),
      customerCar,
      customerCarValue,
      targetCarId: targetCar.id,
      cashDelta,
      counterCashDelta: null,
      state: 'pending',   // 'pending' | 'countered'
      expiresDay: state.day + 2,
    });
  }
  return newRequests;
}

/** Generate below-list-price customer offers for listed cars. */
function generateCustomerOffers() {
  const existing = new Set(state.customerOffers.map(o => o.carId));
  const newOffers = [];
  for (const car of state.garage) {
    if (!car.isForSale || car.listPrice <= 0 || car.inServiceUntilDay) continue;
    if (existing.has(car.id)) continue; // already has a pending offer
    const chance = computeSaleChance(car);
    // Offer probability is 1.5× sale chance (buyer haggles rather than pays full)
    if (Math.random() < Math.min(chance * 1.5, 0.75)) {
      const mult          = randomFloat(0.72, 0.97);
      const offeredPrice  = Math.round(car.listPrice * mult);
      if (offeredPrice >= car.listPrice) continue; // would be auto-sold
      newOffers.push({
        id: generateId(),
        carId: car.id,
        offeredPrice,
        state: 'pending',   // 'pending' | 'countered'
        playerCounter: null,
        expiresDay: state.day + 1,
      });
    }
  }
  return newOffers;
}

// ============================================================
// SALE PROBABILITY
// ============================================================
function computeSaleChance(car) {
  if (!car.isForSale || car.listPrice <= 0) return 0;
  let chance = 0.08;
  const priceRatio = car.marketValue / car.listPrice;
  const priceAtt   = clamp(priceRatio * 0.88, 0.25, 1.9);
  const condFactor = CONDITION_FACTOR[car.condition] || 1;
  const daysLot    = car.daysInLot;
  const lotFactor  = daysLot > 14 ? 0.68 : daysLot > 7 ? 0.84 : 1.0;
  const marketingFactor = 1 + 0.20 * state.upgrades.marketing;
  const repBoostFactor  = 1 + 0.15 * state.upgrades.reputationBoosts;
  const repFactor       = state.reputation;
  const demandFactor    = car.demandFactor || 1;
  const washBonus       = car.washBoostDays > 0 ? 1.08 : 1.0;

  chance = chance * priceAtt * condFactor * lotFactor * marketingFactor * repFactor
         * repBoostFactor * demandFactor * washBonus;
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
        stillPending.push(d);
        addNote(`⚠️ ${d.car.year} ${d.car.make} ${d.car.model} arrived but the garage is FULL. Free a slot!`, 'warning');
      }
    } else {
      stillPending.push(d);
    }
  }
  state.deliveries = stillPending;
}

/** Resolve pending service (repair / parts upgrade) on cars. */
function processService() {
  for (const car of state.garage) {
    if (car.pendingService && car.inServiceUntilDay !== null && car.inServiceUntilDay <= state.day) {
      const svc = car.pendingService;
      if (svc.type === 'repair') {
        const oldCond = car.condition;
        const idx     = CONDITIONS.indexOf(car.condition);
        if (idx > 0) {
          car.condition = CONDITIONS[idx - 1];
          car.marketValue = Math.round(car.marketValue * 1.10);
          car.hiddenIssues = [];
          car.repairCost   = 0;
          car.reconditionLog.push({ type: 'Basic Repair', day: state.day });
          addNote(`🔩 ${car.year} ${car.make} ${car.model} repair complete: ${oldCond} → ${car.condition}. +10% value.`, 'success');
        }
      } else if (svc.type === 'parts') {
        car.marketValue = Math.round(car.marketValue * 1.15);
        car.reconditionLog.push({ type: 'Parts Upgrade', day: state.day });
        addNote(`🏎️ ${car.year} ${car.make} ${car.model} parts upgrade complete! +15% market value.`, 'success');
      }
      car.inServiceUntilDay = null;
      car.pendingService    = null;
    }
    // Decay wash boost
    if (car.washBoostDays > 0) car.washBoostDays--;
  }
}

function processForSale() {
  const soldIds = new Set();
  const remaining = [];
  for (const car of state.garage) {
    if (!car.isForSale || car.listPrice <= 0 || car.inServiceUntilDay) {
      remaining.push(car); continue;
    }
    const chance = computeSaleChance(car);
    if (Math.random() < chance) {
      soldIds.add(car.id);
      const fee    = Math.round(car.listPrice * TRANSACTION_FEE);
      const profit = car.listPrice - fee - car.purchasePrice;
      state.cash  += car.listPrice - fee;
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
  // Remove customer offers / trade-in requests for sold cars
  state.customerOffers = state.customerOffers.filter(o => !soldIds.has(o.carId));
  state.tradeInRequests = state.tradeInRequests.filter(r => !soldIds.has(r.targetCarId));
}

/** Resolve pending counters on customer offers. */
function resolveCustomerOfferCounters() {
  const toRemove = new Set();
  for (const offer of state.customerOffers) {
    if (offer.state === 'countered' && offer.playerCounter) {
      const car = state.garage.find(c => c.id === offer.carId);
      if (!car) { toRemove.add(offer.id); continue; }
      // Customer probability of accepting counter
      const ratio = offer.playerCounter / car.listPrice;
      const negBonus = state.upgrades.negotiationTraining ? 0.10 : 0;
      const acceptProb = clamp(ratio * 0.85 + negBonus, 0.05, 0.92);
      if (Math.random() < acceptProb) {
        // Customer accepts counter
        const salePrice = offer.playerCounter;
        const fee       = Math.round(salePrice * TRANSACTION_FEE);
        const profit    = salePrice - fee - car.purchasePrice;
        state.cash     += salePrice - fee;
        state.reputation = profit > 0
          ? Math.min(state.reputation + 0.015, 2.0)
          : Math.max(state.reputation - 0.01, 0.1);
        state.salesHistory.unshift({ ...car, soldDay: state.day, salePrice, fee, profit });
        state.garage = state.garage.filter(c => c.id !== car.id);
        state.tradeInRequests = state.tradeInRequests.filter(r => r.targetCarId !== car.id);
        addNote(`🤝 Counter accepted! ${car.year} ${car.make} ${car.model} sold for ${formatCurrency(salePrice)}.`, 'success');
        toRemove.add(offer.id);
      } else {
        addNote(`❌ Customer declined your counter on ${car.year} ${car.make} ${car.model}.`, 'warning');
        toRemove.add(offer.id);
      }
    }
  }
  state.customerOffers = state.customerOffers.filter(o => !toRemove.has(o.id));
}

/** Resolve pending counters on trade-in requests. */
function resolveTradeInCounters() {
  const toRemove = new Set();
  for (const req of state.tradeInRequests) {
    if (req.state === 'countered' && req.counterCashDelta !== null) {
      const targetCar = state.garage.find(c => c.id === req.targetCarId);
      if (!targetCar) { toRemove.add(req.id); continue; }
      // Customer acceptance probability based on how fair the counter is
      const totalCustomerCost = req.customerCarValue + req.counterCashDelta;
      const fairness = totalCustomerCost / targetCar.listPrice;
      const negBonus = state.upgrades.negotiationTraining ? 0.08 : 0;
      const acceptProb = clamp(fairness * 0.85 + negBonus, 0.05, 0.85);
      if (Math.random() < acceptProb) {
        executeTradeIn(req, req.counterCashDelta);
        addNote(`🤝 Trade-in counter accepted! Got ${req.customerCar.year} ${req.customerCar.make} ${req.customerCar.model}.`, 'success');
      } else {
        addNote(`❌ Customer declined your trade-in counter for ${targetCar.year} ${targetCar.make} ${targetCar.model}.`, 'warning');
      }
      toRemove.add(req.id);
    }
  }
  state.tradeInRequests = state.tradeInRequests.filter(r => !toRemove.has(r.id));
}

/** Expire stale offers and requests. */
function expireOffers() {
  state.customerOffers = state.customerOffers.filter(o => o.expiresDay >= state.day && o.state === 'pending');
  state.tradeInRequests = state.tradeInRequests.filter(r => r.expiresDay >= state.day && r.state === 'pending');
}

function tickDaysInLot() {
  state.garage.forEach(c => { if (c.isForSale && !c.inServiceUntilDay) c.daysInLot++; });
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
  processService();
  resolveCustomerOfferCounters();
  resolveTradeInCounters();
  expireOffers();
  processForSale();
  tickDaysInLot();
  // Generate new offers for the new day
  state.usedMarketOffers = generateUsedMarket();
  const newTIR = generateTradeInRequests();
  state.tradeInRequests = [...state.tradeInRequests, ...newTIR];
  const newOffers = generateCustomerOffers();
  state.customerOffers = [...state.customerOffers, ...newOffers];
  saveState();
  renderAll();
  const offerAlert = newOffers.length ? ` ${newOffers.length} offer(s) on your cars!` : '';
  const tradeAlert = newTIR.length   ? ` ${newTIR.length} trade-in request(s)!` : '';
  showToast(`Day ${state.day} — new used cars available!${offerAlert}${tradeAlert}`);
}

// ============================================================
// PLAYER ACTIONS — Factory
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

// ============================================================
// PLAYER ACTIONS — Used Market (buy used cars with negotiation)
// ============================================================
function acceptUsedOffer(offerId) {
  const offer = state.usedMarketOffers.find(o => o.id === offerId);
  if (!offer) return;
  const price = offer.sellerCounter ?? offer.askingPrice;
  if (state.cash < price) { showToast('Not enough cash!', 'error'); return; }
  if (state.garage.length >= state.garageSlots) { showToast('Garage is full!', 'error'); return; }
  state.cash -= price;
  const car = { ...offer };
  // Clean up negotiation meta-fields
  delete car.askingPrice; delete car.minAcceptPrice; delete car.negotiationState;
  delete car.playerOffer; delete car.sellerCounter; delete car.patience;
  car.purchasePrice = price;
  state.garage.push(car);
  state.usedMarketOffers = state.usedMarketOffers.filter(o => o.id !== offerId);
  addNote(`🚗 Bought (Used Market): ${car.year} ${car.make} ${car.model} for ${formatCurrency(price)}.`, 'info');
  saveState();
  renderAll();
}

function declineUsedOffer(offerId) {
  state.usedMarketOffers = state.usedMarketOffers.filter(o => o.id !== offerId);
  saveState();
  renderUsedMarket();
}

function inspectUsedOffer(offerId) {
  const cost  = state.upgrades.inspectionTool ? 150 : 300;
  const offer = state.usedMarketOffers.find(o => o.id === offerId);
  if (!offer) return;
  if (state.cash < cost) { showToast(`Inspection costs ${formatCurrency(cost)} — not enough cash!`, 'error'); return; }
  state.cash   -= cost;
  offer.inspected = true;
  offer.repairCost = offer.hiddenIssues.reduce((s, i) => s + i.cost, 0);
  addNote(
    `🔍 Inspected ${offer.year} ${offer.make} ${offer.model}: ` +
    `${offer.hiddenIssues.length} issue(s), repair cost ${formatCurrency(offer.repairCost)}.`,
    'info'
  );
  saveState();
  renderAll();
}

/** Player submits a counter-offer on a used car. */
function submitUsedOffer(offerId, rawAmount) {
  const offer = state.usedMarketOffers.find(o => o.id === offerId);
  if (!offer) return;
  const amount = Math.round(parseFloat(rawAmount));
  if (isNaN(amount) || amount <= 0) { showToast('Enter a valid offer amount.', 'error'); return; }

  const asking = offer.sellerCounter ?? offer.askingPrice;
  if (amount >= asking) {
    // Player just accepted the price — buy it
    acceptUsedOffer(offerId);
    return;
  }

  offer.playerOffer = amount;
  const negBonus    = state.upgrades.negotiationTraining ? 0.10 : 0;
  const repBonus    = (state.reputation - 1) * 0.05;
  const ratio       = amount / offer.minAcceptPrice;
  const acceptProb  = clamp(ratio * 0.85 + negBonus + repBonus, 0.02, 0.88);

  if (Math.random() < acceptProb) {
    // Seller accepts
    offer.sellerCounter  = amount;
    offer.negotiationState = 'accepted';
    showToast('✅ Seller accepted your offer!', 'success');
    acceptUsedOffer(offerId);
  } else if (offer.patience > 0 && amount > offer.minAcceptPrice * 0.60) {
    // Seller counters
    offer.patience--;
    // Counter is between player's offer and asking
    const midpoint     = (amount + asking) / 2;
    offer.sellerCounter  = Math.round(clamp(midpoint, offer.minAcceptPrice, asking));
    offer.negotiationState = 'countered';
    saveState();
    renderUsedMarket();
    showToast(`Seller countered: ${formatCurrency(offer.sellerCounter)}`, 'warning');
  } else {
    // Seller walks away
    offer.negotiationState = 'declined';
    state.usedMarketOffers = state.usedMarketOffers.filter(o => o.id !== offerId);
    saveState();
    renderUsedMarket();
    showToast('Seller walked away from negotiations.', 'error');
  }
}

// ============================================================
// PLAYER ACTIONS — Trade-In Requests
// ============================================================
function acceptTradeInRequest(requestId) {
  const req = state.tradeInRequests.find(r => r.id === requestId);
  if (!req) return;
  const cashDelta = req.counterCashDelta ?? req.cashDelta;
  executeTradeIn(req, cashDelta);
  addNote(`🤝 Trade-in accepted! Got ${req.customerCar.year} ${req.customerCar.make} ${req.customerCar.model}.`, 'success');
  saveState();
  renderAll();
}

function rejectTradeInRequest(requestId) {
  state.tradeInRequests = state.tradeInRequests.filter(r => r.id !== requestId);
  saveState();
  renderTradeInRequests();
}

function counterTradeInRequest(requestId, rawDelta) {
  const req = state.tradeInRequests.find(r => r.id === requestId);
  if (!req) return;
  const delta = Math.round(parseFloat(rawDelta));
  if (isNaN(delta)) { showToast('Enter a valid cash amount.', 'error'); return; }
  req.counterCashDelta = delta;
  req.state            = 'countered';
  req.expiresDay       = state.day + 2;
  saveState();
  renderTradeInRequests();
  showToast(`Counter sent — customer will respond next day.`, 'info');
}

/** Execute an accepted trade-in deal. */
function executeTradeIn(req, cashDelta) {
  const targetCar = state.garage.find(c => c.id === req.targetCarId);
  if (!targetCar) return;

  // Apply cash delta: positive = customer pays us, negative = we pay customer
  state.cash += cashDelta;
  if (state.cash < 0) state.cash = 0; // safety guard (shouldn't happen with UI validation)

  // Record the sale
  const salePrice = req.customerCarValue + cashDelta;
  const fee       = Math.round(Math.abs(salePrice) * TRANSACTION_FEE);
  state.cash -= fee;
  const profit    = salePrice - fee - targetCar.purchasePrice;
  state.salesHistory.unshift({
    ...targetCar, soldDay: state.day, salePrice, fee, profit,
    note: `Trade-in — received ${req.customerCar.year} ${req.customerCar.make} ${req.customerCar.model}`,
  });

  // Remove sold car from garage + any pending offers
  state.garage = state.garage.filter(c => c.id !== req.targetCarId);
  state.customerOffers  = state.customerOffers.filter(o => o.carId !== req.targetCarId);
  state.tradeInRequests = state.tradeInRequests.filter(r => r.id !== req.id);

  // Add customer's car to inventory
  const newCar = { ...req.customerCar };
  newCar.purchasePrice = 0; // we acquired it through trade
  migrateCar(newCar);
  if (state.garage.length < state.garageSlots) {
    state.garage.push(newCar);
  } else {
    addNote(`⚠️ Trade-in car couldn't fit — garage full! Consider expanding.`, 'warning');
  }

  state.reputation = profit > 0
    ? Math.min(state.reputation + 0.02, 2.0)
    : Math.max(state.reputation - 0.01, 0.1);
}

// ============================================================
// PLAYER ACTIONS — Customer Offers
// ============================================================
function acceptCustomerOffer(offerId) {
  const offer = state.customerOffers.find(o => o.id === offerId);
  if (!offer) return;
  const car = state.garage.find(c => c.id === offer.carId);
  if (!car) return;
  const salePrice = offer.offeredPrice;
  const fee       = Math.round(salePrice * TRANSACTION_FEE);
  const profit    = salePrice - fee - car.purchasePrice;
  state.cash     += salePrice - fee;
  state.reputation = profit > 0
    ? Math.min(state.reputation + 0.015, 2.0)
    : Math.max(state.reputation - 0.01, 0.1);
  state.salesHistory.unshift({ ...car, soldDay: state.day, salePrice, fee, profit });
  state.garage          = state.garage.filter(c => c.id !== car.id);
  state.customerOffers  = state.customerOffers.filter(o => o.id !== offerId);
  state.tradeInRequests = state.tradeInRequests.filter(r => r.targetCarId !== car.id);
  addNote(`✅ Accepted offer on ${car.year} ${car.make} ${car.model} for ${formatCurrency(salePrice)}.`, 'success');
  saveState();
  renderAll();
}

function rejectCustomerOffer(offerId) {
  state.customerOffers = state.customerOffers.filter(o => o.id !== offerId);
  saveState();
  renderForSale();
}

function counterCustomerOffer(offerId, rawPrice) {
  const offer = state.customerOffers.find(o => o.id === offerId);
  if (!offer) return;
  const price = Math.round(parseFloat(rawPrice));
  if (isNaN(price) || price <= 0) { showToast('Enter a valid counter price.', 'error'); return; }
  const car = state.garage.find(c => c.id === offer.carId);
  if (!car) return;
  if (price > car.listPrice) { showToast('Counter cannot exceed your list price.', 'error'); return; }
  offer.playerCounter = price;
  offer.state         = 'countered';
  offer.expiresDay    = state.day + 1;
  saveState();
  renderForSale();
  showToast(`Counter sent: ${formatCurrency(price)}. Customer responds next day.`, 'info');
}

// ============================================================
// PLAYER ACTIONS — Listing / Pricing
// ============================================================
function markForSale(carId) {
  const car = state.garage.find(c => c.id === carId);
  if (!car) return;
  if (car.inServiceUntilDay) { showToast('Car is currently in service — wait until complete.', 'error'); return; }
  car.isForSale = !car.isForSale;
  if (car.isForSale && car.listPrice === 0) car.listPrice = car.marketValue;
  if (!car.isForSale) {
    car.daysInLot = 0;
    state.customerOffers  = state.customerOffers.filter(o => o.carId !== carId);
    state.tradeInRequests = state.tradeInRequests.filter(r => r.targetCarId !== carId);
  }
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

// ============================================================
// PLAYER ACTIONS — Upgrades
// ============================================================
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

// ============================================================
// PLAYER ACTIONS — Reconditioning
// ============================================================
function carWash(carId) {
  const car = state.garage.find(c => c.id === carId);
  if (!car) return;
  const cost = 150;
  if (state.cash < cost) { showToast(`Car wash costs ${formatCurrency(cost)} — not enough cash!`, 'error'); return; }
  if (car.washBoostDays > 0) { showToast('Car was recently washed — wait for the boost to fade.', 'error'); return; }
  state.cash     -= cost;
  car.marketValue = Math.round(car.marketValue * 1.03);
  car.washBoostDays = 3; // +8% sale chance for 3 days
  car.reconditionLog.push({ type: 'Car Wash', day: state.day });
  addNote(`🚿 Washed ${car.year} ${car.make} ${car.model} — looks great! +3% value, boosted sale chance for 3 days.`, 'success');
  saveState();
  renderAll();
}

function basicRepair(carId) {
  if (!state.upgrades.serviceBay) { showToast('You need the Service Bay upgrade first!', 'error'); return; }
  const car = state.garage.find(c => c.id === carId);
  if (!car) return;
  if (car.condition === 'A' || car.condition === 'B' && car.hiddenIssues.length === 0) {
    showToast('Car is in good condition — no major repairs needed!', 'error'); return;
  }
  if (car.condition === 'A') { showToast('Car is already in excellent condition!', 'error'); return; }
  if (car.inServiceUntilDay) { showToast('Car is already in service.', 'error'); return; }
  const cost = 800;
  if (state.cash < cost) { showToast(`Basic Repair costs ${formatCurrency(cost)} — not enough cash!`, 'error'); return; }
  state.cash -= cost;
  car.inServiceUntilDay = state.day + 1;
  car.pendingService    = { type: 'repair' };
  car.isForSale         = false;
  addNote(`🔩 ${car.year} ${car.make} ${car.model} is in the service bay. Ready next day.`, 'info');
  saveState();
  renderAll();
  showToast('Car is being repaired — ready next day.', 'info');
}

function partsUpgrade(carId) {
  if (!state.upgrades.performanceShop) { showToast('You need the Performance Shop upgrade first!', 'error'); return; }
  const car = state.garage.find(c => c.id === carId);
  if (!car) return;
  if (!PERF_ELIGIBLE.includes(car.category)) {
    showToast('Parts upgrades are only for Sports, SUV, and Truck vehicles.', 'error'); return;
  }
  if (car.inServiceUntilDay) { showToast('Car is already in service.', 'error'); return; }
  const perfAlreadyDone = car.reconditionLog.some(r => r.type === 'Parts Upgrade');
  if (perfAlreadyDone) { showToast('Parts upgrade already applied to this car!', 'error'); return; }
  const cost = 1500;
  if (state.cash < cost) { showToast(`Parts Upgrade costs ${formatCurrency(cost)} — not enough cash!`, 'error'); return; }
  state.cash -= cost;
  car.inServiceUntilDay = state.day + 1;
  car.pendingService    = { type: 'parts' };
  car.isForSale         = false;
  addNote(`🏎️ ${car.year} ${car.make} ${car.model} is getting a performance upgrade. Ready next day.`, 'info');
  saveState();
  renderAll();
  showToast('Parts upgrade in progress — ready next day.', 'info');
}

function detailCar(carId) {
  if (!state.upgrades.detailing) { showToast('You need the Detailing Bay upgrade first!', 'error'); return; }
  const car = state.garage.find(c => c.id === carId);
  if (!car) return;
  if (car.condition === 'A') { showToast('Car is already in excellent condition!', 'error'); return; }
  if (car.inServiceUntilDay) { showToast('Car is currently in service — wait until complete.', 'error'); return; }
  if (state.cash < 500) { showToast('Not enough cash for detailing ($500)!', 'error'); return; }
  state.cash -= 500;
  const idx = CONDITIONS.indexOf(car.condition);
  car.condition   = CONDITIONS[idx - 1];
  car.marketValue = Math.round(car.marketValue * 1.07);
  car.reconditionLog.push({ type: 'Detailing', day: state.day });
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
      state.usedMarketOffers = generateUsedMarket();
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
      const loaded = JSON.parse(e.target.result);
      // Run migration on import too
      state = loaded;
      loadState(); // re-runs migration logic via the same code path
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
  const totalProfit  = state.salesHistory.reduce((s, h) => s + h.profit, 0);
  const forSaleCount = state.garage.filter(c => c.isForSale).length;
  const pendingOffers = state.customerOffers.filter(o => o.state === 'pending').length;
  const pendingTIR    = state.tradeInRequests.filter(r => r.state === 'pending').length;
  const inService     = state.garage.filter(c => c.inServiceUntilDay).length;

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
        <div class="stat-row"><span>In Service</span><strong>${inService}</strong></div>
        <div class="stat-row"><span>Pending Deliveries</span><strong>${state.deliveries.length}</strong></div>
        <div class="stat-row"><span>Customer Offers</span>
          <strong ${pendingOffers > 0 ? 'class="text-green"' : ''}>${pendingOffers}</strong></div>
        <div class="stat-row"><span>Trade-In Requests</span>
          <strong ${pendingTIR > 0 ? 'class="text-green"' : ''}>${pendingTIR}</strong></div>
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

  let html = `<div class="tab-info">🏭 Factory prices are fixed — no negotiation. Cars arrive in a few days.</div>`;
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
// RENDER — Used Market
// ============================================================
function renderUsedMarket() {
  const el = document.getElementById('tab-usedmarket');
  const inspectCost = state.upgrades.inspectionTool ? 150 : 300;
  const garageFull  = state.garage.length >= state.garageSlots;

  if (!state.usedMarketOffers.length) {
    el.innerHTML = `<div class="empty-state">
      <p>No used cars available today. Press <strong>Next Day</strong> to generate new listings.</p></div>`;
    return;
  }

  const cards = state.usedMarketOffers.map(offer => {
    const issuesHtml = offer.inspected
      ? (offer.hiddenIssues.length === 0
          ? '<p class="text-green" style="font-size:.82rem">✅ No hidden issues found!</p>'
          : offer.hiddenIssues.map(i =>
              `<span class="issue-tag">⚠️ ${i.name} (${formatCurrency(i.cost)})</span>`).join(''))
      : '<p class="text-muted" style="font-size:.82rem">🔍 Unknown — inspect to reveal issues</p>';

    const asking        = offer.askingPrice;
    const counterPrice  = offer.sellerCounter ?? null;
    const displayPrice  = counterPrice ?? asking;
    const canAccept     = !garageFull && state.cash >= displayPrice;
    const canInspect    = !offer.inspected && state.cash >= inspectCost;
    const negState      = offer.negotiationState;

    let negotiationHtml = '';
    if (negState === 'countered' && counterPrice) {
      negotiationHtml = `
        <div class="neg-status neg-countered">
          💬 Seller countered: <strong>${formatCurrency(counterPrice)}</strong>
          <div class="car-actions" style="margin-top:8px">
            <button class="btn btn-success" onclick="acceptUsedOffer('${offer.id}')" ${canAccept ? '' : 'disabled'}>
              ✅ Accept ${formatCurrency(counterPrice)}
            </button>
          </div>
          <div class="neg-input-row" style="margin-top:8px">
            <input type="number" class="price-input" id="neg-${offer.id}" placeholder="Your counter offer" min="1" value="${offer.playerOffer || ''}">
            <button class="btn btn-warning" onclick="submitUsedOffer('${offer.id}', document.getElementById('neg-${offer.id}').value)"
              ${offer.patience > 0 ? '' : 'disabled'} title="${offer.patience === 0 ? 'No more rounds' : ''}">
              Counter
            </button>
          </div>
        </div>`;
    } else if (!negState) {
      // Initial offer UI
      negotiationHtml = `
        <div class="neg-input-row">
          <input type="number" class="price-input" id="neg-${offer.id}" placeholder="Your offer" min="1">
          <button class="btn btn-warning" onclick="submitUsedOffer('${offer.id}', document.getElementById('neg-${offer.id}').value)">
            🤝 Negotiate
          </button>
        </div>`;
    }

    return `
      <div class="car-card tradein-card">
        <div class="car-card-header">
          <span class="car-name">${offer.year} ${offer.make} ${offer.model}</span>
          ${condBadge(offer.condition)}
        </div>
        <div class="car-details">
          <div class="detail-row"><span>Category</span><span>${offer.category}</span></div>
          <div class="detail-row"><span>Mileage</span><span>${offer.mileage.toLocaleString()} mi</span></div>
          <div class="detail-row"><span>Asking Price</span><span class="text-blue">${formatCurrency(asking)}</span></div>
          <div class="detail-row"><span>Est. Market Value</span><span class="text-green">${formatCurrency(offer.marketValue)}</span></div>
          ${offer.inspected ? `<div class="detail-row"><span>Repair Cost</span><span class="text-red">${formatCurrency(offer.repairCost)}</span></div>` : ''}
          ${offer.inspected ? `<div class="detail-row"><span>Net Margin</span>
            <span class="${offer.marketValue - offer.repairCost - displayPrice >= 0 ? 'text-green' : 'text-red'}">
              ${formatCurrency(offer.marketValue - offer.repairCost - displayPrice)}
            </span></div>` : ''}
        </div>
        <div class="issues-section">${issuesHtml}</div>
        ${negotiationHtml}
        <div class="car-actions">
          ${!offer.inspected
            ? `<button class="btn btn-secondary" onclick="inspectUsedOffer('${offer.id}')" ${canInspect ? '' : 'disabled'}>🔍 Inspect (${formatCurrency(inspectCost)})</button>`
            : ''}
          <button class="btn btn-success" onclick="acceptUsedOffer('${offer.id}')" ${canAccept ? '' : 'disabled'}>
            ✅ Buy ${formatCurrency(displayPrice)}
          </button>
          <button class="btn btn-danger" onclick="declineUsedOffer('${offer.id}')">❌ Pass</button>
        </div>
      </div>`;
  }).join('');

  el.innerHTML = `
    <div class="tab-info">
      🚗 ${state.usedMarketOffers.length} used car(s) available. Listings refresh each day.
      Garage: ${state.garage.length}/${state.garageSlots} slots.
      ${state.upgrades.negotiationTraining ? '🤝 Negotiation Training active — better deal outcomes.' : ''}
    </div>
    <div class="card-grid">${cards}</div>`;
}

// ============================================================
// RENDER — Trade-In Requests
// ============================================================
function renderTradeInRequests() {
  const el = document.getElementById('tab-tradeins');
  const listed = state.garage.filter(c => c.isForSale);

  if (!listed.length) {
    el.innerHTML = `<div class="empty-state">
      <p>You have no cars listed for sale. Customers can't make trade-in proposals unless you're selling something.<br>
      Go to <strong>Garage</strong> and mark cars for sale.</p></div>`;
    return;
  }

  const pending  = state.tradeInRequests.filter(r => r.state === 'pending');
  const countered = state.tradeInRequests.filter(r => r.state === 'countered');

  if (!pending.length && !countered.length) {
    el.innerHTML = `
      <div class="tab-info">🔔 No trade-in requests today. Customers will propose swaps on future days.</div>
      <div class="empty-state"><p>Check back after pressing <strong>Next Day</strong>.</p></div>`;
    return;
  }

  const renderRequest = req => {
    const targetCar = state.garage.find(c => c.id === req.targetCarId);
    if (!targetCar) return '';
    const cashDelta = req.counterCashDelta ?? req.cashDelta;
    const isCountered = req.state === 'countered';
    const netValueToYou = req.customerCarValue + cashDelta;
    const canAccept = cashDelta < 0 ? state.cash >= Math.abs(cashDelta) : true;
    const canFit    = state.garage.length < state.garageSlots || !targetCar; // we'll free a slot

    return `
      <div class="car-card tradein-request-card ${isCountered ? 'countered-card' : ''}">
        <div class="car-card-header">
          <span class="car-name">Trade-In Offer</span>
          <span class="badge ${isCountered ? 'badge-yellow' : 'badge-blue'}">${isCountered ? 'Countered — pending' : 'New Request'}</span>
        </div>
        <div class="tradein-split">
          <div class="tradein-half">
            <h5>🚗 Their Car</h5>
            <div class="detail-row"><span>Car</span><span>${req.customerCar.year} ${req.customerCar.make} ${req.customerCar.model}</span></div>
            <div class="detail-row"><span>Condition</span>${condBadge(req.customerCar.condition)}</div>
            <div class="detail-row"><span>Mileage</span><span>${req.customerCar.mileage.toLocaleString()} mi</span></div>
            <div class="detail-row"><span>Their Car Value</span><span class="text-green">${formatCurrency(req.customerCarValue)}</span></div>
          </div>
          <div class="tradein-half">
            <h5>🏷️ Your Car</h5>
            <div class="detail-row"><span>Car</span><span>${targetCar.year} ${targetCar.make} ${targetCar.model}</span></div>
            <div class="detail-row"><span>Listed Price</span><span class="text-blue">${formatCurrency(targetCar.listPrice)}</span></div>
          </div>
        </div>
        <div class="tradein-summary">
          <div class="detail-row">
            <span>${cashDelta >= 0 ? 'Customer Pays Extra' : 'You Pay Extra'}</span>
            <span class="${cashDelta >= 0 ? 'text-green' : 'text-red'}">${cashDelta >= 0 ? '+' : ''}${formatCurrency(cashDelta)}</span>
          </div>
          <div class="detail-row">
            <span>Net Value to You</span>
            <span class="${netValueToYou >= targetCar.listPrice * 0.85 ? 'text-green' : 'text-yellow'}">${formatCurrency(netValueToYou)}</span>
          </div>
          <div class="detail-row"><span>Your Car's Cost</span><span>${formatCurrency(targetCar.purchasePrice)}</span></div>
          ${isCountered ? `<p class="text-muted" style="font-size:.8rem;margin-top:6px">⏳ Counter sent — customer responds next day (Day ${req.expiresDay}).</p>` : ''}
        </div>
        ${!isCountered ? `
        <div class="neg-input-row" style="margin-top:4px">
          <label style="color:var(--text-muted);font-size:.82rem;white-space:nowrap">Counter cash:</label>
          <input type="number" class="price-input" id="tir-${req.id}" placeholder="${cashDelta >= 0 ? cashDelta : Math.abs(cashDelta)}" value="${cashDelta}">
          <button class="btn btn-warning" onclick="counterTradeInRequest('${req.id}', document.getElementById('tir-${req.id}').value)">
            Counter
          </button>
        </div>
        <div class="car-actions">
          <button class="btn btn-success" onclick="acceptTradeInRequest('${req.id}')" ${canAccept && canFit ? '' : 'disabled'}
            title="${!canFit ? 'Garage full after trade?' : !canAccept ? 'Need more cash' : ''}">
            ✅ Accept Deal
          </button>
          <button class="btn btn-danger" onclick="rejectTradeInRequest('${req.id}')">❌ Reject</button>
        </div>` : ''}
      </div>`;
  };

  el.innerHTML = `
    <div class="tab-info">
      🔄 ${pending.length} pending trade-in request(s). ${countered.length} awaiting customer response.
      ${state.upgrades.negotiationTraining ? '🤝 Negotiation Training active.' : ''}
    </div>
    <div class="card-grid">
      ${[...pending, ...countered].map(renderRequest).join('')}
    </div>`;
}

// ============================================================
// RENDER — Garage
// ============================================================
function renderGarage() {
  const el = document.getElementById('tab-garage');

  if (!state.garage.length) {
    el.innerHTML = `<div class="empty-state">
      <p>Your garage is empty. Order from the <strong>Factory</strong> tab or buy from <strong>Used Market</strong>.</p></div>`;
    return;
  }

  const cards = state.garage.map(car => {
    const inService = !!car.inServiceUntilDay;
    const issuesHtml = car.inspected
      ? (car.hiddenIssues.length === 0
          ? '<span class="text-green">✅ None</span>'
          : car.hiddenIssues.map(i => `<span class="issue-tag">⚠️ ${i.name}</span>`).join(''))
      : '<span class="text-muted">Unknown (not inspected)</span>';

    const saleChance = car.isForSale && car.listPrice > 0
      ? `${(computeSaleChance(car) * 100).toFixed(1)}% / day` : '—';

    // Reconditioning log badges
    const reconBadges = car.reconditionLog.length
      ? car.reconditionLog.map(r => {
          const icons = { 'Car Wash': '🚿', 'Detailing': '✨', 'Basic Repair': '🔩', 'Parts Upgrade': '🏎️' };
          return `<span class="recon-tag">${icons[r.type] || '🔧'} ${r.type}</span>`;
        }).join('')
      : '';

    // Reconditioning buttons
    const perfEligible = PERF_ELIGIBLE.includes(car.category);
    const perfDone     = car.reconditionLog.some(r => r.type === 'Parts Upgrade');
    let reconHtml = '';
    if (!inService) {
      reconHtml = `<div class="recon-actions">`;
      // Car Wash
      if (car.washBoostDays <= 0) {
        reconHtml += `<button class="btn btn-sm btn-secondary" onclick="carWash('${car.id}')"
          ${state.cash < 150 ? 'disabled' : ''} title="Instant: +3% value, boosted sale chance 3 days">🚿 Wash ($150)</button>`;
      } else {
        reconHtml += `<button class="btn btn-sm btn-secondary" disabled title="Wash boost active for ${car.washBoostDays} more day(s)">🚿 Washed (${car.washBoostDays}d)</button>`;
      }
      // Detailing
      if (state.upgrades.detailing && car.condition !== 'A') {
        reconHtml += `<button class="btn btn-sm btn-secondary" onclick="detailCar('${car.id}')"
          ${state.cash < 500 ? 'disabled' : ''} title="Instant: +1 condition tier, +7% value">✨ Detail ($500)</button>`;
      }
      // Basic Repair
      if (state.upgrades.serviceBay && car.condition !== 'A') {
        reconHtml += `<button class="btn btn-sm btn-secondary" onclick="basicRepair('${car.id}')"
          ${state.cash < 800 ? 'disabled' : ''} title="1 day: fixes issues, +1 condition tier, +10% value">🔩 Repair ($800)</button>`;
      }
      // Parts Upgrade
      if (state.upgrades.performanceShop && perfEligible && !perfDone) {
        reconHtml += `<button class="btn btn-sm btn-secondary" onclick="partsUpgrade('${car.id}')"
          ${state.cash < 1500 ? 'disabled' : ''} title="1 day: +15% market value">🏎️ Parts ($1,500)</button>`;
      }
      reconHtml += `</div>`;
    }

    return `
      <div class="car-card garage-card ${car.isForSale ? 'for-sale' : ''} ${inService ? 'in-service' : ''}">
        <div class="car-card-header">
          <span class="car-name">${car.year} ${car.make} ${car.model}</span>
          ${condBadge(car.condition)}
        </div>
        ${inService ? `<div class="service-banner">🔧 IN SERVICE — Ready Day ${car.inServiceUntilDay} (${car.pendingService?.type === 'repair' ? 'Basic Repair' : 'Parts Upgrade'})</div>` : ''}
        ${car.isForSale ? '<div class="for-sale-banner">🏷️ LISTED FOR SALE</div>' : ''}
        ${car.washBoostDays > 0 ? `<div class="wash-banner">🚿 Wash boost active (${car.washBoostDays} days left)</div>` : ''}
        <div class="car-details">
          <div class="detail-row"><span>Category</span><span>${car.category}</span></div>
          <div class="detail-row"><span>Mileage</span><span>${car.mileage.toLocaleString()} mi</span></div>
          <div class="detail-row"><span>Purchased For</span><span>${formatCurrency(car.purchasePrice)}</span></div>
          <div class="detail-row"><span>Market Value</span><span class="text-green">${formatCurrency(car.marketValue)}</span></div>
          <div class="detail-row"><span>Source</span><span>${car.source === 'factory' ? '🏭 Factory' : '🚗 Used Market'}</span></div>
          ${car.isForSale ? `<div class="detail-row"><span>Days on Lot</span><span>${car.daysInLot}</span></div>` : ''}
          ${car.isForSale ? `<div class="detail-row"><span>Sale Chance</span><span>${saleChance}</span></div>` : ''}
        </div>
        <div class="issues-row">Issues: ${issuesHtml}</div>
        ${reconBadges ? `<div class="recon-badges">${reconBadges}</div>` : ''}
        ${car.isForSale ? `
          <div class="price-input-row">
            <label>List Price:</label>
            <input type="number" class="price-input" value="${car.listPrice}" min="1"
              onchange="updateListPrice('${car.id}', this.value); renderGarage()">
          </div>` : ''}
        ${reconHtml}
        <div class="car-actions" style="margin-top:4px">
          <button class="btn ${car.isForSale ? 'btn-warning' : 'btn-primary'}"
            onclick="markForSale('${car.id}')" ${inService ? 'disabled' : ''}>
            ${car.isForSale ? '📤 Unlist' : '🏷️ Mark for Sale'}
          </button>
        </div>
      </div>`;
  }).join('');

  el.innerHTML = `
    <div class="tab-info">
      🏠 Garage: ${state.garage.length}/${state.garageSlots} slots.
      ${state.garage.filter(c => c.isForSale).length} listed for sale.
      ${state.garage.filter(c => c.inServiceUntilDay).length ? `🔧 ${state.garage.filter(c => c.inServiceUntilDay).length} in service.` : ''}
    </div>
    <div class="card-grid">${cards}</div>`;
}

// ============================================================
// RENDER — For Sale (includes Customer Offers section)
// ============================================================
function renderForSale() {
  const el     = document.getElementById('tab-forsale');
  const listed = state.garage.filter(c => c.isForSale);

  // Customer offers section
  const pendingOffers   = state.customerOffers.filter(o => o.state === 'pending');
  const counteredOffers = state.customerOffers.filter(o => o.state === 'countered');

  let offersHtml = '';
  if (pendingOffers.length || counteredOffers.length) {
    const offerCards = [...pendingOffers, ...counteredOffers].map(offer => {
      const car = state.garage.find(c => c.id === offer.carId);
      if (!car) return '';
      const isCountered = offer.state === 'countered';
      const estProfit   = offer.offeredPrice - Math.round(offer.offeredPrice * TRANSACTION_FEE) - car.purchasePrice;

      return `
        <div class="car-card offer-card ${isCountered ? 'countered-card' : ''}">
          <div class="car-card-header">
            <span class="car-name">${car.year} ${car.make} ${car.model}</span>
            <span class="badge ${isCountered ? 'badge-yellow' : 'badge-blue'}">${isCountered ? 'Countered' : 'Offer'}</span>
          </div>
          <div class="car-details">
            <div class="detail-row"><span>Customer Offers</span><span class="text-blue">${formatCurrency(offer.offeredPrice)}</span></div>
            <div class="detail-row"><span>Your List Price</span><span>${formatCurrency(car.listPrice)}</span></div>
            <div class="detail-row"><span>Discount</span><span class="text-red">${formatCurrency(offer.offeredPrice - car.listPrice)}</span></div>
            <div class="detail-row"><span>Est. Profit</span>
              <span class="${estProfit >= 0 ? 'text-green' : 'text-red'}">${estProfit >= 0 ? '+' : ''}${formatCurrency(estProfit)}</span>
            </div>
            ${isCountered ? `<div class="detail-row"><span>Your Counter</span><span>${formatCurrency(offer.playerCounter)}</span></div>` : ''}
          </div>
          ${isCountered
            ? `<p class="text-muted" style="font-size:.8rem;margin-top:4px">⏳ Waiting for customer response — resolves next day.</p>`
            : `<div class="neg-input-row" style="margin-top:6px">
                <input type="number" class="price-input" id="cof-${offer.id}"
                  placeholder="Counter price" value="${offer.playerCounter || ''}" min="1" max="${car.listPrice}">
                <button class="btn btn-warning" onclick="counterCustomerOffer('${offer.id}', document.getElementById('cof-${offer.id}').value)">
                  Counter
                </button>
              </div>
              <div class="car-actions" style="margin-top:8px">
                <button class="btn btn-success" onclick="acceptCustomerOffer('${offer.id}')">✅ Accept</button>
                <button class="btn btn-danger"  onclick="rejectCustomerOffer('${offer.id}')">❌ Reject</button>
              </div>`}
        </div>`;
    }).join('');

    offersHtml = `
      <div class="category-section">
        <h3>📬 Customer Offers (${pendingOffers.length} pending, ${counteredOffers.length} countered)</h3>
        <div class="card-grid">${offerCards}</div>
      </div>`;
  }

  if (!listed.length) {
    el.innerHTML = `
      ${offersHtml || ''}
      <div class="empty-state">
        <p>No cars are listed for sale. Go to <strong>Garage</strong> and click "Mark for Sale".</p></div>`;
    return;
  }

  const cards = listed.map(car => {
    const chance = car.listPrice > 0 ? (computeSaleChance(car) * 100).toFixed(1) : '0.0';
    const fee    = Math.round(car.listPrice * TRANSACTION_FEE);
    const profit = car.listPrice - fee - car.purchasePrice;
    const chanceClass = parseFloat(chance) >= 30 ? 'text-green' : parseFloat(chance) >= 15 ? 'text-yellow' : 'text-red';
    const reconBadges = car.reconditionLog.length
      ? car.reconditionLog.map(r => {
          const icons = { 'Car Wash': '🚿', 'Detailing': '✨', 'Basic Repair': '🔩', 'Parts Upgrade': '🏎️' };
          return `<span class="recon-tag">${icons[r.type] || '🔧'} ${r.type}</span>`;
        }).join('') : '';
    const hasOffer = state.customerOffers.some(o => o.carId === car.id);
    const hasTIR   = state.tradeInRequests.some(r => r.targetCarId === car.id && r.state === 'pending');

    return `
      <div class="car-card forsale-card ${hasOffer ? 'has-offer' : ''}">
        <div class="car-card-header">
          <span class="car-name">${car.year} ${car.make} ${car.model}</span>
          ${condBadge(car.condition)}
        </div>
        ${hasOffer ? '<div class="offer-banner">📬 Customer offer waiting (see above)</div>' : ''}
        ${hasTIR   ? '<div class="tradein-banner">🔄 Trade-in request waiting (see Trade-Ins tab)</div>' : ''}
        ${car.washBoostDays > 0 ? `<div class="wash-banner">🚿 Wash boost active (${car.washBoostDays} days)</div>` : ''}
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
        ${reconBadges ? `<div class="recon-badges">${reconBadges}</div>` : ''}
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
    ${offersHtml}
    <div class="category-section">
      <h3>🏷️ Your Listings (${listed.length})</h3>
      <div class="tab-info">
        Press <strong>Next Day</strong> to simulate customer visits. Auto-sales happen at list price; below-list offers appear above.
      </div>
      <div class="card-grid">${cards}</div>
    </div>`;
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
// RENDER — All
// ============================================================
function renderAll() {
  renderStats();
  const activeId = document.querySelector('.tab-panel.active')?.id;
  if (!activeId) return;
  switch (activeId.replace('tab-', '')) {
    case 'dashboard':   renderDashboard();       break;
    case 'factory':     renderFactory();         break;
    case 'usedmarket':  renderUsedMarket();      break;
    case 'tradeins':    renderTradeInRequests(); break;
    case 'garage':      renderGarage();          break;
    case 'forsale':     renderForSale();         break;
    case 'upgrades':    renderUpgrades();        break;
  }
}

// ============================================================
// TAB SWITCHING
// ============================================================
function switchTab(name) {
  document.querySelectorAll('.tab-btn').forEach(b => b.classList.toggle('active', b.dataset.tab === name));
  document.querySelectorAll('.tab-panel').forEach(p => p.classList.toggle('active', p.id === 'tab-' + name));
  switch (name) {
    case 'dashboard':   renderDashboard();       break;
    case 'factory':     renderFactory();         break;
    case 'usedmarket':  renderUsedMarket();      break;
    case 'tradeins':    renderTradeInRequests(); break;
    case 'garage':      renderGarage();          break;
    case 'forsale':     renderForSale();         break;
    case 'upgrades':    renderUpgrades();        break;
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
  if (!loadState()) {
    state.usedMarketOffers = generateUsedMarket();
    saveState();
  }

  document.querySelectorAll('.tab-btn').forEach(btn => {
    btn.addEventListener('click', () => switchTab(btn.dataset.tab));
  });

  document.getElementById('btn-next-day').addEventListener('click', nextDay);

  document.getElementById('modal-cancel').addEventListener('click', closeModal);
  document.getElementById('modal').addEventListener('click', e => {
    if (e.target === document.getElementById('modal')) closeModal();
  });

  document.getElementById('import-file').addEventListener('change', e => {
    if (e.target.files[0]) { importSave(e.target.files[0]); e.target.value = ''; }
  });

  // Expose functions for inline onclick handlers in dynamically rendered HTML
  Object.assign(window, {
    buyFromFactory,
    acceptUsedOffer, declineUsedOffer, inspectUsedOffer, submitUsedOffer,
    acceptTradeInRequest, rejectTradeInRequest, counterTradeInRequest,
    acceptCustomerOffer, rejectCustomerOffer, counterCustomerOffer,
    markForSale, updateListPrice, setListPriceMultiplier,
    buyUpgrade, detailCar, carWash, basicRepair, partsUpgrade,
    confirmNewGame, exportSave,
    renderGarage, renderForSale, renderUsedMarket, renderTradeInRequests,
  });

  renderAll();
}

init();

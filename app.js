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
  saveVersion: 8,
  cash: 25000,
  day: 1,
  reputation: 1.0,
  garage: [],
  garageSlots: 5,
  deliveries: [],
  usedMarketOffers: [],    // buy-used cars with negotiation (was tradeInOffers)
  tradeInRequests: [],     // customers proposing to swap their car for one of yours
  customerOffers: [],      // pending below-list-price offers on your listed cars
  staff: [],
  staffCandidates: [],
  staffActivity: [],
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
    staffOffice: false,
    crmSuite: false,
    aiPricing: false,
    luxuryLounge: false,
    financeOffice: false,
    creditLineBoost1: false,
    creditLineBoost2: false,
    creditLineBoost3: false,
    overheadReductions: 0,
    photoStudio: false,
    leaseManagement: false,
    factoryAllocation: false,
    reconditioningWorkshop: false,
  },
  salesHistory: [],
  notifications: [],
  // Market volatility indices per segment (1.0 = normal)
  marketIndices: {
    Economy: 1.0, Sedan: 1.0, SUV: 1.0,
    Truck: 1.0,   Sports: 1.0, Luxury: 1.0,
  },
  lastMarketEvent: null,
  loanBalance: 0,
  loanLimit: 60000,
  loanApr: 0.12,
  loanFrozen: false,
  missedPayments: 0,
  delinquencyLevel: 0,
  totalInterestPaid: 0,
  totalLoanDrawn: 0,
  totalLoanPaidDown: 0,
  bankruptcyCount: 0,
  lastLeaseReturnReport: null,
  consecutiveCleanSales: 0,
  lemonSales: 0,
  salvageProfitSales: 0,
  gameOver: false,
  lastBankruptcyReport: null,
  achievementsUnlocked: {},
  totalDetailsPerformed: 0,
  totalTradeInsAccepted: 0,
};

let state = JSON.parse(JSON.stringify(DEFAULT_STATE));

// ============================================================
// CONSTANTS
// ============================================================
const CONDITIONS = ['A', 'B', 'C', 'D'];
const CONDITION_NAMES  = { A: 'Excellent', B: 'Good', C: 'Fair', D: 'Poor' };
const CONDITION_FACTOR = { A: 1.20, B: 1.00, C: 0.78, D: 0.52 };
const CONDITION_VALUE  = { A: 1.05, B: 0.92, C: 0.75, D: 0.58 };
const TITLE_STATUSES = ['clean', 'rebuilt', 'salvage', 'lemon'];
const TITLE_LABELS = { clean: 'Clean', rebuilt: 'Rebuilt', salvage: 'Salvage', lemon: 'Lemon' };
const TITLE_VALUE_MULT = { clean: 1.00, rebuilt: 0.85, salvage: 0.67, lemon: 0.56 };
const TITLE_BUYER_MULT = { clean: 1.00, rebuilt: 0.90, salvage: 0.72, lemon: 0.58 };
const LIQUIDATION_MULT = { clean: 0.78, rebuilt: 0.68, salvage: 0.55, lemon: 0.45 };
const TRANSACTION_FEE  = 0.02;

const PERF_ELIGIBLE = ['Sports', 'SUV', 'Truck']; // categories eligible for parts upgrade

// Daily garage overhead costs by garage level
const OVERHEAD_BY_LEVEL = { 1: 300, 2: 600, 3: 1200, 4: 2100 };

// Random market event pool
const MARKET_EVENTS = [
  { msg: '⛽ Fuel prices spiked! SUV & Truck demand fell.',         effects: { SUV: -0.08, Truck: -0.12 } },
  { msg: '📱 Tech boom! Luxury demand surged.',                     effects: { Luxury: 0.10 } },
  { msg: '🏠 Economic anxiety. Economy cars in high demand.',       effects: { Economy: 0.09, Luxury: -0.06 } },
  { msg: '🚫 Supply chains eased. Factory inventory flooding in.',  effects: { Economy: -0.05, Sedan: -0.04 } },
  { msg: '🌧️ Bad weather season — AWD SUVs hot right now.',         effects: { SUV: 0.09, Sports: -0.04 } },
  { msg: '🎉 Summer driving season! Sports cars flying off lots.',   effects: { Sports: 0.10, Truck: 0.05 } },
  { msg: '📉 Used car bubble cooling. Values dropping across board.',effects: { Economy: -0.06, Sedan: -0.08, SUV: -0.05 } },
  { msg: '🔋 EV push eroding gasoline sedan demand.',               effects: { Sedan: -0.07, Economy: -0.05 } },
  { msg: '🏗️ Construction boom — trucks selling fast!',             effects: { Truck: 0.12 } },
  { msg: '💼 Corporate tax relief — luxury segment heating up.',    effects: { Luxury: 0.08, Sports: 0.06 } },
  { msg: '🌊 Hurricane season drives up truck demand.',             effects: { Truck: 0.07, SUV: 0.05 } },
  { msg: '🎓 Back-to-school rush — economy compacts in demand.',    effects: { Economy: 0.08 } },
  { msg: '💸 Interest rates rising — budget buyers rule the day.',  effects: { Economy: 0.10, Luxury: -0.09, Sports: -0.06 } },
];

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

const BRAND_WORDMARK_STYLES = {
  Toyota:         { family: '"Segoe UI", Tahoma, Geneva, Verdana, sans-serif', weight: 700, spacing: '0.02em', color: '#d71920' },
  Honda:          { family: '"Helvetica Neue", Arial, sans-serif',               weight: 700, spacing: '0.03em', color: '#d00000' },
  Chevrolet:      { family: '"Trebuchet MS", Arial, sans-serif',                 weight: 700, spacing: '0.02em', color: '#c28b00' },
  Ferrari:        { family: 'Georgia, "Times New Roman", serif',                 weight: 700, spacing: '0.05em', color: '#b70000' },
  Lamborghini:    { family: 'Impact, "Arial Black", sans-serif',                 weight: 700, spacing: '0.06em', color: '#c9a227' },
  Bugatti:        { family: '"Times New Roman", Georgia, serif',                 weight: 700, spacing: '0.08em', color: '#0b4da2' },
  McLaren:        { family: '"Segoe UI", "Helvetica Neue", Arial, sans-serif',   weight: 700, spacing: '0.05em', color: '#ff6a00' },
  Porsche:        { family: '"Arial Narrow", Arial, sans-serif',                 weight: 700, spacing: '0.09em', color: '#222' },
  BMW:            { family: '"Helvetica Neue", Arial, sans-serif',               weight: 700, spacing: '0.04em', color: '#1266d4' },
  'Mercedes-Benz':{ family: 'Georgia, "Times New Roman", serif',                 weight: 700, spacing: '0.03em', color: '#111827' },
  default:        { family: '"Segoe UI", Roboto, Arial, sans-serif',             weight: 700, spacing: '0.03em', color: '#334155' },
};

const STAFF_NAMES = ['Alex', 'Sam', 'Jordan', 'Taylor', 'Riley', 'Casey', 'Morgan', 'Parker', 'Jamie', 'Avery'];
const STAFF_BASE_WAGE = 220;
const STAFF_CANDIDATE_POOL_SIZE = 4;
const STAFF_SKILL_WAGE_MULTIPLIER = 2.4;
const STAFF_SPEED_WAGE_BONUS = 65;
const STAFF_MAX_BASE = 4;
const STAFF_MAX_WITH_CRM = 8;
const STAFF_NEGOTIATION_WEIGHT = 0.55;
const STAFF_SELLING_WEIGHT = 0.30;
const STAFF_CLOSE_RATIO_MIN = 0.45;
const STAFF_CLOSE_RATIO_MAX = 0.90;
const STAFF_MEDIUM_CONFIDENCE_BUFFER = 1.05;
const STAFF_ACTIVITY_MAX_ENTRIES = 120;
const SFX_MIN_GAIN = 0.0001;
const SFX_FLOOR_GAIN = 0.0002;
const SFX_VOLUME_SCALE = 0.28;
const SFX_ATTACK_SECONDS = 0.01;
const LOAN_TERMS = {
  normal: { limit: 60000, apr: 0.12, minPrincipalRate: 0 },
  hard:   { limit: 45000, apr: 0.18, minPrincipalRate: 0.01 },
};
const LEASE_STATUSES = ['none', 'available', 'active'];
const LEASE_TERM_DAYS = [60, 120, 180];
const LEASE_TERM_PROGRESS_CAP = 1.0;
const LEASE_DAY_TO_FLAVOR_MONTH_MULTIPLIER = 0.3; // Flavor-only mapping for UI text
const LEASE_CONDITION_DROP_ONE_STEP_MILES = 9000;
const LEASE_CONDITION_DROP_TWO_STEP_MILES = 18000;
const LEASE_MILES_VARIANCE_MIN = -8;
const LEASE_MILES_VARIANCE_MAX = 14;
const LEASE_DEPRECIATION_DIVISOR = 420000;
const LEASE_ISSUE_BONUS_HARD_DIFFICULTY = 0.0015;
const LEASE_ISSUE_BONUS_LEMON = 0.003;
const LEASE_ISSUE_BONUS_SALVAGE = 0.0015;
const MAX_LEASE_STARTS_PER_DAY = 2;
const LEASE_VALUE_SCORE_DIVISOR = 220000;
const LEASE_START_CHANCE_BASE = 0.05;
const LEASE_START_CHANCE_FACTOR = 0.16;
const LEASE_START_CHANCE_MIN = 0.04;
const LEASE_START_CHANCE_MAX = 0.30;
const LEASE_RATE_BY_SEGMENT = {
  // Monthly-equivalent rates as a fraction of market value — divided by 30 for daily payment.
  // Sports and Luxury intentionally higher: they attract premium lessees and carry more risk.
  normal: { Economy: 0.130, Sedan: 0.120, SUV: 0.120, Truck: 0.120, Sports: 0.150, Luxury: 0.140 },
  hard:   { Economy: 0.110, Sedan: 0.100, SUV: 0.100, Truck: 0.100, Sports: 0.120, Luxury: 0.120 },
};
const LEASE_MILES_PER_DAY = {
  Economy: [55, 110],
  Sedan: [50, 100],
  SUV: [45, 95],
  Truck: [45, 90],
  Sports: [35, 80],
  Luxury: [30, 75],
};
const DELINQUENCY_WARNING_LEVEL = 1;
const DELINQUENCY_DEFAULT_LEVEL = 2;
const DELINQUENCY_BANKRUPTCY_LEVEL = 3;
// SVG icon helper — returns a 28×28 SVG icon (stroke-based, matches blue theme)
function achSvg(pathD) {
  return `<svg xmlns="http://www.w3.org/2000/svg" width="28" height="28" viewBox="0 0 24 24"
    fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"
    class="ach-icon" aria-hidden="true">${pathD}</svg>`;
}
// UI icon helper — returns a 16×16 inline SVG icon for use in buttons, labels, and headings
function uiSvg(pathD, ariaLabel) {
  const ariaAttrs = ariaLabel
    ? `role="img" aria-label="${ariaLabel}"`
    : 'aria-hidden="true"';
  return `<svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24"
    fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"
    class="ui-icon" ${ariaAttrs}>${pathD}</svg>`;
}
// Larger UI icon (32px) for upgrade/feature cards
function uiSvgLg(pathD, ariaLabel) {
  const ariaAttrs = ariaLabel
    ? `role="img" aria-label="${ariaLabel}"`
    : 'aria-hidden="true"';
  return `<svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" viewBox="0 0 24 24"
    fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"
    class="ui-icon-lg" ${ariaAttrs}>${pathD}</svg>`;
}
const _P = {
  car:          '<rect x="1" y="3" width="15" height="13" rx="2"/><path d="M16 8h4l3 3v5h-7V8z"/><circle cx="5.5" cy="18.5" r="2.5"/><circle cx="18.5" cy="18.5" r="2.5"/>',
  chartBar:     '<line x1="18" y1="20" x2="18" y2="10"/><line x1="12" y1="20" x2="12" y2="4"/><line x1="6" y1="20" x2="6" y2="14"/>',
  factory:      '<rect x="2" y="6" width="20" height="16" rx="1"/><path d="M2 12h20"/><path d="M7 2v4"/><path d="M12 2v4"/><path d="M17 2v4"/>',
  key:          '<path d="M21 2l-2 2m-7.61 7.61a5.5 5.5 0 1 1-7.778 7.778 5.5 5.5 0 0 1 7.777-7.777zm0 0L15.5 7.5m0 0l3 3L22 7l-3-3m-3.5 3.5L19 4"/>',
  tag:          '<path d="M20.59 13.41l-7.17 7.17a2 2 0 0 1-2.83 0L2 12V2h10l8.59 8.59a2 2 0 0 1 0 2.82z"/><line x1="7" y1="7" x2="7.01" y2="7"/>',
  bank:         '<rect x="1" y="10" width="22" height="12" rx="1"/><line x1="1" y1="14" x2="23" y2="14"/><path d="M12 2l10 8H2l10-8z"/>',
  arrowUp:      '<line x1="12" y1="19" x2="12" y2="5"/><polyline points="5 12 12 5 19 12"/>',
  trophy:       '<path d="M6 9H4a2 2 0 0 0-2 2v0a2 2 0 0 0 2 2h2"/><path d="M18 9h2a2 2 0 0 1 2 2v0a2 2 0 0 1-2 2h-2"/><path d="M8 21h8"/><path d="M12 17v4"/><path d="M6 2h12v11a6 6 0 0 1-6 6 6 6 0 0 1-6-6V2z"/>',
  gear:         '<circle cx="12" cy="12" r="3"/><path d="M19.4 15a1.65 1.65 0 0 0 .33 1.82l.06.06a2 2 0 0 1-2.83 2.83l-.06-.06a1.65 1.65 0 0 0-1.82-.33 1.65 1.65 0 0 0-1 1.51V21a2 2 0 0 1-4 0v-.09A1.65 1.65 0 0 0 9 19.4a1.65 1.65 0 0 0-1.82.33l-.06.06a2 2 0 0 1-2.83-2.83l.06-.06A1.65 1.65 0 0 0 4.68 15a1.65 1.65 0 0 0-1.51-1H3a2 2 0 0 1 0-4h.09A1.65 1.65 0 0 0 4.6 9a1.65 1.65 0 0 0-.33-1.82l-.06-.06a2 2 0 0 1 2.83-2.83l.06.06A1.65 1.65 0 0 0 9 4.68a1.65 1.65 0 0 0 1-1.51V3a2 2 0 0 1 4 0v.09a1.65 1.65 0 0 0 1 1.51 1.65 1.65 0 0 0 1.82-.33l.06-.06a2 2 0 0 1 2.83 2.83l-.06.06A1.65 1.65 0 0 0 19.4 9a1.65 1.65 0 0 0 1.51 1H21a2 2 0 0 1 0 4h-.09a1.65 1.65 0 0 0-1.51 1z"/>',
  cash:         '<line x1="12" y1="1" x2="12" y2="23"/><path d="M17 5H9.5a3.5 3.5 0 0 0 0 7h5a3.5 3.5 0 0 1 0 7H6"/>',
  calendar:     '<rect x="3" y="4" width="18" height="18" rx="2" ry="2"/><line x1="16" y1="2" x2="16" y2="6"/><line x1="8" y1="2" x2="8" y2="6"/><line x1="3" y1="10" x2="21" y2="10"/>',
  home:         '<path d="M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z"/><polyline points="9 22 9 12 15 12 15 22"/>',
  document:     '<path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"/><polyline points="14 2 14 8 20 8"/><line x1="16" y1="13" x2="8" y2="13"/><line x1="16" y1="17" x2="8" y2="17"/>',
  star:         '<polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"/>',
  trendingUp:   '<polyline points="23 6 13.5 15.5 8.5 10.5 1 18"/><polyline points="17 6 23 6 23 12"/>',
  trendingDown: '<polyline points="23 18 13.5 8.5 8.5 13.5 1 6"/><polyline points="17 18 23 18 23 12"/>',
  arrowRight:   '<line x1="5" y1="12" x2="19" y2="12"/><polyline points="12 5 19 12 12 19"/>',
  warning:      '<path d="M10.29 3.86L1.82 18a2 2 0 0 0 1.71 3h16.94a2 2 0 0 0 1.71-3L13.71 3.86a2 2 0 0 0-3.42 0z"/><line x1="12" y1="9" x2="12" y2="13"/><line x1="12" y1="17" x2="12.01" y2="17"/>',
  check:        '<polyline points="20 6 9 17 4 12"/>',
  xIcon:        '<line x1="18" y1="6" x2="6" y2="18"/><line x1="6" y1="6" x2="18" y2="18"/>',
  ban:          '<circle cx="12" cy="12" r="10"/><line x1="4.93" y1="4.93" x2="19.07" y2="19.07"/>',
  bell:         '<path d="M18 8A6 6 0 0 0 6 8c0 7-3 9-3 9h18s-3-2-3-9"/><path d="M13.73 21a2 2 0 0 1-3.46 0"/>',
  package:      '<line x1="16.5" y1="9.4" x2="7.55" y2="4.24"/><path d="M21 16V8a2 2 0 0 0-1-1.73l-7-4a2 2 0 0 0-2 0l-7 4A2 2 0 0 0 3 8v8a2 2 0 0 0 1 1.73l7 4a2 2 0 0 0 2 0l7-4A2 2 0 0 0 21 16z"/><polyline points="3.29 7 12 12 20.71 7"/><line x1="12" y1="22" x2="12" y2="12"/>',
  money:        '<line x1="12" y1="1" x2="12" y2="23"/><path d="M17 5H9.5a3.5 3.5 0 0 0 0 7h5a3.5 3.5 0 0 1 0 7H6"/>',
  person:       '<path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"/><circle cx="12" cy="7" r="4"/>',
  trash:        '<polyline points="3 6 5 6 21 6"/><path d="M19 6l-1 14a2 2 0 0 1-2 2H8a2 2 0 0 1-2-2L5 6"/><path d="M10 11v6"/><path d="M14 11v6"/><path d="M9 6V4a1 1 0 0 1 1-1h4a1 1 0 0 1 1 1v2"/>',
  upload:       '<polyline points="16 16 12 12 8 16"/><line x1="12" y1="12" x2="12" y2="21"/><path d="M20.39 18.39A5 5 0 0 0 18 9h-1.26A8 8 0 1 0 3 16.3"/>',
  download:     '<polyline points="8 17 12 21 16 17"/><line x1="12" y1="12" x2="12" y2="21"/><path d="M20.88 18.09A5 5 0 0 0 18 9h-1.26A8 8 0 1 0 3 16.29"/>',
  search:       '<circle cx="11" cy="11" r="8"/><line x1="21" y1="21" x2="16.65" y2="16.65"/>',
  handshake:    '<path d="M18 11V6l-9 5-5-3v5l5 3 9-5z"/><path d="M3 11l5 3 9-5 4 2.5v5l-4-2.5-9 5-5-3V11z"/>',
  message:      '<path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z"/>',
  droplet:      '<path d="M12 2.69l5.66 5.66a8 8 0 1 1-11.31 0z"/>',
  sparkles:     '<path d="M12 3l1.5 3.5L17 8l-3.5 1.5L12 13l-1.5-3.5L7 8l3.5-1.5L12 3z"/><path d="M5 17l.5 1.5L7 19l-1.5.5L5 21l-.5-1.5L3 19l1.5-.5L5 17z"/><path d="M19 17l.5 1.5L21 19l-1.5.5L19 21l-.5-1.5L17 19l1.5-.5L19 17z"/>',
  wrench:       '<path d="M14.7 6.3a1 1 0 0 0 0 1.4l1.6 1.6a1 1 0 0 0 1.4 0l3.77-3.77a6 6 0 0 1-7.94 7.94l-6.91 6.91a2.12 2.12 0 0 1-3-3l6.91-6.91a6 6 0 0 1 7.94-7.94l-3.77 3.77z"/>',
  gauge:        '<path d="M12 2a10 10 0 0 1 10 10"/><path d="M12 2a10 10 0 0 0-10 10"/><circle cx="12" cy="12" r="2"/><path d="M12 14v4"/><path d="M8.5 8.5L10.5 10.5"/>',
  toolbox:      '<rect x="2" y="7" width="20" height="14" rx="2" ry="2"/><path d="M16 7V5a2 2 0 0 0-2-2h-4a2 2 0 0 0-2 2v2"/><line x1="12" y1="12" x2="12" y2="16"/><line x1="10" y1="14" x2="14" y2="14"/>',
  stop:         '<rect x="3" y="3" width="18" height="18" rx="2" ry="2"/>',
  fileText:     '<path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"/><polyline points="14 2 14 8 20 8"/><line x1="16" y1="13" x2="8" y2="13"/><line x1="16" y1="17" x2="8" y2="17"/>',
  refresh:      '<polyline points="17 1 21 5 17 9"/><path d="M3 11V9a4 4 0 0 1 4-4h14"/><polyline points="7 23 3 19 7 15"/><path d="M21 13v2a4 4 0 0 1-4 4H3"/>',
  inbox:        '<path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"/><polyline points="22 6 12 13 2 6"/>',
  palette:      '<circle cx="13.5" cy="6.5" r=".5"/><circle cx="17.5" cy="10.5" r=".5"/><circle cx="8.5" cy="7.5" r=".5"/><circle cx="6.5" cy="12.5" r=".5"/><path d="M12 2C6.5 2 2 6.5 2 12s4.5 10 10 10c.926 0 1.648-.746 1.648-1.688 0-.437-.18-.835-.437-1.125-.29-.289-.438-.652-.438-1.125a1.64 1.64 0 0 1 1.668-1.668h1.996c3.051 0 5.555-2.503 5.555-5.554C21.965 6.012 17.461 2 12 2z"/>',
  speaker:      '<polygon points="11 5 6 9 2 9 2 15 6 15 11 19 11 5"/><path d="M19.07 4.93a10 10 0 0 1 0 14.14"/><path d="M15.54 8.46a5 5 0 0 1 0 7.07"/>',
  clipboard:    '<path d="M16 4h2a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2H6a2 2 0 0 1-2-2V6a2 2 0 0 1 2-2h2"/><rect x="8" y="2" width="8" height="4" rx="1" ry="1"/>',
  dumbbell:     '<path d="M6.5 6.5h11"/><path d="M6.5 17.5h11"/><rect x="3" y="9" width="2" height="6" rx="1"/><rect x="19" y="9" width="2" height="6" rx="1"/><rect x="5" y="7" width="2" height="10" rx="1"/><rect x="17" y="7" width="2" height="10" rx="1"/>',
  building:     '<rect x="4" y="2" width="16" height="20" rx="1"/><path d="M9 22V12h6v10"/><path d="M8 7h2"/><path d="M14 7h2"/><path d="M8 11h2"/><path d="M14 11h2"/>',
  construction: '<rect x="2" y="10" width="20" height="11" rx="1"/><path d="M12 10V2"/><path d="M8 6l4-4 4 4"/>',
  megaphone:    '<path d="M3 11l15-8v16L3 11z"/><path d="M21 15.5A2.5 2.5 0 0 0 21 8.5"/><path d="M3 11v5"/>',
  book:         '<path d="M4 19.5A2.5 2.5 0 0 1 6.5 17H20"/><path d="M6.5 2H20v20H6.5A2.5 2.5 0 0 1 4 19.5v-15A2.5 2.5 0 0 1 6.5 2z"/>',
  brain:        '<path d="M9.5 2A2.5 2.5 0 0 1 12 4.5v15a2.5 2.5 0 0 1-4.96-.46 2.5 2.5 0 0 1-2.96-3.08 3 3 0 0 1-.34-5.58 2.5 2.5 0 0 1 1.32-4.24 2.5 2.5 0 0 1 4.44-1.14"/><path d="M14.5 2A2.5 2.5 0 0 0 12 4.5v15a2.5 2.5 0 0 0 4.96-.46 2.5 2.5 0 0 0 2.96-3.08 3 3 0 0 0 .34-5.58 2.5 2.5 0 0 0-1.32-4.24 2.5 2.5 0 0 0-4.44-1.14"/>',
  wine:         '<path d="M8 22h8"/><path d="M7 10h10"/><path d="M12 15v7"/><path d="M12 15A5 5 0 0 0 17 10V3H7v7a5 5 0 0 0 5 5z"/>',
  camera:       '<path d="M23 19a2 2 0 0 1-2 2H3a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h4l2-3h6l2 3h4a2 2 0 0 1 2 2z"/><circle cx="12" cy="13" r="4"/>',
  truck:        '<rect x="1" y="3" width="15" height="13" rx="1"/><path d="M16 8h4l3 3v5h-7V8z"/><circle cx="5.5" cy="18.5" r="2.5"/><circle cx="18.5" cy="18.5" r="2.5"/>',
  pillar:       '<rect x="4" y="2" width="3" height="20" rx="1"/><rect x="17" y="2" width="3" height="20" rx="1"/><rect x="2" y="2" width="20" height="4" rx="1"/><rect x="2" y="18" width="20" height="4" rx="1"/>',
  creditCard:   '<rect x="1" y="4" width="22" height="16" rx="2" ry="2"/><line x1="1" y1="10" x2="23" y2="10"/>',
  receipt:      '<path d="M3 3h18v18H3z"/><path d="M9 9h6"/><path d="M9 12h6"/><path d="M9 15h4"/><path d="M3 3v18l3-3 3 3 3-3 3 3 3-3V3"/>',
  layers:       '<polygon points="12 2 2 7 12 12 22 7 12 2"/><polyline points="2 17 12 22 22 17"/><polyline points="2 12 12 17 22 12"/>',
  info:         '<circle cx="12" cy="12" r="10"/><line x1="12" y1="8" x2="12" y2="12"/><line x1="12" y1="16" x2="12.01" y2="16"/>',
};
// Returns a 16px UI icon SVG by key
function uiIcon(key, ariaLabel) { return uiSvg(_P[key] || _P.info, ariaLabel); }
// Returns a 32px UI icon SVG by key
function uiIconLg(key, ariaLabel) { return uiSvgLg(_P[key] || _P.info, ariaLabel); }
// Map from upgrade icon emoji to icon key
const UPGRADE_ICON_MAP = {
  '🏗️': 'construction', '🏢': 'building', '🏭': 'factory', '📣': 'megaphone',
  '🔧': 'wrench', '🤝': 'handshake', '✨': 'sparkles', '🔩': 'wrench',
  '🏎️': 'gauge', '🚚': 'truck', '🧑‍💼': 'person', '📚': 'book',
  '🧠': 'brain', '🥂': 'wine', '🏦': 'bank', '💳': 'creditCard',
  '💳💳': 'creditCard', '🏛️': 'pillar', '📉': 'trendingDown', '📸': 'camera',
  '📝': 'document', '🛠️': 'toolbox', '⭐': 'star',
};
const ACH_ICONS = {
  star:       achSvg('<polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"/>'),
  handshake:  achSvg('<path d="M18 11V6l-9 5-5-3v5l5 3 9-5z"/><path d="M3 11l5 3 9-5 4 2.5v5l-4-2.5-9 5-5-3V11z"/>'),
  shield:     achSvg('<path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/>'),
  trophy:     achSvg('<path d="M6 9H4a2 2 0 0 0-2 2v0a2 2 0 0 0 2 2h2"/><path d="M18 9h2a2 2 0 0 1 2 2v0a2 2 0 0 1-2 2h-2"/><path d="M8 21h8"/><path d="M12 17v4"/><path d="M6 2h12v11a6 6 0 0 1-6 6 6 6 0 0 1-6-6V2z"/>'),
  zap:        achSvg('<polygon points="13 2 3 14 12 14 11 22 21 10 12 10 13 2"/>'),
  tag:        achSvg('<path d="M20.59 13.41l-7.17 7.17a2 2 0 0 1-2.83 0L2 12V2h10l8.59 8.59a2 2 0 0 1 0 2.82z"/><line x1="7" y1="7" x2="7.01" y2="7"/>'),
  wrench:     achSvg('<path d="M14.7 6.3a1 1 0 0 0 0 1.4l1.6 1.6a1 1 0 0 0 1.4 0l3.77-3.77a6 6 0 0 1-7.94 7.94l-6.91 6.91a2.12 2.12 0 0 1-3-3l6.91-6.91a6 6 0 0 1 7.94-7.94l-3.77 3.77z"/>'),
  dollar:     achSvg('<line x1="12" y1="1" x2="12" y2="23"/><path d="M17 5H9.5a3.5 3.5 0 0 0 0 7h5a3.5 3.5 0 0 1 0 7H6"/>'),
  trending:   achSvg('<polyline points="23 6 13.5 15.5 8.5 10.5 1 18"/><polyline points="17 6 23 6 23 12"/>'),
  car:        achSvg('<rect x="1" y="3" width="15" height="13" rx="2"/><path d="M16 8h4l3 3v5h-7V8z"/><circle cx="5.5" cy="18.5" r="2.5"/><circle cx="18.5" cy="18.5" r="2.5"/>'),
  repeat:     achSvg('<polyline points="17 1 21 5 17 9"/><path d="M3 11V9a4 4 0 0 1 4-4h14"/><polyline points="7 23 3 19 7 15"/><path d="M21 13v2a4 4 0 0 1-4 4H3"/>'),
  alert:      achSvg('<path d="M10.29 3.86L1.82 18a2 2 0 0 0 1.71 3h16.94a2 2 0 0 0 1.71-3L13.71 3.86a2 2 0 0 0-3.42 0z"/><line x1="12" y1="9" x2="12" y2="13"/><line x1="12" y1="17" x2="12.01" y2="17"/>'),
  flame:      achSvg('<path d="M8.5 14.5A2.5 2.5 0 0 0 11 12c0-1.38-.5-2-1-3-1.072-2.143-.224-4.054 2-6 .5 2.5 2 4.9 4 6.5 2 1.6 3 3.5 3 5.5a7 7 0 1 1-14 0c0-1.153.433-2.294 1-3a2.5 2.5 0 0 0 2.5 2.5z"/>'),
  award:      achSvg('<circle cx="12" cy="8" r="6"/><path d="M15.477 12.89 17 22l-5-3-5 3 1.523-9.11"/>'),
  lock:       achSvg('<rect x="3" y="11" width="18" height="11" rx="2" ry="2"/><path d="M7 11V7a5 5 0 0 1 10 0v4"/>'),
  unlock:     achSvg('<rect x="3" y="11" width="18" height="11" rx="2" ry="2"/><path d="M7 11V7a5 5 0 0 1 9.9-1"/>'),
  map:        achSvg('<polygon points="3 6 9 3 15 6 21 3 21 18 15 21 9 18 3 21 3 6"/><line x1="9" y1="3" x2="9" y2="18"/><line x1="15" y1="6" x2="15" y2="21"/>'),
  clock:      achSvg('<circle cx="12" cy="12" r="10"/><polyline points="12 6 12 12 16 14"/>'),
  creditcard: achSvg('<rect x="1" y="4" width="22" height="16" rx="2" ry="2"/><line x1="1" y1="10" x2="23" y2="10"/>'),
  layers:     achSvg('<polygon points="12 2 2 7 12 12 22 7 12 2"/><polyline points="2 17 12 22 22 17"/><polyline points="2 12 12 17 22 12"/>'),
  key:        achSvg('<path d="M21 2l-2 2m-7.61 7.61a5.5 5.5 0 1 1-7.778 7.778 5.5 5.5 0 0 1 7.777-7.777zm0 0L15.5 7.5m0 0l3 3L22 7l-3-3m-3.5 3.5L19 4"/>'),
};
const ACHIEVEMENTS = [
  { id: 'first_sale',          icon: ACH_ICONS.tag,        name: 'First Deal Done',        desc: 'Complete your first car sale.',
    check: s => (s.salesHistory || []).length >= 1, progress: s => Math.min(1, (s.salesHistory||[]).length) },
  { id: 'ten_sales',           icon: ACH_ICONS.star,       name: 'Dealership Regular',     desc: 'Sell 10 cars total.',
    check: s => (s.salesHistory || []).length >= 10, progress: s => (s.salesHistory||[]).length + '/10' },
  { id: 'fifty_sales',         icon: ACH_ICONS.trophy,     name: 'Volume Dealer',          desc: 'Sell 50 cars total.',
    check: s => (s.salesHistory || []).length >= 50, progress: s => (s.salesHistory||[]).length + '/50' },
  { id: 'hundred_sales',       icon: ACH_ICONS.award,      name: 'Century Club',           desc: 'Sell 100 cars. The lot never sleeps.',
    check: s => (s.salesHistory || []).length >= 100, progress: s => (s.salesHistory||[]).length + '/100' },
  { id: 'net_worth_100k',      icon: ACH_ICONS.dollar,     name: 'Six Figures',            desc: 'Reach $100,000 in cash.',
    check: s => (s.cash || 0) >= 100000, progress: s => formatCurrency(Math.min(s.cash||0, 100000)) + '/$100k' },
  { id: 'net_worth_500k',      icon: ACH_ICONS.trending,   name: 'Half a Million',         desc: 'Accumulate $500,000 in cash.',
    check: s => (s.cash || 0) >= 500000, progress: s => formatCurrency(Math.min(s.cash||0, 500000)) + '/$500k' },
  { id: 'net_worth_1m',        icon: ACH_ICONS.flame,      name: 'Millionaire Mogul',      desc: 'Hit $1,000,000 in cash. You made it.',
    check: s => (s.cash || 0) >= 1000000, progress: s => formatCurrency(Math.min(s.cash||0, 1000000)) + '/$1M' },
  { id: 'title_clean_start',   icon: ACH_ICONS.shield,     name: 'Flawless Paperwork',     desc: 'Sell your first clean-title car.',
    check: s => !!s.achievementsUnlocked?.title_clean_start || (s.salesHistory||[]).some(h => h.titleStatus === 'clean') },
  { id: 'title_clean_streak',  icon: ACH_ICONS.repeat,     name: 'Clean Sweep',            desc: 'Sell 5 clean-title cars in a row.',
    check: s => (s.consecutiveCleanSales || 0) >= 5, progress: s => (s.consecutiveCleanSales||0) + '/5' },
  { id: 'salvage_profit',      icon: ACH_ICONS.wrench,     name: 'Salvage Savant',         desc: 'Profit on a salvage-title sale.',
    check: s => (s.salvageProfitSales || 0) >= 1 },
  { id: 'lemonade_stand',      icon: ACH_ICONS.alert,      name: 'Lemon Vendor',           desc: 'Sell 3 lemon-title cars. Sweet and sour.',
    check: s => (s.lemonSales || 0) >= 3, progress: s => (s.lemonSales||0) + '/3' },
  { id: 'loan_interest_paid',  icon: ACH_ICONS.creditcard, name: 'Bank Relationship',      desc: 'Pay at least $2,500 in loan interest.',
    check: s => (s.totalInterestPaid || 0) >= 2500, progress: s => formatCurrency(Math.min(s.totalInterestPaid||0,2500)) + '/$2.5k' },
  { id: 'interest_enthusiast', icon: ACH_ICONS.dollar,     name: 'Interest Connoisseur',   desc: 'Pay $10,000 in total interest — you love the bank.',
    check: s => (s.totalInterestPaid || 0) >= 10000, progress: s => formatCurrency(Math.min(s.totalInterestPaid||0,10000)) + '/$10k' },
  { id: 'loan_debt_free',      icon: ACH_ICONS.unlock,     name: 'Debt-Free Dealer',       desc: 'Draw from the credit line, then pay it all off.',
    check: s => (s.totalLoanDrawn || 0) > 0 && Math.round(s.loanBalance || 0) <= 0 },
  { id: 'bankruptcy_survivor', icon: ACH_ICONS.flame,      name: 'Back From The Brink',    desc: 'Survive a bankruptcy and keep the doors open.',
    check: s => (s.bankruptcyCount || 0) > 0 && !s.gameOver },
  { id: 'first_upgrade',       icon: ACH_ICONS.layers,     name: 'Investing in the Future',desc: 'Purchase your first dealership upgrade.',
    check: s => Object.values(s.upgrades||{}).some(v => v === true || (typeof v === 'number' && v > 1)) },
  { id: 'garage_tier4',        icon: ACH_ICONS.map,        name: 'Mega Lot',               desc: 'Expand to Garage Tier 4 (35 slots).',
    check: s => (s.upgrades?.garageLevel || 1) >= 4 },
  { id: 'first_lease',         icon: ACH_ICONS.key,        name: 'Lease Launch',           desc: 'Get your first active lease.',
    check: s => (s.garage||[]).some(c => c.leaseStatus === 'active') || (s.salesHistory||[]).some(h => h.wasLease) },
  { id: 'five_leases',         icon: ACH_ICONS.repeat,     name: 'Fleet Manager',          desc: 'Run 5 simultaneous active leases.',
    check: s => (s.garage||[]).filter(c => c.leaseStatus === 'active').length >= 5,
    progress: s => (s.garage||[]).filter(c => c.leaseStatus === 'active').length + '/5' },
  { id: 'first_tradein',       icon: ACH_ICONS.car,        name: 'Swap Deal',              desc: 'Accept your first trade-in.',
    check: s => (s.salesHistory||[]).some(h => h.tradeInAccepted) || (s.garage||[]).some(c => c.source === 'tradein') },
  { id: 'five_tradeins',       icon: ACH_ICONS.handshake,  name: 'Trade-In Tycoon',        desc: 'Accept 5 trade-ins.',
    check: s => (s.totalTradeInsAccepted || 0) >= 5, progress: s => (s.totalTradeInsAccepted||0) + '/5' },
  { id: 'detail_ten',          icon: ACH_ICONS.star,       name: 'Detail Fanatic',         desc: 'Detail 10 cars in total.',
    check: s => (s.totalDetailsPerformed || 0) >= 10, progress: s => (s.totalDetailsPerformed||0) + '/10' },
  { id: 'luxury_seller',       icon: ACH_ICONS.award,      name: 'Luxury Lane',            desc: 'Sell 5 Luxury category cars.',
    check: s => (s.salesHistory||[]).filter(h => h.category === 'Luxury').length >= 5,
    progress: s => (s.salesHistory||[]).filter(h => h.category === 'Luxury').length + '/5' },
  { id: 'supercar_seller',     icon: ACH_ICONS.zap,        name: 'Supercar Broker',        desc: 'Sell a car worth over $500,000.',
    check: s => (s.salesHistory||[]).some(h => h.salePrice >= 500000) },
  { id: 'day_50',              icon: ACH_ICONS.clock,      name: 'Grind Begins',           desc: 'Reach Day 50.',
    check: s => (s.day || 1) >= 50, progress: s => Math.min(s.day||1, 50) + '/50' },
  { id: 'day_200',             icon: ACH_ICONS.map,        name: 'Long Haul',              desc: 'Keep the dealership running to Day 200.',
    check: s => (s.day || 1) >= 200, progress: s => Math.min(s.day||1, 200) + '/200' },
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
  {
    id: 'staffOffice', name: 'Staff Office', icon: '🧑‍💼', category: 'Management', cost: 28000,
    desc: 'Unlock hiring sales staff (Mode 2: staff suggest counters, you finalize).',
    requires: u => !u.staffOffice,
    apply: s => { s.upgrades.staffOffice = true; },
  },
  {
    id: 'crmSuite', name: 'CRM Suite', icon: '📚', category: 'Management', cost: 60000,
    desc: 'High-volume tools: bulk list/unlist and smarter staff suggestions (+1 patience to generated customer offers).',
    requires: u => u.staffOffice && !u.crmSuite,
    apply: s => { s.upgrades.crmSuite = true; },
  },
  {
    id: 'aiPricing', name: 'AI Pricing Terminal', icon: '🧠', category: 'Management', cost: 120000,
    desc: 'Late-game pricing support: improves chance of buyer accepting close counters.',
    requires: u => u.crmSuite && !u.aiPricing,
    apply: s => { s.upgrades.aiPricing = true; },
  },
  {
    id: 'luxuryLounge', name: 'Luxury Client Lounge', icon: '🥂', category: 'Marketing', cost: 180000,
    desc: 'Attracts high-value buyers for premium inventory and supercars.',
    requires: u => !u.luxuryLounge,
    apply: s => { s.upgrades.luxuryLounge = true; },
  },
  {
    id: 'financeOffice', name: 'Finance Office', icon: '🏦', category: 'Finance', cost: 22000,
    desc: 'Unlocks a dedicated finance desk: reduces loan APR by 1% and raises credit limit by $25,000.',
    requires: u => !u.financeOffice,
    apply: s => { s.upgrades.financeOffice = true; },
  },
  {
    id: 'creditLineBoost1', name: 'Credit Line Expansion I', icon: '💳', category: 'Finance', cost: 45000,
    desc: 'Negotiate a larger revolving credit facility: +$50,000 loan limit and −0.5% APR.',
    requires: u => u.financeOffice && !u.creditLineBoost1,
    apply: s => { s.upgrades.creditLineBoost1 = true; },
  },
  {
    id: 'creditLineBoost2', name: 'Credit Line Expansion II', icon: '💳💳', category: 'Finance', cost: 95000,
    desc: 'Secure institutional lending terms: +$100,000 loan limit and −0.5% APR.',
    requires: u => u.creditLineBoost1 && !u.creditLineBoost2,
    apply: s => { s.upgrades.creditLineBoost2 = true; },
  },
  {
    id: 'creditLineBoost3', name: 'Premium Credit Facility', icon: '🏛️', category: 'Finance', cost: 210000,
    desc: 'Elite floor-plan lending relationship: +$250,000 loan limit and −0.5% APR. Maximum available.',
    requires: u => u.creditLineBoost2 && !u.creditLineBoost3,
    apply: s => { s.upgrades.creditLineBoost3 = true; },
  },
  {
    id: 'overheadReduction', name: 'Cost Efficiency Program', icon: '📉', category: 'Finance', cost: 14000,
    desc: 'Streamlines operations — reduces daily overhead by $50/day. Stackable up to 3×.',
    requires: u => (u.overheadReductions || 0) < 3,
    apply: s => { s.upgrades.overheadReductions = (s.upgrades.overheadReductions || 0) + 1; },
  },
  {
    id: 'photoStudio', name: 'Photo Studio', icon: '📸', category: 'Marketing', cost: 9500,
    desc: 'Professional listing photos improve sale-chance by 10% for all listed cars.',
    requires: u => !u.photoStudio,
    apply: s => { s.upgrades.photoStudio = true; },
  },
  {
    id: 'leaseManagement', name: 'Lease Management System', icon: '📝', category: 'Leasing', cost: 16000,
    desc: 'Dedicated lease desk: increases daily lease payment rate by 8% and improves lease-signing probability.',
    requires: u => !u.leaseManagement,
    apply: s => { s.upgrades.leaseManagement = true; },
  },
  {
    id: 'factoryAllocation', name: 'Factory Allocation Program', icon: '🏭', category: 'Factory', cost: 35000,
    desc: 'Priority manufacturer relationship: factory delivery time −1 additional day, and access to rare high-trim allocations.',
    requires: u => u.expressDelivery && !u.factoryAllocation,
    apply: s => { s.upgrades.factoryAllocation = true; },
  },
  {
    id: 'reconditioningWorkshop', name: 'Reconditioning Workshop', icon: '🛠️', category: 'Reconditioning', cost: 25000,
    desc: 'Fully-equipped workshop: reduces in-service time for Basic Repair and Parts Upgrade from 1 day to same-day.',
    requires: u => u.serviceBay && !u.reconditioningWorkshop,
    apply: s => { s.upgrades.reconditioningWorkshop = true; },
  },
];

// ============================================================
// HELPERS
// ============================================================
const randomInt   = (min, max) => Math.floor(Math.random() * (max - min + 1)) + min;
const randomFloat = (min, max) => Math.random() * (max - min) + min;
const clamp       = (v, lo, hi) => Math.max(lo, Math.min(hi, v));
const lerp        = (a, b, t) => a + (b - a) * t;
const randomFrom  = arr => arr[Math.floor(Math.random() * arr.length)];
const formatCurrency = n => '$' + Math.round(n).toLocaleString();
const generateId  = () => Date.now().toString(36) + Math.random().toString(36).slice(2, 7);
let factorySelection = { make: null, model: null };

function getBrandWordmarkStyle(make) {
  return BRAND_WORDMARK_STYLES[make] || BRAND_WORDMARK_STYLES.default;
}

function renderBrandWordmark(make) {
  const style = getBrandWordmarkStyle(make);
  return `<span class="brand-wordmark"
    style="font-family:${style.family};font-weight:${style.weight};letter-spacing:${style.spacing};color:${style.color}"
    title="${make}">${make}</span>`;
}

function formatCarDisplayName(car) {
  const makeText = settings.showWordmarks ? '' : `${car.make} `;
  return `${car.year} ${makeText}${car.model}${car.trim ? ' ' + car.trim : ''}`;
}

function getBaseLoanTerms() {
  return LOAN_TERMS[settings.difficulty === 'hard' ? 'hard' : 'normal'];
}

function syncLoanTermsToDifficulty() {
  const terms = getBaseLoanTerms();
  if (state.loanBalance === undefined) state.loanBalance = 0;
  if (state.loanLimit === undefined) state.loanLimit = terms.limit;
  if (state.loanApr === undefined) state.loanApr = terms.apr;
  if ((state.delinquencyLevel || 0) < DELINQUENCY_DEFAULT_LEVEL) {
    // Base terms from difficulty, then stack upgrade bonuses
    let upgradeLimit = terms.limit;
    let upgradeApr   = terms.apr;
    if (state.upgrades?.financeOffice)    { upgradeLimit += 25000;  upgradeApr = Math.max(0.01, upgradeApr - 0.01); }
    if (state.upgrades?.creditLineBoost1) { upgradeLimit += 50000;  upgradeApr = Math.max(0.01, upgradeApr - 0.005); }
    if (state.upgrades?.creditLineBoost2) { upgradeLimit += 100000; upgradeApr = Math.max(0.01, upgradeApr - 0.005); }
    if (state.upgrades?.creditLineBoost3) { upgradeLimit += 250000; upgradeApr = Math.max(0.01, upgradeApr - 0.005); }
    state.loanLimit = upgradeLimit;
    state.loanApr   = upgradeApr;
  }
}

function pickTitleStatus(source, condition, mileage) {
  if (source === 'factory') return 'clean';
  const condRisk = { A: 0, B: 1, C: 2, D: 3 }[condition] ?? 1;
  const mileRisk = mileage > 140000 ? 3 : mileage > 95000 ? 2 : mileage > 60000 ? 1 : 0;
  const risk = condRisk + mileRisk;
  const weights = risk >= 5
    ? [0.52, 0.20, 0.18, 0.10]
    : risk >= 3
      ? [0.72, 0.15, 0.09, 0.04]
      : [0.88, 0.08, 0.03, 0.01];
  let roll = Math.random();
  for (let i = 0; i < TITLE_STATUSES.length; i++) {
    roll -= weights[i];
    if (roll <= 0) return TITLE_STATUSES[i];
  }
  return 'clean';
}

function ensureStaffCandidates() {
  if (!state.upgrades.staffOffice) return;
  if (!state.staffCandidates) state.staffCandidates = [];
  const takenNames = new Set([...(state.staff || []).map(s => s.name), ...state.staffCandidates.map(c => c.name)]);
  while (state.staffCandidates.length < STAFF_CANDIDATE_POOL_SIZE) {
    const negotiation = randomInt(45, 95);
    const selling     = randomInt(45, 95);
    const speed       = randomInt(1, 3);
    const baseName    = randomFrom(STAFF_NAMES);
    let name          = baseName;
    let suffix        = 2;
    while (takenNames.has(name)) {
      name = `${baseName} ${suffix++}`;
    }
    takenNames.add(name);
    const wage = STAFF_BASE_WAGE + Math.round((negotiation + selling) * STAFF_SKILL_WAGE_MULTIPLIER + speed * STAFF_SPEED_WAGE_BONUS);
    state.staffCandidates.push({
      id: generateId(),
      name,
      negotiation,
      selling,
      speed,
      wage,
    });
  }
}

function getTotalStaffWages() {
  return (state.staff || []).reduce((sum, s) => sum + s.wage, 0);
}

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
      if (!loaded.staff) loaded.staff = [];
      if (!loaded.staffCandidates) loaded.staffCandidates = [];
      if (!loaded.staffActivity) loaded.staffActivity = [];
      // Migrate upgrade keys
      if (!loaded.upgrades) loaded.upgrades = {};
      if (loaded.upgrades.serviceBay          === undefined) loaded.upgrades.serviceBay = false;
      if (loaded.upgrades.performanceShop     === undefined) loaded.upgrades.performanceShop = false;
      if (loaded.upgrades.negotiationTraining === undefined) loaded.upgrades.negotiationTraining = false;
      if (loaded.upgrades.staffOffice         === undefined) loaded.upgrades.staffOffice = false;
      if (loaded.upgrades.crmSuite            === undefined) loaded.upgrades.crmSuite = false;
      if (loaded.upgrades.aiPricing           === undefined) loaded.upgrades.aiPricing = false;
      if (loaded.upgrades.luxuryLounge        === undefined) loaded.upgrades.luxuryLounge = false;
      // v2 migration: add market indices + save version
      if (!loaded.saveVersion || loaded.saveVersion < 2) {
        loaded.saveVersion    = 2;
        loaded.marketIndices  = { ...DEFAULT_STATE.marketIndices };
        loaded.lastMarketEvent = null;
        // Patch customer offers to have buyerMax & patience if missing
        for (const o of loaded.customerOffers || []) {
          if (o.buyerMax  === undefined) o.buyerMax  = Math.round((o.offeredPrice ?? 0) * 1.10);
          if (o.patience  === undefined) o.patience  = 2;
        }
        if ((loaded.notifications || []).length === 0)
          loaded.notifications = [{ message: '📋 Save upgraded to v2 — overhead, market volatility & new car data added!', type: 'info', day: loaded.day ?? 1 }];
      }
      if (loaded.saveVersion < 3) {
        loaded.saveVersion = 3;
        if (!loaded.staff) loaded.staff = [];
        if (!loaded.staffCandidates) loaded.staffCandidates = [];
        if (!loaded.staffActivity) loaded.staffActivity = [];
        loaded.notifications = loaded.notifications || [];
        loaded.notifications.unshift({
          message: '🧾 Save upgraded to v3 — staff mode, sound settings, factory browser, and brand wordmarks enabled.',
          type: 'info',
          day: loaded.day ?? 1,
        });
      }
      if (loaded.saveVersion < 4) {
        loaded.saveVersion = 4;
        loaded.loanBalance = loaded.loanBalance ?? 0;
        loaded.loanLimit = loaded.loanLimit ?? LOAN_TERMS.normal.limit;
        loaded.loanApr = loaded.loanApr ?? LOAN_TERMS.normal.apr;
        loaded.loanFrozen = !!loaded.loanFrozen;
        loaded.missedPayments = loaded.missedPayments ?? 0;
        loaded.delinquencyLevel = loaded.delinquencyLevel ?? 0;
        loaded.totalInterestPaid = loaded.totalInterestPaid ?? 0;
        loaded.totalLoanDrawn = loaded.totalLoanDrawn ?? 0;
        loaded.totalLoanPaidDown = loaded.totalLoanPaidDown ?? 0;
        loaded.bankruptcyCount = loaded.bankruptcyCount ?? 0;
        loaded.consecutiveCleanSales = loaded.consecutiveCleanSales ?? 0;
        loaded.lemonSales = loaded.lemonSales ?? 0;
        loaded.salvageProfitSales = loaded.salvageProfitSales ?? 0;
        loaded.gameOver = !!loaded.gameOver;
        loaded.lastBankruptcyReport = loaded.lastBankruptcyReport ?? null;
        loaded.achievementsUnlocked = loaded.achievementsUnlocked || {};
        loaded.notifications = loaded.notifications || [];
        loaded.notifications.unshift({
          message: '🏦 Save upgraded to v4 — title status, loans, bankruptcy, and achievements added.',
          type: 'info',
          day: loaded.day ?? 1,
        });
      }
      if (loaded.saveVersion < 5) {
        loaded.saveVersion = 5;
        loaded.notifications = loaded.notifications || [];
        loaded.notifications.unshift({
          message: '📝 Save upgraded to v5 — leasing system enabled.',
          type: 'info',
          day: loaded.day ?? 1,
        });
      }
      if (loaded.saveVersion < 6) {
        loaded.saveVersion = 6;
        if (loaded.upgrades.financeOffice        === undefined) loaded.upgrades.financeOffice        = false;
        if (loaded.upgrades.overheadReductions   === undefined) loaded.upgrades.overheadReductions   = 0;
        if (loaded.upgrades.photoStudio          === undefined) loaded.upgrades.photoStudio          = false;
        if (loaded.upgrades.leaseManagement      === undefined) loaded.upgrades.leaseManagement      = false;
        if (loaded.upgrades.factoryAllocation    === undefined) loaded.upgrades.factoryAllocation    = false;
        if (loaded.upgrades.reconditioningWorkshop === undefined) loaded.upgrades.reconditioningWorkshop = false;
        loaded.totalDetailsPerformed = loaded.totalDetailsPerformed ?? 0;
        loaded.totalTradeInsAccepted = loaded.totalTradeInsAccepted ?? 0;
        loaded.notifications = loaded.notifications || [];
        loaded.notifications.unshift({
          message: '🔧 Save upgraded to v6 — achievements redesigned, new upgrades, detailing exploit fix.',
          type: 'info',
          day: loaded.day ?? 1,
        });
      }
      if (loaded.saveVersion < 7) {
        loaded.saveVersion = 7;
        // Init new credit-line upgrade flags
        if (loaded.upgrades.creditLineBoost1 === undefined) loaded.upgrades.creditLineBoost1 = false;
        if (loaded.upgrades.creditLineBoost2 === undefined) loaded.upgrades.creditLineBoost2 = false;
        if (loaded.upgrades.creditLineBoost3 === undefined) loaded.upgrades.creditLineBoost3 = false;
        // Soft-clamp extreme market indices so existing saves recover gracefully
        // (values outside 0.78–1.22 are pulled to that band; they'll continue to converge naturally)
        if (loaded.marketIndices) {
          for (const seg of Object.keys(loaded.marketIndices)) {
            loaded.marketIndices[seg] = clamp(loaded.marketIndices[seg], 0.78, 1.22);
          }
        }
        loaded.notifications = loaded.notifications || [];
        loaded.notifications.unshift({
          message: '📈 Save upgraded to v7 — new loan upgrades, expanded catalog, and market stability improvements.',
          type: 'info',
          day: loaded.day ?? 1,
        });
      }
      if (loaded.saveVersion < 8) {
        loaded.saveVersion = 8;
        // Recalculate paymentPerDay for all active leases using the updated rates.
        const diffKey = settings.difficulty === 'hard' ? 'hard' : 'normal';
        for (const car of loaded.garage || []) {
          if (car.leaseStatus === 'active' && car.activeLease) {
            const rate = LEASE_RATE_BY_SEGMENT[diffKey][car.category] ?? LEASE_RATE_BY_SEGMENT[diffKey].Sedan;
            const base = Math.max(75, Math.round((car.marketValue * rate) / 30));
            car.activeLease.paymentPerDay = loaded.upgrades.leaseManagement ? Math.round(base * 1.08) : base;
          }
        }
        loaded.notifications = loaded.notifications || [];
        loaded.notifications.unshift({
          message: '🚗 Save upgraded to v8 — lease payment rates rebalanced; active leases updated to new rates.',
          type: 'info',
          day: loaded.day ?? 1,
        });
      }
      loaded.loanBalance = loaded.loanBalance ?? 0;
      loaded.loanLimit = loaded.loanLimit ?? getBaseLoanTerms().limit;
      loaded.loanApr = loaded.loanApr ?? getBaseLoanTerms().apr;
      loaded.loanFrozen = !!loaded.loanFrozen;
      loaded.missedPayments = loaded.missedPayments ?? 0;
      loaded.delinquencyLevel = loaded.delinquencyLevel ?? 0;
      loaded.totalInterestPaid = loaded.totalInterestPaid ?? 0;
      loaded.totalLoanDrawn = loaded.totalLoanDrawn ?? 0;
      loaded.totalLoanPaidDown = loaded.totalLoanPaidDown ?? 0;
      loaded.bankruptcyCount = loaded.bankruptcyCount ?? 0;
      loaded.lastLeaseReturnReport = loaded.lastLeaseReturnReport ?? null;
      loaded.consecutiveCleanSales = loaded.consecutiveCleanSales ?? 0;
      loaded.lemonSales = loaded.lemonSales ?? 0;
      loaded.salvageProfitSales = loaded.salvageProfitSales ?? 0;
      loaded.gameOver = !!loaded.gameOver;
      loaded.lastBankruptcyReport = loaded.lastBankruptcyReport ?? null;
      loaded.achievementsUnlocked = loaded.achievementsUnlocked || {};
      loaded.totalDetailsPerformed = loaded.totalDetailsPerformed ?? 0;
      loaded.totalTradeInsAccepted = loaded.totalTradeInsAccepted ?? 0;
      if (loaded.upgrades.financeOffice          === undefined) loaded.upgrades.financeOffice          = false;
      if (loaded.upgrades.creditLineBoost1       === undefined) loaded.upgrades.creditLineBoost1       = false;
      if (loaded.upgrades.creditLineBoost2       === undefined) loaded.upgrades.creditLineBoost2       = false;
      if (loaded.upgrades.creditLineBoost3       === undefined) loaded.upgrades.creditLineBoost3       = false;
      if (loaded.upgrades.overheadReductions     === undefined) loaded.upgrades.overheadReductions     = 0;
      if (loaded.upgrades.photoStudio            === undefined) loaded.upgrades.photoStudio            = false;
      if (loaded.upgrades.leaseManagement        === undefined) loaded.upgrades.leaseManagement        = false;
      if (loaded.upgrades.factoryAllocation      === undefined) loaded.upgrades.factoryAllocation      = false;
      if (loaded.upgrades.reconditioningWorkshop === undefined) loaded.upgrades.reconditioningWorkshop = false;
      // Migrate car objects
      for (const car of loaded.garage || []) migrateCar(car);
      for (const d of loaded.deliveries || []) migrateCar(d.car);
      for (const o of loaded.usedMarketOffers || []) migrateCar(o);
      for (const req of loaded.tradeInRequests || []) migrateCar(req.customerCar);
      for (const sold of loaded.salesHistory || []) migrateCar(sold);
      state = loaded;
      syncLoanTermsToDifficulty();
      return true;
    }
  } catch (_) {}
  return false;
}

function migrateCar(car) {
  if (!car) return;
  if (car.inServiceUntilDay  === undefined) car.inServiceUntilDay  = null;
  if (car.pendingService     === undefined) car.pendingService     = null;
  if (car.reconditionLog     === undefined) car.reconditionLog     = [];
  if (car.washBoostDays      === undefined) car.washBoostDays      = 0;
  if (car.leaseStatus        === undefined) car.leaseStatus        = 'none';
  if (!LEASE_STATUSES.includes(car.leaseStatus)) car.leaseStatus   = 'none';
  if (car.activeLease        === undefined) car.activeLease        = null;
  if (car.leaseStatus === 'active' && !car.activeLease) car.leaseStatus = 'none';
  if (car.trim               === undefined) car.trim               = '';
  if (!TITLE_STATUSES.includes(car.titleStatus)) car.titleStatus   = 'clean';
  if (car.hasBeenDetailed    === undefined) car.hasBeenDetailed    = car.reconditionLog.some(r => r.type === 'Detailing');
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
  // Factory cars are always 2026 with near-zero miles
  const year    = source === 'factory' ? 2026 : randomInt(entry.yearRange[0], entry.yearRange[1]);
  const mileage = source === 'factory' ? randomInt(5, 50) : randomInt(entry.baseMileage[0], entry.baseMileage[1]);
  const titleStatus = pickTitleStatus(source, condition, mileage);
  const issues  = inspected || source === 'factory' ? [] : genHiddenIssues(condition);
  const repairCost = issues.reduce((s, i) => s + i.cost, 0);
  // Apply current market index to base market value
  const marketIdx   = (state.marketIndices || {})[entry.category] ?? 1.0;
  const marketValue = Math.round(
    entry.marketValue * CONDITION_VALUE[condition] * TITLE_VALUE_MULT[titleStatus] * (1 - mileage / 700000) * marketIdx
  );
  return {
    id: generateId(),
    make: entry.make, model: entry.model, trim: entry.trim || '', year, category: entry.category,
    mileage, condition,
    titleStatus,
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
    leaseStatus: 'none',
    activeLease: null,
    hasBeenDetailed: false,
  };
}

/** Generate a fresh batch of Used Market offers (cars available to buy). */
function pickCatalogEntryForUsed() {
  const rep = state.reputation || 1;
  const weighted = CAR_CATALOG.map(entry => {
    const expensive = entry.marketValue >= 180000 ? 0.08 : entry.marketValue >= 90000 ? 0.35 : 1.0;
    const repBoost  = entry.marketValue >= 90000 ? clamp(0.5 + rep * 0.6, 0.5, 1.6) : 1.0;
    const weight    = (entry.usedWeight ?? 1) * expensive * repBoost;
    return { entry, weight };
  });
  const total = weighted.reduce((s, it) => s + it.weight, 0);
  let roll = Math.random() * total;
  for (const it of weighted) {
    roll -= it.weight;
    if (roll <= 0) return it.entry;
  }
  return randomFrom(CAR_CATALOG);
}

function generateUsedMarket() {
  const count = randomInt(4, 7);
  const offers = [];
  for (let i = 0; i < count; i++) {
    const entry     = pickCatalogEntryForUsed();
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
    const entry       = pickCatalogEntryForUsed();
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
    const titleBuyerMult = TITLE_BUYER_MULT[car.titleStatus] || 1.0;
    if (car.marketValue >= 90000 && (car.titleStatus === 'salvage' || car.titleStatus === 'lemon') && Math.random() < 0.75) continue;
    const chance = computeSaleChance(car);
    const luxuryBoost = state.upgrades.luxuryLounge && car.marketValue >= 90000 ? 0.14 : 0;
    // Offer probability is 1.5× sale chance (buyer haggles rather than pays full)
    if (Math.random() < Math.min(chance * 1.5 + luxuryBoost, 0.85)) {
      // Buyer has a hidden maximum they're willing to stretch to
      const buyerMax     = Math.round(car.listPrice * randomFloat(0.86, 0.99) * clamp(titleBuyerMult + 0.1, 0.65, 1.05));
      // Initial offer is below their max (they start low to leave room)
      const mult         = randomFloat(0.72, 0.97);
      const offeredPrice = Math.round(Math.min(buyerMax * 0.98, car.listPrice * mult));
      if (offeredPrice >= car.listPrice) continue; // would be auto-sold
      newOffers.push({
        id: generateId(),
        carId: car.id,
        offeredPrice,
        buyerMax,
        patience: randomInt(1, 3) + (state.upgrades.crmSuite ? 1 : 0),  // how many counter-rounds buyer will tolerate
        state: 'pending',
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
  const marketingFactor    = 1 + 0.20 * state.upgrades.marketing;
  const repBoostFactor     = 1 + 0.15 * state.upgrades.reputationBoosts;
  const repFactor          = state.reputation;
  const demandFactor       = car.demandFactor || 1;
  const washBonus          = car.washBoostDays > 0 ? 1.08 : 1.0;
  const titleFactor        = TITLE_BUYER_MULT[car.titleStatus] || 1.0;
  const photoStudioFactor  = state.upgrades.photoStudio ? 1.10 : 1.0;

  chance = chance * priceAtt * condFactor * lotFactor * marketingFactor * repFactor
         * repBoostFactor * demandFactor * washBonus * titleFactor * photoStudioFactor;
  return clamp(chance, 0.01, 0.85);
}

// ============================================================
// NEGOTIATION TONE HELPERS
// ============================================================
/** Returns tone text & CSS class based on seller's perspective of player's offer ratio. */
function getSellerTone(ratio, patience) {
  if (patience === 0) return { text: 'Final offer', cls: 'text-red' };
  if (ratio >= 0.96)  return { text: 'Very interested', cls: 'text-green' };
  if (ratio >= 0.88)  return { text: 'Interested', cls: 'text-yellow' };
  if (ratio >= 0.76)  return { text: 'Hesitant', cls: 'text-yellow' };
  if (ratio >= 0.65)  return { text: 'Offended', cls: 'text-red' };
  return { text: 'Insulted — likely to walk', cls: 'text-red' };
}

/** Returns tone text & CSS class based on buyer's offer relative to list price. */
function getBuyerTone(offeredPrice, listPrice, patience) {
  const ratio = offeredPrice / listPrice;
  if (patience === 0) return { text: 'Final offer', cls: 'text-red' };
  if (ratio >= 0.95)  return { text: 'Fair offer', cls: 'text-green' };
  if (ratio >= 0.87)  return { text: 'Reasonable', cls: 'text-yellow' };
  if (ratio >= 0.78)  return { text: 'Low offer', cls: 'text-yellow' };
  return { text: 'Lowball offer', cls: 'text-red' };
}

// ============================================================
// ECONOMY — Overhead, Market Volatility, Depreciation
// ============================================================

/** Deduct daily garage/staff/utility overhead from cash. */
function processOverhead() {
  const baseOverhead    = OVERHEAD_BY_LEVEL[state.upgrades.garageLevel] ?? 300;
  const reductionAmount = (state.upgrades.overheadReductions || 0) * 50;
  const diffMult        = (settings.difficulty === 'hard') ? 1.5 : 1.0;
  const staffWages      = getTotalStaffWages();
  const lotCost         = Math.max(0, Math.round(baseOverhead * diffMult) - reductionAmount);
  const total           = lotCost + staffWages;
  state.cash           -= total;
  addNote(`🏢 Overhead: −${formatCurrency(total)} (lot rent/utilities ${formatCurrency(lotCost)}${staffWages ? ` + wages ${formatCurrency(staffWages)}` : ''})`, 'warning');
}

function drawLoan(rawAmount) {
  if (state.gameOver) return;
  if (state.loanFrozen) { showToast('Credit line is frozen after default.', 'error'); return; }
  const amount = Math.round(parseFloat(rawAmount));
  if (isNaN(amount) || amount <= 0) { showToast('Enter a valid draw amount.', 'error'); return; }
  const available = Math.max(0, state.loanLimit - state.loanBalance);
  if (amount > available) { showToast(`Only ${formatCurrency(available)} available.`, 'error'); return; }
  state.loanBalance += amount;
  state.totalLoanDrawn += amount;
  state.cash += amount;
  addNote(`🏦 Drew ${formatCurrency(amount)} from credit line.`, 'info');
  runAchievementChecks();
  saveState();
  renderAll();
  showToast(`Loan draw: +${formatCurrency(amount)} cash.`, 'success');
}

function payDownLoan(rawAmount) {
  if (state.gameOver) return;
  if (state.loanBalance <= 0) { showToast('No outstanding balance.', 'error'); return; }
  const amount = Math.round(parseFloat(rawAmount));
  if (isNaN(amount) || amount <= 0) { showToast('Enter a valid payment amount.', 'error'); return; }
  if (state.cash < amount) { showToast('Not enough cash for that payment.', 'error'); return; }
  const paid = Math.min(amount, state.loanBalance);
  state.cash -= paid;
  state.loanBalance -= paid;
  state.totalLoanPaidDown += paid;
  if (state.loanBalance <= 0 && state.loanFrozen && state.delinquencyLevel < DELINQUENCY_DEFAULT_LEVEL) state.loanFrozen = false;
  addNote(`💳 Loan payment made: ${formatCurrency(paid)}.`, 'success');
  runAchievementChecks();
  saveState();
  renderAll();
}

function recordSaleStats(car, profit) {
  if (!car) return;
  const status = car.titleStatus || 'clean';
  if (status === 'clean') state.consecutiveCleanSales = (state.consecutiveCleanSales || 0) + 1;
  else state.consecutiveCleanSales = 0;
  if (status === 'lemon') state.lemonSales = (state.lemonSales || 0) + 1;
  if (status === 'salvage' && profit > 0) state.salvageProfitSales = (state.salvageProfitSales || 0) + 1;
}

function getLiquidationMultiplier(car) {
  return LIQUIDATION_MULT[car?.titleStatus] || LIQUIDATION_MULT.clean;
}

function getLeaseRate(car) {
  const diffKey = settings.difficulty === 'hard' ? 'hard' : 'normal';
  return LEASE_RATE_BY_SEGMENT[diffKey][car.category] ?? LEASE_RATE_BY_SEGMENT[diffKey].Sedan;
}

function computeLeasePaymentPerDay(car) {
  const base = Math.max(75, Math.round((car.marketValue * getLeaseRate(car)) / 30));
  return state.upgrades.leaseManagement ? Math.round(base * 1.08) : base;
}

function computeLeaseIncomePerDay() {
  return state.garage.reduce((sum, car) => {
    if (car.leaseStatus !== 'active' || !car.activeLease) return sum;
    return sum + (car.activeLease.paymentPerDay || 0);
  }, 0);
}

function downgradeConditionBySteps(condition, steps) {
  const idx = CONDITIONS.indexOf(condition);
  if (idx < 0) return condition;
  return CONDITIONS[Math.min(CONDITIONS.length - 1, idx + steps)];
}

function processLeases() {
  for (const car of state.garage) {
    if (car.leaseStatus !== 'active' || !car.activeLease) continue;
    const lease = car.activeLease;
    state.cash += lease.paymentPerDay;
    lease.totalPaid = (lease.totalPaid || 0) + lease.paymentPerDay;

    const milesDelta = Math.max(10, lease.milesPerDay + randomInt(LEASE_MILES_VARIANCE_MIN, LEASE_MILES_VARIANCE_MAX));
    car.mileage += milesDelta;
    lease.totalMilesAdded = (lease.totalMilesAdded || 0) + milesDelta;
    car.marketValue = Math.max(1000, Math.round(car.marketValue * (1 - (milesDelta / LEASE_DEPRECIATION_DIVISOR))));

    const termProgress = clamp((state.day - lease.startDay) / Math.max(1, lease.termDays), 0, LEASE_TERM_PROGRESS_CAP);
    const hardBonus = settings.difficulty === 'hard' ? LEASE_ISSUE_BONUS_HARD_DIFFICULTY : 0;
    const titleBonus = car.titleStatus === 'lemon' ? LEASE_ISSUE_BONUS_LEMON : car.titleStatus === 'salvage' ? LEASE_ISSUE_BONUS_SALVAGE : 0;
    const issueChance = clamp(0.001 + (termProgress * 0.007) + titleBonus + hardBonus, 0, 0.04);
    if (Math.random() < issueChance) {
      const issue = { ...randomFrom(HIDDEN_ISSUES) };
      lease.pendingIssues = lease.pendingIssues || [];
      if (!lease.pendingIssues.some(i => i.name === issue.name)) lease.pendingIssues.push(issue);
    }

    if (state.day >= lease.endDay) {
      const pendingIssues = lease.pendingIssues || [];
      for (const issue of pendingIssues) {
        if (!car.hiddenIssues.some(i => i.name === issue.name)) car.hiddenIssues.push(issue);
      }
      car.repairCost = car.hiddenIssues.reduce((s, i) => s + i.cost, 0);
      car.inspected = true;

      const before = car.condition;
      const steps = lease.totalMilesAdded >= LEASE_CONDITION_DROP_TWO_STEP_MILES
        ? 2
        : lease.totalMilesAdded >= LEASE_CONDITION_DROP_ONE_STEP_MILES ? 1 : 0;
      if (steps > 0) car.condition = downgradeConditionBySteps(car.condition, steps);

      const report = {
        day: state.day,
        carLabel: `${car.year} ${car.make} ${car.model}${car.trim ? ` ${car.trim}` : ''}`,
        incomeEarned: lease.totalPaid || 0,
        milesAdded: lease.totalMilesAdded || 0,
        issuesAdded: pendingIssues.map(i => i.name),
        conditionBefore: before,
        conditionAfter: car.condition,
      };
      state.lastLeaseReturnReport = report;
      addNote(
        `📄 Lease return: ${report.carLabel}. Income ${formatCurrency(report.incomeEarned)}, miles +${report.milesAdded.toLocaleString()}, issues ${report.issuesAdded.length}.`,
        report.issuesAdded.length ? 'warning' : 'info'
      );
      showModal(
        'Lease Return Report',
        `${report.carLabel}\nIncome: ${formatCurrency(report.incomeEarned)}\nMiles Added: ${report.milesAdded.toLocaleString()} mi\nCondition: ${report.conditionBefore} → ${report.conditionAfter}\nIssues Found: ${report.issuesAdded.length ? report.issuesAdded.join(', ') : 'None'}`,
        () => {}
      );
      car.leaseStatus = 'none';
      car.activeLease = null;
    }
  }

  let startedToday = 0;
  for (const car of state.garage) {
    if (startedToday >= MAX_LEASE_STARTS_PER_DAY) break;
    if (car.leaseStatus !== 'available' || car.inServiceUntilDay || car.isForSale) continue;
    const valueScore = clamp(1 - ((car.marketValue || 0) / LEASE_VALUE_SCORE_DIVISOR), 0.18, 0.95);
    const demand = clamp(car.demandFactor || 1, 0.7, 1.4);
    // Lease lead chance = base + (value-driven factor × demand), then clamped to keep pacing stable.
    const chance = clamp(
      LEASE_START_CHANCE_BASE + (LEASE_START_CHANCE_FACTOR * valueScore * demand),
      LEASE_START_CHANCE_MIN,
      LEASE_START_CHANCE_MAX
    );
    if (Math.random() >= chance) continue;

    const termDays = randomFrom(LEASE_TERM_DAYS);
    const milesRange = LEASE_MILES_PER_DAY[car.category] || LEASE_MILES_PER_DAY.Sedan;
    const milesPerDay = randomInt(milesRange[0], milesRange[1]);
    const paymentPerDay = computeLeasePaymentPerDay(car);
    car.leaseStatus = 'active';
    car.activeLease = {
      startDay: state.day,
      termDays,
      endDay: state.day + termDays,
      paymentPerDay,
      milesPerDay,
      totalPaid: 0,
      totalMilesAdded: 0,
      pendingIssues: [],
    };
    state.customerOffers = state.customerOffers.filter(o => o.carId !== car.id);
    state.tradeInRequests = state.tradeInRequests.filter(r => r.targetCarId !== car.id);
    startedToday++;
    addNote(`📝 Lease started: ${car.year} ${car.make} ${car.model} (${termDays}d) at ${formatCurrency(paymentPerDay)}/day.`, 'info');
  }
}

function processLoanAndDelinquency() {
  const terms = getBaseLoanTerms();
  let due = 0;
  if (state.loanBalance > 0) {
    const interest = Math.max(1, Math.round(state.loanBalance * state.loanApr / 365));
    state.cash -= interest;
    state.totalInterestPaid += interest;
    due += interest;
    addNote(`🏦 Loan interest charged: ${formatCurrency(interest)} at ${(state.loanApr * 100).toFixed(1)}% APR.`, 'warning');
    if (terms.minPrincipalRate > 0) {
      const principalDue = Math.max(250, Math.round(state.loanBalance * terms.minPrincipalRate));
      const paid = Math.max(0, Math.min(principalDue, state.cash >= 0 ? state.cash : 0, state.loanBalance));
      state.loanBalance -= paid;
      state.cash -= paid;
      due += principalDue;
      if (paid < principalDue) addNote(`⚠️ Minimum principal due ${formatCurrency(principalDue)} but only ${formatCurrency(paid)} was paid.`, 'warning');
      else addNote(`💳 Minimum principal paid: ${formatCurrency(paid)}.`, 'info');
    }
  }

  if (state.cash < 0 || (due > 0 && state.loanBalance > 0 && settings.difficulty === 'hard' && state.cash < 250)) {
    state.missedPayments = (state.missedPayments || 0) + 1;
    state.delinquencyLevel = Math.max(state.delinquencyLevel || 0, state.missedPayments);
    if (state.missedPayments === DELINQUENCY_WARNING_LEVEL) {
      addNote('⚠️ Delinquency warning: cash is negative after obligations.', 'warning');
      showToast('⚠️ Missed payment warning.', 'warning');
    } else if (state.missedPayments === DELINQUENCY_DEFAULT_LEVEL) {
      state.loanFrozen = true;
      state.loanApr += settings.difficulty === 'hard' ? 0.08 : 0.05;
      addNote(`🚫 Loan default: credit line frozen. APR raised to ${(state.loanApr * 100).toFixed(1)}%.`, 'error');
      showToast('🚫 Loan default. Credit line frozen.', 'error');
    } else if (state.missedPayments >= DELINQUENCY_BANKRUPTCY_LEVEL) {
      triggerBankruptcy();
    }
  } else if (state.missedPayments > 0) {
    state.missedPayments = 0;
    if (state.delinquencyLevel < DELINQUENCY_DEFAULT_LEVEL) state.loanFrozen = false;
    addNote('✅ Delinquency cleared — account back in good standing.', 'success');
  }
}

function triggerBankruptcy() {
  state.delinquencyLevel = DELINQUENCY_BANKRUPTCY_LEVEL;
  if (settings.difficulty === 'hard') {
    state.gameOver = true;
    addNote('💥 Bankruptcy on Hard mode. Game Over.', 'error');
    showModal('Game Over — Bankruptcy', 'Hard mode bankruptcy ends the run immediately.', () => {
      state = JSON.parse(JSON.stringify(DEFAULT_STATE));
      syncLoanTermsToDifficulty();
      state.usedMarketOffers = generateUsedMarket();
      saveState();
      renderAll();
      showToast('New game started after bankruptcy.', 'warning');
    });
    return;
  }

  const liquidationLog = [];
  const sortedCars = [...state.garage]
    .filter(car => !(car.leaseStatus === 'active' && car.activeLease))
    .sort((a, b) => b.marketValue - a.marketValue);
  for (const car of sortedCars) {
    if (state.cash >= 0) break;
    const salePrice = Math.max(500, Math.round(car.marketValue * getLiquidationMultiplier(car)));
    state.cash += salePrice;
    liquidationLog.push({
      carLabel: `${car.year} ${car.make} ${car.model}${car.trim ? ` ${car.trim}` : ''}`,
      titleStatus: car.titleStatus || 'clean',
      marketValue: car.marketValue,
      salePrice,
    });
    state.garage = state.garage.filter(c => c.id !== car.id);
    state.customerOffers = state.customerOffers.filter(o => o.carId !== car.id);
    state.tradeInRequests = state.tradeInRequests.filter(r => r.targetCarId !== car.id);
  }

  state.bankruptcyCount = (state.bankruptcyCount || 0) + 1;
  state.loanFrozen = true;
  state.loanLimit = Math.max(15000, Math.round(state.loanLimit * 0.75));
  state.loanApr = Math.max(state.loanApr, getBaseLoanTerms().apr + 0.06);
  state.reputation = Math.max(0.1, state.reputation - 0.2);
  state.lastBankruptcyReport = {
    day: state.day,
    cashAfter: state.cash,
    liquidated: liquidationLog,
    loanLimit: state.loanLimit,
    loanApr: state.loanApr,
  };
  state.missedPayments = 0;
  addNote(`💸 Bankruptcy liquidation executed: sold ${liquidationLog.length} car(s). Cash now ${formatCurrency(state.cash)}.`, 'error');
  showToast('💸 Bankruptcy liquidation completed. See Finance tab.', 'warning');
  runAchievementChecks();
}

/** Shift per-segment market indices and occasionally fire a market event. */
function processMarketVolatility() {
  const isHard = settings.difficulty === 'hard';
  const diffMultiplier = isHard ? 1.4 : 1.0;
  for (const seg of Object.keys(state.marketIndices)) {
    // Daily drift ±0–1.5% on Normal, ±0–2.1% on Hard (was ±2.5% on both)
    const drift = (Math.random() - 0.5) * 0.03 * diffMultiplier;
    // Mean reversion: gently pull index back toward 1.0 each day
    // Normal: 3% of the excess per day; Hard: 1.5% (slower reversion = more volatility)
    const reversionStrength = isHard ? 0.015 : 0.030;
    const reversion = (1.0 - state.marketIndices[seg]) * reversionStrength;
    state.marketIndices[seg] = clamp(state.marketIndices[seg] * (1 + drift) + reversion, 0.60, 1.50);
  }
  // Random market event — reduced frequency on Normal (5% vs 12% on Hard)
  const eventChance = isHard ? 0.12 : 0.05;
  if (Math.random() < eventChance) {
    const evt = randomFrom(MARKET_EVENTS);
    for (const [seg, delta] of Object.entries(evt.effects)) {
      if (state.marketIndices[seg] !== undefined) {
        state.marketIndices[seg] = clamp(state.marketIndices[seg] + delta * diffMultiplier, 0.60, 1.50);
      }
    }
    state.lastMarketEvent = evt.msg;
    addNote(`📊 Market Event: ${evt.msg}`, 'warning');
    showToast(`📊 ${evt.msg}`, 'warning');
  } else {
    state.lastMarketEvent = null;
  }
}

/** Apply market-driven value changes and sitting depreciation to all cars. */
function processMarketDepreciation() {
  for (const car of state.garage) {
    // Skip cars on active leases — their value is managed by processLeases depreciation
    if (car.leaseStatus === 'active' && car.activeLease) continue;

    const idx = state.marketIndices[car.category] ?? 1.0;

    // If the segment is below baseline, cars slowly lose value (partial daily adjustment)
    if (idx < 0.95) {
      const loss = car.marketValue * (0.95 - idx) * 0.18;
      car.marketValue = Math.max(1000, Math.round(car.marketValue - loss));
    } else if (idx > 1.05) {
      // Market is hot — value gains slightly
      const gain = car.marketValue * (idx - 1.05) * 0.08;
      car.marketValue = Math.round(car.marketValue + gain);
    }

    // Sitting depreciation for listed cars (buyers expect discounts on older stock)
    if (car.isForSale && !car.inServiceUntilDay && car.daysInLot > 7) {
      const rate = car.daysInLot > 14 ? 0.003 : 0.002;
      car.marketValue = Math.max(1000, Math.round(car.marketValue * (1 - rate)));
    }
  }
}

function addStaffActivity(message) {
  state.staffActivity.unshift({ day: state.day, message });
  if (state.staffActivity.length > STAFF_ACTIVITY_MAX_ENTRIES) state.staffActivity.pop();
}

function processStaffMode2Recommendations() {
  if (!state.staff?.length) return;
  const pending = state.customerOffers.filter(o => o.state === 'pending');
  if (!pending.length) return;
  const capacity = state.staff.reduce((sum, s) => sum + s.speed, 0);
  const maxActions = Math.min(pending.length, capacity);
  for (let i = 0; i < maxActions; i++) {
    const offer = pending[i];
    const car = state.garage.find(c => c.id === offer.carId);
    if (!car) continue;
    const staffer = state.staff[i % state.staff.length];
    // We intentionally keep combined weights < 1.0 so staff suggestions remain conservative (below full list pressure).
    const closeRatio = clamp(
      (staffer.negotiation / 100) * STAFF_NEGOTIATION_WEIGHT + (staffer.selling / 100) * STAFF_SELLING_WEIGHT,
      STAFF_CLOSE_RATIO_MIN,
      STAFF_CLOSE_RATIO_MAX
    );
    const target = Math.round(lerp(offer.offeredPrice, car.listPrice, closeRatio));
    const recommend = Math.min(car.listPrice, Math.max(offer.offeredPrice, target));
    const buyerMax = offer.buyerMax ?? car.listPrice;
    const confidence = recommend <= buyerMax ? 'High' : recommend <= buyerMax * STAFF_MEDIUM_CONFIDENCE_BUFFER ? 'Medium' : 'Low';
    offer.staffSuggestion = {
      by: staffer.name,
      counterPrice: recommend,
      confidence,
      note: offer.patience <= 1 ? 'Buyer patience is low — act soon.' : 'Likely to move closer tomorrow if rejected.',
    };
    addStaffActivity(`🧑‍💼 ${staffer.name} reviewed ${car.year} ${car.make} ${car.model}: suggest counter ${formatCurrency(recommend)} (${confidence} confidence).`);
  }
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
    if (!car.isForSale || car.listPrice <= 0 || car.inServiceUntilDay || (car.leaseStatus === 'active' && car.activeLease)) {
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
      recordSaleStats(car, profit);
      state.salesHistory.unshift({
        ...car, soldDay: state.day, salePrice: car.listPrice, fee, profit,
      });
      runAchievementChecks();
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
    if (offer.state !== 'countered' || offer.playerCounter === null) continue;
    const car = state.garage.find(c => c.id === offer.carId);
    if (!car) { toRemove.add(offer.id); continue; }

    const counter  = offer.playerCounter;
    const buyerMax = offer.buyerMax ?? Math.round(car.listPrice * 0.93);
    const negBonus = state.upgrades.negotiationTraining ? 0.06 : 0;
    const aiBonus  = state.upgrades.aiPricing ? 0.04 : 0;
    const ratio    = counter / buyerMax;

    if (ratio <= 1.0 + negBonus + aiBonus) {
      // Buyer accepts counter
      executeSale(offer, car, counter);
      addNote(`🤝 Counter accepted! ${car.year} ${car.make} ${car.model} sold for ${formatCurrency(counter)}.`, 'success');
      toRemove.add(offer.id);
    } else if (ratio <= 1.07 && Math.random() < 0.20) {
      // Rare: buyer stretches their budget
      executeSale(offer, car, counter);
      addNote(`🤝 Buyer stretched their budget! ${car.year} ${car.make} ${car.model} sold for ${formatCurrency(counter)}.`, 'success');
      toRemove.add(offer.id);
    } else if ((offer.patience ?? 0) > 0 && ratio < 1.30) {
      // Buyer counters back — moves toward player's counter by 35–55%
      const counterMovementRatio = randomFloat(0.35, 0.55);
      const newOffer    = Math.round(lerp(offer.offeredPrice, counter, counterMovementRatio));
      // Never exceed their actual max; never go below their previous offer
      offer.offeredPrice = Math.min(buyerMax, Math.max(offer.offeredPrice, newOffer));
      offer.patience     = (offer.patience ?? 1) - 1;
      offer.state        = 'pending';
      offer.playerCounter = null;
      addNote(`💬 Buyer countered on ${car.year} ${car.make} ${car.model}: ${formatCurrency(offer.offeredPrice)}.`, 'info');
    } else {
      // Buyer walks away
      addNote(`❌ Buyer walked away from ${car.year} ${car.make} ${car.model} — counter was too high.`, 'warning');
      toRemove.add(offer.id);
    }
  }
  state.customerOffers = state.customerOffers.filter(o => !toRemove.has(o.id));
}

/** Shared helper: execute a sale from an offer. */
function executeSale(offer, car, salePrice) {
  if (car.leaseStatus === 'active' && car.activeLease) return;
  const fee    = Math.round(salePrice * TRANSACTION_FEE);
  const profit = salePrice - fee - car.purchasePrice;
  state.cash  += salePrice - fee;
  state.reputation = profit > 0
    ? Math.min(state.reputation + 0.015, 2.0)
    : Math.max(state.reputation - 0.01, 0.1);
  recordSaleStats(car, profit);
  state.salesHistory.unshift({ ...car, soldDay: state.day, salePrice, fee, profit });
  runAchievementChecks();
  state.garage          = state.garage.filter(c => c.id !== car.id);
  state.tradeInRequests = state.tradeInRequests.filter(r => r.targetCarId !== car.id);
  state.customerOffers  = state.customerOffers.filter(o => o.carId !== car.id);
}

/** Resolve pending counters on trade-in requests. */
function resolveTradeInCounters() {
  const toRemove = new Set();
  for (const req of state.tradeInRequests) {
    if (req.state === 'countered' && req.counterCashDelta !== null) {
      const targetCar = state.garage.find(c => c.id === req.targetCarId);
      if (!targetCar) { toRemove.add(req.id); continue; }
      if (targetCar.leaseStatus === 'active' && targetCar.activeLease) {
        addNote(`❌ Trade-in counter expired for ${targetCar.year} ${targetCar.make} ${targetCar.model} because the car is leased.`, 'warning');
        toRemove.add(req.id);
        continue;
      }
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
  // Expire pending offers past their expiry day; keep countered items until they resolve next day
  state.customerOffers  = state.customerOffers.filter(
    o => o.state === 'countered' || o.expiresDay >= state.day
  );
  state.tradeInRequests = state.tradeInRequests.filter(
    r => r.state === 'countered' || r.expiresDay >= state.day
  );
}

function tickDaysInLot() {
  state.garage.forEach(c => { if (c.isForSale && !c.inServiceUntilDay) c.daysInLot++; });
}

function addNote(message, type = 'info') {
  state.notifications.unshift({ message, type, day: state.day });
  if (state.notifications.length > 60) state.notifications.pop();
}

function runAchievementChecks() {
  if (!state.achievementsUnlocked) state.achievementsUnlocked = {};
  for (const ach of ACHIEVEMENTS) {
    if (state.achievementsUnlocked[ach.id]) continue;
    if (!ach.check(state)) continue;
    state.achievementsUnlocked[ach.id] = state.day;
    addNote(`🏆 Achievement unlocked: ${ach.name}`, 'success');
    showToast(`🏆 ${ach.name}`, 'success');
  }
}

// ============================================================
// NEXT DAY — main entry
// ============================================================
function nextDay() {
  if (state.gameOver) { showToast('Game over — start a new game to continue.', 'error'); return; }
  state.day++;
  processDeliveries();
  processService();
  syncLoanTermsToDifficulty();
  processOverhead();          // daily lot/garage/staff costs
  processLoanAndDelinquency();// daily debt service and delinquency ladder
  processMarketVolatility();  // segment index drift + random events
  processMarketDepreciation();// value changes on inventory
  resolveCustomerOfferCounters();
  resolveTradeInCounters();
  expireOffers();
  processForSale();
  processLeases();
  tickDaysInLot();
  // Generate new offers for the new day
  state.usedMarketOffers = generateUsedMarket();
  const newTIR = generateTradeInRequests();
  state.tradeInRequests = [...state.tradeInRequests, ...newTIR];
  const newOffers = generateCustomerOffers();
  state.customerOffers = [...state.customerOffers, ...newOffers];
  processStaffMode2Recommendations();
  ensureStaffCandidates();
  runAchievementChecks();
  saveState();
  renderAll();
  const offerAlert = newOffers.length ? ` ${newOffers.length} offer(s) on your cars!` : '';
  const tradeAlert = newTIR.length   ? ` ${newTIR.length} trade-in request(s)!` : '';
  const leaseIncome = computeLeaseIncomePerDay();
  const leaseAlert = leaseIncome > 0 ? ` Active lease income/day: ${formatCurrency(leaseIncome)}.` : '';
  showToast(`Day ${state.day} — new used cars available!${offerAlert}${tradeAlert}${leaseAlert}`);
}

// ============================================================
// PLAYER ACTIONS — Factory
// ============================================================
function setFactoryMake(make) {
  factorySelection.make = make;
  factorySelection.model = null;
  renderFactory();
}

function setFactoryModel(model) {
  factorySelection.model = model;
  renderFactory();
}

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
  const days       = Math.max(1, entry.deliveryDays
    - (state.upgrades.expressDelivery ? 1 : 0)
    - (state.upgrades.factoryAllocation ? 1 : 0));
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

  const currentAsk = offer.sellerCounter ?? offer.askingPrice;
  if (amount >= currentAsk) {
    // Player just accepted the price — buy it
    acceptUsedOffer(offerId);
    return;
  }

  offer.playerOffer = amount;
  const ratio    = amount / offer.minAcceptPrice;
  const negBonus = state.upgrades.negotiationTraining ? 0.08 : 0;
  const repBonus = (state.reputation - 1) * 0.03;

  // Steeper acceptance curve: only close offers get accepted quickly
  // At 100% of minAccept → ~0.92; at 90% → ~0.56; at 80% → ~0.24; at 70% → ~0.07
  const base       = Math.pow(Math.max(0, ratio - 0.58) / 0.42, 2.2) * 0.90;
  const acceptProb = clamp(base + negBonus + repBonus, 0.01, 0.92);

  if (Math.random() < acceptProb) {
    // Seller accepts player's offer
    offer.sellerCounter    = amount;
    offer.negotiationState = 'accepted';
    showToast('✅ Seller accepted your offer!', 'success');
    acceptUsedOffer(offerId);
  } else if (ratio < 0.55 || offer.patience <= 0) {
    // Seller walks — offer too low or patience exhausted
    offer.negotiationState = 'declined';
    state.usedMarketOffers = state.usedMarketOffers.filter(o => o.id !== offerId);
    saveState();
    renderUsedMarket();
    showToast(offer.patience <= 0 ? 'Seller lost patience and walked away.' : 'Offer too low — seller walked away.', 'error');
  } else {
    // Seller counters: moves only 15–28% toward player's offer (stays close to asking)
    offer.patience--;
    const moveBias      = randomFloat(0.15, 0.28);
    const newCounter    = Math.round(currentAsk - (currentAsk - amount) * moveBias);
    offer.sellerCounter = Math.max(offer.minAcceptPrice, newCounter);
    offer.negotiationState = 'countered';
    saveState();
    renderUsedMarket();
    showToast(`Seller countered: ${formatCurrency(offer.sellerCounter)}`, 'warning');
  }
}

// ============================================================
// PLAYER ACTIONS — Trade-In Requests
// ============================================================
function acceptTradeInRequest(requestId) {
  const req = state.tradeInRequests.find(r => r.id === requestId);
  if (!req) return;
  const targetCar = state.garage.find(c => c.id === req.targetCarId);
  if (targetCar?.leaseStatus === 'active' && targetCar.activeLease) { showToast('Leased cars cannot be traded in until lease return.', 'error'); return; }
  const cashDelta = req.counterCashDelta ?? req.cashDelta;
  executeTradeIn(req, cashDelta);
  addNote(`🤝 Trade-in accepted! Got ${req.customerCar.year} ${req.customerCar.make} ${req.customerCar.model}.`, 'success');
  saveState();
  renderAll();
}

function rejectTradeInRequest(requestId) {
  state.tradeInRequests = state.tradeInRequests.filter(r => r.id !== requestId);
  saveState();
  renderForSale();
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
  renderForSale();
  showToast(`Counter sent — customer will respond next day.`, 'info');
}

/** Execute an accepted trade-in deal. */
function executeTradeIn(req, cashDelta) {
  const targetCar = state.garage.find(c => c.id === req.targetCarId);
  if (!targetCar) return;
  if (targetCar.leaseStatus === 'active' && targetCar.activeLease) return;

  // Apply cash delta: positive = customer pays us, negative = we pay customer
  state.cash += cashDelta;

  // Record the sale
  const salePrice = req.customerCarValue + cashDelta;
  const fee       = Math.round(Math.abs(salePrice) * TRANSACTION_FEE);
  state.cash -= fee;
  const profit    = salePrice - fee - targetCar.purchasePrice;
  recordSaleStats(targetCar, profit);
  state.salesHistory.unshift({
    ...targetCar, soldDay: state.day, salePrice, fee, profit,
    note: `Trade-in — received ${req.customerCar.year} ${req.customerCar.make} ${req.customerCar.model}`,
  });
  runAchievementChecks();

  // Remove sold car from garage + any pending offers
  state.garage = state.garage.filter(c => c.id !== req.targetCarId);
  state.customerOffers  = state.customerOffers.filter(o => o.carId !== req.targetCarId);
  state.tradeInRequests = state.tradeInRequests.filter(r => r.id !== req.id);

  // Add customer's car to inventory
  const newCar = { ...req.customerCar };
  newCar.purchasePrice = 0; // we acquired it through trade
  newCar.source = 'tradein';
  migrateCar(newCar);
  if (state.garage.length < state.garageSlots) {
    state.garage.push(newCar);
  } else {
    addNote(`⚠️ Trade-in car couldn't fit — garage full! Consider expanding.`, 'warning');
  }

  state.totalTradeInsAccepted = (state.totalTradeInsAccepted || 0) + 1;

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
  if (car.leaseStatus === 'active' && car.activeLease) { showToast('Leased cars cannot be sold until lease return.', 'error'); return; }
  const salePrice = offer.offeredPrice;
  executeSale(offer, car, salePrice);
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

function applyStaffSuggestion(offerId) {
  const offer = state.customerOffers.find(o => o.id === offerId);
  if (!offer?.staffSuggestion) return;
  counterCustomerOffer(offerId, offer.staffSuggestion.counterPrice);
  const shortId = (typeof offerId === 'string' && offerId.length > 4) ? offerId.slice(-4) : offerId;
  addStaffActivity(`📝 You approved ${offer.staffSuggestion.by}'s counter recommendation on offer ${shortId}.`);
}

function hireStaff(candidateId) {
  if (!state.upgrades.staffOffice) { showToast('Buy Staff Office first.', 'error'); return; }
  const candidate = state.staffCandidates.find(c => c.id === candidateId);
  if (!candidate) return;
  const maxStaff = state.upgrades.crmSuite ? STAFF_MAX_WITH_CRM : STAFF_MAX_BASE;
  if (state.staff.length >= maxStaff) { showToast(`Staff cap reached (${maxStaff}).`, 'error'); return; }
  state.staff.push(candidate);
  state.staffCandidates = state.staffCandidates.filter(c => c.id !== candidateId);
  addStaffActivity(`✅ Hired ${candidate.name} (Neg ${candidate.negotiation}, Sell ${candidate.selling}, Wage ${formatCurrency(candidate.wage)}/day).`);
  ensureStaffCandidates();
  saveState();
  renderAll();
  showToast(`${candidate.name} hired!`, 'success');
}

function dismissCandidate(candidateId) {
  state.staffCandidates = state.staffCandidates.filter(c => c.id !== candidateId);
  ensureStaffCandidates();
  saveState();
  renderUpgrades();
}

// ============================================================
// PLAYER ACTIONS — Listing / Pricing
// ============================================================
function markForSale(carId) {
  const car = state.garage.find(c => c.id === carId);
  if (!car) return;
  if (car.inServiceUntilDay) { showToast('Car is currently in service — wait until complete.', 'error'); return; }
  if (car.leaseStatus === 'active' && car.activeLease) { showToast('Leased cars cannot be listed or sold until lease return.', 'error'); return; }
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

function markAllForSale() {
  let changed = 0;
  for (const car of state.garage) {
    if (car.inServiceUntilDay || car.isForSale || (car.leaseStatus === 'active' && car.activeLease)) continue;
    car.isForSale = true;
    if (!car.listPrice) car.listPrice = car.marketValue;
    changed++;
  }
  saveState();
  renderAll();
  showToast(`Listed ${changed} car(s).`, 'success');
}

function unlistAllCars() {
  let changed = 0;
  for (const car of state.garage) {
    if (!car.isForSale) continue;
    car.isForSale = false;
    car.daysInLot = 0;
    changed++;
  }
  state.customerOffers = [];
  state.tradeInRequests = state.tradeInRequests.filter(r => r.state === 'countered');
  saveState();
  renderAll();
  showToast(`Unlisted ${changed} car(s).`, 'warning');
}

function bulkSetListing(mult) {
  let changed = 0;
  for (const car of state.garage) {
    if (!car.isForSale) continue;
    car.listPrice = Math.round(car.marketValue * mult);
    changed++;
  }
  saveState();
  renderForSale();
  showToast(`Updated ${changed} listing price(s).`, 'success');
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
  syncLoanTermsToDifficulty();   // recompute loan limit/APR after any upgrade
  if (upgradeId === 'staffOffice') ensureStaffCandidates();
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
  if (car.leaseStatus === 'active' && car.activeLease) { showToast('No recon actions allowed while lease is active.', 'error'); return; }
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
  if (car.leaseStatus === 'active' && car.activeLease) { showToast('No recon actions allowed while lease is active.', 'error'); return; }
  if (car.condition === 'A' || (car.condition === 'B' && car.hiddenIssues.length === 0)) {
    showToast('Car is in good condition — no major repairs needed!', 'error'); return;
  }
  if (car.inServiceUntilDay) { showToast('Car is already in service.', 'error'); return; }
  const cost = 800;
  if (state.cash < cost) { showToast(`Basic Repair costs ${formatCurrency(cost)} — not enough cash!`, 'error'); return; }
  state.cash -= cost;
  car.inServiceUntilDay = state.upgrades.reconditioningWorkshop ? state.day : state.day + 1;
  car.pendingService    = { type: 'repair' };
  car.isForSale         = false;
  addNote(`🔩 ${car.year} ${car.make} ${car.model} is in the service bay. ${state.upgrades.reconditioningWorkshop ? 'Ready same day.' : 'Ready next day.'}`, 'info');
  saveState();
  renderAll();
  showToast(`Car is being repaired — ${state.upgrades.reconditioningWorkshop ? 'ready same day' : 'ready next day'}.`, 'info');
}

function partsUpgrade(carId) {
  if (!state.upgrades.performanceShop) { showToast('You need the Performance Shop upgrade first!', 'error'); return; }
  const car = state.garage.find(c => c.id === carId);
  if (!car) return;
  if (car.leaseStatus === 'active' && car.activeLease) { showToast('No recon actions allowed while lease is active.', 'error'); return; }
  if (!PERF_ELIGIBLE.includes(car.category)) {
    showToast('Parts upgrades are only for Sports, SUV, and Truck vehicles.', 'error'); return;
  }
  if (car.inServiceUntilDay) { showToast('Car is already in service.', 'error'); return; }
  const perfAlreadyDone = car.reconditionLog.some(r => r.type === 'Parts Upgrade');
  if (perfAlreadyDone) { showToast('Parts upgrade already applied to this car!', 'error'); return; }
  const cost = 1500;
  if (state.cash < cost) { showToast(`Parts Upgrade costs ${formatCurrency(cost)} — not enough cash!`, 'error'); return; }
  state.cash -= cost;
  car.inServiceUntilDay = state.upgrades.reconditioningWorkshop ? state.day : state.day + 1;
  car.pendingService    = { type: 'parts' };
  car.isForSale         = false;
  addNote(`🏎️ ${car.year} ${car.make} ${car.model} is getting a performance upgrade. ${state.upgrades.reconditioningWorkshop ? 'Ready same day.' : 'Ready next day.'}`, 'info');
  saveState();
  renderAll();
  showToast(`Parts upgrade in progress — ${state.upgrades.reconditioningWorkshop ? 'ready same day' : 'ready next day'}.`, 'info');
}

function detailCar(carId) {
  if (!state.upgrades.detailing) { showToast('You need the Detailing Bay upgrade first!', 'error'); return; }
  const car = state.garage.find(c => c.id === carId);
  if (!car) return;
  if (car.leaseStatus === 'active' && car.activeLease) { showToast('No recon actions allowed while lease is active.', 'error'); return; }
  if (car.hasBeenDetailed) { showToast('This car has already been detailed — detailing can only be done once per ownership.', 'error'); return; }
  if (car.condition === 'A') { showToast('Car is already in excellent condition!', 'error'); return; }
  if (car.inServiceUntilDay) { showToast('Car is currently in service — wait until complete.', 'error'); return; }
  if (state.cash < 500) { showToast('Not enough cash for detailing ($500)!', 'error'); return; }
  state.cash -= 500;
  const idx = CONDITIONS.indexOf(car.condition);
  car.condition   = CONDITIONS[idx - 1];
  car.marketValue = Math.round(car.marketValue * 1.07);
  car.hasBeenDetailed = true;
  car.reconditionLog.push({ type: 'Detailing', day: state.day });
  state.totalDetailsPerformed = (state.totalDetailsPerformed || 0) + 1;
  addNote(`✨ Detailed ${car.year} ${car.make} ${car.model} → condition now ${car.condition}.`, 'success');
  saveState();
  renderAll();
}

function makeLeaseAvailable(carId) {
  const car = state.garage.find(c => c.id === carId);
  if (!car) return;
  if (car.inServiceUntilDay) { showToast('Car in service cannot be offered for lease.', 'error'); return; }
  if (car.leaseStatus === 'active' && car.activeLease) { showToast('Car is already on an active lease.', 'error'); return; }
  if (car.isForSale) { showToast('Unlist the car before offering lease.', 'error'); return; }
  car.leaseStatus = 'available';
  saveState();
  renderGarage();
}

function stopOfferingLease(carId) {
  const car = state.garage.find(c => c.id === carId);
  if (!car) return;
  if (car.leaseStatus !== 'available') return;
  car.leaseStatus = 'none';
  saveState();
  renderGarage();
}

function viewLeaseDetails(carId) {
  const car = state.garage.find(c => c.id === carId);
  if (!car || car.leaseStatus !== 'active' || !car.activeLease) return;
  const lease = car.activeLease;
  const daysLeft = Math.max(0, lease.endDay - state.day);
  const detailLines = [
    `${car.year} ${car.make} ${car.model}${car.trim ? ` ${car.trim}` : ''}`,
    `Term: ${lease.termDays} game days (~${Math.round(lease.termDays * LEASE_DAY_TO_FLAVOR_MONTH_MULTIPLIER)} months)`,
    `Days left: ${daysLeft}`,
    `Payment/day: ${formatCurrency(lease.paymentPerDay)}`,
    `Income earned: ${formatCurrency(lease.totalPaid || 0)}`,
    `Miles added: ${(lease.totalMilesAdded || 0).toLocaleString()} mi`,
  ];
  showModal(
    'Lease Details',
    detailLines.join('\n'),
    () => {}
  );
}

function toggleShowLeasedCars() {
  settings.showLeasedCars = !settings.showLeasedCars;
  saveSettings();
  renderGarage();
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
      syncLoanTermsToDifficulty();
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
      localStorage.setItem('dealerSim_v1', JSON.stringify(loaded));
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

function titleBadge(status) {
  const cls = {
    clean: 'badge-green',
    rebuilt: 'badge-blue',
    salvage: 'badge-yellow',
    lemon: 'badge-red',
  };
  return `<span class="badge ${cls[status] || 'badge-gray'}">${TITLE_LABELS[status] || 'Unknown'} Title</span>`;
}

function renderStats() {
  document.getElementById('stat-cash').innerHTML   = `${uiIcon('cash')} ${formatCurrency(state.cash)}`;
  document.getElementById('stat-day').innerHTML    = `${uiIcon('calendar')} Day ${state.day}`;
  document.getElementById('stat-rep').innerHTML    = `${uiIcon('star')} Rep ${state.reputation.toFixed(2)}`;
  document.getElementById('stat-garage').innerHTML = `${uiIcon('home')} ${state.garage.length} / ${state.garageSlots}`;
  const debtChip = document.getElementById('stat-debt');
  if (debtChip) debtChip.innerHTML = `${uiIcon('bank')} Debt ${formatCurrency(state.loanBalance || 0)}`;
  const activeLeases = state.garage.filter(c => c.leaseStatus === 'active' && c.activeLease).length;
  const leaseChip = document.getElementById('stat-lease');
  if (leaseChip) leaseChip.innerHTML = `${uiIcon('document')} Leases ${activeLeases} · ${formatCurrency(computeLeaseIncomePerDay())}/day`;
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
  const activeLeases  = state.garage.filter(c => c.leaseStatus === 'active' && c.activeLease).length;
  const leaseIncome   = computeLeaseIncomePerDay();
  const overhead      = OVERHEAD_BY_LEVEL[state.upgrades.garageLevel] ?? 300;
  const diffMult      = (settings.difficulty === 'hard') ? 1.5 : 1.0;
  const wageTotal     = getTotalStaffWages();

  const deliveryRows = state.deliveries.length
    ? state.deliveries.map(d => `
        <div class="delivery-item">
          <span>${d.car.year} ${d.car.make} ${d.car.model}${d.car.trim ? ' ' + d.car.trim : ''}</span>
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
  const staffLogs = (state.staffActivity || []).length
    ? state.staffActivity.slice(0, 10).map(n => `
        <div class="notif-item notif-info">
          <span class="notif-day">Day ${n.day}</span>
          <span>${n.message}</span>
        </div>`).join('')
    : '<p class="empty-msg">No staff activity yet.</p>';

  // Market indices display
  const marketRows = Object.entries(state.marketIndices || {}).map(([seg, idx]) => {
    const pct  = ((idx - 1) * 100).toFixed(1);
    const cls  = idx >= 1.02 ? 'text-green' : idx <= 0.98 ? 'text-red' : 'text-muted';
    const icon = idx >= 1.02 ? uiIcon('trendingUp') : idx <= 0.98 ? uiIcon('trendingDown') : uiIcon('arrowRight');
    return `<div class="stat-row"><span>${icon} ${seg}</span>
      <strong class="${cls}">${(idx * 100).toFixed(1)}% (${pct >= 0 ? '+' : ''}${pct}%)</strong></div>`;
  }).join('');

  document.getElementById('tab-dashboard').innerHTML = `
    <div class="dashboard-grid">

      <div class="dash-card">
        <h3>${uiIcon('chartBar')} Business Overview</h3>
        <div class="stat-row"><span>Cash</span><strong>${formatCurrency(state.cash)}</strong></div>
        <div class="stat-row"><span>Day</span><strong>${state.day}</strong></div>
        <div class="stat-row"><span>Reputation</span><strong>${state.reputation.toFixed(2)}</strong></div>
        <div class="stat-row"><span>Garage</span><strong>${state.garage.length} / ${state.garageSlots} slots</strong></div>
        <div class="stat-row"><span>Daily Overhead</span>
          <strong class="text-red">−${formatCurrency(Math.round(overhead * diffMult))}/day</strong></div>
        <div class="stat-row"><span>Daily Wages</span><strong class="text-red">−${formatCurrency(wageTotal)}/day</strong></div>
        <div class="stat-row"><span>Credit Line Balance</span><strong class="${state.loanBalance > 0 ? 'text-red' : 'text-green'}">${formatCurrency(state.loanBalance)}</strong></div>
        <div class="stat-row"><span>Loan APR</span><strong>${(state.loanApr * 100).toFixed(1)}%</strong></div>
        <div class="stat-row"><span>Delinquency</span><strong class="${state.delinquencyLevel > 0 ? 'text-red' : 'text-green'}">Level ${state.delinquencyLevel || 0}</strong></div>
        <div class="stat-row"><span>Hired Staff</span><strong>${state.staff?.length || 0}</strong></div>
        <div class="stat-row"><span>Listed for Sale</span><strong>${forSaleCount}</strong></div>
        <div class="stat-row"><span>In Service</span><strong>${inService}</strong></div>
        <div class="stat-row"><span>Active Leases</span><strong>${activeLeases}</strong></div>
        <div class="stat-row"><span>Lease Income / Day</span><strong class="text-green">+${formatCurrency(leaseIncome)}</strong></div>
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
        <h3>${uiIcon('trendingUp')} Market Conditions</h3>
        ${marketRows}
        ${state.lastMarketEvent ? `<div class="tab-info" style="margin-top:10px;font-size:.8rem">${state.lastMarketEvent}</div>` : ''}
        ${state.delinquencyLevel > 0 ? `<div class="tab-info" style="margin-top:10px;font-size:.8rem;border-color:rgba(255,122,133,.5);background:rgba(255,122,133,.12)">${uiIcon('warning')} Delinquency level ${state.delinquencyLevel}: ${state.loanFrozen ? 'credit line is frozen.' : 'stay solvent to avoid default.'}</div>` : ''}
      </div>

      <div class="dash-card">
        <h3>${uiIcon('package')} Incoming Deliveries (${state.deliveries.length})</h3>
        ${deliveryRows}
      </div>

      <div class="dash-card">
        <h3>${uiIcon('money')} Recent Sales</h3>
        ${recentSales}
      </div>

      <div class="dash-card dash-card-wide">
        <h3>${uiIcon('bell')} Activity Log</h3>
        ${logs}
      </div>

      <div class="dash-card dash-card-wide">
        <h3>${uiIcon('person')} Staff Negotiation Feed (Mode 2 Suggestions)</h3>
        ${staffLogs}
      </div>

    </div>

    <div class="save-controls">
      <button class="btn btn-danger"    onclick="confirmNewGame()">${uiIcon('trash')} New Game / Reset</button>
      <button class="btn btn-secondary" onclick="exportSave()">${uiIcon('upload')} Export Save</button>
      <button class="btn btn-secondary" onclick="document.getElementById('import-file').click()">${uiIcon('download')} Import Save</button>
    </div>`;
}

// ============================================================
// RENDER — Factory
// ============================================================
function renderFactory() {
  const groupedByMake = {};
  CAR_CATALOG.forEach((entry, idx) => {
    (groupedByMake[entry.make] = groupedByMake[entry.make] || []).push({ ...entry, idx });
  });
  const makes = Object.keys(groupedByMake).sort((a, b) => a.localeCompare(b));
  if (!factorySelection.make || !groupedByMake[factorySelection.make]) {
    factorySelection = { make: makes[0] || null, model: null };
  }
  const makeEntries = groupedByMake[factorySelection.make] || [];
  const modelNames = [...new Set(makeEntries.map(c => c.model))].sort((a, b) => a.localeCompare(b));
  if (!factorySelection.model || !modelNames.includes(factorySelection.model)) {
    factorySelection.model = modelNames[0] || null;
  }
  const trims = makeEntries.filter(c => c.model === factorySelection.model);
  const garageFull = state.garage.length + state.deliveries.length >= state.garageSlots;

  const makeButtons = makes.map(make => `
    <button class="btn btn-sm ${factorySelection.make === make ? 'btn-primary' : 'btn-secondary'}" onclick="setFactoryMake('${make}')">
      ${settings.showWordmarks ? renderBrandWordmark(make) : make}
    </button>`).join('');
  const modelButtons = modelNames.map(model => `
    <button class="btn btn-sm ${factorySelection.model === model ? 'btn-primary' : 'btn-secondary'}" onclick="setFactoryModel('${model}')">
      ${model}
    </button>`).join('');
  let html = `<div class="tab-info">${uiIcon('factory')} Factory sells 2026 model year cars at fixed invoice prices — no negotiation. Pick <strong>make → model → trim</strong> to keep browsing compact.</div>
    <div class="factory-browser">
      <div class="factory-stage"><h4>1) Make</h4><div class="make-pill-row">${makeButtons}</div></div>
      <div class="factory-stage"><h4>2) Model</h4><div class="make-pill-row">${modelButtons || '<span class="text-muted">No models</span>'}</div></div>
      <div class="factory-stage"><h4>3) Trim</h4></div>
    </div>
    <div class="card-grid">`;
  for (const car of trims) {
    const delivDays  = Math.max(1, car.deliveryDays
      - (state.upgrades.expressDelivery ? 1 : 0)
      - (state.upgrades.factoryAllocation ? 1 : 0));
    const marketIdx  = (state.marketIndices || {})[car.category] ?? 1.0;
    const adjMarket  = Math.round(car.marketValue * marketIdx);
    const adjMargin  = adjMarket - car.basePrice;
    const canBuy     = !garageFull && state.cash >= car.basePrice;
    html += `
      <div class="car-card factory-card">
        <div class="car-card-header">
          <div>
            ${settings.showWordmarks ? renderBrandWordmark(car.make) : ''}
            <span class="car-name">2026 ${settings.showWordmarks ? '' : `${car.make} `}${car.model}</span>
          </div>
          <div class="badge-stack">
            <span class="badge badge-gray">${car.category}</span>
            ${titleBadge('clean')}
          </div>
        </div>
        <div class="car-details">
          <div class="detail-row"><span>Trim</span><span style="font-weight:600">${car.trim || '—'}</span></div>
          <div class="detail-row"><span>Title Status</span><span>Clean</span></div>
          <div class="detail-row"><span>Invoice Price</span><span class="text-blue">${formatCurrency(car.basePrice)}</span></div>
          <div class="detail-row"><span>Market Value</span><span class="text-green">${formatCurrency(adjMarket)}</span></div>
          <div class="detail-row"><span>Est. Margin</span><span class="${adjMargin >= 0 ? 'text-green' : 'text-red'}">${adjMargin >= 0 ? '+' : ''}${formatCurrency(adjMargin)}</span></div>
          <div class="detail-row"><span>Delivery</span><span>${delivDays} day${delivDays !== 1 ? 's' : ''}</span></div>
        </div>
        <button class="btn btn-primary btn-full" onclick="buyFromFactory(${car.idx})" ${canBuy ? '' : 'disabled'}>
          ${garageFull ? `${uiIcon('ban')} Garage Full` : state.cash < car.basePrice ? `${uiIcon('warning')} Need ${formatCurrency(car.basePrice - state.cash)} more` : `Order — ${formatCurrency(car.basePrice)}`}
        </button>
      </div>`;
  }
  html += `</div>`;
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
          ? `<p class="text-green" style="font-size:.82rem">${uiIcon('check')} No hidden issues found!</p>`
          : offer.hiddenIssues.map(i =>
              `<span class="issue-tag">${uiIcon('warning')} ${i.name} (${formatCurrency(i.cost)})</span>`).join(''))
      : `<p class="text-muted" style="font-size:.82rem">${uiIcon('search')} Unknown — inspect to reveal issues</p>`;

    const asking        = offer.askingPrice;
    const counterPrice  = offer.sellerCounter ?? null;
    const displayPrice  = counterPrice ?? asking;
    const canAccept     = !garageFull && state.cash >= displayPrice;
    const canInspect    = !offer.inspected && state.cash >= inspectCost;
    const negState      = offer.negotiationState;
    const marketIdx     = (state.marketIndices || {})[offer.category] ?? 1.0;

    let negotiationHtml = '';
    if (negState === 'countered' && counterPrice) {
      const ratio = (offer.playerOffer ?? 0) / offer.minAcceptPrice;
      const tone  = getSellerTone(ratio, offer.patience);
      negotiationHtml = `
        <div class="neg-status neg-countered">
          ${uiIcon('message')} Seller countered: <strong>${formatCurrency(counterPrice)}</strong>
          <div style="font-size:.78rem;margin-top:4px">
            Seller mood: <strong class="${tone.cls}">${tone.text}</strong>
            &nbsp;|&nbsp; Rounds left: <strong>${offer.patience}</strong>
          </div>
          <div class="car-actions" style="margin-top:8px">
            <button class="btn btn-success" onclick="acceptUsedOffer('${offer.id}')" ${canAccept ? '' : 'disabled'}>
              ${uiIcon('check')} Accept ${formatCurrency(counterPrice)}
            </button>
          </div>
          <div class="neg-input-row" style="margin-top:8px">
            <input type="number" class="price-input" id="neg-${offer.id}" placeholder="Your counter offer" min="1" value="${offer.playerOffer || ''}">
            <button class="btn btn-warning" onclick="submitUsedOffer('${offer.id}', document.getElementById('neg-${offer.id}').value)"
              ${offer.patience > 0 ? '' : 'disabled'} title="${offer.patience === 0 ? 'No more rounds — accept or pass' : ''}">
              Counter
            </button>
          </div>
        </div>`;
    } else if (!negState) {
      // Initial offer UI — show tone hint as player types
      negotiationHtml = `
        <div class="neg-input-row">
          <input type="number" class="price-input" id="neg-${offer.id}" placeholder="Your offer" min="1"
            oninput="updateNegTone('${offer.id}', this.value)">
          <button class="btn btn-warning" onclick="submitUsedOffer('${offer.id}', document.getElementById('neg-${offer.id}').value)">
            ${uiIcon('handshake')} Negotiate
          </button>
        </div>
        <div id="neg-tone-${offer.id}" style="font-size:.76rem;margin-top:4px;color:var(--text-muted)">
          Enter an offer to see seller's likely reaction.
        </div>`;
    }

    return `
        <div class="car-card tradein-card">
          <div class="car-card-header">
            <div>
              ${settings.showWordmarks ? renderBrandWordmark(offer.make) : ''}
              <span class="car-name">${formatCarDisplayName(offer)}</span>
            </div>
            <div class="badge-stack">
              ${condBadge(offer.condition)}
              ${titleBadge(offer.titleStatus)}
            </div>
          </div>
        <div class="car-details">
          <div class="detail-row"><span>Category</span><span>${offer.category}</span></div>
          <div class="detail-row"><span>Title Status</span><span>${TITLE_LABELS[offer.titleStatus] || 'Clean'}</span></div>
          <div class="detail-row"><span>Mileage</span><span>${offer.mileage.toLocaleString()} mi</span></div>
          <div class="detail-row"><span>Asking Price</span><span class="text-blue">${formatCurrency(asking)}</span></div>
          <div class="detail-row"><span>Est. Market Value</span>
            <span class="text-green">${formatCurrency(offer.marketValue)}</span></div>
          <div class="detail-row"><span>Market Segment</span>
            <span class="${marketIdx >= 1.02 ? 'text-green' : marketIdx <= 0.98 ? 'text-red' : 'text-muted'}">
              ${(marketIdx * 100).toFixed(1)}%
            </span></div>
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
            ? `<button class="btn btn-secondary" onclick="inspectUsedOffer('${offer.id}')" ${canInspect ? '' : 'disabled'}>${uiIcon('search')} Inspect (${formatCurrency(inspectCost)})</button>`
            : ''}
          <button class="btn btn-success" onclick="acceptUsedOffer('${offer.id}')" ${canAccept ? '' : 'disabled'}>
            ${uiIcon('check')} Buy ${formatCurrency(displayPrice)}
          </button>
          <button class="btn btn-danger" onclick="declineUsedOffer('${offer.id}')">${uiIcon('xIcon')} Pass</button>
        </div>
      </div>`;
  }).join('');

  el.innerHTML = `
    <div class="tab-info">
      ${uiIcon('car')} ${state.usedMarketOffers.length} used car(s) available. Listings refresh each day.
      Garage: ${state.garage.length}/${state.garageSlots} slots.
      ${state.upgrades.negotiationTraining ? `${uiIcon('handshake')} Negotiation Training active — better deal outcomes.` : ''}
    </div>
    <div class="card-grid">${cards}</div>`;
}

// ============================================================
// RENDER — Garage
// ============================================================
function renderGarage() {
  const el = document.getElementById('tab-garage');
  const showLeased = settings.showLeasedCars !== false;

  if (!state.garage.length) {
    el.innerHTML = `<div class="empty-state">
      <p>Your garage is empty. Order from the <strong>Factory</strong> tab or buy from <strong>Used Market</strong>.</p></div>`;
    return;
  }

  const visibleCars = showLeased
    ? state.garage
    : state.garage.filter(car => !(car.leaseStatus === 'active' && car.activeLease));
  const cards = visibleCars.map(car => {
    const inService = !!car.inServiceUntilDay;
    const isLeased = car.leaseStatus === 'active' && !!car.activeLease;
    const leaseDaysLeft = isLeased ? Math.max(0, car.activeLease.endDay - state.day) : 0;
    const issuesHtml = car.inspected
      ? (car.hiddenIssues.length === 0
          ? `<span class="text-green">${uiIcon('check')} None</span>`
          : car.hiddenIssues.map(i => `<span class="issue-tag">${uiIcon('warning')} ${i.name}</span>`).join(''))
      : '<span class="text-muted">Unknown (not inspected)</span>';

    const saleChance = car.isForSale && car.listPrice > 0
      ? `${(computeSaleChance(car) * 100).toFixed(1)}% / day` : '—';

    // Reconditioning log badges
    const reconBadges = car.reconditionLog.length
      ? car.reconditionLog.map(r => {
          const icons = { 'Car Wash': 'droplet', 'Detailing': 'sparkles', 'Basic Repair': 'wrench', 'Parts Upgrade': 'gauge' };
          return `<span class="recon-tag">${uiIcon(icons[r.type] || 'wrench')} ${r.type}</span>`;
        }).join('')
      : '';

    // Reconditioning buttons
    const perfEligible = PERF_ELIGIBLE.includes(car.category);
    const perfDone     = car.reconditionLog.some(r => r.type === 'Parts Upgrade');
    let reconHtml = '';
    if (isLeased) {
      reconHtml = `<div class="tab-info recon-disabled-message">${uiIcon('toolbox')} Recon disabled while lease is active.</div>`;
    } else if (!inService) {
      reconHtml = `<div class="recon-actions">`;
      // Car Wash
      const canWash = Number(state.cash) >= 150;
      if (car.washBoostDays <= 0) {
        reconHtml += `<button class="btn btn-sm btn-secondary recon-btn" onclick="carWash('${car.id}')"
          ${canWash ? '' : 'disabled'} title="Instant: +3% value, boosted sale chance 3 days">${uiIcon('droplet')} Wash ($150)</button>`;
      } else {
        reconHtml += `<button class="btn btn-sm btn-secondary recon-btn" disabled title="Wash boost active for ${car.washBoostDays} more day(s)">${uiIcon('droplet')} Washed (${car.washBoostDays}d)</button>`;
      }
      // Detailing
      const canDetail = Number(state.cash) >= 500;
      if (state.upgrades.detailing) {
        if (car.hasBeenDetailed) {
          reconHtml += `<button class="btn btn-sm btn-secondary recon-btn" disabled title="Already detailed once this ownership">${uiIcon('sparkles')} Detailed</button>`;
        } else if (car.condition !== 'A') {
          reconHtml += `<button class="btn btn-sm btn-secondary recon-btn" onclick="detailCar('${car.id}')"
            ${canDetail ? '' : 'disabled'} title="Instant: +1 condition tier, +7% value">${uiIcon('sparkles')} Detail ($500)</button>`;
        }
      }
      // Basic Repair
      const canRepair = Number(state.cash) >= 800;
      if (state.upgrades.serviceBay && car.condition !== 'A') {
        reconHtml += `<button class="btn btn-sm btn-secondary recon-btn" onclick="basicRepair('${car.id}')"
          ${canRepair ? '' : 'disabled'} title="1 day: fixes issues, +1 condition tier, +10% value">${uiIcon('wrench')} Repair ($800)</button>`;
      }
      // Parts Upgrade
      const canPartsUpgrade = Number(state.cash) >= 1500;
      if (state.upgrades.performanceShop && perfEligible && !perfDone) {
        reconHtml += `<button class="btn btn-sm btn-secondary recon-btn" onclick="partsUpgrade('${car.id}')"
          ${canPartsUpgrade ? '' : 'disabled'} title="1 day: +15% market value">${uiIcon('gauge')} Parts ($1,500)</button>`;
      }
      reconHtml += `</div>`;
    }
    const leaseActionButtons = [];
    if (car.leaseStatus === 'none') {
      leaseActionButtons.push(
        `<button class="btn btn-secondary" onclick="makeLeaseAvailable('${car.id}')" ${car.isForSale || inService ? 'disabled' : ''}>${uiIcon('document')} Offer Lease</button>`
      );
    } else if (car.leaseStatus === 'available') {
      leaseActionButtons.push(`<button class="btn btn-warning" onclick="stopOfferingLease('${car.id}')">${uiIcon('stop')} Stop Offering Lease</button>`);
    } else if (isLeased) {
      leaseActionButtons.push(`<button class="btn btn-secondary" onclick="viewLeaseDetails('${car.id}')">${uiIcon('fileText')} Lease Details</button>`);
    }

    return `
        <div class="car-card garage-card ${car.isForSale ? 'for-sale' : ''} ${inService ? 'in-service' : ''}">
          <div class="car-card-header">
            <div>
              ${settings.showWordmarks ? renderBrandWordmark(car.make) : ''}
              <span class="car-name">${formatCarDisplayName(car)}</span>
            </div>
            <div class="badge-stack">
              ${condBadge(car.condition)}
              ${titleBadge(car.titleStatus)}
              ${car.leaseStatus === 'available' ? '<span class="badge badge-blue">LEASE AVAILABLE</span>' : ''}
              ${isLeased ? `<span class="badge badge-blue">LEASED (${leaseDaysLeft}d left)</span>` : ''}
            </div>
          </div>
        ${inService ? `<div class="service-banner">${uiIcon('wrench')} IN SERVICE — Ready Day ${car.inServiceUntilDay} (${car.pendingService?.type === 'repair' ? 'Basic Repair' : 'Parts Upgrade'})</div>` : ''}
        ${car.isForSale ? `<div class="for-sale-banner">${uiIcon('tag')} LISTED FOR SALE</div>` : ''}
        ${isLeased ? `<div class="service-banner">${uiIcon('document')} LEASE ACTIVE — ${leaseDaysLeft} day(s) remaining</div>` : ''}
        ${car.washBoostDays > 0 ? `<div class="wash-banner">${uiIcon('droplet')} Wash boost active (${car.washBoostDays} days left)</div>` : ''}
        <div class="car-details">
          <div class="detail-row"><span>Category</span><span>${car.category}</span></div>
          <div class="detail-row"><span>Title Status</span><span>${TITLE_LABELS[car.titleStatus] || 'Clean'}</span></div>
          <div class="detail-row"><span>Mileage</span><span>${car.mileage.toLocaleString()} mi</span></div>
          <div class="detail-row"><span>Purchased For</span><span>${formatCurrency(car.purchasePrice)}</span></div>
          <div class="detail-row"><span>Market Value</span><span class="text-green">${formatCurrency(car.marketValue)}</span></div>
          <div class="detail-row"><span>Source</span><span>${car.source === 'factory' ? `${uiIcon('factory')} Factory` : `${uiIcon('car')} Used Market`}</span></div>
          <div class="detail-row"><span>Lease Status</span><span>${isLeased ? `Active (${leaseDaysLeft}d left)` : car.leaseStatus === 'available' ? 'Available' : 'Not Offered'}</span></div>
          ${isLeased ? `<div class="detail-row"><span>Lease Income / Day</span><span class="text-green">+${formatCurrency(car.activeLease.paymentPerDay)}</span></div>` : ''}
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
            onclick="markForSale('${car.id}')" ${inService || isLeased ? 'disabled' : ''}>
            ${car.isForSale ? `${uiIcon('upload')} Unlist` : `${uiIcon('tag')} Mark for Sale`}
          </button>
          ${leaseActionButtons.join('')}
        </div>
      </div>`;
  }).join('');

  const activeLeases = state.garage.filter(c => c.leaseStatus === 'active' && c.activeLease).length;
  el.innerHTML = `
    <div class="tab-info">
      ${uiIcon('home')} Garage: ${state.garage.length}/${state.garageSlots} slots.
      ${state.garage.filter(c => c.isForSale).length} listed for sale.
      ${state.garage.filter(c => c.inServiceUntilDay).length ? `${uiIcon('wrench')} ${state.garage.filter(c => c.inServiceUntilDay).length} in service.` : ''}
      ${activeLeases ? `${uiIcon('document')} ${activeLeases} active lease(s).` : ''}
      <br>Lease income/day: <strong>${formatCurrency(computeLeaseIncomePerDay())}</strong>.
      ${state.upgrades.crmSuite ? `<br>${uiIcon('layers')} High-volume tools active: bulk list/unlist available.` : ''}
    </div>
    <div class="bulk-row">
      <button class="btn btn-sm btn-secondary" onclick="toggleShowLeasedCars()">${showLeased ? 'Hide Leased Cars' : 'Show Leased Cars'}</button>
    </div>
    ${state.upgrades.crmSuite ? `
      <div class="bulk-row">
        <button class="btn btn-sm btn-secondary" onclick="markAllForSale()">List All Ready Cars</button>
        <button class="btn btn-sm btn-warning" onclick="unlistAllCars()">Unlist All</button>
      </div>` : ''}
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
      const tone        = getBuyerTone(offer.offeredPrice, car.listPrice, offer.patience ?? 1);
      const pat         = offer.patience ?? 1;
      const suggestion  = offer.staffSuggestion;

      return `
        <div class="car-card offer-card ${isCountered ? 'countered-card disabled-card' : ''}">
          <div class="car-card-header">
            <div>
              ${settings.showWordmarks ? renderBrandWordmark(car.make) : ''}
              <span class="car-name">${formatCarDisplayName(car)}</span>
            </div>
            <div class="badge-stack">
              ${titleBadge(car.titleStatus)}
              <span class="badge ${isCountered ? 'badge-yellow' : 'badge-blue'}">${isCountered ? 'Countered' : 'Offer'}</span>
            </div>
          </div>
          <div class="car-details">
            <div class="detail-row"><span>Customer Offers</span><span class="text-blue">${formatCurrency(offer.offeredPrice)}</span></div>
            <div class="detail-row"><span>Your List Price</span><span>${formatCurrency(car.listPrice)}</span></div>
            <div class="detail-row"><span>Discount</span><span class="text-red">${formatCurrency(offer.offeredPrice - car.listPrice)}</span></div>
            <div class="detail-row"><span>Est. Profit</span>
              <span class="${estProfit >= 0 ? 'text-green' : 'text-red'}">${estProfit >= 0 ? '+' : ''}${formatCurrency(estProfit)}</span>
            </div>
            <div class="detail-row"><span>Buyer Mood</span>
              <span class="${tone.cls}">${tone.text}</span></div>
            <div class="detail-row"><span>Rounds Left</span>
              <span class="${pat === 0 ? 'text-red' : 'text-muted'}">${pat}</span></div>
            ${isCountered ? `<div class="detail-row"><span>Your Counter</span><span>${formatCurrency(offer.playerCounter)}</span></div>` : ''}
            ${suggestion ? `<div class="detail-row"><span>Staff Suggestion</span><span>${formatCurrency(suggestion.counterPrice)} (${suggestion.confidence})</span></div>` : ''}
          </div>
          ${suggestion ? `<p class="text-muted" style="font-size:.78rem;margin-top:2px">${uiIcon('person')} ${suggestion.by}: ${suggestion.note}</p>` : ''}
          ${isCountered
            ? `<p class="text-muted" style="font-size:.8rem;margin-top:4px">Waiting for customer response — resolves next day.</p>`
            : `<div class="neg-input-row" style="margin-top:6px">
                <input type="number" class="price-input" id="cof-${offer.id}"
                  placeholder="Counter price" value="${offer.playerCounter || ''}" min="1" max="${car.listPrice}">
                <button class="btn btn-warning" onclick="counterCustomerOffer('${offer.id}', document.getElementById('cof-${offer.id}').value)">
                  Counter
                </button>
                ${suggestion ? `<button class="btn btn-secondary" onclick="applyStaffSuggestion('${offer.id}')">Use Staff</button>` : ''}
              </div>
              <div class="car-actions" style="margin-top:8px">
                <button class="btn btn-success" onclick="acceptCustomerOffer('${offer.id}')">${uiIcon('check')} Accept</button>
                <button class="btn btn-danger"  onclick="rejectCustomerOffer('${offer.id}')">${uiIcon('xIcon')} Reject</button>
              </div>`}
        </div>`;
    }).join('');

    offersHtml = `
      <div class="category-section">
        <h3>${uiIcon('inbox')} Customer Offers (${pendingOffers.length} pending, ${counteredOffers.length} countered)</h3>
        <div class="card-grid">${offerCards}</div>
      </div>`;
  }

  // Trade-In Requests section — show inline in For Sale
  const pendingTIR   = state.tradeInRequests.filter(r => r.state === 'pending');
  const counteredTIR = state.tradeInRequests.filter(r => r.state === 'countered');
  let tradeInHtml = '';
  if (pendingTIR.length || counteredTIR.length) {
    const tirCards = [...pendingTIR, ...counteredTIR].map(req => {
      const targetCar = state.garage.find(c => c.id === req.targetCarId);
      if (!targetCar) return '';
      const cashDelta = req.counterCashDelta ?? req.cashDelta;
      const isCountered = req.state === 'countered';
      const netValueToYou = req.customerCarValue + cashDelta;
      const canAccept = cashDelta < 0 ? state.cash >= Math.abs(cashDelta) : true;
      const canFit    = state.garage.length < state.garageSlots || !targetCar;
      return `
        <div class="car-card tradein-request-card ${isCountered ? 'countered-card disabled-card' : ''}">
          <div class="car-card-header">
            <span class="car-name">Trade-In Offer</span>
            <span class="badge ${isCountered ? 'badge-yellow' : 'badge-blue'}">${isCountered ? 'Countered' : 'New Request'}</span>
          </div>
          <div class="tradein-split">
            <div class="tradein-half">
              <h5>${uiIcon('car')} Their Car</h5>
              <div class="detail-row"><span>Car</span><span>${req.customerCar.year} ${req.customerCar.make} ${req.customerCar.model}</span></div>
              <div class="detail-row"><span>Condition</span>${condBadge(req.customerCar.condition)}</div>
              <div class="detail-row"><span>Title</span><span>${TITLE_LABELS[req.customerCar.titleStatus] || 'Clean'}</span></div>
              <div class="detail-row"><span>Mileage</span><span>${req.customerCar.mileage.toLocaleString()} mi</span></div>
              <div class="detail-row"><span>Their Car Value</span><span class="text-green">${formatCurrency(req.customerCarValue)}</span></div>
            </div>
            <div class="tradein-half">
              <h5>${uiIcon('tag')} Your Car</h5>
              <div class="detail-row"><span>Car</span><span>${targetCar.year} ${targetCar.make} ${targetCar.model}</span></div>
              <div class="detail-row"><span>Listed Price</span><span class="text-blue">${formatCurrency(targetCar.listPrice)}</span></div>
              <div class="detail-row"><span>Title</span><span>${TITLE_LABELS[targetCar.titleStatus] || 'Clean'}</span></div>
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
            ${isCountered ? `<p class="text-muted" style="font-size:.8rem;margin-top:6px">Waiting for customer response — resolves next day.</p>` : ''}
          </div>
          ${!isCountered ? `
          <div class="neg-input-row" style="margin-top:4px">
            <label style="color:var(--text-muted);font-size:.82rem;white-space:nowrap">Counter cash:</label>
            <input type="number" class="price-input" id="tir-${req.id}" placeholder="${Math.abs(cashDelta)}" value="${cashDelta}">
            <button class="btn btn-warning" onclick="counterTradeInRequest('${req.id}', document.getElementById('tir-${req.id}').value)">Counter</button>
          </div>
          <div class="car-actions">
            <button class="btn btn-success" onclick="acceptTradeInRequest('${req.id}')" ${canAccept && canFit ? '' : 'disabled'}>${uiIcon('check')} Accept Deal</button>
            <button class="btn btn-danger" onclick="rejectTradeInRequest('${req.id}')">${uiIcon('xIcon')} Reject</button>
          </div>` : ''}
        </div>`;
    }).join('');
    tradeInHtml = `
      <div class="category-section">
        <h3>${uiIcon('refresh')} Trade-In Requests (${pendingTIR.length} pending, ${counteredTIR.length} countered)</h3>
        <div class="card-grid">${tirCards}</div>
      </div>`;
  }

  if (!listed.length) {
    el.innerHTML = `
      ${offersHtml || ''}
      ${tradeInHtml}
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
          const icons = { 'Car Wash': 'droplet', 'Detailing': 'sparkles', 'Basic Repair': 'wrench', 'Parts Upgrade': 'gauge' };
          return `<span class="recon-tag">${uiIcon(icons[r.type] || 'wrench')} ${r.type}</span>`;
        }).join('') : '';
    const hasOffer = state.customerOffers.some(o => o.carId === car.id);
    const hasTIR   = state.tradeInRequests.some(r => r.targetCarId === car.id && r.state === 'pending');

    return `
      <div class="car-card forsale-card ${hasOffer ? 'has-offer' : ''} ${car.source === 'tradein' ? 'tradein-inventory' : ''}">
        <div class="car-card-header">
          <div>
            ${settings.showWordmarks ? renderBrandWordmark(car.make) : ''}
            <span class="car-name">${formatCarDisplayName(car)}</span>
          </div>
          <div class="badge-stack">
            ${car.source === 'tradein' ? '<span class="badge badge-tradein">TRADE-IN</span>' : ''}
            ${condBadge(car.condition)}
            ${titleBadge(car.titleStatus)}
          </div>
        </div>
        ${car.source === 'tradein' ? `<div class="tradein-source-banner">${uiIcon('refresh')} Accepted trade-in vehicle</div>` : ''}
        ${hasOffer ? `<div class="offer-banner">${uiIcon('inbox')} Customer offer waiting (see above)</div>` : ''}
        ${car.washBoostDays > 0 ? `<div class="wash-banner">${uiIcon('droplet')} Wash boost active (${car.washBoostDays} days)</div>` : ''}
        <div class="car-details">
          <div class="detail-row"><span>Purchased For</span><span>${formatCurrency(car.purchasePrice)}</span></div>
          <div class="detail-row"><span>Market Value</span><span class="text-green">${formatCurrency(car.marketValue)}</span></div>
          <div class="detail-row"><span>Title Status</span><span>${TITLE_LABELS[car.titleStatus] || 'Clean'}</span></div>
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
        <button class="btn btn-danger btn-full" onclick="markForSale('${car.id}')">${uiIcon('upload')} Unlist</button>
      </div>`;
  }).join('');

  el.innerHTML = `
    ${offersHtml}
    ${tradeInHtml}
    <div class="category-section">
      <h3>${uiIcon('tag')} Your Listings (${listed.length})</h3>
      <div class="tab-info">
        Press <strong>Next Day</strong> to simulate customer visits. Auto-sales happen at list price; below-list offers appear above.
      </div>
      ${state.upgrades.crmSuite ? `
        <div class="bulk-row">
          <button class="btn btn-sm btn-secondary" onclick="bulkSetListing(1.0)">Set All to Market</button>
          <button class="btn btn-sm btn-secondary" onclick="bulkSetListing(1.1)">Set All +10%</button>
          <button class="btn btn-sm btn-warning" onclick="bulkSetListing(0.9)">Set All −10%</button>
        </div>` : ''}
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
      if (upg.id === 'marketing')          stackInfo = ` (${state.upgrades.marketing}/3)`;
      if (upg.id === 'reputationBoost')    stackInfo = ` (${state.upgrades.reputationBoosts}/3)`;
      if (upg.id === 'overheadReduction')  stackInfo = ` (${state.upgrades.overheadReductions || 0}/3)`;

      html += `
        <div class="car-card upgrade-card ${!available ? 'disabled-card' : ''}">
          <div class="upgrade-icon">${uiIconLg(UPGRADE_ICON_MAP[upg.icon] || 'gear')}</div>
          <h4>${upg.name}${stackInfo}</h4>
          <p class="upgrade-desc">${upg.desc}</p>
          <p class="upgrade-cost">${formatCurrency(upg.cost)}</p>
          <button class="btn btn-primary btn-full" onclick="buyUpgrade('${upg.id}')"
            ${!available || !canAfford ? 'disabled' : ''}>
            ${!available
              ? `${uiIcon('check')} Purchased / Max Level`
              : !canAfford
                ? `${uiIcon('warning')} Need ${formatCurrency(upg.cost - state.cash)} more`
                : `Buy — ${formatCurrency(upg.cost)}`}
          </button>
        </div>`;
    }
    html += `</div></div>`;
  }
  if (state.upgrades.staffOffice) {
    ensureStaffCandidates();
    const staffCards = (state.staff || []).map(s => `
      <div class="car-card upgrade-card">
        <div class="upgrade-icon">${uiIconLg('person')}</div>
        <h4>${s.name}</h4>
        <p class="upgrade-desc">Negotiation ${s.negotiation} · Selling ${s.selling} · Speed ${s.speed}/day</p>
        <p class="upgrade-cost text-red">${formatCurrency(s.wage)}/day wage</p>
      </div>`).join('') || '<p class="text-muted">No staff hired yet.</p>';
    const candidateCards = (state.staffCandidates || []).map(s => `
      <div class="car-card upgrade-card">
        <div class="upgrade-icon">${uiIconLg('fileText')}</div>
        <h4>${s.name}</h4>
        <p class="upgrade-desc">Negotiation ${s.negotiation} · Selling ${s.selling} · Speed ${s.speed}/day</p>
        <p class="upgrade-cost">${formatCurrency(s.wage)}/day</p>
        <div class="car-actions">
          <button class="btn btn-primary btn-sm" onclick="hireStaff('${s.id}')">Hire</button>
          <button class="btn btn-secondary btn-sm" onclick="dismissCandidate('${s.id}')">Skip</button>
        </div>
      </div>`).join('');
    html += `
      <div class="category-section"><h3>${uiIcon('person')} Hired Staff</h3><div class="card-grid">${staffCards}</div></div>
      <div class="category-section"><h3>${uiIcon('document')} Hiring Candidates</h3><div class="card-grid">${candidateCards}</div></div>`;
  }
  document.getElementById('tab-upgrades').innerHTML = html;
}

function renderFinance() {
  const available = Math.max(0, state.loanLimit - state.loanBalance);
  const dailyInterest = state.loanBalance > 0 ? Math.max(1, Math.round(state.loanBalance * state.loanApr / 365)) : 0;
  const minPrincipal = settings.difficulty === 'hard' && state.loanBalance > 0
    ? Math.max(250, Math.round(state.loanBalance * LOAN_TERMS.hard.minPrincipalRate))
    : 0;
  const report = state.lastBankruptcyReport;
  const reportRows = report?.liquidated?.length
    ? report.liquidated.map(item => `
      <div class="sale-item">
        <span>${item.carLabel} (${TITLE_LABELS[item.titleStatus] || 'Clean'})</span>
        <span>${formatCurrency(item.marketValue)}</span>
        <span class="text-red">${formatCurrency(item.salePrice)}</span>
      </div>`).join('')
    : '<p class="empty-msg">No liquidation events yet.</p>';

  document.getElementById('tab-finance').innerHTML = `
    <div class="dashboard-grid">
      <div class="dash-card">
        <h3>${uiIcon('bank')} Dealership Credit Line</h3>
        <div class="stat-row"><span>Balance</span><strong class="${state.loanBalance > 0 ? 'text-red' : 'text-green'}">${formatCurrency(state.loanBalance)}</strong></div>
        <div class="stat-row"><span>Available</span><strong>${formatCurrency(available)}</strong></div>
        <div class="stat-row"><span>Limit</span><strong>${formatCurrency(state.loanLimit)}</strong></div>
        <div class="stat-row"><span>APR</span><strong>${(state.loanApr * 100).toFixed(1)}%</strong></div>
        <div class="stat-row"><span>Daily Interest</span><strong class="text-red">−${formatCurrency(dailyInterest)}</strong></div>
        <div class="stat-row"><span>Min Principal (Hard)</span><strong>${minPrincipal ? formatCurrency(minPrincipal) : 'None'}</strong></div>
        <div class="stat-row"><span>Delinquency</span><strong class="${state.delinquencyLevel > 0 ? 'text-red' : 'text-green'}">Level ${state.delinquencyLevel || 0}</strong></div>
        <div class="stat-row"><span>Credit Status</span><strong class="${state.loanFrozen ? 'text-red' : 'text-green'}">${state.loanFrozen ? 'Frozen' : 'Open'}</strong></div>
      </div>

      <div class="dash-card">
        <h3>${uiIcon('creditCard')} Manage Loan</h3>
        <p class="text-muted" style="font-size:.82rem;margin-bottom:10px">Draw funds for inventory, then pay down as you sell cars. Interest applies every Next Day.</p>
        <div class="neg-input-row">
          <input type="number" class="price-input" id="loan-draw-input" min="1" placeholder="Draw amount">
          <button class="btn btn-primary" onclick="drawLoan(document.getElementById('loan-draw-input').value)" ${state.loanFrozen ? 'disabled' : ''}>Draw</button>
        </div>
        <div class="neg-input-row" style="margin-top:10px">
          <input type="number" class="price-input" id="loan-pay-input" min="1" placeholder="Payment amount">
          <button class="btn btn-success" onclick="payDownLoan(document.getElementById('loan-pay-input').value)" ${state.loanBalance <= 0 ? 'disabled' : ''}>Pay Down</button>
        </div>
        <div class="bulk-row" style="margin-top:10px">
          <button class="btn btn-sm btn-secondary" onclick="drawLoan(5000)" ${state.loanFrozen ? 'disabled' : ''}>Draw $5,000</button>
          <button class="btn btn-sm btn-secondary" onclick="drawLoan(10000)" ${state.loanFrozen ? 'disabled' : ''}>Draw $10,000</button>
          <button class="btn btn-sm btn-secondary" onclick="payDownLoan(${Math.min(state.cash, state.loanBalance)})" ${state.loanBalance <= 0 || state.cash <= 0 ? 'disabled' : ''}>Pay Max</button>
        </div>
      </div>

      <div class="dash-card dash-card-wide">
        <h3>${uiIcon('trendingDown')} Delinquency &amp; Bankruptcy Ladder</h3>
        <div class="stat-row"><span>1 Missed Payment</span><strong class="text-yellow">Warning</strong></div>
        <div class="stat-row"><span>2 Missed Payments</span><strong class="text-red">Default: credit freeze + APR increase</strong></div>
        <div class="stat-row"><span>3 Missed Payments</span><strong class="text-red">${settings.difficulty === 'hard' ? 'Hard: Game Over' : 'Normal: Instant liquidation then continue'}</strong></div>
      </div>

      <div class="dash-card dash-card-wide">
        <h3>${uiIcon('receipt')} Bankruptcy Report ${report ? `(Day ${report.day})` : ''}</h3>
        ${report ? `<div class="tab-info">Cash after liquidation: <strong>${formatCurrency(report.cashAfter)}</strong> · New limit: <strong>${formatCurrency(report.loanLimit)}</strong> · New APR: <strong>${(report.loanApr * 100).toFixed(1)}%</strong></div>` : ''}
        ${reportRows}
      </div>
    </div>`;
}

function renderAchievements() {
  const unlocked = state.achievementsUnlocked || {};
  const unlockedCount = ACHIEVEMENTS.filter(a => unlocked[a.id]).length;
  const cards = ACHIEVEMENTS.map(a => {
    const day = unlocked[a.id];
    const prog = !day && a.progress ? `<p class="ach-progress">${a.progress(state)}</p>` : '';
    return `<div class="car-card achievement-card ${day ? 'achievement-unlocked' : 'achievement-locked'}">
      <div class="ach-icon-wrap ${day ? 'ach-icon-unlocked' : 'ach-icon-locked'}">${a.icon}</div>
      <div class="car-card-header" style="margin-top:8px">
        <span class="car-name">${a.name}</span>
        <span class="badge ${day ? 'badge-green' : 'badge-gray'}">${day ? `Day ${day}` : 'Locked'}</span>
      </div>
      <p class="upgrade-desc">${a.desc}</p>
      ${prog}
    </div>`;
  }).join('');
  document.getElementById('tab-achievements').innerHTML = `
    <div class="tab-info">${uiIcon('trophy')} ${unlockedCount} / ${ACHIEVEMENTS.length} achievements unlocked.</div>
    <div class="card-grid">${cards}</div>`;
}

// ============================================================
// RENDER — Settings
// ============================================================
function renderSettings() {
  const isDark = settings.darkMode;
  const isHard = settings.difficulty === 'hard';
  const sfxMuted = !!settings.sfxMuted;
  const overhead = OVERHEAD_BY_LEVEL[state.upgrades.garageLevel] ?? 300;

  document.getElementById('tab-settings').innerHTML = `
    <div class="settings-panel">
      <div class="dash-card settings-card">
        <h3>${uiIcon('palette')} Display</h3>
        <div class="setting-row">
          <div>
            <div class="setting-label">Dark Mode</div>
            <div class="setting-desc">Easy on the eyes for late-night dealin'.</div>
          </div>
          <button class="toggle-btn ${isDark ? 'active' : ''}" onclick="toggleDarkMode()" aria-label="Toggle dark mode">
            <span class="toggle-thumb"></span>
          </button>
        </div>
        <div class="setting-row" style="margin-top:10px">
          <div>
            <div class="setting-label">Show Brand Wordmarks</div>
            <div class="setting-desc">Show per-make text wordmarks on vehicle cards.</div>
          </div>
          <button class="toggle-btn ${settings.showWordmarks ? 'active' : ''}" onclick="toggleWordmarks()" aria-label="Toggle brand wordmarks">
            <span class="toggle-thumb"></span>
          </button>
        </div>
      </div>

      <div class="dash-card settings-card">
        <h3>${uiIcon('speaker')} Sound</h3>
        <div class="setting-row">
          <div>
            <div class="setting-label">SFX</div>
            <div class="setting-desc">Subtle cozy interaction sounds for clicks, deals, and alerts.</div>
          </div>
          <button class="toggle-btn ${!sfxMuted ? 'active' : ''}" onclick="toggleSfxMuted()" aria-label="Toggle sound effects">
            <span class="toggle-thumb"></span>
          </button>
        </div>
        <div class="setting-row" style="margin-top:10px">
          <div>
            <div class="setting-label">Volume</div>
            <div class="setting-desc">${Math.round((settings.sfxVolume ?? 0.22) * 100)}%</div>
          </div>
          <input type="range" min="0" max="1" step="0.01" value="${settings.sfxVolume ?? 0.22}"
            onchange="setSfxVolume(this.value)" style="width:180px" ${sfxMuted ? 'disabled' : ''}>
        </div>
      </div>

      <div class="dash-card settings-card">
        <h3>${uiIcon('gear')} Economy Difficulty</h3>
        <div class="setting-row">
          <div>
            <div class="setting-label">Normal</div>
            <div class="setting-desc">Standard overhead & market volatility. Good for learning.</div>
          </div>
          <button class="btn btn-sm ${!isHard ? 'btn-primary' : 'btn-secondary'}" onclick="setDifficulty('normal')">
            ${!isHard ? '✔ Selected' : 'Select'}
          </button>
        </div>
        <div class="setting-row" style="margin-top:10px">
          <div>
            <div class="setting-label">Hard ${uiIcon('dumbbell')}</div>
            <div class="setting-desc">1.5× overhead, higher APR/min principal pressure, and bankruptcy is Game Over.</div>
          </div>
          <button class="btn btn-sm ${isHard ? 'btn-danger' : 'btn-secondary'}" onclick="setDifficulty('hard')">
            ${isHard ? '✔ Selected' : 'Select'}
          </button>
        </div>
      </div>

      <div class="dash-card settings-card">
        <h3>${uiIcon('clipboard')} Current Economy Info</h3>
        <div class="stat-row">
          <span>Difficulty</span>
          <strong class="${isHard ? 'text-red' : 'text-green'}">${isHard ? `Hard ${uiIcon('dumbbell')}` : 'Normal'}</strong>
        </div>
        <div class="stat-row">
          <span>Daily Overhead</span>
          <strong class="text-red">−${formatCurrency(Math.round(overhead * (isHard ? 1.5 : 1.0)))}/day</strong>
        </div>
        <div class="stat-row">
          <span>Daily Wages</span>
          <strong class="text-red">−${formatCurrency(getTotalStaffWages())}/day</strong>
        </div>
        <div class="stat-row">
          <span>Garage Level</span>
          <strong>Tier ${state.upgrades.garageLevel} (${state.garageSlots} slots)</strong>
        </div>
        <p class="text-muted" style="font-size:.82rem;margin-top:10px">
          ${uiIcon('info')} Overhead scales with garage size — only expand when you can handle the extra costs!
        </p>
      </div>
    </div>`;
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
    case 'garage':      renderGarage();          break;
    case 'forsale':     renderForSale();         break;
    case 'finance':     renderFinance();         break;
    case 'upgrades':    renderUpgrades();        break;
    case 'achievements':renderAchievements();    break;
    case 'settings':    renderSettings();        break;
  }
}

// ============================================================
// TAB SWITCHING
// ============================================================
function switchTab(name) {
  document.querySelectorAll('.tab-btn').forEach(b => {
    const active = b.dataset.tab === name;
    b.classList.toggle('active', active);
    b.setAttribute('aria-selected', active ? 'true' : 'false');
  });
  document.querySelectorAll('.tab-panel').forEach(p => p.classList.toggle('active', p.id === 'tab-' + name));
  switch (name) {
    case 'dashboard':   renderDashboard();       break;
    case 'factory':     renderFactory();         break;
    case 'usedmarket':  renderUsedMarket();      break;
    case 'garage':      renderGarage();          break;
    case 'forsale':     renderForSale();         break;
    case 'finance':     renderFinance();         break;
    case 'upgrades':    renderUpgrades();        break;
    case 'achievements':renderAchievements();    break;
    case 'settings':    renderSettings();        break;
  }
  playSfx('click');
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
  if (type === 'success') playSfx('success');
  else if (type === 'warning') playSfx('warning');
  else if (type === 'error') playSfx('error');
  else playSfx('click');
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
// SETTINGS (dark mode, difficulty)  — separate localStorage key
// ============================================================
let settings = {
  darkMode: false,
  difficulty: 'normal',
  sfxMuted: false,
  sfxVolume: 0.22,
  showWordmarks: true,
  showLeasedCars: true,
};
let audioCtx = null;
const SFX = {
  click:   [420, 0.03, 'triangle'],
  success: [660, 0.06, 'sine'],
  warning: [280, 0.08, 'sawtooth'],
  error:   [190, 0.09, 'square'],
  cash:    [520, 0.05, 'triangle'],
};

function loadSettings() {
  try {
    const raw = localStorage.getItem('dealerSim_settings');
    if (raw) settings = { ...settings, ...JSON.parse(raw) };
  } catch (_) {}
  if (settings.showLeasedCars === undefined) settings.showLeasedCars = true;
  applyDarkMode();
}

function saveSettings() {
  localStorage.setItem('dealerSim_settings', JSON.stringify(settings));
}

function applyDarkMode() {
  document.body.classList.toggle('dark', !!settings.darkMode);
}

function toggleDarkMode() {
  settings.darkMode = !settings.darkMode;
  applyDarkMode();
  saveSettings();
  renderSettings();
  playSfx('click');
}

function setDifficulty(level) {
  settings.difficulty = level;
  syncLoanTermsToDifficulty();
  saveSettings();
  renderAll();
  showToast(`Difficulty set to ${level === 'hard' ? 'Hard (Hard Mode)' : 'Normal'}.`);
  playSfx('click');
}

function toggleSfxMuted() {
  settings.sfxMuted = !settings.sfxMuted;
  saveSettings();
  renderSettings();
}

function setSfxVolume(raw) {
  const vol = clamp(parseFloat(raw), 0, 1);
  settings.sfxVolume = isNaN(vol) ? 0.22 : vol;
  saveSettings();
}

function toggleWordmarks() {
  settings.showWordmarks = !settings.showWordmarks;
  saveSettings();
  renderAll();
}

function playSfx(kind = 'click') {
  if (settings.sfxMuted) return;
  const config = SFX[kind];
  if (!config) return;
  try {
    if (!audioCtx) audioCtx = new (window.AudioContext || window.webkitAudioContext)();
    const [freq, dur, type] = config;
    const now = audioCtx.currentTime;
    const osc = audioCtx.createOscillator();
    const gain = audioCtx.createGain();
    osc.type = type;
    osc.frequency.setValueAtTime(freq, now);
    osc.frequency.exponentialRampToValueAtTime(Math.max(120, freq * 0.92), now + dur);
    // Short attack/decay envelope: exponential ramps cannot start/end at 0, so we clamp to tiny floors to avoid pops.
    gain.gain.setValueAtTime(SFX_MIN_GAIN, now);
    gain.gain.exponentialRampToValueAtTime(Math.max(SFX_FLOOR_GAIN, settings.sfxVolume * SFX_VOLUME_SCALE), now + SFX_ATTACK_SECONDS);
    gain.gain.exponentialRampToValueAtTime(SFX_MIN_GAIN, now + dur);
    osc.connect(gain);
    gain.connect(audioCtx.destination);
    osc.start(now);
    osc.stop(now + dur);
  } catch (_) {}
}

/** Live tone preview as player types in an offer amount on used market cards. */
function updateNegTone(offerId, rawVal) {
  const el = document.getElementById('neg-tone-' + offerId);
  if (!el) return;
  const amount = parseFloat(rawVal);
  if (!amount || isNaN(amount)) {
    el.textContent = 'Enter an offer to see seller\'s likely reaction.';
    el.className = '';
    return;
  }
  const offer = state.usedMarketOffers.find(o => o.id === offerId);
  if (!offer) return;
  const ratio = amount / offer.minAcceptPrice;
  const tone  = getSellerTone(ratio, offer.patience);
  el.innerHTML = `Seller reaction: <strong class="${tone.cls}">${tone.text}</strong>`;
}

// ============================================================
// INIT
// ============================================================
function init() {
  loadSettings(); // must be before any render so dark mode applies
  if (!loadState()) {
    state.usedMarketOffers = generateUsedMarket();
    syncLoanTermsToDifficulty();
    saveState();
  }
  syncLoanTermsToDifficulty();
  runAchievementChecks();
  ensureStaffCandidates();

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
    setFactoryMake, setFactoryModel,
    acceptUsedOffer, declineUsedOffer, inspectUsedOffer, submitUsedOffer, updateNegTone,
    acceptTradeInRequest, rejectTradeInRequest, counterTradeInRequest,
    acceptCustomerOffer, rejectCustomerOffer, counterCustomerOffer, applyStaffSuggestion,
    markForSale, updateListPrice, setListPriceMultiplier, markAllForSale, unlistAllCars, bulkSetListing,
    makeLeaseAvailable, stopOfferingLease, viewLeaseDetails, toggleShowLeasedCars,
    buyUpgrade, detailCar, carWash, basicRepair, partsUpgrade,
    drawLoan, payDownLoan,
    confirmNewGame, exportSave, hireStaff, dismissCandidate,
    toggleDarkMode, setDifficulty, toggleSfxMuted, setSfxVolume, toggleWordmarks,
    renderGarage, renderForSale, renderUsedMarket, renderFinance, renderAchievements,
  });

  renderAll();

  // Keyboard navigation — arrow keys cycle through visible tabs, ignore when focus is in input/select/textarea
  document.addEventListener('keydown', e => {
    const tag = document.activeElement?.tagName?.toLowerCase();
    if (tag === 'input' || tag === 'textarea' || tag === 'select') return;
    if (e.key !== 'ArrowLeft' && e.key !== 'ArrowRight') return;
    const tabs = [...document.querySelectorAll('.tab-btn:not([style*="display: none"]):not([style*="display:none"])')];
    if (!tabs.length) return;
    const activeIndex = tabs.findIndex(t => t.classList.contains('active'));
    let next = activeIndex + (e.key === 'ArrowRight' ? 1 : -1);
    if (next < 0) next = tabs.length - 1;
    if (next >= tabs.length) next = 0;
    tabs[next].click();
    tabs[next].focus();
    e.preventDefault();
  });
}

init();

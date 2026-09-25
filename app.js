/**
 * DealerSim — Car Dealership Simulator
 * Vanilla JS ES Module — no external libraries.
 *
 * NOTE: ES modules require a web server (HTTP/HTTPS).
 * Open via `npx serve .` or GitHub Pages — direct file:// won't work.
 */

import { CAR_CATALOG } from './data/cars.js';

// ============================================================
// GAME VERSION & PATCH NOTES
// ============================================================
const GAME_VERSION = '1.6.3';

const PATCH_NOTES = [
  {
    version: '1.6.3',
    date: 'September 2026',
    notes: [
      { type: 'feature', text: 'Huge catalog expansion — over 100 new cars added, bringing the total to 706. New everyday picks include the Chevrolet Tahoe, Ford Escape, Hyundai Palisade, Subaru Crosstrek, Kia Soul, Porsche Macan, Mercedes-Benz G-Class, Tesla Model X, Range Rover, and the Ford Mustang Mach-E.' },
      { type: 'feature', text: 'Minivans have arrived — Honda Odyssey, Toyota Sienna, Chrysler Pacifica, and Kia Carnival are now buyable (filed under the SUV segment).' },
      { type: 'feature', text: 'Nearly two dozen new discontinued classics added to the Used Market as rare finds, including the Honda S2000, Mazda RX-7, Mitsubishi Lancer Evolution, Cadillac CTS-V, Toyota FJ Cruiser, Chevrolet Avalanche, and the meme-famous Pontiac Aztek.' },
    ],
  },
  {
    version: '1.6.2',
    date: 'September 2026',
    notes: [
      { type: 'balance', text: 'Big sell-rate rebalance — selling on Normal was taking far too long, especially for cheap cars priced with any normal profit margin. Base daily sale chance is up from 8% to 10%.' },
      { type: 'balance', text: 'The "fair price" zone before any overpricing penalty kicks in is now 10% over market value (was 5%), and the penalty past that point ramps up more gently — a normal dealer markup no longer tanks your sale odds.' },
      { type: 'balance', text: 'Cheap cars now sell noticeably faster: the price-tier factor for cars under $30k is up from 1.10× to 1.40×, and under $55k from 1.00× to 1.18×. A fairly-priced, decent-condition cheap car should now sell within about a week, often much sooner.' },
      { type: 'balance', text: 'Expensive cars are correspondingly harder, on purpose — the $140k–$220k tier factor is down from 0.38× to 0.32×, and $220k+ down from 0.20× to 0.16×. High-end cars still need the Luxury Clientele upgrades to move at a reasonable pace, and an overpriced expensive car can now sit for a very long time.' },
      { type: 'balance', text: 'Condition B (Good) cars get a small sale-chance bump (was neutral, now +5%); Condition C and D no longer tank sale chance quite as hard (0.70×/0.40× → 0.75×/0.45×).' },
      { type: 'balance', text: 'Price-rating labels (Fair Price / Slightly High / Above Market) in the Garage and For Sale tabs now line up with the new 10%/25% thresholds instead of the old 5%/20%.' },
    ],
  },
  {
    version: '1.6.1',
    date: 'September 2026',
    notes: [
      { type: 'balance', text: 'Car Wash now requires a new Wash Station upgrade ($4,000, Reconditioning category) instead of being available for free from day one. Washing is still cheap and repeatable once unlocked.' },
      { type: 'balance', text: 'Reworked the payoff for washing: value boost per wash is up from +3% to +4% (so it is a real, permanent bump to what the car is worth — not just a temporary sale-chance trick), and the temporary sale-chance bonus is up from +8% to +10%. Wash price down from $150 to $125 per wash to offset the new upgrade cost.' },
      { type: 'fix', text: 'Wash button now shows a clear "Locked" state with a tooltip when you have not bought the Wash Station yet, matching how Detailing and Repair already communicate their upgrade requirements.' },
    ],
  },
  {
    version: '1.6.0',
    date: 'September 2026',
    notes: [
      { type: 'feature', text: 'Upgrades overhaul: every upgrade is now tagged Early / Mid / Late / Endgame, grouped into a logical category order, and shows exactly what it needs ("Requires Garage Tier 3 + Staff Office") instead of misleadingly reading \"Purchased / Max Level\" while locked. Bigger dealerships unlock bigger upgrades — Staff Office, CRM, AI Pricing, and the larger marketing/efficiency levels now scale with your lot size.' },
      { type: 'feature', text: 'The late game finally has things to spend money on. New: Garage Tier 6 (75 slots) and Tier 7 Auto Mall (100 slots); Credit Line tiers IV and V (up to +$2M of borrowing power); Fortress Protocol security (−90% theft); a 4th Marketing level; a 4th Cost Efficiency level; and Fleet Leasing.' },
      { type: 'feature', text: 'New Sourcing upgrades — Dealer Trade Network, Wholesale Auction Membership, and Exotic Consignment Network — add Used Market listings and (late game) make premium and exotic cars show up far more often, so a 50–100 slot lot is not starved of inventory.' },
      { type: 'feature', text: 'New Luxury Clientele chain — Luxury Client Lounge, Private Client Network, and Global Collector Network — widens the buyer pool for $90k+, $140k+ and $220k+ cars. Expensive cars used to sit for months no matter what you did; now there is a real progression to fix it.' },
      { type: 'feature', text: 'New Certified Pre-Owned Program: inspected or repaired cars with a clean title, Good/Excellent condition, and no open issues, crash history, or legal flags earn a Certified badge and +18% sale chance — finally a payoff for doing the recon work.' },
      { type: 'feature', text: 'Factory allocation is now real: Factory Allocation Program unlocks $90k+ invoice cars, the new Exotic Allocation License unlocks $250k+ exotics, and the new Hypercar Allocation Charter unlocks $1M+ hypercars. Locked cars stay visible in the Factory with the upgrade they need.' },
      { type: 'fix', text: 'Reconditioning Workshop did nothing — repairs took the same one day with or without it. It now makes Basic Repairs and Parts Upgrades finish instantly (no bay tied up) and cuts repair costs by 15%.' },
      { type: 'fix', text: 'Lease Management System now actually does what it claimed: on top of +8% payments it adds +25% lease-lead chance and one extra lease start per day. The new Fleet Leasing Program stacks further.' },
      { type: 'balance', text: 'Cost Efficiency Program was a trap ($14k for −$50/day). It is now −10% of lot overhead per level with escalating prices ($5k / $12k / $24k / $45k), so it scales with your lot. The Dashboard and Settings overhead readouts now include the discount.' },
      { type: 'balance', text: 'Marketing Campaign, Reputation Boost, and Cost Efficiency now cost more with each level instead of a flat price forever.' },
      { type: 'balance', text: 'Service capacity upgrades now also raise the value of the jobs you land (+35% / +90% / +180%) and attract premium cars, so the $30k–$180k price tags pay back in proportion to what the shop earns. Service capacity now requires the Service Bay.' },
      { type: 'balance', text: 'Detailing and Parts Upgrade costs now scale with the car\'s value (still $500 / $1,500 minimum). A flat $500 detail on a $1M car was effectively free money. Performance Shop now requires the Service Bay.' },
      { type: 'balance', text: 'Factory Allocation Program now costs $55k (was $35k) since it unlocks the premium factory catalog. Existing owners keep it.' },
      { type: 'fix', text: 'Removed claims that were never implemented (Inspection Tool "improves accuracy", Security Camera "requires Day 50+"). The "Investing in the Future" achievement now unlocks on your first upgrade of any kind, including a single Marketing Campaign.' },
    ],
  },
  {
    version: '1.5.5',
    date: 'September 2026',
    notes: [
      { type: 'feature', text: 'Added a Credit Score (300–850) on the Finance tab, tracked separately from the loan itself. On Normal/Hard, ending a day cash-negative dings your credit score even with no loan — it doesn\'t trigger a "missed payment" strike, but it does raise the APR you\'re offered on any loan, current or future. Staying cash-positive slowly rebuilds the score, and bankruptcy takes a severe one-time hit.' },
    ],
  },
  {
    version: '1.5.4',
    date: 'September 2026',
    notes: [
      { type: 'fix', text: 'Going cash-negative with no outstanding loan balance no longer counts as a missed payment. The late-payment/delinquency ladder (warnings, credit freeze, APR hikes, bankruptcy) now only triggers off an actual loan — being broke with no loan is no longer treated as loan default.' },
    ],
  },
  {
    version: '1.5.3',
    date: 'September 2026',
    notes: [
      { type: 'feature', text: 'Sound pass across the whole game. Every button now has a light tactile click, the main menu has its own audio identity (an engine-ignition sound for Play/Continue/New Save, a soft whoosh for moving between menu panels, a chime for opening/closing dialogs), the tutorial plays a chime each step and a fanfare on completion, advancing to a new day has its own rising sweep, and the Game Over screen plays a somber closing phrase.' },
      { type: 'feature', text: 'Deleting a save slot, opening the delete-confirmation dialog, and adjusting the SFX volume slider now all have their own distinct sounds instead of being silent.' },
    ],
  },
  {
    version: '1.5.2',
    date: 'September 2026',
    notes: [
      { type: 'feature', text: '10 more funny achievements — Flash Flip, Brand Loyalist, Yelp Reviews Be Like, Local Legend, Something For Everyone, Lot Lizard, Fire Sale Friday, Grandma\'s Car, It\'s Got Stories, and Rookie Mistake, plus four new secrets.' },
    ],
  },
  {
    version: '1.5.1',
    date: 'September 2026',
    notes: [
      { type: 'feature', text: 'Overhauled the new-game tutorial. It now actually guides you: while it\'s running, only the glowing highlighted element responds to clicks, so you can\'t wander off-script and end up with the highlight stuck in the wrong place. The Factory step spotlights one specific, pre-selected car (the cheapest available — the best low-risk first buy) instead of the whole tab, and the tutorial now continues past your first sale to walk you through buying a car on the Used Market, including a nod to Inspect and Negotiate, before wrapping up with a pointer to Service, Finance, Staff, Upgrades, and Achievements.' },
      { type: 'fix', text: 'Fixed the tutorial\'s highlight box drifting to the wrong spot after navigating away from the expected tab or resizing the window.' },
    ],
  },
  {
    version: '1.5.0',
    date: 'September 2026',
    notes: [
      { type: 'balance', text: 'Service Bay job volume now builds up gradually instead of being available at full strength the moment you unlock it. A brand-new shop starts with a small trickle of customers (2 waiting-room slots, a low daily arrival chance) and grows over roughly its first couple of months open — and faster the more jobs you complete — up to the same maximum waiting room as before. Existing saves keep their current job volume; only shops unlocked from here on start small.' },
      { type: 'feature', text: 'Discontinued models: 26 vehicles (Bugatti Veyron & Chiron, Dodge Viper, and 15 new classic/defunct-brand additions like the Pontiac GTO, Toyota Supra Mk4, Skyline GT-R R34, Hummer H2, and more) are now out of production. They can no longer be special-ordered new from the Factory — they only ever show up on the Used Market, and only within the actual model years they were really built, so they\'re genuinely rare, one-of-a-kind finds. Marked with a "🏛️ Discontinued" badge showing their production years.' },
      { type: 'feature', text: 'Added 8 new current-production models to the catalog: Tesla Model 3, Model Y, and Model S, plus the Rivian R1T and R1S.' },
      { type: 'balance', text: 'Rebalanced how fast cars sell to be less about "fairly priced = sells at the same rate" and more true-to-life: SUVs, trucks, economy cars, and sedans now move noticeably faster than Sports and Luxury cars even at an identical price-to-value ratio, expensive cars sell more slowly than cheap ones purely because fewer buyers can afford them (not because of overpricing), and a car\'s Condition grade and any crash/accident history now have a much bigger direct effect on how quickly it finds a buyer — none of this changes what a car is worth or what you can list it for, only how fast it moves. Car Lot cards now show a "Market Segment" rating and an "Accident History" note (once discovered) explaining why.' },
    ],
  },
  {
    version: '1.4.7',
    date: 'September 2026',
    notes: [
      { type: 'fix', text: 'Trade-in offers had no way to reveal a stolen car, a missing/altered title, a scratched VIN, or hidden mechanical issues before you accepted — the data existed but there was no Inspect option. Trade-ins now have their own Inspect button and warning badges, matching the Used Market.' },
      { type: 'fix', text: 'All the relevant inspection upgrades now work on trade-ins too: Inspection Tool (cheaper inspections), DMV Database Access (reveals stolen/no-title cars), VIN Scanner (reveals altered VINs), Frame Damage Tools (reveals crash severity), and Title Recovery Service (fix a no-title trade-in before accepting it).' },
    ],
  },
  {
    version: '1.4.6',
    date: 'September 2026',
    notes: [
      { type: 'fix', text: 'Hard-mode Game Over now deletes that save instead of leaving it sitting in the slot — you can no longer refresh, return to the menu, or reopen the app to sneak back into a run that already went bankrupt on Hard. "New Game" from the Game Over screen still starts a genuine new Hard run.' },
    ],
  },
  {
    version: '1.4.5',
    date: 'September 2026',
    notes: [
      { type: 'fix', text: 'Fixed sound not playing across large parts of the site — the audio engine could get stuck "suspended" by the browser (especially when resuming a saved session), permanently silencing every sound effect until a hard refresh.' },
      { type: 'feature', text: 'Reworked sound effects into unique, purpose-built game sounds — a cash-register "cha-ching" for sales/trade-ins, a rounder purchase tone for spending, a friendly chime for hiring staff, and a 4-note fanfare for achievements — instead of one generic beep for everything.' },
      { type: 'fix', text: 'Added sound/confirmation toasts to actions that were previously silent: accepting a customer offer, accepting a trade-in, and washing a car.' },
      { type: 'balance', text: 'Rebalanced used-market asking prices — sellers now usually price at or a little above what the car is actually worth (like real sellers do), with a smaller chance of a below-market deal and only a rare, small chance of an unrealistic reach. Previously, every used-car listing was priced below market value.' },
    ],
  },
  {
    version: '1.4.4',
    date: 'September 2026',
    notes: [
      { type: 'fix', text: 'Factory orders no longer come in Fair or Poor condition — brand-new cars from the factory are now always Excellent or Good, matching the fact that they\'re fresh off the line rather than used.' },
    ],
  },
  {
    version: '1.4.3',
    date: 'September 2026',
    notes: [
      { type: 'feature', text: 'Staff now has its own tab in the main navigation, separate from Upgrades — hired staff, hiring candidates, and the staff activity feed all live there now.' },
      { type: 'fix',     text: 'Staff tab shows a locked overlay (matching the Service tab) until the Staff Office upgrade is purchased, instead of the hiring UI simply being absent.' },
    ],
  },
  {
    version: '1.4.2',
    date: 'September 2026',
    notes: [
      { type: 'feature', text: 'What\'s New popup restyled — the "Got it!" button now sits in a pinned header next to the title, so you can dismiss it without scrolling through every version block.' },
      { type: 'fix',     text: 'Service job issue tags no longer run off the side of their cards; chip-style values now wrap onto as many lines as they need.' },
      { type: 'feature', text: 'Custom themed scrollbars throughout the app, replacing the default browser ones.' },
    ],
  },
  {
    version: '1.4.1',
    date: 'September 2026',
    notes: [
      { type: 'feature', text: 'Refreshing the page now drops you straight back into your game — same save slot, same tab — instead of kicking you out to the title screen. Returning to the menu on purpose still works as before.' },
      { type: 'fix',     text: 'Trade-in request cards no longer push the "Your Car" panel outside the card border; the two halves now sit side by side when there is room and stack when there is not.' },
      { type: 'fix',     text: 'Spec rows (Source, Lease Status, Price Rating, etc.) no longer smoosh label and value together — if the value cannot fit beside its label it drops to its own line. Applied globally, so this cannot happen on any card.' },
      { type: 'fix',     text: 'Counter-offer and list-price input rows now wrap instead of overflowing their cards on narrow layouts.' },
    ],
  },
  {
    version: '1.4.0',
    date: 'September 2026',
    notes: [
      { type: 'feature', text: 'UI overhaul — a cleaner, more consistent look across every tab.' },
      { type: 'fix',     text: 'Condition and title badges now always sit flush against the right edge of a car card, instead of drifting left or dropping to a new line when the car name is long.' },
      { type: 'fix',     text: 'Price and offer input boxes no longer use the leftover orange/brown fill — they now match the blue theme, with proper placeholder, hover and focus states.' },
      { type: 'chore',   text: 'Card shadows retinted from warm brown to a neutral deep blue so they blend with the rest of the interface.' },
    ],
  },
  {
    version: '1.3.5',
    date: 'July 2026',
    notes: [
      { type: 'fix',     text: 'Own-car repairs now use the same Service Bay capacity pool as customer jobs, and Service tab bay occupancy now reflects both.' },
      { type: 'feature', text: 'Expanded factory catalog with additional performance and exotic options, including Pagani and other high-end models.' },
      { type: 'fix',     text: 'BMW lineup normalized for factory navigation: M models are now represented as trims under the appropriate numbered series.' },
      { type: 'fix',     text: 'Brand wordmarks/watermarks removed from the UI and settings for a cleaner, simpler vehicle display.' },
      { type: 'feature', text: 'Achievements list reordered into a clearer progression while preserving existing achievement IDs and save compatibility.' },
      { type: 'chore',   text: 'Car catalog data reorganized for readability and maintainability as part of the 1.3.5 update.' },
    ],
  },
  {
    version: '1.3.4',
    date: 'April 2026',
    notes: [
      { type: 'fix',     text: 'Service screen locked overlay now extends fully to all edges of the UI container — no more unblurred gaps on wide/large displays.' },
      { type: 'fix',     text: '"Stop Offering Lease" button text now wraps gracefully instead of overflowing its background at large screen widths.' },
      { type: 'feature', text: '10 new funny achievements — Rust Enthusiast, Debt Is Just a Number, Full House, Lemon Grove, Grease Monkey, Three Strikes, Big Draw, Loss Leader, Marathon Man, plus two secrets.' },
      { type: 'feature', text: 'New Game / Reset button removed from the Dashboard. Import Save and Export Save have moved to the Settings tab.' },
      { type: 'fix',     text: 'Finance page no longer says "Delinquency" — replaced with "Late payments" throughout for friendlier wording.' },
      { type: 'feature', text: 'Credit rebuild mechanic: after recovering from late payments, your credit score slowly improves over time on Normal mode. No recovery on Hard.' },
      { type: 'feature', text: 'Hard-mode bankruptcy now shows a proper Game Over screen with stats and return-to-menu options instead of an abrupt modal.' },
      { type: 'feature', text: 'New achievement for going bankrupt on Hard mode: "Hard Knocks".' },
      { type: 'feature', text: 'Easter eggs added — explore and discover!' },
    ],
  },
  {
    version: '1.3.3',
    date: 'April 2026',
    notes: [
      { type: 'feature', text: 'Renamed Garage tab to Service — all navigation labels and headings now say "Service".' },
      { type: 'feature', text: 'Service tab locked until Service Bay upgrade is purchased — the tab shows a greyed-out overlay with a lock icon and message. Once the upgrade is bought the overlay disappears and full service functionality is available.' },
      { type: 'fix', text: 'Fixed service payout collection — the Collect button now always works when a job is marked Ready; removed the erroneous upfront-cash block that sometimes prevented collecting.' },
      { type: 'fix', text: 'Corrected Collect button label — now shows the actual net payout ("+$X profit") instead of the labor cost.' },
    ],
  },
  {
    version: '1.3.2',
    date: 'April 2026',
    notes: [
      { type: 'fix', text: 'Player inventory cars and leased cars that need service or have damage now always appear in the Service tab, regardless of whether the Service Bay upgrade has been purchased. The repair button is still gated on the upgrade.' },
      { type: 'fix', text: 'Start Service button now works correctly — the function was not accessible to inline onclick handlers due to a missing entry in the global function registry.' },
    ],
  },
  {
    version: '1.3.1',
    date: 'April 2026',
    notes: [
      { type: 'fix', text: 'Service bay slots are now only occupied for the actual service duration. Clicking "Start Service" begins the job and claims a bay for the repair period; slots free up automatically when the job completes.' },
      { type: 'fix', text: 'Workers can now assist with trade-in requests — they will evaluate pending deals and suggest whether to accept or counter, matching the same workflow already available for customer offers.' },
      { type: 'fix', text: 'Workers can now assist with listing cars for sale — a "Staff: List All Cars" action in the Car Lot lets workers instantly price and list every ready, unlisted car at market value.' },
      { type: 'fix', text: 'Player-owned lot cars and leased cars that need service or have damage now appear in the Garage tab so they can be repaired without switching to the Car Lot.' },
    ],
  },
  {
    version: '1.3.0',
    date: 'April 2026',
    notes: [
      { type: 'feature', text: 'Car Lot vs Garage: the inventory page is now called "Car Lot" and a new dedicated "Garage" page handles customer service & repair jobs.' },
      { type: 'feature', text: 'Customer service system — customer cars return for maintenance and repairs. Oil changes and small maintenance (brakes, tires, alignment) are common; crash damage and major work are rare. Complete jobs to earn revenue.' },
      { type: 'feature', text: 'Concurrent repair limit — only a set number of customer cars can be serviced at once. Upgrade your service capacity to take on more jobs simultaneously.' },
      { type: 'feature', text: 'Car theft system — cars on the lot can be stolen in the late game. Theft chance starts near zero and ramps up with progression, so early play is safe.' },
      { type: 'feature', text: 'Dealership Security upgrades — three expensive end-game tiers (Security Camera System, Guard Station, Elite Security Suite) that slash theft chance by 25 / 50 / 75 %.' },
      { type: 'feature', text: 'Service Garage Capacity upgrades — expand from 3 to 5 / 8 / 12 concurrent customer service slots.' },
      { type: 'feature', text: 'Keybind — press N to advance to the next day from the main game screen.' },
      { type: 'feature', text: 'Changelog UI — the home screen patch notes panel is now a compact collapsible button: click "v1.3.0 · Change Log" to toggle the scrollable history open or closed.' },
    ],
  },
  {
    version: '1.2.1',
    date: 'April 2026',
    notes: [
      { type: 'feature', text: 'Easy mode added — zero daily overhead, no loan interest, no minimum principal, and no bankruptcy game-over. Great for a relaxed playthrough.' },
      { type: 'feature', text: 'Difficulty is now chosen when creating a save slot (Easy / Normal / Hard) and locked for that save — no more mid-run switching.' },
      { type: 'feature', text: 'Trade-in negotiations are now true back-and-forth — no round limit. NPCs will accept your counter (probability-based), counter back, or walk away. Deals end only when a side accepts or rejects.' },
      { type: 'fix', text: 'Difficulty removed from in-game Settings and home-screen Settings panel; it is set permanently at save creation.' },
      { type: 'fix', text: 'Tutorial spotlight now resizes correctly after listing a car for sale, and the Next button enables immediately when the step is completed.' },
    ],
  },
  {
    version: '1.2.0',
    date: 'April 2026',
    notes: [
      { type: 'feature', text: 'Interactive onboarding tutorial for new saves — guides you step-by-step through buying your first factory car, listing it, and completing your first sale. Skippable and can be disabled in Settings.' },
      { type: 'feature', text: 'Mobile-friendly home screen — menus, save slots, and settings panels now fit properly on small phone screens (320–420 px wide) with responsive padding and layout.' },
      { type: 'fix', text: 'Tutorial settings toggle added to the main Settings panel so you can re-enable or disable onboarding guidance at any time.' },
    ],
  },
  {
    version: '1.1.1',
    date: 'April 2026',
    notes: [
      { type: 'balance', text: 'Anti-exploit selling: asking price is now strongly checked against market value. Overpriced cars receive sharply fewer leads and buyer interest drops steeply — at 2× market value you will see almost no serious buyers; beyond 3× market value sales are effectively impossible.' },
      { type: 'balance', text: 'Buyer offers are now anchored to market value, not list price. Overpriced listings attract lowballers who offer based on what the car is actually worth, not your asking price.' },
      { type: 'balance', text: 'Stale listing penalty strengthened for overpriced cars: leads decay faster every day the car sits unsold above market value.' },
      { type: 'feature', text: 'Price label shown on each For Sale listing: Fair Price / Slightly High / Overpriced / Way Over Market / Extreme — with matching interest indicator.' },
    ],
  },
  {
    version: '1.1.0',
    date: 'April 2026',
    notes: [
      { type: 'balance', text: 'Used-car damage rebalanced: Good and Excellent condition cars now rarely have crash damage or mechanical issues. Damage frequency and severity scale with condition grade.' },
      { type: 'feature', text: 'Patch notes popup shown once after each update. Current patch notes are also visible on the Home screen.' },
      { type: 'feature', text: 'Garage Tier 5 — expand your lot to 50 slots ($200,000).' },
      { type: 'feature', text: 'Stolen & no-title cars — some used cars have suspect legal status; police can fine or impound you for holding or selling them.' },
      { type: 'feature', text: 'Scratched VIN mechanic — altered VINs increase police detection risk when selling.' },
      { type: 'feature', text: 'Hidden crash damage severity — Minor, Moderate, and Severe tiers with distinct repair costs and resale value impacts.' },
      { type: 'feature', text: 'New upgrades: DMV Database Access, VIN Scanner Kit, Title Recovery Service, Frame Damage Inspection Tools, Compliance Training.' },
      { type: 'feature', text: 'New achievements: Big Lot, Not Today, Paperwork Pro, Busted!, Eagle Eye, Crash Rebuilder.' },
      { type: 'fix', text: 'Buy / Confirm / Accept buttons in used car purchase, trade-ins, and negotiation offers are now reliably clickable.' },
      { type: 'fix', text: '"Stop Offering Lease" button text now fits correctly at all screen sizes.' },
    ],
  },
  {
    version: '1.0.0',
    date: 'March 2026',
    notes: [
      { type: 'feature', text: 'Initial release: buy, repair, and sell cars; factory orders; used market with negotiation; leasing; trade-ins; staff management; loan system.' },
    ],
  },
];

// ============================================================
// DEFAULT STATE
// ============================================================
const DEFAULT_STATE = {
  saveVersion: 14,
  difficulty: 'normal',
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
    washStation: false,
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
    // New upgrades
    dmvDatabaseAccess: false,
    vinScanner: false,
    titleRecovery: false,
    frameDamageTools: false,
    complianceTraining: false,
    // v1.3.0
    securityLevel: 0,
    serviceCapacityLevel: 0,
    // v1.6.0 — upgrade overhaul
    tradeNetwork: false,
    auctionAccess: false,
    exoticConsignment: false,
    certifiedProgram: false,
    privateClientNetwork: false,
    collectorNetwork: false,
    exoticLicense: false,
    hypercarCharter: false,
    creditLineBoost4: false,
    creditLineBoost5: false,
    fleetLeasing: false,
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
  creditScore: 700, // starting credit score — see CREDIT_SCORE_START below for the same value used elsewhere
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
  // New tracking counters
  stolenCarsAvoided: 0,
  cleanTitleSalesVerified: 0,
  crashDamageRebuilds: 0,
  policeFinesReceived: 0,
  severeDamageFoundBeforeBuy: 0,
  // v1.3.0 — service garage + theft
  serviceGarage: [],
  serviceGarageCapacity: 3,
  totalServiceJobsCompleted: 0,
  totalCarsStolen: 0,
  // v1.5.0 — tracks the day the Service Bay was unlocked so job volume can ramp up
  // gradually from a small new shop instead of being maxed out on day one.
  serviceBayUnlockedDay: null,
  // v1.3.4 — credit recovery + easter eggs + game over tracking
  daysGoodStanding: 0,
  hardBankruptcyOccurred: false,
  konamiActivated: false,
  logoClickCount: 0,
};

let state = JSON.parse(JSON.stringify(DEFAULT_STATE));

// ============================================================
// CONSTANTS
// ============================================================
const CONDITIONS = ['A', 'B', 'C', 'D'];
const CONDITION_NAMES  = { A: 'Excellent', B: 'Good', C: 'Fair', D: 'Poor' };
// Condition affects how fast a car sells, not just what it's worth. Widened so a rough
// (D) car is a real drag on lot turnover, not a minor footnote.
const CONDITION_FACTOR = { A: 1.25, B: 1.05, C: 0.75, D: 0.45 };
const CONDITION_VALUE  = { A: 1.05, B: 0.92, C: 0.75, D: 0.58 };

// ------------------------------------------------------------------
// Real-world buyer-pool modeling for sale speed (NOT price)
// ------------------------------------------------------------------
// Two cars fairly priced at their own market value should NOT sell at the same rate.
// A Corolla and a Ferrari priced fairly both "fair deals," but the Corolla has a
// vastly bigger pool of people who can afford/want it, so it moves faster. None of
// this changes what a car is worth or what you can list it for — computeSaleChance
// still prices purely off askRatio (listPrice / marketValue) for that. This section
// only changes how quickly a buyer walks in the door.

// Body-style popularity: SUVs/trucks/economy/sedans appeal to the broadest audience
// in real life, while Sports and Luxury cars are desirable but niche — a smaller slice
// of buyers is shopping for (or can justify) them, so they sit longer even when priced
// exactly right. This stacks with each model's own `demandFactor` from the catalog.
const CATEGORY_POPULARITY = {
  SUV:     1.18,
  Truck:   1.12,
  Economy: 1.15,
  Sedan:   1.05,
  Sports:  0.72,
  Luxury:  0.65,
};

/**
 * The buyer pool shrinks as absolute price climbs, independent of how the price
 * compares to the car's own market value. Fewer people can write a $150k check than
 * a $20k one, full stop — that's true even if the $150k car is a screaming deal
 * relative to its own market value. This is what makes expensive cars sell slower
 * than cheap ones even when both are priced fairly.
 */
function getPriceTierFactor(marketValue) {
  if (marketValue < 30000)  return 1.40;
  if (marketValue < 55000)  return 1.18;
  if (marketValue < 90000)  return 0.88;
  if (marketValue < 140000) return 0.55;
  if (marketValue < 220000) return 0.32;
  return 0.16;
}

// Crash history spooks buyers beyond the price hit it already takes on market value —
// a car with a known accident is a harder sell at the SAME price as a clean one, the
// same way a real buyer gets cold feet over a Carfax flag even at a "fair" price.
// Severe damage is a much bigger red flag than minor cosmetic history.
const CRASH_STIGMA_FACTOR = { none: 1.00, minor: 0.90, moderate: 0.68, severe: 0.42 };
// Even after a repair, the accident stays on record — a repaired car still sells a
// little slower than one that was never in a wreck.
const CRASH_HISTORY_STIGMA = 0.88;
const TITLE_STATUSES = ['clean', 'rebuilt', 'salvage', 'lemon'];
const TITLE_LABELS = { clean: 'Clean', rebuilt: 'Rebuilt', salvage: 'Salvage', lemon: 'Lemon' };
const TITLE_VALUE_MULT = { clean: 1.00, rebuilt: 0.85, salvage: 0.67, lemon: 0.56 };
const TITLE_BUYER_MULT = { clean: 1.00, rebuilt: 0.90, salvage: 0.72, lemon: 0.58 };
const LIQUIDATION_MULT = { clean: 0.78, rebuilt: 0.68, salvage: 0.55, lemon: 0.45 };
const TRANSACTION_FEE  = 0.02;

const PERF_ELIGIBLE = ['Sports', 'SUV', 'Truck']; // categories eligible for parts upgrade

// Daily garage overhead costs by garage level
const OVERHEAD_BY_LEVEL = { 1: 300, 2: 600, 3: 1200, 4: 1800, 5: 2600, 6: 3800, 7: 5400 };

// Legal / VIN / stolen car mechanics
const LEGAL_STATUSES = ['clean', 'noTitle', 'stolen'];
const VIN_STATUSES   = ['normal', 'scratched'];
const CRASH_DAMAGE_SEVERITIES = ['none', 'minor', 'moderate', 'severe'];
const CRASH_DAMAGE_REPAIR_MULT  = { none: 0, minor: 0.12, moderate: 0.40, severe: 0.85 };
const CRASH_DAMAGE_VALUE_PENALTY = { none: 0, minor: 0.04, moderate: 0.14, severe: 0.28 };
// Police fine ranges per legal status (min, max)
const POLICE_FINE = {
  stolen:  { min: 3000, max: 10000, impound: true  },
  noTitle: { min: 500,  max: 2500,  impound: false },
  scratchedVin: { min: 300, max: 1000, impound: false },
};

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
  easy:   { limit: 60000, apr: 0,    minPrincipalRate: 0 },
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
const LEASE_DEPRECIATION_DIVISOR = 84000;   // Mileage-based depreciation (5× more aggressive than before)
const LEASE_DAILY_TIME_DEPRECIATION_RATE = 0.001; // 0.1%/day time-based depreciation applied during lease
const LEASE_CRASH_PROBABILITY = 0.0002;     // ~0.05%/day: rare crash (~3–9% chance over a full lease term)
const LEASE_CRASH_REPAIR_COST_MIN = 0.90;   // Minimum repair cost multiplier after crash (90% of market value)
const LEASE_CRASH_REPAIR_COST_MAX = 1.30;   // Maximum repair cost multiplier after crash (130% of market value)
const LEASE_CRASH_STRUCTURAL_RATIO = 0.60;  // Portion of repair cost attributed to structural crash damage
const LEASE_ISSUE_BONUS_HARD_DIFFICULTY = 0.0015;
const LEASE_ISSUE_BONUS_LEMON = 0.003;
const LEASE_ISSUE_BONUS_SALVAGE = 0.0015;
// Repair cost scaling thresholds by mileage (see computeRepairCost)
const REPAIR_COST_BASE_MIN = 500;        // Minimum base parts/labour cost even with no issues
const REPAIR_WARN_COST_RATIO = 0.6;      // Warn player when repair cost exceeds 60% of market value
const REPAIR_JUNK_COST_RATIO = 1.0;      // "Beyond economical repair" when cost ≥ market value
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
// Credit score — tracks the player's overall ability to cover obligations
// (operating costs AND loan payments) independent of whether a loan is even
// active. It's what future/ongoing loan APR is priced from, so it's the one
// thing that can quietly get worse even with a $0 loan balance.
const CREDIT_SCORE_MIN   = 300;
const CREDIT_SCORE_MAX   = 850;
const CREDIT_SCORE_START = 700;
const CREDIT_SCORE_DROP  = { normal: 12, hard: 20 }; // points lost per day cash ends negative
const CREDIT_SCORE_RECOVERY_PER_DAY = 3;             // points regained per day cash stays non-negative
const CREDIT_SCORE_BANKRUPTCY_DROP  = 120;           // severe one-time hit on bankruptcy
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
  lock:         '<rect x="3" y="11" width="18" height="11" rx="2" ry="2"/><path d="M7 11V7a5 5 0 0 1 10 0v4"/>',
  shield:       '<path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/>',
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
  // v1.3.0 — security + service garage
  '📹': 'camera', '💂': 'lock', '🛡️': 'shield', '🏙️': 'building',
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
const ACHIEVEMENT_DEFS = [
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
    check: s => Object.entries(s.upgrades||{}).some(([k, v]) => v === true || (typeof v === 'number' && v > (k === 'garageLevel' ? 1 : 0))) },
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
  // Legal / VIN / stolen mechanics achievements
  { id: 'garage_tier5',        icon: ACH_ICONS.layers,     name: 'Big Lot',                desc: 'Upgrade garage to Tier 5 (50 slots).',
    check: s => (s.upgrades?.garageLevel || 1) >= 5 },
  { id: 'not_today',           icon: ACH_ICONS.shield,     name: 'Not Today',              desc: 'Detect and refuse to buy 10 stolen cars.',
    check: s => (s.stolenCarsAvoided || 0) >= 10, progress: s => (s.stolenCarsAvoided||0) + '/10' },
  { id: 'paperwork_pro',       icon: ACH_ICONS.star,       name: 'Paperwork Pro',          desc: 'Sell 25 verified clean-title cars.',
    check: s => (s.cleanTitleSalesVerified || 0) >= 25, progress: s => (s.cleanTitleSalesVerified||0) + '/25' },
  { id: 'busted',              icon: ACH_ICONS.alert,      name: 'Busted!',                desc: 'Get fined by police for a stolen or no-title car.',
    check: s => (s.policeFinesReceived || 0) >= 1 },
  { id: 'eagle_eye',           icon: ACH_ICONS.lock,       name: 'Eagle Eye',              desc: 'Discover severe hidden crash damage before buying.',
    check: s => (s.severeDamageFoundBeforeBuy || 0) >= 1 },
  { id: 'rebuilder',           icon: ACH_ICONS.wrench,     name: 'Crash Rebuilder',        desc: 'Repair and sell 5 cars with moderate or severe crash damage.',
    check: s => (s.crashDamageRebuilds || 0) >= 5, progress: s => (s.crashDamageRebuilds||0) + '/5' },
  // ── v1.3.4 Funny & Easter Egg Achievements ────────────────
  { id: 'rust_enthusiast',     icon: ACH_ICONS.wrench,     name: 'Rust Enthusiast',        desc: 'Sell 3 cars in Poor (D) condition. They run... mostly.',
    check: s => (s.salesHistory||[]).filter(h => h.condition === 'D').length >= 3,
    progress: s => (s.salesHistory||[]).filter(h => h.condition === 'D').length + '/3' },
  { id: 'debt_addict',         icon: ACH_ICONS.creditcard, name: 'Debt Is Just a Number',  desc: 'Draw $200,000+ from the credit line in total. The bank is your best friend.',
    check: s => (s.totalLoanDrawn || 0) >= 200000, progress: s => formatCurrency(Math.min(s.totalLoanDrawn||0,200000)) + '/$200k' },
  { id: 'full_house',          icon: ACH_ICONS.map,        name: 'Full House',              desc: 'Fill every lot slot with a car. No room for regrets (or more cars).',
    check: s => (s.garage||[]).length >= (s.garageSlots||5) && (s.garageSlots||5) >= 10 },
  { id: 'lemon_grove',         icon: ACH_ICONS.alert,      name: 'Lemon Grove',             desc: 'Have 3 lemon-title cars in your inventory at once. It is what it is.',
    check: s => (s.garage||[]).filter(c => c.titleStatus === 'lemon').length >= 3,
    progress: s => (s.garage||[]).filter(c => c.titleStatus === 'lemon').length + '/3' },
  { id: 'grease_monkey',       icon: ACH_ICONS.wrench,     name: 'Grease Monkey',           desc: 'Complete 20 customer service jobs. You are basically a mechanic now.',
    check: s => (s.totalServiceJobsCompleted || 0) >= 20, progress: s => (s.totalServiceJobsCompleted||0) + '/20' },
  { id: 'three_strikes',       icon: ACH_ICONS.alert,      name: 'Three Strikes',           desc: 'Get fined by police 3 times. They know your dealership by name.',
    check: s => (s.policeFinesReceived || 0) >= 3, progress: s => (s.policeFinesReceived||0) + '/3' },
  { id: 'big_draw',            icon: ACH_ICONS.dollar,     name: 'Big Draw',                desc: 'Draw $500,000+ from the credit line in total. Help, the bank is calling again.',
    check: s => (s.totalLoanDrawn || 0) >= 500000, progress: s => formatCurrency(Math.min(s.totalLoanDrawn||0,500000)) + '/$500k' },
  { id: 'loss_leader',         icon: ACH_ICONS.trending,   name: 'Loss Leader',             desc: 'Sell a car at a loss of $2,000 or more. A "marketing expense", really.',
    check: s => (s.salesHistory||[]).some(h => (h.profit || 0) <= -2000) },
  { id: 'marathon_man',        icon: ACH_ICONS.clock,      name: 'Marathon Man',            desc: 'Reach Day 365. A full year of dealing. Please get some rest.',
    check: s => (s.day || 1) >= 365, progress: s => Math.min(s.day||1, 365) + '/365' },
  { id: 'hard_knocks',         icon: ACH_ICONS.flame,      name: 'Hard Knocks',             desc: 'Go bankrupt on Hard mode. At least you learned something... right?',
    check: s => !!(s.hardBankruptcyOccurred) },
  // ── v1.5.2 More Funny Achievements ────────────────
  { id: 'flash_flip',          icon: ACH_ICONS.zap,        name: 'Flash Flip',              desc: 'Sell a car the same day it lands on your lot. Buy it, flip it, never even wash it.',
    check: s => (s.salesHistory||[]).some(h => (h.daysInLot||0) === 0) },
  { id: 'brand_loyalist',      icon: ACH_ICONS.car,        name: 'Brand Loyalist',          desc: 'Have 4 cars from the same make on your lot at once. Diversification is for cowards.',
    check: s => { const counts = {}; for (const c of (s.garage||[])) counts[c.make] = (counts[c.make]||0) + 1; return Object.values(counts).some(n => n >= 4); } },
  { id: 'rock_bottom_rep',     icon: ACH_ICONS.alert,      name: 'Yelp Reviews Be Like',    desc: 'Watch your reputation crater to rock bottom. One star, would not recommend.',
    check: s => (s.reputation||1) <= 0.15 },
  { id: 'local_legend',        icon: ACH_ICONS.award,      name: 'Local Legend',            desc: 'Max out your reputation. Everyone in town sends their cousin to you.',
    check: s => (s.reputation||1) >= 1.95 },
  { id: 'full_lineup',         icon: ACH_ICONS.layers,     name: 'Something For Everyone',  desc: 'Own a car from every category at once — Economy, Sedan, SUV, Truck, Sports, and Luxury.',
    check: s => new Set((s.garage||[]).map(c => c.category)).size >= 6 },
  { id: 'lot_lizard',          icon: ACH_ICONS.clock,      name: 'Lot Lizard',              desc: 'Let a car sit for sale 60+ days without moving it. It has its own zip code now.',
    check: s => (s.garage||[]).some(c => c.isForSale && (c.daysInLot||0) >= 60) },
  { id: 'fire_sale_friday',    icon: ACH_ICONS.flame,      name: 'Fire Sale Friday',        desc: 'Sell 5 cars in a single day. Everything must go!',
    check: s => (s.salesHistory||[]).filter(h => h.soldDay === s.day).length >= 5 },
  { id: 'grandmas_car',        icon: ACH_ICONS.star,       name: "Grandma's Car",           desc: 'Sell a used car with under 5,000 miles on it. Only driven to church on Sundays.',
    check: s => (s.salesHistory||[]).some(h => h.source === 'used' && (h.mileage||0) < 5000) },
  { id: 'its_got_stories',     icon: ACH_ICONS.map,        name: "It's Got Stories",        desc: 'Sell a car with over 250,000 miles. It has seen things.',
    check: s => (s.salesHistory||[]).some(h => (h.mileage||0) >= 250000) },
  { id: 'rookie_mistake',      icon: ACH_ICONS.trending,   name: 'Rookie Mistake',          desc: 'Sell a car at a loss, any loss. It happens to the best of us. Ouch.',
    check: s => (s.salesHistory||[]).some(h => (h.profit||0) < 0) },
  // Secret achievements
  { id: 'secret_konami',       icon: ACH_ICONS.zap,        name: '🔒 Power User',           desc: '???',
    check: s => !!(s.konamiActivated) },
  { id: 'secret_logo',         icon: ACH_ICONS.star,       name: '🔒 Old School',           desc: '???',
    check: s => (s.logoClickCount || 0) >= 7 },
  { id: 'secret_nice',         icon: ACH_ICONS.zap,        name: '🔒 Nice.',                desc: '???',
    check: s => (s.salesHistory||[]).some(h => Math.round(h.salePrice||0) % 1000 === 420) },
  { id: 'secret_day69',        icon: ACH_ICONS.clock,      name: '🔒 Sixty-Nine Days',      desc: '???',
    check: s => (s.salesHistory||[]).some(h => h.soldDay === 69) },
  { id: 'secret_palindrome',   icon: ACH_ICONS.star,       name: '🔒 Math Nerd',            desc: '???',
    check: s => (s.salesHistory||[]).some(h => { const p = Math.abs(Math.round(h.profit||0)); const str = String(p); return str.length >= 3 && str === [...str].reverse().join(''); }) },
  { id: 'secret_breakeven',    icon: ACH_ICONS.repeat,     name: '🔒 Full Circle',          desc: '???',
    check: s => (s.salesHistory||[]).some(h => Math.round(h.profit||0) === 0) },
];

const ACHIEVEMENT_ORDER = [
  'first_sale', 'first_upgrade', 'title_clean_start', 'first_tradein', 'first_lease',
  'ten_sales', 'detail_ten', 'five_tradeins', 'five_leases', 'luxury_seller',
  'fifty_sales', 'hundred_sales', 'supercar_seller',
  'net_worth_100k', 'net_worth_500k', 'net_worth_1m',
  'loan_interest_paid', 'loan_debt_free', 'interest_enthusiast', 'debt_addict', 'big_draw',
  'title_clean_streak', 'salvage_profit', 'lemonade_stand', 'lemon_grove',
  'not_today', 'paperwork_pro', 'eagle_eye', 'rebuilder', 'busted', 'three_strikes',
  'garage_tier4', 'garage_tier5', 'full_house',
  'day_50', 'day_200', 'marathon_man',
  'rust_enthusiast', 'grease_monkey', 'loss_leader',
  'bankruptcy_survivor', 'hard_knocks',
  'flash_flip', 'brand_loyalist', 'rock_bottom_rep', 'local_legend', 'full_lineup',
  'lot_lizard', 'fire_sale_friday', 'grandmas_car', 'its_got_stories', 'rookie_mistake',
  'secret_logo', 'secret_konami', 'secret_nice', 'secret_day69', 'secret_palindrome', 'secret_breakeven',
];

const ACHIEVEMENT_MAP = new Map(ACHIEVEMENT_DEFS.map(ach => [ach.id, ach]));
const ACHIEVEMENTS = ACHIEVEMENT_ORDER.map(id => ACHIEVEMENT_MAP.get(id)).filter(Boolean);

// ============================================================
// UPGRADES — v1.6.0 rework
// ============================================================
// Every upgrade is tagged with the stage of the game it is built for, and gated by
// something that makes sense (lot size or a prerequisite upgrade) so the tab reads
// as a progression path instead of a flat shopping list:
//   Early game — first ~30 days, tens of thousands of dollars
//   Mid game   — Garage Tier 3–4, low six figures
//   Late game  — Garage Tier 5+, hundreds of thousands
//   Endgame    — seven-figure cash, exotic/hypercar inventory
//
// Fields
//   id / key   – upgrade id, and the state.upgrades field it drives
//   stage      – 1–4, shown as a badge on the card
//   cost       – single price, or `costs` – price per level for stackable upgrades
//   maxLevel   – >1 for stackable upgrades (level comes from state.upgrades[key])
//   level(u)   – optional custom level getter (tiered chains that share one counter)
//   lock(u,lv) – returns null when purchasable, or the "Requires …" text shown on the card
//   apply(s)   – optional custom effect; default just sets the flag / bumps the counter
const UPGRADE_STAGES = {
  1: { label: 'Early Game', cls: 'badge-green'  },
  2: { label: 'Mid Game',   cls: 'badge-blue'   },
  3: { label: 'Late Game',  cls: 'badge-purple' },
  4: { label: 'Endgame',    cls: 'badge-orange' },
};
const UPGRADE_CATEGORY_ORDER = [
  'Car Lot', 'Sourcing', 'Marketing', 'Luxury Clientele', 'Tools & Inspection',
  'Reconditioning', 'Factory', 'Management', 'Finance', 'Leasing',
  'Legal & Compliance', 'Security', 'Service Garage',
];

// Tunable upgrade constants
const OVERHEAD_REDUCTION_PER_LEVEL = 0.10;          // Cost Efficiency Program: −10% lot overhead per level
const SERVICE_JOB_VALUE_MULT = [1, 1.35, 1.9, 2.8]; // bigger service departments land bigger jobs
const THEFT_REDUCTION_BY_LEVEL = [0, 0.25, 0.50, 0.75, 0.90];
const WORKSHOP_REPAIR_DISCOUNT = 0.15;
const CERTIFIED_SALE_BONUS = 1.18;
const WASH_COST = 125;             // requires the Wash Station upgrade
const WASH_VALUE_BOOST = 0.04;     // +4% market value, every wash
const WASH_SALE_CHANCE_BONUS = 1.10; // +10% sale chance while boost is active
const WASH_BOOST_DAYS = 3;

// Prerequisite helpers — each returns null when satisfied, or a short label when not.
// Lock text shown on a button must stay short (buttons don't wrap gracefully), so requireAll
// only ever surfaces the single most pressing unmet requirement, not the full list.
const reqTier = n => u => ((u.garageLevel || 1) >= n ? null : `Tier ${n}`);
const reqHas  = (key, label) => u => (u[key] ? null : label);
const requireAll = (...checks) => u => {
  const first = checks.map(c => c(u)).find(Boolean);
  return first ? `Needs ${first}` : null;
};
const tierLevel = (key, n) => u => ((u[key] || 0) >= n ? 1 : 0); // "have I reached tier n of this chain?"

const UPGRADES_CONFIG = [
  // ── Car Lot ───────────────────────────────────────────────
  {
    id: 'garage2', name: 'Garage Tier 2', icon: 'construction', category: 'Car Lot', stage: 1, cost: 15000,
    desc: '10 garage slots. Overhead goes up.',
    level: u => ((u.garageLevel || 1) >= 2 ? 1 : 0),
    apply: s => { s.upgrades.garageLevel = 2; s.garageSlots = 10; },
  },
  {
    id: 'garage3', name: 'Garage Tier 3', icon: 'building', category: 'Car Lot', stage: 1, cost: 40000,
    desc: '20 garage slots. Overhead goes up.',
    level: u => ((u.garageLevel || 1) >= 3 ? 1 : 0),
    lock: requireAll(reqTier(2)),
    apply: s => { s.upgrades.garageLevel = 3; s.garageSlots = 20; },
  },
  {
    id: 'garage4', name: 'Garage Tier 4', icon: 'factory', category: 'Car Lot', stage: 2, cost: 90000,
    desc: '35 garage slots. Overhead goes up.',
    level: u => ((u.garageLevel || 1) >= 4 ? 1 : 0),
    lock: requireAll(reqTier(3)),
    apply: s => { s.upgrades.garageLevel = 4; s.garageSlots = 35; },
  },
  {
    id: 'garage5', name: 'Garage Tier 5', icon: 'building', category: 'Car Lot', stage: 3, cost: 200000,
    desc: '50 garage slots. Overhead goes up.',
    level: u => ((u.garageLevel || 1) >= 5 ? 1 : 0),
    lock: requireAll(reqTier(4)),
    apply: s => { s.upgrades.garageLevel = 5; s.garageSlots = 50; },
  },
  {
    id: 'garage6', name: 'Garage Tier 6', icon: 'layers', category: 'Car Lot', stage: 3, cost: 550000,
    desc: '75 garage slots. Overhead goes up.',
    level: u => ((u.garageLevel || 1) >= 6 ? 1 : 0),
    lock: requireAll(reqTier(5)),
    apply: s => { s.upgrades.garageLevel = 6; s.garageSlots = 75; },
  },
  {
    id: 'garage7', name: 'Garage Tier 7 — Auto Mall', icon: 'pillar', category: 'Car Lot', stage: 4, cost: 1400000,
    desc: '100 garage slots — max capacity.',
    level: u => ((u.garageLevel || 1) >= 7 ? 1 : 0),
    lock: requireAll(reqTier(6)),
    apply: s => { s.upgrades.garageLevel = 7; s.garageSlots = 100; },
  },
  {
    id: 'overheadReduction', key: 'overheadReductions', name: 'Cost Efficiency Program', icon: 'trendingDown',
    category: 'Car Lot', stage: 1, maxLevel: 4, costs: [5000, 12000, 24000, 45000],
    levelNames: ['Efficiency Program I — Lighting & HVAC', 'Efficiency Program II — Supplier Contracts',
                 'Efficiency Program III — Automation', 'Efficiency Program IV — Shared Services'],
    desc: 'Cuts lot overhead. Scales with your lot size.',
    lock: (u, lv) => requireAll(reqTier(lv + 2))(u),
  },

  // ── Sourcing (used-market supply) ─────────────────────────
  {
    id: 'tradeNetwork', key: 'tradeNetwork', name: 'Dealer Trade Network', icon: 'inbox', category: 'Sourcing', stage: 2, cost: 28000,
    desc: 'More Used Market listings every day.',
    lock: requireAll(reqTier(3)),
  },
  {
    id: 'auctionAccess', key: 'auctionAccess', name: 'Wholesale Auction Membership', icon: 'tag', category: 'Sourcing', stage: 3, cost: 110000,
    desc: 'Even more Used Market listings, and cleaner stock.',
    lock: requireAll(reqHas('tradeNetwork', 'Trade Network'), reqTier(4)),
  },
  {
    id: 'exoticConsignment', key: 'exoticConsignment', name: 'Exotic Consignment Network', icon: 'star', category: 'Sourcing', stage: 4, cost: 600000,
    desc: 'Premium and exotic cars show up on the Used Market far more often.',
    lock: requireAll(reqHas('auctionAccess', 'Auction Access'), reqHas('luxuryLounge', 'Luxury Lounge')),
  },

  // ── Marketing ─────────────────────────────────────────────
  {
    id: 'marketing', key: 'marketing', name: 'Marketing Campaign', icon: 'megaphone', category: 'Marketing', stage: 1,
    maxLevel: 4, costs: [8000, 22000, 60000, 150000],
    levelNames: ['Local Advertising', 'Regional Ad Campaign', 'Digital & Social Push', 'National Brand Campaign'],
    desc: 'More customers through the door. Boosts sale chance.',
    lock: (u, lv) => (lv === 0 ? null : requireAll(reqTier(lv + 1))(u)),
  },
  {
    id: 'reputationBoost', key: 'reputationBoosts', name: 'Reputation Boost', icon: 'star', category: 'Marketing', stage: 1,
    maxLevel: 3, costs: [10000, 30000, 90000],
    levelNames: ['Reputation Boost I — Reviews Program', 'Reputation Boost II — Customer Care', 'Reputation Boost III — Community Sponsor'],
    desc: 'Permanently boosts sale chance and reputation.',
    lock: (u, lv) => (lv === 0 ? null : requireAll(reqTier(lv === 1 ? 2 : 4))(u)),
    apply: s => { s.upgrades.reputationBoosts = (s.upgrades.reputationBoosts || 0) + 1; s.reputation = Math.min(s.reputation + 0.1, 2.0); },
  },
  {
    id: 'photoStudio', key: 'photoStudio', name: 'Photo Studio', icon: 'camera', category: 'Marketing', stage: 1, cost: 9500,
    desc: 'Better listing photos. Boosts sale chance.',
  },
  {
    id: 'certifiedProgram', key: 'certifiedProgram', name: 'Certified Pre-Owned Program', icon: 'clipboard', category: 'Marketing', stage: 2, cost: 85000,
    desc: 'Clean, well-vetted cars earn a Certified badge and sell faster.',
    lock: requireAll(reqHas('serviceBay', 'Service Bay'), reqHas('inspectionTool', 'Inspection Tool')),
  },

  // ── Luxury Clientele (high-end buyer pool) ────────────────
  // Expensive cars sell slowly because the pool of people who can afford them is small
  // (see getPriceTierFactor). These upgrades widen that pool for the price bands where it bites.
  {
    id: 'luxuryLounge', key: 'luxuryLounge', name: 'Luxury Client Lounge', icon: 'wine', category: 'Luxury Clientele', stage: 3, cost: 180000,
    desc: 'Attracts buyers for pricier cars ($90k+).',
    lock: requireAll(reqTier(4)),
  },
  {
    id: 'privateClientNetwork', key: 'privateClientNetwork', name: 'Private Client Network', icon: 'key', category: 'Luxury Clientele', stage: 3, cost: 650000,
    desc: 'Even more buyers for expensive cars ($140k+).',
    lock: requireAll(reqHas('luxuryLounge', 'Luxury Lounge'), reqTier(5)),
  },
  {
    id: 'collectorNetwork', key: 'collectorNetwork', name: 'Global Collector Network', icon: 'trophy', category: 'Luxury Clientele', stage: 4, cost: 2500000,
    desc: 'A worldwide buyer network for your priciest cars ($220k+).',
    lock: requireAll(reqHas('privateClientNetwork', 'Private Clients'), reqTier(6)),
  },

  // ── Tools & Inspection ────────────────────────────────────
  {
    id: 'inspectionTool', key: 'inspectionTool', name: 'Inspection Tool', icon: 'search', category: 'Tools & Inspection', stage: 1, cost: 5000,
    desc: 'Cheaper inspections. Unlocks other tools.',
  },
  {
    id: 'negotiationTraining', key: 'negotiationTraining', name: 'Negotiation Training', icon: 'handshake', category: 'Tools & Inspection', stage: 1, cost: 8000,
    desc: 'Sharper haggling on offers, trade-ins, and counters.',
  },
  {
    id: 'frameDamageTools', key: 'frameDamageTools', name: 'Frame Damage Inspection Tools', icon: 'gauge', category: 'Tools & Inspection', stage: 2, cost: 10000,
    desc: 'Inspections reveal how bad crash damage really is.',
    lock: requireAll(reqHas('inspectionTool', 'Inspection Tool')),
  },

  // ── Reconditioning ────────────────────────────────────────
  {
    id: 'washStation', key: 'washStation', name: 'Wash Station', icon: 'droplet', category: 'Reconditioning', stage: 1, cost: 4000,
    desc: 'Unlocks car washes — a cheap value bump and a temporary sale-chance boost.',
  },
  {
    id: 'detailing', key: 'detailing', name: 'Detailing Bay', icon: 'sparkles', category: 'Reconditioning', stage: 1, cost: 12000,
    desc: 'Detail a car for a condition and value boost.',
  },
  {
    id: 'serviceBay', key: 'serviceBay', name: 'Service Bay', icon: 'wrench', category: 'Reconditioning', stage: 1, cost: 18000,
    desc: 'Unlocks car repairs and the Service tab for paid jobs.',
    apply: s => { s.upgrades.serviceBay = true; s.serviceBayUnlockedDay = s.day; },
  },
  {
    id: 'performanceShop', key: 'performanceShop', name: 'Performance Shop', icon: 'gauge', category: 'Reconditioning', stage: 2, cost: 30000,
    desc: 'Performance parts for Sports/SUV/Truck cars. Boosts value.',
    lock: requireAll(reqHas('serviceBay', 'Service Bay')),
  },
  {
    id: 'reconditioningWorkshop', key: 'reconditioningWorkshop', name: 'Reconditioning Workshop', icon: 'toolbox', category: 'Reconditioning', stage: 2, cost: 25000,
    desc: 'Repairs and parts upgrades finish instantly, and cost less.',
    lock: requireAll(reqHas('serviceBay', 'Service Bay')),
  },

  // ── Factory ───────────────────────────────────────────────
  {
    id: 'expressDelivery', key: 'expressDelivery', name: 'Delivery Express', icon: 'truck', category: 'Factory', stage: 1, cost: 7500,
    desc: 'Faster factory delivery.',
  },
  {
    id: 'factoryAllocation', key: 'factoryAllocation', name: 'Factory Allocation Program', icon: 'package', category: 'Factory', stage: 2, cost: 55000,
    desc: 'Even faster delivery. Unlocks pricier factory cars ($90k+).',
    lock: requireAll(reqHas('expressDelivery', 'Delivery Express')),
  },
  {
    id: 'exoticLicense', key: 'exoticLicense', name: 'Exotic Allocation License', icon: 'car', category: 'Factory', stage: 3, cost: 300000,
    desc: 'Unlocks factory-order exotics ($250k+) — Ferrari, McLaren, and more.',
    lock: requireAll(reqHas('factoryAllocation', 'Factory Allocation')),
  },
  {
    id: 'hypercarCharter', key: 'hypercarCharter', name: 'Hypercar Allocation Charter', icon: 'trophy', category: 'Factory', stage: 4, cost: 1200000,
    desc: 'Unlocks factory-order hypercars ($1M+) — Pagani, Bugatti, and more.',
    lock: requireAll(reqHas('exoticLicense', 'Exotic License')),
  },

  // ── Management ────────────────────────────────────────────
  {
    id: 'staffOffice', key: 'staffOffice', name: 'Staff Office', icon: 'person', category: 'Management', stage: 2, cost: 28000,
    desc: 'Hire sales staff to help work customer offers.',
    lock: requireAll(reqTier(3)),
  },
  {
    id: 'crmSuite', key: 'crmSuite', name: 'CRM Suite', icon: 'book', category: 'Management', stage: 2, cost: 60000,
    desc: 'Bulk tools and a bigger staff cap.',
    lock: requireAll(reqHas('staffOffice', 'Staff Office'), reqTier(4)),
  },
  {
    id: 'aiPricing', key: 'aiPricing', name: 'AI Pricing Terminal', icon: 'brain', category: 'Management', stage: 3, cost: 120000,
    desc: 'Smarter pricing help on tough negotiations.',
    lock: requireAll(reqHas('crmSuite', 'CRM Suite'), reqTier(5)),
  },

  // ── Finance ───────────────────────────────────────────────
  {
    id: 'financeOffice', key: 'financeOffice', name: 'Finance Office', icon: 'bank', category: 'Finance', stage: 1, cost: 22000,
    desc: 'Lower loan APR and a bigger credit limit.',
  },
  {
    id: 'creditLineBoost1', key: 'creditLineBoost1', name: 'Credit Line Expansion I', icon: 'creditCard', category: 'Finance', stage: 2, cost: 45000,
    desc: 'Bigger credit limit, lower APR.',
    lock: requireAll(reqHas('financeOffice', 'Finance Office')),
  },
  {
    id: 'creditLineBoost2', key: 'creditLineBoost2', name: 'Credit Line Expansion II', icon: 'creditCard', category: 'Finance', stage: 2, cost: 95000,
    desc: 'Even bigger credit limit, lower APR.',
    lock: requireAll(reqHas('creditLineBoost1', 'Credit Line I')),
  },
  {
    id: 'creditLineBoost3', key: 'creditLineBoost3', name: 'Premium Credit Facility', icon: 'pillar', category: 'Finance', stage: 3, cost: 210000,
    desc: 'A much bigger credit limit, lower APR.',
    lock: requireAll(reqHas('creditLineBoost2', 'Credit Line II')),
  },
  {
    id: 'creditLineBoost4', key: 'creditLineBoost4', name: 'Corporate Credit Facility', icon: 'layers', category: 'Finance', stage: 4, cost: 450000,
    desc: 'Financing built for an exotic-car inventory.',
    lock: requireAll(reqHas('creditLineBoost3', 'Premium Credit'), reqTier(5)),
  },
  {
    id: 'creditLineBoost5', key: 'creditLineBoost5', name: 'Investment-Grade Facility', icon: 'money', category: 'Finance', stage: 4, cost: 1100000,
    desc: 'The biggest credit line available — built for hypercars.',
    lock: requireAll(reqHas('creditLineBoost4', 'Corporate Credit'), reqTier(6)),
  },

  // ── Leasing ───────────────────────────────────────────────
  {
    id: 'leaseManagement', key: 'leaseManagement', name: 'Lease Management System', icon: 'document', category: 'Leasing', stage: 1, cost: 16000,
    desc: 'Better lease terms and more lease leads.',
  },
  {
    id: 'fleetLeasing', key: 'fleetLeasing', name: 'Fleet Leasing Program', icon: 'fileText', category: 'Leasing', stage: 3, cost: 150000,
    desc: 'Even better lease terms, from corporate fleet deals.',
    lock: requireAll(reqHas('leaseManagement', 'Lease Management'), reqTier(5)),
  },

  // ── Legal & Compliance ────────────────────────────────────
  {
    id: 'dmvDatabaseAccess', key: 'dmvDatabaseAccess', name: 'DMV Database Access', icon: 'fileText', category: 'Legal & Compliance', stage: 1, cost: 12000,
    desc: 'Inspections check DMV records before you buy.',
  },
  {
    id: 'vinScanner', key: 'vinScanner', name: 'VIN Scanner Kit', icon: 'search', category: 'Legal & Compliance', stage: 1, cost: 8000,
    desc: 'Inspections can catch a tampered VIN.',
  },
  {
    id: 'complianceTraining', key: 'complianceTraining', name: 'Compliance Training', icon: 'book', category: 'Legal & Compliance', stage: 1, cost: 15000,
    desc: 'Smaller fines and fewer legal headaches.',
  },
  {
    id: 'titleRecovery', key: 'titleRecovery', name: 'Title Recovery Service', icon: 'clipboard', category: 'Legal & Compliance', stage: 2, cost: 20000,
    desc: 'Clear a no-title car during inspection, for a fee.',
    lock: requireAll(reqHas('dmvDatabaseAccess', 'DMV Database Access')),
  },

  // ── Security ──────────────────────────────────────────────
  // Theft starts around Day 50 and climbs with the calendar, and every stolen car costs its full
  // value — so these pay for themselves as the lot (and the value on it) grows.
  {
    id: 'security1', name: 'Security Camera System', icon: 'camera', category: 'Security', stage: 2, cost: 75000,
    desc: 'Cuts car theft on your lot.',
    level: tierLevel('securityLevel', 1),
    apply: s => { s.upgrades.securityLevel = 1; },
  },
  {
    id: 'security2', name: 'Guard Station', icon: 'person', category: 'Security', stage: 3, cost: 175000,
    desc: 'Cuts theft further with overnight patrols.',
    level: tierLevel('securityLevel', 2),
    lock: requireAll(reqHas('securityLevel', 'Security Cameras')),
    apply: s => { s.upgrades.securityLevel = 2; },
  },
  {
    id: 'security3', name: 'Elite Security Suite', icon: 'shield', category: 'Security', stage: 3, cost: 400000,
    desc: 'Serious anti-theft coverage for a growing lot.',
    level: tierLevel('securityLevel', 3),
    lock: u => ((u.securityLevel || 0) >= 2 ? null : 'Needs Guard Station'),
    apply: s => { s.upgrades.securityLevel = 3; },
  },
  {
    id: 'security4', name: 'Fortress Protocol', icon: 'lock', category: 'Security', stage: 4, cost: 1200000,
    desc: 'The strongest theft protection available.',
    level: tierLevel('securityLevel', 4),
    lock: u => ((u.securityLevel || 0) >= 3 ? null : 'Needs Elite Security'),
    apply: s => { s.upgrades.securityLevel = 4; },
  },

  // ── Service Garage ────────────────────────────────────────
  // Bigger departments also attract bigger jobs (see SERVICE_JOB_VALUE_MULT), so the upgrade
  // cost stays in proportion to what the shop can actually earn.
  {
    id: 'serviceCapacity1', name: 'Expanded Service Bays', icon: 'wrench', category: 'Service Garage', stage: 2, cost: 30000,
    desc: 'More service bays and better-paying jobs.',
    level: tierLevel('serviceCapacityLevel', 1),
    lock: requireAll(reqHas('serviceBay', 'Service Bay')),
    apply: s => { s.upgrades.serviceCapacityLevel = 1; s.serviceGarageCapacity = 5; },
  },
  {
    id: 'serviceCapacity2', name: 'Service Center Expansion', icon: 'construction', category: 'Service Garage', stage: 3, cost: 80000,
    desc: 'A full service center — fleet work and premium cars.',
    level: tierLevel('serviceCapacityLevel', 2),
    lock: u => ((u.serviceCapacityLevel || 0) >= 1 ? null : 'Needs Expanded Bays'),
    apply: s => { s.upgrades.serviceCapacityLevel = 2; s.serviceGarageCapacity = 8; },
  },
  {
    id: 'serviceCapacity3', name: 'Flagship Service Department', icon: 'building', category: 'Service Garage', stage: 3, cost: 180000,
    desc: 'Your flagship shop — luxury and fleet clients.',
    level: tierLevel('serviceCapacityLevel', 3),
    lock: u => ((u.serviceCapacityLevel || 0) >= 2 ? null : 'Needs Service Center'),
    apply: s => { s.upgrades.serviceCapacityLevel = 3; s.serviceGarageCapacity = 12; },
  },
];

// ---- Upgrade state helpers -----------------------------------------------------
function getUpgradeLevel(upg, u = state.upgrades) {
  if (typeof upg.level === 'function') return upg.level(u);
  const v = u[upg.key];
  return typeof v === 'number' ? v : (v ? 1 : 0);
}

/** Everything the UI / buy flow needs to know about one upgrade right now. */
function getUpgradeStatus(upg) {
  const u     = state.upgrades;
  const level = getUpgradeLevel(upg, u);
  const max   = upg.maxLevel || 1;
  const owned = level >= max;
  const idx   = Math.min(level, max - 1);
  const cost  = Array.isArray(upg.costs) ? upg.costs[Math.min(level, upg.costs.length - 1)] : upg.cost;
  const name  = upg.levelNames ? upg.levelNames[idx] : upg.name;
  const lock  = owned ? null : (typeof upg.lock === 'function' ? upg.lock(u, level) : null);
  return { level, max, owned, cost, name, lock };
}

/** Apply an upgrade's effect (custom `apply`, or bump the counter / set the flag). */
function applyUpgrade(upg) {
  if (typeof upg.apply === 'function') { upg.apply(state); return; }
  const isCounter = typeof DEFAULT_STATE.upgrades[upg.key] === 'number';
  state.upgrades[upg.key] = isCounter ? (state.upgrades[upg.key] || 0) + 1 : true;
}

// ---- Upgrade effect helpers ----------------------------------------------------
/** Daily lot rent/utilities after difficulty and Cost Efficiency Program. */
function getLotOverhead() {
  const base     = OVERHEAD_BY_LEVEL[state.upgrades.garageLevel] ?? 300;
  const diffMult = state.difficulty === 'hard' ? 1.5 : state.difficulty === 'easy' ? 0 : 1.0;
  const cut      = clamp((state.upgrades.overheadReductions || 0) * OVERHEAD_REDUCTION_PER_LEVEL, 0, 0.6);
  return Math.max(0, Math.round(base * diffMult * (1 - cut)));
}

/** Luxury Clientele chain: widens the buyer pool for the price bands where it is smallest. */
function getHighEndBuyerBoost(marketValue) {
  const u = state.upgrades || {};
  let boost = 1;
  if (u.luxuryLounge         && marketValue >= 90000)  boost *= 1.30;
  if (u.privateClientNetwork && marketValue >= 140000) boost *= 1.40;
  if (u.collectorNetwork     && marketValue >= 220000) boost *= 1.75;
  return boost;
}

/** Certified Pre-Owned: only cars the player has actually vetted can qualify (no info leak on un-inspected cars). */
function isCertifiedCar(car) {
  if (!car || !state.upgrades?.certifiedProgram) return false;
  if ((car.titleStatus || 'clean') !== 'clean') return false;
  if (car.condition !== 'A' && car.condition !== 'B') return false;
  if ((car.hiddenIssues || []).length > 0) return false;
  if ((car.crashDamageSeverity || 'none') !== 'none' || car.hasCrashRepair) return false;
  if ((car.legalStatus || 'clean') !== 'clean' || (car.vinStatus || 'normal') !== 'normal') return false;
  return !!car.inspected || car.source === 'factory' || (car.reconditionLog || []).some(r => r.type === 'Basic Repair');
}

function getLeaseStartCap() {
  const u = state.upgrades;
  return MAX_LEASE_STARTS_PER_DAY + (u.leaseManagement ? 1 : 0) + (u.fleetLeasing ? 2 : 0);
}
function getLeaseLeadChanceMult() {
  const u = state.upgrades;
  return (u.leaseManagement ? 1.25 : 1) * (u.fleetLeasing ? 1.25 : 1);
}
function getLeasePaymentMult() {
  const u = state.upgrades;
  return 1 + (u.leaseManagement ? 0.08 : 0) + (u.fleetLeasing ? 0.05 : 0);
}

function getUsedMarketBonusListings() {
  const u = state.upgrades;
  return (u.tradeNetwork ? 2 : 0) + (u.auctionAccess ? 3 : 0);
}
function getUsedConditionWeights() {
  return state.upgrades.auctionAccess ? [0.14, 0.34, 0.33, 0.19] : [0.08, 0.28, 0.37, 0.27];
}

// Factory ordering is gated by invoice price. Highest matching band wins.
const FACTORY_ALLOCATION_TIERS = [
  { minInvoice: 1000000, key: 'hypercarCharter',   label: 'Hypercar Allocation Charter' },
  { minInvoice: 250000,  key: 'exoticLicense',     label: 'Exotic Allocation License'   },
  { minInvoice: 90000,   key: 'factoryAllocation', label: 'Factory Allocation Program'  },
];
/** Returns the name of the upgrade required to order this catalog entry from the factory, or null. */
function getFactoryLock(entry) {
  for (const t of FACTORY_ALLOCATION_TIERS) {
    if (entry.basePrice >= t.minInvoice) return state.upgrades[t.key] ? null : t.label;
  }
  return null;
}

function getServiceJobValueMult() {
  return SERVICE_JOB_VALUE_MULT[state.upgrades.serviceCapacityLevel || 0] ?? 1;
}

// Recon prices scale with the car so the Detailing Bay / Performance Shop stay balanced from a
// $15k economy car to a $1M exotic (a flat $500 detail on a supercar was effectively free money).
function getDetailCost(car) { return Math.max(500,  Math.round((car.marketValue * 0.015) / 50) * 50); }
function getPartsCost(car)  { return Math.max(1500, Math.round((car.marketValue * 0.04)  / 50) * 50); }

// ============================================================
// HELPERS
// ============================================================
const randomInt   = (min, max) => Math.floor(Math.random() * (max - min + 1)) + min;
const randomFloat = (min, max) => Math.random() * (max - min) + min;
const clamp       = (v, lo, hi) => Math.max(lo, Math.min(hi, v));
const lerp        = (a, b, t) => a + (b - a) * t;
const randomFrom  = arr => arr[Math.floor(Math.random() * arr.length)];

// How much extra skepticism buyers apply per unit of overpricing beyond 1.5×.
// At 1.5× they start with a 10% discount off market; each extra 0.1× of ratio
// adds another ~1.8% discount, clamped so offers never fall below 55% of market.
const OVERPRICED_SKEPTICISM_RATE = 0.18;

// Daily stale-listing decay for overpriced cars: 8% per day after 3 days on lot.
const OVERPRICED_STALE_DECAY_RATE = 0.92;

// Trade-in counter acceptance curve constants.
const TI_FAIRNESS_CAP        = 1.5;  // fairness values above this are clamped (buyer getting a bargain)
const TI_FAIRNESS_EXPONENT   = 3;    // cubic curve steepness (higher = harsher penalty for above-market asks)
const TI_BASE_ACCEPT_RATE    = 0.85; // max acceptance rate at perfect fairness
const TI_MIN_ACCEPT_PROB     = 0.03; // floor so there is always a tiny chance even on bad counters
const formatCurrency = n => '$' + Math.round(n).toLocaleString();
// Compact form for tight spaces (buttons): $1,500,000 -> $1.5M, $45,000 -> $45K.
const formatCurrencyCompact = n => {
  n = Math.round(n);
  const sign = n < 0 ? '-' : '';
  const abs  = Math.abs(n);
  if (abs >= 1000000) return sign + '$' + (abs % 1000000 === 0 ? abs / 1000000 : (abs / 1000000).toFixed(1)) + 'M';
  if (abs >= 10000)   return sign + '$' + Math.round(abs / 1000) + 'K';
  return formatCurrency(n);
};
const generateId  = () => Date.now().toString(36) + Math.random().toString(36).slice(2, 7);
let factorySelection = { make: null, model: null };

function formatCarDisplayName(car) {
  return `${car.year} ${car.make} ${car.model}${car.trim ? ' ' + car.trim : ''}`;
}

function getBaseLoanTerms() {
  const diff = state?.difficulty || 'normal';
  return LOAN_TERMS[diff] || LOAN_TERMS.normal;
}

function creditScoreAprAdjustment() {
  const score = state.creditScore ?? CREDIT_SCORE_START;
  // Every 50 points away from the 700 baseline shifts APR by ~1 percentage
  // point — worse credit costs more, better credit costs a little less.
  const delta = (CREDIT_SCORE_START - score) / 50 * 0.01;
  return clamp(delta, -0.02, 0.08);
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
    if (state.upgrades?.creditLineBoost4) { upgradeLimit += 500000; upgradeApr = Math.max(0.01, upgradeApr - 0.005); }
    if (state.upgrades?.creditLineBoost5) { upgradeLimit += 1500000; upgradeApr = Math.max(0.01, upgradeApr - 0.005); }
    // Credit score (driven by covering operating costs & loan payments over time,
    // see processLoanAndDelinquency) nudges the priced APR up or down.
    upgradeApr = Math.max(0.01, upgradeApr + creditScoreAprAdjustment());
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
    if (state.gameOver) {
      // Hard-mode game overs are permanent — never persist a game-over run.
      // Make sure this slot's save is gone instead of writing the dead state
      // back to disk, so there's nothing left to accidentally resume or
      // continue (this also protects against later code, like returning to
      // the menu or the beforeunload autosave, calling saveState() again).
      deleteSlot(currentSlot);
      return;
    }
    localStorage.setItem(slotKey(currentSlot), JSON.stringify(state));
  } catch (err) {
    showToast('⚠️ Save failed: ' + (err?.message || 'storage quota exceeded'), 'error');
  }
}

function loadState(slot) {
  if (slot !== undefined) currentSlot = slot;
  try {
    const raw = localStorage.getItem(slotKey(currentSlot));
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
      // v1.6.0: any upgrade field this save predates (new upgrades, older saves) gets its default,
      // so future upgrades never need a hand-written migration line.
      for (const [k, v] of Object.entries(DEFAULT_STATE.upgrades)) {
        if (loaded.upgrades[k] === undefined) loaded.upgrades[k] = v;
      }
      if (loaded.upgrades.serviceBay          === undefined) loaded.upgrades.serviceBay = false;
      // v1.5.0: existing saves that already have the Service Bay keep full, established
      // job volume (no ramp-down) — only brand-new unlocks after this update start small.
      if (loaded.serviceBayUnlockedDay === undefined) {
        loaded.serviceBayUnlockedDay = loaded.upgrades.serviceBay ? -9999 : null;
      }
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
        // settings is loaded before loadGame() is called (see init()), so difficulty is available.
        const diffKey = (settings?.difficulty === 'hard') ? 'hard' : 'normal';
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
      if (loaded.saveVersion < 9) {
        loaded.saveVersion = 9;
        // Garage Tier 4 was previously changed to 50 slots - restore to 35 (Tier 5 will be 50)
        if ((loaded.upgrades?.garageLevel || 1) === 4 && loaded.garageSlots >= 50) {
          loaded.garageSlots = 35;
        }
        loaded.notifications = loaded.notifications || [];
        loaded.notifications.unshift({
          message: '🏭 Save upgraded to v9 — Garage Tier 4 is now 35 slots; new Tier 5 (50 slots) coming!',
          type: 'info',
          day: loaded.day ?? 1,
        });
      }
      if (loaded.saveVersion < 10) {
        loaded.saveVersion = 10;
        // Add new upgrade flags
        if (loaded.upgrades.dmvDatabaseAccess === undefined) loaded.upgrades.dmvDatabaseAccess = false;
        if (loaded.upgrades.vinScanner        === undefined) loaded.upgrades.vinScanner        = false;
        if (loaded.upgrades.titleRecovery     === undefined) loaded.upgrades.titleRecovery     = false;
        if (loaded.upgrades.frameDamageTools  === undefined) loaded.upgrades.frameDamageTools  = false;
        if (loaded.upgrades.complianceTraining=== undefined) loaded.upgrades.complianceTraining= false;
        // Add new stat counters
        loaded.stolenCarsAvoided       = loaded.stolenCarsAvoided       ?? 0;
        loaded.cleanTitleSalesVerified = loaded.cleanTitleSalesVerified ?? 0;
        loaded.crashDamageRebuilds     = loaded.crashDamageRebuilds     ?? 0;
        loaded.policeFinesReceived     = loaded.policeFinesReceived     ?? 0;
        loaded.severeDamageFoundBeforeBuy = loaded.severeDamageFoundBeforeBuy ?? 0;
        loaded.notifications = loaded.notifications || [];
        loaded.notifications.unshift({
          message: '🚔 Save upgraded to v10 — new stolen car mechanics, crash damage severity, and legal upgrades added!',
          type: 'info',
          day: loaded.day ?? 1,
        });
      }
      if (loaded.saveVersion < 11) {
        loaded.saveVersion = 11;
        loaded.difficulty = loaded.difficulty ?? 'normal';
        loaded.notifications = loaded.notifications || [];
        loaded.notifications.unshift({
          message: '🎮 Save upgraded to v11 — difficulty is now locked per save slot.',
          type: 'info',
          day: loaded.day ?? 1,
        });
      }
      if (loaded.saveVersion < 12) {
        loaded.saveVersion = 12;
        // v1.3.0: service garage + security
        if (loaded.upgrades.securityLevel       === undefined) loaded.upgrades.securityLevel       = 0;
        if (loaded.upgrades.serviceCapacityLevel=== undefined) loaded.upgrades.serviceCapacityLevel= 0;
        loaded.serviceGarage         = loaded.serviceGarage         ?? [];
        loaded.serviceGarageCapacity = loaded.serviceGarageCapacity ?? 3;
        loaded.totalServiceJobsCompleted = loaded.totalServiceJobsCompleted ?? 0;
        loaded.totalCarsStolen           = loaded.totalCarsStolen           ?? 0;
        loaded.notifications = loaded.notifications || [];
        loaded.notifications.unshift({
          message: '🔧 Save upgraded to v12 — Customer Service Garage, car theft, and security upgrades added!',
          type: 'info',
          day: loaded.day ?? 1,
        });
      }
      if (loaded.saveVersion < 13) {
        loaded.saveVersion = 13;
        // v1.3.1: migrate existing service jobs to have status fields
        for (const sc of loaded.serviceGarage || []) {
          if (sc.status === undefined) {
            // Old-style jobs have no status — mark as 'ready' so player can still collect
            sc.status             = 'ready';
            sc.serviceStartDay    = sc.serviceStartDay    ?? loaded.day ?? 1;
            sc.serviceCompleteDay = sc.serviceCompleteDay ?? loaded.day ?? 1;
          }
        }
        loaded.notifications = loaded.notifications || [];
        loaded.notifications.unshift({
          message: '🔩 Save upgraded to v13 — service bay slot system, worker trade-in/listing assist, and player cars in Garage updated!',
          type: 'info',
          day: loaded.day ?? 1,
        });
      }
      loaded.loanBalance = loaded.loanBalance ?? 0;
      const _migTerms = LOAN_TERMS[loaded.difficulty || 'normal'] || LOAN_TERMS.normal;
      loaded.loanLimit = loaded.loanLimit ?? _migTerms.limit;
      loaded.loanApr = loaded.loanApr ?? _migTerms.apr;
      loaded.loanFrozen = !!loaded.loanFrozen;
      loaded.missedPayments = loaded.missedPayments ?? 0;
      loaded.delinquencyLevel = loaded.delinquencyLevel ?? 0;
      loaded.creditScore = loaded.creditScore ?? CREDIT_SCORE_START;
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
      if (loaded.upgrades.dmvDatabaseAccess      === undefined) loaded.upgrades.dmvDatabaseAccess      = false;
      if (loaded.upgrades.vinScanner             === undefined) loaded.upgrades.vinScanner             = false;
      if (loaded.upgrades.titleRecovery          === undefined) loaded.upgrades.titleRecovery          = false;
      if (loaded.upgrades.frameDamageTools       === undefined) loaded.upgrades.frameDamageTools       = false;
      if (loaded.upgrades.complianceTraining     === undefined) loaded.upgrades.complianceTraining     = false;
      if (loaded.upgrades.securityLevel          === undefined) loaded.upgrades.securityLevel          = 0;
      if (loaded.upgrades.serviceCapacityLevel   === undefined) loaded.upgrades.serviceCapacityLevel   = 0;
      loaded.stolenCarsAvoided       = loaded.stolenCarsAvoided       ?? 0;
      loaded.cleanTitleSalesVerified = loaded.cleanTitleSalesVerified ?? 0;
      loaded.crashDamageRebuilds     = loaded.crashDamageRebuilds     ?? 0;
      loaded.policeFinesReceived     = loaded.policeFinesReceived     ?? 0;
      loaded.severeDamageFoundBeforeBuy = loaded.severeDamageFoundBeforeBuy ?? 0;
      loaded.serviceGarage             = loaded.serviceGarage             ?? [];
      loaded.serviceGarageCapacity     = loaded.serviceGarageCapacity     ?? 3;
      loaded.totalServiceJobsCompleted = loaded.totalServiceJobsCompleted ?? 0;
      loaded.totalCarsStolen           = loaded.totalCarsStolen           ?? 0;
      if (loaded.saveVersion < 14) {
        loaded.saveVersion = 14;
        // v1.3.4: credit recovery + easter egg tracking
        loaded.daysGoodStanding      = loaded.daysGoodStanding      ?? 0;
        loaded.hardBankruptcyOccurred = loaded.hardBankruptcyOccurred ?? false;
        loaded.konamiActivated       = loaded.konamiActivated       ?? false;
        loaded.logoClickCount        = loaded.logoClickCount        ?? 0;
        loaded.notifications = loaded.notifications || [];
        loaded.notifications.unshift({
          message: '✨ Save upgraded to v14 — credit recovery, game over screen, and new achievements added!',
          type: 'info',
          day: loaded.day ?? 1,
        });
      }
      if (loaded.saveVersion < 15) {
        loaded.saveVersion = 15;
        // v1.5.0: service job volume now ramps up gradually from Service Bay unlock instead
        // of being maxed immediately. Established saves keep their existing job volume —
        // only newly-unlocked shops (after this update) start small and build up.
        if (loaded.serviceBayUnlockedDay === undefined || loaded.serviceBayUnlockedDay === null) {
          loaded.serviceBayUnlockedDay = loaded.upgrades.serviceBay ? -9999 : null;
        }
        loaded.notifications = loaded.notifications || [];
        loaded.notifications.unshift({
          message: '🔧 Save upgraded to v15 — Service Bay job volume now builds up gradually for new shops; some models are now discontinued and used-market only.',
          type: 'info',
          day: loaded.day ?? 1,
        });
      }
      // Always-apply defaults for new fields added in v14 (in case migration block is skipped)
      loaded.daysGoodStanding       = loaded.daysGoodStanding       ?? 0;
      loaded.hardBankruptcyOccurred = loaded.hardBankruptcyOccurred ?? false;
      loaded.konamiActivated        = loaded.konamiActivated        ?? false;
      loaded.logoClickCount         = loaded.logoClickCount         ?? 0;
      // Always-apply default for v1.5.0 field (in case migration block is skipped)
      if (loaded.serviceBayUnlockedDay === undefined) {
        loaded.serviceBayUnlockedDay = loaded.upgrades.serviceBay ? -9999 : null;
      }
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
  if (!Array.isArray(car.hiddenIssues)) car.hiddenIssues = [];
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
  if (car.repairCount        === undefined) car.repairCount        = car.reconditionLog.filter(r => r.type === 'Basic Repair').length;
  // New legal / VIN / crash damage fields (v10)
  if (!LEGAL_STATUSES.includes(car.legalStatus))     car.legalStatus          = 'clean';
  if (!VIN_STATUSES.includes(car.vinStatus))         car.vinStatus            = 'normal';
  if (car.legalDiscovered    === undefined) car.legalDiscovered    = (car.legalStatus === 'clean');
  if (car.vinDiscovered      === undefined) car.vinDiscovered      = (car.vinStatus === 'normal');
  if (!CRASH_DAMAGE_SEVERITIES.includes(car.crashDamageSeverity)) car.crashDamageSeverity = 'none';
  if (car.crashDamageDiscovered === undefined) car.crashDamageDiscovered = false;
  if (car.hasCrashRepair     === undefined) car.hasCrashRepair     = false;
  // v1.5.0: discontinued-model flavor fields (old saves' cars just weren't discontinued models)
  if (car.discontinued       === undefined) car.discontinued       = false;
  if (car.productionStart    === undefined) car.productionStart    = car.year;
  if (car.productionEnd      === undefined) car.productionEnd      = car.year;
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

/** Generate a random subset of hidden issues based on condition tier.
 *  Good (B) and Excellent (A) cars rarely have any mechanical issues.
 *  Probability and severity increase for Fair (C) and Poor (D). */
function genHiddenIssues(condition) {
  const r = Math.random();
  let count;
  if (condition === 'A') {
    // Excellent — 3% chance of a single minor issue
    count = r < 0.03 ? 1 : 0;
  } else if (condition === 'B') {
    // Good — 10% chance of a single issue
    count = r < 0.10 ? 1 : 0;
  } else if (condition === 'C') {
    // Fair — ~35% single issue, ~15% two issues, ~50% none
    if (r < 0.35)      count = 1;
    else if (r < 0.50) count = 2;
    else               count = 0;
  } else {
    // Poor — ~40% one issue, ~35% two, ~10% three, ~15% none
    if (r < 0.40)      count = 1;
    else if (r < 0.75) count = 2;
    else if (r < 0.85) count = 3;
    else               count = 0;
  }
  const pool = [...HIDDEN_ISSUES];
  const issues = [];
  for (let i = 0; i < count && pool.length; i++) {
    const idx = Math.floor(Math.random() * pool.length);
    issues.push({ ...pool[idx] });
    pool.splice(idx, 1);
  }
  return issues;
}

/** Generate crash damage severity for a used car based on condition.
 *  Good (B) and Excellent (A) cars very rarely have crash damage.
 *  Severity and frequency increase for Fair (C) and Poor (D). */
function genCrashDamageSeverity(condition) {
  const roll = Math.random();
  if (condition === 'A') {
    // Excellent — ~1% crash, almost always minor
    if (roll < 0.01) return 'minor';
    return 'none';
  } else if (condition === 'B') {
    // Good — ~5% crash, mostly minor, rare moderate
    if (roll < 0.04) return 'minor';
    if (roll < 0.05) return 'moderate';
    return 'none';
  } else if (condition === 'C') {
    // Fair — ~32% crash with increasing severity
    if (roll < 0.18) return 'minor';
    if (roll < 0.30) return 'moderate';
    if (roll < 0.32) return 'severe';
    return 'none';
  } else { // D — Poor
    // Poor — ~62% crash, heavy on moderate/severe
    if (roll < 0.15) return 'minor';
    if (roll < 0.40) return 'moderate';
    if (roll < 0.62) return 'severe';
    return 'none';
  }
}

/** Generate legal status for a used car (stolen/no-title/clean). */
function genLegalStatus(condition, mileage) {
  const condRisk = { A: 0, B: 1, C: 2, D: 4 }[condition] ?? 1;
  const mileRisk = mileage > 120000 ? 3 : mileage > 80000 ? 2 : mileage > 50000 ? 1 : 0;
  const risk = condRisk + mileRisk;
  let weights;
  if (risk >= 6)      weights = [0.68, 0.22, 0.10];
  else if (risk >= 4) weights = [0.80, 0.14, 0.06];
  else if (risk >= 2) weights = [0.90, 0.07, 0.03];
  else                weights = [0.96, 0.03, 0.01];
  const roll = Math.random();
  if (roll < weights[0]) return 'clean';
  if (roll < weights[0] + weights[1]) return 'noTitle';
  return 'stolen';
}

/** Generate VIN condition for a used car. Scratched VIN more common on stolen/noTitle. */
function genVinStatus(legalStatus) {
  const scratchChance = legalStatus === 'stolen' ? 0.72 : legalStatus === 'noTitle' ? 0.30 : 0.04;
  return Math.random() < scratchChance ? 'scratched' : 'normal';
}

/** Apply police check when selling/holding a problematic car.
 *  Returns true if the player was caught and fined.
 *  @param {object} car - the car object
 *  @param {boolean} [allowImpound=true] - whether impound is possible (false for cars being sold to a customer)
 */
function checkPoliceEvent(car, allowImpound = true) {
  if (!car) return false;
  const legalStatus = car.legalStatus || 'clean';
  if (legalStatus === 'clean' && (car.vinStatus || 'normal') === 'normal') return false;

  let catchChance = 0;
  if (legalStatus === 'stolen')  catchChance = 0.45;
  else if (legalStatus === 'noTitle') catchChance = 0.22;
  if ((car.vinStatus || 'normal') === 'scratched') catchChance = Math.min(1, catchChance + 0.15);
  if (state.upgrades.complianceTraining) catchChance = Math.max(0, catchChance - 0.18);

  if (Math.random() > catchChance) return false;

  // Player is caught!
  const carLabel = `${car.year} ${car.make} ${car.model}`;
  let fineRange, impound;
  if (legalStatus === 'stolen') {
    fineRange = POLICE_FINE.stolen;
    impound   = allowImpound; // Only impound if car is still on lot
  } else if (legalStatus === 'noTitle') {
    fineRange = POLICE_FINE.noTitle;
    impound   = false;
  } else {
    fineRange = POLICE_FINE.scratchedVin;
    impound   = false;
  }
  let fine = randomInt(fineRange.min, fineRange.max);
  if (state.upgrades.complianceTraining) fine = Math.round(fine * 0.60);
  state.cash -= fine;
  state.policeFinesReceived = (state.policeFinesReceived || 0) + 1;

  const reason = legalStatus === 'stolen'
    ? `${carLabel} flagged as stolen by police.`
    : legalStatus === 'noTitle'
      ? `${carLabel} sold without a valid title.`
      : `${carLabel} has an altered VIN — suspicious activity flagged.`;

  const impoundNote = impound
    ? ' The vehicle has been impounded — it is lost from your inventory.'
    : '';

  addNote(`🚔 POLICE FINE! ${reason} Fine: ${formatCurrency(fine)}.${impoundNote}`, 'error');
  showModal(
    '🚔 Police Action!',
    `${reason}\n\nFine amount: ${formatCurrency(fine)}${state.upgrades.complianceTraining ? ' (reduced 40% by Compliance Training)' : ''}.${impoundNote}`,
    () => {}
  );
  if (impound && state.garage.find(c => c.id === car.id)) {
    state.garage = state.garage.filter(c => c.id !== car.id);
    state.customerOffers  = state.customerOffers.filter(o => o.carId !== car.id);
    state.tradeInRequests = state.tradeInRequests.filter(r => r.targetCarId !== car.id);
  }
  runAchievementChecks();
  return true;
}

/** Build a full car object from a catalog entry. */
function buildCar(entry, condition, source, inspected = false) {
  // Factory cars are always 2026 with near-zero miles
  const year    = source === 'factory' ? 2026 : randomInt(entry.yearRange[0], entry.yearRange[1]);
  const mileage = source === 'factory' ? randomInt(5, 50) : randomInt(entry.baseMileage[0], entry.baseMileage[1]);
  const titleStatus = pickTitleStatus(source, condition, mileage);
  const issues  = inspected || source === 'factory' ? [] : genHiddenIssues(condition);
  // Legal status & VIN — only relevant for used cars
  const legalStatus = source === 'factory' ? 'clean' : genLegalStatus(condition, mileage);
  const vinStatus   = source === 'factory' ? 'normal' : genVinStatus(legalStatus);
  // Crash damage severity — more common for used cars
  const crashDamageSeverity = source === 'factory' ? 'none' : genCrashDamageSeverity(condition);
  // Add a crash damage hidden issue if there is crash damage
  if (crashDamageSeverity !== 'none') {
    const crashCost = Math.round(
      entry.marketValue * CONDITION_VALUE[condition] * CRASH_DAMAGE_REPAIR_MULT[crashDamageSeverity]
    );
    const crashLabel = `Hidden crash damage (${crashDamageSeverity})`;
    if (!issues.some(i => i.name === crashLabel)) {
      issues.push({ name: crashLabel, cost: crashCost, isCrashDamage: true, severity: crashDamageSeverity });
    }
  }
  const repairCost = issues.reduce((s, i) => s + i.cost, 0);
  // Apply crash damage value penalty to market value
  const crashPenalty = 1 - CRASH_DAMAGE_VALUE_PENALTY[crashDamageSeverity];
  // Apply current market index to base market value
  const marketIdx   = (state.marketIndices || {})[entry.category] ?? 1.0;
  const marketValue = Math.round(
    entry.marketValue * CONDITION_VALUE[condition] * TITLE_VALUE_MULT[titleStatus]
    * (1 - mileage / 700000) * marketIdx * crashPenalty
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
    repairCount: 0,
    // Legal / VIN / crash damage (v10)
    legalStatus,
    vinStatus,
    legalDiscovered: legalStatus === 'clean',
    vinDiscovered: vinStatus === 'normal',
    crashDamageSeverity,
    crashDamageDiscovered: false,
    hasCrashRepair: false,
    // Discontinued models: used-market only, flavor info for display
    discontinued: !!entry.discontinued,
    productionStart: entry.yearRange[0],
    productionEnd: entry.yearRange[1],
  };
}

/** Generate a fresh batch of Used Market offers (cars available to buy). */
function pickCatalogEntryForUsed() {
  const rep = state.reputation || 1;
  const consign = !!state.upgrades?.exoticConsignment; // Exotic Consignment Network: premium/exotic cars listed far more often
  const weighted = CAR_CATALOG.map(entry => {
    const expensive = entry.marketValue >= 180000 ? (consign ? 0.35 : 0.08)
                    : entry.marketValue >= 90000  ? (consign ? 0.85 : 0.35) : 1.0;
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

/**
 * Real-world private sellers tend to anchor their asking price on what THEY think
 * the car is worth — usually right around market value, often a bit above it, and
 * only sometimes below. This picks a multiplier on market value that reflects that:
 * mostly at-or-slightly-above, occasionally a motivated-seller discount, rarely a
 * big reach. (minAcceptPrice below is a separate, lower "walk-away floor" — the
 * asking price itself just shouldn't default to a bargain.)
 */
function pickAskingPriceMultiplier() {
  const r = Math.random();
  if (r < 0.12) return randomFloat(0.85, 0.97);   // 12% — motivated/quick sale
  if (r < 0.70) return randomFloat(0.97, 1.06);   // 58% — priced at what it's worth
  if (r < 0.93) return randomFloat(1.06, 1.15);   // 23% — a bit optimistic
  return randomFloat(1.15, 1.25);                 //  7% — reaching, rare
}

function generateUsedMarket() {
  const count = randomInt(4, 7) + getUsedMarketBonusListings(); // Trade Network / Auction Membership add listings
  const offers = [];
  for (let i = 0; i < count; i++) {
    const entry     = pickCatalogEntryForUsed();
    const condition = pickCondition(getUsedConditionWeights());
    const car       = buildCar(entry, condition, 'used', false);
    const ownerAwareOfIssues = Math.random() < 0.4;
    const effectiveMV = ownerAwareOfIssues ? car.marketValue - car.repairCost * 0.5 : car.marketValue;
    const askingPrice    = Math.round(effectiveMV * pickAskingPriceMultiplier());
    // Hidden floor — seller won't accept below this. Keeps a real negotiation
    // window under the asking price without making the asking price itself
    // a de-facto discount.
    const minAcceptPrice = Math.round(askingPrice * randomFloat(0.85, 0.95));
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
    const targetCar = randomFrom(listed);

    // === Price-ratio gate (mirrors cash-buyer logic) ===
    const askRatio = targetCar.listPrice / targetCar.marketValue;
    // Hard cutoff: no trade-in requests for cars priced more than 2× market value.
    if (askRatio > 2.0) continue;
    // Severely reduce probability for moderately overpriced listings.
    if (askRatio > 1.5 && Math.random() > 0.15) continue;
    if (askRatio > 1.2 && Math.random() > 0.45) continue;

    const entry       = pickCatalogEntryForUsed();
    const condition   = pickCondition([0.05, 0.25, 0.40, 0.30]);
    const customerCar = buildCar(entry, condition, 'used', false);
    customerCar.purchasePrice = 0;
    // Their car's value at ~55–80% market (they inflate a bit)
    const customerCarValue = Math.round(customerCar.marketValue * randomFloat(0.55, 0.80));

    // === Anchor total offer to market value, not list price ===
    // The higher the askRatio, the lower the total customer is willing to pay.
    let buyerTotalWillingToPay;
    if (askRatio > 1.5) {
      // Heavy overpricing: lowball based on market value with skepticism discount.
      const skepticismDiscount = clamp(1.0 - (askRatio - 1.5) * OVERPRICED_SKEPTICISM_RATE, 0.60, 0.90);
      buyerTotalWillingToPay = Math.round(targetCar.marketValue * skepticismDiscount * randomFloat(0.75, 0.95));
    } else if (askRatio > 1.2) {
      // Moderately overpriced: buyer anchors to market value, usually below list.
      buyerTotalWillingToPay = Math.round(targetCar.marketValue * randomFloat(0.80, 0.97));
    } else if (askRatio > 1.05) {
      // Slightly overpriced: offer near but slightly below list price.
      buyerTotalWillingToPay = Math.round(targetCar.marketValue * randomFloat(0.90, 1.03));
    } else {
      // Fair pricing: buyer may offer up to slightly above market value.
      buyerTotalWillingToPay = Math.round(targetCar.marketValue * randomFloat(0.94, 1.06));
    }

    // cashDelta: positive = customer adds cash, negative = customer wants you to pay extra.
    const rawDelta = buyerTotalWillingToPay - customerCarValue;
    // Cap extra cash to 30% of market value (prevents insane top-ups for overpriced cars).
    const maxExtraCash = Math.round(targetCar.marketValue * 0.30);
    // Cap the amount the customer asks us to pay to 20% of market value.
    const minDelta = -Math.round(targetCar.marketValue * 0.20);
    const cashDelta = clamp(rawDelta, minDelta, maxExtraCash);

    newRequests.push({
      id: generateId(),
      customerCar,
      customerCarValue,
      targetCarId: targetCar.id,
      cashDelta,
      counterCashDelta: null,
      state: 'pending',   // 'pending' | 'countered'
      expiresDay: state.day + 2,
      round: 0,           // negotiation round counter (0 = initial offer)
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
      const askRatio = car.listPrice / car.marketValue;

      // When the car is overpriced, buyers are aware of market value and anchor
      // their offers there — not to the inflated asking price.
      // At extreme ratios only lowballers appear, offering well below market.
      let buyerMax, offeredPrice;
      if (askRatio > 1.5) {
        // Lowball territory: buyer offers based on market value with a skepticism discount.
        // The more overpriced, the harsher the lowball (OVERPRICED_SKEPTICISM_RATE per extra ratio unit).
        const skepticismDiscount = clamp(1.0 - (askRatio - 1.5) * OVERPRICED_SKEPTICISM_RATE, 0.55, 0.90);
        buyerMax     = Math.round(car.marketValue * skepticismDiscount * clamp(titleBuyerMult + 0.1, 0.65, 1.05));
        offeredPrice = Math.round(buyerMax * randomFloat(0.82, 0.97));
      } else if (askRatio > 1.2) {
        // Above market: buyer knows and anchors to market value.
        const mvMult = randomFloat(0.78, 0.97);
        buyerMax     = Math.round(car.marketValue * mvMult * clamp(titleBuyerMult + 0.1, 0.65, 1.05));
        offeredPrice = Math.round(buyerMax * randomFloat(0.87, 0.98));
      } else {
        // Normal: buyer offers relative to list price as before.
        buyerMax     = Math.round(car.listPrice * randomFloat(0.86, 0.99) * clamp(titleBuyerMult + 0.1, 0.65, 1.05));
        const mult   = randomFloat(0.72, 0.97);
        offeredPrice = Math.round(Math.min(buyerMax * 0.98, car.listPrice * mult));
      }

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

  // askRatio > 1 means overpriced; hard cap above 3× makes sale impossible.
  const askRatio = car.listPrice / car.marketValue;
  if (askRatio > 3.0) return 0;

  let chance = 0.10;

  // Price attractiveness — steep exponential penalty for overpricing.
  // Retries do NOT improve this: every day uses the same curve independently.
  // Fair-price zone extends to 10% over market value (normal dealer margin)
  // before any penalty kicks in — a car priced right at or modestly above
  // market should not be punished for the seller wanting a profit.
  let priceAtt;
  if (askRatio <= 1.10) {
    // At or modestly over market: slight reward for competitive pricing.
    priceAtt = clamp((1 / askRatio) * 0.92, 0.84, 1.9);
  } else if (askRatio <= 1.25) {
    // Above a normal margin: mild reduction (0.84 → 0.45).
    priceAtt = lerp(0.84, 0.45, (askRatio - 1.10) / 0.15);
  } else if (askRatio <= 1.5) {
    // Moderately over: significant reduction (0.45 → 0.15).
    priceAtt = lerp(0.45, 0.15, (askRatio - 1.25) / 0.25);
  } else if (askRatio <= 2.0) {
    // Way over: near-zero (0.15 → 0.03).
    priceAtt = lerp(0.15, 0.03, (askRatio - 1.5) / 0.50);
  } else {
    // Extreme (2× – 3×): effectively impossible (0.03 → 0).
    priceAtt = lerp(0.03, 0, (askRatio - 2.0) / 1.0);
  }

  const condFactor = CONDITION_FACTOR[car.condition] || 1;

  // Body-style popularity × per-model demand (catalog demandFactor) × absolute price
  // tier. These three govern how big the buyer pool is — separate from whether the
  // price is fair (that's priceAtt above).
  const categoryFactor = CATEGORY_POPULARITY[car.category] || 1.0;
  // Luxury Clientele upgrades widen the buyer pool for pricey cars (see getHighEndBuyerBoost).
  const priceTierFactor = getPriceTierFactor(car.marketValue) * getHighEndBuyerBoost(car.marketValue);

  // Crash/accident history — a live severity is a harder sell than the same car
  // with no known damage; a past (repaired) accident still leaves a smaller dent.
  const crashSeverity   = car.crashDamageSeverity || 'none';
  const crashFactor     = (CRASH_STIGMA_FACTOR[crashSeverity] ?? 1.0)
                         * (car.hasCrashRepair ? CRASH_HISTORY_STIGMA : 1.0);

  const daysLot    = car.daysInLot;

  // Overpriced listings go stale faster — OVERPRICED_STALE_DECAY_RATE (8%) daily decay once on lot >3 days.
  const staleDays = Math.max(0, daysLot - 3);
  const stalePenalty = askRatio > 1.25 ? Math.pow(OVERPRICED_STALE_DECAY_RATE, staleDays) : 1.0;
  const baseLotFactor  = daysLot > 14 ? 0.68 : daysLot > 7 ? 0.84 : 1.0;
  const lotFactor      = baseLotFactor * stalePenalty;

  const marketingFactor    = 1 + 0.20 * state.upgrades.marketing;
  const repBoostFactor     = 1 + 0.15 * state.upgrades.reputationBoosts;
  const repFactor          = state.reputation;
  const demandFactor       = car.demandFactor || 1;
  const washBonus          = car.washBoostDays > 0 ? WASH_SALE_CHANCE_BONUS : 1.0;
  const titleFactor        = TITLE_BUYER_MULT[car.titleStatus] || 1.0;
  const photoStudioFactor  = state.upgrades.photoStudio ? 1.10 : 1.0;
  const certifiedFactor    = isCertifiedCar(car) ? CERTIFIED_SALE_BONUS : 1.0;

  chance = chance * priceAtt * condFactor * categoryFactor * priceTierFactor * crashFactor
         * lotFactor * marketingFactor * repFactor
         * repBoostFactor * demandFactor * washBonus * titleFactor * photoStudioFactor * certifiedFactor;

  // No guaranteed floor for overpriced cars — retries must never converge to a sale.
  const floor = askRatio > 2.0 ? 0 : askRatio > 1.5 ? 0.001 : askRatio > 1.25 ? 0.005 : 0.015;
  return clamp(chance, floor, 0.85);
}

/**
 * Returns a human-readable price label and CSS class based on how the
 * asking price compares to market value.
 */
/**
 * Human-readable label for how big this car's buyer pool is, independent of price —
 * driven by body style and absolute price tier. Helps explain why two fairly-priced
 * cars can still sell at very different speeds.
 */
function getPopularityLabel(car) {
  const categoryFactor  = CATEGORY_POPULARITY[car.category] || 1.0;
  const priceTierFactor = getPriceTierFactor(car.marketValue) * getHighEndBuyerBoost(car.marketValue);
  const combined = categoryFactor * priceTierFactor;
  if (combined >= 1.05) return { text: 'High Demand',    cls: 'text-green'  };
  if (combined >= 0.80) return { text: 'Average Demand', cls: 'text-yellow' };
  if (combined >= 0.45) return { text: 'Niche Market',   cls: 'text-yellow' };
  return                       { text: 'Very Niche',     cls: 'text-red'    };
}

function getPriceLabel(car) {
  if (!car.isForSale || car.listPrice <= 0) return null;
  const r = car.listPrice / car.marketValue;
  if (r > 3.0)  return { text: 'Extreme — No Buyers',      cls: 'text-red',    interest: 'None' };
  if (r > 2.0)  return { text: 'Way Over Market',          cls: 'text-red',    interest: 'Nearly None' };
  if (r > 1.5)  return { text: 'Overpriced',               cls: 'text-red',    interest: 'Very Low' };
  if (r > 1.25) return { text: 'Above Market',             cls: 'text-yellow', interest: 'Low' };
  if (r > 1.10) return { text: 'Slightly High',            cls: 'text-yellow', interest: 'Moderate' };
  if (r > 0.9)  return { text: 'Fair Price',               cls: 'text-green',  interest: 'Good' };
  return              { text: 'Below Market — Great Deal', cls: 'text-green',  interest: 'High' };
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
  const staffWages      = getTotalStaffWages();
  const lotCost         = getLotOverhead(); // garage tier × difficulty, minus Cost Efficiency Program
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
  // Track clean legal status sales (verified)
  if ((car.legalStatus || 'clean') === 'clean' && car.legalDiscovered) {
    state.cleanTitleSalesVerified = (state.cleanTitleSalesVerified || 0) + 1;
  }
  // Track crash damage rebuilds (repaired and sold)
  const crashSev = car.crashDamageSeverity || 'none';
  if ((crashSev === 'moderate' || crashSev === 'severe') && car.hasCrashRepair && profit > 0) {
    state.crashDamageRebuilds = (state.crashDamageRebuilds || 0) + 1;
  }
}

function getLiquidationMultiplier(car) {
  return LIQUIDATION_MULT[car?.titleStatus] || LIQUIDATION_MULT.clean;
}

function getLeaseRate(car) {
  const diffKey = state.difficulty === 'hard' ? 'hard' : 'normal';
  return LEASE_RATE_BY_SEGMENT[diffKey][car.category] ?? LEASE_RATE_BY_SEGMENT[diffKey].Sedan;
}

function computeLeasePaymentPerDay(car) {
  const base = Math.max(75, Math.round((car.marketValue * getLeaseRate(car)) / 30));
  return Math.round(base * getLeasePaymentMult());
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

/**
 * Compute the realistic repair cost for a car.
 * Cost scales with:
 *   - Actual hidden-issue repair costs (or a minimum labour floor)
 *   - Mileage multiplier: gets exponentially expensive past 100k, prohibitive at 140k–250k
 *   - Repair-count multiplier: each prior repair makes subsequent ones much costlier
 */
function computeRepairCost(car) {
  const issueCost    = car.hiddenIssues.reduce((s, i) => s + i.cost, 0);
  const basePartsCost = Math.max(REPAIR_COST_BASE_MIN, issueCost);

  const miles = car.mileage;
  const mileageMult =
    miles < 50000  ? 1.0 :
    miles < 100000 ? lerp(1.0, 1.8,  (miles - 50000)  / 50000) :
    miles < 140000 ? lerp(1.8, 3.5,  (miles - 100000) / 40000) :
    miles < 200000 ? lerp(3.5, 8.0,  (miles - 140000) / 60000) :
    miles < 250000 ? lerp(8.0, 16.0, (miles - 200000) / 50000) :
    16.0;

  const repairCount = car.repairCount || 0;
  const repairMult =
    repairCount === 0 ? 1.0 :
    repairCount === 1 ? 1.6 :
    repairCount === 2 ? 2.6 :
    repairCount === 3 ? 4.2 :
    Math.min(6.5 + (repairCount - 4) * 2.0, 18.0);

  const workshopMult = state.upgrades?.reconditioningWorkshop ? (1 - WORKSHOP_REPAIR_DISCOUNT) : 1;
  return Math.round(basePartsCost * mileageMult * repairMult * workshopMult);
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
    // Apply combined mileage-based + time-based depreciation each day
    car.marketValue = Math.max(1000, Math.round(
      car.marketValue * (1 - (milesDelta / LEASE_DEPRECIATION_DIVISOR) - LEASE_DAILY_TIME_DEPRECIATION_RATE)
    ));

    // ── Rare crash event ─────────────────────────────────────────────────────
    const crashBonus = state.difficulty === 'hard' ? 0.0002 : 0;
    if (Math.random() < LEASE_CRASH_PROBABILITY + crashBonus) {
      // Lessee pays out all remaining lease payments immediately
      const remainingDays   = Math.max(0, lease.endDay - state.day);
      const remainingPayout = Math.round(remainingDays * lease.paymentPerDay);
      state.cash += remainingPayout;
      lease.totalPaid = (lease.totalPaid || 0) + remainingPayout;

      // Return car in heavily damaged Poor / Salvage condition (condition code 'D' = Poor)
      const valueBefore    = car.marketValue;
      car.condition        = 'D';
      car.titleStatus      = 'salvage';
      // Repair cost is 90–130% of current market value — near or above the car's worth
      car.repairCost       = Math.round(car.marketValue * randomFloat(LEASE_CRASH_REPAIR_COST_MIN, LEASE_CRASH_REPAIR_COST_MAX));
      // Add structural crash damage entry to the car's hidden issues list
      const structuralCost = Math.round(car.repairCost * LEASE_CRASH_STRUCTURAL_RATIO);
      const crashIssue     = { name: 'Crash damage (structural)', cost: structuralCost };
      if (!car.hiddenIssues.some(i => i.name === crashIssue.name)) car.hiddenIssues.push(crashIssue);
      car.inspected = true;
      const carLabel        = `${car.year} ${car.make} ${car.model}${car.trim ? ` ${car.trim}` : ''}`;
      const repairPct       = Math.round(car.repairCost / Math.max(1, valueBefore) * 100);
      addNote(
        `💥 Lease crash! ${carLabel} was wrecked. Lessee paid out ${formatCurrency(remainingPayout)} (remaining payments). Repair cost: ~${formatCurrency(car.repairCost)}.`,
        'error'
      );
      showModal(
        '💥 Lease Vehicle Crashed!',
        `${carLabel} was involved in a crash while on lease.\n\nLessee payout (remaining payments): ${formatCurrency(remainingPayout)}\nVehicle returned in Poor / Salvage condition.\nEstimated repair cost: ${formatCurrency(car.repairCost)} (${repairPct}% of car value)\n\nRepair or sell for parts — your call.`,
        () => {}
      );
      showToast(`💥 Leased ${carLabel} was crashed! Payout received.`, 'error');
      car.leaseStatus = 'none';
      car.activeLease = null;
      continue;
    }

    const termProgress = clamp((state.day - lease.startDay) / Math.max(1, lease.termDays), 0, LEASE_TERM_PROGRESS_CAP);
    const hardBonus = state.difficulty === 'hard' ? LEASE_ISSUE_BONUS_HARD_DIFFICULTY : 0;
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
      // If hidden issues accumulated but condition is still A, reflect real wear — drop to B
      if (car.hiddenIssues.length > 0 && car.condition === 'A') {
        car.condition = 'B';
      }

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
    if (startedToday >= getLeaseStartCap()) break;
    if (car.leaseStatus !== 'available' || car.inServiceUntilDay || car.isForSale) continue;
    const valueScore = clamp(1 - ((car.marketValue || 0) / LEASE_VALUE_SCORE_DIVISOR), 0.18, 0.95);
    const demand = clamp(car.demandFactor || 1, 0.7, 1.4);
    // Lease lead chance = base + (value-driven factor × demand), then clamped to keep pacing stable.
    const baseChance = clamp(
      LEASE_START_CHANCE_BASE + (LEASE_START_CHANCE_FACTOR * valueScore * demand),
      LEASE_START_CHANCE_MIN,
      LEASE_START_CHANCE_MAX
    );
    // Lease Management System / Fleet Leasing Program bring in more lease leads.
    const chance = Math.min(baseChance * getLeaseLeadChanceMult(), 0.5);
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
  if (state.difficulty === 'easy') return; // Easy mode: no loan interest, no delinquency ladder
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

  // Credit score tracks whether obligations (operating costs AND, if present,
  // loan payments) actually got covered each day — independent of whether a
  // loan is even active. This is what loan APR is priced from (see
  // creditScoreAprAdjustment), so running cash-negative on Normal/Hard still
  // quietly costs you even with a $0 loan balance.
  const prevCreditScore = state.creditScore ?? CREDIT_SCORE_START;
  if (state.cash < 0) {
    const drop = CREDIT_SCORE_DROP[state.difficulty] ?? CREDIT_SCORE_DROP.normal;
    state.creditScore = Math.max(CREDIT_SCORE_MIN, prevCreditScore - drop);
    if (state.creditScore < prevCreditScore) {
      addNote(`📉 Credit score dropped to ${state.creditScore} — operating costs weren't fully covered.`, 'warning');
    }
  } else {
    state.creditScore = Math.min(CREDIT_SCORE_MAX, prevCreditScore + CREDIT_SCORE_RECOVERY_PER_DAY);
  }

  // Only the loan itself can trigger a missed-payment strike — going cash-negative
  // with no outstanding loan balance is not a loan default and should not touch
  // the delinquency ladder at all.
  if (state.loanBalance > 0 && (state.cash < 0 || (due > 0 && state.difficulty === 'hard' && state.cash < 250))) {
    state.daysGoodStanding = 0;
    state.missedPayments = (state.missedPayments || 0) + 1;
    state.delinquencyLevel = Math.max(state.delinquencyLevel || 0, state.missedPayments);
    if (state.missedPayments === DELINQUENCY_WARNING_LEVEL) {
      addNote('⚠️ Late payment warning: cash is negative after obligations.', 'warning');
      showToast('⚠️ Missed payment warning.', 'warning');
    } else if (state.missedPayments === DELINQUENCY_DEFAULT_LEVEL) {
      state.loanFrozen = true;
      state.loanApr += state.difficulty === 'hard' ? 0.08 : 0.05;
      addNote(`🚫 Loan default: credit line frozen. APR raised to ${(state.loanApr * 100).toFixed(1)}%.`, 'error');
      showToast('🚫 Loan default. Credit line frozen.', 'error');
    } else if (state.missedPayments >= DELINQUENCY_BANKRUPTCY_LEVEL) {
      triggerBankruptcy();
    }
  } else if (state.missedPayments > 0) {
    state.missedPayments = 0;
    if (state.delinquencyLevel < DELINQUENCY_DEFAULT_LEVEL) state.loanFrozen = false;
    addNote('✅ Late payments cleared — account back in good standing.', 'success');
    // Begin credit recovery tracking
    state.daysGoodStanding = (state.daysGoodStanding || 0) + 1;
  } else if (state.delinquencyLevel > 0 && state.missedPayments === 0) {
    // Credit recovery: reduce delinquency level slowly on Normal mode, not on Hard
    if (state.difficulty !== 'hard') {
      state.daysGoodStanding = (state.daysGoodStanding || 0) + 1;
      const recoveryDays = 10; // every 10 good-standing days, recover 1 level
      if (state.daysGoodStanding >= recoveryDays) {
        state.daysGoodStanding = 0;
        state.delinquencyLevel = Math.max(0, state.delinquencyLevel - 1);
        if (state.delinquencyLevel < DELINQUENCY_DEFAULT_LEVEL && state.loanFrozen && state.loanBalance <= 0) {
          state.loanFrozen = false;
        }
        const recoveryMsg = state.delinquencyLevel === 0 ? ' Account fully restored!' : ' Keep it up!';
        addNote(`📈 Credit improving — late payment level reduced to ${state.delinquencyLevel}.${recoveryMsg}`, 'success');
      }
    }
  } else {
    // No issues — track good standing days even without prior delinquency (for future use)
    state.daysGoodStanding = (state.daysGoodStanding || 0) + 1;
  }
}

function triggerBankruptcy() {
  state.delinquencyLevel = DELINQUENCY_BANKRUPTCY_LEVEL;
  // Bankruptcy is a major credit event on its own, on top of whatever the
  // daily cash-negative dings already did to the score.
  state.creditScore = Math.max(CREDIT_SCORE_MIN, (state.creditScore ?? CREDIT_SCORE_START) - CREDIT_SCORE_BANKRUPTCY_DROP);
  if (state.difficulty === 'hard') {
    state.gameOver = true;
    state.hardBankruptcyOccurred = true;
    addNote('💥 Bankruptcy on Hard mode. Game Over.', 'error');
    saveState(); // gated by state.gameOver — deletes this slot's save rather than writing it
    clearActiveSession(); // nothing left to auto-resume into on refresh
    runAchievementChecks();
    showGameOverScreen();
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

// ============================================================
// GAME OVER SCREEN (v1.3.4)
// ============================================================
function showGameOverScreen() {
  const el = document.getElementById('game-over-screen');
  if (!el) return;
  playSfx('gameOver');
  const statsEl = document.getElementById('game-over-stats');
  if (statsEl) {
    statsEl.innerHTML = `
      <div class="game-over-stat-row"><span>Day reached</span><strong>${state.day}</strong></div>
      <div class="game-over-stat-row"><span>Total cars sold</span><strong>${(state.salesHistory||[]).length}</strong></div>
      <div class="game-over-stat-row"><span>Cumulative profit</span><strong>${formatCurrency((state.salesHistory||[]).reduce((s,h)=>s+(h.profit||0),0))}</strong></div>
      <div class="game-over-stat-row"><span>Difficulty</span><strong class="text-red">Hard 💪</strong></div>`;
  }
  el.classList.remove('hidden');
}

function gameOverReturnToMenu() {
  document.getElementById('game-over-screen')?.classList.add('hidden');
  returnToMenu();
}

function gameOverNewGame() {
  document.getElementById('game-over-screen')?.classList.add('hidden');
  state = JSON.parse(JSON.stringify(DEFAULT_STATE));
  state.difficulty = 'hard';
  syncLoanTermsToDifficulty();
  state.usedMarketOffers = generateUsedMarket();
  saveState();
  renderAll();
  showToast('New Hard game started. Good luck! 💪', 'success');
}

/** Shift per-segment market indices and occasionally fire a market event. */
function processMarketVolatility() {
  const isHard = state.difficulty === 'hard';
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

    // Mileage-based aging depreciation — high-mileage vehicles lose value every day
    // regardless of market conditions, reflecting ongoing mechanical wear.
    if (car.mileage > 80000) {
      const excessMiles = car.mileage - 80000;
      // Rate climbs from ~0.03%/day at 80k to ~0.15%/day at 250k+
      const agingRate = clamp(0.0003 + (excessMiles / 170000) * 0.0012, 0.0003, 0.0015);
      // Additional penalty for repeatedly repaired vehicles
      const repairPenalty = (car.repairCount || 0) * 0.0002;
      car.marketValue = Math.max(500, Math.round(car.marketValue * (1 - agingRate - repairPenalty)));
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

/** Each day: staff evaluates pending trade-in requests and generates acceptance/counter suggestions. */
function processStaffTradeInSuggestions() {
  if (!state.staff?.length) return;
  const pending = (state.tradeInRequests || []).filter(r => r.state === 'pending' && !r.staffSuggestion);
  if (!pending.length) return;
  const capacity   = state.staff.reduce((sum, s) => sum + s.speed, 0);
  const maxActions = Math.min(pending.length, capacity);
  for (let i = 0; i < maxActions; i++) {
    const req       = pending[i];
    const targetCar = state.garage.find(c => c.id === req.targetCarId);
    if (!targetCar) continue;
    const staffer   = state.staff[i % state.staff.length];
    const cashDelta = req.cashDelta;
    const netValue  = req.customerCarValue + cashDelta;
    // A deal is "good" if net value covers at least 85% of list price
    const threshold = targetCar.listPrice * 0.85;
    const isGoodDeal = netValue >= threshold;
    // Staff suggests a counter: push cashDelta towards full list parity using negotiation skill
    const negotiationStrength = clamp((staffer.negotiation / 100) * STAFF_NEGOTIATION_WEIGHT, 0.1, 0.6);
    const listParity  = targetCar.listPrice - req.customerCarValue; // cashDelta needed for full list
    const suggestDelta = isGoodDeal
      ? cashDelta // deal is already good — recommend accepting as-is
      : Math.round(lerp(cashDelta, listParity, negotiationStrength));
    const confidence  = isGoodDeal ? 'High' : netValue >= threshold * 0.9 ? 'Medium' : 'Low';
    req.staffSuggestion = {
      by: staffer.name,
      suggestAccept: isGoodDeal,
      suggestDelta,
      confidence,
      note: isGoodDeal
        ? 'Deal looks good — recommend accepting.'
        : `Consider countering for ${formatCurrency(req.customerCarValue + suggestDelta)} net value.`,
    };
    addStaffActivity(`🤝 ${staffer.name} evaluated trade-in on ${targetCar.year} ${targetCar.make} ${targetCar.model}: ${isGoodDeal ? 'recommend accept' : `suggest counter delta ${formatCurrency(suggestDelta)}`} (${confidence}).`);
  }
}

/** Player accepts a staff suggestion on a trade-in request. */
function applyStaffTradeInSuggestion(requestId) {
  const req = (state.tradeInRequests || []).find(r => r.id === requestId);
  if (!req?.staffSuggestion) return;
  if (req.staffSuggestion.suggestAccept) {
    acceptTradeInRequest(requestId);
    addStaffActivity(`📝 You approved ${req.staffSuggestion.by}'s trade-in recommendation — deal accepted.`);
  } else {
    counterTradeInRequest(requestId, req.staffSuggestion.suggestDelta);
    addStaffActivity(`📝 You approved ${req.staffSuggestion.by}'s trade-in counter recommendation.`);
  }
}

/** Staff lists all eligible (unlisted, not in service, not leased) cars at market price. */
function staffListCars() {
  if (!state.staff?.length) { showToast('No staff available to list cars.', 'error'); return; }
  const staffer    = state.staff[0];
  let   listedCount = 0;
  for (const car of state.garage) {
    if (car.isForSale || car.inServiceUntilDay || (car.leaseStatus === 'active' && car.activeLease)) continue;
    car.isForSale  = true;
    car.listPrice  = car.listPrice > 0 ? car.listPrice : car.marketValue;
    listedCount++;
  }
  if (listedCount === 0) {
    showToast('No eligible cars to list — all are already listed or unavailable.', 'info'); return;
  }
  addStaffActivity(`🏷️ ${staffer.name} listed ${listedCount} car(s) for sale at market price.`);
  addNote(`🏷️ ${staffer.name} listed ${listedCount} car(s) for sale.`, 'info');
  saveState();
  renderCarLot();
  renderForSale();
  showToast(`${staffer.name} listed ${listedCount} car(s) for sale!`, 'success');
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

/** Apply the result of a finished repair / parts upgrade to a car and free it from service. */
function finishCarService(car) {
  const svc = car.pendingService;
  if (!svc) return;
  if (svc.type === 'repair') {
    const oldCond = car.condition;
    // Repair always restores to excellent condition and clears all issues
    car.condition    = 'A';
    // Mark crash repair if this car had crash damage
    if ((car.crashDamageSeverity || 'none') !== 'none') car.hasCrashRepair = true;
    car.crashDamageSeverity = 'none';
    car.hiddenIssues = [];
    car.repairCost   = 0;
    car.repairCount  = (car.repairCount || 0) + 1;
    // Value boost diminishes with each repair and with high mileage — reflects
    // diminishing returns on a wearing vehicle.
    const repairCount = car.repairCount;
    const mileagePenalty = clamp(car.mileage / 300000, 0, 0.8); // 0→0.8 at 300k miles
    const rawBoost = repairCount === 1 ? 0.12 :
                     repairCount === 2 ? 0.07 :
                     repairCount === 3 ? 0.03 :
                     0; // 4+ repairs: no value boost — car is a high-mileage beater
    const boostFactor = rawBoost * (1 - mileagePenalty);
    if (boostFactor > 0) car.marketValue = Math.round(car.marketValue * (1 + boostFactor));
    car.reconditionLog.push({ type: 'Basic Repair', day: state.day });
    addNote(`🔩 ${car.year} ${car.make} ${car.model} repair complete: ${oldCond} → ${car.condition}. Repair #${repairCount}${boostFactor > 0 ? ` (+${Math.round(boostFactor * 100)}% value)` : ' (no value gain at this mileage)'}.`, 'success');
  } else if (svc.type === 'parts') {
    car.marketValue = Math.round(car.marketValue * 1.15);
    car.reconditionLog.push({ type: 'Parts Upgrade', day: state.day });
    addNote(`🏎️ ${car.year} ${car.make} ${car.model} parts upgrade complete! +15% market value.`, 'success');
  }
  car.inServiceUntilDay = null;
  car.pendingService    = null;
}

/** Resolve pending service (repair / parts upgrade) on cars. */
function processService() {
  for (const car of state.garage) {
    if (car.pendingService && car.inServiceUntilDay !== null && car.inServiceUntilDay <= state.day) {
      finishCarService(car);
    }
    // Decay wash boost
    if (car.washBoostDays > 0) car.washBoostDays--;
  }
}

// ============================================================
// CAR THEFT — v1.3.0
// ============================================================

/** Returns the theft chance per car per day based on game progression. */
function getTheftChancePerCar() {
  const dayProgress = Math.max(0, state.day - 50);
  const baseChance  = clamp(dayProgress / 300, 0, 1) * 0.025;
  const secLevel    = state.upgrades.securityLevel || 0;
  const reduction   = THEFT_REDUCTION_BY_LEVEL[Math.min(secLevel, THEFT_REDUCTION_BY_LEVEL.length - 1)] || 0;
  return baseChance * (1 - reduction);
}

/** Each night check if any car on the lot gets stolen. */
function processTheft() {
  const diffMult = state.difficulty === 'hard' ? 1.5 : state.difficulty === 'easy' ? 0.3 : 1.0;
  const chancePerCar = getTheftChancePerCar() * diffMult;
  if (chancePerCar <= 0) return;

  const remaining = [];
  for (const car of state.garage) {
    if (Math.random() < chancePerCar) {
      // Car stolen
      const value = car.marketValue || car.purchasePrice || 5000;
      state.totalCarsStolen = (state.totalCarsStolen || 0) + 1;
      addNote(`🚨 THEFT: Your ${car.year} ${car.make} ${car.model} was stolen from the lot overnight! (Value: ${formatCurrency(value)})`, 'warning');
      showToast(`🚨 Your ${car.year} ${car.make} ${car.model} was stolen!`, 'error');
    } else {
      remaining.push(car);
    }
  }
  state.garage = remaining;
}

// ============================================================
// SERVICE GARAGE — v1.3.0
// ============================================================

const SERVICE_ISSUE_POOL = [
  // Common — small maintenance
  { label: 'Oil Change',         type: 'maintenance', labor: 80,   revenue: 150,   weight: 30 },
  { label: 'Brake Service',      type: 'maintenance', labor: 150,  revenue: 280,   weight: 20 },
  { label: 'Tire Rotation',      type: 'maintenance', labor: 60,   revenue: 120,   weight: 20 },
  { label: 'Wheel Alignment',    type: 'maintenance', labor: 90,   revenue: 175,   weight: 15 },
  { label: 'Fluid Top-off',      type: 'maintenance', labor: 50,   revenue: 100,   weight: 15 },
  { label: 'Filter Replacement', type: 'maintenance', labor: 70,   revenue: 130,   weight: 12 },
  { label: 'Wiper Blades',       type: 'maintenance', labor: 40,   revenue: 80,    weight: 10 },
  // Uncommon — moderate work
  { label: 'Battery Replacement',type: 'moderate',    labor: 200,  revenue: 380,   weight: 8  },
  { label: 'Suspension Repair',  type: 'moderate',    labor: 400,  revenue: 700,   weight: 6  },
  { label: 'Exhaust Repair',     type: 'moderate',    labor: 350,  revenue: 600,   weight: 6  },
  { label: 'AC Recharge',        type: 'moderate',    labor: 250,  revenue: 450,   weight: 7  },
  // Rare — major work
  { label: 'Engine Overhaul',    type: 'major',       labor: 1500, revenue: 2500,  weight: 3  },
  { label: 'Transmission Work',  type: 'major',       labor: 1200, revenue: 2000,  weight: 3  },
  { label: 'Crash Damage Repair',type: 'major',       labor: 2000, revenue: 3200,  weight: 2  },
  { label: 'Frame Straightening',type: 'major',       labor: 1800, revenue: 2800,  weight: 1  },
];

function pickServiceIssue() {
  const totalWeight = SERVICE_ISSUE_POOL.reduce((s, i) => s + i.weight, 0);
  let r = Math.random() * totalWeight;
  for (const issue of SERVICE_ISSUE_POOL) {
    r -= issue.weight;
    if (r <= 0) return issue;
  }
  return SERVICE_ISSUE_POOL[0];
}

/** Returns number of in-game days the service bay is occupied, based on the worst issue type. */
function getServiceDays(sc) {
  const typeOrder = { maintenance: 1, moderate: 2, major: 3 };
  const maxOrder = (sc.issues || []).reduce((m, i) => Math.max(m, typeOrder[i.type] || 1), 1);
  return maxOrder === 3 ? 3 : maxOrder === 2 ? 2 : 1;
}

const SERVICE_CAR_MAKES_MODELS = [
  { make: 'Toyota',   model: 'Camry'   }, { make: 'Honda',  model: 'Accord'  },
  { make: 'Ford',     model: 'F-150'   }, { make: 'Chevy',  model: 'Silverado'},
  { make: 'BMW',      model: '3 Series'}, { make: 'Audi',   model: 'A4'      },
  { make: 'Nissan',   model: 'Altima'  }, { make: 'Hyundai',model: 'Elantra' },
  { make: 'Kia',      model: 'Sorento' }, { make: 'Jeep',   model: 'Wrangler'},
  { make: 'Mercedes', model: 'C-Class' }, { make: 'Dodge',  model: 'Charger' },
];
// Larger service departments attract fleet and luxury customers.
const SERVICE_PREMIUM_MAKES_MODELS = [
  { make: 'Porsche',   model: '911'          }, { make: 'Land Rover', model: 'Range Rover' },
  { make: 'Tesla',     model: 'Model S'      }, { make: 'BMW',        model: 'M5'          },
  { make: 'Mercedes',  model: 'S-Class'      }, { make: 'Audi',       model: 'RS6 Avant'   },
  { make: 'Cadillac',  model: 'Escalade'     }, { make: 'Lexus',      model: 'LX 600'      },
];
const CUSTOMER_NAMES = [
  'Alex P.', 'Jordan K.', 'Sam R.', 'Taylor B.', 'Morgan L.', 'Casey H.',
  'Riley M.', 'Quinn T.', 'Avery S.', 'Drew C.', 'Parker W.', 'Logan N.',
];

function generateServiceCar() {
  const svcLevel = state.upgrades.serviceCapacityLevel || 0;
  const usePremium = svcLevel >= 2 && Math.random() < (svcLevel >= 3 ? 0.6 : 0.35);
  const mm    = randomFrom(usePremium ? SERVICE_PREMIUM_MAKES_MODELS : SERVICE_CAR_MAKES_MODELS);
  const year  = 2016 + randomInt(0, 9);
  const mileage = randomInt(20000, 180000);
  // Pick 1–3 issues, first one may be major (rare), rest are small
  const issueCount = Math.random() < 0.2 ? randomInt(2, 3) : 1;
  const issues = [];
  // Bigger departments land bigger jobs — scale both what the customer pays and the labor bill.
  const valueMult = getServiceJobValueMult();
  for (let i = 0; i < issueCount; i++) {
    const issue = { ...pickServiceIssue() };
    issue.labor   = Math.round(issue.labor   * valueMult);
    issue.revenue = Math.round(issue.revenue * valueMult);
    issues.push(issue);
  }
  const totalLabor   = issues.reduce((s, i) => s + i.labor, 0);
  const totalRevenue = issues.reduce((s, i) => s + i.revenue, 0);
  return {
    id: generateId(),
    make: mm.make,
    model: mm.model,
    year,
    mileage,
    ownerName: randomFrom(CUSTOMER_NAMES),
    issues,
    laborCost: totalLabor,
    revenueWhenDone: totalRevenue,
    arrivalDay: state.day,
    daysAvailable: randomInt(5, 10), // customer picks it up if not started in time
    status: 'waiting',              // 'waiting' | 'inProgress' | 'ready'
    serviceStartDay: null,
    serviceCompleteDay: null,
  };
}

/**
 * How big the customer waiting room is allowed to get. A brand-new Service Bay hasn't
 * built a customer base yet, so it starts small (2 waiting slots) and grows as the shop
 * proves itself — either by being open for a while (word of mouth) or by completing jobs
 * (reputation). It's capped at the old "twice the bay count" ceiling once the shop matures,
 * so upgrading service capacity later still pays off immediately for an established shop.
 */
function getServiceQueueLimit() {
  const capacity = state.serviceGarageCapacity || 3;
  const maxLimit = capacity * 2; // full waiting-room size once the service dept is established
  const unlockedDay = state.serviceBayUnlockedDay;
  if (unlockedDay === null || unlockedDay === undefined) return maxLimit; // legacy safety net
  const daysOpen = Math.max(0, state.day - unlockedDay);
  const byAge = 2 + Math.floor(daysOpen / 4);                                   // +1 slot / 4 days open
  const byRep = 2 + Math.floor((state.totalServiceJobsCompleted || 0) / 3);     // +1 slot / 3 jobs done
  return clamp(Math.max(byAge, byRep), 2, maxLimit);
}

/** Each new day: possibly bring in new service cars if there's waiting-queue room. */
function processIncomingServiceCars() {
  const queueLimit = getServiceQueueLimit();
  const totalJobs  = (state.serviceGarage || []).length;
  if (totalJobs >= queueLimit) return;

  const unlockedDay = state.serviceBayUnlockedDay;
  const daysOpen = (unlockedDay === null || unlockedDay === undefined) ? 9999 : Math.max(0, state.day - unlockedDay);
  // A brand-new service department has no reputation with customers yet — word of mouth
  // takes time to build. Ramp the daily arrival chance up from a trickle to full strength
  // over roughly the shop's first two months, rather than starting maxed out.
  const maturity = clamp(0.15 + daysOpen / 60, 0.15, 1);
  const arrivalChance = clamp(
    (0.30 + state.day * 0.003 + (state.reputation - 1) * 0.15) * maturity,
    0.04, 0.85
  );
  const openQueueSlots = queueLimit - totalJobs;
  for (let i = 0; i < openQueueSlots; i++) {
    if (Math.random() < arrivalChance) {
      const sc = generateServiceCar();
      state.serviceGarage.push(sc);
      addNote(`🔧 Service job arrived: ${sc.year} ${sc.make} ${sc.model} — ${sc.ownerName} needs ${sc.issues.map(i => i.label).join(', ')}.`, 'info');
    }
  }
}

/** Each day: expire waiting service cars whose daysAvailable has run out; also expire ready jobs after a grace period. */
function processServiceGarageExpiry() {
  const remaining = [];
  for (const sc of (state.serviceGarage || [])) {
    const status = sc.status || 'ready'; // legacy entries without status treated as ready
    const age = state.day - sc.arrivalDay;
    if (status === 'waiting' && age > sc.daysAvailable) {
      addNote(`⏰ ${sc.ownerName}'s ${sc.year} ${sc.make} ${sc.model} waited too long and left without service.`, 'warning');
    } else if (status === 'ready' && sc.serviceCompleteDay !== null && state.day > (sc.serviceCompleteDay + 3)) {
      // Customer picks up their finished car if payment not collected within 3 days of completion
      addNote(`⏰ ${sc.ownerName} picked up their ${sc.year} ${sc.make} ${sc.model} — payment window expired.`, 'warning');
    } else {
      remaining.push(sc);
    }
  }
  state.serviceGarage = remaining;
}

/** Each day: move inProgress service jobs to 'ready' when service duration has elapsed. */
function processServiceJobCompletion() {
  for (const sc of (state.serviceGarage || [])) {
    if ((sc.status || '') === 'inProgress' && sc.serviceCompleteDay !== null && state.day >= sc.serviceCompleteDay) {
      sc.status = 'ready';
      addNote(`🔧 Service done: ${sc.ownerName}'s ${sc.year} ${sc.make} ${sc.model} is ready for pickup. Collect payment in the Service tab.`, 'success');
    }
  }
}

/** Player action: start a service job — claims a bay slot and begins the repair timer. */
function getCustomerServiceBayUsage() {
  return (state.serviceGarage || []).filter(j => (j.status || '') === 'inProgress').length;
}

function getOwnCarServiceBayUsage() {
  return (state.garage || []).filter(c => !!c.pendingService && c.inServiceUntilDay !== null).length;
}

function getTotalServiceBayUsage() {
  return getCustomerServiceBayUsage() + getOwnCarServiceBayUsage();
}

function startServiceJob(serviceCarId) {
  if (state.gameOver) return;
  const sc = (state.serviceGarage || []).find(j => j.id === serviceCarId);
  if (!sc) { showToast('Service job not found.', 'error'); return; }
  if ((sc.status || 'waiting') !== 'waiting') { showToast('This job is already in progress or complete.', 'error'); return; }
  const capacity   = state.serviceGarageCapacity || 3;
  const occupiedBays = getTotalServiceBayUsage();
  if (occupiedBays >= capacity) {
    showToast(`All ${capacity} bay slot(s) are busy — complete a current job first.`, 'error'); return;
  }
  const days = getServiceDays(sc);
  sc.status             = 'inProgress';
  sc.serviceStartDay    = state.day;
  sc.serviceCompleteDay = state.day + days;
  addNote(`🔩 Started service on ${sc.ownerName}'s ${sc.year} ${sc.make} ${sc.model} — ${days} day(s) in bay. Ready Day ${sc.serviceCompleteDay}.`, 'info');
  saveState();
  renderServiceGarage();
  showToast(`Service started — bay occupied for ${days} day(s).`, 'info');
}

/** Player action: collect payment when a service job is complete (status === 'ready'). */
function completeServiceJob(serviceCarId) {
  if (state.gameOver) return;
  const idx = (state.serviceGarage || []).findIndex(sc => sc.id === serviceCarId);
  if (idx === -1) { showToast('Service job not found.', 'error'); return; }
  const sc = state.serviceGarage[idx];
  const status = sc.status || 'ready'; // legacy entries without status treated as ready
  if (status !== 'ready') {
    showToast('Service is not finished yet — wait until the job completes.', 'error'); return;
  }
  const net = sc.revenueWhenDone - sc.laborCost;
  state.cash += net;
  const profit = net;
  state.totalServiceJobsCompleted = (state.totalServiceJobsCompleted || 0) + 1;
  state.serviceGarage.splice(idx, 1);
  addNote(`✅ Collected payment for ${sc.ownerName}'s ${sc.year} ${sc.make} ${sc.model}: charged ${formatCurrency(sc.revenueWhenDone)}, labor ${formatCurrency(sc.laborCost)}, profit ${formatCurrency(profit)}.`, 'success');
  showToast(`Service paid out! +${formatCurrency(profit)} profit.`, 'success');
  saveState();
  renderAll();
}

/** Player action: dismiss/reject a service job (car leaves without service). */
function dismissServiceJob(serviceCarId) {
  state.serviceGarage = (state.serviceGarage || []).filter(sc => sc.id !== serviceCarId);
  addNote('🚗 Service car dismissed — no job done.', 'info');
  saveState();
  renderAll();
}

function processForSale() {
  const soldIds = new Set();
  const impoundedIds = new Set();
  const remaining = [];
  for (const car of state.garage) {
    if (!car.isForSale || car.listPrice <= 0 || car.inServiceUntilDay || (car.leaseStatus === 'active' && car.activeLease)) {
      remaining.push(car); continue;
    }
    // Daily lot audit — only stolen cars risk this; no-title/scratched-VIN risk only at point of sale
    if ((car.legalStatus || 'clean') === 'stolen') {
      const auditChance = state.upgrades.complianceTraining ? 0.04 : 0.07;
      if (Math.random() < auditChance) {
        const wasCaught = checkPoliceEvent(car);
        if (wasCaught) {
          impoundedIds.add(car.id);
          continue;
        }
      }
    }
    const chance = computeSaleChance(car);
    // Tutorial forced-sale: when on the sell step, force an instant sale for the
    // tutorial car if the price is reasonable (≤ 110 % of market value).
    // If the price is too high, skip the normal random chance and prompt the player.
    const onTutorialSellStep = _tutorialStep >= 0
      && (_tutorialSteps[_tutorialStep] || {}).tutorialForceSale
      && _tutorialCarId === car.id;
    if (onTutorialSellStep) {
      const marketRef = car.marketValue > 0 ? car.marketValue : car.listPrice;
      const ratio = car.listPrice / marketRef;
      if (ratio > 1.10) {
        // Price too high — leave the car unsold this day and show guidance
        remaining.push(car);
        showToast("That\u2019s priced too high \u2014 set it closer to Market or +10% to sell.", 'warning');
        continue;
      }
      // Price is fair — fall through and force the sale (treat as if Math.random() succeeded)
    } else if (!(Math.random() < chance)) {
      remaining.push(car);
      continue;
    }
    soldIds.add(car.id);
    const fee    = Math.round(car.listPrice * TRANSACTION_FEE);
    const profit = car.listPrice - fee - car.purchasePrice;
    state.cash  += car.listPrice - fee;
    state.reputation = profit > 0
      ? Math.min(state.reputation + 0.02, 2.0)
      : Math.max(state.reputation - 0.01, 0.1);
    recordSaleStats(car, profit);
    // Police check at point of sale for any problematic car (no impound — car already sold to buyer)
    const legalRisk = (car.legalStatus || 'clean') !== 'clean' || (car.vinStatus || 'normal') === 'scratched';
    if (legalRisk) checkPoliceEvent(car, false);
    state.salesHistory.unshift({
      ...car, soldDay: state.day, salePrice: car.listPrice, fee, profit,
    });
    runAchievementChecks();
    addNote(
      `🎉 SOLD: ${car.year} ${car.make} ${car.model} for ${formatCurrency(car.listPrice)}! ` +
      `Profit: ${profit >= 0 ? '+' : ''}${formatCurrency(profit)}`,
      profit >= 0 ? 'success' : 'warning'
    );
  }
  state.garage = remaining.filter(c => !impoundedIds.has(c.id));
  // Remove customer offers / trade-in requests for sold or impounded cars
  const removedIds = new Set([...soldIds, ...impoundedIds]);
  state.customerOffers = state.customerOffers.filter(o => !removedIds.has(o.carId));
  state.tradeInRequests = state.tradeInRequests.filter(r => !removedIds.has(r.targetCarId));
}

/** Resolve pending counters on customer offers. */
function resolveCustomerOfferCounters() {
  const toRemove = new Set();
  for (const offer of state.customerOffers) {
    if (offer.state !== 'countered' || offer.playerCounter === null) continue;
    const car = state.garage.find(c => c.id === offer.carId);
    if (!car) { toRemove.add(offer.id); continue; }

    const counter  = offer.playerCounter;
    // buyerMax is set when the offer was generated and is anchored to marketValue
    // for overpriced cars. Fall back to 93% of list price only for fairly priced cars.
    const askRatio = car.listPrice / car.marketValue;
    const fallbackMax = askRatio > 1.2
      ? Math.round(car.marketValue * 0.95)
      : Math.round(car.listPrice * 0.93);
    const buyerMax = offer.buyerMax ?? fallbackMax;
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
  // Police check on sale (customer negotiations / accepted offers) — no impound, car already sold
  const legalRisk = (car.legalStatus || 'clean') !== 'clean' || (car.vinStatus || 'normal') === 'scratched';
  if (legalRisk) checkPoliceEvent(car, false);
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
    if (req.state !== 'countered' || req.counterCashDelta === null) continue;
    const targetCar = state.garage.find(c => c.id === req.targetCarId);
    if (!targetCar) { toRemove.add(req.id); continue; }
    if (targetCar.leaseStatus === 'active' && targetCar.activeLease) {
      addNote(`❌ Trade-in counter expired for ${targetCar.year} ${targetCar.make} ${targetCar.model} because the car is leased.`, 'warning');
      toRemove.add(req.id);
      continue;
    }
    const totalCustomerCost = req.customerCarValue + req.counterCashDelta;
    // Hard block: counter exceeding list price cannot be accepted (no exploit path).
    if (totalCustomerCost > targetCar.listPrice) {
      addNote(`❌ Trade-in counter for ${targetCar.year} ${targetCar.make} ${targetCar.model} exceeded asking price — rejected.`, 'warning');
      toRemove.add(req.id);
      continue;
    }
    // Acceptance probability based on market-value fairness (not list price).
    // customerFairness > 1 means they're paying below market (good for them → accept).
    // customerFairness < 1 means they're paying above market (bad for them → resist).
    const customerFairness = targetCar.marketValue / Math.max(totalCustomerCost, 1);
    const negBonus = state.upgrades.negotiationTraining ? 0.08 : 0;
    // Steep cubic curve so above-market counters are strongly resisted.
    const acceptProb = clamp(Math.pow(Math.min(customerFairness, TI_FAIRNESS_CAP), TI_FAIRNESS_EXPONENT) * TI_BASE_ACCEPT_RATE + negBonus, TI_MIN_ACCEPT_PROB, TI_BASE_ACCEPT_RATE);
    const label = `${targetCar.year} ${targetCar.make} ${targetCar.model}`;
    if (Math.random() < acceptProb) {
      // NPC accepts player's counter
      executeTradeIn(req, req.counterCashDelta);
      addNote(`🤝 Trade-in counter accepted! Got ${req.customerCar.year} ${req.customerCar.make} ${req.customerCar.model}.`, 'success');
      toRemove.add(req.id);
    } else if (customerFairness < 0.6 && Math.random() < 0.35) {
      // Customer walks away — counter is too far below market value for them
      addNote(`🚶 Customer walked away from trade-in for ${label} — your counter was too far from what they need.`, 'warning');
      toRemove.add(req.id);
    } else {
      // NPC counters back — moves partially toward player's offer (true back-and-forth)
      const moveBias = randomFloat(0.15, 0.30);
      const newNpcDelta = Math.round(req.cashDelta + (req.counterCashDelta - req.cashDelta) * moveBias);
      req.cashDelta = newNpcDelta;
      req.counterCashDelta = null;
      req.state = 'pending';
      req.round = (req.round || 0) + 1;
      const netFormatted = formatCurrency(req.customerCarValue + newNpcDelta);
      addNote(`🔄 Customer countered back on trade-in for ${label} — new net value to you: ${netFormatted}. Check For Sale tab.`, 'info');
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
  // Trade-in requests have no round limit — they persist until player or NPC accepts/rejects.
  // Only remove initial (round 0) offers that have been sitting idle past their expiry.
  state.tradeInRequests = state.tradeInRequests.filter(
    r => r.state === 'countered' || (r.round || 0) > 0 || r.expiresDay >= state.day
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
    showToast(`🏆 ${ach.name}`, 'success', 'achievement');
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
  processTheft();
  processServiceJobCompletion();
  processServiceGarageExpiry();
  processIncomingServiceCars();
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
  processStaffTradeInSuggestions();
  ensureStaffCandidates();
  runAchievementChecks();
  saveState();
  renderAll();
  const offerAlert = newOffers.length ? ` ${newOffers.length} offer(s) on your cars!` : '';
  const tradeAlert = newTIR.length   ? ` ${newTIR.length} trade-in request(s)!` : '';
  const leaseIncome = computeLeaseIncomePerDay();
  const leaseAlert = leaseIncome > 0 ? ` Active lease income/day: ${formatCurrency(leaseIncome)}.` : '';
  showToast(`Day ${state.day} — new used cars available!${offerAlert}${tradeAlert}${leaseAlert}`, 'info', 'day');
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
  if (entry.discontinued) { showToast('This model is discontinued — only available on the used market.', 'error'); return; }
  const factoryLock = getFactoryLock(entry);
  if (factoryLock) { showToast(`Ordering this car requires the ${factoryLock} upgrade.`, 'error'); return; }
  if (state.cash < entry.basePrice) { showToast('Not enough cash!', 'error'); return; }
  const occupied = state.garage.length + state.deliveries.length;
  if (occupied >= state.garageSlots) {
    showToast('No lot space (including pending deliveries)!', 'error'); return;
  }
  state.cash -= entry.basePrice;
  const condition  = pickCondition([0.55, 0.45, 0, 0]); // brand-new factory cars: always Excellent or Good
  const car        = buildCar(entry, condition, 'factory', true);
  car.purchasePrice = entry.basePrice;
  // During the tutorial, fast-deliver the first factory car in 1 day and track it
  const tutorialActive = _tutorialStep >= 0 && _tutorialSteps.length > 0;
  if (tutorialActive && !_tutorialCarId) _tutorialCarId = car.id;
  const days       = tutorialActive ? 1 : Math.max(1, entry.deliveryDays
    - (state.upgrades.expressDelivery ? 1 : 0)
    - (state.upgrades.factoryAllocation ? 1 : 0));
  const arrivalDay = state.day + days;
  state.deliveries.push({ car, arrivalDay });
  addNote(`🏭 Ordered ${car.year} ${car.make} ${car.model} — arrives Day ${arrivalDay}.`, 'info');
  saveState();
  renderAll();
  showToast(`Ordered! Arrives on Day ${arrivalDay}.`, 'info', 'purchase');
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
  let noteExtra = '';
  if ((car.legalStatus || 'clean') !== 'clean' && !car.legalDiscovered) {
    noteExtra = ' ⚠️ Legal status unknown — inspect before selling!';
  }
  addNote(`🚗 Bought (Used Market): ${car.year} ${car.make} ${car.model} for ${formatCurrency(price)}.${noteExtra}`, 'info');
  saveState();
  renderAll();
}

function declineUsedOffer(offerId) {
  const offer = state.usedMarketOffers.find(o => o.id === offerId);
  // Only count as "avoided" if player discovered the stolen status before declining
  if (offer && offer.legalDiscovered && (offer.legalStatus || 'clean') === 'stolen') {
    state.stolenCarsAvoided = (state.stolenCarsAvoided || 0) + 1;
    runAchievementChecks();
  }
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

  // Reveal legal status via DMV access
  if (state.upgrades.dmvDatabaseAccess && !offer.legalDiscovered) {
    offer.legalDiscovered = true;
  }
  // Reveal VIN status via VIN scanner
  if (state.upgrades.vinScanner && !offer.vinDiscovered) {
    offer.vinDiscovered = true;
  }
  // Reveal crash damage severity via frame damage tools
  if (state.upgrades.frameDamageTools && !offer.crashDamageDiscovered) {
    offer.crashDamageDiscovered = true;
    if ((offer.crashDamageSeverity || 'none') === 'severe') {
      state.severeDamageFoundBeforeBuy = (state.severeDamageFoundBeforeBuy || 0) + 1;
      runAchievementChecks();
    }
  } else if (!offer.crashDamageDiscovered) {
    // Basic inspection reveals crash damage exists but not severity
    const hasCrash = offer.hiddenIssues.some(i => i.isCrashDamage);
    if (hasCrash) offer.crashDamageDiscovered = true;
  }

  // Title recovery: offer to convert no-title to clean
  if (state.upgrades.titleRecovery && (offer.legalDiscovered || state.upgrades.dmvDatabaseAccess)) {
    if ((offer.legalStatus || 'clean') === 'noTitle' && state.cash >= 800) {
      // Auto-offer title recovery during inspection
      offer.titleRecoveryAvailable = true;
    }
  }

  const issueCount  = offer.hiddenIssues.filter(i => !i.isCrashDamage).length;
  const crashSev    = offer.crashDamageSeverity || 'none';
  const crashNote   = crashSev !== 'none' ? `, hidden crash damage (${crashSev})` : '';
  const legalNote   = offer.legalDiscovered && (offer.legalStatus !== 'clean')
    ? `, ⚠️ ${offer.legalStatus === 'stolen' ? 'STOLEN car!' : 'No title!'}`
    : '';
  const vinNote     = offer.vinDiscovered && offer.vinStatus === 'scratched' ? ', scratched VIN!' : '';

  addNote(
    `🔍 Inspected ${offer.year} ${offer.make} ${offer.model}: ` +
    `${issueCount} mechanical issue(s)${crashNote}${legalNote}${vinNote}. Repair cost: ${formatCurrency(offer.repairCost)}.`,
    legalNote ? 'error' : 'info'
  );
  saveState();
  renderAll();
}

/** Player applies Title Recovery to a no-title used market offer during inspection ($800). */
function applyTitleRecovery(offerId) {
  const offer = state.usedMarketOffers.find(o => o.id === offerId);
  if (!offer || !state.upgrades.titleRecovery) return;
  if ((offer.legalStatus || 'clean') !== 'noTitle') return;
  if (state.cash < 800) { showToast('Not enough cash for title recovery ($800).', 'error'); return; }
  state.cash -= 800;
  offer.legalStatus = 'clean';
  offer.legalDiscovered = true;
  offer.titleRecoveryAvailable = false;
  addNote(`📋 Title recovered for ${offer.year} ${offer.make} ${offer.model} — now has clean title.`, 'success');
  showToast('Title recovered! Car now has clean title.', 'success');
  saveState();
  renderUsedMarket();
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

/** Player inspects a trade-in customer's car — same cost/upgrades as inspecting a used-market car. */
function inspectTradeIn(requestId) {
  const req = state.tradeInRequests.find(r => r.id === requestId);
  if (!req) return;
  const car = req.customerCar;
  if (car.inspected) return;
  const cost = state.upgrades.inspectionTool ? 150 : 300;
  if (state.cash < cost) { showToast(`Inspection costs ${formatCurrency(cost)} — not enough cash!`, 'error'); return; }
  state.cash   -= cost;
  car.inspected = true;
  car.repairCost = car.hiddenIssues.reduce((s, i) => s + i.cost, 0);

  // Reveal legal status via DMV access
  if (state.upgrades.dmvDatabaseAccess && !car.legalDiscovered) {
    car.legalDiscovered = true;
  }
  // Reveal VIN status via VIN scanner
  if (state.upgrades.vinScanner && !car.vinDiscovered) {
    car.vinDiscovered = true;
  }
  // Reveal crash damage severity via frame damage tools
  if (state.upgrades.frameDamageTools && !car.crashDamageDiscovered) {
    car.crashDamageDiscovered = true;
    if ((car.crashDamageSeverity || 'none') === 'severe') {
      state.severeDamageFoundBeforeBuy = (state.severeDamageFoundBeforeBuy || 0) + 1;
      runAchievementChecks();
    }
  } else if (!car.crashDamageDiscovered) {
    // Basic inspection reveals crash damage exists but not severity
    const hasCrash = car.hiddenIssues.some(i => i.isCrashDamage);
    if (hasCrash) car.crashDamageDiscovered = true;
  }

  // Title recovery: offer to convert no-title to clean before you accept the trade
  if (state.upgrades.titleRecovery && (car.legalDiscovered || state.upgrades.dmvDatabaseAccess)) {
    if ((car.legalStatus || 'clean') === 'noTitle' && state.cash >= 800) {
      car.titleRecoveryAvailable = true;
    }
  }

  const issueCount  = car.hiddenIssues.filter(i => !i.isCrashDamage).length;
  const crashSev    = car.crashDamageSeverity || 'none';
  const crashNote   = crashSev !== 'none' ? `, hidden crash damage (${crashSev})` : '';
  const legalNote   = car.legalDiscovered && (car.legalStatus !== 'clean')
    ? `, ⚠️ ${car.legalStatus === 'stolen' ? 'STOLEN car!' : 'No title!'}`
    : '';
  const vinNote     = car.vinDiscovered && car.vinStatus === 'scratched' ? ', scratched VIN!' : '';

  addNote(
    `🔍 Inspected trade-in ${car.year} ${car.make} ${car.model}: ` +
    `${issueCount} mechanical issue(s)${crashNote}${legalNote}${vinNote}. Repair cost: ${formatCurrency(car.repairCost)}.`,
    legalNote ? 'error' : 'info'
  );
  saveState();
  renderForSale();
}

/** Player applies Title Recovery to a no-title trade-in customer car before accepting ($800). */
function applyTitleRecoveryTradeIn(requestId) {
  const req = state.tradeInRequests.find(r => r.id === requestId);
  if (!req || !state.upgrades.titleRecovery) return;
  const car = req.customerCar;
  if ((car.legalStatus || 'clean') !== 'noTitle') return;
  if (state.cash < 800) { showToast('Not enough cash for title recovery ($800).', 'error'); return; }
  state.cash -= 800;
  car.legalStatus = 'clean';
  car.legalDiscovered = true;
  car.titleRecoveryAvailable = false;
  addNote(`📋 Title recovered for trade-in ${car.year} ${car.make} ${car.model} — now has clean title.`, 'success');
  showToast('Title recovered! Car now has clean title.', 'success');
  saveState();
  renderForSale();
}

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
  showToast(`Trade-in complete — got the ${req.customerCar.year} ${req.customerCar.make} ${req.customerCar.model}!`, 'success', 'cash');
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
  // Prevent countering such that the customer's total payment exceeds the car's asking price.
  const targetCar = state.garage.find(c => c.id === req.targetCarId);
  if (targetCar) {
    const totalCustomerCost = req.customerCarValue + delta;
    if (totalCustomerCost > targetCar.listPrice) {
      showToast(`Counter would require the customer to pay more than your asking price (${formatCurrency(targetCar.listPrice)}). Reduce the cash amount.`, 'error');
      return;
    }
  }
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
  showToast(`Sold for ${formatCurrency(salePrice)}!`, 'success', 'cash');
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
  showToast(`${candidate.name} hired!`, 'success', 'hire');
}

function dismissCandidate(candidateId) {
  state.staffCandidates = state.staffCandidates.filter(c => c.id !== candidateId);
  ensureStaffCandidates();
  saveState();
  renderStaff();
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
  renderCarLot();
  renderForSale();
  // Refresh tutorial after partial renders: re-check completion and resize spotlight
  _tutorialUpdateNextButton();
  _tutorialReposition();
}

function updateListPrice(carId, rawValue) {
  const car = state.garage.find(c => c.id === carId);
  if (!car) return;
  const p = parseFloat(rawValue);
  if (!isNaN(p) && p > 0) { car.listPrice = Math.round(p); saveState(); }
  // Refresh tutorial Next button in case price change completes the step
  _tutorialUpdateNextButton();
}

function setListPriceMultiplier(carId, mult) {
  const car = state.garage.find(c => c.id === carId);
  if (!car) return;
  car.listPrice = Math.round(car.marketValue * mult);
  saveState();
  renderForSale();
  // Refresh tutorial Next button in case price change completes the step
  _tutorialUpdateNextButton();
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
  const st = getUpgradeStatus(upg);
  if (st.owned) { showToast('Already purchased!', 'error'); return; }
  if (st.lock)  { showToast(`${st.lock} first.`, 'error'); return; }
  if (state.cash < st.cost) { showToast('Not enough cash!', 'error'); return; }
  state.cash -= st.cost;
  applyUpgrade(upg);
  syncLoanTermsToDifficulty();   // recompute loan limit/APR after any upgrade
  if (upgradeId === 'staffOffice') ensureStaffCandidates();
  addNote(`⬆️ Purchased: ${st.name} (${formatCurrency(st.cost)})`, 'success');
  saveState();
  renderAll();
  showToast(`${st.name} purchased!`, 'success', 'purchase');
}

// ============================================================
// PLAYER ACTIONS — Reconditioning
// ============================================================
function carWash(carId) {
  if (!state.upgrades.washStation) { showToast('You need the Wash Station upgrade first!', 'error'); return; }
  const car = state.garage.find(c => c.id === carId);
  if (!car) return;
  if (car.leaseStatus === 'active' && car.activeLease) { showToast('No recon actions allowed while lease is active.', 'error'); return; }
  const cost = WASH_COST;
  if (state.cash < cost) { showToast(`Car wash costs ${formatCurrency(cost)} — not enough cash!`, 'error'); return; }
  if (car.washBoostDays > 0) { showToast('Car was recently washed — wait for the boost to fade.', 'error'); return; }
  state.cash     -= cost;
  car.marketValue = Math.round(car.marketValue * (1 + WASH_VALUE_BOOST));
  car.washBoostDays = WASH_BOOST_DAYS;
  car.reconditionLog.push({ type: 'Car Wash', day: state.day });
  addNote(`🚿 Washed ${car.year} ${car.make} ${car.model} — looks great! +${Math.round(WASH_VALUE_BOOST * 100)}% value, boosted sale chance for ${WASH_BOOST_DAYS} days.`, 'success');
  saveState();
  renderAll();
  showToast(`Washed — looking sharp!`, 'success');
}

function basicRepair(carId) {
  if (!state.upgrades.serviceBay) { showToast('You need the Service Bay upgrade first!', 'error'); return; }
  const car = state.garage.find(c => c.id === carId);
  if (!car) return;
  if (car.leaseStatus === 'active' && car.activeLease) { showToast('No recon actions allowed while lease is active.', 'error'); return; }
  // Block repair only when condition is A or B AND there are no hidden issues to fix
  if (car.hiddenIssues.length === 0 && (car.condition === 'A' || car.condition === 'B')) {
    showToast('Car is in good condition with no known issues — no repairs needed!', 'error'); return;
  }
  if (car.inServiceUntilDay) { showToast('Car is already in service.', 'error'); return; }
  const capacity = state.serviceGarageCapacity || 3;
  const occupiedBays = getTotalServiceBayUsage();
  if (occupiedBays >= capacity) {
    showToast(`All ${capacity} bay slot(s) are busy — complete a current job first.`, 'error'); return;
  }
  const cost = computeRepairCost(car);
  const costRatio = cost / Math.max(1, car.marketValue);
  if (costRatio >= REPAIR_JUNK_COST_RATIO) {
    showToast(`⚠️ Repair estimate (${formatCurrency(cost)}) exceeds car value — this vehicle may not be worth fixing!`, 'warning');
  }
  if (state.cash < cost) { showToast(`Repair estimate is ${formatCurrency(cost)} — not enough cash!`, 'error'); return; }
  state.cash -= cost;
  // Reconditioning Workshop: the job is done on the spot and never occupies a bay.
  const instant = !!state.upgrades.reconditioningWorkshop;
  car.inServiceUntilDay = instant ? state.day : state.day + 1;
  car.pendingService    = { type: 'repair' };
  car.isForSale         = false;
  if (instant) {
    finishCarService(car);
  } else {
    addNote(`🔩 ${car.year} ${car.make} ${car.model} is in the service bay (${formatCurrency(cost)}). Ready next day.`, 'info');
  }
  saveState();
  renderAll();
  showToast(instant ? 'Repair finished instantly at your workshop.' : 'Car is being repaired — ready next day.', instant ? 'success' : 'info');
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
  const capacity = state.serviceGarageCapacity || 3;
  const occupiedBays = getTotalServiceBayUsage();
  if (occupiedBays >= capacity) {
    showToast(`All ${capacity} bay slot(s) are busy — complete a current job first.`, 'error'); return;
  }
  const perfAlreadyDone = car.reconditionLog.some(r => r.type === 'Parts Upgrade');
  if (perfAlreadyDone) { showToast('Parts upgrade already applied to this car!', 'error'); return; }
  const cost = getPartsCost(car); // scales with the car's value (min $1,500)
  if (state.cash < cost) { showToast(`Parts Upgrade costs ${formatCurrency(cost)} — not enough cash!`, 'error'); return; }
  state.cash -= cost;
  const instant = !!state.upgrades.reconditioningWorkshop;
  car.inServiceUntilDay = instant ? state.day : state.day + 1;
  car.pendingService    = { type: 'parts' };
  car.isForSale         = false;
  if (instant) {
    finishCarService(car);
  } else {
    addNote(`🏎️ ${car.year} ${car.make} ${car.model} is getting a performance upgrade (${formatCurrency(cost)}). Ready next day.`, 'info');
  }
  saveState();
  renderAll();
  showToast(instant ? 'Parts upgrade installed instantly at your workshop.' : 'Parts upgrade in progress — ready next day.', instant ? 'success' : 'info');
}

function detailCar(carId) {
  if (!state.upgrades.detailing) { showToast('You need the Detailing Bay upgrade first!', 'error'); return; }
  const car = state.garage.find(c => c.id === carId);
  if (!car) return;
  if (car.leaseStatus === 'active' && car.activeLease) { showToast('No recon actions allowed while lease is active.', 'error'); return; }
  if (car.hasBeenDetailed) { showToast('This car has already been detailed — detailing can only be done once per ownership.', 'error'); return; }
  if (car.condition === 'A') { showToast('Car is already in excellent condition!', 'error'); return; }
  if (car.inServiceUntilDay) { showToast('Car is currently in service — wait until complete.', 'error'); return; }
  const detailCost = getDetailCost(car); // scales with the car's value (min $500)
  if (state.cash < detailCost) { showToast(`Not enough cash for detailing (${formatCurrency(detailCost)})!`, 'error'); return; }
  state.cash -= detailCost;
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
  renderCarLot();
  renderLeasing();
}

function stopOfferingLease(carId) {
  const car = state.garage.find(c => c.id === carId);
  if (!car) return;
  if (car.leaseStatus !== 'available') return;
  car.leaseStatus = 'none';
  saveState();
  renderCarLot();
  renderLeasing();
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
  renderCarLot();
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
      // Run migration on import too — write to the active slot key
      localStorage.setItem(slotKey(currentSlot), JSON.stringify(loaded));
      loadState(currentSlot); // re-runs migration logic via the same code path
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
  const overhead      = getLotOverhead();
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
    ? state.notifications.slice(0, 8).map(n => `
        <div class="notif-item notif-${n.type}">
          <span class="notif-day">Day ${n.day}</span>
          <span>${n.message}</span>
        </div>`).join('')
    : '<p class="empty-msg">No events yet — press Next Day to begin!</p>';
  const staffLogs = (state.staffActivity || []).length
    ? state.staffActivity.slice(0, 6).map(n => `
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
    <div class="kpi-row">
      <div class="kpi-tile kpi-cash">
        <div class="kpi-icon-wrap">${uiIconLg('cash')}</div>
        <div><div class="kpi-value">${formatCurrency(state.cash)}</div><div class="kpi-label">Cash</div></div>
      </div>
      <div class="kpi-tile kpi-day">
        <div class="kpi-icon-wrap">${uiIconLg('calendar')}</div>
        <div><div class="kpi-value">Day ${state.day}</div><div class="kpi-label">Time</div></div>
      </div>
      <div class="kpi-tile kpi-rep">
        <div class="kpi-icon-wrap">${uiIconLg('star')}</div>
        <div><div class="kpi-value">${state.reputation.toFixed(2)}</div><div class="kpi-label">Reputation</div></div>
      </div>
      <div class="kpi-tile kpi-profit">
        <div class="kpi-icon-wrap">${uiIconLg('trendingUp')}</div>
        <div><div class="kpi-value ${totalProfit >= 0 ? 'text-green' : 'text-red'}">${formatCurrency(totalProfit)}</div><div class="kpi-label">Lifetime Profit</div></div>
      </div>
    </div>

    <div class="dashboard-grid">

      <div class="dash-card">
        <h3>${uiIcon('cash')} Finances</h3>
        <div class="stat-row"><span>Daily Overhead</span>
          <strong class="text-red">−${formatCurrency(overhead)}/day</strong></div>
        <div class="stat-row"><span>Daily Wages</span><strong class="text-red">−${formatCurrency(wageTotal)}/day</strong></div>
        <div class="stat-row"><span>Credit Line Balance</span><strong class="${state.loanBalance > 0 ? 'text-red' : 'text-green'}">${formatCurrency(state.loanBalance)}</strong></div>
        <div class="stat-row"><span>Loan APR</span><strong>${(state.loanApr * 100).toFixed(1)}%</strong></div>
        <div class="stat-row"><span>Late Payments</span><strong class="${state.delinquencyLevel > 0 ? 'text-red' : 'text-green'}">Level ${state.delinquencyLevel || 0}</strong></div>
        <div class="stat-row"><span>Total Cars Sold</span><strong>${state.salesHistory.length}</strong></div>
      </div>

      <div class="dash-card">
        <h3>${uiIcon('key')} Operations</h3>
        <div class="stat-row"><span>Car Lot</span><strong>${state.garage.length} / ${state.garageSlots} slots</strong></div>
        <div class="stat-row"><span>Listed for Sale</span><strong>${forSaleCount}</strong></div>
        <div class="stat-row"><span>In Service</span><strong>${inService}</strong></div>
        <div class="stat-row"><span>Active Leases</span><strong>${activeLeases}</strong></div>
        <div class="stat-row"><span>Lease Income / Day</span><strong class="text-green">+${formatCurrency(leaseIncome)}</strong></div>
        <div class="stat-row"><span>Hired Staff</span><strong>${state.staff?.length || 0}</strong></div>
        <div class="stat-row"><span>Pending Deliveries</span><strong>${state.deliveries.length}</strong></div>
        <div class="stat-row"><span>Customer Offers</span>
          <strong ${pendingOffers > 0 ? 'class="text-green"' : ''}>${pendingOffers}</strong></div>
        <div class="stat-row"><span>Trade-In Requests</span>
          <strong ${pendingTIR > 0 ? 'class="text-green"' : ''}>${pendingTIR}</strong></div>
      </div>

      <div class="dash-card">
        <h3>${uiIcon('trendingUp')} Market Conditions</h3>
        ${marketRows}
        ${state.lastMarketEvent ? `<div class="tab-info" style="margin-top:10px;font-size:.8rem">${state.lastMarketEvent}</div>` : ''}
        ${state.delinquencyLevel > 0 ? `<div class="tab-info" style="margin-top:10px;font-size:.8rem;border-color:rgba(255,122,133,.5);border-left-color:var(--danger);background:rgba(255,122,133,.12)">${uiIcon('warning')} Late payments level ${state.delinquencyLevel}: ${state.loanFrozen ? 'credit line is frozen.' : 'stay solvent to avoid default.'}</div>` : ''}
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

    </div>`;
}

// ============================================================
// RENDER — Factory
// ============================================================
function renderFactory() {
  const groupedByMake = {};
  CAR_CATALOG.forEach((entry, idx) => {
    if (entry.discontinued) return; // out-of-production models can't be special-ordered new
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
      ${make}
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
    const factoryLock = getFactoryLock(car);
    const canBuy     = !factoryLock && !garageFull && state.cash >= car.basePrice;
    html += `
      <div class="car-card factory-card ${factoryLock ? 'disabled-card' : ''}" data-car-idx="${car.idx}">
        <div class="car-card-header">
          <div>
            <span class="car-name">2026 ${car.make} ${car.model}</span>
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
          ${factoryLock ? `${uiIcon('lock')} Requires ${factoryLock}` : garageFull ? `${uiIcon('ban')} Lot Full` : state.cash < car.basePrice ? `${uiIcon('warning')} Need ${formatCurrency(car.basePrice - state.cash)} more` : `Order — ${formatCurrency(car.basePrice)}`}
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
          : offer.hiddenIssues.map(i => {
              const crashClass = i.isCrashDamage
                ? (i.severity === 'severe' ? 'crash-severe' : i.severity === 'moderate' ? 'crash-moderate' : 'crash-minor')
                : '';
              return `<span class="issue-tag ${crashClass}">${uiIcon('warning')} ${i.name} (${formatCurrency(i.cost)})</span>`;
            }).join(''))
      : `<p class="text-muted" style="font-size:.82rem">${uiIcon('search')} Unknown — inspect to reveal issues</p>`;

    // Legal / VIN / crash damage warnings
    const legalStatus   = offer.legalStatus || 'clean';
    const vinStatus     = offer.vinStatus   || 'normal';
    const crashSev      = offer.crashDamageSeverity || 'none';
    let legalWarningHtml = '';
    if (offer.legalDiscovered && legalStatus !== 'clean') {
      const msg = legalStatus === 'stolen'
        ? '🚨 <strong>STOLEN CAR</strong> — selling this vehicle is illegal. Risk of police fine & impound.'
        : '⚠️ <strong>No Valid Title</strong> — selling without title risks police fine.';
      legalWarningHtml += `<div class="legal-warning">${msg}</div>`;
    }
    if (offer.vinDiscovered && vinStatus === 'scratched') {
      legalWarningHtml += `<div class="legal-warning">🔦 <strong>Scratched/Altered VIN</strong> — increases risk of police detection when selling.</div>`;
    }
    if (offer.titleRecoveryAvailable) {
      legalWarningHtml += `<div class="car-actions" style="margin-top:4px">
        <button class="btn btn-sm btn-secondary" onclick="applyTitleRecovery('${offer.id}')">📋 Recover Title ($800)</button>
      </div>`;
    }
    // Show crash damage severity badge when discovered
    let crashBadgeHtml = '';
    if (offer.crashDamageDiscovered && crashSev !== 'none') {
      const cls = crashSev === 'severe' ? 'crash-severe' : crashSev === 'moderate' ? 'crash-moderate' : 'crash-minor';
      crashBadgeHtml = `<span class="badge ${cls}" style="border-radius:4px;font-size:.72rem">
        🔨 ${crashSev.charAt(0).toUpperCase() + crashSev.slice(1)} Crash Damage
      </span>`;
    }
    // Unknown crash damage notice
    let crashUnknownHtml = '';
    if (!offer.crashDamageDiscovered && !offer.inspected) {
      crashUnknownHtml = `<p class="text-muted" style="font-size:.76rem;margin-top:2px">${uiIcon('search')} Crash history unknown — inspect for details${state.upgrades.frameDamageTools ? '' : ' (Frame Damage Tools reveals severity)'}.</p>`;
    } else if (!offer.crashDamageDiscovered && offer.inspected && !state.upgrades.frameDamageTools) {
      crashUnknownHtml = `<p class="text-muted" style="font-size:.76rem;margin-top:2px">${uiIcon('search')} Crash severity unclear — upgrade to Frame Damage Inspection Tools for full detail.</p>`;
    }

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

    // Legal badge for header
    const legalBadge = offer.legalDiscovered && legalStatus !== 'clean'
      ? `<span class="badge ${legalStatus === 'stolen' ? 'badge-red' : 'badge-orange'}">${legalStatus === 'stolen' ? '🚨 STOLEN' : '⚠️ NO TITLE'}</span>`
      : (offer.vinDiscovered && vinStatus === 'scratched' ? `<span class="badge badge-yellow">🔦 SCRATCHED VIN</span>` : '');
    const discontinuedBadge = offer.discontinued
      ? `<span class="badge badge-purple" title="No longer made — was only produced ${offer.productionStart}–${offer.productionEnd}. You'll never see this as a new factory order.">🏛️ Discontinued</span>`
      : '';

    return `
        <div class="car-card tradein-card" data-offer-id="${offer.id}">
          <div class="car-card-header">
            <div>
                <span class="car-name">${formatCarDisplayName(offer)}</span>
            </div>
            <div class="badge-stack">
              ${condBadge(offer.condition)}
              ${titleBadge(offer.titleStatus)}
              ${legalBadge}
              ${discontinuedBadge}
            </div>
          </div>
        <div class="car-details">
          <div class="detail-row"><span>Category</span><span>${offer.category}</span></div>
          <div class="detail-row"><span>Mileage</span><span>${offer.mileage.toLocaleString()} mi</span></div>
          <div class="detail-row"><span>Asking Price</span><span class="text-blue">${formatCurrency(asking)}</span></div>
          <div class="detail-row"><span>Est. Value</span>
            <span class="text-green">${formatCurrency(offer.marketValue)}</span></div>
          <div class="detail-row"><span>Segment</span>
            <span class="${marketIdx >= 1.02 ? 'text-green' : marketIdx <= 0.98 ? 'text-red' : 'text-muted'}">
              ${(marketIdx * 100).toFixed(1)}%
            </span></div>
          ${offer.inspected ? `<div class="detail-row"><span>Repair Cost</span><span class="text-red">${formatCurrency(offer.repairCost)}</span></div>` : ''}
          ${offer.inspected ? `<div class="detail-row"><span>Net Margin</span>
            <span class="${offer.marketValue - offer.repairCost - displayPrice >= 0 ? 'text-green' : 'text-red'}">
              ${formatCurrency(offer.marketValue - offer.repairCost - displayPrice)}
            </span></div>` : ''}
        </div>
        ${crashBadgeHtml ? `<div>${crashBadgeHtml}</div>` : ''}
        <div class="issues-section">${issuesHtml}</div>
        ${crashUnknownHtml}
        ${legalWarningHtml}
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
      Car Lot: ${state.garage.length}/${state.garageSlots} slots.
      ${state.upgrades.negotiationTraining ? `${uiIcon('handshake')} Negotiation Training active — better deal outcomes.` : ''}
      ${state.upgrades.dmvDatabaseAccess ? `🗂️ DMV Database Access active — inspection reveals legal status.` : ''}
      ${state.upgrades.vinScanner ? `🔦 VIN Scanner active — inspection reveals VIN condition.` : ''}
      ${state.upgrades.frameDamageTools ? `🔭 Frame Damage Tools active — inspection reveals crash damage severity.` : ''}
    </div>
    <div class="card-grid">${cards}</div>`;
}

// ============================================================
// RENDER — Car Lot (formerly Garage)
// ============================================================
function renderCarLot() {
  const el = document.getElementById('tab-carlot');
  const showLeased = settings.showLeasedCars !== false;

  if (!state.garage.length) {
    el.innerHTML = `<div class="empty-state">
      <p>Your lot is empty. Order from the <strong>Factory</strong> tab or buy from <strong>Used Market</strong>.</p></div>`;
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
      const canWash = Number(state.cash) >= WASH_COST;
      if (state.upgrades.washStation) {
        if (car.washBoostDays <= 0) {
          reconHtml += `<button class="btn btn-sm btn-secondary recon-btn" onclick="carWash('${car.id}')"
            ${canWash ? '' : 'disabled'} title="Instant: +${Math.round(WASH_VALUE_BOOST * 100)}% value, boosted sale chance ${WASH_BOOST_DAYS} days">${uiIcon('droplet')} Wash (${formatCurrency(WASH_COST)})</button>`;
        } else {
          reconHtml += `<button class="btn btn-sm btn-secondary recon-btn" disabled title="Wash boost active for ${car.washBoostDays} more day(s)">${uiIcon('droplet')} Washed (${car.washBoostDays}d)</button>`;
        }
      } else {
        reconHtml += `<button class="btn btn-sm btn-secondary recon-btn" disabled title="Requires the Wash Station upgrade">${uiIcon('droplet')} Wash (Locked)</button>`;
      }
      // Detailing
      const detailCost = getDetailCost(car);
      const canDetail = Number(state.cash) >= detailCost;
      if (state.upgrades.detailing) {
        if (car.hasBeenDetailed) {
          reconHtml += `<button class="btn btn-sm btn-secondary recon-btn" disabled title="Already detailed once this ownership">${uiIcon('sparkles')} Detailed</button>`;
        } else if (car.condition !== 'A') {
          reconHtml += `<button class="btn btn-sm btn-secondary recon-btn" onclick="detailCar('${car.id}')"
            ${canDetail ? '' : 'disabled'} title="Instant: +1 condition tier, +7% value">${uiIcon('sparkles')} Detail (${formatCurrency(detailCost)})</button>`;
        }
      }
      // Basic Repair — show button whenever the function would allow repair
      const repairNeeded = car.hiddenIssues.length > 0 || (car.condition !== 'A' && car.condition !== 'B');
      if (state.upgrades.serviceBay && repairNeeded) {
        const repairEst  = computeRepairCost(car);
        const canRepair  = Number(state.cash) >= repairEst;
        const costRatio  = repairEst / Math.max(1, car.marketValue);
        const junkWarn   = costRatio >= REPAIR_JUNK_COST_RATIO  ? '⚠️ Beyond economical repair! ' :
                           costRatio >= REPAIR_WARN_COST_RATIO  ? '⚠️ Expensive repair — ' : '';
        const repairBtnClass = costRatio >= REPAIR_WARN_COST_RATIO ? 'btn-danger' : 'btn-secondary';
        reconHtml += `<button class="btn btn-sm ${repairBtnClass} recon-btn" onclick="basicRepair('${car.id}')"
          ${canRepair ? '' : 'disabled'} title="${junkWarn}${state.upgrades.reconditioningWorkshop ? 'Instant' : '1 day'}: fixes all issues, restores to Excellent condition">${uiIcon('wrench')} Repair (${formatCurrency(repairEst)})</button>`;
      }
      // Parts Upgrade
      const partsCost = getPartsCost(car);
      const canPartsUpgrade = Number(state.cash) >= partsCost;
      if (state.upgrades.performanceShop && perfEligible && !perfDone) {
        reconHtml += `<button class="btn btn-sm btn-secondary recon-btn" onclick="partsUpgrade('${car.id}')"
          ${canPartsUpgrade ? '' : 'disabled'} title="${state.upgrades.reconditioningWorkshop ? 'Instant' : '1 day'}: +15% market value">${uiIcon('gauge')} Parts (${formatCurrency(partsCost)})</button>`;
      }
      reconHtml += `</div>`;
    }
    const leaseActionButtons = [];
    if (car.leaseStatus !== 'none' || (!car.isForSale && !inService)) {
      leaseActionButtons.push(
        `<button class="btn btn-secondary" onclick="switchTab('leasing')">${uiIcon('document')} Manage Leasing</button>`
      );
    }

    return `
        <div class="car-card garage-card ${car.isForSale ? 'for-sale' : ''} ${inService ? 'in-service' : ''}" data-car-id="${car.id}">
          <div class="car-card-header">
            <div>
              <span class="car-name">${formatCarDisplayName(car)}</span>
            </div>
            <div class="badge-stack">
              ${condBadge(car.condition)}
              ${titleBadge(car.titleStatus)}
              ${isCertifiedCar(car) ? '<span class="badge badge-green" title="Certified Pre-Owned: +18% sale chance">✔ CERTIFIED</span>' : ''}
              ${(car.legalDiscovered && (car.legalStatus || 'clean') !== 'clean') ? `<span class="badge ${car.legalStatus === 'stolen' ? 'badge-red' : 'badge-orange'}">${car.legalStatus === 'stolen' ? '🚨 STOLEN' : '⚠️ NO TITLE'}</span>` : ''}
              ${(car.vinDiscovered && (car.vinStatus || 'normal') === 'scratched') ? `<span class="badge badge-yellow">🔦 SCRATCHED VIN</span>` : ''}
              ${(car.crashDamageDiscovered && (car.crashDamageSeverity || 'none') !== 'none') ? `<span class="badge ${car.crashDamageSeverity === 'severe' ? 'badge-red' : car.crashDamageSeverity === 'moderate' ? 'badge-orange' : 'badge-yellow'}">🔨 ${car.crashDamageSeverity.charAt(0).toUpperCase() + car.crashDamageSeverity.slice(1)} Crash</span>` : ''}
              ${car.leaseStatus === 'available' ? '<span class="badge badge-blue">LEASE AVAILABLE</span>' : ''}
              ${isLeased ? `<span class="badge badge-blue">LEASED (${leaseDaysLeft}d left)</span>` : ''}
            </div>
          </div>
        ${inService ? `<div class="service-banner">${uiIcon('wrench')} IN SERVICE — Ready Day ${car.inServiceUntilDay} (${car.pendingService?.type === 'repair' ? 'Basic Repair' : 'Parts Upgrade'})</div>` : ''}
        ${car.isForSale ? `<div class="for-sale-banner">${uiIcon('tag')} LISTED FOR SALE</div>` : ''}
        ${isLeased ? `<div class="service-banner">${uiIcon('document')} LEASE ACTIVE — ${leaseDaysLeft} day(s) remaining</div>` : ''}
        ${car.washBoostDays > 0 ? `<div class="wash-banner">${uiIcon('droplet')} Wash boost active (${car.washBoostDays} days left)</div>` : ''}
        ${(car.legalDiscovered && (car.legalStatus || 'clean') === 'stolen') ? `<div class="police-alert">🚨 <strong>STOLEN VEHICLE</strong> — Do NOT list for sale. Police may impound and fine you.</div>` : ''}
        ${(car.legalDiscovered && (car.legalStatus || 'clean') === 'noTitle') ? `<div class="legal-warning">⚠️ <strong>No Valid Title</strong> — Selling without title risks a police fine.</div>` : ''}
        ${(car.vinDiscovered && (car.vinStatus || 'normal') === 'scratched') ? `<div class="legal-warning">🔦 <strong>Scratched/Altered VIN</strong> — Increases police detection risk when selling.</div>` : ''}
        <div class="car-details">
          <div class="detail-row"><span>Category</span><span>${car.category}</span></div>
          <div class="detail-row"><span>Title Status</span><span>${TITLE_LABELS[car.titleStatus] || 'Clean'}</span></div>
          ${car.legalDiscovered ? `<div class="detail-row"><span>Legal Status</span><span class="${(car.legalStatus||'clean') === 'clean' ? 'text-green' : 'text-red'}">${(car.legalStatus||'clean') === 'clean' ? 'Clean' : (car.legalStatus === 'stolen' ? 'STOLEN' : 'No Title')}</span></div>` : ''}
          ${car.vinDiscovered ? `<div class="detail-row"><span>VIN Condition</span><span class="${(car.vinStatus||'normal') === 'normal' ? 'text-green' : 'text-yellow'}">${(car.vinStatus||'normal') === 'normal' ? 'Intact' : 'Scratched/Altered'}</span></div>` : ''}
          ${car.crashDamageDiscovered && (car.crashDamageSeverity||'none') !== 'none' ? `<div class="detail-row"><span>Crash Damage</span><span class="text-red">${car.crashDamageSeverity.charAt(0).toUpperCase() + car.crashDamageSeverity.slice(1)}</span></div>` : ''}
          <div class="detail-row"><span>Mileage</span><span>${car.mileage.toLocaleString()} mi</span></div>
          <div class="detail-row"><span>Purchased For</span><span>${formatCurrency(car.purchasePrice)}</span></div>
          <div class="detail-row"><span>Market Value</span><span class="text-green">${formatCurrency(car.marketValue)}</span></div>
          <div class="detail-row"><span>Source</span><span>${car.source === 'factory' ? `${uiIcon('factory')} Factory` : `${uiIcon('car')} Used Market`}</span></div>
          ${car.isForSale ? `<div class="detail-row"><span>Days on Lot</span><span>${car.daysInLot}</span></div>` : ''}
          ${car.isForSale ? `<div class="detail-row"><span>Sale Chance</span><span>${saleChance}</span></div>` : ''}
        </div>
        <div class="issues-row">Issues: ${issuesHtml}</div>
        ${reconBadges ? `<div class="recon-badges">${reconBadges}</div>` : ''}
        ${car.isForSale ? `
          <div class="price-input-row">
            <label>List Price:</label>
            <input type="number" class="price-input" value="${car.listPrice}" min="1"
              onchange="updateListPrice('${car.id}', this.value); renderCarLot()">
          </div>` : ''}
        ${reconHtml}
        <div class="car-actions" style="margin-top:4px">
          <button class="btn mark-for-sale-btn ${car.isForSale ? 'btn-warning' : 'btn-primary'}"
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
      ${uiIcon('home')} Car Lot: ${state.garage.length}/${state.garageSlots} slots.
      ${state.garage.filter(c => c.isForSale).length} listed for sale.
      ${state.garage.filter(c => c.inServiceUntilDay).length ? `${uiIcon('wrench')} ${state.garage.filter(c => c.inServiceUntilDay).length} in service.` : ''}
      ${activeLeases ? `${uiIcon('document')} ${activeLeases} active lease(s).` : ''}
      <br>Lease income/day: <strong>${formatCurrency(computeLeaseIncomePerDay())}</strong>.
      ${state.upgrades.crmSuite ? `<br>${uiIcon('layers')} High-volume tools active: bulk list/unlist available.` : ''}
    </div>
    <div class="bulk-row">
      <button class="btn btn-sm btn-secondary" onclick="toggleShowLeasedCars()">${showLeased ? 'Hide Leased Cars' : 'Show Leased Cars'}</button>
      <button class="btn btn-sm btn-secondary" onclick="switchTab('leasing')">${uiIcon('document')} Open Leasing Page</button>
    </div>
    ${state.upgrades.crmSuite ? `
      <div class="bulk-row">
        <button class="btn btn-sm btn-secondary" onclick="markAllForSale()">List All Ready Cars</button>
        <button class="btn btn-sm btn-warning" onclick="unlistAllCars()">Unlist All</button>
      </div>` : ''}
    ${state.staff?.length ? `
      <div class="bulk-row">
        <button class="btn btn-sm btn-secondary" onclick="staffListCars()">${uiIcon('person')} Staff: List All Cars</button>
      </div>` : ''}
    <div class="card-grid">${cards}</div>`;
}

// ============================================================
// RENDER — Leasing (dedicated page)
// ============================================================
function renderLeasing() {
  const el = document.getElementById('tab-leasing');
  if (!el) return;

  const eligibleCars = state.garage.filter(c =>
    c.leaseStatus === 'none' && !c.inServiceUntilDay && !c.isForSale);
  const offeredCars = state.garage.filter(c => c.leaseStatus === 'available');
  const activeCars  = state.garage.filter(c => c.leaseStatus === 'active' && c.activeLease);

  if (!state.garage.length) {
    el.innerHTML = `<div class="empty-state">
      <p>Your lot is empty. Order from the <strong>Factory</strong> tab or buy from <strong>Used Market</strong>
      before you can offer cars for lease.</p></div>`;
    return;
  }

  const leaseIncome     = computeLeaseIncomePerDay();
  const earnedThisCycle = activeCars.reduce((s, c) => s + (c.activeLease.totalPaid || 0), 0);

  // ── Program status chips ──────────────────────────────────
  const lm = !!state.upgrades.leaseManagement;
  const fl = !!state.upgrades.fleetLeasing;
  const programChips = `
    <div class="program-chip-row">
      <span class="program-chip ${lm ? 'active' : ''}">${uiIcon('document')} Lease Management System — ${lm ? 'Active (+8% pay, +25% leads, +1 start/day)' : 'Not purchased'}</span>
      <span class="program-chip ${fl ? 'active' : ''}">${uiIcon('fileText')} Fleet Leasing Program — ${fl ? 'Active (+5% pay, +25% leads, +2 starts/day)' : 'Not purchased'}</span>
      <span class="program-chip active">${uiIcon('calendar')} Lease Starts Cap — ${getLeaseStartCap()}/day</span>
    </div>`;

  // ── KPI strip ──────────────────────────────────────────────
  const kpiRow = `
    <div class="kpi-row">
      <div class="kpi-tile kpi-lease-a">
        <div class="kpi-icon-wrap">${uiIconLg('document')}</div>
        <div><div class="kpi-value">${activeCars.length}</div><div class="kpi-label">Active Leases</div></div>
      </div>
      <div class="kpi-tile kpi-lease-b">
        <div class="kpi-icon-wrap">${uiIconLg('cash')}</div>
        <div><div class="kpi-value text-green">+${formatCurrency(leaseIncome)}</div><div class="kpi-label">Income / Day</div></div>
      </div>
      <div class="kpi-tile kpi-lease-c">
        <div class="kpi-icon-wrap">${uiIconLg('tag')}</div>
        <div><div class="kpi-value">${offeredCars.length}</div><div class="kpi-label">Awaiting Lessee</div></div>
      </div>
      <div class="kpi-tile kpi-lease-d">
        <div class="kpi-icon-wrap">${uiIconLg('trendingUp')}</div>
        <div><div class="kpi-value">${formatCurrency(earnedThisCycle)}</div><div class="kpi-label">Earned This Cycle</div></div>
      </div>
    </div>`;

  // ── Income breakdown chart (one bar per active lease) ───────
  let chartSection = '';
  if (activeCars.length) {
    const maxPay = Math.max(...activeCars.map(c => c.activeLease.paymentPerDay || 0), 1);
    const rows = activeCars
      .slice()
      .sort((a, b) => (b.activeLease.paymentPerDay || 0) - (a.activeLease.paymentPerDay || 0))
      .map(c => {
        const pay = c.activeLease.paymentPerDay || 0;
        const pct = Math.max(4, Math.round((pay / maxPay) * 100));
        return `
        <div class="lease-chart-row">
          <span class="lease-chart-label">${formatCarDisplayName(c)}</span>
          <div class="lease-chart-track"><div class="lease-chart-fill" style="width:${pct}%"></div></div>
          <span class="lease-chart-value">+${formatCurrency(pay)}/d</span>
        </div>`;
      }).join('');
    chartSection = `
      <div class="dash-card dash-card-wide lease-chart-card">
        <h3>${uiIcon('chartBar')} Lease Income Breakdown</h3>
        ${rows}
      </div>`;
  }

  // ── Last lease return recap ─────────────────────────────────
  let returnSection = '';
  const r = state.lastLeaseReturnReport;
  if (r) {
    returnSection = `
      <div class="dash-card dash-card-wide lease-chart-card">
        <h3>${uiIcon('fileText')} Last Lease Return — Day ${r.day}</h3>
        <div class="stat-row"><span>Vehicle</span><strong>${r.carLabel}</strong></div>
        <div class="stat-row"><span>Income Earned</span><strong class="text-green">+${formatCurrency(r.incomeEarned)}</strong></div>
        <div class="stat-row"><span>Miles Added</span><strong>${r.milesAdded.toLocaleString()} mi</strong></div>
        <div class="stat-row"><span>Condition</span><strong>${r.conditionBefore} → ${r.conditionAfter}</strong></div>
        <div class="stat-row"><span>Issues Found</span><strong class="${r.issuesAdded.length ? 'text-yellow' : 'text-green'}">${r.issuesAdded.length ? r.issuesAdded.join(', ') : 'None'}</strong></div>
      </div>`;
  }

  // ── Column 1: eligible to offer ─────────────────────────────
  const eligibleHtml = eligibleCars.length
    ? eligibleCars.map(car => `
      <div class="lease-mini-card">
        <div class="lease-mini-top">
          <span class="lease-mini-name">${formatCarDisplayName(car)}</span>
          ${condBadge(car.condition)}
        </div>
        <div class="lease-mini-sub"><span>Market Value</span><span>${formatCurrency(car.marketValue)}</span></div>
        <div class="lease-mini-sub"><span>Est. Payment</span><span class="text-green">+${formatCurrency(computeLeasePaymentPerDay(car))}/day</span></div>
        <button class="btn btn-sm btn-secondary" onclick="makeLeaseAvailable('${car.id}')">${uiIcon('document')} Offer Lease</button>
      </div>`).join('')
    : `<div class="lease-column-empty">No eligible cars right now. A car must be in your lot, not for sale, and not in service.</div>`;

  // ── Column 2: awaiting a lessee ──────────────────────────────
  const offeredHtml = offeredCars.length
    ? offeredCars.map(car => `
      <div class="lease-mini-card">
        <div class="lease-mini-top">
          <span class="lease-mini-name">${formatCarDisplayName(car)}</span>
          <span class="badge badge-blue">LISTED</span>
        </div>
        <div class="lease-mini-sub"><span>Market Value</span><span>${formatCurrency(car.marketValue)}</span></div>
        <div class="lease-mini-sub"><span>Est. Payment</span><span class="text-green">+${formatCurrency(computeLeasePaymentPerDay(car))}/day</span></div>
        <button class="btn btn-sm btn-warning" onclick="stopOfferingLease('${car.id}')">${uiIcon('stop')} Stop Offering</button>
      </div>`).join('')
    : `<div class="lease-column-empty">Nothing waiting on a lessee. Offer a car for lease from the left column — a lead can arrive as soon as the next day.</div>`;

  // ── Column 3: active leases (rich cards) ─────────────────────
  const activeHtml = activeCars.length
    ? activeCars.map(car => {
        const lease = car.activeLease;
        const daysLeft = Math.max(0, lease.endDay - state.day);
        const termPct  = Math.round(clamp((state.day - lease.startDay) / Math.max(1, lease.termDays), 0, 1) * 100);
        const milesPct = Math.min(100, Math.round(((lease.totalMilesAdded || 0) / LEASE_CONDITION_DROP_TWO_STEP_MILES) * 100));
        const milesWarn = (lease.totalMilesAdded || 0) >= LEASE_CONDITION_DROP_ONE_STEP_MILES;
        const issueCount = (lease.pendingIssues || []).length;
        return `
        <div class="lease-active-card">
          <div class="lease-active-top">
            <div class="lease-ring" style="--pct:${termPct}"><div class="lease-ring-inner"><b>${termPct}%</b><small>term</small></div></div>
            <div class="lease-active-info">
              <div class="lease-active-name">${formatCarDisplayName(car)}</div>
              <div class="lease-active-sub">${daysLeft} day(s) left of ${lease.termDays}d term</div>
            </div>
          </div>
          <div class="lease-active-stats">
            <div class="detail-row"><span>Payment / Day</span><span class="text-green">+${formatCurrency(lease.paymentPerDay)}</span></div>
            <div class="detail-row"><span>Income Earned</span><span class="text-green">${formatCurrency(lease.totalPaid || 0)}</span></div>
            <div class="detail-row"><span>Miles Added</span><span>${(lease.totalMilesAdded || 0).toLocaleString()} mi</span></div>
            <div class="detail-row"><span>Term</span><span>${lease.termDays}d</span></div>
          </div>
          <div>
            <div class="lease-bar-label"><span>Mileage wear</span><span>${(lease.totalMilesAdded || 0).toLocaleString()} / ${LEASE_CONDITION_DROP_TWO_STEP_MILES.toLocaleString()} mi</span></div>
            <div class="lease-bar-track"><div class="lease-bar-fill ${milesWarn ? 'warn' : ''}" style="width:${milesPct}%"></div></div>
          </div>
          ${issueCount ? `<div class="lease-issue-note">${uiIcon('warning')} ${issueCount} issue(s) will surface at return</div>` : ''}
          <button class="btn btn-sm btn-secondary" onclick="viewLeaseDetails('${car.id}')">${uiIcon('fileText')} Full Details</button>
        </div>`;
      }).join('')
    : `<div class="lease-column-empty">No active leases yet. Once a car is offered, a lessee may pick it up as soon as the next day.</div>`;

  el.innerHTML = `
    <div class="tab-info">
      ${uiIcon('document')} Leasing turns idle inventory into daily income: offer a car, wait for a lessee, then collect
      payments until the term ends and the car returns (with mileage, wear, and maybe a surprise issue or two).
      Leased cars can't be sold, reconditioned, or traded in until they come back.
    </div>
    ${programChips}
    ${kpiRow}
    ${returnSection}
    ${chartSection}
    <div class="lease-columns">
      <div class="lease-column">
        <div class="lease-column-header">
          <span class="lease-column-title">${uiIcon('tag')} Eligible to Offer</span>
          <span class="lease-column-count">${eligibleCars.length}</span>
        </div>
        <div class="lease-column-list">${eligibleHtml}</div>
      </div>
      <div class="lease-column">
        <div class="lease-column-header">
          <span class="lease-column-title">${uiIcon('inbox')} Awaiting Lessee</span>
          <span class="lease-column-count">${offeredCars.length}</span>
        </div>
        <div class="lease-column-list">${offeredHtml}</div>
      </div>
      <div class="lease-column">
        <div class="lease-column-header">
          <span class="lease-column-title">${uiIcon('key')} Active Leases</span>
          <span class="lease-column-count">${activeCars.length}</span>
        </div>
        <div class="lease-column-list">${activeHtml}</div>
      </div>
    </div>`;
}

// ============================================================
// RENDER — Service (v1.3.3)
// ============================================================
function renderServiceGarage() {
  const el = document.getElementById('tab-garage');
  const capacity    = state.serviceGarageCapacity || 3;
  const jobs        = state.serviceGarage || [];
  const customerInProgress = getCustomerServiceBayUsage();
  const ownInProgress = getOwnCarServiceBayUsage();
  const occupiedBays = customerInProgress + ownInProgress;
  const baysAvail   = Math.max(0, capacity - occupiedBays);

  const TYPE_COLOR = { maintenance: 'badge-green', moderate: 'badge-yellow', major: 'badge-red' };

  const jobCards = jobs.map(sc => {
    const status    = sc.status || 'ready'; // legacy entries without status treated as ready
    const netProfit = sc.revenueWhenDone - sc.laborCost;
    const issueList = sc.issues.map(i =>
      `<span class="badge ${TYPE_COLOR[i.type] || 'badge-blue'}">${i.label}</span>`
    ).join(' ');

    let statusBadge = '';
    let statusRow   = '';
    let actionHtml  = '';

    if (status === 'waiting') {
      const daysLeft = Math.max(0, sc.daysAvailable - (state.day - sc.arrivalDay));
      statusBadge = `<span class="badge badge-blue">Waiting</span>`;
      statusRow   = `<div class="detail-row"><span>Leaves If Not Started</span>
                       <span class="${daysLeft <= 2 ? 'text-red' : 'text-muted'}">${daysLeft} day(s)</span></div>
                     <div class="detail-row"><span>Service Duration</span>
                       <span>${getServiceDays(sc)} day(s) in bay</span></div>`;
      actionHtml  = `
        <div class="car-actions">
          <button class="btn btn-primary" onclick="startServiceJob('${sc.id}')" ${baysAvail > 0 ? '' : 'disabled'}
            title="${baysAvail <= 0 ? 'All bays busy — finish a current job first' : 'Start service and occupy a bay slot'}">
            ${uiIcon('wrench')} Start Service
          </button>
          <button class="btn btn-danger btn-sm" onclick="dismissServiceJob('${sc.id}')">${uiIcon('xIcon')} Dismiss</button>
        </div>`;
    } else if (status === 'inProgress') {
      const daysLeft = Math.max(0, sc.serviceCompleteDay - state.day);
      statusBadge = `<span class="badge badge-yellow">In Progress</span>`;
      statusRow   = `<div class="detail-row"><span>Ready In</span>
                       <span class="${daysLeft === 0 ? 'text-green' : 'text-muted'}">${daysLeft} day(s)</span></div>
                     <div class="detail-row"><span>Complete Day</span><span>Day ${sc.serviceCompleteDay}</span></div>`;
      actionHtml  = `
        <div class="car-actions">
          <button class="btn btn-secondary" disabled>${uiIcon('wrench')} In Bay — Day ${sc.serviceCompleteDay}</button>
          <button class="btn btn-danger btn-sm" onclick="dismissServiceJob('${sc.id}')">${uiIcon('xIcon')} Cancel</button>
        </div>`;
    } else { // ready
      statusBadge = `<span class="badge badge-green">Ready</span>`;
      statusRow   = `<div class="detail-row"><span>Status</span><span class="text-green">Service complete — collect payment!</span></div>`;
      actionHtml  = `
        <div class="car-actions">
          <button class="btn btn-success" onclick="completeServiceJob('${sc.id}')">
            ${uiIcon('check')} Collect +${formatCurrency(netProfit)}
          </button>
          <button class="btn btn-danger btn-sm" onclick="dismissServiceJob('${sc.id}')">${uiIcon('xIcon')} Dismiss</button>
        </div>`;
    }

    return `
      <div class="car-card service-car-card">
        <div class="car-card-header">
          <div>
            <span class="car-name">${sc.year} ${sc.make} ${sc.model}</span>
            <span class="text-muted" style="font-size:.8rem"> — ${sc.ownerName}</span>
          </div>
          <div class="badge-stack">${statusBadge}</div>
        </div>
        <div class="car-details">
          <div class="detail-row"><span>Mileage</span><span>${sc.mileage.toLocaleString()} mi</span></div>
          <div class="detail-row"><span>Issues</span><span class="detail-tags">${issueList}</span></div>
          <div class="detail-row"><span>Labor Cost</span><span class="text-red">−${formatCurrency(sc.laborCost)}</span></div>
          <div class="detail-row"><span>Customer Pays</span><span class="text-green">+${formatCurrency(sc.revenueWhenDone)}</span></div>
          <div class="detail-row"><span>Your Profit</span>
            <span class="${sc.revenueWhenDone - sc.laborCost >= 0 ? 'text-green' : 'text-red'}">
              ${formatCurrency(sc.revenueWhenDone - sc.laborCost)}
            </span>
          </div>
          ${statusRow}
        </div>
        ${actionHtml}
      </div>`;
  }).join('');

  // Player-owned cars that need service or have damage — always visible regardless of serviceBay upgrade
  const playerServiceCars = (state.garage || []).filter(car => {
    if (car.leaseStatus === 'active' && car.activeLease) return true; // leased cars always appear
    const issues = car.hiddenIssues || [];
    const repairNeeded = issues.length > 0
      || (car.condition !== 'A' && car.condition !== 'B')
      || (car.crashDamageSeverity && car.crashDamageSeverity !== 'none'); // catch old saves
    return repairNeeded;
  });

  const hasBay = !!state.upgrades.serviceBay;

  const playerCarCards = playerServiceCars.map(car => {
    const inService  = !!car.inServiceUntilDay;
    const isLeased   = car.leaseStatus === 'active' && !!car.activeLease;
    const repairCost = computeRepairCost(car);
    const baysFull = occupiedBays >= capacity;
    const canRepair  = !inService && !isLeased && !baysFull && state.cash >= repairCost;
    const issues     = car.hiddenIssues || [];
    const issueHtml  = issues.length
      ? issues.map(i => `<span class="issue-tag">${uiIcon('warning')} ${i.name}</span>`).join('')
      : `<span class="text-muted">${car.condition !== 'A' && car.condition !== 'B' ? 'Poor condition' : 'No issues'}</span>`;

    const repairTitle = inService ? 'Already in service'
      : isLeased  ? 'Lease active — repair unavailable'
      : baysFull ? 'All service bays are occupied'
      : state.cash < repairCost ? 'Not enough cash'
      : `${state.upgrades.reconditioningWorkshop ? 'Instant' : '1 day'}: fixes all issues, restores condition`;

    return `
      <div class="car-card service-car-card">
        <div class="car-card-header">
          <div>
            <span class="car-name">${formatCarDisplayName(car)}</span>
          </div>
          <div class="badge-stack">
            ${condBadge(car.condition)}
            ${isLeased ? '<span class="badge badge-blue">LEASED</span>' : '<span class="badge badge-orange">Your Car</span>'}
          </div>
        </div>
        ${inService ? `<div class="service-banner">${uiIcon('wrench')} IN SERVICE — Ready Day ${car.inServiceUntilDay}</div>` : ''}
        <div class="car-details">
          <div class="detail-row"><span>Issues</span><span class="detail-tags">${issueHtml}</span></div>
          <div class="detail-row"><span>Repair Estimate</span><span class="text-red">${formatCurrency(repairCost)}</span></div>
          ${isLeased ? `<div class="detail-row"><span>Note</span><span class="text-muted">Repair unavailable while lease active</span></div>` : ''}
        </div>
        <div class="car-actions">
          <button class="btn btn-secondary" onclick="basicRepair('${car.id}')" ${canRepair ? '' : 'disabled'}
            title="${repairTitle}">
            ${uiIcon('wrench')} Repair (${formatCurrency(repairCost)})
          </button>
        </div>
      </div>`;
  }).join('');

  const secLevel = state.upgrades.securityLevel || 0;
  const theftInfo = getTheftChancePerCar();
  const theftPct  = (theftInfo * 100).toFixed(2);

  const customerSection = jobs.length === 0
    ? `<div class="empty-state"><p>No customer service jobs right now. New jobs arrive daily.</p></div>`
    : `<div class="card-grid">${jobCards}</div>`;

  const playerSection = playerServiceCars.length === 0
    ? `<div class="empty-state"><p>All your cars are in good shape — no repairs needed right now.</p></div>`
    : `<div class="card-grid">${playerCarCards}</div>`;

  const queueLimit = getServiceQueueLimit();
  const maxQueueLimit = capacity * 2;
  const isGrowing = queueLimit < maxQueueLimit;

  const tabContent = `
    <div class="tab-info">
    ${uiIcon('wrench')} Bays: <strong>${occupiedBays}/${capacity}</strong> occupied.
      ${baysAvail > 0 ? `<span class="text-green">${baysAvail} bay slot(s) free.</span>` : `<span class="text-red">All bays busy — complete a job to free a slot.</span>`}
    &nbsp;|&nbsp; Customer in bay: <strong>${customerInProgress}</strong>
    &nbsp;|&nbsp; Your cars in bay: <strong>${ownInProgress}</strong>
    &nbsp;|&nbsp; Waiting: <strong>${jobs.filter(j => (j.status||'ready') === 'waiting').length}/${queueLimit}</strong>
    &nbsp;|&nbsp; Ready to collect: <strong>${jobs.filter(j => (j.status||'ready') === 'ready').length}</strong>
      ${isGrowing ? `<br><span class="text-muted" style="font-size:.8rem">${uiIcon('info')} Still building a customer base — waiting room grows as the shop stays open and completes jobs (up to ${maxQueueLimit} at this capacity).</span>` : ''}
      <br>🔒 Security Level: <strong>${secLevel}</strong> — Theft chance/car/day: <strong>${theftPct}%</strong>
      ${secLevel === 0 && state.day >= 50 ? `<span class="text-red"> ⚠️ Consider Security upgrades to protect your lot.</span>` : ''}
    </div>
    <div class="category-section">
      <h3>${uiIcon('wrench')} Customer Service Jobs (${jobs.length})</h3>
      ${customerSection}
    </div>
    <div class="category-section">
      <h3>${uiIcon('home')} Your Cars Needing Service (${playerServiceCars.length})</h3>
      ${playerSection}
    </div>`;

  if (!hasBay) {
    el.innerHTML = `
      <div class="service-locked-wrapper">
        <div class="service-locked-backdrop" aria-hidden="true">${tabContent}</div>
        <div class="service-locked-overlay" role="status" aria-live="polite">
          <div class="service-locked-box">
            <svg class="service-lock-icon" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">
              <rect x="3" y="11" width="18" height="11" rx="2" ry="2"/>
              <path d="M7 11V7a5 5 0 0 1 10 0v4"/>
            </svg>
            <h2 class="service-locked-title">Service Bay Locked</h2>
            <p class="service-locked-msg">Purchase the <strong>Service Bay</strong> upgrade in the <strong>Upgrades</strong> tab to unlock the Service department.</p>
          </div>
        </div>
      </div>`;
  } else {
    el.innerHTML = tabContent;
  }
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
      const tCar = req.customerCar;
      const cashDelta = req.counterCashDelta ?? req.cashDelta;
      const isCountered = req.state === 'countered';
      const isNpcCounter = !isCountered && (req.round || 0) > 0;
      const badgeText = isCountered ? 'Your Counter Sent' : isNpcCounter ? 'NPC Counter' : 'New Request';
      const badgeClass = isCountered ? 'badge-yellow' : isNpcCounter ? 'badge-orange' : 'badge-blue';
      const netValueToYou = req.customerCarValue + cashDelta;
      const canAccept = cashDelta < 0 ? state.cash >= Math.abs(cashDelta) : true;
      const canFit    = state.garage.length <= state.garageSlots || !targetCar; // trade-in removes target first, so full garage is OK

      // Hidden issues — mirrors the used-market inspection panel
      const tirIssuesHtml = tCar.inspected
        ? (tCar.hiddenIssues.length === 0
            ? `<p class="text-green" style="font-size:.78rem">${uiIcon('check')} No hidden issues found!</p>`
            : tCar.hiddenIssues.map(i => {
                const crashClass = i.isCrashDamage
                  ? (i.severity === 'severe' ? 'crash-severe' : i.severity === 'moderate' ? 'crash-moderate' : 'crash-minor')
                  : '';
                return `<span class="issue-tag ${crashClass}">${uiIcon('warning')} ${i.name} (${formatCurrency(i.cost)})</span>`;
              }).join(''))
        : `<p class="text-muted" style="font-size:.78rem">${uiIcon('search')} Unknown — inspect to reveal issues</p>`;

      // Legal / VIN / title-recovery — only shown once discovered via inspection + the relevant upgrade
      const tirLegalStatus = tCar.legalStatus || 'clean';
      const tirVinStatus   = tCar.vinStatus   || 'normal';
      let tirLegalWarningHtml = '';
      if (tCar.legalDiscovered && tirLegalStatus !== 'clean') {
        const msg = tirLegalStatus === 'stolen'
          ? '🚨 <strong>STOLEN CAR</strong> — accepting this trade-in is illegal. Risk of police fine & impound.'
          : '⚠️ <strong>No Valid Title</strong> — accepting without title risks police fine.';
        tirLegalWarningHtml += `<div class="legal-warning">${msg}</div>`;
      }
      if (tCar.vinDiscovered && tirVinStatus === 'scratched') {
        tirLegalWarningHtml += `<div class="legal-warning">🔦 <strong>Scratched/Altered VIN</strong> — increases risk of police detection later.</div>`;
      }
      if (tCar.titleRecoveryAvailable) {
        tirLegalWarningHtml += `<div class="car-actions" style="margin-top:4px">
          <button class="btn btn-sm btn-secondary" onclick="applyTitleRecoveryTradeIn('${req.id}')">📋 Recover Title ($800)</button>
        </div>`;
      }

      // Crash damage badge / unknown notice
      let tirCrashBadgeHtml = '';
      if (tCar.crashDamageDiscovered && (tCar.crashDamageSeverity || 'none') !== 'none') {
        const sev = tCar.crashDamageSeverity;
        const cls = sev === 'severe' ? 'crash-severe' : sev === 'moderate' ? 'crash-moderate' : 'crash-minor';
        tirCrashBadgeHtml = `<span class="badge ${cls}" style="border-radius:4px;font-size:.72rem">🔨 ${sev.charAt(0).toUpperCase()}${sev.slice(1)} Crash Damage</span>`;
      }
      let tirCrashUnknownHtml = '';
      if (!tCar.crashDamageDiscovered && !tCar.inspected) {
        tirCrashUnknownHtml = `<p class="text-muted" style="font-size:.74rem;margin-top:2px">${uiIcon('search')} Crash history unknown — inspect for details${state.upgrades.frameDamageTools ? '' : ' (Frame Damage Tools reveals severity)'}.</p>`;
      } else if (!tCar.crashDamageDiscovered && tCar.inspected && !state.upgrades.frameDamageTools) {
        tirCrashUnknownHtml = `<p class="text-muted" style="font-size:.74rem;margin-top:2px">${uiIcon('search')} Crash severity unclear — upgrade to Frame Damage Inspection Tools for full detail.</p>`;
      }

      const tirInspectCost = state.upgrades.inspectionTool ? 150 : 300;
      const tirCanInspect  = !tCar.inspected && state.cash >= tirInspectCost;

      return `
        <div class="car-card tradein-request-card ${isCountered ? 'countered-card disabled-card' : ''}">
          <div class="car-card-header">
            <span class="car-name">Trade-In Offer</span>
            <span class="badge ${badgeClass}">${badgeText}</span>
          </div>
          <div class="tradein-split">
            <div class="tradein-half">
              <h5>${uiIcon('car')} Their Car</h5>
              <div class="detail-row"><span>Car</span><span>${tCar.year} ${tCar.make} ${tCar.model}</span></div>
              <div class="detail-row"><span>Condition</span>${condBadge(tCar.condition)}</div>
              <div class="detail-row"><span>Title</span><span>${TITLE_LABELS[tCar.titleStatus] || 'Clean'}</span></div>
              <div class="detail-row"><span>Mileage</span><span>${tCar.mileage.toLocaleString()} mi</span></div>
              <div class="detail-row"><span>Their Car Value</span><span class="text-green">${formatCurrency(req.customerCarValue)}</span></div>
              ${tirCrashBadgeHtml ? `<div class="detail-row"><span></span>${tirCrashBadgeHtml}</div>` : ''}
              ${tirIssuesHtml}
              ${tirCrashUnknownHtml}
              ${tirLegalWarningHtml}
              ${!isCountered ? `<div class="car-actions" style="margin-top:6px">
                <button class="btn btn-sm btn-secondary" onclick="inspectTradeIn('${req.id}')" ${tCar.inspected || !tirCanInspect ? 'disabled' : ''}>
                  ${tCar.inspected ? `${uiIcon('check')} Inspected` : `${uiIcon('search')} Inspect (${formatCurrency(tirInspectCost)})`}
                </button>
              </div>` : ''}
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
            ${isCountered ? `<p class="text-muted" style="font-size:.8rem;margin-top:6px">Your counter sent — customer will respond next day.</p>` : ''}
            ${isNpcCounter ? `<p class="text-muted" style="font-size:.8rem;margin-top:6px">Customer countered back. Accept, reject, or send another counter.</p>` : ''}
          </div>
          ${!isCountered ? `
          ${req.staffSuggestion ? `<p class="text-muted" style="font-size:.78rem;margin-top:4px">${uiIcon('person')} ${req.staffSuggestion.by}: ${req.staffSuggestion.note}</p>` : ''}
          <div class="neg-input-row" style="margin-top:4px">
            <label style="color:var(--text-muted);font-size:.82rem;white-space:nowrap">Counter cash:</label>
            <input type="number" class="price-input" id="tir-${req.id}" placeholder="${Math.abs(cashDelta)}" value="${cashDelta}">
            <button class="btn btn-warning" onclick="counterTradeInRequest('${req.id}', document.getElementById('tir-${req.id}').value)">Counter</button>
            ${req.staffSuggestion ? `<button class="btn btn-secondary" onclick="applyStaffTradeInSuggestion('${req.id}')">Use Staff</button>` : ''}
          </div>
          <div class="car-actions">
            <button class="btn btn-success" onclick="acceptTradeInRequest('${req.id}')" ${canAccept && canFit ? '' : 'disabled'}>${uiIcon('check')} Accept Deal</button>
            <button class="btn btn-danger" onclick="rejectTradeInRequest('${req.id}')">${uiIcon('xIcon')} Reject</button>
          </div>` : ''}
        </div>`;
    }).join('');
    tradeInHtml = `
      <div class="category-section">
        <h3>${uiIcon('refresh')} Trade-In Requests (${pendingTIR.length} your turn, ${counteredTIR.length} waiting for customer)</h3>
        <div class="card-grid">${tirCards}</div>
      </div>`;
  }

  if (!listed.length) {
    el.innerHTML = `
      ${offersHtml || ''}
      ${tradeInHtml}
      <div class="empty-state">
        <p>No cars are listed for sale. Go to <strong>Car Lot</strong> and click "Mark for Sale".</p></div>`;
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
    const priceLabel = car.listPrice > 0 ? getPriceLabel(car) : null;
    const popLabel    = getPopularityLabel(car);

    return `
      <div class="car-card forsale-card ${hasOffer ? 'has-offer' : ''} ${car.source === 'tradein' ? 'tradein-inventory' : ''}">
        <div class="car-card-header">
          <div>
            <span class="car-name">${formatCarDisplayName(car)}</span>
          </div>
          <div class="badge-stack">
            ${car.source === 'tradein' ? '<span class="badge badge-tradein">TRADE-IN</span>' : ''}
            ${condBadge(car.condition)}
            ${titleBadge(car.titleStatus)}
            ${car.discontinued ? `<span class="badge badge-purple" title="No longer made — produced ${car.productionStart}–${car.productionEnd}">🏛️ Discontinued</span>` : ''}
          </div>
        </div>
        ${car.source === 'tradein' ? `<div class="tradein-source-banner">${uiIcon('refresh')} Accepted trade-in vehicle</div>` : ''}
        ${hasOffer ? `<div class="offer-banner">${uiIcon('inbox')} Customer offer waiting (see above)</div>` : ''}
        ${car.washBoostDays > 0 ? `<div class="wash-banner">${uiIcon('droplet')} Wash boost active (${car.washBoostDays} days)</div>` : ''}
        <div class="car-details">
          <div class="detail-row"><span>Purchased For</span><span>${formatCurrency(car.purchasePrice)}</span></div>
          <div class="detail-row"><span>Market Value</span><span class="text-green">${formatCurrency(car.marketValue)}</span></div>
          <div class="detail-row"><span>Days on Lot</span><span>${car.daysInLot}</span></div>
          ${priceLabel ? `<div class="detail-row"><span>Price Rating</span><span class="${priceLabel.cls}" style="font-weight:600">${priceLabel.text}</span></div>` : ''}
          ${priceLabel ? `<div class="detail-row"><span>Buyer Interest</span><span class="${priceLabel.cls}">${priceLabel.interest}</span></div>` : ''}
          <div class="detail-row"><span>Market Segment</span><span class="${popLabel.cls}">${popLabel.text}</span></div>
          ${(car.crashDamageDiscovered && car.crashDamageSeverity && car.crashDamageSeverity !== 'none') ? `<div class="detail-row"><span>Accident History</span><span class="text-red">${car.crashDamageSeverity.charAt(0).toUpperCase() + car.crashDamageSeverity.slice(1)} (hurts sale speed)</span></div>` : (car.hasCrashRepair ? `<div class="detail-row"><span>Accident History</span><span class="text-yellow">Repaired (minor stigma)</span></div>` : '')}
          <div class="detail-row"><span>Sale Chance / Day</span><span class="${chanceClass}">${chance}%</span></div>
          <div class="detail-row"><span>Fee (2%)</span><span class="text-red">−${formatCurrency(fee)}</span></div>
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
  const cats = UPGRADE_CATEGORY_ORDER.filter(c => grouped[c])
    .concat(Object.keys(grouped).filter(c => !UPGRADE_CATEGORY_ORDER.includes(c)));

  let html = `<div class="tab-info">${uiIcon('arrowUp')} Upgrades are tagged by the stage of the game they are built for. Locked upgrades show what they need — usually a bigger lot or a prerequisite upgrade.</div>`;
  for (const cat of cats) {
    html += `<div class="category-section"><h3>${cat}</h3><div class="card-grid">`;
    for (const upg of grouped[cat]) {
      const st        = getUpgradeStatus(upg);
      const canAfford = state.cash >= st.cost;
      const stage     = UPGRADE_STAGES[upg.stage || 1];
      const stackInfo = st.max > 1 ? ` (${st.level}/${st.max})` : '';
      const iconKey   = _P[upg.icon] ? upg.icon : (UPGRADE_ICON_MAP[upg.icon] || 'gear');

      let btn;
      if (st.owned) {
        btn = `<button class="btn btn-primary btn-full" disabled>${uiIcon('check')} ${st.max > 1 ? 'Max Level' : 'Purchased'}</button>`;
      } else if (st.lock) {
        btn = `<button class="btn btn-primary btn-full" disabled title="${st.lock}">${uiIcon('lock')} ${st.lock}</button>`;
      } else if (!canAfford) {
        btn = `<button class="btn btn-primary btn-full" disabled title="Need ${formatCurrency(st.cost - state.cash)} more">${uiIcon('warning')} Need ${formatCurrencyCompact(st.cost - state.cash)}</button>`;
      } else {
        btn = `<button class="btn btn-primary btn-full" onclick="buyUpgrade('${upg.id}')">Buy — ${formatCurrencyCompact(st.cost)}</button>`;
      }

      html += `
        <div class="car-card upgrade-card ${st.owned || st.lock ? 'disabled-card' : ''}">
          <div class="upgrade-icon">${uiIconLg(iconKey)}</div>
          <h4>${st.name}${stackInfo}</h4>
          <span class="badge ${stage.cls}">${stage.label}</span>
          <p class="upgrade-desc">${upg.desc}</p>
          <p class="upgrade-cost ${st.owned ? 'text-green' : ''}">${st.owned ? 'Owned' : formatCurrency(st.cost)}</p>
          ${btn}
        </div>`;
    }
    html += `</div></div>`;
  }
  document.getElementById('tab-upgrades').innerHTML = html;
}

// ============================================================
// RENDER — Staff
// ============================================================
function renderStaff() {
  const el = document.getElementById('tab-staff');
  const hasOffice = !!state.upgrades.staffOffice;

  if (!hasOffice) {
    el.innerHTML = `
      <div class="service-locked-wrapper">
        <div class="service-locked-backdrop" aria-hidden="true"></div>
        <div class="service-locked-overlay" role="status" aria-live="polite">
          <div class="service-locked-box">
            <svg class="service-lock-icon" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">
              <rect x="3" y="11" width="18" height="11" rx="2" ry="2"/>
              <path d="M7 11V7a5 5 0 0 1 10 0v4"/>
            </svg>
            <h2 class="service-locked-title">Staff Office Locked</h2>
            <p class="service-locked-msg">Purchase the <strong>Staff Office</strong> upgrade in the <strong>Upgrades</strong> tab to unlock hiring sales staff.</p>
          </div>
        </div>
      </div>`;
    return;
  }

  ensureStaffCandidates();
  const maxStaff = state.upgrades.crmSuite ? STAFF_MAX_WITH_CRM : STAFF_MAX_BASE;
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
        <button class="btn btn-primary btn-sm" onclick="hireStaff('${s.id}')" ${(state.staff || []).length >= maxStaff ? 'disabled title="Staff cap reached"' : ''}>Hire</button>
        <button class="btn btn-secondary btn-sm" onclick="dismissCandidate('${s.id}')">Skip</button>
      </div>
    </div>`).join('');

  const staffLogs = (state.staffActivity || []).length
    ? state.staffActivity.slice(0, 8).map(n => `
      <div class="sale-item"><span class="text-muted">Day ${n.day}</span><span>${n.message}</span></div>`).join('')
    : '<p class="empty-msg">No staff activity yet.</p>';

  el.innerHTML = `
    <div class="tab-info">
      ${uiIcon('person')} Staff hired: <strong>${(state.staff || []).length}/${maxStaff}</strong>
      &nbsp;|&nbsp; Total wages: <strong class="text-red">${formatCurrency(getTotalStaffWages())}/day</strong>
    </div>
    <div class="category-section"><h3>${uiIcon('person')} Hired Staff</h3><div class="card-grid">${staffCards}</div></div>
    <div class="category-section"><h3>${uiIcon('document')} Hiring Candidates</h3><div class="card-grid">${candidateCards}</div></div>
    <div class="category-section"><h3>${uiIcon('person')} Staff Activity</h3>${staffLogs}</div>`;
}

/** Qualitative label + color class for a credit score, used on the Finance tab. */
function creditScoreInfo(score) {
  if (score >= 800) return { label: 'Excellent', cls: 'text-green' };
  if (score >= 740) return { label: 'Very Good',  cls: 'text-green' };
  if (score >= 670) return { label: 'Good',       cls: 'text-blue'  };
  if (score >= 580) return { label: 'Fair',        cls: 'text-yellow' };
  return { label: 'Poor', cls: 'text-red' };
}

function renderFinance() {
  const available = Math.max(0, state.loanLimit - state.loanBalance);
  const dailyInterest = state.loanBalance > 0 ? Math.max(1, Math.round(state.loanBalance * state.loanApr / 365)) : 0;
  const minPrincipal = state.difficulty === 'hard' && state.loanBalance > 0
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
  const creditScore = state.creditScore ?? 700;
  const creditInfo   = creditScoreInfo(creditScore);
  const creditPct    = clamp((creditScore - CREDIT_SCORE_MIN) / (CREDIT_SCORE_MAX - CREDIT_SCORE_MIN), 0, 1) * 100;

  document.getElementById('tab-finance').innerHTML = `
    <div class="dashboard-grid">
      <div class="dash-card">
        <h3>${uiIcon('trendingUp')} Credit Score</h3>
        ${state.difficulty === 'easy'
          ? `<p class="text-muted" style="font-size:.82rem">Easy mode: no credit tracking, no loan interest.</p>`
          : `
          <div class="stat-row"><span>Score</span><strong class="${creditInfo.cls}" style="font-size:1.3rem">${creditScore}</strong></div>
          <div class="stat-row"><span>Rating</span><strong class="${creditInfo.cls}">${creditInfo.label}</strong></div>
          <div style="height:8px;border-radius:5px;background:rgba(128,128,128,.25);margin:8px 0 10px;overflow:hidden">
            <div style="height:100%;width:${creditPct}%;border-radius:5px;background:${creditScore >= 670 ? 'var(--success, #3ecf6c)' : creditScore >= 580 ? 'var(--warning, #f0b429)' : 'var(--danger, #ff7a85)'}"></div>
          </div>
          <p class="text-muted" style="font-size:.78rem">Ending a day cash-negative dings your score even without a loan — it's what your loan APR is priced from. Staying cash-positive slowly rebuilds it.</p>
          `}
      </div>

      <div class="dash-card">
        <h3>${uiIcon('bank')} Dealership Credit Line</h3>
        <div class="stat-row"><span>Balance</span><strong class="${state.loanBalance > 0 ? 'text-red' : 'text-green'}">${formatCurrency(state.loanBalance)}</strong></div>
        <div class="stat-row"><span>Available</span><strong>${formatCurrency(available)}</strong></div>
        <div class="stat-row"><span>Limit</span><strong>${formatCurrency(state.loanLimit)}</strong></div>
        <div class="stat-row"><span>APR</span><strong>${(state.loanApr * 100).toFixed(1)}%</strong></div>
        <div class="stat-row"><span>Daily Interest</span><strong class="text-red">−${formatCurrency(dailyInterest)}</strong></div>
        <div class="stat-row"><span>Min Principal (Hard)</span><strong>${minPrincipal ? formatCurrency(minPrincipal) : 'None'}</strong></div>
        <div class="stat-row"><span>Late payments</span><strong class="${state.delinquencyLevel > 0 ? 'text-red' : 'text-green'}">Level ${state.delinquencyLevel || 0}</strong></div>
        <div class="stat-row"><span>Credit Status</span><strong class="${state.loanFrozen ? 'text-red' : 'text-green'}">${state.loanFrozen ? 'Frozen' : 'Open'}</strong></div>
        ${state.delinquencyLevel > 0 && state.difficulty === 'normal' ? `<div class="stat-row"><span>Credit rebuild</span><strong class="text-blue">${state.daysGoodStanding || 0}/10 good days</strong></div>` : ''}
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
        <h3>${uiIcon('trendingDown')} Late Payments &amp; Bankruptcy Ladder</h3>
        <div class="stat-row"><span>1 Missed Payment</span><strong class="text-yellow">Warning</strong></div>
        <div class="stat-row"><span>2 Missed Payments</span><strong class="text-red">Default: credit freeze + APR increase</strong></div>
        <div class="stat-row"><span>3 Missed Payments</span><strong class="text-red">${(() => {
          if (state.difficulty === 'hard') return 'Hard: Game Over';
          if (state.difficulty === 'easy') return 'Easy: N/A (no late payments)';
          return 'Normal: Instant liquidation then continue';
        })()}</strong></div>
        ${state.difficulty !== 'easy' ? `<p class="text-muted" style="font-size:.8rem;margin-top:8px">💡 This ladder only applies with an active loan. Running cash-negative with no loan can't default — but it still dings your Credit Score above, which raises the APR on any loan you do take out.</p>` : ''}
        ${state.difficulty === 'normal' && state.delinquencyLevel > 0 ? `<p class="text-muted" style="font-size:.8rem;margin-top:8px">💡 Credit rebuilds on Normal: every 10 days of good standing reduces your late payment level by 1.</p>` : ''}
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
  const sfxMuted = !!settings.sfxMuted;
  const overhead = getLotOverhead();
  const diff = state.difficulty || 'normal';
  const diffLabel = diff === 'hard' ? `Hard 💪` : diff === 'easy' ? 'Easy 😎' : 'Normal';
  const diffClass = diff === 'hard' ? 'text-red' : diff === 'easy' ? 'text-green' : 'text-blue';

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
        <h3>🎓 Tutorial</h3>
        <div class="setting-row">
          <div>
            <div class="setting-label">Show Tutorials</div>
            <div class="setting-desc">Auto-run the onboarding guide when starting a new save.</div>
          </div>
          <button class="toggle-btn ${settings.tutorialsEnabled ? 'active' : ''}" onclick="toggleTutorials()" aria-label="Toggle tutorials">
            <span class="toggle-thumb"></span>
          </button>
        </div>
      </div>

      <div class="dash-card settings-card">
        <h3>${uiIcon('clipboard')} Current Economy Info</h3>
        <div class="stat-row">
          <span>Difficulty</span>
          <strong class="${diffClass}">${diffLabel}</strong>
        </div>
        <div class="stat-row">
          <span>Daily Overhead</span>
          <strong class="${diff === 'easy' ? 'text-green' : 'text-red'}">${diff === 'easy' ? 'Free (Easy mode)' : `−${formatCurrency(overhead)}/day`}</strong>
        </div>
        <div class="stat-row">
          <span>Daily Wages</span>
          <strong class="text-red">−${formatCurrency(getTotalStaffWages())}/day</strong>
        </div>
        <div class="stat-row">
          <span>Car Lot Level</span>
          <strong>Tier ${state.upgrades.garageLevel} (${state.garageSlots} slots)</strong>
        </div>
        <p class="text-muted" style="font-size:.82rem;margin-top:10px">
          ${uiIcon('info')} Difficulty is locked for this save. Start a new save slot to choose a different difficulty.
        </p>
      </div>

      <div class="dash-card settings-card">
        <h3>${uiIcon('upload')} Save Data</h3>
        <p class="text-muted" style="font-size:.82rem;margin-bottom:12px">Back up your progress or transfer saves between devices.</p>
        <div class="settings-save-actions">
          <button class="btn btn-secondary" onclick="exportSave()">${uiIcon('upload')} Export Save</button>
          <button class="btn btn-secondary" onclick="document.getElementById('import-file').click()">${uiIcon('download')} Import Save</button>
        </div>
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
    case 'carlot':      renderCarLot();          break;
    case 'leasing':     renderLeasing();         break;
    case 'garage':      renderServiceGarage();   break;
    case 'forsale':     renderForSale();         break;
    case 'finance':     renderFinance();         break;
    case 'upgrades':    renderUpgrades();        break;
    case 'staff':       renderStaff();           break;
    case 'achievements':renderAchievements();    break;
    case 'settings':    renderSettings();        break;
  }
  _tutorialUpdateNextButton();
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
    case 'carlot':      renderCarLot();          break;
    case 'leasing':     renderLeasing();         break;
    case 'garage':      renderServiceGarage();   break;
    case 'forsale':     renderForSale();         break;
    case 'finance':     renderFinance();         break;
    case 'upgrades':    renderUpgrades();        break;
    case 'staff':       renderStaff();           break;
    case 'achievements':renderAchievements();    break;
    case 'settings':    renderSettings();        break;
  }
  playSfx('tab');
  _tutorialUpdateNextButton();
  // Remember the tab so a refresh returns to it
  if (getActiveSession()) setActiveSession(currentSlot, name);
}

// ============================================================
// TOAST
// ============================================================
function showToast(message, type = 'info', sfx = null) {
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
  // sfx lets callers pick a distinct, purpose-built sound (e.g. 'cash', 'hire',
  // 'achievement') instead of the generic tone for that toast's color/type.
  if (sfx) playSfx(sfx);
  else if (type === 'success') playSfx('success');
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
  playSfx('modalOpen');
}
function closeModal() {
  document.getElementById('modal').classList.add('hidden');
  playSfx('modalClose');
}

// ============================================================
// PATCH NOTES MODAL
// ============================================================
/** Render the patch notes content and show the popup modal. */
function showPatchNotesModal() {
  const latest = PATCH_NOTES[0];
  const TYPE_LABEL = { feature: '✨ New', balance: '⚖️ Balance', fix: '🔧 Fix' };
  const content = PATCH_NOTES.map(pn => `
    <div class="pn-version-block">
      <div class="pn-version-header">
        <span class="pn-version-tag">v${pn.version}</span>
        <span class="pn-version-date">${pn.date}</span>
      </div>
      <ul class="pn-list">
        ${pn.notes.map(n => `
          <li class="pn-item pn-type-${n.type}">
            <span class="pn-label">${TYPE_LABEL[n.type] || n.type}</span>
            ${n.text}
          </li>`).join('')}
      </ul>
    </div>`).join('');
  document.getElementById('patch-notes-content').innerHTML = content;
  document.getElementById('patch-notes-title').textContent = `📋 What's New in v${latest.version}`;
  document.getElementById('patch-notes-modal').classList.remove('hidden');
  playSfx('modalOpen');
}

/** Close the patch notes modal and mark this version as seen. */
function closePatchNotesModal() {
  document.getElementById('patch-notes-modal').classList.add('hidden');
  localStorage.setItem('dealerSim_lastSeenVersion', GAME_VERSION);
  playSfx('modalClose');
}

/** Render the compact patch notes panel on the home screen (collapsible). */
function renderMenuPatchNotes() {
  const latest = PATCH_NOTES[0];
  const TYPE_LABEL = { feature: '✨ New', balance: '⚖️ Balance', fix: '🔧 Fix' };
  const content = PATCH_NOTES.map(pn => `
    <div class="pn-version-block">
      <div class="pn-version-header">
        <span class="pn-version-tag">v${pn.version}</span>
        <span class="pn-version-date">${pn.date}</span>
      </div>
      <ul class="pn-list">
        ${pn.notes.map(n => `
          <li class="pn-item pn-type-${n.type}">
            <span class="pn-label">${TYPE_LABEL[n.type] || n.type}</span>
            ${n.text}
          </li>`).join('')}
      </ul>
    </div>`).join('');

  const wrapper = document.getElementById('menu-patch-notes');
  if (!wrapper) return;
  wrapper.innerHTML = `
    <button class="menu-changelog-btn" id="menu-changelog-toggle" onclick="toggleMenuChangelog()" aria-expanded="false" aria-controls="menu-changelog-body">
      <span class="menu-changelog-version">v${latest.version}</span>
      <span class="menu-changelog-label">Change Log</span>
      <span class="menu-changelog-arrow" id="menu-changelog-arrow">▼</span>
    </button>
    <div class="menu-changelog-body hidden" id="menu-changelog-body">
      <div class="menu-changelog-scroll patch-notes-content">${content}</div>
    </div>`;
}

function toggleMenuChangelog() {
  const body  = document.getElementById('menu-changelog-body');
  const arrow = document.getElementById('menu-changelog-arrow');
  const btn   = document.getElementById('menu-changelog-toggle');
  if (!body) return;
  const isOpen = !body.classList.contains('hidden');
  body.classList.toggle('hidden', isOpen);
  if (arrow) arrow.textContent = isOpen ? '▼' : '▲';
  if (btn)   btn.setAttribute('aria-expanded', String(!isOpen));
  playSfx('navigate');
}

/** Show the patch notes popup once per version after an update. */
function checkAndShowPatchNotes() {
  const lastSeen = localStorage.getItem('dealerSim_lastSeenVersion');
  if (lastSeen !== GAME_VERSION) {
    // Slight delay so the menu has finished rendering
    setTimeout(showPatchNotesModal, 300);
  }
}


let settings = {
  darkMode: false,
  difficulty: 'normal',
  sfxMuted: false,
  sfxVolume: 0.22,
  showLeasedCars: true,
  tutorialsEnabled: true,
};

// ============================================================
// SAVE SLOT MANAGEMENT
// ============================================================
/** Which slot (1–3) the active game session belongs to. */
let currentSlot = 1;

/** localStorage key for a given slot number. Slot 1 reuses the legacy key. */
function slotKey(slot) {
  return slot === 1 ? 'dealerSim_v1' : `dealerSim_slot_${slot}`;
}

/** Read the last-played slot from localStorage (defaults to 1). */
function getLastSlot() {
  return parseInt(localStorage.getItem('dealerSim_lastSlot') || '1', 10) || 1;
}

/** Persist the last-played slot. */
function setLastSlot(slot) {
  localStorage.setItem('dealerSim_lastSlot', String(slot));
}

// ── Active session tracking ─────────────────────────────────
// Remembers that a game is currently open (and which tab you were on) so a
// browser refresh drops you straight back into the game instead of the title
// screen. Cleared whenever you deliberately return to the menu.
const SESSION_KEY = 'dealerSim_activeSession';

/** Record (or update) the in-progress session. */
function setActiveSession(slot, tab) {
  try {
    const prev = getActiveSession() || {};
    localStorage.setItem(SESSION_KEY, JSON.stringify({
      slot: slot ?? prev.slot ?? 1,
      tab:  tab  ?? prev.tab  ?? 'dashboard',
    }));
  } catch (_) { /* storage unavailable — resume just won't work */ }
}

/** Read the in-progress session, or null if there isn't one. */
function getActiveSession() {
  try {
    const raw = localStorage.getItem(SESSION_KEY);
    if (!raw) return null;
    const d = JSON.parse(raw);
    const slot = parseInt(d.slot, 10);
    if (!(slot >= 1 && slot <= 3)) return null;
    return { slot, tab: typeof d.tab === 'string' ? d.tab : 'dashboard' };
  } catch (_) {
    return null;
  }
}

/** Forget the in-progress session (back at the title screen). */
function clearActiveSession() {
  try { localStorage.removeItem(SESSION_KEY); } catch (_) {}
}

/**
 * Return a summary object for a slot, or null if no save exists.
 * Summary: { money, day, cars }
 */
function getSlotSummary(slot) {
  try {
    const raw = localStorage.getItem(slotKey(slot));
    if (!raw) return null;
    const d = JSON.parse(raw);
    return {
      money:      d.cash ?? 0,
      day:        d.day  ?? 1,
      cars:       (d.garage ?? []).length,
      difficulty: d.difficulty ?? 'normal',
    };
  } catch (_) {
    return null;
  }
}

/** Delete all data for a slot. */
function deleteSlot(slot) {
  localStorage.removeItem(slotKey(slot));
  if (getLastSlot() === slot) {
    // Reassign lastSlot to the first existing slot, or 1 if none
    const next = [1, 2, 3].find(s => s !== slot && getSlotSummary(s) !== null) || 1;
    setLastSlot(next);
  }
}

let audioCtx = null;
let _audioUnlockBound = false;

// Each SFX is a short sequence of notes — {freq, dur, type, gain, delay, glide}.
// Multi-note sequences (arpeggios/chimes) read as distinct, purpose-built game sounds
// rather than a single generic beep, and every player action below maps to one of these.
const SFX = {
  click:       [{ freq: 600, dur: 0.035, type: 'square',   gain: 0.45 }],
  toggle:      [{ freq: 460, dur: 0.03,  type: 'triangle', gain: 0.4  },
                { freq: 620, dur: 0.04,  type: 'triangle', gain: 0.45, delay: 0.03 }],
  tab:         [{ freq: 480, dur: 0.03,  type: 'sine',     gain: 0.35 }],
  success:     [{ freq: 523.25, dur: 0.09, type: 'triangle', gain: 0.55 },
                { freq: 783.99, dur: 0.14, type: 'triangle', gain: 0.65, delay: 0.09 }],
  warning:     [{ freq: 330, dur: 0.09, type: 'sawtooth', gain: 0.5 },
                { freq: 262, dur: 0.13, type: 'sawtooth', gain: 0.45, delay: 0.10 }],
  error:       [{ freq: 220, dur: 0.10, type: 'square', gain: 0.55 },
                { freq: 164, dur: 0.17, type: 'square', gain: 0.5,  delay: 0.10 }],
  // "Cha-ching" — a quick bright ascending triple for cash landing in the till.
  cash:        [{ freq: 880,  dur: 0.05, type: 'square',   gain: 0.5,  glide: 1 },
                { freq: 1318.5, dur: 0.08, type: 'square',   gain: 0.6, delay: 0.05, glide: 1 },
                { freq: 1760, dur: 0.18, type: 'triangle', gain: 0.5,  delay: 0.12 }],
  // A rounder, lower two-note "thunk + chime" for spending cash on a purchase.
  purchase:    [{ freq: 349.23, dur: 0.06, type: 'sine',     gain: 0.5 },
                { freq: 523.25, dur: 0.11, type: 'triangle', gain: 0.55, delay: 0.06 }],
  // Friendly ascending three-note "welcome aboard" for hiring staff.
  hire:        [{ freq: 440,    dur: 0.07, type: 'sine', gain: 0.5 },
                { freq: 554.37, dur: 0.07, type: 'sine', gain: 0.5, delay: 0.07 },
                { freq: 659.25, dur: 0.15, type: 'sine', gain: 0.6, delay: 0.14 }],
  // Four-note ascending fanfare for achievement unlocks.
  achievement: [{ freq: 523.25,  dur: 0.08, type: 'triangle', gain: 0.55 },
                { freq: 659.25,  dur: 0.08, type: 'triangle', gain: 0.6,  delay: 0.08 },
                { freq: 783.99,  dur: 0.08, type: 'triangle', gain: 0.65, delay: 0.16 },
                { freq: 1046.50, dur: 0.24, type: 'triangle', gain: 0.75, delay: 0.24 }],
  // Soft two-note "ping" for deliveries and notifications.
  notify:      [{ freq: 740, dur: 0.06, type: 'sine', gain: 0.4 },
                { freq: 988, dur: 0.11, type: 'sine', gain: 0.45, delay: 0.09 }],
  // Very light, neutral tap layered under every button press across the whole
  // game (see bindGlobalClickSfx) so the UI has a consistent tactile feel.
  tap:         [{ freq: 720, dur: 0.022, type: 'sine', gain: 0.28 }],
  // Soft descending two-note "whoosh" for moving between menu panels/screens
  // (Play → Load, Settings → Back, closing a modal, etc.).
  navigate:    [{ freq: 520, dur: 0.035, type: 'sine', gain: 0.35 },
                { freq: 400, dur: 0.05,  type: 'sine', gain: 0.3,  delay: 0.03 }],
  // Low three-note rising "ignition" — plays whenever a game session is about
  // to begin (Play, resuming a save, creating a new save).
  start:       [{ freq: 110, dur: 0.08, type: 'sawtooth', gain: 0.3,  delay: 0,    glide: 1.5 },
                { freq: 165, dur: 0.10, type: 'sawtooth', gain: 0.4,  delay: 0.07, glide: 1.35 },
                { freq: 247, dur: 0.20, type: 'sawtooth', gain: 0.55, delay: 0.16, glide: 1.15 }],
  // Gentle rising two-note swell for a modal/dialog opening.
  modalOpen:   [{ freq: 440, dur: 0.05, type: 'triangle', gain: 0.32 },
                { freq: 587, dur: 0.06, type: 'triangle', gain: 0.4,  delay: 0.045 }],
  // Mirror of modalOpen, falling, for a modal/dialog closing.
  modalClose:  [{ freq: 587, dur: 0.045, type: 'triangle', gain: 0.32 },
                { freq: 440, dur: 0.06,  type: 'triangle', gain: 0.3,  delay: 0.035 }],
  // Short descending "trash" tone for deleting a save slot — distinct from
  // the harsher error/warning stingers used for gameplay problems.
  delete:      [{ freq: 380, dur: 0.07, type: 'square', gain: 0.4 },
                { freq: 250, dur: 0.11, type: 'square', gain: 0.4, delay: 0.06 }],
  // Single warm chime for each tutorial step advancing.
  tutorialStep:[{ freq: 660, dur: 0.05, type: 'sine', gain: 0.4 },
                { freq: 880, dur: 0.08, type: 'sine', gain: 0.45, delay: 0.045 }],
  // Very quiet, short low buzz — a gentle "not yet" when a blocked click is
  // nudged back onto the tutorial's highlighted step.
  denied:      [{ freq: 200, dur: 0.05, type: 'square', gain: 0.22 }],
  // Soft rising sweep marking a new day beginning.
  day:         [{ freq: 392, dur: 0.07, type: 'sine', gain: 0.35 },
                { freq: 523.25, dur: 0.09, type: 'sine', gain: 0.4, delay: 0.06 },
                { freq: 659.25, dur: 0.14, type: 'sine', gain: 0.45, delay: 0.13 }],
  // Somber descending three-note minor phrase for the Game Over screen.
  gameOver:    [{ freq: 392,    dur: 0.16, type: 'triangle', gain: 0.5 },
                { freq: 349.23, dur: 0.18, type: 'triangle', gain: 0.48, delay: 0.15 },
                { freq: 261.63, dur: 0.36, type: 'triangle', gain: 0.5,  delay: 0.32 }],
};

function loadSettings() {
  try {
    const raw = localStorage.getItem('dealerSim_settings');
    if (raw) settings = { ...settings, ...JSON.parse(raw) };
  } catch (_) {}
  if (settings.showLeasedCars === undefined) settings.showLeasedCars = true;
  if (settings.tutorialsEnabled === undefined) settings.tutorialsEnabled = true;
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
  playSfx('toggle');
}

function setDifficulty(level) {
  state.difficulty = level;
  syncLoanTermsToDifficulty();
  saveState();
  renderAll();
  playSfx('toggle');
}

function toggleSfxMuted() {
  settings.sfxMuted = !settings.sfxMuted;
  saveSettings();
  renderSettings();
  if (!settings.sfxMuted) playSfx('toggle'); // audible confirmation that sound is back on
}

function setSfxVolume(raw) {
  const vol = clamp(parseFloat(raw), 0, 1);
  settings.sfxVolume = isNaN(vol) ? 0.22 : vol;
  saveSettings();
  playSfx('click'); // audible preview of the new volume level
}

function toggleTutorials() {
  settings.tutorialsEnabled = !settings.tutorialsEnabled;
  saveSettings();
  renderSettings();
}

/**
 * Lazily creates the shared AudioContext and resumes it if the browser created
 * (or left) it suspended. Browsers only allow audio to start after a genuine
 * user gesture, and several code paths here (resuming a saved session on page
 * load, auto-opening a tab on launch) can trigger the very first playSfx call
 * before any click has happened — that silently parks the context in a
 * "suspended" state forever, which is why sound could stop working across the
 * whole site. Calling resume() defensively on every play (cheap/no-op once
 * running) fixes that permanently.
 */
function ensureAudioCtx() {
  try {
    if (!audioCtx) audioCtx = new (window.AudioContext || window.webkitAudioContext)();
    if (audioCtx.state === 'suspended') audioCtx.resume().catch(() => {});
  } catch (_) { return null; }
  return audioCtx;
}

/** Unlocks/resumes audio on the very first real user interaction with the page. */
function bindAudioUnlock() {
  if (_audioUnlockBound) return;
  _audioUnlockBound = true;
  const unlock = () => ensureAudioCtx();
  ['pointerdown', 'keydown', 'touchstart'].forEach(evt =>
    document.addEventListener(evt, unlock, { once: true, passive: true }));
}

function playSfx(kind = 'click') {
  if (settings.sfxMuted) return;
  const notes = SFX[kind];
  if (!notes) return;
  const ctx = ensureAudioCtx();
  if (!ctx) return;
  try {
    const baseVol = clamp(settings.sfxVolume ?? 0.22, 0, 1) * SFX_VOLUME_SCALE;
    notes.forEach(note => {
      const start = ctx.currentTime + (note.delay || 0);
      const end   = start + note.dur;
      const osc   = ctx.createOscillator();
      const gain  = ctx.createGain();
      osc.type = note.type || 'sine';
      osc.frequency.setValueAtTime(note.freq, start);
      osc.frequency.exponentialRampToValueAtTime(Math.max(80, note.freq * (note.glide ?? 0.92)), end);
      // Short attack/decay envelope: exponential ramps cannot start/end at 0, so we clamp to tiny floors to avoid pops.
      const peak = Math.max(SFX_FLOOR_GAIN, baseVol * (note.gain ?? 1));
      gain.gain.setValueAtTime(SFX_MIN_GAIN, start);
      gain.gain.exponentialRampToValueAtTime(peak, start + SFX_ATTACK_SECONDS);
      gain.gain.exponentialRampToValueAtTime(SFX_MIN_GAIN, end);
      osc.connect(gain);
      gain.connect(ctx.destination);
      osc.start(start);
      osc.stop(end + 0.02);
    });
  } catch (_) {}
}

/**
 * Global delegated "tap" sound for every button press across the whole game.
 * Rather than threading playSfx() into every individual onclick handler
 * (there are hundreds across factory/market/service/staff/etc.), one bubble
 * listener on the document gives every button in the game a consistent
 * tactile click — layered underneath any louder, purpose-built sound (cash,
 * hire, achievement...) a specific action already plays via showToast().
 * Menu, tutorial, and modal buttons are excluded here because they already
 * get bespoke navigate/start/modal sounds wired at their own call sites.
 */
const SFX_GLOBAL_TAP_SELECTOR = '.btn, .cheat-btn, .cheat-close-btn';
const SFX_GLOBAL_TAP_SKIP_SELECTOR =
  '.tab-btn, .toggle-btn, .menu-btn, .menu-back-btn, .menu-changelog-btn, ' +
  '.tutorial-btn-next, .tutorial-btn-skip, .tutorial-btn-disable, [disabled]';
function bindGlobalClickSfx() {
  document.addEventListener('click', (e) => {
    const el = e.target.closest(SFX_GLOBAL_TAP_SELECTOR);
    if (!el || el.disabled) return;
    if (el.closest(SFX_GLOBAL_TAP_SKIP_SELECTOR)) return;
    playSfx('tap');
  });
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
// HOME SCREEN
// ============================================================

/** Initialise and display the home screen; start the star-field animation. */
function initHomeScreen() {
  // ── Starfield ────────────────────────────────────────────
  const canvas  = document.getElementById('menu-stars');
  const ctx2d   = canvas.getContext('2d');
  let stars     = [];
  let rafId     = null;

  function resizeCanvas() {
    canvas.width  = window.innerWidth;
    canvas.height = window.innerHeight;
  }

  function makeStars(n) {
    stars = [];
    for (let i = 0; i < n; i++) {
      stars.push({
        x:     Math.random() * canvas.width,
        y:     Math.random() * canvas.height,
        r:     Math.random() * 1.4 + 0.3,
        alpha: Math.random() * 0.7 + 0.1,
        speed: Math.random() * 0.18 + 0.04,
        drift: (Math.random() - 0.5) * 0.12,
        twinkle: Math.random() * Math.PI * 2,
      });
    }
  }

  function drawStars() {
    ctx2d.clearRect(0, 0, canvas.width, canvas.height);
    for (const s of stars) {
      s.twinkle += 0.025;
      const a = s.alpha * (0.65 + 0.35 * Math.sin(s.twinkle));
      ctx2d.beginPath();
      ctx2d.arc(s.x, s.y, s.r, 0, Math.PI * 2);
      ctx2d.fillStyle = `rgba(255, 200, 140, ${a})`;
      ctx2d.fill();
      s.y -= s.speed;
      s.x += s.drift;
      if (s.y < -2) { s.y = canvas.height + 2; s.x = Math.random() * canvas.width; }
      if (s.x < -2) s.x = canvas.width + 2;
      if (s.x > canvas.width + 2) s.x = -2;
    }
    rafId = requestAnimationFrame(drawStars);
  }

  resizeCanvas();
  makeStars(160);
  drawStars();
  window.addEventListener('resize', () => { resizeCanvas(); makeStars(160); });

  // Store cancellation handle so we can stop when leaving the menu
  window._stopMenuStarfield  = () => { if (rafId) { cancelAnimationFrame(rafId); rafId = null; } };
  window._startMenuStarfield = () => { if (!rafId) { resizeCanvas(); makeStars(160); drawStars(); } };

  // ── Panel switching ──────────────────────────────────────
  function showMenuView(id) {
    document.querySelectorAll('#home-screen .menu-content').forEach(el => {
      const isTarget = el.id === id;
      el.classList.toggle('active', isTarget && el.classList.contains('menu-panel'));
      el.setAttribute('aria-hidden', el.id !== id ? 'true' : 'false');
      if (el.id === 'menu-view-main') {
        el.style.display = (id === 'menu-view-main') ? 'flex' : 'none';
      }
    });
  }

  // Show main view initially
  showMenuView('menu-view-main');

  // Render patch notes panel and check for version update
  renderMenuPatchNotes();
  checkAndShowPatchNotes();

  /** Switch to the load panel with freshly rendered slot cards. */
  function openLoadView() {
    renderSaveSlots();
    showMenuView('menu-view-load');
    playSfx('navigate');
  }

  // ── Button event listeners ───────────────────────────────
  document.getElementById('menu-btn-play').addEventListener('click', () => {
    const anyExists = [1, 2, 3].some(s => getSlotSummary(s) !== null);
    if (anyExists) {
      // Continue from last-played slot
      const last = getLastSlot();
      // Fall back to first existing slot if lastSlot save was deleted
      const slot = getSlotSummary(last) !== null ? last
        : ([1, 2, 3].find(s => getSlotSummary(s) !== null) || 1);
      playSfx('start');
      launchGame(slot, false);
    } else {
      // No saves — show difficulty picker for slot 1
      playSfx('navigate');
      showDifficultyPicker(1);
    }
  });

  document.getElementById('menu-btn-load').addEventListener('click', openLoadView);

  document.getElementById('menu-btn-settings').addEventListener('click', () => {
    syncMenuSettings();
    showMenuView('menu-view-settings');
    playSfx('navigate');
  });

  document.getElementById('menu-load-back').addEventListener('click', () => { showMenuView('menu-view-main'); playSfx('navigate'); });
  document.getElementById('menu-settings-back').addEventListener('click', () => { showMenuView('menu-view-main'); playSfx('navigate'); });

  // ── Delete confirmation dialog ───────────────────────────
  let pendingDeleteSlot = null;
  document.getElementById('menu-del-no').addEventListener('click', () => {
    document.getElementById('menu-delete-confirm').classList.add('hidden');
    pendingDeleteSlot = null;
    playSfx('navigate');
  });
  document.getElementById('menu-del-yes').addEventListener('click', () => {
    if (pendingDeleteSlot !== null) {
      deleteSlot(pendingDeleteSlot);
      pendingDeleteSlot = null;
    }
    document.getElementById('menu-delete-confirm').classList.add('hidden');
    playSfx('delete');
    openLoadView();
  });

  // Difficulty picker button listeners
  document.getElementById('diff-picker-prev').addEventListener('click', () => { diffPickerPrev(); playSfx('tab'); });
  document.getElementById('diff-picker-next').addEventListener('click', () => { diffPickerNext(); playSfx('tab'); });
  document.getElementById('diff-picker-cancel').addEventListener('click', () => { diffPickerCancel(); playSfx('navigate'); });
  document.getElementById('diff-picker-confirm').addEventListener('click', () => { playSfx('start'); diffPickerConfirm(); });

  // Expose slot deletion trigger for dynamically rendered cards
  window._confirmDeleteSlot = (slot) => {
    pendingDeleteSlot = slot;
    document.getElementById('menu-del-msg').textContent =
      `Save Slot ${slot} will be permanently deleted. This cannot be undone.`;
    document.getElementById('menu-delete-confirm').classList.remove('hidden');
    document.getElementById('menu-del-yes').focus();
    playSfx('warning');
  };
}

/** Format a dollar amount for the save-slot display. */
function fmtSlotMoney(n) {
  if (n >= 1_000_000) return '$' + (n / 1_000_000).toFixed(1) + 'M';
  if (n >= 1_000)     return '$' + (n / 1_000).toFixed(1) + 'K';
  return '$' + Math.round(n).toLocaleString();
}

// ============================================================
// DIFFICULTY PICKER — shown when creating a new save slot
// ============================================================
const DIFFICULTY_OPTIONS = [
  {
    key:  'easy',
    label: 'Easy',
    desc: 'Zero overhead costs, no loan interest, and no bankruptcy risk. Sit back and enjoy the dealership grind stress-free.',
  },
  {
    key:  'normal',
    label: 'Normal',
    desc: 'Standard overhead and market volatility. A balanced challenge for most players.',
  },
  {
    key:  'hard',
    label: 'Hard',
    desc: '1.5× overhead costs, higher loan APR, minimum principal payments, and bankruptcy ends the run permanently.',
  },
];

let _diffPickerSlot = null;
let _diffPickerIdx  = 1; // default to Normal

function showDifficultyPicker(slot) {
  _diffPickerSlot = slot;
  _diffPickerIdx  = 1; // reset to Normal each time
  _renderDiffPicker();
  document.getElementById('difficulty-picker-modal').classList.remove('hidden');
}

function _renderDiffPicker() {
  const opt = DIFFICULTY_OPTIONS[_diffPickerIdx];
  document.getElementById('diff-picker-option').textContent = opt.label;
  document.getElementById('diff-picker-desc').textContent   = opt.desc;
}

function diffPickerPrev() {
  _diffPickerIdx = (_diffPickerIdx - 1 + DIFFICULTY_OPTIONS.length) % DIFFICULTY_OPTIONS.length;
  _renderDiffPicker();
}

function diffPickerNext() {
  _diffPickerIdx = (_diffPickerIdx + 1) % DIFFICULTY_OPTIONS.length;
  _renderDiffPicker();
}

function diffPickerConfirm() {
  const chosen = DIFFICULTY_OPTIONS[_diffPickerIdx].key;
  document.getElementById('difficulty-picker-modal').classList.add('hidden');
  launchGame(_diffPickerSlot, true, chosen);
}

function diffPickerCancel() {
  document.getElementById('difficulty-picker-modal').classList.add('hidden');
}

/** Re-render the three save-slot cards into #save-slot-grid. */
function renderSaveSlots() {
  const grid    = document.getElementById('save-slot-grid');
  const lastSl  = getLastSlot();
  grid.innerHTML = '';

  for (let slot = 1; slot <= 3; slot++) {
    const summary = getSlotSummary(slot);
    const isLast  = summary !== null && slot === lastSl;
    const card    = document.createElement('div');
    card.className = 'save-slot-card' + (isLast ? ' last-played' : '');
    card.setAttribute('role', 'listitem');
    card.setAttribute('tabindex', '0');
    card.setAttribute('aria-label', summary
      ? `Save Slot ${slot}: Day ${summary.day}, ${fmtSlotMoney(summary.money)}, ${summary.cars} car${summary.cars !== 1 ? 's' : ''}${isLast ? ', last played' : ''}`
      : `Save Slot ${slot}: Empty — start new game`);

    if (summary) {
      const diffLabel = summary.difficulty === 'hard' ? '💪 Hard' : summary.difficulty === 'easy' ? '😎 Easy' : '🎮 Normal';
      card.innerHTML = `
        ${isLast ? '<span class="slot-last-badge">Last Played</span>' : ''}
        <div class="slot-label">Save Slot ${slot}</div>
        <div class="slot-icon">🚗</div>
        <div class="slot-name">Day ${summary.day}</div>
        <div class="slot-stats">
          <div class="slot-stat-row"><span>💰 Money</span><span>${fmtSlotMoney(summary.money)}</span></div>
          <div class="slot-stat-row"><span>📅 Days</span><span>${summary.day}</span></div>
          <div class="slot-stat-row"><span>🚘 Cars</span><span>${summary.cars}</span></div>
          <div class="slot-stat-row"><span>⚙️ Difficulty</span><span>${diffLabel}</span></div>
        </div>
        <button class="slot-delete-btn" aria-label="Delete Save Slot ${slot}"
          onclick="event.stopPropagation(); window._confirmDeleteSlot(${slot})">🗑 Delete</button>
      `;
      const activateExisting = () => { playSfx('start'); launchGame(slot, false); };
      card.addEventListener('click', activateExisting);
      card.addEventListener('keydown', e => { if (e.key === 'Enter' || e.key === ' ') { e.preventDefault(); activateExisting(); } });
    } else {
      card.innerHTML = `
        <div class="slot-label">Save Slot ${slot}</div>
        <div class="slot-icon" style="font-size:2.8rem;opacity:.55;">＋</div>
        <div class="slot-name" style="opacity:.6;">Empty</div>
        <div class="slot-cta">Create Save</div>
      `;
      const activateNew = () => { playSfx('navigate'); showDifficultyPicker(slot); };
      card.addEventListener('click', activateNew);
      card.addEventListener('keydown', e => { if (e.key === 'Enter' || e.key === ' ') { e.preventDefault(); activateNew(); } });
    }

    grid.appendChild(card);
  }
}

/**
 * Synchronise the menu settings toggles with current in-memory settings.
 * Called each time the settings panel is opened.
 */
function syncMenuSettings() {
  const setToggle = (id, active) => {
    const btn = document.getElementById(id);
    if (!btn) return;
    btn.classList.toggle('active', !!active);
    btn.querySelector('.toggle-thumb').style.transform = active ? 'translateX(22px)' : '';
  };
  setToggle('menu-toggle-dark',      settings.darkMode);
  setToggle('menu-toggle-sfx',       !settings.sfxMuted);
  setToggle('menu-toggle-tutorials', settings.tutorialsEnabled);
}

/** Toggle dark mode from the home-screen settings panel. */
function menuToggleDark() {
  settings.darkMode = !settings.darkMode;
  applyDarkMode();
  saveSettings();
  syncMenuSettings();
  playSfx('toggle');
}

/** Toggle SFX from the home-screen settings panel. */
function menuToggleSfx() {
  settings.sfxMuted = !settings.sfxMuted;
  saveSettings();
  syncMenuSettings();
  if (!settings.sfxMuted) playSfx('toggle'); // audible confirmation that sound is back on
}

/** Toggle tutorials from the home-screen settings panel. */
function menuToggleTutorials() {
  settings.tutorialsEnabled = !settings.tutorialsEnabled;
  saveSettings();
  syncMenuSettings();
  playSfx('toggle');
}

/** Set difficulty from the home-screen settings panel — kept for backward compat but no longer wired to any UI. */
function menuSetDifficulty(_level) {
  // Difficulty is now locked per save slot; this is a no-op.
}

// ============================================================
// TUTORIAL ENGINE
// ============================================================
/**
 * Step definitions for the new-save onboarding tutorial.
 * Each step has:
 *   - message    : instruction text shown in the tooltip
 *   - target     : CSS selector (or a function returning one, for a dynamically
 *                  chosen element) of the element to spotlight. null = no
 *                  spotlight, centered modal.
 *   - allowed    : optional array of selectors/selector-functions the player is
 *                  permitted to click while this step is showing. Defaults to
 *                  [target]. Everything else in the game is click-blocked while
 *                  the tutorial is active, so the player can't wander off-script.
 *   - tab        : optional tab id to auto-switch to before showing the step
 *   - noAutoTab  : if true, don't auto-switch; user must navigate themselves
 *   - isComplete : optional predicate — Next is disabled until this returns true
 *   - onEnter    : optional side-effect run every time the step is (re)shown,
 *                  e.g. to pick a recommended car and pre-select it in a picker
 */

/** Pick the cheapest currently-orderable factory car — the recommended first buy. */
function _tutorialPickRecommendedFactoryCar() {
  let best = null;
  for (let i = 0; i < CAR_CATALOG.length; i++) {
    const entry = CAR_CATALOG[i];
    if (entry.discontinued) continue;
    if (!best || (entry.basePrice ?? Infinity) < best.basePrice) best = { ...entry, idx: i };
  }
  return best;
}

/** Pick a sensible recommended Used Market offer — affordable, clean title preferred, cheapest. */
function _tutorialPickRecommendedUsedOffer() {
  const offers = state.usedMarketOffers || [];
  if (!offers.length) return null;
  const priceOf = o => o.sellerCounter ?? o.askingPrice;
  const affordable = offers.filter(o => priceOf(o) <= state.cash);
  const pool = affordable.length ? affordable : offers;
  return [...pool].sort((a, b) => {
    const aClean = a.titleStatus === 'clean' ? 0 : 1;
    const bClean = b.titleStatus === 'clean' ? 0 : 1;
    if (aClean !== bClean) return aClean - bClean;
    return priceOf(a) - priceOf(b);
  })[0] || null;
}

function getTutorialSteps() {
  const getActiveTab = () => document.querySelector('.tab-btn.active')?.dataset?.tab ?? null;
  const initialDeliveryCount = (state.deliveries    || []).length;
  const initialGarageCount   = (state.garage         || []).length;
  const initialSalesCount    = (state.salesHistory   || []).length;
  const initialUsedOwnedCount= (state.garage         || []).filter(c => c.source === 'used').length;

  return [
    {
      // Step 0: Welcome — no spotlight, centered modal
      message: '👋 Welcome to DealerSim! This walkthrough covers buying a factory car, listing it for sale, and buying from the Used Market — everything you need for your first flip.\n\nWhile the tutorial is running, only the glowing highlighted element will respond to clicks. Follow the glow!',
      target: null,
      tab: null,
    },
    {
      // Step 1: Navigate to Factory — user must click the tab themselves
      message: '🏭 First, head to the Factory tab — click it now in the navigation bar. You\'ll order a brand-new car direct from the manufacturer.',
      target: '.tab-btn[data-tab="factory"]',
      tab: null,
      noAutoTab: true,
      isComplete: () => getActiveTab() === 'factory',
    },
    {
      // Step 2: Order the recommended (cheapest) car — pre-selected and spotlighted directly
      message: '🚗 This is highlighted for a reason: it\'s the cheapest car in the factory, so it ties up the least cash, and during the tutorial it arrives in just 1 day. A great, low-risk first flip. Click "Order" to buy it.',
      target: () => {
        const rec = _tutorialPickRecommendedFactoryCar();
        return rec ? `.car-card[data-car-idx="${rec.idx}"]` : '#tab-factory';
      },
      allowed: () => {
        const rec = _tutorialPickRecommendedFactoryCar();
        return rec ? [`.car-card[data-car-idx="${rec.idx}"] .btn-primary`] : ['#tab-factory'];
      },
      tab: 'factory',
      onEnter: () => {
        const rec = _tutorialPickRecommendedFactoryCar();
        if (rec) {
          factorySelection = { make: rec.make, model: rec.model };
          renderFactory();
        }
      },
      isComplete: () => (state.deliveries || []).length > initialDeliveryCount,
    },
    {
      // Step 3: Wait for delivery — press Next Day
      message: '📦 Your car is on its way and will arrive tomorrow! Click the glowing "Next Day" button in the top bar to advance time. (That\'s the game\'s day-advance button — different from this tutorial box\'s "Continue" button.)',
      target: '#btn-next-day',
      tab: 'dashboard',
      isComplete: () => (state.garage || []).length > initialGarageCount,
    },
    {
      // Step 4: Navigate to Car Lot — user must click the tab themselves
      message: '🔑 Great — your car has arrived! Head to the Car Lot tab now to see your new vehicle.',
      target: '.tab-btn[data-tab="carlot"]',
      tab: null,
      noAutoTab: true,
      isComplete: () => getActiveTab() === 'carlot',
    },
    {
      // Step 5: Mark for Sale — spotlight the exact car the player just bought
      message: '🏷️ Here\'s your new car. Click "Mark for Sale" to list it — DealerSim automatically prices it at fair Market Value, which is exactly the sweet spot for a quick sale. No need to touch the price for this first one.',
      target: () => _tutorialCarId ? `.car-card[data-car-id="${_tutorialCarId}"]` : '#tab-carlot',
      allowed: () => _tutorialCarId ? [`.car-card[data-car-id="${_tutorialCarId}"] .mark-for-sale-btn`] : ['#tab-carlot'],
      tab: 'carlot',
      isComplete: () => (state.garage || []).some(c => c.id === _tutorialCarId && c.isForSale && c.listPrice > 0),
    },
    {
      // Step 6: Press Next Day until sold (tutorial forces instant sale if price is fair)
      message: '⏩ Press "Next Day" again. Since your price is right at Market Value, the car will sell instantly! 🎉',
      target: '#btn-next-day',
      tab: 'forsale',
      tutorialForceSale: true,
      isComplete: () => (state.salesHistory || []).length > initialSalesCount,
    },
    {
      // Step 7: Recap / bridge into Used Market — no spotlight
      message: '🎉 Sold! That\'s a complete flip: buy low, list smart, sell fast. Factory cars are only one way to stock your lot, though — next, let\'s buy a car the other way: from a private seller on the Used Market.',
      target: null,
      tab: null,
    },
    {
      // Step 8: Navigate to Used Market — user must click the tab themselves
      message: '🚙 Click the "Used Market" tab. Private sellers list cars here — often for less than a factory car, but they can hide issues, so it pays to look closely.',
      target: '.tab-btn[data-tab="usedmarket"]',
      tab: null,
      noAutoTab: true,
      isComplete: () => getActiveTab() === 'usedmarket',
    },
    {
      // Step 9: Buy the recommended used car — spotlight the exact offer card
      message: '🔍 This listing is highlighted because it\'s a solid, affordable deal. Two optional tools first: "Inspect" reveals hidden mechanical issues before you commit, and the offer box lets you negotiate a lower price. Neither is required — when you\'re ready, click "Buy" to add this car to your lot.',
      target: () => {
        const rec = _tutorialPickRecommendedUsedOffer();
        return rec ? `.car-card[data-offer-id="${rec.id}"]` : '#tab-usedmarket';
      },
      allowed: () => {
        const rec = _tutorialPickRecommendedUsedOffer();
        return rec
          ? [`.car-card[data-offer-id="${rec.id}"] .btn-success`, `.car-card[data-offer-id="${rec.id}"] .btn-secondary`]
          : ['#tab-usedmarket'];
      },
      tab: 'usedmarket',
      onEnter: () => { renderUsedMarket(); },
      isComplete: () => (state.garage || []).filter(c => c.source === 'used').length > initialUsedOwnedCount,
    },
    {
      // Step 10: Finish — no spotlight, points toward the rest of the game
      message: '🏁 You\'re all set! You now know how to buy from the Factory, buy Used, and list cars for sale. From here, check out Service (repairs & detailing), Finance (loans), Staff, Upgrades, and Achievements to grow your dealership. Good luck!',
      target: null,
      tab: null,
    },
  ];
}

let _tutorialStep = -1;
let _tutorialSteps = [];
/** ID of the car ordered during the tutorial, used to force an instant sale. */
let _tutorialCarId = null;
/** Timestamp of the last "blocked click" nudge, so we don't spam toasts. */
let _tutorialLastNudge = 0;

/** Resolve a step's target/allowed entry, which may be a plain selector or a function returning one. */
function _tutorialResolveSelector(sel) {
  return typeof sel === 'function' ? sel() : sel;
}

/** The set of concrete CSS selectors the player is currently permitted to click. */
function _tutorialAllowedSelectors(step) {
  if (!step) return [];
  const raw = step.allowed || (step.target ? [step.target] : []);
  return raw.map(_tutorialResolveSelector).filter(Boolean);
}

/** Briefly pulse the spotlight/tooltip and (throttled) toast, to redirect a stray click. */
function _tutorialNudge() {
  const spotlight = document.getElementById('tutorial-spotlight');
  const tooltip   = document.getElementById('tutorial-tooltip');
  [spotlight, tooltip].forEach(el => {
    if (!el) return;
    el.classList.remove('tutorial-nudge');
    void el.offsetWidth; // restart the CSS animation
    el.classList.add('tutorial-nudge');
    // Drop the class once the one-shot nudge animation finishes, so the
    // spotlight's own idle "breathing" glow animation resumes afterward.
    setTimeout(() => el.classList.remove('tutorial-nudge'), 500);
  });
  const now = Date.now();
  if (now - _tutorialLastNudge > 1500) {
    _tutorialLastNudge = now;
    showToast('Follow the highlighted step to continue the tutorial.', 'info', 'denied');
  }
}

/**
 * Global click gate: while the tutorial is active, only the current step's
 * allowed element(s) — plus the tutorial box itself and a few permanent escape
 * hatches — may be clicked. Everything else is blocked so players can't wander
 * off-script and end up confused (or with a misplaced spotlight).
 */
function _tutorialClickGate(e) {
  if (_tutorialStep < 0 || !_tutorialSteps.length) return;
  const alwaysAllowed = ['#tutorial-overlay', '#btn-return-menu', '#modal', '#cheat-menu-overlay', '#cheat-password-overlay', '#game-over-screen'];
  for (const sel of alwaysAllowed) {
    const el = document.querySelector(sel);
    if (el && !el.classList.contains('hidden') && el.contains(e.target)) return;
  }
  const step = _tutorialSteps[_tutorialStep];
  const selectors = _tutorialAllowedSelectors(step);
  for (const sel of selectors) {
    try { if (e.target.closest(sel)) return; } catch (_) { /* ignore invalid selector */ }
  }
  // Not an allowed interaction for this step — block it and nudge the player back.
  e.preventDefault();
  e.stopPropagation();
  e.stopImmediatePropagation();
  _tutorialNudge();
}

/** Bound reposition handler stored so it can be removed when tutorial ends. */
let _tutorialRepositionPending = false;
function _tutorialReposition() {
  if (_tutorialStep < 0 || !_tutorialSteps.length) return;
  // Throttle to one reposition per animation frame to avoid flooding on fast scroll
  if (_tutorialRepositionPending) return;
  _tutorialRepositionPending = true;
  requestAnimationFrame(() => {
    _tutorialRepositionPending = false;
    if (_tutorialStep < 0 || !_tutorialSteps.length) return;
    const step     = _tutorialSteps[_tutorialStep];
    const overlay  = document.getElementById('tutorial-overlay');
    const spotlight= document.getElementById('tutorial-spotlight');
    const tooltip  = document.getElementById('tutorial-tooltip');
    if (!overlay || !spotlight || !tooltip) return;
    // Suppress CSS transitions during scroll/resize repositioning for instant update
    spotlight.style.transition = 'none';
    _tutorialPositionSpotlight(step, overlay, spotlight, tooltip);
    // Re-enable transitions after the paint so tab-switch animations still work
    requestAnimationFrame(() => { spotlight.style.transition = ''; });
  });
}

/** Start the tutorial from step 0. */
function tutorialStart() {
  _tutorialSteps = getTutorialSteps();
  _tutorialStep = 0;
  playSfx('notify');
  _tutorialShowStep();
  // Keep spotlight + tooltip aligned whenever layout changes
  window.addEventListener('scroll', _tutorialReposition, { passive: true, capture: true });
  window.addEventListener('resize', _tutorialReposition, { passive: true });
  window.addEventListener('orientationchange', _tutorialReposition, { passive: true });
  // Gate clicks so only the highlighted element (plus the tutorial box) responds
  document.addEventListener('click', _tutorialClickGate, true);
}

/** Advance to the next tutorial step, or finish if done. */
function tutorialNext() {
  const step = _tutorialSteps[_tutorialStep];
  if (step && step.isComplete && !step.isComplete()) return; // guard: not yet complete
  _tutorialStep++;
  if (_tutorialStep >= _tutorialSteps.length) {
    playSfx('achievement'); // finished the whole tutorial — celebratory fanfare
    tutorialEnd();
  } else {
    playSfx('tutorialStep');
    _tutorialShowStep();
  }
}

/** Skip the tutorial entirely for this session. */
function tutorialSkip() {
  playSfx('navigate');
  tutorialEnd();
}

/** Disable tutorials permanently and close the overlay. */
function tutorialDisable() {
  settings.tutorialsEnabled = false;
  saveSettings();
  tutorialEnd();
  showToast('Tutorials disabled. You can re-enable them in Settings.', 'info');
}

/** Hide the tutorial overlay and clean up. */
function tutorialEnd() {
  const overlay = document.getElementById('tutorial-overlay');
  if (overlay) overlay.classList.add('hidden');
  _tutorialStep = -1;
  _tutorialSteps = [];
  _tutorialCarId = null;
  // Remove layout-change listeners registered by tutorialStart()
  window.removeEventListener('scroll', _tutorialReposition, { capture: true });
  window.removeEventListener('resize', _tutorialReposition);
  window.removeEventListener('orientationchange', _tutorialReposition);
  document.removeEventListener('click', _tutorialClickGate, true);
}

/** Enable/disable the Next button based on the current step's completion predicate, and keep the spotlight in sync. */
function _tutorialUpdateNextButton() {
  if (_tutorialStep < 0 || !_tutorialSteps.length) return;
  const btnNext = document.getElementById('tutorial-btn-next');
  if (!btnNext) return;
  const step = _tutorialSteps[_tutorialStep];
  const complete = !step || !step.isComplete || step.isComplete();
  btnNext.disabled = !complete;
  // Re-position the spotlight any time state/layout may have changed (new render,
  // tab switch, price edit, etc.) so it never lags behind the actual target.
  const overlay   = document.getElementById('tutorial-overlay');
  const spotlight = document.getElementById('tutorial-spotlight');
  const tooltip   = document.getElementById('tutorial-tooltip');
  if (overlay && spotlight && tooltip && step) {
    _tutorialPositionSpotlight(step, overlay, spotlight, tooltip);
  }
}

/** Render and position the current tutorial step. */
function _tutorialShowStep() {
  const overlay   = document.getElementById('tutorial-overlay');
  const spotlight = document.getElementById('tutorial-spotlight');
  const tooltip   = document.getElementById('tutorial-tooltip');
  const stepLabel = document.getElementById('tutorial-step-label');
  const message   = document.getElementById('tutorial-message');
  const btnNext   = document.getElementById('tutorial-btn-next');
  if (!overlay) return;

  overlay.classList.remove('hidden', 'no-target');

  const step   = _tutorialSteps[_tutorialStep];
  const isLast = _tutorialStep === _tutorialSteps.length - 1;

  stepLabel.textContent = `Step ${_tutorialStep + 1} of ${_tutorialSteps.length}`;
  message.textContent   = step.message;
  btnNext.textContent   = isLast ? 'Finish ✓' : 'Continue ▶';

  // Switch to the required tab only when the step doesn't require user navigation
  if (step.tab && !step.noAutoTab) {
    switchTab(step.tab);
  }

  // Run any step-specific setup (e.g. pre-selecting a recommended car) now that
  // the right tab is showing, so the spotlight below targets the final DOM.
  if (step.onEnter) step.onEnter();

  // Update Next button state immediately
  _tutorialUpdateNextButton();

  // Position spotlight and tooltip after a short tick so the tab renders
  requestAnimationFrame(() => {
    requestAnimationFrame(() => {
      _tutorialPositionSpotlight(step, overlay, spotlight, tooltip);
    });
  });
}

/** Position the spotlight around the target element and place the tooltip nearby. */
function _tutorialPositionSpotlight(step, overlay, spotlight, tooltip) {
  const PADDING  = 6;
  const MARGIN   = 8;   // min gap from viewport edge
  const GAP      = 12;  // gap between target and tooltip
  const targetSel= _tutorialResolveSelector(step.target);
  const target   = targetSel ? document.querySelector(targetSel) : null;
  const vw       = window.innerWidth;
  const vh       = window.innerHeight;
  // Use 92vw as the upper bound so we never clip on phones
  const maxW     = Math.min(Math.floor(vw * 0.92), 420);
  const maxH     = Math.min(520, vh * 0.70);

  // Apply safe max dimensions
  tooltip.style.maxWidth  = `${maxW}px`;
  tooltip.style.maxHeight = `${maxH}px`;
  tooltip.style.overflowY = 'auto';

  if (target) {
    // If the target is off-screen, scroll it into view instantly (not smooth, to
    // avoid a race condition where the scroll event fires _tutorialReposition
    // before the element has reached its final position).
    const rect0 = target.getBoundingClientRect();
    if (rect0.bottom < 0 || rect0.top > vh || rect0.right < 0 || rect0.left > vw) {
      target.scrollIntoView({ behavior: 'instant', block: 'center', inline: 'nearest' });
    }

    overlay.classList.remove('no-target');
    const rect = target.getBoundingClientRect();

    // Spotlight box — position: fixed so it stays anchored to the viewport coordinate
    spotlight.style.top    = `${rect.top    - PADDING}px`;
    spotlight.style.left   = `${rect.left   - PADDING}px`;
    spotlight.style.width  = `${rect.width  + PADDING * 2}px`;
    spotlight.style.height = `${rect.height + PADDING * 2}px`;

    // Temporarily hide to measure actual dimensions without visual flicker,
    // then restore visibility once positioning is computed.
    tooltip.style.visibility = 'hidden';
    tooltip.style.top  = '0px';
    tooltip.style.left = '0px';
    tooltip.style.transform = '';
    const tooltipH = tooltip.offsetHeight || 160;
    const tooltipW = Math.min(tooltip.offsetWidth || maxW, maxW);
    tooltip.style.visibility = '';

    const spaceBelow = vh - rect.bottom - GAP - PADDING;
    const spaceAbove = rect.top - GAP - PADDING;

    const placeBelow = spaceBelow >= tooltipH || spaceBelow >= spaceAbove;
    let topPos;
    if (placeBelow) {
      topPos = rect.bottom + PADDING + GAP;
      tooltip.classList.remove('arrow-down');
      tooltip.classList.add('arrow-up');
    } else {
      topPos = rect.top - PADDING - GAP - tooltipH;
      tooltip.classList.remove('arrow-up');
      tooltip.classList.add('arrow-down');
    }

    // Clamp vertically so tooltip stays within viewport
    topPos = Math.max(MARGIN, Math.min(topPos, vh - tooltipH - MARGIN));

    // Re-check: if clamping caused the tooltip to overlap the target, try the other side
    const targetTop    = rect.top    - PADDING;
    const targetBottom = rect.bottom + PADDING;
    const overlaps = (topPos < targetBottom + GAP) && (topPos + tooltipH > targetTop - GAP);
    if (overlaps) {
      let altTopPos;
      if (placeBelow) {
        // Try above instead
        altTopPos = rect.top - PADDING - GAP - tooltipH;
        const altClamped = Math.max(MARGIN, Math.min(altTopPos, vh - tooltipH - MARGIN));
        const altOverlaps = (altClamped < targetBottom + GAP) && (altClamped + tooltipH > targetTop - GAP);
        if (!altOverlaps) {
          topPos = altClamped;
          tooltip.classList.remove('arrow-up');
          tooltip.classList.add('arrow-down');
        } else {
          // No good side — hide arrow and pin away from target
          tooltip.classList.remove('arrow-up', 'arrow-down');
          topPos = targetBottom + GAP < vh / 2
            ? Math.max(MARGIN, targetBottom + GAP)
            : Math.min(vh - tooltipH - MARGIN, targetTop - GAP - tooltipH);
          topPos = Math.max(MARGIN, Math.min(topPos, vh - tooltipH - MARGIN));
        }
      } else {
        // Try below instead
        altTopPos = rect.bottom + PADDING + GAP;
        const altClamped = Math.max(MARGIN, Math.min(altTopPos, vh - tooltipH - MARGIN));
        const altOverlaps = (altClamped < targetBottom + GAP) && (altClamped + tooltipH > targetTop - GAP);
        if (!altOverlaps) {
          topPos = altClamped;
          tooltip.classList.remove('arrow-down');
          tooltip.classList.add('arrow-up');
        } else {
          tooltip.classList.remove('arrow-up', 'arrow-down');
          topPos = Math.max(MARGIN, Math.min(altClamped, vh - tooltipH - MARGIN));
        }
      }
    }

    // Horizontal: align centre with target, clamp to viewport
    const targetCenterX = rect.left + rect.width / 2;
    let leftPos = targetCenterX - tooltipW / 2;
    leftPos = Math.max(MARGIN, Math.min(leftPos, vw - tooltipW - MARGIN));

    tooltip.style.top       = `${topPos}px`;
    tooltip.style.left      = `${leftPos}px`;
    tooltip.style.transform = '';

    // Position the arrow to point at the target's horizontal centre
    const arrowOffset = Math.round(
      Math.max(16, Math.min(targetCenterX - leftPos - 8, tooltipW - 24))
    );
    tooltip.style.setProperty('--arrow-offset', `${arrowOffset}px`);

  } else {
    // No target — centered modal with no arrow; position: fixed handles viewport centering
    overlay.classList.add('no-target');
    spotlight.style.width  = '0';
    spotlight.style.height = '0';
    tooltip.classList.remove('arrow-up', 'arrow-down');
    // Centre explicitly in pixels so it's immune to animation fill-mode conflicts
    const tooltipW = Math.min(tooltip.offsetWidth || maxW, maxW);
    const tooltipH = tooltip.offsetHeight || 160;
    tooltip.style.top       = `${Math.round((vh - tooltipH) / 2)}px`;
    tooltip.style.left      = `${Math.round((vw - tooltipW) / 2)}px`;
    tooltip.style.transform = '';
  }
}

/**
 * Hide the home screen and start the game session in the given slot.
 * @param {number} slot  1–3
 * @param {boolean} isNew  true → create a fresh game; false → load existing save
 */
function launchGame(slot, isNew, difficulty, opts = {}) {
  currentSlot = slot;
  setLastSlot(slot);
  setActiveSession(slot, opts.resumeTab || 'dashboard');

  if (isNew) {
    state = JSON.parse(JSON.stringify(DEFAULT_STATE));
    state.difficulty = difficulty || 'normal';
    syncLoanTermsToDifficulty();
    state.usedMarketOffers = generateUsedMarket();
    saveState();
  } else {
    if (!loadState(slot)) {
      // Slot was empty (race-condition safety) — start fresh with normal difficulty
      state = JSON.parse(JSON.stringify(DEFAULT_STATE));
      state.difficulty = 'normal';
      syncLoanTermsToDifficulty();
      state.usedMarketOffers = generateUsedMarket();
      saveState();
    }
    // loadState() calls syncLoanTermsToDifficulty() internally when a save exists
  }

  runAchievementChecks();
  ensureStaffCandidates();
  renderAll();

  // Stop star animation
  if (window._stopMenuStarfield) window._stopMenuStarfield();

  const hs = document.getElementById('home-screen');

  // Resuming after a page refresh — skip the fade so the menu never flashes.
  if (opts.instant) {
    hs.classList.add('hidden');
    if (opts.resumeTab) switchTab(opts.resumeTab);
    return;
  }

  // Fade out and hide the home screen
  hs.classList.add('fade-out');
  setTimeout(() => {
    hs.classList.add('hidden');
    // Auto-start tutorial for new saves if tutorials are enabled
    if (isNew && settings.tutorialsEnabled) {
      tutorialStart();
    }
  }, 450);
}

// ============================================================
// RETURN TO MENU
// ============================================================
/** Save state and return to the main menu / home screen. */
function returnToMenu() {
  // Leaving mid-tutorial — clean up its overlay/listeners so nothing lingers
  // into the home screen or the next game session.
  if (_tutorialStep >= 0) tutorialEnd();
  // Persist current progress before leaving the game
  saveState();
  // Deliberately leaving the game — a refresh from here should show the menu
  clearActiveSession();
  playSfx('navigate');

  // Restore home screen
  const hs = document.getElementById('home-screen');
  hs.classList.remove('hidden');
  // Force reflow so the opacity transition fires
  void hs.offsetWidth;
  hs.classList.remove('fade-out');

  // Show the main menu panel, hide sub-panels
  document.querySelectorAll('#home-screen .menu-content').forEach(el => {
    const isMain = el.id === 'menu-view-main';
    if (el.classList.contains('menu-panel')) el.classList.remove('active');
    el.setAttribute('aria-hidden', isMain ? 'false' : 'true');
    if (el.id === 'menu-view-main') el.style.display = 'flex';
  });

  // Restart the star animation
  if (window._startMenuStarfield) window._startMenuStarfield();

  // Re-render the patch notes panel (content is always up-to-date)
  renderMenuPatchNotes();
}

// ============================================================
// INIT
// ============================================================
// ============================================================
// SECRET CHEAT / DEBUG MENU
// ------------------------------------------------------------
// Opened with the backtick/tilde key ( ` ) while in an active
// game (not on the home screen, not while typing in a field),
// gated behind a simple password prompt. Intended for local
// testing only — this is NOT real security, just a soft gate
// so the menu doesn't show up by accident.
// ============================================================
const CHEAT_PASSWORD = 'showmethemoney';

function _cheatInGame() {
  const home = document.getElementById('home-screen');
  return home && (home.classList.contains('hidden') || home.style.display === 'none');
}

function openCheatPasswordPrompt() {
  const overlay = document.getElementById('cheat-password-overlay');
  const input   = document.getElementById('cheat-password-input');
  const error   = document.getElementById('cheat-password-error');
  error.classList.add('hidden');
  input.value = '';
  overlay.classList.remove('hidden');
  setTimeout(() => input.focus(), 30);
}

function closeCheatPasswordPrompt() {
  document.getElementById('cheat-password-overlay').classList.add('hidden');
}

function submitCheatPassword() {
  const input = document.getElementById('cheat-password-input');
  const error = document.getElementById('cheat-password-error');
  if (input.value.trim().toLowerCase() === CHEAT_PASSWORD) {
    closeCheatPasswordPrompt();
    openCheatMenu();
  } else {
    error.classList.remove('hidden');
    input.value = '';
    input.focus();
  }
}

function openCheatMenu() {
  renderCheatMenu();
  document.getElementById('cheat-menu-overlay').classList.remove('hidden');
}

function closeCheatMenu() {
  document.getElementById('cheat-menu-overlay').classList.add('hidden');
}

function renderCheatMenu() {
  const body = document.getElementById('cheat-menu-body');
  if (!body) return;
  body.innerHTML = `
    <p class="cheat-note">⚠️ Debug tools for local testing. Changes are saved to your current game immediately.</p>
    <div class="cheat-stats-row">
      <div class="cheat-stat-chip">Cash: <b>${formatCurrency(state.cash)}</b></div>
      <div class="cheat-stat-chip">Day: <b>${state.day}</b></div>
      <div class="cheat-stat-chip">Reputation: <b>${state.reputation.toFixed(2)}</b></div>
      <div class="cheat-stat-chip">Garage: <b>${state.garage.length}/${state.garageSlots}</b></div>
      <div class="cheat-stat-chip">Loan: <b>${formatCurrency(state.loanBalance)}</b></div>
    </div>

    <div class="cheat-section">
      <p class="cheat-section-title">💰 Money</p>
      <div class="cheat-grid">
        <button class="cheat-btn cheat-btn-success" onclick="cheatAddMoney(1000)">+$1,000</button>
        <button class="cheat-btn cheat-btn-success" onclick="cheatAddMoney(10000)">+$10,000</button>
        <button class="cheat-btn cheat-btn-success" onclick="cheatAddMoney(100000)">+$100,000</button>
        <button class="cheat-btn cheat-btn-danger" onclick="cheatAddMoney(-10000)">−$10,000</button>
      </div>
      <div class="cheat-inline-row" style="margin-top:8px;">
        <input type="number" id="cheat-money-input" placeholder="Exact amount" />
        <button class="cheat-btn" onclick="cheatSetMoneyFromInput()">Set Cash</button>
      </div>
    </div>

    <div class="cheat-section">
      <p class="cheat-section-title">📈 Progression</p>
      <div class="cheat-grid">
        <button class="cheat-btn" onclick="cheatAdvanceDays(1)">Skip 1 Day</button>
        <button class="cheat-btn" onclick="cheatAdvanceDays(5)">Skip 5 Days</button>
        <button class="cheat-btn" onclick="cheatAdvanceDays(30)">Skip 30 Days</button>
        <button class="cheat-btn" onclick="cheatMaxReputation()">Max Reputation</button>
        <button class="cheat-btn" onclick="cheatMaxGarage()">Max Garage Slots</button>
        <button class="cheat-btn" onclick="cheatUnlockAllUpgrades()">Unlock All Upgrades</button>
        <button class="cheat-btn" onclick="cheatUnlockAllAchievements()">Unlock All Achievements</button>
      </div>
    </div>

    <div class="cheat-section">
      <p class="cheat-section-title">🚗 Inventory & Finance</p>
      <div class="cheat-grid">
        <button class="cheat-btn" onclick="cheatSpawnCar()">Spawn Free Car</button>
        <button class="cheat-btn" onclick="cheatFillGarage()">Fill Garage w/ Cars</button>
        <button class="cheat-btn cheat-btn-success" onclick="cheatClearLoan()">Clear Loan / Reset Credit</button>
      </div>
    </div>

    <div class="cheat-section">
      <p class="cheat-section-title">🧪 Misc</p>
      <div class="cheat-grid">
        <button class="cheat-btn" onclick="cheatRefreshUsedMarket()">Refresh Used Market</button>
        <button class="cheat-btn cheat-btn-danger" onclick="cheatToggleGameOver()">${state.gameOver ? 'Clear Game Over' : 'Force Game Over'}</button>
      </div>
    </div>
  `;
}

function _cheatApply(msg) {
  saveState();
  renderAll();
  renderCheatMenu();
  showToast(msg, 'success');
}

function cheatAddMoney(amount) {
  state.cash = Math.max(0, Math.round((state.cash || 0) + amount));
  _cheatApply(`💰 Cash ${amount >= 0 ? '+' : ''}${formatCurrency(amount)} (now ${formatCurrency(state.cash)})`);
}

function cheatSetMoneyFromInput() {
  const input = document.getElementById('cheat-money-input');
  const val = Number(input.value);
  if (!Number.isFinite(val) || val < 0) { showToast('Enter a valid, non-negative amount.', 'error'); return; }
  state.cash = Math.round(val);
  input.value = '';
  _cheatApply(`💰 Cash set to ${formatCurrency(state.cash)}`);
}

function cheatAdvanceDays(n) {
  for (let i = 0; i < n; i++) nextDay();
  renderCheatMenu();
  showToast(`⏩ Advanced ${n} day${n === 1 ? '' : 's'} — now Day ${state.day}.`, 'success');
}

function cheatMaxReputation() {
  state.reputation = 2.0;
  _cheatApply('⭐ Reputation maxed out.');
}

function cheatMaxGarage() {
  state.upgrades.garageLevel = 7;
  state.garageSlots = 100;
  _cheatApply('🏠 Garage upgraded to Tier 7 (100 slots).');
}

function cheatUnlockAllUpgrades() {
  // Applies every upgrade in the config (ignoring prerequisites and cost), so new upgrades are covered automatically.
  for (const upg of UPGRADES_CONFIG) {
    let guard = 0;
    while (!getUpgradeStatus(upg).owned && guard++ < 10) {
      applyUpgrade(upg);
    }
  }
  state.serviceBayUnlockedDay = -9999;
  syncLoanTermsToDifficulty();
  ensureStaffCandidates();
  _cheatApply('⬆️ All upgrades unlocked.');
}

function cheatUnlockAllAchievements() {
  if (!state.achievementsUnlocked) state.achievementsUnlocked = {};
  for (const ach of ACHIEVEMENTS) {
    if (!state.achievementsUnlocked[ach.id]) state.achievementsUnlocked[ach.id] = state.day;
  }
  _cheatApply('🏆 All achievements unlocked.');
}

function cheatSpawnCar() {
  if (state.garage.length + state.deliveries.length >= state.garageSlots) {
    showToast('No garage space — clear a slot or raise garage slots first.', 'error');
    return;
  }
  const entry = CAR_CATALOG[Math.floor(Math.random() * CAR_CATALOG.length)];
  const car = buildCar(entry, 'A', 'factory', true);
  car.purchasePrice = 0;
  state.garage.push(car);
  addNote(`🛠️ [Debug] Spawned ${car.year} ${car.make} ${car.model} into garage.`, 'info');
  _cheatApply(`🚗 Spawned a free ${car.make} ${car.model} into your garage.`);
}

function cheatFillGarage() {
  let added = 0;
  while (state.garage.length + state.deliveries.length < state.garageSlots && added < 25) {
    const entry = CAR_CATALOG[Math.floor(Math.random() * CAR_CATALOG.length)];
    const car = buildCar(entry, 'A', 'factory', true);
    car.purchasePrice = 0;
    state.garage.push(car);
    added++;
  }
  if (added === 0) { showToast('Garage already full.', 'error'); return; }
  addNote(`🛠️ [Debug] Spawned ${added} free car(s) into garage.`, 'info');
  _cheatApply(`🚗 Spawned ${added} free car(s) into your garage.`);
}

function cheatClearLoan() {
  state.loanBalance = 0;
  state.missedPayments = 0;
  state.delinquencyLevel = 0;
  state.loanFrozen = false;
  _cheatApply('🏦 Loan cleared and credit standing reset.');
}

function cheatRefreshUsedMarket() {
  state.usedMarketOffers = generateUsedMarket();
  _cheatApply('🔄 Used Market refreshed.');
}

function cheatToggleGameOver() {
  state.gameOver = !state.gameOver;
  saveState();
  renderCheatMenu();
  if (state.gameOver) {
    showToast('☠️ Game Over flag forced on.', 'warning');
    showGameOverScreen();
  } else {
    showToast('✅ Game Over flag cleared.', 'success');
    document.getElementById('game-over-screen')?.classList.add('hidden');
    renderAll();
  }
}

function init() {
  loadSettings(); // must be before any render so dark mode applies
  bindAudioUnlock(); // catch the first real click/tap/keypress so audio isn't stuck suspended
  bindGlobalClickSfx(); // give every button in the game a consistent tactile click

  // Wire up game-shell event listeners (panel stays hidden until launchGame)
  document.querySelectorAll('.tab-btn').forEach(btn => {
    btn.addEventListener('click', () => switchTab(btn.dataset.tab));
  });

  document.getElementById('btn-next-day').addEventListener('click', nextDay);
  document.getElementById('btn-return-menu').addEventListener('click', returnToMenu);

  document.getElementById('modal-cancel').addEventListener('click', closeModal);
  document.getElementById('modal').addEventListener('click', e => {
    if (e.target === document.getElementById('modal')) closeModal();
  });

  // Patch notes modal — close on backdrop click
  document.getElementById('patch-notes-modal').addEventListener('click', e => {
    if (e.target === document.getElementById('patch-notes-modal')) closePatchNotesModal();
  });

  document.getElementById('import-file').addEventListener('change', e => {
    if (e.target.files[0]) { importSave(e.target.files[0]); e.target.value = ''; }
  });

  // Expose functions for inline onclick handlers in dynamically rendered HTML
  Object.assign(window, {
    buyFromFactory,
    setFactoryMake, setFactoryModel,
    acceptUsedOffer, declineUsedOffer, inspectUsedOffer, submitUsedOffer, updateNegTone,
    applyTitleRecovery,
    acceptTradeInRequest, rejectTradeInRequest, counterTradeInRequest,
    inspectTradeIn, applyTitleRecoveryTradeIn,
    acceptCustomerOffer, rejectCustomerOffer, counterCustomerOffer, applyStaffSuggestion,
    markForSale, updateListPrice, setListPriceMultiplier, markAllForSale, unlistAllCars, bulkSetListing,
    makeLeaseAvailable, stopOfferingLease, viewLeaseDetails, toggleShowLeasedCars, switchTab,
    buyUpgrade, detailCar, carWash, basicRepair, partsUpgrade,
    drawLoan, payDownLoan,
    confirmNewGame, exportSave, hireStaff, dismissCandidate,
    toggleDarkMode, setDifficulty, toggleSfxMuted, setSfxVolume, toggleTutorials,
    renderCarLot, renderLeasing, renderServiceGarage, renderForSale, renderUsedMarket, renderFinance, renderAchievements,
    menuToggleDark, menuToggleSfx, menuToggleTutorials, menuSetDifficulty,
    returnToMenu,
    showPatchNotesModal, closePatchNotesModal,
    tutorialNext, tutorialSkip, tutorialDisable,
    startServiceJob, completeServiceJob, dismissServiceJob,
    toggleMenuChangelog,
    gameOverReturnToMenu, gameOverNewGame,
    cheatAddMoney, cheatSetMoneyFromInput, cheatAdvanceDays, cheatMaxReputation,
    cheatMaxGarage, cheatUnlockAllUpgrades, cheatUnlockAllAchievements,
    cheatSpawnCar, cheatFillGarage, cheatClearLoan, cheatRefreshUsedMarket,
    cheatToggleGameOver,
  });

  // ── Secret Cheat Menu wiring ─────────────────────────────
  document.getElementById('cheat-password-cancel').addEventListener('click', closeCheatPasswordPrompt);
  document.getElementById('cheat-password-submit').addEventListener('click', submitCheatPassword);
  document.getElementById('cheat-password-input').addEventListener('keydown', e => {
    if (e.key === 'Enter') { e.preventDefault(); submitCheatPassword(); }
    else if (e.key === 'Escape') { e.preventDefault(); closeCheatPasswordPrompt(); }
  });
  document.getElementById('cheat-password-overlay').addEventListener('click', e => {
    if (e.target === document.getElementById('cheat-password-overlay')) closeCheatPasswordPrompt();
  });
  document.getElementById('cheat-menu-close').addEventListener('click', closeCheatMenu);
  document.getElementById('cheat-menu-overlay').addEventListener('click', e => {
    if (e.target === document.getElementById('cheat-menu-overlay')) closeCheatMenu();
  });
  document.addEventListener('keydown', e => {
    if (e.key === 'Escape') {
      if (!document.getElementById('cheat-menu-overlay').classList.contains('hidden')) closeCheatMenu();
      else if (!document.getElementById('cheat-password-overlay').classList.contains('hidden')) closeCheatPasswordPrompt();
    }
  });

  // Secret trigger: backtick / tilde key opens the password-gated cheat menu.
  // Ignored while typing in a field, and only available during an active game.
  document.addEventListener('keydown', e => {
    if (e.key !== '`' && e.key !== '~') return;
    const tag = document.activeElement?.tagName?.toLowerCase();
    if (tag === 'input' || tag === 'textarea' || tag === 'select') return;
    if (!_cheatInGame()) return;
    e.preventDefault();
    const menuOpen = !document.getElementById('cheat-menu-overlay').classList.contains('hidden');
    const promptOpen = !document.getElementById('cheat-password-overlay').classList.contains('hidden');
    if (menuOpen || promptOpen) return;
    openCheatPasswordPrompt();
  });

  // Keyboard navigation — arrow keys cycle through visible tabs, ignore when focus is in input/select/textarea
  document.addEventListener('keydown', e => {
    const tag = document.activeElement?.tagName?.toLowerCase();
    if (tag === 'input' || tag === 'textarea' || tag === 'select') return;
    // N key — advance to next day
    if (e.key === 'n' || e.key === 'N') {
      const gameShell = document.getElementById('home-screen');
      if (gameShell && !gameShell.classList.contains('hidden') && gameShell.style.display !== 'none') return;
      e.preventDefault();
      nextDay();
      return;
    }
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

  // ── Easter Egg: Konami Code ───────────────────────────────
  const KONAMI = ['ArrowUp','ArrowUp','ArrowDown','ArrowDown','ArrowLeft','ArrowRight','ArrowLeft','ArrowRight','b','a'];
  let konamiIdx = 0;
  document.addEventListener('keydown', e => {
    if (e.key === KONAMI[konamiIdx]) {
      konamiIdx++;
      if (konamiIdx === KONAMI.length) {
        konamiIdx = 0;
        if (!state.konamiActivated) {
          state.konamiActivated = true;
          saveState();
          runAchievementChecks();
          showToast('🕹️ KONAMI CODE! Power User unlocked — you really know your stuff.', 'success');
        } else {
          showToast('🕹️ Konami code detected again. Still impressive.', 'info');
        }
      }
    } else {
      konamiIdx = (e.key === KONAMI[0]) ? 1 : 0;
    }
  });

  // ── Easter Egg: Header logo click 7 times ───────────────────
  document.querySelector('.header-brand')?.addEventListener('click', () => {
    if (document.getElementById('home-screen') && !document.getElementById('home-screen').classList.contains('hidden')) return;
    playSfx('tap');
    state.logoClickCount = (state.logoClickCount || 0) + 1;
    if (state.logoClickCount === 7) {
      saveState();
      runAchievementChecks();
      showToast('👴 Old School unlocked! You found it. Welcome to the club.', 'success');
    } else if (state.logoClickCount < 7) {
      showToast(`🚗 ${7 - state.logoClickCount} more click${7 - state.logoClickCount === 1 ? '' : 's'}...`, 'info');
    }
  });

  // Show the home screen
  initHomeScreen();

  // ── Resume in-progress session on refresh ──────────────────
  // If a game was open when the page was reloaded, jump straight back into it
  // (same slot, same tab) instead of dumping the player on the title screen.
  const session = getActiveSession();
  if (session && getSlotSummary(session.slot) !== null) {
    launchGame(session.slot, false, undefined, { instant: true, resumeTab: session.tab });
    // A run that ended in bankruptcy should come back to its Game Over screen.
    if (state.gameOver) showGameOverScreen();
  } else if (session) {
    // Save was deleted out from under us — drop the stale session.
    clearActiveSession();
  }

  // Belt-and-braces: persist progress if the tab is closed or reloaded mid-play.
  window.addEventListener('beforeunload', () => {
    if (getActiveSession()) { try { saveState(); } catch (_) {} }
  });
}


init();

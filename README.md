# 🚗 DealerSim — Car Dealership Simulator

A fully client-side, single-page car dealership simulator. Buy cars, manage your inventory, negotiate deals, grow your empire — all in the browser with no backend required.

## 🎨 UI Theme

DealerSim now uses a cohesive blue, game-inspired HUD theme:
- Gradient blue backdrop with glass-style panels/cards
- Segmented pill tab navigation
- Consistent badge/chip/button styling across all sections (Dashboard, Factory, Used Market, Trade-Ins, Garage, For Sale, Upgrades, Settings)

---

## 🚀 Running Locally

**Option 1 — Recommended (local dev server):**
```bash
npx serve .
```
Then open [http://localhost:3000](http://localhost:3000).

**Option 2 — Python:**
```bash
python3 -m http.server 8080
```
Then open [http://localhost:8080](http://localhost:8080).

> ⚠️ **Important:** The app uses ES modules (`import`/`export`). These require a web server (HTTP/HTTPS). Opening `index.html` directly via `file://` will not work in most browsers due to CORS restrictions.

---

## 🌐 Enabling GitHub Pages

1. Go to your repository on GitHub.
2. Open **Settings → Pages**.
3. Under *Source*, choose **Deploy from a branch**.
4. Select branch **`main`** and folder **`/ (root)`**.
5. Click **Save**. Your app will be live at `https://<username>.github.io/<repo>/` within a minute.

---

## 🎮 Gameplay Overview

Time only advances when you press **Next Day ▶**. No real-time timers — think through every decision.

### Dashboard
Central hub showing: cash, day, reputation, garage usage, **daily overhead + wages**, live **market conditions per segment**, pending deliveries, customer offers, trade-in requests, recent sales, activity log, **staff negotiation feed**, and save/load controls.

### 🏭 Factory
Browse using a compact **Make → Model → Trim** flow so large catalogs stay manageable. Factory prices are **fixed — no negotiation**. Cars arrive as **2026 model year** inventory with 5–50 miles and spotless condition.

### 🚗 Used Market
4–7 used cars appear each day (model years 2008–2024) with mileage, wear, and potential hidden issues.

- **Inspect** ($150–$300) to reveal hidden issues before buying.
- **Live offer tone preview**: Type your offer and instantly see the seller's likely reaction (😊 Interested → 😠 Offended → 🤬 Insulted).
- **Negotiate**: Seller counters at only **15–28% toward your offer** — they stay close to their asking price. A steep acceptance curve means you need to be near their hidden floor to get a deal.
- **Walk-away triggers**: Offer below 55% of seller's floor = immediate walk. Patience exhausted = no more rounds.
- **Rounds left** display so you know when to push harder or accept.

### 🔄 Trade-Ins
Customers who want one of **your listed cars** propose a swap: their car + optional cash delta for yours.

- Review the customer's car and proposed cash difference.
- **Accept**, **Reject**, or **Counter** with your preferred cash amount.
- Accepted trade-in cars go into your garage at zero purchase cost.

### 🔑 Garage
All owned cars shown as cards. Features:

- **Mark for Sale / Unlist**, set list price with quick-set buttons.
- **Reconditioning actions** (Car Wash, Detail, Repair, Parts Upgrade).
- Cars in service show an "IN SERVICE" banner and cannot be listed/sold.
- **Trim** shown on all car cards (e.g., "2026 Honda Accord Sport").

### 🏷️ For Sale
Lists your cars for sale plus a **Customer Offers inbox**:

- Auto-sales happen at list price each Next Day (based on sale probability formula).
- Customers may submit **below-list offers**. Each offer shows:
  - **Buyer Mood** (😊 Fair offer → 😠 Lowball offer)
  - **Rounds left** (buyer patience 1–3 rounds)
  - **Buyer Max** is hidden — counter at/below it and they accept; counter above it and they walk.
- When you counter, buyers move **35–55% toward your price** on their next reply (not just accepting/rejecting).
- **Accept / Reject / Counter** each offer; counters resolve next day.
- Auto-sells at list price if buyer offers full price.

### ⚙️ Settings
- **Dark Mode** toggle — persisted in localStorage. Works beautifully in either theme.
- **Difficulty** — Normal vs Hard:
  - Hard: 1.5× daily overhead, more frequent market events, larger market swings.
- **SFX mute + volume slider** for subtle cozy interaction sounds.
- **Show Brand Wordmarks** toggle for code-only make styling on cards.

### ⬆️ Upgrades

| Upgrade | Cost | Effect |
|---|---|---|
| Garage Tier 2 | $15,000 | 10 slots |
| Garage Tier 3 | $40,000 | 20 slots |
| Garage Tier 4 | $90,000 | 35 slots |
| Marketing Campaign | $8,000 | +20% daily traffic (×3 stackable) |
| Inspection Tool | $5,000 | Inspection cost $300 → $150 |
| Negotiation Training | $8,000 | Better negotiation outcomes (buying & selling) |
| Detailing Bay | $12,000 | Detail cars: +1 condition tier, +7% value ($500/car, instant) |
| Service Bay | $18,000 | Basic Repair: +1 condition, fixes issues, +10% value ($800/car, 1 day) |
| Performance Shop | $30,000 | Parts Upgrade on Sports/SUV/Truck: +15% value ($1,500/car, 1 day) |
| Reputation Boost | $10,000 | +15% sale chance multiplier (×3 stackable) |
| Delivery Express | $7,500 | −1 delivery day from factory |
| Staff Office | $28,000 | Unlock hiring sales staff (Mode 2: suggest counters, you finalize) |
| CRM Suite | $60,000 | High-volume management tools + stronger negotiation workflow |
| AI Pricing Terminal | $120,000 | Better buyer acceptance on close counters |
| Luxury Client Lounge | $180,000 | Increases premium/supercar buyer activity |

---

## 📉 Economy & Risk

### Daily Overhead
Your lot isn't free. Every Next Day press deducts:

| Garage Level | Overhead/Day |
|---|---|
| Tier 1 (5 slots) | $300 |
| Tier 2 (10 slots) | $600 |
| Tier 3 (20 slots) | $1,200 |
| Tier 4 (35 slots) | $2,100 |

Expanding your garage means bigger overhead — only upgrade when your sales can cover it.  
If you hire staff, **daily wages** are added to overhead and can seriously hurt profitability.

### Market Volatility
Each segment (Economy, Sedan, SUV, Truck, Sports, Luxury) has a **Market Index** that drifts daily ±0–2.5%. The Dashboard shows current values with 📈📉 arrows.

**Random market events** (~8% chance per day) cause larger shifts:
- ⛽ Fuel prices spike → SUV & Truck demand falls
- 💼 Corporate tax cut → Luxury heats up
- 📉 Used car bubble bursts → Broad market cooling
- 🏗️ Construction boom → Trucks selling fast
- … and 9 more events

### Depreciation
Cars in your garage can **lose value** when their segment's market index drops below 1.0 — value erodes proportionally each day. Cars sitting listed for >7 days also depreciate slightly as buyers expect discounts on stale inventory.

---

## 🔧 Car Reconditioning

Available from the **Garage** tab on each car card:

| Action | Cost | Time | Effect | Requires |
|---|---|---|---|---|
| 🚿 Car Wash | $150 | Instant | +3% market value, +8% sale chance for 3 days | Nothing |
| ✨ Detail | $500 | Instant | +1 condition tier, +7% market value | Detailing Bay upgrade |
| 🔩 Basic Repair | $800 | 1 day | +1 condition tier, clears issues, +10% market value | Service Bay upgrade |
| 🏎️ Parts Upgrade | $1,500 | 1 day | +15% market value | Performance Shop upgrade; Sports/SUV/Truck only |

Cars being repaired or upgraded are **taken off the market** until service completes the next day.

---

## 📈 Sale Probability Formula

```
saleChance = baseProbability
           × priceAttractiveness   (marketValue / listPrice)
           × conditionFactor       (A=1.2, B=1.0, C=0.78, D=0.52)
           × daysOnLotFactor       (penalty after 7 or 14 days)
           × marketingFactor       (1 + 0.2 × marketing upgrades)
           × reputationFactor      (current reputation score)
           × reputationBoostFactor (1 + 0.15 × boost upgrades)
           × demandFactor          (car-specific, 0.5–1.5)
           × washBonus             (1.08 if recently washed)
```

Capped at **85% per day**.

---

## 🕹️ How to Test New Features

### Market Volatility
1. Press **Next Day** several times on the Dashboard.
2. Watch the **Market Conditions** panel update each day — segments drift up and down.
3. Occasionally a toast + activity log entry announces a **market event** (e.g., fuel price spike, construction boom).
4. After buying a car, if its market segment dips, you'll see market value decline in your Garage.

### Overhead Pressure
1. Start a new game. Each Next Day deducts $300 from cash.
2. Upgrade to Garage Tier 2 → overhead jumps to $600/day.
3. Try surviving without making any sales — you'll run out of cash in ~80 days on Normal, ~55 on Hard.

### Used Market (improved negotiation)
1. Open **Used Market** tab. Type a lowball offer ($5,000 on a $20,000 car).
2. See the live tone preview: **🤬 Insulted — likely to walk**.
3. Submit the offer — seller will walk immediately or after losing patience.
4. Try an offer closer to asking — see **😊 Very interested** tone and much higher acceptance.
5. When seller counters, note they stay **close to their asking price** (only 15–28% movement toward you).

### Customer Offers (improved countering)
1. Mark a car for sale and press **Next Day** a few times.
2. Check **For Sale** tab — below-list customer offers appear with **Buyer Mood** and **Rounds Left**.
3. Counter with a high price — buyer walks. Counter reasonably — buyer moves 35–55% toward your price.
4. Multiple counter rounds are now possible (up to buyer's patience limit).
5. Hire staff (after **Staff Office**) and press **Next Day** — staff suggestions appear on offers with confidence/tone notes.
6. Use **Use Staff** to apply the recommended counter, then finalize manually (Mode 2 behavior).

### Factory Browser + Supercars
1. Open **Factory** and pick a manufacturer, then model, then trim.
2. Confirm the list stays short while still exposing large catalog options.
3. Browse premium trims (Corvette, Ferrari, Lamborghini, Bugatti, McLaren, Porsche, etc.) and verify very high pricing.

### Sound Controls
1. Open **Settings**.
2. Toggle **SFX** off/on and adjust volume.
3. Trigger UI actions (tab changes, toasts, deals) and verify subtle feedback.

### Trade-In Requests
1. Mark at least one car for sale in **Garage**.
2. Press **Next Day** a few times — trade-in requests appear in the **Trade-Ins** tab.
3. Review customer's car details and proposed cash delta. Accept, reject, or counter.

### Reconditioning
1. Buy a used car from Used Market (condition B–D).
2. In **Garage**, use **Car Wash** (instant), then **Detail** (after buying Detailing Bay), or **Basic Repair** (after Service Bay).
3. Press **Next Day** — repair/parts upgrades complete, market value and condition update.

### Dark Mode & Settings
1. Click **Settings** tab.
2. Toggle **Dark Mode** — persists across page reloads.
3. Switch **Difficulty** to Hard → overhead becomes $450/day at Tier 1.

---

## 💾 Save Data

- Game state saved to `localStorage` under key `dealerSim_v1` (save version tracked internally).
- Settings (dark mode, difficulty) saved separately under `dealerSim_settings`.
- Existing saves are **automatically migrated** to v3 — market indices, staff system fields, and new UI settings are added without losing your progress.
- Use **Export Save** / **Import Save** on the Dashboard to back up or transfer saves.

---

## 🔧 Expanding the Car Catalog

Open `data/cars.js` and add entries to the `CAR_CATALOG` array:

```js
{
  make: 'Tesla',
  model: 'Model 3',
  trim: 'Long Range',           // trim level shown on cards
  category: 'Sedan',            // Economy | Sedan | SUV | Truck | Sports | Luxury
  basePrice: 39000,             // factory invoice (what you pay to order)
  marketValue: 46000,           // MSRP / retail value (2026 new)
  deliveryDays: 3,              // days from factory to garage
  yearRange: [2020, 2024],      // used market: random year in this range
  baseMileage: [3000, 50000],   // used market: random mileage in this range
  demandFactor: 1.3,            // customer demand multiplier (0.5–1.5)
},
```

Factory cars always use year **2026** with 5–50 miles regardless of `yearRange`/`baseMileage`.

---

## 📁 File Structure

```
dealership-sim/
├── index.html       # SPA shell, tab structure, modal
├── styles.css       # All styles, CSS custom properties, dark mode
├── app.js           # Game logic, state management, render functions
└── data/
    └── cars.js      # Car catalog — expanded with supercars/hypercars and trims
```

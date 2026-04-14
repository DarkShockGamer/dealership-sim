# 🚗 DealerSim — Car Dealership Simulator

A fully client-side, single-page car dealership simulator. Buy cars, manage your inventory, negotiate deals, and grow your empire — all in the browser, no backend required.

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

Time only advances when you press **Next Day ▶**. No timers, no pressure.

### Dashboard
Central hub: cash, reputation, day, garage usage, pending deliveries, customer offers count, trade-in request count, recent sales, activity log, and save/load controls.

### 🏭 Factory
Browse 37 real make/model combinations across 6 categories. Factory prices are **fixed — no negotiation**. Cars arrive after N delivery days with known condition and no hidden defects. Lower risk, lower margin.

### 🚗 Used Market *(formerly Trade-Ins)*
4–7 used cars appear each day with unknown condition and potential hidden issues. These are sellers in the private market.

- **Inspect** ($150–$300) to reveal hidden issues before buying.
- **Negotiate**: Enter your own offer price — the seller will accept, counter, or walk away based on their hidden floor price, your reputation, and whether you have Negotiation Training.
- Seller counters are shown; you can accept the counter or re-counter (up to seller's patience limit).

### 🔄 Trade-Ins *(new)*
Customers who want one of **your listed cars** may propose a trade: their car + optional cash difference for yours.

- Review the customer's car details and the proposed cash delta.
- **Accept** the deal as-is, **Reject** it, or **Counter** with your preferred cash amount.
- Counters resolve automatically on the next day — the customer accepts or declines.
- Accepted trade-in cars go into your garage at zero purchase cost; your listed car is removed.

### 🔑 Garage
All owned cars shown as cards. Features:

- **Mark for Sale / Unlist** a car.
- **Reconditioning actions** (see below).
- Cars in service show an "IN SERVICE" banner and cannot be listed/sold.
- Reconditioning applied is shown as badges on each card.

### 🏷️ For Sale
Lists your cars for sale plus a **Customer Offers inbox**:

- Auto-sales happen at list price each Next Day (sale probability formula).
- Customers may submit **below-list offers** instead of buying at full price. These appear at the top of For Sale.
- Per offer: **Accept** (instant sale), **Reject**, or **Counter** a higher price. Counters resolve next day.
- Quick-set price buttons: Market / +10% / −10% / −20%.
- Cars with active offers or trade-in requests are highlighted.

### ⬆️ Upgrades
Eleven purchasable upgrades:

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

### Used Market (negotiation)
1. Open **Used Market** tab.
2. Click on a car's price input and type a low offer, then click **Negotiate**.
3. Seller will counter — accept the counter or re-counter again.
4. Try buying with Negotiation Training upgrade for better outcomes.

### Trade-In Requests
1. Mark at least one car for sale in **Garage**.
2. Press **Next Day** a few times — trade-in requests appear in the **Trade-Ins** tab.
3. Review customer's car details and proposed cash delta.
4. Accept, reject, or counter. If countered, advance a day to see the outcome.

### Customer Offers
1. Mark cars for sale at market value or slightly above.
2. Press **Next Day** — below-list offers appear at the top of **For Sale**.
3. Accept, reject, or counter. Counter resolves next day.

### Reconditioning
1. Buy a used car from Used Market (condition B–D).
2. In **Garage**, use **Car Wash** (instant), then **Detail** (after buying Detailing Bay), or **Basic Repair** (after Service Bay).
3. Press **Next Day** — repair/parts upgrades complete, market value and condition update.
4. Check the badge on the car card showing what was applied.

---

## 🔧 Expanding the Car Catalog

Open `data/cars.js` and add entries to the `CAR_CATALOG` array:

```js
{
  make: 'Tesla',
  model: 'Model 3',
  category: 'Sedan',          // Economy | Sedan | SUV | Truck | Sports | Luxury
  basePrice: 28000,           // factory wholesale cost (what you pay)
  marketValue: 37000,         // typical retail value
  deliveryDays: 3,            // 1–5 days from factory to garage
  yearRange: [2020, 2023],    // random year picked in this range
  baseMileage: [5000, 40000], // random mileage picked in this range
  demandFactor: 1.3,          // customer demand multiplier (0.5–1.5)
},
```

---

## 📁 File Structure

```
dealership-sim/
├── index.html       # SPA shell, tab structure, modal
├── styles.css       # All styles, CSS custom properties
├── app.js           # Game logic, state, render functions
└── data/
    └── cars.js      # Car catalog (ES module export)
```


# 🚗 DealerSim — Car Dealership Simulator

A fully client-side, single-page car dealership simulator. Buy cars, manage your inventory, sell for profit, and grow your empire — all in the browser, no backend required.

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

> ⚠️ **Important:** The app uses ES modules (`import`/`export`). These require a web server (HTTP/HTTPS). Opening `index.html` directly via `file://` will not work in most browsers due to CORS restrictions. Use one of the methods above.

---

## 🌐 Enabling GitHub Pages

1. Go to your repository on GitHub.
2. Open **Settings → Pages**.
3. Under *Source*, choose **Deploy from a branch**.
4. Select branch **`main`** and folder **`/ (root)`**.
5. Click **Save**. Your app will be live at `https://<username>.github.io/<repo>/` within a minute.

---

## 🎮 Gameplay Overview

### Dashboard
Central hub showing your cash, reputation, day counter, garage usage, pending deliveries, recent sales, and a full activity log. Also holds the **Save/Load** controls.

### Factory
Browse the full catalog of 36 real make/model combinations across 6 categories (Economy, Sedan, SUV, Truck, Sports, Luxury). Factory cars have predictable condition and no hidden defects — but lower margins. After purchase, cars enter a **delivery queue** and arrive after N days.

### Trade-Ins
Each day, 3–5 random trade-in offers appear. Trade-ins are riskier — their condition is unknown and they may have hidden mechanical issues. Use **Inspect** to reveal problems before deciding to Accept or Decline. Accepted trade-ins go directly into your garage.

### Garage
All cars you own are shown as cards. Toggle **Mark for Sale** to list a car, and set your own list price. If you own the **Detailing Bay** upgrade, you can improve a car's condition (and market value) for $500.

### For Sale
Displays only listed cars with live sale-chance calculations. Use the quick-set buttons (Market / +10% / −10% / −20%) to adjust pricing. Press **Next Day** to simulate customer traffic and potential sales. A 2% transaction fee applies to each sale.

### Upgrades
Eight purchasable upgrades that affect game mechanics:

| Upgrade | Cost | Effect |
|---|---|---|
| Garage Tier 2 | $15,000 | 10 slots |
| Garage Tier 3 | $40,000 | 20 slots |
| Garage Tier 4 | $90,000 | 35 slots |
| Marketing Campaign | $8,000 | +20% daily traffic (×3 stackable) |
| Inspection Tool | $5,000 | Inspection cost $300 → $150 |
| Detailing Bay | $12,000 | Detail cars to improve condition |
| Reputation Boost | $10,000 | +15% sale chance multiplier (×3 stackable) |
| Delivery Express | $7,500 | −1 delivery day from factory |

---

## 🕹️ Controls Reference

| Control | Where | Action |
|---|---|---|
| **Next Day ▶** | Header | Advance simulation by one day |
| **Buy** | Factory | Order a car (enters delivery queue) |
| **Inspect** | Trade-Ins | Pay $150–$300 to reveal hidden issues |
| **Accept / Decline** | Trade-Ins | Accept trade-in to garage, or decline |
| **Mark for Sale** | Garage | Toggle listing on/off |
| **Detail ($500)** | Garage | Improve condition one tier (requires upgrade) |
| **Market / ±%** | For Sale | Quick-set list price relative to market value |
| **Unlist** | For Sale | Remove car from listings |
| **New Game / Reset** | Dashboard | Restart with confirmation |
| **Export Save** | Dashboard | Download game state as JSON |
| **Import Save** | Dashboard | Load a previously exported JSON |

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
```

Capped at **85% per day**.

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

No other files need to be changed — the Factory tab renders directly from the catalog array.

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

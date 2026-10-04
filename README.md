<div align="center">

# 🚗 DealerSim

**Buy low, sell high. Build your empire one deal at a time.**

A car dealership simulator that runs entirely in your browser — no backend, no install, no accounts.

[**▶ Play it live**](https://darkshockgamer.github.io/dealership-sim/)

![DealerSim](preview.png)

</div>

---

## Table of Contents

- [Highlights](#-highlights)
- [Running locally](#-running-locally)
- [How to play](#-how-to-play)
- [Difficulty modes](#-difficulty-modes)
- [Nightmare mode](#-nightmare-mode)
- [Economy & risk](#-economy--risk)
- [Settings & accessibility](#%EF%B8%8F-settings--accessibility)
- [Saving](#-saving)
- [Debug menu](#-debug-menu)
- [Project structure](#-project-structure)
- [Extending the game](#-extending-the-game)
- [Tests](#-tests)
- [Deploying to GitHub Pages](#-deploying-to-github-pages)

---

## ✨ Highlights

| | |
|---|---|
| **Huge catalog** | 1,048 cars across 60 makes and 476 models, from economy hatchbacks to hypercars, using real-world trim names. |
| **Turn-based** | Time only moves when you press **Next Day**. No timers, no pressure — think through every deal. |
| **Deep economy** | Per-segment market indices, random market events, depreciation, overhead, loans, credit score and insurance. |
| **Many ways to earn** | Flip cars, lease them out, run a service garage, auction rare lots, display a private showroom, hire staff to deal for you. |
| **63 upgrades** | A skill tree of upgrades across lot, marketing, finance, reconditioning, security, sourcing, legal and more. |
| **155 achievements** | Shared across every save slot on the same browser. |
| **Four difficulties** | Easy, Normal, Hard, and the story-driven horror variant, **Nightmare**. |
| **Three save slots** | Plus export/import for backups and moving between devices. |
| **Original audio** | A rotating playlist of original tracks, a dedicated dark Nightmare soundtrack and subtle UI sound effects. |
| **Zero dependencies** | Vanilla JavaScript ES modules. No framework, no build step. |

---

## 🚀 Running locally

DealerSim uses ES modules, so it must be served over HTTP. Opening `index.html` straight from disk (`file://`) will not work.

```bash
# Option 1 — Node
npx serve .
# then open http://localhost:3000

# Option 2 — Python
python3 -m http.server 8080
# then open http://localhost:8080
```

> The debug-menu password check uses the browser's Web Crypto API, which is only available on `localhost` and HTTPS pages.

---

## 🎮 How to play

Start a save from the main menu, pick a difficulty, and follow the interactive tutorial (it can be turned off in Settings). The loop is simple: **source cars, make them worth more, sell them for a profit, reinvest.**

### The tabs

| Tab | What it's for |
|---|---|
| **Dashboard** | Cash, day, reputation, overhead and wages, market conditions per segment, pending deliveries, recent sales and the activity log. |
| **Factory** | Order brand-new cars through a Make → Model → Trim browser. Prices are fixed (no haggling) and delivery takes a few days. |
| **Used Market** | A fresh batch of used cars every day. Inspect for hidden problems, then negotiate. It also has an **Auctions** page. |
| **Car Lot** | Everything you own. Set prices, list cars for sale, wash and recondition them, offer them for lease, consign them to auction or move them to the showroom. |
| **Leasing** | Manage cars out on lease and see lease income. |
| **Service** | Customers bring their cars in for work. Start the job, occupy a bay, collect the labor profit. |
| **For Sale** | Your listed cars, incoming customer offers and trade-in requests. Accept, reject or counter. |
| **Finance** | Credit line, loan balance, interest, credit score and the delinquency ladder. |
| **Insurance** | Choose a provider, pay premiums, and file claims after the waiting period. |
| **Staff** | Hire dealers who scout, buy, repair and sell cars on their own with your cash. Rank up as their skills grow. |
| **Upgrades** | A skill tree of branches. Click a tile to see what it does and what it requires. |
| **Showroom** | A private display floor for cars you never want to sell. Well-kept cars on display increase your sale chance. |
| **Achievements** | Browse and track your unlocks. |
| **Settings** | Audio, display, accessibility and tutorial options. |

### Buying used cars

- **Inspect** a car before buying to reveal hidden issues, title problems and crash damage. Upgrades such as DMV Database Access and Frame Damage Inspection Tools reveal even more.
- **Negotiate** with a live tone preview that tells you how the seller will likely react. Lowball too hard and they walk away.
- **Title status** (Clean / Rebuilt / Salvage / Lemon) is shown on every card and changes both value and sale chance.
- **Legal risk:** some cars can have no title, a stolen flag or an altered VIN. Selling them risks police fines.

### Selling

- Listed cars sell automatically each day based on a sale-chance formula (price attractiveness, condition, days on lot, reputation, marketing, demand and more).
- Customers may send below-list offers with a mood and a limited number of rounds. Counters resolve the next day.
- Trade-in requests propose their car plus a cash difference for yours.
- Every completed sale produces a **Buyer's Order** you can open to see the itemized deal.

### Reconditioning

| Action | Notes |
|---|---|
| Car Wash | Small value bump and a short-lived sale-chance boost. Requires the Wash Station upgrade. |
| Detail | Improves condition once per ownership. |
| Basic Repair | Improves condition and clears hidden issues. Takes time unless you own the Reconditioning Workshop. |
| Parts Upgrade | Raises value on eligible vehicles. |

### Auctions

The Used Market has an **Auctions** page with three auction houses (premium rare lots, a general main-street auction and a salvage house). Bidding is live: a countdown runs while named bidders compete, and every bid resets the clock. You can also consign your own cars with a reserve price. Pay for a pre-sale inspection to see through the fuzzy estimates.

---

## 🎚️ Difficulty modes

| Mode | Summary |
|---|---|
| **Easy** | No overhead, no loan interest and no bankruptcy risk. Relaxed building. |
| **Normal** | Standard overhead and market volatility. Bankruptcy liquidates your stock and the game continues with penalties. |
| **Hard** | 1.5× overhead, higher loan APR, minimum principal payments and larger market swings. Bankruptcy ends the run permanently. |
| **Nightmare** | See below. |

The delinquency ladder on Finance runs: warning → default (credit freeze and higher APR) → bankruptcy.

---

## 🕯️ Nightmare mode

Nightmare turns the dealership into a horror game. Choose it when creating a save.

- **Dread** is a 0–100 meter that creeps up every night. Sales, candles and Wards push it back; cursed cars, an empty till and overdue debts push it forward.
- **Cursed cars** appear on the used market at suspiciously low prices and haunt your lot.
- **The Pale Customer** offers far above market value for a car, but the money may not last until morning.
- **Sleep** drains in real time. Rest by playing the Pale Man at rock-paper-scissors.
- **Wards** are Nightmare-only upgrades that push the night back for good.
- **Brutal economy:** 2× overhead, 24% APR and pickier buyers. Three Reckonings or bankruptcy end the run.
- **Atmosphere:** red skies, film grain, a pulsing vignette and a dedicated dark-ambient soundtrack.
- **Story and endings:** lore unfolds as you play, an Office Board pins up the clues, and surviving long enough offers you the dawn.

Every other difficulty also has a story: your mom finally kicked you out of the basement, and a great-uncle you barely knew left you a rundown dealership. Story beats are collected on the Dashboard's **Office Board**.

---

## 📉 Economy & risk

- **Daily overhead** scales with your lot size, plus wages for any staff. Efficiency upgrades reduce it.
- **Market indices:** each segment (Economy, Sedan, SUV, Truck, Sports, Luxury) drifts daily with mean reversion, and random market events shift segments further. Event frequency and swing size rise on harder difficulties.
- **Depreciation:** car values follow their segment's index, and cars that sit unsold for a long time lose appeal.
- **Hidden crash damage** comes in minor, moderate and severe grades with very different repair costs.
- **Finance:** draw from your credit line when you need cash, but interest is charged every day. Finance upgrades raise the limit and lower the APR.
- **Insurance** protects you from the bad days. Pick a provider, and mind the waiting period before you can claim.

### Sale chance

```
saleChance = baseProbability
           × priceAttractiveness    (market value ÷ list price)
           × conditionFactor        (A 1.2 · B 1.0 · C 0.78 · D 0.52)
           × daysOnLotFactor        (penalty after the first week or two)
           × marketingFactor        (marketing upgrades)
           × reputationFactor       (your reputation)
           × reputationBoostFactor  (reputation upgrades)
           × demandFactor           (per car, 0.5 – 1.5)
           × washBonus              (recently washed)
           × photoStudio / showroom bonuses
```

Capped at **85% per day**. Exact values are tuned in `app.js` and may change between versions, so check the in-game change log for balance updates.

---

## ⚙️ Settings & accessibility

- Dark mode
- Music and SFX toggles with separate volume sliders
- Brightness slider (50%–150%) that applies to the whole game, menus included
- **Reduce Motion** toggle, plus automatic support for the OS-level `prefers-reduced-motion` setting
- Tutorial on/off
- Keyboard navigation: **← / →** cycle through tabs (suppressed while typing in a field)

---

## 💾 Saving

- Three save slots, each with its own difficulty.
- Slot 1 uses the localStorage key `dealerSim_v1`; slots 2 and 3 use `dealerSim_slot_2` and `dealerSim_slot_3`.
- Settings are stored separately under `dealerSim_settings`.
- Older saves are migrated automatically when you load them, so updates should not cost you progress.
- **Export Save / Import Save** let you back up a run or move it to another device.
- Achievements are shared across all slots on the same browser.
- On Hard and Nightmare, a permadeath Game Over deletes that save.

> Everything lives in your browser's localStorage. Clearing site data erases your saves, so export a backup of any run you care about.

---

## 🛠️ Debug menu

A password-protected debug menu is available during a run (press the backtick key while in a game). It is meant for testing and is a soft gate only: the password is stored as a salted hash rather than plain text, but this is not real security, and the code is fully visible in the browser.

---

## 📁 Project structure

```
dealership-sim/
├── index.html              # App shell, tab structure, modals, boot screen
├── app.js                  # Game logic, state, saving, rendering, audio, Nightmare mode
├── data/
│   ├── cars.js             # Car catalog (CAR_CATALOG)
│   └── patchNotes.js       # Change log (PATCH_NOTES, newest first)
├── styles.css              # Core styles, theme variables, dark mode
├── menu.css                # Main menu, save slots, settings screens
├── boot.css                # Intro / boot animation
├── cheat.css               # Debug menu
├── nightmare.css           # Nightmare-mode visuals
├── assets/icons/           # SVG icon set
├── tests/
│   └── tradeInValidation.js
├── favicon.* / icon-*.png / apple-touch-icon.png
├── preview.png             # Social share image
└── README.md
```

---

## 🔧 Extending the game

### Adding cars

Add entries to `CAR_CATALOG` in `data/cars.js`:

```js
{
  make: 'Tesla',
  model: 'Model 3',
  trim: 'Long Range AWD',        // real-world OEM trim name
  category: 'Sedan',             // Economy | Sedan | SUV | Truck | Sports | Luxury
  basePrice: 39000,              // factory invoice (what you pay to order)
  marketValue: 46000,            // MSRP / retail value (2026 new)
  deliveryDays: 3,               // days from factory to garage
  yearRange: [2020, 2024],       // used market: random year in this range
  baseMileage: [3000, 50000],    // used market: random mileage in this range
  demandFactor: 1.3,             // customer demand multiplier (0.5 – 1.5)
},
```

Factory cars are always the 2026 model year with 5–50 miles, regardless of `yearRange` and `baseMileage`.

### Shipping a new version

1. Add an entry at the **top** of `PATCH_NOTES` in `data/patchNotes.js`.
2. Bump `GAME_VERSION` near the top of `app.js` to match. This controls when the "What's New" popup reappears for returning players.

Note types are `feature`, `balance`, `fix`, `chore`, `parts` and `repair`.

---

## ✅ Tests

```bash
node tests/tradeInValidation.js
```

Checks the trade-in exploit fixes (overpriced listings, lowball offers at high ask ratios, counter acceptance limits). The script uses a stand-in copy of the production formulas, so update it if you change the trade-in logic in `app.js`.

---

## 🌐 Deploying to GitHub Pages

1. Open your repository's **Settings → Pages**.
2. Under *Source*, choose **Deploy from a branch**.
3. Select the `main` branch and the `/ (root)` folder, then click **Save**.
4. Your game will be live at `https://<username>.github.io/<repo>/` within a minute.

If you fork this project, update the `og:url`, `og:image` and `twitter:image` URLs in `index.html` so link previews point at your own deployment.

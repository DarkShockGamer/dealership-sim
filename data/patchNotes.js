/**
 * DealerSim — Patch notes / change log.
 *
 * Newest version FIRST. app.js reads PATCH_NOTES[0] as the "latest" entry
 * for the What's New popup and the home-screen change log.
 *
 * Each entry:  { version, date, notes: [{ type, text }] }
 * Note types:  feature | balance | fix | chore | parts | repair
 *
 * When you ship a new version, add an entry at the top AND bump
 * GAME_VERSION in app.js to match (it controls when the popup re-appears).
 */

export const PATCH_NOTES = [
  {
    version: '1.21.6',
    date: 'October 2026',
    notes: [
      { type: 'feature', text: "Nightmare: lighting a candle now plays a short animation. A candle rises into view, a match touches the wick, the flame catches and flickers, embers drift up, and the Dread it bought is shown beneath it. It never blocks the game (you can keep clicking through it), it only uses lightweight animation so it won't bring back the lag, and it is skipped if Reduce Motion is on." },
    ],
  },
  {
    version: '1.21.5',
    date: 'October 2026',
    notes: [
      { type: 'balance', text: "Nightmare: selling cars now lowers Dread the moment the sale happens, and the more cars you sell in a day, the more each one helps. Early on the first sale of the day is −4, then −5, −6, −7 and so on, climbing to 2.5x the base relief. A single day of sales can lift up to 30 Dread. The old end-of-night batch (−4 each, capped at −16) is gone, so a busy day is now clearly rewarded. The longer you stay in the night, the less each sale helps, same as before. The Dark panel on the dashboard shows today's sales, the Dread they've lifted so far, and what the next sale will do." },
    ],
  },
  {
    version: '1.21.4',
    date: 'October 2026',
    notes: [
      { type: 'fix', text: "Big performance fix: the game no longer drags the rest of Chrome down with it. The header, tab bar and every tab panel were each blurring whatever sat behind them on every frame, which hammers the GPU that all your tabs share (that's why YouTube in other tabs dropped to a crawl). Those panels are already nearly opaque over a smooth gradient, so removing the blur looks identical and runs far lighter." },
      { type: 'fix', text: "Nightmare mode is much smoother. The drifting fog no longer uses a 30px blur filter (its soft gradient already fades out on its own), and the film grain no longer uses a full-screen blend mode that forced the whole page to be re-composited on every grain step. The look is the same, just a touch subtler on the grain." },
    ],
  },
  {
    version: '1.21.3',
    date: 'October 2026',
    notes: [
      { type: 'balance', text: "Early-game overhead no longer eats your first flip. The starting lot's daily overhead is cut from $125 to $40 (Hard $60, Nightmare $80). A factory car takes 2-3 days to arrive and a few more to sell, and a Good-condition one only clears about $0-1,300 profit, so the old rent could turn selling at market value into a loss, worst of all on Nightmare. A whole first flip now costs roughly $240 in overhead on Normal, $360 on Hard and $480 on Nightmare. Applies to existing saves too. Bigger lots and Easy mode are unchanged." },
    ],
  },
  {
    version: '1.21.2',
    date: 'October 2026',
    notes: [
      { type: 'fix', text: "Office board: every note whose day has already arrived is now pinned up right away. Older saves used to get just one new note per day, so a save on Day 90 could be missing most of the board. Now it shows everything you've reached, on every difficulty." },
    ],
  },
  {
    version: '1.21.1',
    date: 'October 2026',
    notes: [
      { type: 'fix', text: "Office board: the Day 75 Polaroid is now an actual snapshot pinned on top of its note (your great-uncle grinning next to a faded red sedan, 'first one sold' scrawled underneath) with its own push pin, instead of a plain brown rectangle." },
      { type: 'fix', text: "Office board: red string now only runs from each note to the next one in order, instead of criss-crossing between notes." },
    ],
  },
  {
    version: '1.21.0',
    date: 'October 2026',
    notes: [
      { type: 'feature', text: "The Office Board is now a real bulletin board. On Nightmare, the Office board button opens a corkboard with the key tags and lore pinned up with red push pins and joined by red string. New notes appear as you uncover the story." },
      { type: 'feature', text: "Every other difficulty gets its own Office board button on the Dashboard (from Day 2). It holds the lawyer's letter and each story beat you have found, from the shoebox of receipts to Mom's Sunday dinner, with a blank note showing the next one still to come." },
    ],
  },
  {
    version: '1.20.1',
    date: 'October 2026',
    notes: [
      { type: 'fix', text: "Hotfix: loans on Normal difficulty now pay down a little principal every day, not just interest. Each day the autopay takes the interest plus 0.5% of the balance (at least $100, never more than you owe, and only from cash you actually have). Hard and Nightmare already paid principal and are unchanged, and Easy still has no loan costs. The Finance tab now shows the daily principal autopay on every difficulty that has one." },
    ],
  },
  {
    version: '1.20.0',
    date: 'October 2026',
    notes: [
      { type: 'feature', text: "Story. On every difficulty except Nightmare, the tutorial now opens with how you got here: your mom finally kicked you out of her basement, and a great-uncle you barely knew left you his old, rundown used car dealership. A handful of small story beats then turn up in the activity log as the days go by." },
      { type: 'feature', text: "Nightmare lore, delivered only during play (the tutorial stays spoiler-free). Over the first few weeks the lot tells you why the Pale Man plays instead of killing you, what the Pale Customer's tell is, and what the ash really is. The Dashboard also gets an Office Board once you reach Night 2. One key on it has a tag with your name, written before you arrived." },
      { type: 'feature', text: "Nightmare endings. Reach Night 365, a full year of nights (and again at Night 730 and 1095), and the Pale Man offers you the dawn. Take it and you wake up, but winning does not free you. Choose to keep dreaming and the run carries on. There is also a secret ending for anyone who beats him 50 times." },
      { type: 'feature', text: "Two new Nightmare achievements: Rise and Shine and a secret one. Lucid Dreamer now needs both, and unlocking it asks which side was the real dream." },
      { type: 'chore', text: "Sleep drain now reads as what it is: you haven't really slept since you signed. New one-line whispers hint at the lot's history." },
    ],
  },
  {
    version: '1.19.4',
    date: 'October 2026',
    notes: [
      { type: 'fix', text: "Nightmare: the creepy popups now stay on screen long enough to read. They last about 2.6 seconds plus a little for every word, at least 5 seconds for the Pale Man and curse lines, and never more than 12 seconds. Other difficulties are unchanged." },
    ],
  },
  {
    version: '1.19.3',
    date: 'October 2026',
    notes: [
      { type: 'fix', text: "Used cars can no longer be older or newer than the car was actually built. Every car in the catalog now has a production start year and end year, and a used listing only ever rolls a model year inside that window. Fixed many wrong ones: the Ford Bronco and Maverick no longer show up as 2012-2020 cars (they returned in 2021 and 2022), the Kia K5 starts in 2021, the Hyundai Sonata N Line in 2021, the Tucson N Line in 2022, the Volkswagen Atlas in 2018, the Honda HR-V in 2016, the Cadillac XT5 in 2017, the McLaren Artura in 2022 and more. Cars that ended early, like the Chevrolet Malibu, Audi R8, Kia Stinger and Nissan Rogue Sport, no longer show years after their last model year." },
      { type: 'fix', text: "Service customers' cars follow the same rule: an Audi RS 6 Avant now only comes in as a 2021 or newer, and a Lexus LX 600 as a 2022 or newer." },
      { type: 'chore', text: "Discontinued badges now show each car's real production run from the catalog." },
    ],
  },
  {
    version: '1.19.2',
    date: 'October 2026',
    notes: [
      { type: 'fix', text: "Big money now reads properly. Save slots and compact buttons showed amounts like $3943.4M; they now roll over to billions ($3.9B). Trillions are supported too, so $1,200,000,000,000 shows as $1.2T." },
    ],
  },
  {
    version: '1.19.1',
    date: 'October 2026',
    notes: [
      { type: 'balance', text: "Nightmare start is fairer. Cursed cars are the cheapest listings on the lot, so a fresh run kept pushing you toward a car nobody wanted to buy while overhead ate your cash. Now the curse rate starts at 4% on Night 1 and creeps up to the usual 16% by around Night 11, and no refresh ever has more than 2 cursed cars." },
      { type: 'balance', text: "Nightmare, first 10 nights: every Used Market refresh now guarantees at least 2 uncursed cars in Excellent or Good condition that you can afford (up to about 70% of your cash), so there is always a safe first flip." },
    ],
  },
  {
    version: '1.19.0',
    date: 'October 2026',
    notes: [
      { type: 'feature', text: "New difficulty: NIGHTMARE. Pick it when creating a save slot. The whole game turns red — fog, film grain, a pulsing vignette, and now and then, something watching from the edge of the screen. Overhead is double, staff are paid 25% extra for night shifts, loans are 24% APR with 2% minimum principal, buyers are pickier, and bankruptcy ends the run for good." },
      { type: 'feature', text: "Dread: a new 0–100 meter on Nightmare. It creeps up every night and is pushed back by sales (−4 each), candles, and Wards. Cursed cars, empty tills and overdue debts push it forward. As it climbs the dark gets louder — more fog, flickering numbers, a heartbeat in the soundtrack. Hit 100 and a Reckoning takes cash and your best car; the third Reckoning is final." },
      { type: 'feature', text: "Cursed cars: some used-market listings on Nightmare are suspiciously cheap. Inspect them to confirm the curse. Owned cursed cars add Dread, haunt the lot (breakdowns, odometers that move on their own, the occasional vanishing), and are harder to sell — or pay to exorcise them." },
      { type: 'balance', text: "Nightmare economy: market values no longer collapse. Segments stay above 88% of normal and recover quickly, and owned cars don't keep losing value through dips. The nightly Dread gain is now 2 instead of 3, so selling cars can keep it down." },
      { type: 'feature', text: "Sleep (Nightmare): a new meter that drains 10% every minute. At 0 you fall asleep and the run is over. To rest, play the Pale Man at rock-paper-scissors — best of three. Win and you sleep (+50%); lose and you gain nothing. He could kill you any time. He'd rather play. Lose a match and he makes you wait 20 seconds. The Pale Customer is him, too, wearing a customer's face." },
      { type: 'feature', text: "The Pale Customer: now and then a stranger offers far above market value for one of your cars. The money might be ash by morning. +18 Dread if you take it." },
      { type: 'feature', text: "Wards: three Nightmare-only upgrades — Salt Lines, Floodlight Array and Lot Chapel — that push the night back for good. Plus ten Nightmare-only omens in the market-event pool, and \"Night N\" replaces \"Day N\" with a creeping line of text between nights." },
      { type: 'feature', text: "New soundtrack for Nightmare: \"Lullaby for an Empty Lot\". A slow dark-ambient piece — breathing sub drone, drifting pad chords, a slightly out-of-tune music box, low wind and distant whispers, with a very soft heartbeat that only appears as Dread rises. Unsettling but calm. All synthesized in the browser, like the rest of the music. UI sounds also drop in pitch on Nightmare." },
      { type: 'feature', text: "28 new achievements, including Nightmare-only goals (nights survived, sales, candles, exorcisms, Pale Customer deals, Reckonings, Wards) and two secrets. Unlock all of the others for Lucid Dreamer." },
      { type: 'fix', text: "Game Over screen: \"New Game\" now starts a fresh run on the same difficulty you just lost on (it always restarted on Hard before)." },
    ],
  },
  {
    version: '1.18.8',
    date: 'September 2026',
    notes: [
      { type: 'fix', text: "Change log: Chore entries (and the older Parts and Repair entries) now have proper colored labels instead of showing as plain unstyled text." },
    ],
  },
  {
    version: '1.18.7',
    date: 'September 2026',
    notes: [
      { type: 'fix', text: "Showroom cars are now fully excluded from save trimming — they keep their complete recon history and every other detail. Only Car Lot cars have their oldest recon entries trimmed." },
    ],
  },
  {
    version: '1.18.6',
    date: 'September 2026',
    notes: [
      { type: 'chore', text: "Smaller save files. Sold-car records used to keep a full copy of the car (hidden issues, service history, lease data and more) forever; saves now keep only what Receipts, stats and achievements actually use. Your 150 most recent sales keep their full purchase agreements, and older sales shrink to a short summary (they still count toward totals and achievements, and appear in Receipts as older sales). Car Lot cars also keep only their latest 10 recon entries (Showroom cars are never trimmed). Existing saves shrink automatically the next time they save." },
    ],
  },
  {
    version: '1.18.5',
    date: 'September 2026',
    notes: [
      { type: 'balance', text: "Car Wash is now a one-time job per car instead of something you could repeat every few days. The +4% value bump and the +10% sale-chance boost now last for as long as you own the car, and the Wash button turns into a permanent 'Washed' marker. Cars that were mid-boost or already washed in an existing save count as washed." },
    ],
  },
  {
    version: '1.18.4',
    date: 'September 2026',
    notes: [
      { type: 'fix', text: "Added the Reduce Motion switch and Brightness slider to the main menu Settings screen (Display), so they can be changed before loading a save. They stay in sync with the in-game Settings tab." },
    ],
  },
  {
    version: '1.18.3',
    date: 'September 2026',
    notes:
[
      { type: 'fix', text: "Fixed the Reduce Motion switch and the new Brightness slider (and its Reset button) doing nothing when clicked in Settings > Display." },
    ],
  },
  {
    version: '1.18.2',
    date: 'September 2026',
    notes: [
      { type: 'fix', text: "Fixed the Reduce Motion setting not doing enough. It only covered a short list of effects, so staff icons and progress bars, the main menu, credits, auction pulses, tab fades and smooth scrolling kept animating. Turning it on now stops all animation and transitions across the game, and it also skips the intro logo animation on the next launch." },
    ],
  },
  {
    version: '1.18.1',
    date: 'September 2026',
    notes: [
      { type: 'feature', text: "New Brightness slider in Settings > Display. Drag it from 50% to 150% to dim or brighten the whole game (menus included) to suit your screen. Your choice is saved on this browser, and a Reset button snaps it back to 100%." },
    ],
  },
  {
    version: '1.18.0',
    date: 'September 2026',
    notes: [
      { type: 'feature', text: "Staff rework: your staff now buy, fix and sell cars on their own. Each staffer scouts for a deal, buys the car with your cash, repairs it if needed and sells it. The car sits on your Car Lot the whole time with the staffer's name on it, and the Staff page shows every live deal with animated icons and progress bars. Each staffer can run as many deals at once as their Speed stat." },
      { type: 'feature', text: "Staff ranks: Rookie, Salesperson, Senior Dealer, Lead Dealer and Master Dealer, based on average skill. A higher rank means cheaper buys, higher sale prices, a bigger spending budget and faster turnaround. Every completed flip sharpens a skill, so staff get promoted over time, and each promotion raises their wage by 8%. Each staffer's card now tracks their flips, total profit and best flip." },
      { type: 'balance', text: "Staff safety limits: staff never spend the last $5,000 of your cash, need 2 free Car Lot slots before buying, and avoid stolen or bad-VIN cars, lemons and heavily crashed cars. Only Senior Dealers and above will buy salvage-title cars. A new Pause/Resume button stops staff from starting new deals." },
      { type: 'feature', text: "You can now fire staff. Each hired staffer has a Fire button (click twice to confirm) that costs 2 days of their wages as severance. Any car they were working on stays on your lot as a normal car." },
      { type: 'fix', text: "Removed the 'Staff: List All Cars' button from the Car Lot. It did nothing useful." },
      { type: 'feature', text: "Three Auction Houses: the Auctions page now opens on a house picker styled like the Insurance page. Choose Ironside Salvage Auctions (salvage-title wrecks and project cars), Main Street Auto Auction (everyday clean-title cars) or Kessler & Vale (the original ultra-rare hypercars and icons). Each house runs its own rotating lots, with cheaper inspections at the first two. Existing lots are kept as Kessler & Vale lots." },
    ],
  },
  {
    version: '1.17.0',
    date: 'September 2026',
    notes: [
      { type: 'feature', text: "Showroom Draw: a well-stocked showroom floor now brings more buyers through the door, just like a real dealership. Every car on display in Excellent (A) condition adds +3.5% sale chance to every car you have listed for sale, and every Good (B) car adds +2.1%. The bonus stacks across the whole floor, up to a maximum of +40%. Fair and Poor cars, and salvage or lemon titles, add nothing, so keep the floor sharp. The bonus also raises how often buyers make offers on your listings." },
      { type: 'feature', text: "The Showroom tab has a new Showroom Draw panel showing your current bonus and how close you are to the cap, and every pedestal now shows how much that car adds (or why it adds nothing). Sale Chance / Day on your listings includes the bonus automatically." },
      { type: 'balance', text: "The Showroom is no longer just a place to keep cars you never want to sell. Building it and filling it with clean, good-condition cars is now a real sales strategy for your lot." },
    ],
  },
  {
    version: '1.16.0',
    date: 'September 2026',
    notes: [
      { type: 'feature', text: "Added a favicon: a little blue car with a dollar-sign badge shows on the browser tab, bookmarks and when saved to a phone home screen." },
      { type: 'feature', text: "The Upgrades page is now a skill tree. Each category is its own compact branch of small tiles connected by lines showing what unlocks what. Click a tile to read what it does, see its requirements, and buy it from the detail panel. Tiles are colour coded: green is owned, glowing is affordable, dim is locked, and a coloured dot shows the game stage. Multi-level upgrades show pips for each level. The whole tree fits far more on screen, so there's much less scrolling." },
      { type: 'fix', text: "Trade-in profit is no longer double counted. A car you took in on trade used to have a $0 cost, so reselling it showed a huge profit even though its value had already been counted as income on the car you traded it for. Trade-in cars now cost what you credited the customer for them, so each deal's profit is shown fairly. Trade-in cars already on your lot in existing saves get a cost equal to their current value. Past sales in your history are left as they were." },
      { type: 'fix', text: "Auction House: you can now click the big circle in the middle of the bidding ring to place a bid (or to hammer the sale when selling), as well as using the Bid button or Space. The circle still starts the auction too." },
      { type: 'feature', text: "Achievements are now shared across your whole game on this browser. Unlock one in any save slot and it stays unlocked in every slot and every new game. Achievements you already earned in existing saves are merged in automatically the first time you load this version." },
      { type: 'feature', text: "64 new achievements, bringing the total to 125. New goals cover sales milestones, cash and profit targets, longer runs, category specialists, staff, upgrades, the Showroom, auctions, trade-ins, leases, credit score, hard mode and more." },
      { type: 'fix', text: "Fixed \"Not Today\": stolen cars you identified and turned down only counted if you clicked Decline. Walking away from a negotiation, letting the listing rotate off the Used Market, or rejecting or ignoring a stolen trade-in car now count as well. Each stolen car counts once." },
      { type: 'fix', text: "Fixed \"Crash Rebuilder\": the game checked a car's crash severity after the repair had already cleared it, so the counter never moved. It now remembers how badly the car was damaged before the repair, and counts the car when you sell it (a profit is no longer required)." },
    ],
  },
  {
    version: '1.15.1',
    date: 'September 2026',
    notes: [
      { type: 'fix', text: "Used Market sellers can no longer pay you to take a car. Badly damaged cars used to be able to list with a negative asking price; the lowest a used car can be listed for is now $0. Existing negative listings in your save are corrected." },
      { type: 'fix', text: "Trade-in requests are fixed. A customer's trade-in car is now always worth less than the price of the car they're buying, and customers never ask you to pay them cash to take their car — they only ever add cash on top, or nothing. You also can't counter a trade-in with a negative cash amount. Any older requests that broke these rules are removed or corrected when you load your save." },
      { type: 'fix', text: "Auction House: fixed lots showing $NaN for the opening bid, bid increment and estimate. Broken market values are repaired automatically." },
    ],
  },
  {
    version: '1.15.0',
    date: 'September 2026',
    notes: [
      { type: 'feature', text: "New: The Auction House. The Used Market now has two pages, just like Finance — the everyday Catalog you already know, and a brand-new Auctions page at Kessler & Vale Auction House, where extremely rare cars go under the hammer. Hypercars, coachbuilt one-offs and retired icons like the Bugatti La Voiture Noire, Ferrari F40, Pagani Zonda Cinque, McLaren P1 and Rolls-Royce Boat Tail turn up as featured lots. The floor holds a few lots at a time and rotates every few days." },
      { type: 'feature', text: "Live bidding, straight out of Car Mechanic Simulator. Enter a lot, press Start, and a countdown ring runs while a room of named bidders fights you for the car. Every bid resets the clock; the ring turns green when you're winning and red when you're not. Pick your bid size with the − / + buttons (1×, 2×, 5×, 10× the increment) and press Space to bid fast. The game calendar never moves during an auction — only the ring does." },
      { type: 'feature', text: "Auction your own cars. Consign any car from your Car Lot (new 'Auction' button on every Car Lot card, or from the Auctions page), set a reserve price, and watch the room bid it up. Hit Accept the moment the reserve is met to take the money early, or let the ring run out and gamble that someone pushes it higher. Miss your reserve and the car comes home unsold — the listing fee is non-refundable and the house won't re-list it for 3 days." },
      { type: 'feature', text: "Every lot has an estimate and a level of buyer interest (Low to Frenzy). Estimates are fuzzy — pay for a pre-sale inspection to get the real appraisal and reveal hidden issues before you bid. Some lots carry provenance (Concours Winner, Race-Proven Chassis, Celebrity Provenance, Barn Find and more) that changes what the car is really worth. Every auction car has a verified clean title." },
      { type: 'balance', text: "House fees: a 5% buyer's premium on top of your winning bid, and a 6% seller's commission plus a small listing fee when you consign. Wholesale Auction Membership now also cuts those to 3% and 4% and adds an extra lot to the floor. Inspection Tools halve the cost of pre-sale inspections." },
      { type: 'feature', text: "Three new achievements: Going, Going, Gone; Under the Hammer; and Seven-Figure Paddle. Cars won at auction show an Auction source and their provenance in your Car Lot." },
      { type: 'chore', text: "Save format bumped to v18 — existing saves upgrade automatically. Fixed the main menu's version label, which was still showing v1.13." },
    ],
  },
  {
    version: '1.14.0',
    date: 'September 2026',
    notes: [
      { type: 'feature', text: "New: The Showroom. Build a private showroom to display cars you never want to sell — discontinued classics, one-offs, whatever you can't bear to let go — without them eating into your Car Lot capacity. Showroom cars are also safe from theft. Move any car into the Showroom from the Car Lot, and expand it through four tiers, from a 3-car Private Showroom up to the 16-car Private Collection Wing." },
      { type: 'feature', text: "Its own stylized tab: velvet-rope pedestal cards with a spotlight glow for every car on display, plus a marquee entrance screen before you build it." },
      { type: 'chore', text: "The Receipts tab has moved — purchase agreements now live under a new Receipts sub-tab inside Finance, so Finance is your one-stop shop for credit, loans, and past sales. The old top-level Receipts button has been replaced by the new Showroom button." },
    ],
  },
  {
    version: '1.13.0',
    date: 'September 2026',
    notes: [
      { type: 'balance', text: "Production audit — cars that are no longer built are now Used Market only and can never be ordered new from the Factory. Retired for 2026: Kia Forte (replaced by the K4), Kia Stinger, Kia Soul, Audi R8, Audi A4, Honda NSX, Nissan GT-R, Chevrolet Camaro and Malibu, Dodge Challenger and the previous-generation Charger, Ford Escape, Edge, and Shelby GT500/Mach 1, Lincoln Corsair, Cadillac XT4/XT5, Infiniti Q50/Q60/QX50, Acura TLX, Toyota Venza and bZ4X, Subaru Legacy and WRX STI, Mitsubishi Mirage and Eclipse Cross, Volvo S60, Maserati Ghibli and Levante, Alfa Romeo Quadrifoglios, Dodge Hornet, Jeep Wagoneer, Porsche 718 Cayman, Ferrari Roma, Lamborghini Huracán, Tesla Model S and Model X, and more. Each one only rolls model years from its real production run, and shows the Discontinued badge." },
      { type: 'balance', text: "Bugatti Chiron, Mistral and Bolide, the Pagani Huayra BC, and the McLaren GT have also ended production, so they are now rare used-market-only finds too." },
      { type: 'feature', text: "Kia lineup completed — new K4 sedan (LX through GT-Line Turbo) and K4 Hatchback, EV9, Niro and Niro EV, Sportage Hybrid/X-Pro/Plug-In, Sorento Hybrid/Plug-In, Carnival SX and SX Prestige, Telluride X-Line/X-Pro, EV6 GT, and Seltos S/X-Line. Older Kias — Rio, Optima, Sedona, Cadenza, K900, and Niro Plug-In — are used-market classics." },
      { type: 'feature', text: "The full Tesla lineup is here — Model 3 (Standard, Premium RWD/AWD, Performance), Model Y (Standard, Premium, L, and Performance), and the Cybertruck (Dual Motor, Premium, Cyberbeast). The original Roadster is a rare used find, and the retired Model S and Model X remain available used." },
      { type: 'feature', text: "New brand: Slate — the bare-bones, customizable Slate Truck is orderable as the Blank Slate pickup or the Squareback and Fastback SUV conversions." },
      { type: 'feature', text: "Rolls-Royce joins the showroom — Ghost, Cullinan, Phantom, and the all-electric Spectre are orderable new, while the Wraith, Dawn, Phantom VII, Ghost Series I, Silver Shadow, and Silver Spirit are used-only. The DeLorean DMC-12 (manual and automatic) is a rare used-market find." },
      { type: 'feature', text: "More supercars and hypercars — new: Aston Martin (Vantage, DB12, DBX, Vanquish, Valhalla), Ferrari 12Cilindri, Purosangue, Amalfi and F80, Lamborghini Temerario and Urus SE, McLaren W1 and GTS, Maserati MC20/GranCabrio/Grecale, Lotus Emira and Evija, Koenigsegg CC850/Gemera/Jesko Absolut, Pagani Utopia Roadster, Rimac Nevera R, and Bugatti Tourbillon. New used-only icons include the Ferrari F40, F50, Enzo and LaFerrari, Lamborghini Aventador/Countach/Diablo, McLaren P1/Senna/Speedtail, Porsche Carrera GT and 918 Spyder, Lexus LFA, Ford GT, Mercedes SLS AMG and AMG ONE, Aston Martin Valkyrie, Koenigsegg Regera and Agera RS, Pagani Zonda, and Bugatti Divo, Centodieci and EB110." },
      { type: 'feature', text: "Plenty more new metal: the new-generation Dodge Charger (Sixpack R/T and Scat Pack) and Charger Daytona Scat Pack, Chevrolet Bolt and Equinox EV, Toyota bZ, Nissan Leaf, Hyundai IONIQ 9, Genesis G90 and GV60, Audi A5/e-tron GT/RS 6 Avant/Q6 e-tron, BMW i4/i5/M5, Porsche 911 GTS and GT3 plus Macan Electric, Lucid Air, Polestar 3 and 4, Mini Cooper and Countryman, Volvo EX90, Volkswagen Golf R/Taos/ID.4, and Ford Bronco Sport." },
      { type: 'feature', text: "Roughly 200 more retired favorites are lurking on the Used Market, including the Jaguar F-Type/XJ220, Ford Fusion, Chevy Impala/Cruze/Bolt EV, Honda Fit/Insight/Element, Nissan Maxima/Titan/350Z/Skyline R32-R33, Mazda6/CX-9/RX-8, Mitsubishi 3000GT, Dodge Demon, Shelby GT350, Fisker Ocean, and Alfa Romeo 4C. The catalog now stands at 1,041 trims." },
    ],
  },
  {
    version: '1.12.0',
    date: 'September 2026',
    notes: [
      { type: 'feature', text: "The in-game soundtrack is now a rotating playlist of five original tracks instead of one — \"Showroom Bossa\" (the original warm chill-bossa), plus four new pieces: \"Open Road\" (a brighter, driving mallet-ostinato track), \"Late Shift\" (a slow, moody felt-piano ambience for the quiet end of a long day), \"Sunday Lot\" (a laid-back acoustic-pluck feel), and \"Neon Drive\" (an energetic after-dark synth pulse). Every ~10 minutes of actual gameplay, playback eases into the next track and loops back around once it's been through all five — each one its own key, tempo, and instrumentation, not just a remix of the others. The calm menu loop is untouched." },
    ],
  },
  {
    version: '1.11.2',
    date: 'September 2026',
    notes: [
      { type: 'fix', text: "Fixed the main menu soundtrack not playing after a fresh page load/refresh on the main menu — it would stay silent until you'd started a game and returned to the menu at least once. The track-switching logic was treating \"already on the menu track by default\" as \"already playing,\" so it never actually armed the loop." },
    ],
  },
  {
    version: '1.11.1',
    date: 'September 2026',
    notes: [
      { type: 'fix', text: "Reworked the in-game soundtrack so it's a genuinely different, warmer piece from the calm menu loop — not the menu track with extra layers. New key and chord voicings, a plucked bossa-style bass, a soft marimba-style melodic arpeggio, and a light brushed-shaker groove, still upbeat but relaxed rather than busy." },
    ],
  },
  {
    version: '1.11.0',
    date: 'September 2026',
    notes: [
      { type: 'feature', text: 'The soundtrack now has two tracks: the original calm ambient loop, which plays on the main menu and any Settings page, and a new livelier in-game track with a walking bass line and syncopated comping for the rest of gameplay — same synthesized, royalty-free style, just more upbeat and active.' },
      { type: 'feature', text: "The in-game track's tone now reacts to how the dealership is doing — reputation, cash on hand, and outstanding debt set its overall mood, and a good sale or a fine/warning gives it a short-lived brighter or darker nudge." },
    ],
  },
  {
    version: '1.10.0',
    date: 'September 2026',
    notes: [
      { type: 'feature', text: 'Added background music — a soft, original ambient lounge loop that plays while you run the lot, synthesized entirely in-browser (no audio files, fully royalty-free). New Music controls live in Settings (and the main menu) with their own mute toggle and volume slider, separate from SFX.' },
    ],
  },
  {
    version: '1.9.0',
    date: 'September 2026',
    notes: [
      { type: 'feature', text: 'Added a Credits button to the main menu — a stylized, cinematic roll crediting the people who made the game: Game Directed By, Game Produced By, and Game Designed By Lucas Palmquist, and QA Tested By Raaed Baig.' },
    ],
  },
  {
    version: '1.8.6',
    date: 'September 2026',
    notes: [
      { type: 'fix', text: "The Car Lot sort control still opened an unstyled white list, because a native &lt;select&gt;'s &lt;option&gt; menu is rendered by the OS and mostly ignores CSS in every major browser — styling the box never touches the open list. Replaced it with a fully custom dropdown (button + a hand-built menu) that's themed end to end, in both light and dark mode." },
    ],
  },
  {
    version: '1.8.5',
    date: 'September 2026',
    notes: [
      { type: 'fix', text: 'The Car Lot sort dropdown was rendering as an unstyled, plain-white browser default. It now matches the game\'s theme (dark background, custom arrow, light/dark mode support) instead of looking out of place.' },
    ],
  },
  {
    version: '1.8.4',
    date: 'September 2026',
    notes: [
      { type: 'feature', text: 'Car Lot now has a Sort by dropdown — Market Value, Mileage, Type, Year, Condition, or Days on Lot, ascending or descending. Whatever sort you pick, any car that needs maintenance (unrepaired issues, or Fair/Poor condition) is always pinned to the top of the list and flagged with a NEEDS MAINTENANCE badge, so a problem car never gets buried further down.' },
    ],
  },
  {
    version: '1.8.3',
    date: 'September 2026',
    notes: [
      { type: 'feature', text: 'Doubled the hidden-issue pool for used cars and lease neglect (12 → 24 problems), adding Head Gasket Leak, Turbocharger Failure, Infotainment/Electronics Fault, Fuel Pump Failure, Alternator Failure, Differential/Axle Wear, Oxygen Sensor Failure, Water Pump Failure, Windshield Crack, Wheel Bearing Noise, Battery Near End of Life, and Worn Tires. The odds of a car having any issues at all, by condition grade, are unchanged — this only adds variety to which problems show up.' },
      { type: 'balance', text: "Big-ticket repairs (engine, transmission, turbo, head gasket, catalytic converter, electronics) now cost a percentage of the vehicle's value instead of one flat number for every car — a Poor-condition luxury car's transmission slip now runs real luxury-shop money instead of the same bill as an economy compact's. Routine wear items (brakes, oil leak, a battery) stay flat, priced by the job rather than the car." },
    ],
  },
  {
    version: '1.8.2',
    date: 'September 2026',
    notes: [
      { type: 'balance', text: 'Lease crash base rate raised again (~0.06%/day, ~19%/year of continuous leasing) — wrecked lease vehicles should now clearly outpace lot theft, on top of the 1.8.1 rebalance.' },
    ],
  },
  {
    version: '1.8.1',
    date: 'September 2026',
    notes: [
      { type: 'balance', text: 'Car theft rebalanced to match real-world rates — even a fully unsecured, late-game lot now tops out around a 6%/year theft risk per car instead of the old runaway near-certainty, and Security upgrades still cut that further (down to under 1%/year at Fortress Protocol).' },
      { type: 'balance', text: 'Leased vehicles now crash somewhat more often than before, reflecting that a car actually out on the road every day carries more real-world collision risk than a parked car getting stolen — theft should no longer feel more common than lease wrecks.' },
    ],
  },
  {
    version: '1.8.0',
    date: 'September 2026',
    notes: [
      { type: 'feature', text: 'New Insurance tab: sign a monthly policy with one of three insurers — ValueGuard (cheap but high deductible and a $50k coverage cap), Continental Auto Assurance (balanced, no cap), or Sterling Fleet Protect (near-full coverage, zero waiting period, but pricey with an early-cancellation fee). Insured cars stolen off the lot now pay out a market-value claim instead of a total loss, and lease vehicles that crash are either totaled out for a full payout or have their repair bill covered, depending on whether the frame was damaged.' },
      { type: 'feature', text: 'Insurance is fully optional — go without and save the premium, or sign up and cancel anytime (Sterling charges an early-exit fee inside its first 20 days). Premiums bill automatically every 30 days based on your total insured fleet value; miss a payment with insufficient cash and the policy lapses.' },
    ],
  },
  {
    version: '1.7.3',
    date: 'September 2026',
    notes: [
      { type: 'feature', text: 'Neglect now has real consequences on leases: a car sent out on lease still carrying unrepaired mechanical issues breaks down faster (higher daily chance of new issues) and crashes more often the more issues it\'s carrying — skipping repairs before leasing is now a real gamble, not a free pass.' },
      { type: 'fix', text: "Cars with unrepaired crash damage can no longer be offered for lease at all — repair the damage first. The Leasing tab now shows blocked cars with their damage severity instead of an Offer Lease button." },
    ],
  },
  {
    version: '1.7.2',
    date: 'September 2026',
    notes: [
      { type: 'balance', text: 'Unrepaired crash damage now hits actual value hard, not just sale speed: the value penalty jumped from 4/14/28% to 18/42/68% for minor/moderate/severe damage, so a wrecked car is genuinely worth way less — whether or not the damage has been discovered yet.' },
      { type: 'fix', text: "Repairing crash damage now brands a clean-titled car \"Rebuilt\" and applies the standard rebuilt-title discount in place of the old unrepaired-crash penalty — repaired is worth noticeably more than unrepaired, but a rebuilt title never sells for full clean-title money." },
    ],
  },
  {
    version: '1.7.1',
    date: 'September 2026',
    notes: [
      { type: 'fix', text: 'Shortened the service bay\'s "Service complete — collect payment!" status label to just "Service complete" — it was running too long in the detail panel.' },
    ],
  },
  {
    version: '1.7.0',
    date: 'September 2026',
    notes: [
      { type: 'feature', text: 'New "Receipts" tab: every completed sale now generates a real-looking signed Purchase Agreement (Buyer\'s Order) — dealer letterhead, vehicle description, VIN, and an itemized price breakdown. Click any past sale to pull up the full document.' },
      { type: 'feature', text: 'Real dealer fees added to every sale: a $499 Documentation Fee, $85 Title Fee, and $60 Registration Fee are now collected from the buyer on top of the negotiated price — and, like at a real dealership, they go straight to your bottom line as extra profit.' },
    ],
  },
  {
    version: '1.6.6',
    date: 'September 2026',
    notes: [
      { type: 'fix', text: 'Found the real source of razor-thin (often negative) margins: when a car was priced at or near fair market value, buyer offers averaged only ~84% of list price — below what most cars cost you at invoice, meaning the "average" sale was actually a loss before fees and overhead even kicked in. Buyer offers on fairly-priced cars now average ~93% of list, so pricing a car sensibly actually turns a real profit instead of relying on a lucky high roll.' },
    ],
  },
  {
    version: '1.6.5',
    date: 'September 2026',
    notes: [
      { type: 'balance', text: 'Tier 1 (starting) lot overhead cut from $300/day to $125/day, and Tier 2 from $600/day to $450/day. A factory car only clears about a 12-13% margin over invoice, so heavy day-one overhead was silently eating that whole profit before the car even sold.' },
      { type: 'balance', text: 'New small-lot focus bonus: with only 1-2 cars listed for sale, sale chance gets a +35% boost (+15% at 3-4 listings), reflecting the extra hustle a dealer can put behind a small inventory. This mainly helps in the opening days when you\'ve only got a car or two on the lot.' },
    ],
  },
  {
    version: '1.6.4',
    date: 'September 2026',
    notes: [
      { type: 'balance', text: 'Car theft chance roughly halved across the board, so a growing, un-upgraded lot is far less punishing.' },
      { type: 'balance', text: 'Security Camera System down from $75,000 to $20,000, and Guard Station down from $175,000 to $60,000, so you can afford real theft protection much earlier in the game.' },
      { type: 'fix', text: 'Leased cars can no longer be stolen off the lot — they\'re out with the lessee under a signed lease agreement, not sitting in inventory, so theft now only targets cars you actually have on the lot.' },
    ],
  },
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

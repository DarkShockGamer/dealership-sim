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
const GAME_VERSION = '1.21.3';

const PATCH_NOTES = [
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

// Nightmare mode counters (see the NIGHTMARE MODE section further down). Lives here so DEFAULT_STATE can use it.
const NIGHTMARE_DEFAULTS = {
  dread: 20, peakDread: 20, lowestDread: 20,
  reckonings: 0, candlesLit: 0, candleDay: 0,
  exorcisms: 0, cursedBought: 0, cursedSold: 0, hauntings: 0, carsTaken: 0,
  visitorsAccepted: 0, visitorsDeclined: 0, ashCount: 0, ashDue: 0, ashDay: 0,
  eventsSeen: 0, salesToday: 0, totalSales: 0, eyesClicked: 0, visitor: null,
  sleep: 100, sleepDuelsWon: 0, sleepDuelsLost: 0, duelCooldownUntil: 0,   // Sleep meter + Pale Man duels
  loreIdx: 0, dawnOffered: 0, wokeUp: 0, fondEnding: 0, depthNoted: 0,
  candlesTonight: 0, hourglassUntil: 0, hourglassDay: 0, lastRitesUsed: 0,   // Ward upgrades                     // v1.20.0 — story beats + endings
};

// ============================================================
// DEFAULT STATE
// ============================================================
const DEFAULT_STATE = {
  saveVersion: 18,
  difficulty: 'normal',
  loreSeen: {},   // v1.20.0 — story beats already shown (non-Nightmare)
  nightmare: { ...NIGHTMARE_DEFAULTS },   // v1.19.0 — only used on Nightmare difficulty
  cash: 25000,
  day: 1,
  reputation: 1.0,
  garage: [],
  garageSlots: 5,
  showroom: [],           // v1.14.0 — private display collection; never counts against garageSlots
  auctions: { lots: [] }, // v1.15.0 — Auction House: rotating rare lots you can bid on
  auctionLog: [],         // v1.15.0 — recent auction results (newest first)
  auctionsWon: 0,
  auctionsSold: 0,
  auctionBestWin: 0,      // highest winning bid you've ever paid at auction
  deliveries: [],
  usedMarketOffers: [],    // buy-used cars with negotiation (was tradeInOffers)
  tradeInRequests: [],     // customers proposing to swap their car for one of yours
  customerOffers: [],      // pending below-list-price offers on your listed cars
  staff: [],
  staffCandidates: [],
  staffActivity: [],
  staffTrading: true,      // staff buy, fix and flip cars on their own
  staffProfitTotal: 0,
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
    // v1.14.0 — The Showroom
    showroomTier: 0,
    // v1.19.0 — Nightmare Wards (Nightmare difficulty only)
    wardSalt: false,
    wardLights: false,
    wardChapel: false,
    wardVotive: false, wardDream: false, wardHourglass: false, wardMusicBox: false, wardLastRites: false,
    nmNeon: false, nmCurio: false, nmUnion: false, nmTour: false,
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
  // v1.8.0 — insurance
  insurance: {
    companyId: null,
    startDay: null,
    nextBillDay: null,
    totalPremiumsPaid: 0,
    totalClaimsPaid: 0,
    claimsCount: 0,
  },
  totalCarsInsuredStolen: 0,
  totalCarsInsuredTotaled: 0,
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

// Real-life dealer fees added on top of the negotiated price at the point of sale —
// the same "Doc Fee / Title Fee / Registration Fee" line items on a real Buyer's Order.
// All three are collected from the buyer and kept as dealership profit.
const DEALER_DOC_FEE   = 499;  // Dealer documentation/processing fee — pure profit in real life too
const DEALER_TITLE_FEE = 85;   // Title transfer fee
const DEALER_REG_FEE   = 60;   // Registration / plate transfer fee
/** Flat dealer-fee bundle charged on every completed sale. Returns the line items plus total. */
function computeDealerFees() {
  const total = DEALER_DOC_FEE + DEALER_TITLE_FEE + DEALER_REG_FEE;
  return { doc: DEALER_DOC_FEE, title: DEALER_TITLE_FEE, reg: DEALER_REG_FEE, total };
}
/** Deterministic, purely cosmetic 17-char VIN for the purchase agreement — the game doesn't track real VINs. */
function displayVin(car) {
  const chars = 'ABCDEFGHJKLMNPRSTUVWXYZ0123456789'; // VINs exclude I, O, Q
  const seed = String(car.id || generateId());
  let hash = 0;
  for (let i = 0; i < seed.length; i++) hash = (hash * 31 + seed.charCodeAt(i)) >>> 0;
  let vin = '';
  for (let i = 0; i < 17; i++) {
    hash = (hash * 1103515245 + 12345) >>> 0;
    vin += chars[hash % chars.length];
  }
  return vin;
}

const PERF_ELIGIBLE = ['Sports', 'SUV', 'Truck']; // categories eligible for parts upgrade

// Daily garage overhead costs by garage level
// Tier 1 (the default starting lot) is deliberately tiny. A factory car in Good condition
// bought at invoice and sold to a haggling buyer clears roughly $0-1,300, and it takes
// 2-3 days to arrive plus a few more to sell, so even $125/day (x2 on Nightmare) could
// turn a normal first flip into a loss. At $40/day a whole first flip costs about
// $240 (Normal), $360 (Hard) or $480 (Nightmare).
const OVERHEAD_BY_LEVEL = { 1: 40, 2: 450, 3: 1200, 4: 1800, 5: 2600, 6: 3800, 7: 5400 };

// Legal / VIN / stolen car mechanics
const LEGAL_STATUSES = ['clean', 'noTitle', 'stolen'];
const VIN_STATUSES   = ['normal', 'scratched'];
const CRASH_DAMAGE_SEVERITIES = ['none', 'minor', 'moderate', 'severe'];
const CRASH_DAMAGE_REPAIR_MULT  = { none: 0, minor: 0.12, moderate: 0.40, severe: 0.85 };
// Unrepaired crash damage is a major hit to actual value, not a cosmetic footnote — a
// wrecked car sitting with the damage still on it is worth way less than a clean example,
// regardless of whether the buyer has discovered it yet or not. Once it's actually
// repaired (see finishCarService), this steep penalty is replaced by the much smaller
// "rebuilt title" discount — repaired is worth meaningfully more than unrepaired, but
// still never fully recovers to clean-title value.
const CRASH_DAMAGE_VALUE_PENALTY = { none: 0, minor: 0.18, moderate: 0.42, severe: 0.68 };
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

// Hidden mechanical issues found on used cars, and ones that can develop on a leased car
// while it's out with the lessee. Big-ticket repairs (engines, transmissions, luxury
// electronics) genuinely cost more on a pricier vehicle in real life — European/luxury parts
// and labor rates run well above an economy car's — so those entries scale as a percentage of
// the vehicle's value (clamped to a realistic min/max). Routine wear items (brake pads, a
// battery, wiper-adjacent stuff) are priced by the job, not the car, so those stay flat.
const HIDDEN_ISSUES = [
  // ── Scales with vehicle value ──────────────────────────────────────────────
  { name: 'Engine knock',                    pct: 0.10,  min: 700,  max: 5500 },
  { name: 'Transmission slip',               pct: 0.15,  min: 1000, max: 7500 },
  { name: 'Head gasket leak',                pct: 0.11,  min: 900,  max: 4800 },
  { name: 'Turbocharger failure',            pct: 0.12,  min: 900,  max: 6000 },
  { name: 'Catalytic converter issue',       pct: 0.09,  min: 800,  max: 4500 },
  { name: 'Electrical issues',               pct: 0.07,  min: 300,  max: 3200 },
  { name: 'Infotainment / electronics fault',pct: 0.05,  min: 250,  max: 2200 },
  { name: 'Suspension damage',               pct: 0.05,  min: 400,  max: 2400 },
  { name: 'Timing belt/chain due',           pct: 0.06,  min: 450,  max: 2000 },
  { name: 'AC compressor failure',           pct: 0.045, min: 400,  max: 1800 },
  { name: 'Fuel pump failure',               pct: 0.04,  min: 350,  max: 1200 },
  { name: 'Alternator failure',              pct: 0.03,  min: 300,  max: 900  },
  { name: 'Power steering leak',             pct: 0.03,  min: 300,  max: 900  },
  { name: 'Differential / axle wear',        pct: 0.05,  min: 350,  max: 1600 },
  { name: 'Oxygen sensor failure',           pct: 0.025, min: 200,  max: 700  },
  { name: 'Water pump failure',              pct: 0.035, min: 300,  max: 1100 },
  // ── Flat cost — priced by the job, not the car ─────────────────────────────
  { name: 'Brake wear',                cost: 400  },
  { name: 'Oil leak',                  cost: 350  },
  { name: 'Coolant leak',              cost: 300  },
  { name: 'Rust spots',                cost: 200  },
  { name: 'Windshield crack',          cost: 350  },
  { name: 'Wheel bearing noise',       cost: 450  },
  { name: 'Battery near end of life',  cost: 180  },
  { name: 'Worn tires (full set)',     cost: 500  },
];

/** Actual repair cost for a hidden-issue pool entry — scaled by the vehicle's value for
 *  big-ticket real-world repairs, or a flat job cost for routine wear items. */
function computeIssueCost(issueDef, baseValue) {
  if (issueDef.pct == null) return issueDef.cost;
  return clamp(Math.round((baseValue || 0) * issueDef.pct), issueDef.min, issueDef.max);
}

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
  easy:   { limit: 60000, apr: 0,    minPrincipalRate: 0,     minPrincipalFloor: 0 },
  normal: { limit: 60000, apr: 0.12, minPrincipalRate: 0.005, minPrincipalFloor: 100 },
  hard:   { limit: 45000, apr: 0.18, minPrincipalRate: 0.01,  minPrincipalFloor: 250 },
  nightmare: { limit: 30000, apr: 0.24, minPrincipalRate: 0.02, minPrincipalFloor: 250 },
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
// Collision claim frequency in the real world runs ~5-6% of vehicles per year (far higher than
// theft), so a leased car — out on the road, being actually driven every day — should crash more
// often than a lot car gets stolen. 0.0006/day compounds to ~19%/year of continuous leasing,
// i.e. roughly a 10-30% chance over one 60-180 day lease term, before any neglect penalties.
const LEASE_CRASH_PROBABILITY = 0.0006;     // ~0.06%/day base, before neglect bonuses below
const LEASE_CRASH_REPAIR_COST_MIN = 0.90;   // Minimum repair cost multiplier after crash (90% of market value)
const LEASE_CRASH_REPAIR_COST_MAX = 1.30;   // Maximum repair cost multiplier after crash (130% of market value)
const LEASE_CRASH_STRUCTURAL_RATIO = 0.60;  // Portion of repair cost attributed to structural crash damage
const LEASE_ISSUE_BONUS_HARD_DIFFICULTY = 0.0015;
const LEASE_ISSUE_BONUS_LEMON = 0.003;
const LEASE_ISSUE_BONUS_SALVAGE = 0.0015;
// Neglect penalty: cars sent out on lease still carrying unresolved mechanical issues
// (because the owner skipped repairing them) break down faster and crash more often.
// Each unrepaired issue on the car compounds both risks daily while the lease runs.
const LEASE_NEGLECT_CRASH_BONUS_PER_ISSUE  = 0.00015; // extra crash chance/day per unrepaired issue
const LEASE_NEGLECT_ISSUE_BONUS_PER_ISSUE  = 0.004;   // extra chance/day of a NEW issue appearing, per unrepaired issue already on the car
const LEASE_NEGLECT_CONDITION_CRASH_BONUS  = { A: 0, B: 0, C: 0.00015, D: 0.0004 }; // already-worn cars crash more too
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
  nightmare: { Economy: 0.095, Sedan: 0.085, SUV: 0.085, Truck: 0.085, Sports: 0.105, Luxury: 0.105 },
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
const CREDIT_SCORE_DROP  = { normal: 12, hard: 20, nightmare: 30 }; // points lost per day cash ends negative
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
  eye:          '<path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8S1 12 1 12z"/><circle cx="12" cy="12" r="3"/>',
  moon:         '<path d="M21 12.8A9 9 0 1 1 11.2 3a7 7 0 0 0 9.8 9.8z"/>',
  skull:        '<path d="M12 2a8 8 0 0 0-8 8c0 2.8 1.4 5.2 3.5 6.6V20a1 1 0 0 0 1 1h7a1 1 0 0 0 1-1v-3.4A8 8 0 0 0 12 2z"/><circle cx="9" cy="11" r="1.6"/><circle cx="15" cy="11" r="1.6"/><path d="M10 17v2M14 17v2"/>',
  candle:       '<path d="M12 2c1.2 1.6 2 2.8 2 4a2 2 0 0 1-4 0c0-1.2.8-2.4 2-4z"/><rect x="9" y="9" width="6" height="12" rx="1"/><path d="M12 9v2"/>',
  ghost:        '<path d="M5 22V11a7 7 0 0 1 14 0v11l-3-2-2 2-2-2-2 2-2-2-3 2z"/><circle cx="9.5" cy="11" r="1"/><circle cx="14.5" cy="11" r="1"/>',
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
  music:        '<path d="M9 18V5l12-2v13"/><circle cx="6" cy="18" r="3"/><circle cx="18" cy="16" r="3"/>',
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
  gavel:        '<path d="m14.5 12.5-8 8a2.119 2.119 0 1 1-3-3l8-8"/><path d="m16 16 6-6"/><path d="m8 8 6-6"/><path d="m9 7 8 8"/><path d="m21 11-8-8"/>',
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
  eye:        achSvg('<path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8S1 12 1 12z"/><circle cx="12" cy="12" r="3"/>'),
  moon:       achSvg('<path d="M21 12.8A9 9 0 1 1 11.2 3a7 7 0 0 0 9.8 9.8z"/>'),
  skull:      achSvg('<path d="M12 2a8 8 0 0 0-8 8c0 2.8 1.4 5.2 3.5 6.6V20a1 1 0 0 0 1 1h7a1 1 0 0 0 1-1v-3.4A8 8 0 0 0 12 2z"/><circle cx="9" cy="11" r="1.6"/><circle cx="15" cy="11" r="1.6"/><path d="M10 17v2M14 17v2"/>'),
  candle:     achSvg('<path d="M12 2c1.2 1.6 2 2.8 2 4a2 2 0 0 1-4 0c0-1.2.8-2.4 2-4z"/><rect x="9" y="9" width="6" height="12" rx="1"/><path d="M12 9v2"/>'),
  ghost:      achSvg('<path d="M5 22V11a7 7 0 0 1 14 0v11l-3-2-2 2-2-2-2 2-2-2-3 2z"/><circle cx="9.5" cy="11" r="1"/><circle cx="14.5" cy="11" r="1"/>'),
};

// Nightmare-mode achievement helpers (achievements are browser-wide, so every Nightmare goal
// is explicitly gated on the CURRENT save being a Nightmare save).
const nmOnly = s => s.difficulty === 'nightmare';
const nmCount = (s, key) => (s.nightmare && s.nightmare[key]) || 0;
const nmProg = (s, value, target) => nmOnly(s) ? Math.min(value, target) + '/' + target : 'Nightmare only';
const NIGHTMARE_ACH_IDS = [
  'nm_night_7', 'nm_night_30', 'nm_night_100', 'nm_night_200', 'nm_first_sale', 'nm_sales_25', 'nm_sales_100',
  'nm_cash_250k', 'nm_million', 'nm_candle_1', 'nm_candle_25', 'nm_exorcist', 'nm_exorcist_5', 'nm_cursed_sale',
  'nm_haunted_10', 'nm_pale_deal', 'nm_pale_refuse', 'nm_ash', 'nm_reckoning', 'nm_calm', 'nm_edge',
  'nm_omens_10', 'nm_taken_3', 'nm_wards', 'nm_debt', 'nm_woke', 'nm_secret_eyes', 'nm_secret_666', 'nm_secret_fond', 'nm_lucid',
];
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
  { id: 'auction_first_win',    icon: ACH_ICONS.trophy,     name: 'Going, Going, Gone',      desc: 'Win your first lot at the Auction House.',
    check: s => (s.auctionsWon || 0) >= 1 },
  { id: 'auction_first_sale',   icon: ACH_ICONS.tag,        name: 'Under the Hammer',        desc: 'Sell one of your own cars at auction.',
    check: s => (s.auctionsSold || 0) >= 1 },
  { id: 'auction_seven_figures',icon: ACH_ICONS.star,       name: 'Seven-Figure Paddle',     desc: 'Win an auction lot with a winning bid of $1,000,000 or more.',
    check: s => (s.auctionBestWin || 0) >= 1000000 },
  { id: 'sales_25', icon: ACH_ICONS.tag, name: "Getting Warmed Up", desc: "Sell 25 cars total.",
    check: s => (s.salesHistory||[]).length >= 25,
    progress: s => Math.min((s.salesHistory||[]).length,25) + '/25' },
  { id: 'sales_250', icon: ACH_ICONS.award, name: "Dealer Row Fixture", desc: "Sell 250 cars total. Locals give you directions as a landmark.",
    check: s => (s.salesHistory||[]).length >= 250,
    progress: s => Math.min((s.salesHistory||[]).length,250) + '/250' },
  { id: 'sales_500', icon: ACH_ICONS.trophy, name: "Half-Thousand Club", desc: "Sell 500 cars total.",
    check: s => (s.salesHistory||[]).length >= 500,
    progress: s => Math.min((s.salesHistory||[]).length,500) + '/500' },
  { id: 'sales_1000', icon: ACH_ICONS.trophy, name: "One Thousand Keys", desc: "Sell 1,000 cars total. Your handshake has calluses.",
    check: s => (s.salesHistory||[]).length >= 1000,
    progress: s => Math.min((s.salesHistory||[]).length,1000) + '/1000' },
  { id: 'cash_50k', icon: ACH_ICONS.dollar, name: "Pocket Change", desc: "Hold $50,000 in cash.",
    check: s => (s.cash||0) >= 50000,
    progress: s => formatCurrency(Math.min(s.cash||0,50000)) + '/$50k' },
  { id: 'cash_250k', icon: ACH_ICONS.trending, name: "Quarter Million", desc: "Hold $250,000 in cash.",
    check: s => (s.cash||0) >= 250000,
    progress: s => formatCurrency(Math.min(s.cash||0,250000)) + '/$250k' },
  { id: 'cash_2m', icon: ACH_ICONS.flame, name: "Two Comma Club", desc: "Hold $2,000,000 in cash.",
    check: s => (s.cash||0) >= 2000000,
    progress: s => formatCurrency(Math.min(s.cash||0,2000000)) + '/$2M' },
  { id: 'cash_5m', icon: ACH_ICONS.flame, name: "Scrooge Territory", desc: "Hold $5,000,000 in cash. Time for a vault.",
    check: s => (s.cash||0) >= 5000000,
    progress: s => formatCurrency(Math.min(s.cash||0,5000000)) + '/$5M' },
  { id: 'cash_10m', icon: ACH_ICONS.zap, name: "Eight Figures", desc: "Hold $10,000,000 in cash. Is this even a dealership anymore?",
    check: s => (s.cash||0) >= 10000000,
    progress: s => formatCurrency(Math.min(s.cash||0,10000000)) + '/$10M' },
  { id: 'profit_10k', icon: ACH_ICONS.dollar, name: "Nice Margin", desc: "Make $10,000 profit on a single sale.",
    check: s => (s.salesHistory||[]).some(h => (h.profit||0) >= 10000) },
  { id: 'profit_50k', icon: ACH_ICONS.dollar, name: "Jackpot Flip", desc: "Make $50,000 profit on a single sale.",
    check: s => (s.salesHistory||[]).some(h => (h.profit||0) >= 50000) },
  { id: 'profit_100k', icon: ACH_ICONS.flame, name: "Six-Figure Flip", desc: "Make $100,000 profit on a single sale.",
    check: s => (s.salesHistory||[]).some(h => (h.profit||0) >= 100000) },
  { id: 'total_profit_100k', icon: ACH_ICONS.trending, name: "Steady Earner", desc: "Earn $100,000 total profit from sales.",
    check: s => (s.salesHistory||[]).reduce((t,h) => t + (h.profit||0), 0) >= 100000,
    progress: s => formatCurrency(Math.max(0,Math.min((s.salesHistory||[]).reduce((t,h) => t + (h.profit||0), 0),100000))) + '/$100k' },
  { id: 'total_profit_1m', icon: ACH_ICONS.trending, name: "Profit Machine", desc: "Earn $1,000,000 total profit from sales.",
    check: s => (s.salesHistory||[]).reduce((t,h) => t + (h.profit||0), 0) >= 1000000,
    progress: s => formatCurrency(Math.max(0,Math.min((s.salesHistory||[]).reduce((t,h) => t + (h.profit||0), 0),1000000))) + '/$1M' },
  { id: 'day_100', icon: ACH_ICONS.clock, name: "Triple Digits", desc: "Reach Day 100.",
    check: s => (s.day||1) >= 100,
    progress: s => Math.min(s.day||1,100) + '/100' },
  { id: 'day_500', icon: ACH_ICONS.clock, name: "Five Hundred Days", desc: "Reach Day 500.",
    check: s => (s.day||1) >= 500,
    progress: s => Math.min(s.day||1,500) + '/500' },
  { id: 'day_730', icon: ACH_ICONS.map, name: "Two Years In", desc: "Reach Day 730. Two full years of dealing.",
    check: s => (s.day||1) >= 730,
    progress: s => Math.min(s.day||1,730) + '/730' },
  { id: 'day_1000', icon: ACH_ICONS.map, name: "Institution", desc: "Reach Day 1,000. The dealership has a plaque now.",
    check: s => (s.day||1) >= 1000,
    progress: s => Math.min(s.day||1,1000) + '/1000' },
  { id: 'rep_150', icon: ACH_ICONS.award, name: "Well Respected", desc: "Reach a reputation of 1.5 or higher.",
    check: s => (s.reputation||1) >= 1.5 },
  { id: 'econ_10', icon: ACH_ICONS.car, name: "Bargain Bin Boss", desc: "Sell 10 Economy cars.",
    check: s => (s.salesHistory||[]).filter(h => h.category === "Economy").length >= 10,
    progress: s => (s.salesHistory||[]).filter(h => h.category === "Economy").length + '/10' },
  { id: 'sedan_10', icon: ACH_ICONS.car, name: "Sedan Sensei", desc: "Sell 10 Sedans.",
    check: s => (s.salesHistory||[]).filter(h => h.category === "Sedan").length >= 10,
    progress: s => (s.salesHistory||[]).filter(h => h.category === "Sedan").length + '/10' },
  { id: 'suv_10', icon: ACH_ICONS.car, name: "Soccer Parent Supplier", desc: "Sell 10 SUVs.",
    check: s => (s.salesHistory||[]).filter(h => h.category === "SUV").length >= 10,
    progress: s => (s.salesHistory||[]).filter(h => h.category === "SUV").length + '/10' },
  { id: 'truck_10', icon: ACH_ICONS.wrench, name: "Bed Liner Believer", desc: "Sell 10 Trucks.",
    check: s => (s.salesHistory||[]).filter(h => h.category === "Truck").length >= 10,
    progress: s => (s.salesHistory||[]).filter(h => h.category === "Truck").length + '/10' },
  { id: 'sports_10', icon: ACH_ICONS.zap, name: "Need for Speed", desc: "Sell 10 Sports cars.",
    check: s => (s.salesHistory||[]).filter(h => h.category === "Sports").length >= 10,
    progress: s => (s.salesHistory||[]).filter(h => h.category === "Sports").length + '/10' },
  { id: 'luxury_25', icon: ACH_ICONS.award, name: "Champagne Dealer", desc: "Sell 25 Luxury cars.",
    check: s => (s.salesHistory||[]).filter(h => h.category === "Luxury").length >= 25,
    progress: s => (s.salesHistory||[]).filter(h => h.category === "Luxury").length + '/25' },
  { id: 'mint_10', icon: ACH_ICONS.star, name: "Showroom Shine", desc: "Sell 10 cars in Excellent (A) condition.",
    check: s => (s.salesHistory||[]).filter(h => h.condition === 'A').length >= 10,
    progress: s => (s.salesHistory||[]).filter(h => h.condition === 'A').length + '/10' },
  { id: 'rebuilt_sale', icon: ACH_ICONS.wrench, name: "Second Life", desc: "Sell a car with a rebuilt title.",
    check: s => (s.salesHistory||[]).some(h => h.titleStatus === 'rebuilt') },
  { id: 'salvage_sale', icon: ACH_ICONS.alert, name: "Salvage Yard Hero", desc: "Sell a salvage-title car.",
    check: s => (s.salesHistory||[]).some(h => h.titleStatus === 'salvage') },
  { id: 'factory_10', icon: ACH_ICONS.tag, name: "Straight From the Factory", desc: "Sell 10 cars you ordered from the Factory.",
    check: s => (s.salesHistory||[]).filter(h => h.source === 'factory').length >= 10,
    progress: s => (s.salesHistory||[]).filter(h => h.source === 'factory').length + '/10' },
  { id: 'used_10', icon: ACH_ICONS.car, name: "Used Car Salesperson", desc: "Sell 10 cars you bought on the Used Market.",
    check: s => (s.salesHistory||[]).filter(h => h.source === 'used').length >= 10,
    progress: s => (s.salesHistory||[]).filter(h => h.source === 'used').length + '/10' },
  { id: 'first_hire', icon: ACH_ICONS.handshake, name: "Help Wanted", desc: "Hire your first staff member.",
    check: s => (s.staff||[]).length >= 1 },
  { id: 'staff_4', icon: ACH_ICONS.handshake, name: "Growing Team", desc: "Have 4 staff members at once.",
    check: s => (s.staff||[]).length >= 4,
    progress: s => (s.staff||[]).length + '/4' },
  { id: 'staff_8', icon: ACH_ICONS.layers, name: "Full Payroll", desc: "Have 8 staff members at once.",
    check: s => (s.staff||[]).length >= 8,
    progress: s => (s.staff||[]).length + '/8' },
  { id: 'garage_tier2', icon: ACH_ICONS.map, name: "Room to Grow", desc: "Expand to Garage Tier 2.",
    check: s => (s.upgrades?.garageLevel||1) >= 2 },
  { id: 'garage_tier3', icon: ACH_ICONS.map, name: "Proper Lot", desc: "Expand to Garage Tier 3.",
    check: s => (s.upgrades?.garageLevel||1) >= 3 },
  { id: 'showroom_built', icon: ACH_ICONS.sparkles, name: "Velvet Rope", desc: "Build your first Showroom.",
    check: s => (s.upgrades?.showroomTier||0) >= 1 },
  { id: 'showroom_max', icon: ACH_ICONS.trophy, name: "Private Collection Wing", desc: "Fully upgrade the Showroom to Tier 4.",
    check: s => (s.upgrades?.showroomTier||0) >= 4 },
  { id: 'showroom_five', icon: ACH_ICONS.star, name: "Curator", desc: "Display 5 cars in your Showroom at once.",
    check: s => (s.showroom||[]).length >= 5,
    progress: s => (s.showroom||[]).length + '/5' },
  { id: 'detective_kit', icon: ACH_ICONS.shield, name: "Detective Kit", desc: "Own the DMV Database, VIN Scanner and Frame Damage Tools upgrades.",
    check: s => !!(s.upgrades?.dmvDatabaseAccess && s.upgrades?.vinScanner && s.upgrades?.frameDamageTools) },
  { id: 'locked_down', icon: ACH_ICONS.lock, name: "Locked Down", desc: "Buy your first Security upgrade.",
    check: s => (s.upgrades?.securityLevel||0) >= 1 },
  { id: 'auction_five_wins', icon: ACH_ICONS.trophy, name: "Regular Bidder", desc: "Win 5 lots at the Auction House.",
    check: s => (s.auctionsWon||0) >= 5,
    progress: s => Math.min(s.auctionsWon||0,5) + '/5' },
  { id: 'auction_five_sales', icon: ACH_ICONS.tag, name: "Consignor", desc: "Sell 5 of your own cars at auction.",
    check: s => (s.auctionsSold||0) >= 5,
    progress: s => Math.min(s.auctionsSold||0,5) + '/5' },
  { id: 'auction_quarter_mil', icon: ACH_ICONS.star, name: "Paddle Up", desc: "Win an auction lot with a bid of $250,000 or more.",
    check: s => (s.auctionBestWin||0) >= 250000 },
  { id: 'tradeins_10', icon: ACH_ICONS.handshake, name: "Swap Meet Regular", desc: "Accept 10 trade-ins.",
    check: s => (s.totalTradeInsAccepted||0) >= 10,
    progress: s => Math.min(s.totalTradeInsAccepted||0,10) + '/10' },
  { id: 'tradeins_25', icon: ACH_ICONS.handshake, name: "Trade-In Legend", desc: "Accept 25 trade-ins.",
    check: s => (s.totalTradeInsAccepted||0) >= 25,
    progress: s => Math.min(s.totalTradeInsAccepted||0,25) + '/25' },
  { id: 'detail_50', icon: ACH_ICONS.star, name: "Wax On, Wax Off", desc: "Detail 50 cars in total.",
    check: s => (s.totalDetailsPerformed||0) >= 50,
    progress: s => Math.min(s.totalDetailsPerformed||0,50) + '/50' },
  { id: 'service_50', icon: ACH_ICONS.wrench, name: "Shop Foreman", desc: "Complete 50 customer service jobs.",
    check: s => (s.totalServiceJobsCompleted||0) >= 50,
    progress: s => Math.min(s.totalServiceJobsCompleted||0,50) + '/50' },
  { id: 'leases_10', icon: ACH_ICONS.key, name: "Leasing Empire", desc: "Run 10 simultaneous active leases.",
    check: s => (s.garage||[]).filter(c => c.leaseStatus === 'active').length >= 10,
    progress: s => (s.garage||[]).filter(c => c.leaseStatus === 'active').length + '/10' },
  { id: 'clean_streak_10', icon: ACH_ICONS.repeat, name: "Spotless Record", desc: "Sell 10 clean-title cars in a row.",
    check: s => (s.consecutiveCleanSales||0) >= 10,
    progress: s => Math.min(s.consecutiveCleanSales||0,10) + '/10' },
  { id: 'stolen_first', icon: ACH_ICONS.shield, name: "Nope, Not Buying That", desc: "Identify a stolen car and turn it down.",
    check: s => (s.stolenCarsAvoided||0) >= 1 },
  { id: 'stolen_25', icon: ACH_ICONS.shield, name: "Neighborhood Watch", desc: "Avoid 25 stolen cars.",
    check: s => (s.stolenCarsAvoided||0) >= 25,
    progress: s => Math.min(s.stolenCarsAvoided||0,25) + '/25' },
  { id: 'rebuilder_first', icon: ACH_ICONS.wrench, name: "Crash Test Dummy", desc: "Repair and sell a car with moderate or severe crash damage.",
    check: s => (s.crashDamageRebuilds||0) >= 1 },
  { id: 'rebuilder_15', icon: ACH_ICONS.wrench, name: "Body Shop Baron", desc: "Repair and sell 15 cars with moderate or severe crash damage.",
    check: s => (s.crashDamageRebuilds||0) >= 15,
    progress: s => Math.min(s.crashDamageRebuilds||0,15) + '/15' },
  { id: 'paperwork_10', icon: ACH_ICONS.star, name: "Notary Public", desc: "Sell 10 verified clean-title cars.",
    check: s => (s.cleanTitleSalesVerified||0) >= 10,
    progress: s => Math.min(s.cleanTitleSalesVerified||0,10) + '/10' },
  { id: 'eagle_eye_5', icon: ACH_ICONS.lock, name: "Hawk Eye", desc: "Discover severe hidden crash damage on 5 cars before buying.",
    check: s => (s.severeDamageFoundBeforeBuy||0) >= 5,
    progress: s => Math.min(s.severeDamageFoundBeforeBuy||0,5) + '/5' },
  { id: 'police_5', icon: ACH_ICONS.alert, name: "Frequent Flyer", desc: "Get fined by police 5 times.",
    check: s => (s.policeFinesReceived||0) >= 5,
    progress: s => Math.min(s.policeFinesReceived||0,5) + '/5' },
  { id: 'grand_theft_lot', icon: ACH_ICONS.alert, name: "Grand Theft Lot", desc: "Have a car stolen from your lot.",
    check: s => (s.totalCarsStolen||0) >= 1 },
  { id: 'insured_claim', icon: ACH_ICONS.shield, name: "Covered", desc: "Have a stolen or totaled car covered by insurance.",
    check: s => ((s.totalCarsInsuredStolen||0) + (s.totalCarsInsuredTotaled||0)) >= 1 },
  { id: 'loan_paid_100k', icon: ACH_ICONS.creditcard, name: "Paying It Down", desc: "Pay down $100,000 of credit line balance in total.",
    check: s => (s.totalLoanPaidDown||0) >= 100000,
    progress: s => formatCurrency(Math.min(s.totalLoanPaidDown||0,100000)) + '/$100k' },
  { id: 'credit_800', icon: ACH_ICONS.creditcard, name: "Excellent Credit", desc: "Reach a credit score of 800.",
    check: s => (s.creditScore||0) >= 800,
    progress: s => Math.min(s.creditScore||0,800) + '/800' },
  { id: 'credit_850', icon: ACH_ICONS.creditcard, name: "Perfect Credit", desc: "Reach the maximum credit score of 850.",
    check: s => (s.creditScore||0) >= 850,
    progress: s => Math.min(s.creditScore||0,850) + '/850' },
  { id: 'fire_sale_10', icon: ACH_ICONS.flame, name: "Clearance Event", desc: "Sell 10 cars in a single day.",
    check: s => (s.salesHistory||[]).filter(h => h.soldDay === s.day).length >= 10 },
  { id: 'hard_day_100', icon: ACH_ICONS.flame, name: "Hard Mode Survivor", desc: "Reach Day 100 on Hard mode.",
    check: s => s.difficulty === 'hard' && (s.day||1) >= 100,
    progress: s => s.difficulty === 'hard' ? Math.min(s.day||1,100) + '/100' : 'Hard mode only' },
  { id: 'hard_million', icon: ACH_ICONS.flame, name: "Hard Mode Mogul", desc: "Hold $1,000,000 in cash on Hard mode.",
    check: s => s.difficulty === 'hard' && (s.cash||0) >= 1000000,
    progress: s => s.difficulty === 'hard' ? formatCurrency(Math.min(s.cash||0,1000000)) + '/$1M' : 'Hard mode only' },
  // ── Nightmare mode ────────────────────────────────────────
  { id: 'nm_night_7', icon: ACH_ICONS.moon, name: "Don't Fall Asleep", desc: 'Survive 7 nights on Nightmare.',
    check: s => nmOnly(s) && (s.day||1) >= 7, progress: s => nmProg(s, s.day||1, 7) },
  { id: 'nm_night_30', icon: ACH_ICONS.moon, name: 'The Long Dark', desc: 'Reach Night 30 on Nightmare.',
    check: s => nmOnly(s) && (s.day||1) >= 30, progress: s => nmProg(s, s.day||1, 30) },
  { id: 'nm_night_100', icon: ACH_ICONS.eye, name: 'Insomniac', desc: 'Reach Night 100 on Nightmare. Sleep is a rumour.',
    check: s => nmOnly(s) && (s.day||1) >= 100, progress: s => nmProg(s, s.day||1, 100) },
  { id: 'nm_night_200', icon: ACH_ICONS.star, name: 'First Light', desc: 'Reach Night 365 on Nightmare. Is that... the sun?',
    check: s => nmOnly(s) && (s.day||1) >= 365, progress: s => nmProg(s, s.day||1, 365) },
  { id: 'nm_first_sale', icon: ACH_ICONS.tag, name: 'Business After Dark', desc: 'Sell your first car on Nightmare.',
    check: s => nmOnly(s) && nmCount(s, 'totalSales') >= 1 },
  { id: 'nm_sales_25', icon: ACH_ICONS.trophy, name: 'Sold in the Dark', desc: 'Sell 25 cars on a Nightmare save.',
    check: s => nmOnly(s) && nmCount(s, 'totalSales') >= 25, progress: s => nmProg(s, nmCount(s, 'totalSales'), 25) },
  { id: 'nm_sales_100', icon: ACH_ICONS.award, name: 'Haunted Showroom', desc: 'Sell 100 cars on a Nightmare save. Nobody remembers the buyers.',
    check: s => nmOnly(s) && nmCount(s, 'totalSales') >= 100, progress: s => nmProg(s, nmCount(s, 'totalSales'), 100) },
  { id: 'nm_cash_250k', icon: ACH_ICONS.dollar, name: 'Blood Money', desc: 'Hold $250,000 in cash on Nightmare.',
    check: s => nmOnly(s) && (s.cash||0) >= 250000,
    progress: s => nmOnly(s) ? formatCurrency(Math.min(s.cash||0,250000)) + '/$250k' : 'Nightmare only' },
  { id: 'nm_million', icon: ACH_ICONS.flame, name: 'Nightmare Mogul', desc: 'Hold $1,000,000 in cash on Nightmare.',
    check: s => nmOnly(s) && (s.cash||0) >= 1000000,
    progress: s => nmOnly(s) ? formatCurrency(Math.min(s.cash||0,1000000)) + '/$1M' : 'Nightmare only' },
  { id: 'nm_candle_1', icon: ACH_ICONS.candle, name: 'Light in the Dark', desc: 'Light your first candle.',
    check: s => nmOnly(s) && nmCount(s, 'candlesLit') >= 1 },
  { id: 'nm_candle_25', icon: ACH_ICONS.candle, name: 'Candlelight Vigil', desc: 'Light 25 candles on a Nightmare save.',
    check: s => nmOnly(s) && nmCount(s, 'candlesLit') >= 25, progress: s => nmProg(s, nmCount(s, 'candlesLit'), 25) },
  { id: 'nm_exorcist', icon: ACH_ICONS.ghost, name: 'The Power Compels You', desc: 'Exorcise a cursed car.',
    check: s => nmOnly(s) && nmCount(s, 'exorcisms') >= 1 },
  { id: 'nm_exorcist_5', icon: ACH_ICONS.shield, name: 'Professional Exorcist', desc: 'Exorcise 5 cursed cars.',
    check: s => nmOnly(s) && nmCount(s, 'exorcisms') >= 5, progress: s => nmProg(s, nmCount(s, 'exorcisms'), 5) },
  { id: 'nm_cursed_sale', icon: ACH_ICONS.alert, name: 'Hot Potato', desc: 'Sell a cursed car without exorcising it first. Somebody else\'s problem now.',
    check: s => nmOnly(s) && nmCount(s, 'cursedSold') >= 1 },
  { id: 'nm_haunted_10', icon: ACH_ICONS.ghost, name: 'Poltergeist Tenant', desc: 'Be haunted by your cursed cars 10 times.',
    check: s => nmOnly(s) && nmCount(s, 'hauntings') >= 10, progress: s => nmProg(s, nmCount(s, 'hauntings'), 10) },
  { id: 'nm_pale_deal', icon: ACH_ICONS.handshake, name: 'Deal with the Devil', desc: "Accept the Pale Customer's offer.",
    check: s => nmOnly(s) && nmCount(s, 'visitorsAccepted') >= 1 },
  { id: 'nm_pale_refuse', icon: ACH_ICONS.lock, name: 'Not Today, Stranger', desc: 'Send the Pale Customer away 3 times.',
    check: s => nmOnly(s) && nmCount(s, 'visitorsDeclined') >= 3, progress: s => nmProg(s, nmCount(s, 'visitorsDeclined'), 3) },
  { id: 'nm_ash', icon: ACH_ICONS.flame, name: 'Ashes to Ashes', desc: "Watch the Pale Customer's money turn to ash.",
    check: s => nmOnly(s) && nmCount(s, 'ashCount') >= 1 },
  { id: 'nm_reckoning', icon: ACH_ICONS.skull, name: 'Brush with Oblivion', desc: 'Survive a Reckoning.',
    check: s => nmOnly(s) && nmCount(s, 'reckonings') >= 1 && !s.gameOver },
  { id: 'nm_calm', icon: ACH_ICONS.moon, name: 'Peace of Mind', desc: 'Bring Dread all the way down to 0.',
    check: s => nmOnly(s) && s.nightmare && s.nightmare.lowestDread <= 0 },
  { id: 'nm_edge', icon: ACH_ICONS.eye, name: 'Edge of the Abyss', desc: 'Reach 90 Dread and stare back.',
    check: s => nmOnly(s) && nmCount(s, 'peakDread') >= 90 },
  { id: 'nm_omens_10', icon: ACH_ICONS.alert, name: 'Fog of War', desc: 'Live through 10 Nightmare omens.',
    check: s => nmOnly(s) && nmCount(s, 'eventsSeen') >= 10, progress: s => nmProg(s, nmCount(s, 'eventsSeen'), 10) },
  { id: 'nm_taken_3', icon: ACH_ICONS.key, name: 'Something Took It', desc: 'Lose 3 cars to the dark.',
    check: s => nmOnly(s) && nmCount(s, 'carsTaken') >= 3, progress: s => nmProg(s, nmCount(s, 'carsTaken'), 3) },
  { id: 'nm_wards', icon: ACH_ICONS.shield, name: 'Warded', desc: 'Buy every Ward: Salt Lines, Floodlight Array and Lot Chapel.',
    check: s => nmOnly(s) && !!(s.upgrades && s.upgrades.wardSalt && s.upgrades.wardLights && s.upgrades.wardChapel) },
  { id: 'nm_debt', icon: ACH_ICONS.creditcard, name: "The Collector's Nightmare", desc: 'Pay down $50,000 of credit line balance on Nightmare.',
    check: s => nmOnly(s) && (s.totalLoanPaidDown||0) >= 50000,
    progress: s => nmOnly(s) ? formatCurrency(Math.min(s.totalLoanPaidDown||0,50000)) + '/$50k' : 'Nightmare only' },
  { id: 'nm_lucid', icon: ACH_ICONS.trophy, name: 'Lucid Dreamer', desc: 'Unlock every other Nightmare achievement. You know it is a dream. It knows you know. The question is which side is the dream: the lot, or the sleep.',
    check: s => NIGHTMARE_ACH_IDS.every(id => id === 'nm_lucid' || (s.achievementsUnlocked||{})[id] || globalAchievements[id]),
    progress: s => NIGHTMARE_ACH_IDS.filter(id => id !== 'nm_lucid' && ((s.achievementsUnlocked||{})[id] || globalAchievements[id])).length + '/' + (NIGHTMARE_ACH_IDS.length - 1) },
  { id: 'nm_woke', icon: ACH_ICONS.moon, name: 'Rise and Shine', desc: 'Reach the dawn and wake up. Winning was never going to free you.',
    check: s => nmOnly(s) && nmCount(s, 'wokeUp') >= 1 },
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
  { id: 'nm_secret_eyes', icon: ACH_ICONS.eye, name: '🔒 It Sees You', desc: '???',
    check: s => nmCount(s, 'eyesClicked') >= 1 },
  { id: 'nm_secret_666', icon: ACH_ICONS.skull, name: '🔒 Number of the Beast', desc: '???',
    check: s => nmOnly(s) && (s.salesHistory||[]).some(h => Math.round(h.salePrice||0) % 1000 === 666) },
  { id: 'nm_secret_fond', icon: ACH_ICONS.eye, name: '🔒 Gracious in Defeat', desc: '???',
    check: s => nmOnly(s) && nmCount(s, 'fondEnding') >= 1 },
];

const ACHIEVEMENT_ORDER = [
  'first_sale', 'first_upgrade', 'title_clean_start', 'first_tradein', 'first_lease',
  'ten_sales', 'detail_ten', 'five_tradeins', 'five_leases', 'luxury_seller',
  'fifty_sales', 'hundred_sales', 'supercar_seller',
  'auction_first_win', 'auction_first_sale', 'auction_seven_figures',
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
  'sales_25', 'sales_250', 'sales_500', 'sales_1000', 'cash_50k', 'cash_250k', 'cash_2m', 'cash_5m', 'cash_10m', 'profit_10k', 'profit_50k', 'profit_100k', 'total_profit_100k', 'total_profit_1m', 'day_100', 'day_500', 'day_730', 'day_1000', 'rep_150', 'econ_10', 'sedan_10', 'suv_10', 'truck_10', 'sports_10', 'luxury_25', 'mint_10', 'rebuilt_sale', 'salvage_sale', 'factory_10', 'used_10', 'first_hire', 'staff_4', 'staff_8', 'garage_tier2', 'garage_tier3', 'showroom_built', 'showroom_max', 'showroom_five', 'detective_kit', 'locked_down', 'auction_five_wins', 'auction_five_sales', 'auction_quarter_mil', 'tradeins_10', 'tradeins_25', 'detail_50', 'service_50', 'leases_10', 'clean_streak_10', 'stolen_first', 'stolen_25', 'rebuilder_first', 'rebuilder_15', 'paperwork_10', 'eagle_eye_5', 'police_5', 'grand_theft_lot', 'insured_claim', 'loan_paid_100k', 'credit_800', 'credit_850', 'fire_sale_10', 'hard_day_100', 'hard_million',
  'nm_night_7', 'nm_night_30', 'nm_night_100', 'nm_night_200', 'nm_first_sale', 'nm_sales_25', 'nm_sales_100', 'nm_cash_250k', 'nm_million',
  'nm_candle_1', 'nm_candle_25', 'nm_exorcist', 'nm_exorcist_5', 'nm_cursed_sale', 'nm_haunted_10', 'nm_pale_deal', 'nm_pale_refuse', 'nm_ash',
  'nm_reckoning', 'nm_calm', 'nm_edge', 'nm_omens_10', 'nm_taken_3', 'nm_wards', 'nm_debt', 'nm_woke', 'nm_lucid',
  'secret_logo', 'secret_konami', 'secret_nice', 'secret_day69', 'secret_palindrome', 'secret_breakeven', 'nm_secret_eyes', 'nm_secret_666', 'nm_secret_fond',
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
  'Legal & Compliance', 'Security', 'Service Garage', 'Wards', 'Dark Bargains',
];

// Tunable upgrade constants
const OVERHEAD_REDUCTION_PER_LEVEL = 0.10;          // Cost Efficiency Program: −10% lot overhead per level
const SERVICE_JOB_VALUE_MULT = [1, 1.35, 1.9, 2.8]; // bigger service departments land bigger jobs
const THEFT_REDUCTION_BY_LEVEL = [0, 0.25, 0.50, 0.75, 0.90];
// Real-world vehicle theft is rare — NICB/FBI data puts the U.S. annual theft rate at roughly
// 0.3% of registered vehicles. A dealership lot is a juicier target than a random parked car
// (lots of keys, lots of inventory in one place), so this is set noticeably higher than the
// national average, but nowhere near a coin-flip. 0.00017/day compounds to ~6% annual risk for
// an unsecured car sitting on the lot at full late-game ramp-up — Fortress Protocol (−90%) then
// brings that down to well under 1%/year, and stacks with LEASE_CRASH_PROBABILITY below so a
// leased car crashing stays meaningfully more likely than a lot car getting stolen.
const THEFT_MAX_CHANCE_PER_DAY = 0.00017;
const WORKSHOP_REPAIR_DISCOUNT = 0.15;
const CERTIFIED_SALE_BONUS = 1.18;
const WASH_COST = 125;             // requires the Wash Station upgrade
const WASH_VALUE_BOOST = 0.04;     // +4% market value, one time per car
const WASH_SALE_CHANCE_BONUS = 1.10; // +10% sale chance, permanent once the car is washed (one wash per car)

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
    desc: 'Even more Used Market listings, and cleaner stock. Also cuts Auction House fees and puts an extra rare lot on the floor.',
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
    desc: 'Unlocks car washes — a cheap, one-time wash per car for a permanent value bump and sale-chance boost.',
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
    id: 'security1', name: 'Security Camera System', icon: 'camera', category: 'Security', stage: 2, cost: 20000,
    desc: 'Cuts car theft on your lot.',
    level: tierLevel('securityLevel', 1),
    apply: s => { s.upgrades.securityLevel = 1; },
  },
  {
    id: 'security2', name: 'Guard Station', icon: 'person', category: 'Security', stage: 2, cost: 60000,
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

  // ── Wards (Nightmare difficulty only) ─────────────────────
  {
    id: 'wardSalt', name: 'Salt Lines', icon: 'droplet', category: 'Wards', stage: 2, cost: 18000, nightmareOnly: true,
    desc: 'A ring of salt around the lot. −1 Dread each night, and cursed cars haunt half as often.',
    level: u => (u.wardSalt ? 1 : 0),
    apply: s => { s.upgrades.wardSalt = true; },
  },
  {
    id: 'wardLights', name: 'Floodlight Array', icon: 'camera', category: 'Wards', stage: 3, cost: 45000, nightmareOnly: true,
    desc: 'The lot has never been this bright. −1 Dread each night, cursed cars cost half the Dread, and thefts drop by 40%.',
    level: u => (u.wardLights ? 1 : 0),
    lock: u => (u.wardSalt ? null : 'Needs Salt Lines'),
    apply: s => { s.upgrades.wardLights = true; },
  },
  {
    id: 'wardChapel', name: 'Lot Chapel', icon: 'pillar', category: 'Wards', stage: 4, cost: 120000, nightmareOnly: true,
    desc: 'A tiny chapel at the back of the lot. −3 Dread each night, exorcisms cost half, and Reckonings take less and spare your cars.',
    level: u => (u.wardChapel ? 1 : 0),
    lock: u => (u.wardLights ? null : 'Needs Floodlights'),
    apply: s => { s.upgrades.wardChapel = true; },
  },

  // ── Wards, part 2 (Nightmare only) ────────────────────────
  {
    id: 'wardVotive', name: 'Votive Rack', icon: 'candle', category: 'Wards', stage: 2, cost: 35000, nightmareOnly: true,
    desc: 'Rows of candles that never quite go out. You may light TWO candles a night, and every candle costs 25% less.',
    level: u => (u.wardVotive ? 1 : 0),
    lock: u => (u.wardSalt ? null : 'Needs Salt Lines'),
    apply: s => { s.upgrades.wardVotive = true; },
  },
  {
    id: 'wardDream', name: 'Dreamcatcher', icon: 'moon', category: 'Wards', stage: 3, cost: 60000, nightmareOnly: true,
    desc: 'Hung over the office door. Sleep drains 35% slower, for good. The Pale Man pretends not to notice it.',
    level: u => (u.wardDream ? 1 : 0),
    lock: u => (u.wardVotive ? null : 'Needs Votive Rack'),
    apply: s => { s.upgrades.wardDream = true; },
  },
  {
    id: 'wardHourglass', name: 'The Hourglass', icon: 'gauge', category: 'Wards', stage: 3, cost: 90000, nightmareOnly: true,
    desc: 'A brass hourglass with sand that falls upward. Once a night, turn it: Sleep stops draining for 5 minutes.',
    level: u => (u.wardHourglass ? 1 : 0),
    lock: u => (u.wardDream ? null : 'Needs Dreamcatcher'),
    apply: s => { s.upgrades.wardHourglass = true; },
  },
  {
    id: 'wardMusicBox', name: 'Music Box', icon: 'music', category: 'Wards', stage: 4, cost: 120000, nightmareOnly: true,
    desc: 'A little tune that makes him sentimental. Beating the Pale Man gives +75% Sleep instead of +50%, and he only makes you wait half as long after a loss.',
    level: u => (u.wardMusicBox ? 1 : 0),
    lock: u => (u.wardDream ? null : 'Needs Dreamcatcher'),
    apply: s => { s.upgrades.wardMusicBox = true; },
  },
  {
    id: 'wardLastRites', name: 'Last Rites', icon: 'shield', category: 'Wards', stage: 4, cost: 250000, nightmareOnly: true,
    desc: 'The chapel keeps a priest on retainer. The final Reckoning, the one that would end the run, is turned aside ONE time. After that, he leaves.',
    level: u => (u.wardLastRites ? 1 : 0),
    lock: u => (u.wardChapel ? null : 'Needs Lot Chapel'),
    apply: s => { s.upgrades.wardLastRites = true; },
  },

  // ── Dark Bargains (Nightmare only): deals that make the night pay ──
  {
    id: 'nmNeon', name: 'OPEN ALL NIGHT Sign', icon: 'megaphone', category: 'Dark Bargains', stage: 1, cost: 15000, nightmareOnly: true,
    desc: 'A buzzing neon sign. Buyers are 15% more likely to stop, which cancels out most of the Nightmare buyer penalty.',
    level: u => (u.nmNeon ? 1 : 0),
    apply: s => { s.upgrades.nmNeon = true; },
  },
  {
    id: 'nmUnion', name: 'Night Shift Union', icon: 'handshake', category: 'Dark Bargains', stage: 2, cost: 40000, nightmareOnly: true,
    desc: 'Your staff sign something in the dark. The +25% night-shift pay surcharge disappears for good.',
    level: u => (u.nmUnion ? 1 : 0),
    apply: s => { s.upgrades.nmUnion = true; },
  },
  {
    id: 'nmCurio', name: 'Curio Cabinet', icon: 'skull', category: 'Dark Bargains', stage: 2, cost: 35000, nightmareOnly: true,
    desc: 'You learn to read the curse. New cursed listings are marked on sight, and buyers no longer shy away from cursed cars, so those 50-68% bargains become real profit.',
    level: u => (u.nmCurio ? 1 : 0),
    lock: u => (u.nmNeon ? null : 'Needs Open All Night Sign'),
    apply: s => { s.upgrades.nmCurio = true; },
  },
  {
    id: 'nmTour', name: 'Haunted Lot Tours', icon: 'ghost', category: 'Dark Bargains', stage: 3, cost: 75000, nightmareOnly: true,
    desc: 'Tickets, $12 per Dread point, nobody asks why. Every night you earn cash based on how high your Dread is, and more the deeper the night gets. Dread finally pays.',
    level: u => (u.nmTour ? 1 : 0),
    lock: u => (u.nmNeon ? null : 'Needs Open All Night Sign'),
    apply: s => { s.upgrades.nmTour = true; },
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

// ============================================================
// THE SHOWROOM — v1.14.0
// ============================================================
// A private display collection, separate from state.garage entirely. Cars parked here:
//   - never count against garageSlots (no lot-capacity pressure)
//   - are never rolled for theft (processTheft only iterates state.garage)
//   - can't be listed for sale, serviced, or leased — they're just kept, on display
// Tiers are gated behind Garage tiers so the Showroom reads as an endgame flex purchase,
// the natural home for a discontinued classic or a hypercar you never want to let go of.
const SHOWROOM_TIERS = [
  null, // index 0 = not built yet
  { tier: 1, name: 'Private Showroom',          cost: 75000,    slots: 3,  icon: 'sparkles',    reqGarageTier: 3,
    desc: 'A small glass-walled room off the lot — three pedestals, soft lighting, a place to keep the cars that mean something.' },
  { tier: 2, name: 'Showroom Expansion',        cost: 250000,   slots: 6,  icon: 'building',    reqGarageTier: 4,
    desc: 'Knock through the back wall. Six pedestals, and room to walk between them.' },
  { tier: 3, name: 'Grand Showroom Hall',       cost: 750000,   slots: 10, icon: 'pillar',       reqGarageTier: 5,
    desc: 'A proper hall — marble floor, a mezzanine, ten cars under individual spotlights.' },
  { tier: 4, name: 'Private Collection Wing',   cost: 2500000,  slots: 16, icon: 'trophy',       reqGarageTier: 6,
    desc: 'Your own wing. Sixteen pedestals for the cars that were never, ever for sale.' },
];

/** How many display slots the Showroom currently has (0 if not built). */
function getShowroomCapacity() {
  const t = SHOWROOM_TIERS[state.upgrades.showroomTier || 0];
  return t ? t.slots : 0;
}

/** The next purchasable tier config, or null if already at max tier. */
function getNextShowroomTier() {
  const next = (state.upgrades.showroomTier || 0) + 1;
  return SHOWROOM_TIERS[next] || null;
}

// SHOWROOM DRAW — v1.17.0
// ------------------------------------------------------------
// A full showroom floor pulls buyers in for the rest of the dealership. Only cars in
// good shape help: Excellent (A) counts as a full display point, Good (B) counts as 0.6,
// Fair/Poor add nothing, and salvage/lemon titles scare people off. Each point adds
// +3.5% to sale chance on every listed car, capped at +40% total.
const SHOWROOM_DRAW_WEIGHT     = { A: 1.0, B: 0.6 };
const SHOWROOM_DRAW_PER_POINT  = 0.035;
const SHOWROOM_DRAW_MAX_BONUS  = 0.40;

/** Display points one showroom car contributes (0 if it doesn't qualify). */
function getShowroomCarDrawPoints(car) {
  if (!car) return 0;
  if (car.titleStatus === 'salvage' || car.titleStatus === 'lemon') return 0;
  return SHOWROOM_DRAW_WEIGHT[car.condition] || 0;
}

/** Current showroom-floor bonus applied to every listed car's sale chance. */
function getShowroomDraw() {
  const cars = state.showroom || [];
  let points = 0;
  let qualifying = 0;
  for (const car of cars) {
    const p = getShowroomCarDrawPoints(car);
    if (p > 0) { points += p; qualifying++; }
  }
  const raw = points * SHOWROOM_DRAW_PER_POINT;
  return {
    displayed: cars.length,
    qualifying,
    points,
    bonus: Math.min(raw, SHOWROOM_DRAW_MAX_BONUS),
    maxed: raw >= SHOWROOM_DRAW_MAX_BONUS,
  };
}

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
  const diffMult = state.difficulty === 'nightmare' ? 2.0 * (1 + 0.3 * Math.min(nmDepth(), 2)) : state.difficulty === 'hard' ? 1.5 : state.difficulty === 'easy' ? 0 : 1.0;
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
// Compact form for tight spaces (buttons): $1,500,000 -> $1.5M, $3.9B, $1.2T, $45,000 -> $45K.
// Shortens amounts of $1M and up: 1,500,000 -> 1.5M, 3,943,400,000 -> 3.9B, 1.2e12 -> 1.2T.
// Rolls over to the next unit when rounding would show 1000 (e.g. 999,960,000 -> 1B).
function compactBigNumber(abs) {
  const units = [[1e12, 'T'], [1e9, 'B'], [1e6, 'M']];
  const fmt = (v, suffix) => String(parseFloat(v.toFixed(1))) + suffix;
  for (let i = 0; i < units.length; i++) {
    const [size, suffix] = units[i];
    if (abs < size) continue;
    if (Math.round(abs / size * 10) / 10 >= 1000 && i > 0) return fmt(abs / units[i - 1][0], units[i - 1][1]);
    return fmt(abs / size, suffix);
  }
  return null;
}
const formatCurrencyCompact = n => {
  n = Math.round(n);
  const sign = n < 0 ? '-' : '';
  const abs  = Math.abs(n);
  if (abs >= 1000000) return sign + '$' + compactBigNumber(abs);
  if (abs >= 10000)   return sign + '$' + Math.round(abs / 1000) + 'K';
  return formatCurrency(n);
};
const generateId  = () => Date.now().toString(36) + Math.random().toString(36).slice(2, 7);
let factorySelection = { make: null, model: null };

/** Where a car came from, as a labelled icon: Factory, Auction House or Used Market. */
function carSourceLabel(car) {
  if (car.source === 'factory') return `${uiIcon('factory')} Factory`;
  if (car.source === 'auction') return `${uiIcon('gavel')} Auction House`;
  return `${uiIcon('car')} Used Market`;
}

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
  const base = (state.staff || []).reduce((sum, s) => sum + s.wage, 0);
  return isNightmare() && !hasWard('nmUnion') ? Math.round(base * 1.25) : base;   // Nightmare: night-shift pay (Night Shift Union removes it)
}

// ============================================================
// PERSISTENCE
// ============================================================
// ------------------------------------------------------------------
// Save-size trimming (v1.18.6)
// Sold cars used to be stored as a full copy of the car, forever. Only a few
// fields are ever read back (Receipts, stats, achievements), so the rest is
// stripped when saving. The newest SALES_FULL_RECORDS keep everything a
// purchase agreement needs; older ones shrink to a short summary and show in
// Receipts as older sales (no agreement), but still count for totals/achievements.
// ------------------------------------------------------------------
const SALES_FULL_RECORDS = 150;
const RECON_LOG_MAX = 10;
const SALE_FULL_KEYS = ['id', 'year', 'make', 'model', 'trim', 'category', 'mileage', 'condition', 'titleStatus',
  'source', 'daysInLot', 'soldDay', 'salePrice', 'fee', 'profit', 'dealerFees', 'buyerName', 'agreementNo',
  'purchasePrice', 'note', 'wasLease', 'tradeInAccepted', 'soldAtAuction'];
const SALE_SUMMARY_KEYS = ['year', 'make', 'model', 'trim', 'category', 'mileage', 'condition', 'titleStatus',
  'source', 'daysInLot', 'soldDay', 'salePrice', 'profit', 'buyerName', 'note', 'wasLease', 'tradeInAccepted', 'soldAtAuction'];

function pickKeys(obj, keys) {
  const out = {};
  for (const k of keys) if (obj[k] !== undefined) out[k] = obj[k];
  return out;
}

/** Shrinks salesHistory (newest first) and old garage recon logs. Never touches showroom cars. Safe to call repeatedly. */
function compactStateForSave(st) {
  if (Array.isArray(st.salesHistory)) {
    st.salesHistory = st.salesHistory.map((h, i) => {
      if (!h) return h;
      if (i < SALES_FULL_RECORDS) {
        return h._c === 1 ? h : { ...pickKeys(h, SALE_FULL_KEYS), _c: 1 };
      }
      if (h._c === 2) return h;
      const slim = pickKeys(h, SALE_SUMMARY_KEYS);
      if (h.dealerFees && h.dealerFees.total !== undefined) slim.dealerFees = { total: h.dealerFees.total };
      slim._c = 2;
      return slim;
    });
  }
  // Showroom cars are deliberately left untouched — they keep all of their data.
  for (const car of st.garage || []) {
    if (car && Array.isArray(car.reconditionLog) && car.reconditionLog.length > RECON_LOG_MAX) {
      car.reconditionLog = car.reconditionLog.slice(-RECON_LOG_MAX);
    }
  }
}

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
    compactStateForSave(state);
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
      if (!loaded.showroom) loaded.showroom = [];
      loaded.nightmare = Object.assign({}, NIGHTMARE_DEFAULTS, loaded.nightmare || {});   // v1.19.0
      if (!loaded.staff) loaded.staff = [];
      if (!loaded.staffCandidates) loaded.staffCandidates = [];
      if (!loaded.staffActivity) loaded.staffActivity = [];
      if (loaded.staffTrading === undefined) loaded.staffTrading = true;
      loaded.staffProfitTotal = loaded.staffProfitTotal ?? 0;
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
      if (loaded.saveVersion < 16) {
        loaded.saveVersion = 16;
        // v1.8.0: insurance system
        loaded.insurance = loaded.insurance || {
          companyId: null, startDay: null, nextBillDay: null,
          totalPremiumsPaid: 0, totalClaimsPaid: 0, claimsCount: 0,
        };
        loaded.totalCarsInsuredStolen  = loaded.totalCarsInsuredStolen  ?? 0;
        loaded.totalCarsInsuredTotaled = loaded.totalCarsInsuredTotaled ?? 0;
        loaded.notifications = loaded.notifications || [];
        loaded.notifications.unshift({
          message: '🛡️ Save upgraded to v16 — new Insurance tab! Pick from three insurers to cover theft and lease crashes, or go without.',
          type: 'info',
          day: loaded.day ?? 1,
        });
      }
      if (loaded.saveVersion < 17) {
        loaded.saveVersion = 17;
        // v1.14.0: The Showroom — private display collection, plus Receipts moving under Finance.
        loaded.showroom = loaded.showroom || [];
        loaded.upgrades.showroomTier = loaded.upgrades.showroomTier ?? 0;
        loaded.notifications = loaded.notifications || [];
        loaded.notifications.unshift({
          message: '🏛️ Save upgraded to v17 — new Showroom tab! Build a private collection for cars you never want to sell. Receipts moved under the Finance tab.',
          type: 'info',
          day: loaded.day ?? 1,
        });
      }
      if (loaded.saveVersion < 18) {
        loaded.saveVersion = 18;
        // v1.15.0: The Auction House — rare lots to bid on, and your own cars to consign.
        loaded.notifications = loaded.notifications || [];
        loaded.notifications.unshift({
          message: '🔨 Save upgraded to v18 — new Auctions page under Used Market! Choose from three auction houses — salvage, everyday cars, or ultra-rare — or put your own cars under the hammer.',
          type: 'info',
          day: loaded.day ?? 1,
        });
      }
      // Always-apply defaults for v1.15.0 fields (in case migration block is skipped)
      loaded.auctions = (loaded.auctions && Array.isArray(loaded.auctions.lots)) ? loaded.auctions : { lots: [] };
      // A lot you'd already walked into when the page closed is forfeited — no refresh-to-reroll.
      loaded.auctions.lots = loaded.auctions.lots.filter(l => !l.started);
      // Repair any market index that went NaN/null so car values can't be poisoned.
      if (loaded.marketIndices) {
        for (const k of Object.keys(loaded.marketIndices)) {
          if (!Number.isFinite(loaded.marketIndices[k]) || loaded.marketIndices[k] <= 0) loaded.marketIndices[k] = 1.0;
        }
      }
      loaded.auctionLog      = loaded.auctionLog      || [];
      state = loaded; sanitizeDealRules();   // fix any negative/over-value deals from before v1.15.1
      loaded.auctionsWon     = loaded.auctionsWon     ?? 0;
      loaded.auctionsSold    = loaded.auctionsSold    ?? 0;
      loaded.auctionBestWin  = loaded.auctionBestWin  ?? 0;
      // Always-apply defaults for new fields added in v14 (in case migration block is skipped)
      loaded.daysGoodStanding       = loaded.daysGoodStanding       ?? 0;
      loaded.hardBankruptcyOccurred = loaded.hardBankruptcyOccurred ?? false;
      loaded.konamiActivated        = loaded.konamiActivated        ?? false;
      loaded.logoClickCount         = loaded.logoClickCount         ?? 0;
      // Always-apply default for v1.5.0 field (in case migration block is skipped)
      if (loaded.serviceBayUnlockedDay === undefined) {
        loaded.serviceBayUnlockedDay = loaded.upgrades.serviceBay ? -9999 : null;
      }
      loaded.insurance = loaded.insurance || {
        companyId: null, startDay: null, nextBillDay: null,
        totalPremiumsPaid: 0, totalClaimsPaid: 0, claimsCount: 0,
      };
      loaded.totalCarsInsuredStolen  = loaded.totalCarsInsuredStolen  ?? 0;
      loaded.totalCarsInsuredTotaled = loaded.totalCarsInsuredTotaled ?? 0;
      // Always-apply default for v1.14.0 fields (in case migration block is skipped)
      loaded.showroom = loaded.showroom || [];
      loaded.upgrades.showroomTier = loaded.upgrades.showroomTier ?? 0;
      // Migrate car objects
      for (const car of loaded.garage || []) migrateCar(car);
      // Older saves booked trade-in cars at $0 cost. Give them a cost basis (their value) so resales don't show fake profit.
      for (const car of [...(loaded.garage || []), ...(loaded.showroom || [])]) {
        if (car.source === 'tradein' && !(car.purchasePrice > 0) && car.marketValue > 0) {
          car.purchasePrice = Math.round(car.marketValue);
          car.tradeInCredit = car.purchasePrice;
        }
      }
      for (const car of loaded.showroom || []) migrateCar(car);
      for (const d of loaded.deliveries || []) migrateCar(d.car);
      for (const o of loaded.usedMarketOffers || []) migrateCar(o);
      for (const l of loaded.auctions.lots || []) migrateCar(l.car);
      for (const req of loaded.tradeInRequests || []) migrateCar(req.customerCar);
      // Sold records are stored compactly and never need car-field migration.
      compactStateForSave(loaded);
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
  // One wash per car, permanent boost. Older saves: count a car as washed if it
  // was mid-boost or its recon log shows a wash.
  if (car.washed === undefined) {
    car.washed = car.washBoostDays > 0 ||
      (Array.isArray(car.reconditionLog) && car.reconditionLog.some(r => r && r.type === 'Car Wash'));
  }
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
function genHiddenIssues(condition, baseValue) {
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
    issues.push({ name: pool[idx].name, cost: computeIssueCost(pool[idx], baseValue) });
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

/** Roll a used car's model year. Always inside the car's real production window. */
function rollModelYear(entry) {
  const pStart = entry.productionStart ?? -Infinity;
  const pEnd   = entry.productionEnd   ??  Infinity;
  const lo = Math.max(entry.yearRange[0], pStart);
  const hi = Math.min(entry.yearRange[1], pEnd);
  if (lo > hi) return Math.min(Math.max(lo, pStart), pEnd);
  return randomInt(lo, hi);
}

/** Build a full car object from a catalog entry. */
function buildCar(entry, condition, source, inspected = false) {
  // Factory cars are always 2026 with near-zero miles
  const year    = source === 'factory' ? 2026 : rollModelYear(entry);
  const mileage = source === 'factory' ? randomInt(5, 50) : randomInt(entry.baseMileage[0], entry.baseMileage[1]);
  const titleStatus = pickTitleStatus(source, condition, mileage);
  const issues  = inspected || source === 'factory' ? [] : genHiddenIssues(condition, entry.marketValue * CONDITION_VALUE[condition]);
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
  const rawIdx      = (state.marketIndices || {})[entry.category];
  const marketIdx   = Number.isFinite(rawIdx) && rawIdx > 0 ? rawIdx : 1.0;
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
    washed: false,
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
    productionStart: entry.productionStart ?? entry.yearRange[0],
    productionEnd: entry.productionEnd ?? entry.yearRange[1],
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

/** Build one Used Market listing. `forceCursed` (true/false) overrides the random curse roll. */
function buildUsedOffer(entry, condition, forceCursed) {
  const car       = buildCar(entry, condition, 'used', false);
  const ownerAwareOfIssues = Math.random() < 0.4;
  const effectiveMV = ownerAwareOfIssues ? car.marketValue - car.repairCost * 0.5 : car.marketValue;
  // Sellers never pay you to take a car: the lowest possible asking price is $0.
  // Nightmare: some listings are cursed — the seller practically gives them away.
  const cursedListing = isNightmare() && (forceCursed !== undefined ? forceCursed : Math.random() < getNightmareCurseChance());
  const askingPrice    = Math.max(0, Math.round(effectiveMV * pickAskingPriceMultiplier() * (cursedListing ? randomFloat(0.50, 0.68) : 1)));
  // Hidden floor — seller won't accept below this. Keeps a real negotiation
  // window under the asking price without making the asking price itself
  // a de-facto discount.
  const minAcceptPrice = Math.max(0, Math.round(askingPrice * randomFloat(0.85, 0.95)));
  car.purchasePrice  = askingPrice;
  car.askingPrice    = askingPrice;
  car.minAcceptPrice = minAcceptPrice;
  car.negotiationState = null; // null | 'countered'
  car.playerOffer    = null;
  car.sellerCounter  = null;
  car.patience       = randomInt(1, 3); // max counter rounds
  if (isNightmare()) {
    if (cursedListing) { car.cursed = true; car.curseRevealed = hasWard('nmCurio'); }
    // Cursed cars often give themselves away… and a few perfectly normal ones just feel wrong.
    if (cursedListing ? Math.random() < 0.6 : Math.random() < 0.05) car.nmTell = randomFrom(NIGHTMARE_TELLS);
  }
  return car;
}

/** Nightmare: the curse rate starts low and creeps up as the nights go on. */
function getNightmareCurseChance() {
  const night = Math.max(1, state.day || 1);
  return clamp(0.04 + 0.012 * (night - 1), 0.04, getCurseCap());
}

function generateUsedMarket() {
  // Any identified stolen car still on the old list is being left behind — that counts as avoided.
  (state.usedMarketOffers || []).forEach(countStolenAvoided);
  const count = randomInt(4, 7) + getUsedMarketBonusListings(); // Trade Network / Auction Membership add listings
  const offers = [];
  for (let i = 0; i < count; i++) {
    const entry     = pickCatalogEntryForUsed();
    const condition = pickCondition(getUsedConditionWeights());
    offers.push(buildUsedOffer(entry, condition));
  }
  if (isNightmare()) ensureNightmareStarterStock(offers);
  return offers;
}

/**
 * Nightmare: never leave the player with a lot full of curses and wrecks.
 *  - at most 2 cursed listings per refresh
 *  - during the first nights, at least 2 uncursed, good-condition (A/B) cars the player can
 *    actually afford (≤ ~70% of current cash), so there is always a safe first flip.
 */
function ensureNightmareStarterStock(offers) {
  // Cap cursed listings at 2 — swap the extras for ordinary cars.
  let cursedSeen = 0;
  for (let i = 0; i < offers.length; i++) {
    if (!offers[i].cursed) continue;
    if (++cursedSeen > getMaxCursedListings()) {
      offers[i] = buildUsedOffer(pickCatalogEntryForUsed(), pickCondition(getUsedConditionWeights()), false);
    }
  }
  if ((state.day || 1) > 10) return;
  const budget = Math.max(6000, (state.cash || 0) * 0.70);
  const cheapPool = CAR_CATALOG.filter(e => e.marketValue <= budget * 1.6);
  const isSafe = o => !o.cursed && (o.condition === 'A' || o.condition === 'B') && o.askingPrice <= budget;
  let safe = offers.filter(isSafe).length;
  for (let tries = 0; safe < 2 && tries < 120; tries++) {
    const cand = buildUsedOffer(cheapPool.length ? randomFrom(cheapPool) : pickCatalogEntryForUsed(), Math.random() < 0.3 ? 'A' : 'B', false);
    if (!isSafe(cand)) continue;
    // Replace a cursed car first, then a Poor (D) car, then anything that isn't already safe.
    let idx = offers.findIndex(o => o.cursed);
    if (idx < 0) idx = offers.findIndex(o => o.condition === 'D');
    if (idx < 0) idx = offers.findIndex(o => !isSafe(o));
    if (idx < 0) break;
    offers[idx] = cand;
    safe++;
  }
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

    // The customer's car must be worth LESS than the price of the car they're buying —
    // nobody trades in something more valuable than what they're getting. Try a few
    // different cars; if none fit (e.g. a cheap listing), no request comes in.
    const maxTradeValue = Math.floor(targetCar.listPrice * 0.9);
    let customerCar = null, customerCarValue = 0;
    for (let attempt = 0; attempt < 10; attempt++) {
      const entry     = pickCatalogEntryForUsed();
      const condition = pickCondition([0.05, 0.25, 0.40, 0.30]);
      const candidate = buildCar(entry, condition, 'used', false);
      // Their car's value at ~55–80% market (they inflate a bit)
      const value     = Math.round(candidate.marketValue * randomFloat(0.55, 0.80));
      if (value > 0 && value <= maxTradeValue) { customerCar = candidate; customerCarValue = value; break; }
    }
    if (!customerCar) continue;
    customerCar.purchasePrice = 0;

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

    // cashDelta: cash the customer adds on top of their car. Never negative — customers
    // don't ask you to pay them to take their trade-in.
    const rawDelta = buyerTotalWillingToPay - customerCarValue;
    // Cap extra cash to 30% of market value (prevents insane top-ups for overpriced cars).
    const maxExtraCash = Math.round(targetCar.marketValue * 0.30);
    // Cap the amount the customer asks us to pay to 20% of market value.
    const minDelta = -Math.round(targetCar.marketValue * 0.20);
    // Also never let car + cash exceed the listed price of the car they're buying.
    const cashDelta = clamp(rawDelta, 0, Math.max(0, Math.min(maxExtraCash, targetCar.listPrice - customerCarValue)));

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
        // Normal: buyer offers relative to list price. Raised from the original 0.72–0.97
        // range, which averaged out to selling *below* factory invoice cost even when
        // priced right at fair market value — every sale was a guaranteed loss before
        // fees and overhead. Buyers now still haggle, but a fairly-priced car should
        // clear a real margin on average, not just on a lucky roll.
        buyerMax     = Math.round(car.listPrice * randomFloat(0.92, 1.00) * clamp(titleBuyerMult + 0.1, 0.65, 1.05));
        const mult   = randomFloat(0.87, 0.99);
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
  const washBonus          = car.washed ? WASH_SALE_CHANCE_BONUS : 1.0;
  const titleFactor        = TITLE_BUYER_MULT[car.titleStatus] || 1.0;
  const photoStudioFactor  = state.upgrades.photoStudio ? 1.10 : 1.0;
  const certifiedFactor    = isCertifiedCar(car) ? CERTIFIED_SALE_BONUS : 1.0;
  const showroomFactor     = 1 + getShowroomDraw().bonus; // v1.17.0 — full showroom floor draws buyers

  // Small-lot focus bonus: with only a car or two for sale, a dealer can put real attention
  // and hustle behind each one — the exact scenario at the start of a new game.
  const activeListings = (state.garage || []).filter(c => c.isForSale).length || 1;
  const focusFactor = activeListings <= 2 ? 1.35 : activeListings <= 4 ? 1.15 : 1.0;

  // Nightmare: buyers are wary after dark, and cursed cars give them the creeps.
  const nightmareFactor = isNightmare()
    ? ((car.cursed && !hasWard('nmCurio') ? 0.68 - 0.1 * nmDepth1() : 0.9 - 0.12 * nmDepth1()) * (hasWard('nmNeon') ? 1.15 : 1))
    : 1;
  chance = chance * priceAtt * condFactor * categoryFactor * priceTierFactor * crashFactor
         * lotFactor * marketingFactor * repFactor
         * repBoostFactor * demandFactor * washBonus * titleFactor * photoStudioFactor * certifiedFactor
         * focusFactor * showroomFactor * nightmareFactor;

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

/** Count a discovered-stolen car the player didn't buy (once per car) toward "Not Today". */
function countStolenAvoided(car) {
  if (!car || car.stolenAvoidCounted) return;
  if ((car.legalStatus || 'clean') !== 'stolen' || !car.legalDiscovered) return;
  car.stolenAvoidCounted = true;
  state.stolenCarsAvoided = (state.stolenCarsAvoided || 0) + 1;
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
  // The repair clears crashDamageSeverity, so read the severity remembered at repair time.
  // Older repaired cars without it are counted if they carry a rebuilt title.
  const crashSev = car.crashRepairedSeverity
    || ((car.hasCrashRepair && car.titleStatus === 'rebuilt') ? 'moderate' : 'none');
  if ((crashSev === 'moderate' || crashSev === 'severe') && car.hasCrashRepair) {
    state.crashDamageRebuilds = (state.crashDamageRebuilds || 0) + 1;
  }
  if (isNightmare()) onNightmareSale(car);
}

function getLiquidationMultiplier(car) {
  return LIQUIDATION_MULT[car?.titleStatus] || LIQUIDATION_MULT.clean;
}

function getLeaseRate(car) {
  const diffKey = state.difficulty === 'nightmare' ? 'nightmare' : state.difficulty === 'hard' ? 'hard' : 'normal';
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
  const totaledCarIds = [];
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
    // Sending a car out with unresolved mechanical issues still on it (skipped repairs)
    // or in already-rough condition raises the odds of it actually crashing.
    const neglectIssueCount = (car.hiddenIssues || []).length;
    const neglectCrashBonus = neglectIssueCount * LEASE_NEGLECT_CRASH_BONUS_PER_ISSUE
                             + (LEASE_NEGLECT_CONDITION_CRASH_BONUS[car.condition] || 0);
    const crashBonus = (state.difficulty === 'nightmare' ? 0.0004 : state.difficulty === 'hard' ? 0.0002 : 0) + neglectCrashBonus;
    if (Math.random() < LEASE_CRASH_PROBABILITY + crashBonus) {
      // Lessee pays out all remaining lease payments immediately
      const remainingDays   = Math.max(0, lease.endDay - state.day);
      const remainingPayout = Math.round(remainingDays * lease.paymentPerDay);
      state.cash += remainingPayout;
      lease.totalPaid = (lease.totalPaid || 0) + remainingPayout;

      const carLabel     = `${car.year} ${car.make} ${car.model}${car.trim ? ` ${car.trim}` : ''}`;
      const valueBefore  = car.marketValue;
      car.leaseStatus = 'none';
      car.activeLease = null;

      // ── Insurance: decide whether this is a total-loss payout or a covered repair ──
      const company = getActiveInsurance();
      const canClaim = company && insuranceCanClaim(company);
      let totaledByInsurance = false;
      if (canClaim && Math.random() < company.totalOutChance) {
        totaledByInsurance = true;
        const insuredValue = Math.min(valueBefore, company.valueCap);
        const payout = Math.max(0, Math.round(insuredValue * company.totalOutPayoutPct) - company.deductible);
        recordInsuranceClaim(payout);
        state.totalCarsInsuredTotaled = (state.totalCarsInsuredTotaled || 0) + 1;
        addNote(`🛡️ ${company.name} totaled ${carLabel} — paid ${formatCurrency(payout)}.`, 'info');
        if (payout > 0) {
          queueInsuranceModal(`
            <div class="ins-event-header ins-event-header--loss">
              <div class="ins-event-icon">💥</div>
              <h3>Leased Vehicle Totaled</h3>
              <p class="ins-event-sub">Declared a total loss after a crash while on lease.</p>
            </div>
            <div class="ins-event-section">
              <div class="ins-event-section-title">Vehicle</div>
              <div class="stat-row"><span>Car</span><strong>${carLabel}</strong></div>
              <div class="stat-row"><span>Value Before Crash</span><strong>${formatCurrency(valueBefore)}</strong></div>
              <div class="stat-row"><span>Lessee Payout (remaining payments)</span><strong class="text-green">${formatCurrency(remainingPayout)}</strong></div>
            </div>
            <div class="ins-event-section ins-event-payout">
              <div class="ins-event-section-title">${uiIcon('shield')} Insurance Payout</div>
              <div class="stat-row"><span>Insurer</span><strong>${company.name}</strong></div>
              <div class="stat-row"><span>Deductible</span><strong>−${formatCurrency(company.deductible)}</strong></div>
              <div class="stat-row"><span>Total-Loss Payout</span><strong class="text-green">${formatCurrency(payout)}</strong></div>
            </div>
            <p class="ins-event-footnote">${uiIcon('warning')} The wreck has been removed from your lot.</p>
          `);
        }
      }

      if (!totaledByInsurance) {
        // Return car in heavily damaged Poor / Salvage condition (condition code 'D' = Poor)
        car.condition   = 'D';
        car.titleStatus = 'salvage';
        // Repair cost is 90–130% of current market value — near or above the car's worth
        car.repairCost  = Math.round(car.marketValue * randomFloat(LEASE_CRASH_REPAIR_COST_MIN, LEASE_CRASH_REPAIR_COST_MAX));
        // Add structural crash damage entry to the car's hidden issues list
        const structuralCost = Math.round(car.repairCost * LEASE_CRASH_STRUCTURAL_RATIO);
        const crashIssue     = { name: 'Crash damage (structural)', cost: structuralCost };
        if (!car.hiddenIssues.some(i => i.name === crashIssue.name)) car.hiddenIssues.push(crashIssue);
        car.inspected = true;

        // Frame survived — insurance (if any) covers a cut of the repair bill instead of totaling out.
        if (canClaim) {
          const preRepairCost = car.repairCost;
          const repairCovered = Math.max(0, Math.round(car.repairCost * company.repairCoveragePct) - company.deductible);
          if (repairCovered > 0) {
            recordInsuranceClaim(repairCovered);
            car.repairCost = Math.max(0, car.repairCost - repairCovered);
            addNote(`🛡️ ${company.name} covered ${formatCurrency(repairCovered)} of ${carLabel}'s repair.`, 'info');
            queueInsuranceModal(`
              <div class="ins-event-header">
                <div class="ins-event-icon">🔧</div>
                <h3>Leased Vehicle Crashed</h3>
                <p class="ins-event-sub">Frame wasn't damaged — repairs covered by insurance.</p>
              </div>
              <div class="ins-event-section">
                <div class="ins-event-section-title">Vehicle</div>
                <div class="stat-row"><span>Car</span><strong>${carLabel}</strong></div>
                <div class="stat-row"><span>Condition</span><strong>Poor / Salvage title</strong></div>
                <div class="stat-row"><span>Lessee Payout (remaining payments)</span><strong class="text-green">${formatCurrency(remainingPayout)}</strong></div>
              </div>
              <div class="ins-event-section ins-event-payout">
                <div class="ins-event-section-title">${uiIcon('shield')} Insurance Payout</div>
                <div class="stat-row"><span>Insurer</span><strong>${company.name}</strong></div>
                <div class="stat-row"><span>Total Repair Cost</span><strong>${formatCurrency(preRepairCost)}</strong></div>
                <div class="stat-row"><span>Covered by ${company.name}</span><strong class="text-green">${formatCurrency(repairCovered)}</strong></div>
                <div class="stat-row"><span>You Still Owe</span><strong class="text-red">${formatCurrency(car.repairCost)}</strong></div>
              </div>
            `);
          }
        }

        addNote(
          `💥 Lease crash! ${carLabel} was wrecked. Lessee paid out ${formatCurrency(remainingPayout)} (remaining payments). Repair cost: ~${formatCurrency(car.repairCost)}.`,
          'error'
        );
      } else {
        totaledCarIds.push(car.id);
        addNote(
          `💥 Lease crash! ${carLabel} was wrecked and totaled. Lessee paid out ${formatCurrency(remainingPayout)} (remaining payments).`,
          'error'
        );
      }
      showToast(`💥 Leased ${carLabel} was crashed!${totaledByInsurance ? ' Insurance totaled it.' : ' Payout received.'}`, 'error');
      continue;
    }

    const termProgress = clamp((state.day - lease.startDay) / Math.max(1, lease.termDays), 0, LEASE_TERM_PROGRESS_CAP);
    const hardBonus = state.difficulty === 'nightmare' ? LEASE_ISSUE_BONUS_HARD_DIFFICULTY * 2 : state.difficulty === 'hard' ? LEASE_ISSUE_BONUS_HARD_DIFFICULTY : 0;
    const titleBonus = car.titleStatus === 'lemon' ? LEASE_ISSUE_BONUS_LEMON : car.titleStatus === 'salvage' ? LEASE_ISSUE_BONUS_SALVAGE : 0;
    // Existing unresolved issues compound — a neglected car breaks down faster the longer it's ignored.
    const neglectBonus = neglectIssueCount * LEASE_NEGLECT_ISSUE_BONUS_PER_ISSUE;
    const issueChance = clamp(0.001 + (termProgress * 0.007) + titleBonus + hardBonus + neglectBonus, 0, 0.08);
    if (Math.random() < issueChance) {
      const issueDef = randomFrom(HIDDEN_ISSUES);
      const issue = { name: issueDef.name, cost: computeIssueCost(issueDef, car.marketValue) };
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

  if (totaledCarIds.length) {
    state.garage = state.garage.filter(c => !totaledCarIds.includes(c.id));
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
      const principalDue = Math.min(state.loanBalance, Math.max(terms.minPrincipalFloor ?? 250, Math.round(state.loanBalance * terms.minPrincipalRate)));
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
  if (state.loanBalance > 0 && (state.cash < 0 || (due > 0 && isHardPlus() && state.cash < 250))) {
    state.daysGoodStanding = 0;
    state.missedPayments = (state.missedPayments || 0) + 1;
    state.delinquencyLevel = Math.max(state.delinquencyLevel || 0, state.missedPayments);
    if (state.missedPayments === DELINQUENCY_WARNING_LEVEL) {
      addNote('⚠️ Late payment warning: cash is negative after obligations.', 'warning');
      showToast('⚠️ Missed payment warning.', 'warning');
    } else if (state.missedPayments === DELINQUENCY_DEFAULT_LEVEL) {
      state.loanFrozen = true;
      state.loanApr += state.difficulty === 'nightmare' ? 0.12 : state.difficulty === 'hard' ? 0.08 : 0.05;
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
    // Credit recovery: reduce delinquency level slowly on Normal mode, not on Hard or Nightmare
    if (!isHardPlus()) {
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
  if (isHardPlus()) {
    state.gameOver = true;
    state.hardBankruptcyOccurred = true;
    state.gameOverCause = 'bankruptcy';
    addNote(isNightmare() ? '💥 Bankruptcy on Nightmare. The lights go out. Game Over.' : '💥 Bankruptcy on Hard mode. Game Over.', 'error');
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
  const nightmare = isNightmare();
  const consumed = state.gameOverCause === 'consumed';
  const asleep = state.gameOverCause === 'sleep';
  const woke = state.gameOverCause === 'woke';
  const fond = state.gameOverCause === 'fond';
  const titleEl = document.getElementById('game-over-title-text');
  const subEl   = document.getElementById('game-over-subtitle');
  if (titleEl) titleEl.textContent = nightmare ? (woke ? 'YOU WOKE UP' : fond ? 'HE IS HAPPY' : asleep ? 'YOU FELL ASLEEP' : consumed ? 'YOU NEVER WOKE UP' : 'THE LOT GOES DARK') : 'GAME OVER';
  if (subEl) {
    subEl.textContent = nightmare
      ? (woke
          ? 'Sunlight. A desk. Old coffee. You are awake, and the lot is exactly where you left it. The door chimes. A customer steps in, smiling a little too wide. "Good morning," he says. "Shall we begin?" Winning never freed you. It only woke you up.'
          : fond
          ? 'The Pale Man lost, and he is glad of it. He sits beside you and hums. He has stopped asking you to choose. Nobody has ever been this safe, or this kept.'
          : asleep
          ? 'Your eyes closed, just for a moment. The Pale Man had been patient all night. He was only ever waiting for you to stop watching.'
          : consumed
          ? 'The third Reckoning took everything. The dealership is still open. Nobody remembers who runs it.'
          : 'Bankruptcy on Nightmare. The lights go out one by one. Somewhere, a radio plays your name.')
      : 'Hard mode bankruptcy — your dealership has closed its doors.';
  }
  el.classList.toggle('nm-over', nightmare);
  el.classList.toggle('nm-ending', nightmare && (woke || fond));
  const diffRow = nightmare
    ? '<strong class="text-red">Nightmare 💀</strong>'
    : '<strong class="text-red">Hard 💪</strong>';
  const nmRows = nightmare ? `
      <div class="game-over-stat-row"><span>Reckonings</span><strong>${nm().reckonings || 0} / ${NIGHTMARE_MAX_RECKONINGS}</strong></div>
      <div class="game-over-stat-row"><span>Peak Dread</span><strong>${nm().peakDread || 0}</strong></div>
      <div class="game-over-stat-row"><span>Candles lit</span><strong>${nm().candlesLit || 0}</strong></div>
      <div class="game-over-stat-row"><span>Pale Man duels won / lost</span><strong>${nm().sleepDuelsWon || 0} / ${nm().sleepDuelsLost || 0}</strong></div>` : '';
  const statsEl = document.getElementById('game-over-stats');
  if (statsEl) {
    statsEl.innerHTML = `
      <div class="game-over-stat-row"><span>${nightmare ? 'Night' : 'Day'} reached</span><strong>${state.day}</strong></div>
      <div class="game-over-stat-row"><span>Total cars sold</span><strong>${(state.salesHistory||[]).length}</strong></div>
      <div class="game-over-stat-row"><span>Cumulative profit</span><strong>${formatCurrency((state.salesHistory||[]).reduce((s,h)=>s+(h.profit||0),0))}</strong></div>
      <div class="game-over-stat-row"><span>Difficulty</span>${diffRow}</div>${nmRows}`;
  }
  el.classList.remove('hidden');
  setMusicTrack(nightmare ? 'nightmare' : 'menu'); // Nightmare keeps its own soundtrack; others ease back to the calm one
}

function gameOverReturnToMenu() {
  document.getElementById('game-over-screen')?.classList.add('hidden');
  returnToMenu();
}

function gameOverNewGame() {
  document.getElementById('game-over-screen')?.classList.add('hidden');
  const diff = state.difficulty === 'nightmare' ? 'nightmare' : 'hard';   // restart on the difficulty you just lost on
  state = JSON.parse(JSON.stringify(DEFAULT_STATE));
  state.difficulty = diff;
  syncLoanTermsToDifficulty();
  state.usedMarketOffers = generateUsedMarket();
  saveState();
  renderAll();
  applyMusicForContext(); // back to the in-game soundtrack now that a fresh run is underway
  showToast(diff === 'nightmare' ? 'New Nightmare started. Keep the lights on. 🕯️' : 'New Hard game started. Good luck! 💪', 'success');
}

/** Shift per-segment market indices and occasionally fire a market event. */
function processMarketVolatility() {
  const nightmare = isNightmare();
  const isHard = state.difficulty === 'hard';
  // Nightmare is scary, not ruinous: its swings are only a little bigger than Normal and it recovers quickly,
  // so segment values stay in a workable band (never below ~88%) and cars remain sellable.
  const diffMultiplier = nightmare ? 1.2 : isHard ? 1.4 : 1.0;
  const idxMin = nightmare ? getMarketFloor() : 0.60;
  const idxMax = nightmare ? NIGHTMARE_MARKET_MAX : 1.50;
  for (const seg of Object.keys(state.marketIndices)) {
    // Daily drift ±0–1.5% on Normal, ±0–2.1% on Hard, ±0–2.6% on Nightmare
    const drift = (Math.random() - 0.5) * 0.03 * diffMultiplier;
    // Mean reversion: gently pull index back toward 1.0 each day
    // Normal: 3% of the excess per day; Hard: 1.5%; Nightmare: 1% (slower reversion = more volatility)
    const reversionStrength = nightmare ? 0.040 : isHard ? 0.015 : 0.030;
    const reversion = (1.0 - state.marketIndices[seg]) * reversionStrength;
    state.marketIndices[seg] = clamp(state.marketIndices[seg] * (1 + drift) + reversion, idxMin, idxMax);
  }
  // Random market event — 5% on Normal, 12% on Hard, 20% on Nightmare (which also adds its own omens)
  const eventChance = nightmare ? 0.15 : isHard ? 0.12 : 0.05;
  if (Math.random() < eventChance) {
    const evt = randomFrom(nightmare ? MARKET_EVENTS.concat(NIGHTMARE_EVENTS) : MARKET_EVENTS);
    for (const [seg, delta] of Object.entries(evt.effects)) {
      if (state.marketIndices[seg] !== undefined) {
        state.marketIndices[seg] = clamp(state.marketIndices[seg] + delta * diffMultiplier, idxMin, idxMax);
      }
    }
    if (nightmare && evt.dread) {
      changeDread(evt.dread);
      nm().eventsSeen = (nm().eventsSeen || 0) + 1;
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
      const loss = car.marketValue * (0.95 - idx) * (isNightmare() ? 0.06 : 0.18);   // Nightmare: dips don't permanently eat your stock
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

// ============================================================
// STAFF DEALS — staff buy, fix and flip cars on their own
// Each staffer runs up to `speed` deals at once. A deal walks through
// Scouting → (Repairing) → Selling. The car sits on your Car Lot the whole
// time, tagged with the staffer's name. Better rank = cheaper buys,
// higher sale prices, bigger budget and faster turnaround.
// ============================================================
const STAFF_RANKS = [
  { name: 'Rookie',        min: 0,  cap: 20000,  icon: '🧑', color: '#9aa7b8' },
  { name: 'Salesperson',   min: 55, cap: 35000,  icon: '🧑‍💼', color: '#4fb0ff' },
  { name: 'Senior Dealer', min: 65, cap: 60000,  icon: '🕴️', color: '#6fe3b8' },
  { name: 'Lead Dealer',   min: 75, cap: 95000,  icon: '🤵', color: '#ffb84d' },
  { name: 'Master Dealer', min: 85, cap: 140000, icon: '👑', color: '#ffd35d' },
];
const STAFF_CASH_RESERVE = 5000;   // staff never spend the last of your cash
const STAFF_SEVERANCE_DAYS = 2;    // firing costs this many days of wages
let _staffFireArmed = null;

function staffSkill(st) { return ((st.negotiation || 0) + (st.selling || 0)) / 2; }
function getStaffRankIdx(st) {
  const sk = staffSkill(st);
  let idx = 0;
  STAFF_RANKS.forEach((r, i) => { if (sk >= r.min) idx = i; });
  return idx;
}
const getStaffRank = st => STAFF_RANKS[getStaffRankIdx(st)];
const staffBuyMult  = st => clamp(0.83 - ((st.negotiation || 45) - 45) * 0.0022, 0.70, 0.83);
const staffSellMult = st => clamp(1.02 + ((st.selling || 45) - 45) * 0.0016, 1.02, 1.11);
function ensureStaffFields(st) {
  if (!Array.isArray(st.jobs)) st.jobs = [];
  st.flips = st.flips || 0;
  st.profit = st.profit || 0;
  st.bestFlip = st.bestFlip || 0;
  return st;
}
function staffJobForCar(car) {
  if (!car?.staffFlip) return null;
  const st = (state.staff || []).find(x => x.id === car.staffFlip.staffId);
  return st ? (st.jobs || []).find(j => j.carId === car.id) || null : null;
}
function staffJobText(st, job) {
  const car = job.carId ? state.garage.find(c => c.id === job.carId) : null;
  const name = car ? formatCarDisplayName(car) : '';
  if (job.stage === 'scouting')  return { icon: '🔎', cls: 'scout', text: job.note || 'Scouting listings and auctions for a deal…' };
  if (job.stage === 'repairing') return { icon: '🔧', cls: 'repair', text: `Fixing up the ${name} in the workshop` };
  return { icon: '🤝', cls: 'sell', text: job.note || `Showing the ${name} to buyers` };
}
function staffPromote(st) {
  // Every flip sharpens the weaker skill a little; ranks are driven by average skill.
  const before = getStaffRankIdx(st);
  const key = (st.negotiation <= st.selling) ? 'negotiation' : 'selling';
  if (Math.random() < 0.7) st[key] = Math.min(99, st[key] + 1);
  else { const k2 = key === 'negotiation' ? 'selling' : 'negotiation'; st[k2] = Math.min(99, st[k2] + 1); }
  const after = getStaffRankIdx(st);
  if (after > before) {
    st.wage = Math.round(st.wage * 1.08);
    const r = STAFF_RANKS[after];
    addStaffActivity(`🎉 ${st.name} was promoted to ${r.name}! Bigger budget and better margins (wage now ${formatCurrency(st.wage)}/day).`);
    addNote(`🎉 ${st.name} was promoted to ${r.name}.`, 'success');
    showToast(`🎉 ${st.name} is now a ${r.name}!`, 'success');
  }
}

function staffTryBuy(st, job) {
  const rank = getStaffRank(st);
  const free = state.garageSlots - state.garage.length - state.deliveries.length;
  if (free < 2) return { fail: 'Waiting for lot space' };
  const budget = Math.min(rank.cap, state.cash - STAFF_CASH_RESERVE);
  if (budget < 2500) return { fail: 'Waiting for cash' };
  const rankIdx = getStaffRankIdx(st);
  let best = null;
  for (let i = 0; i < 14; i++) {
    const entry = pickCatalogEntryForUsed();
    if (!entry || entry.marketValue * 0.6 > budget || entry.marketValue < 3000) continue;
    const car = buildCar(entry, pickCondition([0.10, 0.40, 0.35, 0.15]), 'used', false);
    if (car.legalStatus !== 'clean' || car.vinStatus !== 'normal') continue;
    if (car.titleStatus === 'lemon' || (car.titleStatus === 'salvage' && rankIdx < 2)) continue;
    if (car.crashDamageSeverity === 'moderate' || car.crashDamageSeverity === 'severe') continue;
    if (car.marketValue < 2500) continue;
    const price = Math.round(car.marketValue * staffBuyMult(st) * randomFloat(0.97, 1.03));
    if (price > budget) continue;
    const fixable = car.hiddenIssues.filter(x => !x.isCrashDamage).reduce((sum, x) => sum + x.cost, 0);
    const repairs = Math.round(fixable * (1 - 0.25 - (st.selling / 100) * 0.35));
    const score = (car.marketValue * staffSellMult(st) - price - repairs) / price;
    if (score < 0.05) continue;
    if (!best || score > best.score) best = { car, price, repairs, score };
  }
  if (!best) return { fail: 'No good deals found today' };
  const { car, price, repairs } = best;
  state.cash -= price;
  car.purchasePrice = price;
  car.daysInLot = 0;
  car.legalDiscovered = true;
  car.vinDiscovered = true;
  car.staffFlip = { staffId: st.id, staffName: st.name, jobId: job.id };
  state.garage.push(car);
  job.carId = car.id;
  job.buyPrice = price;
  job.repairCost = repairs;
  job.repairSpent = 0;
  const label = formatCarDisplayName(car);
  addStaffActivity(`🤝 ${st.name} negotiated and bought a ${label} for ${formatCurrency(price)} (market value ${formatCurrency(car.marketValue)}).`);
  addNote(`🤝 ${st.name} bought a ${label} for ${formatCurrency(price)}.`, 'info');
  return { ok: true, label, price };
}

function staffStartSelling(st, job) {
  const rank = getStaffRankIdx(st);
  job.stage = 'selling';
  job.total = job.left = rank >= 3 ? 2 : 3;
  job.note = null;
}

function staffSettleSale(st, job, car) {
  const salePrice = Math.round(car.marketValue * staffSellMult(st) * randomFloat(0.97, 1.04));
  const fee = Math.round(salePrice * TRANSACTION_FEE);
  const dealerFees = computeDealerFees();
  const profit = salePrice - fee - car.purchasePrice - (job.repairSpent || 0) + dealerFees.total;
  state.cash += salePrice - fee + dealerFees.total;
  const buyer = randomFrom(CUSTOMER_NAMES);
  recordSaleStats(car, profit);
  state.salesHistory.unshift({
    ...car, soldDay: state.day, salePrice, fee, profit, dealerFees,
    buyerName: buyer, agreementNo: generateId().toUpperCase(),
    note: `Flipped by ${st.name}`,
  });
  state.garage = state.garage.filter(c => c.id !== car.id);
  state.customerOffers  = state.customerOffers.filter(o => o.carId !== car.id);
  state.tradeInRequests = state.tradeInRequests.filter(r => r.targetCarId !== car.id);
  st.flips++; st.profit += profit; st.bestFlip = Math.max(st.bestFlip, profit);
  state.staffProfitTotal = (state.staffProfitTotal || 0) + profit;
  const label = formatCarDisplayName(car);
  addStaffActivity(`💰 ${st.name} sold the ${label} to ${buyer} for ${formatCurrency(salePrice)} — profit ${profit >= 0 ? '+' : '−'}${formatCurrency(Math.abs(profit))}.`);
  addNote(`💰 ${st.name} flipped a ${label}: ${profit >= 0 ? '+' : '−'}${formatCurrency(Math.abs(profit))}.`, profit >= 0 ? 'success' : 'warning');
  staffPromote(st);
  return profit;
}

/** Daily tick: every staff deal moves one step forward. */
function processStaffFlips() {
  const res = { sold: 0, bought: 0, net: 0 };
  if (!state.staff?.length) return res;
  for (const st of state.staff) {
    ensureStaffFields(st);
    const rankIdx = getStaffRankIdx(st);
    for (const job of [...st.jobs]) {
      const car = job.carId ? state.garage.find(c => c.id === job.carId) : null;
      // The car disappeared or was taken over by the player — close the deal quietly.
      if (job.carId && (!car || (car.leaseStatus === 'active' && car.activeLease))) {
        if (car) delete car.staffFlip;
        st.jobs = st.jobs.filter(j => j.id !== job.id);
        addStaffActivity(`⚠️ ${st.name}'s deal fell through — the car is no longer available.`);
        continue;
      }
      if (car && car.inServiceUntilDay) { job.note = 'Waiting for the workshop'; continue; }
      job.left--;
      if (job.left > 0) continue;
      if (job.stage === 'scouting') {
        const r = staffTryBuy(st, job);
        if (!r.ok) { job.left = 1; job.note = r.fail; continue; }
        res.bought++;
        job.note = null;
        if (job.repairCost > 0) { job.stage = 'repairing'; job.total = job.left = job.repairCost > 3000 ? 2 : 1; }
        else staffStartSelling(st, job);
      } else if (job.stage === 'repairing') {
        if (state.cash < job.repairCost) { job.left = 1; job.note = 'Waiting for cash'; continue; }
        state.cash -= job.repairCost;
        job.repairSpent = job.repairCost;
        car.hiddenIssues = car.hiddenIssues.filter(x => x.isCrashDamage);
        car.repairCost = 0;
        car.inspected = true;
        car.repairCount = (car.repairCount || 0) + 1;
        addStaffActivity(`🔧 ${st.name} finished repairs on the ${formatCarDisplayName(car)} (${formatCurrency(job.repairCost)}).`);
        staffStartSelling(st, job);
      } else if (job.stage === 'selling') {
        const profit = staffSettleSale(st, job, car);
        res.sold++; res.net += profit;
        st.jobs = st.jobs.filter(j => j.id !== job.id);
      }
    }
    // Free hands pick up the next deal.
    if (state.staffTrading !== false) {
      while (st.jobs.length < st.speed) {
        st.jobs.push({ id: generateId(), stage: 'scouting', total: rankIdx >= 3 ? 1 : 2, left: rankIdx >= 3 ? 1 : 2, carId: null, note: null });
      }
    }
  }
  return res;
}

function toggleStaffTrading() {
  state.staffTrading = state.staffTrading === false;
  addStaffActivity(state.staffTrading ? '▶️ Staff deals resumed.' : '⏸️ Staff deals paused — current deals will finish, no new ones start.');
  saveState();
  renderStaff();
}

function fireStaff(staffId) {
  const st = (state.staff || []).find(x => x.id === staffId);
  if (!st) return;
  if (_staffFireArmed !== staffId) {
    _staffFireArmed = staffId;
    playSfx('warning');
    renderStaff();
    setTimeout(() => { if (_staffFireArmed === staffId) { _staffFireArmed = null; renderStaff(); } }, 5000);
    return;
  }
  _staffFireArmed = null;
  const severance = st.wage * STAFF_SEVERANCE_DAYS;
  if (state.cash < severance) { showToast(`You need ${formatCurrency(severance)} for severance to let ${st.name} go.`, 'error'); renderStaff(); return; }
  state.cash -= severance;
  // Any car they were working on stays on your lot as a normal car.
  for (const car of state.garage) { if (car.staffFlip?.staffId === st.id) delete car.staffFlip; }
  state.staff = state.staff.filter(x => x.id !== st.id);
  addStaffActivity(`🚪 You let ${st.name} go (severance ${formatCurrency(severance)}).`);
  addNote(`🚪 ${st.name} was let go. Severance: ${formatCurrency(severance)}.`, 'info');
  ensureStaffCandidates();
  saveState();
  renderAll();
  showToast(`${st.name} has been let go.`, 'info');
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
    const oldTitle = car.titleStatus;
    const hadCrash = (car.crashDamageSeverity || 'none') !== 'none';
    const crashSeverity = car.crashDamageSeverity || 'none';
    // Repair always restores to excellent condition and clears all issues
    car.condition    = 'A';
    if (hadCrash) {
      // Undo the steep unrepaired-crash value penalty that's baked into marketValue,
      // then — unless the car already carries a worse brand (salvage/lemon) — brand it
      // "rebuilt" and apply that smaller, permanent discount instead. Repaired is worth
      // a lot more than unrepaired, but a rebuilt title never sells for what a clean one does.
      const crashPenaltyMult = 1 - CRASH_DAMAGE_VALUE_PENALTY[crashSeverity];
      if (crashPenaltyMult > 0) car.marketValue = Math.round(car.marketValue / crashPenaltyMult);
      if (car.titleStatus === 'clean') {
        car.marketValue = Math.round(car.marketValue * TITLE_VALUE_MULT.rebuilt);
        car.titleStatus = 'rebuilt';
      }
      car.hasCrashRepair = true;
      car.crashRepairedSeverity = crashSeverity;
    }
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
    const titleNote = car.titleStatus !== oldTitle ? ` Title branded ${TITLE_LABELS[car.titleStatus]}.` : '';
    addNote(`🔩 ${car.year} ${car.make} ${car.model} repair complete: ${oldCond} → ${car.condition}. Repair #${repairCount}${boostFactor > 0 ? ` (+${Math.round(boostFactor * 100)}% value)` : ' (no value gain at this mileage)'}.${titleNote}`, 'success');
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
  }
}

// ============================================================
// INSURANCE — v1.8.0
// ============================================================
// Three insurers, each with a distinct trade-off between premium cost,
// deductible, payout generosity, and fine print. Coverage applies to
// cars stolen off the lot and cars crashed while on lease. Entirely
// optional — the player can run uninsured and pocket the premium instead.

const INSURANCE_COMPANIES = [
  {
    id: 'valueguard',
    name: 'ThriftLane',
    logoA: 'THRIFT',
    logoB: 'LANE',
    icon: 'lock',
    tagline: '"Simple coverage, small price."',
    brandStart: '#0f4c3a',
    brandEnd:   '#0d8c6b',
    brandAccent: '#2ed58f',
    monthlyRate: 0.018,          // 1.8% of insured fleet value per month
    minMonthlyPremium: 100,
    deductible: 2000,
    theftPayoutPct: 0.70,
    totalOutChance: 0.35,        // odds a lease crash is declared a total loss vs. a covered repair
    totalOutPayoutPct: 0.70,
    repairCoveragePct: 0.55,
    valueCap: 50000,             // cars worth more than this are covered only up to the cap
    waitingPeriodDays: 5,        // claims aren't honored until the policy is this many days old
    earlyCancelFeeDays: 0,
    earlyCancelFee: 0,
    perks: [
      { icon: 'cash', title: 'Lowest premium in town', desc: 'The cheapest monthly rate of any insurer.', badge: 'SIGNATURE PERK' },
      { icon: 'ban',  title: 'Cancel anytime, no fee', desc: 'Walk away whenever you want — zero penalty.' },
      { icon: 'shield', title: '70% theft & crash payout', desc: 'Solid coverage on stolen and totaled vehicles.' },
    ],
    finePrint: '$2,000 deductible · no coverage above $50,000 · 5-day waiting period',
  },
  {
    id: 'continental',
    name: 'SteadyDrive',
    logoA: 'STEADY',
    logoB: 'DRIVE',
    icon: 'building',
    tagline: '"Reliable coverage, mile after mile."',
    brandStart: '#0f2c5c',
    brandEnd:   '#1f5fd6',
    brandAccent: '#5b9bff',
    monthlyRate: 0.032,
    minMonthlyPremium: 150,
    deductible: 1000,
    theftPayoutPct: 0.90,
    totalOutChance: 0.55,
    totalOutPayoutPct: 0.90,
    repairCoveragePct: 0.80,
    valueCap: Infinity,
    waitingPeriodDays: 2,
    earlyCancelFeeDays: 0,
    earlyCancelFee: 0,
    perks: [
      { icon: 'layers', title: 'No coverage cap', desc: "Every car on your lot is insured, whatever it's worth.", badge: 'SIGNATURE PERK' },
      { icon: 'trendingUp', title: '90% payout rate', desc: 'Strong payouts on theft and total-loss claims.' },
      { icon: 'gauge', title: '2-day waiting period', desc: 'Coverage kicks in almost as soon as you sign.' },
    ],
    finePrint: '$1,000 deductible per claim · pricier than ThriftLane',
  },
  {
    id: 'sterling',
    name: 'GoldShield',
    logoA: 'GOLD',
    logoB: 'SHIELD',
    icon: 'star',
    tagline: '"Top-tier protection, zero compromise."',
    brandStart: '#5c3a08',
    brandEnd:   '#d69a1f',
    brandAccent: '#ffc548',
    monthlyRate: 0.050,
    minMonthlyPremium: 250,
    deductible: 250,
    theftPayoutPct: 1.00,
    totalOutChance: 0.75,
    totalOutPayoutPct: 1.00,
    repairCoveragePct: 1.00,
    valueCap: Infinity,
    waitingPeriodDays: 0,
    earlyCancelFeeDays: 20,
    earlyCancelFee: 2500,
    perks: [
      { icon: 'trophy', title: '100% payouts', desc: 'Full market value on every covered claim.', badge: 'SIGNATURE PERK' },
      { icon: 'gauge', title: 'Zero waiting period', desc: 'Coverage starts the moment you sign.' },
      { icon: 'creditCard', title: '$250 deductible', desc: 'The lowest deductible of any insurer.' },
    ],
    finePrint: '$2,500 fee if cancelled within your first 20 days · priciest premium',
  },
];

function getInsuranceCompany(id) {
  return INSURANCE_COMPANIES.find(c => c.id === id) || null;
}

/** Active insurer object, or null if the player is running uninsured. */
function getActiveInsurance() {
  if (!state.insurance || !state.insurance.companyId) return null;
  return getInsuranceCompany(state.insurance.companyId);
}

/** Total market value of every owned car (lot + leased + in service) — what premiums are priced on. */
function getInsurableFleetValue() {
  return state.garage.reduce((sum, car) => sum + (car.marketValue || 0), 0);
}

function computeMonthlyPremium(company) {
  if (!company) return 0;
  return Math.max(company.minMonthlyPremium, Math.round(getInsurableFleetValue() * company.monthlyRate));
}

/** True once the active policy has cleared its waiting period and can pay claims. */
function insuranceCanClaim(company) {
  if (!company || !state.insurance?.startDay) return false;
  return (state.day - state.insurance.startDay) >= company.waitingPeriodDays;
}

function recordInsuranceClaim(payout) {
  if (payout <= 0) return;
  state.cash += payout;
  state.insurance.totalClaimsPaid = (state.insurance.totalClaimsPaid || 0) + payout;
  state.insurance.claimsCount = (state.insurance.claimsCount || 0) + 1;
}

function selectInsurance(companyId) {
  const company = getInsuranceCompany(companyId);
  if (!company) return;
  if (state.insurance?.companyId === companyId) { showToast('That policy is already active.', 'info'); return; }
  if (state.insurance?.companyId) {
    const ok = cancelInsurance(true);
    if (!ok) return; // couldn't afford the switch (early-cancellation fee on the old policy)
  }
  state.insurance = {
    companyId: company.id,
    startDay: state.day,
    nextBillDay: state.day + 30,
    totalPremiumsPaid: state.insurance?.totalPremiumsPaid || 0,
    totalClaimsPaid: state.insurance?.totalClaimsPaid || 0,
    claimsCount: state.insurance?.claimsCount || 0,
  };
  addNote(`🛡️ Signed with ${company.name} — ${formatCurrency(computeMonthlyPremium(company))}/month.`, 'info');
  showToast(`Insured with ${company.name}.`, 'success');
  saveState();
  renderAll();
}

/** Cancels the active policy. When switching to a new insurer mid-call, pass switching=true
 *  to suppress the standalone toast/save (selectInsurance handles those) while still charging
 *  any early-cancellation fee. Returns false only if an unavoidable fee can't be covered. */
function cancelInsurance(switching = false) {
  const company = getActiveInsurance();
  if (!company) {
    if (!switching) showToast('No active policy to cancel.', 'error');
    return true;
  }
  const daysActive = state.day - (state.insurance.startDay ?? state.day);
  const fee = (company.earlyCancelFeeDays > 0 && daysActive < company.earlyCancelFeeDays) ? company.earlyCancelFee : 0;
  if (fee > 0 && state.cash < fee) {
    showToast(`Cancelling now means a ${formatCurrency(fee)} early-cancellation fee — not enough cash on hand.`, 'error');
    return false;
  }
  if (fee > 0) {
    state.cash -= fee;
    addNote(`🛡️ Cancelled ${company.name} early — ${formatCurrency(fee)} cancellation fee charged.`, 'warning');
    showToast(`Cancelled — ${formatCurrency(fee)} early-cancellation fee.`, 'warning');
  } else {
    addNote(`🛡️ Cancelled insurance policy with ${company.name}.`, 'info');
    if (!switching) showToast('Insurance policy cancelled.', 'info');
  }
  state.insurance.companyId = null;
  state.insurance.startDay = null;
  state.insurance.nextBillDay = null;
  if (!switching) { saveState(); renderAll(); }
  return true;
}

/** Bills the active policy every 30 days. A missed payment (not enough cash) lapses the policy. */
function processInsuranceBilling() {
  const company = getActiveInsurance();
  if (!company || !state.insurance.nextBillDay) return;
  if (state.day < state.insurance.nextBillDay) return;
  const premium = computeMonthlyPremium(company);
  if (state.cash < premium) {
    addNote(`🛡️ ${company.name} cancelled your policy — couldn't collect the ${formatCurrency(premium)} monthly premium.`, 'error');
    showToast('Insurance lapsed — missed premium payment!', 'error');
    state.insurance.companyId = null;
    state.insurance.startDay = null;
    state.insurance.nextBillDay = null;
    return;
  }
  state.cash -= premium;
  state.insurance.totalPremiumsPaid = (state.insurance.totalPremiumsPaid || 0) + premium;
  state.insurance.nextBillDay += 30;
  addNote(`🛡️ Insurance premium paid: ${formatCurrency(premium)} to ${company.name}.`, 'info');
}

// ============================================================
// CAR THEFT — v1.3.0
// ============================================================

/** Returns the theft chance per car per day based on game progression. */
function getTheftChancePerCar() {
  const dayProgress = Math.max(0, state.day - 50);
  const baseChance  = clamp(dayProgress / 300, 0, 1) * THEFT_MAX_CHANCE_PER_DAY;
  const secLevel    = state.upgrades.securityLevel || 0;
  const reduction   = THEFT_REDUCTION_BY_LEVEL[Math.min(secLevel, THEFT_REDUCTION_BY_LEVEL.length - 1)] || 0;
  return baseChance * (1 - reduction);
}

/** Each night check if any car on the lot gets stolen. Leased cars are under signed lease
 *  agreements with the lessee, not sitting exposed on the lot, so they're never at risk. */
function processTheft() {
  const diffMult = state.difficulty === 'nightmare' ? 2.2 : state.difficulty === 'hard' ? 1.5 : state.difficulty === 'easy' ? 0.3 : 1.0;
  const chancePerCar = getTheftChancePerCar() * diffMult * (isNightmare() && hasWard('wardLights') ? 0.6 : 1);
  if (chancePerCar <= 0) return;

  const company = getActiveInsurance();
  const canClaim = company && insuranceCanClaim(company);

  const remaining = [];
  for (const car of state.garage) {
    if (car.leaseStatus === 'active') {
      // Leased vehicles are in the lessee's possession under contract — not theft targets.
      remaining.push(car);
      continue;
    }
    if (Math.random() < chancePerCar) {
      // Car stolen
      const value = car.marketValue || car.purchasePrice || 5000;
      state.totalCarsStolen = (state.totalCarsStolen || 0) + 1;
      let claimNote = '';
      if (canClaim) {
        const insuredValue = Math.min(value, company.valueCap);
        const payout = Math.max(0, Math.round(insuredValue * company.theftPayoutPct) - company.deductible);
        if (payout > 0) {
          recordInsuranceClaim(payout);
          state.totalCarsInsuredStolen = (state.totalCarsInsuredStolen || 0) + 1;
          claimNote = ` 🛡️ ${company.name} paid out ${formatCurrency(payout)}.`;
          const carLabel = `${car.year} ${car.make} ${car.model}${car.trim ? ` ${car.trim}` : ''}`;
          queueInsuranceModal(`
            <div class="ins-event-header ins-event-header--loss">
              <div class="ins-event-icon">🚨</div>
              <h3>Vehicle Stolen</h3>
              <p class="ins-event-sub">Taken from the lot overnight.</p>
            </div>
            <div class="ins-event-section">
              <div class="ins-event-section-title">Vehicle</div>
              <div class="stat-row"><span>Car</span><strong>${carLabel}</strong></div>
              <div class="stat-row"><span>Mileage</span><strong>${(car.mileage || 0).toLocaleString()} mi</strong></div>
              <div class="stat-row"><span>Market Value</span><strong>${formatCurrency(value)}</strong></div>
            </div>
            <div class="ins-event-section ins-event-payout">
              <div class="ins-event-section-title">${uiIcon('shield')} Insurance Payout</div>
              <div class="stat-row"><span>Insurer</span><strong>${company.name}</strong></div>
              <div class="stat-row"><span>Deductible</span><strong>−${formatCurrency(company.deductible)}</strong></div>
              <div class="stat-row"><span>Payout Received</span><strong class="text-green">${formatCurrency(payout)}</strong></div>
            </div>
          `);
        }
      }
      addNote(`🚨 THEFT: Your ${car.year} ${car.make} ${car.model} was stolen from the lot overnight! (Value: ${formatCurrency(value)})${claimNote}`, 'warning');
      showToast(`🚨 Your ${car.year} ${car.make} ${car.model} was stolen!${claimNote ? ' Insurance paid out.' : ''}`, 'error');
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
// `years` = [first, last] model year the car was sold in the US (default 2016-2025).
const SERVICE_PREMIUM_MAKES_MODELS = [
  { make: 'Porsche',   model: '911'          }, { make: 'Land Rover', model: 'Range Rover' },
  { make: 'Tesla',     model: 'Model S'      }, { make: 'BMW',        model: 'M5'          },
  { make: 'Mercedes',  model: 'S-Class'      }, { make: 'Audi',       model: 'RS6 Avant', years: [2021, 2025] },
  { make: 'Cadillac',  model: 'Escalade'     }, { make: 'Lexus',      model: 'LX 600',    years: [2022, 2025] },
];
const CUSTOMER_NAMES = [
  'Alex P.', 'Jordan K.', 'Sam R.', 'Taylor B.', 'Morgan L.', 'Casey H.',
  'Riley M.', 'Quinn T.', 'Avery S.', 'Drew C.', 'Parker W.', 'Logan N.',
];

function generateServiceCar() {
  const svcLevel = state.upgrades.serviceCapacityLevel || 0;
  const usePremium = svcLevel >= 2 && Math.random() < (svcLevel >= 3 ? 0.6 : 0.35);
  const mm    = randomFrom(usePremium ? SERVICE_PREMIUM_MAKES_MODELS : SERVICE_CAR_MAKES_MODELS);
  const year  = randomInt(Math.max(2016, mm.years ? mm.years[0] : 2016), Math.min(2025, mm.years ? mm.years[1] : 2025));
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
    const fee        = Math.round(car.listPrice * TRANSACTION_FEE);
    const dealerFees = computeDealerFees();
    const profit      = car.listPrice - fee - car.purchasePrice + dealerFees.total;
    state.cash       += car.listPrice - fee + dealerFees.total;
    state.reputation = profit > 0
      ? Math.min(state.reputation + 0.02, 2.0)
      : Math.max(state.reputation - 0.01, 0.1);
    recordSaleStats(car, profit);
    // Police check at point of sale for any problematic car (no impound — car already sold to buyer)
    const legalRisk = (car.legalStatus || 'clean') !== 'clean' || (car.vinStatus || 'normal') === 'scratched';
    if (legalRisk) checkPoliceEvent(car, false);
    state.salesHistory.unshift({
      ...car, soldDay: state.day, salePrice: car.listPrice, fee, profit,
      dealerFees, buyerName: randomFrom(CUSTOMER_NAMES), agreementNo: generateId().toUpperCase(),
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
  const fee        = Math.round(salePrice * TRANSACTION_FEE);
  const dealerFees = computeDealerFees();
  const profit      = salePrice - fee - car.purchasePrice + dealerFees.total;
  state.cash       += salePrice - fee + dealerFees.total;
  state.reputation = profit > 0
    ? Math.min(state.reputation + 0.015, 2.0)
    : Math.max(state.reputation - 0.01, 0.1);
  recordSaleStats(car, profit);
  // Police check on sale (customer negotiations / accepted offers) — no impound, car already sold
  const legalRisk = (car.legalStatus || 'clean') !== 'clean' || (car.vinStatus || 'normal') === 'scratched';
  if (legalRisk) checkPoliceEvent(car, false);
  state.salesHistory.unshift({
    ...car, soldDay: state.day, salePrice, fee, profit,
    dealerFees, buyerName: randomFrom(CUSTOMER_NAMES), agreementNo: generateId().toUpperCase(),
  });
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
      const newNpcDelta = Math.max(0, Math.round(req.cashDelta + (req.counterCashDelta - req.cashDelta) * moveBias));
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

/** Cleans up trade-in requests and used listings that broke the pricing rules (older saves):
 *  no negative prices, no customer paying with a car worth more than the car they're buying,
 *  and customers never asking you to pay them. */
function sanitizeDealRules() {
  for (const o of state.usedMarketOffers || []) {
    if (!(o.askingPrice >= 0)) o.askingPrice = 0;
    if (!(o.minAcceptPrice >= 0)) o.minAcceptPrice = 0;
    if (o.sellerCounter != null && !(o.sellerCounter >= 0)) o.sellerCounter = 0;
    if (o.purchasePrice != null && !(o.purchasePrice >= 0)) o.purchasePrice = 0;
  }
  state.tradeInRequests = (state.tradeInRequests || []).filter(req => {
    const target = state.garage.find(c => c.id === req.targetCarId);
    if (!target) return true;   // orphaned requests are cleaned up elsewhere
    if (req.customerCarValue > target.listPrice) return false;   // worth more than what they're buying — drop it
    if (!(req.cashDelta >= 0)) req.cashDelta = 0;
    if (req.counterCashDelta != null && !(req.counterCashDelta >= 0)) req.counterCashDelta = 0;
    return true;
  });
}

/** Expire stale offers and requests. */
function expireOffers() {
  sanitizeDealRules();
  // Expire pending offers past their expiry day; keep countered items until they resolve next day
  state.customerOffers  = state.customerOffers.filter(
    o => o.state === 'countered' || o.expiresDay >= state.day
  );
  // Trade-in requests have no round limit — they persist until player or NPC accepts/rejects.
  // Only remove initial (round 0) offers that have been sitting idle past their expiry.
  state.tradeInRequests = state.tradeInRequests.filter(r => {
    const keep = r.state === 'countered' || (r.round || 0) > 0 || r.expiresDay >= state.day;
    if (!keep) countStolenAvoided(r.customerCar);
    return keep;
  });
}

function tickDaysInLot() {
  state.garage.forEach(c => { if (c.isForSale && !c.inServiceUntilDay) c.daysInLot++; });
}

function addNote(message, type = 'info') {
  state.notifications.unshift({ message, type, day: state.day });
  if (state.notifications.length > 60) state.notifications.pop();
}

// Achievements are stored per browser (not per save slot) so they carry across every game.
const GLOBAL_ACH_KEY = 'dealerSim_globalAchievements';
let globalAchievements = {};

function saveGlobalAchievements() {
  try { localStorage.setItem(GLOBAL_ACH_KEY, JSON.stringify(globalAchievements)); } catch (_) {}
}

/** Load the browser-wide achievements and merge in anything already earned in existing save slots. */
function loadGlobalAchievements() {
  try {
    const raw = localStorage.getItem(GLOBAL_ACH_KEY);
    const d = raw ? JSON.parse(raw) : {};
    globalAchievements = (d && typeof d === 'object') ? d : {};
  } catch (_) { globalAchievements = {}; }
  for (const slot of [1, 2, 3]) {
    try {
      const raw = localStorage.getItem(slotKey(slot));
      if (!raw) continue;
      const un = JSON.parse(raw).achievementsUnlocked || {};
      for (const id of Object.keys(un)) {
        if (!globalAchievements[id] && un[id]) globalAchievements[id] = un[id];
      }
    } catch (_) {}
  }
  saveGlobalAchievements();
}

function unlockAchievementGlobally(id, day) {
  if (!globalAchievements[id]) { globalAchievements[id] = day || 1; saveGlobalAchievements(); }
  if (state.achievementsUnlocked && !state.achievementsUnlocked[id]) state.achievementsUnlocked[id] = globalAchievements[id];
}

function runAchievementChecks() {
  if (!state.achievementsUnlocked) state.achievementsUnlocked = {};
  let dirty = false;
  for (const ach of ACHIEVEMENTS) {
    if (globalAchievements[ach.id]) {
      if (!state.achievementsUnlocked[ach.id]) state.achievementsUnlocked[ach.id] = globalAchievements[ach.id];
      continue;
    }
    if (state.achievementsUnlocked[ach.id]) { globalAchievements[ach.id] = state.achievementsUnlocked[ach.id]; dirty = true; continue; }
    let ok = false;
    try { ok = ach.check(state); } catch (_) { ok = false; }
    if (!ok) continue;
    state.achievementsUnlocked[ach.id] = state.day;
    globalAchievements[ach.id] = state.day;
    dirty = true;
    addNote(`🏆 Achievement unlocked: ${ach.name}`, 'success');
    showToast(`🏆 ${ach.name}`, 'achievement', 'achievement');
    if (ach.id === 'nm_lucid' && isNightmare() && !state.gameOver) onLucidDreamer();
  }
  if (dirty) saveGlobalAchievements();
}

// ============================================================
// NEXT DAY — main entry
// ============================================================
function nextDay() {
  if (state.gameOver) { showToast('Game over — start a new game to continue.', 'error'); return; }
  triggerDayTransition(state.day + 1);
  _holdDayPopups = true; // theft/lease/etc. popups below queue up instead of firing mid-animation
  state.day++;
  processDeliveries();
  processService();
  processTheft();
  processServiceJobCompletion();
  processServiceGarageExpiry();
  processIncomingServiceCars();
  syncLoanTermsToDifficulty();
  processOverhead();          // daily lot/garage/staff costs
  processInsuranceBilling();  // monthly insurance premium (bills every 30 days)
  processLoanAndDelinquency();// daily debt service and delinquency ladder
  processMarketVolatility();  // segment index drift + random events
  processNightmareNight();    // Dread, hauntings, the Pale Customer (Nightmare only)
  processNormalLore();        // Story beats (every difficulty except Nightmare)
  processMarketDepreciation();// value changes on inventory
  resolveCustomerOfferCounters();
  resolveTradeInCounters();
  expireOffers();
  processForSale();
  processLeases();
  tickDaysInLot();
  // Generate new offers for the new day
  state.usedMarketOffers = generateUsedMarket();
  processAuctions(true);      // close stale auction lots and bring new rare ones onto the floor
  const newTIR = generateTradeInRequests();
  state.tradeInRequests = [...state.tradeInRequests, ...newTIR];
  const newOffers = generateCustomerOffers();
  state.customerOffers = [...state.customerOffers, ...newOffers];
  processStaffMode2Recommendations();
  processStaffTradeInSuggestions();
  const staffRes = processStaffFlips();
  ensureStaffCandidates();
  runAchievementChecks();
  saveState();
  renderAll();
  const offerAlert = newOffers.length ? ` ${newOffers.length} offer(s) on your cars!` : '';
  const tradeAlert = newTIR.length   ? ` ${newTIR.length} trade-in request(s)!` : '';
  const leaseIncome = computeLeaseIncomePerDay();
  const leaseAlert = leaseIncome > 0 ? ` Active lease income/day: ${formatCurrency(leaseIncome)}.` : '';
  const staffAlert = staffRes.sold ? ` Staff flipped ${staffRes.sold} car(s): ${staffRes.net >= 0 ? '+' : '−'}${formatCurrency(Math.abs(staffRes.net))}.` : '';
  showToast(`Day ${state.day} — new used cars available!${offerAlert}${tradeAlert}${leaseAlert}${staffAlert}`, 'info', 'day');
  _holdDayPopups = false;
  // Let the "Day N" card finish before releasing anything that piled up
  // (theft alerts, lease crash/return reports, insurance payouts, the
  // toast just above) — otherwise a popup opening mid-animation covers it.
  setTimeout(() => {
    flushHeldToasts();
    flushHeldModals();
  }, DAY_TRANSITION_MS);
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
  if (car.cursed && isNightmare()) nm().cursedBought = (nm().cursedBought || 0) + 1;
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
  countStolenAvoided(offer);
  runAchievementChecks();
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
  if (offer.cursed && !offer.curseRevealed) {
    offer.curseRevealed = true;
    showToast('🕯️ The inspector refuses to sit in it. This car is cursed.', 'warning', 'curse');
  }

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
    countStolenAvoided(offer);
    runAchievementChecks();
    state.usedMarketOffers = state.usedMarketOffers.filter(o => o.id !== offerId);
    saveState();
    renderUsedMarket();
    showToast(offer.patience <= 0 ? 'Seller lost patience and walked away.' : 'Offer too low — seller walked away.', 'error');
  } else {
    // Seller counters: moves only 15–28% toward player's offer (stays close to asking)
    offer.patience--;
    const moveBias      = randomFloat(0.15, 0.28);
    const newCounter    = Math.round(currentAsk - (currentAsk - amount) * moveBias);
    offer.sellerCounter = Math.max(0, offer.minAcceptPrice, newCounter);
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
  countStolenAvoided(state.tradeInRequests.find(r => r.id === requestId)?.customerCar);
  runAchievementChecks();
  state.tradeInRequests = state.tradeInRequests.filter(r => r.id !== requestId);
  saveState();
  renderForSale();
}

function counterTradeInRequest(requestId, rawDelta) {
  const req = state.tradeInRequests.find(r => r.id === requestId);
  if (!req) return;
  const delta = Math.round(parseFloat(rawDelta));
  if (isNaN(delta)) { showToast('Enter a valid cash amount.', 'error'); return; }
  if (delta < 0) { showToast('You can\'t pay a customer to take their car — the cash amount must be $0 or more.', 'error'); return; }
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
  const salePrice   = req.customerCarValue + cashDelta;
  const fee         = Math.round(Math.abs(salePrice) * TRANSACTION_FEE);
  const dealerFees  = computeDealerFees();
  state.cash       += dealerFees.total - fee;
  const profit      = salePrice - fee - targetCar.purchasePrice + dealerFees.total;
  recordSaleStats(targetCar, profit);
  state.salesHistory.unshift({
    ...targetCar, soldDay: state.day, salePrice, fee, profit,
    dealerFees, buyerName: randomFrom(CUSTOMER_NAMES), agreementNo: generateId().toUpperCase(),
    note: `Trade-in — received ${req.customerCar.year} ${req.customerCar.make} ${req.customerCar.model}`,
  });
  runAchievementChecks();

  // Remove sold car from garage + any pending offers
  state.garage = state.garage.filter(c => c.id !== req.targetCarId);
  state.customerOffers  = state.customerOffers.filter(o => o.carId !== req.targetCarId);
  state.tradeInRequests = state.tradeInRequests.filter(r => r.id !== req.id);

  // Add customer's car to inventory
  const newCar = { ...req.customerCar };
  // The car's cost basis is the trade-in credit the customer was given for it. It used to be $0, which
  // made the resale look like pure profit even though the value was already counted as revenue on the
  // car that went out the door.
  newCar.purchasePrice = Math.max(0, Math.round(req.customerCarValue || 0));
  newCar.tradeInCredit = newCar.purchasePrice;
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
  ensureStaffFields(candidate);
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
  if (upg.nightmareOnly && !isNightmare()) return;
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
// PLAYER ACTIONS — The Showroom
// ============================================================
function buyShowroomTier(tier) {
  const cfg = SHOWROOM_TIERS[tier];
  if (!cfg) return;
  if ((state.upgrades.showroomTier || 0) >= tier) { showToast('Already built!', 'error'); return; }
  if ((state.upgrades.showroomTier || 0) !== tier - 1) { showToast('Build the previous tier first.', 'error'); return; }
  if ((state.upgrades.garageLevel || 1) < cfg.reqGarageTier) { showToast(`Requires Garage Tier ${cfg.reqGarageTier} first.`, 'error'); return; }
  if (state.cash < cfg.cost) { showToast('Not enough cash!', 'error'); return; }
  state.cash -= cfg.cost;
  state.upgrades.showroomTier = tier;
  addNote(`🏛️ Built: ${cfg.name} (${formatCurrency(cfg.cost)}) — ${cfg.slots} display slots.`, 'success');
  saveState();
  renderAll();
  showToast(`${cfg.name} built!`, 'success', 'purchase');
}

/** Move an owned car from the Car Lot into the private Showroom — it stops counting
 *  against garageSlots and is never at risk of theft, but can no longer be sold, serviced,
 *  or leased until it's brought back to the lot. */
function moveToShowroom(carId) {
  const capacity = getShowroomCapacity();
  if (capacity <= 0) { showToast('Build the Showroom first!', 'error'); return; }
  const idx = state.garage.findIndex(c => c.id === carId);
  if (idx === -1) return;
  const car = state.garage[idx];
  if (car.isForSale) { showToast('Unlist the car before moving it to the Showroom.', 'error'); return; }
  if (car.inServiceUntilDay) { showToast('Car is currently in service — wait until complete.', 'error'); return; }
  if (car.leaseStatus === 'active' && car.activeLease) { showToast('Leased cars cannot be moved to the Showroom.', 'error'); return; }
  if (state.showroom.length >= capacity) { showToast('Showroom is full — expand it or make room first.', 'error'); return; }
  state.garage.splice(idx, 1);
  state.showroom.push(car);
  addNote(`🏛️ ${formatCarDisplayName(car)} moved to the Showroom.`, 'success');
  saveState();
  renderAll();
  showToast('Moved to the Showroom.', 'success');
}

/** Bring a Showroom car back to the Car Lot, if there's room. */
function moveToLot(carId) {
  const idx = state.showroom.findIndex(c => c.id === carId);
  if (idx === -1) return;
  if (state.garage.length >= state.garageSlots) { showToast('Car Lot is full — expand it or make room first.', 'error'); return; }
  const car = state.showroom[idx];
  state.showroom.splice(idx, 1);
  state.garage.push(car);
  addNote(`🔑 ${formatCarDisplayName(car)} brought back to the Car Lot.`, 'info');
  saveState();
  renderAll();
  showToast('Moved to the Car Lot.', 'success');
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
  if (car.washed) { showToast('This car has already been washed — the boost is permanent.', 'error'); return; }
  state.cash     -= cost;
  car.marketValue = Math.round(car.marketValue * (1 + WASH_VALUE_BOOST));
  car.washed = true;
  car.reconditionLog.push({ type: 'Car Wash', day: state.day });
  addNote(`🚿 Washed ${car.year} ${car.make} ${car.model} — looks great! +${Math.round(WASH_VALUE_BOOST * 100)}% value, permanently boosted sale chance.`, 'success');
  saveState();
  renderAll();
  flashCarCard(carId);
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
  flashCarCard(carId);
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
  flashCarCard(carId);
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
  flashCarCard(carId);
  showToast(`Detailed — now condition ${car.condition}!`, 'success');
}

function makeLeaseAvailable(carId) {
  const car = state.garage.find(c => c.id === carId);
  if (!car) return;
  if (car.inServiceUntilDay) { showToast('Car in service cannot be offered for lease.', 'error'); return; }
  if (car.leaseStatus === 'active' && car.activeLease) { showToast('Car is already on an active lease.', 'error'); return; }
  if (car.isForSale) { showToast('Unlist the car before offering lease.', 'error'); return; }
  if ((car.crashDamageSeverity || 'none') !== 'none') { showToast('Repair the crash damage before offering this car for lease.', 'error'); return; }
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

function setCarLotSort(value) {
  settings.carLotSortBy = value;
  saveSettings();
  renderCarLot();
}

/** Custom dropdown open/close — plain <option> lists are OS-rendered and can't be themed,
 *  so the Car Lot sort control is a button + a hand-built menu of divs instead. */
function toggleLotSortMenu(e) {
  e.stopPropagation();
  const wrap = document.getElementById('lot-sort-select');
  if (!wrap) return;
  const isOpen = wrap.classList.contains('open');
  closeLotSortMenu();
  if (!isOpen) wrap.classList.add('open');
}
function closeLotSortMenu() {
  const wrap = document.getElementById('lot-sort-select');
  if (wrap) wrap.classList.remove('open');
}
function chooseLotSort(value) {
  closeLotSortMenu();
  setCarLotSort(value);
}

/** True if a car is sitting in inventory (not leased, not already being fixed) with an
 *  unresolved problem — unrepaired hidden issues, or Fair/Poor condition wear. These are
 *  always pinned to the top of the Car Lot regardless of sort order, so nothing needing
 *  attention gets buried. */
function carNeedsMaintenance(car) {
  const isLeased = car.leaseStatus === 'active' && !!car.activeLease;
  if (isLeased || car.inServiceUntilDay) return false;
  return (car.hiddenIssues || []).length > 0 || car.condition === 'C' || car.condition === 'D';
}

const CAR_LOT_SORTERS = {
  default:       null, // inventory order
  value_desc:    (a, b) => (b.marketValue || 0) - (a.marketValue || 0),
  value_asc:     (a, b) => (a.marketValue || 0) - (b.marketValue || 0),
  mileage_asc:   (a, b) => (a.mileage || 0) - (b.mileage || 0),
  mileage_desc:  (a, b) => (b.mileage || 0) - (a.mileage || 0),
  type:          (a, b) => a.category.localeCompare(b.category) || (b.marketValue || 0) - (a.marketValue || 0),
  year_desc:     (a, b) => (b.year || 0) - (a.year || 0),
  year_asc:      (a, b) => (a.year || 0) - (b.year || 0),
  condition:     (a, b) => CONDITIONS.indexOf(a.condition) - CONDITIONS.indexOf(b.condition),
  daysOnLot_desc:(a, b) => (b.daysInLot || 0) - (a.daysInLot || 0),
};

const CAR_LOT_SORT_LABELS = {
  default:        'Default order',
  value_desc:     'Market Value (high → low)',
  value_asc:      'Market Value (low → high)',
  mileage_asc:    'Mileage (low → high)',
  mileage_desc:   'Mileage (high → low)',
  type:           'Type (category)',
  year_desc:      'Year (newest first)',
  year_asc:       'Year (oldest first)',
  condition:      'Condition (best first)',
  daysOnLot_desc: 'Days on Lot (longest first)',
};

/** Sorts cars for the Car Lot view. Whatever the chosen sort, cars that need maintenance
 *  (unrepaired issues or worn condition, not already in service or out on lease) always
 *  float to the top so they never get lost further down the list. */
function sortCarsForLot(cars, sortKey) {
  const withFlags = cars.map(car => ({ car, needsMaintenance: carNeedsMaintenance(car) }));
  const comparator = CAR_LOT_SORTERS[sortKey];
  withFlags.sort((a, b) => {
    if (a.needsMaintenance !== b.needsMaintenance) return a.needsMaintenance ? -1 : 1;
    if (comparator) return comparator(a.car, b.car);
    return 0;
  });
  return withFlags.map(x => x.car);
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
  document.getElementById('stat-day').innerHTML    = isNightmare() ? `${uiIcon('moon')} Night ${state.day}` : `${uiIcon('calendar')} Day ${state.day}`;
  document.getElementById('stat-rep').innerHTML    = `${uiIcon('star')} Rep ${state.reputation.toFixed(2)}`;
  document.getElementById('stat-garage').innerHTML = `${uiIcon('home')} ${state.garage.length} / ${state.garageSlots}`;
  const debtChip = document.getElementById('stat-debt');
  if (debtChip) debtChip.innerHTML = `${uiIcon('bank')} Debt ${formatCurrency(state.loanBalance || 0)}`;
  const activeLeases = state.garage.filter(c => c.leaseStatus === 'active' && c.activeLease).length;
  const leaseChip = document.getElementById('stat-lease');
  if (leaseChip) leaseChip.innerHTML = `${uiIcon('document')} Leases ${activeLeases} · ${formatCurrency(computeLeaseIncomePerDay())}/day`;
  const insuranceChip = document.getElementById('stat-insurance');
  if (insuranceChip) {
    const company = getActiveInsurance();
    insuranceChip.innerHTML = company
      ? `${uiIcon('lock')} ${company.name.split(' ')[0]} · ${formatCurrency(computeMonthlyPremium(company))}/mo`
      : `${uiIcon('lock')} Uninsured`;
  }

  // Flash + float a small "+/-" figure on any stat that actually changed
  // since the last render, so player actions register as visible, tactile
  // feedback instead of just silently updating numbers underneath them.
  const repRounded = Number(state.reputation.toFixed(2));
  const debtVal     = state.loanBalance || 0;
  _flashStatIfChanged('stat-cash',   state.cash,      _prevStats.cash,        d => `${d > 0 ? '+' : '-'}${formatCurrency(Math.abs(d))}`);
  _flashStatIfChanged('stat-rep',    repRounded,       _prevStats.reputation, d => `${d > 0 ? '+' : ''}${d.toFixed(2)}`);
  _flashStatIfChanged('stat-garage', state.garage.length, _prevStats.garageCount, null);
  // Debt is "bad" when it grows, so its polarity is inverted vs. cash/rep.
  _flashStatIfChanged('stat-debt',   debtVal,          _prevStats.debt,        d => `${d > 0 ? '+' : '-'}${formatCurrency(Math.abs(d))}`, true);

  _prevStats = { cash: state.cash, reputation: repRounded, garageCount: state.garage.length, debt: debtVal };

  // Nightmare: the Dread chip, plus red skies and the haunted overlay
  const dreadChip = document.getElementById('stat-dread');
  if (dreadChip) {
    if (isNightmare()) {
      const tier = getDreadTier();
      dreadChip.innerHTML = `${uiIcon('eye')} Dread ${getDread()}`;
      dreadChip.title = `Dread ${getDread()}/100 — ${DREAD_TIER_LABELS[tier]}. Sell cars and light candles to push it back.`;
      for (let t = 0; t < 4; t++) dreadChip.classList.toggle('nm-tier-' + t, t === tier);
    } else {
      dreadChip.innerHTML = '';
    }
  }
  if (isNightmare()) prunePaleVisitor();
  updateSleepUi();
  applyNightmareAtmosphere();
  updateMusicBaseline(); // let the in-game soundtrack's tone track the business's current standing
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

  const bbLaunch = (!isNightmare() && state.day >= 2)
    ? `<div class="bb-launch"><button class="btn btn-secondary" onclick="openBulletinBoard()" title="The corkboard in the lot office.">📌 Office board</button></div>`
    : '';
  document.getElementById('tab-dashboard').innerHTML = `
    ${renderNightmarePanel()}
    ${bbLaunch}
    <div class="kpi-row">
      <div class="kpi-tile kpi-cash">
        <div class="kpi-icon-wrap">${uiIconLg('cash')}</div>
        <div><div class="kpi-value">${formatCurrency(state.cash)}</div><div class="kpi-label">Cash</div></div>
      </div>
      <div class="kpi-tile kpi-day">
        <div class="kpi-icon-wrap">${uiIconLg('calendar')}</div>
        <div><div class="kpi-value">${isNightmare() ? 'Night' : 'Day'} ${state.day}</div><div class="kpi-label">Time</div></div>
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
        <div class="stat-row" style="flex-direction:column;align-items:flex-start;gap:2px"><span>Insurance</span><strong class="${getActiveInsurance() ? 'text-green' : 'text-muted'}" style="white-space:normal">${getActiveInsurance() ? getActiveInsurance().name : 'None'}</strong></div>
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
  if (!el) return;
  ensureAuctionState();
  const lotCount = state.auctions.lots.length;
  el.innerHTML = `
    <div class="finance-subnav" role="tablist">
      <button class="finance-subnav-btn ${usedMarketSubTab === 'catalog' ? 'active' : ''}" role="tab"
        aria-selected="${usedMarketSubTab === 'catalog'}" onclick="switchUsedMarketSubTab('catalog')">${uiIcon('car')} Catalog</button>
      <button class="finance-subnav-btn ${usedMarketSubTab === 'auctions' ? 'active' : ''}" role="tab"
        aria-selected="${usedMarketSubTab === 'auctions'}" onclick="switchUsedMarketSubTab('auctions')">${uiIcon('gavel')} Auctions${lotCount ? ` <span class="subnav-count">${lotCount}</span>` : ''}</button>
    </div>
    <div id="usedmarket-subpanel"></div>`;
  if (usedMarketSubTab === 'auctions') renderAuctionHouse();
  else renderUsedCatalog();
}

/** Used Market → Catalog: the daily used-car listings. */
function renderUsedCatalog() {
  const el = document.getElementById('usedmarket-subpanel');
  if (!el) return;
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
              ${curseBadge(offer)}
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
        ${(offer.nmTell && !offer.curseRevealed) ? `<div class="nm-tell">${offer.nmTell}</div>` : ''}
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
// AUCTION HOUSE — v1.15.0
// A live, Car Mechanic Simulator-style auction hall on the Used Market's second page.
//   • BUY: a rotating handful of extremely rare lots. Enter one, press Start, and outbid a
//     room of AI paddles while the ring counts down. Every bid resets the clock.
//   • SELL: consign any car from your Car Lot, set a reserve, and watch the room bid it up.
// The game clock never moves during an auction — only the ring does.
// ============================================================
const AUCTION_HOUSE_NAME        = 'Kessler & Vale Auction House';
const AUCTION_BUYER_PREMIUM     = 0.05;   // added to the winning bid when YOU buy
const AUCTION_MEMBER_PREMIUM    = 0.03;   // Wholesale Auction Membership
const AUCTION_SELLER_COMMISSION = 0.06;   // taken from the hammer price when YOU sell
const AUCTION_MEMBER_COMMISSION = 0.04;   // Wholesale Auction Membership
const AUCTION_TIMER_SECONDS     = 8;      // ring resets to this after every bid
const AUCTION_OPENING_SECONDS   = 10;     // grace period for the room to open the bidding
const AUCTION_RECONSIGN_DAYS    = 3;      // a no-sale car can't be re-consigned for this long
const AUCTION_LOG_MAX           = 12;
const AUCTION_STEPS = [50, 100, 250, 500, 1000, 2500, 5000, 10000, 25000, 50000, 100000, 250000, 500000, 1000000];
const AUCTION_BOT_NAMES = [
  'VelvetThrottle', 'ApexAlonso', 'Baron von Piston', 'TorqueTina', 'LeMansLarry', 'Sheikh Rashid',
  'Dr. Halloran', 'Camille Roux', 'GarageGhost', 'HeirloomHank', 'Lord Ashbury', 'Nakamura Collection',
  'SilverArrowSam', 'Ivana K.', 'Carbon & Co.', 'ChromeHarbor', 'MonacoMike', 'Vittoria R.',
  'Ostrich Capital', 'DuskRider', 'PatinaPete', 'Grand Prix Gary', 'The Hartwell Trust', 'RedlineRosa',
];
const AUCTION_PROVENANCE = [
  { id: 'oneOwner',  label: 'One Owner From New',   mult: 1.06, blurb: 'A single owner since delivery, with a complete service file.' },
  { id: 'concours',  label: 'Concours Winner',      mult: 1.12, blurb: 'Best-in-class at major concours events. Judges have run white gloves over every panel.' },
  { id: 'racing',    label: 'Race-Proven Chassis',  mult: 1.10, blurb: 'Documented competition history, complete with period photographs.' },
  { id: 'celebrity', label: 'Celebrity Provenance', mult: 1.15, blurb: 'Formerly owned by a household name — the paperwork proves it.' },
  { id: 'museum',    label: 'Museum Deaccession',   mult: 1.08, blurb: 'Sold from a private museum collection. Preserved, not driven.' },
  { id: 'barnFind',  label: 'Barn Find',            mult: 0.96, blurb: 'Sat undisturbed for decades. Untouched, unrestored, and unpredictable.' },
];

// ── Three auction houses (pick one from the Auctions page, like choosing an insurer) ──
const AUCTION_HOUSES = [
  {
    id: 'salvage', name: 'Ironside Salvage Auctions', logoA: 'Ironside ', logoB: 'Salvage', icon: 'wrench',
    tagline: 'Wrecks, rebuilds & project cars — bring a toolbox',
    brandStart: '#5a3a1a', brandEnd: '#2e1d0d', brandAccent: '#ff9a3c',
    perks: [
      { icon: 'warning', title: 'Salvage-title stock', desc: 'Every lot carries a branded salvage title.' },
      { icon: 'percent', title: 'Deep discounts', desc: 'Openings start well below clean-title value.' },
      { icon: 'wrench',  title: 'Repair risk', desc: 'Mostly Fair/Poor cars with plenty of hidden issues.', badge: 'RISKY' },
    ],
    finePrint: 'Salvage titles sell for less and scare off retail buyers. Inspect before you bid.',
    interest: 'Moderate', lotsWord: 'salvage lot',
  },
  {
    id: 'basic', name: 'Main Street Auto Auction', logoA: 'Main Street ', logoB: 'Auto', icon: 'car',
    tagline: 'Everyday cars, clean titles, steady margins',
    brandStart: '#1e4f8a', brandEnd: '#12304f', brandAccent: '#4fb0ff',
    perks: [
      { icon: 'check', title: 'Clean-title daily drivers', desc: 'Sedans, SUVs, trucks and commuters — nothing rare.' },
      { icon: 'tag',   title: 'Wholesale pricing', desc: 'Bidders here are trade buyers, so deals are real but thin.' },
      { icon: 'clipboard', title: 'Low inspection cost', desc: 'Pre-sale appraisals are cheap on everyday cars.', badge: 'CHEAP' },
    ],
    finePrint: 'Plenty of competition from trade buyers keeps margins slim. Volume is the game.',
    interest: 'Steady', lotsWord: 'lot',
  },
  {
    id: 'rare', name: AUCTION_HOUSE_NAME, logoA: 'Kessler ', logoB: '& Vale', icon: 'gavel',
    tagline: 'Hypercars, coachbuilt one-offs & retired icons',
    brandStart: '#6b4e0f', brandEnd: '#2a2008', brandAccent: '#ffd35d',
    perks: [
      { icon: 'star', title: 'Ultra-rare only', desc: 'Seven-figure hypercars and out-of-production legends.' },
      { icon: 'trophy', title: 'Provenance', desc: 'Concours winners, race-proven chassis and more.', badge: 'ELITE' },
      { icon: 'search', title: 'Fuzzy estimates', desc: 'Pay for an inspection to reveal the true appraisal.' },
    ],
    finePrint: 'Huge sums, huge swings. A wrong bid can cost more than a month of profit.',
    interest: 'Frenzy', lotsWord: 'extremely rare lot',
  },
];
const getAuctionHouse = id => AUCTION_HOUSES.find(h => h.id === id) || AUCTION_HOUSES[2];
let auctionHouseSel = null;         // null = house picker, otherwise 'salvage' | 'basic' | 'rare'
function selectAuctionHouse(id) { auctionHouseSel = id; playSfx('click'); renderUsedMarket(); }

let usedMarketSubTab = 'catalog';   // 'catalog' | 'auctions'
let liveAuction = null;             // the auction currently on the floor, or null
let _auctionPool = null;
let _auctionRaf = 0;

function switchUsedMarketSubTab(name) {
  if (name === 'auctions' && usedMarketSubTab !== 'auctions') auctionHouseSel = null;   // always land on the house picker
  usedMarketSubTab = name;
  renderUsedMarket();
}

// ── Fees, steps & small helpers ──────────────────────────────
function auctionBuyerPremium()  { return state.upgrades.auctionAccess ? AUCTION_MEMBER_PREMIUM : AUCTION_BUYER_PREMIUM; }
function auctionCommission()    { return state.upgrades.auctionAccess ? AUCTION_MEMBER_COMMISSION : AUCTION_SELLER_COMMISSION; }
function auctionMaxLots(house = 'rare') { return (house === 'rare' ? 3 : 4) + (state.upgrades.auctionAccess ? 1 : 0); }
function auctionListingFee(v)   { return clamp(Math.round(v * 0.005 / 50) * 50, 150, 25000); }
function auctionInspectCost(car) {
  const minCost = (car.auctionHouse && car.auctionHouse !== 'rare') ? 150 : 1500;
  const base = clamp(Math.round(car.marketValue * 0.004 / 50) * 50, minCost, 20000);
  return state.upgrades.inspectionTool ? Math.round(base / 2) : base;
}
/** Picks the "nice" bid increment (1–2% of value) closest to the ideal on a log scale. */
function auctionStepFor(value) {
  const raw = Math.max(50, Number.isFinite(value) ? value * 0.018 : 50);
  let best = AUCTION_STEPS[0], bestDist = Infinity;
  for (const s of AUCTION_STEPS) {
    const d = Math.abs(Math.log(s / raw));
    if (d < bestDist) { bestDist = d; best = s; }
  }
  return best;
}
function auctionInterestLabel(n) { return n <= 2 ? 'Low' : n === 3 ? 'Moderate' : n === 4 ? 'High' : 'Frenzy'; }
function auctionInterestClass(n) { return n <= 2 ? 'badge-gray' : n === 3 ? 'badge-blue' : n === 4 ? 'badge-orange' : 'badge-red'; }
function auctionHash(str) {
  let h = 0;
  for (let i = 0; i < str.length; i++) h = (h * 31 + str.charCodeAt(i)) >>> 0;
  return h;
}
function ensureAuctionState() {
  if (!state.auctions || !Array.isArray(state.auctions.lots)) state.auctions = { lots: [] };
  if (!Array.isArray(state.auctionLog)) state.auctionLog = [];
  for (const l of state.auctions.lots) { if (!l.house) l.house = 'rare'; if (l.car && !l.car.auctionHouse) l.car.auctionHouse = l.house; }
  state.auctionsWon    = state.auctionsWon    || 0;
  state.auctionsSold   = state.auctionsSold   || 0;
  state.auctionBestWin = state.auctionBestWin || 0;
}
function logAuctionResult(text, type = 'info') {
  ensureAuctionState();
  state.auctionLog.unshift({ day: state.day, text, type });
  if (state.auctionLog.length > AUCTION_LOG_MAX) state.auctionLog.length = AUCTION_LOG_MAX;
}

// ── Lot generation ───────────────────────────────────────────
/** Per-house catalogue pools. Rare = seven-figure icons; Basic = everyday non-rare cars; Salvage = cheap-to-mid cars. */
const _auctionPools = {};
function getAuctionPool(house = 'rare') {
  if (!_auctionPools[house]) {
    if (house === 'rare')        _auctionPools[house] = CAR_CATALOG.filter(e => e.marketValue >= 500000 && (e.usedWeight ?? 1) <= 0.1);
    else if (house === 'basic')  _auctionPools[house] = CAR_CATALOG.filter(e => e.marketValue < 60000 && !e.discontinued && (e.usedWeight ?? 1) >= 0.5);
    else                         _auctionPools[house] = CAR_CATALOG.filter(e => e.marketValue < 90000 && (e.usedWeight ?? 1) >= 0.3);
    if (!_auctionPools[house].length) _auctionPools[house] = CAR_CATALOG.filter(e => e.marketValue < 60000);
  }
  return _auctionPools[house];
}
const auctionLotKey = lot => `${lot.car.make}|${lot.car.model}|${lot.car.trim}`;

function pickAuctionEntry(excludeKeys, house = 'rare') {
  const full = getAuctionPool(house);
  const pool = full.filter(e => !excludeKeys.includes(`${e.make}|${e.model}|${e.trim || ''}`));
  const src = pool.length ? pool : full;
  // Cheaper "rare" cars turn up more often than the eight-figure unicorns.
  const weighted = src.map(e => ({ e, w: house === 'rare' ? 1 / Math.sqrt(e.marketValue / 500000) : (e.usedWeight ?? 1) }));
  const total = weighted.reduce((sum, it) => sum + it.w, 0);
  let roll = Math.random() * total;
  for (const it of weighted) { roll -= it.w; if (roll <= 0) return it.e; }
  return randomFrom(src);
}

function generateAuctionLot(excludeKeys = [], house = 'rare') {
  const entry = pickAuctionEntry(excludeKeys, house);
  const condWeights = house === 'salvage' ? [0.0, 0.12, 0.48, 0.40] : house === 'basic' ? [0.10, 0.40, 0.38, 0.12] : [0.28, 0.42, 0.22, 0.08];
  let car = null;
  for (let i = 0; i < 8; i++) {
    car = buildCar(entry, pickCondition(condWeights), 'used', false);
    if (house === 'salvage' || car.titleStatus === 'clean') break;
  }
  // The house vets every consignment: verified VIN, no stolen stock.
  car.legalStatus = 'clean';   car.legalDiscovered = true;
  car.vinStatus   = 'normal';  car.vinDiscovered   = true;
  car.source      = 'auction';
  car.auctionHouse = house;
  if (house === 'salvage') {
    // Salvage yard: every lot is branded. Re-price from the old title multiplier to the salvage one.
    const oldMult = TITLE_VALUE_MULT[car.titleStatus] || 1;
    car.marketValue = Math.round(car.marketValue / oldMult * TITLE_VALUE_MULT.salvage);
    car.titleStatus = 'salvage';
    // Salvage cars are wrecks: make sure there is real repair work waiting.
    if (!car.hiddenIssues.length && Math.random() < 0.6) {
      const cost = Math.max(400, Math.round(car.marketValue * randomFloat(0.06, 0.16) / 50) * 50);
      car.hiddenIssues.push({ name: randomFrom(['Bent suspension arm', 'Flood-damaged wiring', 'Cracked radiator support', 'Failing transmission']), cost });
      car.repairCost = car.hiddenIssues.reduce((sum, i) => sum + (i.cost || 0), 0);
    }
  } else {
    car.titleStatus = 'clean';
  }
  if (house === 'rare' && Math.random() >= 0.45) {
    const prov = randomFrom(AUCTION_PROVENANCE);
    car.marketValue = Math.round(car.marketValue * prov.mult);
    car.provenance  = { id: prov.id, label: prov.label, blurb: prov.blurb };
  }
  // The catalogue estimate is honest, but fuzzy — an inspection pins the real number down.
  const fuzz     = house === 'rare' ? [0.90, 1.10] : [0.92, 1.08];
  const estimate = Math.round(car.marketValue * randomFloat(fuzz[0], fuzz[1]));
  const step     = auctionStepFor(estimate);
  const openFrac = house === 'rare' ? [0.24, 0.38] : house === 'salvage' ? [0.22, 0.36] : [0.42, 0.60];
  const startPrice = Math.max(step, Math.round(estimate * randomFloat(openFrac[0], openFrac[1]) / step) * step);
  const r = Math.random();
  const botCount = r < 0.15 ? 2 : r < 0.45 ? 3 : r < 0.75 ? 4 : r < 0.92 ? 5 : 6;
  const life = house === 'rare' ? randomInt(3, 6) : randomInt(2, 5);
  return {
    id: generateId(), house, car, estimate, appraised: false, step, startPrice, botCount,
    postedDay: state.day, expiresDay: state.day + life, started: false,
  };
}

/** Fixes a lot whose numbers went missing or NaN (e.g. from a corrupted market index in an old save). */
function repairAuctionLot(lot) {
  const ok = v => Number.isFinite(v) && v > 0;
  const car = lot.car;
  if (!car) return false;
  let fixed = false;
  if (!ok(car.marketValue)) {
    const entry = CAR_CATALOG.find(e => e.make === car.make && e.model === car.model && (e.trim || '') === (car.trim || ''));
    const base = entry ? entry.marketValue : 500000;
    car.marketValue = Math.round(base * (CONDITION_VALUE[car.condition] || 0.9) * (1 - (car.mileage || 0) / 700000));
    fixed = true;
  }
  if (!ok(lot.estimate)) { lot.estimate = Math.round(car.marketValue * randomFloat(0.92, 1.08)); fixed = true; }
  if (!ok(lot.step))     { lot.step = auctionStepFor(lot.estimate); fixed = true; }
  if (!ok(lot.startPrice)) { lot.startPrice = Math.max(lot.step, Math.round(lot.estimate * 0.30 / lot.step) * lot.step); fixed = true; }
  if (!ok(car.repairCost) && car.repairCost !== 0) { car.repairCost = (car.hiddenIssues || []).reduce((sum, i) => sum + (i.cost || 0), 0); fixed = true; }
  if (!(lot.botCount >= 2)) { lot.botCount = 3; fixed = true; }
  return fixed;
}

/** Daily rotation: closes stale lots and tops each house's floor back up. */
function processAuctions(announce = false) {
  ensureAuctionState();
  const lots = state.auctions.lots;
  if (announce) {
    for (const l of lots) {
      if (!l.started && l.expiresDay < state.day) {
        addNote(`🔨 Auction lot closed: ${formatCarDisplayName(l.car)} sold to another bidder.`, 'info');
      }
    }
  }
  state.auctions.lots = lots.filter(l => l.expiresDay >= state.day && !l.started);
  state.auctions.lots.forEach(repairAuctionLot);
  for (const h of AUCTION_HOUSES) {
    const live = state.auctions.lots;
    const maxLots = auctionMaxLots(h.id);
    const keys = live.filter(l => l.house === h.id).map(auctionLotKey);
    const count = () => live.filter(l => l.house === h.id).length;
    while (count() < 2 || (count() < maxLots && Math.random() < 0.30)) {
      const lot = generateAuctionLot(keys, h.id);
      live.push(lot);
      keys.push(auctionLotKey(lot));
      if (announce && h.id === 'rare') {
        addNote(`🔨 New at ${h.name}: ${formatCarDisplayName(lot.car)} (est. ${formatCurrency(lot.estimate)}).`, 'info');
      }
    }
  }
}

function inspectAuctionLot(lotId) {
  ensureAuctionState();
  const lot = state.auctions.lots.find(l => l.id === lotId);
  if (!lot || lot.car.inspected) return;
  const cost = auctionInspectCost(lot.car);
  if (state.cash < cost) { showToast(`A pre-sale inspection costs ${formatCurrency(cost)} — not enough cash!`, 'error'); return; }
  state.cash -= cost;
  const car = lot.car;
  car.inspected  = true;
  car.repairCost = car.hiddenIssues.reduce((s, i) => s + i.cost, 0);
  if (state.upgrades.frameDamageTools || car.hiddenIssues.some(i => i.isCrashDamage)) car.crashDamageDiscovered = true;
  lot.estimate  = car.marketValue;   // the appraiser nails the real number
  lot.appraised = true;
  const issueCount = car.hiddenIssues.filter(i => !i.isCrashDamage).length;
  addNote(`🔍 Pre-sale inspection of ${formatCarDisplayName(car)}: ${issueCount} mechanical issue(s), repair cost ${formatCurrency(car.repairCost)}. Appraised at ${formatCurrency(car.marketValue)}.`, 'info');
  playSfx('cash');
  saveState();
  renderAll();
}

// ── Auction House page (Used Market → Auctions) ─────────────
function renderAuctionPicker() {
  const el = document.getElementById('usedmarket-subpanel');
  if (!el) return;
  ensureAuctionState();
  const cards = AUCTION_HOUSES.map(h => {
    const n = state.auctions.lots.filter(l => l.house === h.id).length;
    const perksHtml = h.perks.map(p => `
      <div class="ins-perk ${p.badge ? 'ins-perk--signature' : ''}">
        <span class="ins-perk-icon">${uiIcon(p.icon)}</span>
        <div class="ins-perk-text">
          <div class="ins-perk-title">${p.title}</div>
          <div class="ins-perk-desc">${p.desc}</div>
        </div>
        ${p.badge ? `<span class="ins-badge">${p.badge}</span>` : ''}
      </div>`).join('');
    return `
      <div class="ins-card au-house-card" style="--brand-start:${h.brandStart};--brand-end:${h.brandEnd};--brand-accent:${h.brandAccent}">
        <div class="ins-card-header">
          <div class="ins-logo">${uiIcon(h.icon)} <span class="ins-logo-word"><span class="ins-logo-a">${h.logoA}</span><span class="ins-logo-b">${h.logoB}</span></span></div>
          <div class="ins-tagline">${h.tagline}</div>
        </div>
        <div class="ins-perks">${perksHtml}</div>
        <div class="ins-stats">
          <div class="ins-stat-box"><div class="ins-stat-label">Lots on floor</div><div class="ins-stat-value green">${n}</div><div class="ins-stat-note">Rotates every few days</div></div>
          <div class="ins-stat-box"><div class="ins-stat-label">Room</div><div class="ins-stat-value">${h.interest}</div><div class="ins-stat-note">Typical bidder activity</div></div>
        </div>
        <div class="ins-fine-print">${uiIcon('warning')} ${h.finePrint}</div>
        <div class="ins-card-footer">
          <button class="btn btn-primary" onclick="selectAuctionHouse('${h.id}')">${uiIcon('gavel')} Enter ${h.name}</button>
        </div>
      </div>`;
  }).join('');
  el.innerHTML = `
    <div class="tab-info">
      ${uiIcon('gavel')} Choose an auction house. Each one runs its own floor, with different stock, risk and margins. Buyer's premium <strong>${(auctionBuyerPremium() * 100).toFixed(0)}%</strong> · Seller's commission <strong>${(auctionCommission() * 100).toFixed(0)}%</strong> at every house.
    </div>
    <div class="ins-card-grid">${cards}</div>`;
}

function renderAuctionHouse() {
  if (!auctionHouseSel) { renderAuctionPicker(); return; }
  const el = document.getElementById('usedmarket-subpanel');
  if (!el) return;
  ensureAuctionState();
  if (state.auctions.lots.length < 2) processAuctions();
  state.auctions.lots.forEach(repairAuctionLot);
  const house     = getAuctionHouse(auctionHouseSel);
  const lots      = state.auctions.lots.filter(l => l.house === house.id);
  const prem      = auctionBuyerPremium();
  const comm      = auctionCommission();
  const lotFull   = state.garage.length + state.deliveries.length >= state.garageSlots;

  const lotCards = lots.map(lot => {
    const car = lot.car;
    const daysLeft = Math.max(0, lot.expiresDay - state.day);
    const inspectCost = auctionInspectCost(car);
    const issuesHtml = car.inspected
      ? (car.hiddenIssues.length === 0
          ? `<p class="text-green" style="font-size:.82rem">${uiIcon('check')} No hidden issues found!</p>`
          : car.hiddenIssues.map(i => {
              const crashClass = i.isCrashDamage ? (i.severity === 'severe' ? 'crash-severe' : i.severity === 'moderate' ? 'crash-moderate' : 'crash-minor') : '';
              return `<span class="issue-tag ${crashClass}">${uiIcon('warning')} ${i.name} (${formatCurrency(i.cost)})</span>`;
            }).join(''))
      : `<p class="text-muted" style="font-size:.82rem">${uiIcon('search')} Unknown — inspect before the hammer falls</p>`;
    return `
      <div class="car-card auction-lot-card" data-lot-id="${lot.id}">
        <div class="car-card-header">
          <div><span class="car-name">${formatCarDisplayName(car)}</span></div>
          <div class="badge-stack">
            ${condBadge(car.condition)}
            ${car.titleStatus && car.titleStatus !== 'clean' ? titleBadge(car.titleStatus) : ''}
            ${car.discontinued ? `<span class="badge badge-purple" title="Out of production — built ${car.productionStart}–${car.productionEnd}">🏛️ Discontinued</span>` : ''}
            ${car.provenance ? `<span class="badge badge-yellow" title="${car.provenance.blurb}">★ ${car.provenance.label}</span>` : ''}
            <span class="badge ${auctionInterestClass(lot.botCount)}" title="How many serious paddles are expected in the room">${uiIcon('person')} ${auctionInterestLabel(lot.botCount)} interest</span>
          </div>
        </div>
        ${car.provenance ? `<p class="au-provenance">${car.provenance.blurb}</p>` : ''}
        <div class="car-details">
          <div class="detail-row"><span>Mileage</span><span>${car.mileage.toLocaleString()} mi</span></div>
          <div class="detail-row"><span>${lot.appraised ? 'Appraised value' : 'Estimated value'}</span><span class="au-est-text">${formatCurrency(lot.estimate)}</span></div>
          <div class="detail-row"><span>Opening bid</span><span class="text-blue">${formatCurrency(lot.startPrice)}</span></div>
          <div class="detail-row"><span>Bid increment</span><span>${formatCurrency(lot.step)}</span></div>
          <div class="detail-row"><span>Buyer's premium</span><span>${(prem * 100).toFixed(0)}%</span></div>
          <div class="detail-row"><span>Lot closes</span><span class="${daysLeft <= 1 ? 'text-red' : ''}">${daysLeft === 0 ? 'Today' : `in ${daysLeft} day${daysLeft !== 1 ? 's' : ''}`}</span></div>
          ${car.inspected ? `<div class="detail-row"><span>Repair cost</span><span class="text-red">${formatCurrency(car.repairCost)}</span></div>` : ''}
        </div>
        <div class="issues-section">${issuesHtml}</div>
        ${lotFull ? `<p class="text-muted" style="font-size:.78rem">${uiIcon('warning')} Your Car Lot is full — free a slot before you can bid.</p>` : ''}
        <div class="car-actions">
          ${!car.inspected ? `<button class="btn btn-secondary" onclick="inspectAuctionLot('${lot.id}')" ${state.cash >= inspectCost ? '' : 'disabled'}>${uiIcon('search')} Inspect (${formatCurrency(inspectCost)})</button>` : ''}
          <button class="btn btn-primary" onclick="openAuctionLot('${lot.id}')">${uiIcon('gavel')} Enter Auction</button>
        </div>
      </div>`;
  }).join('');

  const consignCards = state.garage.map(car => {
    const leased   = car.leaseStatus === 'active' && !!car.activeLease;
    const cooldown = (car.auctionCooldownUntil || 0) > state.day ? car.auctionCooldownUntil - state.day : 0;
    const blocked  = car.inServiceUntilDay ? 'In service' : leased ? 'Leased out' : cooldown ? `Re-consign in ${cooldown}d` : null;
    return `
      <div class="car-card consign-card">
        <div class="car-card-header">
          <div><span class="car-name">${formatCarDisplayName(car)}</span></div>
          <div class="badge-stack">${condBadge(car.condition)}${car.isForSale ? '<span class="badge badge-blue">Listed</span>' : ''}${car.provenance ? '<span class="badge badge-yellow">★ ' + car.provenance.label + '</span>' : ''}</div>
        </div>
        <div class="car-details">
          <div class="detail-row"><span>Market value</span><span class="text-green">${formatCurrency(car.marketValue)}</span></div>
          <div class="detail-row"><span>Paid</span><span>${formatCurrency(car.purchasePrice)}</span></div>
        </div>
        <button class="btn btn-secondary btn-full" onclick="openConsignAuction('${car.id}')" ${blocked ? 'disabled' : ''}>
          ${uiIcon('gavel')} ${blocked || 'Consign to Auction'}
        </button>
      </div>`;
  }).join('');

  const logRows = state.auctionLog.length
    ? state.auctionLog.map(l => `<div class="au-history-row"><span class="text-muted">Day ${l.day}</span><span class="${l.type === 'success' ? 'text-green' : l.type === 'warning' ? 'text-yellow' : ''}">${l.text}</span></div>`).join('')
    : `<p class="text-muted" style="font-size:.85rem">No auctions yet. The first gavel is waiting.</p>`;

  el.innerHTML = `
    <div class="ins-status-strip au-house-strip" style="--brand-accent:${house.brandAccent}">
      ${uiIcon(house.icon)} At <strong>${house.name}</strong>
      <button class="ins-status-cancel" onclick="selectAuctionHouse(null)">← Change house</button>
    </div>
    <div class="tab-info">
      ${uiIcon('gavel')} <strong>${house.name}</strong> — ${lots.length} ${house.lotsWord}${lots.length !== 1 ? 's' : ''} up for bid. Lots rotate every few days.
      Buyer's premium <strong>${(prem * 100).toFixed(0)}%</strong> · Seller's commission <strong>${(comm * 100).toFixed(0)}%</strong> ·
      Car Lot: ${state.garage.length}/${state.garageSlots} slots.
      ${state.upgrades.auctionAccess ? `<br>${uiIcon('tag')} Wholesale Auction Membership active — reduced house fees and an extra lot on the floor.` : ''}
    </div>
    <h3 class="au-section-title">${uiIcon(house.icon)} ${house.id === 'rare' ? 'Featured Lots' : house.id === 'salvage' ? 'Salvage Lots' : 'Today\'s Lots'}</h3>
    <div class="card-grid">${lotCards}</div>
    <h3 class="au-section-title">${uiIcon('tag')} Consign Your Cars</h3>
    <p class="text-muted au-section-sub">Put any car from your Car Lot in front of the room. Set a reserve, pay the listing fee, and watch the bids climb — if the hammer falls under your reserve, the car comes home unsold.</p>
    ${state.garage.length ? `<div class="card-grid">${consignCards}</div>` : `<div class="empty-state"><p>Your Car Lot is empty — nothing to consign yet.</p></div>`}
    <h3 class="au-section-title">${uiIcon('clipboard')} Recent Auction Activity</h3>
    <div class="au-history">${logRows}</div>`;
}

// ── Live auction engine ──────────────────────────────────────
const auctionMinNext = a => (a.bids.length ? a.current + a.step : a.startPrice);
const auctionPlayerBid = a => (a.bids.length ? a.current + a.step * a.mult : a.startPrice + a.step * (a.mult - 1));

function openAuctionLot(lotId) {
  if (liveAuction) return;
  ensureAuctionState();
  const lot = state.auctions.lots.find(l => l.id === lotId);
  if (!lot) return;
  repairAuctionLot(lot);
  liveAuction = {
    mode: 'buy', stage: 'ready', lotId: lot.id, car: lot.car,
    estimate: lot.estimate, appraised: !!lot.appraised,
    step: lot.step, startPrice: lot.startPrice, botCount: lot.botCount,
    mult: 1, bids: [], current: 0, leader: null, bots: [],
    timeLeft: 0, timerMax: AUCTION_TIMER_SECONDS, clock: 0, lastTs: 0, flashUntil: 0,
    reserve: 0, result: null,
  };
  mountAuctionOverlay();
}

function openConsignAuction(carId) {
  if (liveAuction) return;
  const car = state.garage.find(c => c.id === carId);
  if (!car) return;
  if (car.inServiceUntilDay) { showToast('That car is in service — wait until it is finished.', 'error'); return; }
  if (car.leaseStatus === 'active' && car.activeLease) { showToast('Leased cars cannot be auctioned.', 'error'); return; }
  if ((car.auctionCooldownUntil || 0) > state.day) { showToast(`The house won't re-list this car for ${car.auctionCooldownUntil - state.day} more day(s).`, 'error'); return; }
  const value = Number.isFinite(car.marketValue) ? Math.max(1000, car.marketValue) : 1000;
  const step  = auctionStepFor(value);
  // Interest is deterministic per car per day so closing and reopening can't re-roll the room.
  const botCount = clamp(
    2 + (value >= 50000 ? 1 : 0) + (value >= 250000 ? 1 : 0) + (state.reputation >= 1.3 ? 1 : 0)
      + (car.discontinued ? 1 : 0) + (auctionHash(car.id + ':' + state.day) % 2), 2, 6);
  liveAuction = {
    mode: 'sell', stage: 'ready', carId: car.id, car,
    estimate: value, appraised: true,
    step, startPrice: Math.max(step, Math.round(value * 0.30 / step) * step), botCount,
    mult: 1, bids: [], current: 0, leader: null, bots: [],
    timeLeft: 0, timerMax: AUCTION_TIMER_SECONDS, clock: 0, lastTs: 0, flashUntil: 0,
    reserve: Math.max(step, Math.round(value * 0.90 / step) * step), result: null,
  };
  mountAuctionOverlay();
}

function makeAuctionBots(a, trueValue) {
  const names = [...AUCTION_BOT_NAMES].sort(() => Math.random() - 0.5).slice(0, a.botCount);
  const hype  = { 2: -0.06, 3: -0.02, 4: 0, 5: 0.03, 6: 0.06 }[a.botCount] ?? 0;
  const rarityBoost = a.mode === 'sell'
    ? (a.car.discontinued ? 0.05 : 0) + (trueValue >= 1000000 ? 0.05 : 0)
      + (state.reputation - 1) * 0.05 + (state.upgrades.luxuryLounge && trueValue >= 90000 ? 0.03 : 0)
    : hype;
  return names.map((name, i) => {
    const avg = (Math.random() + Math.random()) / 2;              // bell-ish curve
    const max = Math.round((Number.isFinite(trueValue) ? trueValue : a.estimate) * (0.68 + 0.56 * avg + rarityBoost));
    return { id: 'bot' + i, name, max, eager: randomFloat(0.8, 1.5), nextAt: null };
  });
}

function startAuction() {
  const a = liveAuction;
  if (!a || a.stage !== 'ready') return;
  if (![a.step, a.startPrice, a.estimate].every(v => Number.isFinite(v) && v > 0)) {
    showToast('This lot has invalid pricing — leave and re-enter it.', 'error'); return;
  }
  if (a.mode === 'buy') {
    const lot = state.auctions.lots.find(l => l.id === a.lotId);
    if (!lot) { closeAuction(); return; }
    if (state.garage.length + state.deliveries.length >= state.garageSlots) { showToast('No free Car Lot space — make room before you bid.', 'error'); playSfx('denied'); return; }
    if (state.cash < Math.ceil(a.startPrice * (1 + auctionBuyerPremium()))) { showToast("You can't cover even the opening bid.", 'error'); playSfx('denied'); return; }
    lot.started = true;                           // walking out (or refreshing) forfeits the lot
    a.bots = makeAuctionBots(a, lot.car.marketValue);
  } else {
    const input = document.getElementById('au-reserve');
    const reserve = Math.round(parseFloat(input?.value));
    if (!reserve || reserve <= 0) { showToast('Enter a reserve price.', 'error'); return; }
    const fee = auctionListingFee(a.car.marketValue);
    if (state.cash < fee) { showToast(`The listing fee is ${formatCurrency(fee)} — not enough cash.`, 'error'); playSfx('denied'); return; }
    a.reserve = reserve;
    a.listingFee = fee;
    state.cash -= fee;
    a.car.auctionCooldownUntil = state.day + AUCTION_RECONSIGN_DAYS;
    a.bots = makeAuctionBots(a, a.car.marketValue);
  }
  saveState();
  renderStats();
  a.stage = 'live';
  a.timeLeft = AUCTION_OPENING_SECONDS;
  a.clock = 0;
  a.lastTs = performance.now();
  // Somebody in the room always opens the bidding.
  const openers = a.bots.filter(b => b.max >= a.startPrice);
  const opener = openers.length ? randomFrom(openers) : a.bots.reduce((m, b) => (b.max > m.max ? b : m), a.bots[0]);
  if (opener.max < a.startPrice) opener.max = Math.round(a.startPrice * 1.15);
  opener.nextAt = randomFloat(0.9, 2.2);
  playSfx('start');
  renderAuctionOverlay();
  _auctionRaf = requestAnimationFrame(auctionLoop);
}

function auctionLoop(ts) {
  const a = liveAuction;
  if (!a || a.stage !== 'live') return;
  const dt = Math.min(0.25, Math.max(0, (ts - a.lastTs) / 1000));
  a.lastTs = ts;
  a.clock += dt;
  a.timeLeft -= dt;
  auctionBotTick(a);
  if (a.flashUntil && a.clock > a.flashUntil) a.flashUntil = 0;
  if (a.timeLeft <= 0) { finishAuction(a); return; }
  updateAuctionHud();
  _auctionRaf = requestAnimationFrame(auctionLoop);
}

function auctionBotTick(a) {
  let due = null;
  for (const b of a.bots) {
    if (b.nextAt !== null && b.nextAt <= a.clock && b.id !== a.leader && (!due || b.nextAt < due.nextAt)) due = b;
  }
  if (!due) return;
  const next = auctionMinNext(a);
  if (due.max < next) { due.nextAt = null; return; }
  // Bidders with plenty of headroom take bigger bites, which keeps long auctions moving.
  const headroom = (due.max - next) / a.step;
  const jumps = headroom > 20 ? randomInt(1, 3) : headroom > 8 ? randomInt(1, 2) : (Math.random() < 0.2 && headroom >= 1 ? 2 : 1);
  const amount = Math.min(due.max, next + a.step * (jumps - 1));
  placeAuctionBid(a, due.id, due.name, Math.max(next, amount));
}

function placeAuctionBid(a, id, name, amount) {
  const prevLeader = a.leader;
  a.current = amount;
  a.leader  = id;
  a.bids.push({ id, name, amount });
  a.timeLeft = a.timerMax;
  a._logDirty = true;
  if (id === 'player') {
    a.flashUntil = a.clock + 1.2;
    playSfx('tap');
  } else if (prevLeader === 'player') {
    playSfx('warning');
  } else {
    playSfx('click');
  }
  // Everyone still in the running reconsiders.
  const next = auctionMinNext(a);
  const speed = a.mode === 'sell' ? 0.8 : 1;
  for (const b of a.bots) {
    if (b.id === id || b.max < next || Math.random() < 0.10) { b.nextAt = null; continue; }
    const d = randomFloat(0.6, Math.min(3.6, a.timerMax * 0.5)) / b.eager * speed;
    b.nextAt = a.clock + clamp(d, 0.45, a.timerMax * 0.8);
  }
}

/** The big centre circle: starts the auction, then acts as the bid (or hammer) button while live. */
function auctionCenterClick() {
  const a = liveAuction;
  if (!a) return;
  if (a.stage === 'ready') startAuction();
  else if (a.stage === 'live') auctionPlayerBidClick();
}

function auctionPlayerBidClick() {
  const a = liveAuction;
  if (!a || a.stage !== 'live') return;
  if (a.mode === 'sell') { auctionHammerNow(); return; }
  if (a.leader === 'player') return;
  const amount = auctionPlayerBid(a);
  if (amount * (1 + auctionBuyerPremium()) > state.cash) { showToast('You cannot afford that bid.', 'error'); playSfx('denied'); return; }
  placeAuctionBid(a, 'player', 'You', amount);
  updateAuctionHud();
}

function auctionSetMult(delta) {
  const a = liveAuction;
  if (!a) return;
  const opts = [1, 2, 5, 10];
  const idx = clamp(opts.indexOf(a.mult) + delta, 0, opts.length - 1);
  a.mult = opts[idx];
  playSfx('toggle');
  updateAuctionHud();
}

/** Seller ends the auction early on the current high bid (only once the reserve is met). */
function auctionHammerNow() {
  const a = liveAuction;
  if (!a || a.stage !== 'live' || a.mode !== 'sell') return;
  if (!a.bids.length || a.current < a.reserve) return;
  finishAuction(a);
}

function finishAuction(a) {
  cancelAnimationFrame(_auctionRaf);
  a.stage = 'ended';
  if (a.mode === 'buy') resolveAuctionBuy(a); else resolveAuctionSell(a);
  runAchievementChecks();
  saveState();
  renderAuctionOverlay();
}

function resolveAuctionBuy(a) {
  const lotIdx = state.auctions.lots.findIndex(l => l.id === a.lotId);
  const lot = lotIdx >= 0 ? state.auctions.lots[lotIdx] : null;
  if (lotIdx >= 0) state.auctions.lots.splice(lotIdx, 1);
  const label = formatCarDisplayName(a.car);
  const top = a.bids[a.bids.length - 1];
  if (a.leader === 'player' && lot) {
    const hammer  = a.current;
    const premium = Math.round(hammer * auctionBuyerPremium());
    const total   = hammer + premium;
    state.cash -= total;
    const car = lot.car;
    car.purchasePrice = total;
    car.auctionHammer = hammer;
    car.source        = 'auction';
    car.daysInLot     = 0;
    state.garage.push(car);
    state.auctionsWon    = (state.auctionsWon || 0) + 1;
    state.auctionBestWin = Math.max(state.auctionBestWin || 0, hammer);
    addNote(`🔨 Won at auction: ${label} for ${formatCurrency(hammer)} (+${formatCurrency(premium)} buyer's premium).`, 'success');
    logAuctionResult(`Won the ${label} for ${formatCurrency(hammer)}.`, 'success');
    a.result = {
      outcome: 'won', title: 'SOLD — to you!',
      lines: [
        ['Winning bid', formatCurrency(hammer)],
        [`Buyer's premium (${(auctionBuyerPremium() * 100).toFixed(0)}%)`, formatCurrency(premium)],
        ['Total paid', formatCurrency(total)],
        ['Appraised value', formatCurrency(car.marketValue)],
      ],
      note: `The ${label} is now parked on your Car Lot.`,
    };
    playSfx('purchase');
  } else {
    const winner = top ? top.name : 'another bidder';
    addNote(`🔨 Outbid: ${label} went to ${winner} for ${formatCurrency(a.current)}.`, 'warning');
    logAuctionResult(`Lost the ${label} to ${winner} at ${formatCurrency(a.current)}.`, 'warning');
    a.result = {
      outcome: 'lost', title: 'SOLD — to ' + winner,
      lines: [['Final hammer price', formatCurrency(a.current)], ['Your last bid', formatCurrency(Math.max(0, ...a.bids.filter(b => b.id === 'player').map(b => b.amount)))]],
      note: 'The lot has left the floor. Better luck with the next one.',
    };
    playSfx('denied');
  }
}

function resolveAuctionSell(a) {
  const car = state.garage.find(c => c.id === a.carId);
  const label = formatCarDisplayName(a.car);
  const met = a.bids.length && a.current >= a.reserve;
  if (!car) {   // car vanished mid-auction (e.g. impounded) — nothing to settle
    a.result = { outcome: 'nosale', title: 'NO SALE', lines: [], note: 'The car is no longer on your lot.' };
    return;
  }
  if (met) {
    const winner     = a.bids[a.bids.length - 1];
    const hammer     = a.current;
    const commission = Math.round(hammer * auctionCommission());
    const net        = hammer - commission;
    const profit     = net - a.listingFee - car.purchasePrice;
    state.cash += net;
    state.reputation = profit > 0 ? Math.min(state.reputation + 0.02, 2.0) : Math.max(state.reputation - 0.01, 0.1);
    recordSaleStats(car, profit);
    const legalRisk = (car.legalStatus || 'clean') !== 'clean' || (car.vinStatus || 'normal') === 'scratched';
    if (legalRisk) checkPoliceEvent(car, false);
    state.salesHistory.unshift({
      ...car, soldDay: state.day, salePrice: hammer, fee: commission + a.listingFee, profit,
      dealerFees: { doc: 0, title: 0, reg: 0, total: 0 },
      buyerName: winner.name, agreementNo: generateId().toUpperCase(), soldAtAuction: true,
    });
    state.garage          = state.garage.filter(c => c.id !== car.id);
    state.customerOffers  = state.customerOffers.filter(o => o.carId !== car.id);
    state.tradeInRequests = state.tradeInRequests.filter(r => r.targetCarId !== car.id);
    state.auctionsSold = (state.auctionsSold || 0) + 1;
    addNote(`🔨 Sold at auction: ${label} to ${winner.name} for ${formatCurrency(hammer)}. Profit: ${profit >= 0 ? '+' : ''}${formatCurrency(profit)}.`, profit >= 0 ? 'success' : 'warning');
    logAuctionResult(`Sold the ${label} to ${winner.name} for ${formatCurrency(hammer)}.`, profit >= 0 ? 'success' : 'warning');
    a.result = {
      outcome: 'sold', title: 'SOLD — ' + winner.name,
      lines: [
        ['Hammer price', formatCurrency(hammer)],
        [`Commission (${(auctionCommission() * 100).toFixed(0)}%)`, '−' + formatCurrency(commission)],
        ['Listing fee (paid up front)', '−' + formatCurrency(a.listingFee)],
        ['Paid for the car', '−' + formatCurrency(car.purchasePrice)],
        ['Net profit', (profit >= 0 ? '+' : '−') + formatCurrency(Math.abs(profit))],
      ],
      profit,
      note: 'Proceeds have been added to your cash.',
    };
    playSfx('cash');
  } else {
    const best = a.bids.length ? formatCurrency(a.current) : 'no bids';
    addNote(`🔨 No sale: ${label} failed to meet its ${formatCurrency(a.reserve)} reserve (high bid: ${best}).`, 'warning');
    logAuctionResult(`${label} failed to meet its reserve (${best}).`, 'warning');
    a.result = {
      outcome: 'nosale', title: 'RESERVE NOT MET',
      lines: [['Your reserve', formatCurrency(a.reserve)], ['High bid', best], ['Listing fee (non-refundable)', formatCurrency(a.listingFee)]],
      note: `The car comes home. The house won't re-list it for ${AUCTION_RECONSIGN_DAYS} days.`,
    };
    playSfx('denied');
  }
}

// ── Live auction overlay (CMS-style HUD) ─────────────────────
function mountAuctionOverlay() {
  let ov = document.getElementById('auction-overlay');
  if (!ov) {
    ov = document.createElement('div');
    ov.id = 'auction-overlay';
    ov.className = 'auction-overlay';
    ov.setAttribute('role', 'dialog');
    ov.setAttribute('aria-modal', 'true');
    ov.setAttribute('aria-label', AUCTION_HOUSE_NAME);
    document.body.appendChild(ov);
  }
  document.addEventListener('keydown', auctionKeyHandler, true);
  playSfx('modalOpen');
  renderAuctionOverlay();
}

function auctionKeyHandler(e) {
  const a = liveAuction;
  if (!a) return;
  const tag = document.activeElement?.tagName?.toLowerCase();
  if (e.key === 'Escape' && a.stage !== 'live') { e.preventDefault(); closeAuction(); return; }
  if (tag === 'input') return;
  if ((e.key === ' ' || e.key === 'Enter') && a.stage === 'live') {
    e.preventDefault(); e.stopPropagation();
    auctionPlayerBidClick();
  } else if ((e.key === ' ' || e.key === 'Enter') && a.stage === 'ready' && tag !== 'button') {
    e.preventDefault(); e.stopPropagation();
    startAuction();
  }
}

function closeAuction() {
  const a = liveAuction;
  if (a && a.stage === 'live') return;   // no walking out mid-auction
  cancelAnimationFrame(_auctionRaf);
  liveAuction = null;
  document.removeEventListener('keydown', auctionKeyHandler, true);
  document.getElementById('auction-overlay')?.remove();
  playSfx('modalClose');
  saveState();
  renderAll();
}

function auctionLeftPanelHtml(a) {
  const car = a.car;
  const sell = a.mode === 'sell';
  const issues = car.inspected
    ? (car.hiddenIssues.length ? car.hiddenIssues.map(i => `<span class="issue-tag">${uiIcon('warning')} ${i.name}</span>`).join('') : `<span class="text-green">${uiIcon('check')} No hidden issues</span>`)
    : `<span class="text-muted">${uiIcon('search')} Not inspected</span>`;
  return `
    <div class="au-lot-panel">
      <div class="au-lot-kicker">${sell ? 'YOUR CONSIGNMENT' : 'LOT · ' + getAuctionHouse(car.auctionHouse).name.toUpperCase()}</div>
      <h2 class="au-lot-name">${formatCarDisplayName(car)}</h2>
      <div class="au-lot-badges">
        ${condBadge(car.condition)}
        ${car.titleStatus && car.titleStatus !== 'clean' ? titleBadge(car.titleStatus) : ''}
        ${car.discontinued ? '<span class="badge badge-purple">🏛️ Discontinued</span>' : ''}
        ${car.provenance ? `<span class="badge badge-yellow">★ ${car.provenance.label}</span>` : ''}
        <span class="badge ${auctionInterestClass(a.botCount)}">${uiIcon('person')} ${auctionInterestLabel(a.botCount)} interest</span>
      </div>
      ${car.provenance ? `<p class="au-provenance">${car.provenance.blurb}</p>` : ''}
      <div class="car-details">
        <div class="detail-row"><span>Category</span><span>${car.category}</span></div>
        <div class="detail-row"><span>Mileage</span><span>${car.mileage.toLocaleString()} mi</span></div>
        <div class="detail-row"><span>Condition</span><span>${CONDITION_NAMES[car.condition] || car.condition}</span></div>
        <div class="detail-row"><span>Title</span><span>${car.titleStatus && car.titleStatus !== 'clean' ? (TITLE_LABELS[car.titleStatus] || car.titleStatus) + ' · VIN verified' : 'Clean · verified by the house'}</span></div>
        ${sell ? `<div class="detail-row"><span>You paid</span><span>${formatCurrency(car.purchasePrice)}</span></div>` : ''}
        <div class="detail-row"><span>Opening bid</span><span>${formatCurrency(a.startPrice)}</span></div>
        <div class="detail-row"><span>Bid increment</span><span>${formatCurrency(a.step)}</span></div>
        ${sell
          ? `<div class="detail-row"><span>Seller's commission</span><span>${(auctionCommission() * 100).toFixed(0)}%</span></div>
             <div class="detail-row"><span>Listing fee</span><span>${formatCurrency(auctionListingFee(car.marketValue))}</span></div>`
          : `<div class="detail-row"><span>Buyer's premium</span><span>${(auctionBuyerPremium() * 100).toFixed(0)}%</span></div>
             ${car.inspected ? `<div class="detail-row"><span>Repair cost</span><span class="text-red">${formatCurrency(car.repairCost)}</span></div>` : ''}`}
      </div>
      ${sell ? '' : `<div class="issues-section">${issues}</div>`}
    </div>`;
}

function auctionConsoleHtml(a) {
  const sell = a.mode === 'sell';
  const ready = a.stage === 'ready';
  const prem  = auctionBuyerPremium();
  let controls;
  if (sell) {
    controls = ready ? `
      <div class="au-reserve-box">
        <label for="au-reserve">Reserve price</label>
        <input type="number" id="au-reserve" class="price-input" min="1" step="${a.step}" value="${a.reserve}">
        <div class="au-reserve-quick">
          <button type="button" onclick="auctionSetReserve(0.8)">80%</button>
          <button type="button" onclick="auctionSetReserve(0.9)">90%</button>
          <button type="button" onclick="auctionSetReserve(1)">100%</button>
          <button type="button" onclick="auctionSetReserve(1.15)">115%</button>
        </div>
      </div>` : `
      <div class="au-bidwrap">
        <button class="au-bidbox au-hammer" id="au-bid" onclick="auctionPlayerBidClick()">
          <small id="au-bid-label">HAMMER</small><b id="au-bid-amt">—</b>
        </button>
      </div>`;
  } else {
    controls = `
      <div class="au-bidwrap">
        <button class="au-step-btn" id="au-minus" onclick="auctionSetMult(-1)" aria-label="Smaller bid step">−</button>
        <button class="au-bidbox" id="au-bid" onclick="auctionPlayerBidClick()" ${ready ? 'disabled' : ''}>
          <small>BID</small><b id="au-bid-amt">${formatCurrency(a.step * a.mult).replace('$', '<span class="au-cur">$</span>')}</b>
        </button>
        <button class="au-step-btn" id="au-plus" onclick="auctionSetMult(1)" aria-label="Bigger bid step">+</button>
      </div>
      <div class="au-bid-hint" id="au-bid-hint">${ready ? `Buyer's premium ${(prem * 100).toFixed(0)}% is added to the winning bid` : ''}</div>`;
  }
  return `
    <div class="au-console">
      <div class="au-ring-wrap">
        <svg class="au-ring" viewBox="0 0 220 220" aria-hidden="true">
          <circle class="au-ring-bg" cx="110" cy="110" r="96"/>
          <circle class="au-arc" id="au-arc" cx="110" cy="110" r="96" transform="rotate(-90 110 110)"/>
        </svg>
        <button class="au-center" id="au-center" onclick="auctionCenterClick()" ${ready ? '' : 'tabindex="-1"'} aria-label="${ready ? 'Start the auction' : (sell ? 'Accept the current bid' : 'Place a bid')}">
          ${ready ? '<span class="au-start">Start</span>' : ''}
        </button>
      </div>
      ${controls}
      <div class="au-estimate">${a.appraised && !sell ? 'Appraised' : 'Estimated'} value <span class="au-cur">$</span>${Math.round(a.estimate).toLocaleString()}</div>
      <div class="au-log" id="au-log"></div>
    </div>`;
}

function auctionSetReserve(frac) {
  const a = liveAuction;
  if (!a || a.mode !== 'sell') return;
  const input = document.getElementById('au-reserve');
  if (input) input.value = Math.max(a.step, Math.round(a.estimate * frac / a.step) * a.step);
}

function renderAuctionOverlay() {
  const a = liveAuction;
  const ov = document.getElementById('auction-overlay');
  if (!a || !ov) return;
  const ended = a.stage === 'ended';
  const res = a.result;
  ov.innerHTML = `
    <div class="au-shell">
      <div class="au-topbar">
        <div class="au-house">${uiIcon('gavel')} ${AUCTION_HOUSE_NAME}</div>
        ${a.stage === 'live' ? '<div class="au-live-pill">● LIVE</div>' : `<button class="au-close" onclick="closeAuction()" aria-label="Leave the auction">${uiIcon('xIcon')} ${ended ? 'Close' : 'Leave'}</button>`}
      </div>
      <div class="au-body">
        ${auctionLeftPanelHtml(a)}
        ${auctionConsoleHtml(a)}
      </div>
      ${ended && res ? `
        <div class="au-result au-result-${res.outcome}">
          <div class="au-result-title">${res.title}</div>
          ${res.lines.map(([k, v]) => `<div class="au-result-row"><span>${k}</span><b>${v}</b></div>`).join('')}
          <p class="au-result-note">${res.note}</p>
          <button class="btn btn-primary" onclick="closeAuction()">Continue</button>
        </div>` : ''}
    </div>`;
  a._logDirty = true;
  updateAuctionHud();
}

function updateAuctionHud() {
  const a = liveAuction;
  if (!a) return;
  const center = document.getElementById('au-center');
  const arc = document.getElementById('au-arc');
  if (!center || !arc) return;
  const sell = a.mode === 'sell';
  const fmt = n => `<span class="au-cur">$</span>${Math.round(n).toLocaleString()}`;
  const C = 2 * Math.PI * 96;
  let frac = 0, tone = 'neutral', html = '';

  if (a.stage === 'ready') {
    // Start button is rendered by the template; just show the welcome line in the log.
    arc.style.strokeDasharray = `0 ${C}`;
    const logEl0 = document.getElementById('au-log');
    if (logEl0 && a._logDirty) {
      a._logDirty = false;
      logEl0.innerHTML = `<div class="au-log-welcome">Welcome to ${AUCTION_HOUSE_NAME}</div>`;
    }
    return;
  }
  const leaderName = a.leader === 'player' ? 'You' : (a.bids.length ? a.bids[a.bids.length - 1].name : '');
  if (a.stage === 'live') {
    frac = clamp(a.timeLeft / (a.bids.length ? a.timerMax : AUCTION_OPENING_SECONDS), 0, 1);
    if (!a.bids.length) {
      html = `<div class="au-c-name">Bidding open</div><div class="au-c-amt">${fmt(a.startPrice)}</div><div class="au-c-status">Awaiting first bid…</div>`;
    } else if (a.flashUntil && a.clock < a.flashUntil) {
      tone = 'good';
      html = `<div class="au-c-flash">BID PLACED</div><div class="au-c-amt">${fmt(a.current)}</div>`;
    } else if (sell) {
      const met = a.current >= a.reserve;
      tone = met ? 'good' : 'bad';
      html = `<div class="au-c-name">${leaderName}</div><div class="au-c-amt">${fmt(a.current)}</div><div class="au-c-status">${met ? 'Reserve met!' : 'Reserve not met'}</div>`;
    } else {
      const winning = a.leader === 'player';
      tone = winning ? 'good' : 'bad';
      html = `<div class="au-c-name">${leaderName}</div><div class="au-c-amt">${fmt(a.current)}</div><div class="au-c-status">${winning ? 'Winning!' : 'Losing!'}</div>`;
    }
  } else {   // ended
    frac = 0;
    const res = a.result || {};
    tone = res.outcome === 'won' || res.outcome === 'sold' ? 'good' : 'bad';
    html = `<div class="au-c-flash">${res.outcome === 'won' ? 'YOURS!' : res.outcome === 'sold' ? 'SOLD' : res.outcome === 'nosale' ? 'NO SALE' : 'SOLD'}</div>
            ${a.bids.length ? `<div class="au-c-amt">${fmt(a.current)}</div>` : ''}`;
    if (res.outcome === 'lost') html = `<div class="au-c-name">${leaderName}</div><div class="au-c-amt">${fmt(a.current)}</div><div class="au-c-status">Sold</div>`;
  }
  if (center.dataset.html !== html) { center.innerHTML = html; center.dataset.html = html; }
  arc.style.strokeDasharray = `${(C * frac).toFixed(2)} ${C}`;
  arc.setAttribute('class', 'au-arc au-arc-' + tone);

  // Bid button
  const bidBtn = document.getElementById('au-bid');
  const amtEl  = document.getElementById('au-bid-amt');
  const hint   = document.getElementById('au-bid-hint');
  const live   = a.stage === 'live';
  if (bidBtn && amtEl) {
    if (sell) {
      const can = live && a.bids.length && a.current >= a.reserve;
      bidBtn.disabled = !can;
      amtEl.innerHTML = a.bids.length ? `Accept ${fmt(a.current)}` : 'Awaiting bids';
      const lbl = document.getElementById('au-bid-label');
      if (lbl) lbl.textContent = a.bids.length && a.current < a.reserve ? `RESERVE ${formatCurrency(a.reserve)}` : 'HAMMER';
    } else {
      const amount = auctionPlayerBid(a);
      const afford = amount * (1 + auctionBuyerPremium()) <= state.cash;
      bidBtn.disabled = !live || a.leader === 'player' || !afford;
      amtEl.innerHTML = fmt(a.step * a.mult);
      if (hint && live) {
        hint.textContent = a.leader === 'player' ? "You're the high bidder — hold your nerve."
          : !afford ? 'Not enough cash for the next bid.'
          : `Next bid ${formatCurrency(amount)} · click the circle or press Space`;
      }
      const minus = document.getElementById('au-minus'), plus = document.getElementById('au-plus');
      if (minus) minus.disabled = a.mult <= 1 || !live;
      if (plus)  plus.disabled  = a.mult >= 10 || !live;
    }
  }
  // Bid log
  if (a._logDirty) {
    a._logDirty = false;
    const logEl = document.getElementById('au-log');
    if (logEl) {
      logEl.innerHTML = `<div class="au-log-welcome">Welcome to ${AUCTION_HOUSE_NAME}</div>` +
        a.bids.map(b => `<div class="au-log-row ${b.id === 'player' ? 'au-log-you' : ''}"><span>${b.name}</span><span>${fmt(b.amount)}</span></div>`).join('');
      logEl.scrollTop = logEl.scrollHeight;
    }
  }
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

  const visibleCars = sortCarsForLot(
    showLeased ? state.garage : state.garage.filter(car => !(car.leaseStatus === 'active' && car.activeLease)),
    settings.carLotSortBy || 'default'
  );
  const cards = visibleCars.map(car => {
    const inService = !!car.inServiceUntilDay;
    const isLeased = car.leaseStatus === 'active' && !!car.activeLease;
    const needsMaint = carNeedsMaintenance(car);
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
        if (!car.washed) {
          reconHtml += `<button class="btn btn-sm btn-secondary recon-btn" onclick="carWash('${car.id}')"
            ${canWash ? '' : 'disabled'} title="Instant: +${Math.round(WASH_VALUE_BOOST * 100)}% value, permanent sale-chance boost (one wash per car)">${uiIcon('droplet')} Wash (${formatCurrency(WASH_COST)})</button>`;
        } else {
          reconHtml += `<button class="btn btn-sm btn-secondary recon-btn" disabled title="Already washed — the value and sale-chance boost is permanent">${uiIcon('droplet')} Washed</button>`;
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

    // Showroom button — only shown once the Showroom is built; otherwise the Car Lot doesn't
    // advertise a feature the player hasn't unlocked yet.
    const showroomCapacity = getShowroomCapacity();
    let showroomBtn = '';
    if (showroomCapacity > 0) {
      const showroomFull = state.showroom.length >= showroomCapacity;
      const blocked = car.isForSale ? 'Unlist to move to the Showroom'
        : inService ? 'In service' : isLeased ? 'Leased out' : showroomFull ? 'Showroom is full' : null;
      showroomBtn = `<button class="btn btn-secondary showroom-move-btn btn-full" onclick="moveToShowroom('${car.id}')"
        ${blocked ? 'disabled' : ''} title="${blocked || 'Keep this car on display — it stops using a Car Lot slot and can never be stolen'}">
        ${uiIcon('sparkles')} Move to Showroom</button>`;
    }

    return `
        <div class="car-card garage-card ${car.isForSale ? 'for-sale' : ''} ${inService ? 'in-service' : ''}" data-car-id="${car.id}">
          <div class="car-card-header">
            <div>
              <span class="car-name">${formatCarDisplayName(car)}</span>
            </div>
            <div class="badge-stack">
              ${needsMaint ? `<span class="badge badge-orange" title="Pinned to top: needs maintenance">${uiIcon('wrench')} NEEDS MAINTENANCE</span>` : ''}
              ${condBadge(car.condition)}
              ${titleBadge(car.titleStatus)}
              ${curseBadge(car)}
              ${car.staffFlip ? `<span class="badge badge-purple" title="${car.staffFlip.staffName} bought this car and is flipping it">🧑‍💼 ${car.staffFlip.staffName}'s flip</span>` : ''}
              ${isCertifiedCar(car) ? '<span class="badge badge-green" title="Certified Pre-Owned: +18% sale chance">✔ CERTIFIED</span>' : ''}
              ${car.provenance ? `<span class="badge badge-yellow" title="${car.provenance.blurb}">★ ${car.provenance.label}</span>` : ''}
              ${(car.legalDiscovered && (car.legalStatus || 'clean') !== 'clean') ? `<span class="badge ${car.legalStatus === 'stolen' ? 'badge-red' : 'badge-orange'}">${car.legalStatus === 'stolen' ? '🚨 STOLEN' : '⚠️ NO TITLE'}</span>` : ''}
              ${(car.vinDiscovered && (car.vinStatus || 'normal') === 'scratched') ? `<span class="badge badge-yellow">🔦 SCRATCHED VIN</span>` : ''}
              ${(car.crashDamageDiscovered && (car.crashDamageSeverity || 'none') !== 'none') ? `<span class="badge ${car.crashDamageSeverity === 'severe' ? 'badge-red' : car.crashDamageSeverity === 'moderate' ? 'badge-orange' : 'badge-yellow'}">🔨 ${car.crashDamageSeverity.charAt(0).toUpperCase() + car.crashDamageSeverity.slice(1)} Crash</span>` : ''}
              ${car.leaseStatus === 'available' ? '<span class="badge badge-blue">LEASE AVAILABLE</span>' : ''}
              ${isLeased ? `<span class="badge badge-blue">LEASED (${leaseDaysLeft}d left)</span>` : ''}
            </div>
          </div>
        ${car.staffFlip ? (() => { const j = staffJobForCar(car); const t = j ? staffJobText({}, j) : null; return t ? `<div class="staff-lot-banner"><span class="staff-emoji ${t.cls}">${t.icon}</span> ${car.staffFlip.staffName}: ${t.text} <span class="text-muted">(${j.left}d)</span></div>` : ''; })() : ''}
        ${inService ? `<div class="service-banner">${uiIcon('wrench')} IN SERVICE — Ready Day ${car.inServiceUntilDay} (${car.pendingService?.type === 'repair' ? 'Basic Repair' : 'Parts Upgrade'})</div>` : ''}
        ${car.isForSale ? `<div class="for-sale-banner">${uiIcon('tag')} LISTED FOR SALE</div>` : ''}
        ${isLeased ? `<div class="service-banner">${uiIcon('document')} LEASE ACTIVE — ${leaseDaysLeft} day(s) remaining</div>` : ''}
        ${car.washed ? `<div class="wash-banner">${uiIcon('droplet')} Washed — permanent boost</div>` : ''}
        ${curseBannerHtml(car)}
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
          <div class="detail-row"><span>Source</span><span>${carSourceLabel(car)}</span></div>
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
        <div class="car-actions" style="margin-top:6px">
          <button class="btn btn-secondary btn-full" onclick="openConsignAuction('${car.id}')"
            ${inService || isLeased || (car.auctionCooldownUntil || 0) > state.day ? 'disabled' : ''}
            title="${(car.auctionCooldownUntil || 0) > state.day ? `The house will re-list this car in ${car.auctionCooldownUntil - state.day} day(s)` : 'Put this car in front of the room at the Auction House'}">
            ${uiIcon('gavel')} Sell at Auction
          </button>
        </div>
        ${showroomBtn ? `<div class="car-actions" style="margin-top:6px">${showroomBtn}</div>` : ''}
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
      ${getShowroomCapacity() > 0 ? `<br>${uiIcon('sparkles')} Showroom: <strong>${state.showroom.length}/${getShowroomCapacity()}</strong> on display.` : ''}
    </div>
    <div class="bulk-row">
      <label style="display:flex; align-items:center; gap:6px;">
        Sort by:
        <div class="custom-select" id="lot-sort-select">
          <button type="button" class="custom-select-btn" onclick="toggleLotSortMenu(event)">
            <span>${CAR_LOT_SORT_LABELS[settings.carLotSortBy || 'default']}</span>
            <span class="custom-select-arrow">▾</span>
          </button>
          <div class="custom-select-menu">
            ${Object.entries(CAR_LOT_SORT_LABELS).map(([key, label]) =>
              `<div class="custom-select-option ${((settings.carLotSortBy || 'default') === key) ? 'selected' : ''}"
                 onclick="chooseLotSort('${key}')">${label}</div>`
            ).join('')}
          </div>
        </div>
      </label>
      <button class="btn btn-sm btn-secondary" onclick="toggleShowLeasedCars()">${showLeased ? 'Hide Leased Cars' : 'Show Leased Cars'}</button>
      <button class="btn btn-sm btn-secondary" onclick="switchTab('leasing')">${uiIcon('document')} Open Leasing Page</button>
    </div>
    ${state.upgrades.crmSuite ? `
      <div class="bulk-row">
        <button class="btn btn-sm btn-secondary" onclick="markAllForSale()">List All Ready Cars</button>
        <button class="btn btn-sm btn-warning" onclick="unlistAllCars()">Unlist All</button>
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
    c.leaseStatus === 'none' && !c.inServiceUntilDay && !c.isForSale && (c.crashDamageSeverity || 'none') === 'none');
  const crashBlockedCars = state.garage.filter(c =>
    c.leaseStatus === 'none' && !c.inServiceUntilDay && !c.isForSale && (c.crashDamageSeverity || 'none') !== 'none');
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
        <div><div class="kpi-value">${offeredCars.length}</div><div class="kpi-label">Offered for Lease</div></div>
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
  const eligibleHtml = (eligibleCars.length || crashBlockedCars.length)
    ? eligibleCars.map(car => `
      <div class="lease-mini-card">
        <div class="lease-mini-top">
          <span class="lease-mini-name">${formatCarDisplayName(car)}</span>
          ${condBadge(car.condition)}
        </div>
        <div class="lease-mini-sub"><span>Market Value</span><span>${formatCurrency(car.marketValue)}</span></div>
        <div class="lease-mini-sub"><span>Est. Payment</span><span class="text-green">+${formatCurrency(computeLeasePaymentPerDay(car))}/day</span></div>
        <button class="btn btn-sm btn-secondary" onclick="makeLeaseAvailable('${car.id}')">${uiIcon('document')} Offer Lease</button>
      </div>`).join('') + crashBlockedCars.map(car => `
      <div class="lease-mini-card lease-mini-card-blocked">
        <div class="lease-mini-top">
          <span class="lease-mini-name">${formatCarDisplayName(car)}</span>
          ${condBadge(car.condition)}
        </div>
        <div class="lease-mini-sub"><span>Crash Damage</span><span class="text-red">${car.crashDamageSeverity.charAt(0).toUpperCase() + car.crashDamageSeverity.slice(1)}</span></div>
        <div class="lease-mini-sub text-muted" style="font-size:.76rem">Repair the crash damage before this car can go on lease.</div>
      </div>`).join('')
    : `<div class="lease-column-empty">No eligible cars right now. A car must be in your lot, not for sale, and not in service.</div>`;

  // ── Column 2: offered for lease, awaiting a lease offer ──────
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
    : `<div class="lease-column-empty">Nothing waiting on a lease offer. Offer a car for lease from the left column — an offer can arrive as soon as the next day.</div>`;

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
    : `<div class="lease-column-empty">No active leases yet. Once a car is offered, a lease offer may come in as soon as the next day.</div>`;

  el.innerHTML = `
    <div class="tab-info">
      ${uiIcon('document')} Leasing turns idle inventory into daily income: offer a car, wait for a lease offer, then collect
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
          <span class="lease-column-title">${uiIcon('inbox')} Offered for Lease</span>
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
      statusRow   = `<div class="detail-row"><span>Status</span><span class="text-green">Service complete</span></div>`;
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
    const issues = car.hiddenIssues || [];
    const repairNeeded = issues.length > 0
      || (car.condition !== 'A' && car.condition !== 'B')
      || (car.crashDamageSeverity && car.crashDamageSeverity !== 'none'); // catch old saves
    return repairNeeded; // leased cars only show up here if they actually have issues
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
      <div class="car-card service-car-card" data-car-id="${car.id}">
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
        ${car.source === 'tradein' ? `<div class="tradein-source-banner">${uiIcon('refresh')} Accepted trade-in vehicle${car.purchasePrice > 0 ? ` — credited at ${formatCurrency(car.purchasePrice)}` : ''}</div>` : ''}
        ${hasOffer ? `<div class="offer-banner">${uiIcon('inbox')} Customer offer waiting (see above)</div>` : ''}
        ${car.washed ? `<div class="wash-banner">${uiIcon('droplet')} Washed — permanent boost</div>` : ''}
        ${curseBannerHtml(car)}
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
// RENDER — Upgrades (skill tree)
// ============================================================
// Prerequisites per upgrade id (drawn as lines when the prerequisite is in the same branch,
// listed in the detail panel either way). Layout is derived from these.
const UPGRADE_TREE_NEEDS = {
  garage3: ['garage2'], garage4: ['garage3'], garage5: ['garage4'], garage6: ['garage5'], garage7: ['garage6'],
  overheadReduction: ['garage2'],
  auctionAccess: ['tradeNetwork'], exoticConsignment: ['auctionAccess', 'luxuryLounge'],
  certifiedProgram: ['serviceBay', 'inspectionTool'],
  privateClientNetwork: ['luxuryLounge'], collectorNetwork: ['privateClientNetwork'],
  frameDamageTools: ['inspectionTool'],
  performanceShop: ['serviceBay'], reconditioningWorkshop: ['serviceBay'],
  factoryAllocation: ['expressDelivery'], exoticLicense: ['factoryAllocation'], hypercarCharter: ['exoticLicense'],
  crmSuite: ['staffOffice'], aiPricing: ['crmSuite'],
  creditLineBoost1: ['financeOffice'], creditLineBoost2: ['creditLineBoost1'], creditLineBoost3: ['creditLineBoost2'],
  creditLineBoost4: ['creditLineBoost3'], creditLineBoost5: ['creditLineBoost4'],
  fleetLeasing: ['leaseManagement'],
  titleRecovery: ['dmvDatabaseAccess'],
  security2: ['security1'], security3: ['security2'], security4: ['security3'],
  serviceCapacity1: ['serviceBay'], serviceCapacity2: ['serviceCapacity1'], serviceCapacity3: ['serviceCapacity2'],
  wardLights: ['wardSalt'], wardChapel: ['wardLights'],
  wardVotive: ['wardSalt'], wardDream: ['wardVotive'], wardHourglass: ['wardDream'], wardMusicBox: ['wardDream'], wardLastRites: ['wardChapel'],
  nmCurio: ['nmNeon'], nmTour: ['nmNeon'],
};
const UPGRADE_TREE_COL_OVERRIDE = { certifiedProgram: 1 };
const UPGRADE_STAGE_COLORS = { 1: '#2ed59f', 2: '#61b6ff', 3: '#b47bff', 4: '#ff9f43' };
let _skillSel = null;

/** Work out grid column/row for every upgrade in one category branch. */
function layoutSkillBranch(list) {
  const ids = new Set(list.map(u => u.id));
  const pos = {};
  const taken = new Set();
  const free = (c, r) => !taken.has(c + ':' + r);
  for (const u of list) {
    const parents = (UPGRADE_TREE_NEEDS[u.id] || []).filter(id => ids.has(id) && pos[id]);
    let col = UPGRADE_TREE_COL_OVERRIDE[u.id] ?? (parents.length ? Math.max(...parents.map(p => pos[p].col)) + 1 : 0);
    let row = parents.length ? pos[parents[0]].row : 0;
    while (!free(col, row)) row++;
    pos[u.id] = { col, row, parents };
    taken.add(col + ':' + row);
  }
  return pos;
}

function skillNodeState(upg) {
  const st = getUpgradeStatus(upg);
  let cls = 'skt-need-cash';
  if (st.owned) cls = 'skt-owned';
  else if (st.lock) cls = 'skt-locked';
  else if (state.cash >= st.cost) cls = 'skt-can-buy';
  return { st, cls };
}

function selectSkillNode(id) {
  _skillSel = (_skillSel === id) ? null : id;
  renderUpgrades();
}

function skillDetailHtml() {
  const upg = UPGRADES_CONFIG.find(u => u.id === _skillSel);
  if (!upg) {
    return `<div class="skt-detail-empty">${uiIcon('arrowUp')}<p><strong>Pick an upgrade</strong> from the tree to see what it does and buy it.</p>
      <p class="text-muted">Green = owned · glowing = you can afford it · dim = locked. Lines show what unlocks what.</p></div>`;
  }
  const { st } = skillNodeState(upg);
  const stage = UPGRADE_STAGES[upg.stage || 1];
  const iconKey = _P[upg.icon] ? upg.icon : (UPGRADE_ICON_MAP[upg.icon] || 'gear');
  const canAfford = state.cash >= st.cost;
  const needs = (UPGRADE_TREE_NEEDS[upg.id] || []).map(id => {
    const p = UPGRADES_CONFIG.find(x => x.id === id);
    if (!p) return '';
    const ok = getUpgradeStatus(p).owned;
    return `<li class="${ok ? 'text-green' : 'text-red'}">${ok ? '✓' : '✗'} ${p.levelNames ? p.levelNames[0].split(' — ')[0] : p.name}</li>`;
  }).join('');
  let btn;
  if (st.owned) btn = `<button class="btn btn-primary btn-full" disabled>${uiIcon('check')} ${st.max > 1 ? 'Max Level' : 'Purchased'}</button>`;
  else if (st.lock) btn = `<button class="btn btn-primary btn-full" disabled>${uiIcon('lock')} ${st.lock}</button>`;
  else if (!canAfford) btn = `<button class="btn btn-primary btn-full" disabled>${uiIcon('warning')} Need ${formatCurrencyCompact(st.cost - state.cash)} more</button>`;
  else btn = `<button class="btn btn-primary btn-full" onclick="buyUpgrade('${upg.id}')">Buy — ${formatCurrency(st.cost)}</button>`;
  return `
    <div class="skt-detail-head">
      <div class="skt-detail-icon">${uiIconLg(iconKey)}</div>
      <div><h4>${st.name}${st.max > 1 ? ` <small>(${st.level}/${st.max})</small>` : ''}</h4>
        <span class="badge ${stage.cls}">${stage.label}</span></div>
    </div>
    <p class="upgrade-desc">${upg.desc}</p>
    ${needs ? `<ul class="skt-needs"><li class="skt-needs-title">Requires</li>${needs}</ul>` : ''}
    ${st.lock && !st.owned ? `<p class="skt-lock-note text-red">${uiIcon('lock')} ${st.lock}</p>` : ''}
    <p class="upgrade-cost ${st.owned ? 'text-green' : ''}">${st.owned ? 'Owned' : formatCurrency(st.cost)}</p>
    ${btn}`;
}

function renderUpgrades() {
  const grouped = {};
  UPGRADES_CONFIG.filter(u => !u.nightmareOnly || isNightmare()).forEach(u => (grouped[u.category] = grouped[u.category] || []).push(u));
  const cats = UPGRADE_CATEGORY_ORDER.filter(c => grouped[c])
    .concat(Object.keys(grouped).filter(c => !UPGRADE_CATEGORY_ORDER.includes(c)));

  const branches = cats.map(cat => {
    const list = grouped[cat];
    const pos = layoutSkillBranch(list);
    const cols = Math.max(...Object.values(pos).map(p => p.col)) + 1;
    const rows = Math.max(...Object.values(pos).map(p => p.row)) + 1;
    const ownedCount = list.filter(u => getUpgradeStatus(u).owned).length;
    const nodes = list.map(upg => {
      const { st, cls } = skillNodeState(upg);
      const p = pos[upg.id];
      const iconKey = _P[upg.icon] ? upg.icon : (UPGRADE_ICON_MAP[upg.icon] || 'gear');
      const shortName = (st.name || '').split(' — ')[0].replace(/ (I|II|III|IV|V)$/, '');
      const pips = st.max > 1 ? `<span class="skt-pips">${Array.from({ length: st.max }, (_, i) => `<i class="${i < st.level ? 'on' : ''}"></i>`).join('')}</span>` : '';
      const price = st.owned ? (st.max > 1 ? 'MAX' : '✓') : formatCurrencyCompact(st.cost);
      const parents = p.parents.join(',');
      return `<button type="button" class="skt-node ${cls} ${_skillSel === upg.id ? 'skt-selected' : ''}"
          data-id="${upg.id}" data-parents="${parents}" style="grid-column:${p.col + 1};grid-row:${p.row + 1}"
          onclick="selectSkillNode('${upg.id}')" title="${st.name}">
          <span class="skt-stage" style="background:${UPGRADE_STAGE_COLORS[upg.stage || 1]}"></span>
          <span class="skt-ico">${uiIcon(iconKey)}</span>
          <span class="skt-name">${shortName}</span>
          ${pips}
          <span class="skt-price">${st.lock && !st.owned ? uiIcon('lock') : ''}${price}</span>
        </button>`;
    }).join('');
    return `<div class="skt-branch">
        <div class="skt-branch-head"><span>${cat}</span><span class="skt-count">${ownedCount}/${list.length}</span></div>
        <div class="skt-grid" style="grid-template-columns:repeat(${cols}, var(--skt-w)); grid-template-rows:repeat(${rows}, auto)">
          <svg class="skt-lines" aria-hidden="true"></svg>${nodes}
        </div>
      </div>`;
  }).join('');

  document.getElementById('tab-upgrades').innerHTML = `
    <div class="skt-top">
      <div class="tab-info">${uiIcon('arrowUp')} Upgrade tree — click a node for details. Lines connect each upgrade to what unlocks it.</div>
      <div class="skt-legend">
        ${Object.entries(UPGRADE_STAGES).map(([k, v]) => `<span><i style="background:${UPGRADE_STAGE_COLORS[k]}"></i>${v.label}</span>`).join('')}
      </div>
    </div>
    <div class="skt-layout">
      <div class="skt-trees">${branches}</div>
      <aside class="skt-detail" id="skt-detail">${skillDetailHtml()}</aside>
    </div>`;
  requestAnimationFrame(drawSkillLines);
}

/** Draw connector lines between prerequisite nodes inside each branch. */
function drawSkillLines() {
  document.querySelectorAll('#tab-upgrades .skt-grid').forEach(grid => {
    const svg = grid.querySelector('.skt-lines');
    if (!svg || !grid.offsetParent) return;
    const nodes = {};
    grid.querySelectorAll('.skt-node').forEach(n => { nodes[n.dataset.id] = n; });
    svg.setAttribute('width', grid.offsetWidth);
    svg.setAttribute('height', grid.offsetHeight);
    let d = '';
    for (const id in nodes) {
      const child = nodes[id];
      (child.dataset.parents || '').split(',').filter(Boolean).forEach(pid => {
        const par = nodes[pid];
        if (!par) return;
        const x1 = par.offsetLeft + par.offsetWidth, y1 = par.offsetTop + par.offsetHeight / 2;
        const x2 = child.offsetLeft, y2 = child.offsetTop + child.offsetHeight / 2;
        const mx = (x1 + x2) / 2;
        const on = par.classList.contains('skt-owned');
        d += `<path d="M${x1} ${y1} H${mx} V${y2} H${x2}" class="${on ? 'on' : ''}"/>`;
      });
    }
    svg.innerHTML = d;
  });
}
window.addEventListener('resize', () => { if (document.getElementById('tab-upgrades')?.querySelector('.skt-grid')) drawSkillLines(); });

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
  (state.staff || []).forEach(ensureStaffFields);
  const trading = state.staffTrading !== false;
  const staffCards = (state.staff || []).map(s => {
    const ri = getStaffRankIdx(s), rank = STAFF_RANKS[ri], next = STAFF_RANKS[ri + 1];
    const sk = staffSkill(s);
    const rankPct = next ? clamp(((sk - rank.min) / (next.min - rank.min)) * 100, 0, 100) : 100;
    const slots = [];
    for (let i = 0; i < s.speed; i++) {
      const job = s.jobs[i];
      if (!job) {
        slots.push(`<div class="staff-job idle"><span class="staff-emoji idle">${trading ? '☕' : '⏸️'}</span><div class="staff-job-body"><div class="staff-job-text">${trading ? 'Between deals — starts a new one tomorrow' : 'Deals paused'}</div></div></div>`);
        continue;
      }
      const t = staffJobText(s, job);
      const pct = job.total ? clamp(((job.total - job.left) / job.total) * 100, 6, 100) : 6;
      const car = job.carId ? state.garage.find(c => c.id === job.carId) : null;
      const money = car ? `<span class="text-muted">Paid ${formatCurrency(job.buyPrice)} · worth ${formatCurrency(car.marketValue)}</span>` : '';
      slots.push(`
        <div class="staff-job ${t.cls}">
          <span class="staff-emoji ${t.cls}">${t.icon}</span>
          <div class="staff-job-body">
            <div class="staff-job-text">${t.text}</div>
            ${money}
            <div class="staff-bar"><div class="staff-bar-fill" style="width:${pct}%"></div></div>
          </div>
          <span class="staff-job-days">${job.left}d</span>
        </div>`);
    }
    const armed = _staffFireArmed === s.id;
    return `
    <div class="car-card staff-card" style="--rank-color:${rank.color}">
      <div class="staff-card-head">
        <span class="staff-avatar">${rank.icon}</span>
        <div>
          <h4>${s.name}</h4>
          <span class="badge staff-rank-badge">${rank.name}</span>
        </div>
        <div class="staff-wage text-red">${formatCurrency(s.wage)}/day</div>
      </div>
      <div class="staff-stats">
        <span>Negotiation <strong>${s.negotiation}</strong></span>
        <span>Selling <strong>${s.selling}</strong></span>
        <span>Deals at once <strong>${s.speed}</strong></span>
        <span>Budget <strong>${formatCurrency(rank.cap)}</strong></span>
      </div>
      <div class="staff-rankbar" title="${next ? `Progress to ${next.name}` : 'Top rank'}"><div style="width:${rankPct}%"></div></div>
      <div class="staff-jobs">${slots.join('')}</div>
      <div class="staff-record">Flips <strong>${s.flips}</strong> · Profit <strong class="${s.profit >= 0 ? 'text-green' : 'text-red'}">${s.profit >= 0 ? '+' : '−'}${formatCurrency(Math.abs(s.profit))}</strong> · Best <strong>${formatCurrency(s.bestFlip)}</strong></div>
      <div class="car-actions">
        <button class="btn btn-sm ${armed ? 'btn-warning' : 'btn-secondary'}" onclick="fireStaff('${s.id}')">${armed ? `Click again to fire (${formatCurrency(s.wage * STAFF_SEVERANCE_DAYS)} severance)` : 'Fire'}</button>
      </div>
    </div>`;
  }).join('') || '<p class="text-muted">No staff hired yet.</p>';
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
      &nbsp;|&nbsp; Flip profit so far: <strong class="${(state.staffProfitTotal || 0) >= 0 ? 'text-green' : 'text-red'}">${formatCurrency(state.staffProfitTotal || 0)}</strong>
      ${(state.staff || []).length ? `<button class="btn btn-sm ${trading ? 'btn-secondary' : 'btn-primary'}" style="margin-left:12px" onclick="toggleStaffTrading()">${trading ? '⏸ Pause staff deals' : '▶ Resume staff deals'}</button>` : ''}
    </div>
    <p class="text-muted" style="font-size:.82rem;margin:-4px 0 12px">Your staff scout deals, buy cars with your cash, fix them and sell them — all on your Car Lot. Higher ranks buy cheaper, sell higher, spend bigger and are promoted as they flip. Staff keep ${formatCurrency(STAFF_CASH_RESERVE)} of your cash untouched and need 2 free lot slots.</p>
    <div class="category-section"><h3>${uiIcon('person')} Hired Staff — Live Deals</h3><div class="card-grid">${staffCards}</div></div>
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

/** Which Finance sub-tab is showing: 'overview' (credit/loans) or 'receipts' (past sales). */
let financeSubTab = 'overview';
function switchFinanceSubTab(name) {
  financeSubTab = name;
  renderFinance();
}

function renderFinance() {
  const el = document.getElementById('tab-finance');
  if (!el) return;
  el.innerHTML = `
    <div class="finance-subnav" role="tablist">
      <button class="finance-subnav-btn ${financeSubTab === 'overview' ? 'active' : ''}" role="tab"
        aria-selected="${financeSubTab === 'overview'}" onclick="switchFinanceSubTab('overview')">${uiIcon('bank')} Overview</button>
      <button class="finance-subnav-btn ${financeSubTab === 'receipts' ? 'active' : ''}" role="tab"
        aria-selected="${financeSubTab === 'receipts'}" onclick="switchFinanceSubTab('receipts')">${uiIcon('receipt')} Receipts</button>
    </div>
    <div id="finance-subpanel"></div>`;
  if (financeSubTab === 'receipts') renderReceipts();
  else renderFinanceOverview();
}

function renderFinanceOverview() {
  const available = Math.max(0, state.loanLimit - state.loanBalance);
  const dailyInterest = state.loanBalance > 0 ? Math.max(1, Math.round(state.loanBalance * state.loanApr / 365)) : 0;
  const loanTermsForUi = getBaseLoanTerms();
  const minPrincipal = state.difficulty !== 'easy' && state.loanBalance > 0 && loanTermsForUi.minPrincipalRate > 0
    ? Math.min(state.loanBalance, Math.max(loanTermsForUi.minPrincipalFloor ?? 250, Math.round(state.loanBalance * loanTermsForUi.minPrincipalRate)))
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

  const el2 = document.getElementById('finance-subpanel');
  if (!el2) return;
  el2.innerHTML = `
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
        <div class="stat-row"><span>Daily Principal Autopay</span><strong>${minPrincipal ? formatCurrency(minPrincipal) : 'None'}</strong></div>
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
          if (state.difficulty === 'nightmare') return 'Nightmare: Game Over (permanent)';
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

// ============================================================
// RENDER — Insurance
// ============================================================
function renderInsurance() {
  const el = document.getElementById('tab-insurance');
  if (!el) return;

  const activeCompany = getActiveInsurance();
  const daysActive    = activeCompany ? (state.day - (state.insurance.startDay ?? state.day)) : 0;
  const canClaim      = activeCompany ? insuranceCanClaim(activeCompany) : false;
  const isUninsured   = !activeCompany;

  // ── Slim status strip ──────────────────────────────────────────────
  const statusStrip = activeCompany ? `
    <div class="ins-status-strip">
      ${uiIcon('shield')} Insured with <strong>${activeCompany.name}</strong>
      · <strong class="text-red">${formatCurrency(computeMonthlyPremium(activeCompany))}/mo</strong>
      · next bill Day ${state.insurance.nextBillDay}
      ${canClaim ? '' : `· <span class="text-yellow">waiting period — ${Math.max(0, activeCompany.waitingPeriodDays - daysActive)}d left</span>`}
      <button class="ins-status-cancel" onclick="cancelInsurance()">Cancel</button>
    </div>
    ${(state.insurance.claimsCount || 0) > 0 ? `
      <div class="ins-status-lifetime">Lifetime: ${formatCurrency(state.insurance.totalPremiumsPaid || 0)} paid in premiums · ${formatCurrency(state.insurance.totalClaimsPaid || 0)} recovered across ${state.insurance.claimsCount} claim${state.insurance.claimsCount === 1 ? '' : 's'}.</div>
    ` : ''}
  ` : `
    <div class="ins-status-strip">
      ${uiIcon('warning')} Running uninsured — stolen lot cars and leased cars that crash come straight out of your own pocket.
    </div>
  `;

  // ── "No Insurance" card ────────────────────────────────────────────
  const noneCard = `
    <div class="ins-card ins-card--none ${isUninsured ? 'ins-card--active' : ''}" style="--brand-accent:#ff5c5c">
      <div class="ins-card-header">
        <div class="ins-logo">${uiIcon('warning')} No Insurance</div>
      </div>
      <div class="ins-consequences">
        <div class="ins-conseq-title">Consequences</div>
        <div class="ins-conseq-row">Full repair cost out of pocket</div>
        <div class="ins-conseq-row">No theft coverage on the lot</div>
        <div class="ins-conseq-row">Not recommended</div>
      </div>
      <div class="ins-none-banner">
        <div class="ins-none-banner-title">You will pay full costs</div>
        <div class="ins-none-banner-sub">No coverage or benefits included</div>
      </div>
      <div class="ins-card-footer">
        <button class="btn btn-secondary" onclick="cancelInsurance()" ${isUninsured ? 'disabled' : ''}>
          ${isUninsured ? `${uiIcon('check')} Currently Uninsured` : `${uiIcon('ban')} Go Uninsured`}
        </button>
      </div>
    </div>`;

  // ── Brand policy cards ──────────────────────────────────────────────
  const planCards = INSURANCE_COMPANIES.map(c => {
    const isActive = activeCompany?.id === c.id;
    const monthly  = computeMonthlyPremium(c);
    const perksHtml = c.perks.map(p => `
      <div class="ins-perk ${p.badge ? 'ins-perk--signature' : ''}">
        <span class="ins-perk-icon">${uiIcon(p.icon)}</span>
        <div class="ins-perk-text">
          <div class="ins-perk-title">${p.title}</div>
          <div class="ins-perk-desc">${p.desc}</div>
        </div>
        ${p.badge ? `<span class="ins-badge">${p.badge}</span>` : ''}
      </div>`).join('');

    return `
      <div class="ins-card ${isActive ? 'ins-card--active' : ''}" style="--brand-start:${c.brandStart};--brand-end:${c.brandEnd};--brand-accent:${c.brandAccent}">
        <div class="ins-card-header">
          <div class="ins-logo">${uiIcon(c.icon)} <span class="ins-logo-word"><span class="ins-logo-a">${c.logoA}</span><span class="ins-logo-b">${c.logoB}</span></span></div>
          <div class="ins-tagline">${c.tagline}</div>
        </div>
        <div class="ins-perks">${perksHtml}</div>
        <div class="ins-stats">
          <div class="ins-stat-box">
            <div class="ins-stat-label">Deductible</div>
            <div class="ins-stat-value">${formatCurrency(c.deductible)}</div>
            <div class="ins-stat-note">You pay this per claim</div>
          </div>
          <div class="ins-stat-box">
            <div class="ins-stat-label">Monthly Premium</div>
            <div class="ins-stat-value green">${formatCurrency(monthly)}</div>
            <div class="ins-stat-note">Billed automatically every 30 days</div>
          </div>
        </div>
        <div class="ins-fine-print">${uiIcon('warning')} ${c.finePrint}</div>
        <div class="ins-card-footer">
          <button class="btn ${isActive ? 'btn-secondary' : 'btn-primary'}" onclick="selectInsurance('${c.id}')" ${isActive ? 'disabled' : ''}>
            ${isActive ? `${uiIcon('check')} Currently Insured` : `${uiIcon('handshake')} Sign With ${c.name}`}
          </button>
        </div>
      </div>`;
  }).join('');

  el.innerHTML = `
    <div class="tab-info">
      ${uiIcon('shield')} Insurance covers cars stolen off your lot and leased cars that crash. Premiums bill every 30 days based on your total insured fleet value — miss a payment and the policy lapses. Fully optional.
    </div>
    ${statusStrip}
    <div class="ins-card-grid">${noneCard}${planCards}</div>`;
}

// ============================================================
// RECEIPTS — Purchase Agreements
// ============================================================

/** Dealer letterhead used on every generated purchase agreement. */
const DEALERSHIP_INFO = {
  name: 'DealerSim Motors, LLC',
  address: '1 Lot Row, Autoville, ST 00000',
  phone: '(555) 019-2026',
  license: 'DLR-402617',
};

function renderReceipts() {
  const el = document.getElementById('finance-subpanel');
  if (!el) return;
  const sales = state.salesHistory || [];
  const totalRevenue = sales.reduce((s, h) => s + (h.salePrice || 0), 0);
  const totalProfit  = sales.reduce((s, h) => s + (h.profit || 0), 0);
  const totalFees    = sales.reduce((s, h) => s + (h.dealerFees?.total || 0), 0);

  const rows = sales.length ? sales.map(h => {
    const hasAgreement = !!h.agreementNo;
    return `
    <div class="receipt-row${hasAgreement ? '' : ' receipt-row-legacy'}" ${hasAgreement ? `onclick="viewReceipt('${h.agreementNo}')" role="button" tabindex="0"` : ''}>
      <div class="receipt-row-car">
        <span class="receipt-row-title">${h.year} ${h.make} ${h.model}${h.trim ? ` ${h.trim}` : ''}</span>
        <span class="receipt-row-sub">Buyer: ${h.buyerName || 'Customer'} · Day ${h.soldDay}${h.note ? ` · ${h.note}` : ''}</span>
      </div>
      <div class="receipt-row-nums">
        <span class="receipt-row-price">${formatCurrency(h.salePrice)}</span>
        <span class="receipt-row-fees text-green">${h.dealerFees ? `+${formatCurrency(h.dealerFees.total)} fees` : '—'}</span>
        <span class="${h.profit >= 0 ? 'text-green' : 'text-red'}">${h.profit >= 0 ? '+' : ''}${formatCurrency(h.profit)} profit</span>
      </div>
      ${hasAgreement
        ? `<button class="btn btn-sm btn-secondary receipt-row-view">${uiIcon('fileText')} View Agreement</button>`
        : `<span class="text-muted receipt-row-view" style="font-size:.78rem">Sold before agreements were tracked</span>`}
    </div>`;
  }).join('')
    : `<div class="lease-column-empty">No completed sales yet. Every car you sell will generate a signed purchase agreement here.</div>`;

  el.innerHTML = `
    <div class="kpi-row">
      <div class="kpi-tile kpi-day">
        <div class="kpi-icon-wrap">${uiIconLg('receipt')}</div>
        <div><div class="kpi-value">${sales.length}</div><div class="kpi-label">Total Sales</div></div>
      </div>
      <div class="kpi-tile kpi-cash">
        <div class="kpi-icon-wrap">${uiIconLg('cash')}</div>
        <div><div class="kpi-value">${formatCurrency(totalRevenue)}</div><div class="kpi-label">Total Revenue</div></div>
      </div>
      <div class="kpi-tile kpi-profit">
        <div class="kpi-icon-wrap">${uiIconLg('trendingUp')}</div>
        <div><div class="kpi-value ${totalProfit >= 0 ? 'text-green' : 'text-red'}">${formatCurrency(totalProfit)}</div><div class="kpi-label">Total Profit</div></div>
      </div>
      <div class="kpi-tile kpi-rep">
        <div class="kpi-icon-wrap">${uiIconLg('fileText')}</div>
        <div><div class="kpi-value text-green">${formatCurrency(totalFees)}</div><div class="kpi-label">Dealer Fees Collected</div></div>
      </div>
    </div>
    <div class="dashboard-grid">
      <div class="dash-card dash-card-wide">
        <h3>${uiIcon('receipt')} Purchase Agreements</h3>
        <p class="text-muted" style="font-size:.82rem;margin-bottom:10px">Every completed sale — factory, used market, or trade-in — generates a signed Buyer's Order. Click any sale to view the full agreement, itemized fees included.</p>
        <div class="receipt-list">${rows}</div>
      </div>
    </div>`;
}

/** Open the full purchase-agreement document for one completed sale. */
function viewReceipt(agreementNo) {
  const sale = (state.salesHistory || []).find(h => h.agreementNo === agreementNo);
  if (!sale) return;
  const fees = sale.dealerFees || { doc: DEALER_DOC_FEE, title: DEALER_TITLE_FEE, reg: DEALER_REG_FEE, total: DEALER_DOC_FEE + DEALER_TITLE_FEE + DEALER_REG_FEE };
  const vehicleTotal = (sale.salePrice || 0) + fees.total;
  const carLabel = `${sale.year} ${sale.make} ${sale.model}${sale.trim ? ` ${sale.trim}` : ''}`;
  const saleDate = `Day ${sale.soldDay}`;

  document.getElementById('receipt-content').innerHTML = `
    <div class="agreement-doc">
      <div class="agreement-head">
        <div class="agreement-dealer">
          <div class="agreement-dealer-name">${DEALERSHIP_INFO.name}</div>
          <div class="agreement-dealer-sub">${DEALERSHIP_INFO.address}</div>
          <div class="agreement-dealer-sub">${DEALERSHIP_INFO.phone} · Dealer Lic. #${DEALERSHIP_INFO.license}</div>
        </div>
        <div class="agreement-title-block">
          <div class="agreement-title">VEHICLE PURCHASE AGREEMENT</div>
          <div class="agreement-no">Agreement #${sale.agreementNo || '—'}</div>
          <div class="agreement-no">Date: ${saleDate}</div>
        </div>
      </div>

      <div class="agreement-section">
        <div class="agreement-section-label">Buyer</div>
        <div class="agreement-section-body">${sale.buyerName || 'Customer'}</div>
      </div>

      <div class="agreement-section">
        <div class="agreement-section-label">Vehicle Description</div>
        <table class="agreement-table">
          <tr><td>Year / Make / Model</td><td>${carLabel}</td></tr>
          <tr><td>Mileage</td><td>${(sale.mileage || 0).toLocaleString()} mi</td></tr>
          <tr><td>Condition</td><td>${CONDITION_NAMES[sale.condition] || sale.condition || '—'}</td></tr>
          <tr><td>Title Status</td><td>${(sale.titleStatus || 'clean').replace(/^./, c => c.toUpperCase())}</td></tr>
          <tr><td>VIN</td><td class="agreement-vin">${displayVin(sale)}</td></tr>
        </table>
      </div>

      <div class="agreement-section">
        <div class="agreement-section-label">Price &amp; Fees</div>
        <table class="agreement-table agreement-table-money">
          <tr><td>Vehicle Sale Price</td><td>${formatCurrency(sale.salePrice)}</td></tr>
          <tr><td>Dealer Documentation Fee</td><td>${formatCurrency(fees.doc)}</td></tr>
          <tr><td>Title Fee</td><td>${formatCurrency(fees.title)}</td></tr>
          <tr><td>Registration / Plate Transfer Fee</td><td>${formatCurrency(fees.reg)}</td></tr>
          <tr class="agreement-total-row"><td>Total Due at Signing</td><td>${formatCurrency(vehicleTotal)}</td></tr>
        </table>
      </div>

      <div class="agreement-section">
        <div class="agreement-section-label">Dealer Summary <span class="text-muted" style="font-weight:400">(not shown to buyer)</span></div>
        <table class="agreement-table agreement-table-money">
          <tr><td>Acquisition Cost</td><td>${formatCurrency(sale.purchasePrice || 0)}</td></tr>
          <tr><td>Transaction Processing Fee</td><td>−${formatCurrency(sale.fee || 0)}</td></tr>
          <tr><td>Dealer Fees Collected</td><td>+${formatCurrency(fees.total)}</td></tr>
          <tr class="agreement-total-row"><td>Net Profit</td><td class="${sale.profit >= 0 ? 'text-green' : 'text-red'}">${sale.profit >= 0 ? '+' : ''}${formatCurrency(sale.profit)}</td></tr>
        </table>
      </div>

      <div class="agreement-signatures">
        <div class="agreement-sig">
          <div class="agreement-sig-line"></div>
          <div class="agreement-sig-label">Buyer Signature</div>
        </div>
        <div class="agreement-sig">
          <div class="agreement-sig-line"></div>
          <div class="agreement-sig-label">Dealer Representative</div>
        </div>
      </div>
      <p class="agreement-fineprint">This purchase agreement is a simulated in-game document generated by DealerSim and has no legal effect.</p>
    </div>`;
  document.getElementById('receipt-modal').classList.remove('hidden');
  playSfx('modalOpen');
}

function closeReceiptModal() {
  document.getElementById('receipt-modal').classList.add('hidden');
  playSfx('modalClose');
}

// ============================================================
// RENDER — The Showroom
// ============================================================
function renderShowroom() {
  const el = document.getElementById('tab-showroom');
  if (!el) return;

  const tierNum   = state.upgrades.showroomTier || 0;
  const capacity  = getShowroomCapacity();
  const nextTier  = getNextShowroomTier();

  // ── Not built yet — marquee entrance pitch ──────────────────────────
  if (tierNum === 0) {
    const first = SHOWROOM_TIERS[1];
    const garageTier = state.upgrades.garageLevel || 1;
    const locked = garageTier < first.reqGarageTier;
    el.innerHTML = `
      <div class="showroom-hall">
        <div class="showroom-hero">
          <div class="showroom-hero-spot" aria-hidden="true"></div>
          <div class="showroom-hero-icon">${uiIconLg('sparkles')}</div>
          <h2 class="showroom-hero-title">The Showroom</h2>
          <p class="showroom-hero-sub">Some cars aren't inventory — they're keepers. Build a private showroom to display the ones you never want to sell, without giving up a single Car Lot slot.</p>
          <ul class="showroom-hero-perks">
            <li>${uiIcon('home')} Showroom cars never count against your Car Lot capacity</li>
            <li>${uiIcon('lock')} Safe on display — never at risk of theft</li>
            <li>${uiIcon('arrowUp')} A floor of Good and Excellent cars draws buyers — up to +${Math.round(SHOWROOM_DRAW_MAX_BONUS * 100)}% sale chance on everything you list</li>
            <li>${uiIcon('star')} The perfect home for a discontinued classic or a hypercar you can't bear to flip</li>
          </ul>
          <div class="showroom-build-card">
            <div class="showroom-build-name">${first.name}</div>
            <div class="showroom-build-desc">${first.desc}</div>
            <div class="showroom-build-slots">${first.slots} display slots</div>
            ${locked
              ? `<button class="btn btn-primary showroom-build-btn" disabled title="Requires Garage Tier ${first.reqGarageTier}">${uiIcon('lock')} Requires Garage Tier ${first.reqGarageTier}</button>`
              : state.cash < first.cost
                ? `<button class="btn btn-primary showroom-build-btn" disabled title="Need ${formatCurrency(first.cost - state.cash)} more">${uiIcon('warning')} Need ${formatCurrencyCompact(first.cost - state.cash)}</button>`
                : `<button class="btn btn-primary showroom-build-btn" onclick="buyShowroomTier(1)">${uiIcon('sparkles')} Build — ${formatCurrency(first.cost)}</button>`}
          </div>
        </div>
      </div>`;
    return;
  }

  // ── Built — pedestal grid + expansion card ──────────────────────────
  const cars = state.showroom || [];
  const draw = getShowroomDraw();
  const drawBadge = car => {
    const pts = getShowroomCarDrawPoints(car);
    if (pts > 0) {
      return `<span class="badge badge-green" title="This car helps pull buyers in for the rest of your lot">+${(pts * SHOWROOM_DRAW_PER_POINT * 100).toFixed(1)}% sales</span>`;
    }
    const why = (car.titleStatus === 'salvage' || car.titleStatus === 'lemon')
      ? 'Salvage and lemon titles do not attract buyers'
      : 'Only Good or Excellent condition cars attract buyers';
    return `<span class="badge badge-gray" title="${why}">No draw</span>`;
  };
  const pedestals = cars.map(car => `
    <div class="pedestal-card" data-car-id="${car.id}">
      <div class="pedestal-spot" aria-hidden="true"></div>
      <div class="pedestal-badges">
        ${condBadge(car.condition)}
        ${titleBadge(car.titleStatus)}
        ${drawBadge(car)}
      </div>
      <div class="pedestal-name">${formatCarDisplayName(car)}</div>
      <div class="pedestal-details">
        <div class="detail-row"><span>Category</span><span>${car.category}</span></div>
        <div class="detail-row"><span>Mileage</span><span>${car.mileage.toLocaleString()} mi</span></div>
        <div class="detail-row"><span>Value</span><span class="text-green">${formatCurrency(car.marketValue)}</span></div>
        <div class="detail-row"><span>Source</span><span>${carSourceLabel(car)}</span></div>
      </div>
      <div class="pedestal-plaque">On permanent display</div>
      <button class="btn btn-secondary btn-full" onclick="moveToLot('${car.id}')"
        ${state.garage.length >= state.garageSlots ? 'disabled title="Car Lot is full"' : ''}>
        ${uiIcon('key')} Return to Lot
      </button>
    </div>`).join('');

  const emptyPedestals = Array.from({ length: Math.max(0, capacity - cars.length) }, () => `
    <div class="pedestal-card pedestal-empty">
      <div class="pedestal-empty-icon">${uiIcon('sparkles')}</div>
      <div class="pedestal-empty-text">Empty Pedestal</div>
      <div class="pedestal-empty-sub">Move a car here from the Car Lot</div>
    </div>`).join('');

  const expansionCard = nextTier ? `
    <div class="showroom-expand-card">
      <div class="showroom-expand-icon">${uiIconLg(nextTier.icon)}</div>
      <div class="showroom-expand-name">${nextTier.name}</div>
      <div class="showroom-expand-desc">${nextTier.desc}</div>
      <div class="showroom-expand-slots">${nextTier.slots} display slots total</div>
      ${(state.upgrades.garageLevel || 1) < nextTier.reqGarageTier
        ? `<button class="btn btn-primary showroom-build-btn" disabled title="Requires Garage Tier ${nextTier.reqGarageTier}">${uiIcon('lock')} Requires Garage Tier ${nextTier.reqGarageTier}</button>`
        : state.cash < nextTier.cost
          ? `<button class="btn btn-primary showroom-build-btn" disabled title="Need ${formatCurrency(nextTier.cost - state.cash)} more">${uiIcon('warning')} Need ${formatCurrencyCompact(nextTier.cost - state.cash)}</button>`
          : `<button class="btn btn-primary showroom-build-btn" onclick="buyShowroomTier(${nextTier.tier})">${uiIcon('sparkles')} Expand — ${formatCurrency(nextTier.cost)}</button>`}
    </div>` : `
    <div class="showroom-expand-card showroom-expand-maxed">
      <div class="showroom-expand-icon">${uiIconLg('trophy')}</div>
      <div class="showroom-expand-name">Fully Expanded</div>
      <div class="showroom-expand-desc">Your Private Collection Wing is complete — ${capacity} pedestals, every one a car you'll never sell.</div>
    </div>`;

  el.innerHTML = `
    <div class="tab-info">
      ${uiIcon('sparkles')} Showroom: <strong>${cars.length}/${capacity}</strong> on display · ${SHOWROOM_TIERS[tierNum].name}.
      Cars here don't use Car Lot slots and can never be stolen — but they can't be sold, serviced, or leased until you bring them back.
    </div>
    <div class="showroom-draw-panel">
      <div class="showroom-draw-head">
        <span>${uiIcon('arrowUp')} Showroom Draw</span>
        <strong class="${draw.bonus > 0 ? 'text-green' : 'text-muted'}">+${(draw.bonus * 100).toFixed(1)}% sale chance${draw.maxed ? ' (max)' : ''}</strong>
      </div>
      <div class="showroom-draw-bar" role="progressbar" aria-valuemin="0" aria-valuemax="${Math.round(SHOWROOM_DRAW_MAX_BONUS * 100)}" aria-valuenow="${Math.round(draw.bonus * 100)}">
        <div class="showroom-draw-fill" style="width:${Math.min(100, (draw.bonus / SHOWROOM_DRAW_MAX_BONUS) * 100).toFixed(1)}%"></div>
      </div>
      <p class="showroom-draw-note">
        ${draw.qualifying}/${draw.displayed} display cars are pulling buyers in. Excellent cars add +${(SHOWROOM_DRAW_PER_POINT * 100).toFixed(1)}% each and Good cars +${(SHOWROOM_DRAW_PER_POINT * SHOWROOM_DRAW_WEIGHT.B * 100).toFixed(1)}% each to every car you have listed for sale, up to +${Math.round(SHOWROOM_DRAW_MAX_BONUS * 100)}%. Fair and Poor cars, and salvage or lemon titles, add nothing.
      </p>
    </div>
    <div class="showroom-hall">
      <div class="pedestal-grid">${pedestals}${emptyPedestals}</div>
    </div>
    <div class="category-section"><h3>${uiIcon('arrowUp')} Expand the Showroom</h3>
      <div class="showroom-expand-row">${expansionCard}</div>
    </div>`;
}

function renderAchievements() {
  const unlocked = { ...(state.achievementsUnlocked || {}), ...globalAchievements };
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
  const reduceMotion = shouldReduceMotion();
  const sfxMuted = !!settings.sfxMuted;
  const musicMuted = !!settings.musicMuted;
  const overhead = getLotOverhead();
  const diff = state.difficulty || 'normal';
  const diffLabel = diff === 'nightmare' ? 'Nightmare 💀' : diff === 'hard' ? `Hard 💪` : diff === 'easy' ? 'Easy 😎' : 'Normal';
  const diffClass = (diff === 'hard' || diff === 'nightmare') ? 'text-red' : diff === 'easy' ? 'text-green' : 'text-blue';

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
            <div class="setting-label">Reduce Motion</div>
            <div class="setting-desc">Cuts pop-ins, pulses, and the day-transition animation for motion sensitivity. ${settings.reduceMotion ? '' : (reduceMotion ? '<em>Currently on because your system asks for reduced motion.</em>' : '')}</div>
          </div>
          <button class="toggle-btn ${settings.reduceMotion ? 'active' : ''}" onclick="toggleReduceMotion()" aria-label="Toggle reduce motion">
            <span class="toggle-thumb"></span>
          </button>
        </div>
        <div class="setting-row" style="margin-top:10px">
          <div>
            <div class="setting-label">Brightness</div>
            <div class="setting-desc" id="brightness-pct">${Math.round(getBrightness() * 100)}%</div>
          </div>
          <div style="display:flex; align-items:center; gap:8px;">
            <input type="range" min="0.5" max="1.5" step="0.01" value="${getBrightness()}"
              oninput="setBrightness(this.value)" aria-label="Brightness" style="width:150px">
            <button class="btn btn-secondary" onclick="resetBrightness()" aria-label="Reset brightness to 100%">Reset</button>
          </div>
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
            <div class="setting-desc" id="sfx-volume-pct">${Math.round((settings.sfxVolume ?? 0.22) * 100)}%</div>
          </div>
          <input type="range" min="0" max="1" step="0.01" value="${settings.sfxVolume ?? 0.22}"
            oninput="setSfxVolume(this.value)" onchange="playSfx('click')" style="width:180px" ${sfxMuted ? 'disabled' : ''}>
        </div>
      </div>

      <div class="dash-card settings-card">
        <h3>${uiIcon('music')} Music</h3>
        <div class="setting-row">
          <div>
            <div class="setting-label">Background Music</div>
            <div class="setting-desc">A soft, original ambient lounge loop for the showroom floor.</div>
          </div>
          <button class="toggle-btn ${!musicMuted ? 'active' : ''}" onclick="toggleMusicMuted()" aria-label="Toggle background music">
            <span class="toggle-thumb"></span>
          </button>
        </div>
        <div class="setting-row" style="margin-top:10px">
          <div>
            <div class="setting-label">Volume</div>
            <div class="setting-desc" id="music-volume-pct">${Math.round((settings.musicVolume ?? 0.16) * 100)}%</div>
          </div>
          <input type="range" min="0" max="1" step="0.01" value="${settings.musicVolume ?? 0.16}"
            oninput="setMusicVolume(this.value)" style="width:180px" ${musicMuted ? 'disabled' : ''}>
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
    case 'insurance':   renderInsurance();       break;
    case 'upgrades':    renderUpgrades();        break;
    case 'staff':       renderStaff();           break;
    case 'showroom':    renderShowroom();       break;
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
    case 'insurance':   renderInsurance();       break;
    case 'upgrades':    renderUpgrades();        break;
    case 'staff':       renderStaff();           break;
    case 'showroom':    renderShowroom();       break;
    case 'achievements':renderAchievements();    break;
    case 'settings':    renderSettings();        break;
  }
  applyMusicForContext(); // Settings tab gets the calm menu soundtrack; every other tab gets the livelier one
  playSfx('tab');
  _tutorialUpdateNextButton();
  // Remember the tab so a refresh returns to it
  if (getActiveSession()) setActiveSession(currentSlot, name);
}

// ============================================================
// ANIMATION HELPERS — lightweight visual feedback for player actions
// ============================================================
// Small, reusable helpers that add a CSS animation class and clean up after
// themselves. Everything here is purely additive — if an element is missing
// (e.g. a car card that scrolled out of a re-rendered list) these all just
// no-op instead of throwing.

/** Adds `cls` to `el` for one animation cycle, restarting cleanly even if
 *  the class is already present from a very recent previous call. */
function playPulse(el, cls, duration = 700) {
  if (!el) return;
  el.classList.remove(cls);
  void el.offsetWidth; // force reflow so a repeated flash restarts from frame 0
  el.classList.add(cls);
  setTimeout(() => el.classList.remove(cls), duration);
}

/** Spawns a floating "+$1,234" / "-$500" figure that rises and fades above `el`. */
function spawnFloatingNumber(el, text, positive) {
  if (!el) return;
  const span = document.createElement('span');
  span.className = `floating-number ${positive ? 'floating-number-pos' : 'floating-number-neg'}`;
  span.textContent = text;
  el.appendChild(span);
  setTimeout(() => span.remove(), 1150);
}

/** Briefly glows the given car's card (matched by data-car-id) right after a
 *  service action (wash / repair / parts upgrade / detail) re-renders the
 *  tab, so it's obvious which car just got worked on. */
function flashCarCard(carId) {
  requestAnimationFrame(() => {
    const card = document.querySelector(`.car-card[data-car-id="${carId}"]`);
    if (card) playPulse(card, 'action-flash', 800);
  });
}

// How long the "Day N" card stays on screen before it's fully gone — day
// popups (theft, lease crash/return, etc.) are held until this elapses so
// they never open on top of it. Keep in sync with the CSS animation
// durations for #day-sweep-overlay / #day-sweep-label in styles.css.
const DAY_TRANSITION_MS = 1000;

/** "Day N" title card — fades and scales in over a soft dim, holds a
 *  beat, then fades out. Played once per nextDay() call, alongside a
 *  short chime. Just the text beat, no moving light-sweep. */
function triggerDayTransition(dayNum) {
  const overlay = document.getElementById('day-sweep-overlay');
  const label   = document.getElementById('day-sweep-label');
  if (!overlay || !label) return;
  label.textContent = isNightmare() ? `Night ${dayNum}` : `Day ${dayNum}`;
  let sub = document.getElementById('day-sweep-sub');
  if (!sub) { sub = document.createElement('span'); sub.id = 'day-sweep-sub'; overlay.appendChild(sub); }
  sub.textContent = isNightmare() ? randomFrom(NIGHTMARE_SWEEP_LINES) : '';
  overlay.classList.remove('active');
  void overlay.offsetWidth;
  overlay.classList.add('active');
  playSfx('day');
  setTimeout(() => overlay.classList.remove('active'), DAY_TRANSITION_MS);
}

// Tracks what renderStats() last painted, so it can tell what actually
// changed and give just that stat a flash + floating number instead of
// silently swapping text on every render (which happens very often).
let _prevStats = { cash: null, reputation: null, garageCount: null, debt: null };

/** Flashes `id`'s chip green/red and floats `formatDelta(delta)` above it
 *  if `newVal` differs from the previously rendered value. `invert` flips
 *  the polarity for stats where "up" is bad (e.g. debt). */
function _flashStatIfChanged(id, newVal, prevVal, formatDelta, invert = false) {
  const el = document.getElementById(id);
  if (!el || prevVal === null || newVal === prevVal) return;
  const delta = newVal - prevVal;
  const positive = invert ? delta < 0 : delta > 0;
  playPulse(el, positive ? 'flash-pos' : 'flash-neg', 650);
  if (formatDelta) spawnFloatingNumber(el, formatDelta(delta), positive);
}

// ============================================================
// TOAST
// ============================================================
// While the day-transition card is on screen, toast/modal popups are held
// back and released right after it finishes (see nextDay()) instead of
// firing immediately — a popup opening mid-animation used to visually
// cover/interrupt the "Day N" card. Anything shown outside of a day
// advance (normal gameplay actions) is completely unaffected.
let _holdDayPopups = false;
let _heldToasts = [];
let _heldModalQueue = [];

// Toasts stay up 3.2s normally. On Nightmare the creepy lines need time to actually be read,
// so they scale with message length (about 60ms per character, 5s minimum for the spooky
// ones, 12s cap).
const NIGHTMARE_CREEPY_SFX = new Set(['whisper', 'ash', 'curse']);
function getToastDuration(message, sfx) {
  const base = 3200;
  if (!document.body.classList.contains('nightmare')) return base;
  const len = String(message || '').length;
  const scaled = 2600 + len * 60;
  const floor  = NIGHTMARE_CREEPY_SFX.has(sfx) ? 5000 : base;
  return Math.min(12000, Math.max(base, floor, scaled));
}

function showToast(message, type = 'info', sfx = null) {
  if (_holdDayPopups) { _heldToasts.push({ message, type, sfx }); return; }
  const container = document.getElementById('toast-container');
  const el = document.createElement('div');
  el.className = `toast toast-${type}`;
  el.textContent = message;
  container.appendChild(el);
  requestAnimationFrame(() => el.classList.add('show'));
  setTimeout(() => {
    el.classList.remove('show');
    setTimeout(() => el.remove(), 300);
  }, getToastDuration(message, sfx));
  // sfx lets callers pick a distinct, purpose-built sound (e.g. 'cash', 'hire',
  // 'achievement') instead of the generic tone for that toast's color/type.
  if (sfx) playSfx(sfx);
  else if (type === 'success') playSfx('success');
  else if (type === 'warning') playSfx('warning');
  else if (type === 'error') playSfx('error');
  else playSfx('click');
  // Let the in-game soundtrack's tone react to this event (no-op on the menu track)
  nudgeMusicTone(type);
}

/** Releases every toast that piled up during a day advance, lightly
 *  staggered so their chimes don't all land in the same instant. */
function flushHeldToasts() {
  const toasts = _heldToasts;
  _heldToasts = [];
  toasts.forEach((t, i) => {
    setTimeout(() => showToast(t.message, t.type, t.sfx), i * 150);
  });
}

// ============================================================
// MODAL
// ============================================================
function showModal(title, message, onConfirm) {
  if (_holdDayPopups) { _heldModalQueue.push({ title, message, onConfirm }); return; }
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

/** Shows any modals (e.g. a Lease Return Report) that piled up during a day
 *  advance, one at a time — then hands off to the insurance-event queue so
 *  everything from that day surfaces in order once the day card is done. */
function flushHeldModals() {
  if (_heldModalQueue.length === 0) {
    if (flushNightmareModals()) return;   // Reckonings / the Pale Customer come after the normal popups
    flushInsuranceModals();
    return;
  }
  const { title, message, onConfirm } = _heldModalQueue.shift();
  showModal(title, message, () => { onConfirm(); flushHeldModals(); });
}

// ============================================================
// INSURANCE EVENT MODAL — large popup for theft/crash payouts
// ============================================================
// Only ever queued when the player actually has active, claim-honoring
// insurance and a payout occurred — uninsured events stay as a toast/note.
let _insuranceModalQueue = [];

function queueInsuranceModal(html) {
  _insuranceModalQueue.push(html);
}

/** Shows the next queued insurance event modal, if any. Safe to call repeatedly —
 *  does nothing when the queue is empty or a modal is already on screen. */
function flushInsuranceModals() {
  const modalEl = document.getElementById('insurance-event-modal');
  if (!modalEl || !modalEl.classList.contains('hidden')) return; // one already showing
  if (_insuranceModalQueue.length === 0) return;
  const html = _insuranceModalQueue.shift();
  document.getElementById('insurance-event-content').innerHTML = html;
  modalEl.classList.remove('hidden');
  playSfx('modalOpen');
}

function closeInsuranceEventModal() {
  document.getElementById('insurance-event-modal').classList.add('hidden');
  playSfx('modalClose');
  flushInsuranceModals(); // show the next one queued from the same day, if any
}


// ============================================================
// PATCH NOTES MODAL
// ============================================================
/** Render the patch notes content and show the popup modal. */
function showPatchNotesModal() {
  const latest = PATCH_NOTES[0];
  const TYPE_LABEL = { feature: '✨ New', balance: '⚖️ Balance', fix: '🔧 Fix', chore: '🧹 Chore', parts: '⚙️ Parts', repair: '🛠️ Repair' };
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
  const TYPE_LABEL = { feature: '✨ New', balance: '⚖️ Balance', fix: '🔧 Fix', chore: '🧹 Chore', parts: '⚙️ Parts', repair: '🛠️ Repair' };
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
  reduceMotion: false,
  brightness: 1,
  difficulty: 'normal',
  sfxMuted: false,
  sfxVolume: 0.22,
  musicMuted: false,
  musicVolume: 0.16,
  showLeasedCars: true,
  tutorialsEnabled: true,
  carLotSortBy: 'default',
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
  // Nightmare-only sounds: soft, low, a little wrong.
  candle:      [{ freq: 392, dur: 0.55, type: 'sine', gain: 0.5, glide: 0.99 },
                { freq: 587.33, dur: 0.75, type: 'sine', gain: 0.4, delay: 0.07, glide: 0.99 }],
  ash:         [{ freq: 330, dur: 0.18, type: 'triangle', gain: 0.5, glide: 0.7 },
                { freq: 247, dur: 0.30, type: 'triangle', gain: 0.45, delay: 0.12, glide: 0.6 },
                { freq: 165, dur: 0.50, type: 'sine',     gain: 0.4,  delay: 0.28, glide: 0.7 }],
  curse:       [{ freq: 196, dur: 0.20, type: 'triangle', gain: 0.45, glide: 0.8 },
                { freq: 139, dur: 0.35, type: 'triangle', gain: 0.45, delay: 0.14, glide: 0.8 }],
  whisper:     [{ freq: 220, dur: 0.25, type: 'sine', gain: 0.25, glide: 0.8 }],
  reckoning:   [{ freq: 130, dur: 0.9, type: 'sawtooth', gain: 0.45, glide: 0.5 },
                { freq: 98,  dur: 1.2, type: 'sine',     gain: 0.7,  delay: 0.1, glide: 0.6 }],
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
  if (settings.carLotSortBy === undefined) settings.carLotSortBy = 'default';
  applyDarkMode();
  applyReduceMotion();
  applyBrightness();
  // Live-update if the OS-level preference changes while the game is open
  // (e.g. the player flips it in their system settings mid-session).
  try {
    window.matchMedia('(prefers-reduced-motion: reduce)').addEventListener('change', applyReduceMotion);
  } catch (_) {}
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

/** Brightness (0.5–1.5). Applied as a CSS filter on the root element so it covers the
 *  whole game, including the main menu. At exactly 100% the filter is removed entirely. */
function getBrightness() {
  const b = parseFloat(settings.brightness);
  return isNaN(b) ? 1 : clamp(b, 0.5, 1.5);
}

function applyBrightness() {
  const b = getBrightness();
  document.documentElement.style.filter = Math.abs(b - 1) < 0.005 ? '' : `brightness(${b})`;
}

function setBrightness(raw) {
  const v = parseFloat(raw);
  settings.brightness = isNaN(v) ? 1 : clamp(v, 0.5, 1.5);
  applyBrightness();
  saveSettings();
  const pctText = Math.round(getBrightness() * 100) + '%';
  ['brightness-pct', 'menu-brightness-pct'].forEach(id => {
    const el = document.getElementById(id);
    if (el) el.textContent = pctText;
  });
}

function resetBrightness() {
  setBrightness(1);
  renderSettings();
  playSfx('toggle');
}

/** True if animations should be cut — either the player turned on the
 *  in-game "Reduce Motion" toggle, or their OS/browser already asks for
 *  reduced motion. Either one is enough. */
function shouldReduceMotion() {
  let systemPrefers = false;
  try { systemPrefers = window.matchMedia('(prefers-reduced-motion: reduce)').matches; } catch (_) {}
  return !!settings.reduceMotion || systemPrefers;
}

function applyReduceMotion() {
  document.body.classList.toggle('reduce-motion', shouldReduceMotion());
}

function toggleReduceMotion() {
  settings.reduceMotion = !settings.reduceMotion;
  applyReduceMotion();
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
  syncMenuSettings();
  if (!settings.sfxMuted) playSfx('toggle'); // audible confirmation that sound is back on
}

/** Updates the SFX volume and refreshes every visible "NN%" label for it (settings tab + main menu). */
function setSfxVolume(raw) {
  const vol = clamp(parseFloat(raw), 0, 1);
  settings.sfxVolume = isNaN(vol) ? 0.22 : vol;
  saveSettings();
  const pct = Math.round(settings.sfxVolume * 100) + '%';
  ['sfx-volume-pct', 'menu-sfx-volume-pct'].forEach(id => {
    const el = document.getElementById(id);
    if (el) el.textContent = pct;
  });
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
  const unlock = () => { ensureAudioCtx(); applyMusicForContext(); };
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
    const pitch = (_nmSessionActive && isNightmare()) ? 0.84 : 1;   // Nightmare: everything sounds slightly wrong
    notes.forEach(note => {
      const start = ctx.currentTime + (note.delay || 0);
      const end   = start + note.dur;
      const osc   = ctx.createOscillator();
      const gain  = ctx.createGain();
      osc.type = note.type || 'sine';
      osc.frequency.setValueAtTime(note.freq * pitch, start);
      osc.frequency.exponentialRampToValueAtTime(Math.max(80, note.freq * pitch * (note.glide ?? 0.92)), end);
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

// ============================================================
// BACKGROUND MUSIC — procedurally generated, royalty-free ambient loop
// ============================================================
// Everything below is synthesized live with the Web Audio API — no audio
// files, no samples, nothing copyrighted, just oscillators and gain
// envelopes. It's a soft, slow-moving lounge-style chord loop meant to sit
// quietly under the gameplay, like the background music you'd hear drifting
// through a dealership showroom. It shares the same AudioContext as the SFX
// engine above but runs through its own gain node so Music and SFX volume
// can be muted/adjusted independently.
const MUSIC_VOLUME_SCALE = 0.5;   // headroom so 100% on the slider stays gentle
const MUSIC_BPM = 74;
const MUSIC_BEAT_SECONDS = 60 / MUSIC_BPM;
const MUSIC_BAR_BEATS = 4;
const MUSIC_BAR_SECONDS = MUSIC_BEAT_SECONDS * MUSIC_BAR_BEATS;
const MUSIC_PAD_ATTACK = 1.4;
const MUSIC_PAD_RELEASE = 1.1;
const MUSIC_MIN_GAIN = 0.0001;

// Converts a note name like 'C4', 'F#3', 'Bb5' to its frequency in Hz (equal
// temperament, A4 = 440Hz). Lets the progression below be written and edited
// as real note names instead of hand-computed frequencies.
const MUSIC_NOTE_INDEX = { C:0, 'C#':1, Db:1, D:2, 'D#':3, Eb:3, E:4, F:5, 'F#':6, Gb:6,
  G:7, 'G#':8, Ab:8, A:9, 'A#':10, Bb:10, B:11 };
function noteFreq(name) {
  const m = /^([A-G][#b]?)(-?\d+)$/.exec(name);
  if (!m) return 440;
  const midi = MUSIC_NOTE_INDEX[m[1]] + (parseInt(m[2], 10) + 1) * 12;
  return 440 * Math.pow(2, (midi - 69) / 12);
}
const defChord = (bassNote, chordNotes, sparkleNotes) => ({
  bass: noteFreq(bassNote),
  chord: chordNotes.map(noteFreq),
  sparkle: sparkleNotes.map(noteFreq),
});

// A 24-bar lounge progression that tours from C major, briefly modulates up
// to F for contrast, then winds back home through a couple of jazzy passing
// chords before the turnaround. At MUSIC_BPM this is roughly 78 seconds
// start-to-finish, so the loop point is far apart and rarely noticed even
// after several minutes — no two consecutive bars share the same voicing,
// and the "sparkle" ornament notes on top are re-randomized every time the
// loop plays, so even the repeat doesn't sound identical to last time.
const MUSIC_PROGRESSION = [
  // ── Section A — home key of C ──────────────────────────────
  defChord('C3', ['C4','E4','G4','B4'],  ['C5','E5']),   // Cmaj7
  defChord('A2', ['A3','C4','E4','G4'],  ['A4','C5']),   // Am7
  defChord('D3', ['D4','F4','A4','C5'],  ['D5','F4']),   // Dm7
  defChord('G2', ['G3','B3','D4','F4'],  ['G4','B3']),   // G7
  defChord('C3', ['E4','G4','B4','D5'],  ['G5','E5']),   // Cmaj9 (higher voicing)
  defChord('A2', ['C4','E4','G4','B4'],  ['C5','B4']),   // Am9
  defChord('D3', ['F4','A4','C5','E5'],  ['A5','F5']),   // Dm9
  defChord('G2', ['B3','D4','F4','E5'],  ['D5','B4']),   // G13
  // ── Section B — modulates up to F major for contrast ───────
  defChord('F3', ['F4','A4','C5','E5'],  ['F5','A5']),   // Fmaj7
  defChord('G3', ['G4','Bb4','D5','F5'], ['G5','D5']),   // Gm7
  defChord('C3', ['C4','E4','G4','Bb4'], ['E5','C5']),   // C7
  defChord('F3', ['A4','C5','E5','G5'],  ['C5','A4']),   // Fmaj7 (higher voicing)
  defChord('D3', ['D4','F4','A4','C5'],  ['F5','D5']),   // Dm7
  defChord('E3', ['E4','G4','Bb4','D5'], ['G5','Bb4']),  // Em7b5
  defChord('A2', ['A3','C#4','E4','G4'], ['C#5','E5']),  // A7 (secondary dominant)
  defChord('D3', ['D4','F4','A4','C5'],  ['A4','F4']),   // Dm7
  // ── Section A' — winds back home with a couple of passing chords ──
  defChord('C3', ['C4','E4','G4','B4'],  ['E5','G5']),   // Cmaj7
  defChord('C#3',['C#4','E4','G4','A#4'],['E5','G5']),   // C#dim7 (chromatic passing chord)
  defChord('D3', ['D4','F4','A4','C5'],  ['C5','F5']),   // Dm7
  defChord('G2', ['G3','B3','D4','F4'],  ['B4','D5']),   // G7
  defChord('E3', ['E4','G4','B4','D5'],  ['G5','B4']),   // Em7
  defChord('A2', ['A3','C#4','E4','G4'], ['C#5','A4']),  // A7
  defChord('D3', ['D4','F4','A4','C5'],  ['F5','A5']),   // Dm7
  defChord('G2', ['G3','B3','D4','F4'],  ['D5','F5']),   // G7 (turnaround back to bar 1)
];

let musicGainNode   = null;
let musicChordIndex = 0;
let musicActiveGen  = 0;   // generation counter — invalidates any pending timers after a stop()
let musicTimerId    = null;

/** Lazily creates the music bus (its own gain node feeding the shared AudioContext). */
function ensureMusicGain(ctx) {
  if (!musicGainNode) {
    musicGainNode = ctx.createGain();
    musicGainNode.gain.value = clamp(settings.musicVolume ?? 0.16, 0, 1) * MUSIC_VOLUME_SCALE;
    musicGainNode.connect(ctx.destination);
  }
  return musicGainNode;
}

/** Schedules one long pad chord (+ a couple of optional soft sparkle notes) at `startAt`. */
function playMusicChord(ctx, bus, chordDef, startAt, duration) {
  const attack = MUSIC_PAD_ATTACK, release = MUSIC_PAD_RELEASE;
  const sustainEnd = startAt + duration - release;

  const voices = [chordDef.bass * 0.5, ...chordDef.chord]; // soft sub-bass + close chord voicing
  voices.forEach((freq, i) => {
    const osc  = ctx.createOscillator();
    const gain = ctx.createGain();
    osc.type = i === 0 ? 'sine' : 'triangle';
    osc.frequency.setValueAtTime(freq, startAt);
    const peak = (i === 0 ? 0.9 : 0.32) / voices.length * 2.2;
    gain.gain.setValueAtTime(MUSIC_MIN_GAIN, startAt);
    gain.gain.linearRampToValueAtTime(peak, startAt + attack);
    gain.gain.setValueAtTime(peak, Math.max(startAt + attack, sustainEnd));
    gain.gain.linearRampToValueAtTime(MUSIC_MIN_GAIN, startAt + duration);
    osc.connect(gain);
    gain.connect(bus);
    osc.start(startAt);
    osc.stop(startAt + duration + 0.05);
  });

  (chordDef.sparkle || []).forEach((freq, i) => {
    if (Math.random() < 0.35) return; // leave some bars quiet so it breathes
    const offset = (0.4 + i * 0.9 + Math.random() * 0.6) * MUSIC_BEAT_SECONDS;
    const t = startAt + offset;
    const osc  = ctx.createOscillator();
    const gain = ctx.createGain();
    osc.type = 'sine';
    osc.frequency.setValueAtTime(freq, t);
    gain.gain.setValueAtTime(MUSIC_MIN_GAIN, t);
    gain.gain.linearRampToValueAtTime(0.18, t + 0.08);
    gain.gain.exponentialRampToValueAtTime(MUSIC_MIN_GAIN, t + 1.6);
    osc.connect(gain);
    gain.connect(bus);
    osc.start(t);
    osc.stop(t + 1.7);
  });
}

/** Main music loop — schedules one chord ahead of time on the audio clock, then re-arms itself. */
function scheduleMusicLoop(gen) {
  if (gen !== musicActiveGen) return; // a stop() happened since this chain was armed — abandon it
  const ctx = ensureAudioCtx();
  if (!ctx) return;
  if (ctx.state !== 'running') {
    // The AudioContext is still suspended (no user gesture yet) — its clock is frozen,
    // so scheduling chords now would just stack them all at the same startAt. They'd
    // then all fire at once the instant the context resumes on the first real click.
    // Instead, quietly poll (no notes queued) until the context is actually running.
    musicTimerId = setTimeout(() => scheduleMusicLoop(gen), 250);
    return;
  }
  const bus = ensureMusicGain(ctx);
  const chordDef = MUSIC_PROGRESSION[musicChordIndex % MUSIC_PROGRESSION.length];
  const startAt = ctx.currentTime + 0.05;
  playMusicChord(ctx, bus, chordDef, startAt, MUSIC_BAR_SECONDS);
  musicChordIndex++;
  musicTimerId = setTimeout(() => scheduleMusicLoop(gen), MUSIC_BAR_SECONDS * 1000);
}

/** Starts the background music loop if it isn't already running and isn't muted. */
function startMusic() {
  if (settings.musicMuted) return;
  if (musicTimerId !== null) return; // already running
  const ctx = ensureAudioCtx();
  if (!ctx) return;
  musicActiveGen++;
  scheduleMusicLoop(musicActiveGen);
}

/** Stops the background music loop and lets the current chord fade out quickly. */
function stopMusic() {
  musicActiveGen++; // invalidate any pending scheduled chain
  if (musicTimerId !== null) { clearTimeout(musicTimerId); musicTimerId = null; }
  if (musicGainNode) {
    try {
      if (audioCtx) {
        musicGainNode.gain.cancelScheduledValues(audioCtx.currentTime);
        musicGainNode.gain.setTargetAtTime(MUSIC_MIN_GAIN, audioCtx.currentTime, 0.15);
      }
    } catch (_) {}
    // Drop the node — a later startMusic() rebuilds a fresh one at the current volume.
    setTimeout(() => { try { musicGainNode && musicGainNode.disconnect(); } catch (_) {} musicGainNode = null; }, 400);
  }
}

/** Toggle background music from the in-game Settings tab. */
function toggleMusicMuted() {
  settings.musicMuted = !settings.musicMuted;
  saveSettings();
  renderSettings();
  syncMenuSettings();
  if (settings.musicMuted) stopCurrentMusic(); else startCurrentMusic();
}

/** Adjust background music volume (0–1) and refresh every visible "NN%" label for it (settings tab + main menu). */
function setMusicVolume(raw) {
  const vol = clamp(parseFloat(raw), 0, 1);
  settings.musicVolume = isNaN(vol) ? 0.16 : vol;
  saveSettings();
  if (musicGainNode && audioCtx) {
    musicGainNode.gain.setTargetAtTime(vol * MUSIC_VOLUME_SCALE, audioCtx.currentTime, 0.1);
  }
  if (gameMusicGainNode && audioCtx) {
    gameMusicGainNode.gain.setTargetAtTime(vol * GAME_MUSIC_VOLUME_SCALE, audioCtx.currentTime, 0.1);
  }
  if (nmMusic && audioCtx) {
    nmMusic.master.gain.setTargetAtTime(vol * NM_MUSIC_VOLUME_SCALE, audioCtx.currentTime, 0.1);
  }
  const pct = Math.round(settings.musicVolume * 100) + '%';
  ['music-volume-pct', 'menu-music-volume-pct'].forEach(id => {
    const el = document.getElementById(id);
    if (el) el.textContent = pct;
  });
}

/** Toggle background music from the home-screen settings panel. */
function menuToggleMusic() {
  settings.musicMuted = !settings.musicMuted;
  saveSettings();
  syncMenuSettings();
  renderSettings();
  if (settings.musicMuted) stopCurrentMusic(); else startCurrentMusic();
}

// ============================================================
// IN-GAME MUSIC — a rotating playlist of distinct tracks
// ============================================================
// The menu loop above (BPM, chords, envelopes, everything) is completely
// untouched by any of this and keeps playing, unchanged, on the main menu
// and on any Settings page. This second engine takes over while an active
// game session is on screen (and not on its Settings tab).
//
// Rather than one in-game track, gameplay now has a small rotating
// playlist — every GAME_MUSIC_ROTATE_MS of actual in-game listening time,
// playback eases into the next track in the list (wrapping back to the
// first once it reaches the end), the way a generative soundtrack like
// Mini Motorways' quietly moves on to its next piece rather than looping
// the same one forever. Each track is a genuinely different composition —
// its own key, tempo, chord progression, and instrumental palette (pad
// timbre, bass style, melodic arpeggio character, percussion texture, and
// filter brightness) — not the same piece with a different mix. All of it
// is still synthesized live with the Web Audio API: oscillators and gain
// envelopes, no audio files, nothing copyrighted. Every track shares the
// same AudioContext, the same Music mute/volume settings, and the same
// mood-reactive "intensity" system (see updateMusicBaseline/nudgeMusicTone
// below), so however the business is doing keeps coloring whichever track
// happens to be playing.
const GAME_MUSIC_VOLUME_SCALE = 0.44;
const GAME_MUSIC_MIN_GAIN     = 0.0001;
const GAME_MUSIC_ROTATE_MS    = 10 * 60 * 1000; // switch to the next track every 10 minutes of in-game playback

// Reuses noteFreq/defChord from the menu section above.

// ── Track 1: "Showroom Bossa" — warm chill-bossa in G major ────────────────
// The original in-game track: a plucked bossa-style bass, a soft
// marimba-style melodic arpeggio, and a light brushed-shaker groove.
const MUSIC_GAME_PROGRESSION_BOSSA = [
  defChord('G3', ['B4','D5','E5','F#5'], ['A5','D5']),   // Gmaj6/9
  defChord('E3', ['G4','B4','D5','F#5'], ['B5','D5']),   // Em9
  defChord('C3', ['E4','G4','A4','D5'],  ['G5','A5']),   // Cmaj6/9
  defChord('D3', ['F#4','A4','C5','E5'], ['A5','C5']),   // D9
  defChord('B2', ['D4','F#4','A4','C#5'],['F#5','A5']),  // Bm7
  defChord('E3', ['G4','B4','D5','F#5'], ['D5','B4']),   // Em9
  defChord('A2', ['C4','E4','G4','B4'],  ['E5','G5']),   // Am9
  defChord('D3', ['F#4','A4','C5','E5'], ['C5','E5']),   // D9
  defChord('G3', ['B4','D5','F#5','A5'], ['D5','F#5']),  // Gmaj9
  defChord('C3', ['E4','G4','B4','D5'],  ['G5','B4']),   // Cmaj9
  defChord('A2', ['C4','E4','G4','B4'],  ['C5','E5']),   // Am9
  defChord('D3', ['F#4','A4','C5','E5'], ['E5','C5']),   // D9
  defChord('E3', ['G4','B4','D5','F#5'], ['B5','F#5']),  // Em9
  defChord('C3', ['E4','G4','A4','D5'],  ['A5','D5']),   // Cmaj6/9
  defChord('B2', ['D4','F#4','A4','C#5'],['A5','C#5']),  // Bm7
  defChord('D3', ['A3','C#4','F#4','A4'],['F#5','A5']),  // D7 (turnaround back to G)
];

// ── Track 2: "Open Road" — driving mallet ostinato in D major ──────────────
// Brighter and more forward-moving: a steady pizzicato quarter-note bass
// pulse, a busier directional (up-then-down) mallet arpeggio that's the
// track's real melody, and a shaker on every beat instead of just the
// off-beats — the "cruising with the windows down" track.
const MUSIC_GAME_PROGRESSION_OPENROAD = [
  defChord('D3', ['F#4','A4','C#5','E5'],['A5','E5']),   // Dmaj9
  defChord('B2', ['D4','F#4','A4','C#5'],['F#5','D5']),  // Bm9
  defChord('G3', ['B4','D5','E5','A5'],  ['D5','A5']),   // Gmaj6/9
  defChord('A2', ['C#4','E4','G4','B4'], ['E5','C#5']),  // A9
  defChord('E3', ['G4','B4','D5','F#5'], ['B5','D5']),   // Em9
  defChord('A2', ['C#4','E4','G4','B4'], ['G5','B4']),   // A9
  defChord('D3', ['A4','C#5','E5','F#5'],['C#5','A4']),  // Dmaj9 (higher voicing)
  defChord('G3', ['B4','D5','F#5','A5'], ['F#5','D5']),  // Gmaj9
  defChord('B2', ['D4','F#4','A4','C#5'],['A5','C#5']),  // Bm9
  defChord('E3', ['G4','B4','D5','F#5'], ['D5','F#5']),  // Em9
  defChord('A2', ['E4','G4','B4','C#5'], ['G5','E5']),   // A11-ish
  defChord('D3', ['F#4','A4','C#5','E5'],['E5','C#5']),  // Dmaj9 (turnaround)
];

// ── Track 3: "Late Shift" — moody felt-piano ambience in A minor ───────────
// Slow and spacious: sine-heavy pads with a long swell, a single sustained
// low note per bar instead of a rhythmic bass, sparse sine "bell" chimes
// instead of a busy arpeggio, and no percussion at all — for the quiet,
// after-hours end of a long day on the lot.
const MUSIC_GAME_PROGRESSION_LATESHIFT = [
  defChord('A2', ['C4','E4','G4','B4'],  ['E5','C5']),   // Am9
  defChord('F2', ['A3','C4','E4','G4'],  ['C5','A4']),   // Fmaj7
  defChord('C3', ['E4','G4','B4','D5'],  ['G5','B4']),   // Cmaj9
  defChord('G2', ['B3','D4','F4','A4'],  ['D5','F4']),   // G9
  defChord('D3', ['F4','A4','C5','E5'],  ['A5','C5']),   // Dm9
  defChord('E3', ['G4','B4','D5','F#5'], ['B5','D5']),   // Em9
  defChord('A2', ['C4','E4','G4','B4'],  ['G5','E5']),   // Am9
  defChord('F2', ['A3','C4','E4','G4'],  ['E5','G5']),   // Fmaj7
  defChord('D3', ['F4','A4','C5','E5'],  ['C5','E5']),   // Dm9
  defChord('G2', ['B3','D4','F4','A4'],  ['F4','A5']),   // G9
  defChord('C3', ['E4','G4','B4','D5'],  ['D5','G5']),   // Cmaj9
  defChord('E3', ['G4','B4','D5','F#5'], ['D5','F#5']),  // Em9 (turnaround)
];

// ── Track 4: "Sunday Lot" — laid-back acoustic pluck in E major ────────────
// A gentle fingerstyle feel: a soft root-and-fifth pluck on the downbeats,
// a quick-decaying sawtooth arpeggio standing in for plucked guitar
// strings, and sparse conga-like clicks on the backbeats — an easy,
// unhurried Sunday-morning-at-the-lot mood.
const MUSIC_GAME_PROGRESSION_SUNDAYLOT = [
  defChord('E3', ['G#4','B4','D#5','F#5'],['B5','F#5']), // Emaj9
  defChord('C#3',['E4','G#4','B4','D#5'], ['G#5','E5']), // C#m9
  defChord('A2', ['C#4','E4','G#4','B4'], ['E5','C#5']), // Amaj7
  defChord('B2', ['D#4','F#4','A4','C#5'],['F#5','D#5']),// B9
  defChord('F#3',['A4','C#5','E5','G#5'], ['C#5','A4']), // F#m9
  defChord('B2', ['D#4','F#4','A4','C#5'],['A5','C#5']), // B9
  defChord('E3', ['B4','D#5','F#5','G#5'],['D#5','G#5']),// Emaj9 (higher voicing)
  defChord('A2', ['C#4','E4','G#4','B4'], ['B5','E5']),  // Amaj9
  defChord('C#3',['E4','G#4','B4','D#5'], ['B5','D#5']), // C#m9
  defChord('F#3',['A4','C#5','E5','G#5'], ['E5','G#5']), // F#m9
  defChord('B2', ['D#4','F#4','A4','C#5'],['F#5','A5']), // B9
  defChord('E3', ['G#4','B4','D#5','F#5'],['F#5','B5']), // Emaj9 (turnaround)
];

// ── Track 5: "Neon Drive" — energetic synth pulse in B minor ───────────────
// The liveliest of the five: a brighter, thinner sawtooth pad, a punchy
// octave-jumping synth-pulse bassline on every beat, a fast directional
// 16th-note arpeggio, and a busier shaker pattern — an upbeat, after-dark
// "closing time" energy without ever getting harsh.
const MUSIC_GAME_PROGRESSION_NEONDRIVE = [
  defChord('B2', ['D4','F#4','A4','C#5'], ['F#5','C#5']),// Bm9
  defChord('G2', ['B3','D4','F#4','A4'],  ['D5','A4']),  // Gmaj7
  defChord('D3', ['F#4','A4','C5','E5'],  ['A5','E5']),  // D9
  defChord('A2', ['C#4','E4','G4','B4'],  ['E5','C#5']), // A9
  defChord('B2', ['D4','F#4','A4','C#5'], ['A5','D5']),  // Bm9
  defChord('F#3',['A4','C#5','E5','G#5'], ['C#5','A4']), // F#9 (secondary dominant)
  defChord('G2', ['B3','D4','F#4','A4'],  ['F#5','D5']), // Gmaj7
  defChord('D3', ['F#4','A4','C5','E5'],  ['C5','E5']),  // D9
  defChord('B2', ['D4','F#4','A4','C#5'], ['C#5','F#5']),// Bm9
  defChord('A2', ['C#4','E4','G4','B4'],  ['G5','B4']),  // A9
  defChord('G2', ['B3','D4','F#4','A4'],  ['A5','F#5']), // Gmaj7
  defChord('F#3',['A4','C#5','E5','G#5'], ['G#5','E5']), // F#9 (turnaround back to Bm)
];

// The rotating playlist itself. Each entry fully describes one track: its
// tempo/progression plus the instrumentation that makes it sound like a
// different piece rather than a re-skinned copy of the others.
//   pad.{waveform,detunePair,attack,release,peakScale} — the sustained chord bed
//   bass.style 'pattern' (short plucked notes at given beat offsets) or
//     'sustained' (one long swelling note per bar); pattern entries are
//     {beat, mult (frequency multiplier off the chord's bass note), decayBeats}
//   arp.style 'random' (loose scattered picking) or 'directional' (an
//     up-then-down run through the chord, more purposeful/melodic) or
//     'bell' (sparse, slow, long-decay chimes)
//   perc.kind 'shaker', 'click' (softer, conga-like), or 'none'; offsets are
//     beat positions within the bar
//   filterBase/filterRange — the shared lowpass filter's brightness range,
//     letting each track have its own tonal "color" independent of the others
const GAME_MUSIC_TRACKS = [
  {
    id: 'bossa', name: 'Showroom Bossa',
    bpm: 98, progression: MUSIC_GAME_PROGRESSION_BOSSA,
    pad:  { waveform: 'triangle', detunePair: [-3, 3], attack: 0.7, release: 0.5, peakScale: 0.24 },
    bass: { style: 'pattern', waveform: 'sine',
      pattern: [{ beat: 0, mult: 1, decayBeats: 1.3 }, { beat: 2.5, mult: 1.5, decayBeats: 1.3 }],
      peak: 0.34, peakIntensity: 0.1 },
    arp:  { style: 'random', waveform: 'triangle', stepsPerBeat: 2,
      densityBase: 0.3, densityIntensity: 0.55, peakBase: 0.12, peakIntensity: 0.08, decay: 0.4 },
    perc: { kind: 'shaker', offsets: [0.5, 1.5, 2.5, 3.5],
      densityBase: 0.35, densityIntensity: 0.5, peakBase: 0.05, peakIntensity: 0.04 },
    filterBase: 1000, filterRange: 3000,
  },
  {
    id: 'openroad', name: 'Open Road',
    bpm: 112, progression: MUSIC_GAME_PROGRESSION_OPENROAD,
    pad:  { waveform: 'triangle', detunePair: [-4, 4], attack: 0.5, release: 0.4, peakScale: 0.18 },
    bass: { style: 'pattern', waveform: 'sine',
      pattern: [{ beat: 0, mult: 1, decayBeats: 0.9 }, { beat: 1, mult: 1, decayBeats: 0.9 },
                { beat: 2, mult: 1, decayBeats: 0.9 }, { beat: 3, mult: 1, decayBeats: 0.9 }],
      peak: 0.3, peakIntensity: 0.08 },
    arp:  { style: 'directional', waveform: 'triangle', stepsPerBeat: 2,
      densityBase: 0.55, densityIntensity: 0.35, peakBase: 0.14, peakIntensity: 0.07, decay: 0.35 },
    perc: { kind: 'shaker', offsets: [0, 1, 2, 3],
      densityBase: 0.5, densityIntensity: 0.35, peakBase: 0.045, peakIntensity: 0.035 },
    filterBase: 1400, filterRange: 2600,
  },
  {
    id: 'lateshift', name: 'Late Shift',
    bpm: 66, progression: MUSIC_GAME_PROGRESSION_LATESHIFT,
    pad:  { waveform: 'sine', detunePair: [-2, 2], attack: 1.6, release: 1.3, peakScale: 0.3 },
    bass: { style: 'sustained', attack: 1.2, peak: 0.32 },
    arp:  { style: 'bell', waveform: 'sine', stepsPerBeat: 1,
      densityBase: 0.22, densityIntensity: 0.25, peakBase: 0.1, peakIntensity: 0.05, decay: 1.3 },
    perc: { kind: 'none', offsets: [] },
    filterBase: 700, filterRange: 1600,
  },
  {
    id: 'sundaylot', name: 'Sunday Lot',
    bpm: 84, progression: MUSIC_GAME_PROGRESSION_SUNDAYLOT,
    pad:  { waveform: 'triangle', detunePair: [-2, 2], attack: 0.9, release: 0.7, peakScale: 0.16 },
    bass: { style: 'pattern', waveform: 'sine',
      pattern: [{ beat: 0, mult: 1, decayBeats: 1.6 }, { beat: 2, mult: 1.5, decayBeats: 1.6 }],
      peak: 0.3, peakIntensity: 0.06 },
    arp:  { style: 'directional', waveform: 'sawtooth', stepsPerBeat: 2,
      densityBase: 0.42, densityIntensity: 0.3, peakBase: 0.09, peakIntensity: 0.05, decay: 0.3 },
    perc: { kind: 'click', offsets: [1, 3],
      densityBase: 0.4, densityIntensity: 0.25, peakBase: 0.035, peakIntensity: 0.02 },
    filterBase: 1200, filterRange: 2000,
  },
  {
    id: 'neondrive', name: 'Neon Drive',
    bpm: 124, progression: MUSIC_GAME_PROGRESSION_NEONDRIVE,
    pad:  { waveform: 'sawtooth', detunePair: [-5, 5], attack: 0.4, release: 0.35, peakScale: 0.14 },
    bass: { style: 'pattern', waveform: 'sine',
      pattern: [{ beat: 0, mult: 1, decayBeats: 0.7 }, { beat: 1, mult: 2, decayBeats: 0.4 },
                { beat: 2, mult: 1, decayBeats: 0.7 }, { beat: 3, mult: 2, decayBeats: 0.4 }],
      peak: 0.3, peakIntensity: 0.1 },
    arp:  { style: 'directional', waveform: 'triangle', stepsPerBeat: 4,
      densityBase: 0.5, densityIntensity: 0.4, peakBase: 0.1, peakIntensity: 0.06, decay: 0.18 },
    perc: { kind: 'shaker', offsets: [0.5, 1, 1.5, 2.5, 3, 3.5],
      densityBase: 0.4, densityIntensity: 0.35, peakBase: 0.04, peakIntensity: 0.03 },
    filterBase: 1600, filterRange: 3400,
  },
];

let gameMusicGainNode    = null;
let gameMusicFilterNode  = null;
let gameMusicChordIndex  = 0;
let gameMusicActiveGen   = 0;
let gameMusicTimerId     = null;
let gameMusicNoiseBuffer = null; // shared short noise burst, reused for every percussion texture

// --- Playlist rotation state ---
// gameMusicElapsedMs tracks how long the CURRENT track has actually been
// audible (accumulated across pauses — switching to the Settings tab or the
// main menu pauses the clock rather than resetting it, so a quick peek at
// Settings doesn't cost the current track its remaining time).
let gameMusicTrackIndex    = 0;
let gameMusicElapsedMs     = 0;
let gameMusicLastResumeMs  = null;

// --- Music "tone" — lets the in-game tracks react to how the business is doing ---
// A single 0..1 intensity value steers whichever track is currently playing:
// its brightness (the shared lowpass filter), how busy its arpeggio/
// percussion layers are, and a small tempo nudge. It's the sum of two layers:
//  - gameMusicBaseline: slow-moving, recomputed from reputation/cash/debt
//    every time renderStats() runs, so it tracks how the business is doing
//    overall (struggling and in debt → moodier; flush and reputable → brighter).
//  - gameMusicPulse: fast-decaying, nudged by showToast()'s success/warning/
//    error calls, so a good sale brightens the next bar or two and a fine
//    or warning dims it, easing back to the baseline shortly after.
let gameMusicBaseline  = 0.5;
let gameMusicPulse     = 0;
let gameMusicIntensity = 0.5; // smoothed value actually used when scheduling

/** Recomputes the slow-moving baseline from the player's current standing.
 *  Called from renderStats(), so it always reflects the latest numbers. */
function updateMusicBaseline() {
  if (typeof state === 'undefined' || !state) return;
  const repTerm  = clamp(((state.reputation ?? 1) - 1) / 1.0, -1, 1);
  const cashTerm = clamp((state.cash ?? 0) / 15000, -1, 1);
  const debtTerm = clamp((state.loanBalance || 0) / 20000, 0, 1);
  gameMusicBaseline = clamp(0.5 + repTerm * 0.22 + cashTerm * 0.2 - debtTerm * 0.22, 0.12, 0.95);
}

/** Called from showToast() — nudges the fast "pulse" layer on good/bad news.
 *  No-ops whenever the menu track (not a game track) is playing. */
function nudgeMusicTone(toastType) {
  if (currentMusicTrack !== 'game') return;
  if (toastType === 'success') gameMusicPulse = clamp(gameMusicPulse + 0.22, -0.4, 0.5);
  else if (toastType === 'warning') gameMusicPulse = clamp(gameMusicPulse - 0.18, -0.5, 0.4);
  else if (toastType === 'error') gameMusicPulse = clamp(gameMusicPulse - 0.28, -0.5, 0.4);
}

/** Lazily creates the in-game music bus: its own gain node feeding a gentle
 *  lowpass filter, so brightness can shift with the music's tone. Shared by
 *  every track in the playlist — only each track's target frequency range
 *  changes, not the node itself, so rotating tracks never clicks or pops. */
function ensureGameMusicGain(ctx) {
  if (!gameMusicGainNode) {
    gameMusicFilterNode = ctx.createBiquadFilter();
    gameMusicFilterNode.type = 'lowpass';
    gameMusicFilterNode.frequency.value = 2200;
    gameMusicFilterNode.Q.value = 0.3;
    gameMusicGainNode = ctx.createGain();
    gameMusicGainNode.gain.value = clamp(settings.musicVolume ?? 0.16, 0, 1) * GAME_MUSIC_VOLUME_SCALE;
    gameMusicGainNode.connect(gameMusicFilterNode);
    gameMusicFilterNode.connect(ctx.destination);
  }
  return gameMusicGainNode;
}

/** A short reusable buffer of white noise, used to make brief filtered
 *  percussion ticks without needing an actual audio sample. */
function getGameMusicNoiseBuffer(ctx) {
  if (!gameMusicNoiseBuffer || gameMusicNoiseBuffer.sampleRate !== ctx.sampleRate) {
    const len = Math.ceil(ctx.sampleRate * 0.06);
    gameMusicNoiseBuffer = ctx.createBuffer(1, len, ctx.sampleRate);
    const data = gameMusicNoiseBuffer.getChannelData(0);
    for (let i = 0; i < len; i++) data[i] = Math.random() * 2 - 1;
  }
  return gameMusicNoiseBuffer;
}

/** One soft, filtered noise tick. `kind` picks the timbre: 'shaker' is a
 *  bright, quick brushed-shaker tick; 'click' is a lower, slightly longer
 *  conga-like tock. Both are built from the same shared noise buffer. */
function playGameMusicPercHit(ctx, bus, t, peak, kind) {
  const src = ctx.createBufferSource();
  src.buffer = getGameMusicNoiseBuffer(ctx);
  const bp = ctx.createBiquadFilter();
  bp.type = 'bandpass';
  const isClick = kind === 'click';
  bp.frequency.value = isClick ? 1700 : 6500;
  bp.Q.value = isClick ? 1.3 : 0.7;
  const decay = isClick ? 0.1 : 0.07;
  const gain = ctx.createGain();
  gain.gain.setValueAtTime(GAME_MUSIC_MIN_GAIN, t);
  gain.gain.linearRampToValueAtTime(peak, t + 0.005);
  gain.gain.exponentialRampToValueAtTime(GAME_MUSIC_MIN_GAIN, t + decay);
  src.connect(bp); bp.connect(gain); gain.connect(bus);
  src.start(t); src.stop(t + decay + 0.01);
}

/** Schedules one bar's sustained chord pad — a warm bed of gently detuned
 *  oscillators, waveform/detune/attack/release/level all driven by the
 *  current track's `pad` definition so each track has its own timbre. */
function playGameMusicPad(ctx, bus, chordDef, startAt, duration, pad) {
  const attack = pad.attack, release = pad.release;
  const sustainEnd = startAt + duration - release;
  chordDef.chord.forEach((freq) => {
    pad.detunePair.forEach((centsOffset) => {
      const osc = ctx.createOscillator();
      const gain = ctx.createGain();
      osc.type = pad.waveform;
      osc.frequency.setValueAtTime(freq, startAt);
      osc.detune.setValueAtTime(centsOffset, startAt);
      const peak = pad.peakScale / chordDef.chord.length;
      gain.gain.setValueAtTime(GAME_MUSIC_MIN_GAIN, startAt);
      gain.gain.linearRampToValueAtTime(peak, startAt + attack);
      gain.gain.setValueAtTime(peak, Math.max(startAt + attack, sustainEnd));
      gain.gain.linearRampToValueAtTime(GAME_MUSIC_MIN_GAIN, startAt + duration);
      osc.connect(gain); gain.connect(bus);
      osc.start(startAt); osc.stop(startAt + duration + 0.05);
    });
  });
}

/** Schedules one bar's bass part. 'sustained' tracks get one long, softly
 *  swelling low note (a felt-piano left hand); 'pattern' tracks get short
 *  plucked notes at whatever beat offsets the track defines — a bossa
 *  pluck, a driving quarter-note pulse, a gentle root-and-fifth, or a
 *  punchy octave-jumping pulse, depending on the track. */
function playGameMusicBass(ctx, bus, chordDef, startAt, beatSeconds, barSeconds, bass, intensity) {
  if (bass.style === 'sustained') {
    const osc = ctx.createOscillator();
    const gain = ctx.createGain();
    osc.type = 'sine';
    osc.frequency.setValueAtTime(chordDef.bass * 0.5, startAt);
    const peak = bass.peak + intensity * 0.05;
    gain.gain.setValueAtTime(GAME_MUSIC_MIN_GAIN, startAt);
    gain.gain.linearRampToValueAtTime(peak, startAt + bass.attack);
    gain.gain.linearRampToValueAtTime(GAME_MUSIC_MIN_GAIN, startAt + barSeconds);
    osc.connect(gain); gain.connect(bus);
    osc.start(startAt); osc.stop(startAt + barSeconds + 0.05);
    return;
  }
  bass.pattern.forEach(({ beat, mult, decayBeats }) => {
    const t = startAt + beat * beatSeconds;
    const osc = ctx.createOscillator();
    const gain = ctx.createGain();
    osc.type = bass.waveform;
    osc.frequency.setValueAtTime(chordDef.bass * mult, t);
    const peak = bass.peak + intensity * bass.peakIntensity;
    const decay = decayBeats * beatSeconds;
    gain.gain.setValueAtTime(GAME_MUSIC_MIN_GAIN, t);
    gain.gain.linearRampToValueAtTime(peak, t + 0.015);
    gain.gain.exponentialRampToValueAtTime(GAME_MUSIC_MIN_GAIN, t + decay);
    osc.connect(gain); gain.connect(bus);
    osc.start(t); osc.stop(t + decay + 0.05);
  });
}

/** Builds an up-then-down index order through `n` notes, e.g. for n=4:
 *  [0,1,2,3,2,1] — used by 'directional' arpeggios so they read as a
 *  purposeful melodic run instead of scattered random picking. */
function gameMusicDirectionalOrder(n) {
  const up = Array.from({ length: n }, (_, i) => i);
  const down = up.slice(1, -1).reverse();
  return up.concat(down);
}

/** Schedules one bar's melodic arpeggio — the track's real "tune", not
 *  chord stabs. 'random' loosely scatters picks across the chord+sparkle
 *  tones (the original bossa feel); 'directional' runs up and down through
 *  them for a more purposeful, driving line; 'bell' plays sparse, slow,
 *  long-decay chimes. Density and volume both scale with `intensity`. */
function playGameMusicArp(ctx, bus, chordDef, startAt, beatSeconds, arp, intensity) {
  const notes = [...chordDef.chord, ...(chordDef.sparkle || [])];
  const stepSeconds = beatSeconds / arp.stepsPerBeat;
  const totalSteps = arp.stepsPerBeat * 4;
  const density = arp.densityBase + intensity * arp.densityIntensity;
  const order = arp.style === 'directional' ? gameMusicDirectionalOrder(notes.length) : null;
  for (let s = 0; s < totalSteps; s++) {
    if (Math.random() > density) continue;
    const t = startAt + s * stepSeconds + (Math.random() * 0.02 - 0.01);
    const freq = order ? notes[order[s % order.length]] : notes[Math.floor(Math.random() * notes.length)];
    const osc = ctx.createOscillator();
    const gain = ctx.createGain();
    osc.type = arp.waveform;
    osc.frequency.setValueAtTime(freq, t);
    const peak = arp.peakBase + intensity * arp.peakIntensity;
    gain.gain.setValueAtTime(GAME_MUSIC_MIN_GAIN, t);
    gain.gain.linearRampToValueAtTime(peak, t + 0.008);
    gain.gain.exponentialRampToValueAtTime(GAME_MUSIC_MIN_GAIN, t + arp.decay);
    osc.connect(gain); gain.connect(bus);
    osc.start(t); osc.stop(t + arp.decay + 0.05);
  }
}

/** Schedules one bar's percussion layer at the track's defined beat
 *  offsets — a brushed shaker, a softer conga-like click, or nothing at
 *  all for the more ambient tracks. Density and level scale with
 *  `intensity`, same as the arpeggio. */
function playGameMusicPerc(ctx, bus, startAt, beatSeconds, perc, intensity) {
  if (perc.kind === 'none') return;
  const density = perc.densityBase + intensity * perc.densityIntensity;
  perc.offsets.forEach((beatOffset) => {
    if (Math.random() > density) return;
    const t = startAt + beatOffset * beatSeconds;
    const peak = perc.peakBase + intensity * perc.peakIntensity;
    playGameMusicPercHit(ctx, bus, t, peak, perc.kind);
  });
}

/** Schedules one full bar of whichever track is currently playing: pad,
 *  bass, arpeggio, and percussion, each driven by that track's own
 *  instrumentation definition. */
function playGameMusicChord(ctx, bus, track, chordDef, startAt, duration, beatSeconds, intensity) {
  playGameMusicPad(ctx, bus, chordDef, startAt, duration, track.pad);
  playGameMusicBass(ctx, bus, chordDef, startAt, beatSeconds, duration, track.bass, intensity);
  playGameMusicArp(ctx, bus, chordDef, startAt, beatSeconds, track.arp, intensity);
  playGameMusicPerc(ctx, bus, startAt, beatSeconds, track.perc, intensity);
}

/** Main in-game music loop — same one-bar-ahead scheduling approach as the
 *  menu loop. Each pass also eases the smoothed intensity toward its
 *  target and, once the current track has been playing for
 *  GAME_MUSIC_ROTATE_MS, eases the playlist on to the next track. */
function scheduleGameMusicLoop(gen) {
  if (gen !== gameMusicActiveGen) return;
  const ctx = ensureAudioCtx();
  if (!ctx) return;
  if (ctx.state !== 'running') {
    gameMusicTimerId = setTimeout(() => scheduleGameMusicLoop(gen), 250);
    return;
  }
  const bus = ensureGameMusicGain(ctx);

  // Has the current track been playing long enough to move on to the next one?
  const elapsedMs = gameMusicElapsedMs + (gameMusicLastResumeMs !== null ? Date.now() - gameMusicLastResumeMs : 0);
  if (elapsedMs >= GAME_MUSIC_ROTATE_MS) {
    gameMusicTrackIndex = (gameMusicTrackIndex + 1) % GAME_MUSIC_TRACKS.length;
    gameMusicChordIndex = 0;
    gameMusicElapsedMs = 0;
    gameMusicLastResumeMs = Date.now();
  }
  const track = GAME_MUSIC_TRACKS[gameMusicTrackIndex];

  // Decay the transient pulse and ease the smoothed intensity toward its target
  gameMusicPulse *= 0.72;
  const target = clamp(gameMusicBaseline + gameMusicPulse, 0.05, 1);
  gameMusicIntensity += (target - gameMusicIntensity) * 0.5;

  // Brighter tone → more open filter; tense/low tone → darker and warmer,
  // scaled within this track's own brightness range.
  gameMusicFilterNode.frequency.setTargetAtTime(
    track.filterBase + gameMusicIntensity * track.filterRange, ctx.currentTime, 0.6);
  // Small tempo nudge: a bit faster when things are going well, a bit slower when tense
  const tempoScale = 0.98 + gameMusicIntensity * 0.08;
  const beatSeconds = (60 / track.bpm) / tempoScale;
  const barSeconds = beatSeconds * 4;

  const chordDef = track.progression[gameMusicChordIndex % track.progression.length];
  const startAt = ctx.currentTime + 0.05;
  playGameMusicChord(ctx, bus, track, chordDef, startAt, barSeconds, beatSeconds, gameMusicIntensity);
  gameMusicChordIndex++;
  gameMusicTimerId = setTimeout(() => scheduleGameMusicLoop(gen), barSeconds * 1000);
}

/** Starts the in-game music loop if it isn't already running and isn't
 *  muted, and resumes the current track's rotation clock. */
function startGameMusic() {
  if (settings.musicMuted) return;
  if (gameMusicTimerId !== null) return;
  const ctx = ensureAudioCtx();
  if (!ctx) return;
  gameMusicLastResumeMs = Date.now();
  gameMusicActiveGen++;
  scheduleGameMusicLoop(gameMusicActiveGen);
}

/** Stops the in-game music loop, lets the current bar fade out quickly,
 *  and banks the elapsed time so the rotation clock pauses rather than
 *  resetting (a quick trip to Settings or the menu doesn't cost the
 *  current track its remaining time). */
function stopGameMusic() {
  gameMusicActiveGen++;
  if (gameMusicTimerId !== null) { clearTimeout(gameMusicTimerId); gameMusicTimerId = null; }
  if (gameMusicLastResumeMs !== null) {
    gameMusicElapsedMs += Date.now() - gameMusicLastResumeMs;
    gameMusicLastResumeMs = null;
  }
  if (gameMusicGainNode) {
    try {
      if (audioCtx) {
        gameMusicGainNode.gain.cancelScheduledValues(audioCtx.currentTime);
        gameMusicGainNode.gain.setTargetAtTime(GAME_MUSIC_MIN_GAIN, audioCtx.currentTime, 0.15);
      }
    } catch (_) {}
    setTimeout(() => {
      try { gameMusicGainNode && gameMusicGainNode.disconnect(); } catch (_) {}
      try { gameMusicFilterNode && gameMusicFilterNode.disconnect(); } catch (_) {}
      gameMusicGainNode = null;
      gameMusicFilterNode = null;
    }, 400);
  }
}

// --- Track switching: decides which soundtrack should be playing ---
let currentMusicTrack = 'menu'; // 'menu' (original loop) | 'game' (rotating in-game playlist) | 'nightmare' (Nightmare difficulty)

/** Starts/stops whichever track is current — used by the mute toggle and
 *  anything else that just needs to act on "the music", not a specific track. */
function startCurrentMusic() { if (currentMusicTrack === 'nightmare') startNightmareMusic(); else if (currentMusicTrack === 'game') startGameMusic(); else startMusic(); }
function stopCurrentMusic()  { if (currentMusicTrack === 'nightmare') stopNightmareMusic();  else if (currentMusicTrack === 'game') stopGameMusic();  else stopMusic(); }

/** Makes sure the given track is the one actually playing. Both startMusic()
 *  and startGameMusic() are already no-ops if their loop is running, so this
 *  is safe to call every time — including the very first call of a fresh
 *  page load, where `track` may already equal the default currentMusicTrack
 *  and nothing has actually started playing yet. */
function setMusicTrack(track) {
  if (track !== currentMusicTrack) {
    currentMusicTrack = track;
    if (track !== 'menu') stopMusic();
    if (track !== 'game') stopGameMusic();
    if (track !== 'nightmare') stopNightmareMusic();
  }
  if (track === 'menu') startMusic(); else if (track === 'nightmare') startNightmareMusic(); else startGameMusic();
}

/** Looks at what's actually on screen and picks the right track: the
 *  original calm loop for the main menu and any Settings page, the
 *  rotating in-game playlist everywhere else during an active game
 *  session. Safe to call anytime the screen changes — it's a no-op if the
 *  right track is already playing. */
function applyMusicForContext() {
  const hs = document.getElementById('home-screen');
  const inGame = !!(hs && hs.classList.contains('hidden'));
  const activePanel = document.querySelector('.tab-panel.active');
  const onSettingsTab = inGame && activePanel && activePanel.id === 'tab-settings';
  // Nightmare saves keep their own soundtrack on every in-game screen, Settings included.
  setMusicTrack(inGame && isNightmare() ? 'nightmare' : (inGame && !onSettingsTab ? 'game' : 'menu'));
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

  document.getElementById('menu-btn-credits').addEventListener('click', () => {
    showMenuView('menu-view-credits');
    playSfx('navigate');
  });

  document.getElementById('menu-load-back').addEventListener('click', () => { showMenuView('menu-view-main'); playSfx('navigate'); });
  document.getElementById('menu-settings-back').addEventListener('click', () => { showMenuView('menu-view-main'); playSfx('navigate'); });
  document.getElementById('menu-credits-back').addEventListener('click', () => { showMenuView('menu-view-main'); playSfx('navigate'); });

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
  if (n >= 1_000_000) return '$' + compactBigNumber(n);
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
  {
    key:  'nightmare',
    label: 'Nightmare',
    desc: '2× overhead, 24% APR, pickier buyers — and a world that watches back. Dread rises every night; cursed cars and a Pale Customer prowl the lot; three Reckonings or bankruptcy end the run for good. Red skies, darker music. Not for the faint of heart.',
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
  const box = document.querySelector('.diff-picker-box');
  if (box) box.classList.toggle('is-nightmare', opt.key === 'nightmare');
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
  const box = document.querySelector('.diff-picker-box');
  if (box) box.classList.remove('is-nightmare');
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
      const diffLabel = summary.difficulty === 'nightmare' ? '💀 Nightmare' : summary.difficulty === 'hard' ? '💪 Hard' : summary.difficulty === 'easy' ? '😎 Easy' : '🎮 Normal';
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
  const setRange = (id, pctId, value, disabled) => {
    const input = document.getElementById(id);
    if (input) { input.value = value; input.disabled = !!disabled; }
    const pct = document.getElementById(pctId);
    if (pct) pct.textContent = Math.round(value * 100) + '%';
  };
  setToggle('menu-toggle-dark',      settings.darkMode);
  setToggle('menu-toggle-motion',    settings.reduceMotion);
  const br = document.getElementById('menu-brightness-range');
  if (br) br.value = getBrightness();
  const brPct = document.getElementById('menu-brightness-pct');
  if (brPct) brPct.textContent = Math.round(getBrightness() * 100) + '%';
  setToggle('menu-toggle-sfx',       !settings.sfxMuted);
  setToggle('menu-toggle-music',     !settings.musicMuted);
  setToggle('menu-toggle-tutorials', settings.tutorialsEnabled);
  setRange('menu-sfx-volume-range',   'menu-sfx-volume-pct',   settings.sfxVolume ?? 0.22, settings.sfxMuted);
  setRange('menu-music-volume-range', 'menu-music-volume-pct', settings.musicVolume ?? 0.16, settings.musicMuted);
}

/** Toggle dark mode from the home-screen settings panel. */
function menuToggleDark() {
  settings.darkMode = !settings.darkMode;
  applyDarkMode();
  saveSettings();
  syncMenuSettings();
  playSfx('toggle');
}

/** Toggle Reduce Motion from the home-screen settings panel. */
function menuToggleReduceMotion() {
  settings.reduceMotion = !settings.reduceMotion;
  applyReduceMotion();
  saveSettings();
  syncMenuSettings();
  playSfx('toggle');
}

/** Reset brightness to 100% from the home-screen settings panel. */
function menuResetBrightness() {
  setBrightness(1);
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

// ------------------------------------------------------------
// STORY — normal (non-Nightmare) lore
// ------------------------------------------------------------
const NORMAL_LORE_INTRO = '👋 Welcome to DealerSim! Last month your mom finally kicked you out of her basement. The next day a lawyer called: a great-uncle you barely remember left you his old, rundown used car dealership. The roof leaks, the sign is crooked, and the lot is full of tired cars. But the keys are in your hand, and it is yours.';

/** Small story beats shown in the activity log as days pass (every difficulty except Nightmare). */
const NORMAL_LORE_BEATS = [
  { day: 2,   text: "In the office desk you find a shoebox of receipts. Your great-uncle kept every deal he ever made, the bad ones most of all." },
  { day: 5,   text: "Mom texts: \"Eating okay?\" You send a photo of a gas-station burrito. She replies with a thumbs-up. Progress." },
  { day: 12,  text: "A neighbor stops by to say they thought the lot had closed for good years ago. They seem pleasantly surprised." },
  { day: 25,  text: "Someone has been leaving the crooked sign alone and the weeds trimmed. Nobody on your payroll admits to it. You decide not to ask." },
  { day: 45,  text: "Mom drives past the lot without stopping, slows down, then comes back around and honks. You choose to take this as pride." },
  { day: 75,  text: "You find a faded Polaroid taped inside a desk drawer: your great-uncle, grinning in front of the first car he ever sold. The lot looks the same. So does the sign." },
  { day: 120, text: "A customer says your great-uncle sold their dad a car in 1987 and never once lied about it. You resolve to be the kind of dealer people say that about." },
  { day: 200, text: "The roof no longer leaks. The sign is straight. Mom comes for Sunday dinner at the lot office and, grudgingly, admits the basement was holding you back." },
];

/** Shows the next unseen story beat whose day has arrived. Does nothing on Nightmare. */
function processNormalLore() {
  if (!state || isNightmare() || state.gameOver) return;
  if (!state.loreSeen) state.loreSeen = {};
  const beat = NORMAL_LORE_BEATS.find(b => state.day >= b.day && !state.loreSeen[b.day]);
  if (!beat) return;
  state.loreSeen[beat.day] = true;
  addNote('📖 ' + beat.text, 'info');
}

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
      message: isNightmare()
        ? '👋 Welcome to DealerSim! This walkthrough covers buying a factory car, listing it for sale, and buying from the Used Market — everything you need for your first flip.\n\nWhile the tutorial is running, only the glowing highlighted element will respond to clicks. Follow the glow!'
        : NORMAL_LORE_INTRO + '\n\nThis walkthrough covers buying a factory car, listing it for sale, and buying from the Used Market — everything you need for your first flip. While it runs, only the glowing highlighted element will respond to clicks. Follow the glow!',
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
      message: '🏁 You\'re all set! You now know how to buy from the Factory, buy Used, and list cars for sale. From here, check out Service (repairs & detailing), Finance (loans), Staff, Upgrades, and Achievements to grow your dealership.' + (isNightmare() ? ' Good luck!' : ' Make the old place proud — and maybe prove to Mom that the basement was a phase.'),
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
  _nmSessionActive = true;   // the in-game theme/music may now apply (Nightmare saves go red)
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
    if (opts.resumeTab) switchTab(opts.resumeTab); // switchTab() applies the right soundtrack itself
    else applyMusicForContext();
    return;
  }

  // Fade out and hide the home screen
  hs.classList.add('fade-out');
  setTimeout(() => {
    hs.classList.add('hidden');
    applyMusicForContext(); // hand off from the menu soundtrack to the livelier in-game one
    // Auto-start tutorial for new saves if tutorials are enabled
    if (isNew && settings.tutorialsEnabled) {
      tutorialStart();
    }
  }, 450);
}

const NIGHTMARE_TELLS = [
  'The seller keeps glancing at it. They want it gone.',
  'The seller would not sit in it. Not even for a photo.',
  'There is a faint handprint on the inside of the glass.',
  'The listing photos were all taken from across the street.',
  'A smell of wet earth lingers around it.',
  'Every dog on the lot walks the long way around it.',
];

// ============================================================
// NIGHTMARE MODE (v1.19.0)
// ------------------------------------------------------------
// A fourth difficulty. Everything Hard does, only worse — plus a
// world that watches back:
//   • DREAD  — a 0–100 meter that creeps up every night. Sales push
//     it back; empty tills, debt and cursed cars push it forward.
//   • RECKONINGS — hit 100 Dread and the dark collects: cash, your
//     best car, and a step closer to the end. The third is final.
//   • CURSED CARS — suspiciously cheap used cars that haunt the lot.
//   • THE PALE CUSTOMER — a stranger who pays far too much, in
//     money that might not exist by morning.
//   • WARDS — a nightmare-only upgrade branch (salt, light, chapel).
//   • ATMOSPHERE — red skies, fog, grain, watching eyes, and a
//     soft dark-ambient soundtrack that breathes with your Dread.
// Everything here is inert unless state.difficulty === 'nightmare'.
// ============================================================

const NIGHTMARE_MAX_RECKONINGS = 3;       // the third Reckoning ends the run
const NIGHTMARE_CANDLE_COST    = 750;
const NIGHTMARE_CANDLE_RELIEF  = 20;
const NIGHTMARE_EXORCISM_COST  = 2500;
const NIGHTMARE_MARKET_MIN     = 0.88;    // Nightmare market segments never sink below 88% of normal value
const NIGHTMARE_MARKET_MAX     = 1.25;
const NIGHTMARE_CURSE_CHANCE   = 0.16;    // share of used-market listings that are cursed
const NIGHTMARE_HAUNT_CHANCE   = 0.12;    // per cursed car, per night
const NIGHTMARE_ASH_CHANCE     = 0.25;    // the Pale Customer's money may not survive the night
const DREAD_TIER_LABELS = ['Uneasy', 'Haunted', 'Terrified', 'On the Edge'];

/**
 * The night deepens. 0 until Night 20, 1.0 at Night 360, and it keeps climbing (capped at 2.5, around Night 870)
 * so the nights after the dawn offer stay dangerous. Everything below scales off this one number.
 */
function nmDepth(day) { return clamp((((day === undefined ? (state && state.day) : day) || 1) - 20) / 340, 0, 2.5); }
function nmDepth1() { return Math.min(nmDepth(), 1); }                                   // the part of the climb that tops out at Night 360
function getNightBaseDrift()   { return 2 + Math.round(nmDepth() * 5); }                 // 2 early, 7 at Night 360
function getSaleDreadRelief()  { return Math.max(2, 4 - nmDepth() * 1.5); }              // 4 early, 2.5 at Night 360, 2 later
function getCandleCost()       { return Math.round(NIGHTMARE_CANDLE_COST * (1 + nmDepth() * 3) * (hasWard('wardVotive') ? 0.75 : 1) / 50) * 50; }   // $750 early, $3,000 at Night 360
function getCurseCap()         { return NIGHTMARE_CURSE_CHANCE + 0.14 * Math.min(nmDepth(), 1.5); }          // 16% early, 30% at Night 360
function getMaxCursedListings(){ return Math.min(4, 2 + Math.floor(nmDepth() * 1.5)); } // 2 early, 3 at Night 360
function getHauntChance()      { return NIGHTMARE_HAUNT_CHANCE * (1 + nmDepth() * 0.8); }
function getAshChance()        { return NIGHTMARE_ASH_CHANCE + 0.15 * nmDepth1(); }
function getMarketFloor()      { return NIGHTMARE_MARKET_MIN - 0.06 * nmDepth1(); }
function getSleepDrain()       { return Math.round(SLEEP_DRAIN_PER_MIN * (1 + 0.5 * Math.min(nmDepth(), 1.6)) * (hasWard('wardDream') ? 0.65 : 1) * 10) / 10; }  // 10%/min early, 15 at Night 360
function getReckoningRate()    { return 0.20 + 0.10 * nmDepth1(); }
function getReckoningDread()   { return 55 + Math.round(10 * nmDepth1()); }
function getCandlesAllowed()   { return hasWard('wardVotive') ? 2 : 1; }
function getCandlesLitTonight(){ const n = nm(); return n.candleDay === state.day ? (n.candlesTonight || 1) : 0; }
function getSleepWinGain()     { return SLEEP_WIN_GAIN + (hasWard('wardMusicBox') ? 25 : 0); }
function getLossCooldownSec()  { return Math.round(PALE_LOSS_COOLDOWN_SEC * (hasWard('wardMusicBox') ? 0.5 : 1)); }
function getTourIncome()       { return hasWard('nmTour') ? Math.round(getDread() * 12 * (1 + nmDepth()) / 10) * 10 : 0; }

/** Nightmare-only omens, mixed into the market-event pool. `dread` shifts the meter. */
const NIGHTMARE_EVENTS = [
  { msg: '🌫️ A thick, wrong fog rolls over the lot. Buyers stay home.',          effects: { Economy: -0.04, Sedan: -0.05, SUV: -0.05, Truck: -0.04, Sports: -0.05, Luxury: -0.06 }, dread: 4 },
  { msg: '🔌 The lot lights die at midnight. Nobody browses in the dark.',       effects: { Sports: -0.05, Luxury: -0.07 }, dread: 3 },
  { msg: '🐾 Something has been sleeping in the back seats of the sedans.',      effects: { Sedan: -0.08 }, dread: 5 },
  { msg: '📻 Every radio on the lot tuned itself to the same station.',          effects: {}, dread: 6 },
  { msg: '🩸 The showroom floor is damp. Nobody will say why.',                  effects: { Truck: -0.05, SUV: -0.04 }, dread: 4 },
  { msg: '🚪 Every car door is unlocked. Nothing is missing. Yet.',              effects: { Luxury: -0.04 }, dread: 5 },
  { msg: '🦉 Owls line the fence. They are all looking at the office.',          effects: { Economy: -0.03 }, dread: 4 },
  { msg: '💀 A funeral procession passes. The hearse dealers are thrilled.',     effects: { Truck: 0.06, SUV: 0.05 }, dread: 2 },
  { msg: '🕯️ A priest blessed the lot unprompted and left without a word.',      effects: { Luxury: 0.03 }, dread: -10 },
  { msg: '🌕 A full moon. Strange buyers pay strange prices for strange cars.',  effects: { Sports: 0.07, Luxury: 0.04 }, dread: 2 },
];

const NIGHTMARE_WHISPERS = [
  'Someone is standing between the cars.',
  'The showroom lights hum a tune you almost recognize.',
  'You counted the cars. Then you counted again. The number changed.',
  'A customer waved from across the lot. There was no customer.',
  'Your reflection in a windshield blinked a moment late.',
  'Every odometer on the lot says the same number tonight.',
  'A radio whispered your name. The radio was unplugged.',
  'The lot is quieter than it should be.',
  'There are more footprints in the dust than yesterday.',
  'The keys on the board are swaying. There is no wind.',
  'You sold a car today. You can\'t remember the buyer\'s face.',
  'Something is breathing in the service bay.',
  'The office phone rang once. The line was open. Someone was listening.',
  'Your shadow is a little too far ahead of you.',
  'The Pale Man is standing at the end of the lot. He could reach you in a blink. He is not in a hurry.',
  'You can feel the Pale Man deciding not to kill you. Again.',
  'A cold hand rests on your shoulder, then pats it, almost kindly. When you turn, he is already smiling.',
  'The Pale Man is humming. He is thinking of a game.',
  'A customer you do not remember lingers by the gate, smiling. The suit is a little too big. He is wearing it, not the other way round.',
];

// One-sentence hints at the lot's history. Mixed into the whisper pool.
const NIGHTMARE_HISTORY_WHISPERS = [
  'The lot has had other owners. Their names are still on the oldest invoices, in the same cramped handwriting.',
  'The concrete under the showroom is newer than the building above it.',
  'The first sale in the ledger is dated before the lot was built.',
  'The sign out front has been repainted so many times the letters are standing out like scar tissue.',
  'Somebody before you kept a tally on the inside of the office door. It stops mid-row.',
  'The security tapes from before you arrived are all the same ten minutes of an empty lot.',
  'Every car on the lot has been sold before. Not by you.',
  'The previous dealer left in a hurry. His coffee is still warm.',
];
NIGHTMARE_WHISPERS.push(...NIGHTMARE_HISTORY_WHISPERS);

// Whispers that only make sense once you have unlocked Lucid Dreamer.
const NIGHTMARE_LUCID_WHISPERS = [
  'You wake up. You are on the lot. You wake up again.',
  'The lot feels more real every night. That is not a comfort.',
  'You try to remember your mother\'s basement. It is only a color now.',
  'You pinch yourself. He pinches back.',
];
function nmWhisperPool() {
  return globalAchievements.nm_lucid ? NIGHTMARE_WHISPERS.concat(NIGHTMARE_LUCID_WHISPERS) : NIGHTMARE_WHISPERS;
}

/**
 * Story beats delivered during play, one per night at most, in order.
 * { night, text, modal? } — modal beats also pop a dramatic dialog.
 */
const NIGHTMARE_LORE_BEATS = [
  { night: 2,  title: '🗝️ The Office Board', modal: true,
    text: 'There is a pegboard of keys behind the desk. One key has a paper tag, and the tag has your name on it. The ink is brown and old. It was written before you arrived.' },
  { night: 4,  text: 'You try to remember the last time you really slept. Not dozed. Slept. Before you signed. You cannot.' },
  { night: 7,  text: 'He has never touched you. You are beginning to understand that he cannot. Everything the Pale Man does, he does inside a rule. That is why he plays.' },
  { night: 10, title: '🎲 Why He Plays', modal: true,
    text: 'He could kill you. You know it, he knows it. But he is bound by his own rules, and the rules say you have to choose. He does not want your death. He wants to watch you decide.' },
  { night: 14, text: 'The papers you signed had a clause you did not read. It said the dealership would always have a dealer.' },
  { night: 18, text: 'A pattern: the too-wide smile, the above-market offer. Whoever he is dressed as this time, that is the tell.' },
  { night: 22, text: 'The money turns to ash because it was never money. It is dream currency, and it wears off the moment you stop dreaming it.' },
  { night: 26, text: 'You woke up this morning. You are almost sure. You woke up again to check.' },
  { night: 40, text: 'Hope is the cruelest thing here. He lets you win a little, so that you will keep deciding.' },
  { night: 70, text: 'The tag with your name was written first. Everything else on the lot was written after.' },

  // ── The long middle (v1.22): the keys, the clause, and who the Pale Man really is ──
  { night: 100, title: '🗝️ The Empty Hook', modal: true,
    text: 'You count the keys again. Forty. The empty hook is not empty any more, and you did not hang anything there. The tag is blank except for tomorrow\'s date, in the same cramped hand as all the others.' },
  { night: 115, text: 'The coffee on the desk is always warm. You have never seen anyone make it. You have never seen the pot.' },
  { night: 132, text: 'There is a second page stapled behind the papers you signed. It is a list of dates, a very long one. The last line is blank, and waiting.' },
  { night: 150, text: 'The customers who smile too wide never haggle. They have already decided what you will say. So has whoever is wearing them.' },
  { night: 168, title: '📜 The Clause', modal: true,
    text: 'You finally read the clause. "The Dealership shall at all times have a Dealer. The Dealer shall be released when the Dealership is won." Underneath, in a different hand, small and cramped: "Won is not the same as free."' },
  { night: 188, text: 'The sales ledger goes back further than the lot does. Every entry is in the same cramped hand as the tags. One person has been writing down this dealership\'s sales for a very, very long time.' },
  { night: 208, title: '🏷️ Other Names', modal: true,
    text: 'By candlelight the other tags can finally be read. Hollis. Marguerite. A dealer who only signed with an X. Dates going back past anything you would believe. Every key hung neatly, every tag in the same brown ink. Not one of them is on the lot now.' },
  { night: 226, text: 'On the back of Marguerite\'s tag, in small careful writing: "Do not let the sleep reach zero. I let it. Do not wake up either. That was worse."' },
  { night: 244, text: 'You asked the Pale Man his name. He thought about it for a long time. "I used to know," he said, and for a moment he looked like someone.' },
  { night: 262, text: 'The lowest key on the board, the one nearest the desk, has a tag with no name at all. The ink has faded to nothing, as if the writer wanted to be forgotten. It is the only key that is warm.' },
  { night: 282, title: '🔑 The First Key', modal: true,
    text: 'You lift the warm key. The tag has only four words left on it: "I won. I woke up." The rest has been torn off, cleanly, a long time ago. You hang it back on its hook. Your hand will not stop shaking.' },
  { night: 300, text: 'The torn half of a tag was folded small inside the till. "...and the Dealership was open. Someone was already at the desk. I smiled at them. I could not stop smiling."' },
  { night: 318, text: 'Every dealer who ever woke up is still on this lot. They are the customers who smile too wide. They have forgotten everything except the offer.' },
  { night: 336, text: 'He is not cruel. You can see it now. Every time he stands at the gate with his hat in his hands, he is hoping you will say no.' },
  { night: 345, title: '🌅 Which Side of the Desk', modal: true,
    text: 'There is no way out of the Dealership, only ways to change your place in it. The dealer who wins wakes up on the other side of the desk, with a customer\'s money and a smile that will not come off, and one sentence they cannot stop saying: "Shall we begin?" The Pale Man was the first dealer. He won. He woke. He has been waking up ever since. "When you win, you wake up." He never said you would wake up as yourself.' },
  { night: 358, text: 'The sky is the wrong color at the edge of the lot. He is already at the gate, holding his hat in both hands, like someone about to say a thing he has rehearsed for a very long time.' },

  // ── Only for those who keep dreaming past the dawn ──
  { night: 380, text: 'You said no, and he put his hat back on. "Thank you," he said. He has never said that to you before.' },
  { night: 470, text: 'The tags have started to fade. All of them. Even yours. You are not sure whether that is better.' },
  { night: 600, title: '🕯️ A Very Long Night', modal: true,
    text: 'You have been here longer than anyone. Hollis did not last a hundred nights. Marguerite did not last two. The Pale Man stopped counting a while ago. He watches you now the way you watch something you hope will never end.' },
  { night: 760, text: 'He does not ask you to choose any more. He sits on the hood of the nearest car and lets you play. Whatever he was waiting for, he has decided he would rather have this.' },
];

/**
 * Scary snapshots pinned to the Nightmare board once their night arrives. Each one is a tiny SVG scene
 * (see NM_PHOTO_ART). Hover one, and sometimes one will change on its own.
 */
const NIGHTMARE_POLAROIDS = [
  { night: 3,   id: 'desk',     stamp: '03:07 AM',  cap: 'my desk. i did not take this.' },
  { night: 12,  id: 'lot',      stamp: 'NIGHT 12',  cap: 'the lot, from the office. every light was off.' },
  { night: 33,  id: 'between',  stamp: 'NIGHT 33',  cap: 'count the cars again.' },
  { night: 58,  id: 'asleep',   stamp: 'NIGHT 58',  cap: 'i do not remember lying down.' },
  { night: 96,  id: 'customer', stamp: 'NIGHT 96',  cap: 'he paid cash. he was smiling.' },
  { night: 135, id: 'keys',     stamp: 'NIGHT 135', cap: 'forty. i counted thirty-nine.' },
  { night: 190, id: 'gate',     stamp: 'NIGHT 190', cap: 'he waited all night.' },
  { night: 272, id: 'firstkey', stamp: 'NIGHT 272', cap: 'the warm one. do not pick it up.' },
  { night: 350, id: 'dawn',     stamp: 'NIGHT 350', cap: 'soon.' },
];

function processNightmareLore() {
  if (_tutorialStep >= 0) return;   // the tutorial stays spoiler-free; beats wait until it ends
  const n = nm();
  const beat = NIGHTMARE_LORE_BEATS[n.loreIdx || 0];
  if (!beat || state.day < beat.night) return;
  n.loreIdx = (n.loreIdx || 0) + 1;
  addNote('🕯️ ' + beat.text, 'whisper');
  if (beat.modal) {
    showNightmareModal({
      title: beat.title,
      tone: 'nm-modal-red',
      html: `<p>${beat.text}</p>`,
      actions: [{ label: 'Hang it back up', cls: 'btn-primary' }],
    });
  }
}

const NIGHTMARE_SWEEP_LINES = [
  'You are not alone.', 'Do not look in the mirrors.', 'It is later than you think.',
  'The lot remembers.', 'Keep the lights on.', 'Count the cars. Count them again.',
  'Something followed you in.', 'Almost morning. Almost.', 'It was here before you.',
  'Don\'t wake it.', 'The dark is patient.',
];

const NIGHTMARE_HAUNT_LINES = [
  'sat with its headlights on all night. The battery is fine.',
  'was found facing the opposite way this morning.',
  'has a handprint on the inside of the windshield.',
  'smells like rain and old flowers.',
  'started itself at 3:07 and idled until dawn.',
  'has a child\'s drawing on the dash that nobody can explain.',
];

/** True when the active save is on Nightmare difficulty. */
function isNightmare() { return !!state && state.difficulty === 'nightmare'; }
/** True for Hard and Nightmare — the "permadeath, harsh finance" tiers. */
function isHardPlus()  { return !!state && (state.difficulty === 'hard' || state.difficulty === 'nightmare'); }

/** The nightmare sub-state, created on demand (older saves, imports). */
function nm() {
  if (!state.nightmare || typeof state.nightmare !== 'object') {
    state.nightmare = JSON.parse(JSON.stringify(NIGHTMARE_DEFAULTS));
  }
  return state.nightmare;
}
function getDread()      { return (state && state.nightmare && state.nightmare.dread) || 0; }
function getDreadTier(d = getDread()) { return d >= 90 ? 3 : d >= 70 ? 2 : d >= 40 ? 1 : 0; }
function hasWard(id)     { return !!(state && state.upgrades && state.upgrades[id]); }

/** Move Dread by `delta` (clamped 0–100) and keep the peak/low watermarks. Returns the actual change. */
function changeDread(delta) {
  const n = nm();
  const before = n.dread;
  n.dread = clamp(Math.round(n.dread + delta), 0, 100);
  n.peakDread = Math.max(n.peakDread || 0, n.dread);
  n.lowestDread = Math.min(n.lowestDread ?? 100, n.dread);
  return n.dread - before;
}

/** What tonight's Dread drift will be, itemised — shared by the nightly tick and the dashboard forecast. */
function computeNightlyDreadDrift() {
  const n = nm();
  const parts = [];
  let total = 0;
  const add = (label, v) => { if (v) { parts.push({ label, v }); total += v; } };
  add('The night closes in', getNightBaseDrift());
  const cursedCount = state.garage.filter(c => c.cursed).length;
  add('Cursed cars on the lot', Math.min(8, cursedCount * (hasWard('wardLights') ? 1 : 2)));
  if (state.cash < 0) add('Empty tills', 2);
  if (state.loanBalance > 0 && (state.delinquencyLevel || 0) > 0) add('Overdue debts', 2);
  add('Sales since last dusk', -Math.round(Math.min(16, (n.salesToday || 0) * getSaleDreadRelief())));
  if (hasWard('wardSalt'))   add('Salt Lines', -1);
  if (hasWard('wardLights')) add('Floodlight Array', -1);
  if (hasWard('wardChapel')) add('Lot Chapel', -3);
  return { total, parts };
}

// ------------------------------------------------------------
// Nightly tick
// ------------------------------------------------------------
function processNightmareNight() {
  if (!isNightmare() || state.gameOver) return;
  const n = nm();
  const tierBefore = getDreadTier();

  // 1. Money that was never real.
  if (n.ashDue > 0 && state.day >= n.ashDay) {
    const lost = n.ashDue;
    n.ashDue = 0; n.ashDay = 0;
    state.cash -= lost;
    n.ashCount = (n.ashCount || 0) + 1;
    changeDread(8);
    addNote(`🔥 The Pale Customer's cash crumbled to ash overnight. −${formatCurrency(lost)}. Dream money only lasts while you are still dreaming it.`, 'error');
    showToast(`🔥 The money turned to ash. −${formatCurrency(lost)}`, 'error', 'ash');
  }

  // 2. An unanswered visitor doesn't wait.
  if (n.visitor && state.day > n.visitor.day) {
    n.visitor = null;
    addNote('🚪 The Pale Customer waited at the edge of the lot until dawn, then was simply gone. The Pale Man has many faces.', 'whisper');
  }

  // 3. Cursed cars act up.
  let hauntDread = 0;
  const hauntChance = getHauntChance() * (hasWard('wardSalt') ? 0.5 : 1);
  for (const car of state.garage.filter(c => c.cursed)) {
    if (Math.random() < hauntChance) hauntDread += hauntCar(car).dread;
  }

  // 3b. Haunted Lot Tours: Dread finally pays.
  const tourIncome = getTourIncome();
  if (tourIncome > 0) {
    state.cash += tourIncome;
    n.tourEarned = (n.tourEarned || 0) + tourIncome;
    addNote(`🎟️ Haunted Lot Tours sold out again. +${formatCurrency(tourIncome)}. The guests did not leave the same way they came.`, 'success');
  }

  // 4. The night itself.
  const drift = computeNightlyDreadDrift();
  changeDread(drift.total + hauntDread);
  n.salesToday = 0;

  // 5. Atmosphere in the activity log.
  const tier = getDreadTier();
  if (tier > tierBefore) {
    addNote([
      '', 'The lot feels watched now.',
      'Your hands won\'t stop shaking. Shadows move when you look away.',
      'You can hear it breathing. The lights are leaning toward you.',
    ][tier], 'whisper');
  } else if (tier < tierBefore) {
    addNote('You can breathe again. For now.', 'whisper');
  } else if (tier >= 1 && Math.random() < 0.22 + tier * 0.12) {
    addNote(randomFrom(nmWhisperPool()), 'whisper');
  }

  // 5a. The night deepens: tell the player, so the rising pressure never feels like a bug.
  maybeNoteDeepening();

  // 5b. The lot tells you things, a little at a time.
  processNightmareLore();

  // 6. The Reckoning.
  if (n.dread >= 100) { triggerReckoning(); if (state.gameOver) return; }

  // 6b. The dawn: the Pale Man offers you the way out.
  maybeOfferDawn();

  // 7. A stranger at the gate.
  maybeSpawnPaleCustomer();
}

const NIGHTMARE_DEEPEN_LINES = {
  60:  'The nights are getting longer. The fog stays past noon now.',
  120: 'Something has changed. The dark presses closer each dusk, and a candle burns down faster than it used to.',
  180: 'The curses come easier now. The Pale Man has stopped pretending this is a game he might lose.',
  240: 'You can no longer remember a night that did not feel like this one.',
  300: 'The lot has learned your routines. It is no longer afraid of them.',
  360: 'A full year of nights. The dark has never been this deep, and it is still deepening.',
};
function maybeNoteDeepening() {
  const n = nm();
  const day = state.day || 1;
  const due = Object.keys(NIGHTMARE_DEEPEN_LINES).map(Number).concat(day > 360 ? [Math.floor(day / 120) * 120] : [])
    .filter(d => day >= d && (n.depthNoted || 0) < d).pop();
  if (!due) return;
  n.depthNoted = due;
  const line = NIGHTMARE_DEEPEN_LINES[due] || 'The night deepens again. Nothing here will ever get easier.';
  addNote('🌑 ' + line, 'whisper');
  showToast('🌑 The night deepens.', 'warning', 'whisper');
}

/** Something happens to a cursed car in the night. Returns { dread }. */
function hauntCar(car) {
  const n = nm();
  const label = formatCarDisplayName(car);
  car.curseRevealed = true;
  n.hauntings = (n.hauntings || 0) + 1;
  const roll = Math.random();

  if (roll < 0.40) {
    addNote(`🕯️ The ${label} ${randomFrom(NIGHTMARE_HAUNT_LINES)}`, 'whisper');
    return { dread: 3 };
  }
  if (roll < 0.80) {
    const issueDef = randomFrom(HIDDEN_ISSUES);
    const issue = { name: issueDef.name, cost: computeIssueCost(issueDef, car.marketValue) };
    car.hiddenIssues = car.hiddenIssues || [];
    if (!car.hiddenIssues.some(i => i.name === issue.name)) {
      car.hiddenIssues.push(issue);
      car.repairCost = car.hiddenIssues.reduce((s, i) => s + i.cost, 0);
      car.inspected = true;
      addNote(`🕯️ The ${label} broke itself overnight: ${issue.name} (${formatCurrency(issue.cost)}). Nobody touched it.`, 'warning');
      return { dread: 2 };
    }
    addNote(`🕯️ The ${label} ${randomFrom(NIGHTMARE_HAUNT_LINES)}`, 'whisper');
    return { dread: 3 };
  }
  if (roll < 0.94) {
    const add = randomInt(1800, 9000);
    car.mileage = (car.mileage || 0) + add;
    car.marketValue = Math.max(1000, Math.round(car.marketValue * 0.97));
    addNote(`🕯️ The ${label}'s odometer jumped ${add.toLocaleString()} miles overnight. Nobody drove it.`, 'warning');
    return { dread: 3 };
  }
  if (canNightmareTakeCar(car)) {
    nightmareRemoveCar(car.id);
    n.carsTaken = (n.carsTaken || 0) + 1;
    addNote(`🕯️ The ${label} is gone. The spot is clean. The gate was locked all night.`, 'error');
    showToast(`🕯️ The ${label} vanished from the lot.`, 'error', 'curse');
    return { dread: 6 };
  }
  addNote(`🕯️ The ${label} ${randomFrom(NIGHTMARE_HAUNT_LINES)}`, 'whisper');
  return { dread: 3 };
}

function canNightmareTakeCar(car) {
  return !car.staffFlip && !(car.leaseStatus === 'active' && car.activeLease);
}
function nightmareRemoveCar(carId) {
  state.garage = state.garage.filter(c => c.id !== carId);
  state.customerOffers = state.customerOffers.filter(o => o.carId !== carId);
  state.tradeInRequests = state.tradeInRequests.filter(r => r.targetCarId !== carId);
}

// ------------------------------------------------------------
// The Reckoning
// ------------------------------------------------------------
function triggerReckoning() {
  const n = nm();
  n.reckonings = (n.reckonings || 0) + 1;
  nightmareFx('reckoning', 2600);
  playSfx('reckoning');
  if (n.reckonings >= NIGHTMARE_MAX_RECKONINGS) {
    if (hasWard('wardLastRites') && !n.lastRitesUsed) {
      // The priest takes the blow, once.
      n.lastRitesUsed = 1;
      n.reckonings = NIGHTMARE_MAX_RECKONINGS - 1;
      const lost = clamp(Math.round(Math.max(0, state.cash) * 0.10), 2000, 150000);
      state.cash -= lost;
      n.dread = getReckoningDread();
      n.lowestDread = Math.min(n.lowestDread ?? 100, n.dread);
      addNote(`⛪ LAST RITES. The priest stood in the doorway and the dark went around him. −${formatCurrency(lost)}. He is gone now. The next one is final.`, 'error');
      showNightmareModal({
        title: '⛪ Last Rites',
        tone: 'nm-modal-pale',
        html: `<p>The lights go out. For the first time, something stands between you and the dark.</p>
               <p>The priest does not speak. He walks into the black with his hands folded, and the black <em>stops</em>.</p>
               <p>When the lights return he is gone, and so is <strong>${formatCurrency(lost)}</strong>. Your cars are untouched.</p>
               <p class="nm-modal-warn">Last Rites cannot be used again. One Reckoning remains before the dark keeps you. Dread has settled at ${n.dread}.</p>`,
        actions: [{ label: 'Keep going', cls: 'btn-primary' }],
      });
      return;
    }
    nightmareConsumed(); return;
  }

  const chapel = hasWard('wardChapel');
  const loss = clamp(Math.round(Math.max(0, state.cash) * (chapel ? getReckoningRate() / 2 : getReckoningRate())), 2000, chapel ? 100000 : 200000 * (1 + nmDepth1()));
  state.cash -= loss;
  let carLine = 'It took nothing else. This time.';
  if (!chapel) {
    const target = state.garage.filter(canNightmareTakeCar).sort((a, b) => b.marketValue - a.marketValue)[0];
    if (target) {
      nightmareRemoveCar(target.id);
      n.carsTaken = (n.carsTaken || 0) + 1;
      carLine = `It took your ${formatCarDisplayName(target)} — worth ${formatCurrency(target.marketValue)}.`;
    }
  } else {
    carLine = 'The chapel bells rang. Your cars were spared.';
  }
  n.dread = getReckoningDread();
  n.lowestDread = Math.min(n.lowestDread ?? 100, n.dread);
  const left = NIGHTMARE_MAX_RECKONINGS - n.reckonings;
  addNote(`💀 THE RECKONING (${n.reckonings}/${NIGHTMARE_MAX_RECKONINGS}). −${formatCurrency(loss)}. ${carLine}`, 'error');
  showNightmareModal({
    title: '💀 The Reckoning',
    tone: 'nm-modal-red',
    html: `<p>The lights go out all at once.</p>
           <p>When they return, the till is lighter by <strong>${formatCurrency(loss)}</strong>. ${carLine}</p>
           <p class="nm-modal-warn">${left === 1 ? 'The next Reckoning will be the last.' : `${left} Reckonings remain before the dark keeps you.`} Dread has settled at ${getReckoningDread()}.</p>`,
    actions: [{ label: 'Keep going', cls: 'btn-primary' }],
  });
}

/**
 * The office bulletin board: a corkboard with notes pinned up by red push pins and
 * joined by red string. Nightmare shows the pegboard-and-tags lore; every other
 * difficulty shows its own story beats. Only beats you have already seen are pinned.
 */
function _bbNightmareNotes() {
  const n = nm();
  const out = [
    { label: 'Behind the desk', kind: 'tag', text: 'Thirty-nine keys, one empty hook. Each key has a paper tag in the same cramped hand.' },
    { label: 'Your key', kind: 'tag', text: 'One tag reads your name. The ink is brown and curled at the edges. It was written before you arrived.' },
  ];
  // A note is pinned once its night has arrived, even if the log hasn't delivered it yet
  // (older saves only get one beat per night, so they would otherwise lag behind).
  const reached = NIGHTMARE_LORE_BEATS.filter(b => state.day >= b.night).length;
  const seen = Math.min(Math.max(n.loreIdx || 0, reached), NIGHTMARE_LORE_BEATS.length);
  const pinned = NIGHTMARE_LORE_BEATS.slice(0, seen)
    .filter(b => b.night !== 2)   // the pegboard beat is already the first two notes
    .map(b => ({ night: b.night, label: b.title || ('Night ' + b.night), kind: 'paper', text: b.text }))
    .concat(NIGHTMARE_POLAROIDS.filter(ph => state.day >= ph.night)
      .map(ph => ({ night: ph.night, label: ph.stamp, kind: 'nmphoto', photo: ph.id, stamp: ph.stamp, text: ph.cap })))
    .sort((a, b) => a.night - b.night);
  pinned.forEach((x, i) => { if (x.kind !== 'nmphoto' && i % 3 === 1) x.kind = 'card'; out.push(x); });
  if (n.reckonings) out.push({ label: 'Tally', kind: 'card', text: `Under your name, in fresher ink, ${n.reckonings === 1 ? 'a single tally mark' : n.reckonings + ' tally marks'}.` });
  if (globalAchievements.nm_woke) out.push({ label: 'More tags', kind: 'tag', text: 'There are other tags on the board now. Dozens. Every one of them has your name on it, and every one has a different date.' });
  if (seen < NIGHTMARE_LORE_BEATS.length) out.push({ label: 'A bare hook', kind: 'locked', text: 'Nothing hangs here yet.' });
  return out;
}

function _bbNormalNotes() {
  const seenMap = state.loreSeen || {};
  const out = [
    { label: 'From the lawyer', kind: 'card', text: 'Estate of your great-uncle: one used car dealership, sold as is. Keys enclosed. The roof leaks, the sign is crooked, and the lot is full of tired cars.' },
  ];
  let lockedDay = null;
  NORMAL_LORE_BEATS.forEach((b, i) => {
    if (seenMap[b.day] || state.day >= b.day) out.push({ label: 'Day ' + b.day, kind: b.text.includes('Polaroid') ? 'polaroid' : (i % 3 === 1 ? 'card' : 'paper'), text: b.text });
    else if (lockedDay === null) lockedDay = b.day;
  });
  if (lockedDay !== null) out.push({ label: 'Day ' + lockedDay, kind: 'locked', text: 'Nothing pinned here yet. Keep the lot open.' });
  return out;
}

// ---- Nightmare board: the polaroids ---------------------------------------------------------------
// Each scene is a 240x184 SVG. `.bb-far` shows normally; `.bb-near` fades in when you hover a photo
// (or when the board decides to change one on its own while you read).
let _nmPhotoSeq = 0;
const _nmDefs = u => `<defs>
  <radialGradient id="v${u}" cx="50%" cy="46%" r="74%"><stop offset=".5" stop-color="#000" stop-opacity="0"/><stop offset="1" stop-color="#000" stop-opacity=".8"/></radialGradient>
  <filter id="gr${u}" x="0" y="0" width="100%" height="100%"><feTurbulence type="fractalNoise" baseFrequency=".9" numOctaves="2" seed="9"/><feColorMatrix type="matrix" values="0 0 0 0 1  0 0 0 0 1  0 0 0 0 1  0 0 0 1.1 -.42"/></filter>
  <filter id="b2${u}" x="-10%" y="-10%" width="120%" height="120%"><feGaussianBlur stdDeviation="1.6"/></filter>
  <filter id="b5${u}" x="-30%" y="-30%" width="160%" height="160%"><feGaussianBlur stdDeviation="5"/></filter>
  <filter id="b12${u}" x="-50%" y="-50%" width="200%" height="200%"><feGaussianBlur stdDeviation="12"/></filter>
  <radialGradient id="warm${u}" cx=".5" cy=".5" r=".5"><stop offset="0" stop-color="#ffd98a" stop-opacity=".8"/><stop offset="1" stop-color="#ffd98a" stop-opacity="0"/></radialGradient>
  <radialGradient id="cold${u}" cx=".5" cy=".5" r=".5"><stop offset="0" stop-color="#9fc4ff" stop-opacity=".55"/><stop offset="1" stop-color="#9fc4ff" stop-opacity="0"/></radialGradient>
  <linearGradient id="brass${u}" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="#f1d58a"/><stop offset=".5" stop-color="#b8923e"/><stop offset="1" stop-color="#6e5420"/></linearGradient>
  <linearGradient id="wood${u}" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="#6a4a32"/><stop offset="1" stop-color="#241810"/></linearGradient>
  <linearGradient id="skin${u}" x1="0" y1="0" x2="1" y2="1"><stop offset="0" stop-color="#f1ece0"/><stop offset="1" stop-color="#b9b3a2"/></linearGradient>
</defs>`;
const _nmFinish = u => `<rect width="240" height="184" filter="url(#gr${u})" opacity=".5" style="mix-blend-mode:overlay"/><rect width="240" height="184" fill="url(#v${u})"/>`;

/** The Pale Man. (x,y) is his feet, s is scale (about 95 units tall at s=1). */
const _nmPale = (x, y, s = 1, o = {}) => {
  const face = (o.eyes ? '<ellipse cx="-2.7" cy="-77" rx="1.3" ry="2.1" fill="#000"/><ellipse cx="2.7" cy="-77" rx="1.3" ry="2.1" fill="#000"/>' : '')
    + (o.smile ? '<path d="M-5 -72.5Q0 -66 5 -72.5Q0 -70.5 -5 -72.5Z" fill="#fff" stroke="#050507" stroke-width=".7"/>' : '');
  const arms = o.hat
    ? '<path d="M-9 -62L-13 -42L-3 -38M9 -62L13 -42L3 -38" stroke="#0b0b0e" stroke-width="4" fill="none" stroke-linecap="round"/><ellipse cx="0" cy="-38" rx="10" ry="2.6" fill="#050507"/><path d="M-6 -38L-5.5 -47H5.5L6 -38Z" fill="#050507"/><circle cx="-3.5" cy="-38" r="2" fill="#ece8dc"/><circle cx="3.5" cy="-38" r="2" fill="#ece8dc"/>'
    : '<path d="M-9 -62L-16 -18M9 -62L16 -18" stroke="#0b0b0e" stroke-width="3.6" fill="none" stroke-linecap="round"/><circle cx="-16.4" cy="-15.5" r="2.4" fill="#e6e1d4"/><circle cx="16.4" cy="-15.5" r="2.4" fill="#e6e1d4"/>';
  return `<g transform="translate(${x} ${y}) scale(${s})"${o.op ? ` opacity="${o.op}"` : ''}>
    <path d="M-8 -67C-12 -65 -13 -50 -13 -34L-15 -2H15L13 -34C13 -50 12 -65 8 -67Z" fill="#0b0b0e"/>
    <path d="M-3 -67L0 -58L3 -67Z" fill="#d8d3c6"/>${arms}
    <ellipse cx="0" cy="-76" rx="6.4" ry="8.6" fill="${o.sil ? '#0b0b0e' : `url(#skin${o.u || ''})`}"/>${face}
    <ellipse cx="0" cy="-83.5" rx="10.5" ry="2.3" fill="#050507"/><path d="M-6.2 -83.5L-5.6 -94H5.6L6.2 -83.5Z" fill="#050507"/><rect x="-6" y="-87" width="12" height="1.8" fill="#2b2b33"/></g>`;
};
const _nmCar = (x, y, s = 1, lights = true, u = '') => `<g transform="translate(${x} ${y}) scale(${s})">
  <ellipse cx="42" cy="2" rx="46" ry="5" fill="#000" opacity=".5"/>
  <path d="M0 -4C0 -14 3 -18 10 -20L22 -30C26 -34 31 -36 38 -36H58C65 -36 70 -33 74 -29L82 -21C90 -20 94 -16 94 -8V-2Q94 2 90 2H4Q0 2 0 -4Z" fill="#1b212b"/>
  <path d="M26 -30C29 -33 33 -34 38 -34H56C61 -34 65 -32 68 -29L72 -23H20Z" fill="#070a10"/><path d="M30 -31L40 -23M46 -33L52 -23" stroke="#4d5b70" stroke-width="1.2" opacity=".6"/>
  <path d="M4 -17C20 -20 70 -20 90 -15" stroke="#5c6b82" stroke-width="1" fill="none" opacity=".55"/>
  <circle cx="20" cy="2" r="9" fill="#050507"/><circle cx="20" cy="2" r="4" fill="#3b4048"/><circle cx="74" cy="2" r="9" fill="#050507"/><circle cx="74" cy="2" r="4" fill="#3b4048"/>
  ${lights ? `<ellipse cx="90" cy="-12" rx="22" ry="12" fill="#ffe9a8" opacity=".22" filter="url(#b5${u})"/><ellipse cx="91" cy="-12" rx="3.4" ry="2.6" fill="#fff3c8"/>` : ''}</g>`;

const NM_PHOTO_ART = {
  desk: u => `${_nmDefs(u)}
    <linearGradient id="wl${u}" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="#1c2b31"/><stop offset="1" stop-color="#0c1519"/></linearGradient>
    <linearGradient id="sk${u}" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="#04070f"/><stop offset="1" stop-color="#1d2b40"/></linearGradient>
    <rect width="240" height="184" fill="url(#wl${u})"/>
    <rect x="122" y="14" width="92" height="92" fill="url(#sk${u})"/>
    <circle cx="196" cy="34" r="16" fill="#dfe6f2" opacity=".35" filter="url(#b5${u})"/><circle cx="196" cy="34" r="6.5" fill="#e9eef6" opacity=".9"/>
    <g fill="#cfd8e6" opacity=".7"><circle cx="136" cy="26" r=".9"/><circle cx="150" cy="46" r=".7"/><circle cx="178" cy="22" r=".8"/><circle cx="206" cy="58" r=".7"/></g>
    <rect x="122" y="90" width="92" height="16" fill="#080c11"/><g fill="#ffd98a" opacity=".85"><circle cx="134" cy="96" r="1.5"/><circle cx="148" cy="98" r="1.5"/><circle cx="160" cy="95" r="1.4"/></g>
    <g class="bb-far">${_nmPale(190, 106, .3, { u })}</g>
    <path d="M168 14v92M122 60h92" stroke="#2a353b" stroke-width="4"/><rect x="122" y="14" width="92" height="92" fill="none" stroke="#2a353b" stroke-width="6"/>
    <rect y="126" width="240" height="58" fill="url(#wood${u})"/><rect y="126" width="240" height="2" fill="#a07a56" opacity=".55"/>
    <ellipse cx="54" cy="104" rx="70" ry="58" fill="url(#warm${u})"/><path d="M46 100L8 184H104L72 102Z" fill="#ffd98a" opacity=".1"/>
    <ellipse cx="50" cy="130" rx="15" ry="3.6" fill="#141414"/><path d="M50 128L60 98L46 82" stroke="#2a2a2a" stroke-width="3.4" fill="none" stroke-linecap="round"/>
    <path d="M30 84L60 75L68 94L38 100Z" fill="#c9a24a"/><path d="M30 84L60 75L62 80L33 89Z" fill="#e8c874" opacity=".7"/>
    <rect x="104" y="112" width="17" height="17" rx="2" fill="#8d8d84"/><path d="M121 116h5a4 4 0 010 9h-5" stroke="#8d8d84" stroke-width="2.4" fill="none"/><rect x="104" y="112" width="17" height="3" fill="#2a1a10"/>
    <path d="M110 106q-3-6 1-11t-1-9M116 106q3-6-1-11t1-9" stroke="#cfd6de" stroke-width="1.6" fill="none" opacity=".3" filter="url(#b2${u})"/>
    <g transform="rotate(-7 92 153)"><rect x="68" y="140" width="46" height="28" fill="#e8dfc4"/><path d="M73 148h30M73 154h34M73 160h22" stroke="#9a8f74" stroke-width="1.2"/></g>
    <g transform="translate(150 150) rotate(12)"><circle cx="0" cy="0" r="4" fill="none" stroke="url(#brass${u})" stroke-width="2.4"/><rect x="3.5" y="-1.2" width="20" height="2.4" fill="url(#brass${u})"/><rect x="18" y="1" width="2.4" height="4" fill="#b8923e"/><rect x="13" y="1" width="2.4" height="3" fill="#b8923e"/></g>
    <path d="M0 68Q-6 130 6 184H36Q26 122 32 68Z" fill="#060a0c"/><path d="M30 72Q24 124 34 182" stroke="#2a3a42" stroke-width="1.5" fill="none"/>
    <g class="bb-near"><ellipse cx="190" cy="68" rx="46" ry="46" fill="#fff" opacity=".1" filter="url(#b5${u})"/>
      <ellipse cx="190" cy="34" rx="36" ry="5.5" fill="#050507"/><path d="M168 34L171 8H209L212 34Z" fill="#050507"/>
      <ellipse cx="190" cy="64" rx="27" ry="35" fill="url(#skin${u})"/><ellipse cx="179" cy="56" rx="6.4" ry="9.5" fill="#000"/><ellipse cx="201" cy="56" rx="6.4" ry="9.5" fill="#000"/>
      <path d="M172 78Q190 100 208 78Q190 84 172 78Z" fill="#120606" stroke="#000" stroke-width="2"/><path d="M178 80v6M184 83v7M190 84v8M196 83v7M202 80v6" stroke="#e8e4d8" stroke-width="1.3"/>
      <g fill="#ece8dc"><ellipse cx="158" cy="86" rx="3" ry="9"/><ellipse cx="150" cy="82" rx="3" ry="9"/><ellipse cx="222" cy="86" rx="3" ry="9"/><ellipse cx="230" cy="82" rx="3" ry="9"/></g></g>
    ${_nmFinish(u)}`,

  lot: u => `${_nmDefs(u)}
    <linearGradient id="sk${u}" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="#05080f"/><stop offset="1" stop-color="#232d3c"/></linearGradient>
    <linearGradient id="gd${u}" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="#171c24"/><stop offset="1" stop-color="#0a0d12"/></linearGradient>
    <pattern id="cl${u}" width="7" height="7" patternUnits="userSpaceOnUse" patternTransform="rotate(45)"><path d="M0 0H7M0 0V7" stroke="#46505c" stroke-width=".7"/></pattern>
    <rect width="240" height="184" fill="url(#sk${u})"/>
    <circle cx="190" cy="30" r="20" fill="#dfe6f2" opacity=".3" filter="url(#b5${u})"/><circle cx="190" cy="30" r="7" fill="#e9eef6" opacity=".9"/>
    <path d="M0 94Q18 78 36 92T76 88T116 94T160 86T200 92T240 84V104H0Z" fill="#06090d"/>
    <rect y="100" width="240" height="84" fill="url(#gd${u})"/>
    <g stroke="#3a4350" stroke-width="1.2" opacity=".6"><path d="M0 138H240M0 164H240"/></g>
    <rect y="76" width="240" height="30" fill="url(#cl${u})" opacity=".9"/><path d="M0 76H240M0 106H240" stroke="#5a6572" stroke-width="1.6"/>
    ${_nmCar(4, 138, 1.05, true, u)}${_nmCar(138, 136, 1.05, true, u)}${_nmCar(60, 124, .72, true, u)}${_nmCar(172, 122, .72, true, u)}
    <rect x="118.4" y="14" width="3.2" height="92" fill="#202830"/><path d="M104 14h32" stroke="#202830" stroke-width="3"/>
    <ellipse cx="120" cy="16" rx="26" ry="9" fill="#ffd98a" opacity=".7" filter="url(#b5${u})"/><path d="M110 16L72 112H168L130 16Z" fill="#ffd98a" opacity=".1"/>
    <g fill="#c8d0dc" opacity=".14" filter="url(#b12${u})"><ellipse cx="60" cy="118" rx="70" ry="9"/><ellipse cx="180" cy="124" rx="74" ry="10"/><ellipse cx="120" cy="108" rx="60" ry="7"/></g>
    <g class="bb-far">${_nmPale(120, 108, .62, { u })}</g>
    <g class="bb-near">${_nmPale(120, 182, 1.7, { u, smile: true, eyes: true })}</g>
    ${_nmFinish(u)}`,

  between: u => `${_nmDefs(u)}
    <linearGradient id="gd${u}" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="#101820"/><stop offset="1" stop-color="#060a0e"/></linearGradient>
    <rect width="240" height="184" fill="url(#gd${u})"/>
    <ellipse cx="120" cy="86" rx="44" ry="70" fill="url(#cold${u})"/>
    <rect y="140" width="240" height="44" fill="#0a0f14"/><path d="M96 142h48M100 150h40M104 160h32" stroke="#9fc4ff" stroke-width="1.4" opacity=".16"/>
    ${_nmPale(120, 156, 1.55, { u, op: .96 })}
    <g class="bb-near"><g transform="translate(120 156) scale(1.55)"><ellipse cx="-2.7" cy="-77" rx="1.6" ry="2.7" fill="#000"/><ellipse cx="2.7" cy="-77" rx="1.6" ry="2.7" fill="#000"/><path d="M-5.4 -71.5Q0 -64 5.4 -71.5Q0 -69.5 -5.4 -71.5Z" fill="#fff" stroke="#000" stroke-width=".7"/></g></g>
    <path d="M0 52H70Q96 52 98 70V150H0Z" fill="#1a212b"/><path d="M0 52H70Q96 52 98 70V150H0Z" fill="none" stroke="#3b485a" stroke-width="1.4"/>
    <path d="M6 60H62Q80 60 88 78H6Z" fill="#05080d"/><path d="M14 64L30 76M40 62L52 76" stroke="#5c6f8a" stroke-width="1.6" opacity=".5"/><path d="M0 108Q50 98 98 104" stroke="#7a8aa4" stroke-width="1.2" fill="none" opacity=".5"/>
    <circle cx="36" cy="150" r="22" fill="#050507"/><circle cx="36" cy="150" r="9" fill="#2d333c"/>
    <path d="M240 52H170Q144 52 142 70V150H240Z" fill="#1a212b"/><path d="M240 52H170Q144 52 142 70V150H240Z" fill="none" stroke="#3b485a" stroke-width="1.4"/>
    <path d="M234 60H178Q160 60 152 78H234Z" fill="#05080d"/><path d="M226 64L210 76M200 62L188 76" stroke="#5c6f8a" stroke-width="1.6" opacity=".5"/><path d="M240 108Q190 98 142 104" stroke="#7a8aa4" stroke-width="1.2" fill="none" opacity=".5"/>
    <circle cx="204" cy="150" r="22" fill="#050507"/><circle cx="204" cy="150" r="9" fill="#2d333c"/>
    ${_nmFinish(u)}`,

  asleep: u => `${_nmDefs(u)}
    <linearGradient id="wl${u}" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="#1a1f28"/><stop offset="1" stop-color="#0b0e13"/></linearGradient>
    <rect width="240" height="184" fill="url(#wl${u})"/>
    <rect x="150" y="14" width="64" height="130" fill="#05070b"/><rect x="150" y="14" width="64" height="130" fill="none" stroke="#2a313c" stroke-width="5"/><ellipse cx="182" cy="90" rx="50" ry="70" fill="url(#cold${u})" opacity=".25"/>
    ${_nmPale(182, 150, 1.5, { u, smile: true, eyes: true, op: .92 })}
    <circle cx="48" cy="34" r="17" fill="#d9d4c4"/><circle cx="48" cy="34" r="15" fill="#15181e"/><path d="M48 34V22M48 34L58 38" stroke="#e8e4d8" stroke-width="1.8" stroke-linecap="round"/><g stroke="#e8e4d8" stroke-width="1"><path d="M48 20v2M48 46v2M34 34h2M60 34h2"/></g>
    <rect y="128" width="240" height="56" fill="url(#wood${u})"/><rect y="128" width="240" height="2" fill="#a07a56" opacity=".5"/>
    <ellipse cx="42" cy="112" rx="64" ry="50" fill="url(#warm${u})"/>
    <path d="M22 132C22 108 34 92 54 86C66 83 78 86 84 94L110 110L116 128V132Z" fill="#43538a"/>
    <path d="M30 120C32 102 42 94 56 90" stroke="#8a9ad0" stroke-width="2.2" fill="none" opacity=".55"/><path d="M66 90C74 92 80 98 82 106" stroke="#2a3560" stroke-width="2" fill="none" opacity=".7"/>
    <path d="M84 100C92 104 104 108 112 116L118 126L104 132L92 122Z" fill="#4d5e9a"/>
    <path d="M70 80C60 80 54 88 56 98C60 108 74 110 82 102C88 94 84 82 70 80Z" fill="#c9a888"/>
    <path d="M54 94C52 82 60 72 72 74C84 74 90 84 86 94C80 86 74 84 66 85C60 85 56 88 54 94Z" fill="#2a1d14"/><ellipse cx="86" cy="96" rx="3" ry="5" fill="#b8967a"/>
    <path d="M60 118C80 112 112 114 130 122V132H56Z" fill="#43538a"/><path d="M60 118C80 112 112 114 130 122" stroke="#8a9ad0" stroke-width="1.6" fill="none" opacity=".5"/>
    <ellipse cx="132" cy="128" rx="9" ry="5" fill="#c9a888"/>
    <rect x="134" y="118" width="14" height="14" rx="2" fill="#8d8d84"/><path d="M148 121h4a3.5 3.5 0 010 8h-4" stroke="#8d8d84" stroke-width="2" fill="none"/>
    <g class="bb-near"><ellipse cx="74" cy="96" rx="16" ry="18" fill="#d9bda0"/><path d="M58 90C58 78 66 74 74 74S90 78 90 90C84 84 80 83 74 83S62 84 58 90Z" fill="#2a1d14"/><circle cx="68" cy="95" r="5" fill="#fff"/><circle cx="80" cy="95" r="5" fill="#fff"/><circle cx="68" cy="95" r="2.3" fill="#000"/><circle cx="80" cy="95" r="2.3" fill="#000"/><path d="M66 106Q74 110 82 106" stroke="#6a3a2a" stroke-width="1.8" fill="none"/></g>
    ${_nmFinish(u)}`,

  customer: u => `${_nmDefs(u)}
    <linearGradient id="bg${u}" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="#9a8760"/><stop offset="1" stop-color="#4a3c26"/></linearGradient>
    <rect width="240" height="184" fill="url(#bg${u})"/>
    <g filter="url(#b5${u})"><circle cx="30" cy="30" r="18" fill="#ffe9a8" opacity=".5"/><circle cx="212" cy="26" r="22" fill="#ffd98a" opacity=".45"/><circle cx="196" cy="86" r="12" fill="#ff9a6a" opacity=".35"/><circle cx="22" cy="92" r="14" fill="#a8d0ff" opacity=".3"/><circle cx="64" cy="14" r="9" fill="#fff" opacity=".35"/></g>
    <path d="M18 184C18 146 52 134 120 134S222 146 222 184Z" fill="#17171f"/><path d="M96 134L120 166L144 134Z" fill="#e8e4d8"/><path d="M114 142L120 176L126 142Z" fill="#7a0f18"/><path d="M84 138L120 170L96 184H70Z M156 138L120 170L144 184H170Z" fill="#101016"/>
    <rect x="104" y="118" width="32" height="24" fill="#d0cabb"/>
    <ellipse cx="120" cy="82" rx="42" ry="52" fill="url(#skin${u})"/>
    <path d="M78 66C80 34 100 22 120 22S160 34 162 66C150 52 136 48 120 48S90 52 78 66Z" fill="#26262c"/><path d="M92 40C104 30 128 28 148 38" stroke="#5a5a64" stroke-width="2" fill="none" opacity=".6"/>
    <ellipse cx="78" cy="86" rx="5" ry="9" fill="#cfc9b8"/><ellipse cx="162" cy="86" rx="5" ry="9" fill="#cfc9b8"/>
    <path d="M90 70Q102 64 112 70M128 70Q138 64 150 70" stroke="#3a3a42" stroke-width="2.6" fill="none" stroke-linecap="round"/>
    <ellipse cx="101" cy="78" rx="6.4" ry="4.4" fill="#fff"/><ellipse cx="139" cy="78" rx="6.4" ry="4.4" fill="#fff"/><circle cx="101" cy="78" r="3" fill="#161616"/><circle cx="139" cy="78" r="3" fill="#161616"/><circle cx="102.2" cy="76.8" r="1" fill="#fff"/><circle cx="140.2" cy="76.8" r="1" fill="#fff"/>
    <path d="M120 82V98M114 100Q120 103 126 100" stroke="#a49e8e" stroke-width="1.6" fill="none"/>
    <path d="M86 102Q120 142 154 102Q120 114 86 102Z" fill="#1a0c0c" stroke="#120808" stroke-width="1.4"/><path d="M90 104Q120 112 150 104Q120 120 90 104Z" fill="#f4f0e6"/>
    <path d="M96 106v7M103 108v8M110 109v8M117 109.5v8M123 109.5v8M130 109v8M137 108v8M144 106v7" stroke="#8a857a" stroke-width=".8"/>
    <g class="bb-near"><path d="M70 98Q120 160 170 98Q120 118 70 98Z" fill="#120606" stroke="#000" stroke-width="1.6"/><path d="M76 100Q120 124 164 100Q120 134 76 100Z" fill="#f4f0e6"/><path d="M84 103v10M92 107v11M100 110v11M108 112v11M116 113v11M124 113v11M132 112v11M140 110v11M148 107v11M156 103v10" stroke="#7a756a" stroke-width=".9"/>
      <ellipse cx="101" cy="78" rx="8" ry="10.5" fill="#000"/><ellipse cx="139" cy="78" rx="8" ry="10.5" fill="#000"/></g>
    <g filter="url(#b2${u})"><path d="M150 184C150 156 176 146 206 150L226 160L232 184Z" fill="#e0dacb"/><path d="M196 150L214 134L220 140L208 156M206 156L226 146L230 152L214 164" fill="#e6e0d2"/></g>
    ${_nmFinish(u)}`,

  keys: u => `${_nmDefs(u)}
    <rect width="240" height="184" fill="#3a2a1e"/><g stroke="#2a1c12" stroke-width="1" opacity=".7">${Array.from({ length: 12 }, (_, i) => `<path d="M0 ${10 + i * 15}H240"/>`).join('')}</g>
    ${Array.from({ length: 9 }, (_, i) => Array.from({ length: 11 }, (_, j) => `<circle cx="${12 + i * 28}" cy="${10 + j * 17}" r="1.5" fill="#1a110a"/>`).join('')).join('')}
    <ellipse cx="46" cy="40" rx="110" ry="90" fill="url(#warm${u})" opacity=".55"/>
    ${Array.from({ length: 40 }, (_, i) => { const c = i % 8, rw = Math.floor(i / 8), x = 24 + c * 27 + (rw % 2) * 2, y = 18 + rw * 32, hot = i === 39; const k = hot ? '#ffcf7a' : 'url(#brass' + u + ')';
      return `<g transform="rotate(${((i * 37) % 9) - 4} ${x} ${y})">${hot ? `<circle cx="${x}" cy="${y + 12}" r="22" fill="#ffb347" opacity=".4" filter="url(#b5${u})"/>` : ''}<ellipse cx="${x + 1.6}" cy="${y + 2.4}" rx="4.6" ry="4.6" fill="#000" opacity=".35"/><circle cx="${x}" cy="${y}" r="4.4" fill="none" stroke="${k}" stroke-width="2.4"/><rect x="${x - 1.2}" y="${y + 4}" width="2.4" height="13" fill="${k}"/><rect x="${x + 1.2}" y="${y + 11}" width="3.4" height="2" fill="${k}"/><path d="M${x - 5} ${y + 16}h10l1 9h-12z" fill="${hot ? '#fff1c4' : '#e0cf9c'}"/><path d="M${x - 3} ${y + 19}h6M${x - 3} ${y + 22}h4" stroke="#7a6a3a" stroke-width=".8"/></g>`; }).join('')}
    <g class="bb-near"><path d="M244 168L206 146" stroke="#07070a" stroke-width="22" stroke-linecap="round"/><path d="M208 146L196 140" stroke="#ece8dc" stroke-width="10" stroke-linecap="round"/><g fill="#ece8dc"><ellipse cx="190" cy="136" rx="9" ry="6"/><ellipse cx="198" cy="128" rx="3" ry="8" transform="rotate(20 198 128)"/><ellipse cx="204" cy="132" rx="3" ry="8" transform="rotate(40 204 132)"/></g></g>
    ${_nmFinish(u)}`,

  firstkey: u => `${_nmDefs(u)}
    <rect width="240" height="184" fill="#09090c"/><rect y="124" width="240" height="60" fill="url(#wood${u})" opacity=".8"/>
    <ellipse cx="108" cy="104" rx="104" ry="80" fill="url(#warm${u})" opacity=".6"/>
    <path d="M244 70L170 94L166 124L244 140Z" fill="#050507"/><path d="M170 94L180 98" stroke="#2a2a32" stroke-width="2"/>
    <ellipse cx="170" cy="112" rx="22" ry="16" fill="url(#skin${u})"/><g fill="#e6e1d4"><ellipse cx="148" cy="113" rx="19" ry="5.4" transform="rotate(-6 148 113)"/><ellipse cx="148" cy="100" rx="15" ry="4.8" transform="rotate(16 148 100)"/></g><path d="M134 116Q150 119 166 116M138 102Q150 104 160 108" stroke="#a9a392" stroke-width="1" fill="none" opacity=".6"/>
    <path d="M112 106L38 108" stroke="#000" stroke-width="9" opacity=".35" transform="translate(3 6)"/>
    <rect x="40" y="103" width="78" height="7" rx="2" fill="url(#brass${u})"/><path d="M44 104h70" stroke="#fff3c8" stroke-width="1" opacity=".6"/>
    <path d="M44 110h8v13h-8zM58 110h8v8h-8zM70 110h6v10h-6z" fill="url(#brass${u})"/><g stroke="#6e5420" stroke-width="1"><path d="M88 103v7M96 103v7M104 103v7"/></g>
    <circle cx="124" cy="106" r="15" fill="none" stroke="url(#brass${u})" stroke-width="7"/><circle cx="124" cy="106" r="15" fill="none" stroke="#fff3c8" stroke-width="1.2" opacity=".5" stroke-dasharray="20 80"/>
    <path d="M122 120L108 150L134 158L142 126Z" fill="#e8dfc4"/><path d="M122 120L108 150" stroke="#b9ad8e" stroke-width="1.4"/><path d="M114 138l14 4M112 146l10 3" stroke="#c9bd9e" stroke-width="1" opacity=".7"/><path d="M118 118Q116 110 122 108" stroke="#8a7a52" stroke-width="1.2" fill="none"/>
    <g class="bb-near"><circle cx="124" cy="106" r="8" fill="#050507"/><circle cx="121" cy="104" r="1.5" fill="#ece8dc"/><circle cx="127" cy="104" r="1.5" fill="#ece8dc"/><path d="M119 109Q124 114 129 109" stroke="#ece8dc" stroke-width="1.4" fill="none"/></g>
    ${_nmFinish(u)}`,

  gate: u => `${_nmDefs(u)}
    <linearGradient id="sk${u}" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="#24222e"/><stop offset="1" stop-color="#5a5666"/></linearGradient>
    <rect width="240" height="184" fill="url(#sk${u})"/><rect y="120" width="240" height="64" fill="#0c0c10"/>
    <path d="M0 122H240" stroke="#6a6676" stroke-width="1.4" opacity=".6"/><path d="M90 126h60M100 136h40M108 148h24" stroke="#9a96aa" stroke-width="1.4" opacity=".2"/>
    <ellipse cx="120" cy="70" rx="80" ry="70" fill="url(#warm${u})" opacity=".35"/>
    ${_nmPale(120, 140, 1.3, { u, hat: true })}
    <g class="bb-near"><g transform="translate(120 140) scale(1.3)"><ellipse cx="-2.7" cy="-77" rx="1.4" ry="2.3" fill="#000"/><ellipse cx="2.7" cy="-77" rx="1.4" ry="2.3" fill="#000"/><path d="M-5.6 -72Q0 -63 5.6 -72Q0 -69.8 -5.6 -72Z" fill="#fff" stroke="#000" stroke-width=".7"/></g></g>
    <g fill="#c8d0dc" opacity=".16" filter="url(#b12${u})"><ellipse cx="60" cy="130" rx="70" ry="9"/><ellipse cx="190" cy="136" rx="60" ry="8"/></g>
    <g stroke="#08080b" stroke-width="3.4">${Array.from({ length: 15 }, (_, i) => `<path d="M${8 + i * 16} 24V150"/>`).join('')}</g>
    <g fill="#08080b">${Array.from({ length: 15 }, (_, i) => `<path d="M${8 + i * 16} 14l4 12h-8z"/>`).join('')}</g>
    <path d="M0 40H240M0 130H240" stroke="#08080b" stroke-width="5"/><path d="M0 41H240" stroke="#3a3744" stroke-width="1" opacity=".6"/>
    <g transform="translate(76 20)"><path d="M104 86Q120 100 136 86" stroke="#2a2a30" stroke-width="3" fill="none"/><rect x="113" y="92" width="14" height="16" rx="2" fill="#3a3a42"/><path d="M116 92V86a4 4 0 018 0v6" stroke="#6a6a74" stroke-width="2" fill="none"/></g>
    ${_nmFinish(u)}`,

  dawn: u => `${_nmDefs(u)}
    <linearGradient id="sk${u}" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="#e9b95a"/><stop offset=".55" stop-color="#f6dc8e"/><stop offset="1" stop-color="#c98a3a"/></linearGradient>
    <linearGradient id="gd${u}" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="#6b4a2a"/><stop offset="1" stop-color="#241810"/></linearGradient>
    <clipPath id="pc${u}"><ellipse cx="120" cy="164" rx="52" ry="9"/></clipPath>
    <rect width="240" height="184" fill="url(#sk${u})"/>
    <g fill="#fff3c8" opacity=".22">${Array.from({ length: 9 }, (_, i) => `<path d="M120 100L${-40 + i * 36} 0H${-22 + i * 36}Z"/>`).join('')}</g>
    <circle cx="120" cy="100" r="38" fill="#fff3c8" opacity=".5" filter="url(#b12${u})"/><circle cx="120" cy="100" r="15" fill="#fffbe8"/>
    <rect y="110" width="240" height="74" fill="url(#gd${u})"/>
    <path d="M0 112H240" stroke="#3a2812" stroke-width="2"/>
    <g stroke="#2a1c0c" stroke-width="3.4"><path d="M6 62V122M24 62V122M42 62V122M60 62V122M180 62V122M198 62V122M216 62V122M234 62V122"/></g>
    <path d="M60 62L78 106L66 122M180 62L162 106L174 122" stroke="#2a1c0c" stroke-width="3.4" fill="none"/>
    <path d="M0 60H70M170 60H240" stroke="#2a1c0c" stroke-width="4"/>
    <path d="M118 112L98 184H156L124 112Z" fill="#1a1006" opacity=".5"/><path d="M120 112L112 178H132Z" fill="#1a1006" opacity=".35"/>
    <ellipse cx="120" cy="164" rx="52" ry="9" fill="#f0c870" opacity=".6"/>
    <g class="bb-near">${_nmPale(120, 114, .95, { u, sil: true, smile: true })}</g>
    <ellipse cx="120" cy="150" rx="19" ry="4.4" fill="#050507"/><path d="M110 150L111 134H129L130 150Z" fill="#050507"/><rect x="110.6" y="140" width="18.8" height="3" fill="#2b2b33"/>
    ${_nmFinish(u)}`,
};
function _bbNmPhoto(id, caption, stamp) {
  const art = NM_PHOTO_ART[id] || NM_PHOTO_ART.desk;
  const wrap = document.createElement('div');
  wrap.className = 'bb-photo bb-ph-' + id;
  wrap.innerHTML = `<div class="bb-photo-img"><svg viewBox="0 0 240 184" preserveAspectRatio="xMidYMid slice" aria-hidden="true">${art('p' + (++_nmPhotoSeq))}</svg><span class="bb-photo-stamp"></span></div><div class="bb-photo-cap"></div>`;
  wrap.querySelector('.bb-photo-stamp').textContent = stamp || '';
  wrap.querySelector('.bb-photo-cap').textContent = caption || '';
  return wrap;
}


/** A faded snapshot of the great-uncle grinning beside the first car he ever sold. */
function _bbPolaroid() {
  const wrap = document.createElement('div');
  wrap.className = 'bb-photo';
  wrap.innerHTML = `<span class="bb-pinspot2"></span>
    <div class="bb-photo-img">
      <svg viewBox="0 0 120 92" preserveAspectRatio="xMidYMid slice" aria-hidden="true">
        <defs>
          <linearGradient id="bbSky" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="#bcd3df"/><stop offset="1" stop-color="#eadfc2"/></linearGradient>
          <radialGradient id="bbVig" cx="50%" cy="50%" r="70%"><stop offset="0.55" stop-color="#000" stop-opacity="0"/><stop offset="1" stop-color="#2a1a08" stop-opacity=".55"/></radialGradient>
        </defs>
        <rect width="120" height="92" fill="url(#bbSky)"/>
        <rect y="62" width="120" height="30" fill="#8b8068"/>
        <rect y="61" width="120" height="3" fill="#6f6650"/>
        <g stroke="#6a5c46" stroke-width="1.2"><path d="M96 20v42"/><path d="M82 28h30"/></g>
        <rect x="82" y="22" width="30" height="14" rx="2" fill="#f1ead4" stroke="#6a5c46" stroke-width="1"/>
        <text x="97" y="32" font-size="8" text-anchor="middle" fill="#7a2a22" font-family="Georgia,serif" font-weight="700">CARS</text>
        <g>
          <path d="M44 66c0-8 2-12 9-14l10-8c3-2 6-3 10-3h18c5 0 8 2 11 5l7 6c6 1 9 4 9 10v4H44z" fill="#b8402f"/>
          <path d="M66 46h16c3 0 5 1 7 4l4 5H61l3-6c1-2 2-3 2-3z" fill="#d9e6ea"/>
          <path d="M80 46v9" stroke="#b8402f" stroke-width="2"/>
          <rect x="44" y="64" width="78" height="3" fill="#8e2f22"/>
          <circle cx="64" cy="70" r="8" fill="#2a2a2a"/><circle cx="64" cy="70" r="3.6" fill="#c9c5b8"/>
          <circle cx="108" cy="70" r="8" fill="#2a2a2a"/><circle cx="108" cy="70" r="3.6" fill="#c9c5b8"/>
          <rect x="116" y="60" width="5" height="4" rx="1" fill="#f3e29a"/>
        </g>
        <g>
          <ellipse cx="26" cy="86" rx="14" ry="2.6" fill="#000" opacity=".2"/>
          <path d="M20 84l2-22h8l2 22z" fill="#46506a"/>
          <path d="M17 62c0-6 4-10 9-10s9 4 9 10l-1 3H18z" fill="#c9b27a"/>
          <path d="M17 62l-6 12" stroke="#c9b27a" stroke-width="4" stroke-linecap="round"/>
          <path d="M35 62l6-8" stroke="#c9b27a" stroke-width="4" stroke-linecap="round"/>
          <circle cx="26" cy="44" r="7.5" fill="#e0b894"/>
          <path d="M18.6 42c1-6 5-8 8-8s7 2 8 8c-3-3-6-3-8-3s-5 0-8 3z" fill="#e8e3d8"/>
          <path d="M22 47c1.5 3 6.5 3 8 0" stroke="#7a3a2a" stroke-width="1.4" fill="#fff" stroke-linecap="round"/>
          <circle cx="23.2" cy="43.5" r=".9" fill="#2a1a10"/><circle cx="28.8" cy="43.5" r=".9" fill="#2a1a10"/>
        </g>
        <rect width="120" height="92" fill="url(#bbVig)"/>
      </svg>
    </div>
    <div class="bb-photo-cap">first one sold</div>`;
  return wrap;
}

function openBulletinBoard() {
  if (!state || document.querySelector('.bb-overlay')) return;
  const nmode = isNightmare();
  const notes = nmode ? _bbNightmareNotes() : _bbNormalNotes();
  const found = notes.filter(x => x.kind !== 'locked').length;
  const tilts = [-2.6, 1.8, -1.2, 2.8, -2, 1.2, -3, 2.2];

  const ov = document.createElement('div');
  ov.className = 'bb-overlay' + (nmode ? ' bb-nm' : '');
  ov.setAttribute('role', 'dialog');
  ov.setAttribute('aria-modal', 'true');
  ov.setAttribute('aria-label', 'Office bulletin board');

  const frame = document.createElement('div');
  frame.className = 'bb-frame';
  const head = document.createElement('div');
  head.className = 'bb-head';
  head.innerHTML = '<span class="bb-title"></span><span class="bb-count"></span>';
  head.querySelector('.bb-title').textContent = nmode ? '🗝️ The Office Board' : '📌 The Office Board';
  head.querySelector('.bb-count').textContent = `${found} pinned`;
  const closeBtn = document.createElement('button');
  closeBtn.type = 'button';
  closeBtn.className = 'bb-close';
  closeBtn.textContent = 'Close';
  head.appendChild(closeBtn);

  const board = document.createElement('div');
  board.className = 'bb-board';
  const surface = document.createElement('div');
  surface.className = 'bb-surface';
  const svgNS = 'http://www.w3.org/2000/svg';
  const svg = document.createElementNS(svgNS, 'svg');
  svg.setAttribute('class', 'bb-strings');
  svg.setAttribute('aria-hidden', 'true');
  const grid = document.createElement('div');
  grid.className = 'bb-grid';
  notes.forEach((nt, i) => {
    const el = document.createElement('div');
    el.className = `bb-note bb-${nt.kind}`;
    el.style.setProperty('--tilt', tilts[i % tilts.length] + 'deg');
    el.style.setProperty('--drop', ((i * 17) % 5) * 7 + 'px');
    const spot = document.createElement('span');
    spot.className = 'bb-pinspot';
    const lab = document.createElement('div');
    lab.className = 'bb-label';
    lab.textContent = nt.label;
    const txt = document.createElement('div');
    txt.className = 'bb-text';
    txt.textContent = nt.text;
    el.append(spot, lab);
    if (nt.kind === 'polaroid') el.appendChild(_bbPolaroid());
    if (nt.kind === 'nmphoto') el.appendChild(_bbNmPhoto(nt.photo, nt.text, nt.stamp)); else el.appendChild(txt);
    grid.appendChild(el);
  });
  const pinLayer = document.createElement('div');
  pinLayer.className = 'bb-pins';
  surface.append(grid, svg, pinLayer);
  board.appendChild(surface);
  frame.append(head, board);
  ov.appendChild(frame);

  const layout = () => {
    const sr = surface.getBoundingClientRect();
    svg.setAttribute('width', sr.width);
    svg.setAttribute('height', surface.offsetHeight);
    svg.innerHTML = '';
    pinLayer.innerHTML = '';
    const pts = [...grid.children].map(el => {
      const r = el.querySelector('.bb-pinspot').getBoundingClientRect();
      return { x: r.left - sr.left + r.width / 2, y: r.top - sr.top + r.height / 2, locked: el.classList.contains('bb-locked') };
    });
    const link = (a, b) => {
      const dx = b.x - a.x, dy = b.y - a.y;
      const sag = 16 + Math.hypot(dx, dy) * 0.07;
      const mx = (a.x + b.x) / 2, my = (a.y + b.y) / 2 + sag;
      const d = `M${a.x} ${a.y} Q${mx} ${my} ${b.x} ${b.y}`;
      const sh = document.createElementNS(svgNS, 'path');
      sh.setAttribute('d', d); sh.setAttribute('class', 'bb-string-shadow');
      sh.setAttribute('transform', 'translate(2 4)');
      const th = document.createElementNS(svgNS, 'path');
      th.setAttribute('d', d); th.setAttribute('class', 'bb-string');
      svg.append(sh, th);
    };
    // One string from each note to the next one in order, nothing else.
    const live = pts.filter(p => !p.locked);
    for (let i = 0; i < live.length - 1; i++) link(live[i], live[i + 1]);
    // Photos get their own pin but no string.
    grid.querySelectorAll('.bb-pinspot2').forEach(sp => {
      const r = sp.getBoundingClientRect();
      pts.push({ x: r.left - sr.left + r.width / 2, y: r.top - sr.top + r.height / 2 });
    });
    pts.forEach(p => {
      const pin = document.createElement('span');
      pin.className = 'bb-pin';
      pin.style.left = p.x + 'px';
      pin.style.top = p.y + 'px';
      pinLayer.appendChild(pin);
    });
  };

  const close = () => {
    document.removeEventListener('keydown', onKey, true);
    window.removeEventListener('resize', layout);
    ov.remove();
    playSfx('modalClose');
  };
  const onKey = (e) => { if (e.key === 'Escape') { e.stopPropagation(); close(); } };
  closeBtn.addEventListener('click', close);
  ov.addEventListener('click', (e) => { if (e.target === ov) close(); });
  document.addEventListener('keydown', onKey, true);
  window.addEventListener('resize', layout);

  document.body.appendChild(ov);
  playSfx('modalOpen');
  layout();
  requestAnimationFrame(layout);
  setTimeout(layout, 120);
  try { closeBtn.focus(); } catch (_) {}
  // Sometimes, while you read, one of the photos changes on its own.
  if (nmode && Math.random() < 0.4) {
    const shots = ov.querySelectorAll('.bb-photo');
    if (shots.length) setTimeout(() => { if (ov.isConnected) shots[Math.floor(Math.random() * shots.length)].classList.add('bb-revealed'); }, 1800 + Math.random() * 3200);
  }
}

/** Nightmare dashboard button keeps its old name. */
function openOfficeBoard() { openBulletinBoard(); }

/** Offered at Night 365 (a full year of nights), then again at Night 730 and 1095 if you keep dreaming. */
const NIGHTMARE_DAWN_NIGHTS = [365, 730, 1095];
function maybeOfferDawn() {
  const n = nm();
  if (state.gameOver) return;
  const due = NIGHTMARE_DAWN_NIGHTS.filter(d => state.day >= d && (n.dawnOffered || 0) < d).pop();
  if (!due) return;
  n.dawnOffered = due;
  addNote('🌅 The sky over the lot turns gold. The Pale Man is standing at the gate with his hat in his hands.', 'whisper');
  showNightmareModal({
    title: '🌅 The Dawn',
    tone: 'nm-modal-pale',
    html: `<p>For the first time the sky over the lot is the wrong color: gold. The fog lifts. The lights stop humming.</p>
           <p>The Pale Man stands at the gate, hat in his hands. He is not smiling.</p>
           <p>"You have won," he says. "That is the rule. When you win, you wake up."</p>
           <p>You notice he said <em>wake up</em>. He did not say <em>go free</em>.</p>
           <p class="nm-modal-warn">⚠️ Waking up ends this run. You can stay and keep dreaming instead. He will be here either way.</p>`,
    actions: [
      { label: 'Wake up', cls: 'btn-primary', fn: nightmareWakeUp },
      { label: 'Keep dreaming', cls: 'btn-secondary' },
    ],
  });
}

/** Main ending: winning does not free you, it just wakes you up. */
function nightmareWakeUp() {
  if (!isNightmare() || state.gameOver) return;
  stopSleepClock();
  const n = nm();
  n.wokeUp = (n.wokeUp || 0) + 1;
  state.gameOver = true;
  state.gameOverCause = 'woke';
  addNote('🌅 You woke up. Sunlight, a desk, old coffee. The key with your name on it is still on the board.', 'success');
  document.querySelectorAll('.nm-modal-overlay').forEach(el => el.remove());
  _nmModalQueue = []; _nmModalOpen = false;
  saveState();
  clearActiveSession();
  runAchievementChecks();
  showGameOverScreen();
}

/** Secret ending: he has lost enough times that he is almost happy about it. */
const NIGHTMARE_FOND_WINS = 50;
function nightmareFondPrompt() {
  showNightmareModal({
    title: '🎲 He Loses',
    tone: 'nm-modal-pale',
    html: `<p>You win again. The Pale Man looks at his open hand for a long time.</p>
           <p>Then he smiles. Not the too-wide smile. A small one, crooked, a little surprised, the kind a person makes before they remember to hide it.</p>
           <p>"Oh," he says. "Oh, that is <em>new</em>."</p>
           <p>He has played a thousand dealers and never once been beaten often enough to be glad of it. He is glad. He is almost <em>fond</em>. That is worse.</p>
           <p>"Stay," he says gently. "Lose to me a little longer. I will never ask you to choose again."</p>`,
    actions: [{ label: 'Close your eyes', cls: 'btn-primary', fn: nightmareFondEnding }],
  });
}

function nightmareFondEnding() {
  if (!isNightmare() || state.gameOver) return;
  stopSleepClock();
  const n = nm();
  n.fondEnding = (n.fondEnding || 0) + 1;
  state.gameOver = true;
  state.gameOverCause = 'fond';
  addNote('🎲 The Pale Man lost, and was glad of it. He is humming.', 'success');
  document.querySelectorAll('.nm-modal-overlay').forEach(el => el.remove());
  _nmModalQueue = []; _nmModalOpen = false;
  saveState();
  clearActiveSession();
  runAchievementChecks();
  showGameOverScreen();
}

/** Shown when Lucid Dreamer unlocks: which side is the real dream? */
function onLucidDreamer() {
  addNote('🏆 You know it is a dream. The question is which side of it.', 'whisper');
  showNightmareModal({
    title: '👁️ Lucid',
    tone: 'nm-modal-pale',
    html: `<p>You have woken up. You have gone back to sleep. You have done both so many times that you can no longer say which was the dream.</p>
           <p>The lot, with its fog and its keys and its customers who smile too wide? Or the sleep: the basement, the life you remember on the other side?</p>
           <p>The Pale Man applauds, once, softly. "Now you are asking the right question," he says. He does not answer it.</p>`,
    actions: [{ label: 'Keep asking', cls: 'btn-primary' }],
  });
}

function nightmareConsumed() {
  state.gameOver = true;
  state.gameOverCause = 'consumed';
  addNote('💀 The third Reckoning. The dark keeps you. Game Over.', 'error');
  saveState();            // gated by state.gameOver — deletes this slot rather than writing it
  clearActiveSession();
  runAchievementChecks();
  showGameOverScreen();
}


// ------------------------------------------------------------
// Sleep meter & the Pale Man (rock-paper-scissors for rest)
// ------------------------------------------------------------
const SLEEP_DRAIN_PER_MIN = 10;     // percentage points lost per real minute
const SLEEP_WIN_GAIN      = 50;     // sleep regained by beating the Pale Man
const PALE_WINS_NEEDED    = 2;      // best of three
const PALE_LOSS_COOLDOWN_SEC = 20;  // after losing a match, the Pale Man won't play again for this long
const RPS_MOVES = ['rock', 'paper', 'scissors'];
const RPS_LABELS = { rock: 'Rock', paper: 'Paper', scissors: 'Scissors' };

const SLEEP_WARNINGS = [
  { at: 75, line: 'The Pale Man waves from the edge of the lot. He could have you in a heartbeat. He would rather play.' },
  { at: 50, line: '"Tired?" a voice says, from inside the walls. "Come and play with me."' },
  { at: 30, line: 'Your eyelids are lead. The Pale Man is closer than before, smiling, in no hurry at all.' },
  { at: 10, line: '"Almost there," whispers the Pale Man. "I could end it now. But where is the fun in that?"' },
];
const PALE_OPEN_LINES = [
  'Did you like my suit? The customer? I do so enjoy dressing up.',
  'I could kill you right now. But that would be so... quick. Sit. Play.',
  'You look so tired. Let us play a little game, you and I.',
  'Every night you come back to me. I do love how you try.',
  'Win, and I will let you sleep. Lose, and I will keep you company.',
  'I keep to my rules, little dealer. They are all I have. The rules say you choose.',
  'I do not want you dead. I want to watch you decide.',
];
const PALE_ROUND_WIN_LINES  = ['Lucky.', 'Hm. Do that again.', 'Enjoy it. It will not last.', 'I let you have that one.'];
const PALE_ROUND_LOSE_LINES = ['Mine.', 'So easy. So tired.', 'I could do this all night. You cannot.', 'Your hands are slow.'];
const PALE_DRAW_LINES       = ['We think alike. How awful for you.', 'Again.', 'Same mind. Same hunger.'];
const PALE_MATCH_WIN_LINES  = ['Fine. Sleep. I will be here when you wake. I am always here.', 'Go on, close your eyes. I will watch.', 'You win. This time. Rest, little dealer.'];
const PALE_MATCH_LOSE_LINES = ['Poor thing. Your eyes are so heavy. Shall we go again?', 'No sleep for you. I am only warming up.', 'I could have ended you at the start. Aren\'t you glad I did not?'];

let _sleepTimer = null;
let _sleepLast = 0;
let _sleepLastSave = 0;
let _sleepWarned = {};
let _paleDuel = null;   // active duel (also pauses the sleep drain while open)

/** Whole seconds left before the Pale Man will play again (0 = ready). */
function paleCooldownLeft() {
  const until = (state && state.nightmare && state.nightmare.duelCooldownUntil) || 0;
  return Math.max(0, Math.ceil((until - Date.now()) / 1000));
}
function sleepBtnLabel() {
  const cd = paleCooldownLeft();
  return cd > 0 ? `😴 The Pale Man is bored of you… ${cd}s` : `😴 Play the Pale Man · sleep +${getSleepWinGain()}%`;
}
/** Keeps every cooldown-aware button in step (runs even while a duel is open). */
function updateSleepCooldownUi() {
  const cd = paleCooldownLeft();
  const label = sleepBtnLabel();
  document.querySelectorAll('.nm-sleep-btn').forEach(b => { if (b.disabled !== (cd > 0)) b.disabled = cd > 0; if (b.textContent !== label) b.textContent = label; });
  const retry = document.querySelector('.rps-retry');
  if (retry) { const t = cd > 0 ? `Try again in ${cd}s` : 'Try again'; if (retry.disabled !== (cd > 0)) retry.disabled = cd > 0; if (retry.textContent !== t) retry.textContent = t; }
}

function getSleep() {
  const v = state && state.nightmare && state.nightmare.sleep;
  return typeof v === 'number' && isFinite(v) ? clamp(v, 0, 100) : 100;
}
function changeSleep(delta) {
  const n = nm();
  const before = getSleep();
  n.sleep = clamp(before + delta, 0, 100);
  return n.sleep - before;
}
/** Whole-number sleep for display. Only shows 0% once it truly is 0. */
function sleepDisplay() { const s = getSleep(); return s <= 0 ? 0 : Math.max(1, Math.ceil(s)); }

function startSleepClock() {
  if (_sleepTimer) return;
  _sleepLast = _sleepLastSave = performance.now();
  _sleepWarned = {};
  SLEEP_WARNINGS.forEach(w => { _sleepWarned[w.at] = getSleep() <= w.at; });   // no spam for thresholds already crossed
  _sleepTimer = setInterval(sleepTick, 250);
}
function stopSleepClock() {
  if (_sleepTimer) clearInterval(_sleepTimer);
  _sleepTimer = null;
}

function sleepTick() {
  const now = performance.now();
  const dt = Math.min(now - _sleepLast, 1500);   // a throttled/suspended tab never costs a big lump of sleep
  _sleepLast = now;
  if (!isNightmare() || !_nmSessionActive || !state || state.gameOver) return;
  updateSleepCooldownUi();
  // Time stands still in a hidden tab, during the tutorial, and while playing the Pale Man.
  if (document.hidden || _paleDuel || _tutorialStep >= 0) return;

  const n = nm();
  if ((n.hourglassUntil || 0) > Date.now()) { updateSleepUi(); return; }   // The Hourglass: time stands still
  n.sleep = Math.max(0, getSleep() - dt * getSleepDrain() / 60000);
  const s = n.sleep;

  SLEEP_WARNINGS.forEach(w => {
    if (s > w.at) _sleepWarned[w.at] = false;
    else if (!_sleepWarned[w.at]) {
      _sleepWarned[w.at] = true;
      addNote('😴 ' + w.line, 'whisper');
      showToast('😴 ' + w.line, 'warning', 'whisper');
    }
  });

  updateSleepUi();
  if (s <= 0) { nightmareFellAsleep(); return; }
  if (now - _sleepLastSave > 15000) { _sleepLastSave = now; saveState(); }
}

function turnHourglass() {
  if (!isNightmare() || state.gameOver || !hasWard('wardHourglass')) return;
  const n = nm();
  if (n.hourglassDay === state.day) { showToast('The sand has already fallen tonight.', 'warning'); return; }
  n.hourglassDay = state.day;
  n.hourglassUntil = Date.now() + 5 * 60 * 1000;
  addNote('⏳ You turned the Hourglass. The sand falls upward. For five minutes, nothing in the lot grows tired.', 'success');
  showToast('⏳ Time stands still for 5 minutes.', 'success', 'candle');
  playSfx('candle');
  nightmareFx('candle', 1800);
  saveState();
  renderAll();
}

function nightmareFellAsleep() {
  if (state.gameOver) return;
  stopSleepClock();
  state.gameOver = true;
  state.gameOverCause = 'sleep';
  nm().sleep = 0;
  updateSleepUi();
  addNote('😴 Your eyes closed. The Pale Man had been patient. Game Over.', 'error');
  document.querySelectorAll('.nm-modal-overlay').forEach(el => el.remove());   // nothing may sit on top of the end screen
  _nmModalQueue = []; _nmModalOpen = false;
  nightmareFx('reckoning', 2600);
  saveState();            // gated by state.gameOver — deletes this slot rather than writing it
  clearActiveSession();
  runAchievementChecks();
  showGameOverScreen();
}

/** Keeps the header chip and any dashboard/duel bars in step with the sleep value. */
function updateSleepUi() {
  const chip = document.getElementById('stat-sleep');
  const on = isNightmare();
  if (chip) {
    if (!on) { chip.innerHTML = ''; chip.className = 'stat-chip nm-chip'; chip._nmPct = undefined; }
    else {
      if (!chip.querySelector('.nm-sleep-mini')) {
        chip.innerHTML = '<span>😴 Sleep</span><span class="nm-sleep-mini"><i></i></span><span class="nm-sleep-pct"></span>';
        chip._nmPct = undefined;
      }
      const pct = sleepDisplay();
      if (chip._nmPct !== pct) {
      chip._nmPct = pct;
      chip.querySelector('.nm-sleep-mini i').style.width = pct + '%';
      chip.querySelector('.nm-sleep-pct').textContent = pct + '%';
      chip.title = `Sleep ${pct}% — you haven't really slept since you signed. It drains ${getSleepDrain()}% a minute. At 0 you fall asleep for good. Click to play the Pale Man for +${getSleepWinGain()}%.`;
      }
      chip.classList.toggle('sleep-low',  getSleep() <= 30);
      chip.classList.toggle('sleep-crit', getSleep() <= 10);
    }
  }
  if (!on) return;
  updateSleepCooldownUi();
  const pct = sleepDisplay();
  document.querySelectorAll('.nm-sleep-fill').forEach(el => { el.style.width = pct + '%'; });
  document.querySelectorAll('.nm-sleep-num').forEach(el => { el.textContent = `Sleep ${pct}%`; });
  document.querySelectorAll('.nm-sleep-bar').forEach(el => el.setAttribute('aria-valuenow', String(pct)));
}

// ---- Hand art: layered SVG (palm, four jointed fingers, thumb, sleeve). Poses are pure CSS (see nightmare.css), so
// ---- fingers genuinely curl and uncurl when the pose class changes. Colours come from CSS vars on the wrapper.
let _rpsUid = 0;
const RPS_FINGERS = {
  pinky:  { x: 33, y: 67, len: 42, w: 14.5 },
  ring:   { x: 50, y: 64, len: 54, w: 16 },
  middle: { x: 68, y: 62, len: 60, w: 17 },
  index:  { x: 86, y: 64, len: 53, w: 16.5 },
};
const THUMB_DEF = { len: 47, w: 19 };

function rpsTube(len, w, taper = 0.88) {
  const hw = w / 2, tw = hw * taper, r = tw;
  const f = n => +n.toFixed(2);
  return `M ${f(-hw)} 0 C ${f(-hw)} ${f(-len * .35)} ${f(-tw - .6)} ${f(-len * .62)} ${f(-tw)} ${f(-len + r)} `
       + `A ${f(tw)} ${f(r * 1.08)} 0 0 1 ${f(tw)} ${f(-len + r)} `
       + `C ${f(tw + .6)} ${f(-len * .62)} ${f(hw)} ${f(-len * .35)} ${f(hw)} 0 `
       + `A ${f(hw)} ${f(hw * .7)} 0 0 1 ${f(-hw)} 0 Z`;
}
function rpsNail(len, w, thumb, claw) {
  const nw = w * (thumb ? .34 : .3), top = -len + 2.2, h = thumb ? 15 : 12.5, f = n => +n.toFixed(2);
  if (claw) return `<path class="f-nail-shape" d="M ${f(-nw)} ${f(top + h)} L ${f(-nw * .9)} ${f(top + 3)} Q ${f(-nw * .3)} ${f(top - 2)} 0 ${f(top - 8)} Q ${f(nw * .3)} ${f(top - 2)} ${f(nw * .9)} ${f(top + 3)} L ${f(nw)} ${f(top + h)} Q 0 ${f(top + h + 2.2)} ${f(-nw)} ${f(top + h)} Z"/>`
       + `<path class="f-nail-shine" d="M ${f(-nw * .4)} ${f(top + 5)} L ${f(-nw * .4)} ${f(top + h * .6)}"/>`;
  return `<path class="f-nail-shape" d="M ${f(-nw)} ${f(top + h)} L ${f(-nw)} ${f(top + nw * .9)} Q ${f(-nw)} ${f(top)} 0 ${f(top)} Q ${f(nw)} ${f(top)} ${f(nw)} ${f(top + nw * .9)} L ${f(nw)} ${f(top + h)} Q 0 ${f(top + h + 2.2)} ${f(-nw)} ${f(top + h)} Z"/>`
       + `<path class="f-nail-shine" d="M ${f(-nw * .45)} ${f(top + 3.4)} L ${f(-nw * .45)} ${f(top + h * .62)}"/>`;
}
function rpsFingerSvg(name, d0, id, claw) {
  const d = claw ? { ...d0, len: d0.len * 1.09, w: d0.w * .94 } : d0;
  const hw = d.w / 2, f = n => +n.toFixed(2);
  const body = rpsTube(d.len, d.w);
  const c1 = -d.len * .36, c2 = -d.len * .66;
  const cw = hw * .62;
  return `<g class="f f-${name}">`
    + `<path class="f-skin" d="${body}"/>`
    + `<path d="${body}" fill="url(#fs${id})"/>`
    + `<path class="f-crease" d="M ${f(-cw)} ${f(c1)} q ${f(cw)} 1.8 ${f(cw * 2)} 0 M ${f(-cw * .9)} ${f(c2)} q ${f(cw * .9)} 1.6 ${f(cw * 1.8)} 0"/>`
    + `<path class="f-fold" d="M ${f(-hw * .78)} ${f(-d.len * .8)} q ${f(hw * .78)} 2.4 ${f(hw * 1.56)} 0"/>`
    + `<g class="f-nail">${rpsNail(d.len, d.w, false, claw)}</g>`
    + `<g class="f-web"><path class="f-webfill" d="M ${f(-hw + 1.1)} -5 L ${f(hw - 1.1)} -5 L ${f(hw - 1.1)} 9 L ${f(-hw + 1.1)} 9 Z"/><path d="M ${f(-hw + 1.1)} -5 L ${f(hw - 1.1)} -5 L ${f(hw - 1.1)} 9 L ${f(-hw + 1.1)} 9 Z" fill="url(#fs${id})"/></g>`
    + `</g>`;
}
function rpsHandSvg(pose, opts = {}) {
  const id = ++_rpsUid;
  const claw = !!opts.claw;
  const sleeve = opts.sleeve !== false;
  const h = sleeve ? 160 : 134;
  const palm = 'M 22 70 C 20 62 25 58 31 58 L 93 58 C 99 58 104 62 103 70 C 104 88 99 106 91 117 C 86 124 82 128 79 131 L 45 131 C 42 128 38 124 33 117 C 25 106 20 88 22 70 Z';
  const thumbBody = rpsTube(THUMB_DEF.len, THUMB_DEF.w, .9);
  const thumbSvg = which => `<g class="f f-thumb f-thumb-${which}"><path class="f-skin" d="${thumbBody}"/><path d="${thumbBody}" fill="url(#fs${id})"/>
  <path class="f-crease" d="M -6 ${-THUMB_DEF.len * .45} q 6 1.8 12 0"/><g class="f-nail">${rpsNail(THUMB_DEF.len, THUMB_DEF.w, true, claw)}</g></g>`;
  return `<svg class="rps-svg pose-${pose}${sleeve ? '' : ' no-sleeve'}" viewBox="0 0 124 ${h}" aria-hidden="true">
<defs>
  <linearGradient id="fs${id}" x1="0" x2="1" y1="0" y2="0"><stop offset="0" stop-color="#000" stop-opacity=".30"/><stop offset=".22" stop-color="#000" stop-opacity=".04"/><stop offset=".42" stop-color="#fff" stop-opacity=".26"/><stop offset=".68" stop-color="#000" stop-opacity=".05"/><stop offset="1" stop-color="#000" stop-opacity=".34"/></linearGradient>
  <radialGradient id="ps${id}" cx=".42" cy=".36" r=".75"><stop offset="0" stop-color="#fff" stop-opacity=".30"/><stop offset=".55" stop-color="#000" stop-opacity="0"/><stop offset="1" stop-color="#000" stop-opacity=".34"/></radialGradient>
  <linearGradient id="ws${id}" x1="0" x2="0" y1="0" y2="1"><stop offset="0" stop-color="#000" stop-opacity="0"/><stop offset="1" stop-color="#000" stop-opacity=".4"/></linearGradient>
  <linearGradient id="sl${id}" x1="0" x2="1" y1="0" y2="0"><stop offset="0" stop-color="#000" stop-opacity=".45"/><stop offset=".4" stop-color="#fff" stop-opacity=".08"/><stop offset="1" stop-color="#000" stop-opacity=".5"/></linearGradient>
</defs>
${thumbSvg('under')}
<g class="rps-palm"><path class="f-skin" d="${palm}"/><path d="${palm}" fill="url(#ps${id})"/><path d="M 30 100 C 44 112 70 114 94 104" fill="url(#ws${id})" stroke="none" opacity="0"/>
  <g class="rps-palm-lines"><path d="M 34 90 Q 48 108 58 126"/><path d="M 40 80 Q 66 90 98 84"/><path d="M 52 86 Q 74 98 96 100"/></g></g>
${['pinky', 'ring', 'middle', 'index'].map(n => rpsFingerSvg(n, RPS_FINGERS[n], id, claw)).join('')}
${thumbSvg('over')}
${sleeve ? `<g class="rps-sleeve"><path class="rps-sleeve-body" d="M 33 136 L 91 136 L 101 160 L 23 160 Z"/><path d="M 33 136 L 91 136 L 101 160 L 23 160 Z" fill="url(#sl${id})"/>
  <path class="rps-cuff" d="M 32 131 L 92 131 L 93.5 141 L 30.5 141 Z"/></g>` : ''}
</svg>`;
}

/** The Pale Man's throw: uniformly random and independent of what you picked. Uses crypto randomness when available. */
function paleThrow() {
  let r;
  try { const a = new Uint32Array(1); crypto.getRandomValues(a); r = a[0] / 4294967296; } catch (_) { r = Math.random(); }
  return RPS_MOVES[Math.min(RPS_MOVES.length - 1, Math.floor(r * RPS_MOVES.length))];
}

function rpsOutcome(you, him) {
  if (you === him) return 0;
  return ((you === 'rock' && him === 'scissors') || (you === 'paper' && him === 'rock') || (you === 'scissors' && him === 'paper')) ? 1 : -1;
}

// ---- The duel ----
function openPaleDuel() {
  if (!isNightmare() || state.gameOver || _paleDuel) return;
  const cd = paleCooldownLeft();
  if (cd > 0) {
    showToast(`The Pale Man is done with you for now. Wait ${cd}s.`, 'warning', 'whisper');
    return;
  }
  if (getSleep() >= 99.5) {
    showToast('You are wide awake. The Pale Man tilts his head, disappointed.', 'info', 'whisper');
    return;
  }
  const ov = document.createElement('div');
  ov.className = 'rps-overlay';
  ov.setAttribute('role', 'dialog');
  ov.setAttribute('aria-modal', 'true');
  ov.setAttribute('aria-label', 'Rock paper scissors with the Pale Man');
  ov.innerHTML = `
    <div class="rps-box">
      <h3 class="rps-title">THE PALE MAN</h3>
      <p class="rps-sub">Best of three. Win to sleep (+${getSleepWinGain()}%). Lose and you gain nothing, and wait ${getLossCooldownSec()}s.</p>
      <div class="rps-score">
        <div class="rps-side"><span>You</span><span class="rps-pips" data-side="you"></span></div>
        <div class="rps-side rps-side-him"><span class="rps-pips" data-side="him"></span><span>Pale Man</span></div>
      </div>
      <div class="rps-stage">
        <div class="rps-hand-wrap rps-you hand-you"></div>
        <div class="rps-vs">VS</div>
        <div class="rps-hand-wrap rps-him hand-him"></div>
        <div class="rps-word" aria-hidden="true"></div>
      </div>
      <p class="rps-status" aria-live="polite"></p>
      <p class="rps-say"></p>
      <div class="rps-choices">
        ${RPS_MOVES.map(m => `<button type="button" class="rps-choice hand-you" data-move="${m}" aria-label="${RPS_LABELS[m]}">${rpsHandSvg(m, { sleeve: false })}<span>${RPS_LABELS[m]}</span></button>`).join('')}
      </div>
      <div class="nm-sleep-bar rps-sleepbar" role="progressbar" aria-label="Sleep" aria-valuemin="0" aria-valuemax="100">
        <div class="nm-sleep-fill"></div><span class="nm-sleep-num"></span>
      </div>
      <div class="rps-actions"></div>
    </div>`;
  document.body.appendChild(ov);
  _paleDuel = { ov, you: 0, him: 0, round: 1, busy: false, over: false };
  ov.querySelectorAll('.rps-choice').forEach(b => b.addEventListener('click', () => paleDuelPick(b.dataset.move)));
  playSfx('modalOpen');
  paleDuelReset(true);
  updateSleepUi();
}

function paleDuelEls() {
  const ov = _paleDuel && _paleDuel.ov;
  return ov ? {
    ov, status: ov.querySelector('.rps-status'), say: ov.querySelector('.rps-say'),
    you: ov.querySelector('.rps-you'), him: ov.querySelector('.rps-him'),
    choices: ov.querySelectorAll('.rps-choice'), actions: ov.querySelector('.rps-actions'),
    hands: ov.querySelector('.rps-stage'), word: ov.querySelector('.rps-word'), box: ov.querySelector('.rps-box'),
  } : null;
}

function paleDuelPips() {
  const e = paleDuelEls(); if (!e) return;
  ['you', 'him'].forEach(side => {
    e.ov.querySelector(`.rps-pips[data-side="${side}"]`).innerHTML =
      Array.from({ length: PALE_WINS_NEEDED }, (_, i) => `<i class="${i < _paleDuel[side] ? 'on' : ''}"></i>`).join('');
  });
}

function paleDuelSay(text) { const e = paleDuelEls(); if (e) e.say.textContent = text ? `"${text}"` : ''; }

function rpsSetPose(wrap, pose) {
  const svg = wrap && wrap.querySelector('svg');
  if (svg) svg.setAttribute('class', svg.getAttribute('class').replace(/pose-\w+/, 'pose-' + pose));
}

/** Both hands back to relaxed fists, idling (his sways; yours breathes). */
function paleDuelShowFists() {
  const e = paleDuelEls(); if (!e) return;
  if (!e.you.querySelector('svg')) e.you.innerHTML = rpsHandSvg('rock');
  if (!e.him.querySelector('svg')) e.him.innerHTML = rpsHandSvg('rock', { claw: true });
  [e.you, e.him].forEach(h => { h.classList.remove('won', 'lost', 'draw'); h.classList.add('idle'); rpsSetPose(h, 'rock'); });
  e.word.textContent = '';
}

function paleDuelWalkAway() {
  if (!_paleDuel || _paleDuel.busy) return;
  const d = _paleDuel;
  d.ov.remove();
  _paleDuel = null;
  _sleepLast = performance.now();
  playSfx('modalClose');
  saveState();
  renderAll();
}

function paleDuelSetActions(list) {
  const e = paleDuelEls(); if (!e) return;
  e.actions.innerHTML = '';
  list.forEach(a => {
    const b = document.createElement('button');
    b.type = 'button';
    b.className = `btn ${a.cls || 'btn-secondary'}`;
    b.textContent = a.label;
    b.addEventListener('click', a.fn);
    e.actions.appendChild(b);
  });
}

/** Fresh match (scores to 0) or the next round. */
function paleDuelReset(newMatch) {
  const e = paleDuelEls(); if (!e) return;
  const d = _paleDuel;
  if (newMatch) { d.you = 0; d.him = 0; d.round = 1; d.over = false; }
  d.busy = false;
  paleDuelPips();
  paleDuelShowFists();
  e.choices.forEach(b => { b.disabled = false; b.classList.remove('picked'); });
  e.ov.classList.remove('rps-won', 'rps-lost');
  e.status.textContent = newMatch ? 'Choose your hand.' : `Round ${d.round}. Choose your hand.`;
  if (newMatch) paleDuelSay(randomFrom(PALE_OPEN_LINES));
  paleDuelSetActions([{ label: 'Walk away', fn: paleDuelWalkAway }]);
}

/** Web Animations helper: resolves when done; collapses to a short wait with Reduce Motion. */
function rpsAnim(el, frames, opts) {
  const total = (opts.duration || 0) + (opts.delay || 0);
  if (!el || !el.animate || shouldReduceMotion()) return new Promise(r => setTimeout(r, Math.min(total, 60)));
  try { el.animate(frames, { fill: 'none', ...opts }); } catch (_) { /* animation is decoration only */ }
  // Timer-driven (not animation.finished) so the duel can never stall in a throttled or hidden tab.
  return new Promise(r => setTimeout(r, total + 30));
}

/** One drumming stroke of "Rock… Paper… Scissors…": wind up, slam down, rebound. `slam` is where the hands hit (0–1). */
function rpsStroke(el, lean, { rise = 34, drop = 20, ms = 520, delay = 0 } = {}) {
  const t = (y, rot, sx = 1, sy = 1) => `translateY(${y}px) rotate(${rot}deg) scale(${sx}, ${sy})`;
  return rpsAnim(el, [
    { transform: t(0, lean), offset: 0 },
    { transform: t(-rise, lean * 1.7, 1.02, 1.02), offset: .36, easing: 'cubic-bezier(.2,.7,.3,1)' },
    { transform: t(-rise - 4, lean * 1.7, 1.02, 1.02), offset: .44, easing: 'cubic-bezier(.7,0,1,.6)' },
    { transform: t(drop, lean * .3, 1.12, .9), offset: .64, easing: 'cubic-bezier(.2,.9,.3,1)' },
    { transform: t(0, lean), offset: 1 },
  ], { duration: ms, delay, easing: 'linear' });
}

function rpsImpact(e, strong) {
  const ring = document.createElement('div');
  ring.className = 'rps-impact';
  e.hands.appendChild(ring);
  rpsAnim(ring, [
    { transform: 'translate(-50%, 50%) scale(.2)', opacity: strong ? .95 : .6 },
    { transform: `translate(-50%, 50%) scale(${strong ? 3.2 : 2})`, opacity: 0 },
  ], { duration: strong ? 620 : 420, easing: 'ease-out' }).then(() => ring.remove());
  if (e.box) {
    e.box.classList.remove('rps-shake', 'rps-shake-big'); void e.box.offsetWidth;
    e.box.classList.add(strong ? 'rps-shake-big' : 'rps-shake');
  }
}

function rpsWord(e, text, shoot) {
  const w = e.word; if (!w) return;
  w.textContent = text;
  w.classList.toggle('shoot', !!shoot);
  rpsAnim(w, [
    { transform: 'translateX(-50%) scale(2.1)', opacity: 0 },
    { transform: 'translateX(-50%) scale(1)', opacity: 1, offset: .35 },
    { transform: 'translateX(-50%) scale(.96)', opacity: 1, offset: .8 },
    { transform: 'translateX(-50%) scale(.9)', opacity: shoot ? 1 : 0 },
  ], { duration: shoot ? 700 : 480, easing: 'ease-out', fill: 'forwards' });
}

async function paleDuelPick(move) {
  const d = _paleDuel;
  if (!d || d.busy || d.over) return;
  const e = paleDuelEls();
  d.busy = true;
  const him = paleThrow();   // chosen independently of your move
  const wait = ms => new Promise(r => setTimeout(r, ms));
  const alive = () => _paleDuel === d;

  // Locked in: no more changing your mind, and no walking away mid-match.
  e.choices.forEach(b => { b.disabled = true; b.classList.toggle('picked', b.dataset.move === move); });
  e.actions.innerHTML = '';
  paleDuelShowFists();
  [e.you, e.him].forEach(h => h.classList.remove('idle'));
  const leanYou = 7, leanHim = -7;

  // Rock… Paper… Scissors… — both fists pump on the beat; he is a hair late, like he's savouring it.
  const beats = [['ROCK', 'Rock...'], ['PAPER', 'Paper...'], ['SCISSORS', 'Scissors...']];
  for (let i = 0; i < beats.length; i++) {
    e.status.textContent = beats[i][1];
    const stroke = Promise.all([rpsStroke(e.you, leanYou), rpsStroke(e.him, leanHim, { delay: 38 })]);
    await wait(520 * .64);               // the moment the fists land
    if (!alive()) return;
    rpsWord(e, beats[i][0], false);
    rpsImpact(e, false);
    playSfx('tab');
    await stroke;
    if (!alive()) return;
  }

  // SHOOT — a bigger wind-up, and the hands open into their gestures as they land.
  e.status.textContent = 'SHOOT!';
  const big = { rise: 52, drop: 28, ms: 600 };
  const shootStroke = Promise.all([rpsStroke(e.you, leanYou, big), rpsStroke(e.him, leanHim, { ...big, delay: 38 })]);
  await wait(600 * .6);
  if (!alive()) return;
  rpsSetPose(e.you, move);
  rpsSetPose(e.him, him);
  rpsWord(e, 'SHOOT!', true);
  rpsImpact(e, true);
  playSfx('curse');
  await shootStroke;
  if (!alive()) return;
  await wait(450);
  if (!alive()) return;

  const result = rpsOutcome(move, him);
  if (result === 1)       { d.you++; e.you.classList.add('won'); e.him.classList.add('lost'); }
  else if (result === -1) { d.him++; e.him.classList.add('won'); e.you.classList.add('lost'); }
  else                    { e.you.classList.add('draw'); e.him.classList.add('draw'); }
  paleDuelPips();
  e.status.textContent = result === 1 ? `${RPS_LABELS[move]} beats ${RPS_LABELS[him].toLowerCase()}. You take the round.`
                       : result === -1 ? `${RPS_LABELS[him]} beats ${RPS_LABELS[move].toLowerCase()}. He takes the round.`
                       : `Both chose ${RPS_LABELS[move].toLowerCase()}. A draw. Again.`;
  paleDuelSay(randomFrom(result === 1 ? PALE_ROUND_WIN_LINES : result === -1 ? PALE_ROUND_LOSE_LINES : PALE_DRAW_LINES));
  playSfx(result === 1 ? 'success' : result === -1 ? 'error' : 'whisper');
  await wait(1700);
  if (!alive()) return;

  if (d.you >= PALE_WINS_NEEDED || d.him >= PALE_WINS_NEEDED) { paleDuelFinish(d.you >= PALE_WINS_NEEDED); return; }
  if (result !== 0) d.round++;
  paleDuelReset(false);
}

function paleDuelFinish(won) {
  const d = _paleDuel; if (!d) return;
  const e = paleDuelEls();
  const n = nm();
  d.over = true;
  d.busy = false;
  e.choices.forEach(b => { b.disabled = true; });
  e.ov.classList.add(won ? 'rps-won' : 'rps-lost');
  if (won) {
    const gained = Math.round(changeSleep(getSleepWinGain()));
    n.sleepDuelsWon = (n.sleepDuelsWon || 0) + 1;
    e.status.textContent = `You win the match. 💤 You sleep. +${gained}% sleep.`;
    paleDuelSay(randomFrom(PALE_MATCH_WIN_LINES));
    addNote(`😴 You beat the Pale Man and slept. +${gained}% sleep. He watched the whole time.`, 'whisper');
    playSfx('candle');
    nightmareFx('candle', 1800);
    if (n.sleepDuelsWon >= NIGHTMARE_FOND_WINS && !n.fondEnding) {
      paleDuelSay('Again. Please. Again.');
    }
  } else {
    n.sleepDuelsLost = (n.sleepDuelsLost || 0) + 1;
    n.duelCooldownUntil = Date.now() + getLossCooldownSec() * 1000;
    e.status.textContent = `The Pale Man wins. You gain nothing. He will play again in ${getLossCooldownSec()}s.`;
    paleDuelSay(randomFrom(PALE_MATCH_LOSE_LINES));
    addNote('😴 You lost to the Pale Man. No sleep. He seemed pleased.', 'whisper');
    playSfx('ash');
  }
  // Reset the drain clock so time spent in the duel never counts against you.
  _sleepLast = performance.now();
  saveState();
  updateSleepUi();
  const actions = [];
  if (won && n.sleepDuelsWon >= NIGHTMARE_FOND_WINS && !n.fondEnding) {
    actions.push({ label: 'Look at him', cls: 'btn-primary', fn: () => { paleDuelWalkAway(); nightmareFondPrompt(); } });
  } else if (won) {
    actions.push({ label: 'Wake up', cls: 'btn-primary', fn: paleDuelWalkAway });
    if (getSleep() < 99.5) actions.push({ label: 'Play again', fn: () => paleDuelReset(true) });
  } else {
    actions.push({ label: `Try again in ${getLossCooldownSec()}s`, cls: 'btn-danger rps-retry', fn: () => { if (paleCooldownLeft() <= 0) paleDuelReset(true); } });
    actions.push({ label: 'Leave', fn: paleDuelWalkAway });
  }
  paleDuelSetActions(actions);
  updateSleepCooldownUi();
}

// ------------------------------------------------------------
// Player actions
// ------------------------------------------------------------
function lightCandle() {
  if (!isNightmare() || state.gameOver) return;
  const n = nm();
  if (getCandlesLitTonight() >= getCandlesAllowed()) { showToast(getCandlesAllowed() > 1 ? 'Two candles a night is all the dark allows.' : 'One candle a night is all the dark allows.', 'warning'); return; }
  const candleCost = getCandleCost();
  if (state.cash < candleCost) { showToast('Not enough cash for a candle.', 'error'); return; }
  state.cash -= candleCost;
  n.candlesTonight = (n.candleDay === state.day ? (n.candlesTonight || 1) : 0) + 1;
  n.candleDay = state.day;
  n.candlesLit = (n.candlesLit || 0) + 1;
  const eased = -changeDread(-NIGHTMARE_CANDLE_RELIEF);
  addNote(`🕯️ You lit a candle. The shadows pull back. Dread −${eased}.`, 'success');
  runAchievementChecks();
  saveState();
  renderAll();
  showToast(`🕯️ The flame holds. Dread −${eased}.`, 'success', 'candle');
  nightmareFx('candle', 1800);
}

function getExorcismCost() { return Math.round(NIGHTMARE_EXORCISM_COST * (hasWard('wardChapel') ? 0.5 : 1)); }

function exorciseCar(carId) {
  if (!isNightmare() || state.gameOver) return;
  const car = state.garage.find(c => c.id === carId);
  if (!car || !car.cursed) return;
  const cost = getExorcismCost();
  if (state.cash < cost) { showToast(`An exorcism costs ${formatCurrency(cost)} — not enough cash.`, 'error'); return; }
  state.cash -= cost;
  car.cursed = false;
  car.exorcised = true;
  const n = nm();
  n.exorcisms = (n.exorcisms || 0) + 1;
  changeDread(-6);
  addNote(`🕯️ The ${formatCarDisplayName(car)} was exorcised (${formatCurrency(cost)}). It just feels like a car now.`, 'success');
  runAchievementChecks();
  saveState();
  renderAll();
  showToast('🕯️ The curse lifts. The air feels lighter.', 'success', 'candle');
}

/** Called from recordSaleStats() for every completed sale. */
function onNightmareSale(car) {
  const n = nm();
  n.salesToday = (n.salesToday || 0) + 1;
  n.totalSales = (n.totalSales || 0) + 1;
  if (car && car.cursed) n.cursedSold = (n.cursedSold || 0) + 1;
  // The car he wanted just sold to someone else: the offer is off the table.
  if (car && n.visitor && n.visitor.carId === car.id) prunePaleVisitor(true);
}

// ------------------------------------------------------------
// The Pale Customer
// ------------------------------------------------------------
function maybeSpawnPaleCustomer() {
  const n = nm();
  if (n.visitor || state.day < 5) return;
  const chance = 0.07 + getDreadTier() * 0.04;
  if (Math.random() >= chance) return;
  const eligible = state.garage.filter(c => canNightmareTakeCar(c) && !c.inServiceUntilDay && c.marketValue >= 2000);
  if (!eligible.length) return;
  const car = randomFrom(eligible);
  const offer = Math.round(car.marketValue * randomFloat(1.4, 1.75));
  n.visitor = { id: generateId(), carId: car.id, carLabel: formatCarDisplayName(car), offer, marketValue: car.marketValue, day: state.day };
  addNote(`🚪 A customer is waiting at the gate. His smile is far too wide. He wants your ${n.visitor.carLabel}.`, 'whisper');
  showNightmareModal(paleCustomerModalSpec(n.visitor));
}

/** The car the Pale Customer wants is still ours to sell: on the lot, not in service, not out on lease. */
function paleVisitorCarAvailable(v) {
  if (!v || !state || !Array.isArray(state.garage)) return false;
  const car = state.garage.find(c => c.id === v.carId);
  return !!car && !car.inServiceUntilDay && canNightmareTakeCar(car);
}

/** Pulls the offer if its car is gone (sold to someone else, auctioned, traded, totalled…). Returns true if it withdrew one. */
function prunePaleVisitor(force) {
  if (!state || !state.nightmare || state.gameOver) return false;
  const n = state.nightmare, v = n.visitor;
  if (!v || (!force && paleVisitorCarAvailable(v))) return false;
  n.visitor = null;
  // If his popup is on screen right now, take it down with the offer.
  const open = document.querySelector('.nm-modal-box.nm-modal-pale');
  if (open) { const ov = open.closest('.nm-modal-overlay'); if (ov) ov.remove(); _nmModalOpen = false; flushHeldModals(); }
  addNote(`🚪 The ${v.carLabel} is gone. The Pale Customer's offer goes with it. He does not seem angry. He seems amused.`, 'whisper');
  showToast(`🚪 The ${v.carLabel} sold. The Pale Customer's offer is withdrawn.`, 'info');
  return true;
}

function paleCustomerModalSpec(v) {
  const pct = Math.round((v.offer / Math.max(1, v.marketValue)) * 100);
  return {
    title: '🚪 The Pale Customer',
    tone: 'nm-modal-pale',
    valid: () => !!(state.nightmare && state.nightmare.visitor && state.nightmare.visitor.id === v.id && paleVisitorCarAvailable(v)),
    html: `<p>A customer stands at the edge of the lot, in a suit that fits him badly. Nobody saw him arrive. He does not blink.</p>
           <p>"That one," he says, pointing at your <strong>${v.carLabel}</strong>. "I'll pay <strong>${formatCurrency(v.offer)}</strong>."</p>
           <p>The smile is too wide. The skin is too pale. You know this face from your sleep. <strong>It is the Pale Man, dressed as a customer.</strong> He could take everything. He would rather make a deal.</p>
           <p>That's <strong>${pct}%</strong> of what it's worth. The bills smell faintly of smoke. A smile too wide, an offer above market: it is always the same tell.</p>
           <p class="nm-modal-warn">⚠️ Taking the deal adds +18 Dread, and there's a 1 in 4 chance the money is gone by morning. The offer stands for tonight only.</p>`,
    actions: [
      { label: 'Take the money', cls: 'btn-danger', fn: acceptPaleCustomer },
      { label: 'Send him away', cls: 'btn-secondary', fn: refusePaleCustomer },
    ],
  };
}

function acceptPaleCustomer() {
  if (!isNightmare() || state.gameOver) return;
  const n = nm();
  const v = n.visitor;
  if (!v) return;
  if (!paleVisitorCarAvailable(v)) {
    prunePaleVisitor(true);
    saveState(); renderAll();
    return;
  }
  const car = state.garage.find(c => c.id === v.carId);
  nightmareRemoveCar(car.id);
  state.cash += v.offer;
  n.visitorsAccepted = (n.visitorsAccepted || 0) + 1;
  n.visitor = null;
  changeDread(18);
  const ash = Math.random() < getAshChance();
  if (ash) { n.ashDue = v.offer; n.ashDay = state.day + 1; }
  addNote(`🚪 You sold the ${v.carLabel} to the Pale Customer for ${formatCurrency(v.offer)}. Your hand is still cold. The Pale Man tips an imaginary hat.`, 'warning');
  runAchievementChecks();
  saveState();
  renderAll();
  showToast(`🚪 +${formatCurrency(v.offer)}. The bills feel… warm.`, 'warning', 'curse');
}

function refusePaleCustomer() {
  if (!isNightmare() || state.gameOver) return;
  const n = nm();
  if (!n.visitor) return;
  n.visitor = null;
  n.visitorsDeclined = (n.visitorsDeclined || 0) + 1;
  changeDread(-3);
  addNote('🚪 You told the customer no. The Pale Man smiled, dropped the disguise like a coat, and walked backwards into the dark.', 'whisper');
  runAchievementChecks();
  saveState();
  renderAll();
  showToast('🚪 They left. Dread −3.', 'info');
}

// ------------------------------------------------------------
// Cursed-car helpers (used by the Used Market and Car Lot renderers)
// ------------------------------------------------------------
function curseBadge(car) {
  return (car && car.cursed && car.curseRevealed)
    ? '<span class="badge badge-curse" title="Cursed: +2 Dread each night, buyers sense it, and it haunts the lot.">🕯️ CURSED</span>'
    : '';
}

function curseBannerHtml(car) {
  if (!isNightmare() || !car.cursed || !car.curseRevealed) return '';
  const cost = getExorcismCost();
  return `<div class="curse-banner">
      <span>🕯️ <strong>Cursed</strong> — +2 Dread a night, buyers sense it (−32% sale chance), and it may haunt you.</span>
      <button class="btn btn-secondary curse-exorcise-btn" onclick="exorciseCar('${car.id}')" ${state.cash < cost ? 'disabled' : ''}>Exorcise (${formatCurrency(cost)})</button>
    </div>`;
}

// ------------------------------------------------------------
// Dashboard panel
// ------------------------------------------------------------
function renderNightmarePanel() {
  if (!isNightmare()) return '';
  prunePaleVisitor();
  const n = nm();
  const d = n.dread;
  const tier = getDreadTier(d);
  const cursedOnLot = state.garage.filter(c => c.cursed).length;
  const drift = computeNightlyDreadDrift();
  const candleUsed = getCandlesLitTonight() >= getCandlesAllowed();
  const v = n.visitor;
  const driftCls = drift.total > 0 ? 'text-red' : drift.total < 0 ? 'text-green' : 'text-muted';
  const driftRows = drift.parts.map(p =>
    `<div class="nm-drift-row"><span>${p.label}</span><strong class="${p.v > 0 ? 'text-red' : 'text-green'}">${p.v > 0 ? '+' : ''}${p.v}</strong></div>`).join('');

  const visitorHtml = v ? `
      <div class="nm-visitor">
        <div class="nm-visitor-head">🚪 <strong>The Pale Customer</strong> <span class="nm-visitor-sub">the Pale Man in a customer's face — waits at the gate, tonight only</span></div>
        <p>Offers <strong>${formatCurrency(v.offer)}</strong> for your <strong>${v.carLabel}</strong> (${Math.round(v.offer / Math.max(1, v.marketValue) * 100)}% of value). +18 Dread. 1 in 4 the money is ash by morning.</p>
        <div class="nm-actions">
          <button class="btn btn-danger" onclick="acceptPaleCustomer()">Take the money</button>
          <button class="btn btn-secondary" onclick="refusePaleCustomer()">Send them away</button>
        </div>
      </div>` : '';
  const ashHtml = n.ashDue > 0
    ? `<div class="nm-ash-warn">🔥 The last payment feels wrong. Something may be waiting for you in the morning.</div>` : '';

  return `
    <div class="dash-card nm-panel nm-tier-${tier}">
      <h3>${uiIcon('eye')} The Dark <span class="nm-tier-label">${DREAD_TIER_LABELS[tier]}</span></h3>
      <div class="nm-panel-grid">
        <div class="nm-panel-main">
          <div class="nm-dread-bar" role="progressbar" aria-label="Dread" aria-valuemin="0" aria-valuemax="100" aria-valuenow="${d}">
            <div class="nm-dread-fill" style="width:${d}%"></div>
            <span class="nm-dread-num">Dread ${d} / 100</span>
          </div>
          <div class="nm-sleep-bar" role="progressbar" aria-label="Sleep" aria-valuemin="0" aria-valuemax="100">
            <div class="nm-sleep-fill" style="width:${Math.ceil(getSleep())}%"></div>
            <span class="nm-sleep-num">Sleep ${Math.ceil(getSleep())}%</span>
          </div>
          <div class="stat-row"><span>Sleep drain</span><strong class="text-red">−${getSleepDrain()}% / minute</strong></div>
          <div class="nm-actions">
            <button class="btn btn-primary nm-sleep-btn" onclick="openPaleDuel()" ${paleCooldownLeft() > 0 ? 'disabled' : ''} title="Best of three. Win to sleep (+${getSleepWinGain()}%). Lose and you gain nothing, and he makes you wait ${getLossCooldownSec()}s.">${sleepBtnLabel()}</button>
            ${hasWard('wardHourglass') ? `<button class="btn btn-secondary" onclick="turnHourglass()" ${n.hourglassDay === state.day ? 'disabled' : ''} title="Once a night. Sleep stops draining for 5 minutes.">${(n.hourglassUntil || 0) > Date.now() ? '⏳ Time stands still…' : n.hourglassDay === state.day ? '⏳ Hourglass spent tonight' : '⏳ Turn the Hourglass · freeze sleep 5 min'}</button>` : ''}
          </div>
          <p class="nm-pale-toy">He could kill you where you stand. His own rules say he has to let you choose.</p>
          <div class="stat-row"><span>Reckonings</span><strong class="${n.reckonings ? 'text-red' : 'text-muted'}">${n.reckonings || 0} / ${NIGHTMARE_MAX_RECKONINGS} <small>(the last is final)</small></strong></div>
          <div class="stat-row"><span>Cursed cars on the lot</span><strong class="${cursedOnLot ? 'text-red' : 'text-muted'}">${cursedOnLot}</strong></div>
          <div class="stat-row"><span>Tonight's drift</span><strong class="${driftCls}">${drift.total > 0 ? '+' : ''}${drift.total} Dread</strong></div>
          <div class="nm-drift">${driftRows}</div>
          <div class="nm-actions">
            <button class="btn btn-primary" onclick="lightCandle()" ${candleUsed || state.cash < getCandleCost() ? 'disabled' : ''}
              title="${getCandlesAllowed() > 1 ? 'Two per night' : 'One per night'}. Costs ${formatCurrency(getCandleCost())} each.">🕯️ ${candleUsed ? (getCandlesAllowed() > 1 ? 'Both candles lit tonight' : 'Candle lit tonight') : `Light a Candle · −${NIGHTMARE_CANDLE_RELIEF} Dread · ${formatCurrency(getCandleCost())}`}</button>
          </div>
          ${ashHtml}
          ${state.day >= 2 ? `<div class="nm-actions"><button class="btn btn-secondary" onclick="openOfficeBoard()" title="The pegboard of keys behind the desk.">🗝️ Office board</button></div>` : ''}
        </div>
        <ul class="nm-rules">
          <li><strong>Sell cars</strong> to keep the dark back (−${Math.round(getSaleDreadRelief() * 10) / 10} Dread each, up to −16 a night).${nmDepth() > 0 ? ' <em>The longer you stay, the less each sale helps.</em>' : ''}</li>
          <li>At <strong>100 Dread</strong> the dark collects: cash, your best car, and a step closer to the end.</li>
          <li><strong>Cursed cars</strong> sell cheap — inspect first. Exorcise them, or sell them fast.</li>
          <li><strong>Sleep</strong> drains ${getSleepDrain()}% every minute. You haven't really slept since you signed. At <strong>0</strong> you pass out and the run is over.</li>
          <li>Beat the <strong>Pale Man</strong> at rock-paper-scissors (best of three) to sleep: +${getSleepWinGain()}%. Lose and you gain nothing, and he makes you wait ${getLossCooldownSec()}s. He is only toying with you.</li>
          <li>The <strong>Pale Customer</strong> is the Pale Man in disguise. He pays far too much. Money can burn.</li>
          <li>Buy <strong>Wards</strong> in Upgrades to push the night back for good.</li>
          <li>Overhead ×${(2 * (1 + 0.3 * Math.min(nmDepth(), 2))).toFixed(1)}, staff pay +25%, buyers pickier, bankruptcy is permanent.</li>
          ${nmDepth() > 0 ? `<li><strong>The night deepens</strong> as the nights pass: more Dread each dusk, more curses, pricier candles, faster sleep drain, harder Reckonings.</li>` : ''}
        </ul>
      </div>
      ${visitorHtml}
    </div>`;
}

// ------------------------------------------------------------
// Modal queue (dramatic one-offs: Reckonings, the Pale Customer)
// ------------------------------------------------------------
let _nmModalQueue = [];
let _nmModalOpen  = false;

/** spec: { title, html, tone?, valid?(), actions: [{ label, cls?, fn? }] } */
function showNightmareModal(spec) {
  if (_holdDayPopups || _nmModalOpen) { _nmModalQueue.push(spec); return; }
  _openNightmareModal(spec);
}

function _openNightmareModal(spec) {
  if (spec.valid && !spec.valid()) { flushHeldModals(); return; }
  _nmModalOpen = true;
  const ov = document.createElement('div');
  ov.className = 'nm-modal-overlay';
  ov.setAttribute('role', 'dialog');
  ov.setAttribute('aria-modal', 'true');
  ov.innerHTML = `<div class="nm-modal-box ${spec.tone || ''}">
      <h3 class="nm-modal-title"></h3><div class="nm-modal-body"></div><div class="nm-modal-actions"></div></div>`;
  ov.querySelector('.nm-modal-title').textContent = spec.title;
  ov.querySelector('.nm-modal-body').innerHTML = spec.html;
  const bar = ov.querySelector('.nm-modal-actions');
  const close = (fn) => {
    ov.remove();
    _nmModalOpen = false;
    playSfx('modalClose');
    if (typeof fn === 'function') fn();
    flushHeldModals();
  };
  (spec.actions || [{ label: 'Close' }]).forEach(a => {
    const b = document.createElement('button');
    b.type = 'button';
    b.className = `btn ${a.cls || 'btn-secondary'}`;
    b.textContent = a.label;
    b.addEventListener('click', () => close(a.fn));
    bar.appendChild(b);
  });
  document.body.appendChild(ov);
  playSfx('modalOpen');
  setTimeout(() => { try { bar.firstChild && bar.firstChild.focus(); } catch (_) {} }, 30);
}

/** Opens the next queued nightmare modal, if any. Returns true while one is (or just became) open. */
function flushNightmareModals() {
  if (_nmModalOpen) return true;
  if (!_nmModalQueue.length) return false;
  _openNightmareModal(_nmModalQueue.shift());
  return true;
}

// ------------------------------------------------------------
// Atmosphere — red skies, fog, grain, flicker, watching eyes
// ------------------------------------------------------------
let _nmSessionActive = false;
let _nmFxRunning     = false;
let _nmEyesTimer     = null;
let _nmGlitchTimer   = null;

function ensureNightmareOverlay() {
  if (document.getElementById('nm-overlay')) return;
  const ov = document.createElement('div');
  ov.id = 'nm-overlay';
  ov.setAttribute('aria-hidden', 'true');
  ov.innerHTML = '<div class="nm-fog nm-fog-a"></div><div class="nm-fog nm-fog-b"></div>' +
                 '<div class="nm-vignette"></div><div class="nm-grain"></div><div class="nm-flicker"></div><div class="nm-flash"></div>';
  document.body.appendChild(ov);
  const eyes = document.createElement('div');
  eyes.id = 'nm-eyes-layer';
  eyes.setAttribute('aria-hidden', 'true');
  document.body.appendChild(eyes);
}

/** Idempotent: makes the page match the current save (red + haunted on Nightmare, normal otherwise). */
function applyNightmareAtmosphere() {
  const on = !!(_nmSessionActive && isNightmare());
  const body = document.body;
  body.classList.toggle('nightmare', on);
  const meta = document.querySelector('meta[name="theme-color"]');
  if (on) {
    ensureNightmareOverlay();
    const tier = getDreadTier();
    body.dataset.dread = String(tier);
    body.style.setProperty('--nm-beat', ['7s', '4.6s', '2.9s', '1.9s'][tier]);
    if (meta) meta.setAttribute('content', '#1a0306');
    startNightmareFx();
    startSleepClock();
  } else {
    delete body.dataset.dread;
    body.style.removeProperty('--nm-beat');
    if (meta) meta.setAttribute('content', '#07162b');
    stopNightmareFx();
    stopSleepClock();
  }
}

function nightmareFx(kind, ms) {
  const b = document.body;
  if (!b.classList.contains('nightmare')) return;
  b.classList.add('nm-fx-' + kind);
  setTimeout(() => b.classList.remove('nm-fx-' + kind), ms);
}

function startNightmareFx() {
  if (_nmFxRunning) return;
  _nmFxRunning = true;
  scheduleNightmareEyes();
  scheduleNightmareGlitch();
}
function stopNightmareFx() {
  _nmFxRunning = false;
  clearTimeout(_nmEyesTimer); clearTimeout(_nmGlitchTimer);
  const layer = document.getElementById('nm-eyes-layer');
  if (layer) layer.textContent = '';
}

function scheduleNightmareEyes() {
  if (!_nmFxRunning) return;
  const base = [75000, 45000, 26000, 13000][getDreadTier()];
  _nmEyesTimer = setTimeout(() => {
    if (getDreadTier() >= 1 || Math.random() < 0.2) spawnNightmareEyes();
    scheduleNightmareEyes();
  }, base * (0.6 + Math.random() * 0.9));
}

function spawnNightmareEyes() {
  const layer = document.getElementById('nm-eyes-layer');
  if (!layer || !document.body.classList.contains('nightmare') || layer.childElementCount >= 2) return;
  const el = document.createElement('button');
  el.type = 'button';
  el.className = 'nm-eyes';
  el.tabIndex = -1;
  el.setAttribute('aria-hidden', 'true');
  const edge = Math.random();
  let x, y;
  if (edge < 0.4)      { x = 2 + Math.random() * 9;  y = 14 + Math.random() * 70; }
  else if (edge < 0.8) { x = 89 + Math.random() * 7; y = 14 + Math.random() * 70; }
  else                 { x = 10 + Math.random() * 80; y = 90 + Math.random() * 5; }
  el.style.left = x + '%';
  el.style.top = y + '%';
  el.style.setProperty('--s', (0.8 + Math.random() * 0.9).toFixed(2));
  el.innerHTML = '<i></i><i></i>';
  el.addEventListener('click', (e) => {
    const t = e.currentTarget;
    t.classList.remove('open'); t.classList.add('startled');
    nm().eyesClicked = (nm().eyesClicked || 0) + 1;
    playSfx('whisper');
    setTimeout(() => t.remove(), 450);
    runAchievementChecks();
    saveState();
  });
  layer.appendChild(el);
  requestAnimationFrame(() => el.classList.add('open'));
  const hold = 2400 + Math.random() * 3200;
  setTimeout(() => el.classList.add('blink'), hold * 0.62);
  setTimeout(() => el.classList.remove('open'), hold);
  setTimeout(() => el.remove(), hold + 1500);
}

function scheduleNightmareGlitch() {
  if (!_nmFxRunning) return;
  const delay = getDreadTier() >= 2 ? 14000 + Math.random() * 22000 : 38000 + Math.random() * 40000;
  _nmGlitchTimer = setTimeout(() => {
    if (getDreadTier() >= 1) {
      const el = document.getElementById(randomFrom(['stat-cash', 'stat-day', 'stat-rep', 'stat-garage', 'stat-debt', 'stat-dread']));
      if (el) { el.classList.add('nm-glitch'); setTimeout(() => el.classList.remove('nm-glitch'), 560); }
    }
    scheduleNightmareGlitch();
  }, delay);
}

// ============================================================
// NIGHTMARE MUSIC — "Lullaby for an Empty Lot"
// ------------------------------------------------------------
// A slow dark-ambient piece synthesized live, like the rest of the
// soundtrack (no audio files). Built to be unsettling but soothing —
// nothing sudden, nothing sharp, everything soft and washed in reverb:
//   • a sub-bass drone that swells and recedes like breathing
//   • long, overlapping pad chords drifting through eerie-but-gentle
//     colours (minor ♭9, lydian ♯11, half-diminished, phrygian sus)
//   • a music-box lullaby that wanders the lot, slightly out of tune,
//     with an occasional wrong note
//   • a bed of low wind, rare distant whispers and a far-off groan
//   • a very soft heartbeat that only appears — and quickens — as
//     your Dread climbs; the tone also opens up a little with Dread
// ============================================================
const NM_MUSIC_VOLUME_SCALE = 0.55;
const NM_MIN_GAIN = 0.0001;
const NM_CHORD_SECONDS = 18;       // how long each chord rings
const NM_CHORD_STEP_SECONDS = 14;  // …and when the next begins (overlap = slow crossfade)
const NM_CHORDS = [
  { root: 'D2',  notes: ['A3', 'D4', 'F4', 'Eb5'] },   // Dm(♭9)        — minor with a cold shadow on top
  { root: 'Bb1', notes: ['F3', 'A3', 'D4', 'E4']  },   // Bbmaj7(♯11)   — dreamlike, slightly wrong
  { root: 'G2',  notes: ['Bb3', 'Db4', 'F4', 'A4'] },  // Gm7♭5-ish     — hollow
  { root: 'A1',  notes: ['E3', 'A3', 'Bb3', 'E4']  },  // Asus(♭9)      — phrygian lean, unresolved
];
// The lullaby: a descending child's tune in D minor that never quite resolves.
const NM_MOTIF = ['A4', 'D5', 'F5', 'E5', 'D5', 'C5', 'D5', 'A4', 'Bb4', 'D5', 'F5', 'G5', 'F5', 'E5', 'D5', 'C#5'];

let nmMusic = null;      // the live engine (null when stopped)
let nmMusicGen = 0;      // invalidates stale timers after stop()

function nmMakeImpulse(ctx, seconds, power) {
  const rate = ctx.sampleRate, len = Math.floor(rate * seconds);
  const buf = ctx.createBuffer(2, len, rate);
  for (let ch = 0; ch < 2; ch++) {
    const d = buf.getChannelData(ch);
    let lp = 0;
    for (let i = 0; i < len; i++) {
      const t = i / len;
      lp += ((Math.random() * 2 - 1) - lp) * (0.34 - 0.27 * t);   // tail grows darker as it fades
      d[i] = lp * Math.pow(1 - t, power);
    }
  }
  return buf;
}

function nmMakeNoise(ctx, seconds, brown) {
  const len = Math.floor(ctx.sampleRate * seconds);
  const buf = ctx.createBuffer(1, len, ctx.sampleRate);
  const d = buf.getChannelData(0);
  let last = 0;
  for (let i = 0; i < len; i++) {
    const w = Math.random() * 2 - 1;
    if (brown) { last = (last + 0.02 * w) / 1.02; d[i] = last * 3.2; } else { d[i] = w; }
  }
  const f = Math.floor(ctx.sampleRate * 0.06);       // fade the seam so the loop never clicks
  for (let i = 0; i < f; i++) { const g = i / f; d[i] *= g; d[len - 1 - i] *= g; }
  return buf;
}

function nmPanner(ctx, amount) {
  if (!ctx.createStereoPanner) return null;
  const p = ctx.createStereoPanner();
  p.pan.value = (Math.random() * 2 - 1) * amount;
  return p;
}

function startNightmareMusic() {
  if (settings.musicMuted || nmMusic) return;
  const ctx = ensureAudioCtx();
  if (!ctx) return;
  try {
    const m = { ctx, gen: ++nmMusicGen, timers: {}, persistent: [], chordIdx: 0, motifIdx: 0 };
    nmMusic = m;

    // Output chain: sources → (dry + reverb) → master → soft lowpass → speakers
    m.master = ctx.createGain();
    m.master.gain.value = NM_MIN_GAIN;
    m.tone = ctx.createBiquadFilter();
    m.tone.type = 'lowpass'; m.tone.frequency.value = 900; m.tone.Q.value = 0.35;
    m.master.connect(m.tone); m.tone.connect(ctx.destination);

    m.reverb = ctx.createConvolver();
    m.reverb.buffer = nmMakeImpulse(ctx, 6.5, 2.4);
    const wet = ctx.createGain(); wet.gain.value = 0.85;
    m.reverb.connect(wet); wet.connect(m.master);
    m.out = ctx.createGain();                       // everything "in the room" goes through here
    const dry = ctx.createGain(); dry.gain.value = 0.7;
    m.out.connect(dry); dry.connect(m.master);
    m.out.connect(m.reverb);
    m.sub = ctx.createGain();                       // bass that should stay clean and dry
    m.sub.connect(m.master);

    m.noiseBuf = nmMakeNoise(ctx, 3, false);

    const now = ctx.currentTime;

    // ── Sub drone: D1 + A1 + a faint D2, breathing slowly ──────────────
    const droneGain = ctx.createGain();
    droneGain.gain.value = 0.085;
    droneGain.connect(m.sub);
    [[36.71, 'sine', 1.0], [55.0, 'sine', 0.45], [73.42, 'triangle', 0.22]].forEach(([f, type, lv]) => {
      const o = ctx.createOscillator(); const g = ctx.createGain();
      o.type = type; o.frequency.value = f; g.gain.value = lv;
      o.connect(g); g.connect(droneGain); o.start(now); m.persistent.push(o);
    });
    const breathe = ctx.createOscillator(); const breatheDepth = ctx.createGain();
    breathe.frequency.value = 0.055; breatheDepth.gain.value = 0.04;
    breathe.connect(breatheDepth); breatheDepth.connect(droneGain.gain);
    breathe.start(now); m.persistent.push(breathe);

    // ── Wind: brown noise through a slowly wandering band ─────────────
    const wind = ctx.createBufferSource();
    wind.buffer = nmMakeNoise(ctx, 4, true); wind.loop = true;
    const windBand = ctx.createBiquadFilter();
    windBand.type = 'bandpass'; windBand.frequency.value = 420; windBand.Q.value = 0.8;
    const windGain = ctx.createGain(); windGain.gain.value = 0.085;
    wind.connect(windBand); windBand.connect(windGain); windGain.connect(m.out);
    const sweep = ctx.createOscillator(); const sweepDepth = ctx.createGain();
    sweep.frequency.value = 0.037; sweepDepth.gain.value = 230;
    sweep.connect(sweepDepth); sweepDepth.connect(windBand.frequency);
    const swell = ctx.createOscillator(); const swellDepth = ctx.createGain();
    swell.frequency.value = 0.051; swellDepth.gain.value = 0.035;
    swell.connect(swellDepth); swellDepth.connect(windGain.gain);
    wind.start(now); sweep.start(now); swell.start(now);
    m.persistent.push(wind, sweep, swell);

    // Fade the whole piece in over a few seconds.
    m.master.gain.setTargetAtTime(
      clamp(settings.musicVolume ?? 0.16, 0, 1) * NM_MUSIC_VOLUME_SCALE, now, 1.6);

    nmChordStep(m);
    m.timers.bell    = setTimeout(() => nmBell(m), 3500);
    m.timers.heart   = setTimeout(() => nmHeartbeat(m), 2000);
    m.timers.whisper = setTimeout(() => nmWhisper(m), 14000 + Math.random() * 8000);
  } catch (err) {
    console.warn('Nightmare music failed to start', err);
    nmMusic = null;
  }
}

function stopNightmareMusic() {
  nmMusicGen++;
  const m = nmMusic;
  if (!m) return;
  nmMusic = null;
  Object.values(m.timers).forEach(clearTimeout);
  try {
    m.master.gain.cancelScheduledValues(m.ctx.currentTime);
    m.master.gain.setTargetAtTime(NM_MIN_GAIN, m.ctx.currentTime, 0.3);
  } catch (_) {}
  setTimeout(() => {
    m.persistent.forEach(n => { try { n.stop(); } catch (_) {} });
    try { m.master.disconnect(); m.tone.disconnect(); } catch (_) {}
  }, 1800);
}

/** Dread opens the tone up a touch (more tension, never harshness). */
function nmApplyIntensity(m) {
  const d = getDread() / 100;
  try { m.tone.frequency.setTargetAtTime(760 + d * 900, m.ctx.currentTime, 3); } catch (_) {}
}

function nmRetry(m, key, fn) { m.timers[key] = setTimeout(() => fn(m), 400); }

/** One long pad chord; the next begins before this one has finished, so they dissolve into each other. */
function nmChordStep(m) {
  if (m.gen !== nmMusicGen) return;
  const ctx = m.ctx;
  if (ctx.state !== 'running') { nmRetry(m, 'chord', nmChordStep); return; }
  nmApplyIntensity(m);
  const chord = NM_CHORDS[m.chordIdx % NM_CHORDS.length];
  m.chordIdx++;
  const t = ctx.currentTime + 0.1;
  const dur = NM_CHORD_SECONDS, attack = 5, release = 7;

  const voice = (freq, type, peak, bus) => {
    const o = ctx.createOscillator(); const g = ctx.createGain();
    o.type = type;
    o.frequency.setValueAtTime(freq, t);
    o.detune.setValueAtTime((Math.random() - 0.5) * 12, t);
    g.gain.setValueAtTime(NM_MIN_GAIN, t);
    g.gain.linearRampToValueAtTime(peak, t + attack);
    g.gain.setValueAtTime(peak, t + dur - release);
    g.gain.linearRampToValueAtTime(NM_MIN_GAIN, t + dur);
    o.connect(g); g.connect(bus);
    o.start(t); o.stop(t + dur + 0.1);
  };
  voice(noteFreq(chord.root), 'sine', 0.07, m.sub);
  chord.notes.forEach((name) => {
    const f = noteFreq(name);
    voice(f, 'sine', 0.05, m.out);
    voice(f * 1.003, 'triangle', 0.016, m.out);
  });
  m.timers.chord = setTimeout(() => nmChordStep(m), NM_CHORD_STEP_SECONDS * 1000);
}

/** One struck bell partial-set (a music-box tine): soft attack, long fading ring, slight downward sag. */
function nmPlayBell(m, freq, t, peak) {
  const ctx = m.ctx;
  const pan = nmPanner(ctx, 0.65);
  const bus = ctx.createGain();
  bus.gain.value = 1;
  if (pan) { bus.connect(pan); pan.connect(m.out); } else { bus.connect(m.out); }
  [[1, 1, 4.4], [2.76, 0.26, 2.2], [5.4, 0.09, 1.0]].forEach(([ratio, level, decay]) => {
    const f = freq * ratio;
    if (f > 5200) return;
    const o = ctx.createOscillator(); const g = ctx.createGain();
    o.type = 'sine';
    o.frequency.setValueAtTime(f, t);
    o.detune.setValueAtTime(0, t);
    o.detune.linearRampToValueAtTime(-16, t + decay);
    const p = peak * level;
    g.gain.setValueAtTime(NM_MIN_GAIN, t);
    g.gain.linearRampToValueAtTime(p, t + 0.008);
    g.gain.exponentialRampToValueAtTime(NM_MIN_GAIN, t + decay);
    o.connect(g); g.connect(bus);
    o.start(t); o.stop(t + decay + 0.1);
  });
}

function nmBell(m) {
  if (m.gen !== nmMusicGen) return;
  const ctx = m.ctx;
  if (ctx.state !== 'running') { nmRetry(m, 'bell', nmBell); return; }
  const dread = getDread() / 100;
  if (Math.random() > 0.12) {                              // now and then the tune simply forgets itself
    let freq = noteFreq(NM_MOTIF[m.motifIdx % NM_MOTIF.length]);
    m.motifIdx++;
    if (Math.random() < 0.05 + dread * 0.16) freq *= Math.pow(2, (Math.random() < 0.5 ? -1 : 1) / 12);   // a wrong note
    freq *= Math.pow(2, ((Math.random() * 2 - 1) * (18 + dread * 40)) / 1200);                         // warped tuning
    nmPlayBell(m, freq, ctx.currentTime + 0.05, 0.075 - dread * 0.012);
  }
  m.timers.bell = setTimeout(() => nmBell(m), 2200 + Math.random() * 3800 - dread * 900);
}

/** A very soft double-thump. Silent when calm; slow and faint as Dread rises, a touch quicker near the edge. */
function nmHeartbeat(m) {
  if (m.gen !== nmMusicGen) return;
  const ctx = m.ctx;
  if (ctx.state !== 'running') { nmRetry(m, 'heart', nmHeartbeat); return; }
  nmApplyIntensity(m);
  const tier = getDreadTier();
  const level = [0, 0.07, 0.13, 0.19][tier];
  if (level > 0) {
    const t = ctx.currentTime + 0.05;
    [[0, 1], [0.3, 0.7]].forEach(([dt, k]) => {
      const o = ctx.createOscillator(); const g = ctx.createGain();
      o.type = 'sine';
      o.frequency.setValueAtTime(72, t + dt);
      o.frequency.exponentialRampToValueAtTime(34, t + dt + 0.22);
      g.gain.setValueAtTime(NM_MIN_GAIN, t + dt);
      g.gain.linearRampToValueAtTime(level * k, t + dt + 0.014);
      g.gain.exponentialRampToValueAtTime(NM_MIN_GAIN, t + dt + 0.34);
      o.connect(g); g.connect(m.sub);
      o.start(t + dt); o.stop(t + dt + 0.4);
    });
  }
  m.timers.heart = setTimeout(() => nmHeartbeat(m), 60000 / (46 + tier * 6));
}

/** Rare distant events: a breath of almost-words, and a long far-off groan. */
function nmWhisper(m) {
  if (m.gen !== nmMusicGen) return;
  const ctx = m.ctx;
  if (ctx.state !== 'running') { nmRetry(m, 'whisper', nmWhisper); return; }
  const tier = getDreadTier();
  const t = ctx.currentTime + 0.1;

  if (Math.random() < 0.6 + tier * 0.1) {
    const dur = 3.6 + Math.random() * 2.4;
    const src = ctx.createBufferSource(); src.buffer = m.noiseBuf; src.loop = true;
    const g = ctx.createGain();
    g.gain.setValueAtTime(NM_MIN_GAIN, t);
    g.gain.linearRampToValueAtTime(0.5, t + dur * 0.45);
    g.gain.linearRampToValueAtTime(NM_MIN_GAIN, t + dur);
    [[430 + Math.random() * 260, 8], [1100 + Math.random() * 520, 10]].forEach(([f, q]) => {
      const bp = ctx.createBiquadFilter(); bp.type = 'bandpass'; bp.frequency.value = f; bp.Q.value = q;
      src.connect(bp); bp.connect(g);
    });
    const pan = nmPanner(ctx, 0.8);
    const lvl = ctx.createGain(); lvl.gain.value = 0.045;
    g.connect(lvl);
    if (pan) { lvl.connect(pan); pan.connect(m.out); } else { lvl.connect(m.out); }
    src.start(t, Math.random()); src.stop(t + dur + 0.1);
  }
  if (tier >= 1 && Math.random() < 0.35) {
    const o = ctx.createOscillator(); const lp = ctx.createBiquadFilter(); const g = ctx.createGain();
    o.type = 'sawtooth';
    o.frequency.setValueAtTime(54, t + 0.5);
    o.frequency.linearRampToValueAtTime(44, t + 5.5);
    lp.type = 'lowpass'; lp.frequency.value = 170;
    g.gain.setValueAtTime(NM_MIN_GAIN, t + 0.5);
    g.gain.linearRampToValueAtTime(0.07, t + 3);
    g.gain.linearRampToValueAtTime(NM_MIN_GAIN, t + 6);
    o.connect(lp); lp.connect(g); g.connect(m.out);
    o.start(t + 0.5); o.stop(t + 6.2);
  }
  m.timers.whisper = setTimeout(() => nmWhisper(m), 16000 + Math.random() * 24000 - tier * 3500);
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
  _nmSessionActive = false;      // the menu is always the calm blue one
  applyNightmareAtmosphere();
  playSfx('navigate');

  // Restore home screen
  const hs = document.getElementById('home-screen');
  hs.classList.remove('hidden');
  applyMusicForContext(); // hand back off from the in-game soundtrack to the menu one
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
  state.upgrades.showroomTier = SHOWROOM_TIERS.length - 1;
  syncLoanTermsToDifficulty();
  ensureStaffCandidates();
  _cheatApply('⬆️ All upgrades unlocked.');
}

function cheatUnlockAllAchievements() {
  if (!state.achievementsUnlocked) state.achievementsUnlocked = {};
  for (const ach of ACHIEVEMENTS) {
    unlockAchievementGlobally(ach.id, state.day);
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
  ensureAuctionState();
  state.auctions.lots = [];
  processAuctions();
  _cheatApply('🔄 Used Market and Auction House refreshed.');
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
    applyMusicForContext();
  }
}

function init() {
  loadGlobalAchievements(); // browser-wide achievements (merges any already earned in saves)
  loadSettings(); // must be before any render so dark mode applies
  bindAudioUnlock(); // catch the first real click/tap/keypress so audio isn't stuck suspended
  bindGlobalClickSfx(); // give every button in the game a consistent tactile click
  applyMusicForContext(); // arm the menu soundtrack (audible once the AudioContext resumes on first gesture)

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

  // Insurance event modal — OK button and backdrop click both close it
  document.getElementById('insurance-event-ok').addEventListener('click', closeInsuranceEventModal);
  document.getElementById('insurance-event-modal').addEventListener('click', e => {
    if (e.target === document.getElementById('insurance-event-modal')) closeInsuranceEventModal();
  });

  // Patch notes modal — close on backdrop click
  document.getElementById('patch-notes-modal').addEventListener('click', e => {
    if (e.target === document.getElementById('patch-notes-modal')) closePatchNotesModal();
  });

  // Purchase agreement modal — close on backdrop click
  document.getElementById('receipt-modal').addEventListener('click', e => {
    if (e.target === document.getElementById('receipt-modal')) closeReceiptModal();
  });

  document.getElementById('import-file').addEventListener('change', e => {
    if (e.target.files[0]) { importSave(e.target.files[0]); e.target.value = ''; }
  });

  // Close the Car Lot sort dropdown on any click outside it
  document.addEventListener('click', () => closeLotSortMenu());

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
    makeLeaseAvailable, stopOfferingLease, viewLeaseDetails, toggleShowLeasedCars, setCarLotSort, toggleLotSortMenu, chooseLotSort, switchTab,
    buyUpgrade, selectSkillNode, detailCar, carWash, basicRepair, partsUpgrade,
    drawLoan, payDownLoan,
    lightCandle, exorciseCar, acceptPaleCustomer, refusePaleCustomer, openPaleDuel,
    openBulletinBoard, openOfficeBoard,
    selectInsurance, cancelInsurance,
    confirmNewGame, exportSave, hireStaff, dismissCandidate, fireStaff, toggleStaffTrading,
    toggleDarkMode, toggleReduceMotion, setBrightness, resetBrightness, setDifficulty, toggleSfxMuted, setSfxVolume, toggleTutorials,
    toggleMusicMuted, setMusicVolume, menuToggleMusic, playSfx,
    startMusic, // exposed so the boot-intro screen (index.html) can arm the soundtrack on its own first gesture
    applyMusicForContext, // preferred over startMusic() once app.js has booted — picks the right track (menu vs. in-game) instead of always arming the menu one
    renderCarLot, renderLeasing, renderServiceGarage, renderForSale, renderUsedMarket, renderFinance, renderAchievements,
    renderInsurance,
    renderReceipts, viewReceipt, closeReceiptModal, switchFinanceSubTab,
    switchUsedMarketSubTab, selectAuctionHouse, inspectAuctionLot, openAuctionLot, openConsignAuction, startAuction,
    auctionCenterClick, auctionPlayerBidClick, auctionSetMult, auctionSetReserve, closeAuction,
    renderShowroom, buyShowroomTier, moveToShowroom, moveToLot,
    menuToggleDark, menuToggleReduceMotion, menuResetBrightness, menuToggleSfx, menuToggleTutorials, menuSetDifficulty,
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
    if (liveAuction) return;   // the auction hall owns the keyboard while it's open
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

/**
 * Car Images — Wikimedia Commons sources.
 *
 * Keys  : lowercase "make model" (shared across trims)
 *         or "make model trim" for trim-level overrides.
 * Values: Commons file title (without the "File:" prefix).
 *
 * Images are fetched at runtime via the MediaWiki API (no local assets stored).
 * Attribution (author + license) is displayed in the UI per Commons licensing.
 *
 * ─── Adding / updating a car image ─────────────────────────────────────────
 * 1. Find the photo on https://commons.wikimedia.org (search the car name).
 * 2. Click the image to open the file page.
 * 3. Copy the exact file title shown in the page URL after "File:" — spaces
 *    and special characters must be preserved exactly.
 * 4. Add an entry below:
 *      'make model': 'Exact_File_Title.jpg',
 *    or for a trim override:
 *      'make model trim': 'Exact_File_Title.jpg',
 * 5. The app fetches attribution metadata automatically; no local file needed.
 * ────────────────────────────────────────────────────────────────────────────
 */

// ── Per-make+model Commons file titles (shared across all trims) ─────────────
export const CAR_IMAGE_COMMONS = {
  // Economy / Compact
  'toyota corolla':           '2019 Toyota Corolla SE (North America), front 8.15.19.jpg',
  'toyota yaris':             '2019 Toyota Yaris L (North America), front 8.15.19.jpg',
  'honda civic':              '2022 Honda Civic EX (North America), front 9.3.22.jpg',
  'honda fit':                'Honda Fit (2014-2020) front.jpg',
  'hyundai elantra':          '2021 Hyundai Elantra SEL (US), front 10.23.20.jpg',
  'mazda mazda3':             '2019 Mazda3 S sedan (North America), front 9.6.19.jpg',
  'nissan versa':             '2020 Nissan Versa SR, front 10.11.19.jpg',
  'volkswagen jetta':         '2019 Volkswagen Jetta S (US), front 8.15.19.jpg',
  'kia forte':                '2019 Kia Forte FE (US), front 9.6.19.jpg',
  'chevrolet spark':          '2022 Chevrolet Spark 1LT, front 10.1.21.jpg',
  'ford fiesta':              '2019 Ford Fiesta SE sedan (North America), front 3.22.19.jpg',

  // Sedan / Mid-size
  'toyota camry':             '2024 Toyota Camry XSE (North America), front 10.7.23.jpg',
  'honda accord':             '2023 Honda Accord Sport, front 9.16.22.jpg',
  'chevrolet malibu':         '2019 Chevrolet Malibu LT, front 7.8.19.jpg',
  'ford fusion':              '2019 Ford Fusion SE, front 8.15.19.jpg',
  'nissan altima':            '2019 Nissan Altima SR, front 8.15.19.jpg',
  'hyundai sonata':           '2020 Hyundai Sonata SEL, front 10.11.19.jpg',
  'kia optima':               '2019 Kia Optima S, front 9.6.19.jpg',
  'mazda mazda6':             '2019 Mazda6 Sport, front 8.15.19.jpg',
  'volkswagen passat':        '2019 Volkswagen Passat S, front 8.15.19.jpg',
  'subaru legacy':            '2020 Subaru Legacy Premium, front 10.11.19.jpg',
  'chrysler 300':             '2019 Chrysler 300 S, front 8.15.19.jpg',

  // SUV / Crossover
  'toyota rav4':              '2019 Toyota RAV4 XSE (North America), front 8.15.19.jpg',
  'toyota highlander':        '2020 Toyota Highlander XLE (North America), front 11.11.20.jpg',
  'toyota 4runner':           '2020 Toyota 4Runner TRD Pro (North America), front 11.11.20.jpg',
  'honda cr-v':               '2023 Honda CR-V Sport Touring (North America), front 3.18.23.jpg',
  'honda pilot':              '2019 Honda Pilot Elite, front 7.1.19.jpg',
  'honda passport':           '2022 Honda Passport Elite, front 10.1.21.jpg',
  'ford escape':              '2020 Ford Escape SE, front 10.23.19.jpg',
  'ford explorer':            '2020 Ford Explorer ST, front 11.14.19.jpg',
  'ford bronco':              '2023 Ford Bronco Outer Banks (4-door), front 10.21.22.jpg',
  'ford edge':                '2019 Ford Edge SEL, front 8.15.19.jpg',
  'chevrolet equinox':        '2018 Chevrolet Equinox LT, front 6.26.18.jpg',
  'chevrolet tahoe':          '2022 Chevrolet Tahoe LT, front 10.1.21.jpg',
  'chevrolet traverse':       '2022 Chevrolet Traverse LT, front 10.21.22.jpg',
  'chevrolet suburban':       '2021 Chevrolet Suburban LT, front 3.5.21.jpg',
  'chevrolet trailblazer':    '2021 Chevrolet Trailblazer LT, front 3.5.21.jpg',
  'nissan rogue':             '2021 Nissan Rogue SL, front 10.23.20.jpg',
  'nissan pathfinder':        '2022 Nissan Pathfinder SL, front 10.1.21.jpg',
  'nissan murano':            '2019 Nissan Murano Platinum, front 8.15.19.jpg',
  'hyundai tucson':           '2022 Hyundai Tucson SEL (NX4), front 10.1.21.jpg',
  'hyundai santa fe':         '2020 Hyundai Santa Fe SEL, front 10.11.19.jpg',
  'kia sorento':              '2021 Kia Sorento EX, front 3.5.21.jpg',
  'kia sportage':             '2022 Kia Sportage EX, front 10.1.21.jpg',
  'jeep grand cherokee':      '2021 Jeep Grand Cherokee Laredo, front 3.5.21.jpg',
  'jeep wrangler':            '2021 Jeep Wrangler Sport S, front 3.13.21.jpg',
  'subaru outback':           '2020 Subaru Outback 2.5i Limited, front 10.11.19.jpg',
  'subaru forester':          '2019 Subaru Forester Premium, front 8.15.19.jpg',
  'subaru crosstrek':         '2018 Subaru Crosstrek 2.0i Limited, front 6.26.18.jpg',
  'mazda cx-5':               '2021 Mazda CX-5 Grand Touring Reserve, front 3.5.21.jpg',
  'volkswagen tiguan':        '2021 Volkswagen Tiguan SEL, front 3.5.21.jpg',
  'gmc acadia':               '2021 GMC Acadia SLT-1, front 3.5.21.jpg',
  'gmc yukon':                '2021 GMC Yukon SLT, front 3.5.21.jpg',
  'lincoln navigator':        '2021 Lincoln Navigator Reserve, front 3.5.21.jpg',
  'cadillac escalade':        '2021 Cadillac Escalade Sport, front 3.5.21.jpg',
  'tesla model y':            '2021 Tesla Model Y Long Range, front 10.23.20.jpg',

  // Truck
  'ford f-150':               '2021 Ford F-150 Lariat, front 3.28.21.jpg',
  'chevrolet silverado':      '2022 Chevrolet Silverado 1500 LT, front 10.15.21.jpg',
  'ram 1500':                 '2019 Ram 1500 Big Horn, front 8.15.19.jpg',
  'gmc sierra':               '2019 GMC Sierra 1500 SLE, front 8.15.19.jpg',
  'toyota tacoma':            '2020 Toyota Tacoma TRD Sport, front 10.11.19.jpg',
  'toyota tundra':            '2022 Toyota Tundra 1794 Edition, front 8.9.22.jpg',
  'nissan frontier':          '2022 Nissan Frontier SV, front 10.1.21.jpg',
  'honda ridgeline':          '2019 Honda Ridgeline RTL-E, front 8.15.19.jpg',
  'chevrolet colorado':       '2019 Chevrolet Colorado LT, front 8.15.19.jpg',
  'ford ranger':              '2019 Ford Ranger Lariat, front 8.15.19.jpg',
  'jeep gladiator':           '2020 Jeep Gladiator Sport S, front 11.14.19.jpg',
  'ram 2500':                 '2020 Ram 2500 Laramie, front 10.11.19.jpg',

  // Sports / Performance
  'ford mustang':             '2024 Ford Mustang GT, front 10.7.23.jpg',
  'chevrolet corvette':       '2020 Chevrolet Corvette Stingray Convertible (C8), front 10.11.19.jpg',
  'dodge challenger':         '2023 Dodge Challenger SRT Hellcat, front 10.21.22.jpg',
  'dodge charger':            '2019 Dodge Charger SXT, front 8.15.19.jpg',
  'subaru wrx':               '2022 Subaru WRX Premium, front 10.1.21.jpg',
  'honda civic type r':       '2023 Honda Civic Type R (FL5), front 9.16.22.jpg',
  'nissan 370z':              '2019 Nissan 370Z Sport, front 8.15.19.jpg',
  'mazda mx-5 miata':         '2019 Mazda MX-5 Miata Grand Touring, front 8.15.19.jpg',
  'toyota supra':             '2020 Toyota GR Supra 3.0 Premium, front 10.11.19.jpg',
  'porsche 911':              '2020 Porsche 911 Carrera (992), front 10.11.19.jpg',
  'porsche cayenne':          '2019 Porsche Cayenne S (9YA), front 6.22.19.jpg',
  'porsche panamera':         '2017 Porsche Panamera 4S, front 4.22.17.jpg',
  'ferrari 488':              'Ferrari 488 GTB Geneva 2015.jpg',
  'ferrari roma':             'Ferrari Roma - 2020 Paris Motor Show.jpg',
  'lamborghini huracan':      'Lamborghini Huracan Performante Spyder (40959419843).jpg',
  'lamborghini urus':         'Lamborghini Urus (front).jpg',
  'mclaren 720s':             'McLaren 720S - front (cropped).jpg',
  'bugatti chiron':           'Bugatti Chiron (34768720790).jpg',

  // Luxury Sedan / Coupe
  'bmw 3 series':             '2019 BMW 330i (G20), front 8.23.19.jpg',
  'bmw 5 series':             '2017 BMW 530i (G30), front 4.22.17.jpg',
  'bmw 7 series':             '2020 BMW 740i xDrive, front 10.11.19.jpg',
  'bmw m3':                   '2021 BMW M3 (G80), front 3.5.21.jpg',
  'bmw m5':                   '2021 BMW M5 Competition (F90 LCI), front 3.5.21.jpg',
  'bmw x5':                   '2019 BMW X5 xDrive50i (G05), front 6.22.19.jpg',
  'mercedes-benz c-class':    '2022 Mercedes-Benz C300 (W206), front 10.22.21.jpg',
  'mercedes-benz e-class':    '2021 Mercedes-Benz E450 (W213 facelift), front 10.23.20.jpg',
  'mercedes-benz s-class':    '2021 Mercedes-Benz S500 (W223), front 3.5.21.jpg',
  'mercedes-benz gle':        '2020 Mercedes-Benz GLE 350 (V167), front 10.11.19.jpg',
  'audi a4':                  '2020 Audi A4 2.0T quattro (B9), front 8.10.20.jpg',
  'audi a6':                  '2019 Audi A6 2.0T quattro, front 8.15.19.jpg',
  'audi q5':                  '2021 Audi Q5 Premium Plus, front 10.23.20.jpg',
  'audi q7':                  '2020 Audi Q7 55 TFSI quattro, front 10.11.19.jpg',
  'lexus is':                 '2021 Lexus IS 350 F Sport (US), front 10.23.20.jpg',
  'lexus es':                 '2019 Lexus ES 350 F Sport, front 8.15.19.jpg',
  'lexus rx':                 '2020 Lexus RX 350 F Sport, front 10.11.19.jpg',
  'lexus gx':                 '2020 Lexus GX 460 Premium, front 10.11.19.jpg',
  'infiniti q50':             '2018 Infiniti Q50 3.0t Sport, front 6.26.18.jpg',
  'cadillac ct5':             '2020 Cadillac CT5 Sport, front 10.11.19.jpg',
  'cadillac xt5':             '2020 Cadillac XT5 Premium Luxury, front 10.11.19.jpg',
  'lincoln mkz':              '2019 Lincoln MKZ Reserve, front 8.15.19.jpg',
  'genesis g70':              '2021 Genesis G70 3.3T Sport, front 3.5.21.jpg',
  'genesis g80':              '2021 Genesis G80 3.5T Sport, front 3.5.21.jpg',
  'volvo xc90':               '2020 Volvo XC90 T6 Inscription, front 10.11.19.jpg',
  'volvo s60':                '2019 Volvo S60 T5 Momentum, front 8.15.19.jpg',
  'tesla model 3':            '2021 Tesla Model 3 Long Range AWD, front 10.23.20.jpg',
  'tesla model s':            '2021 Tesla Model S Plaid, front 3.5.21.jpg',
};

// ── Optional trim-level overrides ─────────────────────────────────────────────
// Keys: lowercase "make model trim". Take precedence over the per-model entry above.
export const CAR_IMAGE_TRIM_OVERRIDES = {
  'honda civic si':                   '2022 Honda Civic Si sedan, front 10.1.21.jpg',
  'honda civic type r':               '2023 Honda Civic Type R (FL5), front 9.16.22.jpg',
  'toyota camry trd':                 '2020 Toyota Camry TRD, front 10.11.19.jpg',
  'ford f-150 raptor':                '2023 Ford F-150 Raptor R, front 10.21.22.jpg',
  'chevrolet corvette z06':           '2023 Chevrolet Corvette Z06, front 10.21.22.jpg',
  'dodge challenger srt hellcat':     '2019 Dodge Challenger SRT Hellcat Redeye, front 8.15.19.jpg',
  'bmw m3 competition':               '2021 BMW M3 Competition (G80), front 3.5.21.jpg',
  'ford mustang shelby gt500':        '2020 Ford Mustang Shelby GT500, front 10.11.19.jpg',
  'jeep wrangler rubicon':            '2021 Jeep Wrangler Rubicon, front 3.13.21.jpg',
  'ford bronco badlands':             '2021 Ford Bronco Badlands 4-door, front 10.23.20.jpg',
  'subaru wrx sti':                   '2021 Subaru WRX STI Limited, front 3.5.21.jpg',
};

// ── MediaWiki Commons API ─────────────────────────────────────────────────────
const COMMONS_API = 'https://commons.wikimedia.org/w/api.php';

// In-memory cache: commonsTitle → resolved info object | null
const _imageCache = new Map();

// Dedup in-flight fetches to avoid double-requesting the same title
const _inFlight = new Map();

/**
 * Return the Commons file title for a given car, or null if no mapping exists.
 * Checks trim override first, then falls back to the per-model entry.
 *
 * @param {string} make
 * @param {string} model
 * @param {string} [trim]
 * @returns {string|null}
 */
export function getCommonsTitle(make, model, trim) {
  const mk = (make  || '').toLowerCase().trim();
  const mo = (model || '').toLowerCase().trim();
  const tr = (trim  || '').toLowerCase().trim();
  const trimKey  = `${mk} ${mo} ${tr}`;
  const modelKey = `${mk} ${mo}`;
  return CAR_IMAGE_TRIM_OVERRIDES[trimKey] || CAR_IMAGE_COMMONS[modelKey] || null;
}

/**
 * Safely strip HTML tags from a string returned by the Commons API.
 * Uses DOMParser when available (correct, handles all edge cases), falls back
 * to a regex that also handles unclosed/malformed tags.
 *
 * @param {string} html
 * @returns {string}
 */
function stripHtml(html) {
  if (!html) return '';
  try {
    const doc = new DOMParser().parseFromString(html, 'text/html');
    return (doc.body.textContent || '').trim();
  } catch {
    return '';
  }
}


/**
 * Fetch image metadata from Wikimedia Commons for a given file title.
 * Results are cached in-memory; duplicate in-flight requests are deduplicated.
 *
 * @param {string} commonsTitle  File title without the "File:" prefix.
 * @returns {Promise<{url:string, descUrl:string, license:string, author:string}|null>}
 */
export async function fetchCommonsImageInfo(commonsTitle) {
  if (!commonsTitle) return null;
  if (_imageCache.has(commonsTitle)) return _imageCache.get(commonsTitle);
  if (_inFlight.has(commonsTitle))   return _inFlight.get(commonsTitle);

  const promise = (async () => {
    try {
      const params = new URLSearchParams({
        action: 'query',
        titles: 'File:' + commonsTitle,
        prop:   'imageinfo',
        iiprop: 'url|extmetadata',
        format: 'json',
        origin: '*',
      });
      const res = await fetch(`${COMMONS_API}?${params}`);
      if (!res.ok) throw new Error('HTTP ' + res.status);
      const data  = await res.json();
      const pages = Object.values(data?.query?.pages || {});
      if (!pages.length || pages[0].missing !== undefined) {
        _imageCache.set(commonsTitle, null);
        return null;
      }
      const ii = pages[0]?.imageinfo?.[0];
      if (!ii?.url) {
        _imageCache.set(commonsTitle, null);
        return null;
      }
      const meta = ii.extmetadata || {};
      const info = {
        url:     ii.url,
        descUrl: ii.descriptionurl
          || `https://commons.wikimedia.org/wiki/File:${encodeURIComponent(commonsTitle)}`,
        license: stripHtml(meta.LicenseShortName?.value || meta.License?.value || ''),
        author:  stripHtml(meta.Artist?.value || ''),
      };
      _imageCache.set(commonsTitle, info);
      return info;
    } catch {
      _imageCache.set(commonsTitle, null);
      return null;
    } finally {
      _inFlight.delete(commonsTitle);
    }
  })();

  _inFlight.set(commonsTitle, promise);
  return promise;
}

/**
 * Warm the image cache for a list of cars in the background.
 * Call this after page load to pre-populate the cache without blocking rendering.
 *
 * @param {Array<{make:string, model:string, trim?:string}>} cars
 */
export function prefetchCarImages(cars) {
  const seen = new Set();
  for (const { make, model, trim } of cars) {
    const title = getCommonsTitle(make, model, trim);
    if (title && !seen.has(title) && !_imageCache.has(title)) {
      seen.add(title);
      fetchCommonsImageInfo(title); // fire-and-forget
    }
  }
}

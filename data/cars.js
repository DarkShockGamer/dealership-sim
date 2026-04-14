/**
 * Car Catalog — factory wholesale inventory.
 * Each entry: make, model, category, basePrice (wholesale cost),
 * marketValue (typical retail), deliveryDays, yearRange [min,max],
 * baseMileage [min,max], demandFactor (0.5–1.5).
 */
export const CAR_CATALOG = [
  // ── Economy ──────────────────────────────────────────────
  {
    make: 'Toyota', model: 'Corolla', category: 'Economy',
    basePrice: 14000, marketValue: 18500, deliveryDays: 2,
    yearRange: [2018, 2023], baseMileage: [5000, 45000], demandFactor: 1.3,
  },
  {
    make: 'Honda', model: 'Civic', category: 'Economy',
    basePrice: 14500, marketValue: 19000, deliveryDays: 2,
    yearRange: [2018, 2023], baseMileage: [5000, 45000], demandFactor: 1.4,
  },
  {
    make: 'Hyundai', model: 'Elantra', category: 'Economy',
    basePrice: 12500, marketValue: 16500, deliveryDays: 2,
    yearRange: [2018, 2023], baseMileage: [8000, 50000], demandFactor: 1.1,
  },
  {
    make: 'Kia', model: 'Forte', category: 'Economy',
    basePrice: 12000, marketValue: 15800, deliveryDays: 2,
    yearRange: [2018, 2023], baseMileage: [8000, 50000], demandFactor: 1.0,
  },
  {
    make: 'Nissan', model: 'Sentra', category: 'Economy',
    basePrice: 12800, marketValue: 16200, deliveryDays: 3,
    yearRange: [2018, 2023], baseMileage: [8000, 48000], demandFactor: 1.0,
  },
  {
    make: 'Chevrolet', model: 'Spark', category: 'Economy',
    basePrice: 9500, marketValue: 12500, deliveryDays: 3,
    yearRange: [2018, 2023], baseMileage: [10000, 55000], demandFactor: 0.8,
  },

  // ── Sedan ─────────────────────────────────────────────────
  {
    make: 'Toyota', model: 'Camry', category: 'Sedan',
    basePrice: 18000, marketValue: 24000, deliveryDays: 3,
    yearRange: [2017, 2023], baseMileage: [10000, 55000], demandFactor: 1.3,
  },
  {
    make: 'Honda', model: 'Accord', category: 'Sedan',
    basePrice: 18500, marketValue: 24500, deliveryDays: 3,
    yearRange: [2017, 2023], baseMileage: [10000, 55000], demandFactor: 1.2,
  },
  {
    make: 'Mazda', model: '6', category: 'Sedan',
    basePrice: 16000, marketValue: 21000, deliveryDays: 3,
    yearRange: [2017, 2022], baseMileage: [10000, 55000], demandFactor: 1.0,
  },
  {
    make: 'Volkswagen', model: 'Jetta', category: 'Sedan',
    basePrice: 15500, marketValue: 20000, deliveryDays: 3,
    yearRange: [2017, 2023], baseMileage: [10000, 55000], demandFactor: 0.9,
  },
  {
    make: 'Subaru', model: 'Legacy', category: 'Sedan',
    basePrice: 17000, marketValue: 22000, deliveryDays: 4,
    yearRange: [2017, 2023], baseMileage: [10000, 55000], demandFactor: 0.9,
  },
  {
    make: 'Ford', model: 'Fusion', category: 'Sedan',
    basePrice: 14000, marketValue: 18500, deliveryDays: 3,
    yearRange: [2016, 2020], baseMileage: [15000, 65000], demandFactor: 0.8,
  },

  // ── SUV ───────────────────────────────────────────────────
  {
    make: 'Toyota', model: 'RAV4', category: 'SUV',
    basePrice: 22000, marketValue: 29000, deliveryDays: 3,
    yearRange: [2017, 2023], baseMileage: [10000, 55000], demandFactor: 1.5,
  },
  {
    make: 'Honda', model: 'CR-V', category: 'SUV',
    basePrice: 21000, marketValue: 28000, deliveryDays: 3,
    yearRange: [2017, 2023], baseMileage: [10000, 55000], demandFactor: 1.4,
  },
  {
    make: 'Ford', model: 'Explorer', category: 'SUV',
    basePrice: 26000, marketValue: 34000, deliveryDays: 4,
    yearRange: [2017, 2023], baseMileage: [15000, 60000], demandFactor: 1.2,
  },
  {
    make: 'Chevrolet', model: 'Equinox', category: 'SUV',
    basePrice: 18000, marketValue: 24000, deliveryDays: 3,
    yearRange: [2017, 2023], baseMileage: [10000, 55000], demandFactor: 1.1,
  },
  {
    make: 'Jeep', model: 'Grand Cherokee', category: 'SUV',
    basePrice: 28000, marketValue: 37000, deliveryDays: 4,
    yearRange: [2017, 2023], baseMileage: [15000, 60000], demandFactor: 1.2,
  },
  {
    make: 'Nissan', model: 'Pathfinder', category: 'SUV',
    basePrice: 24000, marketValue: 32000, deliveryDays: 4,
    yearRange: [2017, 2023], baseMileage: [15000, 60000], demandFactor: 1.0,
  },
  {
    make: 'Hyundai', model: 'Tucson', category: 'SUV',
    basePrice: 19000, marketValue: 25000, deliveryDays: 3,
    yearRange: [2018, 2023], baseMileage: [10000, 50000], demandFactor: 1.1,
  },

  // ── Truck ─────────────────────────────────────────────────
  {
    make: 'Ford', model: 'F-150', category: 'Truck',
    basePrice: 30000, marketValue: 40000, deliveryDays: 4,
    yearRange: [2017, 2023], baseMileage: [15000, 70000], demandFactor: 1.5,
  },
  {
    make: 'Chevrolet', model: 'Silverado 1500', category: 'Truck',
    basePrice: 29000, marketValue: 38000, deliveryDays: 4,
    yearRange: [2017, 2023], baseMileage: [15000, 70000], demandFactor: 1.4,
  },
  {
    make: 'Toyota', model: 'Tacoma', category: 'Truck',
    basePrice: 26000, marketValue: 35000, deliveryDays: 4,
    yearRange: [2017, 2023], baseMileage: [10000, 60000], demandFactor: 1.4,
  },
  {
    make: 'RAM', model: '1500', category: 'Truck',
    basePrice: 29000, marketValue: 38500, deliveryDays: 4,
    yearRange: [2017, 2023], baseMileage: [15000, 70000], demandFactor: 1.3,
  },
  {
    make: 'GMC', model: 'Sierra 1500', category: 'Truck',
    basePrice: 30000, marketValue: 39000, deliveryDays: 4,
    yearRange: [2017, 2023], baseMileage: [15000, 70000], demandFactor: 1.2,
  },
  {
    make: 'Nissan', model: 'Frontier', category: 'Truck',
    basePrice: 22000, marketValue: 29000, deliveryDays: 4,
    yearRange: [2017, 2023], baseMileage: [15000, 65000], demandFactor: 1.0,
  },

  // ── Sports ────────────────────────────────────────────────
  {
    make: 'Ford', model: 'Mustang', category: 'Sports',
    basePrice: 24000, marketValue: 32000, deliveryDays: 3,
    yearRange: [2017, 2023], baseMileage: [5000, 40000], demandFactor: 1.2,
  },
  {
    make: 'Chevrolet', model: 'Camaro', category: 'Sports',
    basePrice: 23000, marketValue: 31000, deliveryDays: 3,
    yearRange: [2017, 2023], baseMileage: [5000, 40000], demandFactor: 1.1,
  },
  {
    make: 'Subaru', model: 'BRZ', category: 'Sports',
    basePrice: 20000, marketValue: 27000, deliveryDays: 3,
    yearRange: [2018, 2023], baseMileage: [5000, 35000], demandFactor: 1.0,
  },
  {
    make: 'Mazda', model: 'MX-5 Miata', category: 'Sports',
    basePrice: 21000, marketValue: 28000, deliveryDays: 3,
    yearRange: [2017, 2023], baseMileage: [5000, 35000], demandFactor: 1.1,
  },
  {
    make: 'Dodge', model: 'Challenger', category: 'Sports',
    basePrice: 24000, marketValue: 32000, deliveryDays: 3,
    yearRange: [2017, 2023], baseMileage: [5000, 40000], demandFactor: 1.1,
  },
  {
    make: 'Honda', model: 'Civic Type R', category: 'Sports',
    basePrice: 32000, marketValue: 42000, deliveryDays: 5,
    yearRange: [2018, 2023], baseMileage: [2000, 30000], demandFactor: 1.3,
  },

  // ── Luxury ────────────────────────────────────────────────
  {
    make: 'BMW', model: '3 Series', category: 'Luxury',
    basePrice: 30000, marketValue: 40000, deliveryDays: 5,
    yearRange: [2017, 2023], baseMileage: [10000, 55000], demandFactor: 1.1,
  },
  {
    make: 'Mercedes-Benz', model: 'C-Class', category: 'Luxury',
    basePrice: 31000, marketValue: 42000, deliveryDays: 5,
    yearRange: [2017, 2023], baseMileage: [10000, 55000], demandFactor: 1.1,
  },
  {
    make: 'Audi', model: 'A4', category: 'Luxury',
    basePrice: 29000, marketValue: 39000, deliveryDays: 5,
    yearRange: [2017, 2023], baseMileage: [10000, 55000], demandFactor: 1.0,
  },
  {
    make: 'Lexus', model: 'IS', category: 'Luxury',
    basePrice: 28000, marketValue: 37000, deliveryDays: 5,
    yearRange: [2017, 2023], baseMileage: [10000, 55000], demandFactor: 1.0,
  },
  {
    make: 'Cadillac', model: 'CT5', category: 'Luxury',
    basePrice: 30000, marketValue: 40000, deliveryDays: 5,
    yearRange: [2018, 2023], baseMileage: [10000, 55000], demandFactor: 0.9,
  },
  {
    make: 'Infiniti', model: 'Q50', category: 'Luxury',
    basePrice: 27000, marketValue: 36000, deliveryDays: 5,
    yearRange: [2017, 2023], baseMileage: [10000, 55000], demandFactor: 0.9,
  },
];

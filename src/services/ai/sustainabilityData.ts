
// Map garment types to sustainability impact data
// Based on industry research on average savings per upcycled garment in Indian context
// export const sustainabilityData: Record<string, { water: number; co2: number; waste: number }> = {
//   "denim": { water: 7000, co2: 33, waste: 0.8 },
//   "tshirt": { water: 2700, co2: 7, waste: 0.3 },
//   "dress": { water: 4800, co2: 15, waste: 0.5 },
//   "jacket": { water: 5200, co2: 20, waste: 0.7 },
//   "shirt": { water: 3000, co2: 9, waste: 0.35 },
//   "pants": { water: 4000, co2: 12, waste: 0.45 },
//   "saree": { water: 6500, co2: 25, waste: 0.9 },
//   "kurta": { water: 3200, co2: 10, waste: 0.4 },
//   "salwar": { water: 3800, co2: 11, waste: 0.42 },
//   "lehenga": { water: 5500, co2: 22, waste: 0.85 },
//   "default": { water: 3500, co2: 10, waste: 0.4 }
// };
export const sustainabilityData = {
  tshirt: {
    water: 2700,  // liters of water saved
    co2: 2.1,     // kg of CO2 emissions prevented
    waste: 0.25   // kg of textile waste diverted
  },
  denim: {
    water: 7000,  // liters for jeans production
    co2: 33.4,    // kg CO2 for jeans
    waste: 0.8    // kg denim waste
  },
  dress: {
    water: 4000,
    co2: 15.0,
    waste: 0.5
  },
  saree: {
    water: 5000,
    co2: 18.2,
    waste: 1.0
  },
  kurta: {
    water: 3000,
    co2: 8.5,
    waste: 0.4
  },
  default: {
    water: 3500,
    co2: 12.0,
    waste: 0.45
  }
};

// Function to get material composition based on garment type
export const getMaterialComposition = (garmentType: string): { type: string; percentage: number }[] => {
  switch (garmentType.toLowerCase()) {
    case "denim":
    case "jeans":
      return [
        { type: "Cotton", percentage: 85 },
        { type: "Polyester", percentage: 13 },
        { type: "Elastane", percentage: 2 }
      ];
    case "tshirt":
      return [
        { type: "Cotton", percentage: 95 },
        { type: "Elastane", percentage: 5 }
      ];
    case "dress":
      return [
        { type: "Cotton", percentage: 60 },
        { type: "Polyester", percentage: 40 }
      ];
    case "shirt":
      return [
        { type: "Cotton", percentage: 70 },
        { type: "Polyester", percentage: 30 }
      ];
    case "saree":
      return [
        { type: "Silk", percentage: 85 },
        { type: "Zari", percentage: 15 }
      ];
    case "kurta":
      return [
        { type: "Cotton", percentage: 90 },
        { type: "Viscose", percentage: 10 }
      ];
    case "lehenga":
      return [
        { type: "Silk", percentage: 60 },
        { type: "Polyester", percentage: 25 },
        { type: "Metallic thread", percentage: 15 }
      ];
    default:
      return [
        { type: "Cotton", percentage: 75 },
        { type: "Synthetic", percentage: 25 }
      ];
  }
};

export function getBrandImage(brand: string): string {
  const map: Record<string, string> = {
    Dynamo: "/assets/generated/brand-dynamo.dim_600x400.jpg",
    "OPG Mobility": "/assets/generated/brand-opg.dim_600x400.jpg",
    Battre: "/assets/generated/brand-battre.dim_600x400.jpg",
    "Revolt Motors": "/assets/generated/brand-revolt.dim_600x400.jpg",
    "Kinetic Green": "/assets/generated/brand-kinetic.dim_600x400.jpg",
    Goeen: "/assets/generated/brand-goeen.dim_600x400.jpg",
    iVOOMi: "/assets/generated/brand-ivoomi.dim_600x400.jpg",
  };
  return map[brand] ?? "/assets/generated/vehicle-scooter-1.dim_600x400.jpg";
}

// ── Dynamo real product images from dynamoindia.com ──
const DYNAMO_IMAGE_MAP: Record<string, string> = {
  lima: "https://dynamoindia.com/wp-content/uploads/2025/01/lima.jpg",
  flyer: "https://dynamoindia.com/wp-content/uploads/2025/01/flyer.jpg",
  rx1: "https://dynamoindia.com/wp-content/uploads/2025/01/Dynamo-RX1.png",
  rx4: "https://dynamoindia.com/wp-content/uploads/2025/01/rx4.jpg",
  x1: "https://dynamoindia.com/wp-content/uploads/2025/01/x1.jpg",
  x2: "https://dynamoindia.com/wp-content/uploads/2025/01/Layer-0.png",
  x3: "https://dynamoindia.com/wp-content/uploads/2025/01/x3.jpg",
  x3t: "https://dynamoindia.com/wp-content/uploads/2025/01/x3.jpg",
  x4: "https://dynamoindia.com/wp-content/uploads/2025/01/x4.png",
  dual: "https://dynamoindia.com/wp-content/uploads/2025/01/dual.jpg",
  vx1: "https://dynamoindia.com/wp-content/uploads/2025/01/vx1.jpg",
  smiley: "https://dynamoindia.com/wp-content/uploads/2025/01/smily.png",
  "infinity+":
    "https://dynamoindia.com/wp-content/uploads/2025/01/infinity.jpg",
  infinity: "https://dynamoindia.com/wp-content/uploads/2025/01/infinity.jpg",
  xl: "https://dynamoindia.com/wp-content/uploads/2025/01/luna.png",
  luna: "https://dynamoindia.com/wp-content/uploads/2025/01/luna.png",
};

// ── OPG Mobility real product images from opgmobility.com ──
const OPG_IMAGE_MAP: Record<string, string> = {
  "faast f4":
    "https://opgmobility.com/wp-content/uploads/2025/01/FaastF4-BLUE1.png",
  "faast f3":
    "https://opgmobility.com/wp-content/uploads/2025/01/FaastF3-WHITE1-1.png",
  "faast f2t":
    "https://opgmobility.com/wp-content/uploads/2025/01/FaastF4-BLUE1.png",
  "faast f2b":
    "https://opgmobility.com/wp-content/uploads/2025/01/FaastF3-WHITE1-1.png",
  "faast f2f":
    "https://opgmobility.com/wp-content/uploads/2025/01/FaastF3-WHITE1-1.png",
  motofaast:
    "https://opgmobility.com/wp-content/uploads/2025/01/Motofaast-Green-1.png",
  "defy 22":
    "https://opgmobility.com/wp-content/uploads/2025/01/Matte_green.png",
  "freedum li":
    "https://opgmobility.com/wp-content/uploads/2025/02/Freedom-Blue.png",
  "freedum la":
    "https://opgmobility.com/wp-content/uploads/2025/02/Freedom-Blue.png",
  "ferrato disruptor":
    "https://opgmobility.com/wp-content/uploads/2025/01/4-2.png",
};

// ── Battre real product images from battre.in ──
const BATTRE_IMAGE_MAP: Record<string, string> = {
  one: "https://battre.in/wp-content/uploads/2023/07/one-1.png",
  epic: "https://battre.in/wp-content/uploads/2023/09/Homepage-Storie-EPIC-482x455-1.png",
  loev: "https://battre.in/wp-content/uploads/2023/07/loev_thumb-1.png",
  "loev+":
    "https://battre.in/wp-content/uploads/2025/03/loevplus_featuredImage.jpg",
  storie: "https://battre.in/wp-content/uploads/2023/07/storie-3.png",
};

// ── Revolt Motors real product images from revoltmotors.com ──
const REVOLT_IMAGE_MAP: Record<string, string> = {
  rv1: "https://www.revoltmotors.com/images/HomePageBike/Desktop_RV1.webp",
  "rv1+": "https://www.revoltmotors.com/images/rv1-plus.webp",
  "rv blazex":
    "https://www.revoltmotors.com/images/HomePageBike/Desktop_BlazeX.webp",
  "rv400 brz":
    "https://www.revoltmotors.com/images/HomePageBike/Desktop_RV-BRZ.webp",
  rv400: "https://www.revoltmotors.com/images/HomePageBike/Desktop_RV400.webp",
};

// ── Kinetic Green real product images from kineticgreen.girnarsoft.com ──
const KINETIC_IMAGE_MAP: Record<string, string> = {
  "e-luna x3 prime":
    "https://kineticgreen.girnarsoft.com/uploads/gallery/vibrant-colors/eluna/Red.png",
  "e-luna x2":
    "https://kineticgreen.girnarsoft.com/uploads/gallery/eluna_x2_menu.png",
  "e-luna x3 pro":
    "https://kineticgreen.girnarsoft.com/uploads/gallery/eluna_prime_menu.png",
  "e-luna x3 plus":
    "https://kineticgreen.girnarsoft.com/uploads/gallery/eluna_plus_menu.png",
  "e-luna x3 go":
    "https://kineticgreen.girnarsoft.com/uploads/gallery/eluna_go_menu.png",
  "e-luna x3":
    "https://kineticgreen.girnarsoft.com/uploads/gallery/eluna_x3_menu.png",
  "e-zulu": "https://kineticgreen.girnarsoft.com/uploads/gallery/zulu_menu.svg",
  zoom: "https://kineticgreen.girnarsoft.com/uploads/gallery/zoom_menu.png",
  flex: "https://kineticgreen.girnarsoft.com/uploads/gallery/flex_menu.svg",
  zing: "https://kineticgreen.girnarsoft.com/uploads/gallery/zing_menu.svg",
};

// ── Goeen real product images from goeen.in ──
const GOEEN_IMAGE_MAP: Record<string, string> = {
  "chalo 1000 v2": "https://goeen.in/assets/images/productpage/1000v2.jpg",
  chalo: "https://goeen.in/assets/images/productpage/chalo.jpg",
  "chalo smart pro": "https://goeen.in/assets/images/productpage/smartpro.png",
  "chalo smart plus":
    "https://goeen.in/assets/images/productpage/smart-plus.webp",
  "chalo smart eco": "https://goeen.in/assets/images/chaloSmartECO/product.png",
  "nja-7": "https://goeen.in/assets/images/NJA7/2.webp",
  "nja ~ 7": "https://goeen.in/assets/images/NJA7/2.webp",
};

function lookupImage(
  nameMap: Record<string, string>,
  vehicleName: string,
): string | null {
  const lower = vehicleName.toLowerCase();
  // Exact match first
  if (lower in nameMap) return nameMap[lower];
  // Partial match
  for (const [key, url] of Object.entries(nameMap)) {
    if (lower.includes(key) || key.includes(lower)) return url;
  }
  return null;
}

export function getDynamoImage(vehicleName: string): string | null {
  return lookupImage(DYNAMO_IMAGE_MAP, vehicleName);
}

export function getVehicleImage(
  _id: bigint,
  brand?: string,
  name?: string,
): string {
  if (brand && name) {
    const lower = name.toLowerCase();
    switch (brand) {
      case "Dynamo": {
        const img = lookupImage(DYNAMO_IMAGE_MAP, lower);
        if (img) return img;
        break;
      }
      case "OPG Mobility": {
        const img = lookupImage(OPG_IMAGE_MAP, lower);
        if (img) return img;
        break;
      }
      case "Battre": {
        const img = lookupImage(BATTRE_IMAGE_MAP, lower);
        if (img) return img;
        break;
      }
      case "Revolt Motors": {
        const img = lookupImage(REVOLT_IMAGE_MAP, lower);
        if (img) return img;
        break;
      }
      case "Kinetic Green": {
        const img = lookupImage(KINETIC_IMAGE_MAP, lower);
        if (img) return img;
        break;
      }
      case "Goeen": {
        const img = lookupImage(GOEEN_IMAGE_MAP, lower);
        if (img) return img;
        break;
      }
    }
  }
  if (brand) return getBrandImage(brand);
  return "/assets/generated/vehicle-scooter-1.dim_600x400.jpg";
}

export function formatPrice(price: bigint): string {
  return `₹${Number(price).toLocaleString("en-IN")}`;
}

export function formatDate(timestamp: bigint): string {
  // Motoko timestamp is in nanoseconds
  const ms = Number(timestamp) / 1_000_000;
  return new Date(ms).toLocaleDateString("en-IN", {
    year: "numeric",
    month: "long",
    day: "numeric",
  });
}

export function calculateEMI(
  principal: number,
  annualRate: number,
  tenureMonths: number,
): number {
  if (principal <= 0 || tenureMonths <= 0) return 0;
  const monthlyRate = annualRate / 12 / 100;
  if (monthlyRate === 0) return principal / tenureMonths;
  const factor = (1 + monthlyRate) ** tenureMonths;
  const emi = (principal * monthlyRate * factor) / (factor - 1);
  return Math.round(emi);
}

export function usePageTitle(title: string) {
  document.title = title
    ? `${title} | JSR Electric Vehicles`
    : "JSR Electric Vehicles — Drive the Future";
}

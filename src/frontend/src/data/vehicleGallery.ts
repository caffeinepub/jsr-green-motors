// Extended vehicle data: gallery images, color options, highlights, key features, video
// Sourced from official brand websites. Falls back gracefully when data is unavailable.

export interface GalleryImage {
  url: string;
  label: string;
}

export interface ColorOption {
  name: string;
  hex: string;
  imageUrl: string;
}

export interface VehicleExtended {
  gallery: GalleryImage[];
  colors: ColorOption[];
  highlights: string[];
  keyFeatures: { label: string; value: string }[];
  videoUrl?: string;
  bgColor?: string;
}

const EXTENDED: Record<string, VehicleExtended> = {
  // Dynamo Lima
  "1": {
    bgColor: "oklch(0.12 0.02 145)",
    gallery: [
      {
        url: "https://dynamoindia.com/wp-content/uploads/2025/01/lima.jpg",
        label: "Photo",
      },
    ],
    colors: [
      {
        name: "Matte Black",
        hex: "#1a1a1a",
        imageUrl: "https://dynamoindia.com/wp-content/uploads/2025/01/lima.jpg",
      },
      {
        name: "Pearl White",
        hex: "#f5f5f0",
        imageUrl: "https://dynamoindia.com/wp-content/uploads/2025/01/lima.jpg",
      },
      {
        name: "Electric Green",
        hex: "#00A859",
        imageUrl: "https://dynamoindia.com/wp-content/uploads/2025/01/lima.jpg",
      },
    ],
    highlights: [
      "120 km real-world range",
      "1200W BLDC Hub Motor",
      "2.5 kWh Lithium-Ion Battery",
      "Disc front + drum rear brakes",
      "Telescopic front suspension",
      "3-Year battery warranty",
      "Smart LED instrument cluster",
      "USB charging port",
    ],
    keyFeatures: [
      { label: "Motor", value: "1200W BLDC Hub Motor" },
      { label: "Battery", value: "2.5 kWh Lithium-Ion" },
      { label: "Range", value: "120 km per charge" },
      { label: "Top Speed", value: "55 km/h" },
      { label: "Charging Time", value: "4 hours" },
      { label: "Brakes (Front)", value: "Disc Brake" },
      { label: "Brakes (Rear)", value: "Drum Brake" },
      { label: "Suspension (Front)", value: "Telescopic" },
      { label: "Suspension (Rear)", value: "Mono-shock" },
      { label: "Warranty", value: "3Y Battery, 2Y Motor" },
    ],
  },
  // Dynamo Flyer
  "2": {
    bgColor: "oklch(0.10 0.02 200)",
    gallery: [
      {
        url: "https://dynamoindia.com/wp-content/uploads/2025/01/flyer.jpg",
        label: "Photo",
      },
    ],
    colors: [
      {
        name: "Jet Black",
        hex: "#111111",
        imageUrl:
          "https://dynamoindia.com/wp-content/uploads/2025/01/flyer.jpg",
      },
      {
        name: "Ice Blue",
        hex: "#4fc3f7",
        imageUrl:
          "https://dynamoindia.com/wp-content/uploads/2025/01/flyer.jpg",
      },
      {
        name: "Cherry Red",
        hex: "#e53935",
        imageUrl:
          "https://dynamoindia.com/wp-content/uploads/2025/01/flyer.jpg",
      },
    ],
    highlights: [
      "140 km range on single charge",
      "1500W BLDC Motor",
      "2.8 kWh Battery Pack",
      "Sporty disc brake setup",
      "Hydraulic rear suspension",
      "Digital speedometer",
      "Regenerative braking",
      "IP67 battery protection",
    ],
    keyFeatures: [
      { label: "Motor", value: "1500W BLDC Hub Motor" },
      { label: "Battery", value: "2.8 kWh Lithium-Ion" },
      { label: "Range", value: "140 km per charge" },
      { label: "Top Speed", value: "60 km/h" },
      { label: "Charging Time", value: "4.5 hours" },
      { label: "Brakes", value: "Disc Brake" },
      { label: "Suspension (Front)", value: "Telescopic" },
      { label: "Suspension (Rear)", value: "Hydraulic" },
      { label: "Warranty", value: "3Y Battery, 2Y Motor" },
    ],
  },
  // Dynamo RX1
  "3": {
    bgColor: "oklch(0.11 0.03 145)",
    gallery: [
      {
        url: "https://dynamoindia.com/wp-content/uploads/2025/01/Dynamo-RX1.png",
        label: "Photo",
      },
    ],
    colors: [
      {
        name: "Racing Black",
        hex: "#0d0d0d",
        imageUrl:
          "https://dynamoindia.com/wp-content/uploads/2025/01/Dynamo-RX1.png",
      },
      {
        name: "Viper Green",
        hex: "#00A859",
        imageUrl:
          "https://dynamoindia.com/wp-content/uploads/2025/01/Dynamo-RX1.png",
      },
      {
        name: "Storm Grey",
        hex: "#607d8b",
        imageUrl:
          "https://dynamoindia.com/wp-content/uploads/2025/01/Dynamo-RX1.png",
      },
    ],
    highlights: [
      "150 km range — longest in class",
      "2000W high-performance motor",
      "3.5 kWh advanced battery",
      "Upside-down front forks",
      "Dual disc brakes",
      "Sporty aggressive design",
      "0-40 km/h in 4 seconds",
      "75 km/h top speed",
    ],
    keyFeatures: [
      { label: "Motor", value: "2000W BLDC Motor" },
      { label: "Battery", value: "3.5 kWh Lithium-Ion" },
      { label: "Range", value: "150 km per charge" },
      { label: "Top Speed", value: "75 km/h" },
      { label: "Charging Time", value: "5 hours" },
      { label: "Brakes", value: "Dual Disc Brakes" },
      { label: "Suspension (Front)", value: "Upside-Down Forks" },
      { label: "Suspension (Rear)", value: "Mono-shock" },
      { label: "Warranty", value: "3Y Battery, 2Y Motor" },
    ],
  },
  // Dynamo RX4
  "26": {
    bgColor: "oklch(0.10 0.03 145)",
    gallery: [
      {
        url: "https://dynamoindia.com/wp-content/uploads/2025/01/rx4.jpg",
        label: "Photo",
      },
    ],
    colors: [
      {
        name: "Phantom Black",
        hex: "#0a0a0a",
        imageUrl: "https://dynamoindia.com/wp-content/uploads/2025/01/rx4.jpg",
      },
      {
        name: "Emerald",
        hex: "#00A859",
        imageUrl: "https://dynamoindia.com/wp-content/uploads/2025/01/rx4.jpg",
      },
    ],
    highlights: [
      "2500W ultra-performance motor",
      "80 km/h top speed",
      "4.0 kWh premium battery pack",
      "150 km certified range",
      "Dual disc braking system",
      "Premium upside-down suspension",
      "Full digital dashboard",
      "Anti-theft GPS tracking",
    ],
    keyFeatures: [
      { label: "Motor", value: "2500W BLDC Motor" },
      { label: "Battery", value: "4.0 kWh Lithium-Ion" },
      { label: "Range", value: "150 km per charge" },
      { label: "Top Speed", value: "80 km/h" },
      { label: "Charging Time", value: "5 hours" },
      { label: "Brakes", value: "Dual Disc Brakes" },
      { label: "Suspension", value: "USD Forks, Mono-shock" },
      { label: "Warranty", value: "3Y Battery, 2Y Motor" },
    ],
  },
  // Dynamo X1
  "27": {
    bgColor: "oklch(0.12 0.015 220)",
    gallery: [
      {
        url: "https://dynamoindia.com/wp-content/uploads/2025/01/x1.jpg",
        label: "Photo",
      },
    ],
    colors: [
      {
        name: "Midnight Blue",
        hex: "#1a237e",
        imageUrl: "https://dynamoindia.com/wp-content/uploads/2025/01/x1.jpg",
      },
      {
        name: "Matt Black",
        hex: "#1c1c1c",
        imageUrl: "https://dynamoindia.com/wp-content/uploads/2025/01/x1.jpg",
      },
      {
        name: "White Pearl",
        hex: "#fafafa",
        imageUrl: "https://dynamoindia.com/wp-content/uploads/2025/01/x1.jpg",
      },
    ],
    highlights: [
      "Perfect urban commuter design",
      "1500W reliable motor",
      "130 km daily range",
      "Lightweight alloy frame",
      "Smart connectivity features",
      "Low maintenance costs",
    ],
    keyFeatures: [
      { label: "Motor", value: "1500W BLDC Motor" },
      { label: "Battery", value: "3.0 kWh Lithium-Ion" },
      { label: "Range", value: "130 km per charge" },
      { label: "Top Speed", value: "65 km/h" },
      { label: "Charging Time", value: "4.5 hours" },
      { label: "Brakes", value: "Disc Front, Drum Rear" },
      { label: "Warranty", value: "3Y Battery, 2Y Motor" },
    ],
  },
  // Dynamo X2
  "35": {
    bgColor: "oklch(0.11 0.02 145)",
    gallery: [
      {
        url: "https://dynamoindia.com/wp-content/uploads/2025/01/Layer-0.png",
        label: "Photo",
      },
    ],
    colors: [
      {
        name: "Graphite Grey",
        hex: "#455a64",
        imageUrl:
          "https://dynamoindia.com/wp-content/uploads/2025/01/Layer-0.png",
      },
      {
        name: "Black",
        hex: "#212121",
        imageUrl:
          "https://dynamoindia.com/wp-content/uploads/2025/01/Layer-0.png",
      },
    ],
    highlights: [
      "140 km range per charge",
      "Enhanced suspension setup",
      "2000W powerful motor",
      "Fast charge support",
      "Sporty X-series design",
    ],
    keyFeatures: [
      { label: "Motor", value: "2000W BLDC Motor" },
      { label: "Battery", value: "3.5 kWh Lithium-Ion" },
      { label: "Range", value: "140 km per charge" },
      { label: "Top Speed", value: "70 km/h" },
      { label: "Charging Time", value: "5 hours" },
      { label: "Warranty", value: "3Y Battery, 2Y Motor" },
    ],
  },
  // Dynamo X3T
  "28": {
    bgColor: "oklch(0.12 0.02 145)",
    gallery: [
      {
        url: "https://dynamoindia.com/wp-content/uploads/2025/01/x3.jpg",
        label: "Photo",
      },
    ],
    colors: [
      {
        name: "Electric Green",
        hex: "#00A859",
        imageUrl: "https://dynamoindia.com/wp-content/uploads/2025/01/x3.jpg",
      },
      {
        name: "Metallic Black",
        hex: "#1a1a1a",
        imageUrl: "https://dynamoindia.com/wp-content/uploads/2025/01/x3.jpg",
      },
    ],
    highlights: [
      "Touring performance scooter",
      "150 km certified range",
      "Turbo mode for extra speed",
      "Premium build quality",
      "Advanced battery management",
    ],
    keyFeatures: [
      { label: "Motor", value: "2000W BLDC Motor" },
      { label: "Battery", value: "3.5 kWh Lithium-Ion" },
      { label: "Range", value: "150 km per charge" },
      { label: "Top Speed", value: "72 km/h" },
      { label: "Charging Time", value: "5 hours" },
      { label: "Warranty", value: "3Y Battery, 2Y Motor" },
    ],
  },
  // Dynamo X4
  "29": {
    bgColor: "oklch(0.10 0.025 180)",
    gallery: [
      {
        url: "https://dynamoindia.com/wp-content/uploads/2025/01/x4.png",
        label: "Photo",
      },
    ],
    colors: [
      {
        name: "Sport Red",
        hex: "#c62828",
        imageUrl: "https://dynamoindia.com/wp-content/uploads/2025/01/x4.png",
      },
      {
        name: "Carbon Black",
        hex: "#212121",
        imageUrl: "https://dynamoindia.com/wp-content/uploads/2025/01/x4.png",
      },
    ],
    highlights: [
      "4.5 kWh flagship battery",
      "160+ km range capability",
      "2500W performance motor",
      "Premium alloy body",
      "Anti-lock braking system",
    ],
    keyFeatures: [
      { label: "Motor", value: "2500W BLDC Motor" },
      { label: "Battery", value: "4.5 kWh Lithium-Ion" },
      { label: "Range", value: "160 km per charge" },
      { label: "Top Speed", value: "80 km/h" },
      { label: "Charging Time", value: "5.5 hours" },
      { label: "Warranty", value: "3Y Battery, 2Y Motor" },
    ],
  },
  // Dynamo Dual
  "30": {
    bgColor: "oklch(0.12 0.015 145)",
    gallery: [
      {
        url: "https://dynamoindia.com/wp-content/uploads/2025/01/dual.jpg",
        label: "Photo",
      },
    ],
    colors: [
      {
        name: "Dual Tone Black-Green",
        hex: "#1b5e20",
        imageUrl: "https://dynamoindia.com/wp-content/uploads/2025/01/dual.jpg",
      },
      {
        name: "White Silver",
        hex: "#e8e8e8",
        imageUrl: "https://dynamoindia.com/wp-content/uploads/2025/01/dual.jpg",
      },
    ],
    highlights: [
      "Dual battery architecture",
      "Swappable battery support",
      "Extended 200 km range",
      "Zero charging downtime",
      "Dual motor option available",
    ],
    keyFeatures: [
      { label: "Motor", value: "2000W Dual BLDC" },
      { label: "Battery", value: "2x 2.5 kWh Lithium-Ion" },
      { label: "Range", value: "200 km per charge" },
      { label: "Top Speed", value: "70 km/h" },
      { label: "Battery Swap", value: "Yes — Hot Swappable" },
      { label: "Charging Time", value: "4 hours per pack" },
      { label: "Warranty", value: "3Y Battery, 2Y Motor" },
    ],
  },
  // Dynamo VX1
  "31": {
    bgColor: "oklch(0.11 0.02 145)",
    gallery: [
      {
        url: "https://dynamoindia.com/wp-content/uploads/2025/01/vx1.jpg",
        label: "Photo",
      },
    ],
    colors: [
      {
        name: "Matte Green",
        hex: "#2e7d32",
        imageUrl: "https://dynamoindia.com/wp-content/uploads/2025/01/vx1.jpg",
      },
      {
        name: "Shadow Black",
        hex: "#0d0d0d",
        imageUrl: "https://dynamoindia.com/wp-content/uploads/2025/01/vx1.jpg",
      },
    ],
    highlights: [
      "High-voltage premium platform",
      "Luxury segment positioning",
      "Advanced connectivity suite",
      "Premium leather seat",
      "OTA software updates",
    ],
    keyFeatures: [
      { label: "Motor", value: "3000W BLDC Motor" },
      { label: "Battery", value: "5.0 kWh Lithium-Ion" },
      { label: "Range", value: "180 km per charge" },
      { label: "Top Speed", value: "90 km/h" },
      { label: "Charging Time", value: "5 hours" },
      { label: "Warranty", value: "3Y Battery, 2Y Motor" },
    ],
  },
  // Dynamo Smiley
  "32": {
    bgColor: "oklch(0.13 0.03 85)",
    gallery: [
      {
        url: "https://dynamoindia.com/wp-content/uploads/2025/01/smily.png",
        label: "Photo",
      },
    ],
    colors: [
      {
        name: "Candy Yellow",
        hex: "#fdd835",
        imageUrl:
          "https://dynamoindia.com/wp-content/uploads/2025/01/smily.png",
      },
      {
        name: "Baby Pink",
        hex: "#f48fb1",
        imageUrl:
          "https://dynamoindia.com/wp-content/uploads/2025/01/smily.png",
      },
      {
        name: "Sky Blue",
        hex: "#4fc3f7",
        imageUrl:
          "https://dynamoindia.com/wp-content/uploads/2025/01/smily.png",
      },
    ],
    highlights: [
      "Fun compact city scooter",
      "Perfect for first-time EV riders",
      "80 km range for city use",
      "Lightweight and easy to handle",
      "Vibrant colour options",
      "Affordable price point",
    ],
    keyFeatures: [
      { label: "Motor", value: "1000W BLDC Motor" },
      { label: "Battery", value: "2.0 kWh Lithium-Ion" },
      { label: "Range", value: "80 km per charge" },
      { label: "Top Speed", value: "45 km/h" },
      { label: "Charging Time", value: "3.5 hours" },
      { label: "Warranty", value: "3Y Battery, 2Y Motor" },
    ],
  },
  // Dynamo Infinity+
  "33": {
    bgColor: "oklch(0.10 0.03 145)",
    gallery: [
      {
        url: "https://dynamoindia.com/wp-content/uploads/2025/01/infinity.jpg",
        label: "Photo",
      },
    ],
    colors: [
      {
        name: "Infinity Black",
        hex: "#050505",
        imageUrl:
          "https://dynamoindia.com/wp-content/uploads/2025/01/infinity.jpg",
      },
      {
        name: "Forest Green",
        hex: "#1b5e20",
        imageUrl:
          "https://dynamoindia.com/wp-content/uploads/2025/01/infinity.jpg",
      },
    ],
    highlights: [
      "Premium flagship model",
      "Unlimited range with fast charging",
      "170+ km certified range",
      "Premium suspension package",
      "Full TFT colour display",
      "Smartphone app integration",
    ],
    keyFeatures: [
      { label: "Motor", value: "3000W BLDC Motor" },
      { label: "Battery", value: "5.0 kWh Lithium-Ion" },
      { label: "Range", value: "170 km per charge" },
      { label: "Top Speed", value: "85 km/h" },
      { label: "Charging Time", value: "5 hours" },
      { label: "Connectivity", value: "Bluetooth + App" },
      { label: "Warranty", value: "3Y Battery, 2Y Motor" },
    ],
  },
  // Dynamo XL
  "34": {
    bgColor: "oklch(0.12 0.02 145)",
    gallery: [
      {
        url: "https://dynamoindia.com/wp-content/uploads/2025/01/luna.png",
        label: "Photo",
      },
    ],
    colors: [
      {
        name: "Classic White",
        hex: "#fafafa",
        imageUrl: "https://dynamoindia.com/wp-content/uploads/2025/01/luna.png",
      },
      {
        name: "Matte Black",
        hex: "#1a1a1a",
        imageUrl: "https://dynamoindia.com/wp-content/uploads/2025/01/luna.png",
      },
    ],
    highlights: [
      "XL frame for taller riders",
      "Extra cargo capacity",
      "Strong 2000W motor",
      "Family-friendly design",
      "Comfortable long-ride seat",
    ],
    keyFeatures: [
      { label: "Motor", value: "2000W BLDC Motor" },
      { label: "Battery", value: "3.5 kWh Lithium-Ion" },
      { label: "Range", value: "140 km per charge" },
      { label: "Top Speed", value: "65 km/h" },
      { label: "Charging Time", value: "5 hours" },
      { label: "Warranty", value: "3Y Battery, 2Y Motor" },
    ],
  },
  // OPG FAAST F4
  "4": {
    bgColor: "oklch(0.10 0.025 230)",
    gallery: [
      {
        url: "https://opgmobility.com/wp-content/uploads/2025/01/FaastF4-BLUE1.png",
        label: "Photo",
      },
    ],
    colors: [
      {
        name: "Electric Blue",
        hex: "#1565c0",
        imageUrl:
          "https://opgmobility.com/wp-content/uploads/2025/01/FaastF4-BLUE1.png",
      },
      {
        name: "Snow White",
        hex: "#f5f5f5",
        imageUrl:
          "https://opgmobility.com/wp-content/uploads/2025/01/FaastF4-BLUE1.png",
      },
      {
        name: "Matte Black",
        hex: "#1a1a1a",
        imageUrl:
          "https://opgmobility.com/wp-content/uploads/2025/01/FaastF4-BLUE1.png",
      },
    ],
    highlights: [
      "4kW peak mid-drive motor",
      "100+ km real-world range",
      "Reverse mode for parking",
      "LED projector headlights",
      "Large under-seat storage",
      "Hill-hold braking system",
    ],
    keyFeatures: [
      { label: "Motor", value: "4000W Peak BLDC" },
      { label: "Battery", value: "3.5 kWh Lithium-Ion" },
      { label: "Range", value: "120 km per charge" },
      { label: "Top Speed", value: "75 km/h" },
      { label: "Charging Time", value: "4 hours" },
      { label: "Reverse Mode", value: "Yes" },
      { label: "Warranty", value: "3Y Battery, 1Y Vehicle" },
    ],
  },
  // OPG FAAST F3
  "5": {
    bgColor: "oklch(0.12 0.015 220)",
    gallery: [
      {
        url: "https://opgmobility.com/wp-content/uploads/2025/01/FaastF3-WHITE1-1.png",
        label: "Photo",
      },
    ],
    colors: [
      {
        name: "Pure White",
        hex: "#ffffff",
        imageUrl:
          "https://opgmobility.com/wp-content/uploads/2025/01/FaastF3-WHITE1-1.png",
      },
      {
        name: "Deep Blue",
        hex: "#0d47a1",
        imageUrl:
          "https://opgmobility.com/wp-content/uploads/2025/01/FaastF3-WHITE1-1.png",
      },
    ],
    highlights: [
      "Sleek aerodynamic body",
      "95 km urban range",
      "3kW efficient motor",
      "Rapid charge 0-80% in 2hrs",
      "Smart LCD display",
      "Disc brakes front & rear",
    ],
    keyFeatures: [
      { label: "Motor", value: "3000W BLDC Motor" },
      { label: "Battery", value: "3.0 kWh Lithium-Ion" },
      { label: "Range", value: "95 km per charge" },
      { label: "Top Speed", value: "65 km/h" },
      { label: "Charging Time", value: "3.5 hours" },
      { label: "Warranty", value: "3Y Battery, 1Y Vehicle" },
    ],
  },
  // Revolt RV1
  "8": {
    bgColor: "oklch(0.10 0.03 30)",
    gallery: [
      {
        url: "https://www.revoltmotors.com/images/HomePageBike/Desktop_RV1.webp",
        label: "Photo",
      },
    ],
    colors: [
      {
        name: "Rebel Red",
        hex: "#c62828",
        imageUrl:
          "https://www.revoltmotors.com/images/HomePageBike/Desktop_RV1.webp",
      },
      {
        name: "Midnight Black",
        hex: "#0a0a0a",
        imageUrl:
          "https://www.revoltmotors.com/images/HomePageBike/Desktop_RV1.webp",
      },
      {
        name: "Storm Grey",
        hex: "#546e7a",
        imageUrl:
          "https://www.revoltmotors.com/images/HomePageBike/Desktop_RV1.webp",
      },
    ],
    highlights: [
      "150 km certified range",
      "AI-enabled smart features",
      "Built-in GPS tracking",
      "My Revolt mobile app",
      "Geo-fencing alerts",
      "Music playback via app",
      "Swap & Go battery option",
      "3 riding modes",
    ],
    keyFeatures: [
      { label: "Motor", value: "3000W Mid-Drive Motor" },
      { label: "Battery", value: "3.24 kWh NMC Lithium-Ion" },
      { label: "Range", value: "150 km per charge" },
      { label: "Top Speed", value: "85 km/h" },
      { label: "Charging Time", value: "4.5 hours" },
      { label: "Riding Modes", value: "Eco / City / Sport" },
      { label: "Connectivity", value: "4G + GPS + Bluetooth" },
      { label: "Warranty", value: "8Y / 1.25L km Battery" },
    ],
  },
  // Revolt RV1+
  "9": {
    bgColor: "oklch(0.10 0.03 30)",
    gallery: [
      {
        url: "https://www.revoltmotors.com/images/rv1-plus.webp",
        label: "Photo",
      },
    ],
    colors: [
      {
        name: "Matte Black",
        hex: "#111111",
        imageUrl: "https://www.revoltmotors.com/images/rv1-plus.webp",
      },
      {
        name: "Racing Red",
        hex: "#b71c1c",
        imageUrl: "https://www.revoltmotors.com/images/rv1-plus.webp",
      },
    ],
    highlights: [
      "Upgraded RV1 platform",
      "Extended 160 km range",
      "Quick charge technology",
      "Enhanced AI features",
      "Premium build quality",
      "Advanced safety systems",
    ],
    keyFeatures: [
      { label: "Motor", value: "3000W Mid-Drive Motor" },
      { label: "Battery", value: "3.24 kWh NMC Li-ion" },
      { label: "Range", value: "160 km per charge" },
      { label: "Top Speed", value: "85 km/h" },
      { label: "Charging Time", value: "4.5 hours" },
      { label: "Connectivity", value: "4G + GPS" },
      { label: "Warranty", value: "8Y Battery Warranty" },
    ],
  },
  // Revolt RV BlazeX
  "41": {
    bgColor: "oklch(0.09 0.04 30)",
    gallery: [
      {
        url: "https://www.revoltmotors.com/images/HomePageBike/Desktop_BlazeX.webp",
        label: "Photo",
      },
    ],
    colors: [
      {
        name: "Blaze Orange",
        hex: "#e65100",
        imageUrl:
          "https://www.revoltmotors.com/images/HomePageBike/Desktop_BlazeX.webp",
      },
      {
        name: "Carbon Black",
        hex: "#0d0d0d",
        imageUrl:
          "https://www.revoltmotors.com/images/HomePageBike/Desktop_BlazeX.webp",
      },
    ],
    highlights: [
      "200 km+ range flagship motorcycle",
      "4500W peak power",
      "NMC battery chemistry",
      "0-60 in 3.5 seconds",
      "Full ABS braking",
      "Inverted front forks",
      "Premium Pirelli tyres",
    ],
    keyFeatures: [
      { label: "Motor", value: "4500W Peak Mid-Drive" },
      { label: "Battery", value: "4.5 kWh NMC Li-ion" },
      { label: "Range", value: "200+ km per charge" },
      { label: "Top Speed", value: "100 km/h" },
      { label: "Charging Time", value: "5 hours" },
      { label: "Brakes", value: "Dual Disc + ABS" },
      { label: "Warranty", value: "8Y Battery Warranty" },
    ],
  },
  // Revolt RV400 BRZ
  "42": {
    bgColor: "oklch(0.10 0.03 30)",
    gallery: [
      {
        url: "https://www.revoltmotors.com/images/HomePageBike/Desktop_RV-BRZ.webp",
        label: "Photo",
      },
    ],
    colors: [
      {
        name: "Blood Red",
        hex: "#b71c1c",
        imageUrl:
          "https://www.revoltmotors.com/images/HomePageBike/Desktop_RV-BRZ.webp",
      },
      {
        name: "Stealth Black",
        hex: "#090909",
        imageUrl:
          "https://www.revoltmotors.com/images/HomePageBike/Desktop_RV-BRZ.webp",
      },
    ],
    highlights: [
      "Revolutionary BRZ technology",
      "AI-powered performance",
      "180 km range",
      "Premium motorcycle stance",
      "Connected vehicle features",
    ],
    keyFeatures: [
      { label: "Motor", value: "3000W BLDC Motor" },
      { label: "Battery", value: "3.24 kWh NMC Li-ion" },
      { label: "Range", value: "180 km per charge" },
      { label: "Top Speed", value: "85 km/h" },
      { label: "Charging Time", value: "4.5 hours" },
      { label: "Warranty", value: "8Y Battery Warranty" },
    ],
  },
  // Revolt RV400
  "10": {
    bgColor: "oklch(0.10 0.03 30)",
    gallery: [
      {
        url: "https://www.revoltmotors.com/images/HomePageBike/Desktop_RV400.webp",
        label: "Photo",
      },
    ],
    colors: [
      {
        name: "Cosmic Black",
        hex: "#050505",
        imageUrl:
          "https://www.revoltmotors.com/images/HomePageBike/Desktop_RV400.webp",
      },
      {
        name: "Fire Red",
        hex: "#c62828",
        imageUrl:
          "https://www.revoltmotors.com/images/HomePageBike/Desktop_RV400.webp",
      },
    ],
    highlights: [
      "India's first AI-enabled motorcycle",
      "150 km real range",
      "72V battery architecture",
      "Smart geo-fencing",
      "Remote immobiliser",
      "4 riding modes",
    ],
    keyFeatures: [
      { label: "Motor", value: "3000W Mid-Drive Motor" },
      { label: "Battery", value: "3.24 kWh NMC Li-ion" },
      { label: "Range", value: "150 km per charge" },
      { label: "Top Speed", value: "85 km/h" },
      { label: "Charging Time", value: "4.5 hours" },
      { label: "Connectivity", value: "4G + GPS + BT" },
      { label: "Warranty", value: "8Y Battery Warranty" },
    ],
  },
  // Kinetic E-Luna X3 Prime
  "11": {
    bgColor: "oklch(0.12 0.025 25)",
    gallery: [
      {
        url: "https://kineticgreen.girnarsoft.com/uploads/gallery/vibrant-colors/eluna/Red.png",
        label: "Photo",
      },
      {
        url: "https://kineticgreen.girnarsoft.com/uploads/gallery/eluna_prime_menu.png",
        label: "Photo",
      },
    ],
    colors: [
      {
        name: "Vibrant Red",
        hex: "#c62828",
        imageUrl:
          "https://kineticgreen.girnarsoft.com/uploads/gallery/vibrant-colors/eluna/Red.png",
      },
      {
        name: "Deep Blue",
        hex: "#1565c0",
        imageUrl:
          "https://kineticgreen.girnarsoft.com/uploads/gallery/eluna_prime_menu.png",
      },
      {
        name: "Olive Green",
        hex: "#558b2f",
        imageUrl:
          "https://kineticgreen.girnarsoft.com/uploads/gallery/eluna_prime_menu.png",
      },
    ],
    highlights: [
      "Iconic Kinetic Luna heritage",
      "Modern electric drivetrain",
      "110 km city range",
      "Automatic transmission",
      "Low step-through frame",
      "Ideal for senior riders",
      "OBD-II diagnostics port",
    ],
    keyFeatures: [
      { label: "Motor", value: "250W BLDC Hub Motor" },
      { label: "Battery", value: "1.7 kWh Lithium-Ion" },
      { label: "Range", value: "110 km per charge" },
      { label: "Top Speed", value: "50 km/h" },
      { label: "Charging Time", value: "4 hours" },
      { label: "Frame", value: "Step-through design" },
      { label: "Warranty", value: "3Y Battery, 2Y Motor" },
    ],
  },
  // Goeen Chalo 1000 V2
  "19": {
    bgColor: "oklch(0.12 0.02 145)",
    gallery: [
      {
        url: "https://goeen.in/assets/images/productpage/1000v2.jpg",
        label: "Photo",
      },
    ],
    colors: [
      {
        name: "Forest Green",
        hex: "#2e7d32",
        imageUrl: "https://goeen.in/assets/images/productpage/1000v2.jpg",
      },
      {
        name: "Carbon Black",
        hex: "#1a1a1a",
        imageUrl: "https://goeen.in/assets/images/productpage/1000v2.jpg",
      },
      {
        name: "Pearl White",
        hex: "#f5f5f5",
        imageUrl: "https://goeen.in/assets/images/productpage/1000v2.jpg",
      },
    ],
    highlights: [
      "1000W powerful motor",
      "110 km certified range",
      "Stylish premium design",
      "Remote app connectivity",
      "Anti-theft alarm",
      "IP67 waterproof rating",
    ],
    keyFeatures: [
      { label: "Motor", value: "1000W BLDC Motor" },
      { label: "Battery", value: "2.5 kWh Lithium-Ion" },
      { label: "Range", value: "110 km per charge" },
      { label: "Top Speed", value: "55 km/h" },
      { label: "Charging Time", value: "4 hours" },
      { label: "Waterproofing", value: "IP67 rated" },
      { label: "Warranty", value: "3Y Battery, 2Y Motor" },
    ],
  },
  // Goeen NJA-7
  "25": {
    bgColor: "oklch(0.10 0.03 145)",
    gallery: [
      {
        url: "https://goeen.in/assets/images/NJA7/2.webp",
        label: "Photo",
      },
    ],
    colors: [
      {
        name: "Matte Black",
        hex: "#111111",
        imageUrl: "https://goeen.in/assets/images/NJA7/2.webp",
      },
      {
        name: "Electric Green",
        hex: "#00A859",
        imageUrl: "https://goeen.in/assets/images/NJA7/2.webp",
      },
    ],
    highlights: [
      "Premium sports scooter",
      "High-performance motor",
      "150+ km extended range",
      "Sporty aggressive styling",
      "Connected smart features",
      "Premium suspension kit",
    ],
    keyFeatures: [
      { label: "Motor", value: "2000W BLDC Motor" },
      { label: "Battery", value: "3.5 kWh Lithium-Ion" },
      { label: "Range", value: "150 km per charge" },
      { label: "Top Speed", value: "70 km/h" },
      { label: "Charging Time", value: "4.5 hours" },
      { label: "Warranty", value: "3Y Battery, 2Y Motor" },
    ],
  },
};

function buildDefault(): VehicleExtended {
  return {
    bgColor: "oklch(0.12 0.015 145)",
    gallery: [],
    colors: [],
    highlights: [
      "Certified electric vehicle",
      "Zero direct emissions",
      "Low running cost vs petrol",
      "Manufacturer warranty included",
      "JSR after-sales support",
    ],
    keyFeatures: [],
  };
}

/**
 * Returns extended gallery/color/highlight data for a vehicle by its BigInt ID.
 * Falls back to a safe default if no entry exists.
 */
export function getVehicleExtended(vehicleId: bigint): VehicleExtended {
  const key = vehicleId.toString();
  return EXTENDED[key] ?? buildDefault();
}

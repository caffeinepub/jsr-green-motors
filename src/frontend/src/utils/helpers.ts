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

export function getVehicleImage(id: bigint, brand?: string): string {
  if (brand) return getBrandImage(brand);
  const numId = Number(id);
  if (numId <= 2) return "/assets/generated/vehicle-scooter-1.dim_600x400.jpg";
  if (numId <= 4) return "/assets/generated/vehicle-scooter-2.dim_600x400.jpg";
  if (numId === 5) return "/assets/generated/vehicle-bike-1.dim_600x400.jpg";
  if (numId === 6) return "/assets/generated/vehicle-ebike-1.dim_600x400.jpg";
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
    ? `${title} | JSR Green Motors`
    : "JSR Green Motors — Drive the Future";
}

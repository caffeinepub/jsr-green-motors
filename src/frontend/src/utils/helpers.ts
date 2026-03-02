export function getVehicleImage(id: bigint): string {
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

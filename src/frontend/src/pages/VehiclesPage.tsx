import QuoteModal from "@/components/QuoteModal";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Skeleton } from "@/components/ui/skeleton";
import { STATIC_VEHICLES } from "@/data/vehicles";
import { useAllVehicles } from "@/hooks/useQueries";
import { formatPrice, getVehicleImage } from "@/utils/helpers";
import { Link } from "@tanstack/react-router";
import {
  Battery,
  Gauge,
  GitCompareArrows,
  Ruler,
  SlidersHorizontal,
  Zap,
} from "lucide-react";
import { useEffect, useState } from "react";
import type { Vehicle } from "../backend.d";

const categories = ["All", "Scooter", "Bike", "E-Bike", "Electric Bike"];
const brands = [
  "All Brands",
  "Dynamo",
  "OPG Mobility",
  "Battre",
  "Revolt Motors",
  "Kinetic Green",
  "Goeen",
  "iVOOMi",
];

export default function VehiclesPage() {
  const [activeCategory, setActiveCategory] = useState("All");
  const [activeBrand, setActiveBrand] = useState("All Brands");
  const [quoteOpen, setQuoteOpen] = useState(false);
  const [selectedVehicle, setSelectedVehicle] = useState<string>("");
  const [compareList, setCompareList] = useState<bigint[]>([]);
  const { data: vehicles, isLoading } = useAllVehicles();
  useEffect(() => {
    document.title = "Electric Scooters & Bikes | JSR Electric Vehicles Kodad";
  }, []);

  // Use backend data if available, otherwise fall back to static list
  const vehicleSource = (
    vehicles && vehicles.length > 0 ? vehicles : STATIC_VEHICLES
  ) as Vehicle[];
  const filteredVehicles: Vehicle[] = vehicleSource.filter((v) => {
    const categoryMatch =
      activeCategory === "All" || v.category === activeCategory;
    const brandMatch = activeBrand === "All Brands" || v.brand === activeBrand;
    return categoryMatch && brandMatch;
  });

  const openQuote = (vehicleName: string) => {
    setSelectedVehicle(vehicleName);
    setQuoteOpen(true);
  };

  const toggleCompare = (id: bigint) => {
    setCompareList((prev) => {
      if (prev.some((v) => v === id)) {
        return prev.filter((v) => v !== id);
      }
      if (prev.length >= 2) return prev;
      return [...prev, id];
    });
  };

  const handleCompareNow = () => {
    if (compareList.length === 2) {
      window.location.href = `/compare?v1=${compareList[0].toString()}&v2=${compareList[1].toString()}`;
    }
  };

  return (
    <main className="pt-20">
      {/* Header */}
      <section className="py-16 section-gradient">
        <div className="container mx-auto px-4 lg:px-6 text-center">
          <Badge className="mb-3 bg-brand-green/20 text-brand-green border-brand-green/30 text-xs uppercase tracking-widest">
            Our Fleet
          </Badge>
          <h1 className="text-4xl md:text-5xl font-display font-bold text-white mb-4">
            Electric Vehicles
          </h1>
          <p className="text-white/65 max-w-2xl mx-auto">
            Explore our premium selection of electric scooters, bikes, and
            e-bikes from leading brands. Find your perfect electric ride.
          </p>
        </div>
      </section>

      {/* Filters */}
      <section className="sticky top-16 z-30 bg-background/95 backdrop-blur-md border-b border-border py-3">
        <div className="container mx-auto px-4 lg:px-6 space-y-2">
          {/* Category filter */}
          <div className="flex items-center gap-3 overflow-x-auto scrollbar-hide">
            <SlidersHorizontal className="h-4 w-4 text-muted-foreground shrink-0" />
            {categories.map((cat) => (
              <button
                type="button"
                key={cat}
                onClick={() => setActiveCategory(cat)}
                data-ocid={"vehicles.tab"}
                className={`shrink-0 px-4 py-1.5 rounded-full text-sm font-medium border transition-all duration-200 ${
                  activeCategory === cat
                    ? "bg-brand-green text-white border-brand-green"
                    : "border-border text-muted-foreground hover:border-brand-green/40 hover:text-foreground"
                }`}
              >
                {cat}
              </button>
            ))}
          </div>
          {/* Brand filter */}
          <div className="flex items-center gap-2 overflow-x-auto scrollbar-hide pb-1">
            <span className="text-xs text-muted-foreground shrink-0 font-medium">
              Brand:
            </span>
            {brands.map((brand) => (
              <button
                type="button"
                key={brand}
                onClick={() => setActiveBrand(brand)}
                data-ocid={"vehicles.tab"}
                className={`shrink-0 px-3 py-1 rounded-full text-xs font-medium border transition-all duration-200 ${
                  activeBrand === brand
                    ? "bg-brand-green/15 text-brand-green border-brand-green/60"
                    : "border-border/60 text-muted-foreground hover:border-brand-green/30 hover:text-foreground"
                }`}
              >
                {brand}
              </button>
            ))}
          </div>
        </div>
      </section>

      {/* Vehicle Grid */}
      <section className="py-12 bg-background">
        <div className="container mx-auto px-4 lg:px-6">
          {isLoading ? (
            <div
              className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6"
              data-ocid="vehicles.loading_state"
            >
              {Array.from({ length: 6 }, (_, i) => `sk-${i}`).map((skId) => (
                <div
                  key={skId}
                  className="rounded-2xl overflow-hidden border border-border"
                >
                  <Skeleton className="h-52 w-full" />
                  <div className="p-5 space-y-3">
                    <Skeleton className="h-5 w-2/3" />
                    <Skeleton className="h-4 w-1/2" />
                    <Skeleton className="h-10 w-full" />
                    <Skeleton className="h-9 w-full" />
                  </div>
                </div>
              ))}
            </div>
          ) : filteredVehicles.length === 0 ? (
            <div className="text-center py-20" data-ocid="vehicles.empty_state">
              <div className="text-6xl mb-4">⚡</div>
              <h3 className="text-xl font-semibold text-foreground mb-2">
                No vehicles found
              </h3>
              <p className="text-muted-foreground">
                Try a different category or brand filter.
              </p>
            </div>
          ) : (
            <>
              <div className="text-sm text-muted-foreground mb-6">
                Showing {filteredVehicles.length} vehicle
                {filteredVehicles.length !== 1 ? "s" : ""}
                {activeCategory !== "All" && ` in ${activeCategory}`}
                {activeBrand !== "All Brands" && ` · ${activeBrand}`}
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                {filteredVehicles.map((vehicle, idx) => {
                  const isInCompare = compareList.some((v) => v === vehicle.id);
                  const compareDisabled =
                    !isInCompare && compareList.length >= 2;
                  return (
                    <article
                      key={vehicle.id.toString()}
                      data-ocid={`vehicles.item.${idx + 1}`}
                      className={`bg-card border rounded-2xl overflow-hidden transition-all duration-300 group flex flex-col ${
                        isInCompare
                          ? "border-brand-green shadow-[0_0_0_2px_oklch(0.62_0.19_155/0.4)]"
                          : "border-border hover:border-brand-green/50"
                      }`}
                      style={{
                        boxShadow: isInCompare
                          ? undefined
                          : "0 2px 8px rgba(0,0,0,0.06)",
                      }}
                      onMouseEnter={(e) => {
                        if (!isInCompare) {
                          (e.currentTarget as HTMLElement).style.boxShadow =
                            "0 8px 32px rgba(0,0,0,0.12), 0 0 0 1px oklch(0.62 0.19 155 / 0.3)";
                          (e.currentTarget as HTMLElement).style.transform =
                            "translateY(-2px)";
                        }
                      }}
                      onMouseLeave={(e) => {
                        if (!isInCompare) {
                          (e.currentTarget as HTMLElement).style.boxShadow =
                            "0 2px 8px rgba(0,0,0,0.06)";
                          (e.currentTarget as HTMLElement).style.transform =
                            "translateY(0)";
                        }
                      }}
                    >
                      {/* Image with gradient bleed */}
                      <div className="relative overflow-hidden h-52">
                        <img
                          src={getVehicleImage(
                            vehicle.id,
                            vehicle.brand,
                            vehicle.name,
                          )}
                          alt={vehicle.name}
                          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
                          loading="lazy"
                        />
                        <div className="absolute top-3 left-3 flex gap-2 flex-wrap">
                          <span className="px-2.5 py-1 rounded-full text-xs font-semibold bg-brand-green/90 text-white backdrop-blur-sm">
                            {vehicle.category}
                          </span>
                          {vehicle.is_featured && (
                            <span className="px-2.5 py-1 rounded-full text-xs font-semibold bg-orange-500/90 text-white backdrop-blur-sm">
                              Featured
                            </span>
                          )}
                        </div>
                        {/* Range badge */}
                        <div className="absolute top-3 right-3">
                          <span className="px-2.5 py-1 rounded-full text-xs font-bold bg-brand-dark/85 text-brand-green backdrop-blur-sm border border-brand-green/30">
                            {Number(vehicle.range_km)} km range
                          </span>
                        </div>
                        {/* Use case tag */}
                        <div className="absolute bottom-12 left-3">
                          <span className="px-2 py-0.5 rounded-full text-[10px] font-semibold bg-white/90 text-brand-dark">
                            {Number(vehicle.range_km) > 100 ||
                            Number(vehicle.motor_watts) > 1000
                              ? "Best for Delivery"
                              : "Best for City"}
                          </span>
                        </div>
                        {/* Compare indicator */}
                        {isInCompare && (
                          <div className="absolute bottom-12 right-3">
                            <span className="px-2 py-0.5 rounded-full text-[10px] font-semibold bg-brand-green text-white">
                              ✓ Comparing
                            </span>
                          </div>
                        )}
                        {/* Gradient bleed into card body */}
                        <div className="absolute bottom-0 left-0 right-0 h-16 bg-gradient-to-t from-card to-transparent" />
                      </div>

                      <div className="px-5 pb-5 -mt-1 flex flex-col flex-1">
                        <h3 className="font-bold text-foreground text-base leading-tight">
                          {vehicle.name}
                        </h3>
                        <p className="text-muted-foreground text-xs mt-0.5 mb-4 font-medium uppercase tracking-wide">
                          {vehicle.brand}
                        </p>

                        {/* Spec chips */}
                        <div className="flex flex-wrap gap-2 mb-4">
                          <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-muted text-xs font-medium text-foreground">
                            <Ruler className="h-3 w-3 text-brand-green" />
                            {Number(vehicle.range_km)} km
                          </span>
                          <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-muted text-xs font-medium text-foreground">
                            <Gauge className="h-3 w-3 text-brand-green" />
                            {Number(vehicle.top_speed)} km/h
                          </span>
                          <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-muted text-xs font-medium text-foreground">
                            <Battery className="h-3 w-3 text-brand-green" />
                            {vehicle.battery_kwh} kWh
                          </span>
                        </div>

                        {/* Price row */}
                        <div className="mt-auto pt-3 border-t border-border">
                          <div className="text-[10px] text-muted-foreground uppercase tracking-wider mb-0.5">
                            Price Range
                          </div>
                          <div
                            className="font-black text-base font-display mb-3"
                            style={{ color: "oklch(0.62 0.19 155)" }}
                          >
                            {formatPrice(vehicle.price_min)} –{" "}
                            {formatPrice(vehicle.price_max)}
                          </div>

                          {/* Buttons */}
                          <div className="flex flex-col gap-2">
                            <div className="flex gap-2">
                              <Link
                                to="/vehicles/$id"
                                params={{ id: vehicle.id.toString() }}
                                className="flex-1"
                                data-ocid={"vehicles.primary_button"}
                              >
                                <Button
                                  className="w-full bg-brand-green hover:bg-brand-green/90 active:scale-95 text-white text-sm font-semibold transition-all duration-150"
                                  style={{
                                    boxShadow:
                                      "0 0 12px oklch(0.62 0.19 155 / 0.25)",
                                  }}
                                >
                                  View Details
                                </Button>
                              </Link>
                              <Button
                                variant="outline"
                                size="icon"
                                className="shrink-0 border-brand-green/40 text-brand-green hover:bg-brand-green/10 hover:border-brand-green transition-colors"
                                onClick={() => openQuote(vehicle.name)}
                                title="Get Quote"
                                data-ocid={"vehicles.secondary_button"}
                              >
                                <Zap className="h-4 w-4" />
                              </Button>
                            </div>
                            <Link
                              to="/contact"
                              className="w-full"
                              data-ocid={"vehicles.secondary_button"}
                            >
                              <Button
                                variant="outline"
                                className="w-full border-brand-green/40 text-brand-green hover:bg-brand-green/10 hover:border-brand-green text-sm font-semibold transition-all duration-150"
                              >
                                Get Best Price
                              </Button>
                            </Link>
                            {/* Compare toggle */}
                            <button
                              type="button"
                              onClick={() => toggleCompare(vehicle.id)}
                              disabled={compareDisabled}
                              data-ocid={"vehicles.toggle"}
                              className={`w-full flex items-center justify-center gap-1.5 py-1.5 rounded-lg text-xs font-medium border transition-all duration-200 ${
                                isInCompare
                                  ? "bg-brand-green/15 border-brand-green text-brand-green"
                                  : compareDisabled
                                    ? "border-border/40 text-muted-foreground/40 cursor-not-allowed"
                                    : "border-border/60 text-muted-foreground hover:border-brand-green/40 hover:text-foreground"
                              }`}
                            >
                              <GitCompareArrows className="h-3.5 w-3.5" />
                              {isInCompare ? "Remove from Compare" : "Compare"}
                            </button>
                          </div>
                        </div>
                      </div>
                    </article>
                  );
                })}
              </div>
            </>
          )}
        </div>
      </section>

      {/* Compare floating bar */}
      {compareList.length > 0 && (
        <div className="fixed bottom-6 left-1/2 -translate-x-1/2 z-50 flex items-center gap-3 px-5 py-3 rounded-2xl shadow-2xl border border-brand-green/40 bg-brand-dark/95 backdrop-blur-md">
          <span className="text-white text-sm font-medium">
            {compareList.length === 2
              ? "2 vehicles selected"
              : "1 vehicle selected — pick one more"}
          </span>
          {compareList.length === 2 && (
            <Button
              size="sm"
              onClick={handleCompareNow}
              data-ocid="vehicles.primary_button"
              className="bg-brand-green hover:bg-brand-green/90 text-white font-semibold text-xs px-4 py-1.5 h-auto"
            >
              <GitCompareArrows className="h-3.5 w-3.5 mr-1.5" />
              Compare Now
            </Button>
          )}
          <button
            type="button"
            onClick={() => setCompareList([])}
            data-ocid="vehicles.cancel_button"
            className="text-white/50 hover:text-white text-xs underline underline-offset-2 transition-colors"
          >
            Clear
          </button>
        </div>
      )}

      <QuoteModal
        open={quoteOpen}
        onClose={() => setQuoteOpen(false)}
        defaultVehicleInterest={selectedVehicle}
      />
    </main>
  );
}

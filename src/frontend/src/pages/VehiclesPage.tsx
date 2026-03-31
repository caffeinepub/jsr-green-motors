import QuoteModal from "@/components/QuoteModal";
import { STATIC_VEHICLES } from "@/data/vehicles";
import { useAllVehicles } from "@/hooks/useQueries";
import { formatPrice, getVehicleImage } from "@/utils/helpers";
import { Link } from "@tanstack/react-router";
import { GitCompareArrows, SlidersHorizontal } from "lucide-react";
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
  const { data: vehicles } = useAllVehicles();

  useEffect(() => {
    document.title = "Electric Scooters & Bikes | JSR Electric Vehicles Kodad";
  }, []);

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
      if (prev.some((v) => v === id)) return prev.filter((v) => v !== id);
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
    <main style={{ background: "#000", minHeight: "100vh" }}>
      {/* Header */}
      <section
        className="pt-32 pb-12 hex-pattern reveal-section"
        style={{ borderBottom: "1px solid rgba(0,255,178,0.08)" }}
      >
        <div className="container mx-auto px-4 lg:px-6 text-center">
          <div
            className="font-orbitron text-xs tracking-[4px] mb-3"
            style={{ color: "#00FFB2", opacity: 0.7 }}
          >
            {"// VEHICLE CATALOG"}
          </div>
          <h1 className="font-orbitron font-black mb-4">
            <span
              style={{
                color: "#F0FFF8",
                fontSize: "clamp(28px, 5vw, 56px)",
                display: "block",
              }}
            >
              CHOOSE YOUR
            </span>
            <span
              style={{
                color: "#00FFB2",
                fontSize: "clamp(28px, 5vw, 56px)",
                display: "block",
                textShadow: "0 0 40px rgba(0,255,178,0.4)",
              }}
            >
              WEAPON.
            </span>
          </h1>
          <div className="neon-line mx-auto" style={{ maxWidth: "200px" }} />
          <p
            className="mt-4 font-space"
            style={{ color: "rgba(240,255,248,0.45)", fontSize: "14px" }}
          >
            {filteredVehicles.length} vehicles across 8+ premium EV brands
          </p>
        </div>
      </section>

      {/* Filters */}
      <section
        className="sticky z-30 py-4"
        style={{
          top: "72px",
          background: "rgba(0,0,0,0.92)",
          backdropFilter: "blur(20px)",
          borderBottom: "1px solid rgba(0,255,178,0.08)",
        }}
      >
        <div className="container mx-auto px-4 lg:px-6 space-y-2">
          {/* Category pills */}
          <div
            className="flex items-center gap-2 overflow-x-auto pb-1"
            style={{ scrollbarWidth: "none" }}
          >
            <SlidersHorizontal
              className="h-3.5 w-3.5 shrink-0"
              style={{ color: "rgba(0,255,178,0.5)" }}
            />
            {categories.map((cat) => (
              <button
                type="button"
                key={cat}
                onClick={() => setActiveCategory(cat)}
                data-ocid="vehicles.tab"
                className="shrink-0 px-4 py-1.5 rounded-full text-xs font-orbitron tracking-widest transition-all duration-200"
                style={{
                  background:
                    activeCategory === cat ? "#00FFB2" : "rgba(0,255,178,0.04)",
                  border:
                    activeCategory === cat
                      ? "1px solid #00FFB2"
                      : "1px solid rgba(0,255,178,0.15)",
                  color:
                    activeCategory === cat ? "#000" : "rgba(240,255,248,0.6)",
                  boxShadow:
                    activeCategory === cat
                      ? "0 0 20px rgba(0,255,178,0.3)"
                      : "none",
                  fontSize: "10px",
                }}
              >
                {cat}
              </button>
            ))}
          </div>
          {/* Brand pills */}
          <div
            className="flex items-center gap-2 overflow-x-auto pb-1"
            style={{ scrollbarWidth: "none" }}
          >
            <span
              className="font-orbitron text-[9px] tracking-widest shrink-0"
              style={{ color: "rgba(0,255,178,0.4)" }}
            >
              BRAND:
            </span>
            {brands.map((brand) => (
              <button
                type="button"
                key={brand}
                onClick={() => setActiveBrand(brand)}
                data-ocid="vehicles.tab"
                className="shrink-0 px-3 py-1 rounded-full transition-all duration-200"
                style={{
                  background:
                    activeBrand === brand
                      ? "rgba(0,255,178,0.1)"
                      : "transparent",
                  border:
                    activeBrand === brand
                      ? "1px solid rgba(0,255,178,0.5)"
                      : "1px solid rgba(0,255,178,0.1)",
                  color:
                    activeBrand === brand ? "#00FFB2" : "rgba(240,255,248,0.5)",
                  fontFamily: "'Space Grotesk', sans-serif",
                  fontSize: "11px",
                }}
              >
                {brand}
              </button>
            ))}
          </div>
        </div>
      </section>

      {/* Vehicle Grid */}
      <section className="py-12">
        <div className="container mx-auto px-4 lg:px-6">
          {filteredVehicles.length === 0 ? (
            <div className="text-center py-20" data-ocid="vehicles.empty_state">
              <div
                className="text-5xl mb-4"
                style={{ filter: "drop-shadow(0 0 20px #00FFB2)" }}
              >
                ⚡
              </div>
              <h3
                className="font-orbitron text-lg mb-2"
                style={{ color: "#F0FFF8" }}
              >
                NO VEHICLES FOUND
              </h3>
              <p
                style={{
                  color: "rgba(240,255,248,0.4)",
                  fontFamily: "'Space Grotesk', sans-serif",
                }}
              >
                Try a different category or brand filter.
              </p>
            </div>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {filteredVehicles.map((vehicle, idx) => {
                const isInCompare = compareList.some((v) => v === vehicle.id);
                const compareDisabled = !isInCompare && compareList.length >= 2;
                return (
                  <article
                    key={vehicle.id.toString()}
                    data-ocid={`vehicles.item.${idx + 1}`}
                    className="holo-card flex flex-col"
                    style={{
                      boxShadow: isInCompare
                        ? "0 0 0 2px #00FFB2, 0 20px 60px rgba(0,255,178,0.2)"
                        : undefined,
                    }}
                  >
                    {/* Corner accents */}
                    <div className="corner-tl" />
                    <div className="corner-tr" />
                    <div className="corner-bl" />
                    <div className="corner-br" />

                    {/* Image section */}
                    <div
                      className="relative overflow-hidden"
                      style={{ height: "200px" }}
                    >
                      <div className="absolute inset-0 holo-scanline z-10 pointer-events-none" />
                      <img
                        src={getVehicleImage(
                          vehicle.id,
                          vehicle.brand,
                          vehicle.name,
                        )}
                        alt={vehicle.name}
                        className="holo-image-filter w-full h-full"
                        style={{ objectFit: "cover" }}
                        loading="lazy"
                      />
                      {/* Range badge */}
                      <div
                        className="absolute top-3 right-3 px-2.5 py-1 text-xs font-bebas"
                        style={{
                          background: "#00FFB2",
                          color: "#000",
                          transform: "rotateX(10deg)",
                          fontSize: "13px",
                          letterSpacing: "1px",
                          boxShadow: "0 4px 12px rgba(0,255,178,0.4)",
                        }}
                      >
                        {Number(vehicle.range_km)} KM
                      </div>
                      {vehicle.is_featured && (
                        <div
                          className="absolute top-3 left-3 px-2.5 py-1 text-xs font-orbitron"
                          style={{
                            background: "rgba(255,77,0,0.9)",
                            color: "#fff",
                            fontSize: "9px",
                            letterSpacing: "1px",
                          }}
                        >
                          FEATURED
                        </div>
                      )}
                      {isInCompare && (
                        <div
                          className="absolute bottom-2 right-2 px-2 py-0.5 text-xs font-orbitron"
                          style={{
                            background: "#00FFB2",
                            color: "#000",
                            fontSize: "9px",
                          }}
                        >
                          ✓ COMPARING
                        </div>
                      )}
                    </div>

                    {/* Card body */}
                    <div className="px-5 pt-4 pb-5 flex flex-col flex-1">
                      {/* Brand */}
                      <div
                        className="font-orbitron text-[10px] tracking-[3px] mb-1 pl-3"
                        style={{
                          color: "#00FFB2",
                          borderLeft: "2px solid #00FFB2",
                          opacity: 0.8,
                        }}
                      >
                        {vehicle.brand.toUpperCase()}
                      </div>

                      {/* Model name */}
                      <h3
                        className="font-orbitron font-bold mb-4 leading-tight"
                        style={{ color: "#F0FFF8", fontSize: "16px" }}
                      >
                        {vehicle.name}
                      </h3>

                      {/* HUD stats row */}
                      <div className="grid grid-cols-3 gap-2 mb-4">
                        {[
                          {
                            value: Number(vehicle.range_km).toString(),
                            label: "KM",
                          },
                          {
                            value: Number(vehicle.top_speed).toString(),
                            label: "KM/H",
                          },
                          {
                            value: Number(vehicle.motor_watts).toString(),
                            label: "WATTS",
                          },
                        ].map((spec) => (
                          <div key={spec.label} className="text-center">
                            <div
                              className="font-bebas leading-none"
                              style={{
                                color: "#00FFB2",
                                fontSize: "26px",
                                textShadow: "0 0 12px rgba(0,255,178,0.4)",
                              }}
                            >
                              {spec.value}
                            </div>
                            <div
                              className="font-orbitron"
                              style={{
                                color: "rgba(240,255,248,0.3)",
                                fontSize: "8px",
                                letterSpacing: "1px",
                              }}
                            >
                              {spec.label}
                            </div>
                          </div>
                        ))}
                      </div>

                      {/* Price */}
                      <div
                        className="font-bebas mb-4"
                        style={{
                          color: "#00FFB2",
                          fontSize: "24px",
                          textShadow: "0 0 12px rgba(0,255,178,0.3)",
                        }}
                      >
                        FROM {formatPrice(vehicle.price_min)}
                      </div>

                      {/* Spacer */}
                      <div className="flex-1" />

                      {/* Action buttons */}
                      <div className="space-y-2">
                        <Link
                          to="/vehicles/$id"
                          params={{ id: vehicle.id.toString() }}
                          className="block"
                        >
                          <button
                            type="button"
                            className="btn-neon w-full py-2.5 rounded text-xs"
                            data-ocid={`vehicles.item.${idx + 1}`}
                          >
                            VIEW SPECS
                          </button>
                        </Link>
                        <div className="grid grid-cols-2 gap-2">
                          <button
                            type="button"
                            className="btn-ghost-neon py-2 rounded text-[10px]"
                            onClick={() => openQuote(vehicle.name)}
                            data-ocid="vehicles.secondary_button"
                          >
                            GET PRICE
                          </button>
                          <button
                            type="button"
                            className="py-2 rounded text-[10px] font-orbitron transition-all"
                            onClick={() => toggleCompare(vehicle.id)}
                            disabled={compareDisabled}
                            data-ocid="vehicles.toggle"
                            style={{
                              background: isInCompare
                                ? "rgba(0,255,178,0.15)"
                                : "transparent",
                              border: "1px solid rgba(0,255,178,0.25)",
                              color: isInCompare
                                ? "#00FFB2"
                                : "rgba(240,255,248,0.5)",
                              opacity: compareDisabled ? 0.3 : 1,
                            }}
                          >
                            ⚡ COMPARE
                          </button>
                        </div>
                      </div>
                    </div>
                  </article>
                );
              })}
            </div>
          )}
        </div>
      </section>

      {/* Compare floating bar */}
      {compareList.length > 0 && (
        <div
          className="fixed bottom-6 left-1/2 -translate-x-1/2 z-50 flex items-center gap-3 px-6 py-3 rounded-full"
          style={{
            background: "rgba(0,0,0,0.95)",
            border: "1px solid rgba(0,255,178,0.4)",
            backdropFilter: "blur(20px)",
            boxShadow: "0 0 40px rgba(0,255,178,0.15)",
          }}
        >
          <span
            className="font-orbitron text-xs tracking-wider"
            style={{ color: "rgba(240,255,248,0.8)" }}
          >
            {compareList.length === 2
              ? "2 VEHICLES SELECTED"
              : "1 VEHICLE — PICK ONE MORE"}
          </span>
          {compareList.length === 2 && (
            <button
              type="button"
              onClick={handleCompareNow}
              data-ocid="vehicles.primary_button"
              className="btn-neon px-4 py-1.5 rounded-full text-xs flex items-center gap-1.5"
            >
              <GitCompareArrows className="h-3.5 w-3.5" />
              COMPARE NOW
            </button>
          )}
          <button
            type="button"
            onClick={() => setCompareList([])}
            data-ocid="vehicles.cancel_button"
            className="font-orbitron text-[10px] underline underline-offset-2 transition-colors"
            style={{ color: "rgba(240,255,248,0.4)" }}
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

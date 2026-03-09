import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Skeleton } from "@/components/ui/skeleton";
import { useAllVehicles, useVehicleById } from "@/hooks/useQueries";
import { formatPrice, getBrandImage } from "@/utils/helpers";
import { Link } from "@tanstack/react-router";
import {
  ArrowLeft,
  Battery,
  ChevronDown,
  Clock,
  Gauge,
  GitCompareArrows,
  Ruler,
  Shield,
  Zap,
} from "lucide-react";
import { useEffect, useMemo, useState } from "react";
import type { Vehicle } from "../backend.d";

function VehicleSelector({
  label,
  vehicles,
  selectedId,
  onSelect,
  otherSelectedId,
}: {
  label: string;
  vehicles: Vehicle[];
  selectedId: bigint | null;
  onSelect: (id: bigint) => void;
  otherSelectedId: bigint | null;
}) {
  const [search, setSearch] = useState("");
  const [open, setOpen] = useState(false);

  // Group by brand
  const grouped = useMemo(() => {
    const filtered = vehicles.filter(
      (v) =>
        v.name.toLowerCase().includes(search.toLowerCase()) ||
        v.brand.toLowerCase().includes(search.toLowerCase()),
    );
    const map: Record<string, Vehicle[]> = {};
    for (const v of filtered) {
      if (!map[v.brand]) map[v.brand] = [];
      map[v.brand].push(v);
    }
    return map;
  }, [vehicles, search]);

  const selectedVehicle = selectedId
    ? vehicles.find((v) => v.id === selectedId)
    : null;

  return (
    <div className="flex-1 min-w-0">
      <div className="text-xs font-semibold text-muted-foreground uppercase tracking-widest mb-3">
        {label}
      </div>
      {selectedVehicle ? (
        <div className="bg-card border border-brand-green/40 rounded-2xl overflow-hidden">
          <div className="relative h-44">
            <img
              src={getBrandImage(selectedVehicle.brand)}
              alt={selectedVehicle.name}
              className="w-full h-full object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-card via-transparent to-transparent" />
          </div>
          <div className="p-4">
            <p className="text-xs text-muted-foreground font-medium uppercase tracking-wide mb-0.5">
              {selectedVehicle.brand}
            </p>
            <h3 className="font-bold text-foreground text-lg leading-tight mb-1">
              {selectedVehicle.name}
            </h3>
            <p className="text-brand-green font-bold text-sm mb-4">
              {formatPrice(selectedVehicle.price_min)} –{" "}
              {formatPrice(selectedVehicle.price_max)}
            </p>
            <button
              type="button"
              onClick={() => {
                setOpen(true);
                setSearch("");
              }}
              className="text-xs text-muted-foreground hover:text-brand-green underline underline-offset-2 transition-colors"
            >
              Change vehicle
            </button>
          </div>
        </div>
      ) : (
        <button
          type="button"
          onClick={() => setOpen(true)}
          data-ocid="compare.primary_button"
          className="w-full h-44 rounded-2xl border-2 border-dashed border-border hover:border-brand-green/40 text-muted-foreground hover:text-brand-green transition-all duration-200 flex flex-col items-center justify-center gap-2 bg-card/50"
        >
          <GitCompareArrows className="h-8 w-8" />
          <span className="text-sm font-medium">Select a vehicle</span>
          <span className="text-xs opacity-70">Click to browse</span>
        </button>
      )}

      {/* Dropdown */}
      {open && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
          <button
            type="button"
            className="absolute inset-0 bg-black/60 backdrop-blur-sm cursor-default"
            onClick={() => setOpen(false)}
            aria-label="Close vehicle selector"
          />
          <div className="relative z-10 bg-card border border-border rounded-2xl w-full max-w-md max-h-[75vh] flex flex-col shadow-2xl">
            <div className="p-4 border-b border-border">
              <h3 className="font-semibold text-foreground mb-3">
                Select Vehicle
              </h3>
              <div className="relative">
                <Input
                  placeholder="Search by name or brand..."
                  value={search}
                  onChange={(e) => setSearch(e.target.value)}
                  className="pl-4"
                  autoFocus
                  data-ocid="compare.search_input"
                />
              </div>
            </div>
            <div className="overflow-y-auto flex-1 p-2">
              {Object.entries(grouped).map(([brand, vList]) => (
                <div key={brand} className="mb-3">
                  <div className="px-3 py-1.5 text-xs font-bold text-muted-foreground uppercase tracking-widest">
                    {brand}
                  </div>
                  {vList.map((v) => {
                    const isOther = v.id === otherSelectedId;
                    return (
                      <button
                        type="button"
                        key={v.id.toString()}
                        disabled={isOther}
                        onClick={() => {
                          onSelect(v.id);
                          setOpen(false);
                          setSearch("");
                        }}
                        className={`w-full text-left px-3 py-2.5 rounded-xl flex items-center gap-3 transition-colors ${
                          isOther
                            ? "opacity-40 cursor-not-allowed"
                            : "hover:bg-muted"
                        }`}
                      >
                        <img
                          src={getBrandImage(v.brand)}
                          alt={v.name}
                          className="w-10 h-8 object-cover rounded-lg shrink-0"
                        />
                        <div className="min-w-0">
                          <div className="font-medium text-sm text-foreground truncate">
                            {v.name}
                          </div>
                          <div className="text-xs text-muted-foreground">
                            {v.category} · {Number(v.range_km)} km
                          </div>
                        </div>
                        {isOther && (
                          <span className="ml-auto text-xs text-muted-foreground">
                            (other column)
                          </span>
                        )}
                      </button>
                    );
                  })}
                </div>
              ))}
              {Object.keys(grouped).length === 0 && (
                <div className="text-center py-8 text-muted-foreground text-sm">
                  No vehicles match "{search}"
                </div>
              )}
            </div>
            <div className="p-3 border-t border-border">
              <Button
                variant="outline"
                className="w-full"
                onClick={() => setOpen(false)}
                data-ocid="compare.close_button"
              >
                Cancel
              </Button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

// ---- Comparison table helpers ----
function SpecRow({
  label,
  val1,
  val2,
  higherIsBetter,
  n1,
  n2,
  icon: Icon,
}: {
  label: string;
  val1: string;
  val2: string;
  higherIsBetter?: boolean;
  n1?: number;
  n2?: number;
  icon: React.FC<{ className?: string }>;
}) {
  let best: 1 | 2 | null = null;
  if (n1 !== undefined && n2 !== undefined && n1 !== n2) {
    if (higherIsBetter) {
      best = n1 > n2 ? 1 : 2;
    } else {
      best = n1 < n2 ? 1 : 2;
    }
  }
  return (
    <div className="grid grid-cols-[1fr_auto_1fr] gap-0 border-b border-border/50 last:border-0">
      <div
        className={`p-3 text-sm ${best === 1 ? "bg-brand-green/8 text-brand-green font-semibold" : "text-foreground"}`}
      >
        {val1}
        {best === 1 && (
          <span className="ml-2 text-[10px] font-bold bg-brand-green/20 text-brand-green px-1.5 py-0.5 rounded-full">
            BETTER
          </span>
        )}
      </div>
      <div className="flex items-center justify-center p-2 bg-muted/30 border-x border-border/50 min-w-[120px]">
        <div className="flex items-center gap-1.5 text-xs text-muted-foreground">
          <Icon className="h-3.5 w-3.5 text-brand-green" />
          {label}
        </div>
      </div>
      <div
        className={`p-3 text-sm text-right ${best === 2 ? "bg-brand-green/8 text-brand-green font-semibold" : "text-foreground"}`}
      >
        {best === 2 && (
          <span className="mr-2 text-[10px] font-bold bg-brand-green/20 text-brand-green px-1.5 py-0.5 rounded-full">
            BETTER
          </span>
        )}
        {val2}
      </div>
    </div>
  );
}

function ComparisonTable({
  v1,
  v2,
  onReset1,
  onReset2,
}: {
  v1: Vehicle;
  v2: Vehicle;
  onReset1: () => void;
  onReset2: () => void;
}) {
  return (
    <div className="w-full">
      {/* Vehicle header row */}
      <div className="grid grid-cols-2 gap-4 mb-6">
        {[
          { v: v1, onReset: onReset1 },
          { v: v2, onReset: onReset2 },
        ].map(({ v, onReset }, idx) => (
          <div
            key={v.id.toString()}
            className="bg-card border border-border rounded-2xl overflow-hidden"
          >
            <div className="relative h-48">
              <img
                src={getBrandImage(v.brand)}
                alt={v.name}
                className="w-full h-full object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-card/80 to-transparent" />
              <Badge className="absolute top-3 left-3 bg-brand-green/90 text-white border-0">
                {idx === 0 ? "Vehicle 1" : "Vehicle 2"}
              </Badge>
            </div>
            <div className="p-4">
              <p className="text-xs text-muted-foreground font-medium uppercase tracking-wide mb-0.5">
                {v.brand}
              </p>
              <h3 className="font-bold text-foreground text-lg leading-tight mb-1">
                {v.name}
              </h3>
              <p className="text-brand-green font-bold text-sm mb-3">
                {formatPrice(v.price_min)} – {formatPrice(v.price_max)}
              </p>
              <button
                type="button"
                onClick={onReset}
                className="text-xs text-muted-foreground hover:text-brand-green underline underline-offset-2 transition-colors"
              >
                Change vehicle
              </button>
            </div>
          </div>
        ))}
      </div>

      {/* Spec comparison */}
      <div className="bg-card border border-border rounded-2xl overflow-hidden mb-6">
        <SpecRow
          label="Range"
          val1={`${Number(v1.range_km)} km`}
          val2={`${Number(v2.range_km)} km`}
          n1={Number(v1.range_km)}
          n2={Number(v2.range_km)}
          higherIsBetter
          icon={Ruler}
        />
        <SpecRow
          label="Top Speed"
          val1={`${Number(v1.top_speed)} km/h`}
          val2={`${Number(v2.top_speed)} km/h`}
          n1={Number(v1.top_speed)}
          n2={Number(v2.top_speed)}
          higherIsBetter
          icon={Gauge}
        />
        <SpecRow
          label="Battery"
          val1={`${v1.battery_kwh} kWh`}
          val2={`${v2.battery_kwh} kWh`}
          n1={v1.battery_kwh}
          n2={v2.battery_kwh}
          higherIsBetter
          icon={Battery}
        />
        <SpecRow
          label="Motor"
          val1={`${Number(v1.motor_watts)} W`}
          val2={`${Number(v2.motor_watts)} W`}
          n1={Number(v1.motor_watts)}
          n2={Number(v2.motor_watts)}
          higherIsBetter
          icon={Zap}
        />
        <SpecRow
          label="Charging"
          val1={`${v1.charging_hours} hrs`}
          val2={`${v2.charging_hours} hrs`}
          n1={v1.charging_hours}
          n2={v2.charging_hours}
          higherIsBetter={false}
          icon={Clock}
        />
        <SpecRow
          label="Brakes"
          val1={v1.brakes}
          val2={v2.brakes}
          icon={Shield}
        />
        <SpecRow
          label="Suspension"
          val1={v1.suspension}
          val2={v2.suspension}
          icon={ChevronDown}
        />
        <SpecRow
          label="Warranty"
          val1={v1.warranty}
          val2={v2.warranty}
          icon={Shield}
        />
      </div>

      {/* CTA row */}
      <div className="grid grid-cols-2 gap-4">
        {[v1, v2].map((v) => (
          <div key={v.id.toString()} className="flex flex-col gap-2">
            <Link to="/vehicles/$id" params={{ id: v.id.toString() }}>
              <Button
                className="w-full bg-brand-green hover:bg-brand-green/90 text-white font-semibold"
                data-ocid="compare.primary_button"
              >
                Get Quote — {v.name}
              </Button>
            </Link>
            <Link to="/booking">
              <Button
                variant="outline"
                className="w-full border-brand-green/40 text-brand-green hover:bg-brand-green/10"
                data-ocid="compare.secondary_button"
              >
                Book Test Drive
              </Button>
            </Link>
          </div>
        ))}
      </div>
    </div>
  );
}

export default function ComparisonPage() {
  // Read query params from window.location since the route doesn't declare search params
  const rawSearch = typeof window !== "undefined" ? window.location.search : "";
  const params = new URLSearchParams(rawSearch);
  const v1Param = params.get("v1");
  const v2Param = params.get("v2");

  const [selectedId1, setSelectedId1] = useState<bigint | null>(
    v1Param ? BigInt(v1Param) : null,
  );
  const [selectedId2, setSelectedId2] = useState<bigint | null>(
    v2Param ? BigInt(v2Param) : null,
  );

  const { data: allVehicles, isLoading: allLoading } = useAllVehicles();
  const { data: v1Data, isLoading: v1Loading } = useVehicleById(
    selectedId1 ?? 0n,
  );
  const { data: v2Data, isLoading: v2Loading } = useVehicleById(
    selectedId2 ?? 0n,
  );

  useEffect(() => {
    document.title = "Compare Electric Vehicles | JSR Green Motors";
  }, []);

  // Sync URL when selections change
  useEffect(() => {
    const search: Record<string, string> = {};
    if (selectedId1) search.v1 = selectedId1.toString();
    if (selectedId2) search.v2 = selectedId2.toString();
    const qs = new URLSearchParams(search).toString();
    const newUrl = `${window.location.pathname}${qs ? `?${qs}` : ""}`;
    window.history.replaceState(null, "", newUrl);
  }, [selectedId1, selectedId2]);

  const bothSelected = selectedId1 !== null && selectedId2 !== null;
  const v1Loaded = bothSelected && !v1Loading && v1Data;
  const v2Loaded = bothSelected && !v2Loading && v2Data;

  return (
    <main className="pt-20">
      {/* Header */}
      <section className="py-12 section-gradient">
        <div className="container mx-auto px-4 lg:px-6">
          <Link
            to="/vehicles"
            className="inline-flex items-center gap-2 text-sm text-white/60 hover:text-white mb-6 transition-colors"
          >
            <ArrowLeft className="h-4 w-4" /> Back to Vehicles
          </Link>
          <div className="text-center">
            <Badge className="mb-3 bg-brand-green/20 text-brand-green border-brand-green/30 text-xs uppercase tracking-widest">
              Side by Side
            </Badge>
            <h1 className="text-3xl md:text-4xl font-display font-bold text-white mb-3">
              Compare Electric Vehicles
            </h1>
            <p className="text-white/60 max-w-xl mx-auto text-sm">
              Select any two vehicles from different brands to compare specs,
              pricing, and performance side by side.
            </p>
          </div>
        </div>
      </section>

      <section className="py-12 bg-background">
        <div className="container mx-auto px-4 lg:px-6 max-w-5xl">
          {allLoading ? (
            <div
              className="grid grid-cols-2 gap-4"
              data-ocid="compare.loading_state"
            >
              <Skeleton className="h-64 w-full rounded-2xl" />
              <Skeleton className="h-64 w-full rounded-2xl" />
            </div>
          ) : !bothSelected || !v1Loaded || !v2Loaded ? (
            /* Selector UI */
            <div>
              <div className="flex flex-col sm:flex-row gap-6 mb-8">
                <VehicleSelector
                  label="Vehicle 1"
                  vehicles={allVehicles ?? []}
                  selectedId={selectedId1}
                  onSelect={setSelectedId1}
                  otherSelectedId={selectedId2}
                />
                <div className="flex items-center justify-center shrink-0">
                  <div className="w-10 h-10 rounded-full bg-muted flex items-center justify-center">
                    <GitCompareArrows className="h-5 w-5 text-muted-foreground" />
                  </div>
                </div>
                <VehicleSelector
                  label="Vehicle 2"
                  vehicles={allVehicles ?? []}
                  selectedId={selectedId2}
                  onSelect={setSelectedId2}
                  otherSelectedId={selectedId1}
                />
              </div>

              {selectedId1 && selectedId2 && (v1Loading || v2Loading) && (
                <div
                  className="text-center py-8"
                  data-ocid="compare.loading_state"
                >
                  <Skeleton className="h-8 w-48 mx-auto mb-3" />
                  <Skeleton className="h-64 w-full rounded-2xl" />
                </div>
              )}

              {!selectedId1 || !selectedId2 ? (
                <div className="text-center py-6 text-muted-foreground text-sm">
                  {!selectedId1 && !selectedId2
                    ? "Select two vehicles above to start comparing"
                    : "Select one more vehicle to compare"}
                </div>
              ) : null}
            </div>
          ) : (
            <ComparisonTable
              v1={v1Data}
              v2={v2Data}
              onReset1={() => setSelectedId1(null)}
              onReset2={() => setSelectedId2(null)}
            />
          )}
        </div>
      </section>
    </main>
  );
}

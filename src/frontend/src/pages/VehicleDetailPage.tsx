import QuoteModal from "@/components/QuoteModal";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Skeleton } from "@/components/ui/skeleton";
import { Slider } from "@/components/ui/slider";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Textarea } from "@/components/ui/textarea";
import { getVehicleExtended } from "@/data/vehicleGallery";
import { STATIC_VEHICLES } from "@/data/vehicles";
import { useAddVehicleEnquiry, useVehicleById } from "@/hooks/useQueries";
import { calculateEMI, formatPrice, getVehicleImage } from "@/utils/helpers";
import { Link, useNavigate, useParams } from "@tanstack/react-router";
import {
  ArrowLeft,
  Battery,
  CheckCircle2,
  ChevronLeft,
  ChevronRight,
  Clock,
  Gauge,
  Loader2,
  Play,
  Ruler,
  Shield,
  Zap,
} from "lucide-react";
import { useCallback, useEffect, useRef, useState } from "react";
import { toast } from "sonner";
import type { Vehicle } from "../backend.d";

export default function VehicleDetailPage() {
  const { id } = useParams({ strict: false });
  const vehicleId = BigInt((id as string | undefined) ?? "0");
  const { data: backendVehicle, isLoading } = useVehicleById(vehicleId);
  const staticVehicle = STATIC_VEHICLES.find((v) => v.id === vehicleId) as
    | Vehicle
    | undefined;
  const vehicle: Vehicle | undefined = (backendVehicle ?? staticVehicle) as
    | Vehicle
    | undefined;
  const enquiryMutation = useAddVehicleEnquiry();
  const [quoteOpen, setQuoteOpen] = useState(false);
  const [enquirySuccess, setEnquirySuccess] = useState(false);

  // EMI Calculator state
  const [loanAmount, setLoanAmount] = useState(0);
  const [interestRate, setInterestRate] = useState(8.5);
  const [tenure, setTenure] = useState(36);

  // Enquiry form
  const [enquiry, setEnquiry] = useState({
    name: "",
    email: "",
    phone: "",
    city: "",
    message: "",
  });

  // Gallery state
  const extended = getVehicleExtended(vehicleId);
  const fallbackImg = vehicle
    ? getVehicleImage(vehicle.id, vehicle.brand, vehicle.name)
    : "";

  const allGalleryImages =
    extended.gallery.length > 0
      ? extended.gallery
      : fallbackImg
        ? [{ url: fallbackImg, label: "Vehicle" }]
        : [];

  const [activeImageUrl, setActiveImageUrl] = useState<string>(
    allGalleryImages[0]?.url ?? "",
  );
  const [selectedColorName, setSelectedColorName] = useState<string | null>(
    extended.colors[0]?.name ?? null,
  );

  // Reset gallery state when vehicle changes
  useEffect(() => {
    const newExtended = getVehicleExtended(vehicleId);
    const newFallback = vehicle
      ? getVehicleImage(vehicle.id, vehicle.brand, vehicle.name)
      : "";
    const newGallery =
      newExtended.gallery.length > 0
        ? newExtended.gallery
        : newFallback
          ? [{ url: newFallback, label: "Vehicle" }]
          : [];
    setActiveImageUrl(newGallery[0]?.url ?? "");
    setSelectedColorName(newExtended.colors[0]?.name ?? null);
  }, [vehicleId, vehicle]);

  useEffect(() => {
    if (vehicle) {
      document.title = `${vehicle.name} | JSR Electric Vehicles`;
      setLoanAmount(0);
    }
  }, [vehicle]);

  const emi = calculateEMI(loanAmount, interestRate, tenure);

  // Swipe navigation
  const navigate = useNavigate();
  const currentIndex = STATIC_VEHICLES.findIndex((v) => v.id === vehicleId);
  const prevVehicle =
    currentIndex > 0 ? STATIC_VEHICLES[currentIndex - 1] : null;
  const nextVehicle =
    currentIndex < STATIC_VEHICLES.length - 1
      ? STATIC_VEHICLES[currentIndex + 1]
      : null;

  const touchStartX = useRef<number | null>(null);

  const handleTouchStart = useCallback((e: React.TouchEvent) => {
    touchStartX.current = e.touches[0].clientX;
  }, []);

  const handleTouchEnd = useCallback(
    (e: React.TouchEvent) => {
      if (touchStartX.current === null) return;
      const delta = touchStartX.current - e.changedTouches[0].clientX;
      touchStartX.current = null;
      if (Math.abs(delta) < 50) return;
      if (delta > 0 && nextVehicle) {
        navigate({ to: `/vehicles/${nextVehicle.id.toString()}` });
      } else if (delta < 0 && prevVehicle) {
        navigate({ to: `/vehicles/${prevVehicle.id.toString()}` });
      }
    },
    [navigate, nextVehicle, prevVehicle],
  );

  const handleEnquiry = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!vehicle) return;
    try {
      await enquiryMutation.mutateAsync({
        vehicle_id: vehicle.id,
        ...enquiry,
      });
      setEnquirySuccess(true);
      toast.success("Enquiry submitted! We'll contact you soon.");
    } catch {
      toast.error("Failed to submit. Please try again.");
    }
  };

  const showLoading = isLoading && !staticVehicle;
  if (showLoading) {
    return (
      <main className="pt-20">
        <div className="container mx-auto px-4 lg:px-6 py-12">
          <Skeleton className="h-8 w-32 mb-6" />
          <Skeleton className="h-80 w-full rounded-2xl mb-8" />
          <div className="grid md:grid-cols-2 gap-8">
            <div className="space-y-4">
              <Skeleton className="h-6 w-2/3" />
              <Skeleton className="h-4 w-1/2" />
              <Skeleton className="h-32 w-full" />
            </div>
            <Skeleton className="h-64 w-full" />
          </div>
        </div>
      </main>
    );
  }

  if (!vehicle) {
    return (
      <main className="pt-20 min-h-screen flex items-center justify-center">
        <div className="text-center">
          <div className="text-6xl mb-4">🔌</div>
          <h2 className="text-2xl font-bold text-foreground mb-2">
            Vehicle Not Found
          </h2>
          <p className="text-muted-foreground mb-6">
            This vehicle may have been removed or the ID is invalid.
          </p>
          <Link to="/vehicles">
            <Button className="bg-brand-green hover:bg-brand-green/90 text-white">
              Back to Vehicles
            </Button>
          </Link>
        </div>
      </main>
    );
  }

  // Specs — use keyFeatures from extended data if available, else fall back to backend fields
  const backendSpecs = [
    {
      label: "Motor Power",
      value: `${Number(vehicle.motor_watts)} W`,
      icon: Zap,
    },
    {
      label: "Battery Type",
      value: `${vehicle.battery_kwh} kWh Lithium-ion`,
      icon: Battery,
    },
    {
      label: "Range per Charge",
      value: `${Number(vehicle.range_km)} km`,
      icon: Ruler,
    },
    {
      label: "Top Speed",
      value: `${Number(vehicle.top_speed)} km/h`,
      icon: Gauge,
    },
    {
      label: "Charging Time",
      value: `${vehicle.charging_hours} hours`,
      icon: Clock,
    },
    { label: "Brakes", value: vehicle.brakes, icon: Shield },
    { label: "Suspension", value: vehicle.suspension, icon: Shield },
    { label: "Warranty", value: vehicle.warranty, icon: CheckCircle2 },
  ];

  const bgColor = extended.bgColor ?? "oklch(0.12 0.015 145)";

  return (
    <main
      className="pt-20"
      onTouchStart={handleTouchStart}
      onTouchEnd={handleTouchEnd}
    >
      {/* Swipe nav arrows */}
      {prevVehicle && (
        <button
          onClick={() =>
            navigate({ to: `/vehicles/${prevVehicle.id.toString()}` })
          }
          type="button"
          className="fixed left-2 top-1/2 -translate-y-1/2 z-50 bg-brand-green/90 hover:bg-brand-green text-white rounded-full w-11 h-11 flex items-center justify-center shadow-lg transition-all"
          aria-label="Previous vehicle"
          data-ocid="vehicle_detail.prev_button"
        >
          <ChevronLeft className="w-6 h-6" />
        </button>
      )}
      {nextVehicle && (
        <button
          onClick={() =>
            navigate({ to: `/vehicles/${nextVehicle.id.toString()}` })
          }
          type="button"
          className="fixed right-2 top-1/2 -translate-y-1/2 z-50 bg-brand-green/90 hover:bg-brand-green text-white rounded-full w-11 h-11 flex items-center justify-center shadow-lg transition-all"
          aria-label="Next vehicle"
          data-ocid="vehicle_detail.next_button"
        >
          <ChevronRight className="w-6 h-6" />
        </button>
      )}
      {/* Vehicle counter */}
      {currentIndex >= 0 && (
        <div className="fixed bottom-24 left-1/2 -translate-x-1/2 z-50 bg-black/70 text-white text-xs px-3 py-1 rounded-full pointer-events-none">
          {currentIndex + 1} / {STATIC_VEHICLES.length}
        </div>
      )}

      {/* Back Navigation */}
      <div className="bg-background border-b border-border py-3">
        <div className="container mx-auto px-4 lg:px-6">
          <Link
            to="/vehicles"
            className="inline-flex items-center gap-2 text-sm text-muted-foreground hover:text-brand-green transition-colors"
          >
            <ArrowLeft className="h-4 w-4" /> Back to Vehicles
          </Link>
        </div>
      </div>

      {/* Hero: Gallery + Info */}
      <section style={{ background: bgColor }}>
        <div className="container mx-auto px-4 lg:px-6 py-8">
          <div className="grid lg:grid-cols-2 gap-10 items-start">
            {/* Gallery column */}
            <div className="flex flex-col gap-4">
              {/* Main image */}
              <div
                className="relative rounded-2xl overflow-hidden flex items-center justify-center"
                style={{ background: bgColor, minHeight: 260 }}
              >
                {activeImageUrl ? (
                  <img
                    src={activeImageUrl}
                    alt={vehicle.name}
                    className="w-full object-contain rounded-2xl shadow-card-hover"
                    style={{ maxHeight: 420, minHeight: 200 }}
                  />
                ) : (
                  <div className="flex items-center justify-center h-64 text-muted-foreground text-sm">
                    No image available
                  </div>
                )}
                <Badge className="absolute top-4 left-4 bg-brand-green text-white border-0">
                  {vehicle.category}
                </Badge>
                <img
                  src="/assets/uploads/JSR_LOGO-2.png"
                  alt="JSR"
                  className="absolute bottom-3 right-3 w-10 h-10 object-contain opacity-60 pointer-events-none"
                />
              </div>

              {/* Thumbnail strip */}
              {allGalleryImages.length > 1 && (
                <div className="flex gap-3 overflow-x-auto pb-1">
                  {allGalleryImages.map((img) => (
                    <button
                      key={img.url}
                      type="button"
                      onClick={() => setActiveImageUrl(img.url)}
                      className="flex-none flex flex-col items-center gap-1 group focus:outline-none"
                    >
                      <div
                        className={`w-20 h-16 rounded-lg overflow-hidden border-2 transition-all ${
                          activeImageUrl === img.url
                            ? "border-brand-green shadow-[0_0_0_2px_#00A859]"
                            : "border-border/40 hover:border-brand-green/60"
                        }`}
                      >
                        <img
                          src={img.url}
                          alt={img.label}
                          className="w-full h-full object-contain"
                          style={{ background: bgColor }}
                        />
                      </div>
                      <span
                        className={`text-[10px] font-medium transition-colors ${
                          activeImageUrl === img.url
                            ? "text-brand-green"
                            : "text-muted-foreground group-hover:text-foreground"
                        }`}
                      >
                        {img.label}
                      </span>
                    </button>
                  ))}
                </div>
              )}

              {/* Color selector */}
              {extended.colors.length > 0 && (
                <div className="mt-1">
                  <p className="text-xs font-semibold text-muted-foreground uppercase tracking-wider mb-2">
                    Available Colors:
                  </p>
                  <div className="flex flex-wrap gap-3 items-center">
                    {extended.colors.map((color) => (
                      <button
                        key={color.name}
                        type="button"
                        title={color.name}
                        onClick={() => {
                          setSelectedColorName(color.name);
                          setActiveImageUrl(color.imageUrl);
                        }}
                        className={`relative w-7 h-7 rounded-full border-2 transition-all focus:outline-none ${
                          selectedColorName === color.name
                            ? "border-brand-green ring-2 ring-brand-green ring-offset-2 ring-offset-transparent scale-110"
                            : "border-white/30 hover:scale-105 hover:border-brand-green/50"
                        }`}
                        style={{ backgroundColor: color.hex }}
                        aria-label={color.name}
                        data-ocid="vehicle_detail.toggle"
                      />
                    ))}
                    {selectedColorName && (
                      <span className="text-xs text-muted-foreground ml-1">
                        {selectedColorName}
                      </span>
                    )}
                  </div>
                </div>
              )}
            </div>

            {/* Info column */}
            <div>
              <p className="text-muted-foreground text-sm font-medium uppercase tracking-wider mb-2">
                {vehicle.brand}
              </p>
              <h1 className="text-3xl md:text-4xl font-display font-bold text-foreground mb-4">
                {vehicle.name}
              </h1>
              <p className="text-muted-foreground mb-6 leading-relaxed">
                {vehicle.description}
              </p>
              <div className="flex items-center gap-4 mb-6">
                <div>
                  <div className="text-sm text-muted-foreground">
                    Starting from
                  </div>
                  <div className="text-3xl font-bold text-brand-green">
                    {formatPrice(vehicle.price_min)}
                  </div>
                  <div className="text-sm text-muted-foreground">
                    Up to {formatPrice(vehicle.price_max)}
                  </div>
                </div>
              </div>
              <div className="flex flex-wrap gap-3">
                <Button
                  onClick={() => setQuoteOpen(true)}
                  className="bg-brand-green hover:bg-brand-green/90 text-white font-semibold px-6"
                  data-ocid="vehicle_detail.primary_button"
                >
                  Get Quote
                </Button>
                <a href="#enquiry">
                  <Button
                    variant="outline"
                    className="border-brand-green text-brand-green hover:bg-brand-green/10"
                    data-ocid="vehicle_detail.secondary_button"
                  >
                    Request Callback
                  </Button>
                </a>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Key Highlights */}
      {extended.highlights.length > 0 && (
        <section className="py-12 bg-background">
          <div className="container mx-auto px-4 lg:px-6">
            <h2 className="text-2xl font-display font-bold text-foreground mb-6">
              Key Highlights
            </h2>
            <div className="grid sm:grid-cols-2 gap-x-8 gap-y-3 max-w-2xl">
              {extended.highlights.map((highlight) => (
                <div key={highlight} className="flex items-start gap-2.5">
                  <CheckCircle2 className="h-5 w-5 text-brand-green shrink-0 mt-0.5" />
                  <span className="text-foreground text-sm leading-relaxed">
                    {highlight}
                  </span>
                </div>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* Specs Table */}
      <section className="py-12 bg-background border-t border-border/40">
        <div className="container mx-auto px-4 lg:px-6">
          <h2 className="text-2xl font-display font-bold text-foreground mb-6">
            Key Specifications
          </h2>
          <div className="rounded-xl border border-border overflow-hidden max-w-2xl">
            <Table>
              <TableHeader>
                <TableRow className="bg-muted/50">
                  <TableHead className="font-semibold">Specification</TableHead>
                  <TableHead className="font-semibold">Value</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {(extended.keyFeatures.length > 0
                  ? extended.keyFeatures.map((kf) => ({
                      label: kf.label,
                      value: kf.value,
                      icon: Zap,
                    }))
                  : backendSpecs
                ).map((spec) => {
                  const Icon = spec.icon;
                  return (
                    <TableRow key={spec.label} className="hover:bg-muted/20">
                      <TableCell className="font-medium">
                        <div className="flex items-center gap-2">
                          <Icon className="h-4 w-4 text-brand-green" />
                          {spec.label}
                        </div>
                      </TableCell>
                      <TableCell className="text-muted-foreground">
                        {spec.value}
                      </TableCell>
                    </TableRow>
                  );
                })}
              </TableBody>
            </Table>
          </div>
        </div>
      </section>

      {/* Video Section */}
      {extended.videoUrl && (
        <section className="py-12 bg-card border-t border-border/40">
          <div className="container mx-auto px-4 lg:px-6">
            <h2 className="text-2xl font-display font-bold text-foreground mb-6 flex items-center gap-3">
              <span className="w-8 h-8 rounded-full bg-brand-green flex items-center justify-center">
                <Play className="h-4 w-4 text-white fill-white" />
              </span>
              Watch the {vehicle.name} in Action
            </h2>
            <div
              className="relative max-w-2xl rounded-2xl overflow-hidden shadow-lg border border-border"
              style={{ paddingBottom: "56.25%", height: 0 }}
            >
              <iframe
                src={extended.videoUrl}
                title={`${vehicle.name} video`}
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                allowFullScreen
                className="absolute inset-0 w-full h-full"
              />
            </div>
          </div>
        </section>
      )}

      {/* Why Choose This Model */}
      <section className="py-8 pb-16 bg-background">
        <div className="container mx-auto px-4 lg:px-6">
          <div className="bg-card border border-border rounded-2xl p-8 max-w-2xl">
            <h2 className="text-2xl font-display font-bold text-foreground mb-4">
              Why Choose the {vehicle.name}?
            </h2>
            <p className="text-muted-foreground leading-relaxed">
              The {vehicle.name} from {vehicle.brand} is an ideal choice for
              urban commuters and delivery professionals alike. With a range of{" "}
              {Number(vehicle.range_km)} km per charge and a top speed of{" "}
              {Number(vehicle.top_speed)} km/h, it offers the perfect balance of
              performance and efficiency. The {vehicle.battery_kwh} kWh
              lithium-ion battery charges in just {vehicle.charging_hours}{" "}
              hours, making it incredibly practical. Low maintenance costs, zero
              fuel expenses, and government incentives make this one of the best
              value EVs available in Andhra Pradesh today.
            </p>
          </div>
        </div>
      </section>

      {/* EMI Calculator */}
      <section className="py-16 bg-brand-light-gray">
        <div className="container mx-auto px-4 lg:px-6">
          <div className="max-w-2xl">
            <h2 className="text-2xl font-display font-bold text-foreground mb-6">
              EMI Calculator
            </h2>
            <div className="bg-card border border-border rounded-2xl p-8">
              <div className="space-y-6">
                <div>
                  <div className="flex justify-between text-sm mb-2">
                    <Label>Loan Amount</Label>
                    <span className="text-brand-green font-semibold">
                      {formatPrice(BigInt(loanAmount))}
                    </span>
                  </div>
                  <Slider
                    value={[loanAmount]}
                    min={0}
                    max={400000}
                    step={1000}
                    onValueChange={(v) => setLoanAmount(v[0])}
                    className="mt-2"
                    data-ocid="vehicle_detail.toggle"
                  />
                </div>
                <div>
                  <div className="flex justify-between text-sm mb-2">
                    <Label>Interest Rate</Label>
                    <span className="text-brand-green font-semibold">
                      {interestRate}% p.a.
                    </span>
                  </div>
                  <Slider
                    value={[interestRate]}
                    min={6}
                    max={18}
                    step={0.5}
                    onValueChange={(v) => setInterestRate(v[0])}
                    className="mt-2"
                  />
                </div>
                <div>
                  <div className="flex justify-between text-sm mb-2">
                    <Label>Tenure</Label>
                    <span className="text-brand-green font-semibold">
                      {tenure} months
                    </span>
                  </div>
                  <Slider
                    value={[tenure]}
                    min={12}
                    max={60}
                    step={6}
                    onValueChange={(v) => setTenure(v[0])}
                    className="mt-2"
                  />
                </div>
                <div className="bg-brand-green/10 border border-brand-green/20 rounded-xl p-5 text-center">
                  <div className="text-sm text-muted-foreground mb-1">
                    Estimated Monthly EMI
                  </div>
                  <div className="text-4xl font-bold text-brand-green">
                    ₹{emi.toLocaleString("en-IN")}
                  </div>
                  <div className="text-xs text-muted-foreground mt-1">
                    *Indicative only. Actual rates may vary.
                  </div>
                </div>
                <div className="grid grid-cols-2 gap-3 mt-3">
                  <div className="bg-background border border-border rounded-xl p-4 text-center">
                    <div className="text-xs text-muted-foreground mb-1">
                      Total Amount Payable
                    </div>
                    <div className="text-xl font-bold text-foreground">
                      ₹{(emi * tenure).toLocaleString("en-IN")}
                    </div>
                  </div>
                  <div className="bg-amber-500/10 border border-amber-500/20 rounded-xl p-4 text-center">
                    <div className="text-xs text-muted-foreground mb-1">
                      Total Interest Payable
                    </div>
                    <div className="text-xl font-bold text-amber-500">
                      ₹{(emi * tenure - loanAmount).toLocaleString("en-IN")}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Running Cost Comparison */}
      <section className="py-16 bg-background">
        <div className="container mx-auto px-4 lg:px-6">
          <div className="max-w-2xl">
            <h2 className="text-2xl font-display font-bold text-foreground mb-6">
              Running Cost Comparison
            </h2>
            <div className="grid sm:grid-cols-2 gap-4">
              <div className="bg-card border border-border rounded-2xl p-6">
                <div className="flex items-center gap-2 mb-4">
                  <div className="w-8 h-8 rounded-full bg-orange-500/10 flex items-center justify-center">
                    <span className="text-orange-500 text-sm">⛽</span>
                  </div>
                  <h3 className="font-semibold text-foreground">
                    Petrol Monthly Cost
                  </h3>
                </div>
                <div className="space-y-2 text-sm text-muted-foreground">
                  <div className="flex justify-between">
                    <span>Fuel (60km/day)</span>
                    <span className="text-foreground font-medium">~₹2,500</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Maintenance</span>
                    <span className="text-foreground font-medium">~₹600</span>
                  </div>
                  <div className="flex justify-between border-t border-border pt-2 font-semibold">
                    <span>Total</span>
                    <span className="text-orange-500">~₹3,100</span>
                  </div>
                </div>
              </div>
              <div className="bg-brand-green/5 border border-brand-green/30 rounded-2xl p-6">
                <div className="flex items-center gap-2 mb-4">
                  <div className="w-8 h-8 rounded-full bg-brand-green/15 flex items-center justify-center">
                    <Zap className="h-4 w-4 text-brand-green" />
                  </div>
                  <h3 className="font-semibold text-foreground">
                    EV Monthly Cost
                  </h3>
                </div>
                <div className="space-y-2 text-sm text-muted-foreground">
                  <div className="flex justify-between">
                    <span>Charging (60km/day)</span>
                    <span className="text-foreground font-medium">~₹350</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Maintenance</span>
                    <span className="text-foreground font-medium">~₹150</span>
                  </div>
                  <div className="flex justify-between border-t border-border pt-2 font-semibold">
                    <span>Total</span>
                    <span className="text-brand-green">~₹500</span>
                  </div>
                </div>
              </div>
            </div>
            <div className="mt-4 bg-brand-green text-white rounded-2xl p-5 flex flex-col sm:flex-row items-center justify-between gap-3">
              <div>
                <div className="text-sm opacity-85">Monthly Savings</div>
                <div className="text-2xl font-bold">₹2,600</div>
              </div>
              <div className="w-px h-10 bg-white/20 hidden sm:block" />
              <div>
                <div className="text-sm opacity-85">Annual Savings</div>
                <div className="text-2xl font-bold">₹31,200</div>
              </div>
              <div className="w-px h-10 bg-white/20 hidden sm:block" />
              <div className="text-center">
                <div className="text-sm opacity-85">Cost Reduction</div>
                <div className="text-2xl font-bold">~70%</div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Enquiry Form */}
      <section id="enquiry" className="py-16 bg-background">
        <div className="container mx-auto px-4 lg:px-6">
          <div className="max-w-2xl">
            <h2 className="text-2xl font-display font-bold text-foreground mb-6">
              Request a Callback
            </h2>
            {enquirySuccess ? (
              <div
                className="bg-card border border-brand-green/20 rounded-2xl p-8 text-center"
                data-ocid="vehicle_detail.success_state"
              >
                <CheckCircle2 className="h-16 w-16 text-brand-green mx-auto mb-4" />
                <h3 className="text-xl font-semibold text-foreground mb-2">
                  Enquiry Submitted!
                </h3>
                <p className="text-muted-foreground">
                  Our team will contact you within 24 hours about the{" "}
                  {vehicle.name}.
                </p>
              </div>
            ) : (
              <form
                onSubmit={handleEnquiry}
                className="bg-card border border-border rounded-2xl p-8 space-y-4"
              >
                <div className="grid sm:grid-cols-2 gap-4">
                  <div className="space-y-1.5">
                    <Label htmlFor="enq-name">Full Name *</Label>
                    <Input
                      id="enq-name"
                      placeholder="Your name"
                      value={enquiry.name}
                      onChange={(e) =>
                        setEnquiry((p) => ({ ...p, name: e.target.value }))
                      }
                      required
                      data-ocid="vehicle_detail.input"
                    />
                  </div>
                  <div className="space-y-1.5">
                    <Label htmlFor="enq-phone">Phone *</Label>
                    <Input
                      id="enq-phone"
                      type="tel"
                      placeholder="+91 XXXXX XXXXX"
                      value={enquiry.phone}
                      onChange={(e) =>
                        setEnquiry((p) => ({ ...p, phone: e.target.value }))
                      }
                      required
                    />
                  </div>
                </div>
                <div className="grid sm:grid-cols-2 gap-4">
                  <div className="space-y-1.5">
                    <Label htmlFor="enq-email">Email</Label>
                    <Input
                      id="enq-email"
                      type="email"
                      placeholder="email@example.com"
                      value={enquiry.email}
                      onChange={(e) =>
                        setEnquiry((p) => ({ ...p, email: e.target.value }))
                      }
                    />
                  </div>
                  <div className="space-y-1.5">
                    <Label htmlFor="enq-city">City *</Label>
                    <Input
                      id="enq-city"
                      placeholder="Your city"
                      value={enquiry.city}
                      onChange={(e) =>
                        setEnquiry((p) => ({ ...p, city: e.target.value }))
                      }
                      required
                    />
                  </div>
                </div>
                <div className="space-y-1.5">
                  <Label htmlFor="enq-message">Message</Label>
                  <Textarea
                    id="enq-message"
                    placeholder="Any specific questions or requirements?"
                    value={enquiry.message}
                    onChange={(e) =>
                      setEnquiry((p) => ({ ...p, message: e.target.value }))
                    }
                    rows={3}
                    data-ocid="vehicle_detail.textarea"
                  />
                </div>
                <Button
                  type="submit"
                  disabled={enquiryMutation.isPending}
                  className="w-full bg-brand-green hover:bg-brand-green/90 text-white font-semibold"
                  data-ocid="vehicle_detail.submit_button"
                >
                  {enquiryMutation.isPending ? (
                    <>
                      <Loader2 className="h-4 w-4 mr-2 animate-spin" />{" "}
                      Submitting...
                    </>
                  ) : (
                    "Request Callback"
                  )}
                </Button>
              </form>
            )}
          </div>
        </div>
      </section>

      {/* Trust Message */}
      <section className="py-6 bg-brand-light-gray">
        <div className="container mx-auto px-4 lg:px-6">
          <div className="max-w-2xl">
            <div className="flex items-center gap-3 bg-brand-green/10 border border-brand-green/25 rounded-xl px-5 py-4">
              <CheckCircle2 className="h-5 w-5 text-brand-green shrink-0" />
              <p className="text-sm font-medium text-foreground">
                Delivered with Full Documentation &amp; Service Support — JSR
                Electric Vehicles stands with you after every purchase.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Model-Specific FAQ */}
      <section className="py-16 bg-background">
        <div className="container mx-auto px-4 lg:px-6">
          <div className="max-w-2xl">
            <h2 className="text-2xl font-display font-bold text-foreground mb-6">
              Frequently Asked Questions
            </h2>
            <Accordion type="single" collapsible className="space-y-3">
              {[
                {
                  q: `What is the real-world range of the ${vehicle.name}?`,
                  a: `The ${vehicle.name} offers up to ${Number(vehicle.range_km)} km per charge under standard conditions. Real-world range may vary based on terrain, rider weight, and riding style.`,
                },
                {
                  q: "How long does a full charge take?",
                  a: `A full charge takes approximately ${vehicle.charging_hours} hours using the standard charger supplied. Fast charging options may be available — ask our team.`,
                },
                {
                  q: "Is this vehicle covered by manufacturer warranty?",
                  a: `Yes. The ${vehicle.name} comes with ${vehicle.warranty}. JSR Electric Vehicles also provides after-sales service support for the duration of the warranty.`,
                },
                {
                  q: "Can I get an EMI for this vehicle?",
                  a: "Yes. We assist with financing through leading banks. EMI starts from as low as ₹2,000/month depending on the loan amount and tenure. Use the EMI calculator above for an estimate.",
                },
              ].map((faq) => (
                <AccordionItem
                  key={faq.q.slice(0, 40)}
                  value={faq.q.slice(0, 40)}
                  className="bg-card border border-border rounded-xl px-5 overflow-hidden"
                >
                  <AccordionTrigger className="text-left font-medium text-foreground hover:text-brand-green hover:no-underline py-4">
                    {faq.q}
                  </AccordionTrigger>
                  <AccordionContent className="text-muted-foreground text-sm leading-relaxed pb-4">
                    {faq.a}
                  </AccordionContent>
                </AccordionItem>
              ))}
            </Accordion>
          </div>
        </div>
      </section>

      <QuoteModal
        open={quoteOpen}
        onClose={() => setQuoteOpen(false)}
        defaultVehicleInterest={vehicle.name}
      />
    </main>
  );
}

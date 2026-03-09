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
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Skeleton } from "@/components/ui/skeleton";
import { useAddCallbackRequest, useFeaturedVehicles } from "@/hooks/useQueries";
import { formatPrice, getVehicleImage } from "@/utils/helpers";
import { Link } from "@tanstack/react-router";
import {
  ArrowRight,
  Award,
  Battery,
  Check,
  ChevronRight,
  Gauge,
  Handshake,
  HeartHandshake,
  Loader2,
  Mail,
  MapPin,
  Phone,
  RefreshCw,
  Ruler,
  Settings,
  Star,
  Wrench,
  Zap,
} from "lucide-react";
import { useEffect, useRef, useState } from "react";
import { toast } from "sonner";

const services = [
  {
    icon: Zap,
    title: "EV Sales",
    desc: "Wide range of electric scooters & bikes from leading brands.",
  },
  {
    icon: Wrench,
    title: "Service & Maintenance",
    desc: "Battery diagnostics, controller service, upgrades & repairs.",
  },
  {
    icon: RefreshCw,
    title: "EV Conversion",
    desc: "Convert your petrol vehicle into a modern electric vehicle.",
  },
  {
    icon: Handshake,
    title: "Franchise",
    desc: "Join our growing network and build your EV business.",
  },
];

const benefits = [
  {
    icon: Award,
    title: "Multi-Brand Expertise",
    desc: "We offer multiple EV brands under one roof — more choice, better value.",
  },
  {
    icon: MapPin,
    title: "Trusted Local Network",
    desc: "Serving customers across Andhra Pradesh & Telangana with pride.",
  },
  {
    icon: Settings,
    title: "EV Conversion Specialists",
    desc: "Professional retrofitting with certified quality components.",
  },
  {
    icon: HeartHandshake,
    title: "End-to-End Support",
    desc: "From purchase to service to upgrades — we're with you every step.",
  },
];

const brandAuthority = [
  {
    title: "Multi-brand comparison assistance",
    desc: "We help you compare all brands honestly to find the best fit.",
  },
  {
    title: "Honest consultation",
    desc: "No pressure, just the right vehicle for your needs and budget.",
  },
  {
    title: "Long-term service support",
    desc: "We stay with you after the sale — service, upgrades, spares.",
  },
  {
    title: "Local trust & network",
    desc: "Rooted in Telangana, trusted by thousands across the region.",
  },
];

const franchiseBenefits = [
  "Strong supplier network with 20+ brands",
  "Comprehensive technical training support",
  "Marketing & branding assistance",
  "Attractive margins & growth potential",
];

const testimonials = [
  {
    name: "Ravi Kumar",
    city: "Kodad",
    quote:
      "Best EV showroom in Telangana. Bought my scooter here 6 months ago and the service support is excellent.",
    rating: 5,
  },
  {
    name: "Priya Reddy",
    city: "Suryapet",
    quote:
      "The team helped me compare 5 different brands honestly. No pressure at all. Happy with my purchase!",
    rating: 5,
  },
  {
    name: "Nagaraju M.",
    city: "Haliya",
    quote:
      "Got my petrol bike converted to electric. Saving ₹3,000 per month on fuel. Highly recommend JSR Electric Vehicles.",
    rating: 5,
  },
];

const faqs = [
  {
    q: "What brands of electric vehicles do you sell?",
    a: "We stock multiple brands of electric scooters and bikes, offering the widest selection in the Kodad-Suryapet region. Visit our showroom or call us at +91 9948955517 to see the full range.",
  },
  {
    q: "Do you offer test rides?",
    a: "Yes, free test rides are available at our showroom. Call +91 9948955517 or use the 'Book Free Test Ride' button to schedule yours.",
  },
  {
    q: "What is the cost of petrol to electric conversion?",
    a: "Conversion packages start from ₹25,000 for basic scooters and go up to ₹60,000 for premium motorcycle conversions. Visit our Conversions page for full pricing details.",
  },
  {
    q: "Do you provide EMI financing?",
    a: "Yes, we assist with bank financing and EMI options from leading banks. Our team will guide you through the process to make EV ownership affordable.",
  },
  {
    q: "Where are your showrooms located?",
    a: "Head Branch: Suryapet road, beside Kashinadam function hall, Kodad, Suryapet district, Telangana-508206. Branch 2: Haliya (coming soon).",
  },
  {
    q: "What warranty do you provide?",
    a: "All new vehicles come with manufacturer warranty. EV conversions carry 6-month to 2-year warranty depending on the package selected. Ask our team for details.",
  },
];

export default function HomePage() {
  const [quoteOpen, setQuoteOpen] = useState(false);
  const { data: featuredVehicles, isLoading } = useFeaturedVehicles();
  const callbackMutation = useAddCallbackRequest();
  const leadFormRef = useRef<HTMLDivElement>(null);

  const [callbackForm, setCallbackForm] = useState({
    name: "",
    phone: "",
    city: "",
    interest: "",
  });
  const [callbackSuccess, setCallbackSuccess] = useState(false);
  const [callbackLoading, setCallbackLoading] = useState(false);

  useEffect(() => {
    document.title =
      "Best Electric Scooters & EV Conversion in Telangana | JSR Electric Vehicles";
    // Set meta description
    let metaDesc = document.querySelector('meta[name="description"]');
    if (!metaDesc) {
      metaDesc = document.createElement("meta");
      (metaDesc as HTMLMetaElement).name = "description";
      document.head.appendChild(metaDesc);
    }
    (metaDesc as HTMLMetaElement).content =
      "Buy electric bikes, scooters, and convert petrol vehicles to electric. Test rides, service, franchise opportunities available. Call +91 9948955517.";
  }, []);

  const handleCallbackSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!callbackForm.phone || !callbackForm.interest) {
      toast.error("Please fill in Phone and Interest fields.");
      return;
    }
    setCallbackLoading(true);
    try {
      await callbackMutation.mutateAsync(callbackForm);
      setCallbackSuccess(true);
      toast.success("Request submitted! Redirecting to WhatsApp...");
      // Send lead details to WhatsApp +91 9948955517 (sales number)
      const msg = [
        "New Callback Request - JSR Electric Vehicles",
        callbackForm.name ? `Name: ${callbackForm.name}` : "",
        `Phone: ${callbackForm.phone}`,
        callbackForm.city ? `City: ${callbackForm.city}` : "",
        `Interested In: ${callbackForm.interest}`,
      ]
        .filter(Boolean)
        .join("\n");
      window.open(
        `https://wa.me/919948955517?text=${encodeURIComponent(msg)}`,
        "_blank",
      );
    } catch {
      toast.error("Failed to submit. Please try again.");
    } finally {
      setCallbackLoading(false);
    }
  };

  const scrollToLeadForm = () => {
    leadFormRef.current?.scrollIntoView({
      behavior: "smooth",
      block: "center",
    });
  };

  return (
    <main className="pb-16 md:pb-0">
      {/* Hero Section */}
      <section className="relative min-h-[100svh] flex items-center overflow-hidden noise-overlay">
        {/* Background image */}
        <div
          className="absolute inset-0 bg-cover bg-center bg-no-repeat scale-105"
          style={{
            backgroundImage:
              "url('/assets/generated/hero-ev-banner.dim_1600x700.jpg')",
          }}
        />
        {/* Cinematic overlay: deep vignette + green bloom */}
        <div className="hero-overlay absolute inset-0 z-[1]" />
        {/* Green edge-light accent — right side */}
        <div
          className="absolute inset-y-0 right-0 w-1/3 z-[1] pointer-events-none"
          style={{
            background:
              "radial-gradient(ellipse 80% 100% at 100% 50%, oklch(0.62 0.19 155 / 0.07) 0%, transparent 70%)",
          }}
        />

        <div className="relative z-10 container mx-auto px-4 lg:px-6 pt-24 pb-16">
          <div className="max-w-3xl">
            {/* Animated badge */}
            <div className="hero-badge-animate inline-flex items-center gap-2 mb-6 px-3 py-1.5 rounded-full border border-brand-green/30 bg-brand-green/10 backdrop-blur-sm">
              <span className="w-1.5 h-1.5 rounded-full bg-brand-green animate-pulse" />
              <span className="text-brand-green text-xs font-semibold uppercase tracking-[0.15em]">
                Telangana's #1 EV Specialist
              </span>
            </div>

            {/* Staggered headline */}
            <h1 className="font-display font-bold text-white leading-[1.05] mb-6">
              <span className="hero-title-line1 block text-3xl md:text-5xl lg:text-6xl">
                Complete Electric Mobility Solutions —
              </span>
              <span className="hero-title-line2 block text-3xl md:text-5xl lg:text-6xl">
                <span
                  className="relative inline-block"
                  style={{
                    color: "oklch(0.62 0.19 155)",
                    textShadow: "0 0 40px oklch(0.62 0.19 155 / 0.45)",
                  }}
                >
                  Sales, Service &amp; EV Conversion
                </span>{" "}
                <span className="text-white/90">Under One Roof</span>
              </span>
            </h1>

            <p className="hero-sub-animate text-lg md:text-xl text-white/70 mb-8 max-w-2xl leading-relaxed">
              Multi-Brand Electric Scooters &amp; Bikes | Petrol to Electric
              Conversion | Franchise Opportunities
            </p>

            <div className="hero-cta-animate flex flex-wrap gap-3 mb-6">
              <button
                type="button"
                onClick={scrollToLeadForm}
                className="inline-flex items-center justify-center gap-2 bg-brand-green hover:bg-brand-green/90 active:scale-95 text-white font-semibold px-7 py-3 text-base transition-all duration-200 hover:scale-[1.03] rounded-md"
                style={{
                  boxShadow:
                    "0 0 28px oklch(0.62 0.19 155 / 0.45), 0 4px 12px rgba(0,0,0,0.3)",
                }}
                data-ocid="hero.primary_button"
              >
                Book Free Test Ride <ChevronRight className="h-4 w-4" />
              </button>
              <Link to="/vehicles">
                <Button
                  size="lg"
                  variant="outline"
                  className="border-white/30 text-white hover:bg-white/10 hover:border-white/50 active:scale-95 px-7 py-3 text-base bg-white/5 backdrop-blur-sm transition-all duration-200"
                  data-ocid="hero.secondary_button"
                >
                  Get Best Price
                </Button>
              </Link>
              <Link to="/conversions">
                <Button
                  size="lg"
                  variant="outline"
                  className="border-brand-green/50 text-brand-green hover:bg-brand-green/10 hover:border-brand-green active:scale-95 px-7 py-3 text-base bg-brand-green/5 backdrop-blur-sm transition-all duration-200"
                  data-ocid="hero.convert_button"
                >
                  Convert to Electric
                </Button>
              </Link>
            </div>

            {/* Trust Strip */}
            <div className="hero-cta-animate flex flex-wrap gap-x-5 gap-y-2 mt-2 mb-6">
              {[
                "20+ Dealer Network",
                "Certified EV Technicians",
                "Dedicated Service Support",
              ].map((item) => (
                <span
                  key={item}
                  className="flex items-center gap-1.5 text-white/75 text-sm"
                >
                  <Check className="h-3.5 w-3.5 text-brand-green shrink-0" />
                  {item}
                </span>
              ))}
            </div>

            {/* Stats row */}
            <div className="hero-stats-animate flex flex-wrap gap-8 mt-10 pt-8 border-t border-white/15">
              {[
                { value: "20+", label: "Brands" },
                { value: "500+", label: "Happy Customers" },
                { value: "5+", label: "Years Experience" },
              ].map((stat) => (
                <div key={stat.label}>
                  <div
                    className="text-3xl font-black font-display"
                    style={{ color: "oklch(0.72 0.19 155)" }}
                  >
                    {stat.value}
                  </div>
                  <div className="text-white/50 text-xs uppercase tracking-wider mt-0.5">
                    {stat.label}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Scroll cue */}
        <div className="absolute bottom-8 left-1/2 -translate-x-1/2 z-10 hidden md:flex flex-col items-center gap-2">
          <div className="w-px h-10 bg-gradient-to-b from-transparent via-white/30 to-white/0" />
          <div className="text-white/30 text-[10px] uppercase tracking-[0.2em]">
            Scroll
          </div>
        </div>
      </section>

      {/* Lead Capture Form */}
      <section className="py-14 bg-brand-light-gray" ref={leadFormRef}>
        <div className="container mx-auto px-4 lg:px-6">
          <div
            className="max-w-2xl mx-auto rounded-2xl p-8"
            style={{
              background: "oklch(1 0 0)",
              boxShadow:
                "0 0 0 2px oklch(0.62 0.19 155 / 0.35), 0 20px 50px rgba(0,0,0,0.12)",
            }}
          >
            <div className="text-center mb-6">
              <div className="inline-flex items-center gap-2 mb-3 px-3 py-1 rounded-full bg-brand-green/10 border border-brand-green/25">
                <span className="w-2 h-2 rounded-full bg-brand-green animate-pulse" />
                <span className="text-brand-green text-xs font-semibold uppercase tracking-wider">
                  Our EV Expert Will Call You Shortly
                </span>
              </div>
              <h2 className="text-2xl md:text-3xl font-display font-bold text-foreground">
                Get a Callback in 10 Minutes
              </h2>
            </div>

            {callbackSuccess ? (
              <div
                className="text-center py-8"
                data-ocid="lead_capture.success_state"
              >
                <div className="w-16 h-16 rounded-full bg-brand-green/10 flex items-center justify-center mx-auto mb-4">
                  <Check className="h-8 w-8 text-brand-green" />
                </div>
                <p className="text-foreground font-semibold text-lg mb-2">
                  Thank you for contacting JSR Electric Vehicles.
                </p>
                <p className="text-muted-foreground">
                  Our EV Expert will reach you shortly.
                </p>
                <Button
                  onClick={() => {
                    setCallbackSuccess(false);
                    setCallbackForm({
                      name: "",
                      phone: "",
                      city: "",
                      interest: "",
                    });
                  }}
                  variant="outline"
                  className="mt-4 border-brand-green text-brand-green hover:bg-brand-green/10"
                >
                  Submit Another Request
                </Button>
              </div>
            ) : (
              <form onSubmit={handleCallbackSubmit} className="space-y-4">
                <div className="grid sm:grid-cols-2 gap-4">
                  <div className="space-y-1.5">
                    <Label htmlFor="cb-name">Full Name</Label>
                    <Input
                      id="cb-name"
                      placeholder="Your name"
                      value={callbackForm.name}
                      onChange={(e) =>
                        setCallbackForm((p) => ({
                          ...p,
                          name: e.target.value,
                        }))
                      }
                      data-ocid="lead_capture.name_input"
                    />
                  </div>
                  <div className="space-y-1.5">
                    <Label htmlFor="cb-phone">
                      Phone <span className="text-destructive">*</span>
                    </Label>
                    <Input
                      id="cb-phone"
                      type="tel"
                      placeholder="+91 XXXXX XXXXX"
                      value={callbackForm.phone}
                      onChange={(e) =>
                        setCallbackForm((p) => ({
                          ...p,
                          phone: e.target.value,
                        }))
                      }
                      required
                      data-ocid="lead_capture.phone_input"
                    />
                  </div>
                </div>
                <div className="grid sm:grid-cols-2 gap-4">
                  <div className="space-y-1.5">
                    <Label htmlFor="cb-city">City</Label>
                    <Input
                      id="cb-city"
                      placeholder="Your city"
                      value={callbackForm.city}
                      onChange={(e) =>
                        setCallbackForm((p) => ({
                          ...p,
                          city: e.target.value,
                        }))
                      }
                      data-ocid="lead_capture.city_input"
                    />
                  </div>
                  <div className="space-y-1.5">
                    <Label htmlFor="cb-interest">
                      Interested In <span className="text-destructive">*</span>
                    </Label>
                    <Select
                      value={callbackForm.interest}
                      onValueChange={(v) =>
                        setCallbackForm((p) => ({ ...p, interest: v }))
                      }
                      required
                    >
                      <SelectTrigger
                        id="cb-interest"
                        data-ocid="lead_capture.interest_select"
                      >
                        <SelectValue placeholder="Select interest" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="Buy EV">Buy EV</SelectItem>
                        <SelectItem value="Convert Vehicle">
                          Convert Vehicle
                        </SelectItem>
                        <SelectItem value="Franchise">Franchise</SelectItem>
                        <SelectItem value="Service">Service</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>
                <Button
                  type="submit"
                  disabled={callbackLoading}
                  className="w-full bg-brand-green hover:bg-brand-green/90 text-white font-bold text-base py-6 transition-all"
                  style={{
                    boxShadow: "0 0 20px oklch(0.62 0.19 155 / 0.3)",
                  }}
                  data-ocid="lead_capture.submit_button"
                >
                  {callbackLoading ? (
                    <>
                      <Loader2 className="h-5 w-5 mr-2 animate-spin" />
                      Submitting...
                    </>
                  ) : (
                    "Request Callback in 10 Minutes"
                  )}
                </Button>
              </form>
            )}
          </div>
        </div>
      </section>

      {/* Services Overview */}
      <section className="py-20 bg-background">
        <div className="container mx-auto px-4 lg:px-6">
          <div className="text-center mb-12">
            <Badge className="mb-3 bg-brand-green/10 text-brand-green border-brand-green/20 text-xs uppercase tracking-widest">
              What We Do
            </Badge>
            <h2 className="text-3xl md:text-4xl font-display font-bold text-foreground mb-3">
              Powering the Green Revolution
            </h2>
            <p className="text-muted-foreground max-w-xl mx-auto">
              Complete electric vehicle solutions under one roof — from sales to
              service to conversion.
            </p>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {services.map((svc) => {
              const Icon = svc.icon;
              return (
                <div
                  key={svc.title}
                  className="bg-card border border-border rounded-2xl p-6 hover:border-brand-green/40 hover:shadow-green-glow-sm transition-all duration-300 group"
                >
                  <div className="w-12 h-12 rounded-xl bg-brand-green/10 flex items-center justify-center mb-4 group-hover:bg-brand-green/20 transition-colors">
                    <Icon className="h-6 w-6 text-brand-green" />
                  </div>
                  <h3 className="font-semibold text-foreground mb-2">
                    {svc.title}
                  </h3>
                  <p className="text-muted-foreground text-sm leading-relaxed">
                    {svc.desc}
                  </p>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Featured Vehicles */}
      <section className="py-20 bg-brand-light-gray">
        <div className="container mx-auto px-4 lg:px-6">
          <div className="flex items-end justify-between mb-10">
            <div>
              <Badge className="mb-3 bg-brand-green/10 text-brand-green border-brand-green/20 text-xs uppercase tracking-widest">
                Featured Models
              </Badge>
              <h2 className="text-3xl md:text-4xl font-display font-bold text-foreground">
                Top Electric Vehicles
              </h2>
            </div>
            <Link
              to="/vehicles"
              className="hidden md:flex items-center gap-1 text-brand-green hover:text-brand-green/80 font-medium text-sm transition-colors"
              data-ocid="featured_vehicles.link"
            >
              View All <ArrowRight className="h-4 w-4" />
            </Link>
          </div>

          {isLoading ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {[1, 2, 3].map((i) => (
                <div
                  key={i}
                  className="rounded-2xl overflow-hidden border border-border"
                >
                  <Skeleton className="h-48 w-full" />
                  <div className="p-5 space-y-3">
                    <Skeleton className="h-5 w-2/3" />
                    <Skeleton className="h-4 w-1/2" />
                    <Skeleton className="h-4 w-3/4" />
                    <Skeleton className="h-9 w-full" />
                  </div>
                </div>
              ))}
            </div>
          ) : featuredVehicles && featuredVehicles.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {featuredVehicles.slice(0, 6).map((vehicle) => (
                <article
                  key={vehicle.id.toString()}
                  className="bg-card border border-border rounded-2xl overflow-hidden hover:border-brand-green/50 transition-all duration-300 group"
                  style={{ boxShadow: "0 2px 8px rgba(0,0,0,0.06)" }}
                  onMouseEnter={(e) => {
                    (e.currentTarget as HTMLElement).style.boxShadow =
                      "0 8px 32px rgba(0,0,0,0.12), 0 0 0 1px oklch(0.62 0.19 155 / 0.3)";
                    (e.currentTarget as HTMLElement).style.transform =
                      "translateY(-2px)";
                  }}
                  onMouseLeave={(e) => {
                    (e.currentTarget as HTMLElement).style.boxShadow =
                      "0 2px 8px rgba(0,0,0,0.06)";
                    (e.currentTarget as HTMLElement).style.transform =
                      "translateY(0)";
                  }}
                >
                  {/* Image with gradient bleed into card body */}
                  <div className="relative overflow-hidden h-52">
                    <img
                      src={getVehicleImage(vehicle.id, vehicle.brand)}
                      alt={vehicle.name}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
                    />
                    {/* Category pill */}
                    <div className="absolute top-3 left-3 flex gap-2">
                      <span className="px-2.5 py-1 rounded-full text-xs font-semibold bg-brand-green/90 text-white backdrop-blur-sm">
                        {vehicle.category}
                      </span>
                    </div>
                    {/* Gradient bleed: image fades into card background */}
                    <div className="absolute bottom-0 left-0 right-0 h-16 bg-gradient-to-t from-card to-transparent" />
                  </div>

                  <div className="px-5 pb-5 -mt-1">
                    <h3 className="font-bold text-foreground text-base leading-tight">
                      {vehicle.name}
                    </h3>
                    <p className="text-muted-foreground text-xs mt-0.5 mb-4 font-medium uppercase tracking-wide">
                      {vehicle.brand}
                    </p>

                    {/* Spec chips — pill background, not bare icons */}
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

                    {/* Price + CTA — clear hierarchy */}
                    <div className="flex items-center justify-between pt-3 border-t border-border">
                      <div>
                        <div className="text-[10px] text-muted-foreground uppercase tracking-wider">
                          From
                        </div>
                        <div
                          className="font-black text-xl font-display"
                          style={{ color: "oklch(0.62 0.19 155)" }}
                        >
                          {formatPrice(vehicle.price_min)}
                        </div>
                      </div>
                      <Link
                        to="/vehicles/$id"
                        params={{ id: vehicle.id.toString() }}
                      >
                        <Button
                          size="sm"
                          className="bg-brand-green hover:bg-brand-green/90 active:scale-95 text-white text-xs font-semibold px-4 transition-all duration-150"
                          style={{
                            boxShadow: "0 0 12px oklch(0.62 0.19 155 / 0.3)",
                          }}
                        >
                          View Details →
                        </Button>
                      </Link>
                    </div>
                  </div>
                </article>
              ))}
            </div>
          ) : (
            <div className="flex items-center justify-center py-12">
              <Loader2 className="h-8 w-8 animate-spin text-brand-green" />
            </div>
          )}

          <div className="text-center mt-8 md:hidden">
            <Link to="/vehicles">
              <Button
                variant="outline"
                className="border-brand-green text-brand-green hover:bg-brand-green/10"
                data-ocid="featured_vehicles.view_all_button"
              >
                View All Vehicles <ArrowRight className="h-4 w-4 ml-1" />
              </Button>
            </Link>
          </div>
        </div>
      </section>

      {/* Why Choose Us */}
      <section className="py-20 section-gradient">
        <div className="container mx-auto px-4 lg:px-6">
          <div className="text-center mb-12">
            <Badge className="mb-3 bg-brand-green/20 text-brand-green border-brand-green/30 text-xs uppercase tracking-widest">
              Why JSR Electric Vehicles
            </Badge>
            <h2 className="text-3xl md:text-4xl font-display font-bold text-white mb-3">
              Why Choose Us?
            </h2>
            <p className="text-white/60 max-w-xl mx-auto">
              We're not just an EV dealership — we're your complete electric
              mobility partner.
            </p>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {benefits.map((benefit) => {
              const Icon = benefit.icon;
              return (
                <div
                  key={benefit.title}
                  className="p-6 rounded-2xl bg-white/5 border border-white/10 hover:bg-white/8 hover:border-brand-green/30 transition-all duration-300"
                >
                  <div className="w-12 h-12 rounded-xl bg-brand-green/15 flex items-center justify-center mb-4">
                    <Icon className="h-6 w-6 text-brand-green" />
                  </div>
                  <h3 className="font-semibold text-white mb-2">
                    {benefit.title}
                  </h3>
                  <p className="text-white/55 text-sm leading-relaxed">
                    {benefit.desc}
                  </p>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Brand Authority Block */}
      <section className="py-20 bg-background">
        <div className="container mx-auto px-4 lg:px-6">
          <div className="text-center mb-12">
            <Badge className="mb-3 bg-brand-green/10 text-brand-green border-brand-green/20 text-xs uppercase tracking-widest">
              Our Difference
            </Badge>
            <h2 className="text-3xl md:text-4xl font-display font-bold text-foreground mb-3">
              Why JSR Electric Vehicles?
            </h2>
            <p className="text-muted-foreground max-w-2xl mx-auto text-lg font-medium">
              We Are Not Just a Dealer.{" "}
              <span className="text-brand-green">
                We Are Electric Mobility Specialists.
              </span>
            </p>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-5 max-w-3xl mx-auto">
            {brandAuthority.map((item) => (
              <div
                key={item.title}
                className="flex gap-4 p-5 rounded-2xl bg-card border border-border hover:border-brand-green/40 transition-all duration-300"
              >
                <div className="w-8 h-8 rounded-full bg-brand-green flex items-center justify-center shrink-0 mt-0.5">
                  <Check className="h-4 w-4 text-white" />
                </div>
                <div>
                  <h3 className="font-semibold text-foreground mb-1">
                    {item.title}
                  </h3>
                  <p className="text-muted-foreground text-sm leading-relaxed">
                    {item.desc}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Showroom Gallery */}
      <section className="py-20 bg-brand-light-gray">
        <div className="container mx-auto px-4 lg:px-6">
          <div className="text-center mb-10">
            <Badge className="mb-3 bg-brand-green/10 text-brand-green border-brand-green/20 text-xs uppercase tracking-widest">
              Our Showrooms
            </Badge>
            <h2 className="text-3xl md:text-4xl font-display font-bold text-foreground">
              Visit Us at Kodad
            </h2>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
            <div className="relative overflow-hidden rounded-2xl shadow-card-hover group">
              <img
                src="/assets/uploads/ChatGPT-Image-Feb-9-2026-06_33_19-PM-6.png"
                alt="JSR Electric Vehicles showroom exterior at Kodad"
                className="w-full h-64 md:h-72 object-cover group-hover:scale-105 transition-transform duration-700"
                loading="lazy"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-brand-dark/70 via-transparent to-transparent" />
              <div className="absolute bottom-4 left-4">
                <span className="text-white font-semibold text-sm bg-brand-green/90 px-3 py-1 rounded-full">
                  Showroom Exterior
                </span>
              </div>
            </div>
            <div className="flex flex-col gap-5">
              <div className="relative overflow-hidden rounded-2xl shadow-card-hover group flex-1">
                <img
                  src="/assets/uploads/Gemini_Generated_Image_nutgscnutgscnutg-5.png"
                  alt="JSR Electric Vehicles showroom interior with multiple electric scooters"
                  className="w-full h-full object-cover min-h-[140px] group-hover:scale-105 transition-transform duration-700"
                  loading="lazy"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-brand-dark/60 via-transparent to-transparent" />
                <div className="absolute bottom-4 left-4">
                  <span className="text-white font-semibold text-sm bg-brand-green/90 px-3 py-1 rounded-full">
                    Showroom Interior
                  </span>
                </div>
              </div>
              <div className="relative overflow-hidden rounded-2xl bg-brand-dark flex items-center justify-center p-6 group flex-1">
                <div className="text-center">
                  <img
                    src="/assets/uploads/dynamo-lima-light-green-electric-scooter-500x500-removebg-preview-3.png"
                    alt="Featured electric scooter at JSR Electric Vehicles"
                    className="h-28 w-auto object-contain mx-auto mb-3 group-hover:scale-105 transition-transform duration-500"
                    loading="lazy"
                  />
                  <p className="text-brand-green font-semibold text-sm">
                    Latest Models In-Store
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Testimonials */}
      <section className="py-20 bg-background">
        <div className="container mx-auto px-4 lg:px-6">
          <div className="text-center mb-12">
            <Badge className="mb-3 bg-brand-green/10 text-brand-green border-brand-green/20 text-xs uppercase tracking-widest">
              Customer Stories
            </Badge>
            <h2 className="text-3xl md:text-4xl font-display font-bold text-foreground">
              What Our Customers Say
            </h2>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {testimonials.map((t, idx) => (
              <div
                key={t.name}
                className="bg-card border-l-4 border-brand-green rounded-2xl p-6 shadow-xs hover:shadow-green-glow-sm transition-all duration-300"
                data-ocid={`testimonials.item.${idx + 1}`}
              >
                <div className="flex gap-0.5 mb-4">
                  {Array.from({ length: t.rating }, (_, i) => (
                    <Star
                      // biome-ignore lint/suspicious/noArrayIndexKey: fixed-length star array
                      key={`star-${i}`}
                      className="h-4 w-4 text-brand-green fill-brand-green"
                    />
                  ))}
                </div>
                <p className="text-foreground text-sm leading-relaxed mb-5 italic">
                  "{t.quote}"
                </p>
                <div className="flex items-center gap-3">
                  <div className="w-9 h-9 rounded-full bg-brand-green/15 flex items-center justify-center text-brand-green font-bold text-sm">
                    {t.name.charAt(0)}
                  </div>
                  <div>
                    <div className="font-semibold text-foreground text-sm">
                      {t.name}
                    </div>
                    <div className="text-muted-foreground text-xs">
                      {t.city}
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* FAQ Section */}
      <section className="py-20 bg-brand-light-gray">
        <div className="container mx-auto px-4 lg:px-6">
          <div className="max-w-3xl mx-auto">
            <div className="text-center mb-10">
              <Badge className="mb-3 bg-brand-green/10 text-brand-green border-brand-green/20 text-xs uppercase tracking-widest">
                FAQs
              </Badge>
              <h2 className="text-3xl md:text-4xl font-display font-bold text-foreground">
                Frequently Asked Questions
              </h2>
            </div>
            <Accordion type="single" collapsible className="space-y-3">
              {faqs.map((faq) => (
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

      {/* Conversion Promo */}
      <section className="py-20 green-gradient relative overflow-hidden">
        <div className="absolute inset-0 opacity-20">
          <div className="absolute top-10 right-10 w-64 h-64 rounded-full bg-brand-green blur-3xl" />
          <div className="absolute bottom-10 left-10 w-48 h-48 rounded-full bg-brand-green blur-3xl" />
        </div>
        <div className="relative z-10 container mx-auto px-4 lg:px-6 text-center">
          <Badge className="mb-4 bg-white/10 text-white border-white/20 text-xs uppercase tracking-widest">
            EV Conversion
          </Badge>
          <h2 className="text-3xl md:text-5xl font-display font-bold text-white mb-4">
            Still Riding Petrol?
          </h2>
          <p className="text-2xl md:text-3xl text-brand-green font-bold mb-4">
            Switch to Electric & Save Up to 70%
          </p>
          <p className="text-white/70 max-w-2xl mx-auto mb-8 text-lg">
            Convert your existing scooter or bike with certified EV kits. Enjoy
            low maintenance, zero fuel cost, and eco-friendly rides across
            Telangana.
          </p>
          <Link to="/conversions">
            <Button
              size="lg"
              className="bg-white text-brand-dark hover:bg-white/90 font-bold px-10 py-3 text-base shadow-lg"
              data-ocid="conversion_promo.primary_button"
            >
              Start Conversion Today <ArrowRight className="h-4 w-4 ml-2" />
            </Button>
          </Link>
        </div>
      </section>

      {/* Franchise Strip */}
      <section className="py-20 bg-background">
        <div className="container mx-auto px-4 lg:px-6">
          <div className="grid md:grid-cols-2 gap-12 items-center">
            <div>
              <Badge className="mb-3 bg-brand-green/10 text-brand-green border-brand-green/20 text-xs uppercase tracking-widest">
                Franchise Opportunity
              </Badge>
              <h2 className="text-3xl md:text-4xl font-display font-bold text-foreground mb-4">
                Partner With Us
              </h2>
              <p className="text-muted-foreground mb-6 leading-relaxed">
                Become a JSR Electric Vehicles franchise partner and be part of
                India's fastest-growing EV movement. Build a successful business
                with our proven model.
              </p>
              <ul className="space-y-3 mb-8">
                {franchiseBenefits.map((benefit) => (
                  <li
                    key={benefit}
                    className="flex items-center gap-3 text-sm text-foreground"
                  >
                    <div className="w-5 h-5 rounded-full bg-brand-green/15 flex items-center justify-center shrink-0">
                      <ChevronRight className="h-3 w-3 text-brand-green" />
                    </div>
                    {benefit}
                  </li>
                ))}
              </ul>
              <Link to="/franchise">
                <Button
                  className="bg-brand-green hover:bg-brand-green/90 text-white font-semibold px-8"
                  data-ocid="franchise.apply_button"
                >
                  Apply for Franchise <ArrowRight className="h-4 w-4 ml-2" />
                </Button>
              </Link>
            </div>
            <div className="relative">
              <img
                src="/assets/uploads/Gemini_Generated_Image_nutgscnutgscnutg-5.png"
                alt="JSR Electric Vehicles Franchise Showroom Interior"
                className="rounded-2xl object-cover w-full h-72 shadow-card-hover"
              />
              <div className="absolute -bottom-4 -left-4 bg-brand-green text-white rounded-xl p-4 shadow-lg">
                <div className="text-2xl font-bold">20+</div>
                <div className="text-sm opacity-90">Dealer Network</div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Contact Strip */}
      <section className="py-16 bg-brand-green">
        <div className="container mx-auto px-4 lg:px-6">
          <div className="flex flex-col md:flex-row items-center justify-between gap-6">
            <div>
              <h2 className="text-2xl md:text-3xl font-display font-bold text-white mb-2">
                Ready to Go Electric?
              </h2>
              <div className="flex flex-col sm:flex-row gap-4 text-white/80 text-sm">
                <span className="flex items-center gap-2">
                  <MapPin className="h-4 w-4" /> Kodad, Suryapet, Telangana
                </span>
                <a
                  href="tel:+919948955517"
                  className="flex items-center gap-2 hover:text-white transition-colors"
                >
                  <Phone className="h-4 w-4" /> +91 9948955517
                </a>
                <a
                  href="mailto:jsrgreenmotors5399@gmail.com"
                  className="flex items-center gap-2 hover:text-white transition-colors"
                >
                  <Mail className="h-4 w-4" /> jsrgreenmotors5399@gmail.com
                </a>
              </div>
            </div>
            <div className="flex flex-wrap gap-3">
              <button
                type="button"
                onClick={scrollToLeadForm}
                className="inline-flex items-center justify-center gap-2 bg-white text-brand-green hover:bg-white/90 font-bold px-6 py-3 rounded-md transition-all"
                data-ocid="contact_strip.book_button"
              >
                Book a Test Ride
              </button>
              <Link to="/contact">
                <Button
                  size="lg"
                  variant="outline"
                  className="border-white/50 text-white hover:bg-white/10 bg-transparent"
                  data-ocid="contact_strip.contact_button"
                >
                  Contact Us
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Mobile Sticky Action Bar */}
      <div
        className="fixed bottom-0 left-0 right-0 z-50 md:hidden bg-brand-dark border-t border-white/20 flex"
        style={{ height: "60px" }}
      >
        <a
          href="tel:+919948955517"
          className="flex-1 flex flex-col items-center justify-center gap-0.5 text-white hover:bg-white/5 transition-colors"
          data-ocid="mobile_bar.call_button"
        >
          <Phone className="h-5 w-5 text-brand-green" />
          <span className="text-[10px] font-medium">Call Now</span>
        </a>
        <a
          href="https://wa.me/919948955517?text=Hello%20JSR%20Electric%20Vehicles%2C%20I%20am%20interested%20in%20your%20electric%20vehicles."
          target="_blank"
          rel="noopener noreferrer"
          className="flex-1 flex flex-col items-center justify-center gap-0.5 text-white hover:bg-white/5 transition-colors border-x border-white/10"
          data-ocid="mobile_bar.whatsapp_button"
        >
          <svg
            className="h-5 w-5 text-brand-green"
            viewBox="0 0 24 24"
            fill="currentColor"
            aria-hidden="true"
          >
            <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413Z" />
          </svg>
          <span className="text-[10px] font-medium">WhatsApp</span>
        </a>
        <button
          type="button"
          onClick={scrollToLeadForm}
          className="flex-1 flex flex-col items-center justify-center gap-0.5 text-white hover:bg-white/5 transition-colors"
          data-ocid="mobile_bar.book_button"
        >
          <svg
            className="h-5 w-5 text-brand-green"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
            strokeWidth={2}
            aria-hidden="true"
          >
            <rect x="3" y="4" width="18" height="18" rx="2" ry="2" />
            <line x1="16" y1="2" x2="16" y2="6" />
            <line x1="8" y1="2" x2="8" y2="6" />
            <line x1="3" y1="10" x2="21" y2="10" />
          </svg>
          <span className="text-[10px] font-medium">Book Test Ride</span>
        </button>
      </div>

      <QuoteModal open={quoteOpen} onClose={() => setQuoteOpen(false)} />
    </main>
  );
}

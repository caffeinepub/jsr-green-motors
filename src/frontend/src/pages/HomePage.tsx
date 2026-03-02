import QuoteModal from "@/components/QuoteModal";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Skeleton } from "@/components/ui/skeleton";
import { useFeaturedVehicles } from "@/hooks/useQueries";
import { formatPrice, getVehicleImage } from "@/utils/helpers";
import { Link } from "@tanstack/react-router";
import {
  ArrowRight,
  Award,
  Battery,
  ChevronRight,
  Gauge,
  Handshake,
  HeartHandshake,
  Loader2,
  Mail,
  MapPin,
  RefreshCw,
  Ruler,
  Settings,
  Wrench,
  Zap,
} from "lucide-react";
import { useEffect, useState } from "react";

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

const franchiseBenefits = [
  "Strong supplier network with 20+ brands",
  "Comprehensive technical training support",
  "Marketing & branding assistance",
  "Attractive margins & growth potential",
];

export default function HomePage() {
  const [quoteOpen, setQuoteOpen] = useState(false);
  const { data: featuredVehicles, isLoading } = useFeaturedVehicles();

  useEffect(() => {
    document.title = "JSR Green Motors — Drive the Future, Go Electric";
  }, []);

  return (
    <main>
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
                Andhra Pradesh's #1 EV Dealer
              </span>
            </div>

            {/* Staggered headline */}
            <h1 className="font-display font-bold text-white leading-[1.05] mb-6">
              <span className="hero-title-line1 block text-4xl md:text-6xl lg:text-7xl">
                Leading Electric
              </span>
              <span className="hero-title-line2 block text-4xl md:text-6xl lg:text-7xl">
                <span
                  className="relative inline-block"
                  style={{
                    color: "oklch(0.62 0.19 155)",
                    textShadow: "0 0 40px oklch(0.62 0.19 155 / 0.45)",
                  }}
                >
                  Vehicle Sales
                </span>{" "}
                <span className="text-white/90">&amp; Services</span>
              </span>
            </h1>

            <p className="hero-sub-animate text-lg md:text-xl text-white/70 mb-8 max-w-2xl leading-relaxed">
              Your trusted multi-brand EV showroom &amp; conversion experts in
              Andhra Pradesh &amp; Telangana. Explore India's finest electric
              vehicles.
            </p>

            <div className="hero-cta-animate flex flex-wrap gap-3">
              <Link to="/vehicles">
                <Button
                  size="lg"
                  className="bg-brand-green hover:bg-brand-green/90 active:scale-95 text-white font-semibold px-8 py-3 text-base transition-all duration-200 hover:scale-[1.03]"
                  style={{
                    boxShadow:
                      "0 0 28px oklch(0.62 0.19 155 / 0.45), 0 4px 12px rgba(0,0,0,0.3)",
                  }}
                >
                  Explore Vehicles <ChevronRight className="h-4 w-4 ml-1" />
                </Button>
              </Link>
              <Link to="/contact">
                <Button
                  size="lg"
                  variant="outline"
                  className="border-white/30 text-white hover:bg-white/10 hover:border-white/50 active:scale-95 px-8 py-3 text-base bg-white/5 backdrop-blur-sm transition-all duration-200"
                >
                  Contact Us
                </Button>
              </Link>
            </div>

            {/* Stats row */}
            <div className="hero-stats-animate flex flex-wrap gap-8 mt-12 pt-8 border-t border-white/15">
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

      {/* Services Overview */}
      <section className="py-20 bg-brand-light-gray">
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
      <section className="py-20 bg-background">
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
                      src={getVehicleImage(vehicle.id)}
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
              Why JSR Green Motors
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
            Andhra Pradesh.
          </p>
          <Link to="/conversions">
            <Button
              size="lg"
              className="bg-white text-brand-dark hover:bg-white/90 font-bold px-10 py-3 text-base shadow-lg"
            >
              Start Conversion Today <ArrowRight className="h-4 w-4 ml-2" />
            </Button>
          </Link>
        </div>
      </section>

      {/* Franchise Strip */}
      <section className="py-20 bg-brand-light-gray">
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
                Become a JSR Green Motors franchise partner and be part of
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
                <Button className="bg-brand-green hover:bg-brand-green/90 text-white font-semibold px-8">
                  Apply for Franchise <ArrowRight className="h-4 w-4 ml-2" />
                </Button>
              </Link>
            </div>
            <div className="relative">
              <img
                src="/assets/generated/franchise-showroom.dim_800x500.jpg"
                alt="JSR Green Motors Franchise Showroom"
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
                  <MapPin className="h-4 w-4" /> Andhra Pradesh & Telangana
                </span>
                <span className="flex items-center gap-2">
                  <span>📞</span> +91-XXXXXXXXXX
                </span>
                <span className="flex items-center gap-2">
                  <Mail className="h-4 w-4" /> info@jsrgreenmotors.com
                </span>
              </div>
            </div>
            <div className="flex flex-wrap gap-3">
              <Button
                onClick={() => setQuoteOpen(true)}
                size="lg"
                className="bg-white text-brand-green hover:bg-white/90 font-bold"
              >
                Book a Test Ride
              </Button>
              <Link to="/contact">
                <Button
                  size="lg"
                  variant="outline"
                  className="border-white/50 text-white hover:bg-white/10 bg-transparent"
                >
                  Contact Us
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </section>

      <QuoteModal open={quoteOpen} onClose={() => setQuoteOpen(false)} />
    </main>
  );
}

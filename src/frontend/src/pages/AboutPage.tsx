import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Link } from "@tanstack/react-router";
import {
  ArrowRight,
  Battery,
  CheckCircle2,
  Cpu,
  Globe,
  GraduationCap,
  Handshake,
  Leaf,
  Lightbulb,
  Quote,
  Settings,
  Target,
  TrendingUp,
  Users,
  Wrench,
  Zap,
} from "lucide-react";
import { useEffect } from "react";

// ─── Gold palette constants (royal aesthetic) ─────────────────────────────────
const G = {
  primary: "oklch(0.72 0.09 80)", // #C9A84C antique gold
  bright: "oklch(0.82 0.12 80)", // #F0C040 rich gold
  dim: "oklch(0.52 0.09 70)", // #8B6914 bronze
  shimmer: "oklch(0.92 0.10 88)", // #FFE57A champagne
  bg: "oklch(0.07 0.005 70)", // #0a0804 void dark
  bgAlt: "oklch(0.08 0.004 70)", // #0F0D08 section alt
  card: "oklch(0.09 0.005 70)", // #12100A card bg
  cream: "oklch(0.95 0.02 85)", // #F5EDD8 cream text
  muted: "oklch(0.62 0.02 80)", // #9C8B6E muted text
  border: "rgba(201,168,76,0.25)", // gold border tint
  borderHover: "rgba(201,168,76,0.5)",
};

const goldGlow = (size: "sm" | "md" | "lg" = "md") =>
  ({
    sm: "0 0 16px rgba(201,168,76,0.18)",
    md: "0 0 28px rgba(201,168,76,0.22), 0 4px 20px rgba(0,0,0,0.5)",
    lg: "0 8px 50px rgba(201,168,76,0.18), 0 0 0 1px rgba(201,168,76,0.12), 0 20px 60px rgba(0,0,0,0.6)",
  })[size];

const timelineItems = [
  {
    year: "2022",
    title: "Foundation",
    desc: "JSR Electric Vehicles was founded in Kodad, Telangana with a vision to make electric mobility accessible and affordable across the region.",
  },
  {
    year: "2022",
    title: "First Showroom",
    desc: "Opened our first multi-brand EV showroom in Kodad, featuring top EV brands from across India.",
  },
  {
    year: "2023",
    title: "Service Launch",
    desc: "Launched a dedicated EV service center with certified technicians specialising in battery systems and electric powertrains.",
  },
  {
    year: "2023",
    title: "Conversion Services",
    desc: "Introduced petrol-to-electric conversion services, becoming one of the first EV conversion specialists in Telangana.",
  },
  {
    year: "2024",
    title: "Haliya Branch",
    desc: "Expanded operations with a new branch in Haliya, Nalgonda District, growing our service footprint across the region.",
  },
  {
    year: "2025",
    title: "Growing Network",
    desc: "20+ EV brands, 4 branches, 20+ dealer network — driving the electric mobility revolution across Telangana.",
  },
  {
    year: "2026",
    title: "Expanding to 30+ Dealer Network",
    desc: "Scaling our dealer network beyond 30 locations across Telangana and Andhra Pradesh, with new franchise partners joining every quarter.",
  },
];

const products = [
  {
    icon: Zap,
    title: "Electric Scooters",
    desc: "A curated range of electric scooters from leading brands for everyday city commuting — economical, reliable, and eco-friendly.",
    link: "/vehicles",
  },
  {
    icon: TrendingUp,
    title: "Electric Motorcycles",
    desc: "Performance-oriented electric motorcycles for riders who want the thrill of the road without the cost of petrol.",
    link: "/vehicles",
  },
  {
    icon: Globe,
    title: "Electric Three-Wheelers",
    desc: "Passenger and cargo electric three-wheelers designed for last-mile connectivity and commercial use.",
    link: "/vehicles",
  },
  {
    icon: Battery,
    title: "EV Components",
    desc: "Batteries, controllers, chargers, and electrical parts for vehicle maintenance and EV system integration.",
    link: "/services",
  },
];

const services = [
  "Vehicle diagnostics & health checks",
  "Battery maintenance & cell balancing",
  "Controller inspection & repair",
  "Motor servicing & powertrain support",
  "Spare parts supply & installation",
  "Petrol-to-electric conversion",
];

const serviceIcons = [
  {
    icon: Wrench,
    label: "Certified Technicians",
    desc: "Factory-trained EV specialists on every job",
  },
  {
    icon: Battery,
    label: "Battery Specialists",
    desc: "Cell-level diagnostics & balancing service",
  },
  {
    icon: Cpu,
    label: "Controller Experts",
    desc: "Motor controller repair & firmware updates",
  },
  {
    icon: Leaf,
    label: "Eco-Friendly Service",
    desc: "Zero-waste practices in every service bay",
  },
];

const futurePlans = [
  "New electric vehicle models across categories",
  "Expanded dealership network across Telangana & Andhra Pradesh",
  "R&D in electric mobility technology",
  "Advanced battery and EV conversion solutions",
  "Integrated EV charging infrastructure",
  "Customer mobile app for service & booking",
];

const stats = [
  { value: "8+", label: "EV Brands" },
  { value: "1100+", label: "Happy Customers" },
  { value: "5+", label: "Years Experience" },
  { value: "20+", label: "Dealer Network" },
];

const dealerCities = [
  "Kodad",
  "Haliya",
  "Suryapet",
  "Munagala",
  "Khammam",
  "Nalgonda",
  "Miryalaguda",
  "Nagarjunasagar",
  "Warangal",
  "Hyderabad",
  "Vijayawada",
  "Macherla",
  "Huzurnagar",
  "Bhongir",
  "Yadagirigutta",
];

const sustainabilityPoints = [
  {
    icon: Leaf,
    title: "Reduced Emissions",
    stat: "500+ petrol vehicles converted",
    desc: "Every EV we sell contributes to a cleaner environment and reduced carbon footprint.",
  },
  {
    icon: TrendingUp,
    title: "Lower Running Costs",
    stat: "Up to 70% fuel savings",
    desc: "Electric vehicles save customers dramatically on fuel and maintenance costs.",
  },
  {
    icon: Globe,
    title: "National Impact",
    stat: "4+ districts covered",
    desc: "Contributing to India's EV adoption goals through regional dealership expansion.",
  },
  {
    icon: Zap,
    title: "Clean Energy Future",
    stat: "100% electric vehicle lineup",
    desc: "Our entire product portfolio is electric — no compromise on sustainability.",
  },
];

// Ornamental divider component
function GoldDivider({ text }: { text?: string }) {
  return (
    <div
      className="flex items-center justify-center gap-3 my-2"
      aria-hidden="true"
    >
      <div
        style={{
          flex: 1,
          height: 1,
          background: `linear-gradient(to right, transparent, ${G.primary})`,
        }}
      />
      <span
        style={{
          color: G.primary,
          fontSize: "1.1rem",
          letterSpacing: "0.15em",
        }}
      >
        {text ?? "✦"}
      </span>
      <div
        style={{
          flex: 1,
          height: 1,
          background: `linear-gradient(to left, transparent, ${G.primary})`,
        }}
      />
    </div>
  );
}

// Section badge in gold
function GoldBadge({ children }: { children: React.ReactNode }) {
  return (
    <Badge
      style={{
        background: "rgba(201,168,76,0.12)",
        color: G.primary,
        border: "1px solid rgba(201,168,76,0.3)",
        fontSize: "0.65rem",
        letterSpacing: "0.12em",
        textTransform: "uppercase",
      }}
    >
      {children}
    </Badge>
  );
}

export default function AboutPage() {
  useEffect(() => {
    document.title = "About Us | JSR Electric Vehicles";
    let metaDesc = document.querySelector('meta[name="description"]');
    if (!metaDesc) {
      metaDesc = document.createElement("meta");
      (metaDesc as HTMLMetaElement).name = "description";
      document.head.appendChild(metaDesc);
    }
    (metaDesc as HTMLMetaElement).content =
      "JSR Electric Vehicles is a multi-brand EV dealership and distribution network in Telangana, India. Founded by Janardhan Reddy Pasham with a vision for sustainable electric mobility.";

    // Scroll-triggered reveal animations
    const observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (entry.isIntersecting) {
            entry.target.classList.add("is-visible");
          }
        }
      },
      { threshold: 0.08, rootMargin: "0px 0px -40px 0px" },
    );
    for (const el of document.querySelectorAll(".reveal-on-scroll")) {
      observer.observe(el);
    }
    return () => observer.disconnect();
  }, []);

  return (
    <main className="pt-20" style={{ background: G.bg, color: G.cream }}>
      {/* ══════════════════════════════════════════════════════════
          HERO — Dark royal banner with golden glow
      ══════════════════════════════════════════════════════════ */}
      <section
        className="relative py-28 overflow-hidden"
        style={{
          background: `linear-gradient(135deg, ${G.bg} 0%, oklch(0.10 0.01 72) 50%, ${G.bg} 100%)`,
        }}
      >
        {/* Showroom photo at very low opacity */}
        <div
          className="absolute inset-0 bg-cover bg-center bg-no-repeat"
          style={{
            backgroundImage:
              "url('/assets/uploads/ChatGPT-Image-Feb-9-2026-06_33_19-PM-6.png')",
            opacity: 0.07,
          }}
        />
        {/* Dark overlay */}
        <div
          className="absolute inset-0"
          style={{
            background:
              "linear-gradient(to bottom, rgba(10,8,4,0.75) 0%, rgba(10,8,4,0.4) 50%, rgba(10,8,4,0.85) 100%)",
          }}
        />
        {/* Golden central radial glow */}
        <div
          className="absolute inset-0 pointer-events-none"
          style={{
            background:
              "radial-gradient(ellipse 70% 60% at 50% 50%, rgba(201,168,76,0.08) 0%, transparent 70%)",
          }}
        />
        {/* Subtle gold edge vignette */}
        <div
          className="absolute inset-0 pointer-events-none"
          style={{
            background:
              "radial-gradient(ellipse 90% 80% at 50% 0%, rgba(201,168,76,0.04) 0%, transparent 60%)",
          }}
        />

        <div className="relative z-10 container mx-auto px-4 lg:px-6 text-center">
          <div className="mb-5 reveal-on-scroll">
            <GoldBadge>Our Story</GoldBadge>
          </div>

          <div className="flex items-center justify-center gap-5 mb-6 reveal-on-scroll">
            {/* Gold halo behind logo */}
            <div className="relative">
              <div
                className="absolute inset-0 rounded-full blur-xl"
                style={{
                  background: "rgba(201,168,76,0.25)",
                  transform: "scale(1.6)",
                }}
                aria-hidden="true"
              />
              <img
                src="/assets/uploads/JSR_LOGO-2.png"
                alt="JSR"
                className="relative w-14 h-14 object-contain opacity-95"
              />
            </div>
            <h1
              className="text-4xl md:text-5xl lg:text-6xl font-display font-bold"
              style={{ color: G.cream }}
            >
              About{" "}
              <span style={{ color: G.primary }}>JSR Electric Vehicles</span>
            </h1>
          </div>

          <p
            className="text-xl max-w-3xl mx-auto leading-relaxed mb-8 reveal-on-scroll"
            style={{ color: G.muted }}
          >
            We are more than a dealership. We are an electric mobility company
            building a sustainable transportation ecosystem across Telangana —
            one vehicle at a time.
          </p>

          {/* Ornamental gold divider */}
          <div className="max-w-md mx-auto reveal-on-scroll">
            <GoldDivider text="── ✦ ──" />
          </div>
        </div>
      </section>

      {/* ══════════════════════════════════════════════════════════
          STATS BAR — Gold numbers on dark gradient
      ══════════════════════════════════════════════════════════ */}
      <section
        className="py-10 reveal-on-scroll"
        style={{
          background: `linear-gradient(90deg, ${G.bg} 0%, oklch(0.11 0.009 75) 50%, ${G.bg} 100%)`,
          borderTop: "1px solid rgba(201,168,76,0.15)",
          borderBottom: "1px solid rgba(201,168,76,0.15)",
        }}
      >
        <div className="container mx-auto px-4 lg:px-6">
          <div className="flex flex-wrap justify-center" style={{ gap: 0 }}>
            {stats.map((stat, i) => (
              <div
                key={stat.label}
                className="flex flex-col items-center px-8 py-4"
                style={{
                  borderRight:
                    i < stats.length - 1
                      ? "1px solid rgba(201,168,76,0.2)"
                      : undefined,
                }}
              >
                <div
                  className="text-3xl md:text-4xl font-black font-display"
                  style={{ color: G.bright }}
                >
                  {stat.value}
                </div>
                <div
                  className="text-xs uppercase tracking-widest mt-1"
                  style={{ color: G.muted }}
                >
                  {stat.label}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ══════════════════════════════════════════════════════════
          COMPANY OVERVIEW
      ══════════════════════════════════════════════════════════ */}
      <section className="py-20" style={{ background: G.bg }}>
        <div className="container mx-auto px-4 lg:px-6">
          <div className="grid md:grid-cols-2 gap-12 items-center reveal-on-scroll">
            <div>
              <div className="mb-3">
                <GoldBadge>Company Overview</GoldBadge>
              </div>
              <h2
                className="text-3xl md:text-4xl font-display font-bold mb-6"
                style={{ color: G.cream }}
              >
                Electric Mobility for Every Road
              </h2>
              <p
                className="mb-4 leading-relaxed text-base"
                style={{ color: G.muted }}
              >
                JSR Electric Vehicles is an electric mobility company focused on
                promoting sustainable transportation solutions in India. The
                company operates as a multi-brand electric vehicle dealership
                and distribution network providing electric two-wheelers,
                electric three-wheelers, and EV components.
              </p>
              <p
                className="leading-relaxed text-base"
                style={{ color: G.muted }}
              >
                Through a growing network of dealers and service partners, we
                aim to make electric mobility accessible, affordable, and
                reliable for customers in cities, towns, and developing markets
                across Telangana. By combining distribution, service capability,
                and technical support, JSR Electric Vehicles contributes to the
                development of a reliable electric vehicle ecosystem.
              </p>
            </div>
            {/* JSR logo / brand graphic */}
            <div className="flex items-center justify-center">
              <div
                className="rounded-2xl p-10 flex items-center justify-center"
                style={{
                  background: `linear-gradient(135deg, ${G.card} 0%, oklch(0.12 0.008 75) 100%)`,
                  border: "1px solid rgba(201,168,76,0.25)",
                  boxShadow: goldGlow("lg"),
                }}
              >
                <img
                  src="/assets/uploads/JSR_LOGO-2.png"
                  alt="JSR Electric Vehicles"
                  className="h-32 w-auto object-contain"
                  style={{
                    filter: "drop-shadow(0 0 20px rgba(201,168,76,0.3))",
                  }}
                />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ══════════════════════════════════════════════════════════
          MISSION & VISION — side by side with gold vertical divider
      ══════════════════════════════════════════════════════════ */}
      <section
        className="py-20 reveal-on-scroll"
        style={{ background: G.bgAlt }}
      >
        <div className="container mx-auto px-4 lg:px-6">
          <div className="text-center mb-12">
            <GoldBadge>Purpose</GoldBadge>
            <h2
              className="text-3xl md:text-4xl font-display font-bold mt-3"
              style={{ color: G.cream }}
            >
              Our Mission &amp; Vision
            </h2>
          </div>
          <div className="max-w-4xl mx-auto">
            <div
              className="rounded-2xl overflow-hidden"
              style={{
                border: "1px solid rgba(201,168,76,0.2)",
                boxShadow: goldGlow("md"),
              }}
            >
              <div
                className="grid md:grid-cols-2 divide-y md:divide-y-0 md:divide-x"
                style={{ borderColor: "rgba(201,168,76,0.15)" }}
              >
                {/* Mission */}
                <div
                  className="p-8 transition-colors"
                  style={{ background: G.card }}
                  onMouseEnter={(e) => {
                    (e.currentTarget as HTMLElement).style.background =
                      "oklch(0.11 0.006 75)";
                  }}
                  onMouseLeave={(e) => {
                    (e.currentTarget as HTMLElement).style.background = G.card;
                  }}
                >
                  <div
                    className="w-12 h-12 rounded-xl flex items-center justify-center mb-5"
                    style={{ background: "rgba(201,168,76,0.12)" }}
                  >
                    <Target style={{ color: G.primary }} className="h-6 w-6" />
                  </div>
                  <h3
                    className="text-xl font-bold mb-3"
                    style={{ color: G.cream }}
                  >
                    Our Mission
                  </h3>
                  <p
                    className="leading-relaxed text-base"
                    style={{ color: G.muted }}
                  >
                    To promote eco-friendly transportation by making electric
                    vehicles accessible and affordable while building a strong
                    dealer network, providing reliable service support, and
                    contributing to the development of the electric mobility
                    ecosystem.
                  </p>
                </div>
                {/* Vision */}
                <div
                  className="p-8 transition-colors"
                  style={{ background: G.card }}
                  onMouseEnter={(e) => {
                    (e.currentTarget as HTMLElement).style.background =
                      "oklch(0.11 0.006 75)";
                  }}
                  onMouseLeave={(e) => {
                    (e.currentTarget as HTMLElement).style.background = G.card;
                  }}
                >
                  <div
                    className="w-12 h-12 rounded-xl flex items-center justify-center mb-5"
                    style={{ background: "rgba(201,168,76,0.12)" }}
                  >
                    <Lightbulb
                      style={{ color: G.primary }}
                      className="h-6 w-6"
                    />
                  </div>
                  <h3
                    className="text-xl font-bold mb-3"
                    style={{ color: G.cream }}
                  >
                    Our Vision
                  </h3>
                  <p
                    className="leading-relaxed text-base"
                    style={{ color: G.muted }}
                  >
                    To become a trusted electric mobility brand with a strong
                    network of EV dealerships, service centers, and sustainable
                    transportation solutions across India.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ══════════════════════════════════════════════════════════
          FOUNDER SECTION — Royal gold regal card
      ══════════════════════════════════════════════════════════ */}
      <section className="py-20" style={{ background: G.bg }}>
        <div className="container mx-auto px-4 lg:px-6">
          <div className="text-center mb-12">
            <GoldBadge>Leadership</GoldBadge>
            <h2
              className="text-3xl md:text-4xl font-display font-bold mt-3"
              style={{ color: G.cream }}
            >
              Meet the Founder
            </h2>
          </div>
          <div className="max-w-3xl mx-auto reveal-on-scroll">
            <div
              className="rounded-2xl p-8"
              style={{
                background: `linear-gradient(135deg, ${G.card} 0%, oklch(0.11 0.008 75) 100%)`,
                border: "1px solid rgba(201,168,76,0.3)",
                boxShadow:
                  "0 8px 40px rgba(201,168,76,0.08), 0 0 0 1px rgba(201,168,76,0.1), 0 20px 60px rgba(0,0,0,0.6)",
              }}
            >
              {/* Top ornament */}
              <div className="text-center mb-6">
                <GoldDivider text="✦" />
              </div>

              <div className="flex flex-col sm:flex-row gap-6 items-center sm:items-start mb-8">
                {/* Founder Photo */}
                <div
                  className="w-36 h-36 sm:w-48 sm:h-48 rounded-2xl shrink-0 overflow-hidden"
                  style={{
                    border: "2px solid rgba(201,168,76,0.4)",
                    boxShadow: "0 0 30px rgba(201,168,76,0.15)",
                  }}
                >
                  <img
                    src="/assets/PJR%20PHOTO.png"
                    alt="Janardhan Reddy Pasham - Founder JSR Electric Vehicles"
                    className="w-full h-full object-cover object-top"
                    onError={(e) => {
                      (e.target as HTMLImageElement).src =
                        "/assets/uploads/JSR_LOGO-2.png";
                    }}
                  />
                </div>
                <div className="text-center sm:text-left">
                  <h3
                    className="text-2xl font-bold mb-1"
                    style={{ color: G.cream }}
                  >
                    Janardhan Reddy Pasham
                  </h3>
                  <Badge
                    style={{
                      background: "rgba(201,168,76,0.15)",
                      color: G.primary,
                      border: "1px solid rgba(201,168,76,0.3)",
                      fontSize: "0.65rem",
                      marginBottom: "0.75rem",
                    }}
                  >
                    Founder &amp; Director
                  </Badge>
                  <p
                    className="text-base mt-3 leading-relaxed"
                    style={{ color: G.muted }}
                  >
                    An entrepreneur with a strong vision for sustainable
                    transportation and electric mobility in India. Recognizing
                    the rapid shift toward electric vehicles and the need for
                    reliable EV infrastructure, he established JSR Electric
                    Vehicles to support the growth of electric mobility through
                    vehicle distribution, dealership development, and service
                    support.
                  </p>
                  <p
                    className="text-base mt-2 leading-relaxed"
                    style={{ color: G.muted }}
                  >
                    Under his leadership, the company focuses on building strong
                    partnerships with manufacturers, dealers, and service
                    providers to expand access to electric vehicles across
                    Telangana and beyond.
                  </p>
                </div>
              </div>

              {/* Founder Quote — royal ornate treatment */}
              <div
                className="rounded-xl p-8 relative"
                style={{
                  background: "rgba(10,8,4,0.7)",
                  border: "1px solid rgba(201,168,76,0.18)",
                  boxShadow: "inset 0 1px 0 rgba(201,168,76,0.1)",
                }}
              >
                {/* Large ornate gold quotation mark */}
                <Quote
                  className="absolute -top-5 left-6 h-16 w-16"
                  aria-hidden="true"
                  style={{
                    color: "rgba(201,168,76,0.35)",
                    transform: "scaleX(-1)",
                  }}
                />
                <p
                  className="text-lg md:text-xl leading-relaxed italic pt-6"
                  style={{
                    color: "rgba(245,237,216,0.85)",
                    fontFamily: "Georgia, 'Times New Roman', serif",
                  }}
                >
                  "Electric mobility represents an important step toward a
                  cleaner and more sustainable future. At JSR Electric Vehicles,
                  our objective is to make electric vehicles accessible and
                  practical for everyday use. By building strong partnerships
                  with manufacturers and dealer networks, we aim to create a
                  reliable ecosystem that supports customers, businesses, and
                  communities in adopting electric transportation solutions."
                </p>
                <div className="mt-6 flex items-center gap-3">
                  <div
                    className="w-10 h-px"
                    style={{
                      background: `linear-gradient(to right, ${G.primary}, transparent)`,
                    }}
                  />
                  <span
                    className="text-sm font-semibold"
                    style={{ color: G.primary }}
                  >
                    Janardhan Reddy Pasham, Founder &amp; Director
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ══════════════════════════════════════════════════════════
          PRODUCTS & SOLUTIONS — 2x2 grid
      ══════════════════════════════════════════════════════════ */}
      <section className="py-20" style={{ background: G.bgAlt }}>
        <div className="container mx-auto px-4 lg:px-6">
          <div className="text-center mb-12 reveal-on-scroll">
            <GoldBadge>What We Offer</GoldBadge>
            <h2
              className="text-3xl md:text-4xl font-display font-bold mb-3 mt-3"
              style={{ color: G.cream }}
            >
              Products &amp; Solutions
            </h2>
            <p
              className="max-w-xl mx-auto text-base"
              style={{ color: G.muted }}
            >
              A complete range of electric mobility products designed for
              personal and commercial use.
            </p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-4xl mx-auto">
            {products.map((product, i) => {
              const Icon = product.icon;
              return (
                <div
                  key={product.title}
                  className="reveal-on-scroll rounded-2xl p-6 transition-all duration-300 group"
                  style={{
                    background: G.card,
                    border: "1px solid rgba(201,168,76,0.2)",
                    animationDelay: `${i * 0.08}s`,
                  }}
                  onMouseEnter={(e) => {
                    (e.currentTarget as HTMLElement).style.border =
                      "1px solid rgba(201,168,76,0.45)";
                    (e.currentTarget as HTMLElement).style.boxShadow =
                      "0 0 24px rgba(201,168,76,0.15), 0 8px 30px rgba(0,0,0,0.4)";
                    (e.currentTarget as HTMLElement).style.transform =
                      "translateY(-3px)";
                  }}
                  onMouseLeave={(e) => {
                    (e.currentTarget as HTMLElement).style.border =
                      "1px solid rgba(201,168,76,0.2)";
                    (e.currentTarget as HTMLElement).style.boxShadow = "none";
                    (e.currentTarget as HTMLElement).style.transform =
                      "translateY(0)";
                  }}
                >
                  <div
                    className="w-12 h-12 rounded-xl flex items-center justify-center mb-4 transition-colors"
                    style={{ background: "rgba(201,168,76,0.12)" }}
                  >
                    <Icon style={{ color: G.primary }} className="h-6 w-6" />
                  </div>
                  <h3
                    className="font-semibold mb-2 text-base"
                    style={{ color: G.cream }}
                  >
                    {product.title}
                  </h3>
                  <p
                    className="text-sm leading-relaxed mb-4"
                    style={{ color: G.muted }}
                  >
                    {product.desc}
                  </p>
                  <Link
                    to={product.link}
                    className="inline-flex items-center gap-1 text-sm font-semibold hover:gap-2 transition-all"
                    style={{ color: G.primary }}
                    data-ocid={`about.product_${i + 1}_link`}
                  >
                    Learn More <ArrowRight className="h-3.5 w-3.5" />
                  </Link>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Thin gold section separator */}
      <div
        style={{
          height: 1,
          background:
            "linear-gradient(to right, transparent, rgba(201,168,76,0.3), transparent)",
        }}
      />

      {/* ══════════════════════════════════════════════════════════
          AFTER-SALES SUPPORT
      ══════════════════════════════════════════════════════════ */}
      <section className="py-20" style={{ background: G.bg }}>
        <div className="container mx-auto px-4 lg:px-6">
          <div className="grid md:grid-cols-2 gap-12 items-start max-w-5xl mx-auto reveal-on-scroll">
            <div>
              <div className="mb-3">
                <GoldBadge>Service &amp; Maintenance</GoldBadge>
              </div>
              <h2
                className="text-3xl md:text-4xl font-display font-bold mb-4"
                style={{ color: G.cream }}
              >
                After-Sales Support You Can Rely On
              </h2>
              <p
                className="mb-6 leading-relaxed text-base"
                style={{ color: G.muted }}
              >
                Reliable service support is a critical part of the electric
                vehicle ecosystem. JSR Electric Vehicles ensures that
                technicians and service partners are trained in EV systems to
                maintain consistent service quality.
              </p>
              <ul className="space-y-3">
                {services.map((service) => (
                  <li
                    key={service}
                    className="flex items-center gap-3 text-sm"
                    style={{ color: G.cream }}
                  >
                    <div
                      className="w-5 h-5 rounded-full flex items-center justify-center shrink-0"
                      style={{ background: "rgba(201,168,76,0.15)" }}
                    >
                      <CheckCircle2
                        style={{ color: G.primary }}
                        className="h-3 w-3"
                      />
                    </div>
                    {service}
                  </li>
                ))}
              </ul>
            </div>
            {/* Enlarged service icon tiles with descriptions */}
            <div className="grid grid-cols-2 gap-4">
              {serviceIcons.map((item, i) => {
                const Icon = item.icon;
                return (
                  <div
                    key={item.label}
                    className="reveal-on-scroll rounded-2xl p-6 text-center transition-all duration-300"
                    style={{
                      background: G.card,
                      border: "1px solid rgba(201,168,76,0.2)",
                      animationDelay: `${i * 0.08}s`,
                    }}
                    onMouseEnter={(e) => {
                      (e.currentTarget as HTMLElement).style.border =
                        "1px solid rgba(201,168,76,0.45)";
                      (e.currentTarget as HTMLElement).style.boxShadow =
                        "0 0 24px rgba(201,168,76,0.15)";
                    }}
                    onMouseLeave={(e) => {
                      (e.currentTarget as HTMLElement).style.border =
                        "1px solid rgba(201,168,76,0.2)";
                      (e.currentTarget as HTMLElement).style.boxShadow = "none";
                    }}
                  >
                    <div
                      className="w-16 h-16 rounded-2xl flex items-center justify-center mx-auto mb-4 transition-colors"
                      style={{ background: "rgba(201,168,76,0.12)" }}
                    >
                      <Icon style={{ color: G.primary }} className="h-8 w-8" />
                    </div>
                    <div
                      className="text-sm font-bold mb-1"
                      style={{ color: G.cream }}
                    >
                      {item.label}
                    </div>
                    <div
                      className="text-xs leading-snug"
                      style={{ color: G.muted }}
                    >
                      {item.desc}
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      </section>

      {/* Thin gold section separator */}
      <div
        style={{
          height: 1,
          background:
            "linear-gradient(to right, transparent, rgba(201,168,76,0.3), transparent)",
        }}
      />

      {/* ══════════════════════════════════════════════════════════
          TIMELINE — Our Journey
      ══════════════════════════════════════════════════════════ */}
      <section className="py-20" style={{ background: G.bgAlt }}>
        <div className="container mx-auto px-4 lg:px-6">
          <div className="text-center mb-12 reveal-on-scroll">
            <GoldBadge>Company History</GoldBadge>
            <h2
              className="text-3xl md:text-4xl font-display font-bold mb-3 mt-3"
              style={{ color: G.cream }}
            >
              Our Journey
            </h2>
            <p
              className="max-w-xl mx-auto text-base"
              style={{ color: G.muted }}
            >
              From a single showroom in Kodad to a growing EV network — our
              story of impact and growth.
            </p>
          </div>
          <div className="relative max-w-3xl mx-auto">
            {/* Timeline spine in gold */}
            <div
              className="absolute left-6 md:left-1/2 top-0 bottom-0 w-px -translate-x-px"
              style={{ background: "rgba(201,168,76,0.25)" }}
            />
            {timelineItems.map((item, i) => (
              <div
                key={`${item.year}-${item.title}`}
                className={`reveal-on-scroll relative flex gap-6 mb-8 ${
                  i % 2 === 0 ? "md:flex-row" : "md:flex-row-reverse"
                }`}
                style={{ animationDelay: `${i * 0.1}s` }}
              >
                <div
                  className={`flex-1 ${
                    i % 2 === 0
                      ? "md:text-right md:pr-8"
                      : "md:text-left md:pl-8"
                  } pl-14 md:pl-0`}
                >
                  <div
                    className="rounded-xl p-5 transition-colors"
                    style={{
                      background: G.card,
                      border: "1px solid rgba(201,168,76,0.18)",
                    }}
                    onMouseEnter={(e) => {
                      (e.currentTarget as HTMLElement).style.border =
                        "1px solid rgba(201,168,76,0.4)";
                      (e.currentTarget as HTMLElement).style.boxShadow =
                        "0 0 20px rgba(201,168,76,0.12)";
                    }}
                    onMouseLeave={(e) => {
                      (e.currentTarget as HTMLElement).style.border =
                        "1px solid rgba(201,168,76,0.18)";
                      (e.currentTarget as HTMLElement).style.boxShadow = "none";
                    }}
                  >
                    {/* Large bold year */}
                    <span
                      className="text-2xl font-black font-display"
                      style={{ color: G.bright }}
                    >
                      {item.year}
                    </span>
                    <h3
                      className="font-semibold mt-1 mb-2 text-base"
                      style={{ color: G.cream }}
                    >
                      {item.title}
                    </h3>
                    <p
                      className="text-sm leading-relaxed"
                      style={{ color: G.muted }}
                    >
                      {item.desc}
                    </p>
                  </div>
                </div>
                {/* Gold filled timeline dot */}
                <div
                  className="absolute left-4 md:left-1/2 top-5 w-5 h-5 rounded-full -translate-x-2.5 md:-translate-x-2.5 shadow"
                  style={{
                    background: G.primary,
                    border: `2px solid ${G.bg}`,
                    boxShadow: "0 0 10px rgba(201,168,76,0.5)",
                  }}
                />
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ══════════════════════════════════════════════════════════
          DEALER & FRANCHISE NETWORK — City pills in gold
      ══════════════════════════════════════════════════════════ */}
      <section className="py-16" style={{ background: G.bg }}>
        <div className="container mx-auto px-4 lg:px-6">
          <div className="max-w-4xl mx-auto reveal-on-scroll">
            <div className="text-center mb-8">
              <GoldBadge>Partner Network</GoldBadge>
              <h2
                className="text-3xl md:text-4xl font-display font-bold mb-4 mt-3"
                style={{ color: G.cream }}
              >
                Dealer &amp; Franchise Network
              </h2>
              <p
                className="mb-4 leading-relaxed max-w-xl mx-auto text-base"
                style={{ color: G.muted }}
              >
                Entrepreneurs and businesses can partner with JSR Electric
                Vehicles to establish EV dealerships under our growing network.
                Partners receive product supply, brand support, sales
                assistance, and technical training.
              </p>
            </div>
            {/* Gold city pill tags */}
            <div className="mb-8">
              <p
                className="text-center text-sm mb-4 uppercase tracking-widest font-semibold"
                style={{ color: G.dim }}
              >
                Coverage Areas
              </p>
              <div className="flex flex-wrap justify-center gap-2">
                {dealerCities.map((city) => (
                  <span
                    key={city}
                    className="px-3 py-1.5 rounded-full text-sm font-medium transition-colors"
                    style={{
                      background: "rgba(201,168,76,0.08)",
                      border: "1px solid rgba(201,168,76,0.3)",
                      color: G.primary,
                    }}
                  >
                    {city}
                  </span>
                ))}
                <span
                  className="px-3 py-1.5 rounded-full text-sm font-medium"
                  style={{
                    background: "rgba(201,168,76,0.05)",
                    border: "1px solid rgba(201,168,76,0.15)",
                    color: G.muted,
                  }}
                >
                  + more expanding
                </span>
              </div>
            </div>
            <div className="text-center">
              <Link to="/franchise" data-ocid="about.franchise_button">
                <Button
                  className="font-semibold px-8"
                  style={{
                    background: G.primary,
                    color: "#0a0804",
                    border: "none",
                  }}
                  onMouseEnter={(e) => {
                    (e.currentTarget as HTMLElement).style.background =
                      G.bright;
                  }}
                  onMouseLeave={(e) => {
                    (e.currentTarget as HTMLElement).style.background =
                      G.primary;
                  }}
                >
                  Explore Franchise Opportunity{" "}
                  <ArrowRight className="h-4 w-4 ml-2" />
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Thin gold section separator */}
      <div
        style={{
          height: 1,
          background:
            "linear-gradient(to right, transparent, rgba(201,168,76,0.3), transparent)",
        }}
      />

      {/* ══════════════════════════════════════════════════════════
          FUTURE PLANS — Dark tiles with gold left accent
      ══════════════════════════════════════════════════════════ */}
      <section className="py-20" style={{ background: G.bgAlt }}>
        <div className="container mx-auto px-4 lg:px-6">
          <div className="text-center mb-12 reveal-on-scroll">
            <GoldBadge>What&apos;s Next</GoldBadge>
            <h2
              className="text-3xl md:text-4xl font-display font-bold mb-3 mt-3"
              style={{ color: G.cream }}
            >
              Future Plans
            </h2>
            <p
              className="max-w-xl mx-auto text-base"
              style={{ color: G.muted }}
            >
              We are building for the long term — growing our footprint, our
              products, and our technology.
            </p>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 max-w-4xl mx-auto">
            {futurePlans.map((plan, i) => (
              <div
                key={plan}
                className="reveal-on-scroll flex items-start gap-3 p-5 rounded-xl transition-all duration-300"
                style={{
                  background: "oklch(0.075 0.004 70)",
                  border: "1px solid rgba(201,168,76,0.15)",
                  borderLeft: "3px solid rgba(201,168,76,0.5)",
                  animationDelay: `${i * 0.07}s`,
                }}
                onMouseEnter={(e) => {
                  (e.currentTarget as HTMLElement).style.border =
                    "1px solid rgba(201,168,76,0.35)";
                  (e.currentTarget as HTMLElement).style.borderLeft =
                    `3px solid ${G.primary}`;
                  (e.currentTarget as HTMLElement).style.transform =
                    "translateY(-2px)";
                  (e.currentTarget as HTMLElement).style.boxShadow =
                    "0 4px 20px rgba(0,0,0,0.4), 0 0 16px rgba(201,168,76,0.1)";
                  (e.currentTarget as HTMLElement).style.background =
                    "oklch(0.10 0.006 73)";
                }}
                onMouseLeave={(e) => {
                  (e.currentTarget as HTMLElement).style.border =
                    "1px solid rgba(201,168,76,0.15)";
                  (e.currentTarget as HTMLElement).style.borderLeft =
                    "3px solid rgba(201,168,76,0.5)";
                  (e.currentTarget as HTMLElement).style.transform =
                    "translateY(0)";
                  (e.currentTarget as HTMLElement).style.boxShadow = "none";
                  (e.currentTarget as HTMLElement).style.background =
                    "oklch(0.075 0.004 70)";
                }}
              >
                <div
                  className="w-6 h-6 rounded-full flex items-center justify-center shrink-0 mt-0.5"
                  style={{ background: "rgba(201,168,76,0.15)" }}
                >
                  <CheckCircle2
                    style={{ color: G.primary }}
                    className="h-3.5 w-3.5"
                  />
                </div>
                <p
                  className="text-sm leading-relaxed font-medium"
                  style={{ color: G.cream }}
                >
                  {plan}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ══════════════════════════════════════════════════════════
          SUSTAINABILITY — 2x2 grid with gold icons
      ══════════════════════════════════════════════════════════ */}
      <section className="py-20" style={{ background: G.bg }}>
        <div className="container mx-auto px-4 lg:px-6">
          <div className="grid md:grid-cols-2 gap-12 items-start max-w-5xl mx-auto">
            <div className="reveal-on-scroll">
              <GoldBadge>Our Commitment</GoldBadge>
              <h2
                className="text-3xl md:text-4xl font-display font-bold mb-4 mt-3"
                style={{ color: G.cream }}
              >
                Committed to Sustainable Mobility
              </h2>
              <p
                className="mb-4 leading-relaxed text-base"
                style={{ color: G.muted }}
              >
                Electric vehicles help reduce carbon emissions, decrease
                dependence on fossil fuels, and lower transportation costs for
                everyday users. JSR Electric Vehicles supports this transition
                by promoting environmentally responsible mobility solutions.
              </p>
              <p
                className="leading-relaxed text-base"
                style={{ color: G.muted }}
              >
                We are building infrastructure and partnerships that support the
                long-term growth of electric vehicles — from our showrooms to
                our service centers, franchise network, and EV conversion
                workshops.
              </p>
            </div>
            {/* 2x2 sustainability grid */}
            <div className="grid grid-cols-2 gap-4">
              {sustainabilityPoints.map((item, i) => {
                const Icon = item.icon;
                return (
                  <div
                    key={item.title}
                    className="reveal-on-scroll rounded-2xl p-5 transition-all duration-300"
                    style={{
                      background: G.card,
                      border: "1px solid rgba(201,168,76,0.2)",
                      animationDelay: `${i * 0.08}s`,
                    }}
                    onMouseEnter={(e) => {
                      (e.currentTarget as HTMLElement).style.border =
                        "1px solid rgba(201,168,76,0.45)";
                      (e.currentTarget as HTMLElement).style.boxShadow =
                        "0 0 24px rgba(201,168,76,0.15)";
                    }}
                    onMouseLeave={(e) => {
                      (e.currentTarget as HTMLElement).style.border =
                        "1px solid rgba(201,168,76,0.2)";
                      (e.currentTarget as HTMLElement).style.boxShadow = "none";
                    }}
                  >
                    {/* Gold sustainability icon */}
                    <div
                      className="w-14 h-14 rounded-xl flex items-center justify-center mb-4 transition-colors"
                      style={{ background: "rgba(201,168,76,0.12)" }}
                    >
                      <Icon style={{ color: G.primary }} className="h-7 w-7" />
                    </div>
                    <h3
                      className="font-bold mb-1 text-sm"
                      style={{ color: G.cream }}
                    >
                      {item.title}
                    </h3>
                    {/* Gold stat line */}
                    <div
                      className="text-xs font-semibold mb-2"
                      style={{ color: G.primary }}
                    >
                      {item.stat}
                    </div>
                    <p
                      className="text-xs leading-relaxed"
                      style={{ color: G.muted }}
                    >
                      {item.desc}
                    </p>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      </section>

      {/* Thin gold section separator */}
      <div
        style={{
          height: 1,
          background:
            "linear-gradient(to right, transparent, rgba(201,168,76,0.4), transparent)",
        }}
      />

      {/* ══════════════════════════════════════════════════════════
          VISION CLOSING — Royal gold closing statement
      ══════════════════════════════════════════════════════════ */}
      <section
        className="py-24 reveal-on-scroll"
        style={{
          background:
            "linear-gradient(135deg, oklch(0.06 0.004 70) 0%, oklch(0.10 0.009 75) 50%, oklch(0.06 0.004 70) 100%)",
          position: "relative",
          overflow: "hidden",
        }}
      >
        {/* Large gold radial glow for atmosphere */}
        <div
          className="absolute inset-0 pointer-events-none"
          style={{
            background:
              "radial-gradient(ellipse 60% 70% at 50% 50%, rgba(201,168,76,0.06) 0%, transparent 70%)",
          }}
        />
        <div className="relative z-10 container mx-auto px-4 lg:px-6 text-center max-w-4xl">
          <GoldBadge>Our Vision</GoldBadge>

          <div className="my-6">
            <GoldDivider text="── ✦ ──" />
          </div>

          <h2
            className="text-3xl md:text-5xl font-display font-bold mb-6"
            style={{ color: G.cream }}
          >
            Building a Trusted{" "}
            <span style={{ color: G.primary }}>Electric Mobility Network</span>{" "}
            Across India
          </h2>
          <p
            className="text-lg leading-relaxed max-w-3xl mx-auto mb-10"
            style={{ color: G.muted }}
          >
            To become a trusted electric mobility brand with a strong network of
            EV dealerships, service centers, and sustainable transportation
            solutions — making clean electric transport the norm across India,
            one community at a time.
          </p>

          <div className="flex flex-wrap justify-center gap-4">
            <Link to="/vehicles" data-ocid="about.vehicles_button">
              <Button
                className="font-semibold px-8"
                style={{
                  background: G.primary,
                  color: "#0a0804",
                  border: "none",
                }}
                onMouseEnter={(e) => {
                  (e.currentTarget as HTMLElement).style.background = G.bright;
                }}
                onMouseLeave={(e) => {
                  (e.currentTarget as HTMLElement).style.background = G.primary;
                }}
              >
                Explore Our Vehicles <ArrowRight className="h-4 w-4 ml-2" />
              </Button>
            </Link>
            <Link to="/contact" data-ocid="about.contact_button">
              <Button
                variant="outline"
                className="px-8"
                style={{
                  background: "transparent",
                  border: "1px solid rgba(201,168,76,0.45)",
                  color: G.primary,
                }}
                onMouseEnter={(e) => {
                  (e.currentTarget as HTMLElement).style.background =
                    "rgba(201,168,76,0.1)";
                  (e.currentTarget as HTMLElement).style.border =
                    "1px solid rgba(201,168,76,0.7)";
                }}
                onMouseLeave={(e) => {
                  (e.currentTarget as HTMLElement).style.background =
                    "transparent";
                  (e.currentTarget as HTMLElement).style.border =
                    "1px solid rgba(201,168,76,0.45)";
                }}
              >
                Contact Us
              </Button>
            </Link>
          </div>

          <div className="mt-10">
            <GoldDivider text="✦" />
          </div>
        </div>
      </section>
    </main>
  );
}

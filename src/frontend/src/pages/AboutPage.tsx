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
  { value: "20+", label: "EV Brands" },
  { value: "500+", label: "Happy Customers" },
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
    <main className="pt-20">
      {/* Hero — dark banner with showroom photo as subtle bg */}
      <section
        className="relative py-24 overflow-hidden"
        style={{
          background: "oklch(0.08 0.01 145)",
        }}
      >
        {/* Showroom photo at low opacity */}
        <div
          className="absolute inset-0 bg-cover bg-center bg-no-repeat"
          style={{
            backgroundImage:
              "url('/assets/uploads/ChatGPT-Image-Feb-9-2026-06_33_19-PM-6.png')",
            opacity: 0.12,
          }}
        />
        {/* Dark overlay */}
        <div
          className="absolute inset-0"
          style={{
            background:
              "linear-gradient(to bottom, oklch(0.06 0.01 145 / 0.7) 0%, oklch(0.1 0.02 155 / 0.5) 50%, oklch(0.08 0.01 145 / 0.8) 100%)",
          }}
        />
        {/* Green edge accent */}
        <div
          className="absolute inset-0 pointer-events-none"
          style={{
            background:
              "radial-gradient(ellipse 60% 80% at 0% 50%, oklch(0.62 0.19 155 / 0.06) 0%, transparent 70%)",
          }}
        />
        <div className="relative z-10 container mx-auto px-4 lg:px-6 text-center">
          <Badge className="mb-4 bg-brand-green/20 text-brand-green border-brand-green/30 text-xs uppercase tracking-widest reveal-on-scroll">
            Our Story
          </Badge>
          <div className="flex items-center justify-center gap-4 mb-6 reveal-on-scroll">
            <img
              src="/assets/uploads/JSR_LOGO-2.png"
              alt="JSR"
              className="w-14 h-14 object-contain opacity-90"
            />
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-display font-bold text-white">
              About JSR Electric Vehicles
            </h1>
          </div>
          <p className="text-white/65 text-xl max-w-3xl mx-auto leading-relaxed reveal-on-scroll">
            We are more than a dealership. We are an electric mobility company
            building a sustainable transportation ecosystem across Telangana —
            one vehicle at a time.
          </p>
        </div>
      </section>

      {/* Stats Bar — horizontal row with dividers */}
      <section
        className="py-10 reveal-on-scroll"
        style={{
          background:
            "linear-gradient(135deg, oklch(0.12 0.01 145) 0%, oklch(0.16 0.04 155) 100%)",
        }}
      >
        <div className="container mx-auto px-4 lg:px-6">
          <div className="flex flex-wrap justify-center divide-x divide-white/10">
            {stats.map((stat, i) => (
              <div
                key={stat.label}
                className={`flex flex-col items-center px-8 py-4 ${
                  i === 0 ? "" : ""
                }`}
              >
                <div
                  className="text-3xl md:text-4xl font-black font-display"
                  style={{ color: "oklch(0.72 0.19 155)" }}
                >
                  {stat.value}
                </div>
                <div className="text-white/50 text-xs uppercase tracking-widest mt-1">
                  {stat.label}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Company Overview */}
      <section className="py-20 bg-background">
        <div className="container mx-auto px-4 lg:px-6">
          <div className="grid md:grid-cols-2 gap-12 items-center reveal-on-scroll">
            <div>
              <Badge className="mb-3 bg-brand-green/10 text-brand-green border-brand-green/20 text-xs uppercase tracking-widest">
                Company Overview
              </Badge>
              <h2 className="text-3xl md:text-4xl font-display font-bold text-foreground mb-6">
                Electric Mobility for Every Road
              </h2>
              <p className="text-muted-foreground mb-4 leading-relaxed text-base">
                JSR Electric Vehicles is an electric mobility company focused on
                promoting sustainable transportation solutions in India. The
                company operates as a multi-brand electric vehicle dealership
                and distribution network providing electric two-wheelers,
                electric three-wheelers, and EV components.
              </p>
              <p className="text-muted-foreground leading-relaxed text-base">
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
                  background:
                    "linear-gradient(135deg, oklch(0.12 0.01 145) 0%, oklch(0.18 0.05 155) 100%)",
                  border: "1px solid oklch(0.62 0.19 155 / 0.2)",
                  boxShadow: "0 0 40px oklch(0.62 0.19 155 / 0.08)",
                }}
              >
                <img
                  src="/assets/uploads/JSR_LOGO-2.png"
                  alt="JSR Electric Vehicles"
                  className="h-32 w-auto object-contain"
                />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Mission & Vision — side by side with vertical divider */}
      <section className="py-20 bg-brand-light-gray reveal-on-scroll">
        <div className="container mx-auto px-4 lg:px-6">
          <div className="text-center mb-12">
            <Badge className="mb-3 bg-brand-green/10 text-brand-green border-brand-green/20 text-xs uppercase tracking-widest">
              Purpose
            </Badge>
            <h2 className="text-3xl md:text-4xl font-display font-bold text-foreground">
              Our Mission & Vision
            </h2>
          </div>
          <div className="max-w-4xl mx-auto">
            <div
              className="rounded-2xl overflow-hidden"
              style={{
                border: "1px solid oklch(0.62 0.19 155 / 0.2)",
                boxShadow: "0 4px 24px rgba(0,0,0,0.06)",
              }}
            >
              <div className="grid md:grid-cols-2 divide-y md:divide-y-0 md:divide-x divide-border">
                {/* Mission */}
                <div className="bg-card p-8 hover:bg-brand-green/[0.02] transition-colors">
                  <div className="w-12 h-12 rounded-xl bg-brand-green/10 flex items-center justify-center mb-5">
                    <Target className="h-6 w-6 text-brand-green" />
                  </div>
                  <h3 className="text-xl font-bold text-foreground mb-3">
                    Our Mission
                  </h3>
                  <p className="text-muted-foreground leading-relaxed text-base">
                    To promote eco-friendly transportation by making electric
                    vehicles accessible and affordable while building a strong
                    dealer network, providing reliable service support, and
                    contributing to the development of the electric mobility
                    ecosystem.
                  </p>
                </div>
                {/* Vision */}
                <div className="bg-card p-8 hover:bg-brand-green/[0.02] transition-colors">
                  <div className="w-12 h-12 rounded-xl bg-brand-green/10 flex items-center justify-center mb-5">
                    <Lightbulb className="h-6 w-6 text-brand-green" />
                  </div>
                  <h3 className="text-xl font-bold text-foreground mb-3">
                    Our Vision
                  </h3>
                  <p className="text-muted-foreground leading-relaxed text-base">
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

      {/* Founder Section */}
      <section className="py-20 bg-background">
        <div className="container mx-auto px-4 lg:px-6">
          <div className="text-center mb-12">
            <Badge className="mb-3 bg-brand-green/10 text-brand-green border-brand-green/20 text-xs uppercase tracking-widest">
              Leadership
            </Badge>
            <h2 className="text-3xl md:text-4xl font-display font-bold text-foreground">
              Meet the Founder
            </h2>
          </div>
          <div className="max-w-3xl mx-auto reveal-on-scroll">
            <div
              className="rounded-2xl p-8"
              style={{
                background:
                  "linear-gradient(135deg, oklch(0.1 0.01 145) 0%, oklch(0.15 0.04 155) 100%)",
                border: "1px solid oklch(0.62 0.19 155 / 0.2)",
                boxShadow:
                  "0 8px 32px rgba(0,0,0,0.15), 0 0 0 1px oklch(0.62 0.19 155 / 0.1)",
              }}
            >
              <div className="flex flex-col sm:flex-row gap-6 items-center sm:items-start mb-8">
                {/* Founder Photo */}
                <div
                  className="w-36 h-36 sm:w-48 sm:h-48 rounded-2xl shrink-0 overflow-hidden"
                  style={{ border: "2px solid oklch(0.62 0.19 155 / 0.35)" }}
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
                  <h3 className="text-2xl font-bold text-white mb-1">
                    Janardhan Reddy Pasham
                  </h3>
                  <Badge className="bg-brand-green/20 text-brand-green border-brand-green/30 text-xs mb-3">
                    Founder &amp; Director
                  </Badge>
                  <p className="text-white/65 text-base mt-3 leading-relaxed">
                    An entrepreneur with a strong vision for sustainable
                    transportation and electric mobility in India. Recognizing
                    the rapid shift toward electric vehicles and the need for
                    reliable EV infrastructure, he established JSR Electric
                    Vehicles to support the growth of electric mobility through
                    vehicle distribution, dealership development, and service
                    support.
                  </p>
                  <p className="text-white/65 text-base mt-2 leading-relaxed">
                    Under his leadership, the company focuses on building strong
                    partnerships with manufacturers, dealers, and service
                    providers to expand access to electric vehicles across
                    Telangana and beyond.
                  </p>
                </div>
              </div>

              {/* Founder's Quote — enlarged with decorative quotation mark */}
              <div
                className="rounded-xl p-8 relative"
                style={{
                  background: "oklch(0.06 0.01 145 / 0.6)",
                  border: "1px solid oklch(0.62 0.19 155 / 0.15)",
                }}
              >
                {/* Large decorative quote mark */}
                <Quote
                  className="absolute -top-3 left-6 h-14 w-14 text-brand-green/25"
                  aria-hidden="true"
                  style={{ transform: "scaleX(-1)" }}
                />
                <p
                  className="text-white/85 text-lg md:text-xl leading-relaxed italic pt-4"
                  style={{ fontFamily: "Georgia, 'Times New Roman', serif" }}
                >
                  "Electric mobility represents an important step toward a
                  cleaner and more sustainable future. At JSR Electric Vehicles,
                  our objective is to make electric vehicles accessible and
                  practical for everyday use. By building strong partnerships
                  with manufacturers and dealer networks, we aim to create a
                  reliable ecosystem that supports customers, businesses, and
                  communities in adopting electric transportation solutions."
                </p>
                <div className="mt-5 flex items-center gap-3">
                  <div
                    className="w-8 h-px"
                    style={{ background: "oklch(0.62 0.19 155)" }}
                  />
                  <span
                    className="text-sm font-semibold"
                    style={{ color: "oklch(0.72 0.19 155)" }}
                  >
                    Janardhan Reddy Pasham, Founder &amp; Director
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Products & Solutions — 2x2 grid on desktop */}
      <section className="py-20 bg-brand-light-gray">
        <div className="container mx-auto px-4 lg:px-6">
          <div className="text-center mb-12 reveal-on-scroll">
            <Badge className="mb-3 bg-brand-green/10 text-brand-green border-brand-green/20 text-xs uppercase tracking-widest">
              What We Offer
            </Badge>
            <h2 className="text-3xl md:text-4xl font-display font-bold text-foreground mb-3">
              Products &amp; Solutions
            </h2>
            <p className="text-muted-foreground max-w-xl mx-auto text-base">
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
                  className="reveal-on-scroll bg-card border border-border rounded-2xl p-6 hover:border-brand-green/40 hover:shadow-green-glow-sm transition-all duration-300 group"
                  style={{ animationDelay: `${i * 0.08}s` }}
                >
                  <div className="w-12 h-12 rounded-xl bg-brand-green/10 flex items-center justify-center mb-4 group-hover:bg-brand-green/20 transition-colors">
                    <Icon className="h-6 w-6 text-brand-green" />
                  </div>
                  <h3 className="font-semibold text-foreground mb-2 text-base">
                    {product.title}
                  </h3>
                  <p className="text-muted-foreground text-sm leading-relaxed mb-4">
                    {product.desc}
                  </p>
                  <Link
                    to={product.link}
                    className="inline-flex items-center gap-1 text-brand-green text-sm font-semibold hover:gap-2 transition-all"
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

      {/* After-Sales Support */}
      <section className="py-20 bg-background">
        <div className="container mx-auto px-4 lg:px-6">
          <div className="grid md:grid-cols-2 gap-12 items-start max-w-5xl mx-auto reveal-on-scroll">
            <div>
              <Badge className="mb-3 bg-brand-green/10 text-brand-green border-brand-green/20 text-xs uppercase tracking-widest">
                Service &amp; Maintenance
              </Badge>
              <h2 className="text-3xl md:text-4xl font-display font-bold text-foreground mb-4">
                After-Sales Support You Can Rely On
              </h2>
              <p className="text-muted-foreground mb-6 leading-relaxed text-base">
                Reliable service support is a critical part of the electric
                vehicle ecosystem. JSR Electric Vehicles ensures that
                technicians and service partners are trained in EV systems to
                maintain consistent service quality.
              </p>
              <ul className="space-y-3">
                {services.map((service) => (
                  <li
                    key={service}
                    className="flex items-center gap-3 text-sm text-foreground"
                  >
                    <div className="w-5 h-5 rounded-full bg-brand-green/15 flex items-center justify-center shrink-0">
                      <CheckCircle2 className="h-3 w-3 text-brand-green" />
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
                    className="reveal-on-scroll bg-card border border-border rounded-2xl p-6 text-center hover:border-brand-green/40 hover:shadow-green-glow-sm transition-all duration-300 group"
                    style={{ animationDelay: `${i * 0.08}s` }}
                  >
                    <div className="w-16 h-16 rounded-2xl bg-brand-green/10 flex items-center justify-center mx-auto mb-4 group-hover:bg-brand-green/20 transition-colors">
                      <Icon className="h-8 w-8 text-brand-green" />
                    </div>
                    <div className="text-sm font-bold text-foreground mb-1">
                      {item.label}
                    </div>
                    <div className="text-xs text-muted-foreground leading-snug">
                      {item.desc}
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      </section>

      {/* Timeline */}
      <section className="py-20 bg-brand-light-gray">
        <div className="container mx-auto px-4 lg:px-6">
          <div className="text-center mb-12 reveal-on-scroll">
            <Badge className="mb-3 bg-brand-green/10 text-brand-green border-brand-green/20 text-xs uppercase tracking-widest">
              Company History
            </Badge>
            <h2 className="text-3xl md:text-4xl font-display font-bold text-foreground mb-3">
              Our Journey
            </h2>
            <p className="text-muted-foreground max-w-xl mx-auto text-base">
              From a single showroom in Kodad to a growing EV network — our
              story of impact and growth.
            </p>
          </div>
          <div className="relative max-w-3xl mx-auto">
            <div className="absolute left-6 md:left-1/2 top-0 bottom-0 w-px bg-brand-green/20 -translate-x-px" />
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
                  <div className="bg-card border border-border rounded-xl p-5 hover:border-brand-green/40 transition-colors">
                    {/* Large bold year */}
                    <span
                      className="text-2xl font-black font-display"
                      style={{ color: "oklch(0.62 0.19 155)" }}
                    >
                      {item.year}
                    </span>
                    <h3 className="font-semibold text-foreground mt-1 mb-2 text-base">
                      {item.title}
                    </h3>
                    <p className="text-muted-foreground text-sm leading-relaxed">
                      {item.desc}
                    </p>
                  </div>
                </div>
                <div className="absolute left-4 md:left-1/2 top-5 w-5 h-5 rounded-full bg-brand-green border-2 border-background shadow -translate-x-2.5 md:-translate-x-2.5" />
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Dealer & Franchise Network */}
      <section className="py-16 bg-background">
        <div className="container mx-auto px-4 lg:px-6">
          <div className="max-w-4xl mx-auto reveal-on-scroll">
            <div className="text-center mb-8">
              <Badge className="mb-3 bg-brand-green/10 text-brand-green border-brand-green/20 text-xs uppercase tracking-widest">
                Partner Network
              </Badge>
              <h2 className="text-3xl md:text-4xl font-display font-bold text-foreground mb-4">
                Dealer &amp; Franchise Network
              </h2>
              <p className="text-muted-foreground mb-4 leading-relaxed max-w-xl mx-auto text-base">
                Entrepreneurs and businesses can partner with JSR Electric
                Vehicles to establish EV dealerships under our growing network.
                Partners receive product supply, brand support, sales
                assistance, and technical training.
              </p>
            </div>
            {/* City pill tags */}
            <div className="mb-8">
              <p className="text-center text-sm text-muted-foreground mb-4 uppercase tracking-widest font-semibold">
                Coverage Areas
              </p>
              <div className="flex flex-wrap justify-center gap-2">
                {dealerCities.map((city) => (
                  <span
                    key={city}
                    className="px-3 py-1.5 rounded-full text-sm font-medium"
                    style={{
                      background: "oklch(0.62 0.19 155 / 0.1)",
                      border: "1px solid oklch(0.62 0.19 155 / 0.25)",
                      color: "oklch(0.62 0.19 155)",
                    }}
                  >
                    {city}
                  </span>
                ))}
                <span
                  className="px-3 py-1.5 rounded-full text-sm font-medium text-muted-foreground"
                  style={{
                    background: "oklch(0.88 0.01 145 / 0.5)",
                    border: "1px solid oklch(0.88 0.01 145)",
                  }}
                >
                  + more expanding
                </span>
              </div>
            </div>
            <div className="text-center">
              <Link to="/franchise" data-ocid="about.franchise_button">
                <Button className="bg-brand-green hover:bg-brand-green/90 text-white font-semibold px-8">
                  Explore Franchise Opportunity{" "}
                  <ArrowRight className="h-4 w-4 ml-2" />
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Future Plans */}
      <section className="py-20 bg-brand-light-gray">
        <div className="container mx-auto px-4 lg:px-6">
          <div className="text-center mb-12 reveal-on-scroll">
            <Badge className="mb-3 bg-brand-green/10 text-brand-green border-brand-green/20 text-xs uppercase tracking-widest">
              What&apos;s Next
            </Badge>
            <h2 className="text-3xl md:text-4xl font-display font-bold text-foreground mb-3">
              Future Plans
            </h2>
            <p className="text-muted-foreground max-w-xl mx-auto text-base">
              We are building for the long term — growing our footprint, our
              products, and our technology.
            </p>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 max-w-4xl mx-auto">
            {futurePlans.map((plan, i) => (
              <div
                key={plan}
                className="reveal-on-scroll flex items-start gap-3 p-5 rounded-xl border transition-all duration-300 group"
                style={{
                  background: "oklch(0.93 0.004 145)",
                  borderColor: "oklch(0.85 0.01 145)",
                  animationDelay: `${i * 0.07}s`,
                }}
                onMouseEnter={(e) => {
                  (e.currentTarget as HTMLElement).style.background =
                    "oklch(0.90 0.005 145)";
                  (e.currentTarget as HTMLElement).style.borderColor =
                    "oklch(0.62 0.19 155 / 0.4)";
                  (e.currentTarget as HTMLElement).style.transform =
                    "translateY(-2px)";
                  (e.currentTarget as HTMLElement).style.boxShadow =
                    "0 4px 16px rgba(0,0,0,0.08)";
                }}
                onMouseLeave={(e) => {
                  (e.currentTarget as HTMLElement).style.background =
                    "oklch(0.93 0.004 145)";
                  (e.currentTarget as HTMLElement).style.borderColor =
                    "oklch(0.85 0.01 145)";
                  (e.currentTarget as HTMLElement).style.transform =
                    "translateY(0)";
                  (e.currentTarget as HTMLElement).style.boxShadow = "none";
                }}
              >
                <div className="w-6 h-6 rounded-full bg-brand-green/15 flex items-center justify-center shrink-0 mt-0.5 group-hover:bg-brand-green/25 transition-colors">
                  <CheckCircle2 className="h-3.5 w-3.5 text-brand-green" />
                </div>
                <p className="text-sm text-foreground leading-relaxed font-medium">
                  {plan}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Committed to Sustainable Mobility — 2x2 grid */}
      <section className="py-20 bg-background">
        <div className="container mx-auto px-4 lg:px-6">
          <div className="grid md:grid-cols-2 gap-12 items-start max-w-5xl mx-auto">
            <div className="reveal-on-scroll">
              <Badge className="mb-3 bg-brand-green/10 text-brand-green border-brand-green/20 text-xs uppercase tracking-widest">
                Our Commitment
              </Badge>
              <h2 className="text-3xl md:text-4xl font-display font-bold text-foreground mb-4">
                Committed to Sustainable Mobility
              </h2>
              <p className="text-muted-foreground mb-4 leading-relaxed text-base">
                Electric vehicles help reduce carbon emissions, decrease
                dependence on fossil fuels, and lower transportation costs for
                everyday users. JSR Electric Vehicles supports this transition
                by promoting environmentally responsible mobility solutions.
              </p>
              <p className="text-muted-foreground leading-relaxed text-base">
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
                    className="reveal-on-scroll bg-card border border-border rounded-2xl p-5 hover:border-brand-green/40 hover:shadow-green-glow-sm transition-all duration-300 group"
                    style={{ animationDelay: `${i * 0.08}s` }}
                  >
                    {/* Enlarged icon */}
                    <div className="w-14 h-14 rounded-xl bg-brand-green/10 flex items-center justify-center mb-4 group-hover:bg-brand-green/20 transition-colors">
                      <Icon className="h-7 w-7 text-brand-green" />
                    </div>
                    <h3 className="font-bold text-foreground mb-1 text-sm">
                      {item.title}
                    </h3>
                    {/* Stat line */}
                    <div
                      className="text-xs font-semibold mb-2"
                      style={{ color: "oklch(0.62 0.19 155)" }}
                    >
                      {item.stat}
                    </div>
                    <p className="text-muted-foreground text-xs leading-relaxed">
                      {item.desc}
                    </p>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      </section>

      {/* Vision Closing */}
      <section className="py-20 section-gradient reveal-on-scroll">
        <div className="container mx-auto px-4 lg:px-6 text-center max-w-4xl">
          <Badge className="mb-4 bg-brand-green/20 text-brand-green border-brand-green/30 text-xs uppercase tracking-widest">
            Our Vision
          </Badge>
          <h2 className="text-3xl md:text-5xl font-display font-bold text-white mb-6">
            Building a Trusted{" "}
            <span className="text-brand-green">Electric Mobility Network</span>{" "}
            Across India
          </h2>
          <p className="text-white/65 text-lg leading-relaxed max-w-3xl mx-auto">
            To become a trusted electric mobility brand with a strong network of
            EV dealerships, service centers, and sustainable transportation
            solutions — making clean electric transport the norm across India,
            one community at a time.
          </p>
          <div className="mt-10 flex flex-wrap justify-center gap-4">
            <Link to="/vehicles" data-ocid="about.vehicles_button">
              <Button className="bg-brand-green hover:bg-brand-green/90 text-white font-semibold px-8">
                Explore Our Vehicles <ArrowRight className="h-4 w-4 ml-2" />
              </Button>
            </Link>
            <Link to="/contact" data-ocid="about.contact_button">
              <Button
                variant="outline"
                className="border-white/30 text-white hover:bg-white/10 bg-white/5 px-8"
              >
                Contact Us
              </Button>
            </Link>
          </div>
        </div>
      </section>
    </main>
  );
}

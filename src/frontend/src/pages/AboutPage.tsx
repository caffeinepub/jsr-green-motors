import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Link } from "@tanstack/react-router";
import {
  ArrowRight,
  Battery,
  CheckCircle2,
  Cpu,
  Globe,
  Leaf,
  Lightbulb,
  Quote,
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
    year: "2025+",
    title: "Growing Network",
    desc: "7+ EV brands, 4 branches, 20+ dealer network — driving the electric mobility revolution across Telangana.",
  },
];

const products = [
  {
    icon: Zap,
    title: "Electric Scooters",
    desc: "A curated range of electric scooters from leading brands for everyday city commuting — economical, reliable, and eco-friendly.",
  },
  {
    icon: TrendingUp,
    title: "Electric Motorcycles",
    desc: "Performance-oriented electric motorcycles for riders who want the thrill of the road without the cost of petrol.",
  },
  {
    icon: Globe,
    title: "Electric Three-Wheelers",
    desc: "Passenger and cargo electric three-wheelers designed for last-mile connectivity and commercial use.",
  },
  {
    icon: Battery,
    title: "EV Components",
    desc: "Batteries, controllers, chargers, and electrical parts for vehicle maintenance and EV system integration.",
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

const futurePlans = [
  "New electric vehicle models across categories",
  "Expanded dealership network across Telangana & Andhra Pradesh",
  "R&D in electric mobility technology",
  "Advanced battery and EV conversion solutions",
  "Integrated EV charging infrastructure",
  "Customer mobile app for service & booking",
];

const stats = [
  { value: "7+", label: "EV Brands" },
  { value: "4", label: "Branches" },
  { value: "20+", label: "Dealer Network" },
  { value: "2022", label: "Founded" },
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
  }, []);

  return (
    <main className="pt-20">
      {/* Hero */}
      <section className="py-20 section-gradient">
        <div className="container mx-auto px-4 lg:px-6 text-center">
          <Badge className="mb-4 bg-brand-green/20 text-brand-green border-brand-green/30 text-xs uppercase tracking-widest">
            Our Story
          </Badge>
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-display font-bold text-white mb-6">
            About JSR Electric Vehicles
          </h1>
          <p className="text-white/65 text-xl max-w-3xl mx-auto leading-relaxed">
            We are more than a dealership. We are an electric mobility company
            building a sustainable transportation ecosystem across Telangana —
            one vehicle at a time.
          </p>
        </div>
      </section>

      {/* Company Overview */}
      <section className="py-20 bg-background">
        <div className="container mx-auto px-4 lg:px-6">
          <div className="grid md:grid-cols-2 gap-12 items-center">
            <div>
              <Badge className="mb-3 bg-brand-green/10 text-brand-green border-brand-green/20 text-xs uppercase tracking-widest">
                Company Overview
              </Badge>
              <h2 className="text-3xl md:text-4xl font-display font-bold text-foreground mb-6">
                Electric Mobility for Every Road
              </h2>
              <p className="text-muted-foreground mb-4 leading-relaxed">
                JSR Electric Vehicles is an electric mobility company focused on
                promoting sustainable transportation solutions in India. The
                company operates as a multi-brand electric vehicle dealership
                and distribution network providing electric two-wheelers,
                electric three-wheelers, and EV components.
              </p>
              <p className="text-muted-foreground leading-relaxed">
                Through a growing network of dealers and service partners, we
                aim to make electric mobility accessible, affordable, and
                reliable for customers in cities, towns, and developing markets
                across Telangana. By combining distribution, service capability,
                and technical support, JSR Electric Vehicles contributes to the
                development of a reliable electric vehicle ecosystem.
              </p>
            </div>
            <div className="grid grid-cols-2 gap-4">
              {stats.map((stat) => (
                <div
                  key={stat.label}
                  className="bg-card border border-border rounded-2xl p-5 text-center hover:border-brand-green/40 transition-colors"
                >
                  <div
                    className="text-3xl font-black font-display mb-1"
                    style={{ color: "oklch(0.62 0.19 155)" }}
                  >
                    {stat.value}
                  </div>
                  <div className="text-sm text-muted-foreground font-medium">
                    {stat.label}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Mission & Vision */}
      <section className="py-20 bg-brand-light-gray">
        <div className="container mx-auto px-4 lg:px-6">
          <div className="text-center mb-12">
            <Badge className="mb-3 bg-brand-green/10 text-brand-green border-brand-green/20 text-xs uppercase tracking-widest">
              Purpose
            </Badge>
            <h2 className="text-3xl md:text-4xl font-display font-bold text-foreground">
              Our Mission & Vision
            </h2>
          </div>
          <div className="grid md:grid-cols-2 gap-6 max-w-4xl mx-auto">
            {/* Mission Card */}
            <div className="bg-card border border-border rounded-2xl p-8 hover:border-brand-green/40 transition-all duration-300">
              <div className="w-12 h-12 rounded-xl bg-brand-green/10 flex items-center justify-center mb-5">
                <Target className="h-6 w-6 text-brand-green" />
              </div>
              <h3 className="text-xl font-bold text-foreground mb-3">
                Our Mission
              </h3>
              <p className="text-muted-foreground leading-relaxed">
                To promote eco-friendly transportation by making electric
                vehicles accessible and affordable while building a strong
                dealer network, providing reliable service support, and
                contributing to the development of the electric mobility
                ecosystem.
              </p>
            </div>
            {/* Vision Card */}
            <div className="bg-card border border-border rounded-2xl p-8 hover:border-brand-green/40 transition-all duration-300">
              <div className="w-12 h-12 rounded-xl bg-brand-green/10 flex items-center justify-center mb-5">
                <Lightbulb className="h-6 w-6 text-brand-green" />
              </div>
              <h3 className="text-xl font-bold text-foreground mb-3">
                Our Vision
              </h3>
              <p className="text-muted-foreground leading-relaxed">
                To become a trusted electric mobility brand with a strong
                network of EV dealerships, service centers, and sustainable
                transportation solutions across India.
              </p>
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
          <div className="max-w-3xl mx-auto">
            <div className="bg-card border border-border rounded-2xl p-8 hover:border-brand-green/40 hover:shadow-green-glow-sm transition-all duration-300">
              <div className="flex flex-col sm:flex-row gap-6 items-center sm:items-start mb-6">
                {/* Avatar */}
                <div className="w-20 h-20 rounded-full bg-brand-green/10 border-2 border-brand-green/30 flex items-center justify-center shrink-0">
                  <Users className="h-10 w-10 text-brand-green" />
                </div>
                <div className="text-center sm:text-left">
                  <h3 className="text-xl font-bold text-foreground mb-1">
                    Janardhan Reddy Pasham
                  </h3>
                  <Badge className="bg-brand-green/10 text-brand-green border-brand-green/20 text-xs">
                    Founder &amp; Director
                  </Badge>
                  <p className="text-muted-foreground text-sm mt-3 leading-relaxed">
                    An entrepreneur with a strong vision for sustainable
                    transportation and electric mobility in India. Recognizing
                    the rapid shift toward electric vehicles and the need for
                    reliable EV infrastructure, he established JSR Electric
                    Vehicles to support the growth of electric mobility through
                    vehicle distribution, dealership development, and service
                    support.
                  </p>
                  <p className="text-muted-foreground text-sm mt-2 leading-relaxed">
                    Under his leadership, the company focuses on building strong
                    partnerships with manufacturers, dealers, and service
                    providers to expand access to electric vehicles across
                    Telangana and beyond.
                  </p>
                </div>
              </div>

              {/* Founder's Message */}
              <div
                className="rounded-xl p-6 relative"
                style={{
                  background:
                    "linear-gradient(135deg, oklch(0.12 0.01 145) 0%, oklch(0.16 0.04 155) 100%)",
                  border: "1px solid oklch(0.62 0.19 155 / 0.2)",
                }}
              >
                <Quote
                  className="absolute top-4 left-4 h-8 w-8 text-brand-green/30"
                  aria-hidden="true"
                />
                <p className="text-white/80 text-base leading-relaxed pl-6 italic">
                  "Electric mobility represents an important step toward a
                  cleaner and more sustainable future. At JSR Electric Vehicles,
                  our objective is to make electric vehicles accessible and
                  practical for everyday use. By building strong partnerships
                  with manufacturers and dealer networks, we aim to create a
                  reliable ecosystem that supports customers, businesses, and
                  communities in adopting electric transportation solutions."
                </p>
                <div className="mt-4 pl-6">
                  <span className="text-brand-green text-sm font-semibold">
                    — Janardhan Reddy Pasham, Founder &amp; Director
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Products & Solutions */}
      <section className="py-20 bg-brand-light-gray">
        <div className="container mx-auto px-4 lg:px-6">
          <div className="text-center mb-12">
            <Badge className="mb-3 bg-brand-green/10 text-brand-green border-brand-green/20 text-xs uppercase tracking-widest">
              What We Offer
            </Badge>
            <h2 className="text-3xl md:text-4xl font-display font-bold text-foreground mb-3">
              Products &amp; Solutions
            </h2>
            <p className="text-muted-foreground max-w-xl mx-auto">
              A complete range of electric mobility products designed for
              personal and commercial use.
            </p>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {products.map((product) => {
              const Icon = product.icon;
              return (
                <div
                  key={product.title}
                  className="bg-card border border-border rounded-2xl p-6 hover:border-brand-green/40 hover:shadow-green-glow-sm transition-all duration-300 group"
                >
                  <div className="w-12 h-12 rounded-xl bg-brand-green/10 flex items-center justify-center mb-4 group-hover:bg-brand-green/20 transition-colors">
                    <Icon className="h-6 w-6 text-brand-green" />
                  </div>
                  <h3 className="font-semibold text-foreground mb-2">
                    {product.title}
                  </h3>
                  <p className="text-muted-foreground text-sm leading-relaxed">
                    {product.desc}
                  </p>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Services Section */}
      <section className="py-20 bg-background">
        <div className="container mx-auto px-4 lg:px-6">
          <div className="grid md:grid-cols-2 gap-12 items-center max-w-5xl mx-auto">
            <div>
              <Badge className="mb-3 bg-brand-green/10 text-brand-green border-brand-green/20 text-xs uppercase tracking-widest">
                Service &amp; Maintenance
              </Badge>
              <h2 className="text-3xl md:text-4xl font-display font-bold text-foreground mb-4">
                After-Sales Support You Can Rely On
              </h2>
              <p className="text-muted-foreground mb-6 leading-relaxed">
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
            <div className="grid grid-cols-2 gap-4">
              {[
                {
                  icon: Wrench,
                  label: "Certified Technicians",
                },
                {
                  icon: Battery,
                  label: "Battery Specialists",
                },
                {
                  icon: Cpu,
                  label: "Controller Experts",
                },
                {
                  icon: Leaf,
                  label: "Eco-Friendly Service",
                },
              ].map((item) => {
                const Icon = item.icon;
                return (
                  <div
                    key={item.label}
                    className="bg-card border border-border rounded-2xl p-5 text-center hover:border-brand-green/40 transition-colors"
                  >
                    <Icon className="h-8 w-8 text-brand-green mx-auto mb-3" />
                    <div className="text-sm font-semibold text-foreground">
                      {item.label}
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
          <div className="text-center mb-12">
            <Badge className="mb-3 bg-brand-green/10 text-brand-green border-brand-green/20 text-xs uppercase tracking-widest">
              Company History
            </Badge>
            <h2 className="text-3xl md:text-4xl font-display font-bold text-foreground mb-3">
              Our Journey
            </h2>
            <p className="text-muted-foreground max-w-xl mx-auto">
              From a single showroom in Kodad to a growing EV network — our
              story of impact and growth.
            </p>
          </div>
          <div className="relative max-w-3xl mx-auto">
            <div className="absolute left-6 md:left-1/2 top-0 bottom-0 w-px bg-border -translate-x-px" />
            {timelineItems.map((item, i) => (
              <div
                key={`${item.year}-${item.title}`}
                className={`relative flex gap-6 mb-8 ${i % 2 === 0 ? "md:flex-row" : "md:flex-row-reverse"}`}
              >
                <div
                  className={`flex-1 ${i % 2 === 0 ? "md:text-right md:pr-8" : "md:text-left md:pl-8"} pl-14 md:pl-0`}
                >
                  <div className="bg-card border border-border rounded-xl p-5 hover:border-brand-green/40 transition-colors">
                    <span className="text-brand-green text-sm font-bold">
                      {item.year}
                    </span>
                    <h3 className="font-semibold text-foreground mt-1 mb-2">
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

      {/* Dealer & Franchise Strip */}
      <section className="py-16 bg-background">
        <div className="container mx-auto px-4 lg:px-6">
          <div className="max-w-3xl mx-auto text-center">
            <Badge className="mb-3 bg-brand-green/10 text-brand-green border-brand-green/20 text-xs uppercase tracking-widest">
              Partner Network
            </Badge>
            <h2 className="text-3xl md:text-4xl font-display font-bold text-foreground mb-4">
              Dealer &amp; Franchise Network
            </h2>
            <p className="text-muted-foreground mb-6 leading-relaxed max-w-xl mx-auto">
              Entrepreneurs and businesses can partner with JSR Electric
              Vehicles to establish EV dealerships under our growing network.
              Partners receive product supply, brand support, sales assistance,
              and technical training to ensure efficient operations and customer
              satisfaction.
            </p>
            <Link to="/franchise" data-ocid="about.franchise_button">
              <Button className="bg-brand-green hover:bg-brand-green/90 text-white font-semibold px-8">
                Explore Franchise Opportunity{" "}
                <ArrowRight className="h-4 w-4 ml-2" />
              </Button>
            </Link>
          </div>
        </div>
      </section>

      {/* Future Plans */}
      <section className="py-20 bg-brand-light-gray">
        <div className="container mx-auto px-4 lg:px-6">
          <div className="text-center mb-12">
            <Badge className="mb-3 bg-brand-green/10 text-brand-green border-brand-green/20 text-xs uppercase tracking-widest">
              What&apos;s Next
            </Badge>
            <h2 className="text-3xl md:text-4xl font-display font-bold text-foreground mb-3">
              Future Plans
            </h2>
            <p className="text-muted-foreground max-w-xl mx-auto">
              We are building for the long term — growing our footprint, our
              products, and our technology.
            </p>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 max-w-4xl mx-auto">
            {futurePlans.map((plan) => (
              <div
                key={plan}
                className="flex items-start gap-3 p-4 rounded-xl bg-card border border-border hover:border-brand-green/40 transition-colors"
              >
                <div className="w-6 h-6 rounded-full bg-brand-green/15 flex items-center justify-center shrink-0 mt-0.5">
                  <CheckCircle2 className="h-3.5 w-3.5 text-brand-green" />
                </div>
                <p className="text-sm text-foreground leading-relaxed">
                  {plan}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Commitment to Sustainable Mobility */}
      <section className="py-20 bg-background">
        <div className="container mx-auto px-4 lg:px-6">
          <div className="grid md:grid-cols-2 gap-12 items-center max-w-5xl mx-auto">
            <div>
              <Badge className="mb-3 bg-brand-green/10 text-brand-green border-brand-green/20 text-xs uppercase tracking-widest">
                Our Commitment
              </Badge>
              <h2 className="text-3xl md:text-4xl font-display font-bold text-foreground mb-4">
                Committed to Sustainable Mobility
              </h2>
              <p className="text-muted-foreground mb-4 leading-relaxed">
                Electric vehicles help reduce carbon emissions, decrease
                dependence on fossil fuels, and lower transportation costs for
                everyday users. JSR Electric Vehicles supports this transition
                by promoting environmentally responsible mobility solutions.
              </p>
              <p className="text-muted-foreground leading-relaxed">
                We are building infrastructure and partnerships that support the
                long-term growth of electric vehicles — from our showrooms to
                our service centers, franchise network, and EV conversion
                workshops.
              </p>
            </div>
            <div className="grid grid-cols-1 gap-4">
              {[
                {
                  icon: Leaf,
                  title: "Zero Emissions",
                  desc: "Every EV we sell contributes to a cleaner environment and reduced carbon footprint.",
                },
                {
                  icon: TrendingUp,
                  title: "Lower Running Costs",
                  desc: "Electric vehicles save customers up to 70% on fuel and maintenance costs.",
                },
                {
                  icon: Globe,
                  title: "National Impact",
                  desc: "Contributing to India's EV adoption goals through regional dealership expansion.",
                },
              ].map((item) => {
                const Icon = item.icon;
                return (
                  <div
                    key={item.title}
                    className="flex gap-4 p-4 rounded-xl bg-card border border-border hover:border-brand-green/40 transition-all duration-300"
                  >
                    <div className="w-10 h-10 rounded-xl bg-brand-green/10 flex items-center justify-center shrink-0">
                      <Icon className="h-5 w-5 text-brand-green" />
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
                );
              })}
            </div>
          </div>
        </div>
      </section>

      {/* Vision Closing */}
      <section className="py-20 section-gradient">
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

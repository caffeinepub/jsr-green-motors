import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Link } from "@tanstack/react-router";
import {
  ArrowRight,
  BadgeDollarSign,
  Check,
  CheckCircle,
  Leaf,
  Search,
  Settings,
  Wrench,
  Zap,
} from "lucide-react";
import { useEffect } from "react";

const steps = [
  {
    icon: Search,
    step: "01",
    title: "Inspection",
    desc: "Thorough assessment of your existing vehicle's frame, motor mounts, and electrical system compatibility.",
  },
  {
    icon: Settings,
    step: "02",
    title: "Component Selection",
    desc: "We recommend the best motor, battery pack, and controller combination for your vehicle type and budget.",
  },
  {
    icon: Wrench,
    step: "03",
    title: "Installation",
    desc: "Certified technicians perform the conversion with precision, ensuring all safety standards are met.",
  },
  {
    icon: CheckCircle,
    step: "04",
    title: "Testing & Handover",
    desc: "Comprehensive testing of range, speed, and safety systems before handing over your converted EV.",
  },
];

const benefits = [
  {
    icon: BadgeDollarSign,
    title: "Save 70% Fuel Cost",
    desc: "Electricity costs a fraction of petrol. Save thousands annually.",
  },
  {
    icon: Leaf,
    title: "Zero Emissions",
    desc: "Reduce your carbon footprint. Contribute to a cleaner Andhra Pradesh.",
  },
  {
    icon: Wrench,
    title: "Low Maintenance",
    desc: "EV has fewer moving parts. No oil changes, no spark plugs, lower servicing costs.",
  },
  {
    icon: Zap,
    title: "Govt. Subsidies",
    desc: "Eligible for FAME II and state EV subsidies, reducing your conversion cost further.",
  },
];

const pricingTiers = [
  {
    name: "Basic",
    price: "₹25,000",
    desc: "Ideal for low-speed scooters and city commuters.",
    features: [
      "250W–500W BLDC Motor",
      "12V–48V Lead Acid Battery",
      "40–60 km range",
      "6-month warranty",
      "Basic throttle control",
    ],
    highlight: false,
  },
  {
    name: "Standard",
    price: "₹40,000",
    desc: "Best value for daily commuters and delivery riders.",
    features: [
      "1000W–1500W Motor",
      "60V Lithium-ion Battery",
      "80–100 km range",
      "1-year warranty",
      "Regenerative braking",
      "Digital speedometer",
    ],
    highlight: true,
  },
  {
    name: "Premium",
    price: "₹60,000",
    desc: "High performance for motorcycles and heavy-duty use.",
    features: [
      "2000W–3000W Motor",
      "72V Lithium-ion Battery",
      "120–150 km range",
      "2-year warranty",
      "Advanced BMS",
      "Smart connectivity",
      "Regenerative braking",
    ],
    highlight: false,
  },
];

const faqs = [
  {
    q: "Which vehicles can be converted to electric?",
    a: "Most petrol scooters (100cc–150cc) and motorcycles (150cc–350cc) can be converted. We assess each vehicle individually during the inspection phase. Vehicles in good mechanical condition are ideal candidates.",
  },
  {
    q: "How long does the conversion take?",
    a: "A standard conversion takes 3–7 working days depending on the package selected. Premium conversions with custom battery packs may take up to 10 days.",
  },
  {
    q: "Is the converted vehicle legally roadworthy?",
    a: "Yes. We provide all necessary documentation for RTO approval. Our conversions follow CMVR (Central Motor Vehicles Rules) compliance guidelines for EV retrofitting.",
  },
  {
    q: "What warranty do I get on the conversion?",
    a: "Warranty varies by package: Basic (6 months), Standard (1 year), Premium (2 years) on motor and battery. Workmanship warranty is 6 months across all packages.",
  },
  {
    q: "Can I claim government subsidies on conversion?",
    a: "Yes, EV conversions may be eligible for state-level subsidies under the Andhra Pradesh EV Policy. Our team will guide you through the documentation process.",
  },
];

export default function ConversionsPage() {
  useEffect(() => {
    document.title = "EV Conversion | JSR Green Motors";
  }, []);

  return (
    <main className="pt-20">
      {/* Hero */}
      <section className="relative py-20 overflow-hidden">
        <div
          className="absolute inset-0 bg-cover bg-center"
          style={{
            backgroundImage:
              "url('/assets/generated/conversion-before-after.dim_800x400.jpg')",
          }}
        />
        <div className="absolute inset-0 bg-brand-dark/85" />
        <div className="relative z-10 container mx-auto px-4 lg:px-6 text-center">
          <Badge className="mb-4 bg-brand-green/20 text-brand-green border-brand-green/30 text-xs uppercase tracking-widest">
            Petrol → Electric
          </Badge>
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-display font-bold text-white mb-6">
            Electric Vehicle{" "}
            <span className="text-brand-green">Conversion</span>
          </h1>
          <p className="text-white/70 text-xl max-w-2xl mx-auto mb-8">
            Transform your existing petrol vehicle into a modern electric
            vehicle. Save 70% on running costs with certified EV kits.
          </p>
          <Link to="/contact">
            <Button
              size="lg"
              className="bg-brand-green hover:bg-brand-green/90 text-white font-bold px-10"
            >
              Start Conversion Today <ArrowRight className="h-4 w-4 ml-2" />
            </Button>
          </Link>
        </div>
      </section>

      {/* How It Works */}
      <section className="py-20 bg-background">
        <div className="container mx-auto px-4 lg:px-6">
          <div className="text-center mb-12">
            <Badge className="mb-3 bg-brand-green/10 text-brand-green border-brand-green/20 text-xs uppercase tracking-widest">
              Process
            </Badge>
            <h2 className="text-3xl md:text-4xl font-display font-bold text-foreground mb-3">
              How It Works
            </h2>
            <p className="text-muted-foreground max-w-xl mx-auto">
              Our proven 4-step conversion process ensures a safe, certified,
              and high-quality transformation.
            </p>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {steps.map((step) => {
              const Icon = step.icon;
              return (
                <div key={step.step} className="relative">
                  <div className="bg-card border border-border rounded-2xl p-6 hover:border-brand-green/40 hover:shadow-green-glow-sm transition-all duration-300 h-full">
                    <div className="text-5xl font-black text-brand-green/10 mb-3 leading-none font-display">
                      {step.step}
                    </div>
                    <div className="w-10 h-10 rounded-xl bg-brand-green/10 flex items-center justify-center mb-4">
                      <Icon className="h-5 w-5 text-brand-green" />
                    </div>
                    <h3 className="font-semibold text-foreground mb-2">
                      {step.title}
                    </h3>
                    <p className="text-muted-foreground text-sm leading-relaxed">
                      {step.desc}
                    </p>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Benefits */}
      <section className="py-20 bg-brand-light-gray">
        <div className="container mx-auto px-4 lg:px-6">
          <div className="text-center mb-12">
            <Badge className="mb-3 bg-brand-green/10 text-brand-green border-brand-green/20 text-xs uppercase tracking-widest">
              Benefits
            </Badge>
            <h2 className="text-3xl md:text-4xl font-display font-bold text-foreground mb-3">
              Why Convert to Electric?
            </h2>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {benefits.map((benefit) => {
              const Icon = benefit.icon;
              return (
                <div
                  key={benefit.title}
                  className="bg-card border border-border rounded-2xl p-6 text-center hover:border-brand-green/40 transition-all duration-300"
                >
                  <div className="w-14 h-14 rounded-2xl bg-brand-green/10 flex items-center justify-center mx-auto mb-4">
                    <Icon className="h-7 w-7 text-brand-green" />
                  </div>
                  <h3 className="font-semibold text-foreground mb-2">
                    {benefit.title}
                  </h3>
                  <p className="text-muted-foreground text-sm leading-relaxed">
                    {benefit.desc}
                  </p>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Pricing */}
      <section className="py-20 bg-background">
        <div className="container mx-auto px-4 lg:px-6">
          <div className="text-center mb-12">
            <Badge className="mb-3 bg-brand-green/10 text-brand-green border-brand-green/20 text-xs uppercase tracking-widest">
              Pricing
            </Badge>
            <h2 className="text-3xl md:text-4xl font-display font-bold text-foreground mb-3">
              Conversion Packages
            </h2>
            <p className="text-muted-foreground max-w-xl mx-auto">
              Transparent pricing with no hidden charges. Choose the package
              that fits your needs.
            </p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-5xl mx-auto">
            {pricingTiers.map((tier) => (
              <div
                key={tier.name}
                className={`rounded-2xl p-7 flex flex-col ${
                  tier.highlight
                    ? "bg-brand-green text-white shadow-green-glow relative overflow-hidden"
                    : "bg-card border border-border hover:border-brand-green/40"
                } transition-all duration-300`}
              >
                {tier.highlight && (
                  <div className="absolute top-4 right-4">
                    <Badge className="bg-white/20 text-white border-0 text-xs">
                      Most Popular
                    </Badge>
                  </div>
                )}
                <h3
                  className={`text-xl font-bold mb-1 ${tier.highlight ? "text-white" : "text-foreground"}`}
                >
                  {tier.name}
                </h3>
                <div
                  className={`text-4xl font-black mb-2 font-display ${tier.highlight ? "text-white" : "text-brand-green"}`}
                >
                  {tier.price}
                </div>
                <p
                  className={`text-sm mb-6 ${tier.highlight ? "text-white/80" : "text-muted-foreground"}`}
                >
                  {tier.desc}
                </p>
                <ul className="space-y-2.5 mb-8 flex-1">
                  {tier.features.map((f) => (
                    <li key={f} className="flex items-center gap-2 text-sm">
                      <Check
                        className={`h-4 w-4 shrink-0 ${tier.highlight ? "text-white/80" : "text-brand-green"}`}
                      />
                      <span
                        className={
                          tier.highlight
                            ? "text-white/90"
                            : "text-muted-foreground"
                        }
                      >
                        {f}
                      </span>
                    </li>
                  ))}
                </ul>
                <Link to="/contact">
                  <Button
                    className={`w-full font-semibold ${
                      tier.highlight
                        ? "bg-white text-brand-green hover:bg-white/90"
                        : "bg-brand-green hover:bg-brand-green/90 text-white"
                    }`}
                  >
                    Get Started
                  </Button>
                </Link>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* FAQ */}
      <section className="py-20 bg-brand-light-gray">
        <div className="container mx-auto px-4 lg:px-6">
          <div className="max-w-3xl mx-auto">
            <div className="text-center mb-10">
              <Badge className="mb-3 bg-brand-green/10 text-brand-green border-brand-green/20 text-xs uppercase tracking-widest">
                FAQ
              </Badge>
              <h2 className="text-3xl font-display font-bold text-foreground mb-3">
                Common Questions
              </h2>
            </div>
            <Accordion type="single" collapsible className="space-y-3">
              {faqs.map((faq) => (
                <AccordionItem
                  key={faq.q.slice(0, 30)}
                  value={faq.q.slice(0, 30)}
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

      {/* CTA */}
      <section className="py-16 section-gradient">
        <div className="container mx-auto px-4 lg:px-6 text-center">
          <h2 className="text-3xl md:text-4xl font-display font-bold text-white mb-4">
            Ready to Make the Switch?
          </h2>
          <p className="text-white/65 mb-8 max-w-xl mx-auto">
            Book a free inspection today and our experts will assess your
            vehicle for conversion.
          </p>
          <div className="flex flex-wrap justify-center gap-4">
            <Link to="/contact">
              <Button
                size="lg"
                className="bg-brand-green hover:bg-brand-green/90 text-white font-bold px-10"
              >
                Start Conversion Today <ArrowRight className="h-4 w-4 ml-2" />
              </Button>
            </Link>
            <Link to="/contact">
              <Button
                size="lg"
                variant="outline"
                className="border-white/40 text-white hover:bg-white/10 bg-transparent"
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

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
import { useAddConversionInquiry } from "@/hooks/useQueries";
import { Link } from "@tanstack/react-router";
import {
  ArrowRight,
  BadgeDollarSign,
  Check,
  CheckCircle,
  CheckCircle2,
  Leaf,
  Loader2,
  Search,
  Settings,
  Shield,
  Truck,
  Wrench,
  Zap,
} from "lucide-react";
import { useEffect, useState } from "react";
import { toast } from "sonner";

const steps = [
  {
    icon: Search,
    step: "01",
    title: "Inspection",
    desc: "Thorough assessment of your existing vehicle's frame, motor mounts, and electrical system compatibility.",
  },
  {
    icon: BadgeDollarSign,
    step: "02",
    title: "Quotation",
    desc: "We provide a detailed quote with transparent pricing — no hidden charges, full breakdown provided.",
  },
  {
    icon: Settings,
    step: "03",
    title: "Installation",
    desc: "Certified technicians perform the conversion with precision, ensuring all safety standards are met.",
  },
  {
    icon: Wrench,
    step: "04",
    title: "Testing",
    desc: "Comprehensive testing of range, speed, battery, and safety systems before handover.",
  },
  {
    icon: CheckCircle,
    step: "05",
    title: "Delivery",
    desc: "Your converted electric vehicle is handed over with full documentation and RTO compliance.",
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
    desc: "Reduce your carbon footprint. Contribute to a cleaner Telangana.",
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
    a: "Yes, EV conversions may be eligible for state-level subsidies under the Telangana EV Policy. Our team will guide you through the documentation process.",
  },
];

const trustBadges = [
  { icon: Shield, label: "Warranty Supported" },
  { icon: CheckCircle2, label: "Certified Components" },
  { icon: Truck, label: "Local Installation" },
];

const costTable = [
  {
    item: "Fuel / Charging",
    petrol: "₹2,000–3,000",
    electric: "₹200–400",
  },
  {
    item: "Maintenance",
    petrol: "₹500–800",
    electric: "₹100–200",
  },
  {
    item: "Total Monthly",
    petrol: "₹2,500–3,800",
    electric: "₹300–600",
    isBold: true,
  },
  {
    item: "Annual Savings",
    petrol: "—",
    electric: "₹25,000–40,000",
    isHighlight: true,
  },
];

export default function ConversionsPage() {
  const [formSuccess, setFormSuccess] = useState(false);
  const conversionMutation = useAddConversionInquiry();
  const [form, setForm] = useState({
    name: "",
    phone: "",
    bike_model: "",
    location: "",
    petrol_expense: "",
  });

  useEffect(() => {
    document.title = "Petrol to Electric Conversion | JSR Green Motors Kodad";
    let metaDesc = document.querySelector('meta[name="description"]');
    if (!metaDesc) {
      metaDesc = document.createElement("meta");
      (metaDesc as HTMLMetaElement).name = "description";
      document.head.appendChild(metaDesc);
    }
    (metaDesc as HTMLMetaElement).content =
      "Convert your petrol bike or scooter to electric. Save 70% on running costs. Certified EV conversion by JSR Green Motors, Kodad, Telangana.";
  }, []);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setForm((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      await conversionMutation.mutateAsync(form);
      setFormSuccess(true);
    } catch {
      toast.error("Failed to submit. Please try again.");
    }
  };

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
            Convert Your Petrol Bike to Electric &amp;{" "}
            <span className="text-brand-green">
              Save Up to 70% Running Cost
            </span>
          </h1>
          <p className="text-white/70 text-xl max-w-2xl mx-auto mb-8">
            Certified EV conversion with quality components — local installation
            in Kodad, Telangana.
          </p>
          {/* Trust Badges */}
          <div className="flex flex-wrap justify-center gap-3 mb-8">
            {trustBadges.map((badge) => {
              const Icon = badge.icon;
              return (
                <span
                  key={badge.label}
                  className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-brand-green/15 border border-brand-green/30 text-brand-green text-sm font-semibold"
                >
                  <Icon className="h-4 w-4" />
                  {badge.label}
                </span>
              );
            })}
          </div>
          <a href="#conversion-form">
            <Button
              size="lg"
              className="bg-brand-green hover:bg-brand-green/90 text-white font-bold px-10"
              data-ocid="conversion_hero.primary_button"
            >
              Book Free Inspection <ArrowRight className="h-4 w-4 ml-2" />
            </Button>
          </a>
        </div>
      </section>

      {/* Cost Comparison Table */}
      <section className="py-20 bg-background">
        <div className="container mx-auto px-4 lg:px-6">
          <div className="max-w-3xl mx-auto">
            <div className="text-center mb-10">
              <Badge className="mb-3 bg-brand-green/10 text-brand-green border-brand-green/20 text-xs uppercase tracking-widest">
                Cost Comparison
              </Badge>
              <h2 className="text-3xl md:text-4xl font-display font-bold text-foreground mb-3">
                Petrol vs Electric — Real Numbers
              </h2>
              <p className="text-muted-foreground max-w-xl mx-auto">
                Based on 60km daily riding. See how much you save by switching
                to electric.
              </p>
            </div>
            <div className="rounded-2xl border border-border overflow-hidden">
              <div className="grid grid-cols-3 bg-muted/50 text-xs font-semibold uppercase tracking-wider text-muted-foreground border-b border-border">
                <div className="p-4">Item</div>
                <div className="p-4 text-center border-x border-border text-orange-500">
                  ⛽ Petrol Monthly
                </div>
                <div className="p-4 text-center text-brand-green">
                  ⚡ Electric Monthly
                </div>
              </div>
              {costTable.map((row) => (
                <div
                  key={row.item}
                  className={`grid grid-cols-3 border-b border-border last:border-0 ${
                    row.isHighlight
                      ? "bg-brand-green/10"
                      : row.isBold
                        ? "bg-muted/30"
                        : "bg-card"
                  }`}
                >
                  <div
                    className={`p-4 text-sm ${row.isBold || row.isHighlight ? "font-semibold text-foreground" : "text-muted-foreground"}`}
                  >
                    {row.item}
                  </div>
                  <div
                    className={`p-4 text-sm text-center border-x border-border ${row.isHighlight ? "text-muted-foreground" : "text-orange-500 font-medium"}`}
                  >
                    {row.petrol}
                  </div>
                  <div
                    className={`p-4 text-sm text-center font-semibold ${row.isHighlight ? "text-brand-green text-base" : "text-brand-green"}`}
                  >
                    {row.electric}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* How It Works — Horizontal Timeline */}
      <section className="py-20 bg-brand-light-gray">
        <div className="container mx-auto px-4 lg:px-6">
          <div className="text-center mb-12">
            <Badge className="mb-3 bg-brand-green/10 text-brand-green border-brand-green/20 text-xs uppercase tracking-widest">
              Process
            </Badge>
            <h2 className="text-3xl md:text-4xl font-display font-bold text-foreground mb-3">
              How It Works
            </h2>
            <p className="text-muted-foreground max-w-xl mx-auto">
              Our proven 5-step conversion process ensures a safe, certified,
              and high-quality transformation.
            </p>
          </div>
          {/* Desktop: horizontal timeline */}
          <div className="hidden lg:flex items-start gap-0 overflow-x-auto">
            {steps.map((step, idx) => {
              const Icon = step.icon;
              return (
                <div
                  key={step.step}
                  className="flex flex-col items-center flex-1 min-w-0"
                >
                  {/* Step connector */}
                  <div className="flex items-center w-full mb-6">
                    <div
                      className={`w-10 h-10 rounded-full flex items-center justify-center shrink-0 z-10 ${idx === 0 ? "ml-auto mr-0" : idx === steps.length - 1 ? "ml-0 mr-auto" : "mx-auto"} bg-brand-green text-white font-bold text-sm`}
                    >
                      {step.step}
                    </div>
                    {idx < steps.length - 1 && (
                      <div className="flex-1 h-0.5 bg-brand-green/30" />
                    )}
                  </div>
                  <div className="bg-card border border-border rounded-2xl p-5 hover:border-brand-green/40 hover:shadow-green-glow-sm transition-all duration-300 mx-2 w-full">
                    <div className="w-10 h-10 rounded-xl bg-brand-green/10 flex items-center justify-center mb-3">
                      <Icon className="h-5 w-5 text-brand-green" />
                    </div>
                    <h3 className="font-semibold text-foreground mb-1 text-sm">
                      {step.title}
                    </h3>
                    <p className="text-muted-foreground text-xs leading-relaxed">
                      {step.desc}
                    </p>
                  </div>
                </div>
              );
            })}
          </div>
          {/* Mobile: vertical */}
          <div className="lg:hidden grid grid-cols-1 sm:grid-cols-2 gap-6">
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
      <section className="py-20 bg-background">
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
      <section className="py-20 bg-brand-light-gray">
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
                <a href="#conversion-form">
                  <Button
                    className={`w-full font-semibold ${
                      tier.highlight
                        ? "bg-white text-brand-green hover:bg-white/90"
                        : "bg-brand-green hover:bg-brand-green/90 text-white"
                    }`}
                    data-ocid={`conversion_packages.${tier.name.toLowerCase()}_button`}
                  >
                    Get Started
                  </Button>
                </a>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Conversion Inquiry Form */}
      <section id="conversion-form" className="py-20 bg-background">
        <div className="container mx-auto px-4 lg:px-6">
          <div className="max-w-2xl mx-auto">
            <div className="text-center mb-10">
              <Badge className="mb-3 bg-brand-green/10 text-brand-green border-brand-green/20 text-xs uppercase tracking-widest">
                Book Now
              </Badge>
              <h2 className="text-3xl font-display font-bold text-foreground mb-3">
                Request Free Inspection
              </h2>
              <p className="text-muted-foreground">
                Fill the form below and our conversion expert will contact you
                to schedule a free vehicle inspection.
              </p>
            </div>

            {formSuccess ? (
              <div
                className="bg-card border border-brand-green/20 rounded-2xl p-10 text-center"
                data-ocid="conversion_form.success_state"
              >
                <CheckCircle2 className="h-16 w-16 text-brand-green mx-auto mb-4" />
                <h3 className="text-2xl font-semibold text-foreground mb-3">
                  Request Received!
                </h3>
                <p className="text-muted-foreground mb-6">
                  Thank you for contacting JSR Green Motors. Our EV Expert will
                  reach you shortly.
                </p>
                <Button
                  onClick={() => {
                    setFormSuccess(false);
                    setForm({
                      name: "",
                      phone: "",
                      bike_model: "",
                      location: "",
                      petrol_expense: "",
                    });
                  }}
                  className="bg-brand-green hover:bg-brand-green/90 text-white"
                >
                  Submit Another
                </Button>
              </div>
            ) : (
              <form
                onSubmit={handleSubmit}
                className="bg-card border border-border rounded-2xl p-8 space-y-5"
                style={{
                  boxShadow:
                    "0 0 0 2px oklch(0.62 0.19 155 / 0.15), 0 8px 30px rgba(0,0,0,0.08)",
                }}
              >
                <div className="grid sm:grid-cols-2 gap-4">
                  <div className="space-y-1.5">
                    <Label htmlFor="conv-name">Full Name</Label>
                    <Input
                      id="conv-name"
                      name="name"
                      placeholder="Your name"
                      value={form.name}
                      onChange={handleChange}
                      data-ocid="conversion_form.name_input"
                    />
                  </div>
                  <div className="space-y-1.5">
                    <Label htmlFor="conv-phone">
                      Phone <span className="text-destructive">*</span>
                    </Label>
                    <Input
                      id="conv-phone"
                      name="phone"
                      type="tel"
                      placeholder="+91 XXXXX XXXXX"
                      value={form.phone}
                      onChange={handleChange}
                      required
                      data-ocid="conversion_form.phone_input"
                    />
                  </div>
                </div>
                <div className="space-y-1.5">
                  <Label htmlFor="conv-bike">
                    Bike Model <span className="text-destructive">*</span>
                  </Label>
                  <Input
                    id="conv-bike"
                    name="bike_model"
                    placeholder="e.g. Honda Activa 125, Bajaj Pulsar 150"
                    value={form.bike_model}
                    onChange={handleChange}
                    required
                    data-ocid="conversion_form.bike_model_input"
                  />
                </div>
                <div className="grid sm:grid-cols-2 gap-4">
                  <div className="space-y-1.5">
                    <Label htmlFor="conv-location">Your Location/City</Label>
                    <Input
                      id="conv-location"
                      name="location"
                      placeholder="Your city or area"
                      value={form.location}
                      onChange={handleChange}
                      data-ocid="conversion_form.location_input"
                    />
                  </div>
                  <div className="space-y-1.5">
                    <Label htmlFor="conv-petrol">
                      Approx. Monthly Petrol Expense
                    </Label>
                    <Input
                      id="conv-petrol"
                      name="petrol_expense"
                      placeholder="e.g. ₹2,500"
                      value={form.petrol_expense}
                      onChange={handleChange}
                      data-ocid="conversion_form.petrol_expense_input"
                    />
                  </div>
                </div>
                <Button
                  type="submit"
                  disabled={conversionMutation.isPending}
                  className="w-full bg-brand-green hover:bg-brand-green/90 text-white font-bold text-base py-6"
                  style={{ boxShadow: "0 0 20px oklch(0.62 0.19 155 / 0.3)" }}
                  data-ocid="conversion_form.submit_button"
                >
                  {conversionMutation.isPending ? (
                    <>
                      <Loader2 className="h-5 w-5 mr-2 animate-spin" />
                      Submitting...
                    </>
                  ) : (
                    "Book Free Inspection"
                  )}
                </Button>
              </form>
            )}
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
            vehicle for conversion. Call{" "}
            <a
              href="tel:+919948955517"
              className="text-brand-green hover:underline"
            >
              +91 9948955517
            </a>
          </p>
          <div className="flex flex-wrap justify-center gap-4">
            <a href="#conversion-form">
              <Button
                size="lg"
                className="bg-brand-green hover:bg-brand-green/90 text-white font-bold px-10"
                data-ocid="conversion_cta.primary_button"
              >
                Start Conversion Today <ArrowRight className="h-4 w-4 ml-2" />
              </Button>
            </a>
            <Link to="/contact">
              <Button
                size="lg"
                variant="outline"
                className="border-white/40 text-white hover:bg-white/10 bg-transparent"
                data-ocid="conversion_cta.contact_button"
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

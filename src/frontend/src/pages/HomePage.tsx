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
import { calculateEMI, formatPrice, getVehicleImage } from "@/utils/helpers";
import { Link } from "@tanstack/react-router";
import {
  ArrowRight,
  Award,
  Battery,
  Check,
  ChevronRight,
  Gauge,
  GraduationCap,
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
  TrendingUp,
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
    extra: "20+ brands, 100+ models",
    topBorder: "border-t-brand-green",
    topBorderStyle: { borderTopColor: "oklch(0.62 0.19 155)" },
  },
  {
    icon: Wrench,
    title: "Service & Maintenance",
    desc: "Battery diagnostics, controller service, upgrades & repairs.",
    extra: "Same-day diagnostics available",
    topBorder: "border-t-blue-500",
    topBorderStyle: { borderTopColor: "#3b82f6" },
  },
  {
    icon: RefreshCw,
    title: "EV Conversion",
    desc: "Convert your petrol vehicle into a modern electric vehicle.",
    extra: "Starting from \u20b925,000",
    topBorder: "border-t-orange-500",
    topBorderStyle: { borderTopColor: "#f97316" },
  },
  {
    icon: Handshake,
    title: "Franchise",
    desc: "Join our growing network and build your EV business.",
    extra: "Low investment, high margins",
    topBorder: "border-t-purple-500",
    topBorderStyle: { borderTopColor: "#a855f7" },
  },
];

const benefits = [
  {
    icon: Award,
    title: "Multi-Brand Expertise",
    desc: "We offer multiple EV brands under one roof \u2014 more choice, better value.",
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
    desc: "From purchase to service to upgrades \u2014 we're with you every step.",
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
    desc: "We stay with you after the sale \u2014 service, upgrades, spares.",
  },
  {
    title: "Local trust & network",
    desc: "Rooted in Telangana, trusted by thousands across the region.",
  },
];

const franchiseBenefits = [
  {
    icon: TrendingUp,
    title: "Strong Supplier Network",
    desc: "Access to 20+ EV brands, ensuring variety and competitive pricing for your customers.",
  },
  {
    icon: GraduationCap,
    title: "Technical Training Support",
    desc: "Comprehensive EV servicing and sales training provided by certified JSR experts.",
  },
  {
    icon: Zap,
    title: "Marketing & Branding",
    desc: "Full JSR branding, marketing collateral, and digital presence support included.",
  },
  {
    icon: HeartHandshake,
    title: "Attractive Margins",
    desc: "High profit margins with a proven business model and growing EV demand across Telangana.",
  },
];

const testimonials = [
  {
    name: "Ravi Kumar",
    city: "Kodad",
    vehicle: "Dynamo RX1",
    quote:
      "Best EV showroom in Telangana. Bought my Dynamo RX1 six months ago and the service support is excellent. Saving around \u20b92,500 per month on fuel!",
    rating: 5,
  },
  {
    name: "Priya Reddy",
    city: "Suryapet",
    vehicle: "Batt:RE ONE",
    quote:
      "The team helped me compare 5 different brands honestly. No pressure at all. My Batt:RE ONE gets 90+ km per charge \u2014 perfect for my daily commute.",
    rating: 5,
  },
  {
    name: "Nagaraju M.",
    city: "Haliya",
    vehicle: "EV Conversion",
    quote:
      "Got my old Honda Activa converted to electric by JSR. Saving \u20b93,000 per month on fuel. Highly recommend JSR Electric Vehicles!",
    rating: 5,
  },
  {
    name: "Suresh Babu",
    city: "Nalgonda",
    vehicle: "Revolt RV400",
    quote:
      "The Revolt RV400 is an amazing bike. JSR gave me the best price and handled all RTO paperwork. Delivery was on time and hassle-free.",
    rating: 5,
  },
  {
    name: "Lakshmi Devi",
    city: "Khammam",
    vehicle: "Goeen Chalo",
    quote:
      "As a first-time EV buyer, I was nervous. The staff at JSR explained everything patiently. My Goeen Chalo is smooth and silent \u2014 love riding it!",
    rating: 5,
  },
  {
    name: "Venkatesh Rao",
    city: "Munagala",
    vehicle: "Dynamo Lima",
    quote:
      "Bought the Dynamo Lima for my wife. \u20b9500 per month on electricity vs \u20b93,500 on petrol earlier. The savings are incredible. Thank you JSR!",
    rating: 5,
  },
  {
    name: "Anitha Kumari",
    city: "Warangal",
    vehicle: "OPG FAAST F3",
    quote:
      "OPG FAAST F3 is my daily commute vehicle now. Excellent mileage, smooth ride, and JSR gave me an easy EMI option. Very happy customer!",
    rating: 5,
  },
  {
    name: "Kavitha Nair",
    city: "Hyderabad",
    vehicle: "Dynamo X1",
    quote:
      "Bought the Dynamo X1 for my daughter's college commute. The team at JSR is very trustworthy \u2014 they followed up even after purchase to check if everything is fine.",
    rating: 5,
  },
  {
    name: "Mohan Krishna",
    city: "Miryalaguda",
    vehicle: "OPG DEFY 22",
    quote:
      "EMI was arranged in just 3 days and the vehicle was delivered to my doorstep. The OPG DEFY 22 handles beautifully. Truly the best EV dealer in our area.",
    rating: 5,
  },
  {
    name: "Sreedhar Reddy",
    city: "Vijayawada",
    vehicle: "Revolt RV1+",
    quote:
      "I drove 100km from Vijayawada to test ride the Revolt RV1+ at JSR. Totally worth it! Best bike in its range and the price was unbeatable.",
    rating: 5,
  },
  {
    name: "Madhuri Pullaiah",
    city: "Suryapet",
    vehicle: "Kinetic E-Luna",
    quote:
      "The Kinetic E-Luna is perfect for my vegetable delivery business. Low running cost, great range. JSR team helped me get a commercial loan easily.",
    rating: 5,
  },
  {
    name: "Ramaiah Goud",
    city: "Nalgonda",
    vehicle: "iVOOMi S1 Lite",
    quote:
      "iVOOMi S1 Lite from JSR is my best investment. \u20b9350 charging cost vs \u20b93,200 petrol monthly. JSR team provided after-sales service with zero issues.",
    rating: 5,
  },
];

const faqs = [
  {
    q: "What brands of electric vehicles do you sell?",
    a: "We stock Dynamo, OPG Mobility, Batt:RE, Revolt Motors, Kinetic Green, Goeen, and iVOOMi \u2014 7 premium EV brands with 50+ models under one roof. We are the widest multi-brand EV showroom in the Kodad-Suryapet region. Call +91 9948955517 or visit us to see the full range.",
  },
  {
    q: "Do you offer test rides?",
    a: "Yes, free test rides are available at our showroom in Kodad. Simply call +91 9948955517, WhatsApp us, or click 'Book Free Test Ride' to schedule yours. Test rides are available Monday to Saturday 9AM-7PM and Sunday 10AM-5PM.",
  },
  {
    q: "What is the cost of petrol to electric conversion?",
    a: "Conversion packages start from \u20b925,000 for basic scooters and go up to \u20b960,000 for premium motorcycle conversions. All kits are certified and include a 6-month to 2-year warranty. Visit our Conversions page or call us for a custom quote.",
  },
  {
    q: "Do you provide EMI financing?",
    a: "Yes, we work with leading banks to offer flexible EMI options starting from as low as \u20b91,500/month. Our team will guide you through documentation, loan approval, and delivery \u2014 usually within 3-5 working days.",
  },
  {
    q: "Where are your showrooms located?",
    a: "Head Office: Suryapet road, beside Kashinadam function hall, Kodad, Suryapet District, Telangana-508206. We also have branches in Haliya (Nalgonda Dist), Suryapet Town, and Munagala. Call each branch directly or visit us for assistance.",
  },
  {
    q: "What warranty do you provide?",
    a: "All new vehicles come with manufacturer warranty \u2014 typically 2-3 years on battery and 1-2 years on motor. EV conversions carry 6-month to 2-year warranty depending on the kit selected. JSR Electric Vehicles also provides after-sales service throughout the warranty period.",
  },
  {
    q: "How long does EV conversion take?",
    a: "A standard petrol-to-electric conversion takes 3-7 working days depending on the vehicle type and kit selected. We keep you updated throughout the process. Drop your vehicle at our Kodad workshop and we'll handle everything including RTO re-registration assistance.",
  },
  {
    q: "Do you offer home test rides?",
    a: "Yes! For customers within 30km of our Kodad showroom, we offer doorstep test ride delivery for select models. Call +91 9948955517 to check eligibility for your area. Standard showroom test rides are always free and available daily.",
  },
];

// WhatsApp SVG icon component
function WhatsAppIcon({ className }: { className?: string }) {
  return (
    <svg
      className={className}
      viewBox="0 0 24 24"
      fill="currentColor"
      aria-hidden="true"
    >
      <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413Z" />
    </svg>
  );
}

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
        {/* Cinematic overlay */}
        <div className="hero-overlay absolute inset-0 z-[1]" />
        {/* Green edge-light accent */}
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

            {/* CTA buttons with clear hierarchy */}
            <div className="hero-cta-animate flex flex-wrap gap-3 mb-6">
              {/* PRIMARY: solid green */}
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
              {/* SECONDARY: outlined white */}
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
              {/* TERTIARY: text link with arrow */}
              <Link
                to="/conversions"
                className="inline-flex items-center gap-1.5 text-white/75 hover:text-white text-base font-medium transition-colors px-2 py-3"
                data-ocid="hero.link"
              >
                Convert to Electric <ArrowRight className="h-4 w-4" />
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

            {/* Stats row — 4 items */}
            <div className="hero-stats-animate flex flex-wrap gap-8 mt-10 pt-8 border-t border-white/15">
              {[
                { value: "20+", label: "Brands" },
                { value: "500+", label: "Happy Customers" },
                { value: "5+", label: "Years Experience" },
                { value: "20+", label: "Dealers" },
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

      {/* Lead Capture Form — dark background with trust points */}
      <section
        ref={leadFormRef}
        className="py-14"
        style={{
          background:
            "linear-gradient(135deg, oklch(0.08 0.01 145) 0%, oklch(0.12 0.03 155) 100%)",
        }}
      >
        <div className="container mx-auto px-4 lg:px-6">
          <div className="max-w-4xl mx-auto grid md:grid-cols-2 gap-8 items-center">
            {/* Left column — trust points */}
            <div className="text-white">
              <div className="inline-flex items-center gap-2 mb-4 px-3 py-1 rounded-full bg-brand-green/15 border border-brand-green/30">
                <span className="w-2 h-2 rounded-full bg-brand-green animate-pulse" />
                <span className="text-brand-green text-xs font-semibold uppercase tracking-wider">
                  Our EV Expert Will Call You Shortly
                </span>
              </div>
              <h2 className="text-2xl md:text-3xl font-display font-bold mb-6">
                Get a Callback in 10 Minutes
              </h2>
              <ul className="space-y-4">
                <li className="flex items-start gap-3">
                  <span className="text-xl mt-0.5">⚡</span>
                  <div>
                    <div className="font-semibold text-white">
                      Response within 10 minutes
                    </div>
                    <div className="text-white/55 text-sm">
                      Our EV experts respond fast \u2014 no long waits.
                    </div>
                  </div>
                </li>
                <li className="flex items-start gap-3">
                  <span className="text-xl mt-0.5">✓</span>
                  <div>
                    <div className="font-semibold text-white">
                      No spam, no pressure
                    </div>
                    <div className="text-white/55 text-sm">
                      We respect your time. Honest advice only.
                    </div>
                  </div>
                </li>
                <li className="flex items-start gap-3">
                  <span className="text-xl mt-0.5">📍</span>
                  <div>
                    <div className="font-semibold text-white">
                      Serving 20+ locations across Telangana
                    </div>
                    <div className="text-white/55 text-sm">
                      From Kodad to Hyderabad \u2014 we're near you.
                    </div>
                  </div>
                </li>
              </ul>
              <div className="mt-6 flex items-center gap-3">
                <img
                  src="/assets/uploads/JSR_LOGO-2.png"
                  alt="JSR Electric Vehicles"
                  className="h-10 w-auto object-contain opacity-80"
                />
                <span className="text-white/50 text-sm">
                  JSR Electric Vehicles
                </span>
              </div>
            </div>

            {/* Right column — form */}
            <div
              className="rounded-2xl p-6"
              style={{
                background: "oklch(1 0 0)",
                boxShadow:
                  "0 0 0 2px oklch(0.62 0.19 155 / 0.35), 0 20px 50px rgba(0,0,0,0.25)",
              }}
            >
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
                        Interested In{" "}
                        <span className="text-destructive">*</span>
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
                        <Loader2 className="h-4 w-4 mr-2 animate-spin" />
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
        </div>
      </section>

      {/* Services Overview — 2x2 grid on desktop with colored borders */}
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
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 max-w-3xl mx-auto">
            {services.map((svc) => {
              const Icon = svc.icon;
              return (
                <div
                  key={svc.title}
                  className="bg-card border border-border rounded-2xl p-6 hover:border-brand-green/40 hover:shadow-green-glow-sm transition-all duration-300 group"
                  style={{
                    borderTop: "3px solid",
                    ...svc.topBorderStyle,
                  }}
                >
                  <div className="w-12 h-12 rounded-xl bg-brand-green/10 flex items-center justify-center mb-4 group-hover:bg-brand-green/20 transition-colors">
                    <Icon className="h-6 w-6 text-brand-green" />
                  </div>
                  <h3 className="font-semibold text-foreground mb-2">
                    {svc.title}
                  </h3>
                  <p className="text-muted-foreground text-sm leading-relaxed mb-2">
                    {svc.desc}
                  </p>
                  <span className="inline-block text-xs font-semibold text-brand-green bg-brand-green/10 px-2.5 py-1 rounded-full">
                    {svc.extra}
                  </span>
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
              {featuredVehicles.slice(0, 6).map((vehicle) => {
                // Approximate starting EMI at 8.5% for 36 months
                const emi = calculateEMI(
                  Number(vehicle.price_min) * 0.8,
                  8.5,
                  36,
                );
                return (
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
                    {/* Image */}
                    <div className="relative overflow-hidden h-52">
                      <img
                        src={getVehicleImage(
                          vehicle.id,
                          vehicle.brand,
                          vehicle.name,
                        )}
                        alt={vehicle.name}
                        className="w-full h-full object-contain group-hover:scale-105 transition-transform duration-700"
                        onError={(e) => {
                          e.currentTarget.src =
                            "/assets/uploads/JSR_LOGO-2.png";
                        }}
                      />
                      <div className="absolute top-3 left-3 flex gap-2">
                        <span className="px-2.5 py-1 rounded-full text-xs font-semibold bg-brand-green/90 text-white backdrop-blur-sm">
                          {vehicle.category}
                        </span>
                      </div>
                      <div className="absolute bottom-0 left-0 right-0 h-16 bg-gradient-to-t from-card to-transparent" />
                    </div>

                    <div className="px-5 pb-5 -mt-1">
                      <h3 className="font-bold text-foreground text-base leading-tight">
                        {vehicle.name}
                      </h3>
                      <p className="text-muted-foreground text-xs mt-0.5 mb-4 font-medium uppercase tracking-wide">
                        {vehicle.brand}
                      </p>

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
                          {emi > 0 && (
                            <div className="text-xs text-muted-foreground mt-0.5">
                              Starting EMI from \u20b9
                              {emi.toLocaleString("en-IN")}/mo
                            </div>
                          )}
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
                );
              })}
            </div>
          ) : (
            <div className="flex items-center justify-center py-12">
              <Loader2 className="h-8 w-8 animate-spin text-brand-green" />
            </div>
          )}

          {/* Full-width solid green View All Vehicles button */}
          <div className="mt-8">
            <Link to="/vehicles">
              <Button
                className="w-full bg-brand-green hover:bg-brand-green/90 text-white font-bold text-base py-6"
                style={{ boxShadow: "0 0 20px oklch(0.62 0.19 155 / 0.25)" }}
                data-ocid="featured_vehicles.view_all_button"
              >
                View All Vehicles <ArrowRight className="h-5 w-5 ml-2" />
              </Button>
            </Link>
          </div>
        </div>
      </section>

      {/* Why Choose Us — merged with Our Difference */}
      <section className="py-20 section-gradient">
        <div className="container mx-auto px-4 lg:px-6">
          <div className="text-center mb-12">
            <Badge className="mb-3 bg-brand-green/20 text-brand-green border-brand-green/30 text-xs uppercase tracking-widest">
              Why JSR Electric Vehicles
            </Badge>
            <h2 className="text-3xl md:text-4xl font-display font-bold text-white mb-3">
              Why Choose Us?
            </h2>
            <p className="text-white/60 max-w-2xl mx-auto text-lg font-medium">
              We Are Not Just a Dealer.{" "}
              <span className="text-brand-green">
                We Are Electric Mobility Specialists.
              </span>
            </p>
          </div>
          <div className="grid md:grid-cols-2 gap-10 items-start max-w-5xl mx-auto">
            {/* Left: 4 icon+text cards in 2x2 grid */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {benefits.map((benefit) => {
                const Icon = benefit.icon;
                return (
                  <div
                    key={benefit.title}
                    className="p-5 rounded-2xl bg-white/5 border border-white/10 hover:bg-white/8 hover:border-brand-green/30 transition-all duration-300"
                  >
                    <div className="w-11 h-11 rounded-xl bg-brand-green/15 flex items-center justify-center mb-3">
                      <Icon className="h-5 w-5 text-brand-green" />
                    </div>
                    <h3 className="font-semibold text-white mb-1 text-sm">
                      {benefit.title}
                    </h3>
                    <p className="text-white/55 text-xs leading-relaxed">
                      {benefit.desc}
                    </p>
                  </div>
                );
              })}
            </div>
            {/* Right: checklist */}
            <div className="space-y-4">
              <h3 className="text-xl font-bold text-white mb-6">
                Our Difference
              </h3>
              {brandAuthority.map((item) => (
                <div
                  key={item.title}
                  className="flex gap-4 p-4 rounded-2xl bg-white/5 border border-white/10 hover:border-brand-green/40 transition-all duration-300"
                >
                  <div className="w-7 h-7 rounded-full bg-brand-green flex items-center justify-center shrink-0 mt-0.5">
                    <Check className="h-3.5 w-3.5 text-white" />
                  </div>
                  <div>
                    <h4 className="font-semibold text-white mb-1 text-sm">
                      {item.title}
                    </h4>
                    <p className="text-white/55 text-xs leading-relaxed">
                      {item.desc}
                    </p>
                  </div>
                </div>
              ))}
            </div>
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
              {/* Address + Get Directions */}
              <div
                className="rounded-2xl p-5 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3"
                style={{
                  background: "oklch(0.12 0.02 155)",
                  border: "1px solid oklch(0.62 0.19 155 / 0.2)",
                }}
              >
                <div>
                  <div className="text-brand-green font-semibold text-sm mb-1">
                    JSR Electric Vehicles \u2014 Kodad
                  </div>
                  <div className="text-white/60 text-xs leading-relaxed">
                    Suryapet road, beside Kashinadam function hall,
                    <br />
                    Kodad, Suryapet Dist, Telangana\u2013508206
                  </div>
                </div>
                <a
                  href="https://www.google.com/maps?q=16.9980,79.9730"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="shrink-0 inline-flex items-center gap-1.5 bg-brand-green hover:bg-brand-green/90 text-white text-xs font-semibold px-4 py-2 rounded-lg transition-colors"
                >
                  <MapPin className="h-3.5 w-3.5" /> Get Directions
                </a>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Testimonials — 3-column grid */}
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
                  &quot;{t.quote}&quot;
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
                      {t.vehicle} · {t.city}
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

      {/* EV Conversion Promo — dark green-to-black gradient */}
      <section
        className="py-20 relative overflow-hidden"
        style={{
          background:
            "linear-gradient(135deg, oklch(0.08 0.01 145) 0%, oklch(0.14 0.08 155) 50%, oklch(0.06 0.01 145) 100%)",
        }}
      >
        <div className="absolute inset-0 opacity-20 pointer-events-none">
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
            Switch to Electric &amp; Save Up to 70%
          </p>
          <p className="text-white/70 max-w-2xl mx-auto mb-8 text-lg">
            Convert your existing scooter or bike with certified EV kits. Enjoy
            low maintenance, zero fuel cost, and eco-friendly rides across
            Telangana.
          </p>
          <Link to="/conversions">
            <Button
              size="lg"
              className="bg-brand-green hover:bg-brand-green/90 text-white font-bold px-10 py-3 text-base shadow-lg"
              data-ocid="conversion_promo.primary_button"
            >
              Start Conversion Today <ArrowRight className="h-4 w-4 ml-2" />
            </Button>
          </Link>
        </div>
      </section>

      {/* Franchise Section — 2x2 icon cards */}
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
              <p className="text-muted-foreground mb-4 leading-relaxed">
                Become a JSR Electric Vehicles franchise partner and be part of
                India's fastest-growing EV movement. Build a successful business
                with our proven model.
              </p>
              {/* Investment callout */}
              <div
                className="mb-6 px-4 py-3 rounded-xl border"
                style={{
                  background: "oklch(0.62 0.19 155 / 0.08)",
                  borderColor: "oklch(0.62 0.19 155 / 0.3)",
                }}
              >
                <span className="text-brand-green font-bold text-lg">
                  Investment starting from \u20b95\u201310 Lakhs
                </span>
                <span className="text-muted-foreground text-sm ml-2">
                  \u2014 low risk, high return
                </span>
              </div>
              {/* 2x2 cards */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 mb-6">
                {franchiseBenefits.map((benefit) => {
                  const Icon = benefit.icon;
                  return (
                    <div
                      key={benefit.title}
                      className="flex gap-3 p-4 rounded-xl bg-card border border-border hover:border-brand-green/40 transition-all duration-300"
                    >
                      <div className="w-9 h-9 rounded-lg bg-brand-green/10 flex items-center justify-center shrink-0">
                        <Icon className="h-4 w-4 text-brand-green" />
                      </div>
                      <div>
                        <div className="font-semibold text-foreground text-sm mb-0.5">
                          {benefit.title}
                        </div>
                        <div className="text-muted-foreground text-xs leading-snug">
                          {benefit.desc}
                        </div>
                      </div>
                    </div>
                  );
                })}
              </div>
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
              {/* WhatsApp quick-link */}
              <a
                href="https://wa.me/919948955517?text=Hello%20JSR%20Electric%20Vehicles%2C%20I%20want%20to%20go%20electric!"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 bg-[#25D366] hover:bg-[#128C7E] text-white font-bold px-6 py-3 rounded-md transition-all"
                data-ocid="contact_strip.whatsapp_button"
              >
                <WhatsAppIcon className="h-4 w-4" />
                WhatsApp Us
              </a>
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
          <WhatsAppIcon className="h-5 w-5 text-brand-green" />
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

      {/* Floating WhatsApp */}
      <a
        href="https://wa.me/919948955517?text=Hello%20JSR%20Electric%20Vehicles%2C%20I%20want%20information%20about%20EV%20vehicles."
        target="_blank"
        rel="noopener noreferrer"
        className="fixed bottom-20 md:bottom-6 right-4 md:right-6 z-40 w-14 h-14 rounded-full flex items-center justify-center shadow-xl hover:scale-110 transition-transform"
        style={{ background: "#25D366" }}
        aria-label="WhatsApp Chat"
        data-ocid="floating.whatsapp_button"
      >
        <WhatsAppIcon className="h-7 w-7 text-white" />
      </a>

      <QuoteModal open={quoteOpen} onClose={() => setQuoteOpen(false)} />
    </main>
  );
}

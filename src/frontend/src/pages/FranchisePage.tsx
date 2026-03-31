import { PhoneOtpVerifier } from "@/components/PhoneOtpVerifier";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { useAddFranchiseApplication } from "@/hooks/useQueries";
import { saveLead } from "@/lib/supabase";
import {
  ArrowRight,
  CheckCircle2,
  ClipboardList,
  GraduationCap,
  Loader2,
  Megaphone,
  Package,
  Rocket,
  TrendingUp,
  UserCheck,
} from "lucide-react";
import { useEffect, useState } from "react";
import { toast } from "sonner";

const benefits = [
  {
    icon: Package,
    title: "Setup Assistance",
    desc: "We help you set up your showroom from scratch — layout, branding, and display planning.",
  },
  {
    icon: GraduationCap,
    title: "Technical Training",
    desc: "Full training for your team on EV sales, service, and customer handling.",
  },
  {
    icon: Megaphone,
    title: "Branding Support",
    desc: "Complete branding kit, marketing materials, and digital marketing assistance.",
  },
  {
    icon: TrendingUp,
    title: "Supply Chain Support",
    desc: "Direct access to 20+ brand suppliers with competitive pricing and margins.",
  },
];

const steps = [
  {
    icon: ClipboardList,
    step: "01",
    title: "Apply",
    desc: "Fill out the franchise application form with your business details and investment capacity.",
  },
  {
    icon: UserCheck,
    step: "02",
    title: "Review",
    desc: "Our franchise team reviews your application and schedules a consultation meeting.",
  },
  {
    icon: Rocket,
    step: "03",
    title: "Launch",
    desc: "Complete onboarding, store setup, and launch your JSR Electric Vehicles franchise.",
  },
];

export default function FranchisePage() {
  const [success, setSuccess] = useState(false);
  const [otpVerified, setOtpVerified] = useState(false);
  const franchiseMutation = useAddFranchiseApplication();
  const [form, setForm] = useState({
    name: "",
    email: "",
    phone: "",
    city: "",
    state: "",
    investment_capacity: "",
    message: "",
  });

  useEffect(() => {
    document.title =
      "EV Franchise Opportunity Telangana | JSR Electric Vehicles";
    let metaDesc = document.querySelector('meta[name="description"]');
    if (!metaDesc) {
      metaDesc = document.createElement("meta");
      (metaDesc as HTMLMetaElement).name = "description";
      document.head.appendChild(metaDesc);
    }
    (metaDesc as HTMLMetaElement).content =
      "Start your own electric vehicle business with JSR Electric Vehicles. Franchise opportunities in Telangana and Andhra Pradesh. Investment starting from ₹5 Lakhs.";
  }, []);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
  ) => {
    if (e.target.name === "phone") setOtpVerified(false);
    setForm((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!otpVerified) {
      toast.error("Please verify your phone number before submitting.");
      return;
    }
    const investmentCapacity = BigInt(
      Number.parseInt(form.investment_capacity, 10) || 0,
    );
    try {
      await franchiseMutation.mutateAsync({
        ...form,
        investment_capacity: investmentCapacity,
      });
    } catch {
      // best-effort save, continue to WhatsApp regardless
    }
    // Open WhatsApp with pre-filled franchise details
    const msg = encodeURIComponent(
      `Hello JSR Electric Vehicles,\n\nI am interested in your Franchise Opportunity.\n\nName: ${form.name}\nPhone: ${form.phone}\nEmail: ${form.email}\nCity: ${form.city}\nState: ${form.state}\nInvestment Budget: ₹${form.investment_capacity}\nMessage: ${form.message || "N/A"}`,
    );
    saveLead({
      form_type: "franchise",
      name: form.name,
      phone: form.phone,
      email: form.email,
      message: `City: ${form.city}, State: ${form.state}. ${form.message || ""}`,
    }).catch(() => {});
    window.open(`https://wa.me/919948955517?text=${msg}`, "_blank");
    setSuccess(true);
    toast.success(
      "Redirecting to WhatsApp — our franchise team will reach you soon!",
    );
  };

  return (
    <main className="pt-20">
      {/* Hero */}
      <section className="relative py-20 overflow-hidden">
        <div
          className="absolute inset-0 bg-cover bg-center"
          style={{
            backgroundImage:
              "url('/assets/generated/franchise-showroom.dim_800x500.jpg')",
          }}
        />
        <div className="absolute inset-0 bg-brand-dark/85" />
        <div className="relative z-10 container mx-auto px-4 lg:px-6 text-center">
          <Badge className="mb-4 bg-brand-green/20 text-brand-green border-brand-green/30 text-xs uppercase tracking-widest">
            Business Opportunity
          </Badge>
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-display font-bold text-white mb-6">
            Start Your Own{" "}
            <span className="text-brand-green">Electric Vehicle Business</span>{" "}
            With JSR Electric Vehicles
          </h1>
          <p className="text-white/70 text-xl max-w-2xl mx-auto">
            Join India's fastest-growing EV network. Build a profitable business
            with JSR Electric Vehicles' proven franchise model.
          </p>
        </div>
      </section>

      {/* Why EV Business Now? */}
      <section className="py-16 bg-background">
        <div className="container mx-auto px-4 lg:px-6">
          <div className="text-center mb-10">
            <Badge className="mb-3 bg-brand-green/10 text-brand-green border-brand-green/20 text-xs uppercase tracking-widest">
              Market Opportunity
            </Badge>
            <h2 className="text-3xl md:text-4xl font-display font-bold text-foreground mb-3">
              Why EV Business Now?
            </h2>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-4xl mx-auto">
            {[
              {
                stat: "40%",
                label: "EV market growing annually",
                desc: "India's EV market is one of the fastest-growing in Asia — now is the time to enter.",
              },
              {
                stat: "↑ Rising",
                label: "Petrol prices every year",
                desc: "Customers are actively switching. The demand for affordable EVs has never been higher.",
              },
              {
                stat: "30%",
                label: "Govt. EV adoption target by 2030",
                desc: "Government subsidies, policy support, and tax breaks make EV business highly profitable.",
              },
            ].map((item) => (
              <div
                key={item.stat}
                className="bg-card border border-border rounded-2xl p-6 text-center hover:border-brand-green/40 transition-all"
              >
                <div
                  className="text-4xl font-black font-display mb-2"
                  style={{ color: "oklch(0.62 0.19 155)" }}
                >
                  {item.stat}
                </div>
                <h3 className="font-semibold text-foreground mb-2 text-sm uppercase tracking-wide">
                  {item.label}
                </h3>
                <p className="text-muted-foreground text-sm leading-relaxed">
                  {item.desc}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Benefits */}
      <section className="py-20 bg-brand-light-gray">
        <div className="container mx-auto px-4 lg:px-6">
          <div className="text-center mb-12">
            <Badge className="mb-3 bg-brand-green/10 text-brand-green border-brand-green/20 text-xs uppercase tracking-widest">
              Why Partner With Us
            </Badge>
            <h2 className="text-3xl md:text-4xl font-display font-bold text-foreground mb-3">
              Support You Receive
            </h2>
            <p className="text-muted-foreground max-w-xl mx-auto">
              Our franchise partners benefit from a complete ecosystem of
              support, training, and resources.
            </p>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {benefits.map((b) => {
              const Icon = b.icon;
              return (
                <div
                  key={b.title}
                  className="bg-card border border-border rounded-2xl p-6 hover:border-brand-green/40 hover:shadow-green-glow-sm transition-all duration-300"
                >
                  <div className="w-12 h-12 rounded-xl bg-brand-green/10 flex items-center justify-center mb-4">
                    <Icon className="h-6 w-6 text-brand-green" />
                  </div>
                  <h3 className="font-semibold text-foreground mb-2">
                    {b.title}
                  </h3>
                  <p className="text-muted-foreground text-sm leading-relaxed">
                    {b.desc}
                  </p>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Investment Estimation Block */}
      <section className="py-16 bg-background">
        <div className="container mx-auto px-4 lg:px-6">
          <div
            className="max-w-2xl mx-auto rounded-2xl p-10 text-center"
            style={{
              background:
                "linear-gradient(135deg, oklch(0.12 0.01 145) 0%, oklch(0.18 0.05 155) 100%)",
            }}
          >
            <Badge className="mb-4 bg-brand-green/20 text-brand-green border-brand-green/30 text-xs uppercase tracking-widest">
              Investment
            </Badge>
            <h2 className="text-3xl md:text-4xl font-display font-bold text-white mb-3">
              Investment Starting From
            </h2>
            <div
              className="text-6xl font-black font-display mb-4"
              style={{ color: "oklch(0.72 0.19 155)" }}
            >
              ₹5 Lakhs
            </div>
            <div className="flex flex-wrap justify-center gap-4 text-white/70 text-sm mb-8">
              {[
                "Showroom setup",
                "Initial inventory",
                "Training & branding",
              ].map((item) => (
                <span key={item} className="flex items-center gap-1.5">
                  <CheckCircle2 className="h-4 w-4 text-brand-green" />
                  {item}
                </span>
              ))}
            </div>
            <a href="#franchise-form">
              <Button className="bg-brand-green hover:bg-brand-green/90 text-white font-bold px-10 py-3">
                Apply for Franchise <ArrowRight className="h-4 w-4 ml-2" />
              </Button>
            </a>
          </div>
        </div>
      </section>

      {/* How to Join */}
      <section className="py-20 bg-brand-light-gray">
        <div className="container mx-auto px-4 lg:px-6">
          <div className="text-center mb-12">
            <Badge className="mb-3 bg-brand-green/10 text-brand-green border-brand-green/20 text-xs uppercase tracking-widest">
              Process
            </Badge>
            <h2 className="text-3xl md:text-4xl font-display font-bold text-foreground mb-3">
              How to Join
            </h2>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-3xl mx-auto">
            {steps.map((step) => {
              const Icon = step.icon;
              return (
                <div
                  key={step.step}
                  className="bg-card border border-border rounded-2xl p-6 text-center hover:border-brand-green/40 transition-all duration-300"
                >
                  <div className="text-5xl font-black text-brand-green/10 mb-3 font-display">
                    {step.step}
                  </div>
                  <div className="w-12 h-12 rounded-xl bg-brand-green/10 flex items-center justify-center mx-auto mb-4">
                    <Icon className="h-6 w-6 text-brand-green" />
                  </div>
                  <h3 className="font-semibold text-foreground mb-2">
                    {step.title}
                  </h3>
                  <p className="text-muted-foreground text-sm leading-relaxed">
                    {step.desc}
                  </p>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Application Form */}
      <section id="franchise-form" className="py-20 bg-background">
        <div className="container mx-auto px-4 lg:px-6">
          <div className="max-w-2xl mx-auto">
            <div className="text-center mb-10">
              <Badge className="mb-3 bg-brand-green/10 text-brand-green border-brand-green/20 text-xs uppercase tracking-widest">
                Apply Now
              </Badge>
              <h2 className="text-3xl font-display font-bold text-foreground mb-3">
                Franchise Application
              </h2>
              <p className="text-muted-foreground">
                Complete the form below and our franchise team will contact you
                within 48 hours.
              </p>
            </div>

            {success ? (
              <div className="bg-card border border-brand-green/20 rounded-2xl p-10 text-center">
                <CheckCircle2 className="h-16 w-16 text-brand-green mx-auto mb-4" />
                <h3 className="text-2xl font-semibold text-foreground mb-3">
                  Opening WhatsApp...
                </h3>
                <p className="text-muted-foreground mb-6">
                  Your franchise enquiry has been forwarded to WhatsApp. Our
                  franchise team will contact you shortly on +91 9948955517.
                </p>
                <Button
                  onClick={() => setSuccess(false)}
                  className="bg-brand-green hover:bg-brand-green/90 text-white"
                >
                  Submit Another
                </Button>
              </div>
            ) : (
              <form
                onSubmit={handleSubmit}
                className="bg-card border border-border rounded-2xl p-8 space-y-5"
              >
                <div className="grid sm:grid-cols-2 gap-4">
                  <div className="space-y-1.5">
                    <Label htmlFor="fr-name">Full Name *</Label>
                    <Input
                      id="fr-name"
                      name="name"
                      placeholder="Your full name"
                      value={form.name}
                      onChange={handleChange}
                      required
                    />
                  </div>
                  <div className="space-y-1.5">
                    <Label htmlFor="fr-phone">Phone *</Label>
                    <Input
                      id="fr-phone"
                      name="phone"
                      type="tel"
                      placeholder="+91 XXXXX XXXXX"
                      value={form.phone}
                      onChange={handleChange}
                      required
                    />
                    <PhoneOtpVerifier
                      phone={form.phone}
                      verified={otpVerified}
                      onVerified={() => setOtpVerified(true)}
                      onReset={() => setOtpVerified(false)}
                    />
                  </div>
                </div>
                <div className="space-y-1.5">
                  <Label htmlFor="fr-email">Email *</Label>
                  <Input
                    id="fr-email"
                    name="email"
                    type="email"
                    placeholder="email@example.com"
                    value={form.email}
                    onChange={handleChange}
                    required
                  />
                </div>
                <div className="grid sm:grid-cols-2 gap-4">
                  <div className="space-y-1.5">
                    <Label htmlFor="fr-city">City *</Label>
                    <Input
                      id="fr-city"
                      name="city"
                      placeholder="Your city"
                      value={form.city}
                      onChange={handleChange}
                      required
                    />
                  </div>
                  <div className="space-y-1.5">
                    <Label htmlFor="fr-state">State *</Label>
                    <Input
                      id="fr-state"
                      name="state"
                      placeholder="State"
                      value={form.state}
                      onChange={handleChange}
                      required
                    />
                  </div>
                </div>
                <div className="space-y-1.5">
                  <Label htmlFor="fr-investment">
                    Investment Capacity (₹) *
                  </Label>
                  <Input
                    id="fr-investment"
                    name="investment_capacity"
                    type="number"
                    placeholder="e.g. 500000"
                    min="100000"
                    value={form.investment_capacity}
                    onChange={handleChange}
                    required
                  />
                  <p className="text-xs text-muted-foreground">
                    Minimum investment: ₹1,00,000. Enter value in rupees.
                  </p>
                </div>
                <div className="space-y-1.5">
                  <Label htmlFor="fr-message">
                    Why do you want to join JSR?
                  </Label>
                  <Textarea
                    id="fr-message"
                    name="message"
                    placeholder="Tell us about your business background and motivation..."
                    value={form.message}
                    onChange={handleChange}
                    rows={4}
                  />
                </div>
                <Button
                  type="submit"
                  disabled={franchiseMutation.isPending || !otpVerified}
                  className="w-full bg-brand-green hover:bg-brand-green/90 text-white font-semibold disabled:opacity-60"
                >
                  {franchiseMutation.isPending ? (
                    <>
                      <Loader2 className="h-4 w-4 mr-2 animate-spin" /> Opening
                      WhatsApp...
                    </>
                  ) : (
                    "Apply via WhatsApp"
                  )}
                </Button>
                {!otpVerified && (
                  <p className="text-xs text-center text-muted-foreground">
                    Verify your phone number to enable submission.
                  </p>
                )}
              </form>
            )}
          </div>
        </div>
      </section>
    </main>
  );
}

import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { useAddFranchiseApplication } from "@/hooks/useQueries";
import {
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
    title: "Strong Supplier Network",
    desc: "Access to 20+ EV brands and direct manufacturer relationships for better pricing.",
  },
  {
    icon: GraduationCap,
    title: "Technical Training",
    desc: "Comprehensive training for your staff on EV technology, sales, and service.",
  },
  {
    icon: Megaphone,
    title: "Marketing Support",
    desc: "Full branding kit, digital marketing assistance, and regional advertising support.",
  },
  {
    icon: TrendingUp,
    title: "Attractive Margins",
    desc: "Competitive profit margins with transparent revenue sharing model.",
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
    desc: "Complete onboarding, store setup, and launch your JSR Green Motors franchise.",
  },
];

export default function FranchisePage() {
  const [success, setSuccess] = useState(false);
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
    document.title = "Franchise | JSR Green Motors";
  }, []);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
  ) => {
    setForm((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const investmentCapacity = BigInt(
      Number.parseInt(form.investment_capacity, 10) || 0,
    );
    try {
      await franchiseMutation.mutateAsync({
        ...form,
        investment_capacity: investmentCapacity,
      });
      setSuccess(true);
      toast.success("Franchise application submitted!");
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
              "url('/assets/generated/franchise-showroom.dim_800x500.jpg')",
          }}
        />
        <div className="absolute inset-0 bg-brand-dark/85" />
        <div className="relative z-10 container mx-auto px-4 lg:px-6 text-center">
          <Badge className="mb-4 bg-brand-green/20 text-brand-green border-brand-green/30 text-xs uppercase tracking-widest">
            Business Opportunity
          </Badge>
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-display font-bold text-white mb-6">
            Franchise <span className="text-brand-green">Opportunities</span>
          </h1>
          <p className="text-white/70 text-xl max-w-2xl mx-auto">
            Join India's fastest-growing EV network. Build a profitable business
            with JSR Green Motors' proven franchise model.
          </p>
        </div>
      </section>

      {/* Benefits */}
      <section className="py-20 bg-background">
        <div className="container mx-auto px-4 lg:px-6">
          <div className="text-center mb-12">
            <Badge className="mb-3 bg-brand-green/10 text-brand-green border-brand-green/20 text-xs uppercase tracking-widest">
              Why Partner With Us
            </Badge>
            <h2 className="text-3xl md:text-4xl font-display font-bold text-foreground mb-3">
              What You Get
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
      <section className="py-20 bg-background">
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
                  Application Received!
                </h3>
                <p className="text-muted-foreground mb-6">
                  Thank you for your interest in the JSR Green Motors franchise.
                  Our team will review your application and contact you within
                  48 hours.
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
                  disabled={franchiseMutation.isPending}
                  className="w-full bg-brand-green hover:bg-brand-green/90 text-white font-semibold"
                >
                  {franchiseMutation.isPending ? (
                    <>
                      <Loader2 className="h-4 w-4 mr-2 animate-spin" />{" "}
                      Submitting...
                    </>
                  ) : (
                    "Submit Application"
                  )}
                </Button>
              </form>
            )}
          </div>
        </div>
      </section>
    </main>
  );
}

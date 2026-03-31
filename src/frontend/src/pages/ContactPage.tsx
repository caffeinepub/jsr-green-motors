import { PhoneOtpVerifier } from "@/components/PhoneOtpVerifier";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { useAddContactSubmission } from "@/hooks/useQueries";
import { saveLead } from "@/lib/supabase";
import {
  CheckCircle2,
  Clock,
  Facebook,
  Instagram,
  Loader2,
  Mail,
  MapPin,
  Phone,
  Youtube,
} from "lucide-react";
import { useEffect, useState } from "react";
import { toast } from "sonner";

export default function ContactPage() {
  const [success, setSuccess] = useState(false);
  const [otpVerified, setOtpVerified] = useState(false);
  const contactMutation = useAddContactSubmission();
  const [form, setForm] = useState({
    name: "",
    email: "",
    phone: "",
    message: "",
  });

  useEffect(() => {
    document.title =
      "Contact JSR Electric Vehicles | Kodad, Suryapet Telangana";
    let metaDesc = document.querySelector('meta[name="description"]');
    if (!metaDesc) {
      metaDesc = document.createElement("meta");
      (metaDesc as HTMLMetaElement).name = "description";
      document.head.appendChild(metaDesc);
    }
    (metaDesc as HTMLMetaElement).content =
      "Contact JSR Electric Vehicles at +91 9948955517. Located at Suryapet road, beside Kashinadam function hall, Kodad, Suryapet dist, Telangana-508206.";
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
    try {
      await contactMutation.mutateAsync(form);
    } catch {
      // best-effort save, continue to WhatsApp regardless
    }
    const msg = encodeURIComponent(
      `Hello JSR Electric Vehicles,\n\nName: ${form.name}\nPhone: ${form.phone}\nEmail: ${form.email}\nMessage: ${form.message}`,
    );
    saveLead({
      form_type: "contact",
      name: form.name,
      phone: form.phone,
      email: form.email,
      message: form.message,
    }).catch(() => {});
    window.open(`https://wa.me/919948955517?text=${msg}`, "_blank");
    setSuccess(true);
    toast.success("Redirecting to WhatsApp — we'll be in touch soon!");
  };

  return (
    <main className="pt-20">
      {/* Header */}
      <section className="py-16 section-gradient">
        <div className="container mx-auto px-4 lg:px-6 text-center">
          <Badge className="mb-3 bg-brand-green/20 text-brand-green border-brand-green/30 text-xs uppercase tracking-widest">
            Get in Touch
          </Badge>
          <h1 className="text-4xl md:text-5xl font-display font-bold text-white mb-4">
            Contact Us
          </h1>
          <p className="text-white/65 max-w-2xl mx-auto">
            Ready to go electric? Have questions about our vehicles or services?
            We're here to help. Reach out to our team today.
          </p>
        </div>
      </section>

      {/* Contact Section */}
      <section className="py-16 bg-background">
        <div className="container mx-auto px-4 lg:px-6">
          <div className="grid lg:grid-cols-2 gap-12">
            {/* Contact Form */}
            <div>
              <h2 className="text-2xl font-display font-bold text-foreground mb-6">
                Send a Message
              </h2>
              {success ? (
                <div className="bg-card border border-brand-green/20 rounded-2xl p-10 text-center">
                  <CheckCircle2 className="h-16 w-16 text-brand-green mx-auto mb-4" />
                  <h3 className="text-xl font-semibold text-foreground mb-2">
                    Opening WhatsApp...
                  </h3>
                  <p className="text-muted-foreground mb-6">
                    Your message has been forwarded to WhatsApp. Our team will
                    reply shortly on +91 9948955517.
                  </p>
                  <Button
                    onClick={() => {
                      setSuccess(false);
                      setOtpVerified(false);
                    }}
                    className="bg-brand-green hover:bg-brand-green/90 text-white"
                  >
                    Send Another
                  </Button>
                </div>
              ) : (
                <form
                  onSubmit={handleSubmit}
                  className="bg-card border border-border rounded-2xl p-8 space-y-5"
                >
                  <div className="grid sm:grid-cols-2 gap-4">
                    <div className="space-y-1.5">
                      <Label htmlFor="cnt-name">Full Name *</Label>
                      <Input
                        id="cnt-name"
                        name="name"
                        placeholder="Your name"
                        value={form.name}
                        onChange={handleChange}
                        required
                      />
                    </div>
                    <div className="space-y-1.5">
                      <Label htmlFor="cnt-phone">Phone *</Label>
                      <Input
                        id="cnt-phone"
                        name="phone"
                        type="tel"
                        placeholder="+91 XXXXX XXXXX"
                        value={form.phone}
                        onChange={handleChange}
                        required
                      />
                    </div>
                  </div>
                  <PhoneOtpVerifier
                    phone={form.phone}
                    verified={otpVerified}
                    onVerified={() => setOtpVerified(true)}
                    onReset={() => setOtpVerified(false)}
                  />
                  <div className="space-y-1.5">
                    <Label htmlFor="cnt-email">Email *</Label>
                    <Input
                      id="cnt-email"
                      name="email"
                      type="email"
                      placeholder="email@example.com"
                      value={form.email}
                      onChange={handleChange}
                      required
                    />
                  </div>
                  <div className="space-y-1.5">
                    <Label htmlFor="cnt-message">Message *</Label>
                    <Textarea
                      id="cnt-message"
                      name="message"
                      placeholder="How can we help you? Tell us about your requirements..."
                      value={form.message}
                      onChange={handleChange}
                      rows={5}
                      required
                    />
                  </div>
                  <Button
                    type="submit"
                    disabled={contactMutation.isPending || !otpVerified}
                    className="w-full bg-brand-green hover:bg-brand-green/90 text-white font-semibold disabled:opacity-60"
                  >
                    {contactMutation.isPending ? (
                      <>
                        <Loader2 className="h-4 w-4 mr-2 animate-spin" />{" "}
                        Opening WhatsApp...
                      </>
                    ) : (
                      "Send via WhatsApp"
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

            {/* Business Info */}
            <div className="space-y-6">
              <h2 className="text-2xl font-display font-bold text-foreground mb-6">
                Business Information
              </h2>

              <div className="space-y-4">
                <div className="bg-card border border-border rounded-xl p-5 flex gap-4 hover:border-brand-green/40 transition-colors">
                  <div className="w-10 h-10 rounded-xl bg-brand-green/10 flex items-center justify-center shrink-0">
                    <MapPin className="h-5 w-5 text-brand-green" />
                  </div>
                  <div>
                    <h3 className="font-medium text-foreground mb-1">
                      Location
                    </h3>
                    <p className="text-muted-foreground text-sm">
                      <strong className="text-foreground">Head Branch:</strong>
                      <br />
                      Suryapet road, beside Kashinadam function hall,
                      <br />
                      Kodad, Suryapet dist, Telangana-508206
                      <br />
                      <span className="text-xs text-muted-foreground/70 mt-1 block">
                        Also near: beside Srinivasa theater and union bank,
                        Mathanagar, Kodad
                      </span>
                      <br />
                      <strong className="text-foreground">Branch 2:</strong>
                      <br />
                      Haliya (phone to be updated)
                    </p>
                  </div>
                </div>

                <div className="bg-card border border-border rounded-xl p-5 flex gap-4 hover:border-brand-green/40 transition-colors">
                  <div className="w-10 h-10 rounded-xl bg-brand-green/10 flex items-center justify-center shrink-0">
                    <Phone className="h-5 w-5 text-brand-green" />
                  </div>
                  <div>
                    <h3 className="font-medium text-foreground mb-1">Phone</h3>
                    <a
                      href="tel:+919948955517"
                      className="text-muted-foreground text-sm hover:text-brand-green transition-colors"
                    >
                      +91 9948955517
                    </a>
                  </div>
                </div>

                <div className="bg-card border border-border rounded-xl p-5 flex gap-4 hover:border-brand-green/40 transition-colors">
                  <div className="w-10 h-10 rounded-xl bg-brand-green/10 flex items-center justify-center shrink-0">
                    <Mail className="h-5 w-5 text-brand-green" />
                  </div>
                  <div>
                    <h3 className="font-medium text-foreground mb-1">Email</h3>
                    <a
                      href="mailto:jsrgreenmotors5399@gmail.com"
                      className="text-muted-foreground text-sm hover:text-brand-green transition-colors"
                    >
                      jsrgreenmotors5399@gmail.com
                    </a>
                  </div>
                </div>

                <div className="bg-card border border-border rounded-xl p-5 flex gap-4 hover:border-brand-green/40 transition-colors">
                  <div className="w-10 h-10 rounded-xl bg-brand-green/10 flex items-center justify-center shrink-0">
                    <Clock className="h-5 w-5 text-brand-green" />
                  </div>
                  <div>
                    <h3 className="font-medium text-foreground mb-1">
                      Hours of Operation
                    </h3>
                    <div className="text-muted-foreground text-sm space-y-1">
                      <div className="flex justify-between gap-8">
                        <span>Monday – Saturday</span>
                        <span className="text-brand-green font-medium">
                          9:00 AM – 7:00 PM
                        </span>
                      </div>
                      <div className="flex justify-between gap-8">
                        <span>Sunday</span>
                        <span className="text-brand-green font-medium">
                          10:00 AM – 5:00 PM
                        </span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              <div className="bg-card border border-border rounded-xl overflow-hidden">
                <iframe
                  src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3815.8!2d79.9704!3d17.0803!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x0%3A0x0!2sJSR+Green+Motors+Kodad!5e0!3m2!1sen!2sin!4v1"
                  width="100%"
                  height="300"
                  style={{ border: 0, borderRadius: 0 }}
                  allowFullScreen
                  loading="lazy"
                  title="JSR Electric Vehicles Location - Kodad, Telangana"
                  data-ocid="contact.map_marker"
                />
              </div>

              <div className="bg-card border border-border rounded-xl p-5">
                <h3 className="font-medium text-foreground mb-3">
                  Serving Areas
                </h3>
                <div className="flex flex-wrap gap-2">
                  {[
                    "Kodad",
                    "Suryapet",
                    "Haliya",
                    "Nalgonda",
                    "Miryalaguda",
                    "Khammam",
                    "Nagarjunasagar",
                  ].map((area) => (
                    <span
                      key={area}
                      className="px-3 py-1 rounded-full bg-brand-green/10 text-brand-green text-xs font-medium border border-brand-green/20"
                    >
                      {area}
                    </span>
                  ))}
                </div>
              </div>

              <div className="bg-card border border-border rounded-xl p-5">
                <h3 className="font-medium text-foreground mb-4">Follow Us</h3>
                <div className="flex gap-3">
                  {[
                    {
                      icon: Facebook,
                      label: "Facebook",
                      href: "https://facebook.com",
                    },
                    {
                      icon: Instagram,
                      label: "Instagram",
                      href: "https://instagram.com",
                    },
                    {
                      icon: Youtube,
                      label: "YouTube",
                      href: "https://youtube.com",
                    },
                  ].map((social) => {
                    const Icon = social.icon;
                    return (
                      <a
                        key={social.label}
                        href={social.href}
                        target="_blank"
                        rel="noopener noreferrer"
                        aria-label={social.label}
                        className="flex items-center gap-2 px-4 py-2 rounded-lg bg-muted hover:bg-brand-green/10 hover:text-brand-green text-muted-foreground text-sm font-medium transition-colors"
                      >
                        <Icon className="h-4 w-4" />
                        {social.label}
                      </a>
                    );
                  })}
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}

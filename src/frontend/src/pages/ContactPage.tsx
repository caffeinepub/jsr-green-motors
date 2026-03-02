import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { useAddContactSubmission } from "@/hooks/useQueries";
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
  const contactMutation = useAddContactSubmission();
  const [form, setForm] = useState({
    name: "",
    email: "",
    phone: "",
    message: "",
  });

  useEffect(() => {
    document.title = "Contact Us | JSR Green Motors";
  }, []);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
  ) => {
    setForm((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      await contactMutation.mutateAsync(form);
      setSuccess(true);
      toast.success("Message sent! We'll be in touch soon.");
    } catch {
      toast.error("Failed to send message. Please try again.");
    }
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
                    Message Sent!
                  </h3>
                  <p className="text-muted-foreground mb-6">
                    Thank you for reaching out. We'll get back to you within 24
                    hours.
                  </p>
                  <Button
                    onClick={() => setSuccess(false)}
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
                    disabled={contactMutation.isPending}
                    className="w-full bg-brand-green hover:bg-brand-green/90 text-white font-semibold"
                  >
                    {contactMutation.isPending ? (
                      <>
                        <Loader2 className="h-4 w-4 mr-2 animate-spin" />{" "}
                        Sending...
                      </>
                    ) : (
                      "Send Message"
                    )}
                  </Button>
                </form>
              )}
            </div>

            {/* Business Info */}
            <div className="space-y-6">
              <h2 className="text-2xl font-display font-bold text-foreground mb-6">
                Business Information
              </h2>

              {/* Info Cards */}
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
                      JSR Green Motors
                      <br />
                      Andhra Pradesh & Telangana, India
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
                      href="tel:+91XXXXXXXXXX"
                      className="text-muted-foreground text-sm hover:text-brand-green transition-colors"
                    >
                      +91-XXXXXXXXXX
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
                      href="mailto:info@jsrgreenmotors.com"
                      className="text-muted-foreground text-sm hover:text-brand-green transition-colors"
                    >
                      info@jsrgreenmotors.com
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

              {/* Map Placeholder */}
              <div className="bg-card border border-border rounded-xl overflow-hidden">
                <div className="h-56 bg-muted flex flex-col items-center justify-center gap-3">
                  <div className="w-16 h-16 rounded-2xl bg-brand-green/10 flex items-center justify-center">
                    <MapPin className="h-8 w-8 text-brand-green" />
                  </div>
                  <p className="text-muted-foreground text-sm font-medium">
                    Find Us on Google Maps
                  </p>
                  <a
                    href="https://maps.google.com"
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    <Button
                      size="sm"
                      variant="outline"
                      className="border-brand-green text-brand-green hover:bg-brand-green/10 text-xs"
                    >
                      Open in Google Maps
                    </Button>
                  </a>
                </div>
              </div>

              {/* Social */}
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

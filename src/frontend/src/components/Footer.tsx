import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useAddNewsletterSubscriber } from "@/hooks/useQueries";
import { Link } from "@tanstack/react-router";
import {
  Clock,
  Facebook,
  Instagram,
  Mail,
  MapPin,
  Phone,
  Youtube,
} from "lucide-react";
import { useState } from "react";
import { toast } from "sonner";

const quickLinks = [
  { href: "/", label: "Home" },
  { href: "/vehicles", label: "Vehicles" },
  { href: "/services", label: "Services" },
  { href: "/conversions", label: "Conversions" },
  { href: "/franchise", label: "Franchise" },
  { href: "/blog", label: "Blog" },
  { href: "/contact", label: "Contact" },
];

export default function Footer() {
  const [email, setEmail] = useState("");
  const subscribeMutation = useAddNewsletterSubscriber();
  const currentYear = new Date().getFullYear();

  const handleSubscribe = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!email) return;
    try {
      await subscribeMutation.mutateAsync({ email });
      toast.success("Successfully subscribed to our newsletter!");
      setEmail("");
    } catch {
      toast.error("Failed to subscribe. Please try again.");
    }
  };

  return (
    <footer className="bg-brand-dark border-t border-white/10">
      <div className="container mx-auto px-4 lg:px-6 py-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {/* Brand */}
          <div className="space-y-4">
            <Link to="/">
              <img
                src="/assets/uploads/JSR_LOGO-2.png"
                alt="JSR Electric Vehicles"
                className="h-10 w-auto object-contain"
              />
            </Link>
            <p className="text-white/60 text-sm leading-relaxed">
              Drive the Future — Go Electric. Your trusted multi-brand EV
              showroom & conversion experts in Telangana.
            </p>
            <div className="flex items-center gap-3 pt-2">
              <a
                href="https://facebook.com"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Facebook"
                className="w-9 h-9 rounded-full bg-white/10 hover:bg-brand-green flex items-center justify-center transition-colors"
              >
                <Facebook className="h-4 w-4 text-white" />
              </a>
              <a
                href="https://instagram.com"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Instagram"
                className="w-9 h-9 rounded-full bg-white/10 hover:bg-brand-green flex items-center justify-center transition-colors"
              >
                <Instagram className="h-4 w-4 text-white" />
              </a>
              <a
                href="https://youtube.com"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="YouTube"
                className="w-9 h-9 rounded-full bg-white/10 hover:bg-brand-green flex items-center justify-center transition-colors"
              >
                <Youtube className="h-4 w-4 text-white" />
              </a>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="text-white font-semibold text-sm uppercase tracking-wider mb-4">
              Quick Links
            </h3>
            <ul className="space-y-2">
              {quickLinks.map((link) => (
                <li key={link.href}>
                  <Link
                    to={link.href}
                    className="text-white/60 hover:text-brand-green text-sm transition-colors"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact Info */}
          <div>
            <h3 className="text-white font-semibold text-sm uppercase tracking-wider mb-4">
              Contact Info
            </h3>
            <ul className="space-y-3">
              <li className="flex items-start gap-3">
                <MapPin className="h-4 w-4 text-brand-green mt-0.5 shrink-0" />
                <span className="text-white/60 text-sm">
                  Suryapet road, beside Kashinadam function hall,
                  <br />
                  Kodad, Suryapet dist, Telangana-508206
                </span>
              </li>
              <li className="flex items-center gap-3">
                <Phone className="h-4 w-4 text-brand-green shrink-0" />
                <a
                  href="tel:+919948955517"
                  className="text-white/60 hover:text-brand-green text-sm transition-colors"
                >
                  +91 9948955517
                </a>
              </li>
              <li className="flex items-center gap-3">
                <Mail className="h-4 w-4 text-brand-green shrink-0" />
                <a
                  href="mailto:jsrgreenmotors5399@gmail.com"
                  className="text-white/60 hover:text-brand-green text-sm transition-colors"
                >
                  jsrgreenmotors5399@gmail.com
                </a>
              </li>
              <li className="flex items-start gap-3">
                <Clock className="h-4 w-4 text-brand-green mt-0.5 shrink-0" />
                <span className="text-white/60 text-sm">
                  Mon–Sat: 9AM–7PM
                  <br />
                  Sun: 10AM–5PM
                </span>
              </li>
            </ul>
          </div>

          {/* Newsletter */}
          <div>
            <h3 className="text-white font-semibold text-sm uppercase tracking-wider mb-4">
              Stay Updated
            </h3>
            <p className="text-white/60 text-sm mb-4">
              Get the latest EV news, offers & updates from JSR Electric
              Vehicles.
            </p>
            <form onSubmit={handleSubscribe} className="space-y-2">
              <Input
                type="email"
                placeholder="Enter your email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
                className="bg-white/10 border-white/20 text-white placeholder:text-white/40 focus:border-brand-green focus:ring-brand-green"
              />
              <Button
                type="submit"
                disabled={subscribeMutation.isPending}
                className="w-full bg-brand-green hover:bg-brand-green/90 text-white font-semibold"
              >
                {subscribeMutation.isPending ? "Subscribing..." : "Subscribe"}
              </Button>
            </form>
          </div>
        </div>

        {/* Business Information Block */}
        <div className="border-t border-white/10 mt-10 pt-6 pb-4">
          <p className="text-white/30 text-xs text-center leading-relaxed">
            <span className="font-medium text-white/40">Company:</span> JSR
            Electric Vehicles
            <span className="mx-2 text-white/20">|</span>
            <span className="font-medium text-white/40">GST:</span> [To be
            updated]
            <span className="mx-2 text-white/20">|</span>
            <span className="font-medium text-white/40">Reg. Address:</span>{" "}
            Suryapet road, beside Kashinadam function hall, Kodad, Suryapet
            dist, Telangana-508206
            <span className="mx-2 text-white/20">|</span>
            <span className="font-medium text-white/40">Ph:</span>{" "}
            <a
              href="tel:+919948955517"
              className="hover:text-white/50 transition-colors"
            >
              +91 9948955517
            </a>
            <span className="mx-2 text-white/20">|</span>
            <span className="font-medium text-white/40">Email:</span>{" "}
            <a
              href="mailto:jsrgreenmotors5399@gmail.com"
              className="hover:text-white/50 transition-colors"
            >
              jsrgreenmotors5399@gmail.com
            </a>
          </p>
        </div>

        {/* Bottom Bar */}
        <div className="border-t border-white/10 pt-6 flex flex-col sm:flex-row items-center justify-between gap-3">
          <p className="text-white/40 text-sm text-center sm:text-left">
            © {currentYear} JSR Electric Vehicles. All rights reserved.
          </p>
          <a
            href={`https://caffeine.ai?utm_source=caffeine-footer&utm_medium=referral&utm_content=${encodeURIComponent(window.location.hostname)}`}
            target="_blank"
            rel="noopener noreferrer"
            className="text-white/40 hover:text-white/60 text-sm transition-colors"
          >
            Built with ❤️ using caffeine.ai
          </a>
        </div>
      </div>
    </footer>
  );
}

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

// WhatsApp SVG icon
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
              showroom &amp; conversion experts in Telangana.
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
                href="https://instagram.com/jsrgreenmotors"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Instagram @jsrgreenmotors"
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
              {/* WhatsApp icon */}
              <a
                href="https://wa.me/919948955517?text=Hello%20JSR%20Electric%20Vehicles%2C%20I%20want%20information%20about%20EV%20vehicles."
                target="_blank"
                rel="noopener noreferrer"
                aria-label="WhatsApp"
                className="w-9 h-9 rounded-full bg-white/10 hover:bg-[#25D366] flex items-center justify-center transition-colors"
              >
                <WhatsAppIcon className="h-4 w-4 text-white" />
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
              Get the latest EV news, offers &amp; updates from JSR Electric
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
            <span className="font-medium text-white/40">GST:</span>{" "}
            36DXBPP2989H1Z9
            <span className="mx-2 text-white/20">|</span>
            <span className="font-medium text-white/40">Instagram:</span>{" "}
            <a
              href="https://instagram.com/jsrgreenmotors"
              target="_blank"
              rel="noopener noreferrer"
              className="hover:text-white/50 transition-colors"
            >
              @jsrgreenmotors
            </a>
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

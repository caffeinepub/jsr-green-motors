import { useAddNewsletterSubscriber } from "@/hooks/useQueries";
import { Link } from "@tanstack/react-router";
import {
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
      toast.success("Successfully subscribed!");
      setEmail("");
    } catch {
      toast.error("Failed to subscribe. Please try again.");
    }
  };

  return (
    <footer style={{ background: "#000", borderTop: "none" }}>
      {/* Neon pulse line at top */}
      <div className="neon-line" />

      {/* Holographic stats row */}
      <div
        style={{
          background: "rgba(0,255,178,0.03)",
          borderBottom: "1px solid rgba(0,255,178,0.08)",
        }}
      >
        <div className="container mx-auto px-4 lg:px-6 py-6">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {[
              { value: "8+", label: "EV Brands" },
              { value: "1100+", label: "Happy Customers" },
              { value: "50+", label: "Vehicles" },
              { value: "20+", label: "Dealer Network" },
            ].map((stat) => (
              <div key={stat.label} className="text-center">
                <div
                  className="font-bebas text-4xl"
                  style={{
                    color: "#00FFB2",
                    textShadow: "0 0 20px rgba(0,255,178,0.4)",
                  }}
                >
                  {stat.value}
                </div>
                <div
                  className="text-xs uppercase tracking-wider mt-0.5"
                  style={{
                    color: "rgba(240,255,248,0.4)",
                    fontFamily: "'Orbitron', sans-serif",
                    fontSize: "9px",
                  }}
                >
                  {stat.label}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Main footer grid */}
      <div className="container mx-auto px-4 lg:px-6 py-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {/* Brand column */}
          <div className="space-y-5">
            <Link to="/" className="flex items-center gap-2">
              <span
                className="font-orbitron font-black"
                style={{
                  fontSize: "32px",
                  color: "#00FFB2",
                  textShadow: "0 0 30px #00FFB2",
                  letterSpacing: "2px",
                }}
              >
                ⚡JSR
              </span>
            </Link>
            <img
              src="/assets/uploads/JSR_LOGO-2.png"
              alt="JSR Electric Vehicles"
              className="h-14 w-auto object-contain opacity-80"
            />
            <p
              style={{
                color: "rgba(240,255,248,0.45)",
                fontSize: "13px",
                lineHeight: "1.7",
                fontFamily: "'Space Grotesk', sans-serif",
              }}
            >
              Drive the Future — Go Electric. Telangana's most advanced
              multi-brand EV dealership.
            </p>
            <div className="flex items-center gap-3 pt-1">
              {[
                {
                  href: "https://facebook.com",
                  icon: <Facebook className="h-4 w-4" />,
                  label: "Facebook",
                },
                {
                  href: "https://instagram.com/jsrgreenmotors",
                  icon: <Instagram className="h-4 w-4" />,
                  label: "Instagram",
                },
                {
                  href: "https://youtube.com",
                  icon: <Youtube className="h-4 w-4" />,
                  label: "YouTube",
                },
                {
                  href: "https://wa.me/919948955517",
                  icon: <WhatsAppIcon className="h-4 w-4" />,
                  label: "WhatsApp",
                },
              ].map(({ href, icon, label }) => (
                <a
                  key={label}
                  href={href}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={label}
                  className="w-8 h-8 rounded-full flex items-center justify-center transition-all duration-200"
                  style={{
                    background: "rgba(0,255,178,0.05)",
                    border: "1px solid rgba(0,255,178,0.15)",
                    color: "rgba(240,255,248,0.6)",
                  }}
                  onMouseEnter={(e) => {
                    (e.currentTarget as HTMLAnchorElement).style.background =
                      "rgba(0,255,178,0.15)";
                    (e.currentTarget as HTMLAnchorElement).style.borderColor =
                      "rgba(0,255,178,0.5)";
                    (e.currentTarget as HTMLAnchorElement).style.color =
                      "#00FFB2";
                  }}
                  onMouseLeave={(e) => {
                    (e.currentTarget as HTMLAnchorElement).style.background =
                      "rgba(0,255,178,0.05)";
                    (e.currentTarget as HTMLAnchorElement).style.borderColor =
                      "rgba(0,255,178,0.15)";
                    (e.currentTarget as HTMLAnchorElement).style.color =
                      "rgba(240,255,248,0.6)";
                  }}
                >
                  {icon}
                </a>
              ))}
            </div>
          </div>

          {/* Navigation */}
          <div>
            <h3
              className="font-orbitron text-xs uppercase tracking-widest mb-5"
              style={{ color: "#00FFB2", letterSpacing: "0.2em" }}
            >
              Navigation
            </h3>
            <ul className="space-y-1">
              {quickLinks.map((link) => (
                <li key={link.href}>
                  <Link to={link.href} className="terminal-link text-sm">
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Services */}
          <div>
            <h3
              className="font-orbitron text-xs uppercase tracking-widest mb-5"
              style={{ color: "#00FFB2", letterSpacing: "0.2em" }}
            >
              Services
            </h3>
            <ul className="space-y-1">
              {[
                { href: "/vehicles", label: "EV Sales" },
                { href: "/services", label: "Service & Repair" },
                { href: "/conversions", label: "EV Conversion" },
                { href: "/franchise", label: "Franchise" },
                { href: "/booking", label: "Book Test Ride" },
                { href: "/compare", label: "Compare Vehicles" },
              ].map((item) => (
                <li key={item.href}>
                  <Link to={item.href} className="terminal-link text-sm">
                    {item.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact + Newsletter */}
          <div className="space-y-5">
            <div>
              <h3
                className="font-orbitron text-xs uppercase tracking-widest mb-4"
                style={{ color: "#00FFB2", letterSpacing: "0.2em" }}
              >
                Contact
              </h3>
              <ul className="space-y-3">
                <li className="flex items-start gap-2">
                  <MapPin
                    className="h-4 w-4 mt-0.5 shrink-0"
                    style={{ color: "#00FFB2" }}
                  />
                  <span
                    style={{
                      color: "rgba(240,255,248,0.5)",
                      fontSize: "12px",
                      lineHeight: "1.6",
                    }}
                  >
                    Kodad, Suryapet Dist, Telangana–508206
                  </span>
                </li>
                <li className="flex items-center gap-2">
                  <Phone
                    className="h-4 w-4 shrink-0"
                    style={{ color: "#00FFB2" }}
                  />
                  <a
                    href="tel:+919948955517"
                    style={{ color: "rgba(240,255,248,0.5)", fontSize: "12px" }}
                    className="hover:text-[#00FFB2] transition-colors"
                  >
                    +91 9948955517
                  </a>
                </li>
                <li className="flex items-center gap-2">
                  <Mail
                    className="h-4 w-4 shrink-0"
                    style={{ color: "#00FFB2" }}
                  />
                  <a
                    href="mailto:jsrgreenmotors5399@gmail.com"
                    style={{ color: "rgba(240,255,248,0.5)", fontSize: "12px" }}
                    className="hover:text-[#00FFB2] transition-colors"
                  >
                    jsrgreenmotors5399@gmail.com
                  </a>
                </li>
              </ul>
            </div>
            {/* Newsletter */}
            <form onSubmit={handleSubscribe} className="space-y-2">
              <p
                style={{
                  color: "rgba(240,255,248,0.4)",
                  fontSize: "11px",
                  fontFamily: "'Orbitron', sans-serif",
                  letterSpacing: "0.1em",
                }}
              >
                STAY UPDATED
              </p>
              <input
                type="email"
                placeholder="Enter email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
                className="w-full px-3 py-2 rounded text-sm"
                style={{
                  background: "rgba(0,255,178,0.04)",
                  border: "1px solid rgba(0,255,178,0.2)",
                  color: "#F0FFF8",
                  fontFamily: "'Space Grotesk', sans-serif",
                  outline: "none",
                }}
              />
              <button
                type="submit"
                disabled={subscribeMutation.isPending}
                className="btn-neon w-full py-2 rounded text-xs"
              >
                {subscribeMutation.isPending ? "..." : "SUBSCRIBE"}
              </button>
            </form>
          </div>
        </div>

        {/* Business info */}
        <div
          className="mt-10 pt-6 pb-2"
          style={{ borderTop: "1px solid rgba(0,255,178,0.08)" }}
        >
          <p
            style={{
              color: "rgba(240,255,248,0.25)",
              fontSize: "11px",
              textAlign: "center",
              lineHeight: "1.8",
            }}
          >
            <span style={{ color: "rgba(240,255,248,0.4)" }}>GST:</span>{" "}
            36DXBPP2989H1Z9 &nbsp;|&nbsp;
            <span style={{ color: "rgba(240,255,248,0.4)" }}>Instagram:</span>{" "}
            <a
              href="https://instagram.com/jsrgreenmotors"
              target="_blank"
              rel="noopener noreferrer"
              className="hover:text-[#00FFB2] transition-colors"
            >
              @jsrgreenmotors
            </a>{" "}
            &nbsp;|&nbsp;
            <span style={{ color: "rgba(240,255,248,0.4)" }}>Ph:</span>{" "}
            <a
              href="tel:+919948955517"
              className="hover:text-[#00FFB2] transition-colors"
            >
              +91 9948955517
            </a>
          </p>
        </div>

        {/* Bottom bar */}
        <div
          className="pt-5 flex flex-col sm:flex-row items-center justify-between gap-3"
          style={{ borderTop: "1px solid rgba(0,255,178,0.06)" }}
        >
          <p
            className="font-orbitron text-xs tracking-widest"
            style={{ color: "rgba(240,255,248,0.3)" }}
          >
            JSR ELECTRIC VEHICLES © {currentYear}{" "}
            {" // ALL SYSTEMS OPERATIONAL "}{" "}
            <span
              className="status-dot inline-block w-2 h-2 rounded-full align-middle ml-1"
              style={{ background: "#00FFB2" }}
            />
          </p>
          <a
            href={`https://caffeine.ai?utm_source=caffeine-footer&utm_medium=referral&utm_content=${encodeURIComponent(window.location.hostname)}`}
            target="_blank"
            rel="noopener noreferrer"
            style={{ color: "rgba(240,255,248,0.25)", fontSize: "12px" }}
            className="hover:text-[#00FFB2] transition-colors font-space"
          >
            Built with ❤️ using caffeine.ai
          </a>
        </div>
      </div>
    </footer>
  );
}

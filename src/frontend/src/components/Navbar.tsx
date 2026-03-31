import { Link, useRouter } from "@tanstack/react-router";
import { Menu, X } from "lucide-react";
import { useEffect, useState } from "react";
import QuoteModal from "./QuoteModal";

const navLinks = [
  { href: "/", label: "Home" },
  { href: "/about", label: "About" },
  { href: "/vehicles", label: "Vehicles" },
  { href: "/compare", label: "Compare" },
  { href: "/services", label: "Services" },
  { href: "/franchise", label: "Franchise" },
  { href: "/conversions", label: "Conversions" },
  { href: "/contact", label: "Contact" },
];

export default function Navbar() {
  const [mobileOpen, setMobileOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [quoteOpen, setQuoteOpen] = useState(false);
  const router = useRouter();
  const pathname = router.state.location.pathname;

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  // biome-ignore lint/correctness/useExhaustiveDependencies: close menu on navigation
  useEffect(() => {
    setMobileOpen(false);
  }, [pathname]);

  const isActive = (href: string) =>
    href === "/" ? pathname === "/" : pathname.startsWith(href);

  return (
    <>
      {/* Floating pill navbar */}
      <header
        className="fixed top-4 left-1/2 z-50"
        style={{
          transform: "translateX(-50%)",
          width: "calc(100% - 32px)",
          maxWidth: "1200px",
        }}
      >
        <nav
          className="flex items-center justify-between px-5 py-2.5"
          style={{
            background: scrolled ? "rgba(0,0,0,0.85)" : "rgba(0,0,0,0.6)",
            backdropFilter: "blur(40px) saturate(180%)",
            WebkitBackdropFilter: "blur(40px) saturate(180%)",
            border: scrolled
              ? "1px solid rgba(0,255,178,0.3)"
              : "1px solid rgba(0,255,178,0.15)",
            borderRadius: "9999px",
            boxShadow: scrolled
              ? "0 0 40px rgba(0,255,178,0.1), 0 8px 32px rgba(0,0,0,0.4)"
              : "0 4px 24px rgba(0,0,0,0.3)",
            transition: "all 0.3s ease",
          }}
        >
          {/* Logo */}
          <Link
            to="/"
            className="shrink-0 flex items-center gap-2"
            data-ocid="nav.link"
          >
            <img
              src="/assets/uploads/JSR_LOGO-2.png"
              alt="JSR Electric Vehicles"
              className="h-10 w-auto object-contain"
            />
          </Link>

          {/* Desktop nav links */}
          <ul className="hidden lg:flex items-center gap-1">
            {navLinks.map((link) => (
              <li key={link.href}>
                <Link
                  to={link.href}
                  data-ocid="nav.link"
                  className="relative px-3 py-1.5 text-[11px] font-medium uppercase tracking-[0.12em] transition-colors duration-200 block"
                  style={{
                    fontFamily: "'Orbitron', sans-serif",
                    color: isActive(link.href)
                      ? "#00FFB2"
                      : "rgba(240,255,248,0.65)",
                  }}
                >
                  {link.label}
                  {isActive(link.href) && (
                    <span
                      className="absolute bottom-0 left-3 right-3 h-px"
                      style={{
                        background:
                          "linear-gradient(to right, transparent, #00FFB2, transparent)",
                        boxShadow: "0 0 6px #00FFB2",
                      }}
                    />
                  )}
                </Link>
              </li>
            ))}
          </ul>

          {/* Right: GET QUOTE + mobile toggle */}
          <div className="flex items-center gap-3">
            <button
              type="button"
              onClick={() => setQuoteOpen(true)}
              className="btn-neon hidden sm:block text-[11px] px-5 py-2 rounded-full"
              data-ocid="nav.primary_button"
            >
              GET QUOTE
            </button>
            <button
              type="button"
              className="lg:hidden text-[#00FFB2] p-1.5 rounded-full hover:bg-white/5 transition-colors"
              onClick={() => setMobileOpen(!mobileOpen)}
              aria-label="Toggle menu"
            >
              {mobileOpen ? (
                <X className="h-5 w-5" />
              ) : (
                <Menu className="h-5 w-5" />
              )}
            </button>
          </div>
        </nav>

        {/* Mobile dropdown — below pill */}
        {mobileOpen && (
          <div
            className="lg:hidden mt-2 rounded-2xl overflow-hidden"
            style={{
              background: "rgba(0,0,0,0.92)",
              backdropFilter: "blur(40px)",
              border: "1px solid rgba(0,255,178,0.15)",
              boxShadow: "0 16px 48px rgba(0,0,0,0.5)",
            }}
          >
            <ul className="flex flex-col py-2">
              {navLinks.map((link) => (
                <li key={link.href}>
                  <Link
                    to={link.href}
                    data-ocid="nav.link"
                    onClick={() => setMobileOpen(false)}
                    className="block px-6 py-3 text-xs uppercase tracking-widest transition-colors"
                    style={{
                      fontFamily: "'Orbitron', sans-serif",
                      color: isActive(link.href)
                        ? "#00FFB2"
                        : "rgba(240,255,248,0.65)",
                      borderLeft: isActive(link.href)
                        ? "2px solid #00FFB2"
                        : "2px solid transparent",
                    }}
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
              <li className="px-4 py-3">
                <button
                  type="button"
                  onClick={() => {
                    setMobileOpen(false);
                    setQuoteOpen(true);
                  }}
                  className="btn-neon w-full py-2.5 rounded-full text-xs"
                  data-ocid="nav.primary_button"
                >
                  GET QUOTE
                </button>
              </li>
            </ul>
          </div>
        )}
      </header>

      <QuoteModal open={quoteOpen} onClose={() => setQuoteOpen(false)} />
    </>
  );
}

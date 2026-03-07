import { Button } from "@/components/ui/button";
import { Link, useRouter } from "@tanstack/react-router";
import { Menu, X, Zap } from "lucide-react";
import { useEffect, useState } from "react";
import QuoteModal from "./QuoteModal";

const navLinks = [
  { href: "/", label: "Home" },
  { href: "/about", label: "About" },
  { href: "/vehicles", label: "Vehicles" },
  { href: "/services", label: "Services" },
  { href: "/franchise", label: "Franchise" },
  { href: "/conversions", label: "Conversions" },
  { href: "/blog", label: "Blog" },
  { href: "/contact", label: "Contact" },
];

export default function Navbar() {
  const [mobileOpen, setMobileOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [quoteOpen, setQuoteOpen] = useState(false);
  const router = useRouter();
  const pathname = router.state.location.pathname;

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20);
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
      <header
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
          scrolled
            ? "bg-brand-dark/95 backdrop-blur-md shadow-lg border-b border-white/5"
            : "bg-brand-dark/80 backdrop-blur-sm"
        }`}
      >
        <nav className="container mx-auto px-4 lg:px-6 flex items-center justify-between h-16">
          {/* Logo — slightly larger, with hover brightness */}
          <Link
            to="/"
            className="flex items-center shrink-0 opacity-95 hover:opacity-100 transition-opacity"
          >
            <img
              src="/assets/uploads/JSR_LOGO-2.png"
              alt="JSR Green Motors"
              className="h-10 lg:h-12 w-auto object-contain"
            />
          </Link>

          {/* Desktop Nav — underline active indicator */}
          <ul className="hidden lg:flex items-center gap-0.5">
            {navLinks.map((link) => (
              <li key={link.href} className="relative">
                <Link
                  to={link.href}
                  className={`relative px-3 py-2 text-sm font-medium transition-colors duration-200 block ${
                    isActive(link.href)
                      ? "text-white"
                      : "text-white/65 hover:text-white/90"
                  }`}
                >
                  {link.label}
                  {/* Active underline */}
                  {isActive(link.href) && (
                    <span
                      className="absolute bottom-0 left-3 right-3 h-[2px] rounded-full"
                      style={{ background: "oklch(0.62 0.19 155)" }}
                    />
                  )}
                </Link>
              </li>
            ))}
          </ul>

          {/* CTA + Mobile Toggle */}
          <div className="flex items-center gap-3">
            <Button
              onClick={() => setQuoteOpen(true)}
              className="hidden sm:flex items-center gap-2 bg-brand-green hover:bg-brand-green/90 hover:scale-[1.04] active:scale-95 text-white font-semibold px-4 py-2 text-sm rounded-md transition-all duration-200"
              style={{ boxShadow: "0 0 16px oklch(0.62 0.19 155 / 0.35)" }}
            >
              <Zap className="h-4 w-4" />
              Get a Quote
            </Button>
            <button
              type="button"
              className="lg:hidden text-white p-2 rounded-md hover:bg-white/10 transition-colors"
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

        {/* Mobile Menu */}
        {mobileOpen && (
          <div
            className="lg:hidden border-t border-white/10 animate-slide-in"
            style={{ background: "oklch(0.09 0.01 145)" }}
          >
            <ul className="flex flex-col py-2">
              {navLinks.map((link) => (
                <li key={link.href}>
                  <Link
                    to={link.href}
                    className={`block px-5 py-3 text-sm font-medium transition-colors ${
                      isActive(link.href)
                        ? "text-white bg-brand-green/10 border-l-[3px] border-brand-green pl-4"
                        : "text-white/65 hover:text-white hover:bg-white/5 border-l-[3px] border-transparent"
                    }`}
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
              <li className="px-4 py-3">
                <Button
                  onClick={() => {
                    setMobileOpen(false);
                    setQuoteOpen(true);
                  }}
                  className="w-full bg-brand-green hover:bg-brand-green/90 text-white font-semibold"
                >
                  <Zap className="h-4 w-4 mr-2" />
                  Get a Quote
                </Button>
              </li>
            </ul>
          </div>
        )}
      </header>

      <QuoteModal open={quoteOpen} onClose={() => setQuoteOpen(false)} />
    </>
  );
}

import { Badge } from "@/components/ui/badge";
import { Link } from "@tanstack/react-router";
import { Leaf, Target, TrendingUp, Users } from "lucide-react";
import { useEffect } from "react";

const timelineItems = [
  {
    year: "2019",
    title: "Foundation",
    desc: "JSR Green Motors was founded in Andhra Pradesh with a vision to make electric mobility accessible to all.",
  },
  {
    year: "2020",
    title: "First Showroom",
    desc: "Opened our first multi-brand EV showroom, featuring 5 leading EV brands.",
  },
  {
    year: "2021",
    title: "Service Launch",
    desc: "Launched dedicated EV service center with certified technicians.",
  },
  {
    year: "2022",
    title: "Conversion Services",
    desc: "Pioneered petrol-to-electric conversion services in the region.",
  },
  {
    year: "2023",
    title: "Franchise Expansion",
    desc: "Expanded to 10+ franchise partners across Andhra Pradesh & Telangana.",
  },
  {
    year: "2024+",
    title: "Growing Network",
    desc: "20+ partner network and growing — driving electric mobility statewide.",
  },
];

const team = [
  {
    name: "Rajesh Kumar",
    role: "CEO & Founder",
    bio: "Visionary entrepreneur with 15+ years in the automotive industry, passionate about sustainable mobility.",
  },
  {
    name: "Priya Sharma",
    role: "Operations Manager",
    bio: "Experienced operations leader ensuring seamless customer experience across all touchpoints.",
  },
  {
    name: "Arun Reddy",
    role: "Lead Technician",
    bio: "Certified EV technician specializing in battery systems and electric powertrain conversions.",
  },
];

export default function AboutPage() {
  useEffect(() => {
    document.title = "About Us | JSR Green Motors";
  }, []);

  return (
    <main className="pt-20">
      {/* Hero */}
      <section className="py-20 section-gradient">
        <div className="container mx-auto px-4 lg:px-6 text-center">
          <Badge className="mb-4 bg-brand-green/20 text-brand-green border-brand-green/30 text-xs uppercase tracking-widest">
            Our Story
          </Badge>
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-display font-bold text-white mb-6">
            About JSR Green Motors
          </h1>
          <p className="text-white/65 text-xl max-w-3xl mx-auto leading-relaxed">
            We are more than a dealership. We are advocates for sustainable
            mobility and a greener future for Andhra Pradesh and Telangana.
          </p>
        </div>
      </section>

      {/* Mission */}
      <section className="py-20 bg-background">
        <div className="container mx-auto px-4 lg:px-6">
          <div className="grid md:grid-cols-2 gap-12 items-center">
            <div>
              <Badge className="mb-3 bg-brand-green/10 text-brand-green border-brand-green/20 text-xs uppercase tracking-widest">
                Our Mission
              </Badge>
              <h2 className="text-3xl md:text-4xl font-display font-bold text-foreground mb-6">
                Driving India's Electric Future
              </h2>
              <p className="text-muted-foreground mb-4 leading-relaxed">
                At JSR Green Motors, our mission is to accelerate the adoption
                of electric vehicles across Andhra Pradesh and Telangana by
                providing exceptional products, services, and education to our
                community.
              </p>
              <p className="text-muted-foreground leading-relaxed">
                We believe every journey towards a cleaner planet begins with a
                single charge. By making EV ownership accessible, affordable,
                and enjoyable, we're helping build a sustainable future for our
                region and our nation.
              </p>
            </div>
            <div className="grid grid-cols-2 gap-4">
              {[
                {
                  icon: Target,
                  label: "Our Mission",
                  value: "Accessible EV for All",
                },
                {
                  icon: Leaf,
                  label: "Our Values",
                  value: "Sustainability First",
                },
                {
                  icon: TrendingUp,
                  label: "Our Goal",
                  value: "1000+ EVs by 2025",
                },
                {
                  icon: Users,
                  label: "Our Community",
                  value: "500+ Happy Customers",
                },
              ].map((item) => {
                const Icon = item.icon;
                return (
                  <div
                    key={item.label}
                    className="bg-card border border-border rounded-2xl p-5 text-center hover:border-brand-green/40 transition-colors"
                  >
                    <Icon className="h-8 w-8 text-brand-green mx-auto mb-3" />
                    <div className="text-xs text-muted-foreground mb-1">
                      {item.label}
                    </div>
                    <div className="text-sm font-semibold text-foreground">
                      {item.value}
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      </section>

      {/* Timeline */}
      <section className="py-20 bg-brand-light-gray">
        <div className="container mx-auto px-4 lg:px-6">
          <div className="text-center mb-12">
            <Badge className="mb-3 bg-brand-green/10 text-brand-green border-brand-green/20 text-xs uppercase tracking-widest">
              Company History
            </Badge>
            <h2 className="text-3xl md:text-4xl font-display font-bold text-foreground mb-3">
              Our Journey
            </h2>
            <p className="text-muted-foreground max-w-xl mx-auto">
              From a small showroom to a state-wide EV network — our story of
              growth and impact.
            </p>
          </div>
          <div className="relative max-w-3xl mx-auto">
            <div className="absolute left-6 md:left-1/2 top-0 bottom-0 w-px bg-border -translate-x-px" />
            {timelineItems.map((item, i) => (
              <div
                key={item.year}
                className={`relative flex gap-6 mb-8 ${i % 2 === 0 ? "md:flex-row" : "md:flex-row-reverse"}`}
              >
                <div
                  className={`flex-1 ${i % 2 === 0 ? "md:text-right md:pr-8" : "md:text-left md:pl-8"} pl-14 md:pl-0`}
                >
                  <div className="bg-card border border-border rounded-xl p-5 hover:border-brand-green/40 transition-colors">
                    <span className="text-brand-green text-sm font-bold">
                      {item.year}
                    </span>
                    <h3 className="font-semibold text-foreground mt-1 mb-2">
                      {item.title}
                    </h3>
                    <p className="text-muted-foreground text-sm leading-relaxed">
                      {item.desc}
                    </p>
                  </div>
                </div>
                <div className="absolute left-4 md:left-1/2 top-5 w-5 h-5 rounded-full bg-brand-green border-2 border-background shadow -translate-x-2.5 md:-translate-x-2.5" />
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Team */}
      <section className="py-20 bg-background">
        <div className="container mx-auto px-4 lg:px-6">
          <div className="text-center mb-12">
            <Badge className="mb-3 bg-brand-green/10 text-brand-green border-brand-green/20 text-xs uppercase tracking-widest">
              Our Team
            </Badge>
            <h2 className="text-3xl md:text-4xl font-display font-bold text-foreground mb-3">
              Meet the People Behind JSR
            </h2>
          </div>

          <div className="mb-12">
            <img
              src="/assets/generated/team-photo.dim_800x500.jpg"
              alt="JSR Green Motors team"
              className="w-full max-w-4xl mx-auto rounded-2xl object-cover h-72 md:h-96 shadow-card-hover"
            />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-4xl mx-auto">
            {team.map((member) => (
              <div
                key={member.name}
                className="bg-card border border-border rounded-2xl p-6 text-center hover:border-brand-green/40 hover:shadow-green-glow-sm transition-all duration-300"
              >
                <div className="w-16 h-16 rounded-full bg-brand-green/10 border-2 border-brand-green/20 flex items-center justify-center mx-auto mb-4">
                  <Users className="h-8 w-8 text-brand-green" />
                </div>
                <h3 className="font-semibold text-foreground mb-1">
                  {member.name}
                </h3>
                <Badge className="bg-brand-green/10 text-brand-green border-brand-green/20 text-xs mb-3">
                  {member.role}
                </Badge>
                <p className="text-muted-foreground text-sm leading-relaxed">
                  {member.bio}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Vision */}
      <section className="py-20 section-gradient">
        <div className="container mx-auto px-4 lg:px-6 text-center max-w-4xl">
          <Badge className="mb-4 bg-brand-green/20 text-brand-green border-brand-green/30 text-xs uppercase tracking-widest">
            Our Vision
          </Badge>
          <h2 className="text-3xl md:text-5xl font-display font-bold text-white mb-6">
            Driving Electric Mobility Across{" "}
            <span className="text-brand-green">Andhra Pradesh & Telangana</span>
          </h2>
          <p className="text-white/65 text-lg leading-relaxed">
            We envision a future where every road in Andhra Pradesh hums with
            clean electric power. Through dealerships, service centers,
            conversion workshops, and franchise partnerships, JSR Green Motors
            is building the infrastructure for a truly electric India — one
            vehicle at a time.
          </p>
        </div>
      </section>
    </main>
  );
}

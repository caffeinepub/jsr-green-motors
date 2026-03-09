import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import { useAddAppointmentBooking } from "@/hooks/useQueries";
import {
  Battery,
  CheckCircle2,
  Loader2,
  Package,
  Tag,
  Wrench,
} from "lucide-react";
import { useEffect, useState } from "react";
import { toast } from "sonner";

const services = [
  {
    icon: Wrench,
    title: "EV Servicing",
    desc: "Complete vehicle servicing including brake adjustment, tire rotation, battery connector checks, and software updates. Keep your EV running at peak performance.",
    price: "₹500 – ₹2,000",
    features: [
      "Brake adjustment",
      "Tire rotation",
      "Battery connector check",
      "Software update",
    ],
  },
  {
    icon: Battery,
    title: "Battery Health Check",
    desc: "Comprehensive battery diagnostics to assess capacity, cell balance, and overall health. Early detection prevents expensive repairs and extends battery life.",
    price: "₹299",
    features: [
      "Capacity test",
      "Cell balance check",
      "Temperature analysis",
      "Health report",
    ],
  },
  {
    icon: Package,
    title: "Accessories Installation",
    desc: "Professional installation of EV accessories including phone mounts, top boxes, GPS trackers, USB chargers, and custom lighting.",
    price: "₹200+",
    features: [
      "Phone mounts",
      "Top box fitting",
      "GPS tracker",
      "Custom lighting",
    ],
  },
];

const serviceTypes = [
  "EV Servicing",
  "Battery Health Check",
  "Accessories Installation",
  "General Inspection",
  "Emergency Service",
  "Warranty Service",
];

const timeSlots = [
  "9:00 AM",
  "9:30 AM",
  "10:00 AM",
  "10:30 AM",
  "11:00 AM",
  "11:30 AM",
  "12:00 PM",
  "2:00 PM",
  "2:30 PM",
  "3:00 PM",
  "3:30 PM",
  "4:00 PM",
  "4:30 PM",
  "5:00 PM",
  "5:30 PM",
];

export default function ServicesPage() {
  const [bookingSuccess, setBookingSuccess] = useState(false);
  const bookingMutation = useAddAppointmentBooking();
  const [form, setForm] = useState({
    name: "",
    email: "",
    phone: "",
    service_type: "",
    preferred_date: "",
    preferred_time: "",
    notes: "",
  });

  useEffect(() => {
    document.title = "Services | JSR Electric Vehicles";
  }, []);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
  ) => {
    setForm((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      await bookingMutation.mutateAsync(form);
      setBookingSuccess(true);
      toast.success(
        "Appointment booked! Sending details to our service team...",
      );
      // Send service booking details to WhatsApp +91 9948955518 (service number)
      const msg = [
        "New Service Appointment - JSR Electric Vehicles",
        `Name: ${form.name}`,
        `Phone: ${form.phone}`,
        `Email: ${form.email}`,
        `Service: ${form.service_type}`,
        `Date: ${form.preferred_date}`,
        `Time: ${form.preferred_time}`,
        form.notes ? `Notes: ${form.notes}` : "",
      ]
        .filter(Boolean)
        .join("\n");
      window.open(
        `https://wa.me/919948955518?text=${encodeURIComponent(msg)}`,
        "_blank",
      );
    } catch {
      toast.error("Failed to book appointment. Please try again.");
    }
  };

  return (
    <main className="pt-20">
      {/* Header */}
      <section className="py-16 section-gradient">
        <div className="container mx-auto px-4 lg:px-6 text-center">
          <Badge className="mb-3 bg-brand-green/20 text-brand-green border-brand-green/30 text-xs uppercase tracking-widest">
            Professional EV Care
          </Badge>
          <h1 className="text-4xl md:text-5xl font-display font-bold text-white mb-4">
            Our Services
          </h1>
          <p className="text-white/65 max-w-2xl mx-auto">
            Expert EV maintenance, diagnostics, and accessories from certified
            technicians. Keep your electric vehicle in peak condition.
          </p>
        </div>
      </section>

      {/* Service Cards */}
      <section className="py-16 bg-background">
        <div className="container mx-auto px-4 lg:px-6">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {services.map((service) => {
              const Icon = service.icon;
              return (
                <div
                  key={service.title}
                  className="bg-card border border-border rounded-2xl p-6 hover:border-brand-green/40 hover:shadow-green-glow-sm transition-all duration-300 flex flex-col"
                >
                  <div className="w-14 h-14 rounded-2xl bg-brand-green/10 flex items-center justify-center mb-5">
                    <Icon className="h-7 w-7 text-brand-green" />
                  </div>
                  <h3 className="text-xl font-semibold text-foreground mb-3">
                    {service.title}
                  </h3>
                  <p className="text-muted-foreground text-sm leading-relaxed mb-4">
                    {service.desc}
                  </p>
                  <ul className="space-y-2 mb-5">
                    {service.features.map((f) => (
                      <li
                        key={f}
                        className="flex items-center gap-2 text-sm text-muted-foreground"
                      >
                        <div className="w-4 h-4 rounded-full bg-brand-green/15 flex items-center justify-center shrink-0">
                          <CheckCircle2 className="h-2.5 w-2.5 text-brand-green" />
                        </div>
                        {f}
                      </li>
                    ))}
                  </ul>
                  <div className="mt-auto">
                    <div className="flex items-center gap-2 mb-4">
                      <Tag className="h-4 w-4 text-brand-green" />
                      <span className="text-brand-green font-bold">
                        {service.price}
                      </span>
                    </div>
                    <a href="#book-appointment">
                      <Button
                        variant="outline"
                        className="w-full border-brand-green text-brand-green hover:bg-brand-green/10"
                      >
                        Request Quote
                      </Button>
                    </a>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Booking Form */}
      <section id="book-appointment" className="py-16 bg-brand-light-gray">
        <div className="container mx-auto px-4 lg:px-6">
          <div className="max-w-2xl mx-auto">
            <div className="text-center mb-10">
              <Badge className="mb-3 bg-brand-green/10 text-brand-green border-brand-green/20 text-xs uppercase tracking-widest">
                Book Now
              </Badge>
              <h2 className="text-3xl font-display font-bold text-foreground mb-3">
                Schedule an Appointment
              </h2>
              <p className="text-muted-foreground">
                Book your service appointment online. We'll confirm within 2
                hours.
              </p>
            </div>

            {bookingSuccess ? (
              <div className="bg-card border border-brand-green/20 rounded-2xl p-10 text-center">
                <CheckCircle2 className="h-16 w-16 text-brand-green mx-auto mb-4" />
                <h3 className="text-2xl font-semibold text-foreground mb-3">
                  Appointment Booked!
                </h3>
                <p className="text-muted-foreground mb-6">
                  Your appointment has been confirmed. We'll send a reminder
                  before your visit.
                </p>
                <Button
                  onClick={() => setBookingSuccess(false)}
                  className="bg-brand-green hover:bg-brand-green/90 text-white"
                >
                  Book Another
                </Button>
              </div>
            ) : (
              <form
                onSubmit={handleSubmit}
                className="bg-card border border-border rounded-2xl p-8 space-y-5"
              >
                <div className="grid sm:grid-cols-2 gap-4">
                  <div className="space-y-1.5">
                    <Label htmlFor="svc-name">Full Name *</Label>
                    <Input
                      id="svc-name"
                      name="name"
                      placeholder="Your name"
                      value={form.name}
                      onChange={handleChange}
                      required
                    />
                  </div>
                  <div className="space-y-1.5">
                    <Label htmlFor="svc-phone">Phone *</Label>
                    <Input
                      id="svc-phone"
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
                  <Label htmlFor="svc-email">Email *</Label>
                  <Input
                    id="svc-email"
                    name="email"
                    type="email"
                    placeholder="email@example.com"
                    value={form.email}
                    onChange={handleChange}
                    required
                  />
                </div>
                <div className="space-y-1.5">
                  <Label>Service Type *</Label>
                  <Select
                    value={form.service_type}
                    onValueChange={(v) =>
                      setForm((p) => ({ ...p, service_type: v }))
                    }
                    required
                  >
                    <SelectTrigger>
                      <SelectValue placeholder="Select service type" />
                    </SelectTrigger>
                    <SelectContent>
                      {serviceTypes.map((s) => (
                        <SelectItem key={s} value={s}>
                          {s}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
                <div className="grid sm:grid-cols-2 gap-4">
                  <div className="space-y-1.5">
                    <Label htmlFor="svc-date">Preferred Date *</Label>
                    <Input
                      id="svc-date"
                      name="preferred_date"
                      type="date"
                      min={new Date().toISOString().split("T")[0]}
                      value={form.preferred_date}
                      onChange={handleChange}
                      required
                    />
                  </div>
                  <div className="space-y-1.5">
                    <Label>Preferred Time *</Label>
                    <Select
                      value={form.preferred_time}
                      onValueChange={(v) =>
                        setForm((p) => ({ ...p, preferred_time: v }))
                      }
                      required
                    >
                      <SelectTrigger>
                        <SelectValue placeholder="Select time" />
                      </SelectTrigger>
                      <SelectContent>
                        {timeSlots.map((t) => (
                          <SelectItem key={t} value={t}>
                            {t}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>
                </div>
                <div className="space-y-1.5">
                  <Label htmlFor="svc-notes">Additional Notes</Label>
                  <Textarea
                    id="svc-notes"
                    name="notes"
                    placeholder="Describe your vehicle issue or any special requirements..."
                    value={form.notes}
                    onChange={handleChange}
                    rows={3}
                  />
                </div>
                <Button
                  type="submit"
                  disabled={bookingMutation.isPending}
                  className="w-full bg-brand-green hover:bg-brand-green/90 text-white font-semibold"
                >
                  {bookingMutation.isPending ? (
                    <>
                      <Loader2 className="h-4 w-4 mr-2 animate-spin" />{" "}
                      Booking...
                    </>
                  ) : (
                    "Book Appointment"
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

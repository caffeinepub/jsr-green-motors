import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { useAddAppointmentBooking } from "@/hooks/useQueries";
import {
  CheckCircle2,
  ChevronLeft,
  ChevronRight,
  Clock,
  Loader2,
} from "lucide-react";
import { useEffect, useState } from "react";
import { toast } from "sonner";

const TIME_SLOTS = [
  "9:00 AM",
  "10:00 AM",
  "11:00 AM",
  "12:00 PM",
  "2:00 PM",
  "3:00 PM",
  "4:00 PM",
  "5:00 PM",
];

const BRANDS = [
  "Dynamo",
  "OPG Mobility",
  "Battre",
  "Revolt Motors",
  "Kinetic Green",
  "Goeen",
  "iVOOMi",
];

const DAY_NAMES = ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"];
const MONTH_NAMES = [
  "January",
  "February",
  "March",
  "April",
  "May",
  "June",
  "July",
  "August",
  "September",
  "October",
  "November",
  "December",
];

function isSlotBooked(dayOfMonth: number, slotIndex: number): boolean {
  return (dayOfMonth + slotIndex) % 3 === 0;
}

function getDaysInMonth(year: number, month: number): number {
  return new Date(year, month + 1, 0).getDate();
}

function getFirstDayOfMonth(year: number, month: number): number {
  // 0=Sun…6=Sat → convert to Mon-based (0=Mon…6=Sun)
  const day = new Date(year, month, 1).getDay();
  return (day + 6) % 7;
}

export default function BookingCalendarPage() {
  const today = new Date();
  const [viewYear, setViewYear] = useState(today.getFullYear());
  const [viewMonth, setViewMonth] = useState(today.getMonth());
  const [selectedDay, setSelectedDay] = useState<number | null>(null);
  const [selectedTime, setSelectedTime] = useState<string | null>(null);
  const [bookingSuccess, setBookingSuccess] = useState(false);
  const [form, setForm] = useState({
    name: "",
    phone: "",
    vehicle: "",
    notes: "",
  });

  const bookingMutation = useAddAppointmentBooking();

  useEffect(() => {
    document.title = "Book a Test Drive | JSR Electric Vehicles";
  }, []);

  const daysInMonth = getDaysInMonth(viewYear, viewMonth);
  const firstDay = getFirstDayOfMonth(viewYear, viewMonth);

  const prevMonth = () => {
    if (viewMonth === 0) {
      setViewMonth(11);
      setViewYear((y) => y - 1);
    } else {
      setViewMonth((m) => m - 1);
    }
    setSelectedDay(null);
    setSelectedTime(null);
  };

  const nextMonth = () => {
    if (viewMonth === 11) {
      setViewMonth(0);
      setViewYear((y) => y + 1);
    } else {
      setViewMonth((m) => m + 1);
    }
    setSelectedDay(null);
    setSelectedTime(null);
  };

  const isPastDay = (day: number) => {
    const d = new Date(viewYear, viewMonth, day);
    const todayMidnight = new Date(
      today.getFullYear(),
      today.getMonth(),
      today.getDate(),
    );
    return d < todayMidnight;
  };

  const isToday = (day: number) =>
    viewYear === today.getFullYear() &&
    viewMonth === today.getMonth() &&
    day === today.getDate();

  const handleDayClick = (day: number) => {
    if (isPastDay(day)) return;
    setSelectedDay(day);
    setSelectedTime(null);
  };

  const selectedDateStr = selectedDay
    ? `${viewYear}-${String(viewMonth + 1).padStart(2, "0")}-${String(selectedDay).padStart(2, "0")}`
    : "";

  const selectedDateDisplay = selectedDay
    ? new Date(viewYear, viewMonth, selectedDay).toLocaleDateString("en-IN", {
        weekday: "long",
        day: "numeric",
        month: "long",
        year: "numeric",
      })
    : "";

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!selectedDay || !selectedTime) return;
    try {
      await bookingMutation.mutateAsync({
        name: form.name,
        email: "",
        phone: form.phone,
        service_type: form.vehicle || "Test Drive",
        preferred_date: selectedDateStr,
        preferred_time: selectedTime,
        notes: form.notes,
      });
      setBookingSuccess(true);
      toast.success("Test drive booked! Redirecting to WhatsApp...");
      // Send test drive booking details to WhatsApp +91 9948955517 (sales number)
      const msg = [
        "New Test Drive Booking - JSR Electric Vehicles",
        `Name: ${form.name}`,
        `Phone: ${form.phone}`,
        `Vehicle Interest: ${form.vehicle || "Not specified"}`,
        `Date: ${selectedDateDisplay}`,
        `Time: ${selectedTime}`,
        form.notes ? `Notes: ${form.notes}` : "",
      ]
        .filter(Boolean)
        .join("\n");
      window.open(
        `https://wa.me/919948955517?text=${encodeURIComponent(msg)}`,
        "_blank",
      );
    } catch {
      toast.error("Booking failed. Please try again.");
    }
  };

  if (bookingSuccess) {
    return (
      <main className="pt-20 min-h-screen bg-background">
        <div className="container mx-auto px-4 lg:px-6 py-20">
          <div className="max-w-md mx-auto text-center">
            <div
              className="w-20 h-20 rounded-full bg-brand-green/15 flex items-center justify-center mx-auto mb-6"
              data-ocid="booking.success_state"
            >
              <CheckCircle2 className="h-10 w-10 text-brand-green" />
            </div>
            <h2 className="text-2xl font-display font-bold text-foreground mb-3">
              Booking Confirmed!
            </h2>
            <p className="text-muted-foreground mb-2">
              Our team will call you to confirm your test drive.
            </p>
            <div className="bg-brand-green/10 border border-brand-green/25 rounded-xl px-5 py-4 mb-6 text-sm">
              <div className="flex justify-between mb-1">
                <span className="text-muted-foreground">Date</span>
                <span className="font-medium text-foreground">
                  {selectedDateDisplay}
                </span>
              </div>
              <div className="flex justify-between">
                <span className="text-muted-foreground">Time</span>
                <span className="font-medium text-foreground">
                  {selectedTime}
                </span>
              </div>
            </div>
            <Button
              onClick={() => {
                setBookingSuccess(false);
                setSelectedDay(null);
                setSelectedTime(null);
                setForm({ name: "", phone: "", vehicle: "", notes: "" });
              }}
              className="bg-brand-green hover:bg-brand-green/90 text-white font-semibold"
              data-ocid="booking.primary_button"
            >
              Book Another
            </Button>
          </div>
        </div>
      </main>
    );
  }

  return (
    <main className="pt-20">
      {/* Header */}
      <section className="py-12 section-gradient">
        <div className="container mx-auto px-4 lg:px-6 text-center">
          <Badge className="mb-3 bg-brand-green/20 text-brand-green border-brand-green/30 text-xs uppercase tracking-widest">
            Schedule a Visit
          </Badge>
          <h1 className="text-3xl md:text-4xl font-display font-bold text-white mb-3">
            Book a Test Drive
          </h1>
          <p className="text-white/60 max-w-xl mx-auto text-sm">
            Choose your preferred date and time at JSR Electric Vehicles, Kodad.
            Our EV experts will guide you through any model of your choice.
          </p>
        </div>
      </section>

      <section className="py-12 bg-background">
        <div className="container mx-auto px-4 lg:px-6 max-w-5xl">
          <div className="grid lg:grid-cols-[1.1fr_1fr] gap-8">
            {/* Left: Calendar + time slots */}
            <div>
              {/* Calendar */}
              <div className="bg-card border border-border rounded-2xl overflow-hidden mb-6">
                {/* Month nav */}
                <div className="flex items-center justify-between px-5 py-4 border-b border-border">
                  <button
                    type="button"
                    onClick={prevMonth}
                    data-ocid="booking.pagination_prev"
                    className="p-1.5 rounded-lg hover:bg-muted transition-colors text-muted-foreground hover:text-foreground"
                  >
                    <ChevronLeft className="h-5 w-5" />
                  </button>
                  <span className="font-semibold text-foreground">
                    {MONTH_NAMES[viewMonth]} {viewYear}
                  </span>
                  <button
                    type="button"
                    onClick={nextMonth}
                    data-ocid="booking.pagination_next"
                    className="p-1.5 rounded-lg hover:bg-muted transition-colors text-muted-foreground hover:text-foreground"
                  >
                    <ChevronRight className="h-5 w-5" />
                  </button>
                </div>

                {/* Day headers */}
                <div className="grid grid-cols-7 border-b border-border">
                  {DAY_NAMES.map((d) => (
                    <div
                      key={d}
                      className="py-2 text-center text-xs font-semibold text-muted-foreground"
                    >
                      {d}
                    </div>
                  ))}
                </div>

                {/* Days grid */}
                <div
                  className="grid grid-cols-7 p-3 gap-1"
                  data-ocid="booking.panel"
                >
                  {/* Empty cells for first week offset - stable keys based on month/year */}
                  {Array.from(
                    { length: firstDay },
                    (_v, _k) => `${viewYear}-${viewMonth}-pad-${_k}`,
                  ).map((k) => (
                    <div key={k} />
                  ))}
                  {Array.from({ length: daysInMonth }, (_, i) => {
                    const day = i + 1;
                    const past = isPastDay(day);
                    const todayDay = isToday(day);
                    const selected = selectedDay === day;
                    return (
                      <button
                        type="button"
                        key={day}
                        onClick={() => handleDayClick(day)}
                        disabled={past}
                        data-ocid="booking.toggle"
                        className={`aspect-square rounded-xl text-sm font-medium transition-all duration-150 flex items-center justify-center ${
                          past
                            ? "text-muted-foreground/30 cursor-not-allowed"
                            : selected
                              ? "bg-brand-green text-white shadow-[0_0_12px_oklch(0.62_0.19_155/0.4)]"
                              : todayDay
                                ? "border border-brand-green text-brand-green hover:bg-brand-green/10"
                                : "text-foreground hover:bg-muted"
                        }`}
                      >
                        {day}
                      </button>
                    );
                  })}
                </div>
              </div>

              {/* Time slots */}
              {selectedDay && (
                <div className="bg-card border border-border rounded-2xl p-5">
                  <div className="flex items-center gap-2 mb-4">
                    <Clock className="h-4 w-4 text-brand-green" />
                    <h3 className="font-semibold text-foreground text-sm">
                      Available Slots — {selectedDateDisplay}
                    </h3>
                  </div>
                  <div className="grid grid-cols-2 sm:grid-cols-4 lg:grid-cols-2 xl:grid-cols-4 gap-2">
                    {TIME_SLOTS.map((slot, slotIdx) => {
                      const booked = isSlotBooked(selectedDay, slotIdx);
                      const chosen = selectedTime === slot;
                      return (
                        <button
                          type="button"
                          key={slot}
                          disabled={booked}
                          onClick={() => setSelectedTime(slot)}
                          data-ocid="booking.toggle"
                          className={`py-2 px-3 rounded-xl text-sm font-medium border transition-all duration-150 ${
                            booked
                              ? "bg-muted/50 border-border/40 text-muted-foreground/40 cursor-not-allowed"
                              : chosen
                                ? "bg-brand-green border-brand-green text-white shadow-[0_0_10px_oklch(0.62_0.19_155/0.3)]"
                                : "border-border hover:border-brand-green/50 hover:bg-brand-green/8 text-foreground"
                          }`}
                        >
                          {booked ? (
                            <span className="text-xs">Booked</span>
                          ) : (
                            slot
                          )}
                        </button>
                      );
                    })}
                  </div>
                </div>
              )}
            </div>

            {/* Right: Booking form */}
            <div>
              {selectedDay && selectedTime ? (
                <div className="bg-card border border-border rounded-2xl p-6">
                  <div className="flex items-center gap-2 mb-1">
                    <CheckCircle2 className="h-4 w-4 text-brand-green" />
                    <h3 className="font-semibold text-foreground">
                      Your Selection
                    </h3>
                  </div>
                  <div className="bg-brand-green/8 border border-brand-green/20 rounded-xl px-4 py-3 text-sm mb-6">
                    <div className="flex justify-between mb-0.5">
                      <span className="text-muted-foreground">Date</span>
                      <span className="font-medium text-foreground">
                        {selectedDateDisplay}
                      </span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-muted-foreground">Time</span>
                      <span className="font-medium text-brand-green">
                        {selectedTime}
                      </span>
                    </div>
                  </div>

                  <form onSubmit={handleSubmit} className="space-y-4">
                    <div className="space-y-1.5">
                      <Label htmlFor="bk-name">Full Name *</Label>
                      <Input
                        id="bk-name"
                        placeholder="Your name"
                        value={form.name}
                        onChange={(e) =>
                          setForm((p) => ({ ...p, name: e.target.value }))
                        }
                        required
                        data-ocid="booking.input"
                      />
                    </div>
                    <div className="space-y-1.5">
                      <Label htmlFor="bk-phone">Phone Number *</Label>
                      <Input
                        id="bk-phone"
                        type="tel"
                        placeholder="+91 XXXXX XXXXX"
                        value={form.phone}
                        onChange={(e) =>
                          setForm((p) => ({ ...p, phone: e.target.value }))
                        }
                        required
                        data-ocid="booking.input"
                      />
                    </div>
                    <div className="space-y-1.5">
                      <Label htmlFor="bk-vehicle">Vehicle Interested In</Label>
                      <select
                        id="bk-vehicle"
                        value={form.vehicle}
                        onChange={(e) =>
                          setForm((p) => ({ ...p, vehicle: e.target.value }))
                        }
                        data-ocid="booking.select"
                        className="w-full h-10 rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2"
                      >
                        <option value="">Select a brand / model…</option>
                        {BRANDS.map((b) => (
                          <option key={b} value={b}>
                            {b}
                          </option>
                        ))}
                        <option value="Not sure yet">Not sure yet</option>
                      </select>
                    </div>
                    <div className="space-y-1.5">
                      <Label htmlFor="bk-notes">Notes (optional)</Label>
                      <Textarea
                        id="bk-notes"
                        placeholder="Any specific model, questions, or requirements…"
                        value={form.notes}
                        onChange={(e) =>
                          setForm((p) => ({ ...p, notes: e.target.value }))
                        }
                        rows={3}
                        data-ocid="booking.textarea"
                      />
                    </div>
                    <Button
                      type="submit"
                      disabled={bookingMutation.isPending}
                      className="w-full bg-brand-green hover:bg-brand-green/90 text-white font-semibold"
                      data-ocid="booking.submit_button"
                    >
                      {bookingMutation.isPending ? (
                        <>
                          <Loader2 className="h-4 w-4 mr-2 animate-spin" />
                          Confirming…
                        </>
                      ) : (
                        "Confirm Booking"
                      )}
                    </Button>
                  </form>
                </div>
              ) : (
                <div className="bg-card border border-dashed border-border rounded-2xl p-8 h-full flex flex-col items-center justify-center text-center gap-3">
                  <div
                    className="w-16 h-16 rounded-full bg-brand-green/10 flex items-center justify-center"
                    data-ocid="booking.panel"
                  >
                    <Clock className="h-8 w-8 text-brand-green/60" />
                  </div>
                  <h3 className="font-semibold text-foreground">
                    {!selectedDay ? "Pick a Date" : "Pick a Time Slot"}
                  </h3>
                  <p className="text-muted-foreground text-sm max-w-xs">
                    {!selectedDay
                      ? "Select a date from the calendar to see available time slots."
                      : "Choose an available time slot to continue with booking."}
                  </p>
                </div>
              )}

              {/* Info strip */}
              <div className="mt-4 bg-brand-green/5 border border-brand-green/20 rounded-xl px-4 py-3 text-sm text-muted-foreground">
                📍 JSR Electric Vehicles, Suryapet Road, Kodad, Telangana –
                508206 · ☎️{" "}
                <a
                  href="tel:+919948955517"
                  className="text-brand-green font-medium hover:underline"
                >
                  +91 9948955517
                </a>
              </div>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}

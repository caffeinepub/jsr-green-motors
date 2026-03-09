import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { useAddQuoteRequest } from "@/hooks/useQueries";
import { CheckCircle2, Loader2 } from "lucide-react";
import { useState } from "react";
import { toast } from "sonner";

interface QuoteModalProps {
  open: boolean;
  onClose: () => void;
  defaultVehicleInterest?: string;
}

export default function QuoteModal({
  open,
  onClose,
  defaultVehicleInterest = "",
}: QuoteModalProps) {
  const [form, setForm] = useState({
    name: "",
    email: "",
    phone: "",
    vehicle_interest: defaultVehicleInterest,
    message: "",
  });
  const [success, setSuccess] = useState(false);
  const quoteMutation = useAddQuoteRequest();

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
  ) => {
    setForm((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      await quoteMutation.mutateAsync(form);
      setSuccess(true);
      toast.success("Quote request submitted! Redirecting to WhatsApp...");
      // Send enquiry details to WhatsApp +91 9948955517
      const msg = [
        "Hello JSR Electric Vehicles,",
        `Name: ${form.name}`,
        `Phone: ${form.phone}`,
        `Email: ${form.email}`,
        form.vehicle_interest
          ? `Vehicle Interest: ${form.vehicle_interest}`
          : "",
        form.message ? `Message: ${form.message}` : "",
      ]
        .filter(Boolean)
        .join("\n");
      window.open(
        `https://wa.me/919948955517?text=${encodeURIComponent(msg)}`,
        "_blank",
      );
    } catch {
      toast.error("Failed to submit. Please try again.");
    }
  };

  const handleClose = () => {
    setSuccess(false);
    setForm({
      name: "",
      email: "",
      phone: "",
      vehicle_interest: defaultVehicleInterest,
      message: "",
    });
    onClose();
  };

  return (
    <Dialog open={open} onOpenChange={handleClose}>
      <DialogContent className="sm:max-w-md bg-card border-border">
        <DialogHeader>
          <DialogTitle className="text-foreground text-xl font-display">
            Get a Quote
          </DialogTitle>
          <DialogDescription className="text-muted-foreground">
            Fill in your details and we&apos;ll get back to you within 24 hours.
          </DialogDescription>
        </DialogHeader>

        {success ? (
          <div className="py-8 flex flex-col items-center gap-4 text-center">
            <CheckCircle2 className="h-16 w-16 text-brand-green" />
            <h3 className="text-lg font-semibold text-foreground">
              Quote Request Submitted!
            </h3>
            <p className="text-muted-foreground text-sm">
              Thank you! Our team will contact you within 24 hours.
            </p>
            <Button
              onClick={handleClose}
              className="bg-brand-green hover:bg-brand-green/90 text-white"
            >
              Close
            </Button>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="space-y-1.5">
              <Label htmlFor="quote-name">Full Name *</Label>
              <Input
                id="quote-name"
                name="name"
                placeholder="Your name"
                value={form.name}
                onChange={handleChange}
                required
              />
            </div>
            <div className="grid grid-cols-2 gap-3">
              <div className="space-y-1.5">
                <Label htmlFor="quote-email">Email *</Label>
                <Input
                  id="quote-email"
                  name="email"
                  type="email"
                  placeholder="email@example.com"
                  value={form.email}
                  onChange={handleChange}
                  required
                />
              </div>
              <div className="space-y-1.5">
                <Label htmlFor="quote-phone">Phone *</Label>
                <Input
                  id="quote-phone"
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
              <Label htmlFor="quote-vehicle">Vehicle Interest</Label>
              <Input
                id="quote-vehicle"
                name="vehicle_interest"
                placeholder="e.g. Electric Scooter, E-Bike"
                value={form.vehicle_interest}
                onChange={handleChange}
              />
            </div>
            <div className="space-y-1.5">
              <Label htmlFor="quote-message">Message</Label>
              <Textarea
                id="quote-message"
                name="message"
                placeholder="Tell us about your requirements..."
                value={form.message}
                onChange={handleChange}
                rows={3}
              />
            </div>
            <Button
              type="submit"
              disabled={quoteMutation.isPending}
              className="w-full bg-brand-green hover:bg-brand-green/90 text-white font-semibold"
            >
              {quoteMutation.isPending ? (
                <>
                  <Loader2 className="h-4 w-4 mr-2 animate-spin" />{" "}
                  Submitting...
                </>
              ) : (
                "Submit Request"
              )}
            </Button>
          </form>
        )}
      </DialogContent>
    </Dialog>
  );
}

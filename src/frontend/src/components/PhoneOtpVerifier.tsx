import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useCallback, useEffect, useState } from "react";

interface PhoneOtpVerifierProps {
  phone: string;
  onVerified: () => void;
  onReset?: () => void;
  verified: boolean;
}

const OTP_LENGTH = 6;
const RESEND_SECONDS = 30;

// Mock OTP generator — replace with real Twilio HTTP outcall when credentials are ready
function generateMockOtp(): string {
  return Math.floor(100000 + Math.random() * 900000).toString();
}

export function PhoneOtpVerifier({
  phone,
  onVerified,
  onReset,
  verified,
}: PhoneOtpVerifierProps) {
  const [stage, setStage] = useState<"idle" | "sent" | "verified">(
    verified ? "verified" : "idle",
  );
  const [otp, setOtp] = useState("");
  const [sentOtp, setSentOtp] = useState("");
  const [error, setError] = useState("");
  const [countdown, setCountdown] = useState(0);
  const [sending, setSending] = useState(false);

  useEffect(() => {
    if (verified) setStage("verified");
  }, [verified]);

  useEffect(() => {
    if (countdown <= 0) return;
    const t = setTimeout(() => setCountdown((c) => c - 1), 1000);
    return () => clearTimeout(t);
  }, [countdown]);

  const sendOtp = useCallback(async () => {
    if (!phone || phone.replace(/\D/g, "").length < 10) {
      setError("Please enter a valid 10-digit phone number first.");
      return;
    }
    setSending(true);
    setError("");
    // Mock: generate OTP and log it (replace with real API call)
    const code = generateMockOtp();
    setSentOtp(code);
    // TODO: Replace the two lines below with real Twilio HTTP outcall
    // await sendSms(phone, `Your JSR Electric Vehicles OTP is: ${code}`);
    // await sendWhatsApp(phone, `Your JSR Electric Vehicles OTP is: ${code}`);
    console.info(`[DEV] OTP for ${phone}: ${code}`);
    // Simulate network delay
    await new Promise((r) => setTimeout(r, 800));
    setSending(false);
    setStage("sent");
    setCountdown(RESEND_SECONDS);
    setOtp("");
  }, [phone]);

  const verifyOtp = useCallback(() => {
    if (otp.trim() === sentOtp) {
      setStage("verified");
      setError("");
      onVerified();
    } else {
      setError("Incorrect OTP. Please try again.");
    }
  }, [otp, sentOtp, onVerified]);

  const reset = useCallback(() => {
    setStage("idle");
    setOtp("");
    setSentOtp("");
    setError("");
    setCountdown(0);
    onReset?.();
  }, [onReset]);

  if (stage === "verified") {
    return (
      <div
        className="flex items-center gap-2 text-sm text-green-600 font-medium"
        data-ocid="otp.success_state"
      >
        <svg
          className="w-4 h-4"
          fill="currentColor"
          viewBox="0 0 20 20"
          role="img"
          aria-label="Verified"
        >
          <path
            fillRule="evenodd"
            d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
            clipRule="evenodd"
          />
        </svg>
        Phone number verified
        <button
          type="button"
          onClick={reset}
          className="text-xs text-gray-400 underline ml-1"
          data-ocid="otp.cancel_button"
        >
          Change
        </button>
      </div>
    );
  }

  if (stage === "sent") {
    return (
      <div className="space-y-2" data-ocid="otp.panel">
        <p className="text-xs text-gray-500">
          OTP sent to{" "}
          <span className="font-semibold text-gray-700">{phone}</span> via
          WhatsApp &amp; SMS.
          {/* When Twilio is connected, this will be delivered in real-time */}
        </p>
        <div className="flex gap-2">
          <Input
            type="text"
            inputMode="numeric"
            maxLength={OTP_LENGTH}
            placeholder="Enter 6-digit OTP"
            value={otp}
            onChange={(e) => {
              setOtp(e.target.value.replace(/\D/g, ""));
              setError("");
            }}
            className="flex-1"
            data-ocid="otp.input"
          />
          <Button
            type="button"
            onClick={verifyOtp}
            className="bg-green-600 hover:bg-green-700 text-white px-4"
            data-ocid="otp.confirm_button"
          >
            Verify
          </Button>
        </div>
        {error && (
          <p className="text-xs text-red-500" data-ocid="otp.error_state">
            {error}
          </p>
        )}
        <div className="flex items-center gap-3 text-xs text-gray-500">
          {countdown > 0 ? (
            <span>Resend in {countdown}s</span>
          ) : (
            <button
              type="button"
              onClick={sendOtp}
              className="text-green-600 underline"
              data-ocid="otp.secondary_button"
            >
              Resend OTP
            </button>
          )}
          <button
            type="button"
            onClick={reset}
            className="text-gray-400 underline"
            data-ocid="otp.cancel_button"
          >
            Change number
          </button>
        </div>
      </div>
    );
  }

  return (
    <div data-ocid="otp.panel">
      <Button
        type="button"
        variant="outline"
        size="sm"
        onClick={sendOtp}
        disabled={sending || !phone}
        className="border-green-600 text-green-700 hover:bg-green-50 w-full"
        data-ocid="otp.primary_button"
      >
        {sending ? "Sending OTP..." : "Verify Phone Number"}
      </Button>
      {error && (
        <p className="text-xs text-red-500 mt-1" data-ocid="otp.error_state">
          {error}
        </p>
      )}
    </div>
  );
}

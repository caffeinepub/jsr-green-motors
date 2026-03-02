import { SiWhatsapp } from "react-icons/si";

export default function WhatsAppButton() {
  return (
    <a
      href="https://wa.me/91XXXXXXXXXX?text=Hello%2C%20I%20am%20interested%20in%20JSR%20Green%20Motors%20products%20and%20services."
      target="_blank"
      rel="noopener noreferrer"
      aria-label="Chat on WhatsApp"
      className="fixed bottom-6 right-6 z-50 w-14 h-14 bg-[#25D366] hover:bg-[#20bd5a] text-white rounded-full shadow-lg flex items-center justify-center transition-transform hover:scale-110 active:scale-95"
      style={{ boxShadow: "0 4px 20px rgba(37, 211, 102, 0.4)" }}
    >
      <SiWhatsapp className="h-7 w-7" />
    </a>
  );
}

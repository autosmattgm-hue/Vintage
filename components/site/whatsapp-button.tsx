import { MessageCircle } from "lucide-react";
import { siteConfig } from "@/lib/site";

export function WhatsAppButton() {
  const phone = siteConfig.phone.replace(/\D/g, "");
  const message = encodeURIComponent(
    "Bonjour Paris Fashion Vintage, I would like to ask about a vintage piece or book a boutique visit."
  );

  return (
    <a
      href={`https://wa.me/${phone}?text=${message}`}
      target="_blank"
      rel="noreferrer"
      className="fixed bottom-[max(1rem,env(safe-area-inset-bottom))] left-[max(1rem,env(safe-area-inset-left))] z-50 inline-flex min-h-12 items-center gap-2 rounded-full border border-gold-300/30 bg-couture-ink/88 px-4 text-sm font-medium text-couture-cream shadow-glow backdrop-blur transition hover:-translate-y-0.5 hover:bg-couture-noir focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-gold-300"
      aria-label="Message Paris Fashion Vintage on WhatsApp"
    >
      <MessageCircle className="h-5 w-5 text-gold-300" aria-hidden="true" />
      WhatsApp
    </a>
  );
}

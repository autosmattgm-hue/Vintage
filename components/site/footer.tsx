import { Instagram, Mail, MapPin, Phone } from "lucide-react";
import Link from "next/link";
import { NewsletterMini } from "@/components/sections/newsletter";
import { siteConfig } from "@/lib/site";

const footerLinks = [
  {
    title: "Boutique",
    links: [
      { href: "/shop", label: "Shop all" },
      { href: "/collections/designer", label: "Designer collections" },
      { href: "/collections/bags", label: "Vintage bags" },
      { href: "/lookbook", label: "Lookbook" }
    ]
  },
  {
    title: "Service",
    links: [
      { href: "/contact", label: "Plan a visit" },
      { href: "/account", label: "Account" },
      { href: "/wishlist", label: "Wishlist" },
      { href: "/journal", label: "Fashion journal" }
    ]
  }
];

export function Footer() {
  return (
    <footer className="border-t bg-couture-ink text-couture-cream">
      <div className="container grid gap-10 py-12 md:py-14 lg:grid-cols-[minmax(0,1.2fr)_minmax(0,0.8fr)_minmax(0,0.8fr)_minmax(0,1fr)]">
        <div>
          <Link href="/" className="font-serif text-[clamp(2rem,7vw,2.25rem)] leading-none">
            Paris Fashion Vintage
          </Link>
          <p className="mt-4 max-w-sm text-sm leading-6 text-couture-cream/65">
            Luxury vintage fashion, designer bags, jewelry, shoes, and curated Saint Laurent pieces in Paris.
          </p>
          <div className="mt-6 space-y-3 text-sm text-couture-cream/75">
            <p className="flex gap-3">
              <MapPin className="mt-0.5 h-4 w-4 text-gold-300" aria-hidden="true" />
              {siteConfig.address}
            </p>
            <p className="flex gap-3">
              <Phone className="mt-0.5 h-4 w-4 text-gold-300" aria-hidden="true" />
              {siteConfig.phone}
            </p>
            <p className="flex gap-3">
              <Mail className="mt-0.5 h-4 w-4 text-gold-300" aria-hidden="true" />
              {siteConfig.email}
            </p>
          </div>
        </div>

        {footerLinks.map((group) => (
          <div key={group.title}>
            <h2 className="editorial-kicker text-xs text-gold-300">{group.title}</h2>
            <ul className="mt-5 space-y-3 text-sm text-couture-cream/70">
              {group.links.map((link) => (
                <li key={link.href}>
                  <Link href={link.href} className="luxury-link hover:text-couture-cream">
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        ))}

        <div>
          <h2 className="editorial-kicker text-xs text-gold-300">Private List</h2>
          <p className="mt-5 text-sm leading-6 text-couture-cream/70">
            Receive new arrivals, stylist notes, and one-of-one drop alerts.
          </p>
          <NewsletterMini />
          <a
            href={siteConfig.socials.instagram}
            className="mt-5 inline-flex items-center gap-2 text-sm text-couture-cream/70 hover:text-couture-cream"
          >
            <Instagram className="h-4 w-4" aria-hidden="true" />
            Instagram
          </a>
        </div>
      </div>
      <div className="border-t border-white/10 py-5">
        <div className="container flex flex-col gap-3 text-xs text-couture-cream/50 md:flex-row md:items-center md:justify-between">
          <p>© {new Date().getFullYear()} Paris Fashion Vintage. All rights reserved.</p>
          <p>Secure checkout, local pickup, and privacy-first customer accounts.</p>
        </div>
      </div>
    </footer>
  );
}

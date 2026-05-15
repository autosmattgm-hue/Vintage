export const siteConfig = {
  name: "Paris Fashion Vintage",
  tagline: "Curated Vintage Luxury",
  url: process.env.NEXT_PUBLIC_SITE_URL ?? "http://localhost:3000",
  address: "68 Bd de Port-Royal, 75005 Paris, France",
  phone: "+33 6 82 95 82 15",
  email: "bonjour@parisfashionvintage.fr",
  rating: "4.6",
  socials: {
    instagram: "https://www.instagram.com/",
    tiktok: "https://www.tiktok.com/",
    pinterest: "https://www.pinterest.com/"
  }
};

export function absoluteUrl(path: string) {
  return `${siteConfig.url}${path.startsWith("/") ? path : `/${path}`}`;
}

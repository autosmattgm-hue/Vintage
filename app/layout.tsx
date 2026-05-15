import type { Metadata, Viewport } from "next";
import { Cormorant_Garamond, Inter } from "next/font/google";
import { JsonLd } from "@/components/seo/json-ld";
import { VivienneConcierge } from "@/components/ai/vivienne-concierge";
import { Footer } from "@/components/site/footer";
import { Navigation } from "@/components/site/navigation";
import { WhatsAppButton } from "@/components/site/whatsapp-button";
import { CartDrawer } from "@/components/store/cart-drawer";
import { CartProvider } from "@/components/store/cart-provider";
import { LanguageProvider } from "@/components/language/language-provider";
import { ThemeProvider } from "@/components/theme-provider";
import { siteConfig } from "@/lib/site";
import "./globals.css";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-sans",
  display: "swap"
});

const cormorant = Cormorant_Garamond({
  subsets: ["latin"],
  variable: "--font-serif",
  display: "swap",
  weight: ["400", "500", "600", "700"]
});

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  maximumScale: 5,
  themeColor: [
    { media: "(prefers-color-scheme: light)", color: "#f6f0e6" },
    { media: "(prefers-color-scheme: dark)", color: "#070707" }
  ]
};

export const metadata: Metadata = {
  metadataBase: new URL(siteConfig.url),
  title: {
    default: "Paris Fashion Vintage | Luxury Vintage Boutique in Paris",
    template: "%s | Paris Fashion Vintage"
  },
  description:
    "Shop curated luxury vintage fashion, designer bags, jewelry, shoes, and Saint Laurent pieces at Paris Fashion Vintage, 68 Bd de Port-Royal, Paris.",
  keywords: [
    "Paris vintage fashion",
    "luxury vintage boutique Paris",
    "designer vintage bags",
    "Saint Laurent vintage Paris",
    "curated luxury fashion"
  ],
  authors: [{ name: "Paris Fashion Vintage" }],
  creator: "Paris Fashion Vintage",
  publisher: "Paris Fashion Vintage",
  alternates: {
    canonical: "/"
  },
  openGraph: {
    type: "website",
    locale: "en_US",
    url: siteConfig.url,
    siteName: "Paris Fashion Vintage",
    title: "Paris Fashion Vintage | Curated Vintage Luxury",
    description:
      "A warm, elegant Paris boutique for vintage luxury fashion lovers, collectors, and designer bag seekers.",
    images: [
      {
        url: "/opengraph-image",
        width: 1200,
        height: 630,
        alt: "Paris Fashion Vintage editorial storefront"
      }
    ]
  },
  twitter: {
    card: "summary_large_image",
    title: "Paris Fashion Vintage",
    description: "Luxury vintage boutique in Paris for designer fashion lovers.",
    images: ["/opengraph-image"]
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-image-preview": "large",
      "max-snippet": -1
    }
  }
};

export default function RootLayout({
  children
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="fr" className="dark" suppressHydrationWarning>
      <body className={`${inter.variable} ${cormorant.variable} font-sans antialiased`}>
        <ThemeProvider attribute="class" defaultTheme="dark" enableSystem disableTransitionOnChange>
          <LanguageProvider>
            <CartProvider>
              <JsonLd />
              <Navigation />
              <main className="min-h-screen">{children}</main>
              <Footer />
              <CartDrawer />
              <VivienneConcierge />
              <WhatsAppButton />
            </CartProvider>
          </LanguageProvider>
        </ThemeProvider>
      </body>
    </html>
  );
}

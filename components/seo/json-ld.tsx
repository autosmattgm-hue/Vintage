import { products } from "@/lib/catalog";
import { siteConfig } from "@/lib/site";

export function JsonLd() {
  const localBusiness = {
    "@context": "https://schema.org",
    "@type": "ClothingStore",
    name: siteConfig.name,
    image: `${siteConfig.url}/opengraph-image`,
    url: siteConfig.url,
    telephone: siteConfig.phone,
    address: {
      "@type": "PostalAddress",
      streetAddress: "68 Bd de Port-Royal",
      postalCode: "75005",
      addressLocality: "Paris",
      addressCountry: "FR"
    },
    aggregateRating: {
      "@type": "AggregateRating",
      ratingValue: siteConfig.rating,
      reviewCount: 118
    },
    priceRange: "€€€",
    hasOfferCatalog: {
      "@type": "OfferCatalog",
      name: "Luxury vintage fashion",
      itemListElement: products.slice(0, 6).map((product) => ({
        "@type": "Offer",
        itemOffered: {
          "@type": "Product",
          name: product.name,
          image: product.images[0],
          description: product.description,
          brand: product.designer
        },
        price: product.price / 100,
        priceCurrency: "EUR",
        availability: product.inventory > 0 ? "https://schema.org/InStock" : "https://schema.org/OutOfStock"
      }))
    }
  };

  return (
    <script
      type="application/ld+json"
      suppressHydrationWarning
      dangerouslySetInnerHTML={{ __html: JSON.stringify(localBusiness) }}
    />
  );
}

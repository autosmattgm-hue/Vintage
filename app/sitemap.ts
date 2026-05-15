import type { MetadataRoute } from "next";
import { collections, products } from "@/lib/catalog";
import { journalPosts } from "@/lib/journal";
import { siteConfig } from "@/lib/site";

const staticRoutes = [
  "",
  "/shop",
  "/about",
  "/contact",
  "/journal",
  "/wishlist",
  "/cart",
  "/lookbook",
  "/fr",
  "/fr/sacs-vintage-createur-paris",
  "/fr/bijoux-vintage-paris",
  "/fr/saint-laurent-vintage-paris",
  "/collections/designer",
  "/collections/bags",
  "/collections/jewelry",
  "/collections/shoes"
];

export default function sitemap(): MetadataRoute.Sitemap {
  const now = new Date();

  return [
    ...staticRoutes.map((route) => ({
      url: `${siteConfig.url}${route}`,
      lastModified: now,
      changeFrequency: "weekly" as const,
      priority: route === "" ? 1 : 0.8
    })),
    ...products.map((product) => ({
      url: `${siteConfig.url}/product/${product.slug}`,
      lastModified: now,
      changeFrequency: "daily" as const,
      priority: 0.9
    })),
    ...journalPosts.map((post) => ({
      url: `${siteConfig.url}/journal/${post.slug}`,
      lastModified: now,
      changeFrequency: "monthly" as const,
      priority: 0.7
    })),
    ...collections.map((collection) => ({
      url: `${siteConfig.url}${collection.href}`,
      lastModified: now,
      changeFrequency: "weekly" as const,
      priority: 0.8
    }))
  ];
}

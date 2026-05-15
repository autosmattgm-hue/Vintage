import { fashionImage } from "@/lib/images";

export type ProductCategory = "Bags" | "Jewelry" | "Shoes" | "Outerwear" | "Tailoring" | "Accessories";
export type InventoryStatus = "Available" | "Reserved" | "Sold" | "In boutique only";

export type Product = {
  id: string;
  slug: string;
  name: string;
  designer: string;
  category: ProductCategory;
  collection: "Designer Icons" | "Vintage Bags" | "Jewelry" | "Shoes" | "Paris Edit";
  price: number;
  compareAtPrice?: number;
  description: string;
  images: string[];
  condition: string;
  era: string;
  material: string;
  color: string;
  inventory: number;
  size?: string;
  status?: InventoryStatus;
  featured: boolean;
  badges: string[];
  tags: string[];
};

export type Collection = {
  title: string;
  href: string;
  image: string;
  description: string;
  count: string;
};

const img = (id: string, _width = 1400) => fashionImage(id);

export const products: Product[] = [
  {
    id: "pfv-001",
    slug: "vintage-saint-laurent-bag",
    name: "Vintage Saint Laurent Bag",
    designer: "Saint Laurent",
    category: "Bags",
    collection: "Designer Icons",
    price: 128000,
    compareAtPrice: 148000,
    description:
      "A structured black leather Saint Laurent shoulder bag with polished gold-tone hardware, selected for its elegant proportions and immaculate evening-to-day versatility.",
    images: [
      img("photo-1594223274512-ad4803739b7c", 1500),
      img("photo-1584917865442-de89df76afd3", 1200),
      img("photo-1585488433860-f8a6f53ec2ab", 1200)
    ],
    condition: "Excellent vintage condition",
    era: "1990s",
    material: "Calf leather, gold-tone hardware",
    color: "Black",
    inventory: 1,
    featured: true,
    badges: ["One of one", "Saint Laurent"],
    tags: ["designer vintage bags", "Saint Laurent vintage Paris", "luxury vintage boutique Paris"]
  },
  {
    id: "pfv-002",
    slug: "parisian-leather-heels",
    name: "Parisian Leather Heels",
    designer: "Paris Atelier",
    category: "Shoes",
    collection: "Shoes",
    price: 34000,
    description:
      "Sculpted leather heels with a narrow ankle line and quietly dramatic profile, perfect for dinners, gallery evenings, and tailored vintage looks.",
    images: [
      img("photo-1543163521-1bf539c55dd2", 1500),
      img("photo-1542291026-7eec264c27ff", 1200),
      img("photo-1511556820780-d912e42b4980", 1200)
    ],
    condition: "Very good, light sole wear",
    era: "2000s",
    material: "Leather upper and sole",
    color: "Patent black",
    inventory: 1,
    featured: true,
    badges: ["Boutique pickup"],
    tags: ["vintage designer shoes", "Paris vintage fashion"]
  },
  {
    id: "pfv-003",
    slug: "gold-luxe-necklace",
    name: "Gold Luxe Necklace",
    designer: "French Vintage",
    category: "Jewelry",
    collection: "Jewelry",
    price: 22000,
    description:
      "A luminous gold-tone chain necklace with subtle sculptural weight, curated to bring warmth to silk blouses, black dresses, and tailored blazers.",
    images: [
      img("photo-1611591437281-460bfbe1220a", 1500),
      img("photo-1515562141207-7a88fb7ce338", 1200),
      img("photo-1606760227091-3dd870d97f1d", 1200)
    ],
    condition: "Excellent vintage condition",
    era: "1980s",
    material: "Gold-tone plated metal",
    color: "Gold",
    inventory: 2,
    featured: true,
    badges: ["Gift edit", "Under €250"],
    tags: ["vintage jewelry Paris", "curated luxury fashion"]
  },
  {
    id: "pfv-004",
    slug: "vintage-designer-coat",
    name: "Vintage Designer Coat",
    designer: "Rive Gauche Archive",
    category: "Outerwear",
    collection: "Paris Edit",
    price: 69000,
    description:
      "A long wool designer coat with a decisive shoulder and fluid fall, made for Paris winters and timeless capsule wardrobes.",
    images: [
      img("photo-1515372039744-b8f02a3ae446", 1500),
      img("photo-1520975954732-35dd22299614", 1200),
      img("photo-1529139574466-a303027c1d8b", 1200)
    ],
    condition: "Excellent, freshly steamed",
    era: "1990s",
    material: "Wool blend with satin lining",
    color: "Camel",
    inventory: 1,
    featured: true,
    badges: ["Editor pick"],
    tags: ["Paris vintage fashion", "luxury coats"]
  },
  {
    id: "pfv-005",
    slug: "retro-paris-blazer",
    name: "Retro Paris Blazer",
    designer: "French Tailoring",
    category: "Tailoring",
    collection: "Paris Edit",
    price: 31000,
    description:
      "A structured black blazer with a couture-inspired waist, perfect with denim, silk skirts, and antique jewelry.",
    images: [
      img("photo-1529139574466-a303027c1d8b", 1500),
      img("photo-1487222477894-8943e31ef7b2", 1200),
      img("photo-1503342217505-b0a15ec3261c", 1200)
    ],
    condition: "Very good vintage condition",
    era: "1980s",
    material: "Wool, viscose lining",
    color: "Black",
    inventory: 1,
    featured: false,
    badges: ["Tailored"],
    tags: ["designer vintage blazer", "Parisian fashion"]
  },
  {
    id: "pfv-006",
    slug: "ivory-silk-scarf",
    name: "Ivory Silk Scarf",
    designer: "Paris Archive",
    category: "Accessories",
    collection: "Paris Edit",
    price: 14500,
    description:
      "A soft ivory silk scarf with hand-rolled edges, ideal for handbags, hair styling, and quiet luxury layering.",
    images: [
      img("photo-1483985988355-763728e1935b", 1500),
      img("photo-1490481651871-ab68de25d43d", 1200),
      img("photo-1515886657613-9f3515b0c78f", 1200)
    ],
    condition: "Excellent, no visible marks",
    era: "1990s",
    material: "100% silk",
    color: "Ivory",
    inventory: 3,
    featured: false,
    badges: ["Stylist favorite"],
    tags: ["vintage accessories", "curated luxury fashion"]
  },
  {
    id: "pfv-007",
    slug: "saint-laurent-velvet-clutch",
    name: "Saint Laurent Velvet Clutch",
    designer: "Saint Laurent",
    category: "Bags",
    collection: "Designer Icons",
    price: 86000,
    description:
      "A jewel-like velvet clutch with refined evening energy, selected for collectors of discreet designer pieces.",
    images: [
      img("photo-1584917865442-de89df76afd3", 1500),
      img("photo-1594223274512-ad4803739b7c", 1200),
      img("photo-1585488433860-f8a6f53ec2ab", 1200)
    ],
    condition: "Excellent vintage condition",
    era: "1990s",
    material: "Velvet, satin lining, gold-tone chain",
    color: "Burgundy",
    inventory: 1,
    featured: true,
    badges: ["Saint Laurent", "Evening"],
    tags: ["designer vintage bags", "Saint Laurent vintage Paris"]
  },
  {
    id: "pfv-008",
    slug: "pearl-evening-earrings",
    name: "Pearl Evening Earrings",
    designer: "French Vintage",
    category: "Jewelry",
    collection: "Jewelry",
    price: 18000,
    description:
      "Elegant pearl drop earrings with a soft glow, selected for bridal dinners, cocktail dresses, and everyday romance.",
    images: [
      img("photo-1535632066927-ab7c9ab60908", 1500),
      img("photo-1611591437281-460bfbe1220a", 1200),
      img("photo-1515562141207-7a88fb7ce338", 1200)
    ],
    condition: "Excellent",
    era: "1980s",
    material: "Faux pearl, gold-tone clip",
    color: "Pearl and gold",
    inventory: 1,
    featured: false,
    badges: ["Occasion"],
    tags: ["vintage jewelry Paris", "luxury accessories"]
  },
  {
    id: "pfv-009",
    slug: "black-satin-evening-shoes",
    name: "Black Satin Evening Shoes",
    designer: "Paris Atelier",
    category: "Shoes",
    collection: "Shoes",
    price: 28000,
    description:
      "Slim satin evening shoes with a modest heel and refined toe shape, curated for gallery openings and candlelit dinners.",
    images: [
      img("photo-1542291026-7eec264c27ff", 1500),
      img("photo-1543163521-1bf539c55dd2", 1200),
      img("photo-1511556820780-d912e42b4980", 1200)
    ],
    condition: "Very good",
    era: "1990s",
    material: "Satin and leather",
    color: "Black",
    inventory: 1,
    featured: false,
    badges: ["Evening"],
    tags: ["vintage designer shoes", "Paris vintage fashion"]
  },
  {
    id: "pfv-010",
    slug: "cropped-tweed-jacket",
    name: "Cropped Tweed Jacket",
    designer: "Paris Couture Archive",
    category: "Tailoring",
    collection: "Designer Icons",
    price: 54000,
    description:
      "A feminine cropped tweed jacket with a clean neckline and refined texture, offering the boutique spirit of Parisian couture.",
    images: [
      img("photo-1503342217505-b0a15ec3261c", 1500),
      img("photo-1496747611176-843222e1e57c", 1200),
      img("photo-1515886657613-9f3515b0c78f", 1200)
    ],
    condition: "Excellent",
    era: "2000s",
    material: "Tweed blend",
    color: "Cream and black",
    inventory: 1,
    featured: true,
    badges: ["Couture mood"],
    tags: ["curated luxury fashion", "Paris vintage fashion"]
  },
  {
    id: "pfv-011",
    slug: "structured-bordeaux-handbag",
    name: "Structured Bordeaux Handbag",
    designer: "French Vintage",
    category: "Bags",
    collection: "Vintage Bags",
    price: 46000,
    description:
      "A burgundy top-handle handbag with polished vintage charm, selected for collectors who want color without excess.",
    images: [
      img("photo-1585488433860-f8a6f53ec2ab", 1500),
      img("photo-1594223274512-ad4803739b7c", 1200),
      img("photo-1584917865442-de89df76afd3", 1200)
    ],
    condition: "Very good, light patina",
    era: "1980s",
    material: "Leather",
    color: "Bordeaux",
    inventory: 1,
    featured: false,
    badges: ["Color story"],
    tags: ["designer vintage bags", "luxury vintage boutique Paris"]
  },
  {
    id: "pfv-012",
    slug: "silk-evening-blouse",
    name: "Silk Evening Blouse",
    designer: "Rive Gauche Archive",
    category: "Tailoring",
    collection: "Paris Edit",
    price: 26000,
    description:
      "A fluid silk blouse with softly gathered cuffs, chosen for layered vintage styling and polished evenings in Paris.",
    images: [
      img("photo-1490481651871-ab68de25d43d", 1500),
      img("photo-1529139574466-a303027c1d8b", 1200),
      img("photo-1515372039744-b8f02a3ae446", 1200)
    ],
    condition: "Excellent",
    era: "1990s",
    material: "Silk",
    color: "Champagne",
    inventory: 2,
    featured: false,
    badges: ["Silk"],
    tags: ["Paris vintage fashion", "curated luxury fashion"]
  }
];

export const collections: Collection[] = [
  {
    title: "Designer Collections",
    href: "/collections/designer",
    image: img("photo-1515886657613-9f3515b0c78f", 1400),
    description: "Saint Laurent pieces, couture mood tailoring, and archival icons.",
    count: "24 pieces"
  },
  {
    title: "Vintage Bags",
    href: "/collections/bags",
    image: img("photo-1594223274512-ad4803739b7c", 1400),
    description: "Structured leather bags, clutches, and collectible evening silhouettes.",
    count: "18 pieces"
  },
  {
    title: "Jewelry",
    href: "/collections/jewelry",
    image: img("photo-1515562141207-7a88fb7ce338", 1400),
    description: "Gold chains, pearls, sculptural earrings, and gift-ready accessories.",
    count: "31 pieces"
  },
  {
    title: "Shoes",
    href: "/collections/shoes",
    image: img("photo-1543163521-1bf539c55dd2", 1400),
    description: "Parisian leather heels, satin evening shoes, and refined occasion pairs.",
    count: "12 pieces"
  }
];

export const categories: ProductCategory[] = ["Bags", "Jewelry", "Shoes", "Outerwear", "Tailoring", "Accessories"];

export function getProductBySlug(slug: string) {
  return products.find((product) => product.slug === slug);
}

export function getInventoryStatus(product: Pick<Product, "inventory" | "status">): InventoryStatus {
  if (product.status) return product.status;
  if (product.inventory < 1) return "Sold";
  if (product.inventory === 1) return "Available";
  return "In boutique only";
}

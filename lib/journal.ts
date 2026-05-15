import { fashionImage } from "@/lib/images";

const img = (id: string, _width = 1400) => fashionImage(id);

export const journalPosts = [
  {
    slug: "how-to-shop-designer-vintage-in-paris",
    title: "How to Shop Designer Vintage in Paris",
    category: "Shopping Guide",
    image: img("photo-1483985988355-763728e1935b"),
    excerpt:
      "A practical guide to finding authentic designer vintage, understanding condition, and choosing pieces that hold style value.",
    body: [
      "The best vintage shopping in Paris begins with patience. Instead of looking for a trend, look for construction, material, proportion, and the feeling of a piece that works with your real wardrobe.",
      "Designer bags should be examined for hardware, stitching, lining, closure strength, and leather structure. Jewelry deserves the same attention: finish, clasp quality, weight, and how the tone sits against your skin.",
      "At Paris Fashion Vintage, the boutique edit is intentionally focused. Fewer pieces make the shopping experience calmer, more personal, and more trustworthy."
    ]
  },
  {
    slug: "saint-laurent-vintage-paris-edit",
    title: "The Saint Laurent Mood: Sharp, Feminine, Parisian",
    category: "Designer Notes",
    image: img("photo-1515886657613-9f3515b0c78f"),
    excerpt:
      "Why Saint Laurent vintage remains magnetic for collectors who love tailoring, evening bags, and refined drama.",
    body: [
      "Saint Laurent vintage carries a specific kind of tension: masculine tailoring, feminine line, and evening glamour that never needs to shout.",
      "The most wearable pieces are often the simplest: a black bag, velvet clutch, fitted blazer, silk blouse, or narrow heel. Together they create a wardrobe language that feels confident and timeless.",
      "Collectors should prioritize condition, versatility, and the emotion of the piece. The right vintage purchase should feel collectible and immediately wearable."
    ]
  },
  {
    slug: "building-a-curated-luxury-capsule",
    title: "Building a Curated Luxury Vintage Capsule",
    category: "Styling",
    image: img("photo-1515372039744-b8f02a3ae446"),
    excerpt:
      "Five high-impact vintage pieces that can transform a modern wardrobe without feeling costume-like.",
    body: [
      "A strong vintage capsule starts with anchors: a tailored blazer, one excellent coat, a designer bag, sculptural jewelry, and shoes that make simple outfits feel intentional.",
      "Choose colors with staying power. Black, cream, camel, bordeaux, gold, and ivory create a flexible palette that can support both understated days and more cinematic evenings.",
      "The goal is not to dress like another era. The goal is to let the elegance of another era sharpen the way you dress now."
    ]
  }
];

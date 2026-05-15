import { fashionImage } from "@/lib/images";

const img = (id: string, _width = 1400) => fashionImage(id);

export const lookbookImages = [
  {
    src: img("photo-1515886657613-9f3515b0c78f"),
    alt: "Editorial model in black vintage tailoring",
    caption: "Saint Laurent mood with a sharp black silhouette.",
    tall: true
  },
  {
    src: img("photo-1496747611176-843222e1e57c"),
    alt: "Parisian fashion editorial styling",
    caption: "Warm neutrals for a modern Paris capsule.",
    tall: false
  },
  {
    src: img("photo-1529139574466-a303027c1d8b"),
    alt: "Vintage blazer fashion editorial",
    caption: "Structured tailoring softened by vintage jewelry.",
    tall: true
  },
  {
    src: img("photo-1503342217505-b0a15ec3261c"),
    alt: "Luxury vintage styling portrait",
    caption: "Couture-inspired texture in an everyday line.",
    tall: false
  },
  {
    src: img("photo-1515372039744-b8f02a3ae446"),
    alt: "Vintage designer coat editorial",
    caption: "A long coat as the centerpiece of the wardrobe.",
    tall: true
  },
  {
    src: img("photo-1483985988355-763728e1935b"),
    alt: "Curated boutique fashion shopping",
    caption: "Boutique discovery, edited with restraint.",
    tall: false
  }
];

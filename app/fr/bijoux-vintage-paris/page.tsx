import type { Metadata } from "next";
import { FrenchSeoLanding } from "@/components/sections/french-seo-landing";

export const metadata: Metadata = {
  title: "Bijoux Vintage à Paris",
  description:
    "Découvrez des bijoux vintage à Paris : colliers dorés, perles, boucles d'oreilles et accessoires de luxe chez Paris Fashion Vintage.",
  alternates: { canonical: "/fr/bijoux-vintage-paris" }
};

export default function FrenchJewelryLanding() {
  return (
    <FrenchSeoLanding
      eyebrow="Bijoux Vintage Paris"
      title="Bijoux vintage pour une élégance parisienne."
      description="La sélection bijoux de Paris Fashion Vintage réunit colliers dorés, perles, boucles sculpturales et accessoires choisis pour illuminer une garde-robe moderne."
      productCategory="Jewelry"
      bullets={[
        "Des bijoux faciles à porter avec robes noires, blouses en soie, tailleurs et sacs vintage.",
        "Une sélection idéale pour les cadeaux, les dîners, les événements et les souvenirs élégants de Paris.",
        "Chaque accessoire est choisi pour son éclat, son état et sa capacité à transformer une tenue simple."
      ]}
    />
  );
}

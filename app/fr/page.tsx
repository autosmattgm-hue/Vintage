import type { Metadata } from "next";
import { FrenchSeoLanding } from "@/components/sections/french-seo-landing";

export const metadata: Metadata = {
  title: "Boutique Vintage Luxe à Paris",
  description:
    "Paris Fashion Vintage est une boutique vintage luxe à Paris spécialisée en sacs créateur, bijoux, chaussures et pièces Saint Laurent.",
  alternates: { canonical: "/fr" }
};

export default function FrenchHomeLanding() {
  return (
    <FrenchSeoLanding
      eyebrow="Boutique Vintage Paris"
      title="Boutique vintage luxe à Paris."
      description="Découvrez une sélection féminine, élégante et authentique de mode vintage de luxe au 68 Bd de Port-Royal, dans le 5e arrondissement de Paris."
      bullets={[
        "Sacs de créateurs, bijoux dorés, chaussures, manteaux et pièces Saint Laurent sélectionnés pour une clientèle internationale.",
        "Shopping en boutique et retrait sur place pour les clientes qui veulent voir, essayer et réserver avec confiance.",
        "Une expérience chaleureuse, éditoriale et parisienne pensée pour les collectionneuses et les touristes en séjour à Paris."
      ]}
    />
  );
}

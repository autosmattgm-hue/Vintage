import type { Metadata } from "next";
import { FrenchSeoLanding } from "@/components/sections/french-seo-landing";

export const metadata: Metadata = {
  title: "Sacs Vintage Créateur à Paris",
  description:
    "Achetez des sacs vintage créateur à Paris chez Paris Fashion Vintage : sacs en cuir, pochettes du soir et pièces de collection.",
  alternates: { canonical: "/fr/sacs-vintage-createur-paris" }
};

export default function FrenchBagsLanding() {
  return (
    <FrenchSeoLanding
      eyebrow="Sacs Vintage Créateur Paris"
      title="Sacs vintage créateur, sélectionnés à Paris."
      description="Paris Fashion Vintage propose des sacs vintage de créateurs, pochettes du soir et silhouettes en cuir structurées pour les clientes qui recherchent rareté, élégance et état soigné."
      productCategory="Bags"
      bullets={[
        "Chaque sac est inspecté pour sa structure, sa quincaillerie, sa doublure, ses coutures et son potentiel de port quotidien.",
        "La boutique privilégie les pièces intemporelles : noir, bordeaux, cuir structuré, chaînes dorées et proportions élégantes.",
        "Les pièces peuvent être réservées en ligne puis retirées en boutique près de Port-Royal."
      ]}
    />
  );
}

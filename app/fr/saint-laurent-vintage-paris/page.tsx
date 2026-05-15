import type { Metadata } from "next";
import { FrenchSeoLanding } from "@/components/sections/french-seo-landing";

export const metadata: Metadata = {
  title: "Saint Laurent Vintage à Paris",
  description:
    "Trouvez des pièces Saint Laurent vintage à Paris : sacs, pochettes, tailoring et silhouettes parisiennes chez Paris Fashion Vintage.",
  alternates: { canonical: "/fr/saint-laurent-vintage-paris" }
};

export default function FrenchSaintLaurentLanding() {
  return (
    <FrenchSeoLanding
      eyebrow="Saint Laurent Vintage Paris"
      title="L'esprit Saint Laurent vintage à Paris."
      description="Pour les amatrices de silhouettes nettes, féminines et parisiennes, Paris Fashion Vintage sélectionne des pièces inspirées par l'esprit Saint Laurent : sacs noirs, pochettes, blazers et accessoires du soir."
      productCategory="Designer Icons"
      bullets={[
        "Une sélection pensée pour les collectionneuses qui aiment le tailoring, le cuir noir, le velours, l'or et le glamour discret.",
        "Les pièces sont choisies pour leur état, leur polyvalence et leur capacité à rejoindre une garde-robe contemporaine.",
        "La boutique accueille les clientes à Port-Royal pour voir les pièces, demander conseil et préparer un achat en confiance."
      ]}
    />
  );
}

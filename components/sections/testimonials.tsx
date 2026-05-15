import { Star } from "lucide-react";

const testimonials = [
  {
    quote:
      "The owner was incredibly kind and helped me find a vintage bag that felt special without feeling overpriced.",
    name: "Amelia R.",
    detail: "London collector"
  },
  {
    quote:
      "Beautifully curated pieces, elegant service, and the best vintage fashion discovery from my Paris trip.",
    name: "Camille D.",
    detail: "Paris"
  },
  {
    quote:
      "A warm boutique with stylish Saint Laurent pieces, jewelry, and coats. Everything felt carefully chosen.",
    name: "Sofia M.",
    detail: "Milan stylist"
  }
];

export function Testimonials() {
  return (
    <section className="container luxury-section">
      <div className="max-w-3xl">
        <p className="editorial-kicker text-xs text-gold-500">Customer Reviews</p>
        <h2 className="luxury-section-title mt-4 font-serif">Loved for kindness, curation, and fair luxury prices.</h2>
      </div>
      <div className="mt-10 grid gap-5 md:grid-cols-3">
        {testimonials.map((testimonial) => (
          <figure key={testimonial.name} className="rounded-md border bg-card p-6 shadow-sm">
            <div className="flex gap-1" aria-label="5 star review">
              {Array.from({ length: 5 }).map((_, index) => (
                <Star key={index} className="h-4 w-4 fill-gold-300 text-gold-300" aria-hidden="true" />
              ))}
            </div>
            <blockquote className="mt-6 font-serif text-[clamp(1.7rem,4.5vw,2rem)] leading-tight">“{testimonial.quote}”</blockquote>
            <figcaption className="mt-6 text-sm text-muted-foreground">
              <span className="font-medium text-foreground">{testimonial.name}</span> · {testimonial.detail}
            </figcaption>
          </figure>
        ))}
      </div>
    </section>
  );
}

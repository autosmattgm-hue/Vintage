import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { journalPosts } from "@/lib/journal";

export const metadata: Metadata = {
  title: "Fashion Journal",
  description:
    "Paris Fashion Vintage journal with designer vintage styling guides, Paris shopping notes, and luxury fashion edits.",
  alternates: { canonical: "/journal" }
};

export default function JournalPage() {
  return (
    <section className="container luxury-section">
      <div className="max-w-3xl">
        <p className="editorial-kicker text-xs text-gold-500">Fashion Journal</p>
        <h1 className="luxury-page-title mt-4 font-serif">Editorial notes from the boutique.</h1>
        <p className="luxury-lead mt-6 text-muted-foreground">
          Styling guides, collection stories, and Paris vintage shopping advice for choosing designer pieces
          with confidence.
        </p>
      </div>
      <div className="mt-14 grid gap-6 md:grid-cols-3">
        {journalPosts.map((post, index) => (
          <Link
            key={post.slug}
            href={`/journal/${post.slug}`}
            className={index === 0 ? "group md:col-span-2" : "group"}
          >
            <article className="h-full overflow-hidden rounded-md border bg-card">
              <div className={`relative ${index === 0 ? "aspect-[16/9]" : "aspect-[4/3]"}`}>
                <Image
                  src={post.image}
                  alt={post.title}
                  fill
                  sizes={index === 0 ? "(min-width: 768px) 60vw, 100vw" : "(min-width: 768px) 30vw, 100vw"}
                  className="object-cover transition duration-700 group-hover:scale-105"
                />
              </div>
              <div className="p-6">
                <p className="editorial-kicker text-[0.65rem] text-gold-500">{post.category}</p>
                <h2 className="mt-3 font-serif text-3xl leading-tight">{post.title}</h2>
                <p className="mt-3 text-sm leading-6 text-muted-foreground">{post.excerpt}</p>
                <span className="mt-5 inline-flex items-center text-sm font-medium">
                  Read article
                  <ArrowRight className="ml-2 h-4 w-4 transition group-hover:translate-x-1" aria-hidden="true" />
                </span>
              </div>
            </article>
          </Link>
        ))}
      </div>
    </section>
  );
}

import { ArrowRight } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { journalPosts } from "@/lib/journal";

export function BlogPreview() {
  return (
    <section className="container luxury-section">
      <div className="flex flex-col gap-5 md:flex-row md:items-end md:justify-between">
        <div>
          <p className="editorial-kicker text-xs text-gold-500">Fashion Editorial</p>
          <h2 className="luxury-section-title mt-4 font-serif">Journal notes for collectors.</h2>
        </div>
        <Link href="/journal" className="luxury-link inline-flex items-center text-sm">
          Read the journal
          <ArrowRight className="ml-2 h-4 w-4" aria-hidden="true" />
        </Link>
      </div>
      <div className="mt-10 grid gap-5 md:grid-cols-3">
        {journalPosts.map((post) => (
          <Link key={post.slug} href={`/journal/${post.slug}`} className="group">
            <article className="overflow-hidden rounded-md border bg-card">
              <div className="relative aspect-[16/10]">
                <Image
                  src={post.image}
                  alt={post.title}
                  fill
                  sizes="(min-width: 1024px) 33vw, 100vw"
                  className="object-cover transition duration-700 group-hover:scale-105"
                />
              </div>
              <div className="p-5">
                <p className="editorial-kicker text-[0.65rem] text-gold-500">{post.category}</p>
                <h3 className="mt-3 font-serif text-3xl leading-tight">{post.title}</h3>
                <p className="mt-3 line-clamp-2 text-sm leading-6 text-muted-foreground">{post.excerpt}</p>
              </div>
            </article>
          </Link>
        ))}
      </div>
    </section>
  );
}

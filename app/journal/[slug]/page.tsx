import type { Metadata } from "next";
import Image from "next/image";
import { notFound } from "next/navigation";
import { journalPosts } from "@/lib/journal";

type PageProps = {
  params: Promise<{ slug: string }>;
};

export async function generateStaticParams() {
  return journalPosts.map((post) => ({ slug: post.slug }));
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { slug } = await params;
  const post = journalPosts.find((item) => item.slug === slug);

  if (!post) {
    return { title: "Journal Article" };
  }

  return {
    title: post.title,
    description: post.excerpt,
    alternates: { canonical: `/journal/${post.slug}` },
    openGraph: {
      title: post.title,
      description: post.excerpt,
      images: [{ url: post.image, alt: post.title }]
    }
  };
}

export default async function JournalPostPage({ params }: PageProps) {
  const { slug } = await params;
  const post = journalPosts.find((item) => item.slug === slug);

  if (!post) {
    notFound();
  }

  return (
    <article className="container max-w-4xl luxury-section">
      <p className="editorial-kicker text-xs text-gold-500">{post.category}</p>
      <h1 className="luxury-page-title mt-4 font-serif">{post.title}</h1>
      <p className="luxury-lead mt-6 text-muted-foreground">{post.excerpt}</p>
      <div className="relative mt-10 aspect-[16/9] overflow-hidden rounded-md">
        <Image src={post.image} alt={post.title} fill priority sizes="100vw" className="object-cover" />
      </div>
      <div className="prose prose-neutral mt-10 max-w-none dark:prose-invert prose-headings:font-serif prose-headings:text-[clamp(2rem,5vw,2.5rem)] prose-p:text-muted-foreground prose-p:leading-8">
        {post.body.map((paragraph) => (
          <p key={paragraph}>{paragraph}</p>
        ))}
      </div>
    </article>
  );
}

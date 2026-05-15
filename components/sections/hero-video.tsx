"use client";

import { motion } from "framer-motion";
import { ArrowRight, MapPin, Play } from "lucide-react";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { fashionImage } from "@/lib/images";

export function HeroVideo() {
  return (
    <section className="relative min-h-[100svh] overflow-hidden bg-couture-ink text-couture-cream md:min-h-[92vh]">
      <video
        className="absolute inset-0 h-full w-full object-cover opacity-60"
        autoPlay
        muted
        loop
        playsInline
        preload="metadata"
        poster={fashionImage("photo-1515886657613-9f3515b0c78f")}
      >
        <source
          src="https://videos.pexels.com/video-files/853800/853800-hd_1920_1080_25fps.mp4"
          type="video/mp4"
        />
      </video>
      <div className="absolute inset-0 bg-[linear-gradient(90deg,rgba(0,0,0,.78),rgba(0,0,0,.32),rgba(0,0,0,.78))]" />
      <div className="absolute inset-x-0 bottom-0 h-36 bg-gradient-to-t from-couture-ink to-transparent" />

      <div className="container relative z-10 flex min-h-[100svh] items-end pb-[clamp(2.5rem,8vw,3.5rem)] pt-28 md:min-h-[92vh] md:pt-32">
        <div className="max-w-5xl">
          <motion.p
            initial={{ opacity: 0, y: 18 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="editorial-kicker text-xs text-gold-300"
          >
            Paris Fashion Vintage
          </motion.p>
          <motion.h1
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.12 }}
            className="luxury-hero-title mt-5 max-w-4xl font-serif"
          >
            Curated Vintage Luxury
          </motion.h1>
          <motion.p
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.22 }}
            className="luxury-lead mt-6 max-w-2xl text-couture-cream/76"
          >
            Designer bags, jewelry, shoes, Saint Laurent pieces, and rare Parisian fashion finds selected for
            women who collect beauty with history.
          </motion.p>
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.32 }}
            className="mt-8 flex flex-col gap-3 xs:flex-row xs:flex-wrap"
          >
            <Button asChild size="lg" variant="gold" className="w-full xs:w-auto">
              <Link href="/shop">
                Shop the collection
                <ArrowRight className="ml-2 h-4 w-4" aria-hidden="true" />
              </Link>
            </Button>
            <Button asChild size="lg" variant="outline" className="w-full border-white/25 bg-white/5 text-couture-cream hover:bg-white/10 xs:w-auto">
              <Link href="/lookbook">
                <Play className="mr-2 h-4 w-4" aria-hidden="true" />
                View lookbook
              </Link>
            </Button>
          </motion.div>
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.7, delay: 0.42 }}
            className="mt-10 flex flex-wrap items-center gap-5 text-sm text-couture-cream/70"
          >
            <span className="flex items-center gap-2">
              <MapPin className="h-4 w-4 text-gold-300" aria-hidden="true" />
              68 Bd de Port-Royal, Paris
            </span>
            <span>In-store shopping</span>
            <span>In-store pickup</span>
          </motion.div>
        </div>
      </div>
    </section>
  );
}

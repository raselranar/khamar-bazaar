"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { motion, useReducedMotion, Variants } from "motion/react";
import { Button } from "@/components/ui/button";
import { getFeaturedListings } from "@/lib/api";
import { ListingCard } from "@/components/shared/ListingCard";
import { Listing } from "@/lib/mock-data";

// Explicitly type your animation configurations
const containerVariants: Variants = {
  hidden: { opacity: 0 },
  show: {
    opacity: 1,
    transition: { staggerChildren: 0.08, delayChildren: 0.1 },
  },
};

const itemVariants: Variants = {
  hidden: { opacity: 0, y: 16 },
  show: { opacity: 1, y: 0, transition: { duration: 0.45, ease: "easeOut" } },
};

const scrollRevealContainer: Variants = {
  hidden: { opacity: 0 },
  show: {
    opacity: 1,
    transition: { staggerChildren: 0.06 },
  },
};

const scrollRevealItem: Variants = {
  hidden: { opacity: 0, y: 12 },
  show: { opacity: 1, y: 0, transition: { duration: 0.35, ease: "easeOut" } },
};

// Reusable fallback config to instantly show elements when reduced motion is preferred
const motionFallback: Variants = {
  hidden: { opacity: 1 },
  show: { opacity: 1 },
};

export default function HomePage() {
  const prefersReducedMotion = useReducedMotion();
  const [featuredListings, setFeaturedListings] = useState<Listing[]>([]);

  useEffect(() => {
    async function loadData() {
      const data = await getFeaturedListings();
      setFeaturedListings(data);
    }
    loadData();
  }, []);

  // Simplified and typed checks using the fallback constant
  const safeContainer = prefersReducedMotion
    ? motionFallback
    : containerVariants;
  const safeItem = prefersReducedMotion ? motionFallback : itemVariants;
  const safeScrollContainer = prefersReducedMotion
    ? motionFallback
    : scrollRevealContainer;
  const safeScrollItem = prefersReducedMotion
    ? motionFallback
    : scrollRevealItem;

  return (
    <div className="flex flex-col min-h-screen overflow-x-hidden">
      {/* 1. Hero Section */}
      <section className="relative min-h-[65vh] flex items-center bg-background border-b border-border">
        {/* Background Ripple SVG Signature */}
        {!prefersReducedMotion && (
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 0.08, scale: 1 }}
            transition={{ duration: 1.5, ease: "easeOut" }}
            className="absolute inset-0 z-0 flex items-center justify-center pointer-events-none">
            <div className="w-200 h-200 rounded-full border border-primary" />
            <div className="absolute w-150 h-150 rounded-full border border-primary" />
          </motion.div>
        )}

        <motion.div
          variants={safeContainer}
          initial="hidden"
          animate="show"
          className="container relative z-10 mx-auto px-6 max-w-7xl">
          <div className="max-w-2xl">
            {/* FIX: Swapped raw containerVariants to safeContainer */}
            <motion.h1
              variants={safeContainer}
              className="text-[2.75rem] font-semibold leading-[1.1] text-foreground mb-6">
              From local farms, <br /> straight to you.
            </motion.h1>
            <motion.p
              variants={safeItem}
              className="text-lg text-muted-foreground mb-8 max-w-lg">
              Khamar Bazaar connects rural Bangladeshi farmers directly with
              buyers. Discover healthy poultry, livestock, and fresh eggs today.
            </motion.p>
            <motion.div variants={safeItem}>
              <Button asChild size="lg" className="h-12 px-8 text-base">
                <Link href="/explore">Explore Listings</Link>
              </Button>
            </motion.div>
          </div>
        </motion.div>
      </section>

      {/* 2. Categories */}
      <motion.section
        variants={safeScrollContainer}
        initial="hidden"
        whileInView="show"
        viewport={{ once: true, amount: 0.2 }}
        className="py-20 bg-card">
        <div className="container mx-auto px-6 max-w-7xl">
          <motion.h2
            variants={safeScrollItem}
            className="text-[2rem] font-semibold mb-10 text-foreground">
            Browse by Category
          </motion.h2>
          <div className="grid grid-cols-2 md:grid-cols-5 gap-4">
            {["Duck", "Chicken", "Egg", "Goat", "Cow"].map((cat) => (
              <motion.div key={cat} variants={safeScrollItem}>
                <Link
                  href={`/explore?category=${cat}`}
                  className="block p-6 rounded-xl bg-background border border-border text-center hover:border-primary transition-colors">
                  <span className="font-medium text-foreground">{cat}</span>
                </Link>
              </motion.div>
            ))}
          </div>
        </div>
      </motion.section>

      {/* 3. Featured Listings */}
      <motion.section
        variants={safeScrollContainer}
        initial="hidden"
        whileInView="show"
        viewport={{ once: true, amount: 0.2 }}
        className="py-20 bg-background">
        <div className="container mx-auto px-6 max-w-7xl">
          <motion.div
            variants={safeScrollItem}
            className="flex justify-between items-end mb-10">
            <h2 className="text-[2rem] font-semibold text-foreground">
              Featured Listings
            </h2>
            <Link
              href="/explore"
              className="text-primary font-medium hover:underline">
              View all
            </Link>
          </motion.div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {featuredListings.map((listing) => (
              <motion.div
                key={listing._id}
                variants={safeScrollItem}
                className="h-full">
                <ListingCard listing={listing} />
              </motion.div>
            ))}
          </div>
        </div>
      </motion.section>

      {/* 4. How It Works */}
      <motion.section
        variants={safeScrollContainer}
        initial="hidden"
        whileInView="show"
        viewport={{ once: true, amount: 0.2 }}
        className="py-20 bg-card">
        <div className="container mx-auto px-6 max-w-7xl">
          <motion.h2
            variants={safeScrollItem}
            className="text-[2rem] font-semibold text-center mb-16 text-foreground">
            How It Works
          </motion.h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-12 text-center">
            {["List Your Animals", "Browse & Filter", "Connect Directly"].map(
              (title, i) => (
                <motion.div key={title} variants={safeScrollItem}>
                  <div className="w-12 h-12 rounded-full bg-secondary text-primary flex items-center justify-center mx-auto mb-6 text-xl font-mono">
                    {i + 1}
                  </div>
                  <h3 className="text-[1.25rem] font-semibold mb-3">{title}</h3>
                  <p className="text-muted-foreground">
                    {i === 0
                      ? "Farmers easily upload details, photos, and prices of their available livestock."
                      : i === 1
                        ? "Buyers search by breed, location, or budget to find exactly what they need."
                        : "No middlemen. Contact the farmer directly to arrange payment and pickup."}
                  </p>
                </motion.div>
              ),
            )}
          </div>
        </div>
      </motion.section>

      {/* 5. Stats / Why Khamar Bazaar */}
      <motion.section
        variants={safeScrollContainer}
        initial="hidden"
        whileInView="show"
        viewport={{ once: true, amount: 0.2 }}
        className="py-20 bg-foreground text-background">
        <div className="container mx-auto px-6 max-w-7xl grid md:grid-cols-2 gap-16 items-center">
          <motion.div variants={safeScrollItem}>
            <h2 className="text-[2rem] font-semibold mb-6">
              Honest Trade. Local Roots.
            </h2>
            <p className="opacity-80 leading-relaxed mb-8">
              We verify our farmers to ensure you get authentic, healthy breeds.
              By cutting out middlemen, farmers earn more and you pay less.
            </p>
            <div className="grid grid-cols-2 gap-6 font-mono">
              <div>
                <span className="block text-[2rem] font-medium text-primary">
                  1,200+
                </span>
                <span className="text-sm opacity-70">Active Listings</span>
              </div>
              <div>
                <span className="block text-[2rem] font-medium text-primary">
                  64
                </span>
                {/* FIX: Corrected the typo 'Districts Cov' to 'Districts Covered' */}
                <span className="text-sm opacity-70">Districts Covered</span>
              </div>
            </div>
          </motion.div>
        </div>
      </motion.section>
    </div>
  );
}

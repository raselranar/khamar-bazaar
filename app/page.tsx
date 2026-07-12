"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { motion, useReducedMotion, Variants } from "motion/react";
import {
  ArrowRight,
  CheckCircle2,
  ChevronRight,
  Leaf,
  MessageCircleMore,
  ShieldCheck,
  Sprout,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { getFeaturedListings } from "@/lib/api";
import { ListingCard } from "@/components/shared/ListingCard";
import { Listing } from "@/lib/mock-data";

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

const motionFallback: Variants = {
  hidden: { opacity: 1 },
  show: { opacity: 1 },
};

const categories = [
  { name: "Duck", description: "Muscovy, Khaki Campbell, local breeds" },
  {
    name: "Chicken",
    description: "Layer hens, broilers, and dual-purpose birds",
  },
  { name: "Egg", description: "Fresh farm eggs from trusted breeders" },
  { name: "Goat", description: "Dairy and meat goats with verified health" },
  { name: "Cow", description: "Calves and productive dairy cattle" },
  { name: "Feed", description: "Poultry feed and livestock supplies" },
];

const steps = [
  {
    title: "List your animals",
    description:
      "Farmers add clear details, prices, and care notes in a few minutes.",
  },
  {
    title: "Browse and filter",
    description:
      "Buyers search by category, price, age, and location to find the right fit.",
  },
  {
    title: "Connect directly",
    description:
      "Talk with the seller, compare options, and arrange pickup without a middleman.",
  },
];

const trustPoints = [
  "Verified seller profiles and transparent pricing",
  "Real listings with age, breed, and health details",
  "Direct contact with local farmers across Bangladesh",
];

const testimonials = [
  {
    name: "Farida Akter",
    role: "Poultry buyer, Rajshahi",
    quote:
      "I found healthy ducklings and a fair price within a day. The process felt simple and trustworthy.",
  },
  {
    name: "Ashraful Islam",
    role: "Goat breeder, Cumilla",
    quote:
      "Khamar Bazaar helped me reach buyers directly and cut down the time spent on middlemen.",
  },
  {
    name: "Nadia Rahman",
    role: "Family farm seller, Barishal",
    quote:
      "The structured listings make it easy to show what I have and answer buyer questions quickly.",
  },
];

const faqs = [
  {
    question: "How do I post a listing?",
    answer:
      "Create an account, choose Add Listing, and fill in the breed, price, location, and care details.",
  },
  {
    question: "Can buyers contact sellers directly?",
    answer:
      "Yes. Each listing includes seller details so buyers can reach out directly and arrange pickup.",
  },
  {
    question: "What kinds of animals are available?",
    answer:
      "You can browse ducks, chickens, eggs, goats, cows, and feed supplies across many districts.",
  },
];

export default function HomePage() {
  const prefersReducedMotion = useReducedMotion();
  const [featuredListings, setFeaturedListings] = useState<Listing[]>([]);
  const [isLoadingListings, setIsLoadingListings] = useState(true);

  useEffect(() => {
    async function loadData() {
      setIsLoadingListings(true);
      const data = await getFeaturedListings();
      setFeaturedListings(data);
      setIsLoadingListings(false);
    }
    loadData();
  }, []);

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
    <div className="flex min-h-screen flex-col overflow-x-hidden">
      <section className="relative border-b border-border bg-background py-20 sm:py-24 lg:py-28">
        {!prefersReducedMotion && (
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 0.08, scale: 1 }}
            transition={{ duration: 1.5, ease: "easeOut" }}
            className="pointer-events-none absolute inset-0 z-0 flex items-center justify-center">
            <div className="h-72 w-72 rounded-full border border-primary sm:h-96 sm:w-96" />
            <div className="absolute h-56 w-56 rounded-full border border-primary sm:h-72 sm:w-72" />
          </motion.div>
        )}

        <motion.div
          variants={safeContainer}
          initial="hidden"
          animate="show"
          className="container relative z-10 mx-auto flex max-w-7xl flex-col gap-10 px-6 lg:flex-row lg:items-center lg:justify-between lg:gap-16">
          <div className="max-w-2xl">
            <motion.div
              variants={safeItem}
              className="mb-5 inline-flex items-center gap-2 rounded-full border border-primary/20 bg-primary/10 px-3 py-1 text-sm font-medium text-primary">
              <Sprout className="h-4 w-4" />
              Trusted local livestock marketplace
            </motion.div>
            <motion.h1
              variants={safeItem}
              className="mb-6 text-4xl font-semibold leading-tight text-foreground sm:text-5xl lg:text-6xl">
              From local farms, straight to your doorstep.
            </motion.h1>
            <motion.p
              variants={safeItem}
              className="mb-8 max-w-xl text-lg leading-8 text-muted-foreground">
              Khamar Bazaar connects Bangladeshi farmers and buyers in a calm,
              transparent way. Discover healthy poultry, livestock, eggs, and
              feed with confidence.
            </motion.p>
            <motion.div
              variants={safeItem}
              className="flex flex-col gap-3 sm:flex-row">
              <Button asChild size="lg" className="h-12 px-7 text-base">
                <Link href="/explore">
                  Explore listings
                  <ArrowRight className="ml-1 h-4 w-4" />
                </Link>
              </Button>
              <Button
                asChild
                variant="outline"
                size="lg"
                className="h-12 px-7 text-base">
                <Link href="/about">Learn more</Link>
              </Button>
            </motion.div>
          </div>

          <motion.div
            variants={safeItem}
            className="w-full max-w-xl rounded-3xl border border-border/70 bg-card p-6 shadow-sm sm:p-8">
            <div className="mb-6 flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-primary">
                  This week’s highlights
                </p>
                <h2 className="mt-1 text-xl font-semibold text-foreground">
                  Fresh finds near you
                </h2>
              </div>
              <div className="rounded-full bg-secondary p-3 text-primary">
                <Leaf className="h-5 w-5" />
              </div>
            </div>
            <div className="space-y-3">
              {[
                {
                  title: "Vaccinated Muscovy ducklings",
                  meta: "Dhaka · BDT 2,800",
                },
                {
                  title: "Layer hens, 6 months old",
                  meta: "Khulna · BDT 1,450",
                },
                {
                  title: "Fresh farm eggs, 30 pieces",
                  meta: "Barishal · BDT 420",
                },
              ].map((item) => (
                <div
                  key={item.title}
                  className="flex items-center justify-between rounded-2xl border border-border/60 bg-background px-4 py-3">
                  <div>
                    <p className="font-medium text-foreground">{item.title}</p>
                    <p className="text-sm text-muted-foreground">{item.meta}</p>
                  </div>
                  <ChevronRight className="h-4 w-4 text-muted-foreground" />
                </div>
              ))}
            </div>
          </motion.div>
        </motion.div>
      </section>

      <motion.section
        variants={safeScrollContainer}
        initial="hidden"
        whileInView="show"
        viewport={{ once: true, amount: 0.2 }}
        className="bg-card py-20">
        <div className="container mx-auto max-w-7xl px-6">
          <motion.div
            variants={safeScrollItem}
            className="mb-10 flex flex-col gap-3 md:flex-row md:items-end md:justify-between">
            <div>
              <p className="text-sm font-medium uppercase tracking-[0.2em] text-primary">
                Categories
              </p>
              <h2 className="text-3xl font-semibold text-foreground sm:text-4xl">
                Browse by need
              </h2>
            </div>
            <p className="max-w-xl text-muted-foreground">
              From ducks and chickens to eggs and feed, every listing is made
              for quick buying decisions.
            </p>
          </motion.div>
          <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-3">
            {categories.map((cat) => (
              <motion.div key={cat.name} variants={safeScrollItem}>
                <Link
                  href={`/explore?category=${cat.name}`}
                  className="block rounded-2xl border border-border/60 bg-background p-6 transition-colors hover:border-primary/40 hover:bg-primary/5">
                  <div className="mb-4 flex h-10 w-10 items-center justify-center rounded-full bg-secondary text-primary">
                    <Sprout className="h-5 w-5" />
                  </div>
                  <h3 className="text-lg font-semibold text-foreground">
                    {cat.name}
                  </h3>
                  <p className="mt-2 text-sm leading-6 text-muted-foreground">
                    {cat.description}
                  </p>
                </Link>
              </motion.div>
            ))}
          </div>
        </div>
      </motion.section>

      <motion.section
        variants={safeScrollContainer}
        initial="hidden"
        whileInView="show"
        viewport={{ once: true, amount: 0.2 }}
        className="bg-background py-20">
        <div className="container mx-auto max-w-7xl px-6">
          <motion.div
            variants={safeScrollItem}
            className="mb-10 flex flex-col gap-3 md:flex-row md:items-end md:justify-between">
            <div>
              <p className="text-sm font-medium uppercase tracking-[0.2em] text-primary">
                Featured listings
              </p>
              <h2 className="text-3xl font-semibold text-foreground sm:text-4xl">
                Fresh picks from nearby farms
              </h2>
            </div>
            <Link
              href="/explore"
              className="font-medium text-primary hover:underline">
              View all listings
            </Link>
          </motion.div>
          <div className="grid gap-6 md:grid-cols-2 xl:grid-cols-4">
            {isLoadingListings
              ? Array.from({ length: 4 }).map((_, index) => (
                  <div
                    key={index}
                    className="h-80 animate-pulse rounded-2xl border border-border/60 bg-card"
                  />
                ))
              : featuredListings.map((listing) => (
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

      <motion.section
        variants={safeScrollContainer}
        initial="hidden"
        whileInView="show"
        viewport={{ once: true, amount: 0.2 }}
        className="bg-card py-20">
        <div className="container mx-auto max-w-7xl px-6">
          <motion.div
            variants={safeScrollItem}
            className="mx-auto mb-12 max-w-2xl text-center">
            <p className="text-sm font-medium uppercase tracking-[0.2em] text-primary">
              How it works
            </p>
            <h2 className="mt-3 text-3xl font-semibold text-foreground sm:text-4xl">
              Simple steps from listing to delivery
            </h2>
          </motion.div>
          <div className="grid gap-6 md:grid-cols-3">
            {steps.map((step, index) => (
              <motion.div
                key={step.title}
                variants={safeScrollItem}
                className="rounded-3xl border border-border/60 bg-background p-6">
                <div className="mb-5 flex h-12 w-12 items-center justify-center rounded-full bg-secondary text-lg font-semibold text-primary">
                  0{index + 1}
                </div>
                <h3 className="mb-3 text-xl font-semibold text-foreground">
                  {step.title}
                </h3>
                <p className="leading-7 text-muted-foreground">
                  {step.description}
                </p>
              </motion.div>
            ))}
          </div>
        </div>
      </motion.section>

      <motion.section
        variants={safeScrollContainer}
        initial="hidden"
        whileInView="show"
        viewport={{ once: true, amount: 0.2 }}
        className="bg-background py-20">
        <div className="container mx-auto grid max-w-7xl gap-8 px-6 lg:grid-cols-[1.1fr_0.9fr] lg:items-start">
          <motion.div
            variants={safeScrollItem}
            className="rounded-3xl border border-border/60 bg-card p-8">
            <p className="text-sm font-medium uppercase tracking-[0.2em] text-primary">
              Why Khamar Bazaar
            </p>
            <h2 className="mt-3 text-3xl font-semibold text-foreground sm:text-4xl">
              Built for trust, clarity, and direct trade.
            </h2>
            <p className="mt-4 text-lg leading-8 text-muted-foreground">
              We make it easier for buyers and sellers to connect around real
              animals, fair prices, and straightforward communication.
            </p>
            <div className="mt-8 space-y-4">
              {trustPoints.map((point) => (
                <div
                  key={point}
                  className="flex items-start gap-3 rounded-2xl bg-background p-4">
                  <CheckCircle2 className="mt-0.5 h-5 w-5 shrink-0 text-primary" />
                  <p className="text-sm leading-6 text-foreground">{point}</p>
                </div>
              ))}
            </div>
          </motion.div>

          <motion.div
            variants={safeScrollItem}
            className="rounded-3xl bg-foreground p-8 text-background">
            <div className="mb-6 flex items-center gap-3">
              <div className="rounded-full bg-background/10 p-3">
                <ShieldCheck className="h-5 w-5" />
              </div>
              <div>
                <p className="text-sm uppercase tracking-[0.2em] text-background/70">
                  Community stats
                </p>
                <h3 className="text-xl font-semibold">Growing every week</h3>
              </div>
            </div>
            <div className="grid gap-6 sm:grid-cols-2">
              <div>
                <p className="text-4xl font-semibold text-primary">1,200+</p>
                <p className="mt-2 text-sm text-background/70">
                  Active listings
                </p>
              </div>
              <div>
                <p className="text-4xl font-semibold text-primary">64</p>
                <p className="mt-2 text-sm text-background/70">
                  Districts covered
                </p>
              </div>
              <div>
                <p className="text-4xl font-semibold text-primary">92%</p>
                <p className="mt-2 text-sm text-background/70">Repeat buyers</p>
              </div>
              <div>
                <p className="text-4xl font-semibold text-primary">24/7</p>
                <p className="mt-2 text-sm text-background/70">
                  Direct seller chats
                </p>
              </div>
            </div>
          </motion.div>
        </div>
      </motion.section>

      <motion.section
        variants={safeScrollContainer}
        initial="hidden"
        whileInView="show"
        viewport={{ once: true, amount: 0.2 }}
        className="bg-card py-20">
        <div className="container mx-auto max-w-7xl px-6">
          <motion.div
            variants={safeScrollItem}
            className="mx-auto mb-12 max-w-2xl text-center">
            <p className="text-sm font-medium uppercase tracking-[0.2em] text-primary">
              Farmer stories
            </p>
            <h2 className="mt-3 text-3xl font-semibold text-foreground sm:text-4xl">
              Trusted by growers and buyers alike
            </h2>
          </motion.div>
          <div className="grid gap-6 lg:grid-cols-3">
            {testimonials.map((item) => (
              <motion.div
                key={item.name}
                variants={safeScrollItem}
                className="rounded-3xl border border-border/60 bg-background p-6">
                <div className="mb-4 flex items-center gap-3">
                  <div className="flex h-10 w-10 items-center justify-center rounded-full bg-secondary text-primary">
                    <MessageCircleMore className="h-5 w-5" />
                  </div>
                  <div>
                    <p className="font-semibold text-foreground">{item.name}</p>
                    <p className="text-sm text-muted-foreground">{item.role}</p>
                  </div>
                </div>
                <p className="leading-7 text-muted-foreground">
                  “{item.quote}”
                </p>
              </motion.div>
            ))}
          </div>
        </div>
      </motion.section>

      <motion.section
        variants={safeScrollContainer}
        initial="hidden"
        whileInView="show"
        viewport={{ once: true, amount: 0.2 }}
        className="bg-background py-20">
        <div className="container mx-auto max-w-7xl px-6">
          <motion.div
            variants={safeScrollItem}
            className="rounded-4xl border border-border/60 bg-card p-8 sm:p-10 lg:flex lg:items-center lg:justify-between lg:gap-8">
            <div className="max-w-2xl">
              <p className="text-sm font-medium uppercase tracking-[0.2em] text-primary">
                Stay updated
              </p>
              <h2 className="mt-3 text-3xl font-semibold text-foreground sm:text-4xl">
                Get practical farming tips and fresh listings.
              </h2>
              <p className="mt-4 text-lg leading-8 text-muted-foreground">
                Join our community for seasonal advice, breeder highlights, and
                new stock alerts.
              </p>
            </div>
            <div className="mt-6 flex flex-col gap-3 sm:flex-row lg:mt-0">
              <Button asChild size="lg" className="h-12 px-6">
                <a href="mailto:hello@khamarbazaar.com">Contact us</a>
              </Button>
              <Button asChild variant="outline" size="lg" className="h-12 px-6">
                <Link href="/contact">Visit contact page</Link>
              </Button>
            </div>
          </motion.div>
        </div>
      </motion.section>

      <motion.section
        variants={safeScrollContainer}
        initial="hidden"
        whileInView="show"
        viewport={{ once: true, amount: 0.2 }}
        className="bg-card py-20">
        <div className="container mx-auto max-w-7xl px-6">
          <motion.div
            variants={safeScrollItem}
            className="mx-auto mb-10 max-w-2xl text-center">
            <p className="text-sm font-medium uppercase tracking-[0.2em] text-primary">
              FAQs
            </p>
            <h2 className="mt-3 text-3xl font-semibold text-foreground sm:text-4xl">
              Common questions, answered clearly
            </h2>
          </motion.div>
          <div className="mx-auto max-w-3xl space-y-4">
            {faqs.map((item) => (
              <details
                key={item.question}
                className="rounded-2xl border border-border/60 bg-background p-5">
                <summary className="cursor-pointer list-none font-medium text-foreground">
                  {item.question}
                </summary>
                <p className="mt-3 leading-7 text-muted-foreground">
                  {item.answer}
                </p>
              </details>
            ))}
          </div>
        </div>
      </motion.section>
    </div>
  );
}

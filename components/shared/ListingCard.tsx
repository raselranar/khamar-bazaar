"use client";

import Link from "next/link";
import { motion, useReducedMotion } from "motion/react";
import { Card, CardContent } from "@/components/ui/card";
import { ArrowRight } from "lucide-react";
import Image from "next/image";

interface ListingType {
  _id: string;
  title: string;
  shortDescription: string;
  category: string;
  price: string | number;
  imageUrl?: string;
}

export function ListingCard({ listing }: { listing: ListingType }) {
  const prefersReducedMotion = useReducedMotion();

  // Animation variants for the signature ripple
  const rippleVariants = {
    rest: { opacity: 0, scale: 0.5 },
    hover: { opacity: 0.06, scale: 2.5 },
  };

  return (
    <motion.div
      initial="rest"
      whileHover={prefersReducedMotion ? "rest" : "hover"}
      whileTap={prefersReducedMotion ? {} : { scale: 0.98 }}
      variants={{
        rest: { y: 0, boxShadow: "0 1px 2px rgba(38,36,31,0.06)" },
        hover: { y: -4, boxShadow: "0 8px 20px rgba(38,36,31,0.10)" },
      }}
      transition={{ duration: 0.2, ease: "easeOut" }}
      className="h-full relative rounded-xl cursor-pointer block bg-card overflow-hidden">
      {/* Signature Ripple Layer */}
      <motion.div
        className="absolute inset-0 pointer-events-none z-10 flex items-center justify-center overflow-hidden"
        variants={rippleVariants}
        transition={{ duration: 0.4, ease: "easeOut" }}>
        <div className="w-[120%] aspect-square rounded-full border border-primary" />
        <div className="absolute w-[80%] aspect-square rounded-full border border-primary" />
      </motion.div>

      <Card className="border-0 shadow-none bg-transparent flex flex-col h-full pt-0 pb-2 rounded-none relative z-20">
        <div className="relative aspect-4/3 w-full bg-muted overflow-hidden">
          {listing.imageUrl ? (
            <Image
              width={400}
              height={300}
              src={listing.imageUrl}
              alt={listing.title}
              className="object-cover w-full h-full"
            />
          ) : (
            <div className="w-full h-full bg-muted flex items-center justify-center text-muted-foreground text-sm">
              No Image
            </div>
          )}
        </div>

        <CardContent className="p-4 flex flex-col flex-1">
          <div className="flex items-center justify-between mb-3 gap-2">
            <span className="text-xs font-medium text-muted-foreground uppercase tracking-wider">
              {listing.category}
            </span>
            <span className="text-[#B8823A] font-mono text-[1.125rem] font-medium">
              ৳{listing.price}
            </span>
          </div>

          <h3 className="text-[1.25rem] font-semibold text-foreground leading-[1.3] mb-2">
            {listing.title}
          </h3>

          <p className="text-base text-muted-foreground line-clamp-2 mb-6 flex-1 leading-[1.6]">
            {listing.shortDescription}
          </p>

          <Link
            href={`/listings/${listing._id}`}
            className="inline-flex items-center text-sm font-semibold text-primary hover:text-primary/80 transition-colors group mt-auto w-fit before:absolute before:inset-0">
            View Details
            <ArrowRight className="ml-1 h-4 w-4 transition-transform group-hover:translate-x-1" />
          </Link>
        </CardContent>
      </Card>
    </motion.div>
  );
}

import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { getListingById } from "@/lib/api";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { ArrowLeft, MapPin, Calendar, Tag } from "lucide-react";
import Image from "next/image";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ id: string }>;
}): Promise<Metadata> {
  const { id } = await params;
  const listing = await getListingById(id);

  if (!listing) {
    return {
      title: "Listing Not Found | Khamar Bazaar",
      description: "The requested livestock listing could not be found.",
    };
  }

  return {
    title: `${listing.title} | Khamar Bazaar`,
    description: listing.shortDescription,
  };
}

export default async function ListingDetailsPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const listing = await getListingById(id);

  if (!listing) {
    notFound();
  }

  return (
    <div className="container mx-auto px-6 max-w-7xl py-12">
      <Link
        href="/explore"
        className="inline-flex items-center text-sm font-medium text-muted-foreground hover:text-primary mb-8 transition-colors">
        <ArrowLeft className="mr-2 h-4 w-4" />
        Back to Explore
      </Link>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
        {/* Left Column: Image */}
        <div className="space-y-6">
          <div className="aspect-4/3 w-full bg-muted rounded-xl overflow-hidden border border-border">
            {listing.imageUrl ? (
              <Image
                width={400}
                height={300}
                src={listing.imageUrl}
                alt={listing.title}
                className="w-full h-full object-cover"
              />
            ) : (
              <div className="w-full h-full flex items-center justify-center text-muted-foreground">
                No Image Available
              </div>
            )}
          </div>
        </div>

        {/* Right Column: Details */}
        <div className="flex flex-col">
          <div className="mb-6">
            <div className="flex items-center gap-3 mb-3">
              <span className="text-xs font-semibold uppercase tracking-wider text-primary bg-secondary px-3 py-1 rounded-full">
                {listing.category}
              </span>
              <span className="text-primary font-mono text-xl font-medium">
                ৳{listing.price}
              </span>
            </div>
            <h1 className="text-3xl font-semibold leading-tight text-foreground mb-4">
              {listing.title}
            </h1>
            <p className="text-lg text-muted-foreground leading-relaxed">
              {listing.shortDescription}
            </p>
          </div>

          <div className="grid grid-cols-2 gap-4 mb-8">
            <div className="flex items-center gap-2 text-sm text-foreground">
              <MapPin className="h-4 w-4 text-muted-foreground" />
              <span>{listing.location}</span>
            </div>
            {listing.age && (
              <div className="flex items-center gap-2 text-sm text-foreground">
                <Calendar className="h-4 w-4 text-muted-foreground" />
                <span>{listing.age}</span>
              </div>
            )}
            {listing.breed && (
              <div className="flex items-center gap-2 text-sm text-foreground">
                <Tag className="h-4 w-4 text-muted-foreground" />
                <span>{listing.breed}</span>
              </div>
            )}
          </div>

          <div className="mb-8">
            <h3 className="text-lg font-semibold mb-3">Description</h3>
            <p className="text-base text-muted-foreground leading-[1.6]">
              {listing.fullDescription}
            </p>
          </div>

          {/* Seller Card */}
          {/* <Card className="mt-auto bg-background border-border shadow-sm">
            <CardContent className="p-6">
              <div className="flex items-center gap-4 mb-4">
                <div className="w-12 h-12 bg-secondary text-primary rounded-full flex items-center justify-center font-semibold text-lg">
                  {listing.sellerId.charAt(0).toUpperCase()}
                </div>
                <div>
                  <h4 className="font-semibold text-foreground">
                    Verified Seller
                  </h4>
                  <p className="text-sm text-muted-foreground">
                    Usually responds in 1 hour
                  </p>
                </div>
              </div>
              <Button className="w-full h-12 text-base">Contact Seller</Button>
            </CardContent>
          </Card> */}
        </div>
      </div>
    </div>
    // write a message for github commit
  );
}

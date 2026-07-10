import Link from "next/link";
import { Card, CardContent } from "@/components/ui/card";
import { ArrowRight } from "lucide-react";

interface ListingType {
  _id: string;
  title: string;
  shortDescription: string;
  category: string;
  price: string | number;
  imageUrl?: string;
}

export function ListingCard({ listing }: { listing: ListingType }) {
  return (
    <Card className="overflow-hidden bg-card border-0 shadow-sm flex flex-col h-full">
      <div className="relative aspect-4/3 w-full bg-muted overflow-hidden">
        {listing.imageUrl ? (
          <img
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
          {/* hay-gold inline color mapped to IBM Plex Mono (assuming font-mono handles this based on layout config) */}
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
          className="inline-flex items-center text-sm font-semibold text-primary hover:text-primary/80 transition-colors group mt-auto w-fit">
          View Details
          <ArrowRight className="ml-1 h-4 w-4 transition-transform group-hover:translate-x-1" />
        </Link>
      </CardContent>
    </Card>
  );
}

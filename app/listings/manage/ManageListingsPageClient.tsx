"use client";

import { useState } from "react";
import Link from "next/link";
import { toast } from "sonner";
import { deleteListing } from "@/lib/api";

import { Button } from "@/components/ui/button";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import { Listing } from "@/lib/mock-data";
import { useRouter } from "next/navigation";

function ListingActions({
  listing,
  onSelectForDelete,
  onConfirmDelete,
}: {
  listing: Listing;
  onSelectForDelete: (id: string) => void;
  onConfirmDelete: () => void;
}) {
  return (
    <div className="flex items-center gap-2">
      <Button variant="outline" size="sm" asChild>
        <Link href={`/listings/${listing._id}`}>View</Link>
      </Button>

      <AlertDialog>
        <AlertDialogTrigger asChild>
          <Button
            variant="destructive"
            size="sm"
            onClick={() => onSelectForDelete(listing._id)}
            className="cursor-pointer">
            Delete
          </Button>
        </AlertDialogTrigger>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Are you absolutely sure?</AlertDialogTitle>
            <AlertDialogDescription>
              This action cannot be undone. This will permanently delete your
              listing for &quot;{listing.title}&quot; and remove it from our
              servers.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>Cancel</AlertDialogCancel>
            <AlertDialogAction
              onClick={onConfirmDelete}
              className="bg-destructive text-destructive-foreground hover:bg-destructive/90">
              Delete
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </div>
  );
}

export default function ManageListingsPageClient({
  listings,
}: {
  listings: Listing[];
}) {
  // const [listings, setListings] = useState<Listing[]>([]);
  const [selectedId, setSelectedId] = useState<string | null>(null);
  const router = useRouter();

  const handleDelete = async () => {
    if (!selectedId) return;
    const res = await deleteListing(selectedId);
    router.refresh();
    if (res.success) {
      toast.success("Listing deleted successfully.");
    }
  };

  return (
    <div className="container mx-auto px-4 sm:px-6 max-w-7xl py-8 sm:py-16">
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-8 sm:mb-10">
        <div>
          <h1 className="text-2xl sm:text-3xl font-semibold">
            Manage Listings
          </h1>
          <p className="text-muted-foreground">
            View, edit, and delete your active inventory.
          </p>
        </div>
        <Button asChild className="w-full sm:w-auto">
          <Link href="/listings/add">Add New</Link>
        </Button>
      </div>

      <div className="bg-card border rounded-xl overflow-hidden">
        {listings.length === 0 ? (
          <div className="px-6 py-12 text-center text-muted-foreground">
            You have no active listings.
          </div>
        ) : (
          <>
            {/* Desktop / tablet: table view */}
            <div className="hidden md:block overflow-x-auto">
              <table className="w-full text-sm text-left">
                <thead className="bg-muted text-muted-foreground uppercase text-xs">
                  <tr>
                    <th className="px-6 py-4 font-medium">Title</th>
                    <th className="px-6 py-4 font-medium">Category</th>
                    <th className="px-6 py-4 font-medium">Price</th>
                    <th className="px-6 py-4 font-medium text-right">
                      Actions
                    </th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-border">
                  {listings.map((listing) => (
                    <tr
                      key={listing._id}
                      className="hover:bg-muted/50 transition-colors">
                      <td className="px-6 py-4 font-medium text-foreground">
                        {listing.title}
                      </td>
                      <td className="px-6 py-4">{listing.category}</td>
                      <td className="px-6 py-4 font-mono text-primary">
                        ৳{listing.price}
                      </td>
                      <td className="px-6 py-4 text-right">
                        <div className="flex justify-end">
                          <ListingActions
                            listing={listing}
                            onSelectForDelete={setSelectedId}
                            onConfirmDelete={handleDelete}
                          />
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            {/* Mobile: stacked card view */}
            <div className="md:hidden divide-y divide-border">
              {listings.map((listing) => (
                <div key={listing._id} className="p-4 space-y-3">
                  <div className="flex items-start justify-between gap-3">
                    <div className="min-w-0">
                      <p className="font-medium text-foreground truncate">
                        {listing.title}
                      </p>
                      <p className="text-xs text-muted-foreground mt-0.5">
                        {listing.category}
                      </p>
                    </div>
                    <p className="font-mono text-primary whitespace-nowrap">
                      ৳{listing.price}
                    </p>
                  </div>
                  <ListingActions
                    listing={listing}
                    onSelectForDelete={setSelectedId}
                    onConfirmDelete={handleDelete}
                  />
                </div>
              ))}
            </div>
          </>
        )}
      </div>
    </div>
  );
}

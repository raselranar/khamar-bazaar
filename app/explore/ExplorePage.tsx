"use client";
import { ListingCard } from "@/components/shared/ListingCard";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  SelectTrigger,
  SelectValue,
  SelectContent,
  SelectItem,
  Select,
} from "@/components/ui/select";
import { Slider } from "@/components/ui/slider";
import { ListingSkeleton } from "@/components/shared/ListingSkeleton";
import { Listing } from "@/lib/mock-data";
import { usePathname, useRouter } from "next/navigation";
import { useEffect, useState } from "react";

export default function ExplorePageContent({
  listingsData = [],
}: {
  searchQuery?: string;
  listingsData: Listing[];
}) {
  // const [listingsData, setListingsData] = useState<Listing[]>([]);
  const [search, setSearch] = useState("");
  const [category, setCategory] = useState("all");
  const [maxPrice, setMaxPrice] = useState([30000]);
  const pathname = usePathname();
  const router = useRouter();
  //   getListings;
  // const isFirstRender = useRef(true);
  // useEffect(() => {
  //   // Skip the very first execution
  //   if (isFirstRender.current) {
  //     isFirstRender.current = false;
  //     return;
  //   }

  //   let isMounted = true;

  //   const dataLoader = async () => {
  //     const data = await getListings(searchQuery);
  //     if (isMounted) {
  //       setListingsData(data);
  //     }
  //   };

  //   dataLoader();

  //   return () => {
  //     isMounted = false;
  //   };
  // }, [searchQuery]);

  // add filter query changes  to the URL search params
  useEffect(() => {
    const newParams = new URLSearchParams();
    if (search) newParams.set("search", search);
    if (category && category !== "all") newParams.set("category", category);
    if (maxPrice[0] < 30000) newParams.set("maxPrice", maxPrice[0].toString());
    const newUrl = `${pathname}?${newParams.toString()}`;
    router.push(newUrl);
  }, [search, category, maxPrice, pathname, router]);

  const hasActiveFilters = Boolean(
    search || category !== "all" || maxPrice[0] < 30000,
  );
  const showSkeleton = listingsData.length === 0 && !hasActiveFilters;

  return (
    <div className="container mx-auto px-6 max-w-7xl py-12 flex flex-col md:flex-row gap-8">
      {/* Sidebar Filters */}
      <aside className="w-full md:w-64 space-y-8 shrink-0">
        <div>
          <h2 className="text-xl font-semibold mb-4">Filters</h2>
          <div className="space-y-6">
            <div className="space-y-2">
              <Label htmlFor="search">Search</Label>
              <Input
                id="search"
                placeholder="Search breeds, items..."
                value={search}
                onChange={(e) => setSearch(e.target.value)}
              />
            </div>

            <div className="space-y-2">
              <Label>Category</Label>
              <Select value={category} onValueChange={setCategory}>
                <SelectTrigger>
                  <SelectValue placeholder="All Categories" />
                </SelectTrigger>
                <SelectContent className=" *:p-2">
                  <SelectItem value="all">All Categories</SelectItem>
                  <SelectItem value="duck">Duck</SelectItem>
                  <SelectItem value="chicken">Chicken</SelectItem>
                  <SelectItem value="egg">Egg</SelectItem>
                  <SelectItem value="goat">Goat</SelectItem>
                  <SelectItem value="cow">Cow</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div className="space-y-4">
              <div className="flex justify-between">
                <Label>Max Price</Label>
                <span className="text-sm font-mono text-primary">
                  ৳{maxPrice[0]}
                </span>
              </div>
              <Slider
                className="bg-muted-foreground rounded-2xl h-fit p-1"
                value={maxPrice}
                onValueChange={setMaxPrice}
                max={30000}
                step={100}
              />
            </div>
          </div>
        </div>
      </aside>

      {/* Main Grid */}
      <main className="flex-1">
        <div className="mb-6">
          <h1 className="text-3xl font-semibold">Explore Listings</h1>
          <p className="text-muted-foreground">
            Showing {listingsData.length} results
          </p>
        </div>

        {showSkeleton ? (
          <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
            {Array.from({ length: 6 }).map((_, index) => (
              <ListingSkeleton key={index} />
            ))}
          </div>
        ) : listingsData.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
            {listingsData.map((listing) => (
              <ListingCard key={listing._id} listing={listing} />
            ))}
          </div>
        ) : (
          <div className="py-20 text-center text-muted-foreground bg-card border rounded-xl">
            No listings found matching your criteria.
          </div>
        )}
      </main>
    </div>
  );
}

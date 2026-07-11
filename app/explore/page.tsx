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
import { getListings } from "@/lib/api";
import { Listing } from "@/lib/mock-data";
import { useEffect, useMemo, useState } from "react";
export default function ExplorePage() {
  const [listings, setListings] = useState<Listing[]>([]);
  const [search, setSearch] = useState("");
  const [category, setCategory] = useState("All");
  const [maxPrice, setMaxPrice] = useState([20000]);

  useEffect(() => {
    async function loadData() {
      const data = (await getListings()) as Listing[];
      setListings(data);
    }
    loadData();
  }, []);

  const filtered = useMemo(() => {
    let result = listings;

    if (search) {
      result = result.filter((l) =>
        l.title.toLowerCase().includes(search.toLowerCase()),
      );
    }
    if (category !== "All") {
      result = result.filter((l) => l.category === category);
    }
    result = result.filter((l) => l.price <= maxPrice[0]);

    return result;
  }, [search, category, maxPrice, listings]);

  return (
    <div className="container mx-auto px-6 max-w-300 py-12 flex flex-col md:flex-row gap-8">
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
                <SelectContent>
                  <SelectItem value="All">All Categories</SelectItem>
                  <SelectItem value="Duck">Duck</SelectItem>
                  <SelectItem value="Chicken">Chicken</SelectItem>
                  <SelectItem value="Egg">Egg</SelectItem>
                  <SelectItem value="Goat">Goat</SelectItem>
                  <SelectItem value="Cow">Cow</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div className="space-y-4">
              <div className="flex justify-between">
                <Label>Max Price</Label>
                <span className="text-sm font-mono text-[#B8823A]">
                  ৳{maxPrice[0]}
                </span>
              </div>
              <Slider
                className="bg-muted-foreground rounded-2xl h-fit p-1"
                value={maxPrice}
                onValueChange={setMaxPrice}
                max={50000}
                step={100}
              />
            </div>
          </div>
        </div>
      </aside>

      {/* Main Grid */}
      <main className="flex-1">
        <div className="mb-6">
          <h1 className="text-[2rem] font-semibold">Explore Listings</h1>
          <p className="text-muted-foreground">
            Showing {filtered.length} results
          </p>
        </div>

        {filtered.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
            {filtered.map((listing) => (
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

import Link from "next/link";
import { Button } from "@/components/ui/button";
import { getFeaturedListings } from "@/lib/api";
import { ListingCard } from "@/components/shared/ListingCard";

export default async function HomePage() {
  const featuredListings = await getFeaturedListings();

  return (
    <div className="flex flex-col min-h-screen">
      {/* 1. Hero Section */}
      <section className="relative min-h-[65vh] flex items-center bg-background overflow-hidden border-b border-border">
        {/* Subtle decorative ripple (to be animated in Phase 4) */}
        <div className="absolute inset-0 z-0 flex items-center justify-center opacity-[0.08] pointer-events-none">
          <div className="w-200 h-200 rounded-full border border-primary" />
          <div className="absolute w-150 h-150 rounded-full border border-primary" />
        </div>

        <div className="container relative z-10 mx-auto px-6 max-w-300">
          <div className="max-w-2xl">
            <h1 className="text-[2.75rem] font-semibold leading-[1.1] text-foreground mb-6">
              From local farms, <br /> straight to you.
            </h1>
            <p className="text-lg text-muted-foreground mb-8 max-w-lg">
              Khamar Bazaar connects rural Bangladeshi farmers directly with
              buyers. Discover healthy poultry, livestock, and fresh eggs today.
            </p>
            <Button asChild size="lg" className="h-12 px-8 text-base">
              <Link href="/explore">Explore Listings</Link>
            </Button>
          </div>
        </div>
      </section>

      {/* 2. Categories */}
      <section className="py-20 bg-card">
        <div className="container mx-auto px-6 max-w-300">
          <h2 className="text-[2rem] font-semibold mb-10 text-foreground">
            Browse by Category
          </h2>
          <div className="grid grid-cols-2 md:grid-cols-5 gap-4">
            {["Duck", "Chicken", "Egg", "Goat", "Cow"].map((cat) => (
              <Link
                key={cat}
                href={`/explore?category=${cat}`}
                className="block p-6 rounded-xl bg-background border border-border text-center hover:border-primary transition-colors">
                <span className="font-medium text-foreground">{cat}</span>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* 3. Featured Listings */}
      <section className="py-20 bg-background">
        <div className="container mx-auto px-6 max-w-300">
          <div className="flex justify-between items-end mb-10">
            <h2 className="text-[2rem] font-semibold text-foreground">
              Featured Listings
            </h2>
            <Link
              href="/explore"
              className="text-primary font-medium hover:underline">
              View all
            </Link>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {featuredListings.map((listing) => (
              <ListingCard key={listing._id} listing={listing} />
            ))}
          </div>
        </div>
      </section>

      {/* 4. How It Works */}
      <section className="py-20 bg-card">
        <div className="container mx-auto px-6 max-w-300">
          <h2 className="text-[2rem] font-semibold text-center mb-16 text-foreground">
            How It Works
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-12 text-center">
            <div>
              <div className="w-12 h-12 rounded-full bg-secondary text-primary flex items-center justify-center mx-auto mb-6 text-xl font-mono">
                1
              </div>
              <h3 className="text-[1.25rem] font-semibold mb-3">
                List Your Animals
              </h3>
              <p className="text-muted-foreground">
                Farmers easily upload details, photos, and prices of their
                available livestock.
              </p>
            </div>
            <div>
              <div className="w-12 h-12 rounded-full bg-secondary text-primary flex items-center justify-center mx-auto mb-6 text-xl font-mono">
                2
              </div>
              <h3 className="text-[1.25rem] font-semibold mb-3">
                Browse & Filter
              </h3>
              <p className="text-muted-foreground">
                Buyers search by breed, location, or budget to find exactly what
                they need.
              </p>
            </div>
            <div>
              <div className="w-12 h-12 rounded-full bg-secondary text-primary flex items-center justify-center mx-auto mb-6 text-xl font-mono">
                3
              </div>
              <h3 className="text-[1.25rem] font-semibold mb-3">
                Connect Directly
              </h3>
              <p className="text-muted-foreground">
                No middlemen. Contact the farmer directly to arrange payment and
                pickup.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* 5. Why Khamar Bazaar & 6. Stats (Combined for clean layout) */}
      <section className="py-20 bg-foreground text-background">
        <div className="container mx-auto px-6 max-w-300 grid md:grid-cols-2 gap-16 items-center">
          <div>
            <h2 className="text-[2rem] font-semibold mb-6">
              Honest Trade. Local Roots.
            </h2>
            <p className="opacity-80 leading-relaxed mb-8">
              We verify our farmers to ensure you get authentic, healthy breeds.
              By cutting out middlemen, farmers earn more and you pay less.
            </p>
            <div className="grid grid-cols-2 gap-6 font-mono">
              <div>
                <span className="block text-[2rem] font-medium text-[#B8823A]">
                  1,200+
                </span>
                <span className="text-sm opacity-70">Active Listings</span>
              </div>
              <div>
                <span className="block text-[2rem] font-medium text-[#B8823A]">
                  64
                </span>
                <span className="text-sm opacity-70">Districts Covered</span>
              </div>
            </div>
          </div>
          {/* Placeholder for a minimal atmospheric image */}
          <div className="aspect-square bg-white/5 rounded-xl flex items-center justify-center border border-white/10">
            <span className="opacity-50 text-sm">Farm imagery</span>
          </div>
        </div>
      </section>

      {/* 7. Newsletter CTA */}
      <section className="py-24 bg-background text-center">
        <div className="container mx-auto px-6 max-w-xl">
          <h2 className="text-[2rem] font-semibold mb-4 text-foreground">
            Stay Updated
          </h2>
          <p className="text-muted-foreground mb-8">
            Get notified about rare breed availability and seasonal drops in
            your area.
          </p>
          <div className="flex gap-2">
            <input
              type="email"
              placeholder="Your email address"
              className="flex-1 rounded-xl border border-border bg-card px-4 focus:outline-none focus:ring-2 focus:ring-primary"
            />
            <Button>Subscribe</Button>
          </div>
        </div>
      </section>
    </div>
  );
}

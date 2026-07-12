import Link from "next/link";

export function Footer() {
  return (
    <footer className="bg-foreground text-background py-12 mt-auto">
      <div className="container mx-auto px-6 max-w-7xl">
        <div className="flex flex-col md:flex-row justify-between gap-12">
          <div className="flex-1 space-y-4">
            <h2 className="text-xl font-semibold tracking-tight">
              Khamar Bazaar
            </h2>
            <p className="text-sm opacity-80 max-w-xs leading-relaxed">
              Connecting rural Bangladeshi farmers directly with buyers. Honest,
              fresh, and local.
            </p>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-3 gap-8 md:gap-12">
            <div className="flex flex-col gap-3">
              <h3 className="font-medium mb-1">Marketplace</h3>
              <Link
                href="/explore?category=Duck"
                className="text-sm opacity-80 hover:opacity-100 transition-opacity">
                Ducks
              </Link>
              <Link
                href="/explore?category=Chicken"
                className="text-sm opacity-80 hover:opacity-100 transition-opacity">
                Chickens
              </Link>
              <Link
                href="/explore?category=Egg"
                className="text-sm opacity-80 hover:opacity-100 transition-opacity">
                Eggs
              </Link>
            </div>

            <div className="flex flex-col gap-3">
              <h3 className="font-medium mb-1">Company</h3>
              <Link
                href="/about"
                className="text-sm opacity-80 hover:opacity-100 transition-opacity">
                About Us
              </Link>
              <Link
                href="/contact"
                className="text-sm opacity-80 hover:opacity-100 transition-opacity">
                Contact
              </Link>
            </div>

            <div className="flex flex-col gap-3 col-span-2 md:col-span-1">
              <h3 className="font-medium mb-1">Social</h3>
              <a
                href="https://www.facebook.com/khamarbazaar"
                className="text-sm opacity-80 hover:opacity-100 transition-opacity">
                Facebook
              </a>
              <a
                href="https://www.instagram.com/khamarbazaar"
                className="text-sm opacity-80 hover:opacity-100 transition-opacity">
                Instagram
              </a>
            </div>
          </div>
        </div>

        <div className="mt-16 pt-8 border-t border-background/20 text-sm opacity-60 text-center md:text-left">
          © {new Date().getFullYear()} Khamar Bazaar. All rights reserved.
        </div>
      </div>
    </footer>
  );
}

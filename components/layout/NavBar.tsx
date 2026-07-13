"use client";

import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { Button } from "../ui/button";
import { LogOut, Menu, Sprout } from "lucide-react";
import { Sheet, SheetContent, SheetTitle, SheetTrigger } from "../ui/sheet";
import { authClient } from "@/lib/auth-client";
export function Navbar({
  session,
  signout,
}: {
  session: typeof authClient.$Infer.Session | null;
  signout: () => Promise<void>;
}) {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);
  const [isSigningOut, setIsSigningOut] = useState(false);
  const pathname = usePathname();
  const router = useRouter();

  const navItems = [
    { href: "/", label: "Home" },
    { href: "/explore", label: "Explore" },
    { href: "/about", label: "About" },
  ];

  const authItems = session
    ? [
        { href: "/dashboard", label: "Dashboard" },
        { href: "/listings/add", label: "Add Listing" },
      ]
    : [];

  const handleSignOut = async () => {
    setIsSigningOut(true);
    try {
      await signout();
      router.refresh();
    } finally {
      setIsSigningOut(false);
      setOpen(false);
    }
  };

  const renderLinks = (mobile = false) => (
    <div className={mobile ? "flex flex-col gap-2" : "flex items-center gap-2"}>
      {navItems.map((item) => {
        const isActive = pathname === item.href;

        return (
          <Link
            key={item.href}
            href={item.href}
            onClick={() => setOpen(false)}
            className={`rounded-full px-3 py-2 text-sm font-medium transition-colors ${
              isActive
                ? "bg-primary/10 text-primary"
                : "text-foreground/80 hover:bg-accent hover:text-foreground"
            }`}>
            {item.label}
          </Link>
        );
      })}

      {session ? (
        <>
          {authItems.map((item) => {
            const isActive = pathname === item.href;

            return (
              <Link
                key={item.href}
                href={item.href}
                onClick={() => setOpen(false)}
                className={`rounded-full px-3 py-2 text-sm font-medium transition-colors ${
                  isActive
                    ? "bg-primary/10 text-primary"
                    : "text-foreground/80 hover:bg-accent hover:text-foreground"
                }`}>
                {item.label}
              </Link>
            );
          })}

          <div className="flex items-center gap-2 pt-1 md:pt-0">
            <div className="hidden rounded-full border border-border/60 bg-background/80 px-3 py-2 text-sm text-muted-foreground lg:block">
              {session.user?.name ? `Hi, ${session.user.name}` : "Welcome back"}
            </div>
            <Button
              variant="outline"
              size="sm"
              onClick={handleSignOut}
              disabled={isSigningOut}
              className="rounded-full cursor-pointer">
              <LogOut className="h-4 w-4" />
              {isSigningOut ? "Signing out..." : "Log out"}
            </Button>
          </div>
        </>
      ) : (
        <div className="flex items-center gap-2 pt-1 md:pt-0">
          <Button asChild variant="outline" size="sm" className="rounded-full">
            <Link href="/login" onClick={() => setOpen(false)}>
              Login
            </Link>
          </Button>
          <Button asChild size="sm" className="rounded-full">
            <Link href="/register" onClick={() => setOpen(false)}>
              Register
            </Link>
          </Button>
        </div>
      )}
    </div>
  );

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 0);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <header
      className={`sticky top-0 z-50 w-full border-b border-border/60 bg-background/95 backdrop-blur supports-backdrop-filter:bg-background/80 transition-all duration-200 ${
        scrolled ? "shadow-sm" : ""
      }`}>
      <div className="mx-auto flex h-16 w-full max-w-7xl items-center justify-between px-4 sm:px-6 lg:px-8">
        <Link
          href="/"
          className="flex items-center gap-2 text-lg font-semibold tracking-tight text-foreground">
          <span className="flex h-9 w-9 items-center justify-center rounded-full bg-primary/10 text-primary">
            <Sprout className="h-4 w-4" />
          </span>
          <span>Khamar Bazaar</span>
        </Link>

        <nav className="hidden items-center gap-2 md:flex">{renderLinks()}</nav>

        <div className="md:hidden">
          <Sheet open={open} onOpenChange={setOpen}>
            <SheetTrigger asChild>
              <Button variant="ghost" size="icon" className="text-foreground">
                <Menu className="h-5 w-5" />
                <span className="sr-only">Toggle menu</span>
              </Button>
            </SheetTrigger>
            <SheetContent
              side="left"
              className="w-80 border-r border-border/60 bg-background px-5 pt-16">
              <SheetTitle className="sr-only">Navigation Menu</SheetTitle>
              {renderLinks(true)}
            </SheetContent>
          </Sheet>
        </div>
      </div>
    </header>
  );
}

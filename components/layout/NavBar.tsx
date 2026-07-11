"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { Button } from "../ui/button";
import { Sheet, SheetContent, SheetTitle, SheetTrigger } from "../ui/sheet";
import { Menu } from "lucide-react";

export function Navbar() {
  const [scrolled, setScrolled] = useState<boolean>(false);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 0);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <header
      className={`sticky top-0 z-50 w-full bg-card h-16 flex items-center transition-shadow duration-200 ${
        scrolled ? "shadow-sm" : ""
      }`}>
      <div className="container mx-auto px-6 max-w-7xl flex items-center justify-between w-full">
        <Link
          href="/"
          className="text-xl font-semibold tracking-tight text-foreground">
          Khamar Bazaar
        </Link>

        {/* Desktop Nav */}
        <nav className="hidden md:flex items-center gap-6">
          <Link
            href="/"
            className="text-sm font-medium text-foreground hover:text-primary transition-colors">
            Home
          </Link>
          <Link
            href="/explore"
            className="text-sm font-medium text-foreground hover:text-primary transition-colors">
            Explore
          </Link>
          <Link
            href="/about"
            className="text-sm font-medium text-foreground hover:text-primary transition-colors">
            About
          </Link>
          <Button asChild className="ml-4">
            <Link href="/login">Add Listing</Link>
          </Button>
        </nav>

        {/* Mobile Nav */}
        <div className="md:hidden">
          <Sheet>
            <SheetTrigger asChild>
              <Button
                variant="ghost"
                size="icon"
                className="text-foreground -mr-2">
                <Menu className="h-6 w-6" />
                <span className="sr-only">Toggle menu</span>
              </Button>
            </SheetTrigger>
            <SheetContent
              side="right"
              className="w-75 bg-card flex flex-col gap-6 pt-16 border-l-0">
              <SheetTitle className="sr-only">Navigation Menu</SheetTitle>
              <Link href="/" className="text-lg font-medium text-foreground">
                Home
              </Link>
              <Link
                href="/explore"
                className="text-lg font-medium text-foreground">
                Explore
              </Link>
              <Link
                href="/about"
                className="text-lg font-medium text-foreground">
                About
              </Link>
              <div className="mt-auto pb-8">
                <Button asChild className="w-full">
                  <Link href="/login">Add Listing</Link>
                </Button>
              </div>
            </SheetContent>
          </Sheet>
        </div>
      </div>
    </header>
  );
}

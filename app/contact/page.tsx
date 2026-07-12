import type { Metadata } from "next";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Mail, MapPin, Phone } from "lucide-react";

export const metadata: Metadata = {
  title: "Contact | Khamar Bazaar",
  description:
    "Reach out to Khamar Bazaar for support, listing questions, or local marketplace help.",
};

export default function ContactPage() {
  return (
    <div className="container mx-auto px-6 max-w-7xl py-20 flex flex-col md:flex-row gap-16">
      {/* Contact Info */}
      <div className="md:w-1/3 space-y-10">
        <div>
          <h1 className="text-5xl/tight font-semibold mb-4 text-foreground">
            Get in touch.
          </h1>
          <p className="text-lg text-muted-foreground">
            Have a question about a listing or need help setting up your farmer
            profile? We&apos;re here to help.
          </p>
        </div>

        <div className="space-y-6">
          <div className="flex items-start gap-4">
            <div className="mt-1 bg-secondary text-primary p-2 rounded-full">
              <Mail className="h-5 w-5" />
            </div>
            <div>
              <h3 className="font-semibold text-foreground">Email</h3>
              <p className="text-muted-foreground">support@khamarbazaar.com</p>
            </div>
          </div>

          <div className="flex items-start gap-4">
            <div className="mt-1 bg-secondary text-primary p-2 rounded-full">
              <Phone className="h-5 w-5" />
            </div>
            <div>
              <h3 className="font-semibold text-foreground">Phone</h3>
              <p className="text-muted-foreground">+880 1234 567890</p>
              <p className="text-sm text-muted-foreground mt-1">
                Sun-Thu, 9am to 5pm
              </p>
            </div>
          </div>

          <div className="flex items-start gap-4">
            <div className="mt-1 bg-secondary text-primary p-2 rounded-full">
              <MapPin className="h-5 w-5" />
            </div>
            <div>
              <h3 className="font-semibold text-foreground">Office</h3>
              <p className="text-muted-foreground">
                Bochaganj, Rangpur
                <br />
                Bangladesh
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Contact Form */}
      <div className="md:w-1/2 md:ml-auto">
        <div className="bg-card p-8 rounded-xl border border-border shadow-sm">
          <form className="space-y-6">
            <div className="grid grid-cols-2 gap-6">
              <div className="space-y-2">
                <Label htmlFor="firstName">First Name</Label>
                <Input id="firstName" placeholder="Rahim" />
              </div>
              <div className="space-y-2">
                <Label htmlFor="lastName">Last Name</Label>
                <Input id="lastName" placeholder="Uddin" />
              </div>
            </div>

            <div className="space-y-2">
              <Label htmlFor="email">Email Address</Label>
              <Input id="email" type="email" placeholder="name@example.com" />
            </div>

            <div className="space-y-2">
              <Label htmlFor="message">Message</Label>
              <Textarea
                id="message"
                placeholder="How can we help you today?"
                className="h-32 resize-none"
              />
            </div>

            <Button type="button" className="w-full h-12 text-base">
              Send Message
            </Button>
          </form>
        </div>
      </div>
    </div>
  );
}

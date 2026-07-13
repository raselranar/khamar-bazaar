import Link from "next/link";
import { Button } from "@/components/ui/button";
import { HelpCircle, ArrowRight } from "lucide-react";

export default function GlobalNotFound() {
  return (
    <div className="flex-1 flex flex-col items-center justify-center min-h-[65vh] px-6 text-center max-w-md mx-auto">
      <div className="w-16 h-16 rounded-full bg-secondary text-primary flex items-center justify-center mb-6">
        <HelpCircle className="h-6 w-6" />
      </div>

      <h1 className="text-[2rem] font-semibold text-foreground tracking-tight mb-2">
        Record Not Found
      </h1>

      <p className="text-muted-foreground text-sm leading-relaxed mb-8">
        The specific marketplace partition, farm registry listing, or routing
        index card you are looking for does not exist or has been unlisted by
        the manager.
      </p>

      <Button asChild className="h-11 px-6 text-sm font-medium">
        <Link href="/explore" className="inline-flex items-center gap-2">
          Return to Marketplace
          <ArrowRight className="h-4 w-4" />
        </Link>
      </Button>
    </div>
  );
}

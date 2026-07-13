import { Loader2 } from "lucide-react";

export default function GlobalLoading() {
  return (
    <div className="flex-1 flex flex-col items-center justify-center min-h-[60vh] px-6">
      <div className="relative flex items-center justify-center mb-4">
        {/* Brand-inspired concentric animated ledger rings */}
        <div className="absolute w-12 h-12 rounded-full border-2 border-primary/20 animate-ping" />
        <Loader2 className="h-8 w-8 text-primary animate-spin relative z-10" />
      </div>
      <p className="text-xs font-mono tracking-widest text-muted-foreground uppercase">
        Updating Ledger...
      </p>
    </div>
  );
}

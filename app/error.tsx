"use client";

import { useEffect } from "react";
import { Button } from "@/components/ui/button";
import { AlertTriangle } from "lucide-react";

export default function GlobalError({
  error,
  reset,
}: {
  error: Error;
  reset: () => void;
}) {
  useEffect(() => {
    // Log the event anomaly cleanly to terminal telemetry pipelines
    console.error("Global boundary caught runtime error:", error);
  }, [error]);

  return (
    <div className="flex-1 flex flex-col items-center justify-center min-h-[65vh] px-6 text-center max-w-md mx-auto">
      <div className="w-16 h-16 rounded-full bg-destructive/10 text-destructive flex items-center justify-center mb-6">
        <AlertTriangle className="h-6 w-6" />
      </div>

      <h1 className="text-[2rem] font-semibold text-foreground tracking-tight mb-2">
        System Disruption
      </h1>

      <p className="text-muted-foreground text-sm leading-relaxed mb-8">
        The application encountered an unexpected layout execution error. The
        database safety remains intact, but the client ledger could not process
        this state.
      </p>

      <div className="flex flex-col sm:flex-row gap-4 w-full justify-center">
        <Button
          onClick={() => reset()}
          className="h-11 px-6 text-sm font-medium">
          Synchronize & Retry
        </Button>
        <Button
          variant="outline"
          onClick={() => (window.location.href = "/")}
          className="h-11 px-6 text-sm font-medium border-border">
          Return to Dashboard
        </Button>
      </div>
    </div>
  );
}

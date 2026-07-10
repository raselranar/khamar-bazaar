import { Card, CardContent } from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";

export function ListingSkeleton() {
  return (
    <Card className="overflow-hidden bg-card border-0 shadow-sm flex flex-col h-full">
      {/* Image Skeleton */}
      <Skeleton className="aspect-4/3 w-full rounded-none" />

      <CardContent className="p-4 flex flex-col flex-1 space-y-4">
        {/* Meta row */}
        <div className="flex items-center justify-between gap-2 mb-1">
          <Skeleton className="h-4 w-16" />
          <Skeleton className="h-6 w-20" />
        </div>

        {/* Title */}
        <Skeleton className="h-7 w-3/4" />

        {/* Description (2 lines) */}
        <div className="space-y-2 mb-4">
          <Skeleton className="h-4 w-full" />
          <Skeleton className="h-4 w-4/5" />
        </div>

        {/* View Details Link */}
        <Skeleton className="h-4 w-24 mt-auto" />
      </CardContent>
    </Card>
  );
}

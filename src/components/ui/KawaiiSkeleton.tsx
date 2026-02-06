"use client";

function Skeleton({ className = "" }: { className?: string }) {
  return (
    <div
      className={`animate-shimmer rounded-kawaii bg-gradient-to-r from-kawaii-pink/20 via-kawaii-cream/60 to-kawaii-pink/20 bg-[length:200%_100%] ${className}`}
    />
  );
}

export function ProductCardSkeleton() {
  return (
    <div className="overflow-hidden rounded-kawaii-lg bg-white/70 shadow-sm ring-1 ring-kawaii-pink/30">
      <Skeleton className="aspect-square w-full rounded-none" />
      <div className="p-4">
        <Skeleton className="h-4 w-3/4" />
        <Skeleton className="mt-2 h-4 w-1/3" />
        <Skeleton className="mt-3 h-11 w-full" />
      </div>
    </div>
  );
}

export function CharacterCardSkeleton() {
  return (
    <div className="overflow-hidden rounded-kawaii-lg bg-white/70 shadow-sm ring-1 ring-kawaii-pink/30">
      <Skeleton className="aspect-[4/3] w-full rounded-none" />
      <div className="p-4">
        <Skeleton className="h-4 w-2/3" />
        <Skeleton className="mt-2 h-3 w-1/4" />
      </div>
    </div>
  );
}

"use client";

import { FavoritesProvider } from "@/lib/favorites/store";
import { ToastProvider } from "@/components/ui/Toast";

export function Providers({ children }: { children: React.ReactNode }) {
  return (
    <FavoritesProvider>
      <ToastProvider>
        {children}
      </ToastProvider>
    </FavoritesProvider>
  );
}

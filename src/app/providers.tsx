"use client";

import { CartProvider } from "@/lib/cart/store";
import { FlyingItemLayer } from "@/components/cart/FlyingItemLayer";

export function Providers({ children }: { children: React.ReactNode }) {
  return (
    <CartProvider>
      {children}
      <FlyingItemLayer />
    </CartProvider>
  );
}

import { Suspense } from "react";
import type { Metadata } from "next";
import { Kosugi_Maru, Noto_Sans_JP } from "next/font/google";
import "@/styles/globals.css";
import { Header } from "@/components/layout/Header";
import { MobileBottomNav } from "@/components/layout/MobileBottomNav";
import { Footer } from "@/components/layout/Footer";
import { BackToTopButton } from "@/components/layout/BackToTopButton";
import { PageTransition } from "@/components/ui/PageTransition";
import { Providers } from "./providers";

const notoSansJp = Noto_Sans_JP({
  subsets: ["latin"],
  variable: "--font-noto-sans-jp",
  display: "swap",
});

const kosugiMaru = Kosugi_Maru({
  subsets: ["latin"],
  weight: ["400"],
  variable: "--font-kosugi-maru",
  display: "swap",
});

export const metadata: Metadata = {
  title: "Kawaii Goods AU",
  description: "Japanese kawaii character goods, delivered in Australia.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${notoSansJp.variable} ${kosugiMaru.variable} font-sans antialiased`}
      >
        <Providers>
          <Suspense>
            <Header />
          </Suspense>
          <main className="mx-auto min-h-dvh max-w-6xl px-4 pb-28 pt-6 sm:pb-0">
            <Suspense>
              <PageTransition>{children}</PageTransition>
            </Suspense>
          </main>
          <Footer />
          <Suspense>
            <MobileBottomNav />
          </Suspense>
          <BackToTopButton />
        </Providers>
      </body>
    </html>
  );
}

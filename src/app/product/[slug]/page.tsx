import type { Metadata } from "next";

import { ProductDetail } from "@/components/product/ProductDetail";
import { SAMPLE_PRODUCTS } from "@/lib/data/sample";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const product = SAMPLE_PRODUCTS.find((p) => p.slug === slug);
  return { title: product ? `${product.name} | Products` : "Product | Products" };
}

export default async function ProductDetailPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const product = SAMPLE_PRODUCTS.find((p) => p.slug === slug);
  if (!product) return null;
  return <ProductDetail product={product} />;
}


import type { MetadataRoute } from "next";
import { products } from "@/data/products";
export default function sitemap(): MetadataRoute.Sitemap {
  const base = process.env.NEXT_PUBLIC_SITE_URL;
  if (!base) return [];
  return [
    "",
    "/shop",
    "/custom-cakes",
    ...products.map((p) => "/shop/" + p.id),
  ].map((path) => ({ url: base + path, lastModified: new Date() }));
}

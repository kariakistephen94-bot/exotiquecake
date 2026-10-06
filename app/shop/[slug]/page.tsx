import { products } from "@/data/products";
import { notFound } from "next/navigation";
import { ProductDetail } from "@/components/product-detail";
export function generateStaticParams() {
  return products.map((p) => ({ slug: p.id }));
}
export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  return { title: products.find((p) => p.id === slug)?.name || "Cake" };
}
export default async function Page({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const p = products.find((p) => p.id === slug);
  if (!p) notFound();
  const base = process.env.NEXT_PUBLIC_SITE_URL || "http://localhost:3000";
  const structured = [
    {
      "@context": "https://schema.org",
      "@type": "Product",
      name: p.name,
      description: p.description,
      image: base + "/images/" + p.image + ".jpg",
      brand: { "@type": "Brand", name: "Exotique Cakes" },
    },
    {
      "@context": "https://schema.org",
      "@type": "BreadcrumbList",
      itemListElement: [
        { "@type": "ListItem", position: 1, name: "Home", item: base },
        {
          "@type": "ListItem",
          position: 2,
          name: "Shop",
          item: base + "/shop",
        },
        {
          "@type": "ListItem",
          position: 3,
          name: p.name,
          item: base + "/shop/" + p.id,
        },
      ],
    },
  ];
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(structured).replace(/</g, "\\u003c"),
        }}
      />
      <ProductDetail product={p} />
    </>
  );
}

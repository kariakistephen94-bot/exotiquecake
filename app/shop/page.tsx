import { Suspense } from "react";
import { Catalogue } from "@/components/catalogue";
export const metadata = { title: "Shop Cakes & Desserts" };
export default function Shop() {
  return (
    <Suspense fallback={<div className="skeleton" />}>
      <Catalogue />
    </Suspense>
  );
}

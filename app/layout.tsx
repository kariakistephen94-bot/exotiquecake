import type { Metadata, Viewport } from "next";
import "./globals.css";
import { StoreProvider } from "@/components/store";
import { Shell } from "@/components/shell";
export const metadata: Metadata = {
  metadataBase: new URL(
    process.env.NEXT_PUBLIC_SITE_URL || "http://localhost:3000",
  ),
  title: {
    default: "Exotique Cakes Ilupeju | Premium Cakes & Desserts in Lagos",
    template: "%s | Exotique Cakes",
  },
  description:
    "Order beautifully crafted birthday cakes, celebration cakes, desserts and custom cakes from Exotique Cakes Ilupeju. Delivery and pickup available in Lagos.",
  manifest: "/manifest.webmanifest",
  icons: { icon: "/logo.png", apple: "/icon-192.png" },
  openGraph: {
    title: "Exotique Cakes Ilupeju",
    description: "Beautiful cakes. Exceptional taste. Effortless ordering.",
    images: ["/images/1.jpg"],
  },
};
export const viewport: Viewport = {
  themeColor: "#85224b",
  width: "device-width",
  initialScale: 1,
  viewportFit: "cover",
};
export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body>
        <StoreProvider>
          <Shell>{children}</Shell>
        </StoreProvider>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "Bakery",
              name: "Exotique Cakes Ilupeju",
              telephone: "+2348029993595",
              address: {
                "@type": "PostalAddress",
                streetAddress: "17 Esther Osiyemi Street, Ilupeju",
                addressLocality: "Lagos",
                addressCountry: "NG",
              },
            }),
          }}
        />
      </body>
    </html>
  );
}

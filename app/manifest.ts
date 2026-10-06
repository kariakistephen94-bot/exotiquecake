import type { MetadataRoute } from "next";
export default function manifest(): MetadataRoute.Manifest {
  return {
    name: "Exotique Cakes Ilupeju",
    short_name: "Exotique",
    description: "Your next happy moment, beautifully made.",
    start_url: "/",
    display: "standalone",
    background_color: "#fcf9f4",
    theme_color: "#85224b",
    icons: [
      {
        src: "/icon-192.png",
        sizes: "192x192",
        type: "image/png",
        purpose: "any",
      },
      {
        src: "/icon-512.png",
        sizes: "512x512",
        type: "image/png",
        purpose: "any",
      },
    ],
  };
}

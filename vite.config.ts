import { defineConfig } from "vite";
import preact from "@preact/preset-vite";
import { VitePWA } from "vite-plugin-pwa";

export default defineConfig({
  base: "/e2v/",
  plugins: [
    preact(),
    VitePWA({
      registerType: "autoUpdate",
      injectRegister: false,
      includeAssets: [
        "logo.png",
        "apple-touch-icon.png",
        "icons/icon-192.png",
        "icons/icon-512.png",
        "icons/icon-maskable-192.png",
        "icons/icon-maskable-512.png",
      ],
      manifest: false,
      workbox: {
        globPatterns: ["**/*.{js,css,html,webmanifest,png,svg,ico,json}"],
        navigateFallback: "index.html",
      },
    }),
  ],
  test: {
    environment: "node",
  },
});

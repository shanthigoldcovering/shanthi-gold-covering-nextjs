import type { Metadata, Viewport } from "next";
import { Cormorant_Garamond, Nunito } from "next/font/google";
import "./globals.css";
import { PageLoader } from "./PageLoader";

const cormorant = Cormorant_Garamond({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
  style: ["normal", "italic"],
  variable: "--font-display",
  display: "swap",
});

const nunito = Nunito({
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700"],
  variable: "--font-body",
  display: "swap",
});

export const metadata: Metadata = {
  title: "Shanthi Gold Covering — Impon Jwellery",
  description:
    "Discover exquisite Impon, Gold Covering & micro gold-plated jewellery. Crafted with traditional South Indian artistry — perfect for weddings, festivals & everyday elegance. Trusted since 1989.",
  icons: {
    icon: [
      { url: "/favicon-16x16.png", sizes: "16x16", type: "image/png" },
      { url: "/favicon-32x32.png", sizes: "32x32", type: "image/png" },
      { url: "/favicon-48x48.png", sizes: "48x48", type: "image/png" },
    ],
    apple: [
      { url: "/apple-touch-icon.png", sizes: "180x180", type: "image/png" },
    ],
    other: [
      { url: "/icon-192.png", sizes: "192x192", type: "image/png" },
      { url: "/icon-512.png", sizes: "512x512", type: "image/png" },
    ],
  },
  manifest: undefined,
};

export const viewport: Viewport = {
  themeColor: "#7B1C2E",
  width: "device-width",
  initialScale: 1,
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className={`${cormorant.variable} ${nunito.variable}`}>
      <body className={nunito.className}>
        <PageLoader />
        {children}
      </body>
    </html>
  );
}

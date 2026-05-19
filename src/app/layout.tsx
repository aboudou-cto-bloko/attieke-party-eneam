import type { Metadata } from "next";
import { Bebas_Neue, Outfit, Inter } from "next/font/google";
import Script from "next/script";
import "./globals.css";
import { ConvexClientProvider } from "@/components/ConvexClientProvider";

const bebasNeue = Bebas_Neue({
  weight: "400",
  subsets: ["latin"],
  variable: "--font-bebas-neue",
});

const outfit = Outfit({
  subsets: ["latin"],
  variable: "--font-outfit",
});

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
});

const APP_URL = process.env.NEXT_PUBLIC_APP_URL ?? "https://attieke-party-eneam.vercel.app";

export const metadata: Metadata = {
  metadataBase: new URL(APP_URL),
  title: "Attiéké Party 🔥 — BUE-ENEAM · 25 Mai 2026",
  description:
    "Le rendez-vous chill que tu ne dois surtout pas manquer ! Jeux, bouffe, musique et fun garanti. Entrée 3 000 FCFA. Lundi 25 Mai 2026 à partir de 15H.",
  openGraph: {
    title: "Attiéké Party 🔥 — BUE-ENEAM · 25 Mai 2026",
    description:
      "♟️ Jeux · 🍉 Bouffe · 🎵 Musique · 📸 Fun garanti. Lundi 25 Mai 2026 · 3 000 FCFA",
    url: APP_URL,
    siteName: "Attiéké Party ENEAM",
    images: [
      {
        url: "/assets/affiche-dark.jpg",
        width: 512,
        height: 1024,
        alt: "Attiéké Party — BUE-ENEAM 25 Mai 2026",
      },
    ],
    locale: "fr_FR",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Attiéké Party 🔥 — BUE-ENEAM · 25 Mai 2026",
    description: "♟️ Jeux · 🍉 Bouffe · 🎵 Musique · 3 000 FCFA",
    images: ["/assets/affiche-dark.jpg"],
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="fr"
      className={`${bebasNeue.variable} ${outfit.variable} ${inter.variable} h-full`}
    >
      <body className="min-h-full antialiased">
        <ConvexClientProvider>{children}</ConvexClientProvider>
        <Script
          src="https://cdn.fedapay.com/checkout.js?v=1.1.2"
          strategy="afterInteractive"
        />
      </body>
    </html>
  );
}

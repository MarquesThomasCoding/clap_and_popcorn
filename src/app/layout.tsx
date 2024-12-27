import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import { NavBar } from "@/components/NavBar";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "CLAP&POPCORN",
  description: "Clap&Popcorn, le site de référence pour les cinéphiles"
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="fr">
      <head>
        <link rel="icon" href="/path/to/favicon.ico" />
      </head>
      <body
        className={`dark ${geistSans.variable} ${geistMono.variable} antialiased overflow-x-hidden`}
      >
        <NavBar />
        {children}
      </body>
    </html>
  );
}

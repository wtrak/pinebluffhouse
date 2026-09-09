import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Pine Bluff House — Photo Walkthrough",
  description: "Explore the house through an interactive floor plan with 50 mapped interior views and property reference albums.",
  icons: {
    icon: "/favicon.svg",
    shortcut: "/favicon.svg",
  },
  openGraph: {
    title: "Pine Bluff House — Interactive Photo Walkthrough",
    description: "A room-by-room visual walkthrough organized around the measured floor plan.",
    images: [{ url: "/og-card.png", width: 1738, height: 907, alt: "Pine Bluff House interactive photo walkthrough" }],
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={geistSans.variable + " " + geistMono.variable}>
        {children}
      </body>
    </html>
  );
}

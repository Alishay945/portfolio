import type { Metadata } from "next";
import { Outfit, Plus_Jakarta_Sans } from "next/font/google";
import "./globals.css";

const outfit = Outfit({
  subsets: ["latin"],
  variable: "--font-title",
});

const plusJakartaSans = Plus_Jakarta_Sans({
  subsets: ["latin"],
  variable: "--font-body",
});

export const metadata: Metadata = {
  title: "Alisha Wasif | Premium Portfolio",
  description: "Portfolio of Alisha Wasif - Software Engineering Student specializing in Network Infrastructure and UI/UX Design.",
  icons: {
    icon: "/alisha-avatar.png",
    shortcut: "/alisha-avatar.png",
    apple: "/alisha-avatar.png",
    other: [
      { rel: "icon", url: "/alisha-avatar.png" },
      { rel: "apple-touch-icon", url: "/alisha-avatar.png" },
    ],
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={`${outfit.variable} ${plusJakartaSans.variable}`}>
      <body className="antialiased">
        {children}
      </body>
    </html>
  );
}

import type { Metadata } from "next";
import { Poppins } from "next/font/google";
import "../styles/globals.css";

const poppins = Poppins({
  subsets: ["latin"],
  weight: ["100", "200", "300", "400", "500", "600", "700", "800", "900"],
  variable: "--font-poppins", // optional but recommended
  display: "swap",
});
export const metadata: Metadata = {
  metadataBase: new URL("https://yourdomain.com"),

  title: {
    default: "Engineering-Grade Next.js Boilerplate",
    template: "%s | Next.js TypeScript Boilerplate",
  },

  description:
    "Engineering-grade React + Next.js + TypeScript boilerplate. Scalable, type-safe architecture with clean folder structure, modern frontend patterns, built-in state management, and code quality tooling.",

  keywords: [
    "Next.js Boilerplate",
    "React TypeScript Starter",
    "Scalable Frontend Architecture",
    "Production Ready Next.js",
    "Type-Safe React App",
    "Modern Frontend Stack",
  ],

  authors: [{ name: "Your Name" }],
  creator: "Your Name",

  openGraph: {
    title: "Engineering-Grade Next.js + TypeScript Boilerplate",
    description:
      "Scalable, type-safe architecture with clean folder structure, modern frontend patterns, built-in state management, and code quality tooling.",
    url: "https://yourdomain.com",
    siteName: "Next.js Engineering Boilerplate",
    type: "website",
  },

  twitter: {
    card: "summary_large_image",
    title: "Engineering-Grade Next.js Boilerplate",
    description:
      "Production-ready React + Next.js + TypeScript architecture for scalable applications.",
  },

  robots: {
    index: true,
    follow: true,
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`${poppins.variable} ${poppins.className} antialiased`}>
        {children}
      </body>
    </html>
  );
}

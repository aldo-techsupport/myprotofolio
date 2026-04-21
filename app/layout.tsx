import type { Metadata } from "next";
import "./globals.css";
import { Providers } from "./providers";

export const metadata: Metadata = {
  title: "Aldo Aditya Putra — IT Support · Network Engineer · Web Developer",
  description: "Portfolio & CV interaktif Aldo Aditya Putra — IT Support, Network Engineer, dan Web Developer berbasis Jakarta.",
  keywords: ["IT Support", "Network Engineer", "Web Developer", "Laravel", "Mikrotik", "AWS"],
  authors: [{ name: "Aldo Aditya Putra" }],
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="id" className="scroll-smooth">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link
          href="https://fonts.googleapis.com/css2?family=Syne:wght@400;500;600;700;800&family=DM+Sans:ital,opsz,wght@0,9..40,300;0,9..40,400;0,9..40,500;1,9..40,300&family=JetBrains+Mono:wght@300;400;500&display=swap"
          rel="stylesheet"
        />
      </head>
      <body className="antialiased">
        <Providers>{children}</Providers>
      </body>
    </html>
  );
}

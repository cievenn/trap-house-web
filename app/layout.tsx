import type { Metadata } from "next";
import "./globals.css";
import { SmoothScroll } from "@/components/SmoothScroll";
import { Navbar } from "@/components/Navbar";

export const metadata: Metadata = {
  title: "TRAP HOUSE | Elite Nightlife",
  description: "L'élite de l'événementiel nocturne.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="fr">
      <body className="bg-[#050505] text-white antialiased selection:bg-[#00F2FF] selection:text-black">
        <SmoothScroll>
          <Navbar />
          {children}
        </SmoothScroll>
      </body>
    </html>
  );
}
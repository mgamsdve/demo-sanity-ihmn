import type { Metadata } from "next";
import { Poppins } from "next/font/google";
import { draftMode } from "next/headers";
import { VisualEditing } from "next-sanity";
import "./globals.css";
import { getSiteConfig } from "@/lib/data";
import { SanityLive } from "@/lib/sanity.live";

const poppins = Poppins({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
  variable: "--font-poppins",
});

export async function generateMetadata(): Promise<Metadata> {
  const siteConfig = await getSiteConfig();

  return {
    title: {
      default: siteConfig?.seoDefaultTitle ?? "Académie Lumière",
      template: siteConfig?.seoTitleTemplate ?? "%s | Académie Lumière",
    },
    description:
      siteConfig?.seoDefaultDescription ??
      "Site officiel de l'Académie Lumière : formations, équipe enseignante et vie scolaire.",
  };
}

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const { isEnabled } = await draftMode();

  return (
    <html lang="fr" className={poppins.variable}>
      <body className="bg-[#f4f8fc] font-sans text-gray-900 antialiased">
        {children}
        <SanityLive />
        {isEnabled && <VisualEditing />}
      </body>
    </html>
  );
}

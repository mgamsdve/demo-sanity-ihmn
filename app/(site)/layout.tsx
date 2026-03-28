import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { client } from "@/lib/sanity";
import {
  FOOTER_QUERY,
  NAVIGATION_QUERY,
  SITE_CONFIG_QUERY,
} from "@/lib/queries";
import type { FooterConfig, NavigationConfig, SiteConfig } from "@/types";

export default async function SiteLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const [siteData, navigation, footer] = await Promise.all([
    client.fetch<SiteConfig | null>(SITE_CONFIG_QUERY),
    client.fetch<NavigationConfig | null>(NAVIGATION_QUERY),
    client.fetch<FooterConfig | null>(FOOTER_QUERY),
  ]);

  if (!siteData || !navigation || !footer) {
    throw new Error("Required global documents are missing in Sanity.");
  }

  return (
    <div className="flex min-h-screen flex-col">
      <Navbar schoolName={siteData.schoolName} navbar={navigation} socialLinks={footer.socialLinks} />
      <main className="flex-1 pt-[72px]">{children}</main>
      <Footer footer={footer} />
    </div>
  );
}

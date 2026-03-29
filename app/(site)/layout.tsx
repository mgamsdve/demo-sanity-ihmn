import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { getFooter, getNavigation, getSiteConfig } from "@/lib/data";

export default async function SiteLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const [siteData, navigation, footer] = await Promise.all([
    getSiteConfig(),
    getNavigation(),
    getFooter(),
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

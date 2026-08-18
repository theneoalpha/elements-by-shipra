import { sanityFetch } from "@/sanity/lib";
import { siteSettingsQuery, navigationQuery } from "@/sanity/lib/queries";
import Footer from "@/widgets/footer/footer";
import Header from "@/widgets/header/header";

export default async function SiteLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const [siteSettings] = await Promise.all([
    sanityFetch<Record<string, unknown>>(siteSettingsQuery, undefined, { tags: ["sanity-siteSettings"] }),
    sanityFetch<{ items?: Array<{ label: string; href: string }> }>(
      navigationQuery,
      undefined,
      { tags: ["sanity-navigation"] },
    ),
  ]);

  const settings = siteSettings as {
    name?: string;
    phone?: string;
    email?: string;
    address?: string;
    brandStatement?: string;
    socialLinks?: { instagram?: string; facebook?: string; pinterest?: string };
  } | null;

  return (
    <>
      <Header siteSettings={settings ?? undefined} />
      {children}
      <Footer siteSettings={settings ?? undefined} />
    </>
  );
}

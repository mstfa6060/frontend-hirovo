import { setRequestLocale } from "next-intl/server";
import { wpApi } from "@/lib/api";
import type { WPPage } from "@/lib/api/services/wordpress";
import HomeClient from "./HomeClient";

export const revalidate = 600; // 10 minutes

export default async function Home({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  setRequestLocale(locale);

  let wpContent: WPPage | null = null;
  try {
    wpContent = await wpApi.getPage("homepage", locale);
  } catch (err) {
    console.error("[WP] Homepage fetch failed:", err instanceof Error ? err.message : err);
  }

  return <HomeClient locale={locale} wpContent={wpContent} />;
}

import { setRequestLocale } from "next-intl/server";
import { wpApi } from "@/lib/api";
import type { WPPage } from "@/lib/api/services/wordpress";
import AboutClient from "./AboutClient";

export const revalidate = 3600; // 1 hour

export default async function AboutPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  setRequestLocale(locale);

  let wpContent: WPPage | null = null;
  try {
    wpContent = await wpApi.getPage("about", locale);
  } catch (err) {
    console.error("[WP] About page fetch failed:", err instanceof Error ? err.message : err);
  }

  return <AboutClient wpContent={wpContent} />;
}

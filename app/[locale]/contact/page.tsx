import { setRequestLocale } from "next-intl/server";
import { wpApi } from "@/lib/api";
import type { WPPage } from "@/lib/api/services/wordpress";
import ContactClient from "./ContactClient";

export const revalidate = 3600; // 1 hour

export default async function ContactPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  setRequestLocale(locale);

  let wpContent: WPPage | null = null;
  try {
    wpContent = await wpApi.getPage("contact", locale);
  } catch (err) {
    console.error("[WP] Contact page fetch failed:", err instanceof Error ? err.message : err);
  }

  return <ContactClient wpContent={wpContent} />;
}

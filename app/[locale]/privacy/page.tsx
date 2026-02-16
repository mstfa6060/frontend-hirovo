import { setRequestLocale } from "next-intl/server";
import { wpApi } from "@/lib/api";
import type { WPPage } from "@/lib/api/services/wordpress";
import PrivacyClient from "./PrivacyClient";

export const revalidate = 3600; // 1 hour

export default async function PrivacyPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  setRequestLocale(locale);

  let wpContent: WPPage | null = null;
  try {
    wpContent = await wpApi.getPage("privacy", locale);
  } catch {
    // fallback to static
  }

  return <PrivacyClient wpContent={wpContent} />;
}

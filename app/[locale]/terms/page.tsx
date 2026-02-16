import { setRequestLocale } from "next-intl/server";
import { wpApi } from "@/lib/api";
import type { WPPage } from "@/lib/api/services/wordpress";
import TermsClient from "./TermsClient";

export const revalidate = 3600; // 1 hour

export default async function TermsPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  setRequestLocale(locale);

  let wpContent: WPPage | null = null;
  try {
    wpContent = await wpApi.getPage("terms", locale);
  } catch {
    // fallback to static
  }

  return <TermsClient wpContent={wpContent} />;
}

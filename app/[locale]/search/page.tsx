import { getTranslations, setRequestLocale } from "next-intl/server";
import type { Metadata } from "next";
import SearchClient from "./SearchClient";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: "search" });
  return {
    title: `${t("title")} | Hirovo`,
  };
}

export default async function SearchPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  setRequestLocale(locale);

  return <SearchClient />;
}

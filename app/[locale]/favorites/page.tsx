import { getTranslations, setRequestLocale } from "next-intl/server";
import type { Metadata } from "next";
import FavoritesClient from "./FavoritesClient";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: "favorites" });
  return {
    title: `${t("title")} | Hirovo`,
  };
}

export default async function FavoritesPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  setRequestLocale(locale);

  return <FavoritesClient locale={locale} />;
}

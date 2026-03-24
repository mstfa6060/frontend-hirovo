import { getTranslations, setRequestLocale } from "next-intl/server";
import type { Metadata } from "next";
import SocialFeedClient from "./SocialFeedClient";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: "social" });
  return {
    title: `${t("title")} | Hirovo`,
    description: t("subtitle"),
  };
}

export default async function SocialPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  setRequestLocale(locale);

  return <SocialFeedClient />;
}

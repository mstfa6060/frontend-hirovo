import { getTranslations, setRequestLocale } from "next-intl/server";
import type { Metadata } from "next";
import ApplicationsClient from "./ApplicationsClient";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: "applications" });
  return {
    title: `${t("title")} | Hirovo`,
  };
}

export default async function ApplicationsPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  setRequestLocale(locale);

  return <ApplicationsClient locale={locale} />;
}

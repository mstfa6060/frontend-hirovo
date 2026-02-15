import { getTranslations, setRequestLocale } from "next-intl/server";
import type { Metadata } from "next";
import JobsPageClient from "./JobsPageClient";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: "jobs" });
  return {
    title: `${t("title")} | Hirovo`,
    description: t("subtitle"),
  };
}

export default async function JobsPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  setRequestLocale(locale);

  return <JobsPageClient locale={locale} />;
}

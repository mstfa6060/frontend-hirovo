import { getTranslations, setRequestLocale } from "next-intl/server";
import type { Metadata } from "next";
import EmployerApplicationsClient from "./EmployerApplicationsClient";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: "employer" });
  return {
    title: `${t("applications")} | Hirovo`,
  };
}

export default async function EmployerApplicationsPage({
  params,
  searchParams,
}: {
  params: Promise<{ locale: string }>;
  searchParams: Promise<{ jobId?: string }>;
}) {
  const { locale } = await params;
  const { jobId } = await searchParams;
  setRequestLocale(locale);

  return <EmployerApplicationsClient locale={locale} jobId={jobId} />;
}

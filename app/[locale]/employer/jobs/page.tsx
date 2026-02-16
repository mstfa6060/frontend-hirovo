import { getTranslations, setRequestLocale } from "next-intl/server";
import type { Metadata } from "next";
import EmployerJobsClient from "./EmployerJobsClient";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: "employer" });
  return {
    title: `${t("myJobs")} | Hirovo`,
  };
}

export default async function EmployerJobsPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  setRequestLocale(locale);

  return <EmployerJobsClient locale={locale} />;
}

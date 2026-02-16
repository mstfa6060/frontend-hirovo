import { getTranslations, setRequestLocale } from "next-intl/server";
import type { Metadata } from "next";
import EmployerDashboardClient from "./EmployerDashboardClient";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: "employer" });
  return {
    title: `${t("dashboard")} | Hirovo`,
  };
}

export default async function EmployerDashboardPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  setRequestLocale(locale);

  return <EmployerDashboardClient />;
}

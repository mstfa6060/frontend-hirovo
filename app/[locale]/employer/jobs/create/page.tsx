import { getTranslations, setRequestLocale } from "next-intl/server";
import type { Metadata } from "next";
import CreateJobClient from "./CreateJobClient";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: "employer" });
  return {
    title: `${t("jobForm.title")} | Hirovo`,
  };
}

export default async function CreateJobPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  setRequestLocale(locale);

  return <CreateJobClient locale={locale} />;
}

import { getTranslations, setRequestLocale } from "next-intl/server";
import type { Metadata } from "next";
import EmployerRegisterForm from "./EmployerRegisterForm";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: "employer.register" });
  return {
    title: `${t("title")} | Hirovo`,
    description: t("subtitle"),
  };
}

export default async function EmployerRegisterPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  setRequestLocale(locale);

  return (
    <main className="flex-1 flex items-center justify-center px-4 py-12">
      <EmployerRegisterForm />
    </main>
  );
}

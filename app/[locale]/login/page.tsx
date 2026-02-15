import { getTranslations, setRequestLocale } from "next-intl/server";
import type { Metadata } from "next";
import LoginForm from "./LoginForm";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: "auth" });
  return {
    title: `${t("login")} | Hirovo`,
    description: t("loginDescription"),
  };
}

export default async function LoginPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  setRequestLocale(locale);

  return (
    <main className="flex-1 flex items-center justify-center px-4 py-12">
      <LoginForm />
    </main>
  );
}

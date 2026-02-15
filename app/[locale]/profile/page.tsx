import { getTranslations, setRequestLocale } from "next-intl/server";
import type { Metadata } from "next";
import ProfileClient from "./ProfileClient";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: "profile" });
  return {
    title: `${t("title")} | Hirovo`,
  };
}

export default async function ProfilePage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  setRequestLocale(locale);

  return <ProfileClient locale={locale} />;
}

import { getTranslations, setRequestLocale } from "next-intl/server";
import type { Metadata } from "next";
import UserProfileClient from "./UserProfileClient";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: "social" });
  return {
    title: `${t("userProfile")} | Hirovo`,
  };
}

export default async function UserProfilePage({
  params,
}: {
  params: Promise<{ locale: string; id: string }>;
}) {
  const { locale, id } = await params;
  setRequestLocale(locale);

  return <UserProfileClient userId={id} />;
}

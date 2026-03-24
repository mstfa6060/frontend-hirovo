import { getTranslations, setRequestLocale } from "next-intl/server";
import type { Metadata } from "next";
import GroupDetailClient from "./GroupDetailClient";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: "social" });
  return {
    title: `${t("groupDetail")} | Hirovo`,
  };
}

export default async function GroupDetailPage({
  params,
}: {
  params: Promise<{ locale: string; id: string }>;
}) {
  const { locale, id } = await params;
  setRequestLocale(locale);

  return <GroupDetailClient groupId={id} />;
}

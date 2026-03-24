import { getTranslations, setRequestLocale } from "next-intl/server";
import type { Metadata } from "next";
import GroupsPageClient from "./GroupsPageClient";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: "social" });
  return {
    title: `${t("groups")} | Hirovo`,
    description: t("groupsSubtitle"),
  };
}

export default async function GroupsPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  setRequestLocale(locale);

  return <GroupsPageClient />;
}

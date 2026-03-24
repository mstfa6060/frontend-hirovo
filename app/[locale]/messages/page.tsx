import { getTranslations, setRequestLocale } from "next-intl/server";
import type { Metadata } from "next";
import MessagesClient from "./MessagesClient";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: "messages" });
  return {
    title: `${t("title")} | Hirovo`,
  };
}

export default async function MessagesPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  setRequestLocale(locale);

  return <MessagesClient />;
}

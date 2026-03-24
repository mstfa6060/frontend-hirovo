import { getTranslations, setRequestLocale } from "next-intl/server";
import type { Metadata } from "next";
import ChatClient from "./ChatClient";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: "messages" });
  return {
    title: `${t("chat")} | Hirovo`,
  };
}

export default async function ChatPage({
  params,
}: {
  params: Promise<{ locale: string; conversationId: string }>;
}) {
  const { locale, conversationId } = await params;
  setRequestLocale(locale);

  return <ChatClient conversationId={conversationId} />;
}

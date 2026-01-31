import type { Metadata } from "next";
import { NextIntlClientProvider } from "next-intl";
import { getMessages, setRequestLocale } from "next-intl/server";
import { notFound } from "next/navigation";
import { locales, isRtlLocale, type Locale } from "@/i18n/config";
import Header from "../components/Header";
import Footer from "../components/Footer";

export function generateStaticParams() {
  return locales.map((locale) => ({ locale }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  const messages = (await import(`@/messages/${locale}.json`)).default;
  const t = messages.metadata;

  return {
    title: t.title,
    description: t.description,
    keywords: t.keywords,
    robots: "index, follow",
    openGraph: {
      title: t.ogTitle,
      description: t.ogDescription,
      url: "https://hirovo.com",
      siteName: "Hirovo",
      type: "website",
    },
    twitter: {
      card: "summary_large_image",
    },
    icons: {
      icon: "/logo/hirovo_logo_white.png",
    },
  };
}

export default async function LocaleLayout({
  children,
  params,
}: {
  children: React.ReactNode;
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;

  if (!locales.includes(locale as Locale)) {
    notFound();
  }

  setRequestLocale(locale);

  const messages = await getMessages();
  const isRtl = isRtlLocale(locale);

  return (
    <html lang={locale} dir={isRtl ? "rtl" : "ltr"}>
      <body className="min-h-screen flex flex-col gradient-bg text-white font-sans leading-relaxed">
        <NextIntlClientProvider messages={messages}>
          <Header />
          {children}
          <Footer />
        </NextIntlClientProvider>
      </body>
    </html>
  );
}

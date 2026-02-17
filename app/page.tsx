"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { locales, defaultLocale, type Locale } from "@/i18n/config";

export default function RootPage() {
  const router = useRouter();

  useEffect(() => {
    const browserLang = navigator.language?.split("-")[0] || defaultLocale;
    const targetLocale = locales.includes(browserLang as Locale) ? browserLang : defaultLocale;
    router.replace(`/${targetLocale}`);
  }, [router]);

  return (
    <div className="min-h-screen flex items-center justify-center gradient-bg">
      <div className="text-white text-xl">Yönlendiriliyor...</div>
    </div>
  );
}

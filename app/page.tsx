"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { defaultLocale } from "@/i18n/config";

export default function RootPage() {
  const router = useRouter();

  useEffect(() => {
    // Get browser language or use default
    const browserLang = navigator.language?.split("-")[0] || defaultLocale;

    // Check if browser language is supported
    const supportedLocales = ["tr", "en", "de", "fr", "es", "ar", "ru", "zh", "ja", "ko", "pt", "it", "nl", "pl", "sv", "no", "da", "fi", "cs", "el", "he", "hu", "ro", "sk", "uk", "vi", "id", "ms", "th", "bn", "hi", "ta", "te", "mr", "fa", "ur", "bg", "hr", "sr", "sl", "lt", "lv", "et", "sw", "af", "is", "ga", "mt", "am", "hy"];

    const targetLocale = supportedLocales.includes(browserLang) ? browserLang : defaultLocale;

    router.replace(`/${targetLocale}`);
  }, [router]);

  return (
    <html lang="tr">
      <body className="min-h-screen flex items-center justify-center gradient-bg">
        <div className="text-white text-xl">Yönlendiriliyor...</div>
      </body>
    </html>
  );
}

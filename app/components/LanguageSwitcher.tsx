"use client";

import { useState, useRef, useEffect } from "react";
import { useLocale, useTranslations } from "next-intl";
import { useRouter, usePathname } from "@/i18n/routing";
import { locales, languageNames, type Locale } from "@/i18n/config";

// Popular languages shown at top
const popularLocales: Locale[] = ["tr", "en", "de", "fr", "es", "ar", "ru", "zh"];

export default function LanguageSwitcher() {
  const t = useTranslations("languageSwitcher");
  const locale = useLocale();
  const router = useRouter();
  const pathname = usePathname();
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  const otherLocales = locales.filter((l) => !popularLocales.includes(l));

  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(event.target as Node)
      ) {
        setIsOpen(false);
      }
    }

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const handleLocaleChange = (newLocale: Locale) => {
    router.replace(pathname, { locale: newLocale });
    setIsOpen(false);
  };

  return (
    <div className="relative" ref={dropdownRef}>
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="flex items-center gap-2 px-3 py-2 rounded-lg text-text hover:bg-gray-100 transition-colors"
        aria-label={t("selectLanguage")}
      >
        <svg
          className="w-5 h-5"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M21 12a9 9 0 01-9 9m9-9a9 9 0 00-9-9m9 9H3m9 9a9 9 0 01-9-9m9 9c1.657 0 3-4.03 3-9s-1.343-9-3-9m0 18c-1.657 0-3-4.03-3-9s1.343-9 3-9m-9 9a9 9 0 019-9"
          />
        </svg>
        <span className="text-sm font-medium">
          {languageNames[locale as Locale]}
        </span>
        <svg
          className={`w-4 h-4 transition-transform ${isOpen ? "rotate-180" : ""}`}
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M19 9l-7 7-7-7"
          />
        </svg>
      </button>

      {isOpen && (
        <div className="absolute right-0 mt-2 w-48 bg-white rounded-xl shadow-lg border border-gray-200 py-2 z-50 max-h-80 overflow-y-auto">
          {/* Popular Languages */}
          <div className="px-3 py-1 text-xs text-muted font-medium">
            {t("popularLanguages")}
          </div>
          {popularLocales.map((l) => (
            <button
              key={l}
              onClick={() => handleLocaleChange(l)}
              className={`w-full text-left px-4 py-2 text-sm hover:bg-gray-100 transition-colors ${
                locale === l ? "bg-hirovo-blue/10 text-hirovo-blue font-medium" : "text-text"
              }`}
            >
              {languageNames[l]}
            </button>
          ))}

          {/* Divider */}
          <div className="my-2 border-t border-gray-200"></div>

          {/* Other Languages */}
          {otherLocales.map((l) => (
            <button
              key={l}
              onClick={() => handleLocaleChange(l)}
              className={`w-full text-left px-4 py-2 text-sm hover:bg-gray-100 transition-colors ${
                locale === l ? "bg-hirovo-blue/10 text-hirovo-blue font-medium" : "text-text"
              }`}
            >
              {languageNames[l]}
            </button>
          ))}
        </div>
      )}
    </div>
  );
}

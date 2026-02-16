"use client";

import { useTranslations } from "next-intl";
import type { WPPage } from "@/lib/api/services/wordpress";
import { sanitizeHtml, decodeHtmlEntities } from "@/lib/api/services/wordpress";

export default function HomeClient({
  wpContent,
}: {
  locale: string;
  wpContent: WPPage | null;
}) {
  const t = useTranslations("home");
  const tc = useTranslations("common");

  // WordPress content available — render CMS content
  if (wpContent) {
    return (
      <main className="flex-1 py-16">
        <div className="max-w-[1120px] mx-auto px-5">
          <h1 className="text-5xl font-bold mb-6 text-center max-sm:text-3xl">
            {decodeHtmlEntities(wpContent.title.rendered)}
          </h1>
          <div
            className="prose prose-lg max-w-none text-white/90 prose-headings:text-white prose-a:text-hirovo-teal"
            dangerouslySetInnerHTML={{ __html: sanitizeHtml(wpContent.content.rendered) }}
          />
        </div>
      </main>
    );
  }

  // Fallback — static content from translations
  return (
    <main className="flex-1 py-16">
      <div className="max-w-[1120px] mx-auto px-5">
        {/* Hero Section */}
        <section className="text-center py-16">
          <h1 className="text-5xl font-bold mb-6 max-sm:text-3xl">
            {t("hero.title")}
          </h1>
          <p className="text-xl text-white/80 mb-10 max-w-2xl mx-auto max-sm:text-lg">
            {t("hero.subtitle")}
          </p>
          <div className="flex gap-4 justify-center flex-wrap">
            <a
              href="https://play.google.com/store/apps/details?id=com.hirovo_mobil_bare"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-3 px-8 py-4 rounded-xl font-semibold text-lg bg-white text-hirovo-blue shadow-lg hover:shadow-xl hover:-translate-y-1 transition-all duration-200"
            >
              <svg
                className="w-6 h-6"
                viewBox="0 0 24 24"
                fill="currentColor"
              >
                <path d="M3,20.5V3.5C3,2.91 3.34,2.39 3.84,2.15L13.69,12L3.84,21.85C3.34,21.6 3,21.09 3,20.5M16.81,15.12L6.05,21.34L14.54,12.85L16.81,15.12M20.16,10.81C20.5,11.08 20.75,11.5 20.75,12C20.75,12.5 20.53,12.9 20.18,13.18L17.89,14.5L15.39,12L17.89,9.5L20.16,10.81M6.05,2.66L16.81,8.88L14.54,11.15L6.05,2.66Z" />
              </svg>
              {tc("googlePlay")}
            </a>
          </div>
        </section>

        {/* Features Section */}
        <section className="py-16">
          <h2 className="text-3xl font-bold text-center mb-12 max-sm:text-2xl">
            {t("features.title")}
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-8 text-center border border-white/20">
              <div className="w-16 h-16 bg-white/20 rounded-full flex items-center justify-center mx-auto mb-6">
                <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                </svg>
              </div>
              <h3 className="text-xl font-semibold mb-3">{t("features.easySearch.title")}</h3>
              <p className="text-white/70">{t("features.easySearch.description")}</p>
            </div>
            <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-8 text-center border border-white/20">
              <div className="w-16 h-16 bg-white/20 rounded-full flex items-center justify-center mx-auto mb-6">
                <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
              </div>
              <h3 className="text-xl font-semibold mb-3">{t("features.quickApply.title")}</h3>
              <p className="text-white/70">{t("features.quickApply.description")}</p>
            </div>
            <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-8 text-center border border-white/20">
              <div className="w-16 h-16 bg-white/20 rounded-full flex items-center justify-center mx-auto mb-6">
                <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11a6.002 6.002 0 00-4-5.659V5a2 2 0 10-4 0v.341C7.67 6.165 6 8.388 6 11v3.159c0 .538-.214 1.055-.595 1.436L4 17h5m6 0v1a3 3 0 11-6 0v-1m6 0H9" />
                </svg>
              </div>
              <h3 className="text-xl font-semibold mb-3">{t("features.notifications.title")}</h3>
              <p className="text-white/70">{t("features.notifications.description")}</p>
            </div>
          </div>
        </section>

        {/* CTA Section */}
        <section className="py-16 text-center">
          <div className="bg-white/10 backdrop-blur-sm rounded-3xl p-12 border border-white/20 max-sm:p-8">
            <h2 className="text-3xl font-bold mb-4 max-sm:text-2xl">{t("cta.title")}</h2>
            <p className="text-xl text-white/80 mb-8 max-sm:text-lg">{t("cta.subtitle")}</p>
            <a
              href="https://play.google.com/store/apps/details?id=com.hirovo_mobil_bare"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 px-8 py-4 rounded-xl font-semibold text-lg btn-gradient text-white shadow-btn hover:shadow-btn-hover hover:-translate-y-1 transition-all duration-200"
            >
              {tc("downloadApp")}
            </a>
          </div>
        </section>
      </div>
    </main>
  );
}

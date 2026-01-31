"use client";

import { useTranslations } from "next-intl";
import { Link } from "@/i18n/routing";
import ContentCard from "../../components/ContentCard";

const guideKeys = [
  "cv-yazma", "mulakat-hazirligi", "maas-muzakeresi", "kariyer-degisikligi",
  "uzaktan-calisma", "linkedin-optimizasyonu", "freelance-baslangic", "staj-basvurusu"
];

const guideIcons: Record<string, string> = {
  "cv-yazma": "M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z",
  "mulakat-hazirligi": "M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z",
  "maas-muzakeresi": "M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z",
  "kariyer-degisikligi": "M8 7h12m0 0l-4-4m4 4l-4 4m0 6H4m0 0l4 4m-4-4l4-4",
  "uzaktan-calisma": "M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6",
  "linkedin-optimizasyonu": "M21 13.255A23.931 23.931 0 0112 15c-3.183 0-6.22-.62-9-1.745M16 6V4a2 2 0 00-2-2h-4a2 2 0 00-2 2v2m4 6h.01M5 20h14a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z",
  "freelance-baslangic": "M21 13.255A23.931 23.931 0 0112 15c-3.183 0-6.22-.62-9-1.745M16 6V4a2 2 0 00-2-2h-4a2 2 0 00-2 2v2m4 6h.01M5 20h14a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z",
  "staj-basvurusu": "M12 14l9-5-9-5-9 5 9 5z M12 14l6.16-3.422a12.083 12.083 0 01.665 6.479A11.952 11.952 0 0012 20.055a11.952 11.952 0 00-6.824-2.998 12.078 12.078 0 01.665-6.479L12 14z",
};

export default function GuidesPageClient() {
  const t = useTranslations("guides");
  const tc = useTranslations("common");

  return (
    <main className="flex-1 py-16">
      <div className="max-w-[1120px] mx-auto px-5">
        {/* Hero */}
        <section className="text-center mb-16">
          <h1 className="text-5xl font-bold mb-4 max-sm:text-3xl">{t("hero.title")}</h1>
          <p className="text-xl text-white/80 max-sm:text-lg">{t("hero.subtitle")}</p>
        </section>

        {/* Guides Grid */}
        <div className="grid md:grid-cols-2 gap-6">
          {guideKeys.map((guide) => (
            <ContentCard key={guide}>
              <Link href={`/rehberler/${guide}`} className="block p-4 group">
                <div className="flex items-start gap-4">
                  <div className="w-12 h-12 bg-hirovo-teal/20 rounded-xl flex items-center justify-center flex-shrink-0 group-hover:bg-hirovo-teal/30 transition-colors">
                    <svg className="w-6 h-6 text-hirovo-teal" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d={guideIcons[guide]} />
                    </svg>
                  </div>
                  <div>
                    <h2 className="text-xl font-bold text-text mb-2 group-hover:text-hirovo-teal transition-colors">{t(`${guide}.title`)}</h2>
                    <p className="text-muted text-sm line-clamp-2">{t(`${guide}.metaDescription`)}</p>
                    <span className="inline-block mt-3 text-hirovo-teal text-sm font-medium">
                      {tc("readMore")} →
                    </span>
                  </div>
                </div>
              </Link>
            </ContentCard>
          ))}
        </div>

        {/* CTA */}
        <section className="mt-16 text-center">
          <div className="bg-white/10 backdrop-blur-sm rounded-3xl p-12 border border-white/20">
            <h2 className="text-3xl font-bold mb-4">Kariyerinizi Gelistirin</h2>
            <p className="text-xl text-white/80 mb-8">Hirovo uygulamasini indirerek binlerce is firsatina ulasin</p>
            <a
              href="https://play.google.com/store/apps/details?id=com.hirovo_mobil_bare"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 px-8 py-4 rounded-xl font-semibold text-lg btn-gradient text-white shadow-btn hover:shadow-btn-hover transition-all"
            >
              {tc("downloadApp")}
            </a>
          </div>
        </section>
      </div>
    </main>
  );
}

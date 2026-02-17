"use client";

import { useTranslations } from "next-intl";
import { useParams } from "next/navigation";
import { Link } from "@/i18n/routing";
import ContentCard from "../../../components/ContentCard";

export default function GuidePageClient() {
  const params = useParams();
  const guide = params.guide as string;
  const t = useTranslations("guides");
  const tc = useTranslations("common");
  const tf = useTranslations("footer");

  const guideData = {
    title: t(`${guide}.title`),
    content: t(`${guide}.content`),
    tips: t.raw(`${guide}.tips`) as string[],
  };

  return (
    <main className="flex-1 py-16">
      <div className="max-w-[900px] mx-auto px-5">
        {/* Breadcrumb */}
        <nav className="mb-8 text-sm" aria-label="Breadcrumb">
          <Link href="/" className="text-white/60 hover:text-white">{tc("home")}</Link>
          <span className="mx-2 text-white/40">/</span>
          <Link href="/rehberler" className="text-white/60 hover:text-white">{tf("guides")}</Link>
          <span className="mx-2 text-white/40">/</span>
          <span className="text-white">{guideData.title}</span>
        </nav>

        {/* Hero */}
        <section className="text-center mb-12">
          <h1 className="text-4xl font-bold mb-4 max-sm:text-2xl">{guideData.title}</h1>
        </section>

        {/* Content */}
        <section className="mb-12">
          <ContentCard>
            <div className="p-6">
              <div className="prose prose-lg max-w-none">
                <p className="text-muted leading-relaxed whitespace-pre-line">{guideData.content}</p>
              </div>
            </div>
          </ContentCard>
        </section>

        {/* Tips */}
        <section className="mb-12">
          <h2 className="text-2xl font-bold mb-6">{tc("importantTips")}</h2>
          <div className="space-y-4">
            {guideData.tips.map((tip, index) => (
              <div key={index} className="bg-white/10 backdrop-blur-sm rounded-xl p-4 border border-white/20 flex items-start gap-4">
                <div className="w-8 h-8 bg-hirovo-teal/20 rounded-full flex items-center justify-center flex-shrink-0 text-hirovo-teal font-bold">
                  {index + 1}
                </div>
                <p className="text-white/90">{tip}</p>
              </div>
            ))}
          </div>
        </section>

        {/* Other Guides */}
        <section className="mb-12">
          <h2 className="text-2xl font-bold mb-6">{tc("otherGuides")}</h2>
          <div className="grid grid-cols-2 gap-4">
            <Link href="/rehberler/cv-yazma" className="bg-white/10 backdrop-blur-sm rounded-xl p-4 border border-white/20 hover:bg-white/20 transition-colors">
              {t("cv-yazma.title")}
            </Link>
            <Link href="/rehberler/mulakat-hazirligi" className="bg-white/10 backdrop-blur-sm rounded-xl p-4 border border-white/20 hover:bg-white/20 transition-colors">
              {t("mulakat-hazirligi.title")}
            </Link>
            <Link href="/rehberler/maas-muzakeresi" className="bg-white/10 backdrop-blur-sm rounded-xl p-4 border border-white/20 hover:bg-white/20 transition-colors">
              {t("maas-muzakeresi.title")}
            </Link>
            <Link href="/rehberler/linkedin-optimizasyonu" className="bg-white/10 backdrop-blur-sm rounded-xl p-4 border border-white/20 hover:bg-white/20 transition-colors">
              {t("linkedin-optimizasyonu.title")}
            </Link>
          </div>
        </section>

        {/* CTA */}
        <section className="text-center">
          <div className="bg-white/10 backdrop-blur-sm rounded-3xl p-12 border border-white/20">
            <h2 className="text-3xl font-bold mb-4">{tc("startJobSearch")}</h2>
            <p className="text-xl text-white/80 mb-8">{tc("applyLearnings")}</p>
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

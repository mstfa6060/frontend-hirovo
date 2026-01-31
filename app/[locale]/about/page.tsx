"use client";

import { useTranslations } from "next-intl";
import ContentCard from "../../components/ContentCard";

export default function AboutPage() {
  const t = useTranslations("about");

  return (
    <main className="flex-1 py-16">
      <div className="max-w-[1120px] mx-auto px-5">
        {/* Hero */}
        <section className="text-center mb-16">
          <h1 className="text-5xl font-bold mb-4 max-sm:text-3xl">{t("hero.title")}</h1>
          <p className="text-xl text-white/80 max-sm:text-lg">{t("hero.subtitle")}</p>
        </section>

        {/* Mission & Vision */}
        <div className="grid md:grid-cols-2 gap-8 mb-16">
          <ContentCard>
            <div className="text-center p-4">
              <div className="w-16 h-16 bg-hirovo-blue/20 rounded-full flex items-center justify-center mx-auto mb-4">
                <svg className="w-8 h-8 text-hirovo-blue" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
                </svg>
              </div>
              <h2 className="text-2xl font-bold mb-4 text-text">{t("mission.title")}</h2>
              <p className="text-muted">{t("mission.description")}</p>
            </div>
          </ContentCard>
          <ContentCard>
            <div className="text-center p-4">
              <div className="w-16 h-16 bg-hirovo-teal/20 rounded-full flex items-center justify-center mx-auto mb-4">
                <svg className="w-8 h-8 text-hirovo-teal" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
                </svg>
              </div>
              <h2 className="text-2xl font-bold mb-4 text-text">{t("vision.title")}</h2>
              <p className="text-muted">{t("vision.description")}</p>
            </div>
          </ContentCard>
        </div>

        {/* Story */}
        <ContentCard>
          <div className="max-w-3xl mx-auto">
            <h2 className="text-3xl font-bold mb-6 text-text text-center">{t("story.title")}</h2>
            <p className="text-muted mb-4">{t("story.content1")}</p>
            <p className="text-muted">{t("story.content2")}</p>
          </div>
        </ContentCard>

        {/* Values */}
        <section className="mt-16">
          <h2 className="text-3xl font-bold text-center mb-12">{t("values.title")}</h2>
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {["transparency", "equality", "innovation", "userFirst"].map((value) => (
              <div key={value} className="bg-white/10 backdrop-blur-sm rounded-2xl p-6 text-center border border-white/20">
                <h3 className="text-xl font-semibold mb-3">{t(`values.${value}.title`)}</h3>
                <p className="text-white/70 text-sm">{t(`values.${value}.description`)}</p>
              </div>
            ))}
          </div>
        </section>

        {/* Stats */}
        <section className="mt-16">
          <h2 className="text-3xl font-bold text-center mb-12">{t("stats.title")}</h2>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
            <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-6 text-center border border-white/20">
              <div className="text-4xl font-bold text-hirovo-teal mb-2">10K+</div>
              <div className="text-white/70">{t("stats.downloads")}</div>
            </div>
            <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-6 text-center border border-white/20">
              <div className="text-4xl font-bold text-hirovo-teal mb-2">5K+</div>
              <div className="text-white/70">{t("stats.activeUsers")}</div>
            </div>
            <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-6 text-center border border-white/20">
              <div className="text-4xl font-bold text-hirovo-teal mb-2">500+</div>
              <div className="text-white/70">{t("stats.partnerCompanies")}</div>
            </div>
            <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-6 text-center border border-white/20">
              <div className="text-4xl font-bold text-hirovo-teal mb-2">2K+</div>
              <div className="text-white/70">{t("stats.successfulMatches")}</div>
            </div>
          </div>
        </section>
      </div>
    </main>
  );
}

"use client";

import { useTranslations } from "next-intl";
import ContentCard from "../../components/ContentCard";

export default function JobSeekersPage() {
  const t = useTranslations("jobSeekers");
  const tc = useTranslations("common");
  const th = useTranslations("home");

  const benefits = ["free", "thousands", "easy", "track", "notifications", "privacy"];
  const tips = ["tip1", "tip2", "tip3", "tip4"];
  const categories = ["technology", "healthcare", "finance", "education", "retail", "manufacturing", "hospitality", "construction"];

  return (
    <main className="flex-1 py-16">
      <div className="max-w-[1120px] mx-auto px-5">
        {/* Hero */}
        <section className="text-center mb-16">
          <h1 className="text-5xl font-bold mb-4 max-sm:text-3xl">{t("hero.title")}</h1>
          <p className="text-xl text-white/80 max-sm:text-lg">{t("hero.subtitle")}</p>
          <div className="mt-8">
            <a
              href="https://play.google.com/store/apps/details?id=com.hirovo_mobil_bare"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-3 px-8 py-4 rounded-xl font-semibold text-lg bg-white text-hirovo-blue shadow-lg hover:shadow-xl hover:-translate-y-1 transition-all"
            >
              <svg className="w-6 h-6" viewBox="0 0 24 24" fill="currentColor">
                <path d="M3,20.5V3.5C3,2.91 3.34,2.39 3.84,2.15L13.69,12L3.84,21.85C3.34,21.6 3,21.09 3,20.5M16.81,15.12L6.05,21.34L14.54,12.85L16.81,15.12M20.16,10.81C20.5,11.08 20.75,11.5 20.75,12C20.75,12.5 20.53,12.9 20.18,13.18L17.89,14.5L15.39,12L17.89,9.5L20.16,10.81M6.05,2.66L16.81,8.88L14.54,11.15L6.05,2.66Z" />
              </svg>
              {tc("free")} - {tc("downloadApp")}
            </a>
          </div>
        </section>

        {/* Benefits */}
        <section className="mb-20">
          <h2 className="text-3xl font-bold text-center mb-12">{t("benefits.title")}</h2>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {benefits.map((benefit) => (
              <div key={benefit} className="bg-white/10 backdrop-blur-sm rounded-2xl p-6 border border-white/20">
                <h3 className="text-xl font-semibold mb-3">{t(`benefits.${benefit}.title`)}</h3>
                <p className="text-white/70">{t(`benefits.${benefit}.description`)}</p>
              </div>
            ))}
          </div>
        </section>

        {/* Tips */}
        <section className="mb-20">
          <ContentCard>
            <h2 className="text-2xl font-bold text-text mb-8 text-center">{t("tips.title")}</h2>
            <div className="grid md:grid-cols-2 gap-6">
              {tips.map((tip, index) => (
                <div key={tip} className="flex gap-4">
                  <div className="w-10 h-10 bg-hirovo-teal/20 rounded-full flex items-center justify-center flex-shrink-0 text-hirovo-teal font-bold">
                    {index + 1}
                  </div>
                  <div>
                    <h4 className="font-semibold text-text mb-1">{t(`tips.${tip}.title`)}</h4>
                    <p className="text-muted text-sm">{t(`tips.${tip}.description`)}</p>
                  </div>
                </div>
              ))}
            </div>
          </ContentCard>
        </section>

        {/* Popular Categories */}
        <section className="mb-20">
          <h2 className="text-3xl font-bold text-center mb-4">{t("categories.title")}</h2>
          <p className="text-white/70 text-center mb-12">{t("categories.subtitle")}</p>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {categories.map((category) => (
              <div key={category} className="bg-white/10 backdrop-blur-sm rounded-xl p-4 text-center border border-white/20 hover:bg-white/20 transition-colors cursor-pointer">
                {th(`categories.${category}`)}
              </div>
            ))}
          </div>
        </section>

        {/* CTA */}
        <section className="text-center">
          <div className="bg-white/10 backdrop-blur-sm rounded-3xl p-12 border border-white/20">
            <h2 className="text-3xl font-bold mb-4">{t("cta.title")}</h2>
            <p className="text-xl text-white/80 mb-8">{t("cta.subtitle")}</p>
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

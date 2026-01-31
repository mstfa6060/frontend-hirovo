"use client";

import { useTranslations } from "next-intl";
import ContentCard from "../../components/ContentCard";

export default function CareerTipsPage() {
  const t = useTranslations("careerTips");

  const articles = [
    { key: "resume1", category: "resume" },
    { key: "resume2", category: "resume" },
    { key: "interview1", category: "interview" },
    { key: "interview2", category: "interview" },
    { key: "career1", category: "career" },
    { key: "career2", category: "career" },
    { key: "workplace1", category: "workplace" },
    { key: "workplace2", category: "workplace" },
  ];

  const categoryColors: Record<string, string> = {
    resume: "bg-blue-100 text-blue-700",
    interview: "bg-green-100 text-green-700",
    career: "bg-purple-100 text-purple-700",
    workplace: "bg-orange-100 text-orange-700",
  };

  return (
    <main className="flex-1 py-16">
      <div className="max-w-[1120px] mx-auto px-5">
        {/* Hero */}
        <section className="text-center mb-16">
          <h1 className="text-5xl font-bold mb-4 max-sm:text-3xl">{t("hero.title")}</h1>
          <p className="text-xl text-white/80 max-sm:text-lg">{t("hero.subtitle")}</p>
        </section>

        {/* Categories */}
        <div className="flex flex-wrap justify-center gap-3 mb-12">
          {["resume", "interview", "career", "workplace"].map((category) => (
            <span
              key={category}
              className={`px-4 py-2 rounded-full text-sm font-medium ${categoryColors[category]}`}
            >
              {t(`categories.${category}`)}
            </span>
          ))}
        </div>

        {/* Articles Grid */}
        <div className="grid md:grid-cols-2 gap-6 mb-16">
          {articles.map((article) => (
            <ContentCard key={article.key}>
              <div className="p-2">
                <span className={`inline-block px-3 py-1 rounded-full text-xs font-medium mb-4 ${categoryColors[article.category]}`}>
                  {t(`categories.${article.category}`)}
                </span>
                <h3 className="text-xl font-bold text-text mb-3">
                  {t(`articles.${article.key}.title`)}
                </h3>
                <p className="text-muted mb-4">
                  {t(`articles.${article.key}.summary`)}
                </p>
                <details className="group">
                  <summary className="text-hirovo-teal font-medium cursor-pointer hover:underline list-none flex items-center gap-2">
                    <span>Devamini Oku</span>
                    <svg className="w-4 h-4 transition-transform group-open:rotate-180" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                    </svg>
                  </summary>
                  <p className="mt-4 text-muted text-sm border-t border-gray-100 pt-4 whitespace-pre-line">
                    {t(`articles.${article.key}.content`)}
                  </p>
                </details>
              </div>
            </ContentCard>
          ))}
        </div>

        {/* Newsletter */}
        <section>
          <div className="bg-white/10 backdrop-blur-sm rounded-3xl p-12 border border-white/20 text-center">
            <h2 className="text-3xl font-bold mb-4">{t("newsletter.title")}</h2>
            <p className="text-white/80 mb-8 max-w-xl mx-auto">{t("newsletter.subtitle")}</p>
            <form className="flex flex-col sm:flex-row gap-4 max-w-md mx-auto">
              <input
                type="email"
                placeholder={t("newsletter.placeholder")}
                className="flex-1 px-4 py-3 rounded-xl border-0 outline-none focus:ring-2 focus:ring-hirovo-teal"
              />
              <button
                type="submit"
                className="px-8 py-3 rounded-xl font-semibold btn-gradient text-white shadow-btn hover:shadow-btn-hover transition-all"
              >
                {t("newsletter.button")}
              </button>
            </form>
          </div>
        </section>
      </div>
    </main>
  );
}

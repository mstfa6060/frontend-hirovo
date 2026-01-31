"use client";

import { useState } from "react";
import { useTranslations } from "next-intl";
import ContentCard from "../../components/ContentCard";

type Category = "general" | "account" | "application" | "employers" | "technical";

export default function FAQPage() {
  const t = useTranslations("faq");
  const [activeCategory, setActiveCategory] = useState<Category>("general");
  const [openQuestion, setOpenQuestion] = useState<string | null>(null);

  const categories: Category[] = ["general", "account", "application", "employers", "technical"];

  const questions: Record<Category, string[]> = {
    general: ["q1", "q2", "q3"],
    account: ["q1", "q2", "q3"],
    application: ["q1", "q2", "q3"],
    employers: ["q1", "q2"],
    technical: ["q1", "q2"],
  };

  return (
    <main className="flex-1 py-16">
      <div className="max-w-[1120px] mx-auto px-5">
        {/* Hero */}
        <section className="text-center mb-16">
          <h1 className="text-5xl font-bold mb-4 max-sm:text-3xl">{t("hero.title")}</h1>
          <p className="text-xl text-white/80 max-sm:text-lg">{t("hero.subtitle")}</p>
        </section>

        {/* Category Tabs */}
        <div className="flex flex-wrap justify-center gap-3 mb-12">
          {categories.map((category) => (
            <button
              key={category}
              onClick={() => setActiveCategory(category)}
              className={`px-6 py-3 rounded-xl font-medium transition-all ${
                activeCategory === category
                  ? "bg-white text-hirovo-blue"
                  : "bg-white/10 text-white hover:bg-white/20"
              }`}
            >
              {t(`categories.${category}`)}
            </button>
          ))}
        </div>

        {/* Questions */}
        <div className="space-y-4">
          {questions[activeCategory].map((q) => {
            const questionKey = `${activeCategory}.${q}`;
            const isOpen = openQuestion === questionKey;

            return (
              <ContentCard key={questionKey}>
                <button
                  onClick={() => setOpenQuestion(isOpen ? null : questionKey)}
                  className="w-full text-left flex justify-between items-center gap-4"
                >
                  <h3 className="text-lg font-semibold text-text">
                    {t(`${activeCategory}.${q}.question`)}
                  </h3>
                  <svg
                    className={`w-6 h-6 text-muted transition-transform flex-shrink-0 ${isOpen ? "rotate-180" : ""}`}
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                  </svg>
                </button>
                {isOpen && (
                  <p className="mt-4 text-muted border-t border-gray-100 pt-4">
                    {t(`${activeCategory}.${q}.answer`)}
                  </p>
                )}
              </ContentCard>
            );
          })}
        </div>

        {/* Contact CTA */}
        <section className="mt-16 text-center">
          <ContentCard>
            <h2 className="text-2xl font-bold text-text mb-4">{t("contact.title")}</h2>
            <p className="text-muted mb-6">{t("contact.subtitle")}</p>
            <a
              href="mailto:hello@hirovo.com"
              className="inline-flex items-center gap-2 px-8 py-4 rounded-xl font-semibold text-lg btn-gradient text-white shadow-btn hover:shadow-btn-hover transition-all"
            >
              hello@hirovo.com
            </a>
          </ContentCard>
        </section>
      </div>
    </main>
  );
}

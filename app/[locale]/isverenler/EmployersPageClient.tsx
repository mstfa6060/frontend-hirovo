"use client";

import { useTranslations } from "next-intl";
import ContentCard from "../../components/ContentCard";

export default function EmployersPageClient() {
  const t = useTranslations("employers");
  const tc = useTranslations("common");

  const benefits = ["reach", "quality", "fast", "affordable", "easy", "support"];
  const steps = ["step1", "step2", "step3", "step4", "step5"];

  return (
    <main className="flex-1 py-16">
      <div className="max-w-[1120px] mx-auto px-5">
        {/* Hero */}
        <section className="text-center mb-16">
          <h1 className="text-5xl font-bold mb-4 max-sm:text-3xl">{t("hero.title")}</h1>
          <p className="text-xl text-white/80 max-sm:text-lg">{t("hero.subtitle")}</p>
          <div className="mt-8">
            <a
              href="mailto:hello@hirovo.com"
              className="inline-flex items-center gap-2 px-8 py-4 rounded-xl font-semibold text-lg bg-white text-hirovo-blue shadow-lg hover:shadow-xl hover:-translate-y-1 transition-all"
            >
              {tc("contact")}
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

        {/* Process */}
        <section className="mb-20">
          <h2 className="text-3xl font-bold text-center mb-12">{t("process.title")}</h2>
          <div className="flex flex-wrap justify-center items-center gap-4">
            {steps.map((step, index) => (
              <div key={step} className="flex items-center gap-4">
                <div className="flex items-center gap-3">
                  <div className="w-12 h-12 bg-hirovo-blue rounded-full flex items-center justify-center font-bold text-lg">
                    {index + 1}
                  </div>
                  <span className="font-medium">{t(`process.${step}`)}</span>
                </div>
                {index < steps.length - 1 && (
                  <svg className="w-6 h-6 text-white/40 hidden md:block" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                  </svg>
                )}
              </div>
            ))}
          </div>
        </section>

        {/* Pricing */}
        <section className="mb-20">
          <h2 className="text-3xl font-bold text-center mb-4">{t("pricing.title")}</h2>
          <p className="text-white/70 text-center mb-12">{t("pricing.subtitle")}</p>
          <div className="grid md:grid-cols-3 gap-8">
            {/* Basic */}
            <ContentCard>
              <div className="text-center p-4">
                <h3 className="text-2xl font-bold text-text mb-2">{t("pricing.basic.title")}</h3>
                <div className="text-3xl font-bold text-hirovo-teal mb-6">{t("pricing.basic.price")}</div>
                <ul className="space-y-3 text-left mb-8">
                  {(t.raw("pricing.basic.features") as string[]).map((feature, i) => (
                    <li key={i} className="flex items-center gap-2 text-muted">
                      <svg className="w-5 h-5 text-green-500 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                      </svg>
                      {feature}
                    </li>
                  ))}
                </ul>
                <a href="mailto:hello@hirovo.com" className="block w-full py-3 rounded-xl border-2 border-hirovo-teal text-hirovo-teal font-semibold hover:bg-hirovo-teal hover:text-white transition-colors">
                  {tc("getStarted")}
                </a>
              </div>
            </ContentCard>

            {/* Pro */}
            <ContentCard>
              <div className="text-center p-4 relative">
                <div className="absolute -top-3 left-1/2 -translate-x-1/2 bg-hirovo-teal text-white text-sm font-semibold px-4 py-1 rounded-full">
                  {tc("new")}
                </div>
                <h3 className="text-2xl font-bold text-text mb-2">{t("pricing.pro.title")}</h3>
                <div className="text-3xl font-bold text-hirovo-blue mb-6">{t("pricing.pro.price")}</div>
                <ul className="space-y-3 text-left mb-8">
                  {(t.raw("pricing.pro.features") as string[]).map((feature, i) => (
                    <li key={i} className="flex items-center gap-2 text-muted">
                      <svg className="w-5 h-5 text-green-500 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                      </svg>
                      {feature}
                    </li>
                  ))}
                </ul>
                <a href="mailto:hello@hirovo.com" className="block w-full py-3 rounded-xl btn-gradient text-white font-semibold shadow-btn hover:shadow-btn-hover transition-all">
                  {tc("contact")}
                </a>
              </div>
            </ContentCard>

            {/* Enterprise */}
            <ContentCard>
              <div className="text-center p-4">
                <h3 className="text-2xl font-bold text-text mb-2">{t("pricing.enterprise.title")}</h3>
                <div className="text-3xl font-bold text-muted mb-6">{t("pricing.enterprise.price")}</div>
                <ul className="space-y-3 text-left mb-8">
                  {(t.raw("pricing.enterprise.features") as string[]).map((feature, i) => (
                    <li key={i} className="flex items-center gap-2 text-muted">
                      <svg className="w-5 h-5 text-green-500 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                      </svg>
                      {feature}
                    </li>
                  ))}
                </ul>
                <a href="mailto:hello@hirovo.com" className="block w-full py-3 rounded-xl border-2 border-gray-300 text-muted font-semibold hover:bg-gray-100 transition-colors">
                  {tc("contact")}
                </a>
              </div>
            </ContentCard>
          </div>
        </section>

        {/* CTA */}
        <section className="text-center">
          <div className="bg-white/10 backdrop-blur-sm rounded-3xl p-12 border border-white/20">
            <h2 className="text-3xl font-bold mb-4">{t("cta.title")}</h2>
            <p className="text-xl text-white/80 mb-8">{t("cta.subtitle")}</p>
            <a
              href="mailto:hello@hirovo.com"
              className="inline-flex items-center gap-2 px-8 py-4 rounded-xl font-semibold text-lg btn-gradient text-white shadow-btn hover:shadow-btn-hover transition-all"
            >
              {tc("contact")}
            </a>
          </div>
        </section>
      </div>
    </main>
  );
}

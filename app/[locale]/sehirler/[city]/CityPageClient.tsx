"use client";

import { useTranslations } from "next-intl";
import { useParams } from "next/navigation";
import { Link } from "@/i18n/routing";
import ContentCard from "../../../components/ContentCard";

export default function CityPageClient() {
  const params = useParams();
  const city = params.city as string;
  const t = useTranslations("cities");
  const tc = useTranslations("common");
  const tf = useTranslations("footer");

  const cityData = {
    name: t(`${city}.name`),
    heroTitle: t(`${city}.heroTitle`),
    heroSubtitle: t(`${city}.heroSubtitle`),
    description: t(`${city}.description`),
    highlights: t.raw(`${city}.highlights`) as string[],
    sectors: t.raw(`${city}.sectors`) as string[],
  };

  return (
    <main className="flex-1 py-16">
      <div className="max-w-[1120px] mx-auto px-5">
        {/* Breadcrumb */}
        <nav className="mb-8 text-sm" aria-label="Breadcrumb">
          <Link href="/" className="text-white/60 hover:text-white">{tc("home")}</Link>
          <span className="mx-2 text-white/40">/</span>
          <Link href="/sehirler" className="text-white/60 hover:text-white">{tf("cities")}</Link>
          <span className="mx-2 text-white/40">/</span>
          <span className="text-white">{cityData.name}</span>
        </nav>

        {/* Hero */}
        <section className="text-center mb-16">
          <h1 className="text-5xl font-bold mb-4 max-sm:text-3xl">{cityData.heroTitle}</h1>
          <p className="text-xl text-white/80 max-sm:text-lg">{cityData.heroSubtitle}</p>
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
              {cityData.name} {tc("viewJobs")}
            </a>
          </div>
        </section>

        {/* Description */}
        <section className="mb-16">
          <ContentCard>
            <div className="p-4">
              <h2 className="text-2xl font-bold text-text mb-4">{t("common.whyWorkHere")}</h2>
              <p className="text-muted leading-relaxed">{cityData.description}</p>
            </div>
          </ContentCard>
        </section>

        {/* Highlights */}
        <section className="mb-16">
          <h2 className="text-3xl font-bold text-center mb-8">{cityData.name} {tc("jobMarketFeatures")}</h2>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
            {cityData.highlights.map((highlight, index) => (
              <div key={index} className="bg-white/10 backdrop-blur-sm rounded-xl p-4 border border-white/20 flex items-center gap-3">
                <svg className="w-6 h-6 text-hirovo-teal flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                </svg>
                <span>{highlight}</span>
              </div>
            ))}
          </div>
        </section>

        {/* Sectors */}
        <section className="mb-16">
          <h2 className="text-3xl font-bold text-center mb-8">{t("common.popularSectors")}</h2>
          <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
            {cityData.sectors.map((sector, index) => (
              <div key={index} className="bg-white/10 backdrop-blur-sm rounded-xl p-4 text-center border border-white/20">
                {sector}
              </div>
            ))}
          </div>
        </section>

        {/* CTA */}
        <section className="text-center">
          <div className="bg-white/10 backdrop-blur-sm rounded-3xl p-12 border border-white/20">
            <h2 className="text-3xl font-bold mb-4">{cityData.name} {tc("discoverJobs")}</h2>
            <p className="text-xl text-white/80 mb-8">{tc("discoverWithHirovo")}</p>
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

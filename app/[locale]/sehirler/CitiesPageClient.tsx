"use client";

import { useTranslations } from "next-intl";
import { Link } from "@/i18n/routing";

const cityKeys = [
  "istanbul", "ankara", "izmir", "bursa", "antalya", "adana", "konya",
  "gaziantep", "kocaeli", "mersin", "diyarbakir", "kayseri", "eskisehir", "samsun", "denizli"
];

export default function CitiesPageClient() {
  const t = useTranslations("cities");
  const tc = useTranslations("common");

  return (
    <main className="flex-1 py-16">
      <div className="max-w-[1120px] mx-auto px-5">
        {/* Hero */}
        <section className="text-center mb-16">
          <h1 className="text-5xl font-bold mb-4 max-sm:text-3xl">Sehirlere Gore Is Ilanlari</h1>
          <p className="text-xl text-white/80 max-sm:text-lg">Turkiye genelinde sehir bazinda is firsatlarini kesfedin</p>
        </section>

        {/* Cities Grid */}
        <div className="grid md:grid-cols-3 lg:grid-cols-4 gap-6">
          {cityKeys.map((city) => (
            <Link
              key={city}
              href={`/sehirler/${city}`}
              className="bg-white/10 backdrop-blur-sm rounded-2xl p-6 border border-white/20 hover:bg-white/20 transition-all hover:-translate-y-1"
            >
              <h2 className="text-xl font-bold mb-2">{t(`${city}.name`)}</h2>
              <p className="text-white/60 text-sm line-clamp-2">{t(`${city}.heroSubtitle`)}</p>
              <span className="inline-block mt-4 text-hirovo-teal text-sm font-medium">
                {tc("viewAll")} →
              </span>
            </Link>
          ))}
        </div>

        {/* CTA */}
        <section className="mt-16 text-center">
          <div className="bg-white/10 backdrop-blur-sm rounded-3xl p-12 border border-white/20">
            <h2 className="text-3xl font-bold mb-4">Tum Turkiye&apos;de Is Ara</h2>
            <p className="text-xl text-white/80 mb-8">Hirovo uygulamasini indirerek tum sehirlerdeki binlerce ilana ulas</p>
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

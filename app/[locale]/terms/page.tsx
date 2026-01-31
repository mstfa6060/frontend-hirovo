"use client";

import { useTranslations } from "next-intl";
import ContentCard from "../../components/ContentCard";

export default function TermsPage() {
  const t = useTranslations("terms");

  return (
    <main className="flex-1 py-16">
      <div className="max-w-[1120px] mx-auto px-5">
        <ContentCard>
          <h1 className="text-3xl font-bold mb-2 text-text max-sm:text-2xl">
            {t("title")}
          </h1>
          <p className="text-muted text-sm mb-8">{t("lastUpdate")}</p>

          <p className="text-muted mb-4">{t("intro")}</p>

          <h2 className="text-xl font-bold mt-8 mb-3 text-text">
            {t("section1.title")}
          </h2>
          <p className="text-muted mb-4">{t("section1.intro")}</p>
          <ul className="text-muted list-disc pl-6 mb-4 space-y-2">
            <li>{t("section1.items.view")}</li>
            <li>{t("section1.items.profile")}</li>
            <li>{t("section1.items.offers")}</li>
            <li>{t("section1.items.track")}</li>
          </ul>

          <h2 className="text-xl font-bold mt-8 mb-3 text-text">
            {t("section2.title")}
          </h2>
          <p className="text-muted mb-4">{t("section2.intro")}</p>
          <ul className="text-muted list-disc pl-6 mb-4 space-y-2">
            <li>{t("section2.items.accurate")}</li>
            <li>{t("section2.items.responsible")}</li>
            <li>{t("section2.items.activity")}</li>
            <li>{t("section2.items.notify")}</li>
          </ul>

          <h2 className="text-xl font-bold mt-8 mb-3 text-text">
            {t("section3.title")}
          </h2>
          <p className="text-muted mb-4">{t("section3.intro")}</p>
          <ul className="text-muted list-disc pl-6 mb-4 space-y-2">
            <li>{t("section3.items.legal")}</li>
            <li>{t("section3.items.honest")}</li>
            <li>{t("section3.items.respect")}</li>
            <li>{t("section3.items.noSpam")}</li>
            <li>{t("section3.items.security")}</li>
            <li>{t("section3.items.identity")}</li>
          </ul>

          <h2 className="text-xl font-bold mt-8 mb-3 text-text">
            {t("section4.title")}
          </h2>
          <p className="text-muted mb-4">{t("section4.intro")}</p>
          <ul className="text-muted list-disc pl-6 mb-4 space-y-2">
            <li>{t("section4.items.fake")}</li>
            <li>{t("section4.items.harass")}</li>
            <li>{t("section4.items.illegal")}</li>
            <li>{t("section4.items.damage")}</li>
            <li>{t("section4.items.bots")}</li>
            <li>{t("section4.items.ip")}</li>
          </ul>

          <h2 className="text-xl font-bold mt-8 mb-3 text-text">
            {t("section5.title")}
          </h2>
          <p className="text-muted mb-4">{t("section5.intro")}</p>
          <ul className="text-muted list-disc pl-6 mb-4 space-y-2">
            <li>{t("section5.items.ownership")}</li>
            <li>{t("section5.items.userContent")}</li>
            <li>{t("section5.items.license")}</li>
            <li>{t("section5.items.thirdParty")}</li>
          </ul>

          <h2 className="text-xl font-bold mt-8 mb-3 text-text">
            {t("section6.title")}
          </h2>
          <p className="text-muted mb-4">{t("section6.intro")}</p>
          <ul className="text-muted list-disc pl-6 mb-4 space-y-2">
            <li>{t("section6.items.accuracy")}</li>
            <li>{t("section6.items.relationship")}</li>
            <li>{t("section6.items.disputes")}</li>
            <li>{t("section6.items.uptime")}</li>
            <li>{t("section6.items.damages")}</li>
          </ul>

          <h2 className="text-xl font-bold mt-8 mb-3 text-text">
            {t("section7.title")}
          </h2>
          <p className="text-muted mb-4">{t("section7.intro")}</p>
          <ul className="text-muted list-disc pl-6 mb-4 space-y-2">
            <li>{t("section7.items.violation")}</li>
            <li>{t("section7.items.illegal")}</li>
            <li>{t("section7.items.harm")}</li>
            <li>{t("section7.items.false")}</li>
          </ul>

          <h2 className="text-xl font-bold mt-8 mb-3 text-text">
            {t("section8.title")}
          </h2>
          <p className="text-muted mb-4">{t("section8.content")}</p>

          <h2 className="text-xl font-bold mt-8 mb-3 text-text">
            {t("section9.title")}
          </h2>
          <p className="text-muted mb-4">{t("section9.content")}</p>

          <h2 className="text-xl font-bold mt-8 mb-3 text-text">
            {t("section10.title")}
          </h2>
          <p className="text-muted mb-4">{t("section10.intro")}</p>
          <ul className="text-muted list-disc pl-6 mb-4">
            <li>
              E-posta:{" "}
              <a
                href="mailto:hello@hirovo.com"
                className="text-hirovo-teal hover:underline"
              >
                hello@hirovo.com
              </a>
            </li>
          </ul>
        </ContentCard>
      </div>
    </main>
  );
}

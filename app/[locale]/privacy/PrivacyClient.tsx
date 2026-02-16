"use client";

import { useTranslations } from "next-intl";
import type { WPPage } from "@/lib/api/services/wordpress";
import { sanitizeHtml, decodeHtmlEntities } from "@/lib/api/services/wordpress";
import ContentCard from "@/app/components/ContentCard";

export default function PrivacyClient({ wpContent }: { wpContent: WPPage | null }) {
  const t = useTranslations("privacy");

  if (wpContent) {
    return (
      <main className="flex-1 py-16">
        <div className="max-w-[1120px] mx-auto px-5">
          <ContentCard>
            <h1 className="text-3xl font-bold mb-6 text-text">{decodeHtmlEntities(wpContent.title.rendered)}</h1>
            <div
              className="prose prose-sm max-w-none text-text"
              dangerouslySetInnerHTML={{ __html: sanitizeHtml(wpContent.content.rendered) }}
            />
          </ContentCard>
        </div>
      </main>
    );
  }

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
            <li>
              <strong>{t("section1.items.account").split(":")[0]}:</strong>
              {t("section1.items.account").split(":")[1]}
            </li>
            <li>
              <strong>{t("section1.items.profile").split(":")[0]}:</strong>
              {t("section1.items.profile").split(":")[1]}
            </li>
            <li>
              <strong>{t("section1.items.location").split(":")[0]}:</strong>
              {t("section1.items.location").split(":")[1]}
            </li>
            <li>
              <strong>{t("section1.items.device").split(":")[0]}:</strong>
              {t("section1.items.device").split(":")[1]}
            </li>
            <li>
              <strong>{t("section1.items.usage").split(":")[0]}:</strong>
              {t("section1.items.usage").split(":")[1]}
            </li>
          </ul>

          <h2 className="text-xl font-bold mt-8 mb-3 text-text">
            {t("section2.title")}
          </h2>
          <p className="text-muted mb-4">{t("section2.intro")}</p>
          <ul className="text-muted list-disc pl-6 mb-4 space-y-2">
            <li>{t("section2.items.account")}</li>
            <li>{t("section2.items.jobs")}</li>
            <li>{t("section2.items.applications")}</li>
            <li>{t("section2.items.improve")}</li>
            <li>{t("section2.items.support")}</li>
            <li>{t("section2.items.legal")}</li>
          </ul>

          <h2 className="text-xl font-bold mt-8 mb-3 text-text">
            {t("section3.title")}
          </h2>
          <p className="text-muted mb-4">{t("section3.intro")}</p>
          <ul className="text-muted list-disc pl-6 mb-4 space-y-2">
            <li>
              <strong>{t("section3.items.employers").split(":")[0]}:</strong>
              {t("section3.items.employers").split(":")[1]}
            </li>
            <li>
              <strong>{t("section3.items.providers").split(":")[0]}:</strong>
              {t("section3.items.providers").split(":")[1]}
            </li>
            <li>
              <strong>{t("section3.items.legal").split(":")[0]}:</strong>
              {t("section3.items.legal").split(":")[1]}
            </li>
          </ul>

          <h2 className="text-xl font-bold mt-8 mb-3 text-text">
            {t("section4.title")}
          </h2>
          <p className="text-muted mb-4">{t("section4.intro")}</p>
          <ul className="text-muted list-disc pl-6 mb-4 space-y-2">
            <li>{t("section4.items.ssl")}</li>
            <li>{t("section4.items.datacenter")}</li>
            <li>{t("section4.items.audits")}</li>
            <li>{t("section4.items.access")}</li>
          </ul>

          <h2 className="text-xl font-bold mt-8 mb-3 text-text">
            {t("section5.title")}
          </h2>
          <p className="text-muted mb-4">{t("section5.intro")}</p>
          <ul className="text-muted list-disc pl-6 mb-4 space-y-2">
            <li>{t("section5.items.know")}</li>
            <li>{t("section5.items.info")}</li>
            <li>{t("section5.items.purpose")}</li>
            <li>{t("section5.items.thirdParty")}</li>
            <li>{t("section5.items.correct")}</li>
            <li>{t("section5.items.delete")}</li>
          </ul>

          <h2 className="text-xl font-bold mt-8 mb-3 text-text">
            {t("section6.title")}
          </h2>
          <p className="text-muted mb-4">{t("section6.content")}</p>

          <h2 className="text-xl font-bold mt-8 mb-3 text-text">
            {t("section7.title")}
          </h2>
          <p className="text-muted mb-4">{t("section7.content")}</p>

          <h2 className="text-xl font-bold mt-8 mb-3 text-text">
            {t("section8.title")}
          </h2>
          <p className="text-muted mb-4">{t("section8.content")}</p>

          <h2 className="text-xl font-bold mt-8 mb-3 text-text">
            {t("section9.title")}
          </h2>
          <p className="text-muted mb-4">{t("section9.intro")}</p>
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

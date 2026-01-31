import GuidePageClient from "./GuidePageClient";

const guideKeys = [
  "cv-yazma", "mulakat-hazirligi", "maas-muzakeresi", "kariyer-degisikligi",
  "uzaktan-calisma", "linkedin-optimizasyonu", "freelance-baslangic", "staj-basvurusu"
];

// Only generate for Turkish until translations are complete (run npm run translate:all to enable all locales)
export function generateStaticParams() {
  return guideKeys.map((guide) => ({
    locale: "tr",
    guide,
  }));
}

export default function GuidePage() {
  return <GuidePageClient />;
}

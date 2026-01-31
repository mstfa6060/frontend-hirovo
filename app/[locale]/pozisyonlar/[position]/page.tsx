import PositionPageClient from "./PositionPageClient";

const positionKeys = [
  "yazilimci", "satis", "muhasebe", "ik", "pazarlama",
  "musteri-hizmetleri", "grafik", "proje-yoneticisi", "veri-analisti", "sofor"
];

// Only generate for Turkish until translations are complete (run npm run translate:all to enable all locales)
export function generateStaticParams() {
  return positionKeys.map((position) => ({
    locale: "tr",
    position,
  }));
}

export default function PositionPage() {
  return <PositionPageClient />;
}

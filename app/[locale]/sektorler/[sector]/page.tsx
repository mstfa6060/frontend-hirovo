import SectorPageClient from "./SectorPageClient";

const sectorKeys = [
  "teknoloji", "saglik", "finans", "egitim", "perakende",
  "uretim", "turizm", "insaat", "lojistik", "medya"
];

// Only generate for Turkish until translations are complete (run npm run translate:all to enable all locales)
export function generateStaticParams() {
  return sectorKeys.map((sector) => ({
    locale: "tr",
    sector,
  }));
}

export default function SectorPage() {
  return <SectorPageClient />;
}

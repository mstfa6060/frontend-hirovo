import CityPageClient from "./CityPageClient";

const cityKeys = [
  "istanbul", "ankara", "izmir", "bursa", "antalya", "adana", "konya",
  "gaziantep", "kocaeli", "mersin", "diyarbakir", "kayseri", "eskisehir", "samsun", "denizli"
];

// Only generate for Turkish until translations are complete (run npm run translate:all to enable all locales)
export function generateStaticParams() {
  return cityKeys.map((city) => ({
    locale: "tr",
    city,
  }));
}

export default function CityPage() {
  return <CityPageClient />;
}

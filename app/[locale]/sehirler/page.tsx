import CitiesPageClient from "./CitiesPageClient";

// Only generate for Turkish until translations are complete
export function generateStaticParams() {
  return [{ locale: "tr" }];
}

export default function CitiesPage() {
  return <CitiesPageClient />;
}

import SectorsPageClient from "./SectorsPageClient";

// Only generate for Turkish until translations are complete
export function generateStaticParams() {
  return [{ locale: "tr" }];
}

export default function SectorsPage() {
  return <SectorsPageClient />;
}

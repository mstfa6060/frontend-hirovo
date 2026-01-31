import GuidesPageClient from "./GuidesPageClient";

// Only generate for Turkish until translations are complete
export function generateStaticParams() {
  return [{ locale: "tr" }];
}

export default function GuidesPage() {
  return <GuidesPageClient />;
}

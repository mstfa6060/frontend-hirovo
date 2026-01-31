import PositionsPageClient from "./PositionsPageClient";

// Only generate for Turkish until translations are complete
export function generateStaticParams() {
  return [{ locale: "tr" }];
}

export default function PositionsPage() {
  return <PositionsPageClient />;
}

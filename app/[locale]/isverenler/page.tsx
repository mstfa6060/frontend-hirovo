import EmployersPageClient from "./EmployersPageClient";

// Only generate for Turkish until translations are complete
export function generateStaticParams() {
  return [{ locale: "tr" }];
}

export default function EmployersPage() {
  return <EmployersPageClient />;
}

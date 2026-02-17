import { useTranslations } from "next-intl";
import { Link } from "@/i18n/routing";

export default function NotFound() {
  const t = useTranslations("notFound");

  return (
    <main className="flex-1 flex items-center justify-center px-4">
      <div className="text-center">
        <h1 className="text-6xl font-bold mb-4">404</h1>
        <p className="text-xl text-white/70 mb-8">
          {t("description")}
        </p>
        <Link
          href="/"
          className="inline-flex items-center px-6 py-3 rounded-lg font-semibold text-white btn-gradient shadow-btn hover:shadow-btn-hover transition-all"
        >
          {t("backHome")}
        </Link>
      </div>
    </main>
  );
}

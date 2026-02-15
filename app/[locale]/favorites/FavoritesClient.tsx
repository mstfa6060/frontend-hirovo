"use client";

import { useState, useEffect } from "react";
import { useTranslations } from "next-intl";
import { Link } from "@/i18n/routing";
import { favoritesApi } from "@/lib/api";
import type { FavoriteItem } from "@/lib/api/types";
import { HirovoJobType } from "@/lib/api/types";
import Badge from "@/app/components/ui/Badge";
import Spinner from "@/app/components/ui/Spinner";
import EmptyState from "@/app/components/ui/EmptyState";

export default function FavoritesClient({ locale }: { locale: string }) {
  const t = useTranslations("favorites");
  const tj = useTranslations("jobs");

  const [favorites, setFavorites] = useState<FavoriteItem[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetch() {
      try {
        const result = await favoritesApi.getAllFavorites();
        setFavorites(result || []);
      } catch {
        setFavorites([]);
      } finally {
        setLoading(false);
      }
    }
    fetch();
  }, []);

  const handleRemove = async (favoriteId: string) => {
    try {
      await favoritesApi.removeFavorite(favoriteId);
      setFavorites((prev) => prev.filter((f) => f.id !== favoriteId));
    } catch {
      // ignore
    }
  };

  const typeNames: Record<number, string> = {
    [HirovoJobType.FullTime]: tj("fullTime"),
    [HirovoJobType.PartTime]: tj("partTime"),
    [HirovoJobType.Freelance]: tj("freelance"),
  };

  if (loading) return <Spinner className="py-32" />;

  return (
    <main className="flex-1">
      <div className="max-w-[900px] mx-auto px-5 py-8">
        <div className="mb-8">
          <h1 className="text-3xl font-bold mb-2">{t("title")}</h1>
          <p className="text-white/70">{t("subtitle")}</p>
        </div>

        {favorites.length === 0 ? (
          <EmptyState
            title={t("noFavorites")}
            subtitle={t("noFavoritesSubtitle")}
            actionLabel={t("browseJobs")}
            actionHref="/jobs"
          />
        ) : (
          <div className="space-y-3">
            {favorites.map((fav) => {
              const endDate = new Date(fav.jobEndDate);
              const formattedDate = endDate.toLocaleDateString(locale, {
                day: "numeric",
                month: "short",
                year: "numeric",
              });

              return (
                <div
                  key={fav.id}
                  className="bg-white rounded-xl shadow-card p-5 flex items-start justify-between gap-3"
                >
                  <Link href={`/jobs/${fav.jobId}`} className="flex-1 min-w-0">
                    <h3 className="font-semibold text-text mb-1 truncate hover:text-hirovo-blue transition-colors">
                      {fav.jobTitle}
                    </h3>
                    <div className="flex flex-wrap gap-3 text-xs text-muted">
                      <Badge variant="primary">{typeNames[fav.jobType]}</Badge>
                      <span>
                        {fav.jobSalary > 0
                          ? `${fav.jobSalary.toLocaleString(locale)} TL`
                          : "-"}
                      </span>
                      <span>{tj("deadline")}: {formattedDate}</span>
                    </div>
                  </Link>
                  <button
                    onClick={() => handleRemove(fav.id)}
                    className="text-red-400 hover:text-red-600 transition-colors p-1 shrink-0"
                    title={t("remove")}
                  >
                    <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M3.172 5.172a4 4 0 015.656 0L10 6.343l1.172-1.171a4 4 0 115.656 5.656L10 17.657l-6.828-6.829a4 4 0 010-5.656z" clipRule="evenodd" />
                    </svg>
                  </button>
                </div>
              );
            })}
          </div>
        )}
      </div>
    </main>
  );
}

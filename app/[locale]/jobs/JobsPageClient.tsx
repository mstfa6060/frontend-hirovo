"use client";

import { useState, useEffect, useCallback } from "react";
import { useTranslations } from "next-intl";
import { jobsApi } from "@/lib/api";
import type { JobListItem } from "@/lib/api/types";
import { HirovoJobType, HirovoJobStatus } from "@/lib/api/types";
import JobCard from "./components/JobCard";
import Spinner from "@/app/components/ui/Spinner";
import EmptyState from "@/app/components/ui/EmptyState";

export default function JobsPageClient({ locale }: { locale: string }) {
  const t = useTranslations("jobs");

  const [jobs, setJobs] = useState<JobListItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState("");
  const [typeFilter, setTypeFilter] = useState<string>("");
  const [page, setPage] = useState(1);
  const perPage = 12;

  const fetchJobs = useCallback(async () => {
    setLoading(true);
    try {
      const filters = [];
      if (typeFilter !== "") {
        filters.push({
          key: "Type",
          type: "equals",
          isUsed: true,
          values: [parseInt(typeFilter)],
          min: null,
          max: null,
          conditionType: "and",
        });
      }

      const result = await jobsApi.getAllJobs({
        languageCode: locale,
        searchTerm,
        page,
        perPage,
        filters,
      });
      setJobs(result || []);
    } catch {
      setJobs([]);
    } finally {
      setLoading(false);
    }
  }, [locale, searchTerm, typeFilter, page]);

  useEffect(() => {
    fetchJobs();
  }, [fetchJobs]);

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    setPage(1);
    fetchJobs();
  };

  return (
    <main className="flex-1">
      <div className="max-w-[1120px] mx-auto px-5 py-8">
        <div className="mb-8">
          <h1 className="text-3xl font-bold mb-2">{t("title")}</h1>
          <p className="text-white/70">{t("subtitle")}</p>
        </div>

        {/* Search + Filters */}
        <div className="bg-white/10 backdrop-blur rounded-xl p-4 mb-6">
          <form onSubmit={handleSearch} className="flex flex-col sm:flex-row gap-3">
            <div className="flex-1 relative">
              <input
                type="text"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                placeholder={t("searchPlaceholder")}
                className="w-full px-4 py-3 rounded-lg bg-white text-text placeholder:text-muted outline-none focus:ring-2 focus:ring-hirovo-blue"
              />
            </div>
            <select
              value={typeFilter}
              onChange={(e) => {
                setTypeFilter(e.target.value);
                setPage(1);
              }}
              className="px-4 py-3 rounded-lg bg-white text-text outline-none focus:ring-2 focus:ring-hirovo-blue"
            >
              <option value="">{t("allTypes")}</option>
              <option value={String(HirovoJobType.FullTime)}>{t("fullTime")}</option>
              <option value={String(HirovoJobType.PartTime)}>{t("partTime")}</option>
              <option value={String(HirovoJobType.Freelance)}>{t("freelance")}</option>
            </select>
            <button
              type="submit"
              className="px-6 py-3 rounded-lg font-semibold text-white btn-gradient shadow-btn hover:shadow-btn-hover transition-all"
            >
              {t("search")}
            </button>
          </form>
        </div>

        {/* Results */}
        {loading ? (
          <Spinner className="py-16" />
        ) : jobs.length === 0 ? (
          <EmptyState title={t("noJobs")} subtitle={t("noJobsSubtitle")} />
        ) : (
          <>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {jobs.map((job) => (
                <JobCard key={job.id} job={job} locale={locale} />
              ))}
            </div>

            {/* Pagination */}
            <div className="flex items-center justify-center gap-3 mt-8">
              <button
                onClick={() => setPage((p) => Math.max(1, p - 1))}
                disabled={page === 1}
                className="px-4 py-2 rounded-lg bg-white/10 text-white text-sm disabled:opacity-30 hover:bg-white/20 transition-colors"
              >
                {t("prev")}
              </button>
              <span className="text-sm text-white/70">
                {t("page")} {page}
              </span>
              <button
                onClick={() => setPage((p) => p + 1)}
                disabled={jobs.length < perPage}
                className="px-4 py-2 rounded-lg bg-white/10 text-white text-sm disabled:opacity-30 hover:bg-white/20 transition-colors"
              >
                {t("next")}
              </button>
            </div>
          </>
        )}
      </div>
    </main>
  );
}

export function getJobTypeName(type: HirovoJobType, t: (key: string) => string): string {
  switch (type) {
    case HirovoJobType.FullTime: return t("fullTime");
    case HirovoJobType.PartTime: return t("partTime");
    case HirovoJobType.Freelance: return t("freelance");
    default: return "";
  }
}

export function getJobStatusVariant(status: HirovoJobStatus): string {
  switch (status) {
    case HirovoJobStatus.Active: return "success";
    case HirovoJobStatus.Closed: return "danger";
    case HirovoJobStatus.Filled: return "warning";
    default: return "default";
  }
}

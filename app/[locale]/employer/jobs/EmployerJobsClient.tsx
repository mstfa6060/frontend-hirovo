"use client";

import { useState, useEffect, useCallback } from "react";
import { useTranslations } from "next-intl";
import { Link } from "@/i18n/routing";
import { employerApi } from "@/lib/api";
import type { JobListItem } from "@/lib/api/types";
import { HirovoJobType, HirovoJobStatus } from "@/lib/api/types";
import Badge from "@/app/components/ui/Badge";
import Spinner from "@/app/components/ui/Spinner";
import EmptyState from "@/app/components/ui/EmptyState";

export default function EmployerJobsClient({ locale }: { locale: string }) {
  const t = useTranslations("employer");
  const tj = useTranslations("jobs");

  const [jobs, setJobs] = useState<JobListItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [page, setPage] = useState(1);
  const perPage = 12;

  const fetchJobs = useCallback(async () => {
    setLoading(true);
    try {
      const result = await employerApi.getEmployerJobs({ page, perPage });
      setJobs(result || []);
    } catch {
      setJobs([]);
    } finally {
      setLoading(false);
    }
  }, [page]);

  useEffect(() => {
    fetchJobs();
  }, [fetchJobs]);

  const typeNames: Record<number, string> = {
    [HirovoJobType.FullTime]: tj("fullTime"),
    [HirovoJobType.PartTime]: tj("partTime"),
    [HirovoJobType.Freelance]: tj("freelance"),
  };

  const statusConfig: Record<number, { label: string; variant: string }> = {
    [HirovoJobStatus.Active]: { label: t("jobStatus.active"), variant: "success" },
    [HirovoJobStatus.Closed]: { label: t("jobStatus.closed"), variant: "default" },
    [HirovoJobStatus.Filled]: { label: t("jobStatus.filled"), variant: "primary" },
  };

  if (loading) return <Spinner className="py-32" />;

  return (
    <main className="flex-1">
      <div className="max-w-[1120px] mx-auto px-5 py-8">
        <div className="flex items-center justify-between mb-8">
          <div>
            <h1 className="text-3xl font-bold mb-2">{t("myJobs")}</h1>
          </div>
          <Link
            href="/employer/jobs/create"
            className="px-6 py-3 rounded-lg font-semibold text-white btn-gradient shadow-btn hover:shadow-btn-hover transition-all"
          >
            {t("createJob")}
          </Link>
        </div>

        {jobs.length === 0 ? (
          <EmptyState
            title={t("noJobs")}
            subtitle={t("noJobsSubtitle")}
            actionLabel={t("createJob")}
            actionHref="/employer/jobs/create"
          />
        ) : (
          <>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {jobs.map((job) => {
                const status = statusConfig[job.status] || statusConfig[0];
                const endDate = new Date(job.endDate).toLocaleDateString(locale, {
                  day: "numeric",
                  month: "short",
                  year: "numeric",
                });

                return (
                  <div
                    key={job.id}
                    className="bg-white rounded-xl shadow-card p-5 flex flex-col"
                  >
                    <div className="flex items-start justify-between gap-2 mb-3">
                      <h3 className="font-semibold text-text truncate flex-1">
                        {job.title}
                      </h3>
                      <Badge variant={status.variant as "success" | "default" | "primary"}>
                        {status.label}
                      </Badge>
                    </div>

                    <div className="flex flex-wrap gap-2 mb-3">
                      <Badge variant="primary">{typeNames[job.type]}</Badge>
                      {job.skills?.slice(0, 3).map((skill) => (
                        <Badge key={skill.id} variant="default">
                          {skill.name}
                        </Badge>
                      ))}
                    </div>

                    <div className="flex flex-wrap gap-3 text-xs text-muted mb-4">
                      <span>
                        {job.salary > 0
                          ? `${job.salary.toLocaleString(locale)} TL`
                          : "-"}
                      </span>
                      <span>{tj("deadline")}: {endDate}</span>
                      <span>
                        {job.application} {t("applicationCount")}
                      </span>
                    </div>

                    <div className="mt-auto flex gap-2">
                      <Link
                        href={`/employer/applications?jobId=${job.id}`}
                        className="flex-1 text-center py-2 rounded-lg text-sm font-medium text-hirovo-blue bg-hirovo-blue/10 hover:bg-hirovo-blue/20 transition-colors"
                      >
                        {t("actions.viewApplications")}
                      </Link>
                    </div>
                  </div>
                );
              })}
            </div>

            {/* Pagination */}
            <div className="flex items-center justify-center gap-3 mt-8">
              <button
                onClick={() => setPage((p) => Math.max(1, p - 1))}
                disabled={page === 1}
                className="px-4 py-2 rounded-lg bg-white/10 text-white text-sm disabled:opacity-30 hover:bg-white/20 transition-colors"
              >
                {tj("prev")}
              </button>
              <span className="text-sm text-white/70">
                {tj("page")} {page}
              </span>
              <button
                onClick={() => setPage((p) => p + 1)}
                disabled={jobs.length < perPage}
                className="px-4 py-2 rounded-lg bg-white/10 text-white text-sm disabled:opacity-30 hover:bg-white/20 transition-colors"
              >
                {tj("next")}
              </button>
            </div>
          </>
        )}
      </div>
    </main>
  );
}

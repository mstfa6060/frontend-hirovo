"use client";

import { useState, useEffect } from "react";
import { useTranslations } from "next-intl";
import { Link } from "@/i18n/routing";
import { applicationsApi } from "@/lib/api";
import type { AppliedJob } from "@/lib/api/types";
import { ApplicationStatus, HirovoJobType } from "@/lib/api/types";
import { useAuth } from "@/lib/auth/AuthContext";
import Badge from "@/app/components/ui/Badge";
import Spinner from "@/app/components/ui/Spinner";
import EmptyState from "@/app/components/ui/EmptyState";

export default function ApplicationsClient({ locale }: { locale: string }) {
  const t = useTranslations("applications");
  const tj = useTranslations("jobs");
  const { user } = useAuth();

  const [applications, setApplications] = useState<AppliedJob[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetch() {
      if (!user) return;
      try {
        const result = await applicationsApi.getAppliedJobs(user.id);
        setApplications(result || []);
      } catch {
        setApplications([]);
      } finally {
        setLoading(false);
      }
    }
    fetch();
  }, [user]);

  const statusConfig: Record<number, { label: string; variant: string }> = {
    [ApplicationStatus.Pending]: { label: t("pending"), variant: "warning" },
    [ApplicationStatus.Accepted]: { label: t("accepted"), variant: "success" },
    [ApplicationStatus.Rejected]: { label: t("rejected"), variant: "danger" },
    [ApplicationStatus.Cancelled]: { label: t("cancelled"), variant: "default" },
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

        {applications.length === 0 ? (
          <EmptyState
            title={t("noApplications")}
            subtitle={t("noApplicationsSubtitle")}
            actionLabel={t("browseJobs")}
            actionHref="/jobs"
          />
        ) : (
          <div className="space-y-3">
            {applications.map((app) => {
              const status = statusConfig[app.applicationStatus] || statusConfig[0];
              const appliedDate = new Date(app.appliedAt).toLocaleDateString(locale, {
                day: "numeric",
                month: "short",
                year: "numeric",
              });

              return (
                <Link
                  key={app.jobId}
                  href={`/jobs/${app.jobId}`}
                  className="block bg-white rounded-xl shadow-card p-5 hover:shadow-lg transition-shadow"
                >
                  <div className="flex items-start justify-between gap-3">
                    <div className="flex-1 min-w-0">
                      <h3 className="font-semibold text-text mb-1 truncate">
                        {app.title}
                      </h3>
                      <div className="flex flex-wrap gap-3 text-xs text-muted">
                        <span>{typeNames[app.type]}</span>
                        <span>
                          {app.salary > 0
                            ? `${app.salary.toLocaleString(locale)} TL`
                            : "-"}
                        </span>
                        <span>{t("appliedAt")}: {appliedDate}</span>
                      </div>
                    </div>
                    <Badge variant={status.variant as "success" | "warning" | "danger" | "default"}>
                      {status.label}
                    </Badge>
                  </div>
                </Link>
              );
            })}
          </div>
        )}
      </div>
    </main>
  );
}

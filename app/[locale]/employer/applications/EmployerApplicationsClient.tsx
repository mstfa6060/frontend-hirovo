"use client";

import { useState, useEffect, useCallback } from "react";
import { useTranslations } from "next-intl";
import { Link } from "@/i18n/routing";
import { employerApi } from "@/lib/api";
import type { ApplicationListItem } from "@/lib/api/types";
import { ApplicationStatus } from "@/lib/api/types";
import Badge from "@/app/components/ui/Badge";
import Spinner from "@/app/components/ui/Spinner";
import EmptyState from "@/app/components/ui/EmptyState";

export default function EmployerApplicationsClient({
  locale,
  jobId,
}: {
  locale: string;
  jobId?: string;
}) {
  const t = useTranslations("employer");

  const [applications, setApplications] = useState<ApplicationListItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [updatingId, setUpdatingId] = useState<string | null>(null);

  const fetchApplications = useCallback(async () => {
    setLoading(true);
    try {
      const result = jobId
        ? await employerApi.getJobApplications({ jobId })
        : await employerApi.getAllEmployerApplications();
      setApplications(result || []);
    } catch {
      setApplications([]);
    } finally {
      setLoading(false);
    }
  }, [jobId]);

  useEffect(() => {
    fetchApplications();
  }, [fetchApplications]);

  const handleUpdateStatus = async (
    applicationId: string,
    status: ApplicationStatus
  ) => {
    setUpdatingId(applicationId);
    try {
      await employerApi.updateApplicationStatus({
        jobApplicationId: applicationId,
        status,
      });
      await fetchApplications();
    } catch {
      // ignore
    } finally {
      setUpdatingId(null);
    }
  };

  const statusConfig: Record<
    number,
    { label: string; variant: string }
  > = {
    [ApplicationStatus.Pending]: {
      label: t("applicationStatus.pending"),
      variant: "warning",
    },
    [ApplicationStatus.Accepted]: {
      label: t("applicationStatus.accepted"),
      variant: "success",
    },
    [ApplicationStatus.Rejected]: {
      label: t("applicationStatus.rejected"),
      variant: "danger",
    },
    [ApplicationStatus.Cancelled]: {
      label: t("applicationStatus.cancelled"),
      variant: "default",
    },
  };

  if (loading) return <Spinner className="py-32" />;

  return (
    <main className="flex-1">
      <div className="max-w-[900px] mx-auto px-5 py-8">
        <div className="flex items-center justify-between mb-8">
          <div>
            <h1 className="text-3xl font-bold mb-2">{t("applications")}</h1>
          </div>
          <Link
            href="/employer/jobs"
            className="px-4 py-2 rounded-lg text-sm font-medium text-white bg-white/10 hover:bg-white/20 transition-colors"
          >
            {t("myJobs")}
          </Link>
        </div>

        {applications.length === 0 ? (
          <EmptyState
            title={t("noApplications")}
            subtitle={t("noApplicationsSubtitle")}
            actionLabel={t("myJobs")}
            actionHref="/employer/jobs"
          />
        ) : (
          <div className="space-y-3">
            {applications.map((app) => {
              const status =
                statusConfig[app.status] || statusConfig[ApplicationStatus.Pending];
              const appliedDate = new Date(app.appliedAt).toLocaleDateString(
                locale,
                {
                  day: "numeric",
                  month: "short",
                  year: "numeric",
                }
              );
              const isUpdating = updatingId === app.id;

              return (
                <div
                  key={app.id}
                  className="bg-white rounded-xl shadow-card p-5"
                >
                  <div className="flex items-start justify-between gap-3 mb-3">
                    <div className="flex-1 min-w-0">
                      <h3 className="font-semibold text-text mb-1">
                        {app.displayName}
                      </h3>
                      <p className="text-sm text-muted truncate">
                        {app.jobTitle}
                      </p>
                    </div>
                    <Badge
                      variant={
                        status.variant as
                          | "success"
                          | "warning"
                          | "danger"
                          | "default"
                      }
                    >
                      {status.label}
                    </Badge>
                  </div>

                  <div className="flex flex-wrap gap-3 text-xs text-muted mb-4">
                    {(app.city || app.district) && (
                      <span>
                        {[app.city, app.district].filter(Boolean).join(", ")}
                      </span>
                    )}
                    <span>
                      {t("applicant.appliedAt")}: {appliedDate}
                    </span>
                    {app.phoneNumber && (
                      <span>
                        {t("applicant.phone")}: {app.phoneNumber}
                      </span>
                    )}
                  </div>

                  {app.status === ApplicationStatus.Pending && (
                    <div className="flex gap-2">
                      <button
                        onClick={() =>
                          handleUpdateStatus(app.id, ApplicationStatus.Accepted)
                        }
                        disabled={isUpdating}
                        className="flex-1 py-2 rounded-lg text-sm font-semibold text-white bg-green-600 hover:bg-green-700 transition-colors disabled:opacity-50"
                      >
                        {t("actions.accept")}
                      </button>
                      <button
                        onClick={() =>
                          handleUpdateStatus(app.id, ApplicationStatus.Rejected)
                        }
                        disabled={isUpdating}
                        className="flex-1 py-2 rounded-lg text-sm font-semibold text-white bg-red-500 hover:bg-red-600 transition-colors disabled:opacity-50"
                      >
                        {t("actions.reject")}
                      </button>
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        )}
      </div>
    </main>
  );
}

"use client";

import { useState, useEffect } from "react";
import { useTranslations } from "next-intl";
import { useRouter } from "@/i18n/routing";
import { jobsApi, applicationsApi } from "@/lib/api";
import type { JobDetail } from "@/lib/api/types";
import { HirovoJobType, HirovoJobStatus } from "@/lib/api/types";
import { useAuth } from "@/lib/auth/AuthContext";
import Badge from "@/app/components/ui/Badge";
import Modal from "@/app/components/ui/Modal";
import Spinner from "@/app/components/ui/Spinner";

export default function JobDetailClient({
  locale,
  jobId,
}: {
  locale: string;
  jobId: string;
}) {
  const t = useTranslations("jobs");
  const router = useRouter();
  const { user, isAuthenticated } = useAuth();

  const [job, setJob] = useState<JobDetail | null>(null);
  const [loading, setLoading] = useState(true);
  const [applying, setApplying] = useState(false);
  const [showConfirm, setShowConfirm] = useState(false);
  const [applied, setApplied] = useState(false);
  const [error, setError] = useState("");

  useEffect(() => {
    async function fetch() {
      try {
        const result = await jobsApi.getJobDetail(jobId, locale);
        setJob(result);
      } catch {
        setJob(null);
      } finally {
        setLoading(false);
      }
    }
    fetch();
  }, [jobId, locale]);

  const handleApply = async () => {
    if (!isAuthenticated || !user) {
      router.push(`/login?redirect=/jobs/${jobId}`);
      return;
    }
    setShowConfirm(true);
  };

  const confirmApply = async () => {
    setShowConfirm(false);
    setApplying(true);
    setError("");
    try {
      await applicationsApi.createApplication({
        jobId,
        workerId: user!.id,
      });
      setApplied(true);
    } catch (err) {
      setError(err instanceof Error ? err.message : t("applyError"));
    } finally {
      setApplying(false);
    }
  };

  if (loading) return <Spinner className="py-32" />;
  if (!job) return <div className="text-center py-32 text-white/60">Job not found</div>;

  const endDate = new Date(job.endDate);
  const isExpired = endDate < new Date();
  const formattedDate = endDate.toLocaleDateString(locale, {
    day: "numeric",
    month: "long",
    year: "numeric",
  });

  const typeNames: Record<number, string> = {
    [HirovoJobType.FullTime]: t("fullTime"),
    [HirovoJobType.PartTime]: t("partTime"),
    [HirovoJobType.Freelance]: t("freelance"),
  };

  const statusNames: Record<number, string> = {
    [HirovoJobStatus.Active]: t("active"),
    [HirovoJobStatus.Closed]: t("closed"),
    [HirovoJobStatus.Filled]: t("filled"),
  };

  const statusVariants: Record<number, string> = {
    [HirovoJobStatus.Active]: "success",
    [HirovoJobStatus.Closed]: "danger",
    [HirovoJobStatus.Filled]: "warning",
  };

  return (
    <main className="flex-1">
      <div className="max-w-[800px] mx-auto px-5 py-8">
        <div className="bg-white rounded-2xl shadow-card p-6 md:p-8">
          {/* Header */}
          <div className="flex flex-col sm:flex-row sm:items-start justify-between gap-3 mb-6">
            <div>
              <h1 className="text-2xl font-bold text-text mb-1">{job.title}</h1>
              <p className="text-muted text-sm">{t("employer")}: {job.employerDisplayName}</p>
            </div>
            <div className="flex gap-2">
              <Badge variant={statusVariants[job.status] as "success" | "danger" | "warning"}>
                {statusNames[job.status]}
              </Badge>
              <Badge variant="primary">{typeNames[job.type]}</Badge>
            </div>
          </div>

          {/* Info Grid */}
          <div className="grid grid-cols-2 gap-4 mb-6 p-4 bg-card rounded-xl">
            <div>
              <p className="text-xs text-muted mb-0.5">{t("salary")}</p>
              <p className="font-semibold text-text">
                {job.salary > 0 ? `${job.salary.toLocaleString(locale)} TL${t("perMonth")}` : "-"}
              </p>
            </div>
            <div>
              <p className="text-xs text-muted mb-0.5">{t("deadline")}</p>
              <p className={`font-semibold ${isExpired ? "text-red-500" : "text-text"}`}>
                {formattedDate}
              </p>
            </div>
          </div>

          {/* Skills */}
          {job.skills && job.skills.length > 0 && (
            <div className="mb-6">
              <h3 className="text-sm font-semibold text-text mb-2">{t("skills")}</h3>
              <div className="flex flex-wrap gap-2">
                {job.skills.map((skill) => (
                  <Badge key={skill.id} variant="primary">
                    {skill.name}
                  </Badge>
                ))}
              </div>
            </div>
          )}

          {/* Description */}
          <div className="mb-8">
            <div className="prose prose-sm text-text max-w-none whitespace-pre-line">
              {job.description}
            </div>
          </div>

          {/* Apply button */}
          {error && (
            <div className="bg-red-50 text-red-600 px-4 py-3 rounded-lg mb-4 text-sm">
              {error}
            </div>
          )}

          {applied ? (
            <div className="bg-green-50 text-green-700 px-4 py-3 rounded-lg text-sm font-medium text-center">
              {t("applySuccess")}
            </div>
          ) : (
            <button
              onClick={handleApply}
              disabled={applying || isExpired || job.status !== HirovoJobStatus.Active}
              className="w-full py-3 rounded-lg font-semibold text-white btn-gradient shadow-btn hover:shadow-btn-hover transition-all disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {applying
                ? "..."
                : isExpired
                  ? t("expired")
                  : !isAuthenticated
                    ? t("loginToApply")
                    : t("applyNow")}
            </button>
          )}
        </div>
      </div>

      {/* Confirmation Modal */}
      <Modal open={showConfirm} onClose={() => setShowConfirm(false)}>
        <h3 className="text-lg font-bold text-text mb-2">{t("applyNow")}</h3>
        <p className="text-muted text-sm mb-6">{t("confirmApply")}</p>
        <div className="flex gap-3">
          <button
            onClick={() => setShowConfirm(false)}
            className="flex-1 py-2.5 rounded-lg border border-border text-text text-sm font-medium hover:bg-card transition-colors"
          >
            {t("prev")}
          </button>
          <button
            onClick={confirmApply}
            className="flex-1 py-2.5 rounded-lg text-white text-sm font-semibold btn-gradient shadow-btn"
          >
            {t("apply")}
          </button>
        </div>
      </Modal>
    </main>
  );
}

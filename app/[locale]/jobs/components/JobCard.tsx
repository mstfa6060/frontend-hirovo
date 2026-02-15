"use client";

import { useTranslations } from "next-intl";
import { Link } from "@/i18n/routing";
import type { JobListItem } from "@/lib/api/types";
import { HirovoJobType } from "@/lib/api/types";
import Badge from "@/app/components/ui/Badge";

function getTypeName(type: HirovoJobType, t: (key: string) => string): string {
  switch (type) {
    case HirovoJobType.FullTime: return t("fullTime");
    case HirovoJobType.PartTime: return t("partTime");
    case HirovoJobType.Freelance: return t("freelance");
    default: return "";
  }
}

export default function JobCard({ job, locale }: { job: JobListItem; locale: string }) {
  const t = useTranslations("jobs");

  const endDate = new Date(job.endDate);
  const isExpired = endDate < new Date();
  const formattedDate = endDate.toLocaleDateString(locale, {
    day: "numeric",
    month: "short",
    year: "numeric",
  });

  return (
    <Link
      href={`/jobs/${job.id}`}
      className="block bg-white rounded-xl shadow-card hover:shadow-lg transition-shadow p-5 group"
    >
      <div className="flex items-start justify-between mb-3">
        <h3 className="text-base font-semibold text-text group-hover:text-hirovo-blue transition-colors line-clamp-2">
          {job.title}
        </h3>
        <Badge variant={isExpired ? "danger" : "primary"}>
          {getTypeName(job.type, t)}
        </Badge>
      </div>

      <div className="space-y-2 text-sm">
        <div className="flex items-center gap-2 text-muted">
          <svg className="w-4 h-4 shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
          </svg>
          <span className="font-medium text-text">
            {job.salary > 0 ? `${job.salary.toLocaleString(locale)} TL${t("perMonth")}` : "-"}
          </span>
        </div>

        <div className="flex items-center gap-2 text-muted">
          <svg className="w-4 h-4 shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
          </svg>
          <span className={isExpired ? "text-red-500" : ""}>
            {t("deadline")}: {formattedDate}
          </span>
        </div>

        <div className="flex items-center gap-2 text-muted">
          <svg className="w-4 h-4 shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0z" />
          </svg>
          <span>{job.application} {t("applications")}</span>
        </div>
      </div>

      {job.skills && job.skills.length > 0 && (
        <div className="flex flex-wrap gap-1.5 mt-3">
          {job.skills.slice(0, 3).map((skill) => (
            <span
              key={skill.id}
              className="px-2 py-0.5 text-xs rounded-md bg-card text-muted"
            >
              {skill.name}
            </span>
          ))}
          {job.skills.length > 3 && (
            <span className="px-2 py-0.5 text-xs rounded-md bg-card text-muted">
              +{job.skills.length - 3}
            </span>
          )}
        </div>
      )}
    </Link>
  );
}

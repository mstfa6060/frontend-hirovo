"use client";

import { useState, useEffect } from "react";
import { useTranslations } from "next-intl";
import { Link } from "@/i18n/routing";
import { dashboardApi } from "@/lib/api";
import type { EmployerStats } from "@/lib/api/types";
import { useAuth } from "@/lib/auth/AuthContext";
import Spinner from "@/app/components/ui/Spinner";

export default function EmployerDashboardClient() {
  const t = useTranslations("employer");
  const { user, isEmployer } = useAuth();

  const [stats, setStats] = useState<EmployerStats | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchStats() {
      try {
        const result = await dashboardApi.getEmployerStats();
        setStats(result);
      } catch {
        setStats(null);
      } finally {
        setLoading(false);
      }
    }
    fetchStats();
  }, []);

  if (loading) return <Spinner className="py-32" />;

  if (!isEmployer) {
    return (
      <main className="flex-1 flex items-center justify-center px-4 py-32">
        <div className="text-center">
          <h1 className="text-2xl font-bold mb-4">Bu sayfa isverenler icindir</h1>
          <p className="text-white/70 mb-6">Isveren paneline erismek icin isveren hesabinizla giris yapin.</p>
          <Link
            href="/login"
            className="inline-flex items-center px-6 py-3 rounded-lg font-semibold text-white btn-gradient shadow-btn hover:shadow-btn-hover transition-all"
          >
            {t("login.title")}
          </Link>
        </div>
      </main>
    );
  }

  return (
    <main className="flex-1">
      <div className="max-w-[1000px] mx-auto px-5 py-8">
        <div className="mb-8">
          <h1 className="text-3xl font-bold mb-2">{t("dashboard")}</h1>
          <p className="text-white/70">
            {t("welcome")}, {user?.displayName || user?.companyName || user?.email}
          </p>
        </div>

        {/* Stats Grid */}
        {stats && (
          <>
            {/* Job Stats */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-6">
              <StatCard
                label={t("stats.totalJobsPosted")}
                value={stats.totalJobsPosted}
              />
              <StatCard
                label={t("stats.activeJobs")}
                value={stats.activeJobs}
                color="green"
              />
              <StatCard
                label={t("stats.closedJobs")}
                value={stats.closedJobs}
                color="gray"
              />
              <StatCard
                label={t("stats.filledJobs")}
                value={stats.filledJobs}
                color="blue"
              />
            </div>

            {/* Application Stats */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-6">
              <StatCard
                label={t("stats.totalApplicationsReceived")}
                value={stats.totalApplicationsReceived}
              />
              <StatCard
                label={t("stats.pendingApplications")}
                value={stats.pendingApplications}
                color="yellow"
              />
              <StatCard
                label={t("stats.acceptedApplications")}
                value={stats.acceptedApplications}
                color="green"
              />
              <StatCard
                label={t("stats.rejectedApplications")}
                value={stats.rejectedApplications}
                color="red"
              />
            </div>

            {/* Rating */}
            <div className="grid grid-cols-2 gap-4 mb-8">
              <div className="bg-white/10 backdrop-blur rounded-xl p-5 text-center">
                <p className="text-3xl font-bold">{stats.averageRating.toFixed(1)}</p>
                <p className="text-sm text-white/70 mt-1">{t("stats.averageRating")}</p>
              </div>
              <div className="bg-white/10 backdrop-blur rounded-xl p-5 text-center">
                <p className="text-3xl font-bold">{stats.totalReviews}</p>
                <p className="text-sm text-white/70 mt-1">{t("stats.totalReviews")}</p>
              </div>
            </div>
          </>
        )}

        {/* Quick Links */}
        <div className="bg-white/10 backdrop-blur rounded-xl p-6">
          <h2 className="font-semibold mb-4">{t("quickLinks")}</h2>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
            <QuickLink href="/employer/jobs" label={t("myJobs")} />
            <QuickLink href="/employer/jobs/create" label={t("createJob")} />
            <QuickLink href="/employer/applications" label={t("applications")} />
            <QuickLink href="/profile" label={t("profile")} />
          </div>
        </div>
      </div>
    </main>
  );
}

function StatCard({
  label,
  value,
  color,
}: {
  label: string;
  value: number;
  color?: string;
}) {
  const colors: Record<string, string> = {
    yellow: "text-yellow-400",
    green: "text-green-400",
    red: "text-red-400",
    blue: "text-blue-400",
    gray: "text-white/50",
  };

  return (
    <div className="bg-white/10 backdrop-blur rounded-xl p-5 text-center">
      <p className={`text-3xl font-bold ${color ? colors[color] : ""}`}>
        {value}
      </p>
      <p className="text-sm text-white/70 mt-1">{label}</p>
    </div>
  );
}

function QuickLink({ href, label }: { href: string; label: string }) {
  return (
    <Link
      href={href}
      className="block p-4 bg-white/5 rounded-lg text-center text-sm font-medium hover:bg-white/10 transition-colors"
    >
      {label}
    </Link>
  );
}

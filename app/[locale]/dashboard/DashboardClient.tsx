"use client";

import { useState, useEffect } from "react";
import { useTranslations } from "next-intl";
import { Link } from "@/i18n/routing";
import { dashboardApi } from "@/lib/api";
import type { WorkerStats } from "@/lib/api/types";
import { useAuth } from "@/lib/auth/AuthContext";
import Spinner from "@/app/components/ui/Spinner";

export default function DashboardClient() {
  const t = useTranslations("dashboard");
  const { user } = useAuth();

  const [stats, setStats] = useState<WorkerStats | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetch() {
      try {
        const result = await dashboardApi.getWorkerStats();
        setStats(result);
      } catch {
        setStats(null);
      } finally {
        setLoading(false);
      }
    }
    fetch();
  }, []);

  if (loading) return <Spinner className="py-32" />;

  return (
    <main className="flex-1">
      <div className="max-w-[900px] mx-auto px-5 py-8">
        <div className="mb-8">
          <h1 className="text-3xl font-bold mb-2">{t("title")}</h1>
          <p className="text-white/70">
            {t("welcome")}, {user?.displayName || user?.email}
          </p>
        </div>

        {/* Stats Grid */}
        {stats && (
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
            <StatCard label={t("totalApplications")} value={stats.totalApplications} />
            <StatCard label={t("pendingApplications")} value={stats.pendingApplications} color="yellow" />
            <StatCard label={t("acceptedApplications")} value={stats.acceptedApplications} color="green" />
            <StatCard label={t("rejectedApplications")} value={stats.rejectedApplications} color="red" />
          </div>
        )}

        {stats && (
          <div className="grid grid-cols-2 gap-4 mb-8">
            <div className="bg-white/10 backdrop-blur rounded-xl p-5 text-center">
              <p className="text-3xl font-bold">{stats.averageRating.toFixed(1)}</p>
              <p className="text-sm text-white/70 mt-1">{t("averageRating")}</p>
            </div>
            <div className="bg-white/10 backdrop-blur rounded-xl p-5 text-center">
              <p className="text-3xl font-bold">{stats.totalReviews}</p>
              <p className="text-sm text-white/70 mt-1">{t("totalReviews")}</p>
            </div>
          </div>
        )}

        {/* Quick Links */}
        <div className="bg-white/10 backdrop-blur rounded-xl p-6">
          <h2 className="font-semibold mb-4">{t("quickLinks")}</h2>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
            <QuickLink href="/jobs" label={t("browseJobs")} />
            <QuickLink href="/applications" label={t("viewApplications")} />
            <QuickLink href="/favorites" label={t("viewFavorites")} />
            <QuickLink href="/profile" label={t("editProfile")} />
          </div>
        </div>
      </div>
    </main>
  );
}

function StatCard({ label, value, color }: { label: string; value: number; color?: string }) {
  const colors: Record<string, string> = {
    yellow: "text-yellow-400",
    green: "text-green-400",
    red: "text-red-400",
  };

  return (
    <div className="bg-white/10 backdrop-blur rounded-xl p-5 text-center">
      <p className={`text-3xl font-bold ${color ? colors[color] : ""}`}>{value}</p>
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

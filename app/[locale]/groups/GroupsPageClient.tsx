"use client";

import { useState, useEffect, useCallback } from "react";
import { useTranslations } from "next-intl";
import { socialApi } from "@/lib/api";
import { useAuth } from "@/lib/auth/AuthContext";
import { Link } from "@/i18n/routing";
import Spinner from "@/app/components/ui/Spinner";
import EmptyState from "@/app/components/ui/EmptyState";

type GroupsTab = "all" | "my";

export default function GroupsPageClient() {
  const t = useTranslations("social");
  const { isAuthenticated } = useAuth();

  const [activeTab, setActiveTab] = useState<GroupsTab>("all");
  const [groups, setGroups] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState("");

  const fetchGroups = useCallback(async () => {
    setLoading(true);
    try {
      let result: any[];
      if (activeTab === "my" && isAuthenticated) {
        result = await socialApi.getMyGroups();
      } else {
        result = await socialApi.getAllGroups(searchTerm);
      }
      setGroups(result || []);
    } catch {
      setGroups([]);
    } finally {
      setLoading(false);
    }
  }, [activeTab, searchTerm, isAuthenticated]);

  useEffect(() => {
    fetchGroups();
  }, [fetchGroups]);

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    fetchGroups();
  };

  const handleJoinLeave = async (groupId: string, isMember: boolean) => {
    try {
      if (isMember) {
        await socialApi.leaveGroup(groupId);
      } else {
        await socialApi.joinGroup(groupId);
      }
      fetchGroups();
    } catch {
      // silently fail
    }
  };

  return (
    <main className="flex-1">
      <div className="max-w-[1120px] mx-auto px-5 py-8">
        <div className="mb-8">
          <h1 className="text-3xl font-bold mb-2">{t("groups")}</h1>
          <p className="text-white/70">{t("groupsSubtitle")}</p>
        </div>

        {/* Search */}
        <div className="bg-white/10 backdrop-blur rounded-xl p-4 mb-6">
          <form onSubmit={handleSearch} className="flex gap-3">
            <input
              type="text"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              placeholder={t("searchGroups")}
              className="flex-1 px-4 py-3 rounded-lg bg-white text-text placeholder:text-muted outline-none focus:ring-2 focus:ring-hirovo-blue"
            />
            <button
              type="submit"
              className="px-6 py-3 rounded-lg font-semibold text-white btn-gradient shadow-btn hover:shadow-btn-hover transition-all"
            >
              {t("search")}
            </button>
          </form>
        </div>

        {/* Tabs */}
        {isAuthenticated && (
          <div className="flex gap-1 bg-white/10 backdrop-blur rounded-xl p-1 mb-6">
            <button
              onClick={() => setActiveTab("all")}
              className={`flex-1 py-2.5 rounded-lg text-sm font-medium transition-all ${
                activeTab === "all"
                  ? "bg-white text-text shadow-sm"
                  : "text-white/70 hover:text-white"
              }`}
            >
              {t("allGroups")}
            </button>
            <button
              onClick={() => setActiveTab("my")}
              className={`flex-1 py-2.5 rounded-lg text-sm font-medium transition-all ${
                activeTab === "my"
                  ? "bg-white text-text shadow-sm"
                  : "text-white/70 hover:text-white"
              }`}
            >
              {t("myGroups")}
            </button>
          </div>
        )}

        {/* Groups Grid */}
        {loading ? (
          <Spinner className="py-16" />
        ) : groups.length === 0 ? (
          <EmptyState title={t("noGroups")} subtitle={t("noGroupsSubtitle")} />
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {groups.map((group) => (
              <div
                key={group.id}
                className="bg-white/10 backdrop-blur rounded-xl p-5 flex flex-col"
              >
                <Link href={`/groups/${group.id}`} className="flex-1">
                  <h3 className="text-lg font-semibold text-white mb-2 hover:underline">
                    {group.name}
                  </h3>
                  {group.description && (
                    <p className="text-sm text-white/60 line-clamp-2 mb-3">
                      {group.description}
                    </p>
                  )}
                </Link>

                <div className="flex items-center justify-between pt-3 border-t border-white/10">
                  <span className="text-xs text-white/50">
                    {group.memberCount || 0} {t("members")}
                  </span>
                  {isAuthenticated && (
                    <button
                      onClick={() => handleJoinLeave(group.id, group.isMember)}
                      className={`px-4 py-1.5 rounded-lg text-xs font-semibold transition-all ${
                        group.isMember
                          ? "bg-white/10 text-white hover:bg-red-500/20 hover:text-red-400"
                          : "btn-gradient text-white shadow-btn hover:shadow-btn-hover"
                      }`}
                    >
                      {group.isMember ? t("leave") : t("join")}
                    </button>
                  )}
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </main>
  );
}

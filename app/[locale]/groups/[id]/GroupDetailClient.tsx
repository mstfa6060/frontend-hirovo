"use client";

import { useState, useEffect, useCallback } from "react";
import { useTranslations } from "next-intl";
import { socialApi } from "@/lib/api";
import { useAuth } from "@/lib/auth/AuthContext";
import { Link } from "@/i18n/routing";
import Spinner from "@/app/components/ui/Spinner";
import EmptyState from "@/app/components/ui/EmptyState";

export default function GroupDetailClient({ groupId }: { groupId: string }) {
  const t = useTranslations("social");
  const { isAuthenticated } = useAuth();

  const [group, setGroup] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [joining, setJoining] = useState(false);

  const fetchGroup = useCallback(async () => {
    setLoading(true);
    try {
      const result = await socialApi.getGroupDetail(groupId);
      setGroup(result);
    } catch {
      setGroup(null);
    } finally {
      setLoading(false);
    }
  }, [groupId]);

  useEffect(() => {
    fetchGroup();
  }, [fetchGroup]);

  const handleJoinLeave = async () => {
    if (!group) return;
    setJoining(true);
    try {
      if (group.isMember) {
        await socialApi.leaveGroup(groupId);
      } else {
        await socialApi.joinGroup(groupId);
      }
      fetchGroup();
    } catch {
      // silently fail
    } finally {
      setJoining(false);
    }
  };

  if (loading) {
    return (
      <main className="flex-1">
        <Spinner className="py-24" />
      </main>
    );
  }

  if (!group) {
    return (
      <main className="flex-1">
        <div className="max-w-[720px] mx-auto px-5 py-8">
          <EmptyState title={t("groupNotFound")} />
        </div>
      </main>
    );
  }

  return (
    <main className="flex-1">
      <div className="max-w-[720px] mx-auto px-5 py-8">
        {/* Group Header */}
        <div className="bg-white/10 backdrop-blur rounded-xl p-6 mb-6">
          <div className="flex items-start justify-between gap-4">
            <div className="flex-1 min-w-0">
              <h1 className="text-2xl font-bold text-white mb-2">{group.name}</h1>
              {group.description && (
                <p className="text-sm text-white/70 mb-3">{group.description}</p>
              )}
              <div className="flex items-center gap-4 text-sm text-white/50">
                <span>{group.memberCount || 0} {t("members")}</span>
                {group.createdAt && (
                  <span>{t("createdAt")} {new Date(group.createdAt).toLocaleDateString()}</span>
                )}
              </div>
            </div>
            {isAuthenticated && (
              <button
                onClick={handleJoinLeave}
                disabled={joining}
                className={`px-5 py-2 rounded-lg text-sm font-semibold transition-all flex-shrink-0 ${
                  group.isMember
                    ? "bg-white/10 text-white hover:bg-red-500/20 hover:text-red-400"
                    : "btn-gradient text-white shadow-btn hover:shadow-btn-hover"
                } disabled:opacity-50`}
              >
                {group.isMember ? t("leave") : t("join")}
              </button>
            )}
          </div>
        </div>

        {/* Group Posts */}
        <div className="mb-6">
          <h2 className="text-lg font-semibold text-white mb-4">{t("posts")}</h2>
          {group.posts && group.posts.length > 0 ? (
            <div className="space-y-4">
              {group.posts.map((post: any) => (
                <div key={post.id} className="bg-white/10 backdrop-blur rounded-xl p-5">
                  <div className="flex items-center gap-3 mb-3">
                    <Link href={`/users/${post.authorId || post.userId}`}>
                      <div className="w-9 h-9 rounded-full bg-hirovo-blue/30 flex items-center justify-center text-white font-semibold text-sm">
                        {(post.authorName || "?").charAt(0).toUpperCase()}
                      </div>
                    </Link>
                    <div>
                      <Link
                        href={`/users/${post.authorId || post.userId}`}
                        className="text-sm font-semibold text-white hover:underline"
                      >
                        {post.authorName || t("unknownUser")}
                      </Link>
                      <p className="text-xs text-white/50">
                        {post.createdAt ? new Date(post.createdAt).toLocaleDateString() : ""}
                      </p>
                    </div>
                  </div>
                  <p className="text-white/90 text-sm leading-relaxed whitespace-pre-wrap">
                    {post.content}
                  </p>
                  {post.imageUrls && post.imageUrls.length > 0 && (
                    <div className={`grid gap-2 mt-3 ${post.imageUrls.length === 1 ? "grid-cols-1" : "grid-cols-2"}`}>
                      {post.imageUrls.map((url: string, i: number) => (
                        <img key={i} src={url} alt="" className="w-full h-48 object-cover rounded-lg" loading="lazy" />
                      ))}
                    </div>
                  )}
                </div>
              ))}
            </div>
          ) : (
            <EmptyState title={t("noPosts")} subtitle={t("noPostsSubtitle")} />
          )}
        </div>

        {/* Members */}
        {group.members && group.members.length > 0 && (
          <div>
            <h2 className="text-lg font-semibold text-white mb-4">{t("members")}</h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
              {group.members.map((member: any) => (
                <Link
                  key={member.id || member.userId}
                  href={`/users/${member.id || member.userId}`}
                  className="flex items-center gap-3 bg-white/10 backdrop-blur rounded-xl p-3 hover:bg-white/15 transition-colors"
                >
                  <div className="w-9 h-9 rounded-full bg-hirovo-blue/30 flex items-center justify-center text-white font-semibold text-sm flex-shrink-0">
                    {(member.displayName || member.fullName || member.userName || "?").charAt(0).toUpperCase()}
                  </div>
                  <p className="text-sm font-medium text-white truncate">
                    {member.displayName || member.fullName || member.userName || t("unknownUser")}
                  </p>
                </Link>
              ))}
            </div>
          </div>
        )}
      </div>
    </main>
  );
}

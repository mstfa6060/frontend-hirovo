"use client";

import { useState, useEffect, useCallback } from "react";
import { useTranslations } from "next-intl";
import { socialApi } from "@/lib/api";
import { useAuth } from "@/lib/auth/AuthContext";
import { Link } from "@/i18n/routing";
import Spinner from "@/app/components/ui/Spinner";
import EmptyState from "@/app/components/ui/EmptyState";

type ProfileTab = "posts" | "followers" | "following";

export default function UserProfileClient({ userId }: { userId: string }) {
  const t = useTranslations("social");
  const { user: currentUser, isAuthenticated } = useAuth();

  const [activeTab, setActiveTab] = useState<ProfileTab>("posts");
  const [loading, setLoading] = useState(true);
  const [posts, setPosts] = useState<any[]>([]);
  const [followers, setFollowers] = useState<any[]>([]);
  const [following, setFollowing] = useState<any[]>([]);
  const [followCounts, setFollowCounts] = useState<any>({ followerCount: 0, followingCount: 0 });
  const [isFollowingUser, setIsFollowingUser] = useState(false);
  const [followLoading, setFollowLoading] = useState(false);

  const isOwnProfile = currentUser?.id === userId;

  const fetchProfile = useCallback(async () => {
    setLoading(true);
    try {
      const [postsRes, countsRes] = await Promise.all([
        socialApi.getUserPosts(userId),
        socialApi.getFollowCounts(userId),
      ]);
      setPosts(postsRes || []);
      setFollowCounts(countsRes || { followerCount: 0, followingCount: 0 });

      if (isAuthenticated && !isOwnProfile) {
        const res = await socialApi.isFollowing(userId);
        setIsFollowingUser(res?.isFollowing || false);
      }
    } catch {
      setPosts([]);
    } finally {
      setLoading(false);
    }
  }, [userId, isAuthenticated, isOwnProfile]);

  useEffect(() => {
    fetchProfile();
  }, [fetchProfile]);

  const fetchFollowers = useCallback(async () => {
    try {
      const res = await socialApi.getFollowers(userId);
      setFollowers(res || []);
    } catch {
      setFollowers([]);
    }
  }, [userId]);

  const fetchFollowing = useCallback(async () => {
    try {
      const res = await socialApi.getFollowing();
      setFollowing(res || []);
    } catch {
      setFollowing([]);
    }
  }, []);

  useEffect(() => {
    if (activeTab === "followers") fetchFollowers();
    if (activeTab === "following") fetchFollowing();
  }, [activeTab, fetchFollowers, fetchFollowing]);

  const handleFollow = async () => {
    setFollowLoading(true);
    try {
      if (isFollowingUser) {
        await socialApi.unfollowUser(userId);
        setIsFollowingUser(false);
        setFollowCounts((c: any) => ({ ...c, followerCount: Math.max(0, (c.followerCount || 0) - 1) }));
      } else {
        await socialApi.followUser(userId);
        setIsFollowingUser(true);
        setFollowCounts((c: any) => ({ ...c, followerCount: (c.followerCount || 0) + 1 }));
      }
    } catch {
      // silently fail
    } finally {
      setFollowLoading(false);
    }
  };

  if (loading) {
    return (
      <main className="flex-1">
        <Spinner className="py-24" />
      </main>
    );
  }

  return (
    <main className="flex-1">
      <div className="max-w-[720px] mx-auto px-5 py-8">
        {/* Profile Header */}
        <div className="bg-white/10 backdrop-blur rounded-xl p-6 mb-6">
          <div className="flex items-start gap-4">
            <div className="w-16 h-16 rounded-full bg-hirovo-blue/30 flex items-center justify-center text-2xl text-white font-bold flex-shrink-0">
              {(posts[0]?.authorName || posts[0]?.displayName || userId).charAt(0).toUpperCase()}
            </div>
            <div className="flex-1 min-w-0">
              <h1 className="text-xl font-bold text-white">
                {posts[0]?.authorName || posts[0]?.displayName || t("userProfile")}
              </h1>
              {posts[0]?.skills && (
                <div className="flex flex-wrap gap-1.5 mt-2">
                  {(Array.isArray(posts[0].skills) ? posts[0].skills : []).map((skill: any, i: number) => (
                    <span
                      key={i}
                      className="px-2 py-0.5 rounded-full bg-hirovo-blue/20 text-hirovo-blue text-xs font-medium"
                    >
                      {typeof skill === "string" ? skill : skill.name || skill.skillName}
                    </span>
                  ))}
                </div>
              )}

              <div className="flex items-center gap-4 mt-3">
                <button
                  onClick={() => setActiveTab("followers")}
                  className="text-sm text-white/70 hover:text-white transition-colors"
                >
                  <span className="font-semibold text-white">{followCounts.followerCount || 0}</span>{" "}
                  {t("followers")}
                </button>
                <button
                  onClick={() => setActiveTab("following")}
                  className="text-sm text-white/70 hover:text-white transition-colors"
                >
                  <span className="font-semibold text-white">{followCounts.followingCount || 0}</span>{" "}
                  {t("following")}
                </button>
              </div>
            </div>

            {isAuthenticated && !isOwnProfile && (
              <button
                onClick={handleFollow}
                disabled={followLoading}
                className={`px-5 py-2 rounded-lg text-sm font-semibold transition-all ${
                  isFollowingUser
                    ? "bg-white/10 text-white hover:bg-red-500/20 hover:text-red-400"
                    : "btn-gradient text-white shadow-btn hover:shadow-btn-hover"
                } disabled:opacity-50`}
              >
                {isFollowingUser ? t("unfollow") : t("follow")}
              </button>
            )}
          </div>
        </div>

        {/* Tabs */}
        <div className="flex gap-1 bg-white/10 backdrop-blur rounded-xl p-1 mb-6">
          {(["posts", "followers", "following"] as ProfileTab[]).map((tab) => (
            <button
              key={tab}
              onClick={() => setActiveTab(tab)}
              className={`flex-1 py-2.5 rounded-lg text-sm font-medium transition-all ${
                activeTab === tab
                  ? "bg-white text-text shadow-sm"
                  : "text-white/70 hover:text-white"
              }`}
            >
              {t(tab)}
            </button>
          ))}
        </div>

        {/* Tab Content */}
        {activeTab === "posts" && (
          posts.length === 0 ? (
            <EmptyState title={t("noPosts")} subtitle={t("noPostsSubtitle")} />
          ) : (
            <div className="space-y-4">
              {posts.map((post) => (
                <div key={post.id} className="bg-white/10 backdrop-blur rounded-xl p-5">
                  <p className="text-white/90 text-sm leading-relaxed whitespace-pre-wrap mb-2">
                    {post.content}
                  </p>
                  {post.imageUrls && post.imageUrls.length > 0 && (
                    <div className={`grid gap-2 mb-2 ${post.imageUrls.length === 1 ? "grid-cols-1" : "grid-cols-2"}`}>
                      {post.imageUrls.map((url: string, i: number) => (
                        <img key={i} src={url} alt="" className="w-full h-48 object-cover rounded-lg" loading="lazy" />
                      ))}
                    </div>
                  )}
                  <div className="flex items-center gap-4 text-xs text-white/50 pt-2 border-t border-white/10">
                    <span>{post.likeCount || 0} {t("likes")}</span>
                    <span>{post.commentCount || 0} {t("commentsLabel")}</span>
                    <span className="ml-auto">
                      {post.createdAt ? new Date(post.createdAt).toLocaleDateString() : ""}
                    </span>
                  </div>
                </div>
              ))}
            </div>
          )
        )}

        {activeTab === "followers" && (
          <UserList users={followers} t={t} emptyTitle={t("noFollowers")} />
        )}

        {activeTab === "following" && (
          <UserList users={following} t={t} emptyTitle={t("noFollowing")} />
        )}
      </div>
    </main>
  );
}

function UserList({
  users,
  t,
  emptyTitle,
}: {
  users: any[];
  t: (key: string) => string;
  emptyTitle: string;
}) {
  if (users.length === 0) {
    return <EmptyState title={emptyTitle} />;
  }

  return (
    <div className="space-y-2">
      {users.map((user) => (
        <Link
          key={user.id || user.userId || user.followerId}
          href={`/users/${user.id || user.userId || user.followerId}`}
          className="flex items-center gap-3 bg-white/10 backdrop-blur rounded-xl p-4 hover:bg-white/15 transition-colors"
        >
          <div className="w-10 h-10 rounded-full bg-hirovo-blue/30 flex items-center justify-center text-white font-semibold text-sm flex-shrink-0">
            {(user.displayName || user.fullName || user.userName || "?").charAt(0).toUpperCase()}
          </div>
          <div className="flex-1 min-w-0">
            <p className="text-sm font-semibold text-white truncate">
              {user.displayName || user.fullName || user.userName || t("unknownUser")}
            </p>
            {user.email && (
              <p className="text-xs text-white/50 truncate">{user.email}</p>
            )}
          </div>
        </Link>
      ))}
    </div>
  );
}

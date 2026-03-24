"use client";

import { useState, useEffect, useRef, useCallback } from "react";
import { useTranslations } from "next-intl";
import { useAuth } from "@/lib/auth/AuthContext";
import { socialApi } from "@/lib/api";
import { Link } from "@/i18n/routing";

interface SearchResult {
  userId: string;
  displayName: string;
  photoUrl: string;
  title: string;
  isFollowing: boolean;
}

export default function SearchClient() {
  const t = useTranslations("search");
  const { isAuthenticated } = useAuth();
  const [query, setQuery] = useState("");
  const [results, setResults] = useState<SearchResult[]>([]);
  const [loading, setLoading] = useState(false);
  const [searched, setSearched] = useState(false);
  const [followingMap, setFollowingMap] = useState<Record<string, boolean>>({});
  const debounceRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  const doSearch = useCallback(async (searchQuery: string) => {
    if (!searchQuery.trim()) {
      setResults([]);
      setSearched(false);
      return;
    }
    setLoading(true);
    setSearched(true);
    try {
      const data = await socialApi.searchUsers(searchQuery.trim());
      const items = data || [];
      setResults(items);
      const map: Record<string, boolean> = {};
      items.forEach((u: SearchResult) => {
        map[u.userId] = u.isFollowing;
      });
      setFollowingMap(map);
    } catch {
      setResults([]);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    if (debounceRef.current) clearTimeout(debounceRef.current);
    debounceRef.current = setTimeout(() => {
      doSearch(query);
    }, 400);
    return () => {
      if (debounceRef.current) clearTimeout(debounceRef.current);
    };
  }, [query, doSearch]);

  const handleFollow = async (userId: string) => {
    if (!isAuthenticated) return;
    const isCurrentlyFollowing = followingMap[userId];
    try {
      if (isCurrentlyFollowing) {
        await socialApi.unfollowUser(userId);
      } else {
        await socialApi.followUser(userId);
      }
      setFollowingMap((prev) => ({ ...prev, [userId]: !isCurrentlyFollowing }));
    } catch {
      // silent
    }
  };

  return (
    <div className="max-w-[700px] mx-auto px-5 py-6">
      <h1 className="text-2xl font-bold text-text mb-6">{t("title")}</h1>

      {/* Search input */}
      <div className="relative mb-6">
        <svg
          className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-muted"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
        </svg>
        <input
          type="text"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          placeholder={t("placeholder")}
          className="w-full pl-12 pr-4 py-3 rounded-xl border border-border bg-white text-sm focus:outline-none focus:border-hirovo-blue transition-colors shadow-card"
          autoFocus
        />
        {query && (
          <button
            onClick={() => setQuery("")}
            className="absolute right-4 top-1/2 -translate-y-1/2 text-muted hover:text-text transition-colors"
          >
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        )}
      </div>

      {/* Results */}
      <div className="bg-white rounded-2xl shadow-card border border-border overflow-hidden">
        {loading ? (
          <div className="p-8 text-center text-muted">{t("searching")}</div>
        ) : !searched ? (
          <div className="p-12 text-center">
            <svg className="w-16 h-16 mx-auto mb-4 text-border" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
            </svg>
            <p className="text-muted text-sm">{t("startSearching")}</p>
          </div>
        ) : results.length === 0 ? (
          <div className="p-12 text-center">
            <svg className="w-16 h-16 mx-auto mb-4 text-border" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9.172 16.172a4 4 0 015.656 0M9 10h.01M15 10h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
            <p className="text-muted text-sm">{t("noResults")}</p>
          </div>
        ) : (
          results.map((user) => (
            <div
              key={user.userId}
              className="flex items-center gap-3 px-4 py-3.5 border-b border-border/50 hover:bg-card transition-colors"
            >
              {/* Avatar */}
              <Link href={`/users/${user.userId}`} className="flex-shrink-0">
                {user.photoUrl ? (
                  <img
                    src={user.photoUrl}
                    alt={user.displayName}
                    className="w-12 h-12 rounded-full object-cover"
                  />
                ) : (
                  <div className="w-12 h-12 rounded-full bg-hirovo-blue/10 flex items-center justify-center text-hirovo-blue font-semibold text-lg">
                    {user.displayName?.charAt(0)?.toUpperCase() || "?"}
                  </div>
                )}
              </Link>

              {/* Info */}
              <Link href={`/users/${user.userId}`} className="flex-1 min-w-0">
                <p className="font-medium text-sm text-text truncate">{user.displayName}</p>
                {user.title && (
                  <p className="text-xs text-muted truncate mt-0.5">{user.title}</p>
                )}
              </Link>

              {/* Follow button */}
              {isAuthenticated && (
                <button
                  onClick={() => handleFollow(user.userId)}
                  className={`flex-shrink-0 px-4 py-1.5 rounded-lg text-xs font-medium transition-colors ${
                    followingMap[user.userId]
                      ? "bg-card text-text border border-border hover:bg-red-50 hover:text-red-600 hover:border-red-200"
                      : "bg-hirovo-blue text-white hover:bg-hirovo-blue/90"
                  }`}
                >
                  {followingMap[user.userId] ? t("following") : t("follow")}
                </button>
              )}
            </div>
          ))
        )}
      </div>
    </div>
  );
}

"use client";

import { useState, useEffect, useCallback } from "react";
import { useTranslations } from "next-intl";
import { socialApi } from "@/lib/api";
import { useAuth } from "@/lib/auth/AuthContext";
import { Link } from "@/i18n/routing";
import Spinner from "@/app/components/ui/Spinner";
import EmptyState from "@/app/components/ui/EmptyState";

type Tab = "feed" | "trending" | "popular";

export default function SocialFeedClient() {
  const t = useTranslations("social");
  const { user, isAuthenticated } = useAuth();

  const [activeTab, setActiveTab] = useState<Tab>("feed");
  const [posts, setPosts] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [page, setPage] = useState(1);

  // Create post form
  const [newPostContent, setNewPostContent] = useState("");
  const [newPostImages, setNewPostImages] = useState<string[]>([]);
  const [posting, setPosting] = useState(false);

  const fetchPosts = useCallback(async () => {
    setLoading(true);
    try {
      let result: any[];
      switch (activeTab) {
        case "trending":
          result = await socialApi.getTrending();
          break;
        case "popular":
          result = await socialApi.getPopular();
          break;
        default:
          result = await socialApi.getFeed(page);
          break;
      }
      setPosts(result || []);
    } catch {
      setPosts([]);
    } finally {
      setLoading(false);
    }
  }, [activeTab, page]);

  useEffect(() => {
    fetchPosts();
  }, [fetchPosts]);

  const handleCreatePost = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!newPostContent.trim()) return;
    setPosting(true);
    try {
      await socialApi.createPost(newPostContent, newPostImages);
      setNewPostContent("");
      setNewPostImages([]);
      fetchPosts();
    } catch {
      // silently fail
    } finally {
      setPosting(false);
    }
  };

  const handleTabChange = (tab: Tab) => {
    setActiveTab(tab);
    setPage(1);
  };

  return (
    <main className="flex-1">
      <div className="max-w-[720px] mx-auto px-5 py-8">
        <div className="mb-8">
          <h1 className="text-3xl font-bold mb-2">{t("title")}</h1>
          <p className="text-white/70">{t("subtitle")}</p>
        </div>

        {/* Create Post */}
        {isAuthenticated && (
          <div className="bg-white/10 backdrop-blur rounded-xl p-4 mb-6">
            <form onSubmit={handleCreatePost}>
              <textarea
                value={newPostContent}
                onChange={(e) => setNewPostContent(e.target.value)}
                placeholder={t("createPostPlaceholder")}
                rows={3}
                className="w-full px-4 py-3 rounded-lg bg-white text-text placeholder:text-muted outline-none focus:ring-2 focus:ring-hirovo-blue resize-none"
              />
              <div className="flex items-center justify-between mt-3">
                <div className="text-sm text-white/50">
                  {newPostContent.length > 0 && `${newPostContent.length} / 2000`}
                </div>
                <button
                  type="submit"
                  disabled={posting || !newPostContent.trim()}
                  className="px-6 py-2.5 rounded-lg font-semibold text-sm text-white btn-gradient shadow-btn hover:shadow-btn-hover transition-all disabled:opacity-50"
                >
                  {posting ? t("posting") : t("post")}
                </button>
              </div>
            </form>
          </div>
        )}

        {/* Tabs */}
        <div className="flex gap-1 bg-white/10 backdrop-blur rounded-xl p-1 mb-6">
          {(["feed", "trending", "popular"] as Tab[]).map((tab) => (
            <button
              key={tab}
              onClick={() => handleTabChange(tab)}
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

        {/* Posts */}
        {loading ? (
          <Spinner className="py-16" />
        ) : posts.length === 0 ? (
          <EmptyState title={t("noPosts")} subtitle={t("noPostsSubtitle")} />
        ) : (
          <div className="space-y-4">
            {posts.map((post) => (
              <PostCard
                key={post.id}
                post={post}
                currentUserId={user?.id}
                onRefresh={fetchPosts}
                t={t}
              />
            ))}

            {/* Pagination for feed tab */}
            {activeTab === "feed" && (
              <div className="flex items-center justify-center gap-3 mt-8">
                <button
                  onClick={() => setPage((p) => Math.max(1, p - 1))}
                  disabled={page === 1}
                  className="px-4 py-2 rounded-lg bg-white/10 text-white text-sm disabled:opacity-30 hover:bg-white/20 transition-colors"
                >
                  {t("prev")}
                </button>
                <span className="text-sm text-white/70">
                  {t("pageLabel")} {page}
                </span>
                <button
                  onClick={() => setPage((p) => p + 1)}
                  disabled={posts.length < 20}
                  className="px-4 py-2 rounded-lg bg-white/10 text-white text-sm disabled:opacity-30 hover:bg-white/20 transition-colors"
                >
                  {t("next")}
                </button>
              </div>
            )}
          </div>
        )}
      </div>
    </main>
  );
}

// ── Post Card ──

function PostCard({
  post,
  currentUserId,
  onRefresh,
  t,
}: {
  post: any;
  currentUserId?: string;
  onRefresh: () => void;
  t: (key: string) => string;
}) {
  const [liked, setLiked] = useState(post.isLikedByCurrentUser || false);
  const [likeCount, setLikeCount] = useState(post.likeCount || 0);
  const [showComments, setShowComments] = useState(false);
  const [commentText, setCommentText] = useState("");
  const [commenting, setCommenting] = useState(false);
  const [comments, setComments] = useState<any[]>(post.comments || []);

  const handleLike = async () => {
    try {
      if (liked) {
        await socialApi.unlikePost(post.id);
        setLikeCount((c: number) => Math.max(0, c - 1));
      } else {
        await socialApi.likePost(post.id);
        setLikeCount((c: number) => c + 1);
      }
      setLiked(!liked);
    } catch {
      // revert on error
    }
  };

  const handleComment = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!commentText.trim()) return;
    setCommenting(true);
    try {
      const result = await socialApi.commentOnPost(post.id, commentText);
      setComments((prev) => [...prev, result || { content: commentText, createdAt: new Date().toISOString() }]);
      setCommentText("");
    } catch {
      // silently fail
    } finally {
      setCommenting(false);
    }
  };

  const handleRepost = async () => {
    try {
      await socialApi.repostPost(post.id);
      onRefresh();
    } catch {
      // silently fail
    }
  };

  const handleDelete = async () => {
    try {
      await socialApi.deletePost(post.id);
      onRefresh();
    } catch {
      // silently fail
    }
  };

  return (
    <div className="bg-white/10 backdrop-blur rounded-xl p-5">
      {/* Author */}
      <div className="flex items-center gap-3 mb-3">
        <Link href={`/users/${post.authorId || post.userId}`}>
          <div className="w-10 h-10 rounded-full bg-hirovo-blue/30 flex items-center justify-center text-white font-semibold text-sm">
            {(post.authorName || post.displayName || "?").charAt(0).toUpperCase()}
          </div>
        </Link>
        <div className="flex-1 min-w-0">
          <Link
            href={`/users/${post.authorId || post.userId}`}
            className="text-sm font-semibold text-white hover:underline"
          >
            {post.authorName || post.displayName || t("unknownUser")}
          </Link>
          <p className="text-xs text-white/50">
            {post.createdAt ? new Date(post.createdAt).toLocaleDateString() : ""}
          </p>
        </div>
        {currentUserId && (post.authorId === currentUserId || post.userId === currentUserId) && (
          <button
            onClick={handleDelete}
            className="text-white/40 hover:text-red-400 transition-colors"
            title={t("delete")}
          >
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
            </svg>
          </button>
        )}
      </div>

      {/* Repost indicator */}
      {post.originalPostId && (
        <div className="flex items-center gap-1 text-xs text-white/50 mb-2">
          <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
          </svg>
          {t("reposted")}
        </div>
      )}

      {/* Content */}
      <p className="text-white/90 text-sm leading-relaxed whitespace-pre-wrap mb-3">
        {post.content}
      </p>

      {/* Images */}
      {post.imageUrls && post.imageUrls.length > 0 && (
        <div className={`grid gap-2 mb-3 ${
          post.imageUrls.length === 1
            ? "grid-cols-1"
            : post.imageUrls.length === 2
            ? "grid-cols-2"
            : "grid-cols-2"
        }`}>
          {post.imageUrls.map((url: string, i: number) => (
            <img
              key={i}
              src={url}
              alt=""
              className="w-full h-48 object-cover rounded-lg"
              loading="lazy"
            />
          ))}
        </div>
      )}

      {/* Actions */}
      <div className="flex items-center gap-6 pt-3 border-t border-white/10">
        <button
          onClick={handleLike}
          className={`flex items-center gap-1.5 text-sm transition-colors ${
            liked ? "text-red-400" : "text-white/60 hover:text-red-400"
          }`}
        >
          <svg className="w-5 h-5" fill={liked ? "currentColor" : "none"} stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
          </svg>
          {likeCount > 0 && likeCount}
        </button>

        <button
          onClick={() => setShowComments(!showComments)}
          className="flex items-center gap-1.5 text-sm text-white/60 hover:text-hirovo-blue transition-colors"
        >
          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" />
          </svg>
          {(post.commentCount || comments.length) > 0 && (post.commentCount || comments.length)}
        </button>

        <button
          onClick={handleRepost}
          className="flex items-center gap-1.5 text-sm text-white/60 hover:text-green-400 transition-colors"
        >
          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
          </svg>
          {post.repostCount > 0 && post.repostCount}
        </button>
      </div>

      {/* Comments Section */}
      {showComments && (
        <div className="mt-4 pt-3 border-t border-white/10 space-y-3">
          {comments.map((comment: any, idx: number) => (
            <div key={comment.id || idx} className="flex gap-2">
              <div className="w-7 h-7 rounded-full bg-white/10 flex items-center justify-center text-xs text-white font-medium flex-shrink-0">
                {(comment.authorName || "?").charAt(0).toUpperCase()}
              </div>
              <div className="flex-1 min-w-0">
                <span className="text-xs font-semibold text-white">
                  {comment.authorName || t("unknownUser")}
                </span>
                <p className="text-sm text-white/80 mt-0.5">{comment.content}</p>
              </div>
            </div>
          ))}

          <form onSubmit={handleComment} className="flex gap-2">
            <input
              type="text"
              value={commentText}
              onChange={(e) => setCommentText(e.target.value)}
              placeholder={t("commentPlaceholder")}
              className="flex-1 px-3 py-2 rounded-lg bg-white/10 text-white text-sm placeholder:text-white/40 outline-none focus:ring-1 focus:ring-hirovo-blue"
            />
            <button
              type="submit"
              disabled={commenting || !commentText.trim()}
              className="px-4 py-2 rounded-lg text-sm font-medium text-white bg-hirovo-blue hover:bg-hirovo-blue/80 transition-colors disabled:opacity-50"
            >
              {t("send")}
            </button>
          </form>
        </div>
      )}
    </div>
  );
}

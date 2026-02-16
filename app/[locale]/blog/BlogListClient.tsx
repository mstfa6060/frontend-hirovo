"use client";

import { useState, useEffect, useCallback } from "react";
import { useTranslations } from "next-intl";
import { wpApi } from "@/lib/api";
import type { WPPost, WPCategory } from "@/lib/api/services/wordpress";
import BlogCard from "./components/BlogCard";
import Spinner from "@/app/components/ui/Spinner";
import EmptyState from "@/app/components/ui/EmptyState";

export default function BlogListClient({ locale }: { locale: string }) {
  const t = useTranslations("blog");

  const [posts, setPosts] = useState<WPPost[]>([]);
  const [categories, setCategories] = useState<WPCategory[]>([]);
  const [selectedCategory, setSelectedCategory] = useState<number | null>(null);
  const [loading, setLoading] = useState(true);
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);

  const fetchPosts = useCallback(async () => {
    setLoading(true);
    try {
      const result = await wpApi.getBlogPosts({
        page,
        pageSize: 12,
        category: selectedCategory || undefined,
        locale,
      });
      setPosts(result.posts || []);
      setTotalPages(result.totalPages || 1);
    } catch {
      setPosts([]);
    } finally {
      setLoading(false);
    }
  }, [page, selectedCategory, locale]);

  useEffect(() => {
    fetchPosts();
  }, [fetchPosts]);

  useEffect(() => {
    async function fetchCategories() {
      try {
        const cats = await wpApi.getCategories(locale);
        setCategories(cats || []);
      } catch {
        setCategories([]);
      }
    }
    fetchCategories();
  }, [locale]);

  return (
    <main className="flex-1">
      <div className="max-w-[1120px] mx-auto px-5 py-8">
        <div className="mb-8">
          <h1 className="text-3xl font-bold mb-2">{t("title")}</h1>
          <p className="text-white/70">{t("subtitle")}</p>
        </div>

        {/* Category Filter */}
        {categories.length > 0 && (
          <div className="flex flex-wrap gap-2 mb-6">
            <button
              onClick={() => {
                setSelectedCategory(null);
                setPage(1);
              }}
              className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
                selectedCategory === null
                  ? "bg-white text-text"
                  : "bg-white/10 text-white hover:bg-white/20"
              }`}
            >
              {t("allCategories")}
            </button>
            {categories.map((cat) => (
              <button
                key={cat.id}
                onClick={() => {
                  setSelectedCategory(cat.id);
                  setPage(1);
                }}
                className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
                  selectedCategory === cat.id
                    ? "bg-white text-text"
                    : "bg-white/10 text-white hover:bg-white/20"
                }`}
              >
                {cat.name}
              </button>
            ))}
          </div>
        )}

        {/* Posts Grid */}
        {loading ? (
          <Spinner className="py-16" />
        ) : posts.length === 0 ? (
          <EmptyState title={t("noPosts")} />
        ) : (
          <>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {posts.map((post) => (
                <BlogCard key={post.id} post={post} locale={locale} />
              ))}
            </div>

            {/* Pagination */}
            {totalPages > 1 && (
              <div className="flex items-center justify-center gap-3 mt-8">
                <button
                  onClick={() => setPage((p) => Math.max(1, p - 1))}
                  disabled={page === 1}
                  className="px-4 py-2 rounded-lg bg-white/10 text-white text-sm disabled:opacity-30 hover:bg-white/20 transition-colors"
                >
                  &larr;
                </button>
                <span className="text-sm text-white/70">
                  {page} / {totalPages}
                </span>
                <button
                  onClick={() => setPage((p) => Math.min(totalPages, p + 1))}
                  disabled={page >= totalPages}
                  className="px-4 py-2 rounded-lg bg-white/10 text-white text-sm disabled:opacity-30 hover:bg-white/20 transition-colors"
                >
                  &rarr;
                </button>
              </div>
            )}
          </>
        )}
      </div>
    </main>
  );
}

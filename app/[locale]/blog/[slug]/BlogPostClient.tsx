"use client";

import { useState, useEffect } from "react";
import { useTranslations } from "next-intl";
import { Link } from "@/i18n/routing";
import Image from "next/image";
import { strapiApi } from "@/lib/api";
import type { BlogPost } from "@/lib/api/services/strapi";
import { API_CONFIG } from "@/lib/api/config";
import Badge from "@/app/components/ui/Badge";
import Spinner from "@/app/components/ui/Spinner";

export default function BlogPostClient({
  locale,
  slug,
}: {
  locale: string;
  slug: string;
}) {
  const t = useTranslations("blog");
  const [post, setPost] = useState<BlogPost | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetch() {
      try {
        const result = await strapiApi.getBlogPost(slug, locale);
        setPost(result);
      } catch {
        setPost(null);
      } finally {
        setLoading(false);
      }
    }
    fetch();
  }, [slug, locale]);

  if (loading) return <Spinner className="py-32" />;

  if (!post) {
    return (
      <main className="flex-1">
        <div className="max-w-[800px] mx-auto px-5 py-16 text-center">
          <p className="text-white/60 mb-4">Post not found</p>
          <Link href="/blog" className="text-hirovo-tealLight hover:underline">
            {t("backToBlog")}
          </Link>
        </div>
      </main>
    );
  }

  const publishedDate = new Date(post.publishedAt).toLocaleDateString(locale, {
    day: "numeric",
    month: "long",
    year: "numeric",
  });

  const imageUrl = post.coverImage?.url
    ? post.coverImage.url.startsWith("http")
      ? post.coverImage.url
      : `${API_CONFIG.STRAPI_URL}${post.coverImage.url}`
    : null;

  // Render Strapi blocks content as simple text/HTML
  const renderContent = () => {
    if (!post.content || !Array.isArray(post.content)) {
      return <p className="text-muted">-</p>;
    }

    return (post.content as Array<Record<string, unknown>>).map((block, index) => {
      const blockType = block.type as string;
      const children = block.children as Array<Record<string, unknown>> | undefined;

      if (blockType === "paragraph" && children) {
        const text = children.map((c) => c.text || "").join("");
        return (
          <p key={index} className="mb-4 text-text leading-relaxed">
            {text}
          </p>
        );
      }

      if (blockType === "heading" && children) {
        const text = children.map((c) => c.text || "").join("");
        const level = (block.level as number) || 2;
        const Tag = `h${level}` as keyof JSX.IntrinsicElements;
        return (
          <Tag key={index} className="font-bold text-text mt-6 mb-3">
            {text}
          </Tag>
        );
      }

      if (blockType === "list" && children) {
        const items = children as Array<Record<string, unknown>>;
        return (
          <ul key={index} className="list-disc pl-6 mb-4 space-y-1 text-text">
            {items.map((item, i) => {
              const itemChildren = item.children as Array<Record<string, unknown>> | undefined;
              const text = itemChildren?.map((c) => c.text || "").join("") || "";
              return <li key={i}>{text}</li>;
            })}
          </ul>
        );
      }

      if (blockType === "image") {
        const imgData = block.image as Record<string, unknown> | undefined;
        if (imgData) {
          const imgUrl = (imgData.url as string) || "";
          const fullUrl = imgUrl.startsWith("http")
            ? imgUrl
            : `${API_CONFIG.STRAPI_URL}${imgUrl}`;
          return (
            <div key={index} className="my-6 rounded-lg overflow-hidden">
              <Image
                src={fullUrl}
                alt={(imgData.alternativeText as string) || ""}
                width={(imgData.width as number) || 800}
                height={(imgData.height as number) || 400}
                className="w-full h-auto"
              />
            </div>
          );
        }
      }

      return null;
    });
  };

  return (
    <main className="flex-1">
      <article className="max-w-[800px] mx-auto px-5 py-8">
        <Link
          href="/blog"
          className="inline-flex items-center text-sm text-white/70 hover:text-white mb-6 transition-colors"
        >
          &larr; {t("backToBlog")}
        </Link>

        <div className="bg-white rounded-2xl shadow-card overflow-hidden">
          {imageUrl && (
            <div className="relative h-64 md:h-80">
              <Image
                src={imageUrl}
                alt={post.coverImage?.alternativeText || post.title}
                fill
                className="object-cover"
                priority
              />
            </div>
          )}

          <div className="p-6 md:p-8">
            <div className="flex flex-wrap items-center gap-3 mb-4">
              {post.category && (
                <Badge variant="primary">{post.category.name}</Badge>
              )}
              <span className="text-xs text-muted">{publishedDate}</span>
              {post.author && (
                <span className="text-xs text-muted">
                  {t("author")}: {post.author}
                </span>
              )}
            </div>

            <h1 className="text-2xl md:text-3xl font-bold text-text mb-6">
              {post.title}
            </h1>

            <div className="prose prose-sm max-w-none">{renderContent()}</div>
          </div>
        </div>
      </article>
    </main>
  );
}

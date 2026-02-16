"use client";

import { useTranslations } from "next-intl";
import { Link } from "@/i18n/routing";
import Image from "next/image";
import type { WPPost } from "@/lib/api/services/wordpress";
import {
  getPostImageUrl,
  getPostImageAlt,
  getPostCategory,
  sanitizeHtml,
  decodeHtmlEntities,
} from "@/lib/api/services/wordpress";
import Badge from "@/app/components/ui/Badge";

export default function BlogPostClient({
  locale,
  slug,
  post,
}: {
  locale: string;
  slug: string;
  post: WPPost | null;
}) {
  const t = useTranslations("blog");

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

  const publishedDate = new Date(post.date).toLocaleDateString(locale, {
    day: "numeric",
    month: "long",
    year: "numeric",
  });

  const imageUrl = getPostImageUrl(post);
  const imageAlt = getPostImageAlt(post);
  const category = getPostCategory(post);

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
                alt={imageAlt}
                fill
                className="object-cover"
                priority
              />
            </div>
          )}

          <div className="p-6 md:p-8">
            <div className="flex flex-wrap items-center gap-3 mb-4">
              {category && (
                <Badge variant="primary">{category.name}</Badge>
              )}
              <span className="text-xs text-muted">{publishedDate}</span>
            </div>

            <h1 className="text-2xl md:text-3xl font-bold text-text mb-6">
              {decodeHtmlEntities(post.title.rendered)}
            </h1>

            <div
              className="prose prose-sm max-w-none text-text"
              dangerouslySetInnerHTML={{ __html: sanitizeHtml(post.content.rendered) }}
            />
          </div>
        </div>
      </article>
    </main>
  );
}

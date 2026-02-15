"use client";

import { useTranslations } from "next-intl";
import { Link } from "@/i18n/routing";
import Image from "next/image";
import type { BlogPost } from "@/lib/api/services/strapi";
import { API_CONFIG } from "@/lib/api/config";
import Badge from "@/app/components/ui/Badge";

export default function BlogCard({ post, locale }: { post: BlogPost; locale: string }) {
  const t = useTranslations("blog");

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

  return (
    <Link
      href={`/blog/${post.slug}`}
      className="block bg-white rounded-xl shadow-card overflow-hidden group hover:shadow-lg transition-shadow"
    >
      {imageUrl && (
        <div className="relative h-48 bg-card">
          <Image
            src={imageUrl}
            alt={post.coverImage?.alternativeText || post.title}
            fill
            className="object-cover group-hover:scale-105 transition-transform duration-300"
          />
        </div>
      )}
      <div className="p-5">
        {post.category && (
          <Badge variant="primary" className="mb-2">
            {post.category.name}
          </Badge>
        )}
        <h3 className="text-base font-semibold text-text group-hover:text-hirovo-blue transition-colors mb-2 line-clamp-2">
          {post.title}
        </h3>
        {post.excerpt && (
          <p className="text-sm text-muted line-clamp-2 mb-3">{post.excerpt}</p>
        )}
        <div className="flex items-center justify-between text-xs text-muted">
          <span>{publishedDate}</span>
          <span className="text-hirovo-blue font-medium">
            {t("readMore")} &rarr;
          </span>
        </div>
      </div>
    </Link>
  );
}

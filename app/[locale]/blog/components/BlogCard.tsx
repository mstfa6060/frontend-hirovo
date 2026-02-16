"use client";

import { useTranslations } from "next-intl";
import { Link } from "@/i18n/routing";
import Image from "next/image";
import type { WPPost } from "@/lib/api/services/wordpress";
import { getPostImageUrl, getPostImageAlt, getPostCategory, stripHtml, decodeHtmlEntities } from "@/lib/api/services/wordpress";
import Badge from "@/app/components/ui/Badge";

export default function BlogCard({ post, locale }: { post: WPPost; locale: string }) {
  const t = useTranslations("blog");

  const publishedDate = new Date(post.date).toLocaleDateString(locale, {
    day: "numeric",
    month: "long",
    year: "numeric",
  });

  const imageUrl = getPostImageUrl(post);
  const imageAlt = getPostImageAlt(post);
  const category = getPostCategory(post);
  const excerpt = stripHtml(post.excerpt.rendered);

  return (
    <Link
      href={`/blog/${post.slug}`}
      className="block bg-white rounded-xl shadow-card overflow-hidden group hover:shadow-lg transition-shadow"
    >
      {imageUrl && (
        <div className="relative h-48 bg-card">
          <Image
            src={imageUrl}
            alt={imageAlt}
            fill
            className="object-cover group-hover:scale-105 transition-transform duration-300"
          />
        </div>
      )}
      <div className="p-5">
        {category && (
          <Badge variant="primary" className="mb-2">
            {category.name}
          </Badge>
        )}
        <h3 className="text-base font-semibold text-text group-hover:text-hirovo-blue transition-colors mb-2 line-clamp-2">
          {decodeHtmlEntities(post.title.rendered)}
        </h3>
        {excerpt && (
          <p className="text-sm text-muted line-clamp-2 mb-3">{excerpt}</p>
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

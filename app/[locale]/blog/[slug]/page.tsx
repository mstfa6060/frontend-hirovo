import { setRequestLocale, getTranslations } from "next-intl/server";
import type { Metadata } from "next";
import { wpApi } from "@/lib/api";
import { stripHtml } from "@/lib/api/services/wordpress";
import BlogPostClient from "./BlogPostClient";

export const revalidate = 300; // 5 minutes

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string; slug: string }>;
}): Promise<Metadata> {
  const { locale, slug } = await params;
  const t = await getTranslations({ locale, namespace: "blog" });

  try {
    const post = await wpApi.getBlogPost(slug, locale);
    if (post) {
      const title = stripHtml(post.title.rendered);
      const description = stripHtml(post.excerpt.rendered).slice(0, 160);
      return {
        title: `${title} | Hirovo`,
        description,
        openGraph: {
          title,
          description,
          type: "article",
          publishedTime: post.date,
        },
      };
    }
  } catch {
    // fallback
  }

  return {
    title: `${t("title")} | Hirovo`,
    description: t("subtitle"),
  };
}

export default async function BlogPostPage({
  params,
}: {
  params: Promise<{ locale: string; slug: string }>;
}) {
  const { locale, slug } = await params;
  setRequestLocale(locale);

  let post = null;
  try {
    post = await wpApi.getBlogPost(slug, locale);
  } catch {
    // fallback to null
  }

  return <BlogPostClient locale={locale} slug={slug} post={post} />;
}

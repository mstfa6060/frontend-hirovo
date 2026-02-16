import { setRequestLocale } from "next-intl/server";
import BlogPostClient from "./BlogPostClient";

export const dynamic = "force-dynamic";

export default async function BlogPostPage({
  params,
}: {
  params: Promise<{ locale: string; slug: string }>;
}) {
  const { locale, slug } = await params;
  setRequestLocale(locale);

  return <BlogPostClient locale={locale} slug={slug} />;
}

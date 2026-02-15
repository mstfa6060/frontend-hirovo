import type { MetadataRoute } from "next";
import { locales } from "@/i18n/config";

const BASE_URL = "https://hirovo.com";

const staticPages = [
  "",
  "/about",
  "/contact",
  "/faq",
  "/nasil-calisir",
  "/is-arayanlar",
  "/isverenler",
  "/kariyer-tavsiyeleri",
  "/privacy",
  "/terms",
  "/jobs",
  "/blog",
  "/login",
  "/register",
];

export default function sitemap(): MetadataRoute.Sitemap {
  const entries: MetadataRoute.Sitemap = [];

  for (const locale of locales) {
    for (const page of staticPages) {
      entries.push({
        url: `${BASE_URL}/${locale}${page}`,
        lastModified: new Date(),
        changeFrequency: page === "/jobs" || page === "/blog" ? "daily" : "weekly",
        priority: page === "" ? 1.0 : page === "/jobs" ? 0.9 : 0.7,
      });
    }
  }

  return entries;
}

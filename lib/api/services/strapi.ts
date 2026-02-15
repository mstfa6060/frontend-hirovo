import axios from "axios";
import { API_CONFIG } from "../config";

const strapiClient = axios.create({
  baseURL: API_CONFIG.STRAPI_URL,
  timeout: 10000,
});

export interface BlogPost {
  id: number;
  documentId: string;
  title: string;
  slug: string;
  content: unknown[];
  excerpt: string;
  coverImage?: {
    url: string;
    alternativeText: string;
    width: number;
    height: number;
  };
  category?: BlogCategory;
  tags?: string;
  author?: string;
  publishedAt: string;
  seoTitle?: string;
  seoDescription?: string;
}

export interface BlogCategory {
  id: number;
  documentId: string;
  name: string;
  slug: string;
  description?: string;
}

export async function getBlogPosts(params?: {
  page?: number;
  pageSize?: number;
  category?: string;
  locale?: string;
}): Promise<{ data: BlogPost[]; meta: { pagination: { total: number; pageCount: number } } }> {
  const query: Record<string, unknown> = {
    populate: ["coverImage", "category"],
    sort: "publishedAt:desc",
    "pagination[page]": params?.page || 1,
    "pagination[pageSize]": params?.pageSize || 12,
  };

  if (params?.category) {
    query["filters[category][slug][$eq]"] = params.category;
  }

  if (params?.locale) {
    query.locale = params.locale;
  }

  const response = await strapiClient.get("/api/blog-posts", { params: query });
  return response.data;
}

export async function getBlogPost(slug: string, locale?: string): Promise<BlogPost | null> {
  const query: Record<string, unknown> = {
    populate: ["coverImage", "category"],
    "filters[slug][$eq]": slug,
  };

  if (locale) {
    query.locale = locale;
  }

  const response = await strapiClient.get("/api/blog-posts", { params: query });
  const posts = response.data?.data;
  return posts && posts.length > 0 ? posts[0] : null;
}

export async function getCategories(locale?: string): Promise<BlogCategory[]> {
  const query: Record<string, unknown> = {};
  if (locale) query.locale = locale;

  const response = await strapiClient.get("/api/blog-categories", { params: query });
  return response.data?.data || [];
}

import axios from "axios";
import { API_CONFIG } from "../config";

const wpClient = axios.create({
  baseURL: API_CONFIG.WP_URL,
  timeout: 10000,
});

// ─── WordPress REST API Types ───

export interface WPPost {
  id: number;
  slug: string;
  title: { rendered: string };
  content: { rendered: string };
  excerpt: { rendered: string };
  date: string;
  featured_media: number;
  categories: number[];
  _embedded?: {
    "wp:featuredmedia"?: Array<{
      source_url: string;
      alt_text: string;
    }>;
    "wp:term"?: Array<
      Array<{ id: number; name: string; slug: string }>
    >;
  };
}

export interface WPCategory {
  id: number;
  name: string;
  slug: string;
  count: number;
  description: string;
}

export interface WPPage {
  id: number;
  slug: string;
  title: { rendered: string };
  content: { rendered: string };
  acf?: Record<string, unknown>;
}

export interface WPFAQ {
  id: number;
  slug: string;
  title: { rendered: string };
  content: { rendered: string };
  acf?: {
    question?: string;
    answer?: string;
    category?: string;
  };
}

export interface WPGuide {
  id: number;
  slug: string;
  title: { rendered: string };
  content: { rendered: string };
  excerpt: { rendered: string };
  date: string;
  acf?: Record<string, unknown>;
}

export interface WPCareerTip {
  id: number;
  slug: string;
  title: { rendered: string };
  content: { rendered: string };
  excerpt: { rendered: string };
  date: string;
  acf?: Record<string, unknown>;
}

export interface WPPostsResponse {
  posts: WPPost[];
  total: number;
  totalPages: number;
}

// ─── Blog Functions ───

export async function getBlogPosts(params?: {
  page?: number;
  pageSize?: number;
  category?: number;
  locale?: string;
}): Promise<WPPostsResponse> {
  const query: Record<string, unknown> = {
    _embed: "wp:featuredmedia,wp:term",
    _fields: "id,slug,title,excerpt,date,featured_media,categories,_links,_embedded",
    orderby: "date",
    order: "desc",
    page: params?.page || 1,
    per_page: params?.pageSize || 12,
  };

  if (params?.category) {
    query.categories = params.category;
  }

  if (params?.locale) {
    query.lang = params.locale;
  }

  const response = await wpClient.get("/wp/v2/posts", { params: query });

  return {
    posts: response.data,
    total: parseInt(response.headers["x-wp-total"] || "0", 10),
    totalPages: parseInt(response.headers["x-wp-totalpages"] || "1", 10),
  };
}

export async function getBlogPost(
  slug: string,
  locale?: string
): Promise<WPPost | null> {
  const query: Record<string, unknown> = {
    slug,
    _embed: "wp:featuredmedia,wp:term",
  };

  if (locale) {
    query.lang = locale;
  }

  const response = await wpClient.get("/wp/v2/posts", { params: query });
  const posts = response.data;
  return posts && posts.length > 0 ? posts[0] : null;
}

export async function getCategories(
  locale?: string
): Promise<WPCategory[]> {
  const query: Record<string, unknown> = {
    per_page: 100,
    hide_empty: true,
    _fields: "id,name,slug,count",
  };
  if (locale) query.lang = locale;

  const response = await wpClient.get("/wp/v2/categories", {
    params: query,
  });
  return response.data || [];
}

// ─── Corporate Page Functions ───

export async function getPage(
  slug: string,
  locale?: string
): Promise<WPPage | null> {
  const query: Record<string, unknown> = { slug };
  if (locale) query.lang = locale;

  try {
    const response = await wpClient.get("/wp/v2/pages", { params: query });
    const pages = response.data;
    if (!pages || pages.length === 0) {
      console.warn(`[WP] No page found for slug="${slug}" locale="${locale}"`);
      return null;
    }

    const page = pages[0];

    // If Polylang is configured, it adds a 'lang' field — check it matches
    if (locale && page.lang && page.lang !== locale) {
      console.warn(`[WP] Page slug="${slug}" lang mismatch: page.lang="${page.lang}" !== locale="${locale}"`);
      return null;
    }

    return page;
  } catch (err) {
    console.error(`[WP] getPage("${slug}", "${locale}") failed:`, err instanceof Error ? err.message : err);
    return null;
  }
}

// ─── Custom Post Type Functions ───

export async function getFAQs(locale?: string): Promise<WPFAQ[]> {
  const query: Record<string, unknown> = {
    per_page: 100,
    orderby: "menu_order",
    order: "asc",
  };
  if (locale) query.lang = locale;

  try {
    const response = await wpClient.get("/wp/v2/faq", { params: query });
    return response.data || [];
  } catch {
    return [];
  }
}

export async function getGuides(locale?: string): Promise<WPGuide[]> {
  const query: Record<string, unknown> = {
    per_page: 100,
    _embed: "wp:featuredmedia",
    orderby: "date",
    order: "desc",
  };
  if (locale) query.lang = locale;

  try {
    const response = await wpClient.get("/wp/v2/guide", { params: query });
    return response.data || [];
  } catch {
    return [];
  }
}

export async function getCareerTips(
  locale?: string
): Promise<WPCareerTip[]> {
  const query: Record<string, unknown> = {
    per_page: 100,
    _embed: "wp:featuredmedia",
    orderby: "date",
    order: "desc",
  };
  if (locale) query.lang = locale;

  try {
    const response = await wpClient.get("/wp/v2/career_tip", {
      params: query,
    });
    return response.data || [];
  } catch {
    return [];
  }
}

// ─── Utility Functions ───

/**
 * Sanitize WordPress HTML content to prevent XSS attacks.
 * Uses DOMPurify on both server and client side.
 */
export function sanitizeHtml(html: string): string {
  // Lazy-load DOMPurify to avoid SSR issues
  try {
    const DOMPurify = require("isomorphic-dompurify");
    return DOMPurify.sanitize(html, {
      ADD_TAGS: ["iframe"],
      ADD_ATTR: ["allow", "allowfullscreen", "frameborder", "scrolling", "target"],
    });
  } catch {
    // Fallback: strip script tags at minimum
    return html.replace(/<script\b[^<]*(?:(?!<\/script>)<[^<]*)*<\/script>/gi, "");
  }
}

/**
 * Decode HTML entities in text (e.g., &amp; → &, &#8217; → ')
 */
export function decodeHtmlEntities(html: string): string {
  return html
    .replace(/&amp;/g, "&")
    .replace(/&lt;/g, "<")
    .replace(/&gt;/g, ">")
    .replace(/&quot;/g, '"')
    .replace(/&#039;/g, "'")
    .replace(/&#8217;/g, "\u2019")
    .replace(/&#8216;/g, "\u2018")
    .replace(/&#8220;/g, "\u201C")
    .replace(/&#8221;/g, "\u201D")
    .replace(/&#8211;/g, "\u2013")
    .replace(/&#8212;/g, "\u2014")
    .replace(/&nbsp;/g, " ");
}

export function getPostImageUrl(post: WPPost): string | null {
  const media = post._embedded?.["wp:featuredmedia"];
  if (media && media.length > 0) {
    return media[0].source_url;
  }
  return null;
}

export function getPostImageAlt(post: WPPost): string {
  const media = post._embedded?.["wp:featuredmedia"];
  if (media && media.length > 0) {
    return media[0].alt_text || post.title.rendered;
  }
  return post.title.rendered;
}

export function getPostCategory(
  post: WPPost
): { id: number; name: string; slug: string } | null {
  const terms = post._embedded?.["wp:term"];
  if (terms && terms.length > 0 && terms[0].length > 0) {
    return terms[0][0];
  }
  return null;
}

export function stripHtml(html: string): string {
  const text = html.replace(/<[^>]*>/g, "").trim();
  return decodeHtmlEntities(text);
}

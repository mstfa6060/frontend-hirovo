"use client";

import { useState, useEffect, useCallback } from "react";
import { useTranslations } from "next-intl";
import { useAuth } from "@/lib/auth/AuthContext";
import { notificationsApi } from "@/lib/api";
import { Link } from "@/i18n/routing";

enum NotificationType {
  PostLike = 0,
  PostComment = 1,
  PostRepost = 2,
  NewFollower = 3,
  Mention = 4,
  NewMessage = 5,
  GroupInvite = 6,
  SkillEndorsement = 7,
  JobApplication = 8,
}

interface NotificationActor {
  id: string;
  displayName: string;
  photoUrl: string;
}

interface Notification {
  id: string;
  type: NotificationType;
  title: string;
  body: string;
  referenceId: string | null;
  isRead: boolean;
  readAt: string | null;
  createdAt: string;
  actor: NotificationActor | null;
}

function getNotificationIcon(type: NotificationType): JSX.Element {
  const iconClass = "w-5 h-5";
  switch (type) {
    case NotificationType.PostLike:
      return (
        <svg className={iconClass} fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
        </svg>
      );
    case NotificationType.PostComment:
      return (
        <svg className={iconClass} fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" />
        </svg>
      );
    case NotificationType.PostRepost:
      return (
        <svg className={iconClass} fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
        </svg>
      );
    case NotificationType.NewFollower:
      return (
        <svg className={iconClass} fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M18 9v3m0 0v3m0-3h3m-3 0h-3m-2-5a4 4 0 11-8 0 4 4 0 018 0zM3 20a6 6 0 0112 0v1H3v-1z" />
        </svg>
      );
    case NotificationType.Mention:
      return (
        <svg className={iconClass} fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 12a4 4 0 10-8 0 4 4 0 008 0zm0 0v1.5a2.5 2.5 0 005 0V12a9 9 0 10-9 9m4.5-1.206a8.959 8.959 0 01-4.5 1.207" />
        </svg>
      );
    case NotificationType.NewMessage:
      return (
        <svg className={iconClass} fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
        </svg>
      );
    case NotificationType.GroupInvite:
      return (
        <svg className={iconClass} fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
        </svg>
      );
    case NotificationType.SkillEndorsement:
      return (
        <svg className={iconClass} fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4M7.835 4.697a3.42 3.42 0 001.946-.806 3.42 3.42 0 014.438 0 3.42 3.42 0 001.946.806 3.42 3.42 0 013.138 3.138 3.42 3.42 0 00.806 1.946 3.42 3.42 0 010 4.438 3.42 3.42 0 00-.806 1.946 3.42 3.42 0 01-3.138 3.138 3.42 3.42 0 00-1.946.806 3.42 3.42 0 01-4.438 0 3.42 3.42 0 00-1.946-.806 3.42 3.42 0 01-3.138-3.138 3.42 3.42 0 00-.806-1.946 3.42 3.42 0 010-4.438 3.42 3.42 0 00.806-1.946 3.42 3.42 0 013.138-3.138z" />
        </svg>
      );
    case NotificationType.JobApplication:
      return (
        <svg className={iconClass} fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 13.255A23.931 23.931 0 0112 15c-3.183 0-6.22-.62-9-1.745M16 6V4a2 2 0 00-2-2h-4a2 2 0 00-2 2v2m4 6h.01M5 20h14a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
        </svg>
      );
    default:
      return (
        <svg className={iconClass} fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11a6.002 6.002 0 00-4-5.659V5a2 2 0 10-4 0v.341C7.67 6.165 6 8.388 6 11v3.159c0 .538-.214 1.055-.595 1.436L4 17h5m6 0v1a3 3 0 11-6 0v-1m6 0H9" />
        </svg>
      );
  }
}

function getNotificationColor(type: NotificationType): string {
  switch (type) {
    case NotificationType.PostLike:
      return "text-red-500 bg-red-50";
    case NotificationType.PostComment:
      return "text-blue-500 bg-blue-50";
    case NotificationType.PostRepost:
      return "text-green-500 bg-green-50";
    case NotificationType.NewFollower:
      return "text-purple-500 bg-purple-50";
    case NotificationType.Mention:
      return "text-yellow-600 bg-yellow-50";
    case NotificationType.NewMessage:
      return "text-hirovo-blue bg-hirovo-blue/10";
    case NotificationType.GroupInvite:
      return "text-indigo-500 bg-indigo-50";
    case NotificationType.SkillEndorsement:
      return "text-emerald-500 bg-emerald-50";
    case NotificationType.JobApplication:
      return "text-orange-500 bg-orange-50";
    default:
      return "text-gray-500 bg-gray-50";
  }
}

function getNotificationLink(notification: Notification): string {
  switch (notification.type) {
    case NotificationType.PostLike:
    case NotificationType.PostComment:
    case NotificationType.PostRepost:
    case NotificationType.Mention:
      return notification.referenceId ? `/social/post/${notification.referenceId}` : "/social";
    case NotificationType.NewFollower:
      return notification.actor ? `/users/${notification.actor.id}` : "/social";
    case NotificationType.NewMessage:
      return notification.referenceId ? `/messages/${notification.referenceId}` : "/messages";
    case NotificationType.GroupInvite:
      return notification.referenceId ? `/groups/${notification.referenceId}` : "/groups";
    case NotificationType.SkillEndorsement:
      return "/profile";
    case NotificationType.JobApplication:
      return notification.referenceId ? `/employer/applications` : "/employer/applications";
    default:
      return "/notifications";
  }
}

export default function NotificationsClient() {
  const t = useTranslations("notifications");
  const { isAuthenticated } = useAuth();
  const [notifications, setNotifications] = useState<Notification[]>([]);
  const [loading, setLoading] = useState(true);
  const [page, setPage] = useState(1);
  const [hasMore, setHasMore] = useState(true);
  const [markingAll, setMarkingAll] = useState(false);

  const loadNotifications = useCallback(async (pageNum: number, append = false) => {
    try {
      const data = await notificationsApi.getAllNotifications(pageNum);
      const items = data || [];
      if (append) {
        setNotifications((prev) => [...prev, ...items]);
      } else {
        setNotifications(items);
      }
      setHasMore(items.length >= 20);
    } catch {
      // silent
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    if (isAuthenticated) {
      loadNotifications(1);
    }
  }, [isAuthenticated, loadNotifications]);

  const handleMarkAllRead = async () => {
    setMarkingAll(true);
    try {
      await notificationsApi.markAsRead();
      setNotifications((prev) => prev.map((n) => ({ ...n, isRead: true })));
    } catch {
      // silent
    } finally {
      setMarkingAll(false);
    }
  };

  const handleMarkRead = async (id: string) => {
    try {
      await notificationsApi.markAsRead(id);
      setNotifications((prev) =>
        prev.map((n) => (n.id === id ? { ...n, isRead: true } : n))
      );
    } catch {
      // silent
    }
  };

  const loadMore = () => {
    const nextPage = page + 1;
    setPage(nextPage);
    loadNotifications(nextPage, true);
  };

  const formatTimeAgo = (dateStr: string) => {
    const date = new Date(dateStr);
    const now = new Date();
    const diffMs = now.getTime() - date.getTime();
    const diffMins = Math.floor(diffMs / 60000);
    if (diffMins < 1) return t("justNow");
    if (diffMins < 60) return t("minutesAgo", { count: diffMins });
    const diffHours = Math.floor(diffMins / 60);
    if (diffHours < 24) return t("hoursAgo", { count: diffHours });
    const diffDays = Math.floor(diffHours / 24);
    if (diffDays < 7) return t("daysAgo", { count: diffDays });
    if (diffDays < 30) return t("weeksAgo", { count: Math.floor(diffDays / 7) });
    return date.toLocaleDateString();
  };

  const unreadCount = notifications.filter((n) => !n.isRead).length;

  if (!isAuthenticated) {
    return (
      <div className="max-w-[1120px] mx-auto px-5 py-16 text-center">
        <p className="text-muted">{t("loginRequired")}</p>
        <Link href="/login" className="text-hirovo-blue hover:underline mt-2 inline-block">
          {t("goToLogin")}
        </Link>
      </div>
    );
  }

  return (
    <div className="max-w-[700px] mx-auto px-5 py-6">
      <div className="flex items-center justify-between mb-6">
        <h1 className="text-2xl font-bold text-text">{t("title")}</h1>
        {unreadCount > 0 && (
          <button
            onClick={handleMarkAllRead}
            disabled={markingAll}
            className="text-sm text-hirovo-blue hover:text-hirovo-blue/80 font-medium disabled:opacity-50 transition-colors"
          >
            {markingAll ? t("marking") : t("markAllRead")}
          </button>
        )}
      </div>

      <div className="bg-white rounded-2xl shadow-card border border-border overflow-hidden">
        {loading ? (
          <div className="p-8 text-center text-muted">{t("loading")}</div>
        ) : notifications.length === 0 ? (
          <div className="p-12 text-center">
            <svg className="w-16 h-16 mx-auto mb-4 text-border" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11a6.002 6.002 0 00-4-5.659V5a2 2 0 10-4 0v.341C7.67 6.165 6 8.388 6 11v3.159c0 .538-.214 1.055-.595 1.436L4 17h5m6 0v1a3 3 0 11-6 0v-1m6 0H9" />
            </svg>
            <p className="text-muted text-sm">{t("noNotifications")}</p>
          </div>
        ) : (
          <>
            {notifications.map((notification) => (
              <Link
                key={notification.id}
                href={getNotificationLink(notification)}
                onClick={() => {
                  if (!notification.isRead) handleMarkRead(notification.id);
                }}
                className={`flex items-start gap-3 px-4 py-3.5 border-b border-border/50 hover:bg-card transition-colors ${
                  !notification.isRead ? "bg-hirovo-blue/[0.03]" : ""
                }`}
              >
                {/* Icon */}
                <div className={`flex-shrink-0 w-10 h-10 rounded-full flex items-center justify-center ${getNotificationColor(notification.type)}`}>
                  {getNotificationIcon(notification.type)}
                </div>

                {/* Content */}
                <div className="flex-1 min-w-0">
                  <p className={`text-sm ${!notification.isRead ? "font-semibold text-text" : "text-text"}`}>
                    {notification.title}
                  </p>
                  {notification.body && (
                    <p className="text-xs text-muted mt-0.5 line-clamp-2">{notification.body}</p>
                  )}
                  <p className="text-xs text-muted mt-1">{formatTimeAgo(notification.createdAt)}</p>
                </div>

                {/* Unread dot */}
                {!notification.isRead && (
                  <div className="flex-shrink-0 mt-2">
                    <div className="w-2.5 h-2.5 rounded-full bg-hirovo-blue" />
                  </div>
                )}
              </Link>
            ))}

            {hasMore && (
              <button
                onClick={loadMore}
                className="w-full py-3 text-sm text-hirovo-blue hover:bg-card transition-colors font-medium"
              >
                {t("loadMore")}
              </button>
            )}
          </>
        )}
      </div>
    </div>
  );
}

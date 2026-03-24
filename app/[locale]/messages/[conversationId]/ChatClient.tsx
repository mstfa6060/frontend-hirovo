"use client";

import { useState, useEffect, useRef, useCallback } from "react";
import { useTranslations } from "next-intl";
import { useAuth } from "@/lib/auth/AuthContext";
import { messagingApi } from "@/lib/api";
import { Link } from "@/i18n/routing";

interface Message {
  id: string;
  senderId: string;
  senderName: string;
  content: string;
  isRead: boolean;
  createdAt: string;
  isOwn: boolean;
  messageType: number;
  mediaUrl: string;
  mediaFileName: string;
  mediaFileSize: number | null;
}

export default function ChatClient({ conversationId }: { conversationId: string }) {
  const t = useTranslations("messages");
  const { isAuthenticated } = useAuth();
  const [messages, setMessages] = useState<Message[]>([]);
  const [newMessage, setNewMessage] = useState("");
  const [loading, setLoading] = useState(true);
  const [sending, setSending] = useState(false);
  const [otherUserName, setOtherUserName] = useState("");
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const intervalRef = useRef<ReturnType<typeof setInterval> | null>(null);

  const loadMessages = useCallback(async () => {
    try {
      const data = await messagingApi.getMessages(conversationId);
      const reversed = (data || []).reverse();
      setMessages(reversed);
      if (reversed.length > 0) {
        const firstOther = reversed.find((m: Message) => !m.isOwn);
        if (firstOther) setOtherUserName(firstOther.senderName);
      }
      await messagingApi.markAsRead(conversationId);
    } catch {
      // silent
    } finally {
      setLoading(false);
    }
  }, [conversationId]);

  useEffect(() => {
    if (isAuthenticated) {
      loadMessages();
    }
  }, [isAuthenticated, loadMessages]);

  useEffect(() => {
    intervalRef.current = setInterval(() => {
      if (isAuthenticated) loadMessages();
    }, 5000);
    return () => {
      if (intervalRef.current) clearInterval(intervalRef.current);
    };
  }, [isAuthenticated, loadMessages]);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  const handleSend = async () => {
    if (!newMessage.trim() || sending) return;
    setSending(true);
    try {
      await messagingApi.sendMessage({
        conversationId,
        content: newMessage.trim(),
      });
      setNewMessage("");
      await loadMessages();
    } catch {
      // silent
    } finally {
      setSending(false);
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      handleSend();
    }
  };

  const formatTime = (dateStr: string) => {
    if (!dateStr) return "";
    const date = new Date(dateStr);
    const now = new Date();
    const diffMs = now.getTime() - date.getTime();
    const diffMins = Math.floor(diffMs / 60000);
    if (diffMins < 1) return t("justNow");
    if (diffMins < 60) return `${diffMins}${t("minuteShort")}`;
    const diffHours = Math.floor(diffMins / 60);
    if (diffHours < 24) return `${diffHours}${t("hourShort")}`;
    return date.toLocaleDateString() + " " + date.toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" });
  };

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
    <div className="max-w-[800px] mx-auto px-5 py-6">
      <div className="bg-white rounded-2xl shadow-card border border-border overflow-hidden flex flex-col" style={{ height: "calc(100vh - 160px)", minHeight: 400 }}>
        {/* Header */}
        <div className="px-4 py-3 border-b border-border flex items-center gap-3">
          <Link href="/messages" className="p-1 text-muted hover:text-text transition-colors">
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
            </svg>
          </Link>
          <div className="flex-1 min-w-0">
            <p className="font-semibold text-sm text-text truncate">
              {otherUserName || t("chat")}
            </p>
          </div>
        </div>

        {/* Messages */}
        <div className="flex-1 overflow-y-auto p-4 space-y-3">
          {loading ? (
            <div className="text-center text-muted py-8">{t("loading")}</div>
          ) : messages.length === 0 ? (
            <div className="text-center text-muted py-8">{t("noMessages")}</div>
          ) : (
            messages.map((msg) => (
              <div
                key={msg.id}
                className={`flex ${msg.isOwn ? "justify-end" : "justify-start"}`}
              >
                <div
                  className={`max-w-[75%] px-4 py-2.5 rounded-2xl ${
                    msg.isOwn
                      ? "bg-hirovo-blue text-white rounded-br-md"
                      : "bg-card text-text rounded-bl-md"
                  }`}
                >
                  <p className="text-sm whitespace-pre-wrap break-words">{msg.content}</p>
                  <p className={`text-[10px] mt-1 ${msg.isOwn ? "text-white/70" : "text-muted"}`}>
                    {formatTime(msg.createdAt)}
                  </p>
                </div>
              </div>
            ))
          )}
          <div ref={messagesEndRef} />
        </div>

        {/* Input */}
        <div className="p-4 border-t border-border">
          <div className="flex items-end gap-2">
            <textarea
              value={newMessage}
              onChange={(e) => setNewMessage(e.target.value)}
              onKeyDown={handleKeyDown}
              placeholder={t("typeMessage")}
              rows={1}
              className="flex-1 resize-none rounded-xl border border-border px-4 py-2.5 text-sm focus:outline-none focus:border-hirovo-blue transition-colors"
              style={{ maxHeight: 120 }}
            />
            <button
              onClick={handleSend}
              disabled={!newMessage.trim() || sending}
              className="px-4 py-2.5 rounded-xl bg-hirovo-blue text-white text-sm font-medium hover:bg-hirovo-blue/90 disabled:opacity-50 disabled:cursor-not-allowed transition-colors flex-shrink-0"
            >
              {sending ? (
                <svg className="w-5 h-5 animate-spin" fill="none" viewBox="0 0 24 24">
                  <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                  <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z" />
                </svg>
              ) : (
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 19l9 2-9-18-9 18 9-2zm0 0v-8" />
                </svg>
              )}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

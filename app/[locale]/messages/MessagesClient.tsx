"use client";

import { useState, useEffect, useRef, useCallback } from "react";
import { useTranslations } from "next-intl";
import { useAuth } from "@/lib/auth/AuthContext";
import { messagingApi } from "@/lib/api";
import { Link } from "@/i18n/routing";

interface Conversation {
  id: string;
  otherUserName: string;
  otherUserId: string;
  jobTitle: string;
  lastMessage: string;
  lastMessageAt: string;
  unreadCount: number;
}

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

export default function MessagesClient() {
  const t = useTranslations("messages");
  const { isAuthenticated, user } = useAuth();
  const [conversations, setConversations] = useState<Conversation[]>([]);
  const [activeConversation, setActiveConversation] = useState<Conversation | null>(null);
  const [messages, setMessages] = useState<Message[]>([]);
  const [newMessage, setNewMessage] = useState("");
  const [loading, setLoading] = useState(true);
  const [messagesLoading, setMessagesLoading] = useState(false);
  const [sending, setSending] = useState(false);
  const [showChat, setShowChat] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const intervalRef = useRef<ReturnType<typeof setInterval> | null>(null);

  const loadConversations = useCallback(async () => {
    try {
      const data = await messagingApi.getConversations();
      setConversations(data || []);
    } catch {
      // silent
    } finally {
      setLoading(false);
    }
  }, []);

  const loadMessages = useCallback(async (conversationId: string) => {
    setMessagesLoading(true);
    try {
      const data = await messagingApi.getMessages(conversationId);
      setMessages((data || []).reverse());
      await messagingApi.markAsRead(conversationId);
      setConversations((prev) =>
        prev.map((c) => (c.id === conversationId ? { ...c, unreadCount: 0 } : c))
      );
    } catch {
      // silent
    } finally {
      setMessagesLoading(false);
    }
  }, []);

  useEffect(() => {
    if (isAuthenticated) {
      loadConversations();
    }
  }, [isAuthenticated, loadConversations]);

  // Poll for new messages
  useEffect(() => {
    if (activeConversation) {
      intervalRef.current = setInterval(() => {
        loadMessages(activeConversation.id);
      }, 5000);
    }
    return () => {
      if (intervalRef.current) clearInterval(intervalRef.current);
    };
  }, [activeConversation, loadMessages]);

  // Poll for conversations list
  useEffect(() => {
    if (!isAuthenticated) return;
    const convInterval = setInterval(() => {
      loadConversations();
    }, 10000);
    return () => clearInterval(convInterval);
  }, [isAuthenticated, loadConversations]);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  const selectConversation = (conv: Conversation) => {
    setActiveConversation(conv);
    setShowChat(true);
    loadMessages(conv.id);
  };

  const handleSend = async () => {
    if (!newMessage.trim() || !activeConversation || sending) return;
    setSending(true);
    try {
      await messagingApi.sendMessage({
        conversationId: activeConversation.id,
        content: newMessage.trim(),
      });
      setNewMessage("");
      await loadMessages(activeConversation.id);
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
    const diffDays = Math.floor(diffHours / 24);
    if (diffDays < 7) return `${diffDays}${t("dayShort")}`;
    return date.toLocaleDateString();
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
    <div className="max-w-[1120px] mx-auto px-5 py-6">
      <h1 className="text-2xl font-bold text-text mb-6">{t("title")}</h1>

      <div className="bg-white rounded-2xl shadow-card border border-border overflow-hidden flex" style={{ height: "calc(100vh - 200px)", minHeight: 500 }}>
        {/* Conversations sidebar */}
        <div className={`w-full md:w-[360px] border-r border-border flex flex-col ${showChat ? "hidden md:flex" : "flex"}`}>
          <div className="p-4 border-b border-border">
            <h2 className="font-semibold text-text">{t("conversations")}</h2>
          </div>
          <div className="flex-1 overflow-y-auto">
            {loading ? (
              <div className="p-8 text-center text-muted">{t("loading")}</div>
            ) : conversations.length === 0 ? (
              <div className="p-8 text-center text-muted">{t("noConversations")}</div>
            ) : (
              conversations.map((conv) => (
                <button
                  key={conv.id}
                  onClick={() => selectConversation(conv)}
                  className={`w-full text-left px-4 py-3 border-b border-border/50 hover:bg-card transition-colors ${
                    activeConversation?.id === conv.id ? "bg-hirovo-blue/5 border-l-2 border-l-hirovo-blue" : ""
                  }`}
                >
                  <div className="flex items-center justify-between mb-1">
                    <span className="font-medium text-sm text-text truncate">{conv.otherUserName}</span>
                    <span className="text-xs text-muted flex-shrink-0 ml-2">{formatTime(conv.lastMessageAt)}</span>
                  </div>
                  {conv.jobTitle && (
                    <p className="text-xs text-hirovo-blue truncate mb-1">{conv.jobTitle}</p>
                  )}
                  <div className="flex items-center justify-between">
                    <p className="text-xs text-muted truncate flex-1">{conv.lastMessage}</p>
                    {conv.unreadCount > 0 && (
                      <span className="ml-2 flex-shrink-0 bg-hirovo-blue text-white text-[10px] font-bold rounded-full w-5 h-5 flex items-center justify-center">
                        {conv.unreadCount > 9 ? "9+" : conv.unreadCount}
                      </span>
                    )}
                  </div>
                </button>
              ))
            )}
          </div>
        </div>

        {/* Chat panel */}
        <div className={`flex-1 flex flex-col ${!showChat ? "hidden md:flex" : "flex"}`}>
          {activeConversation ? (
            <>
              {/* Chat header */}
              <div className="px-4 py-3 border-b border-border flex items-center gap-3">
                <button
                  onClick={() => setShowChat(false)}
                  className="md:hidden p-1 text-muted hover:text-text"
                >
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
                  </svg>
                </button>
                <div className="flex-1 min-w-0">
                  <p className="font-semibold text-sm text-text truncate">{activeConversation.otherUserName}</p>
                  {activeConversation.jobTitle && (
                    <p className="text-xs text-muted truncate">{activeConversation.jobTitle}</p>
                  )}
                </div>
              </div>

              {/* Messages */}
              <div className="flex-1 overflow-y-auto p-4 space-y-3">
                {messagesLoading && messages.length === 0 ? (
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
                        className={`max-w-[70%] px-4 py-2.5 rounded-2xl ${
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

              {/* Message input */}
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
            </>
          ) : (
            <div className="flex-1 flex items-center justify-center text-muted">
              <div className="text-center">
                <svg className="w-16 h-16 mx-auto mb-4 text-border" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" />
                </svg>
                <p className="text-sm">{t("selectConversation")}</p>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

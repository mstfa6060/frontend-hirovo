"use client";

import { useState } from "react";
import { useTranslations } from "next-intl";
import ContentCard from "../../components/ContentCard";

export default function DeleteAccountPage() {
  const t = useTranslations("deleteAccount");
  const tc = useTranslations("common");

  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [reason, setReason] = useState("");
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState("");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!email && !phone) {
      setError(t("errors.emailOrPhone"));
      return;
    }

    setLoading(true);
    setError("");

    try {
      const response = await fetch("https://api.hirovo.com/iam/User/Delete", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          email: email || undefined,
          phoneNumber: phone || undefined,
          reason: reason || undefined,
          isDeleted: true,
        }),
      });

      if (response.ok) {
        setSuccess(true);
      } else {
        const data = await response.json().catch(() => ({}));
        setError(data.message || t("errors.generic"));
      }
    } catch {
      setError(t("errors.connection"));
    } finally {
      setLoading(false);
    }
  };

  if (success) {
    return (
      <main className="flex-1 py-16">
        <div className="max-w-[600px] mx-auto px-5">
          <ContentCard>
            <div className="text-center py-8">
              <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <svg
                  className="w-8 h-8 text-green-600"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M5 13l4 4L19 7"
                  />
                </svg>
              </div>
              <h1 className="text-2xl font-bold mb-4 text-text">
                {t("success.title")}
              </h1>
              <p className="text-muted">{t("success.message")}</p>
              <p className="text-muted mt-4 text-sm">
                {t("success.processingTime")}
              </p>
            </div>
          </ContentCard>
        </div>
      </main>
    );
  }

  return (
    <main className="flex-1 py-16">
      <div className="max-w-[600px] mx-auto px-5">
        <ContentCard>
          <h1 className="text-3xl font-bold mb-2 text-text max-sm:text-2xl">
            {t("title")}
          </h1>
          <p className="text-muted text-sm mb-8">{t("description")}</p>

          <div className="bg-amber-50 border border-amber-200 rounded-lg p-4 mb-6">
            <p className="text-amber-800 text-sm">
              <strong>{tc("important")}:</strong> {t("warning")}
            </p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-6">
            <div>
              <label
                htmlFor="email"
                className="block text-sm font-medium text-text mb-2"
              >
                {t("form.emailLabel")}
              </label>
              <input
                type="email"
                id="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder={t("form.emailPlaceholder")}
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-hirovo-teal focus:border-transparent outline-none transition-all"
              />
            </div>

            <div className="flex items-center gap-4">
              <div className="flex-1 h-px bg-gray-200"></div>
              <span className="text-muted text-sm">{tc("or")}</span>
              <div className="flex-1 h-px bg-gray-200"></div>
            </div>

            <div>
              <label
                htmlFor="phone"
                className="block text-sm font-medium text-text mb-2"
              >
                {t("form.phoneLabel")}
              </label>
              <input
                type="tel"
                id="phone"
                value={phone}
                onChange={(e) => setPhone(e.target.value)}
                placeholder={t("form.phonePlaceholder")}
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-hirovo-teal focus:border-transparent outline-none transition-all"
              />
            </div>

            <div>
              <label
                htmlFor="reason"
                className="block text-sm font-medium text-text mb-2"
              >
                {t("form.reasonLabel")}{" "}
                <span className="text-muted font-normal">({tc("optional")})</span>
              </label>
              <textarea
                id="reason"
                value={reason}
                onChange={(e) => setReason(e.target.value)}
                placeholder={t("form.reasonPlaceholder")}
                rows={3}
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-hirovo-teal focus:border-transparent outline-none transition-all resize-none"
              />
            </div>

            {error && (
              <div className="bg-red-50 border border-red-200 rounded-lg p-4">
                <p className="text-red-700 text-sm">{error}</p>
              </div>
            )}

            <button
              type="submit"
              disabled={loading}
              className="w-full btn-gradient text-white font-semibold py-4 rounded-xl shadow-btn hover:shadow-btn-hover transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {loading ? tc("sending") : t("form.submitButton")}
            </button>
          </form>

          <p className="text-muted text-xs mt-6 text-center">
            {tc("questions")}{" "}
            <a
              href="mailto:hello@hirovo.com"
              className="text-hirovo-teal hover:underline"
            >
              hello@hirovo.com
            </a>{" "}
            {t("contactNote")}
          </p>
        </ContentCard>
      </div>
    </main>
  );
}

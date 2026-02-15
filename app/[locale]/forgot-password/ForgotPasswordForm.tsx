"use client";

import { useState } from "react";
import { useTranslations } from "next-intl";
import { Link } from "@/i18n/routing";
import { authApi } from "@/lib/api";

export default function ForgotPasswordForm() {
  const t = useTranslations("auth");

  const [email, setEmail] = useState("");
  const [sent, setSent] = useState(false);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    setLoading(true);

    try {
      await authApi.forgotPassword(email);
      setSent(true);
    } catch (err) {
      setError(err instanceof Error ? err.message : t("forgotPasswordError"));
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="w-full max-w-md">
      <div className="bg-white rounded-2xl shadow-card p-8">
        <h1 className="text-2xl font-bold text-text text-center mb-2">
          {t("forgotPassword")}
        </h1>
        <p className="text-muted text-center mb-6">
          {t("forgotPasswordSubtitle")}
        </p>

        {sent ? (
          <div className="text-center">
            <div className="bg-green-50 text-green-700 px-4 py-3 rounded-lg mb-4 text-sm">
              {t("forgotPasswordSent")}
            </div>
            <Link
              href="/login"
              className="text-hirovo-blue font-semibold hover:underline"
            >
              {t("backToLogin")}
            </Link>
          </div>
        ) : (
          <>
            {error && (
              <div className="bg-red-50 text-red-600 px-4 py-3 rounded-lg mb-4 text-sm">
                {error}
              </div>
            )}

            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-text mb-1">
                  {t("email")}
                </label>
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                  className="w-full px-4 py-3 rounded-lg border border-border bg-white text-text focus:ring-2 focus:ring-hirovo-blue focus:border-transparent outline-none transition"
                  placeholder={t("emailPlaceholder")}
                />
              </div>

              <button
                type="submit"
                disabled={loading}
                className="w-full py-3 rounded-lg font-semibold text-white btn-gradient shadow-btn hover:shadow-btn-hover hover:-translate-y-0.5 transition-all duration-150 disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {loading ? t("sending") : t("sendResetLink")}
              </button>
            </form>

            <p className="text-center text-sm text-muted mt-6">
              <Link
                href="/login"
                className="text-hirovo-blue font-semibold hover:underline"
              >
                {t("backToLogin")}
              </Link>
            </p>
          </>
        )}
      </div>
    </div>
  );
}

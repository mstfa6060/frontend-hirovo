"use client";

import { useState } from "react";
import { useTranslations } from "next-intl";
import { Link } from "@/i18n/routing";
import { useSearchParams } from "next/navigation";
import { authApi } from "@/lib/api";

export default function ResetPasswordForm() {
  const t = useTranslations("auth");
  const searchParams = useSearchParams();
  const token = searchParams.get("token") || "";

  const [password, setPassword] = useState("");
  const [passwordConfirm, setPasswordConfirm] = useState("");
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");

    if (password !== passwordConfirm) {
      setError(t("passwordMismatch"));
      return;
    }

    if (password.length < 8) {
      setError(t("passwordTooShort"));
      return;
    }

    setLoading(true);

    try {
      await authApi.resetPassword(token, password);
      setSuccess(true);
    } catch (err) {
      setError(err instanceof Error ? err.message : t("resetPasswordError"));
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="w-full max-w-md">
      <div className="bg-white rounded-2xl shadow-card p-8">
        <h1 className="text-2xl font-bold text-text text-center mb-2">
          {t("resetPassword")}
        </h1>

        {success ? (
          <div className="text-center">
            <div className="bg-green-50 text-green-700 px-4 py-3 rounded-lg mb-4 text-sm">
              {t("resetPasswordSuccess")}
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

            <form onSubmit={handleSubmit} className="space-y-4 mt-6">
              <div>
                <label className="block text-sm font-medium text-text mb-1">
                  {t("newPassword")}
                </label>
                <input
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                  minLength={8}
                  className="w-full px-4 py-3 rounded-lg border border-border bg-white text-text focus:ring-2 focus:ring-hirovo-blue focus:border-transparent outline-none transition"
                />
                <p className="text-xs text-muted mt-1">{t("passwordHint")}</p>
              </div>

              <div>
                <label className="block text-sm font-medium text-text mb-1">
                  {t("passwordConfirm")}
                </label>
                <input
                  type="password"
                  value={passwordConfirm}
                  onChange={(e) => setPasswordConfirm(e.target.value)}
                  required
                  minLength={8}
                  className="w-full px-4 py-3 rounded-lg border border-border bg-white text-text focus:ring-2 focus:ring-hirovo-blue focus:border-transparent outline-none transition"
                />
              </div>

              <button
                type="submit"
                disabled={loading}
                className="w-full py-3 rounded-lg font-semibold text-white btn-gradient shadow-btn hover:shadow-btn-hover hover:-translate-y-0.5 transition-all duration-150 disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {loading ? t("resetting") : t("resetPassword")}
              </button>
            </form>
          </>
        )}
      </div>
    </div>
  );
}

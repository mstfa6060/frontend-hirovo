"use client";

import { useState } from "react";
import { useTranslations } from "next-intl";
import { Link, useRouter } from "@/i18n/routing";
import { useAuth } from "@/lib/auth/AuthContext";
import { useSearchParams } from "next/navigation";

export default function LoginForm() {
  const t = useTranslations("auth");
  const te = useTranslations("employer.login");
  const router = useRouter();
  const searchParams = useSearchParams();
  const { login } = useAuth();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isEmployer, setIsEmployer] = useState(false);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    setLoading(true);

    try {
      await login(email, password, isEmployer);
      const redirect = searchParams.get("redirect");
      if (redirect) {
        router.push(redirect);
      } else {
        router.push(isEmployer ? "/employer/dashboard" : "/dashboard");
      }
    } catch (err) {
      setError(err instanceof Error ? err.message : t("loginError"));
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="w-full max-w-md">
      <div className="bg-white rounded-2xl shadow-card p-8">
        <h1 className="text-2xl font-bold text-text text-center mb-2">
          {isEmployer ? te("title") : t("login")}
        </h1>
        <p className="text-muted text-center mb-6">
          {isEmployer ? te("subtitle") : t("loginSubtitle")}
        </p>

        {/* Login type tabs */}
        <div className="flex rounded-lg border border-border mb-6 overflow-hidden">
          <button
            type="button"
            onClick={() => setIsEmployer(false)}
            className={`flex-1 py-2.5 text-sm font-medium transition-colors ${
              !isEmployer
                ? "bg-hirovo-blue text-white"
                : "bg-white text-text hover:bg-card"
            }`}
          >
            {t("login")}
          </button>
          <button
            type="button"
            onClick={() => setIsEmployer(true)}
            className={`flex-1 py-2.5 text-sm font-medium transition-colors ${
              isEmployer
                ? "bg-hirovo-blue text-white"
                : "bg-white text-text hover:bg-card"
            }`}
          >
            {te("title")}
          </button>
        </div>

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

          <div>
            <label className="block text-sm font-medium text-text mb-1">
              {t("password")}
            </label>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              minLength={8}
              className="w-full px-4 py-3 rounded-lg border border-border bg-white text-text focus:ring-2 focus:ring-hirovo-blue focus:border-transparent outline-none transition"
              placeholder={t("passwordPlaceholder")}
            />
          </div>

          <div className="flex items-center justify-between">
            <label className="flex items-center gap-2 text-sm text-muted cursor-pointer">
              <input type="checkbox" className="rounded border-border" />
              {t("rememberMe")}
            </label>
            <Link
              href="/forgot-password"
              className="text-sm text-hirovo-blue hover:underline"
            >
              {t("forgotPassword")}
            </Link>
          </div>

          <button
            type="submit"
            disabled={loading}
            className="w-full py-3 rounded-lg font-semibold text-white btn-gradient shadow-btn hover:shadow-btn-hover hover:-translate-y-0.5 transition-all duration-150 disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {loading ? t("loggingIn") : isEmployer ? te("title") : t("login")}
          </button>
        </form>

        <p className="text-center text-sm text-muted mt-6">
          {t("noAccount")}{" "}
          {isEmployer ? (
            <Link
              href="/register/employer"
              className="text-hirovo-blue font-semibold hover:underline"
            >
              {t("register")}
            </Link>
          ) : (
            <Link
              href="/register"
              className="text-hirovo-blue font-semibold hover:underline"
            >
              {t("register")}
            </Link>
          )}
        </p>
      </div>
    </div>
  );
}

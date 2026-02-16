"use client";

import { useState } from "react";
import { useTranslations } from "next-intl";
import { Link, useRouter } from "@/i18n/routing";
import { useAuth } from "@/lib/auth/AuthContext";

export default function EmployerRegisterForm() {
  const t = useTranslations("auth");
  const te = useTranslations("employer.register");
  const router = useRouter();
  const { registerEmployer } = useAuth();

  const [form, setForm] = useState({
    firstName: "",
    surname: "",
    email: "",
    phoneNumber: "",
    password: "",
    passwordConfirm: "",
    acceptTerms: false,
  });
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const updateField = (field: string, value: string | boolean) => {
    setForm((prev) => ({ ...prev, [field]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");

    if (form.password !== form.passwordConfirm) {
      setError(t("passwordMismatch"));
      return;
    }

    if (form.password.length < 8) {
      setError(t("passwordTooShort"));
      return;
    }

    if (!form.acceptTerms) {
      setError(t("acceptTermsRequired"));
      return;
    }

    setLoading(true);

    try {
      await registerEmployer({
        firstName: form.firstName,
        surname: form.surname,
        email: form.email,
        password: form.password,
        phoneNumber: form.phoneNumber,
      });
      router.push("/employer/dashboard");
    } catch (err) {
      setError(err instanceof Error ? err.message : t("registerError"));
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="w-full max-w-md">
      <div className="bg-white rounded-2xl shadow-card p-8">
        <h1 className="text-2xl font-bold text-text text-center mb-2">
          {te("title")}
        </h1>
        <p className="text-muted text-center mb-6">{te("subtitle")}</p>

        {error && (
          <div className="bg-red-50 text-red-600 px-4 py-3 rounded-lg mb-4 text-sm">
            {error}
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="grid grid-cols-2 gap-3">
            <div>
              <label className="block text-sm font-medium text-text mb-1">
                {t("firstName")}
              </label>
              <input
                type="text"
                value={form.firstName}
                onChange={(e) => updateField("firstName", e.target.value)}
                required
                className="w-full px-4 py-3 rounded-lg border border-border bg-white text-text focus:ring-2 focus:ring-hirovo-blue focus:border-transparent outline-none transition"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-text mb-1">
                {t("surname")}
              </label>
              <input
                type="text"
                value={form.surname}
                onChange={(e) => updateField("surname", e.target.value)}
                required
                className="w-full px-4 py-3 rounded-lg border border-border bg-white text-text focus:ring-2 focus:ring-hirovo-blue focus:border-transparent outline-none transition"
              />
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium text-text mb-1">
              {t("email")}
            </label>
            <input
              type="email"
              value={form.email}
              onChange={(e) => updateField("email", e.target.value)}
              required
              className="w-full px-4 py-3 rounded-lg border border-border bg-white text-text focus:ring-2 focus:ring-hirovo-blue focus:border-transparent outline-none transition"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-text mb-1">
              {t("phone")}
            </label>
            <input
              type="tel"
              value={form.phoneNumber}
              onChange={(e) => updateField("phoneNumber", e.target.value)}
              required
              className="w-full px-4 py-3 rounded-lg border border-border bg-white text-text focus:ring-2 focus:ring-hirovo-blue focus:border-transparent outline-none transition"
              placeholder="05XX XXX XX XX"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-text mb-1">
              {t("password")}
            </label>
            <input
              type="password"
              value={form.password}
              onChange={(e) => updateField("password", e.target.value)}
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
              value={form.passwordConfirm}
              onChange={(e) => updateField("passwordConfirm", e.target.value)}
              required
              minLength={8}
              className="w-full px-4 py-3 rounded-lg border border-border bg-white text-text focus:ring-2 focus:ring-hirovo-blue focus:border-transparent outline-none transition"
            />
          </div>

          <label className="flex items-start gap-2 text-sm text-muted cursor-pointer">
            <input
              type="checkbox"
              checked={form.acceptTerms}
              onChange={(e) => updateField("acceptTerms", e.target.checked)}
              className="rounded border-border mt-0.5"
            />
            <span>
              <Link href="/terms" className="text-hirovo-blue hover:underline">
                {t("terms")}
              </Link>
              {" "}{t("and")}{" "}
              <Link href="/privacy" className="text-hirovo-blue hover:underline">
                {t("privacy")}
              </Link>
              {" "}{t("acceptTerms")}
            </span>
          </label>

          <button
            type="submit"
            disabled={loading}
            className="w-full py-3 rounded-lg font-semibold text-white btn-gradient shadow-btn hover:shadow-btn-hover hover:-translate-y-0.5 transition-all duration-150 disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {loading ? t("registering") : t("register")}
          </button>
        </form>

        <p className="text-center text-sm text-muted mt-6">
          {te("hasAccount")}{" "}
          <Link
            href="/login"
            className="text-hirovo-blue font-semibold hover:underline"
          >
            {t("login")}
          </Link>
        </p>
      </div>
    </div>
  );
}

"use client";

import { useState, useRef, useEffect } from "react";
import { useTranslations } from "next-intl";
import { Link } from "@/i18n/routing";
import { useAuth } from "@/lib/auth/AuthContext";

export default function UserMenu() {
  const t = useTranslations("auth");
  const te = useTranslations("employer");
  const { user, isEmployer, logout } = useAuth();
  const [open, setOpen] = useState(false);
  const menuRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (menuRef.current && !menuRef.current.contains(event.target as Node)) {
        setOpen(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  if (!user) return null;

  const initials = (user.displayName || user.email || "U")
    .split(" ")
    .map((n) => n[0])
    .join("")
    .slice(0, 2)
    .toUpperCase();

  const handleLogout = async () => {
    setOpen(false);
    await logout();
  };

  return (
    <div className="relative" ref={menuRef}>
      <button
        onClick={() => setOpen(!open)}
        className="w-9 h-9 rounded-full bg-gradient-to-br from-hirovo-blue to-hirovo-teal text-white text-sm font-bold flex items-center justify-center hover:shadow-btn transition-shadow"
        aria-expanded={open}
        aria-label="User menu"
      >
        {initials}
      </button>

      {open && (
        <div className="absolute right-0 top-12 w-56 bg-white rounded-xl shadow-card border border-border py-2 z-50">
          <div className="px-4 py-2 border-b border-border">
            <p className="text-sm font-semibold text-text truncate">
              {user.displayName || user.email}
            </p>
            <p className="text-xs text-muted truncate">{user.email}</p>
          </div>

          {isEmployer ? (
            <>
              <Link
                href="/employer/dashboard"
                onClick={() => setOpen(false)}
                className="block px-4 py-2.5 text-sm text-text hover:bg-card transition-colors"
              >
                {te("dashboard")}
              </Link>
              <Link
                href="/employer/jobs"
                onClick={() => setOpen(false)}
                className="block px-4 py-2.5 text-sm text-text hover:bg-card transition-colors"
              >
                {te("myJobs")}
              </Link>
              <Link
                href="/employer/applications"
                onClick={() => setOpen(false)}
                className="block px-4 py-2.5 text-sm text-text hover:bg-card transition-colors"
              >
                {te("applications")}
              </Link>
              <Link
                href="/employer/jobs/create"
                onClick={() => setOpen(false)}
                className="block px-4 py-2.5 text-sm text-hirovo-blue font-medium hover:bg-card transition-colors"
              >
                {te("createJob")}
              </Link>
              <Link
                href="/profile"
                onClick={() => setOpen(false)}
                className="block px-4 py-2.5 text-sm text-text hover:bg-card transition-colors"
              >
                {t("profile")}
              </Link>
            </>
          ) : (
            <>
              <Link
                href="/dashboard"
                onClick={() => setOpen(false)}
                className="block px-4 py-2.5 text-sm text-text hover:bg-card transition-colors"
              >
                {t("dashboard")}
              </Link>
              <Link
                href="/applications"
                onClick={() => setOpen(false)}
                className="block px-4 py-2.5 text-sm text-text hover:bg-card transition-colors"
              >
                {t("myApplications")}
              </Link>
              <Link
                href="/favorites"
                onClick={() => setOpen(false)}
                className="block px-4 py-2.5 text-sm text-text hover:bg-card transition-colors"
              >
                {t("favorites")}
              </Link>
              <Link
                href="/profile"
                onClick={() => setOpen(false)}
                className="block px-4 py-2.5 text-sm text-text hover:bg-card transition-colors"
              >
                {t("profile")}
              </Link>
            </>
          )}

          <div className="border-t border-border mt-1 pt-1">
            <button
              onClick={handleLogout}
              className="block w-full text-left px-4 py-2.5 text-sm text-red-600 hover:bg-red-50 transition-colors"
            >
              {t("logout")}
            </button>
          </div>
        </div>
      )}
    </div>
  );
}

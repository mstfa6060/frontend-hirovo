"use client";

import Image from "next/image";
import { useTranslations } from "next-intl";
import { Link } from "@/i18n/routing";
import LanguageSwitcher from "./LanguageSwitcher";
import UserMenu from "./UserMenu";
import { useAuth } from "@/lib/auth/AuthContext";
import { useState } from "react";

export default function Header() {
  const t = useTranslations("common");
  const th = useTranslations("header");
  const ta = useTranslations("auth");
  const te = useTranslations("employer");
  const { isAuthenticated, isEmployer, isLoading } = useAuth();
  const [mobileOpen, setMobileOpen] = useState(false);

  return (
    <header className="sticky top-0 z-50 bg-white/90 backdrop-blur-md border-b border-border">
      <div className="max-w-[1120px] mx-auto px-5 py-3 flex justify-between items-center">
        <Link
          href="/"
          className="flex items-center gap-3 text-text no-underline"
        >
          <Image
            src="/logo/hirovo_logo_white.png"
            alt={th("logoAlt")}
            width={28}
            height={28}
            className="object-contain rounded-md"
          />
          <strong>Hirovo</strong>
        </Link>

        {/* Desktop Nav */}
        <nav className="hidden md:flex items-center gap-6">
          <Link
            href="/jobs"
            className="text-sm text-text hover:text-hirovo-blue transition-colors font-medium"
          >
            {th("jobs")}
          </Link>
          <Link
            href="/blog"
            className="text-sm text-text hover:text-hirovo-blue transition-colors font-medium"
          >
            {th("blog")}
          </Link>
          <Link
            href="/about"
            className="text-sm text-text hover:text-hirovo-blue transition-colors font-medium"
          >
            {th("about")}
          </Link>
          <Link
            href="/contact"
            className="text-sm text-text hover:text-hirovo-blue transition-colors font-medium"
          >
            {th("contact")}
          </Link>

          {/* Employer nav links */}
          {isAuthenticated && isEmployer && (
            <EmployerDropdown te={te} />
          )}
        </nav>

        <div className="flex items-center gap-3">
          <LanguageSwitcher />

          {!isLoading && (
            <>
              {isAuthenticated ? (
                <UserMenu />
              ) : (
                <div className="hidden md:flex items-center gap-2">
                  <Link
                    href="/login"
                    className="px-4 py-2 rounded-lg text-sm font-medium text-text hover:bg-card transition-colors"
                  >
                    {ta("login")}
                  </Link>
                  <Link
                    href="/register"
                    className="px-4 py-2 rounded-lg text-sm font-semibold text-white btn-gradient shadow-btn hover:shadow-btn-hover hover:-translate-y-0.5 transition-all duration-150"
                  >
                    {ta("register")}
                  </Link>
                </div>
              )}
            </>
          )}

          {/* Mobile hamburger */}
          <button
            className="md:hidden p-2 text-text"
            onClick={() => setMobileOpen(!mobileOpen)}
            aria-label="Menu"
            aria-expanded={mobileOpen}
          >
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              {mobileOpen ? (
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              ) : (
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
              )}
            </svg>
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      {mobileOpen && (
        <div className="md:hidden bg-white border-t border-border px-5 py-4 space-y-3">
          <Link
            href="/jobs"
            onClick={() => setMobileOpen(false)}
            className="block text-sm text-text py-2"
          >
            {th("jobs")}
          </Link>
          <Link
            href="/blog"
            onClick={() => setMobileOpen(false)}
            className="block text-sm text-text py-2"
          >
            {th("blog")}
          </Link>
          <Link
            href="/about"
            onClick={() => setMobileOpen(false)}
            className="block text-sm text-text py-2"
          >
            {th("about")}
          </Link>
          <Link
            href="/contact"
            onClick={() => setMobileOpen(false)}
            className="block text-sm text-text py-2"
          >
            {th("contact")}
          </Link>

          {/* Employer mobile links */}
          {isAuthenticated && isEmployer && (
            <div className="pt-2 border-t border-border space-y-1">
              <p className="text-xs font-semibold text-muted uppercase tracking-wider py-1">
                {te("panel")}
              </p>
              <Link
                href="/employer/dashboard"
                onClick={() => setMobileOpen(false)}
                className="block text-sm text-text py-2"
              >
                {te("dashboard")}
              </Link>
              <Link
                href="/employer/jobs"
                onClick={() => setMobileOpen(false)}
                className="block text-sm text-text py-2"
              >
                {te("myJobs")}
              </Link>
              <Link
                href="/employer/applications"
                onClick={() => setMobileOpen(false)}
                className="block text-sm text-text py-2"
              >
                {te("applications")}
              </Link>
              <Link
                href="/employer/jobs/create"
                onClick={() => setMobileOpen(false)}
                className="block text-sm text-hirovo-blue font-medium py-2"
              >
                {te("createJob")}
              </Link>
            </div>
          )}

          {!isLoading && !isAuthenticated && (
            <div className="flex gap-2 pt-2 border-t border-border">
              <Link
                href="/login"
                onClick={() => setMobileOpen(false)}
                className="flex-1 text-center px-4 py-2.5 rounded-lg text-sm font-medium text-text border border-border"
              >
                {ta("login")}
              </Link>
              <Link
                href="/register"
                onClick={() => setMobileOpen(false)}
                className="flex-1 text-center px-4 py-2.5 rounded-lg text-sm font-semibold text-white btn-gradient"
              >
                {ta("register")}
              </Link>
            </div>
          )}
        </div>
      )}
    </header>
  );
}

function EmployerDropdown({ te }: { te: (key: string) => string }) {
  const [open, setOpen] = useState(false);

  return (
    <div className="relative">
      <button
        onClick={() => setOpen(!open)}
        className="text-sm text-hirovo-blue hover:text-hirovo-blue/80 transition-colors font-medium flex items-center gap-1"
        aria-expanded={open}
      >
        {te("panel")}
        <svg
          className={`w-4 h-4 transition-transform ${open ? "rotate-180" : ""}`}
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
        </svg>
      </button>

      {open && (
        <div className="absolute top-8 left-0 w-52 bg-white rounded-xl shadow-card border border-border py-2 z-50">
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
          <div className="border-t border-border mt-1 pt-1">
            <Link
              href="/employer/jobs/create"
              onClick={() => setOpen(false)}
              className="block px-4 py-2.5 text-sm text-hirovo-blue font-medium hover:bg-card transition-colors"
            >
              {te("createJob")}
            </Link>
          </div>
        </div>
      )}
    </div>
  );
}

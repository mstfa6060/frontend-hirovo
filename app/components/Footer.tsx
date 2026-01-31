"use client";

import { useTranslations } from "next-intl";
import { Link } from "@/i18n/routing";
import Image from "next/image";

export default function Footer() {
  const t = useTranslations("footer");

  return (
    <footer className="bg-white/5 border-t border-white/10 text-white">
      <div className="max-w-[1120px] mx-auto px-5 py-12">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8 mb-8">
          {/* Brand */}
          <div className="col-span-2 md:col-span-1">
            <Link href="/" className="flex items-center gap-2 mb-4">
              <Image
                src="/logo/hirovo_logo_white.png"
                alt="Hirovo"
                width={32}
                height={32}
                className="object-contain rounded-md"
              />
              <span className="font-bold text-xl">Hirovo</span>
            </Link>
            <p className="text-white/60 text-sm">{t("description")}</p>
          </div>

          {/* Company */}
          <div>
            <h4 className="font-semibold mb-4">{t("company")}</h4>
            <ul className="space-y-2 text-sm">
              <li>
                <Link href="/about" className="text-white/70 hover:text-white transition-colors">
                  {t("about")}
                </Link>
              </li>
              <li>
                <Link href="/nasil-calisir" className="text-white/70 hover:text-white transition-colors">
                  {t("howItWorks")}
                </Link>
              </li>
              <li>
                <Link href="/contact" className="text-white/70 hover:text-white transition-colors">
                  {t("contact")}
                </Link>
              </li>
              <li>
                <Link href="/faq" className="text-white/70 hover:text-white transition-colors">
                  {t("faq")}
                </Link>
              </li>
            </ul>
          </div>

          {/* Resources */}
          <div>
            <h4 className="font-semibold mb-4">{t("resources")}</h4>
            <ul className="space-y-2 text-sm">
              <li>
                <Link href="/is-arayanlar" className="text-white/70 hover:text-white transition-colors">
                  {t("forJobSeekers")}
                </Link>
              </li>
              <li>
                <Link href="/isverenler" className="text-white/70 hover:text-white transition-colors">
                  {t("forEmployers")}
                </Link>
              </li>
              <li>
                <Link href="/kariyer-tavsiyeleri" className="text-white/70 hover:text-white transition-colors">
                  {t("careerTips")}
                </Link>
              </li>
              <li>
                <Link href="/sehirler" className="text-white/70 hover:text-white transition-colors">
                  Sehirler
                </Link>
              </li>
              <li>
                <Link href="/sektorler" className="text-white/70 hover:text-white transition-colors">
                  Sektorler
                </Link>
              </li>
              <li>
                <Link href="/pozisyonlar" className="text-white/70 hover:text-white transition-colors">
                  Pozisyonlar
                </Link>
              </li>
              <li>
                <Link href="/rehberler" className="text-white/70 hover:text-white transition-colors">
                  Kariyer Rehberleri
                </Link>
              </li>
            </ul>
          </div>

          {/* Legal */}
          <div>
            <h4 className="font-semibold mb-4">{t("legal")}</h4>
            <ul className="space-y-2 text-sm">
              <li>
                <Link href="/privacy" className="text-white/70 hover:text-white transition-colors">
                  {t("privacy")}
                </Link>
              </li>
              <li>
                <Link href="/terms" className="text-white/70 hover:text-white transition-colors">
                  {t("terms")}
                </Link>
              </li>
              <li>
                <Link href="/hesap-silme" className="text-white/70 hover:text-white transition-colors">
                  {t("deleteAccount")}
                </Link>
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom */}
        <div className="pt-8 border-t border-white/10 flex flex-col md:flex-row justify-between items-center gap-4">
          <span className="text-white/60 text-sm">&copy; {t("copyright")}</span>
          <div className="flex items-center gap-4">
            <a
              href="https://play.google.com/store/apps/details?id=com.hirovo_mobil_bare"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-2 text-white/70 hover:text-white transition-colors text-sm"
            >
              <svg className="w-5 h-5" viewBox="0 0 24 24" fill="currentColor">
                <path d="M3,20.5V3.5C3,2.91 3.34,2.39 3.84,2.15L13.69,12L3.84,21.85C3.34,21.6 3,21.09 3,20.5M16.81,15.12L6.05,21.34L14.54,12.85L16.81,15.12M20.16,10.81C20.5,11.08 20.75,11.5 20.75,12C20.75,12.5 20.53,12.9 20.18,13.18L17.89,14.5L15.39,12L17.89,9.5L20.16,10.81M6.05,2.66L16.81,8.88L14.54,11.15L6.05,2.66Z" />
              </svg>
              Google Play
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
}

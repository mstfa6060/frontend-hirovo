export const locales = [
  "tr", // Turkish (default)
  "en", // English
  "de", // German
  "fr", // French
  "es", // Spanish
  "ar", // Arabic
  "ru", // Russian
  "zh", // Chinese
  "ja", // Japanese
  "ko", // Korean
  "pt", // Portuguese
  "it", // Italian
  "nl", // Dutch
  "pl", // Polish
  "sv", // Swedish
  "no", // Norwegian
  "da", // Danish
  "fi", // Finnish
  "cs", // Czech
  "el", // Greek
  "he", // Hebrew
  "hu", // Hungarian
  "ro", // Romanian
  "sk", // Slovak
  "uk", // Ukrainian
  "vi", // Vietnamese
  "id", // Indonesian
  "ms", // Malay
  "th", // Thai
  "bn", // Bengali
  "hi", // Hindi
  "ta", // Tamil
  "te", // Telugu
  "mr", // Marathi
  "fa", // Persian
  "ur", // Urdu
  "bg", // Bulgarian
  "hr", // Croatian
  "sr", // Serbian
  "sl", // Slovenian
  "lt", // Lithuanian
  "lv", // Latvian
  "et", // Estonian
  "sw", // Swahili
  "af", // Afrikaans
  "is", // Icelandic
  "ga", // Irish
  "mt", // Maltese
  "am", // Amharic
  "hy", // Armenian
] as const;

export type Locale = (typeof locales)[number];

export const defaultLocale: Locale = "tr";

export const languageNames: Record<Locale, string> = {
  tr: "Türkçe",
  en: "English",
  de: "Deutsch",
  fr: "Français",
  es: "Español",
  ar: "العربية",
  ru: "Русский",
  zh: "中文",
  ja: "日本語",
  ko: "한국어",
  pt: "Português",
  it: "Italiano",
  nl: "Nederlands",
  pl: "Polski",
  sv: "Svenska",
  no: "Norsk",
  da: "Dansk",
  fi: "Suomi",
  cs: "Čeština",
  el: "Ελληνικά",
  he: "עברית",
  hu: "Magyar",
  ro: "Română",
  sk: "Slovenčina",
  uk: "Українська",
  vi: "Tiếng Việt",
  id: "Bahasa Indonesia",
  ms: "Bahasa Melayu",
  th: "ไทย",
  bn: "বাংলা",
  hi: "हिन्दी",
  ta: "தமிழ்",
  te: "తెలుగు",
  mr: "मराठी",
  fa: "فارسی",
  ur: "اردو",
  bg: "Български",
  hr: "Hrvatski",
  sr: "Српски",
  sl: "Slovenščina",
  lt: "Lietuvių",
  lv: "Latviešu",
  et: "Eesti",
  sw: "Kiswahili",
  af: "Afrikaans",
  is: "Íslenska",
  ga: "Gaeilge",
  mt: "Malti",
  am: "አማርኛ",
  hy: "Հայերեն",
};

// RTL languages
const rtlLocales = ["ar", "he", "fa", "ur"];

export function isRtlLocale(locale: string): boolean {
  return rtlLocales.includes(locale);
}

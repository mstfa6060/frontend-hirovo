import { getRequestConfig } from "next-intl/server";
import { locales, defaultLocale, type Locale } from "./config";
import type { AbstractIntlMessages } from "next-intl";

function deepMerge(
  fallback: AbstractIntlMessages,
  override: AbstractIntlMessages
): AbstractIntlMessages {
  const result: AbstractIntlMessages = { ...fallback };
  for (const key of Object.keys(override)) {
    const fallbackVal = fallback[key];
    const overrideVal = override[key];
    if (
      typeof fallbackVal === "object" &&
      fallbackVal !== null &&
      typeof overrideVal === "object" &&
      overrideVal !== null &&
      !Array.isArray(fallbackVal) &&
      !Array.isArray(overrideVal)
    ) {
      result[key] = deepMerge(
        fallbackVal as AbstractIntlMessages,
        overrideVal as AbstractIntlMessages
      );
    } else {
      result[key] = overrideVal;
    }
  }
  return result;
}

export default getRequestConfig(async ({ requestLocale }) => {
  let locale = await requestLocale;

  if (!locale || !locales.includes(locale as Locale)) {
    locale = defaultLocale;
  }

  const localeMessages = (await import(`../messages/${locale}.json`)).default;

  let messages: AbstractIntlMessages;
  if (locale === defaultLocale) {
    messages = localeMessages;
  } else {
    const fallbackMessages = (
      await import(`../messages/${defaultLocale}.json`)
    ).default;
    messages = deepMerge(fallbackMessages, localeMessages);
  }

  return {
    locale,
    messages,
    onError(error) {
      if (error.code === "MISSING_MESSAGE") return;
      console.error(error);
    },
    getMessageFallback({ namespace, key }) {
      return `${namespace}.${key}`;
    },
  };
});

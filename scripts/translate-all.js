const fs = require("fs");
const path = require("path");
const translate = require("google-translate-api-x");

// All supported languages (same as i18n/config.ts)
const locales = [
  "tr", // Turkish (source)
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
];

// Map our locale codes to Google Translate codes
const localeToGoogleCode = {
  tr: "tr",
  en: "en",
  de: "de",
  fr: "fr",
  es: "es",
  ar: "ar",
  ru: "ru",
  zh: "zh-CN",
  ja: "ja",
  ko: "ko",
  pt: "pt",
  it: "it",
  nl: "nl",
  pl: "pl",
  sv: "sv",
  no: "no",
  da: "da",
  fi: "fi",
  cs: "cs",
  el: "el",
  he: "he",
  hu: "hu",
  ro: "ro",
  sk: "sk",
  uk: "uk",
  vi: "vi",
  id: "id",
  ms: "ms",
  th: "th",
  bn: "bn",
  hi: "hi",
  ta: "ta",
  te: "te",
  mr: "mr",
  fa: "fa",
  ur: "ur",
  bg: "bg",
  hr: "hr",
  sr: "sr",
  sl: "sl",
  lt: "lt",
  lv: "lv",
  et: "et",
  sw: "sw",
  af: "af",
  is: "is",
  ga: "ga",
  mt: "mt",
  am: "am",
  hy: "hy",
};

const messagesDir = path.join(__dirname, "..", "messages");
const sourceFile = path.join(messagesDir, "tr.json");

// Flatten nested object to dot notation
function flatten(obj, prefix = "") {
  return Object.keys(obj).reduce((acc, key) => {
    const fullKey = prefix ? `${prefix}.${key}` : key;
    if (typeof obj[key] === "object" && obj[key] !== null) {
      Object.assign(acc, flatten(obj[key], fullKey));
    } else {
      acc[fullKey] = obj[key];
    }
    return acc;
  }, {});
}

// Unflatten dot notation back to nested object
function unflatten(obj) {
  const result = {};
  for (const key in obj) {
    const keys = key.split(".");
    let current = result;
    for (let i = 0; i < keys.length - 1; i++) {
      if (!current[keys[i]]) {
        current[keys[i]] = {};
      }
      current = current[keys[i]];
    }
    current[keys[keys.length - 1]] = obj[key];
  }
  return result;
}

// Translate a batch of texts
async function translateBatch(texts, targetLang) {
  try {
    const results = await translate(texts, {
      from: "tr",
      to: localeToGoogleCode[targetLang] || targetLang,
    });

    return Array.isArray(results)
      ? results.map((r) => r.text)
      : [results.text];
  } catch (error) {
    console.error(`Translation error for ${targetLang}:`, error.message);
    return texts; // Return original texts on error
  }
}

// Translate all content to a target language
async function translateToLanguage(sourceData, targetLang) {
  const flattened = flatten(sourceData);
  const keys = Object.keys(flattened);
  const values = Object.values(flattened);

  console.log(`  Translating ${values.length} strings to ${targetLang}...`);

  // Translate in batches of 50 to avoid rate limits
  const batchSize = 50;
  const translatedValues = [];

  for (let i = 0; i < values.length; i += batchSize) {
    const batch = values.slice(i, i + batchSize);
    const translated = await translateBatch(batch, targetLang);
    translatedValues.push(...translated);

    // Rate limiting - wait 500ms between batches
    if (i + batchSize < values.length) {
      await new Promise((resolve) => setTimeout(resolve, 500));
    }
  }

  // Reconstruct the object
  const translatedFlat = {};
  keys.forEach((key, index) => {
    translatedFlat[key] = translatedValues[index];
  });

  return unflatten(translatedFlat);
}

async function main() {
  const args = process.argv.slice(2);
  const mode = args[0]; // 'all', 'missing', or specific locale

  // Read source file
  const sourceData = JSON.parse(fs.readFileSync(sourceFile, "utf-8"));
  console.log("Source file (tr.json) loaded successfully");

  let targetLocales = [];

  if (mode === "missing") {
    // Only translate missing languages
    targetLocales = locales.filter((locale) => {
      if (locale === "tr") return false;
      const filePath = path.join(messagesDir, `${locale}.json`);
      return !fs.existsSync(filePath);
    });
    console.log(`Translating ${targetLocales.length} missing languages...`);
  } else if (mode && mode !== "all" && locales.includes(mode)) {
    // Translate specific language
    targetLocales = [mode];
  } else {
    // Translate all languages except source
    targetLocales = locales.filter((locale) => locale !== "tr");
    console.log(`Translating to ${targetLocales.length} languages...`);
  }

  if (targetLocales.length === 0) {
    console.log("No languages to translate.");
    return;
  }

  for (const locale of targetLocales) {
    console.log(`\nProcessing ${locale}...`);
    try {
      const translated = await translateToLanguage(sourceData, locale);
      const outputPath = path.join(messagesDir, `${locale}.json`);
      fs.writeFileSync(outputPath, JSON.stringify(translated, null, 2), "utf-8");
      console.log(`  Saved: ${locale}.json`);
    } catch (error) {
      console.error(`  Error translating ${locale}:`, error.message);
    }
  }

  console.log("\nTranslation complete!");
}

main().catch(console.error);

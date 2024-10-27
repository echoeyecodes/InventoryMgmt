import { languages } from "./data";
import en from "./languages/en/translation.json";
export const fallbackLng = "en";
export const supportedLngs = languages.map((lng) => lng.code);
const nameSpace = "translation";

export function getOptions(language = fallbackLng) {
  return {
    compatibilityJSON: "v3",
    debug: false,
    supportedLngs,
    preload: supportedLngs,
    fallbackLng,
    resources: {
      en: {
        translation: en,
      },
    },
    lng: language,
    ns: nameSpace,
  };
}

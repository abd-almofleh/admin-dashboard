import i18n, { InitOptions } from "i18next";
import { initReactI18next } from "react-i18next";
import Backend from "i18next-http-backend";
import LanguageDetector from "i18next-browser-languagedetector";
import { getSupportedLanguages, supportedLanguages, SupportedLanguagesType } from "config";

const I18nextOptions: InitOptions = {
  supportedLngs: getSupportedLanguages(),
  fallbackLng: supportedLanguages.en.code,
  debug: process.env.NODE_ENV !== "production",
  detection: {
    order: ["path", "localStorage", "cookie"],
    caches: ["cookie", "localStorage"],
    lookupCookie: "local",
    lookupLocalStorage: "local",
  },
  interpolation: {
    escapeValue: false,
  },
  load: "languageOnly",
};

i18n
  .use(initReactI18next)
  .use(LanguageDetector)
  .use(Backend)
  .init(I18nextOptions)
  .then((): void => {
    const local = i18n.resolvedLanguage as SupportedLanguagesType;
    document.documentElement.lang = local;
    document.documentElement.dir = supportedLanguages[local].direction;
  });
export default i18n;

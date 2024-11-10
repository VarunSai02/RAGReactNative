import i18next from "i18next";
import { initReactI18next } from "react-i18next";
import * as RNLocalize from "react-native-localize";

import enTranslation from "../locales/en/translation.json";
import esTranslation from "../locales/es/translation.json";
import frTranslation from "../locales/fr/translation.json";
import jaTranslation from "../locales/ja/translation.json";

export const supportedLngs: { [key: string]: { name: string; locale: string } } = {
    en: {
        name: "English",
        locale: "en-US"
    },
    es: {
        name: "Español",
        locale: "es-ES"
    },
    fr: {
        name: "Français",
        locale: "fr-FR"
    },
    ja: {
        name: "日本語",
        locale: "ja-JP"
    }
};

// Get the best language match from the device settings
const fallback = { languageTag: "en", isRTL: false };
const getBestLanguage = () => {
  const supportedLanguages = ['en', 'es', 'fr', 'ja'];
  const deviceLanguage = RNLocalize.getLocales()[0]?.languageTag || 'en';
  return supportedLanguages.includes(deviceLanguage) ? deviceLanguage : 'en';
};

const languageTag = getBestLanguage();
console.log('Detected language:', languageTag);

console.log(languageTag);
i18next
    .use(initReactI18next)
    .init({
        resources: {
            en: { translation: enTranslation },
            es: { translation: esTranslation },
            fr: { translation: frTranslation },
            ja: { translation: jaTranslation }
        },
        lng: languageTag, // Use the detected or fallback language
        fallbackLng: "en",
        supportedLngs: Object.keys(supportedLngs),
        debug: __DEV__, // Use React Native's `__DEV__` for debugging
        interpolation: {
            escapeValue: false // not needed for React as it escapes by default
        }
    });

export default i18next;

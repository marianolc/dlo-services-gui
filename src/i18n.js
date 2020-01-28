import i18n from "i18next";
import LanguageDetector from "i18next-browser-languagedetector";
import XHR from "i18next-xhr-backend";

import translationEn from "../locales/en/translation.json";
import translationEs from "../locales/es/translation.json";
i18n

    .use(XHR)
    .use(LanguageDetector)
    .init({
        debug: true,
        lng: localStorage.getItem('lang') || 'en',
        fallbackLng: localStorage.getItem('lang') || 'en', // use en if detected lng is not available

        keySeparator: false, // we do not use keys in form messages.welcome

        interpolation: {
            escapeValue: false // react already safes from xss
        },

        resources: {
            en: {
                translations: translationEn
            },
            es: {
                translations: translationEs
            }
        },
        // have a common namespace used around the full app
        ns: ["translations"],
        defaultNS: "translations"
    });

export default i18n;
import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';
import eng from "@/translate/eng.json";
import rus from "@/translate/rus.json";
import kaz from "@/translate/kaz.json";

const resources = {
    ENG: {
        translation: eng
    },
    RUS: {
        translation: rus
    },
    KAZ: {
        translation: kaz
    }
};

i18n
    .use(initReactI18next)
    .init({
        resources,
        lng: "ENG", // default language
        fallbackLng: "ENG",
        interpolation: {
            escapeValue: false // react already spaces from xss
        }
    });

export default i18n;
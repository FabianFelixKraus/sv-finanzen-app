import i18next from 'i18next';
import Backend from 'i18next-xhr-backend';
import LanguageDetector from 'i18next-browser-languagedetector';
import { createI18n } from 'vue-i18n';
import de from './locales/de.json';
import en from './locales/en.json';

i18next
    .use(Backend)
    .use(LanguageDetector)
    .init({
        fallbackLng: 'de',
        debug: true,
        interpolation: {
            escapeValue: false
        },
        backend: {
            loadPath: '/locales/{{lng}}.json',
            load: 'languageOnly', // Suppress warning for specific language not found
            allowMultiLoading: false, // Suppress loading multiple resources
            crossDomain: false, // Suppress CORS warning
        }
    });

const i18n = createI18n({
    legacy: false,
    locale: 'de',
    fallbackLocale: 'de',
    messages: {
        en: en,
        de: de
    }
});

export default i18n;

import i18n from 'i18next'
import { initReactI18next } from 'react-i18next'


import * as en from './translations/en.json'
import * as pt from './translations/pt.json'

i18n
    .use(initReactI18next)
    .init({
        compatibilityJSON: 'v3',
        resources: {
            en: en,
            pt: pt
        },
        lng: 'en', // default language
        fallbackLng: 'en', // fallback language
        interpolation: {
            escapeValue: false // react already safes from xss
        },

    })

export default i18n
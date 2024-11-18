import i18n from 'i18next'
import { initReactI18next } from 'react-i18next'
import * as SecureStore from 'expo-secure-store'

import * as en from './translations/en.json'
import * as pt from './translations/pt.json'

const LANGUAGE_KEY = 'app_language'

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

export const changeLanguage = async (lng: string) => {
    await SecureStore.setItemAsync(LANGUAGE_KEY, lng)
    await i18n.changeLanguage(lng)
}

// Function to load saved language on app start
export const loadSavedLanguage = async () => {
    const savedLanguage = await SecureStore.getItemAsync(LANGUAGE_KEY)
    if (savedLanguage) {
        await i18n.changeLanguage(savedLanguage)
    }
}

export default i18n
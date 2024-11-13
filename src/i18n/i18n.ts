import i18next, { ModuleType } from 'i18next'
import { initReactI18next } from 'react-i18next'
import AsyncStorage from '@react-native-async-storage/async-storage'
import { resources } from './translations'

// Type for supported languages
export type Language = keyof typeof resources

// Create a custom type for our async language detector
interface CustomLanguageDetector {
    type: ModuleType
    async: boolean
    detect: () => Promise<string>
    init: () => void
    cacheUserLanguage: (language: string) => Promise<void>
}

const LANGUAGE_DETECTOR: CustomLanguageDetector = {
    type: 'languageDetector',
    async: true,
    detect: async () => {
        try {
            const language = await AsyncStorage.getItem('language')
            return language || 'en'
        } catch {
            return 'en'
        }
    },
    init: () => { },
    cacheUserLanguage: async (language: string) => {
        try {
            await AsyncStorage.setItem('language', language)
        } catch (error) {
            console.error('Error caching language:', error)
        }
    },
}

i18next
    .use(LANGUAGE_DETECTOR)
    .use(initReactI18next)
    .init({
        resources,
        fallbackLng: 'en',
        debug: __DEV__,
        interpolation: {
            escapeValue: false,
        },
        react: {
            useSuspense: false,
        },
    })

export default i18next
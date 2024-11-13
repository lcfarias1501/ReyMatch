import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react'
import { StatusBar, View, Text, StyleSheet } from 'react-native'
import { lightTheme } from '../themes/lightTheme'
import { darkTheme } from '../themes/darkTheme'
import * as SecureStore from 'expo-secure-store'
import Animated, { useSharedValue, withTiming, useAnimatedStyle } from 'react-native-reanimated'
import { Theme } from '../interfaces/Theme'


interface ThemeContextType {
    theme: Theme
    switchTheme: () => void
}

const ThemeContext = createContext<ThemeContextType | null>(null)

interface ThemeProviderProps {
    children: ReactNode
}

export const ThemeProvider = ({ children }: ThemeProviderProps) => {
    const [theme, setTheme] = useState<Theme>(lightTheme)
    const themeOpacity = useSharedValue(1) // shared value for smooth transition

    const setStatusBarStyle = (currentTheme: Theme) => {
        StatusBar.setBarStyle(currentTheme === lightTheme ? 'dark-content' : 'light-content')
    }

    const switchTheme = async () => {
        const newTheme = theme === lightTheme ? darkTheme : lightTheme

        themeOpacity.value = 0 // start fading out the current theme

        // Wait until fade-out animation completes
        setTimeout(async () => {
            await SecureStore.setItemAsync('theme', newTheme === lightTheme ? 'light' : 'dark')
            setTheme(newTheme)
            setStatusBarStyle(newTheme)
            themeOpacity.value = withTiming(1, { duration: 200 }) // fade in the new theme
        }, 200) // Duration of fade out
    }

    useEffect(() => {
        const getInitialTheme = async () => {
            const savedTheme = await SecureStore.getItemAsync('theme')
            const currentTheme = savedTheme === 'dark' ? darkTheme : lightTheme
            setTheme(currentTheme)
            setStatusBarStyle(currentTheme)
        }

        getInitialTheme()
    }, [])

    const animatedBackgroundStyle = useAnimatedStyle(() => {
        return {
            backgroundColor: withTiming(theme.background, { duration: 200 }), // Smooth background color change
            opacity: themeOpacity.value, // Smooth fade transition
        }
    })

    return (
        <ThemeContext.Provider value={{ theme, switchTheme }}>
            <Animated.View style={[animatedBackgroundStyle, styles.container]}>
                {children}
            </Animated.View>
        </ThemeContext.Provider>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
})

export const useTheme = (): ThemeContextType => {
    const context = useContext(ThemeContext)
    if (!context) {
        throw new Error('useTheme must be used within a ThemeProvider')
    }
    return context
}
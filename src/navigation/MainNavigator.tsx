// src/navigation/MainNavigator.tsx
import React, { useEffect, useState } from 'react'
import { NavigationContainer } from '@react-navigation/native'
import * as SecureStore from 'expo-secure-store'
import LoadingScreen from '../components/app/LoadingScreen'
import AppNavigator from './AppNavigator'
import AuthNavigator from './AuthNavigator'

export default function MainNavigator() {
    
    const [userId, setUserId] = useState<string | null>(null)
    const [isLoading, setIsLoading] = useState(true)

    useEffect(() => {
        const checkUserAuth = async () => {
            try {
                // Attempt to get the user ID from SecureStore
                const storedUserId = await SecureStore.getItemAsync('userId')
                setUserId(storedUserId)
            } catch (error) {
                console.error('Failed to fetch user ID:', error)
            } finally {
                // Stop the loading state once user ID is checked
                setIsLoading(false)
            }
        }

        checkUserAuth()
    }, [])

    if (isLoading) {
        return <LoadingScreen />
    }

    return (
        <NavigationContainer>
            {userId ? <AppNavigator /> : <AuthNavigator />}
        </NavigationContainer>
    )
}

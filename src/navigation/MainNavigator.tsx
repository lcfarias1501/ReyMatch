import React, { useEffect, useState } from 'react'
import { createNativeStackNavigator } from '@react-navigation/native-stack'
import * as SecureStore from 'expo-secure-store'
import LoadingScreen from '../components/app/LoadingScreen'
import AppNavigator from './AppNavigator'
import AuthNavigator from './AuthNavigator'

const Main = createNativeStackNavigator()

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
        <Main.Navigator
            initialRouteName={userId ? 'AppNav' : 'AuthNav'}
            screenOptions={{
                headerShown: false,
            }}
        >
            <Main.Screen
                name='AuthNav'
                component={AuthNavigator}
            />
            <Main.Screen
                name='AppNav'
                component={AppNavigator}
            />
        </Main.Navigator>
    )
}

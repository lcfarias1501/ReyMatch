import React, { useEffect, useState } from 'react'
import { createNativeStackNavigator } from '@react-navigation/native-stack'
import * as SecureStore from 'expo-secure-store'
import LoadingScreen from '../components/app/LoadingScreen'
import AppNavigator from './AppNavigator'
import AuthNavigator from './AuthNavigator'
import WelcomeScreen from '../screens/Auth/WelcomeScreen'

const Main = createNativeStackNavigator()

export default function MainNavigator() {

    const [page, setPage] = useState<string>('')
    const [isLoading, setIsLoading] = useState(true)

    useEffect(() => {
        const checkUserAuth = async () => {
            try {
                // User has already enter the app?
                const enteredApp = await SecureStore.getItemAsync('enteredApp')
                if(!enteredApp){
                    setPage('Welcome')
                    return
                }
                // Attempt to get the user ID from SecureStore
                const storedUserId = await SecureStore.getItemAsync('userId')
                if (storedUserId) {
                    setPage('AppNav')
                    return 
                }
                // If the user has already entered the app and it not logged in
                setPage('AuthNav')
            } catch (error) {
                console.error(error)
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
            initialRouteName={page}
            screenOptions={{
                headerShown: false,
            }}
        >
            <Main.Screen
                name='AuthNav'
                component={AuthNavigator}
                options={{
                    gestureEnabled: false, 
                }}
            />

            <Main.Screen
                name='AppNav'
                component={AppNavigator}
                options={{
                    gestureEnabled: false, 
                }}
            />

            <Main.Screen
                name='Welcome'
                component={WelcomeScreen}
            />

        </Main.Navigator>
    )
}

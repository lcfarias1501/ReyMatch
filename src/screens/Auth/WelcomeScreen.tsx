import React from 'react'
import * as SecureStore from 'expo-secure-store'
import { StyleSheet, Text, View, TouchableOpacity } from 'react-native'
import { useNavigation } from '@react-navigation/native'

import { useTranslation } from 'react-i18next'

export default function WelcomeScreen() {

    const navigation = useNavigation<any>()

    const { t, i18n } = useTranslation()

    async function startWithApp() {
        try {
            // Store that the user has entered the app
            await SecureStore.setItemAsync('enteredApp', 'true')
            // Navigate to the AppNavigator
            navigation.navigate('AppNav')
        } catch (error) {
            console.error(error)
        }
    }

    function change() {
        i18n.changeLanguage(i18n.language === 'es' ? 'en' : 'es')
    }

    return (
        <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center',}}>
            <Text></Text>

            <TouchableOpacity onPress={change}>
                <Text>{t('welcome')}</Text>
            </TouchableOpacity>

        </View>
    )
}

const styles = StyleSheet.create({

})
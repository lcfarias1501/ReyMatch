import React from 'react'
import * as SecureStore from 'expo-secure-store'
import { StyleSheet, Text, View, TouchableOpacity } from 'react-native'
import { useNavigation } from '@react-navigation/native'

import { useTranslation } from 'react-i18next'

export default function WelcomeScreen() {
    const navigation = useNavigation<any>()
    const { t, i18n } = useTranslation()

    const change = async () => {
        const newLanguage = i18n.language === 'en' ? 'pt' : 'en';
        console.log(newLanguage)
        i18n.changeLanguage(newLanguage);
    }

    return (
        <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center', }}>
            <Text></Text>

            <TouchableOpacity
                onPress={change}
                style={styles.button}
            >
                <Text>{t('Welcome')}</Text>
            </TouchableOpacity>
        </View>
    )
}

const styles = StyleSheet.create({
    button: {
        borderRadius: 10,
        backgroundColor: 'red',
        padding: 10,
        marginHorizontal: 10,
    }
})
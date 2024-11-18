import React, { useState, useMemo, forwardRef } from 'react'
import { View, Text, TextInput, StyleSheet, ScrollView, TouchableOpacity } from 'react-native'
import { Icon } from 'react-native-elements'
import { useTranslation } from 'react-i18next'
import { useTheme } from '../../contexts/ThemeContext'
import { BottomSheetModal, BottomSheetScrollView } from '@gorhom/bottom-sheet'
import { changeLanguage } from '../../i18n/i18n'
import CountryFlag from 'react-native-country-flag'


const languages = [
    { code: 'en', name: 'English', flag: 'us' },
    { code: 'pt', name: 'Português', flag: 'pt' },
]

const LanguaguesModal = forwardRef<BottomSheetModal>(({ }, ref) => {

    const { t, i18n } = useTranslation()
    const { theme } = useTheme()

    const snapPoints = useMemo(() => ['75%', '97%'], [])

    const handleLanguageChange = async (languageCode: string) => {
        await changeLanguage(languageCode)
    }

    const onClose = () => {
        if (ref && "current" in ref) {
            ref.current?.close()
        }
    }

    return (
        <BottomSheetModal
            ref={ref}
            index={0}
            snapPoints={snapPoints}
            enableDynamicSizing={false}
            enablePanDownToClose={true}
            backgroundStyle={{ backgroundColor: theme.grey_background }}
            handleIndicatorStyle={{ backgroundColor: theme.grey_background }}
        >
            <View>

                <View style={styles.header}>

                    <Text />

                    <Text style={[styles.title, { color: theme.on_background }]}>
                        {t('Select Language')}
                    </Text>

                    <TouchableOpacity
                        onPress={onClose}
                    >
                        <Icon type='ionicon' name='close-outline' color={theme.on_background} />
                    </TouchableOpacity>

                </View>

                <BottomSheetScrollView contentContainerStyle={{ height: '90%', paddingHorizontal: 20 }} >

                    {languages.map((l, index) => {

                        const isLanguageSelected = l.code === i18n.language

                        return (
                            <TouchableOpacity
                                key={index}
                                style={[styles.languageItemButton]}
                                onPress={() => handleLanguageChange(l.code)}
                            >
                                <View style={{ flexDirection: 'row', alignItems: 'center', gap: 10 }} >
                                    <CountryFlag isoCode={l.flag} size={30} style={styles.flag} />
                                    <Text style={[styles.languageTitle, { color: theme.on_background }]}>{l.name}</Text>
                                </View>
                                <Icon
                                    type='ionicon'
                                    name={isLanguageSelected ? 'checkbox-outline' : 'square-outline'}
                                    color={isLanguageSelected ? theme.success : theme.on_background}
                                    size={30}
                                />
                            </TouchableOpacity>
                        )
                    })}

                </BottomSheetScrollView>

            </View>
        </BottomSheetModal>
    )
})

const styles = StyleSheet.create({

    header: {
        flexDirection: 'row', alignItems: 'center', justifyContent: 'space-around', marginBottom: 20,
    },

    title: {
        fontWeight: 'bold',
        fontSize: 20,
        textAlign: 'center',
    },

    languageItemButton: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        padding: 10,
    },

    flag: {
        borderRadius: 3,
    },

    languageTitle: {
        fontWeight: 'bold',
        fontSize: 18,
    },

})

export default LanguaguesModal
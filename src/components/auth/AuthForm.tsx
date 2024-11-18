import React, { useState, useEffect, useRef, useMemo, forwardRef, Ref, useCallback } from 'react'
import { View, Text, TextInput, StyleSheet } from 'react-native'
import { Icon } from 'react-native-elements'
import { useTranslation } from 'react-i18next'
import { useTheme } from '../../contexts/ThemeContext'
import { BottomSheetBackdrop, BottomSheetModal } from '@gorhom/bottom-sheet'
import LabelInput from '../app/LabelInput'


const AuthForm = forwardRef<BottomSheetModal>(({ }, ref) => {

    const { t } = useTranslation()
    const { theme } = useTheme()

    const snapPoints = useMemo(() => ['75%', '97%'], [])

    const [authType, setAuthType] = useState<'login' | 'register'>('login')
    const [username, setUsername] = useState('')
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')

    const changeAuthType = () => setAuthType(authType === 'login' ? 'register' : 'login')

    return (
        <BottomSheetModal
            ref={ref}
            index={0}
            snapPoints={snapPoints}
            enableDynamicSizing={false}
            enablePanDownToClose={false}
            backgroundStyle={{ backgroundColor: theme.grey_background }}
            handleIndicatorStyle={{ backgroundColor: theme.grey_background }}
        >
            <View style={{ paddingHorizontal: 15 }} >

                <Text style={[styles.title, { color: theme.on_background }]}>
                    {authType === 'login' ? t('Signin') : t('Signup')}
                </Text>

                <LabelInput
                    label='Email'
                    value={email}
                    onChangeText={setEmail}
                    placeholder={t('Email Address')}
                    keyboardType='email-address'
                />

            </View>
        </BottomSheetModal>
    )
})

const styles = StyleSheet.create({

    title: {
        fontWeight: 'bold',
        fontSize: 20,
        textAlign: 'center',
        marginBottom: 20,
    }

})

export default AuthForm
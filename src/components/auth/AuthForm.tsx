import React, { useState, useMemo, forwardRef, } from 'react'
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native'
import { Icon } from 'react-native-elements'
import { useTranslation } from 'react-i18next'
import { useTheme } from '../../contexts/ThemeContext'
import { BottomSheetModal } from '@gorhom/bottom-sheet'
import LabelInput from '../app/LabelInput'
import HorinzontalDivider from '../app/HorinzontalDivider'
import AuthProvidersOptions from './AuthProvidersOptions'


const AuthForm = forwardRef<BottomSheetModal>(({ }, ref) => {

    const { t } = useTranslation()
    const { theme } = useTheme()

    const snapPoints = useMemo(() => ['75%', '97%'], [])

    const [authType, setAuthType] = useState<'login' | 'register'>('login')
    const [username, setUsername] = useState('')
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [privacyAccepted, setPrivacyAccepted] = useState(false)

    const changeAuthType = () => setAuthType(authType === 'login' ? 'register' : 'login')

    function snapToIndex(index: number) {
        if (ref && "current" in ref) {
            ref.current?.snapToIndex(index)
        }
    }


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
            <View style={{ paddingHorizontal: 15, flex: 1 }} >

                <Text style={[styles.title, { color: theme.on_background }]}>
                    {authType === 'login' ? t('Signin') : t('Signup')}
                </Text>

                {authType === 'register' &&
                    <LabelInput
                        label='Username'
                        value={username}
                        onChangeText={setUsername}
                        placeholder={'Username'}
                        whenFocus={() => snapToIndex(1)}
                        whenReturnKeyboard={() => snapToIndex(0)}
                    />
                }
                <LabelInput
                    label='Email'
                    value={email}
                    onChangeText={setEmail}
                    placeholder={t('Email Address')}
                    keyboardType='email-address'
                    whenFocus={() => snapToIndex(1)}
                    whenReturnKeyboard={() => snapToIndex(0)}
                />

                <LabelInput
                    label={t('Password')}
                    value={password}
                    onChangeText={setPassword}
                    placeholder={t('Password')}
                    secureTextEntry
                    whenFocus={() => snapToIndex(1)}
                    whenReturnKeyboard={() => snapToIndex(0)}
                />

                {authType === 'register' &&
                    <TouchableOpacity
                        style={styles.privacyButton}
                        onPress={() => setPrivacyAccepted(!privacyAccepted)}
                    >
                        <View style={{ flexDirection: 'row', alignItems: 'center', gap: 10 }}>
                            <Icon
                                type='ionicon'
                                name={privacyAccepted ? 'checkbox-outline' : 'square-outline'}
                                color={privacyAccepted ? theme.success : theme.on_background}
                            />
                            <Text style={{ color: theme.on_background }} >{t('Accept privacy policy')}</Text>
                        </View>
                        <TouchableOpacity>
                            <Icon type='ionicon' name='help-circle-outline' color={'grey'} />
                        </TouchableOpacity>
                    </TouchableOpacity>
                }

                <TouchableOpacity
                    style={[styles.doneButton, { backgroundColor: theme.primary }]}
                >
                    <Text style={{ color: 'white', fontWeight: 'bold' }} >{t(authType === 'login' ? 'Signin' : 'Signup')}</Text>
                </TouchableOpacity>

                <HorinzontalDivider
                    label={t(authType === 'login' ? 'Signin with' : 'Signup with')}
                    labelColor={theme.on_background}
                    labelBackgroundColor={theme.grey_background}
                />

                <AuthProvidersOptions />

                <View style={styles.changeTypeButton}>
                    <Text style={{ color: theme.on_background }}>
                        {t(authType === 'login' ? "Don't have an account?" : "Already have an account?")}
                    </Text>
                    <Text
                        style={{ color: theme.primary, fontWeight: 'bold' }}
                        onPress={() => setAuthType(authType === 'login' ? 'register' : 'login')}
                    >
                        {t(authType === 'login' ? 'Signup' : 'Signin')}
                    </Text>
                </View>

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
    },

    privacyButton: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginVertical: 10,
    },

    doneButton: {
        borderRadius: 10,
        alignItems: 'center',
        justifyContent: 'center',
        height: 50,
        marginVertical: 20,
    },

    changeTypeButton: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
        gap: 10,
    },

})

export default AuthForm
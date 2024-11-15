import React, { useEffect } from 'react'
import { useTranslation } from 'react-i18next'
import {
    View,
    Text,
    StyleSheet,
    Animated,
    Dimensions,
    TouchableOpacity,
    ImageBackground,
} from 'react-native'
import { useTheme } from '../../contexts/ThemeContext'
import * as SecureStore from 'expo-secure-store'
import { useNavigation } from '@react-navigation/native'

const { width, height } = Dimensions.get('window')


export default function Welcome() {

    const { t, i18n } = useTranslation()
    const { theme } = useTheme()
    const navigation = useNavigation<any>()

    const logoScale = new Animated.Value(0)
    const titleOpacity = new Animated.Value(0)
    const buttonTranslateY = new Animated.Value(50)
    const buttonOpacity = new Animated.Value(0)

    useEffect(() => {
        // Sequence of animations
        Animated.sequence([
            // Logo animation
            Animated.spring(logoScale, {
                toValue: 1,
                tension: 10,
                friction: 2,
                useNativeDriver: true,
            }),
            // Title fade in
            Animated.timing(titleOpacity, {
                toValue: 1,
                duration: 800,
                useNativeDriver: true,
            }),
            // Button animation
            Animated.parallel([
                Animated.timing(buttonTranslateY, {
                    toValue: 0,
                    duration: 600,
                    useNativeDriver: true,
                }),
                Animated.timing(buttonOpacity, {
                    toValue: 1,
                    duration: 600,
                    useNativeDriver: true,
                }),
            ]),
        ]).start()
    }, [])

    async function onStartApp() {
        await SecureStore.setItemAsync('enteredApp', 'true')
        navigation.navigate('AuthNav')
    }

    return (
        <ImageBackground
            source={require('../../../assets/images/background.jpg')}
            style={styles.container}
        >
            <View style={styles.overlay}>
                <View style={styles.content}>

                    <View style={{ alignItems: 'center', justifyContent: 'center', height: '80%' }}>

                        <Animated.Image
                            source={require('../../../assets/images/ReyMatchLogo.png')}
                            style={[
                                styles.logo,
                                {
                                    transform: [{ scale: logoScale }],
                                },
                            ]}
                        />

                        <Animated.View
                            style={[
                                styles.titleContainer,
                                { opacity: titleOpacity },
                            ]}
                        >
                            <Text style={styles.title}>ReyMatch</Text>
                            <Text style={styles.subtitle}>
                                {t('Connect Match Win')}
                            </Text>
                        </Animated.View>

                    </View>

                    <Animated.View
                        style={[
                            styles.buttonContainer,
                            {
                                opacity: buttonOpacity,
                                transform: [{ translateY: buttonTranslateY }],
                            },
                        ]}
                    >
                        <TouchableOpacity
                            style={[styles.button, { backgroundColor: theme.primary }]}
                            onPress={onStartApp}
                            activeOpacity={0.8}
                        >
                            <Text style={styles.buttonText}>{t('Start Now')}</Text>
                        </TouchableOpacity>

                    </Animated.View>
                </View>
            </View>
        </ImageBackground>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        width: width,
        height: height,
    },
    overlay: {
        flex: 1,
        backgroundColor: 'rgba(0,0,0,0.6)',
        justifyContent: 'center',
        alignItems: 'center',
    },
    content: {
        alignItems: 'center',
        justifyContent: 'space-between',
        flex: 1,
        padding: 20,
    },
    logo: {
        width: 150,
        height: 150,
        marginBottom: 10,
        resizeMode: 'contain',
    },
    titleContainer: {
        alignItems: 'center',
        marginBottom: 50,
    },
    title: {
        fontSize: 42,
        fontWeight: 'bold',
        color: '#FFFFFF',
        marginBottom: 10,
        textShadowColor: 'rgba(0, 0, 0, 0.75)',
        textShadowOffset: { width: -1, height: 1 },
        textShadowRadius: 10,
    },
    subtitle: {
        fontSize: 18,
        color: '#E0E0E0',
        textAlign: 'center',
        fontStyle: 'italic',
    },
    buttonContainer: {
        width: '100%',
        alignItems: 'center',
    },
    button: {
        width: width * 0.7,
        padding: 15,
        borderRadius: 27,
        overflow: 'hidden',
        shadowColor: '#000',
        shadowOffset: {
            width: 0,
            height: 2,
        },
        alignItems: 'center',
        justifyContent: 'center',
        elevation: 5,
        marginBottom: 20
    },
    buttonText: {
        color: '#FFFFFF',
        fontWeight: 'bold',
    },
})
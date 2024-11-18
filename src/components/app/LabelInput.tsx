import { useState, useRef, useCallback, memo } from 'react'
import { StyleSheet, Text, View, TextInput, Animated, TouchableOpacity, KeyboardTypeOptions } from 'react-native'
import { Icon } from 'react-native-elements'
import { useTheme } from '../../contexts/ThemeContext'

interface Props {
    label: string
    value: string
    onChangeText: (text: string) => void
    placeholder: string
    secureTextEntry?: boolean
    keyboardType?: KeyboardTypeOptions
}

const LabelInput = ({
    label,
    onChangeText,
    placeholder,
    value,
    keyboardType,
    secureTextEntry = false
}: Props) => {
    const { theme } = useTheme()
    const [isFocused, setIsFocused] = useState(false)
    const [passwordVisible, setPasswordVisible] = useState(false)

    const inputRef = useRef<TextInput>(null)
    const labelAnimation: any = useRef(new Animated.Value(value ? 1 : 0)).current

    // Memoized handlers
    const animateLabel = useCallback((toValue: number) => {
        Animated.timing(labelAnimation, {
            toValue,
            duration: 200,
            useNativeDriver: false,
        }).start()
    }, [labelAnimation])

    const focusInput = useCallback(() => {
        inputRef.current?.focus()
        setIsFocused(true)
        if (!value) animateLabel(1)
    }, [value, animateLabel])

    const blurInput = useCallback(() => {
        inputRef.current?.blur()
        setIsFocused(false)
        if (!value) animateLabel(0)
    }, [value, animateLabel])

    const clearInput = useCallback(() => {
        onChangeText('')
        animateLabel(0)
    }, [onChangeText, animateLabel])

    const togglePasswordVisibility = useCallback(() => {
        setPasswordVisible(prev => !prev)
    }, [])

    const handleChangeText = useCallback((text: string) => {
        onChangeText(text)
        if (text && labelAnimation._value === 0) {
            animateLabel(1)
        } else if (!text && !isFocused) {
            animateLabel(0)
        }
    }, [onChangeText, labelAnimation, isFocused, animateLabel])

    // Animated styles
    const labelStyle = {
        transform: [
            {
                translateY: labelAnimation.interpolate({
                    inputRange: [0, 1],
                    outputRange: [0, -25]
                })
            },
            {
                scale: labelAnimation.interpolate({
                    inputRange: [0, 1],
                    outputRange: [1, 0.8]
                })
            }
        ],
        opacity: labelAnimation
    }

    return (
        <View style={[
            styles.container,
            { borderColor: isFocused ? theme.primary : theme.background }
        ]}>
            <Animated.Text
                style={[
                    styles.label,
                    labelStyle,
                    {
                        color: theme.on_background,
                        backgroundColor: theme.grey_background
                    }
                ]}
            >
                {label}
            </Animated.Text>

            <TextInput
                ref={inputRef}
                value={value}
                onChangeText={handleChangeText}
                placeholder={!isFocused ? placeholder : ''}
                secureTextEntry={secureTextEntry && !passwordVisible}
                keyboardType={keyboardType}
                onFocus={focusInput}
                onBlur={blurInput}
                style={[
                    styles.input,
                    {
                        width: value ? '85%' : '100%',
                        color: theme.on_background
                    }
                ]}
                placeholderTextColor={'grey'}
                selectionColor={theme.primary}
            />

            {value ? (
                <TouchableOpacity
                    style={styles.rightButton}
                    onPress={secureTextEntry ? togglePasswordVisibility : clearInput}
                >
                    <Icon
                        type='ionicon'
                        name={secureTextEntry
                            ? (passwordVisible ? 'eye-outline' : 'eye-off-outline')
                            : 'close-circle-outline'
                        }
                        color={theme.primary}
                    />
                </TouchableOpacity>
            ) : null}
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        marginVertical: 10,
        height: 50,
        borderRadius: 10,
        borderWidth: 1.5,
        paddingHorizontal: 10,
    },
    input: {
        height: '100%',
        fontWeight: 'bold',
    },
    label: {
        position: 'absolute',
        left: 10,
        fontWeight: 'bold',
        paddingHorizontal: 5,
    },
    rightButton: {
        width: '15%',
        height: '100%',
        alignItems: 'flex-end',
        justifyContent: 'center',
    },
})


export default memo(LabelInput)
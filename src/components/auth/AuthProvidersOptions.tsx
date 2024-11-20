import React from 'react'
import { StyleSheet, Text, TouchableOpacity, View, Platform } from 'react-native'
import { useTheme } from '../../contexts/ThemeContext'
import { Icon } from 'react-native-elements'


export default function AuthProvidersOptions() {

    const { theme } = useTheme()

    return (
        <View style={styles.container}>

            <TouchableOpacity>
                <Icon
                    type='ionicon'
                    name='logo-google'
                    color={theme.on_background}
                    size={30}
                />
            </TouchableOpacity>

            <TouchableOpacity>
                <Icon
                    type='ionicon'
                    name='logo-facebook'
                    color={'#1E90FF'}
                    size={30}
                />
            </TouchableOpacity>

            {Platform.OS === 'ios' &&
                <TouchableOpacity>
                    <Icon
                        type='ionicon'
                        name='logo-apple'
                        color={theme.on_background}
                        size={30}
                    />
                </TouchableOpacity>
            }
        </View>
    )
}

const styles = StyleSheet.create({

    container: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
        gap: 40,
        marginVertical: 25
    },

})
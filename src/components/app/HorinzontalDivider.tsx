import { StyleSheet, Text, View } from 'react-native'
import React from 'react'

interface Props {
    label?: string
    labelColor?: string
    labelBackgroundColor?: string
}

export default function HorinzontalDivider({ label, labelColor, labelBackgroundColor }: Props) {

    return (
        <View style={styles.container}>
            {label && <Text style={[styles.label, { color: labelColor, backgroundColor: labelBackgroundColor }]} >{label}</Text>}
        </View>
    )
}

const styles = StyleSheet.create({

    container: {
        borderWidth: 1,
        borderColor: 'grey',
        height: 1,
        justifyContent: 'center',
        alignItems: 'center',
        borderRadius: 10
    },

    label: {
        fontWeight: 'semibold',
        paddingHorizontal: 20,
        alignSelf: 'center',
        position: 'absolute'
    },

})
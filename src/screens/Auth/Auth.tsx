import React from 'react'
import { StyleSheet, Text, View } from 'react-native'
import { useSafeAreaInsets } from 'react-native-safe-area-context'

export default function Auth() {

  const top = useSafeAreaInsets().top

  return (
    <View style={{ flex: 1 }}>
      <View style={{ paddingTop: top }}>

        

      </View>
    </View>
  )
}

const styles = StyleSheet.create({


})
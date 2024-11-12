// src/navigation/AppNavigator.tsx
import React from 'react'
import { createNativeStackNavigator } from '@react-navigation/native-stack'

const Auth = createNativeStackNavigator()

export default function AuthNavigator() {
  return (
    <Auth.Navigator>
        <></>
    </Auth.Navigator>
  )
}

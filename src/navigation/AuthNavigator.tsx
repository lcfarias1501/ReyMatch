// src/navigation/AppNavigator.tsx
import React from 'react'
import { createNativeStackNavigator } from '@react-navigation/native-stack'
import Auth from '../screens/Auth/Auth'

const Stack = createNativeStackNavigator()

export default function AuthNavigator() {
  return (
    <Stack.Navigator
      initialRouteName='Auth'
    >
      <Stack.Screen
        name='Auth'
        component={Auth}
        options={{
          headerShown: false, 
        }}
      />


    </Stack.Navigator>
  )
}

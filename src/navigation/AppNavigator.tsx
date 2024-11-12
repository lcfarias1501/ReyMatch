// src/navigation/AppNavigator.tsx
import React from 'react'
import { createNativeStackNavigator } from '@react-navigation/native-stack'
import Home from '../screens/Home/Home'

const App = createNativeStackNavigator()

export default function AppNavigator() {
  return (
    <App.Navigator>
        <App.Screen
          name='Home'
          component={Home}
        />
    </App.Navigator>
  )
}

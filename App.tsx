import './src/i18n/i18n'
import i18n from './src/i18n/i18n'
import 'react-native-gesture-handler'

import { NavigationContainer } from "@react-navigation/native"
import MainNavigator from "./src/navigation/MainNavigator"
import { GestureHandlerRootView } from "react-native-gesture-handler"


export default function App() {
  return (
    <GestureHandlerRootView style={{ flex: 1 }}>
      <NavigationContainer>
        <MainNavigator/>
      </NavigationContainer>
    </GestureHandlerRootView>
  )
}
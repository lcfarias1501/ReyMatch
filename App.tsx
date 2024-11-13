import 'react-native-gesture-handler'
import i18n from './src/i18n/i18n'
import { I18nextProvider } from 'react-i18next'
import MainNavigator from "./src/navigation/MainNavigator"
import { NavigationContainer } from "@react-navigation/native"
import { GestureHandlerRootView } from "react-native-gesture-handler"
import { ThemeProvider } from './src/contexts/ThemeContext'


export default function App() {
  return (
    <I18nextProvider i18n={i18n}>
      <GestureHandlerRootView style={{ flex: 1 }}>
        <NavigationContainer>
          <ThemeProvider>
            <MainNavigator />
          </ThemeProvider>
        </NavigationContainer>
      </GestureHandlerRootView>
    </I18nextProvider>
  )
}
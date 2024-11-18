import React, { useEffect, useRef } from 'react'
import { StyleSheet, Text, TouchableOpacity, View, Image } from 'react-native'
import { useSafeAreaInsets } from 'react-native-safe-area-context'
import { useTheme } from '../../contexts/ThemeContext'
import { Icon } from 'react-native-elements'
import { useTranslation } from 'react-i18next'
import AuthForm from '../../components/auth/AuthForm'
import { BottomSheetModal } from '@gorhom/bottom-sheet'
import LanguaguesModal from '../../components/auth/LanguageModal'

export default function Auth() {

  const top = useSafeAreaInsets().top
  const { theme, switchTheme } = useTheme()
  const { t } = useTranslation()

  const bottomsheetRef = useRef<BottomSheetModal>(null)
  const languagesRef = useRef<BottomSheetModal>(null)

  const openBottomSheet = () => bottomsheetRef.current?.present()
  useEffect(() => { openBottomSheet() }, [])

  function openLanguagesModal() {
    languagesRef.current?.present()
  }


  return (
    <View style={{ flex: 1, backgroundColor: theme.background, paddingTop: top, paddingHorizontal: 15 }}>

      <View style={styles.header}>

        <Image
          source={require('../../../assets/images/ReyMatchLogo.png')}
          style={{ width: 50, height: 50, resizeMode: 'contain' }}
        />

        <View style={{ flexDirection: 'row', alignItems: 'center', gap: 5 }}>

          <TouchableOpacity
            style={[styles.headerButton, { borderColor: theme.on_background }]}
            onPress={openLanguagesModal}
          >
            <Icon
              name='language-outline'
              type='ionicon'
              size={20}
              color={theme.on_background}
            />
          </TouchableOpacity>

          <TouchableOpacity
            style={[styles.headerButton, { borderColor: theme.on_background }]}
            onPress={switchTheme}
          >
            <Icon
              name={theme.selected === 'Light' ? 'sunny-outline' : 'moon-outline'}
              type='ionicon'
              size={20}
              color={theme.on_background}
            />
          </TouchableOpacity>

        </View>

      </View>


      <Text style={[styles.title, { color: theme.on_background }]}>{t('Welcome')}</Text>

      <AuthForm ref={bottomsheetRef} />

      <LanguaguesModal ref={languagesRef} />

    </View>
  )
}

const styles = StyleSheet.create({

  headerButton: {
    marginBottom: 10,
    padding: 5,
    borderRadius: 10,
    borderWidth: 1.5,
    width: 35,
    height: 35,
    alignItems: 'center',
    justifyContent: 'center',
  },

  title: {
    fontWeight: 'bold',
    fontSize: 40,
    textAlign: 'center',
  },

  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: 20,
    paddingHorizontal: 5,
  }

})
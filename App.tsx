import 'react-native-gesture-handler';
import React, { useCallback, useEffect } from 'react';
import * as SplashScreen from 'expo-splash-screen';
import { useFonts, DMSans_400Regular } from '@expo-google-fonts/dm-sans';
import { DMSerifDisplay_400Regular } from '@expo-google-fonts/dm-serif-display';
import { ThemeProvider } from 'styled-components/native';
import theme from './src/theme';
import { SignIn } from '@screens/SignIn';
import { StatusBar } from 'expo-status-bar';
import { AuthProvider } from '@hooks/auth';

import { Routes } from './src/routes';


export default function App() {
  const [fontsLoaded] = useFonts({
    DMSans_400Regular,
    DMSerifDisplay_400Regular
  })

  const onFontsLoading = useCallback(async () => {
    await SplashScreen.preventAutoHideAsync();
  }, []);

  const onFontsLoaded = useCallback(async () => {
    await SplashScreen.hideAsync();
  }, []);

  useEffect(() => {
    async function checkFontsLoaded() {
      if(!fontsLoaded) {
        await onFontsLoading()
      } else {
        await onFontsLoaded()
      }
    }

    checkFontsLoaded()
  }, [fontsLoaded])

  if(!fontsLoaded){
    return null;
  }

  return (
    <ThemeProvider theme={theme}>
      <StatusBar style='light' translucent backgroundColor='transparent'/>

      <AuthProvider>
        <Routes />
      </AuthProvider>
    </ThemeProvider>
  );
}


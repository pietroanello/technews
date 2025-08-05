import RadialGradientBackground from '@/components/RadialGradientBackground'
import { Colors } from '@/constants/Colors'
import queryClient from '@/lib/tanstack'
import { QueryClientProvider } from '@tanstack/react-query'
import { Stack } from 'expo-router'
import { StatusBar } from 'expo-status-bar'
import * as SystemUI from 'expo-system-ui'
import { Provider } from 'jotai'
import { Fragment, useEffect } from 'react'
import { Platform } from 'react-native'
import { GestureHandlerRootView } from 'react-native-gesture-handler'
import 'react-native-reanimated'

export default function RootLayout() {
  // setting this to the same color as main bg to avoid
  // white flash on android while changing screen
  useEffect(() => {
    ;(async () => {
      await SystemUI.setBackgroundColorAsync(Colors.background)
    })()
  }, [])

  const GestureWrapper = Platform.OS === 'web' ? Fragment : GestureHandlerRootView

  return (
    <QueryClientProvider client={queryClient}>
      <Provider>
        <Stack
          screenLayout={({ children, route }) => (
            <RadialGradientBackground id={route.key}>{children}</RadialGradientBackground>
          )}
        >
          <Stack.Screen name='index' options={{ headerShown: false }} />
          <Stack.Screen name='[articleId]' options={{ headerShown: false }} />
          <Stack.Screen name='+not-found' />
        </Stack>

        <StatusBar style='auto' />
      </Provider>
    </QueryClientProvider>
  )
}

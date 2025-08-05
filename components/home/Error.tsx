import SvgLogo from '@/assets/svgs/LogoSvg'
import React from 'react'
import { StyleSheet, View } from 'react-native'
import { useSafeAreaInsets } from 'react-native-safe-area-context'
import Button from '../Button'
import { ThemedText } from '../ThemedText'

const Error = ({ onRefresh }: { onRefresh: () => void }) => {
  const { top } = useSafeAreaInsets()

  return (
    <View style={[styles.main, { marginVertical: top }]}>
      <SvgLogo width={150} />

      <View style={styles.container}>
        <ThemedText style={styles.text} variant='h2'>
          Oops! Looks like there&apos;s a problem loading articles
        </ThemedText>
        <Button onPress={onRefresh}>
          <ThemedText>Try again</ThemedText>
        </Button>
      </View>
    </View>
  )
}

export default Error

const styles = StyleSheet.create({
  main: {
    padding: 20,
    flex: 1,
    justifyContent: 'center',
  },
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    gap: 25,
  },
  text: {
    textAlign: 'center',
  },
})

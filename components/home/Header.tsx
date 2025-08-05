import SvgLogo from '@/assets/svgs/LogoSvg'
import { Colors } from '@/constants/Colors'
import withTransitionAtom from '@/store'
import { useAtom } from 'jotai'
import React, { useEffect, useState } from 'react'
import { Platform, StyleSheet, View } from 'react-native'
import { useSafeAreaInsets } from 'react-native-safe-area-context'
import Button from '../Button'
import { ThemedText } from '../ThemedText'

const Header = () => {
  const { top } = useSafeAreaInsets()
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState(false)
  const [transition, setTransition] = useAtom(withTransitionAtom)

  useEffect(() => {
    let timeout = null
    if (error) {
      timeout = setTimeout(() => {
        setError(false)
      }, 1000)
    }

    return () => {
      timeout && clearTimeout(timeout)
    }
  }, [error])

  return (
    <View style={[styles.header, { marginTop: top }]}>
      <SvgLogo width={150} />
      {Platform.OS !== 'web' && (
        <Button
          style={{ paddingVertical: 5, paddingHorizontal: 10 }}
          disabled={isLoading}
          onPress={() => {
            setTransition(async (prev: Promise<boolean>) => {
              try {
                setIsLoading(true)
                return !(await prev)
              } catch {
                setError(true)
              } finally {
                setIsLoading(false)
              }
            })
          }}
        >
          <ThemedText style={{ fontSize: 12, color: error ? Colors.red : Colors.white }}>
            {error ? 'Error, retry!' : transition ? 'transition active' : 'navigation active'}
          </ThemedText>
        </Button>
      )}
    </View>
  )
}

export default Header

const styles = StyleSheet.create({
  header: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
})

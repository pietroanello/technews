import RouterHead from 'expo-router/head'
import React, { PropsWithChildren } from 'react'
import { Platform } from 'react-native'

const Head = ({ children, ...rest }: PropsWithChildren) => {
  if (Platform.OS === 'ios') {
    return null
  }

  return <RouterHead {...rest}>{children}</RouterHead>
}

export default Head

import { Colors } from '@/constants/Colors'
import { StyleSheet, Text, TextProps } from 'react-native'

export type ThemedTextProps = TextProps & {
  variant?: 'p' | 'h1' | 'h2' | 'link'
}

export function ThemedText({ style, variant = 'p', ...rest }: ThemedTextProps) {
  const isHeader = variant === 'h1' || variant === 'h2'
  const accessibilityRole = isHeader ? 'header' : 'text'
  const aria = isHeader
    ? {
        'aria-level': variant === 'h2' ? '2' : '1',
      }
    : {}

  return (
    <Text
      accessibilityRole={accessibilityRole}
      style={[{ color: Colors.white }, styles[variant], style]}
      {...aria}
      {...rest}
    />
  )
}

const styles = StyleSheet.create({
  h1: {
    fontSize: 40,
    lineHeight: 44,
    fontWeight: 700,
  },
  h2: {
    fontSize: 24,
    lineHeight: 28,
    fontWeight: '700',
  },
  p: {
    fontSize: 16,
    lineHeight: 24,
  },
  link: {
    fontSize: 16,
    lineHeight: 24,
    color: Colors.red,
    textDecorationLine: 'underline',
  },
})

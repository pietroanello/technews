import { Colors } from '@/constants/Colors'
import React, { ReactNode, useState } from 'react'
import { Pressable, PressableProps, StyleProp, StyleSheet, ViewStyle } from 'react-native'

const Button = (
  props: PressableProps & {
    style?: StyleProp<ViewStyle>
    children: ReactNode | ReactNode[]
  }
) => {
  const [isHovered, setIsHovered] = useState(false)
  const backgroundColor = isHovered ? Colors.cardHover : Colors.cardBackground

  return (
    <Pressable
      onHoverIn={() => setIsHovered(true)}
      onHoverOut={() => setIsHovered(false)}
      {...props}
      style={[styles.button, { backgroundColor }, props.style, { opacity: props.disabled ? 0.5 : 1 }]}
    >
      {props.children}
    </Pressable>
  )
}

export default Button

const styles = StyleSheet.create({
  button: {
    borderRadius: 12,
    borderWidth: 1,
    borderColor: Colors.border,
    paddingHorizontal: 16,
    paddingVertical: 10,
  },
})

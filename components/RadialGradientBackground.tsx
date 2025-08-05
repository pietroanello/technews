import { Colors } from '@/constants/Colors'
import { PropsWithChildren } from 'react'
import { StyleSheet, View } from 'react-native'
import Svg, { Circle, Defs, Pattern, Rect } from 'react-native-svg'

const RadialGradientBackground = ({ children, id }: PropsWithChildren & { id: string }) => {
  return (
    <View style={[styles.container, { backgroundColor: Colors.background }]}>
      <Svg width='100%' height='100%' style={StyleSheet.absoluteFillObject}>
        <Defs>
          <Pattern id={id} patternUnits='userSpaceOnUse' width='25' height='25'>
            <Circle cx='15' cy='15' r='1' fill='#2c2a36' />
          </Pattern>
        </Defs>

        <Rect width='100%' height='100%' fill={`url(#${id})`} />
      </Svg>

      <View style={styles.content}>{children}</View>
    </View>
  )
}

export default RadialGradientBackground

const styles = StyleSheet.create({
  container: {
    flex: 1,
    position: 'relative',
  },
  content: {
    flex: 1,
  },
})

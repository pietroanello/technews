import * as React from 'react'
import { View } from 'react-native'
import Svg, { Path, SvgProps } from 'react-native-svg'

const CommentSvg = ({ width = 24, ...rest }: SvgProps & { width: number }) => {
  return (
    <View style={{ width, aspectRatio: 1 / 1 }}>
      <Svg
        width={width}
        height='100%'
        fill='none'
        stroke='currentColor'
        strokeLinecap='round'
        strokeLinejoin='round'
        strokeWidth={2}
        viewBox={`0 0 24 24`}
        {...rest}
      >
        <Path d='M2.992 16.342a2 2 0 0 1 .094 1.167l-1.065 3.29a1 1 0 0 0 1.236 1.168l3.413-.998a2 2 0 0 1 1.099.092 10 10 0 1 0-4.777-4.719' />
      </Svg>
    </View>
  )
}
export default CommentSvg

import { View } from 'react-native'
import Svg, { Path, SvgProps } from 'react-native-svg'

const SignatureSvg = ({ width = 24, ...rest }: SvgProps & { width: number }) => {
  return (
    <View style={{ width, aspectRatio: 1 / 1 }}>
      <Svg
        width='100%'
        height='100%'
        fill='none'
        stroke='currentColor'
        strokeLinecap='round'
        strokeLinejoin='round'
        strokeWidth={2}
        viewBox={`0 0 24 24`}
        {...rest}
      >
        <Path d='m21 17-2.156-1.868A.5.5 0 0 0 18 15.5v.5a1 1 0 0 1-1 1h-2a1 1 0 0 1-1-1c0-2.545-3.991-3.97-8.5-4a1 1 0 0 0 0 5c4.153 0 4.745-11.295 5.708-13.5a2.5 2.5 0 1 1 3.31 3.284M3 21h18' />
      </Svg>
    </View>
  )
}
export default SignatureSvg

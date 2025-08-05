import { Dimensions } from 'react-native'

const useWindowSize = () => {
  return Dimensions.get('window')
}

export default useWindowSize

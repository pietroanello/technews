import AsyncStorage from '@react-native-async-storage/async-storage'
import { atomWithStorage, createJSONStorage } from 'jotai/utils'
import { Platform } from 'react-native'

const asyncStore = createJSONStorage(() => AsyncStorage)

const withTransitionAtom = atomWithStorage(
  'withTransition',
  false,
  Platform.OS === 'web' ? undefined : asyncStore,
  {
    getOnInit: true,
  }
)

export default withTransitionAtom

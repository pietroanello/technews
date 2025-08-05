import React from 'react'
import { StyleSheet } from 'react-native'
import Skeleton from 'react-native-reanimated-skeleton'

const ArticleLoader = () => {
  return (
    <Skeleton
      isLoading={true}
      containerStyle={styles.skeletonContainer}
      layout={[styles.skeletonLayout, styles.text, styles.text2]}
      boneColor='#181622'
      highlightColor='#211f2d'
      animationDirection='horizontalRight'
    />
  )
}

export default ArticleLoader

const styles = StyleSheet.create({
  skeletonContainer: {
    flex: 1,
  },
  skeletonLayout: {
    flex: 0.4,
    width: '100%',
  },
  text: {
    height: 24,
    width: '100%',
    margin: 20,
  },
  text2: {
    height: 24,
    width: '100%',
    margin: 20,
    marginTop: 'auto',
  },
})

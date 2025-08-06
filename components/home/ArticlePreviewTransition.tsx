import { Colors } from '@/constants/Colors'
import useWindowSize from '@/hooks/useWindowSize'
import { Article } from '@/types'
import React, { memo, useCallback, useEffect, useMemo, useState } from 'react'
import { BackHandler, Pressable, StyleSheet, View } from 'react-native'
import Animated, {
  AnimationCallback,
  runOnJS,
  useAnimatedStyle,
  useSharedValue,
  withTiming,
} from 'react-native-reanimated'
import { ExternalLink } from '../ExternalLink'
import { ThemedText } from '../ThemedText'
import ArticleStatsBy from './ArticleStatsBy'

const AnimatedPressable = Animated.createAnimatedComponent(Pressable)
const withCustomTiming = (toValue: number, userConfig?: object, callback?: AnimationCallback) => {
  'worklet'
  return withTiming(
    toValue,
    {
      duration: 300,
    },
    callback
  )
}

const ArticlePreviewTransition = memo(function ArticlePreviewTransition({
  article,
  onArticleToggle,
}: {
  article: Article
  onArticleToggle?: (isOpen: boolean) => void
}) {
  const { width: windowWidth, height: windowHeight } = useWindowSize()
  const [isHovered, setIsHovered] = useState(false)
  const [isOpen, setIsOpen] = useState(false)

  const hostname = useMemo(() => (article.url ? new URL(article.url).hostname : null), [article.url])
  const cardBackgroundColor = useMemo(
    () => (isHovered ? Colors.cardHover : Colors.cardBackground),
    [isHovered]
  )
  const cardOpacity = useMemo(() => (isOpen ? 0 : 1), [isOpen])

  const contentContainerTranslateY = useSharedValue(0)
  const contentContainerTranslateX = useSharedValue(0)
  const backgroundTranslateY = useSharedValue(0)
  const backgroundTranslateX = useSharedValue(0)
  const contentBgOpacity = useSharedValue(0)
  const detailHeight = useSharedValue(0)
  const borderRadius = useSharedValue(12)

  const contentContainerAnimatedStyle = useAnimatedStyle(() => ({
    zIndex: isOpen ? 3 : 0,
    borderRadius: withCustomTiming(borderRadius.get()),
    transform: [
      { translateY: withCustomTiming(contentContainerTranslateY.get()) },
      { translateX: withCustomTiming(contentContainerTranslateX.get()) },
    ],
  }))

  const detailStyle = useAnimatedStyle(() => ({
    opacity: withCustomTiming(contentBgOpacity.get()),
    height: withCustomTiming(detailHeight.get(), undefined, finished => {
      if (finished && detailHeight.get() === 0) {
        runOnJS(setIsOpen)(false)
        backgroundTranslateY.set(0)
        backgroundTranslateX.set(0)
      }
    }),
  }))

  const backgroundAnimatedStyle = useAnimatedStyle(() => ({
    opacity: withCustomTiming(contentBgOpacity.get()),
    height: windowHeight,
    width: windowWidth,
    transform: [
      { translateY: withTiming(backgroundTranslateY.get(), { duration: 1 }) },
      { translateX: withTiming(backgroundTranslateX.get(), { duration: 1 }) },
    ],
  }))

  const commentStyles = useAnimatedStyle(() => ({
    zIndex: 2,
    transform: [{ translateY: withCustomTiming(detailHeight.get()) }],
  }))

  const openAnimation = useCallback(
    (cardWidth: number, cardHeight: number, pageX: number, pageY: number) => {
      contentContainerTranslateY.set(-pageY + (windowHeight - cardHeight - 300) / 2)
      contentContainerTranslateX.set(-pageX + (windowWidth - cardWidth) / 2)
      backgroundTranslateX.set(-pageX)
      backgroundTranslateY.set(-pageY)
      contentBgOpacity.set(0.9)
      detailHeight.set(300)
      setIsOpen(true)
      onArticleToggle?.(true)
    },
    [
      contentBgOpacity,
      backgroundTranslateX,
      backgroundTranslateY,
      detailHeight,
      onArticleToggle,
      contentContainerTranslateX,
      contentContainerTranslateY,
      windowHeight,
      windowWidth,
    ]
  )

  const closeAnimation = useCallback(() => {
    contentContainerTranslateY.set(0)
    contentContainerTranslateX.set(0)
    contentBgOpacity.set(0)
    detailHeight.set(0)
    onArticleToggle?.(false)
  }, [
    contentBgOpacity,
    detailHeight,
    onArticleToggle,
    contentContainerTranslateX,
    contentContainerTranslateY,
  ])

  useEffect(() => {
    const subscription = BackHandler.addEventListener('hardwareBackPress', function () {
      if (isOpen) {
        closeAnimation()
        return true
      }

      return false
    })

    return () => {
      subscription.remove()
    }
  }, [closeAnimation, isOpen])

  return (
    <>
      <View style={{ flex: 1 }}>
        <Pressable
          onHoverIn={() => setIsHovered(true)}
          onHoverOut={() => setIsHovered(false)}
          onPressIn={() => setIsHovered(true)}
          onPressOut={() => setIsHovered(false)}
          onPress={e => {
            e.currentTarget.measure((x, y, w, h, pX, pY) => {
              setIsOpen(true)
              openAnimation(w, h, pX, pY)
            })
          }}
          style={[
            styles.previewContainer,
            {
              backgroundColor: cardBackgroundColor,
              opacity: cardOpacity,
            },
          ]}
        >
          <View style={{ flex: 1, gap: 40 }}>
            <ThemedText variant='h2'>{article.title}</ThemedText>
            <ArticleStatsBy article={article} />
          </View>
        </Pressable>

        <Animated.View style={[styles.contentContainer, contentContainerAnimatedStyle]}>
          <View style={{ flex: 1, gap: 40, padding: 16 }}>
            <ThemedText variant='h2'>{article.title}</ThemedText>
            <ArticleStatsBy article={article} animatedStyle={commentStyles} />
          </View>

          <Animated.View style={[{ borderRadius: 12 }, detailStyle]}>
            <Animated.View style={styles.detailContainer}>
              {article.time && <ThemedText>{new Date(article.time * 1000).toUTCString()}</ThemedText>}

              {article.url && (
                <ExternalLink href={article.url}>
                  <ThemedText variant='link'>
                    Read the full article {hostname ? `on ${hostname}` : 'by clicking here'}
                  </ThemedText>
                </ExternalLink>
              )}
            </Animated.View>
          </Animated.View>
        </Animated.View>

        <AnimatedPressable
          onPress={closeAnimation}
          style={[styles.background, backgroundAnimatedStyle, { pointerEvents: !isOpen ? 'none' : 'auto' }]}
        />
      </View>
    </>
  )
})

export default ArticlePreviewTransition

const styles = StyleSheet.create({
  previewContainer: {
    minHeight: 145,
    borderRadius: 12,
    borderWidth: 1,
    borderColor: Colors.border,
    padding: 16,
    flex: 1,
    zIndex: 1,
  },
  contentContainer: {
    minHeight: 145,
    position: 'absolute',
    width: '100%',
    backgroundColor: Colors.cardBackground,
    borderRadius: 12,
    borderWidth: 1,
    borderColor: Colors.border,
    flex: 1,
  },
  detailContainer: {
    padding: 16,
    backgroundColor: Colors.background,
    borderRadius: 12,
    flex: 1,
    gap: 25,
  },
  background: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    backgroundColor: Colors.background,
    zIndex: 2,
  },
})

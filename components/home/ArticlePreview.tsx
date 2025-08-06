import { Colors } from '@/constants/Colors'
import useWindowSize from '@/hooks/useWindowSize'
import { Article } from '@/types'
import { Link, useRouter } from 'expo-router'
import React, { memo, useState } from 'react'
import { Platform, Pressable, StyleSheet } from 'react-native'
import { ThemedText } from '../ThemedText'
import ArticleStatsBy from './ArticleStatsBy'

const ArticlePreview = memo(function ArticlePreview({ article }: { article: Article }) {
  const router = useRouter()
  const { width } = useWindowSize()
  const [isHovered, setIsHovered] = useState(false)

  const isWeb = Platform.OS === 'web'
  const backgroundColor = isHovered ? Colors.cardHover : Colors.cardBackground
  const opacity = isHovered || !isWeb ? 1 : 0.85
  const minHeight = width < 1024 ? 145 : 170

  return (
    <Link href={`/${article.id}`} asChild style={[styles.preview, { backgroundColor, opacity, minHeight }]}>
      <Pressable
        onHoverIn={() => setIsHovered(true)}
        onHoverOut={() => setIsHovered(false)}
        onPressIn={() => setIsHovered(true)}
        onPressOut={() => setIsHovered(false)}
        onPress={() => router.navigate(`/${article.id}`)}
      >
        <ThemedText variant='h2'>{article.title}</ThemedText>
        <ArticleStatsBy article={article} />
      </Pressable>
    </Link>
  )
})

export default ArticlePreview

const styles = StyleSheet.create({
  preview: {
    borderRadius: 12,
    borderWidth: 1,
    borderColor: Colors.border,
    padding: 16,
    flex: 1,
    gap: 40,
  },
})

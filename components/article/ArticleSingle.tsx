import SvgLogo from '@/assets/svgs/LogoSvg'
import useWindowSize from '@/hooks/useWindowSize'
import { Link, useRouter } from 'expo-router'
import React from 'react'
import { Pressable, ScrollView, StyleSheet, View } from 'react-native'
import { useSafeAreaInsets } from 'react-native-safe-area-context'
import { ExternalLink } from '../ExternalLink'
import { Article } from '../home/ArticlePreview'
import ArticleStatsBy from '../home/ArticleStatsBy'
import { ThemedText } from '../ThemedText'

const ArticleSingle = ({ article }: { article: Article }) => {
  const { top } = useSafeAreaInsets()
  const router = useRouter()

  const { width } = useWindowSize()
  const paddingHorizontal = width < 1024 ? 20 : 0

  const hostname = article.url ? new URL(article.url).hostname : null

  return (
    <View style={styles.main}>
      <View style={[styles.titleContainer, { paddingTop: top + 20 }]}>
        <Link href={'/'} asChild>
          <Pressable onPress={() => router.canGoBack() && router.back()}>
            <SvgLogo width={150} />
          </Pressable>
        </Link>

        <ThemedText variant='h1' style={styles.title}>
          {article.title}
        </ThemedText>
      </View>

      <ScrollView contentContainerStyle={[styles.content, { paddingHorizontal }]}>
        {article.time && <ThemedText>{new Date(article.time * 1000).toUTCString()}</ThemedText>}

        {article.url && (
          <ExternalLink href={article.url}>
            <ThemedText variant='link'>
              Read the full article {hostname ? `on ${hostname}` : 'by clicking here'}
            </ThemedText>
          </ExternalLink>
        )}

        <ArticleStatsBy article={article} />
      </ScrollView>
    </View>
  )
}

export default ArticleSingle

const styles = StyleSheet.create({
  main: {
    flex: 1,
  },
  titleContainer: {
    backgroundColor: '#181622',
    borderBottomWidth: 1,
    borderColor: '#33323e',
    padding: 20,
    gap: 20,
  },
  title: {
    marginTop: 40,
    maxWidth: 1024,
    width: '100%',
    marginHorizontal: 'auto',
  },
  content: {
    padding: 20,
    maxWidth: 1024,
    width: '100%',
    marginHorizontal: 'auto',
    gap: 40,
    flex: 1,
  },
})

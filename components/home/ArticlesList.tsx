import ArticlePreview from '@/components/home/ArticlePreview'
import { Colors } from '@/constants/Colors'
import useWindowSize from '@/hooks/useWindowSize'
import withTransitionAtom from '@/store'
import { Article } from '@/types'
import { UseQueryResult } from '@tanstack/react-query'
import { useAtomValue } from 'jotai'
import React, { useCallback, useMemo, useState } from 'react'
import { FlatList, RefreshControl, StyleSheet } from 'react-native'
import Skeleton from 'react-native-reanimated-skeleton'
import ArticlePreviewTransition from './ArticlePreviewTransition'
import Header from './Header'

const ArticlesList = ({
  articles,
  onRefresh,
  forceLoading,
}: {
  articles: UseQueryResult<Article, Error>[]
  onRefresh: () => void
  forceLoading: boolean
}) => {
  const { width } = useWindowSize()
  const transition = useAtomValue(withTransitionAtom)
  const [isArticleOpen, setIsArticleOpen] = useState(false)

  const areArticlesRefetching = articles.some(a => a.isRefetching)

  const minHeight = useMemo(() => (width < 1024 ? 145 : 170), [width])
  const numColumns = useMemo(() => (width < 1024 ? 1 : width < 1440 ? 2 : 4), [width])
  const columnWrapperStyle = useMemo(() => (numColumns <= 1 ? undefined : { gap: 25 }), [numColumns])

  const renderHeader = useCallback(() => {
    return <Header />
  }, [])

  const renderArticle = useCallback(
    ({ item }: { item: UseQueryResult<Article, Error> }) => {
      if (item.isLoading || forceLoading) {
        return (
          <Skeleton
            isLoading={true}
            containerStyle={[styles.skeletonContainer, { minHeight }]}
            layout={[styles.skeletonLayout]}
            boneColor={Colors.cardBackground}
            highlightColor={Colors.cardHover}
            animationDirection='horizontalRight'
          />
        )
      }

      const article = item.data as Article
      return transition ? (
        <ArticlePreviewTransition article={article} onArticleToggle={setIsArticleOpen} />
      ) : (
        <ArticlePreview article={article} />
      )
    },
    [minHeight, forceLoading, transition]
  )

  return (
    <>
      <FlatList
        key={numColumns}
        keyExtractor={(item, index) => `article_${item.data?.id || index}`}
        data={articles.filter(a => a.status !== 'error')}
        ListHeaderComponent={renderHeader}
        renderItem={renderArticle}
        numColumns={numColumns}
        contentContainerStyle={styles.listContainer}
        scrollEnabled={!transition || !isArticleOpen}
        refreshControl={<RefreshControl refreshing={areArticlesRefetching} onRefresh={onRefresh} />}
        columnWrapperStyle={columnWrapperStyle}
      />
    </>
  )
}

export default ArticlesList

const styles = StyleSheet.create({
  header: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  skeletonContainer: {
    flex: 1,
    width: '100%',
  },
  skeletonLayout: {
    width: '100%',
    height: '100%',
    borderRadius: 12,
    borderColor: Colors.border,
    borderWidth: 1,
  },
  listContainer: { gap: 25, padding: 20 },
})

import ArticleLoader from '@/components/article/ArticleLoader'
import ArticleSingle from '@/components/article/ArticleSingle'
import useGetArticle from '@/hooks/api/useGetArticle'
import { useLocalSearchParams } from 'expo-router'
import Head from 'expo-router/head'
import React from 'react'
import { SafeAreaView } from 'react-native-safe-area-context'
import NotFoundScreen from './+not-found'

const Article = () => {
  //

  const { articleId } = useLocalSearchParams<{ articleId: string }>()

  const { data, error, isLoading } = useGetArticle(articleId)

  if (isLoading) {
    return <ArticleLoader />
  }

  if (error || !data || (data.type !== 'story' && data.type !== 'job')) {
    return <NotFoundScreen />
  }

  return (
    <>
      <Head>
        <title>{(data.title ? `${data.title} - ` : '') + 'TechNews'}</title>
      </Head>
      <SafeAreaView style={{ flex: 1 }} edges={['bottom', 'left', 'right']}>
        <ArticleSingle article={data} />
      </SafeAreaView>
    </>
  )
}

export default Article

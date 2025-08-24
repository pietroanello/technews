import Head from '@/components/Head'
import ArticlesList from '@/components/home/ArticlesList'
import Error from '@/components/home/Error'
import useArticlesApi from '@/hooks/api/useArticlesApi'
import { useCallback } from 'react'

export default function HomeScreen() {
  //

  const {
    getArticlesIds: { isError, isLoading },
    getArticles: articles,
    refetchArticles,
  } = useArticlesApi()

  const onRefresh = useCallback(() => {
    refetchArticles()
  }, [refetchArticles])

  const error = isError || articles.every(a => a.status === 'error')

  return (
    <>
      <Head>
        <title>{'TechNews'}</title>
      </Head>
      {error ? (
        <Error onRefresh={onRefresh} />
      ) : (
        <ArticlesList onRefresh={onRefresh} articles={articles} forceLoading={isLoading} />
      )}
    </>
  )
}

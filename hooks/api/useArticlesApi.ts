import { Article } from '@/types'
import { useQueries, useQuery, useQueryClient, UseQueryOptions } from '@tanstack/react-query'
import axios from 'axios'

type TQueries = UseQueryOptions<Article>[]

const useArticlesApi = () => {
  const queryClient = useQueryClient()

  const getArticlesIds = useQuery({
    queryKey: ['articlesIds'],
    queryFn: async () => {
      const res = await axios.get('https://hacker-news.firebaseio.com/v0/topstories.json')
      return res.data.map((id: number) => String(id))
    },
    retry: 2,
  })

  const getArticles = useQueries<TQueries>({
    queries: getArticlesIds?.data
      ? getArticlesIds.data.slice(0, 20).map((id: string) => {
          return {
            queryKey: ['article', id],
            queryFn: async (): Promise<Article> => {
              const res = await axios.get(`https://hacker-news.firebaseio.com/v0/item/${id}.json`)
              return res.data
            },
            retry: 2,
            enabled: !!getArticlesIds.data,
          }
        })
      : Array.from(Array(20).keys()).map(k => ({ queryKey: ['temp', k], queryFn: () => 0 })),
  })

  return {
    getArticlesIds,
    getArticles,
    refetchArticles: () => {
      queryClient.refetchQueries({ queryKey: ['articlesIds'] })
      queryClient.invalidateQueries({ queryKey: ['article'], refetchType: 'all' })
    },
  }
}

export default useArticlesApi

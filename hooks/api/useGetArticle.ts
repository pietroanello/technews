import { Article } from '@/types'
import { keepPreviousData, useQuery, UseQueryResult } from '@tanstack/react-query'
import axios from 'axios'

const useGetArticle = (id: string): UseQueryResult<Article, Error> => {
  const getArticle = useQuery({
    queryKey: ['article', id],
    queryFn: async () => {
      const res = await axios.get(`https://hacker-news.firebaseio.com/v0/item/${id}.json`)
      return res.data
    },
    enabled: !!id,
    refetchOnMount: true,
    placeholderData: keepPreviousData,
  })

  return getArticle
}

export default useGetArticle

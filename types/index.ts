import { ExternalPathString } from 'expo-router'

export interface Article {
  id: number
  deleted?: boolean
  type?: 'job' | 'story' | 'comment' | 'poll' | 'pollopt'
  by?: string
  time?: number
  text?: string
  dead?: boolean
  parent?: number
  poll?: number
  kids?: number[]
  url?: ExternalPathString
  score?: number
  title?: string
  parts?: number[]
  descendants?: number
}

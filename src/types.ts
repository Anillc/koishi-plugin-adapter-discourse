import { Fetcher } from 'openapi-typescript-fetch'
import { DiscourseBot } from './bot'
import { paths } from './schema'

export class Internal {
  fetcher: ReturnType<typeof Fetcher.for<paths>>
  constructor(bot: DiscourseBot) {
    this.fetcher = Fetcher.for<paths>()
    this.fetcher.configure({
      baseUrl: bot.endpoint,
      init: {
        headers: {
          'Api-Key': bot.token,
          'Api-Username': bot.selfId,
        },
      },
    })
  }

  async replyPost(topicId: number, raw: string) {
    const fetch = this.fetcher.path('/posts.json').method('post').create()
    return await fetch({ topic_id: topicId, raw })
  }

  async getPost(id: string) {
    const fetch = this.fetcher.path('/posts/{id}.json').method('get').create()
    return await fetch({ id })
  }

  async deletePost(id: number) {
    const fetch = this.fetcher.path('/posts/{id}.json').method('delete').create()
    return await fetch({ id })
  }

  async getUserByUsername(username: string) {
    const fetch = this.fetcher.path('/u/{username}.json').method('get').create()
    return await fetch({ username })
  }

  async getUserByUserId(id: number) {
    const fetch = this.fetcher.path('/admin/users/{id}.json').method('get').create()
    return await fetch({ id })
  }

  async getTopic(id: string) {
    const fetch = this.fetcher.path('/t/{id}.json').method('get').create()
    return fetch({ id })
  }
}

export interface Event {
  type: string
  subtype: string
  instance: string
  post?: PostEvent
}

export interface PostEvent {
  id?: number
  name?: string
  username?: string
  avatar_template?: string
  created_at?: string
  cooked?: string
  post_number?: number
  post_type?: number
  updated_at?: string
  reply_count?: number
  // unknown type
  // reply_to_post_number
  quote_count?: number
  incoming_link_count?: number
  reads?: number
  score?: number
  topic_id?: number
  topic_slug?: string
  topic_title?: string
  category_id?: number
  display_username?: string
  primary_group_name?: string
  flair_name?: string
  version?: number
  user_title?: string
  bookmarked?: boolean
  raw?: string
  moderator?: boolean
  admin?: boolean
  staff?: boolean
  user_id?: number
  hidden?: boolean
  trust_level?: number
  deleted_at?: string
  user_deleted?: boolean
  edit_reason?: string
  wiki?: boolean
  reviewable_id?: string
  reviewable_score_count?: number
  reviewable_score_pending_count?: number
  topic_posts_count?: number
  topic_filtered_posts_count?: number
  topic_archetype?: string
  category_slug?: string
}
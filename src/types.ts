import { Quester } from 'koishi'
import FormData from 'form-data'
import { DiscourseBot } from './bot'

export class Internal {
  http: Quester
  constructor(bot: DiscourseBot) {
    this.http = bot.ctx.http.extend({
      ...bot.config,
      headers: {
        'Api-Username': bot.name,
        'Api-Key': bot.token,
        ...bot.config.headers,
      },
    })
  }

  async replyPost(topicId: number, raw: string, reply?: number) {
    return await this.http.post('/posts.json', { topic_id: topicId, raw, reply_to_post_number: reply })
  }

  async getPost(postId: string) {
    return await this.http.get(`/posts/${postId}.json`)
  }

  async getPosts(topicId: string) {
    return await this.http.get(`/t/${topicId}/posts.json`)
  }

  async deletePost(id: string) {
    return await this.http.delete(`/posts/${id}.json`)
  }

  async getUserByUsername(username: string) {
    return await this.http.get(`/u/${username}.json`)
  }

  async getUserByUserId(id: string) {
    return await this.http.get(`/admin/users/${id}.json`)
  }

  async getTopic(id: string) {
    return await this.http.get(`/t/${id}.json`)
  }

  async upload(buffer: ArrayBuffer, filename = 'file') {
    const form = new FormData()
    form.append('type', 'composer')
    form.append('synchronous', 'true')
    form.append('file', Buffer.from(buffer), filename)
    return await this.http.post('/uploads.json', form, {
      headers: form.getHeaders(),
    })
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
  reply_to_post_number?: number
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

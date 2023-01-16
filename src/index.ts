import { DiscourseBot } from './bot'
import { Event, Internal } from './types'

export * from './types'

declare module 'koishi' {
  interface Session {
    discourse: Internal & Event
  }
}

export default DiscourseBot

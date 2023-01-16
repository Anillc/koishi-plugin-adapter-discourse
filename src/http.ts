import { Adapter, Context, Logger } from 'koishi'
import { DiscourseBot } from './bot'
import { dispatchSession } from './utils'
import { Event } from './types'

const logger = new Logger('adapter-discourse')

export class HttpAdapter extends Adapter.Server<DiscourseBot> {
  constructor(ctx: Context, bot: DiscourseBot) {
    super()
    ctx.router.all(bot.path, (koaCtx) => {
      const { headers, body } = koaCtx.request
      const type = headers['x-discourse-event-type'] as string
      const subtype = headers['x-discourse-event'] as string
      const instance = headers['x-discourse-instance'] as string
      const bots = this.bots.filter(bot =>
        bot.userId !== String(body[type].user_id) && bot.instance.startsWith(instance))
      const event: Event = { type, subtype, instance }
      Object.assign(event, body)
      bots.forEach(bot => dispatchSession(bot, event))
    })
  }

  async start(bot: DiscourseBot) {
    try {
      await bot.initialize()
      bot.online()
    } catch(error) {
      logger.error('failed to initialize bot: ', error)
      throw error
    }
  }
}
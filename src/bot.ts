import { Bot, Context, Fragment, Schema, SendOptions } from 'koishi'
import { HttpAdapter } from './http'
import { DiscourseMessenger } from './message'
import { Internal } from './types'


export class DiscourseBot extends Bot<DiscourseBot.Config> {
  endpoint: string
  token: string
  path: string
  instance: string
  internal: Internal
  constructor(ctx: Context, config: DiscourseBot.Config) {
    super(ctx, config)
    this.endpoint = config.endpoint
    this.token = config.token
    this.path = config.path
    this.instance = config.instance || config.endpoint
    this.internal = new Internal(this)
    ctx.plugin(HttpAdapter, this)
  }

  // TODO: init self
  async initialize() {
  }

  async sendMessage(channelId: string, content: Fragment, guildId?: string, options?: SendOptions): Promise<string[]> {
    return await new DiscourseMessenger(this, channelId, guildId, options).send(content)
  }
}

export namespace DiscourseBot {
  export interface Config {
    selfId: string
    token: string
    endpoint: string
    instance: string
    path: string
  }
  export const Config: Schema<Config> = Schema.object({
    selfId: Schema.string().description('机器人的用户名。').required(),
    token: Schema.string().description('机器人的令牌。').required(),
    endpoint: Schema.string().description('论坛的地址。').required(),
    instance: Schema.string().description('实例地址 (默认与 endpoint 相同)'),
    path: Schema.string().description('服务器监听的路径。').default('/discourse'),
  })
}

DiscourseBot.prototype.platform = 'discourse'
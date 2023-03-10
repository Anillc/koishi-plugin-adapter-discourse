import { Bot, Context, Fragment, omit, Quester, Schema, SendOptions, Universal } from 'koishi'
import { HttpAdapter } from './http'
import { DiscourseMessenger } from './message'
import { Internal } from './types'
import { adaptMessage } from './utils'

export class DiscourseBot extends Bot<DiscourseBot.Config> {
  name: string
  endpoint: string
  token: string
  path: string
  instance: string
  internal: Internal
  constructor(ctx: Context, config: DiscourseBot.Config) {
    super(ctx, config)
    this.name = config.name
    this.endpoint = config.endpoint
    this.token = config.token
    this.path = config.path
    this.instance = config.instance || config.endpoint
    this.internal = new Internal(this)
    ctx.plugin(HttpAdapter, this)
  }

  async initialize() {
    const self = await this.getSelf()
    if (!self) throw new Error('failed to get self')
    Object.assign(this, self)
    this.selfId = this.userId
  }

  async sendMessage(channelId: string, content: Fragment, guildId?: string, options?: SendOptions) {
    return await new DiscourseMessenger(this, channelId, guildId, options).send(content)
  }

  async sendPrivateMessage(userId: string, content: Fragment, options?: SendOptions) {
    return await this.sendMessage('private:' + userId, content, null, options)
  }

  async getMessage(channelId: string, messageId: string) {
    const post = await this.internal.getPost(messageId)
    return await adaptMessage(this, {
      type: 'post',
      subtype: 'post_created',
      instance: this.instance,
      post,
    })
  }
  
  async deleteMessage(channelId: string, messageId: string) {
    await this.internal.deletePost(messageId)
  }

  async getSelf() {
    const user = await this.internal.getUserByUsername(this.name)
    return {
      userId: user.user.id.toString(),
      username: user.user.username,
      avatar: this.endpoint + user.user.avatar_template.replace('{size}', '90')
    }
  }

  async getUser(userId: string) {
    const user = await this.internal.getUserByUserId(userId)
    return {
      userId: user.id.toString(),
      username: user.username,
      avatar: this.endpoint + user.avatar_template.replace('{size}', '90')
    }
  }

  async getFriendList() {
    return []
  }

  async getChannel(channelId: string, guildId?: string) {
    const topic = await this.internal.getTopic(channelId)
    return {
      channelId,
      channelName: topic.title,
    }
  }
}

export namespace DiscourseBot {
  export interface Config extends Bot.Config, Quester.Config {
    name: string
    token: string
    endpoint: string
    instance: string
    path: string
  }
  export const Config: Schema<Config> = Schema.object({
    name: Schema.string().description('????????????????????????').required(),
    token: Schema.string().description('?????????????????????').required(),
    endpoint: Schema.string().description('??????????????????').required(),
    instance: Schema.string().description('???????????? (????????? endpoint ??????)???'),
    path: Schema.string().description('???????????????????????????').default('/discourse'),
    ...omit(Quester.Config.dict, ['endpoint']),
  })
}

DiscourseBot.prototype.platform = 'discourse'

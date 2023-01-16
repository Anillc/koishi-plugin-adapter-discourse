import { Bot, Context, Fragment, Schema, SendOptions, Universal } from 'koishi'
import { HttpAdapter } from './http'
import { DiscourseMessenger } from './message'
import { Internal } from './types'
import { adaptMessage } from './utils'

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

  async initialize() {
    const self = await this.getSelf()
    if (!self) throw new Error('failed to get self')
    Object.assign(this, self)
  }

  async sendMessage(channelId: string, content: Fragment, guildId?: string, options?: SendOptions) {
    return await new DiscourseMessenger(this, channelId, guildId, options).send(content)
  }

  async sendPrivateMessage(userId: string, content: Fragment, options?: SendOptions) {
    return await this.sendMessage('private:' + userId, content, null, options)
  }

  async getMessage(channelId: string, messageId: string) {
    const { data: post } = await this.internal.getPost(messageId)
    return await adaptMessage(this, {
      type: 'post',
      subtype: 'post_created',
      instance: this.instance,
      post,
    })
  }
  
  async deleteMessage(channelId: string, messageId: string) {
    await this.internal.deletePost(+messageId)
  }

  async getSelf() {
    const user = await this.internal.getUserByUsername(this.selfId)
    if (!user.ok) return null
    return {
      userId: user.data.user.id.toString(),
      username: user.data.user.username,
      avatar: this.endpoint + user.data.user.avatar_template.replace('{size}', '90')
    }
  }

  async getUser(userId: string) {
    const user = await this.internal.getUserByUserId(+userId)
    if (!user.ok) return null
    return {
      userId: user.data.id.toString(),
      username: user.data.username,
      avatar: this.endpoint + user.data.avatar_template.replace('{size}', '90')
    }
  }

  async getFriendList() {
    return []
  }

  async getChannel(channelId: string, guildId?: string) {
    const topic = await this.internal.getTopic(channelId)
    if (!topic.ok) return null
    return {
      channelId,
      channelName: topic.data.title,
    }
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
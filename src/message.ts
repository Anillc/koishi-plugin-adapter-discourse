import { Messenger, Element } from '@satorijs/satori'
import { DiscourseBot } from './bot'

export class DiscourseMessenger extends Messenger<DiscourseBot> {
  buffer = ''
  reply: number
  async flush() {
    if (!this.buffer) return
    try {
      const session = this.bot.session()
      const topicId = +(this.guildId ? this.channelId : this.channelId.slice(8))
      const result = await this.bot.internal.replyPost(topicId, this.buffer, this.reply)
      session.messageId = result.post_number.toString()
      this.buffer = ''
      this.reply = null
      this.results.push(session)
    } catch (e) {
      this.errors.push(e)
    }
  }
  async visit(element: Element) {
    const { type, attrs, children } = element
    if (type === 'text') {
      this.buffer += attrs.content.replace(/[\\*_`~|]/g, '\\$&')
    } else if (type === 'b' || type === 'strong') {
      this.buffer += '**'
      await this.render(children)
      this.buffer += '**'
    } else if (type === 'i' || type === 'em') {
      this.buffer += '*'
      await this.render(children)
      this.buffer += '*'
    } else if (type === 'u' || type === 'ins') {
      this.buffer += '__'
      await this.render(children)
      this.buffer += '__'
    } else if (type === 's' || type === 'del') {
      this.buffer += '~~'
      await this.render(children)
      this.buffer += '~~'
    } else if (type === 'code') {
      this.buffer += '`'
      await this.render(children)
      this.buffer += '`'
    } else if (type === 'a') {
      this.buffer += '['
      await this.render(children)
      this.buffer += `](${attrs.href})`
    } else if (type === 'p') {
      await this.render(children)
      this.buffer += '\n'
    } else if (type === 'at') {
      if (attrs.id) {
        this.buffer += ` @${attrs.id} `
      } else if (attrs.type === 'all') {
        this.buffer += ` @room `
      }
    } else if (type === 'sharp' && attrs.id) {
      this.buffer += ` #${attrs.id} `
    } else if (type === 'image' && attrs.url) {
      let url: string
      if (attrs.url.match(/^https?:/)) {
        url = attrs.url
      } else {
        const file = await this.bot.ctx.http.file(attrs.url)
        const upload = await this.bot.internal.upload(file.data)
        url = upload.url
      }
      this.buffer += `![](${url})`
    } else if (type === 'quote') {
      this.reply = +attrs.id
    } else if (type === 'message') {
      await this.flush()
      await this.render(children, true)
    } else {
      await this.render(children)
    }
  }
}
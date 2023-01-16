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
      const result = await this.bot.internal.replyPost(topicId, `<pre>${this.buffer}</pre>`, this.reply)
      session.messageId = result.id.toString()
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
      this.buffer += attrs.content
    } else if (type === 'b' || type === 'strong') {
      this.buffer += '<b>'
      await this.render(children)
      this.buffer += '</b>'
    } else if (type === 'i' || type === 'em') {
      this.buffer += '<i>'
      await this.render(children)
      this.buffer += '</i>'
    } else if (type === 'u' || type === 'ins') {
      this.buffer += '<u>'
      await this.render(children)
      this.buffer += '</u>'
    } else if (type === 's' || type === 'del') {
      this.buffer += '<s>'
      await this.render(children)
      this.buffer += '</s>'
    } else if (type === 'code') {
      this.buffer += '<code>'
      await this.render(children)
      this.buffer += '</code>'
    } else if (type === 'a') {
      this.buffer += `<a href=${attrs.href}>`
      await this.render(children)
      this.buffer += `</a>`
    } else if (type === 'p') {
      this.buffer += `</p>`
      await this.render(children)
      this.buffer += `</p>`
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
      this.buffer += `<img src=${url}/>`
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

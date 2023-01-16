import { Session, Universal, defineProperty, hyphenate, segment } from '@satorijs/satori'
import { SyntaxKind, parse, walk } from 'html5parser'
import { DiscourseBot } from './bot'
import { Event } from './types'

export async function adaptMessage(bot: DiscourseBot, event: Event, result: Universal.Message = {}): Promise<Universal.Message> {
  const { post } = event
  if (post.topic_archetype === 'private_message') {
    const topic = await bot.internal.getTopic(post.topic_id.toString())
    const { allowed_users } = topic.details
    if (!allowed_users.find(each => each.id === +bot.userId)) return
    result.subtype = 'private'
    result.channelId = `private:${post.topic_id.toString()}`
  } else {
    result.subtype = 'group'
    result.channelId = post.topic_id.toString()
    result.guildId = result.channelId
  }
  result.messageId = post.id.toString()
  result.userId = post.user_id.toString()
  result.timestamp = +new Date(post.created_at)
  result.author = {
    userId: post.user_id.toString(),
    username: post.username,
    nickname: post.display_username,
  }
  if (post.reply_to_post_number) {
    const posts = await bot.internal.getPosts(post.topic_id.toString())
    const reply = posts.post_stream.posts[post.reply_to_post_number - 1]
    result.quote = {}
    await adaptMessage(bot, {
      type: 'post',
      subtype: 'post_created',
      instance: bot.instance,
      post: reply,
    }, result.quote)
  }
  let content = ''
  walk(parse(post.cooked, { setAttributeMap: true }), {
    enter(node, parent, index) {
      if (node.type === SyntaxKind.Tag) {
        switch (node.name) {
          case 'img':
            content += `<image url="${node.attributeMap.src.value.value}"/>`
            break
        }
      } else {
        content += node.value
      }
    },
    leave(node, parent, index) {
      if (node.type === SyntaxKind.Text) return
    },
  })
  result.content = content
  // result.content is not a setter if result is a Universal.Message
  result.elements ??= segment.parse(result.content)
  return result
}

export async function adaptSession(bot: DiscourseBot, event: Event): Promise<Session> {
  const session = bot.session()
  if (event.type === 'post' && event.subtype === 'post_created') {
    session.type = 'message'
    if (!await adaptMessage(bot, event, session)) return null
  } else {
    session.type = 'discourse'
    session.subtype = hyphenate(`${event.type}-${event.subtype}`)
  }
  return session
}

export async function dispatchSession(bot: DiscourseBot, event: Event) {
  const session = await adaptSession(bot, event)
  if (!session) return

  defineProperty(session, 'discourse', Object.create(bot.internal))
  Object.assign(session.discourse, event)
  bot.dispatch(session)
}

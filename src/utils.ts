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
  let index = 0
  const names: string[] = []
  walk(parse(post.cooked, { setAttributeMap: true }), {
    enter(node) {
      if (node.type === SyntaxKind.Tag) {
        switch (node.name) {
          case 'img':
            content += `<image url="${node.attributeMap.src.value.value}"/>`
            break
          case 'a':
            const clazz = node.attributeMap?.class.value.value
            const href = node.attributeMap?.href.value.value || '#'
            if (clazz.includes('mention') && href.startsWith('/u/')) {
              const username = href.slice(3)
              names[index] = username
              content += `<at id="@@__PLACEHOLDER_${index++}__@@" name="${username}">`
            } else {
              content += `<a href="${href}">`
            }
            break
        }
      } else {
        content += node.value.replace('\n', '')
      }
    },
    leave(node) {
      if (node.type === SyntaxKind.Text) return
      switch (node.name) {
        case 'p':
        case 'br':
          content += '\n'
          break
        case 'a':
          const clazz = node.attributeMap?.class.value.value
          const href = node.attributeMap?.href.value.value || '#'
          if ((clazz.includes('mention') && href.startsWith('/u/'))) {
            content += '</at>'
          } else {
            content += '</a>'
          }
          break
      }
    },
  })
  await Promise.allSettled(names.map(async (name, i) => {
    const user = await bot.internal.getUserByUsername(name)
    names[i] = user.user.id.toString()
  }))
  content = content.replace(/@@__PLACEHOLDER_(\d+)__@@/g, (_, i) => names[+i])
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

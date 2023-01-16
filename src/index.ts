import { DiscourseBot } from './bot'
import { Event, Internal } from './types'

export * from './types'

declare module 'koishi' {
  interface Session {
    discourse: Internal & Event
  }
}

export default DiscourseBot

/*
{
  connection: 'close',
  host: 'bot2.a',
  'x-real-ip': '10.11.1.6',
  'x-forwarded-for': '10.11.1.6',
  'x-forwarded-proto': 'https',
  'x-forwarded-host': 'bot2.a',
  'x-forwarded-server': 'bot2.a',
  'content-length': '1946',
  'user-agent': 'Discourse/2.9.0.beta4',
  'content-type': 'application/json',
  'x-discourse-instance': 'http://forum.a',
  'x-discourse-event-id': '12',
  'x-discourse-event-type': 'post',
  'x-discourse-event': 'post_created'
}
{
  "post": {
    "id": 14,
    "name": "Anillc",
    "username": "Anillc",
    "avatar_template": "/user_avatar/forum.a/anillc/{size}/1_2.png",
    "created_at": "2023-01-15T19:29:25.790Z",
    "cooked": "<ul>\n<li>Does the title sound interesting if you read it out loud? Is it a good summary?</li>\n<li>Who would be interested in this? Why does it matter? What kind of responses do you want?</li>\n<li>Include commonly used words in your topic so others can <em>find</em> it. To group your topic with related topics, select a category (or tag).</li>\n</ul>\n<p>For more, <a href=\"https://forum.a/guidelines\">see our community guidelines</a>. This panel will only appear for your first 2 posts.</p>",
    "post_number": 1,
    "post_type": 1,
    "updated_at": "2023-01-15T19:29:25.790Z",
    "reply_count": 0,
    "reply_to_post_number": null,
    "quote_count": 0,
    "incoming_link_count": 0,
    "reads": 0,
    "score": 0,
    "topic_id": 11,
    "topic_slug": "welcome-to-discourse-thanks-for-starting-a-new-conversation",
    "topic_title": "Welcome to Discourse — thanks for starting a new conversation!",
    "category_id": 1,
    "display_username": "Anillc",
    "primary_group_name": null,
    "flair_name": null,
    "version": 1,
    "user_title": null,
    "bookmarked": false,
    "raw": "* Does the title sound interesting if you read it out loud? Is it a good summary?\n* Who would be interested in this? Why does it matter? What kind of responses do you want?\n* Include commonly used words in your topic so others can *find* it. To group your topic with related topics, select a category (or tag).\n\nFor more, [see our community guidelines](https://forum.a/guidelines). This panel will only appear for your first 2 posts.",
    "moderator": false,
    "admin": true,
    "staff": true,
    "user_id": 1,
    "hidden": false,
    "trust_level": 1,
    "deleted_at": null,
    "user_deleted": false,
    "edit_reason": null,
    "wiki": false,
    "reviewable_id": null,
    "reviewable_score_count": 0,
    "reviewable_score_pending_count": 0,
    "topic_posts_count": 1,
    "topic_filtered_posts_count": 1,
    "topic_archetype": "regular",
    "category_slug": "uncategorized"
  }
}
*/

/*
{
  connection: 'close',
  host: 'bot2.a',
  'x-real-ip': '10.11.1.6',
  'x-forwarded-for': '10.11.1.6',
  'x-forwarded-proto': 'https',
  'x-forwarded-host': 'bot2.a',
  'x-forwarded-server': 'bot2.a',
  'content-length': '1776',
  'user-agent': 'Discourse/2.9.0.beta4',
  'content-type': 'application/json',
  'x-discourse-instance': 'http://forum.a',
  'x-discourse-event-id': '13',
  'x-discourse-event-type': 'post',
  'x-discourse-event': 'post_created'
}
{
  "post": {
    "id": 15,
    "name": "Anillc",
    "username": "Anillc",
    "avatar_template": "/user_avatar/forum.a/anillc/{size}/1_2.png",
    "created_at": "2023-01-15T19:30:27.230Z",
    "cooked": "<p>Welcome to Discourse — <strong>thanks for contributing!</strong></p>\n<ul>\n<li>Be kind to your fellow community members.</li>\n<li>Does your reply improve the conversation?</li>\n<li>Constructive criticism is welcome, but criticize <em>ideas</em>, not people.</li>\n</ul>\n<p>For more, <a href=\"https://forum.a/guidelines\">see our community guidelines</a>. This panel will only appear for your first 2 posts.</p>",
    "post_number": 2,
    "post_type": 1,
    "updated_at": "2023-01-15T19:30:27.230Z",
    "reply_count": 0,
    "reply_to_post_number": null,
    "quote_count": 0,
    "incoming_link_count": 0,
    "reads": 0,
    "score": 0,
    "topic_id": 11,
    "topic_slug": "welcome-to-discourse-thanks-for-starting-a-new-conversation",
    "topic_title": "Welcome to Discourse — thanks for starting a new conversation!",
    "category_id": 1,
    "display_username": "Anillc",
    "primary_group_name": null,
    "flair_name": null,
    "version": 1,
    "user_title": null,
    "bookmarked": false,
    "raw": "Welcome to Discourse — **thanks for contributing!**\n\n* Be kind to your fellow community members.\n* Does your reply improve the conversation?\n* Constructive criticism is welcome, but criticize *ideas*, not people.\n\nFor more, [see our community guidelines](https://forum.a/guidelines). This panel will only appear for your first 2 posts.",
    "moderator": false,
    "admin": true,
    "staff": true,
    "user_id": 1,
    "hidden": false,
    "trust_level": 1,
    "deleted_at": null,
    "user_deleted": false,
    "edit_reason": null,
    "wiki": false,
    "reviewable_id": null,
    "reviewable_score_count": 0,
    "reviewable_score_pending_count": 0,
    "topic_posts_count": 2,
    "topic_filtered_posts_count": 2,
    "topic_archetype": "regular",
    "category_slug": "uncategorized"
  }
}
*/

/* 私聊
{
  connection: 'close',
  host: 'bot2.a',
  'x-real-ip': '10.11.1.6',
  'x-forwarded-for': '10.11.1.6',
  'x-forwarded-proto': 'https',
  'x-forwarded-host': 'bot2.a',
  'x-forwarded-server': 'bot2.a',
  'content-length': '1593',
  'user-agent': 'Discourse/2.9.0.beta4',
  'content-type': 'application/json',
  'x-discourse-instance': 'http://forum.a',
  'x-discourse-event-id': '15',
  'x-discourse-event-type': 'post',
  'x-discourse-event': 'post_created'
}
{
  "post": {
    "id": 16,
    "name": "Anillc",
    "username": "Anillc",
    "avatar_template": "/user_avatar/forum.a/anillc/{size}/1_2.png",
    "created_at": "2023-01-15T19:32:31.330Z",
    "cooked": "<ul>\n<li>Be kind to your fellow community members.</li>\n<li>Does your reply improve the conversation?</li>\n<li>Constructive criticism is welcome, but criticize <em>ideas</em>, not people.</li>\n</ul>\n<p>For more, <a href=\"https://forum.a/guidelines\">see our community guidelines</a>. This panel will only appear for your first 2 posts.</p>",
    "post_number": 1,
    "post_type": 1,
    "updated_at": "2023-01-15T19:32:31.330Z",
    "reply_count": 0,
    "reply_to_post_number": null,
    "quote_count": 0,
    "incoming_link_count": 0,
    "reads": 0,
    "score": 0,
    "topic_id": 12,
    "topic_slug": "welcome-to-discourse-thanks-for-contributing",
    "topic_title": "Welcome to Discourse — thanks for contributing!",
    "category_id": null,
    "display_username": "Anillc",
    "primary_group_name": null,
    "flair_name": null,
    "version": 1,
    "user_title": null,
    "bookmarked": false,
    "raw": "* Be kind to your fellow community members.\n* Does your reply improve the conversation?\n* Constructive criticism is welcome, but criticize *ideas*, not people.\n\nFor more, [see our community guidelines](https://forum.a/guidelines). This panel will only appear for your first 2 posts.",
    "moderator": false,
    "admin": true,
    "staff": true,
    "user_id": 1,
    "hidden": false,
    "trust_level": 1,
    "deleted_at": null,
    "user_deleted": false,
    "edit_reason": null,
    "wiki": false,
    "reviewable_id": null,
    "reviewable_score_count": 0,
    "reviewable_score_pending_count": 0,
    "topic_posts_count": 1,
    "topic_filtered_posts_count": 1,
    "topic_archetype": "private_message"
  }
}
*/

/*
{
  connection: 'close',
  host: 'bot2.a',
  'x-real-ip': '10.11.1.6',
  'x-forwarded-for': '10.11.1.6',
  'x-forwarded-proto': 'https',
  'x-forwarded-host': 'bot2.a',
  'x-forwarded-server': 'bot2.a',
  'content-length': '1229',
  'user-agent': 'Discourse/2.9.0.beta4',
  'content-type': 'application/json',
  'x-discourse-instance': 'http://forum.a',
  'x-discourse-event-id': '16',
  'x-discourse-event-type': 'post',
  'x-discourse-event': 'post_created'
}
{
  "post": {
    "id": 17,
    "name": "Anillc",
    "username": "Anillc",
    "avatar_template": "/user_avatar/forum.a/anillc/{size}/1_2.png",
    "created_at": "2023-01-15T19:36:24.406Z",
    "cooked": "<p><img src=\"/uploads/default/original/1X/8a51b4e6da79f0481b90ebb54e1b54ca935ed81b.jpeg\" alt=\"1666892869705\" data-base62-sha1=\"jJCWGKWQzL1BVt7XkAi7MmaVTjd\" width=\"145\" height=\"250\"></p>",
    "post_number": 2,
    "post_type": 1,
    "updated_at": "2023-01-15T19:36:24.406Z",
    "reply_count": 0,
    "reply_to_post_number": null,
    "quote_count": 0,
    "incoming_link_count": 0,
    "reads": 0,
    "score": 0,
    "topic_id": 12,
    "topic_slug": "welcome-to-discourse-thanks-for-contributing",
    "topic_title": "Welcome to Discourse — thanks for contributing!",
    "category_id": null,
    "display_username": "Anillc",
    "primary_group_name": null,
    "flair_name": null,
    "version": 1,
    "user_title": null,
    "bookmarked": false,
    "raw": "![1666892869705|290x500, 50%](upload://jJCWGKWQzL1BVt7XkAi7MmaVTjd.jpeg)",
    "moderator": false,
    "admin": true,
    "staff": true,
    "user_id": 1,
    "hidden": false,
    "trust_level": 1,
    "deleted_at": null,
    "user_deleted": false,
    "edit_reason": null,
    "wiki": false,
    "reviewable_id": null,
    "reviewable_score_count": 0,
    "reviewable_score_pending_count": 0,
    "topic_posts_count": 2,
    "topic_filtered_posts_count": 2,
    "topic_archetype": "private_message"
  }
}
*/
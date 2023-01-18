# koishi-plugin-adapter-discourse

## 接入方法

1. 在论坛管理页面中添加 API Token
2. 在论坛管理页面中添加 Webhook, 默认地址是机器人地址后加 /discourse
3. 在插件配置页面中填写论坛地址及 Token。注意，如果论坛使用了 ssl 但是未开启 `force_ssl`，则需要在插件配置中填写 `instance` 配置项，内容为 `http` 协议的论坛地址。
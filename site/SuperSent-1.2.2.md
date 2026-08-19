<!-- sparkle-sign-warning:
IMPORTANT: This file was signed by Sparkle. Any modifications to this file requires updating signatures in appcasts that reference this file! This will involve re-running generate_appcast or sign_update.
-->
# SuperSent v1.2.2

v1.2.2 修复搜索面板中“仅复制”快捷键无响应的问题。现在选中普通内容后按 `Option+Enter`，会将内容写入系统剪贴板并关闭搜索面板，不会向原应用自动发送 `Command+V`。

数据库与导入资源继续保存在用户的 `Application Support/SuperSent` 目录。安装更新只替换应用程序本身，不会删除现有分类、分组、条目或受管资源。

## 快捷键修复

- 正确接管 macOS 为 `Option+Enter` 生成的原生文本命令；
- 纯文本、变量模板、图片和普通文件均可通过 `Option+Enter` 仅写入剪贴板；
- “仅复制”不会请求辅助功能权限，也不会自动切换到原应用执行粘贴；
- 普通 `Enter` 的发送并粘贴行为保持不变；
- 组合内容继续使用全引导式发送，按 `Option+Enter` 时会在预览区提示正确入口，避免多块内容互相覆盖剪贴板。

## 发布安全

- 更新源、更新说明和安装包继续使用 Sparkle EdDSA 签名验证；
- 安装包继续使用 Apple Developer ID 签名，并通过 Apple 公证与票据装订；
- 官网更新源要求 CDN 每次重新验证，避免旧 appcast 延迟更新提示；
- 发布顺序固定为安装包、更新说明、appcast，确保更新源只指向已经可下载的产物。

## 数据安全

- 不修改数据库 Schema，也不迁移现有内容；
- 不上传内容库、剪贴板内容或用户选择的文件；
- 更新应用不会改变 `~/Library/Application Support/SuperSent` 中的数据库和受管资源。

## 系统要求

- macOS 13 或更高版本；
- Apple Silicon Mac。

## 下载与安装

1. 下载 `SuperSent-1.2.2.dmg`；
2. 打开 DMG，将 SuperSent 拖入“应用程序”文件夹；
3. 启动 SuperSent。现有数据库和资源文件会继续保留。

下载地址：[SuperSent-1.2.2.dmg](https://github.com/SilnoGM/SuperSent-Releases/releases/download/v1.2.2/SuperSent-1.2.2.dmg)

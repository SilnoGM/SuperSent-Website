<!-- sparkle-sign-warning:
IMPORTANT: This file was signed by Sparkle. Any modifications to this file requires updating signatures in appcasts that reference this file! This will involve re-running generate_appcast or sign_update.
-->
# SuperSent v1.2.3

v1.2.3 修复搜索结果列表在鼠标操作后的焦点与执行问题。现在单击结果后可以直接按 `Enter` 执行当前条目，双击结果会产生与 `Enter` 相同的效果；搜索框重新获得焦点时，光标会停在查询词末尾，不再默认全选并覆盖原内容。

数据库与导入资源继续保存在用户的 `Application Support/SuperSent` 目录。安装更新只替换应用程序本身，不会删除现有分类、分组、条目或受管资源。

## 搜索面板交互修复

- 鼠标单击结果只切换当前选择和预览，不会提前执行条目；
- 单击结果后无需再次点击搜索框，可直接按 `Enter` 发送当前条目；
- 双击结果等同普通 `Enter`，只执行鼠标实际命中的条目；
- 双击列表空白区域不会误执行此前选中的条目；
- 搜索框恢复焦点后，插入点会折叠到查询词末尾，不再全选搜索文字；
- 中文和 Emoji 查询使用正确的 UTF-16 光标位置，继续输入时会追加内容而不是覆盖查询词。

## 既有快捷键

- `Command+Shift+Space`：打开或关闭全局搜索面板；
- `↑` / `↓`：切换当前结果；
- `Enter`：发送并尝试粘贴；组合内容进入全引导式发送；
- `Option+Enter`：普通内容仅写入剪贴板，不自动发送 `Command+V`；
- `Esc`：关闭搜索面板。

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

1. 下载 `SuperSent-1.2.3.dmg`；
2. 打开 DMG，将 SuperSent 拖入“应用程序”文件夹；
3. 启动 SuperSent。现有数据库和资源文件会继续保留。

下载地址：[SuperSent-1.2.3.dmg](https://github.com/SilnoGM/SuperSent-Releases/releases/download/v1.2.3/SuperSent-1.2.3.dmg)

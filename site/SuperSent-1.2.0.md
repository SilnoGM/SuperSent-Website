<!-- sparkle-sign-warning:
IMPORTANT: This file was signed by Sparkle. Any modifications to this file requires updating signatures in appcasts that reference this file! This will involve re-running generate_appcast or sign_update.
-->
# SuperSent v1.2.0

v1.2.0 新增组合内容与全引导式发送。现在可以把文字、图片和视频按顺序保存到同一个条目中，搜索到条目后逐块预览，再通过鼠标确认粘贴、跳过或取消。

数据库与导入资源继续保存在用户的 `Application Support/SuperSent` 目录。安装更新只替换应用程序本身，不会删除现有分类、分组、条目或受管资源。

## 组合内容

- 新增“组合内容”条目类型，可按任意顺序添加文字、图片和视频块；
- 内容块支持添加、删除和拖动排序，保存前可统一预览最终顺序；
- 搜索会索引组合条目的文字正文和媒体文件名；
- 主窗口与搜索面板按真实顺序展示文字摘要、图片缩略图和视频信息。

## 全引导式发送

- 选择组合条目后，在目标输入区域附近显示下一项预览；
- 每一块都必须通过鼠标选择“粘贴”“跳过”或“取消”，不会自动连续投递；
- 文字同样提供完整预览和确认，视频预览不会自动播放；
- 流程结束时显示已粘贴与已跳过数量，不会自动点击第三方应用的发送或发布按钮。

## 微信与网页兼容

- 优先使用标准 macOS Accessibility 可编辑输入节点定位目标；
- 微信及网页自定义输入框未暴露标准节点时，可安全回退到当前聚焦窗口；
- 兼容模式会持续提示确认光标位置，并在每次粘贴前复核前台应用和目标窗口；
- 修复非激活浮窗中“粘贴”按钮背景不可见的问题。

## 数据安全

- 新增 SQLite v4 迁移，历史分类、分组、条目和资源保持不变；
- 组合条目与全部内容块在同一数据库事务中保存，失败时完整回滚；
- 媒体资源只在数据库保存成功后提交，移除的资源仅在不再被引用时清理；
- 更新应用不会改变 `~/Library/Application Support/SuperSent` 中的数据库和受管资源。

## 系统要求

- macOS 13 或更高版本；
- Apple Silicon Mac。

## 下载与安装

1. 下载 `SuperSent-1.2.0.dmg`；
2. 打开 DMG，将 SuperSent 拖入“应用程序”文件夹；
3. 启动 SuperSent。现有数据库和资源文件会继续保留。

下载地址：[SuperSent-1.2.0.dmg](https://github.com/SilnoGM/SuperSent-Releases/releases/download/v1.2.0/SuperSent-1.2.0.dmg)

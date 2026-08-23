<!-- sparkle-sign-warning:
IMPORTANT: This file was signed by Sparkle. Any modifications to this file requires updating signatures in appcasts that reference this file! This will involve re-running generate_appcast or sign_update.
-->
# SuperSent v1.3.1

本版本修复 macOS 文本编辑快捷键，并优化应用内滚动条显示。

## 文本编辑

- 恢复所有文本输入框中的 `Command+A` 全选、`Command+C` 复制、`Command+X` 剪切和 `Command+V` 粘贴；
- 补齐标准撤销、重做和编辑菜单响应，不改变输入框原有内容、校验或保存行为。

## 界面优化

- 将应用内滚动条改为更窄的覆盖样式，并使用系统圆滑滚动效果；
- 保持内容库、搜索窗口和现有窗口布局不变。

## 更新与数据安全

- 更新继续通过签名 Sparkle feed 提供，安装前始终由用户确认；
- 正式应用继续使用 Apple Developer ID 签名并通过 Apple 公证；
- 更新只替换应用程序本身，不删除或迁移 `~/Library/Application Support/SuperSent` 中的数据库和受管资源。

## 系统要求

- macOS 13 Ventura 或更高版本；
- Apple Silicon Mac（M1 或更新芯片）。

<!-- sparkle-sign-warning:
IMPORTANT: This file was signed by Sparkle. Any modifications to this file requires updating signatures in appcasts that reference this file! This will involve re-running generate_appcast or sign_update.
-->
# SuperSent v1.3.2

本版本改进 macOS 检查更新中的版本历史入口，让用户可以直接查看官网完整版本时间线。

## 版本历史记录

- 在“检查更新”提示中点击“版本历史记录”后，使用默认浏览器打开官网版本更新时间线；
- 当前版本的单独更新说明仍由签名 Sparkle feed 提供，不改变新版本发现、下载和安装流程；
- 版本历史不再退回单个版本的 Markdown 页面或 GitHub Release 页面。

## 更新与数据安全

- 更新继续通过签名 Sparkle feed 提供，安装前始终由用户确认；
- 正式应用继续使用 Apple Developer ID 签名并通过 Apple 公证；
- 更新只替换应用程序本身，不删除、读取或迁移 `~/Library/Application Support/SuperSent` 中的数据库和受管资源。

## 系统要求

- macOS 13 Ventura 或更高版本；
- Apple Silicon Mac（M1 或更新芯片）。

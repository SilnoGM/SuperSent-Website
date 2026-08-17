<!-- sparkle-sign-warning:
IMPORTANT: This file was signed by Sparkle. Any modifications to this file requires updating signatures in appcasts that reference this file! This will involve re-running generate_appcast or sign_update.
-->
# SuperSent v1.0.2

v1.0.2 强化了本地资源管理、启动体验和后续升级能力。数据库与导入资源继续保存在用户的
`Application Support/SuperSent` 目录，安装更新只替换应用程序本身。

> v1.0.1 尚未内置更新器，因此本次需要手动下载安装。安装 v1.0.2 后，后续版本可以直接在菜单栏中检查更新。

## 应用内检查更新

- 菜单栏新增“检查更新…”；
- 支持发现新版本、显示更新说明、下载安装并重新启动；
- 更新包、appcast 和更新说明均使用 Sparkle EdDSA 签名；
- 保留 Developer ID 签名、Apple 公证和 Gatekeeper 校验链路。

## 更安全的本地资源管理

- 图片、视频、文档、压缩包、音频和其他文件按类型保存；
- 删除条目时，仅在资源位于 SuperSent 受管目录且没有其他条目引用时删除对应文件；
- 外部文件、目录、符号链接和仍被引用的资源不会被误删；
- 更新应用不会删除数据库、分组、条目或受管资源。

## 启动体验

- 启动 SuperSent 后直接显示并聚焦内容管理主窗口；
- 关闭主窗口后应用仍驻留菜单栏；
- 可从菜单栏再次打开同一个窗口，不会生成重复窗口。

## 功能界面

### 内容管理主窗口

![SuperSent 内容管理主窗口](https://supersent-website.pages.dev/assets/SuperSent-main-window.png)

### 快速搜索与预览

![SuperSent 快速搜索面板](https://supersent-website.pages.dev/assets/SuperSent-search-panel.png)

### 导入文件时重命名

![SuperSent 文件重命名](https://supersent-website.pages.dev/assets/SuperSent-file-rename.png)

## 系统要求

- macOS 13 或更高版本；
- Apple Silicon Mac。

## 下载与安装

1. 下载 `SuperSent-1.0.2.dmg`；
2. 打开 DMG，将 SuperSent 拖入“应用程序”文件夹；
3. 从“应用程序”启动 SuperSent。安装新版本只替换应用本体，不会清理 `Application Support/SuperSent` 中的现有数据。

下载地址：[SuperSent-1.0.2.dmg](https://github.com/SilnoGM/SuperSent-Releases/releases/download/v1.0.2/SuperSent-1.0.2.dmg)

SHA-256：

```text
e205945ebe9c41e2cd2f19f058b6c92b4b4aa107a1728b17561ea0e134efc487
```

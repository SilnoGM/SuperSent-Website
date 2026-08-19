<!-- sparkle-sign-warning:
IMPORTANT: This file was signed by Sparkle. Any modifications to this file requires updating signatures in appcasts that reference this file! This will involve re-running generate_appcast or sign_update.
-->
# SuperSent v1.2.1

v1.2.1 新增默认自动更新检查。应用会在启动后静默检查签名更新源，并在运行期间每四小时检查一次；只有发现新版本时才显示更新提示。

数据库与导入资源继续保存在用户的 `Application Support/SuperSent` 目录。安装更新只替换应用程序本身，不会删除现有分类、分组、条目或受管资源。

## 自动更新提示

- 默认在应用启动后静默检查一次更新；
- 应用持续运行时，每四小时检查一次签名更新源；
- 没有新版本时不弹窗，不打断当前操作；
- 发现新版本时展示 Sparkle 更新提示，由用户决定是否继续；
- 不在后台自动下载或安装更新，也不会自动退出应用；
- 菜单栏中的“检查更新…”仍可随时手动使用。

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

1. 下载 `SuperSent-1.2.1.dmg`；
2. 打开 DMG，将 SuperSent 拖入“应用程序”文件夹；
3. 启动 SuperSent。现有数据库和资源文件会继续保留。

下载地址：[SuperSent-1.2.1.dmg](https://github.com/SilnoGM/SuperSent-Releases/releases/download/v1.2.1/SuperSent-1.2.1.dmg)

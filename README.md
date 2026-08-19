# SuperSent Website

SuperSent 官方产品网站。站点使用原生 HTML、CSS 和少量 JavaScript 构建，不依赖前端运行时框架，不加载分析脚本、第三方字体或广告资源。

## 本地开发

```bash
npm install
npm run check
npm run serve
```

本地预览地址默认为 `http://127.0.0.1:4173`。

## 目录结构

```text
site/       网站源码与公开资源
scripts/    构建和本地预览脚本
tests/      内容、资源、SEO 与隐私契约测试
dist/       可重复生成的部署产物，不提交 Git
```

## 构建

```bash
npm run build
```

构建脚本默认使用 `https://supersent-website.pages.dev` 生成 canonical、Open Graph 和 sitemap 地址。需要部署到其他域名时显式传入：

```bash
SITE_URL="https://example.com" npm run build
```

## Cloudflare Pages 部署

Wrangler 已锁定为开发依赖。首次部署前需通过官方 OAuth 登录：

```bash
npx wrangler login
npm run deploy
```

站点安装包不保存在本仓库，下载按钮直接指向 `SilnoGM/SuperSent-Releases` 中经过签名与公证的正式 DMG。

## 发布前检查

```bash
npm audit --audit-level=high
npm run check
git diff --check
```

## 与应用仓库协同发布

官网是 SuperSent 正式发布链路的最后一站。总控入口位于应用源码仓库：

```bash
cd /absolute/path/to/SUPER-SENT
SUPER_SENT_NOTARY_PROFILE="SuperSent-notary" \
bash Scripts/release-workflow.sh package
bash Scripts/release-workflow.sh publish --confirm-tag vx.y.z
```

发布顺序固定为：

1. 提交、推送源码仓库并创建版本 tag；
2. 向 `SilnoGM/SuperSent-Releases` 发布已签名和公证的资产，并更新其 README；
3. 最后提交、推送本仓库并部署 Cloudflare Pages；
4. 从公开地址重新校验 DMG、appcast、更新说明与缓存响应头。

发布前需要在本仓库更新并暂存版本号、首页、隐私页、测试和必要截图。`site/appcast.xml` 与当前版本的签名更新说明由应用仓库打包脚本按字节同步并暂存，禁止手工编辑签名内容。完整安全边界、重跑语义和验收项见应用仓库的 `docs/Distribution.md`。

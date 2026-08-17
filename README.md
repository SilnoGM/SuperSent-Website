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

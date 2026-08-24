import assert from "node:assert/strict";
import { existsSync, readFileSync } from "node:fs";
import { join } from "node:path";
import test from "node:test";

const projectRoot = new URL("..", import.meta.url).pathname;

function readSiteFile(relativePath) {
  const absolutePath = join(projectRoot, "site", relativePath);
  assert.ok(existsSync(absolutePath), `缺少官网文件：site/${relativePath}`);
  return readFileSync(absolutePath, "utf8");
}

test("首页包含 v1.3.2 双平台下载入口、unsigned 提示及完整产品信息", () => {
  const html = readSiteFile("index.html");
  const features = readSiteFile("features.html");
  const publicProductCopy = `${html}\n${features}`;
  const packageManifest = JSON.parse(readFileSync(join(projectRoot, "package.json"), "utf8"));

  assert.equal(packageManifest.version, "1.3.2");
  assert.match(html, /<h1[^>]*>[^<]*SuperSent/s);
  assert.match(html, /macOS 13/);
  assert.match(html, /Apple Silicon/);
  assert.match(html, /Windows 10 20H2/);
  assert.match(html, /x64/);
  assert.match(html, /⌘⇧Space/);
  assert.match(html, /Ctrl\+Shift\+Space/);
  assert.match(publicProductCopy, /视频/);
  assert.match(publicProductCopy, /保存前重命名/);
  assert.match(publicProductCopy, /变量模板/);
  assert.match(publicProductCopy, /分类分组/);
  assert.match(publicProductCopy, /组合内容/);
  assert.match(publicProductCopy, /全引导式发送/);
  assert.match(publicProductCopy, /逐项预览/);
  assert.match(publicProductCopy, /粘贴、跳过、取消/);
  assert.match(publicProductCopy, /测试设备/);
  const deprecatedCategoryName = ["焚", "烧", "炉"].join("");
  assert.doesNotMatch(publicProductCopy, new RegExp(deprecatedCategoryName));
  assert.match(publicProductCopy, /安装、教程、效果展示、参数信息/);
  assert.match(publicProductCopy, /检查更新/);
  assert.match(publicProductCopy, /每四小时检查一次/);
  assert.match(publicProductCopy, /只有发现新版本时才显示提示/);
  assert.match(
    html,
    /https:\/\/github\.com\/SilnoGM\/SuperSent-Releases\/releases\/download\/v1\.3\.2\/SuperSent-1\.3\.2\.dmg/
  );
  assert.match(
    html,
    /https:\/\/github\.com\/SilnoGM\/SuperSent-Releases\/releases\/download\/v1\.3\.2\/SuperSent-1\.3\.2-windows-x64-Setup\.msi/
  );
  assert.match(html, />下载SuperSent for Win\(\.msi\)<\/a>/);

  // 官网只公开推荐的 MSI 下载入口；一键安装版和便携包仍可保留在 Release 资产中，但不能出现在首页。
  assert.doesNotMatch(
    html,
    /https:\/\/github\.com\/SilnoGM\/SuperSent-Releases\/releases\/download\/v1\.3\.2\/SuperSent-1\.3\.2-windows-x64-Setup\.exe/
  );
  assert.doesNotMatch(
    html,
    /https:\/\/github\.com\/SilnoGM\/SuperSent-Releases\/releases\/download\/v1\.3\.2\/SuperSent-1\.3\.2-windows-x64-Portable\.zip/
  );
  assert.doesNotMatch(html, /一键安装 \(\.exe\)|下载便携包 \(\.zip\)/);
  assert.match(html, /data-platform="macos"/);
  assert.match(html, /data-platform="windows"/);
  assert.match(html, /Windows 安装包当前未进行代码签名/);
  assert.match(html, /SmartScreen/);
  assert.match(html, /href="releases\.html#v1-3-2"[^>]*>查看发布说明<\/a>/);
  assert.match(html, /"softwareVersion": "1\.3\.2"/);
  assert.match(publicProductCopy, /单击[^。]*Enter/);
  assert.match(publicProductCopy, /双击[^。]*Enter/);
  assert.match(publicProductCopy, /光标[^。]*查询词末尾/);
  assert.match(html, /https:\/\/github\.com\/SilnoGM\/SuperSent-Releases\/issues/);
});

test("首页严格采用参考 HTML 的单页结构并准确区分双平台快捷键与分发边界", () => {
  const html = readSiteFile("index.html");
  const css = readSiteFile("styles.css");

  // 首页复刻必须落在本地 HTML/CSS 中，不能依赖参考稿里的 Tailwind CDN 或第三方图标脚本。
  for (const landmark of [
    "floating-nav-shell",
    "hero-status",
    "shortcut-guide",
    "hero-workspace",
    "feature-bento",
    "privacy-architecture-preview",
    "download-grid"
  ]) {
    assert.match(html, new RegExp(`class="[^"]*${landmark}`));
  }
  assert.match(css, /--surface-page:\s*#090a0f/i);
  assert.match(css, /--accent:\s*#6670d5/i);
  assert.match(css, /\.glass-panel\s*\{/);

  // 快捷键与签名状态以两端实际注册代码为真相源，禁止沿用参考稿中的错误平台说明。
  assert.match(html, /macOS 呼出[\s\S]*?⌘\s*⇧\s*Space/);
  assert.match(html, /Windows 呼出[\s\S]*?Ctrl\+Shift\+Space/);
  assert.doesNotMatch(html, /Alt\s*\+\s*Space/);
  assert.match(html, /macOS 仅复制[\s\S]*?⌥\s*Enter/);
  assert.match(html, /Windows 仅复制[\s\S]*?Alt\+Enter/);
  assert.match(html, /macOS 已签名并通过 Apple 公证/);
  assert.match(html, /Windows 当前未签名/);
  assert.doesNotMatch(html, /双端架构已签名/);
  assert.doesNotMatch(html, /Intel 芯片|Windows on ARM/);

  // 系统选择按钮与下载卡片必须复用同一套本地品牌资产，禁止回退为文字缩写或手写 SVG。
  assert.equal((html.match(/src="assets\/icon-apple\.svg"/g) ?? []).length, 2);
  assert.equal((html.match(/src="assets\/icon-windows\.svg"/g) ?? []).length, 2);
  assert.doesNotMatch(html, /<span class="platform-mark[^>]*>\s*(?:mac|win)\s*<\/span>/i);
  const heroActions = html.match(/<div class="hero-actions[^>]*>[\s\S]*?<\/div>/)?.[0];
  assert.ok(heroActions, "首页缺少系统选择按钮区域");
  assert.doesNotMatch(heroActions, /<svg[\s>]/);
  assert.match(css, /\.platform-icon\s*\{[\s\S]*?width:\s*18px;[\s\S]*?height:\s*18px;/);
  assert.match(css, /\.platform-icon-card\s*\{[\s\S]*?width:\s*22px;[\s\S]*?height:\s*22px;/);

  // 顶部导航增加站内版本时间线；所有下载 CTA 仍先进入同一个系统选择节点。
  assert.match(html, /href="features\.html"[^>]*>核心特性<\/a>/);
  assert.match(html, /href="privacy\.html"[^>]*>隐私与架构<\/a>/);
  assert.match(html, /href="releases\.html"[^>]*>版本更新<\/a>/);
  assert.match(html, /href="#download"[^>]*>多端下载<\/a>/);
  assert.match(html, /href="#download"[^>]*>[\s\S]*?免费下载[\s\S]*?<\/a>/);
  assert.doesNotMatch(html, /<a[^>]+href="[^"]*guided[^"]*"[^>]*>引导式发送<\/a>/);
});

test("版本更新时间线从 v1.3.0 开始并只展示双平台版本", () => {
  const html = readSiteFile("releases.html");
  const css = readSiteFile("releases.css");
  const expectedVersions = [
    "v1.3.2",
    "v1.3.1",
    "v1.3.0"
  ];
  const publishedVersions = [...html.matchAll(/<article[^>]+data-release="([^"]+)"/g)]
    .map((match) => match[1]);

  assert.deepEqual(publishedVersions, expectedVersions);
  assert.match(html, /<time datetime="2026-08-24">2026 年 8 月 24 日<\/time>/);
  assert.match(html, /<time datetime="2026-08-23">2026 年 8 月 23 日<\/time>/);
  assert.match(html, /id="v1-3-2"/);
  assert.match(html, /id="v1-3-1"/);
  assert.match(html, /id="v1-3-0"/);
  assert.match(html, /首个 macOS 与 Windows 共用版本号的双平台版本/);
  assert.match(html, /Command\+A/);
  assert.match(html, /Windows[^<]*品牌图标/);
  assert.match(html, /Ctrl\+Shift\+Space/);
  assert.match(html, /版本历史记录/);
  assert.match(html, /复用当前单实例/);
  assert.match(html, /<dt>3<\/dt><dd>双平台版本<\/dd>/);
  assert.match(html, /id="v1-3-2" class="release-node release-node-current"/);

  // 官网从双平台统一版本号的起点开始记录，不保留或隐藏旧版 macOS 时间线。
  assert.doesNotMatch(html, /v1\.(?:0\.[0-2]|1\.0|2\.[0-3])/);
  assert.doesNotMatch(html, /release-state-legacy|仅 macOS/);

  assert.match(css, /\.release-timeline\s*\{/);
  assert.match(css, /\.release-node\s*\{/);
  assert.match(css, /@media[^}]*max-width:\s*767px/s);
  assert.match(html, /class="skip-link"/);
  assert.match(html, /aria-current="page">版本更新<\/a>/);
});

test("所有版本说明入口留在官网内且保留外部下载边界", () => {
  const pages = ["index.html", "features.html", "privacy.html", "releases.html"]
    .map(readSiteFile);
  const combinedPages = pages.join("\n");

  assert.match(pages[0], /href="releases\.html#v1-3-2"[^>]*>查看发布说明<\/a>/);
  assert.match(pages[0], /href="releases\.html"[^>]*>所有版本<\/a>/);
  assert.match(pages[1], /href="releases\.html"[^>]*>版本更新<\/a>/);
  assert.match(pages[2], /href="releases\.html#v1-3-2"[^>]*>发布说明<\/a>/);
  assert.doesNotMatch(
    combinedPages,
    /href="https:\/\/github\.com\/SilnoGM\/SuperSent-Releases\/releases(?:\/tag\/[^"#]+)?"/
  );

  // 安装包与问题反馈仍由公开 Release 仓库承担，不把二进制复制进官网。
  assert.match(combinedPages, /SuperSent-Releases\/releases\/download\/v1\.3\.2/);
  assert.match(combinedPages, /SuperSent-Releases\/issues/);
});

test("核心特性独立页完整介绍当前正式版的四十一个功能点", () => {
  const html = readSiteFile("features.html");
  const publishedFeatures = [...html.matchAll(/data-feature="([^"]+)"/g)]
    .map((match) => match[1]);

  assert.deepEqual(publishedFeatures, [
    "text-content",
    "image-content",
    "file-video-content",
    "variable-template",
    "composite-content",
    "import-rename",
    "item-fields",
    "item-crud",
    "category-management",
    "group-management",
    "library-views",
    "inherited-placement",
    "list-filter-sort",
    "asset-safety",
    "global-hotkey",
    "search-fields",
    "multi-keyword-search",
    "pinyin-search",
    "relevance-ranking",
    "keyboard-navigation",
    "location-path",
    "media-preview",
    "ordinary-send",
    "copy-only",
    "template-render",
    "guided-preview",
    "guided-actions",
    "guided-position",
    "target-safety",
    "browser-fallback",
    "wechat-compatibility",
    "send-boundary",
    "menu-bar",
    "accessibility-boundary",
    "local-data",
    "privacy-boundary",
    "update-checks",
    "update-confirmation",
    "update-data-preservation",
    "signed-distribution",
    "system-requirements"
  ]);

  assert.match(html, /全引导式发送/);
  assert.match(html, /href="\/#download"[^>]*>多端下载<\/a>/);
  assert.match(html, /只有空分组可删除/);
  assert.match(html, /多关键词 AND 搜索/);
  assert.match(html, /不会自动点击第三方应用的发送、发布或提交按钮/);
  assert.match(html, /全局搜索无需授权/);
});

test("当前 Sparkle 更新源使用真实签名并保持平台隔离", () => {
  const appcast = readSiteFile("appcast.xml");
  const feedVersionMatch = appcast.match(
    /<sparkle:shortVersionString>(\d+\.\d+\.\d+)<\/sparkle:shortVersionString>/
  );

  // 官网内容提交先于正式打包，打包脚本随后同步新的签名 feed。这里校验 feed 自身的
  // 版本、下载地址和说明文件严格一致；发布总控另行强制校验它必须等于本次正式产物。
  assert.ok(feedVersionMatch, "Sparkle feed 缺少语义版本号");
  const feedVersion = feedVersionMatch[1];
  const escapedFeedVersion = feedVersion.replaceAll(".", "\\.");
  const releaseNotes = readSiteFile(`SuperSent-${feedVersion}-macos.md`);

  assert.equal((appcast.match(/<item>/g) ?? []).length, 1);
  assert.match(appcast, /<sparkle:version>\d+<\/sparkle:version>/);
  assert.match(appcast, /<sparkle:minimumSystemVersion>13\.0<\/sparkle:minimumSystemVersion>/);
  assert.match(appcast, /<sparkle:hardwareRequirements>arm64<\/sparkle:hardwareRequirements>/);
  assert.match(
    appcast,
    new RegExp(`SuperSent-Releases/releases/download/v${escapedFeedVersion}/SuperSent-${escapedFeedVersion}\\.dmg`)
  );
  assert.match(
    appcast,
    new RegExp(`sparkle:releaseNotesLink[^>]*>https://supersent-website\\.pages\\.dev/SuperSent-${escapedFeedVersion}-macos\\.md`)
  );
  assert.match(appcast, /<sparkle:deltas>/);
  assert.match(appcast, /SuperSent\d+-\d+\.delta/);
  assert.doesNotMatch(appcast, /windows-x64|Setup\.exe|Portable\.zip|Velopack/i);
  assert.doesNotMatch(appcast, /releases\/download\/v1\.(?:0\.2|1\.0|2\.0|2\.1|2\.2|2\.3)\/SuperSent-/);
  assert.match(appcast, /sparkle:edSignature=/);
  assert.match(appcast, /sparkle-signatures:/);
  assert.match(releaseNotes, /更新只替换应用程序本身/);
  assert.doesNotMatch(releaseNotes, /Windows|Setup\.exe|win-x64/);
});

test("签名更新源每次请求都会向 CDN 重新验证", () => {
  const headers = readSiteFile("_headers");

  assert.match(
    headers,
    /\/appcast\.xml\s+Cache-Control:\s*no-cache,\s*max-age=0,\s*must-revalidate/s
  );
});

test("首页不展示实景图片，核心特性独立页使用经过验收的真实产品截图", () => {
  const home = readSiteFile("index.html");
  const features = readSiteFile("features.html");

  for (const screenshot of [
    "assets/SuperSent-composite-editor-and-preview.png",
    "assets/SuperSent-search-panel-composite.png",
    "assets/SuperSent-guided-send-panel.png",
    "assets/SuperSent-category-groups-test-device.png",
    "assets/SuperSent-main-window.png",
    "assets/SuperSent-file-rename.png"
  ]) {
    const screenshotPattern = new RegExp(screenshot.replaceAll(".", "\\."));
    assert.doesNotMatch(home, screenshotPattern);
    assert.match(features, screenshotPattern);
  }
});

test("公开文案统一使用测试设备示例", () => {
  const deprecatedCategoryName = ["焚", "烧", "炉"].join("");
  const publicCopy = [
    readSiteFile("index.html"),
    readSiteFile("features.html"),
    readSiteFile("privacy.html"),
    readSiteFile("SuperSent-1.1.0.md"),
    readSiteFile("SuperSent-1.2.0.md"),
    readSiteFile("SuperSent-1.2.1.md"),
    readSiteFile("SuperSent-1.2.2.md"),
    readSiteFile("SuperSent-1.2.3.md")
  ].join("\n");

  assert.doesNotMatch(publicCopy, new RegExp(deprecatedCategoryName));
});

test("页面具备 SEO、语义结构与键盘可访问性基础", () => {
  const html = readSiteFile("index.html");
  const css = readSiteFile("styles.css");

  assert.match(html, /<meta\s+name="description"/s);
  assert.match(html, /<meta property="og:title"/);
  assert.match(html, /<meta property="og:image"/);
  assert.match(html, /application\/ld\+json/);
  assert.match(html, /class="skip-link"/);
  assert.match(html, /<header/);
  assert.match(html, /<main/);
  assert.match(html, /<footer/);
  assert.match(css, /:focus-visible/);
  assert.match(css, /prefers-reduced-motion/);
  assert.match(css, /@media[^}]*max-width:\s*767px/s);
});

test("隐私页如实说明本地数据与辅助功能权限边界", () => {
  const html = readSiteFile("privacy.html");

  assert.match(html, /隐私与架构/);
  assert.match(html, /无需账户/);
  assert.match(html, /Application Support/);
  assert.match(html, /不提供云同步/);
  assert.match(html, /不使用分析或追踪服务/);
  assert.match(html, /辅助功能权限/);
  assert.match(html, /自动粘贴/);
  assert.match(html, /检查更新/);
  assert.match(html, /默认自动检查/);
  assert.match(html, /每四小时检查一次/);
  assert.match(html, /不会上传内容库/);
  assert.match(html, /Windows/);
  assert.match(html, /%APPDATA%/);
  assert.match(html, /用户选择/);
  assert.match(html, /不读取、关联或迁移/);
});

test("公开页面不加载第三方脚本、追踪器或非 HTTPS 资源", () => {
  const pages = [
    readSiteFile("index.html"),
    readSiteFile("features.html"),
    readSiteFile("privacy.html"),
    readSiteFile("releases.html")
  ].join("\n");

  assert.doesNotMatch(pages, /<script[^>]+src="https?:\/\//);
  assert.doesNotMatch(pages, /google-analytics|googletagmanager|plausible|umami|segment|mixpanel/i);
  assert.doesNotMatch(pages, /http:\/\//);
});

test("公开页面不使用会被严格 CSP 拦截的内联样式", () => {
  const pages = [
    readSiteFile("index.html"),
    readSiteFile("features.html"),
    readSiteFile("privacy.html"),
    readSiteFile("releases.html"),
    readSiteFile("404.html")
  ].join("\n");

  assert.doesNotMatch(pages, /\sstyle\s*=/i);
});

test("整站使用受控的响应式排版尺度", () => {
  const css = readSiteFile("styles.css");

  assert.match(css, /--type-hero:\s*clamp\(3rem,\s*3\.9vw,\s*4\.4rem\)/);
  assert.match(css, /--type-section:\s*clamp\(2rem,\s*3\.2vw,\s*3\.45rem\)/);
  assert.match(css, /--type-subsection:\s*clamp\(1\.5rem,\s*2vw,\s*2\.1rem\)/);
  assert.match(css, /--type-legal-hero:\s*clamp\(2\.8rem,\s*5vw,\s*4\.5rem\)/);
  assert.match(css, /--measure-copy:\s*58ch/);
  assert.match(css, /\.hero h1\s*\{[^}]*font-size:\s*var\(--type-hero\)/s);
});

test("站点地图收录核心特性、隐私架构与版本更新独立页", () => {
  const sitemap = readSiteFile("sitemap.xml");

  assert.match(sitemap, /\{\{SITE_URL\}\}\/features\.html/);
  assert.match(sitemap, /\{\{SITE_URL\}\}\/privacy\.html/);
  assert.match(sitemap, /\{\{SITE_URL\}\}\/releases\.html/);
});

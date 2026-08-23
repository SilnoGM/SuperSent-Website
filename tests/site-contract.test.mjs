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

test("首页包含 v1.3.0 双平台下载入口、unsigned 提示及完整产品信息", () => {
  const html = readSiteFile("index.html");
  const packageManifest = JSON.parse(readFileSync(join(projectRoot, "package.json"), "utf8"));

  assert.equal(packageManifest.version, "1.3.0");
  assert.match(html, /<h1[^>]*>[^<]*SuperSent/s);
  assert.match(html, /macOS 13/);
  assert.match(html, /Apple Silicon/);
  assert.match(html, /Windows 10 20H2/);
  assert.match(html, /x64/);
  assert.match(html, /⌘⇧Space/);
  assert.match(html, /Ctrl\+Shift\+Space/);
  assert.match(html, /视频/);
  assert.match(html, /保存前重命名/);
  assert.match(html, /变量模板/);
  assert.match(html, /分类分组/);
  assert.match(html, /组合内容/);
  assert.match(html, /全引导式发送/);
  assert.match(html, /逐项预览/);
  assert.match(html, /粘贴、跳过、取消/);
  assert.match(html, /测试设备/);
  const deprecatedCategoryName = ["焚", "烧", "炉"].join("");
  assert.doesNotMatch(html, new RegExp(deprecatedCategoryName));
  assert.match(html, /安装、教程、效果展示、参数信息/);
  assert.match(html, /检查更新/);
  assert.match(html, /每四小时检查一次/);
  assert.match(html, /只有发现新版本时才显示提示/);
  assert.match(
    html,
    /https:\/\/github\.com\/SilnoGM\/SuperSent-Releases\/releases\/download\/v1\.3\.0\/SuperSent-1\.3\.0\.dmg/
  );
  assert.match(
    html,
    /https:\/\/github\.com\/SilnoGM\/SuperSent-Releases\/releases\/download\/v1\.3\.0\/SuperSent-1\.3\.0-windows-x64-Setup\.exe/
  );
  assert.match(
    html,
    /https:\/\/github\.com\/SilnoGM\/SuperSent-Releases\/releases\/download\/v1\.3\.0\/SuperSent-1\.3\.0-windows-x64-Portable\.zip/
  );
  assert.match(html, /data-platform="macos"/);
  assert.match(html, /data-platform="windows"/);
  assert.match(html, /Windows 安装包当前未进行代码签名/);
  assert.match(html, /SmartScreen/);
  assert.match(html, /https:\/\/github\.com\/SilnoGM\/SuperSent-Releases\/releases\/tag\/v1\.3\.0/);
  assert.match(html, /"softwareVersion": "1\.3\.0"/);
  assert.match(html, /单击[^。]*Enter/);
  assert.match(html, /双击[^。]*Enter/);
  assert.match(html, /光标[^。]*查询词末尾/);
  assert.match(html, /https:\/\/github\.com\/SilnoGM\/SuperSent-Releases\/issues/);
});

test("首页采用深色 HUD 视觉并准确区分双平台快捷键与分发边界", () => {
  const html = readSiteFile("index.html");
  const css = readSiteFile("styles.css");

  // 视觉复刻必须落在本地 HTML/CSS 中，不能依赖参考稿里的 Tailwind CDN 或第三方图标脚本。
  for (const landmark of [
    "floating-nav-shell",
    "hero-status",
    "shortcut-guide",
    "interface-stage",
    "feature-bento",
    "privacy-spec-grid"
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
});

test("首页完整介绍当前正式版的四十一个功能点", () => {
  const html = readSiteFile("index.html");
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

  assert.match(html, /href="#capabilities">全部功能<\/a>/);
  assert.match(html, /只有空分组可删除/);
  assert.match(html, /多关键词 AND 搜索/);
  assert.match(html, /不会自动点击第三方应用的发送、发布或提交按钮/);
  assert.match(html, /全局搜索无需授权/);
});

test("M5.2b 使用真实签名的 v1.3.0 macOS 更新源并保持平台隔离", () => {
  const appcast = readSiteFile("appcast.xml");
  const releaseNotes = readSiteFile("SuperSent-1.3.0-macos.md");

  assert.equal((appcast.match(/<item>/g) ?? []).length, 1);
  assert.match(appcast, /<sparkle:version>9<\/sparkle:version>/);
  assert.match(appcast, /<sparkle:shortVersionString>1\.3\.0<\/sparkle:shortVersionString>/);
  assert.match(appcast, /<sparkle:minimumSystemVersion>13\.0<\/sparkle:minimumSystemVersion>/);
  assert.match(appcast, /<sparkle:hardwareRequirements>arm64<\/sparkle:hardwareRequirements>/);
  assert.match(appcast, /SuperSent-Releases\/releases\/download\/v1\.3\.0\/SuperSent-1\.3\.0\.dmg/);
  assert.match(appcast, /sparkle:releaseNotesLink[^>]*>https:\/\/supersent-website\.pages\.dev\/SuperSent-1\.3\.0-macos\.md/);
  assert.match(appcast, /<sparkle:deltas>/);
  for (const previousBuild of [8, 7, 6, 5, 3]) {
    assert.match(appcast, new RegExp(`SuperSent9-${previousBuild}\\.delta`));
  }
  assert.doesNotMatch(appcast, /windows-x64|Setup\.exe|Portable\.zip|Velopack/i);
  assert.doesNotMatch(appcast, /releases\/download\/v1\.(?:0\.2|1\.0|2\.0|2\.1|2\.2|2\.3)\/SuperSent-/);
  assert.match(appcast, /sparkle:edSignature=/);
  assert.match(appcast, /sparkle-signatures:/);
  assert.match(releaseNotes, /软件优化/);
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

test("首页展示经过验收的真实产品截图", () => {
  const html = readSiteFile("index.html");

  for (const screenshot of [
    "assets/SuperSent-composite-editor-and-preview.png",
    "assets/SuperSent-search-panel-composite.png",
    "assets/SuperSent-guided-send-panel.png",
    "assets/SuperSent-category-groups-test-device.png",
    "assets/SuperSent-main-window.png"
  ]) {
    assert.match(html, new RegExp(screenshot.replaceAll(".", "\\.")));
  }
});

test("公开文案统一使用测试设备示例", () => {
  const deprecatedCategoryName = ["焚", "烧", "炉"].join("");
  const publicCopy = [
    readSiteFile("index.html"),
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
  const pages = [readSiteFile("index.html"), readSiteFile("privacy.html")].join("\n");

  assert.doesNotMatch(pages, /<script[^>]+src="https?:\/\//);
  assert.doesNotMatch(pages, /google-analytics|googletagmanager|plausible|umami|segment|mixpanel/i);
  assert.doesNotMatch(pages, /http:\/\//);
});

test("公开页面不使用会被严格 CSP 拦截的内联样式", () => {
  const pages = [readSiteFile("index.html"), readSiteFile("privacy.html"), readSiteFile("404.html")].join("\n");

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

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

test("首页包含 v1.1.0 产品信息与真实下载入口", () => {
  const html = readSiteFile("index.html");

  assert.match(html, /<h1[^>]*>[^<]*SuperSent/s);
  assert.match(html, /macOS 13/);
  assert.match(html, /Apple Silicon/);
  assert.match(html, /⌘⇧Space/);
  assert.match(html, /视频/);
  assert.match(html, /保存前重命名/);
  assert.match(html, /变量模板/);
  assert.match(html, /分类分组/);
  assert.match(html, /安装、教程、效果展示、参数信息/);
  assert.match(html, /检查更新/);
  assert.match(
    html,
    /https:\/\/github\.com\/SilnoGM\/SuperSent-Releases\/releases\/download\/v1\.1\.0\/SuperSent-1\.1\.0\.dmg/
  );
  assert.match(html, /https:\/\/github\.com\/SilnoGM\/SuperSent-Releases\/releases\/tag\/v1\.1\.0/);
  assert.match(html, /"softwareVersion": "1\.1\.0"/);
  assert.match(html, /https:\/\/github\.com\/SilnoGM\/SuperSent-Releases\/issues/);
});

test("站点发布 v1.1.0 的签名更新源和更新说明", () => {
  const appcast = readSiteFile("appcast.xml");
  const releaseNotes = readSiteFile("SuperSent-1.1.0.md");

  assert.match(appcast, /<sparkle:version>4<\/sparkle:version>/);
  assert.match(appcast, /<sparkle:shortVersionString>1\.1\.0<\/sparkle:shortVersionString>/);
  assert.match(appcast, /SuperSent-Releases\/releases\/download\/v1\.1\.0\/SuperSent-1\.1\.0\.dmg/);
  assert.match(appcast, /sparkle:releaseNotesLink[^>]*>https:\/\/supersent-website\.pages\.dev\/SuperSent-1\.1\.0\.md/);
  assert.match(appcast, /sparkle:edSignature=/);
  assert.match(appcast, /sparkle-signatures:/);
  assert.match(releaseNotes, /安装更新只替换应用程序本身/);
  assert.match(releaseNotes, /分类内分组/);
  assert.match(releaseNotes, /SuperSent-Releases\/releases\/download\/v1\.1\.0\/SuperSent-1\.1\.0\.dmg/);
});

test("首页展示四张经过验收的真实产品截图", () => {
  const html = readSiteFile("index.html");

  for (const screenshot of [
    "assets/SuperSent-category-groups.png",
    "assets/SuperSent-main-window.png",
    "assets/SuperSent-search-panel.png",
    "assets/SuperSent-file-rename.png"
  ]) {
    assert.match(html, new RegExp(screenshot.replaceAll(".", "\\.")));
  }
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
  assert.match(html, /不会上传内容库/);
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

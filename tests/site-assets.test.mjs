import assert from "node:assert/strict";
import { existsSync, readFileSync } from "node:fs";
import { join } from "node:path";
import test from "node:test";

const projectRoot = new URL("..", import.meta.url).pathname;
const siteRoot = join(projectRoot, "site");

test("HTML 引用的本地资源全部存在", () => {
  for (const page of ["index.html", "features.html", "privacy.html", "releases.html"]) {
    const pagePath = join(siteRoot, page);
    assert.ok(existsSync(pagePath), `缺少页面：site/${page}`);
    const html = readFileSync(pagePath, "utf8");
    const assetReferences = [...html.matchAll(/(?:src|href)="(assets\/[^"#?]+)"/g)].map((match) => match[1]);

    assert.ok(assetReferences.length > 0, `${page} 至少应引用一个本地资源`);
    for (const relativePath of assetReferences) {
      assert.ok(existsSync(join(siteRoot, relativePath)), `缺少资源：site/${relativePath}`);
    }
  }
});

test("站点必须提供图标、robots 与 404 页面", () => {
  for (const relativePath of [
    "assets/app-icon.png",
    "assets/favicon-32.png",
    "assets/icon-apple.svg",
    "assets/icon-windows.svg",
    "assets/bootstrap-icons-LICENSE.txt",
    "assets/SuperSent-composite-editor-and-preview.png",
    "assets/SuperSent-search-panel-composite.png",
    "assets/SuperSent-guided-send-panel.png",
    "assets/SuperSent-category-groups-test-device.png",
    "robots.txt",
    "404.html"
  ]) {
    assert.ok(existsSync(join(siteRoot, relativePath)), `缺少发布资源：site/${relativePath}`);
  }

  // 本地视觉验收必须用正确 MIME 返回 SVG，否则浏览器在 nosniff 模式下会拒绝渲染品牌图标。
  const previewServer = readFileSync(join(projectRoot, "scripts", "serve.mjs"), "utf8");
  assert.match(previewServer, /\["\.svg",\s*"image\/svg\+xml"\]/);
});

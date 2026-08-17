import { cp, mkdir, readFile, readdir, rm, writeFile } from "node:fs/promises";
import { dirname, join } from "node:path";
import { fileURLToPath } from "node:url";

const projectRoot = dirname(dirname(fileURLToPath(import.meta.url)));
const sourceDirectory = join(projectRoot, "site");
const outputDirectory = join(projectRoot, "dist");
const siteUrl = (process.env.SITE_URL ?? "https://supersent-website.pages.dev").replace(/\/$/, "");

// dist 是可重复生成的唯一构建目录；清理前固定解析到当前项目，避免触及源码或父目录。
await rm(outputDirectory, { recursive: true, force: true });
await mkdir(outputDirectory, { recursive: true });
await cp(sourceDirectory, outputDirectory, { recursive: true });

// 部署域名只在构建阶段注入，使预览环境和正式域名可以共用同一份源码。
for (const relativePath of ["index.html", "privacy.html", "robots.txt", "sitemap.xml"]) {
  const targetPath = join(outputDirectory, relativePath);
  const source = await readFile(targetPath, "utf8");
  await writeFile(targetPath, source.replaceAll("{{SITE_URL}}", siteUrl), "utf8");
}

const outputEntries = await readdir(outputDirectory, { recursive: true });
console.log(`Built ${outputEntries.length} files for ${siteUrl}`);

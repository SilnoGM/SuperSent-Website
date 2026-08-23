import { createReadStream, existsSync, statSync } from "node:fs";
import { createServer } from "node:http";
import { extname, join, normalize } from "node:path";
import { fileURLToPath } from "node:url";

const projectRoot = fileURLToPath(new URL("..", import.meta.url));
const publicDirectory = join(projectRoot, "dist");
const port = Number.parseInt(process.env.PORT ?? "4173", 10);

const contentTypes = new Map([
  [".css", "text/css; charset=utf-8"],
  [".html", "text/html; charset=utf-8"],
  [".js", "text/javascript; charset=utf-8"],
  [".json", "application/json; charset=utf-8"],
  [".png", "image/png"],
  [".svg", "image/svg+xml"],
  [".txt", "text/plain; charset=utf-8"],
  [".xml", "application/xml; charset=utf-8"]
]);

// 本地预览服务器只读取 dist，并拒绝任何试图跳出构建目录的路径。
createServer((request, response) => {
  const requestPath = decodeURIComponent(new URL(request.url ?? "/", "http://localhost").pathname);
  const cleanPath = normalize(requestPath).replace(/^(\.\.[/\\])+/, "");
  const relativePath = cleanPath === "/" ? "index.html" : cleanPath.replace(/^\//, "");
  let filePath = join(publicDirectory, relativePath);

  if (!extname(filePath) && existsSync(`${filePath}.html`)) filePath = `${filePath}.html`;
  if (!existsSync(filePath) || statSync(filePath).isDirectory()) {
    filePath = join(publicDirectory, "404.html");
    response.statusCode = 404;
  }

  response.setHeader("Content-Type", contentTypes.get(extname(filePath)) ?? "application/octet-stream");
  response.setHeader("X-Content-Type-Options", "nosniff");
  createReadStream(filePath).pipe(response);
}).listen(port, "127.0.0.1", () => {
  console.log(`SuperSent website preview: http://127.0.0.1:${port}`);
});

import { mkdir, readFile, readdir, writeFile } from "node:fs/promises";
import { extname, join, resolve } from "node:path";

const projectDir = resolve(decodeURIComponent(new URL("..", import.meta.url).pathname));
const siteDir = join(projectDir, "docs");
const assetDir = join(siteDir, "assets", "static-slots");
const exportDir = join(projectDir, "exports");
const outputPath = join(exportDir, "physics-light-platform-offline.html");

const mimeTypes = {
  ".css": "text/css",
  ".jpg": "image/jpeg",
  ".jpeg": "image/jpeg",
  ".png": "image/png",
  ".svg": "image/svg+xml",
};

const toDataUri = (fileName, bytes) => {
  const mimeType = mimeTypes[extname(fileName).toLowerCase()] ?? "application/octet-stream";
  return `data:${mimeType};base64,${bytes.toString("base64")}`;
};

const replaceAssetReferences = (text, assetNames) => {
  let result = text;
  for (const [fileName, dataUri] of assetNames) {
    for (const reference of [
      `../assets/static-slots/${fileName}`,
      `./assets/static-slots/${fileName}`,
      `/assets/static-slots/${fileName}`,
      `assets/static-slots/${fileName}`,
    ]) {
      result = result.replaceAll(reference, dataUri);
    }
  }
  return result;
};

const indexHtml = await readFile(join(siteDir, "index.html"), "utf8");
const jsFile = (await readdir(join(siteDir, "assets"))).find((fileName) => fileName.endsWith(".js"));
const cssFile = (await readdir(join(siteDir, "assets"))).find((fileName) => fileName.endsWith(".css"));

if (!jsFile || !cssFile) {
  throw new Error("docs 中缺少 JS 或 CSS 文件，请先运行 pnpm build。");
}

const assetFileNames = (await readdir(assetDir)).filter((fileName) => mimeTypes[extname(fileName).toLowerCase()]);
const assetEntries = await Promise.all(
  assetFileNames.map(async (fileName) => [fileName, toDataUri(fileName, await readFile(join(assetDir, fileName)))]),
);

const js = replaceAssetReferences(await readFile(join(siteDir, "assets", jsFile), "utf8"), assetEntries);
const css = replaceAssetReferences(await readFile(join(siteDir, "assets", cssFile), "utf8"), assetEntries);
const favicon = toDataUri("favicon.svg", await readFile(join(siteDir, "favicon.svg")));
const missingAssetFallback = "data:image/gif;base64,R0lGODlhAQABAIAAAAAAAP///ywAAAAAAQABAAACAUwAOw==";
const replaceMissingAssetReferences = (text) =>
  text.replace(/(?:(?:\.{1,2}\/)|\/)?assets\/static-slots\/[^"' )]+/g, missingAssetFallback);
const safeJs = replaceMissingAssetReferences(js).replaceAll("</script>", "<\\/script>");
const safeCss = replaceMissingAssetReferences(css);

const singleFileHtml = indexHtml
  .replace(/<link rel="icon"[^>]+>/, `<link rel="icon" href="${favicon}">`)
  .replace(
    /<script type="module"[^>]+><\/script>/,
    () => `<script>\nwindow.addEventListener("DOMContentLoaded", () => {\n${safeJs}\n});\n</script>`,
  )
  .replace(/<link rel="stylesheet"[^>]+>/, () => `<style>\n${safeCss}\n</style>`);

await mkdir(exportDir, { recursive: true });
await writeFile(outputPath, singleFileHtml, "utf8");
console.log(`已导出：${outputPath}`);
console.log(`文件大小：${(Buffer.byteLength(singleFileHtml) / 1024 / 1024).toFixed(2)} MB`);

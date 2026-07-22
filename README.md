# 物理之光 · 数字化科普平台

这是一个基于 React + Vite 的静态网站。将 **本目录中的内容** 上传至 GitHub 仓库即可；不要上传外层工作目录。

## 目录说明

- `app/`：Vite 源码入口与页面组件、交互、样式
- `public/assets/static-slots/`：页面实际使用的图片资源
- `docs/`：已构建的静态网站，可直接作为 GitHub Pages 的发布目录
- `scripts/export-single-html.mjs`：可选的离线单文件 HTML 导出脚本
- `.github/workflows/deploy-pages.yml`：推送 `main` 后部署至 GitHub Pages 的工作流

`node_modules/`、`dist/`、`exports/`、临时图片和本机缓存均已忽略，不应上传；`docs/` 是需要上传的正式发布文件。

## 本地运行

需要 Node.js 20 或更高版本，以及 pnpm 9 或更高版本。

```bash
pnpm install
pnpm dev
```

构建与预览：

```bash
pnpm build
pnpm preview
```

## GitHub Pages 部署

上传后可选择任一种方式：

1. **推荐：GitHub Actions。** 确保上传了隐藏目录 `.github`，并在 **Settings → Pages → Build and deployment** 中选择 **GitHub Actions**。推送 `main` 后，`Deploy static site to Pages` 会自动构建并发布 `docs/`。
2. **无需 Actions：从分支部署。** 在同一页面选择 **Deploy from a branch**，分支选择 `main`，文件夹选择 **`/docs`**，然后保存。

根目录的 `index.html` 会跳转至 `docs/`，因此即使误选 `main /(root)` 也会打开已经构建好的页面；但仍建议使用上面两种方式之一。

项目采用相对资源路径，因此部署到 `https://用户名.github.io/仓库名/` 时，图片与交互也能正常工作。

## 可选：导出单个离线 HTML

```bash
pnpm export:html
```

导出的文件位于 `exports/physics-light-platform-offline.html`，可直接分享给他人打开；该目录默认不会提交到 GitHub。

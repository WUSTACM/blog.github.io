---
title: 主题说明
date: 2026-07-05 00:00:00
updated: 2026-07-05 00:00:00
hideInfo: true
aside: [toc, meta-aside-github]
---

::meta-aside-github{title="项目仓库"}
:::link-card
---
title: WUSTACM/blog.github.io
description: 武汉科技大学 ACM 俱乐部博客，基于 Nuxt 4、Nuxt Content v3 和 Clarity 主题重构。
link: https://github.com/WUSTACM/blog.github.io
---
:::
::

## 当前版本

本博客基于 [L33Z22L11/blog-v3](https://github.com/L33Z22L11/blog-v3) 的新版 Clarity 主题适配，保留其 Nuxt 4、Nuxt Content v3、响应式布局、深色模式、Atom 订阅源和静态生成能力。

## 内容结构

::card-list
- **文章目录**：`content/posts/`
- **静态资源**：`public/assets/`
- **站点配置**：`blog.config.ts`
- **前端配置**：`app/app.config.ts`
- **友链数据**：`app/feeds.ts`
::

## 部署

项目按静态站点方式生成，推荐部署到 GitHub Pages。

```sh
pnpm install
pnpm generate
```

GitHub Actions 会构建 `.output/public` 并发布到 Pages。

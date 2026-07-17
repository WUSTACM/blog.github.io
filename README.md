# WUSTACM Blog

武汉科技大学 ACM 俱乐部博客，基于 [L33Z22L11/blog-v3](https://github.com/L33Z22L11/blog-v3) 的 Clarity 主题重构为 Nuxt 4 + Nuxt Content v3。

## 内容

- 文章：`content/posts/`
- 静态资源：`public/assets/`
- 站点配置：`blog.config.ts`
- 前端配置：`app/app.config.ts`
- 友链配置：`app/feeds.ts`

当前文章由 WUSTACM 原博客迁移而来，保留原文章 frontmatter 中的 `permalink`，以尽量维持旧链接可访问。

## 开发

```powershell
pnpm install
pnpm dev
```

## 构建

```powershell
pnpm generate
```

静态产物位于 `.output/public`。

## 部署

仓库包含 GitHub Pages 工作流，推送到 `main` 分支后会自动安装依赖、执行 `pnpm generate`，并发布 `.output/public`。

自定义域名配置在 `public/CNAME`：`blog.wustacm.com`。

## 来源

- 主题模板：<https://github.com/L33Z22L11/blog-v3>
- WUSTACM：<https://github.com/WUSTACM>

## License

项目代码继承上游主题的 MIT 许可；文章内容按 CC BY-NC-SA 4.0 使用。

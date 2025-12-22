---
title: 如何向 WUSTACM 官方博客提交博文
date: 2025-12-23
tags: [杂谈]
categories: [技术分享]
cover: https://i.postimg.cc/ZnCzZKvr/2cb79efe667b08d4b12e3b103d67653.jpg
banner: https://i.postimg.cc/ZnCzZKvr/2cb79efe667b08d4b12e3b103d67653.jpg
topic: 题解
headline: 大标题
caption: 标题下方的小字
color: 标题颜色
mathjax: true
rightbar: toc
description:
poster:
sticky:
mermaid:
katex:
author: scandi
references:
comments: true
indexing:
breadcrumb:
leftbar:
h1:
type:
---

# 如何向 WUSTACM 官方博客提交博文（新手必看）

本文面向“几乎没用过 GitHub”的同学，目标是：**把你写好的 Markdown 博文提交到组织仓库**，并由 **GitHub Actions 自动部署**到官网。

> 仓库地址：<https://github.com/WUSTACM/blog.github.io>  
> 组织地址：<https://github.com/WUSTACM>  
> 你在组织内具有 **read + write** 权限。

---

<!-- more -->

## 你需要准备什么

### 1. 安装 Git

- Windows：建议安装 Git for Windows
- macOS：可用 Homebrew 安装 Git 或 Xcode Command Line Tools
- Linux：使用发行版包管理器安装 Git

安装后打开终端/命令行，执行：

```bash
git --version
```

能看到版本号说明安装成功。

### 2. 登录 GitHub

确保你已经：

- 有 GitHub 账号
- 已加入 WUSTACM 组织，并拥有仓库写权限

---

## 总体流程（先看一遍再操作）

1. **拉取仓库**（每次写新博文都要重新拉取）
2. 在 `source/_posts/` 新建 Markdown 文件
3. **复制其他博文的开头配置**（Front-matter），只改 5 个字段
4. 若有图片：按规定命名，放到合适位置，并确认相对路径正确
5. 本地运行 `clean + server` 预览确认
6. `git add -> git commit -> git push`
7. 等 GitHub Actions 自动部署完成

**特别重要：一定要先拉取再上传。**
并且：**本地拉下来的项目文件夹，用完可以删。下次写新博文请重新拉取。**

---

## Step 1：拉取仓库（每次写新博文都重新拉）

任选一个你电脑上方便的位置（例如桌面），打开终端进入该目录，然后执行：

```

git clone https://github.com/WUSTACM/blog.github.io.git
cd blog.github.io
```

说明：

- `clone` 会下载整个博客源码到本地
- `cd blog.github.io` 进入项目目录

---

## Step 2：新建博文文件（必须放到 source/\_posts）

进入 `source/_posts` 目录，你可以直接在文件管理器里创建文件，也可以用命令：

```

cd source/_posts
```

然后创建一个 `.md` 文件，例如：

- `2025-12-23-xxxxxx.md`（名字可自定，但建议简洁明确）

例如（命令行创建）：

```

touch my-first-post.md
```

> 要求：**博文必须放在 `source/_posts/` 中。其余目录文件不要擅自修改增添。**

---

## Step 3：复制“开头配置”，只改 5 个字段（非常重要）

### 3.1 什么是“开头配置”？

每篇 Hexo 博文最顶部都有一段 `--- ... ---` 包裹的内容（Front-matter），类似：

```

---
title: ...
date: ...
tags:
  - ...
categories:
  - ...
author: ...
---
```

### 3.2 正确做法（强制）

1. 打开 `source/_posts/` 下**任意一篇已有博文**
2. **复制它的整段开头配置**
3. 粘贴到你的新博文最顶部
4. 在博文的正文 **5~10** 行间,**任选一行加上 `<!-- more -->`**
5. **只允许修改这 5 个字段**（其余保持完全不动）：
   - `title`
   - `date`
   - `tags`
   - `categories`
   - `author`

> 除了上述 5 项，其余任何字段不要改、不要删、不要新增。

### 3.3 示例：你最终应该是这样（示例仅供参考）

```

---
title: 我的第一篇题解：XXX
date: 2025-12-23 21:30:00
tags:
  - dp
categories:
  - 算法
author: scandi
---
[正文部分]
[正文部分]
[正文部分]
[正文部分]
[正文部分]
[正文部分]
<!-- more -->
```

---

## Step 4：如果你的博文需要图片（按规定命名 + 相对路径正确）

### 4.1 图片必须一起上传

不要只写 Markdown 引用而不提交图片文件，否则线上会裂图。

### 4.2 图片放哪儿？

通常建议放在项目的 `source/images/` 下（如果项目已有约定目录，请遵循现有做法）。

示例：

- `source/images/ysp2025-12-23-1.png`
- `source/images/ysp2025-12-23-2.jpg`

> 关键点：图片必须在仓库里，并且路径要能被 Hexo 正确生成。

### 4.3 图片命名规范（必须遵守）

统一采用：

**笔者名字缩写 + 年-月-日 + 编号**

示例：你当天第一张图片：

- `ysp2025-12-23-1`

第二张：

- `ysp2025-12-23-2`

以此类推：

- `ysp2025-12-23-3`
- `ysp2025-12-23-4`

建议加扩展名：

- `ysp2025-12-23-1.png`

### 4.4 Markdown 中如何引用（相对路径要正确）

假设你把图片放到 `source/images/`，那么在博文里通常这样写：

```

![](/images/ysp2025-12-23-1.png)
```

如果你把图片放到别的目录，请确保：

- 路径能在生成后的站点中访问到
- 引用路径与实际存放位置一致

---

## Step 5：本地预览（每次 push 前必须做）

回到项目根目录（有 `package.json` 的那个目录）：

```

cd <你的 blog.github.io 根目录>
```

安装依赖（第一次拉取后需要做）：

```

npm install --legacy-peer-deps
```

然后每次 push 前务必执行：

```

npx hexo clean
npx hexo server
```

浏览器打开：

- http://localhost:4000/

检查：

- 文章是否出现在首页/分类/标签页
- 图片是否显示正常
- 页面是否有异常报错

确认一切正常后，用 `Ctrl + C` 停止本地服务。

> 要求：**每次 push 之前必须先 clean + 本地预览（server）确认正常。**

---

## Step 6：提交并推送到 GitHub（push）

仍在项目根目录执行：

### 6.1 查看你改了哪些文件

```

git status
```

### 6.2 添加本次变更（只会提交你写的文章/图片等）

```

git add source/_posts
git add source/images
```

> 如果你图片不在 `source/images/`，就把上面第二行改成你的实际图片目录。
> 原则：只提交文章和相关图片，不要乱提交其他目录的修改。

### 6.3 提交（写清楚提交信息）

```

git commit -m "post: add <你的文章标题或文件名>"
```

### 6.4 先拉取再推送（避免冲突，强制执行）

```

git pull --rebase
git push
```

> 强制要求：**push 前一定先 pull**，避免覆盖别人提交。

---

## Step 7：确认 GitHub Actions 自动部署成功

推送完成后，打开仓库：

- https://github.com/WUSTACM/blog.github.io

进入:

- **Actions** 标签页

找到最新一次 workflow（一般是 Deploy / Pages），看到绿色 ✅ 表示部署成功。

部署完成后，稍等片刻即可在网站看到更新（若有 CDN 缓存，可能延迟几分钟）。

---

## Step 8：本地文件夹用完就删（下次重新拉取）

按要求：

- 你本地的 `blog.github.io/` 文件夹提交完成后可以直接删除
- 下次写新博文：**重新从 Step 1 拉取仓库**

---

## 常见问题（快速排雷）

### 1）我 push 报错：要我先 pull

执行：

```

git pull --rebase
git push
```

### 2）图片线上不显示

检查三件事：

- 图片文件是否真的提交进仓库
- 图片路径是否正确（特别是 `/images/...`）
- 图片命名是否符合规范

### 3）本地能看到，线上没更新

去 GitHub Actions 看最新一次是否成功；如果失败，按日志提示修复后再 push。

---

## 规范总结（必须遵守）

1. **先拉取再上传**；push 前先 pull
2. 博文只放 `source/_posts`，其他目录不要乱动
3. Front-matter 只改：`title / date / tags / categories / author`
4. 图片必须一起提交，路径正确
5. 图片命名：`缩写YYYY-MM-DD-编号`（如 `ysp2025-12-23-1`）
6. 每次 push 前必须 `npx hexo clean` + `npx hexo server` 本地预览确认

---

如你按本文流程操作仍遇到错误，请把以下信息发到群里：

- 你执行的命令
- 报错完整截图或日志（尤其是 Actions 日志）
- 你新增的 `.md` 文件名与图片路径

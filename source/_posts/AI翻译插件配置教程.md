---
title: AI翻译插件配置教程
date: 2025-6-15
tags: [杂谈]
categories: [技术分享]
cover: https://i.postimg.cc/ZnCzZKvr/2cb79efe667b08d4b12e3b103d67653.jpg
banner: https://i.postimg.cc/ZnCzZKvr/2cb79efe667b08d4b12e3b103d67653.jpg
topic: 技术分享
headline: 大标题
caption: 标题下方的小字
color: 标题颜色
description:
poster:
sticky:
mermaid:
katex:
mathjax: true
author: scandi
references:
comments:
indexing:
breadcrumb:
leftbar:
rightbar: toc
h1:
type:
---

# ai 翻译插件配置

## 前言

### 必要性：

无论是在算法学习或者学习 csdiy 的课程，与英文文档打交道都是不可避免的，但是往往浏览器自带的机翻，非常差劲，毕竟对于大量的专业名词动词，机翻往往不能翻译恰当。这些都是计算机学习的第一道障碍......

<!-- more -->

### 功能：

而 ai 翻译插件，是通过调用 ai 接口，实现 ai 智能翻译，ai 的优势在于，它可以根据情景翻译出恰当的语义，并且下面介绍的插件翻译，实现的是一段一翻，也就是说，会有一段原文紧接着一段译文，这样也方便使用者对比适当学习英语~~如果你愿意的话~~

## 配置教程

### 首先获取 ai 的接口

（前言：ai 接口的使用是需要付费的，按照用量计费，但实际上非常便宜，实测 1 美元可以使用三个月以上~~我一开始不常用的话，可以用四五个月.....~~）

- 打开下面网站

[AI](https://aihubmix.com)

（如下图所示

![1](/assets/12.png)

- 然后注册一个自己的账号
- 点击【充值】界面，先买一美刀
- 点击【模型】界面 （如下图所示

![1](/assets/13.png)

- 找一些输入/输出 Tokens 花费较少的 ai 即可，我用的是`gpt-5-nano` （如下图所示

![1](/assets/14.png)

- 然后记住你选择的 ai，再回到最上面，点击【秘钥】 （如下图所示

![1](/assets/16.png)

- 点击【创建 key】，自己可以随便设置`key名称`，主要是要点击【高级设置】展开 （如下图所示

![1](/assets/17.png)

- 【模型范围】选择刚才找到的合适的 ai 接口（如 我这里选择较便宜的`gpt-5-nano` ） 然后点击提交即可

- 然后保留这个页面，新建页面进行后续操作

### 下载插件

- [沉浸式翻译](https://microsoftedge.microsoft.com/addons/detail/%E6%B2%89%E6%B5%B8%E5%BC%8F%E7%BF%BB%E8%AF%91-%E7%BD%91%E9%A1%B5%E7%BF%BB%E8%AF%91%E6%8F%92%E4%BB%B6-pdf%E7%BF%BB%E8%AF%91-/amkbmndfnliijdhojkpoglbnaaahippg) 打开这个插件，并点击【获取】，获取成功后，右上角拓展中就可以找到它了 （如下图所示

![1](/assets/18.png)

- 点击【沉浸式翻译】打开, - 点击左下角【设置】打开设置界面 （如下图所示

![1](/assets/19.png)

- 在左侧栏目中，找到【翻译服务】，再在页面的模型中找到【其他/自定义】，打开并选择【OpenAI 1】 （如下图所示

![1](/assets/21.png)

- 这时候回到刚才保留的页面中，将刚才创建的接口的`key`复制一下，然后粘贴到新页面的【APIKEY】中。并选择模型为刚刚自己创建的 key 的模型（如我这里是`gpt-5-nano`）
- 然后接着往下看，可以找到【自定义 API 接口地址】，将原先内容删除，并把下面这段，复制上去

`https://aihubmix.com/v1/chat/completions`

- 到此基本配置完成，看到页面最上方，有个【点击测试服务】，点击后即可知道是否配置成功啦

## 使用设置

- 接下来随便打开一个含有外语网页 （如下图所示

![1](/assets/23.png)

- 不难发现右侧有个粉色小按钮，鼠标移动至按钮上方（不点击） （如下图所示

![1](/assets/24.png)

- 点击设置打开，并将【翻译服务】设置为【OpenAI 1】

![1](/assets/25.png)

- 至此彻底完成配置，之后再使用翻译只需点击这个粉色小按钮稍待即可翻译成功！

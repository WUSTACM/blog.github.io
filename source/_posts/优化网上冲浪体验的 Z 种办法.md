---
title: 优化网上冲浪体验的 Z 种办法
tags: []
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
author: xiaozhangup
references:
comments:
indexing:
breadcrumb:
leftbar:
rightbar: toc
h1:
type:
---

**在此感谢本文主要笔者 25 级 xiaozhangup**

# 优化网上冲浪体验的 Z 种办法

网上的各种神秘广告何脑溢血限制很烦人，让我们一起一步步把他们火葬了  
Z Ways to O(ptimize) Y(our) O(nline) S(urfing)

本教程主要为 `Edge，Chrome，360浏览器` 等以 Chrome 为内核的浏览器编写，过程大同小异。  
当然，现在大部分人都使用 `Edge` 所以本教程的几乎全部截图都来自 `Edge` 。
其他浏览器仍可参考，只是部分步骤略有区别.

<!-- more -->

## 0. 正确地搜索

使用正确的搜索引擎能极大地提高我们的效率。  
对于 `Edge` 浏览器，复制粘贴 `edge://settings/privacy/services/search` 到地址栏并回车即可开始配置你的搜索引擎。
![](/assets/0-0.png)

## 1. 屏蔽基本的广告

广告既遮挡屏幕，又拖慢我们的加载速度，对日常体验影响极大。  
不过我们可以通过一个浏览器插件来实现屏蔽掉大部分广告，就像下图这样  
![](/assets/1-1.png)

单击前往 `Edge 扩展` 网页来安装 [AdGuard](https://microsoftedge.microsoft.com/addons/detail/adguard-%E5%B9%BF%E5%91%8A%E6%8B%A6%E6%88%AA%E5%99%A8/pdffkfellgipmhklpdmokmckkkfcopbh) 插件。  
点击这里即可安装这个扩展  
![](/assets/1-2.png)
随后我们会看到自动弹出了一个界面，像我这样配置能获得更好的体验  
![](/assets/1-3.png)
打开这些开关后直接关闭这个页面即可，无需其他任何操作。如此一来我们就完成了第一步广告屏蔽。

为什么我推荐 `AdGuard` ?

- 几乎不会自动弹出希望我付费支持的页面，打扰小
- 够简单
- 疑似比其他同类插件更轻量快速

## 2. 解决语言问题

翻译插件详细配置见[博文](https://blog.wustacm.org/wiki/csdiy/p1)

浏览器自带的翻译含糖量较高，如果直接使用会让我们需要消耗大量的胰岛素 (脑子) 去降糖 (来理解)。  
AI 时代我们自然有更好的选择，那就是我最爱的 [沉浸式翻译](https://microsoftedge.microsoft.com/addons/detail/%E6%B2%89%E6%B5%B8%E5%BC%8F%E7%BF%BB%E8%AF%91-%E7%BD%91%E9%A1%B5%E7%BF%BB%E8%AF%91%E6%8F%92%E4%BB%B6-pdf%E7%BF%BB%E8%AF%91-/amkbmndfnliijdhojkpoglbnaaahippg)。点击即可安装该插件。  
如果你有钱，可以付费获得更好的翻译效果和速度。如果你不想付费，像笔者这样调整也能获得相当不错的效果：  
![](/assets/2-1.png)
默认没有双语对照，我推荐像这样开启来获得更好的阅读体验：  
![](/assets/2-2.png)
配置完之后，随便打开一个英文网页，按下快捷键 `Alt+A` ，稍作等待即可完整翻译，畅快阅读：  
![](/assets/2-3.png)

## 3. 最强悍的万能工具

为了优化我们的浏览体验，这里不得不提到 [篡改猴](https://microsoftedge.microsoft.com/addons/detail/%E7%AF%A1%E6%94%B9%E7%8C%B4/iikmkjmpaadaobahmlepeloendndfphd) 了。  
这一部分会比之前更加复杂，但带来的提升也最明显！  
首先点击 [篡改猴](https://microsoftedge.microsoft.com/addons/detail/%E7%AF%A1%E6%94%B9%E7%8C%B4/iikmkjmpaadaobahmlepeloendndfphd) 来安装插件本身。
![](/assets/3-1.png)
随后，让我们进入 `Edge` 的设置页，打开开发者模式让该插件解锁全部潜力：
![](/assets/3-2.png)
![](/assets/3-3.png)
至此，该插件的基本安装完成。  
接下来让我们来进入这个插件的究极玩法 `安装脚本` 。
进入通常情况下最常用的脚本网站 [GreasyFork (油叉)](https://greasyfork.org/zh-CN) 。
我们会看到这个界面：  
![](/assets/3-4.png)
你可以在这里搜索你想要的功能，一般都会有你想要的功能。  
为了效率，我在这里推荐一些几乎是必装的脚本：

- [(必装) Greasy Fork 增强](https://greasyfork.org/scripts/467078)
- [(必装) 「CSDNGreener」🍃CSDN 广告完全过滤|免登录|个性化排版|最强老牌脚本|持续更新](https://greasyfork.org/scripts/378351)
- [(必装) Copying Lifted 解除复制限制](https://greasyfork.org/scripts/416195)
- [(必装) 解除网站不允许复制的限制，专治流氓](https://greasyfork.org/scripts/549231)
- [(必装) redirect 外链跳转](https://greasyfork.org/scripts/416338)
- [(推荐) 计时器掌控者|视频广告跳过|视频广告加速器](https://greasyfork.org/scripts/372673)
- [(推荐)解除 CSDN 登录复制](https://greasyfork.org/scripts/505207)
- [(可选) qk 文章资源共享｜ CSDN ｜专栏｜会员文章｜ C 知道｜文件下载｜ CSDN 积分](https://greasyfork.org/scripts/519970)
- [(可选) 东方永页机](https://greasyfork.org/scripts/438684)

这些基本是必装的脚本，能大大优化你的各类网站浏览体验。  
为什么有些看似功能重复的脚本？为了防止网页的一些更新导致旧脚本功能暴毙。  
笔者 4 年经验亲测，好用不累脚。  
当然，如果你有其他网站的功能需求，不妨试试把你的网站的域名粘贴到搜索框搜索一下，通常会有你想要的惊喜。

## 4. 下载加速

这一部分就更技术性了，主要是用于提升各类文件的下载速度以及绕过一些网盘的限制。
这里我们选用 [ab-download-manager](https://abdownloadmanager.com/) 。原因是我爱用，而且完全免费，界面现代美观，支持劫持浏览器下载。  
安装软件本身，然后按照途中箭头所指安装浏览器插件 (需要魔法才能访问) 。
![](/assets/4-1.png)
安装后，这样配置浏览器插件：  
注意，通常不需要用那一堆文件扩展名，只需要打开 `Auto Capture Links` 和 `Send Cookies`，然后关闭 `Show Popups` 即可。
![](/assets/4-2.jpeg)
安装的软件通常不需要怎么设置，你可以把它调成中文然后自己决定需要哪些功能。  
通常能让你的下载跑满宽带，肯定会比以前要快得多。  
但是对于部分网站可能不适用，如果遇到了记得暂时关闭 `Auto Capture Links` 用你浏览器自身的下载器下载。

## 5. 各类网盘下载

基于我们在 `3. 最强悍的万能工具` 安装的油猴和在 `## 4. 下载加速` 安装的 AB Downloader，我们可以再额外安装一个脚本 [LinkSwift](https://scriptcat.org/scripts/code/1604/LinkSwift.user.js) 。  
从此你会发现你的各类网盘界面多了一个如图的按钮：  
![](/assets/5-1.png)
以后直接选中文件，然后如图依次选择即可：
![](/assets/5-2.png)
![](/assets/5-3.png)

### 感谢你的观看，希望能起到一些作用！

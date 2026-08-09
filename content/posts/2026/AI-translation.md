---
title: 沉浸式AI翻译插件配置方法
description: 面向 WUST ACM 新生的沉浸式 AI 翻译插件配置教程，介绍沉浸式翻译插件安装、DeepSeek API Key 获取与自定义翻译服务配置，帮助提升英文文档阅读体验。
date: 2026-08-09 12:01:06
updated: 2026-08-09 12:01:06
permalink: /2026/immersive-ai-translation-setup
image: https://s.immersivetranslate.com/assets/r2-uploads/learn-0618/edge-install-poster1.png
categories: [技术分享]
tags: [沉浸式翻译, AI翻译, DeepSeek, API, 浏览器插件]
---

# ai 翻译插件配置

## 1.前言

无论是在算法学习或者学习 csdiy 的课程，与英文文档打交道都是不可避免的，但是往往浏览器自带的机翻，非常差劲，毕竟对于大量的专业名词动词，机翻往往不能翻译恰当。这些都是计算机学习的第一道障碍......

而使用 ai 翻译插件，是通过调用 ai 接口，实现 ai 智能翻译。并且 ai 的优势在于可以根据情景翻译出恰当的语义。同时沉浸式翻译插件实现的是双语对照，也就是说会有一段原文紧接着一段译文，这样也方便使用者对比适当学习英语~~如果你愿意的话~~（也可以在设置中更改为只显示译文）

当然使用ai来进行翻译，本地的算力肯定有些捉襟见肘，所以我们需要调用云端的大模型，这也就意味着使用AI翻译并不是完全免费的。在这里我们选用价格非常便宜的`DeepSeek V4 Flash`模型，中高强度使用每天的花费大概在0.02 - 0.08 元之间（2026.08.09）

## 2.配置教程

### 2.1下载插件

::link-card
---
title: 沉浸式翻译 - AI 双语网页翻译
icon: https://immersivetranslate.com/_next/static/media/logo.e15ccf02.png 
link: https://microsoftedge.microsoft.com/addons/detail/amkbmndfnliijdhojkpoglbnaaahippg

class: gradient-card active
---
::


- [沉浸式翻译🔗](https://microsoftedge.microsoft.com/addons/detail/%E6%B2%89%E6%B5%B8%E5%BC%8F%E7%BF%BB%E8%AF%91-%E7%BD%91%E9%A1%B5%E7%BF%BB%E8%AF%91%E6%8F%92%E4%BB%B6-pdf%E7%BF%BB%E8%AF%91-/amkbmndfnliijdhojkpoglbnaaahippg) 打开这个插件，并点击`获取`，获取成功后，插件会出现在浏览器的右上角[](extension://amkbmndfnliijdhojkpoglbnaaahippg/options.html#services){icon="clarity:plugin-line"}，然后右键`沉浸式翻译图标`，点击`打开设置页` （如下图所示

![](/images/immersive-ai-translation-setup/18.png)

- 点击左侧栏第二项`翻译服务` 

![1](/images/immersive-ai-translation-setup/19.png)

- 点击右上角`添加自定义翻译服务`

![1](/images/immersive-ai-translation-setup/21.png)

- 选择`DeepSeek`，暂且搁置此页面。现在我们需要先去获取DeepSeek的API。

### 2.2获取API Key

- 点击打开 [DeepSeek开放平台🔗](https://platform.deepseek.com/)，注册并登录
- 登录后，点在左侧栏的 `充值`（充值一个小数额即可，翻译对token的消耗量较小，够用很久了）
- 然后我们按照如下步骤，创建API key。

![1](/images/immersive-ai-translation-setup/23.png)

### 2.3配置插件

- 现在，我们回到刚刚搁置的插件配置页面，在此处粘贴刚刚复制的API Key。 ![1](/images/immersive-ai-translation-setup/24.png)

- 点击右上角 `点此测试服务`，如果出现`✅` 就说明API Key配置成功。

至此，恭喜完成沉浸式翻译插件的安装和简单配置

## 3. 使用设置

- 接下来打开[测试网站🔗](https://en.test.jianges.com/)

    ::link-card
    ---
    icon: https://immersivetranslate.com/_next/static/media/logo.e15ccf02.png 
    title: 翻译测试页面
    description: 点击测试翻译是否生效
    link: https://en.test.jianges.com/

    ---
    ::

- 可以观察到网页右侧有个粉色小按钮 :badge[]{link="https://immersivetranslate.com/zh-Hans/"} ，鼠标移动至按钮上方（不点击）后，正下方会展开有 `控制面板` [](){icon="lineicons:sliders-horizontal-square-2"}，点击打开

- 然后我们点击 `翻译服务：`，会出现许多模型，我们要下滑到最后，选择 `其他/自定义`中的刚刚创建的 `DeepSeek 1` 模型。 

![1](/images/immersive-ai-translation-setup/25.png)

- 如果你看到相应的中文提示说明插件现在已经正式生效，之后再使用翻译只需点击这个粉色小按钮稍待即可翻译成功！



插件下载视频教程：

::video-embed
---
type: raw
id: https://s.immersivetranslate.com/assets/r2-uploads/edge-install-1.16.5.mp4 
poster: https://s.immersivetranslate.com/assets/r2-uploads/learn-0618/edge-install-poster1.png 
---
::
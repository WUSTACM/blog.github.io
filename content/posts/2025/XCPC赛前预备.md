---
title: "XCPC赛前预备"
description: "这里我们仅介绍在ubuntu环境中给了一个什么都没有vscode如何用指令方便的coding。"
date: "2025-10-15 00:00:00"
updated: "2025-10-15 00:00:00"
permalink: "/2025/10/15/XCPC赛前预备"
categories: ["技术分享"]
tags: ["杂谈"]
---

这里我们仅介绍在`ubuntu`环境中给了一个什么都没有`vscode`如何用指令方便的`coding`。

## 第一步

创建一个新的文件夹并且右键点击 `Open in Terminal` 输入



```
code .
```

在当前文件夹中打开`vscode`。

强烈推荐在`vscode`中开启这个界面转换时自动保存。

![c9b90e3a-04e1-4324-9636-e6c71e84e60e](/assets/c9b90e3a-04e1-4324-9636-e6c71e84e60e.png)

## 第二步

我们写一段`C++`代码，命名为 `a.cpp`，然后在终端执行以下程序

![7578e0f2-4ea4-43f3-bc6c-ea171340e479](/assets/7578e0f2-4ea4-43f3-bc6c-ea171340e479.png)`a.out`文件是编译后自动生成的，如果程序可以运行则说明没有问题。

## 第三步

我们新建一个文件，起名为`run.sh`，写入以下代码

![6c2684d8-0d15-41a7-81b2-d41244ac2f30](/assets/6c2684d8-0d15-41a7-81b2-d41244ac2f30.png)

（井号内容一定要写！一定要写！一定要写！）

然后再创建`in.txt`跟`out.txt`文件，在前者中写入你想输入的内容，再执行以下程序

补充：先执行 `chmod +x run.sh`

![6d138c55-6761-4fb8-b76b-898a9f9d6935](/assets/6d138c55-6761-4fb8-b76b-898a9f9d6935.png)

检查`out.txt`文件中是否是正确的输出信息。

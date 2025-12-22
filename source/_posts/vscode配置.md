---
title: vscode配置教程
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
author: yz
references:
comments:
indexing:
breadcrumb:
leftbar:
rightbar: toc
h1:
type:
---

## VScode 配置 C/C++编译运行环境

### 效果预览

本文旨在通过介绍个人对 VScode 的配置及使用来帮助大家理解 VScode 配置的大致思路。

当然，如果你觉得我的使用方法很对你胃口的话，直接照搬也无妨。

我的工作区（名为`#FOR_CPP`）中包含了四类文件夹

<!-- more -->

- `.vscode` ：存放配置文件(调试用，本文不涉及)
- `io`：存放输入输出文件
- `src`（及同类）：存放源代码
- `compiled`：存放可执行文件

![图1](/assets/001.png)

日常写题的时候 belike：

- 在 `src` 中新建一个文件（这里用 `practice.cpp` 为例子）
- 在 `in.txt` 文件里输入样例的数据
- 在原文件里 ~~乱写一通~~ 编写代码
- 将文件编译运行
- 在 `out.txt` 文件中查看输出结果
- ~~接下来大概率要改屎了~~

![图2](/assets/002.png)

好了差不多就是这样，如果你看到这里觉得很有信心，那么我们可以开始了！

### 从目的出发

懒得看的话可以直接跳到[这里](#正式开始)

不难发现，上文写题步骤中的第四步就是关键（对于配置环境而言）。

细分来看，我们要能让源代码能够顺利的

- 被编译、运行
- 成功的读取输入
- 输出到正确的地方

那么 **HOW ?**

先别急，我们先来看看一个 C/CPP 的源文件 ~~的一生~~

让我们先在桌面新建一个 `practice.txt` ，写点简单的小程序，之后将文件扩展名改为`.cpp`。

然后打开你的 cmd （`WIN + R`，输入 `cmd` ，回车），敲两个命令

- `cd Desktop`
- `type practice.cpp`

![图3](/assets/003.png)

大概就会看到这些东西 (

### 下载编译器

那么怎么编译运行呢？这时候就需要掏出我们的编译器了。编译器的安装可以参考[编译器 - OI Wiki](https://oi-wiki.org/tools/compiler/)

懒得点进去？那直接点[这里](https://github.com/brechtsanders/winlibs_mingw/releases/download/14.2.0posix-12.0.0-ucrt-r3/winlibs-x86_64-posix-seh-gcc-14.2.0-mingw-w64ucrt-12.0.0-r3.zip)下载吧。(大家也可以在群里找找，没准哪天顺手放上去了

我们一般会直接使用 GCC (大家大概率用的都是 Windows)，对其他编译器感兴趣的话可以点上面的 OI WIKI 链接看看。

安装好后找到你安装的地方，打开他，再打开 `bin` 文件夹。复制文件夹路径，如 `D:\mingw64\bin` 。

安装的时候**注意一下安装的位置**，你的路径和我的可能不一样。

接下来打开系统设置，搜索 **编辑系统环境变量** ，点击环境变量，打开 Path，点击新建，把路径粘贴上去，点击确定。

![图4](/assets/004.png)

![图5](/assets/005.png)

接下来打开终端， 输入 gcc -v，没啥问题的话应该就没啥问题了(

### 回到命令行

现在我们有源代码了，也有编译器了，那么可以开始了。

首先我们来看编译器的基本用法：

> ```bash
> g++ [选项] 源文件 -o 输出文件
> ```

让我们一步步来

首先在终端里输入 `g++ practice.cpp`，我们会发现在桌面上多了一个名为 `a.exe` 的可执行文件。

是的， g++ 默认给你把编译出来的文件命名为 a 了。

想自定义输出文件怎么办？ 让我们加上后半句，输入 ： `g++ practice.cpp -o practice`

如何，是不是多了个 `practice.exe` 那么我们就能顺利的找到并运行他了。

那么怎么让他编译完了顺便运行一下呢 ？输入指令 ： `g++ practice.cpp -o practice && practice` 就好了。

![图6](/assets/006.png)

那么说了这么多，跟我们配置 vscode 有什么关系呢？

~~很明显~~ 这一套操作就是 vscode 编译运行代码时的底层操作，我们正是需要对这些命令进行定制来达到自己想要的效果。

### 正式开始

首先为什么是 VScode 而不是别的 IDE 呢。答案很多 ~~自己去百度吧~~

我们要知道的是，VScode 有丰富的插件生态，我们只需要下个插件就能实现很多功能（比如我的壁纸），可以实现高度的自定义。

本教程利用了插件 `code runner`

另：个人使用的插件如图

没需求的话下载 `code runner` 就好了，看不太懂英语界面的话可以再下载图中倒三的汉化插件

![图7](/assets/007.png)

下好插件后重启一下，接下来就需要对 `code runner` 下手了。

![图8](/assets/008.png)

![图9](/assets/009.png)

点击设置，下拉找到这一栏，点击 `在 settings.json 中编辑`

找到 `cpp` 那一栏， 将双引号内替换为：

`cd $dir && g++ -std=c++23 $fileName -o ..\\compiled\\$fileNameWithoutExt &&  ..\\compiled\\$fileNameWithoutExt < ..\\io\\in.txt > ..\\io\\out.txt`

替换后整行为 ：

`"cpp": "cd $dir && g++ -std=c++23 $fileName -o ..\\compiled\\$fileNameWithoutExt &&  ..\\compiled\\$fileNameWithoutExt < ..\\io\\in.txt > ..\\io\\out.txt",`

![图10](/assets/010.png)

具体效果如上图中绿色的被注释掉的部分，如果想使用 clang 的话可以参照前文下好 LLVM 后敲入下面一行。

`"cpp": "cd $dir && clang++ --target=x86_64-w64-mingw32 -std=c++23 $fileName -o ..\\compiled\\$fileNameWithoutExt &&  ..\\compiled\\$fileNameWithoutExt < ..\\io\\in.txt > ..\\io\\out.txt",`

那么现在 `code runner` 就调好了，仿照 [本文第一部分](#效果预览) 建好文件夹，编辑完代码后点击 `CTRL + ALT + N` 即可编译运行。

（`CTRL + ALT + N` 是 `code runner` 的默认快捷键，也可以设置为自己习惯的快捷键）

那么这行命令是干啥的呢，让我们拆开来看：

- `cd $dir` ：先把当前工作目录切换到变量 `$dir` 指定的路径

- `g++ -std=c++20 $fileName -o ..\\compiled\\$fileNameWithoutExt`：

  基本编译语句，采用 c++20 标准，将文件编译并输出到 当前文件夹的 上级文件夹下的 `compiled` 文件夹内

- `..\\compiled\\$fileNameWithoutExt` ：

​ 运行刚刚编译出来的可执行文件

- `< ..\\io\\in.txt > ..\\io\\out.txt`

  对输入和输出重定向

另外，`code runner` 默认使用 `cmd` 运行，而不是 `powershell`。由于本教程也更推荐使用 `cmd` 以避免`poweshell` 通过管道设置输入时可能造成的问题。如果实在想用 `poweshell` (比如需要 clang 带高亮的报错)这里给出在 `poweshell` 里使用 `cmd` 子进程运行程序的解决方案：

` "cpp": "cmd /c  'cd $dir & clang++ --target=x86_64-w64-mingw32 -std=c++23 $fileName -o ..\\compiled\\$fileNameWithoutExt &  ..\\compiled\\$fileNameWithoutExt < ..\\io\\in.txt > ..\\io\\out.txt'",`

### 几点提示

- 如果在 Windows 电脑上想使用 Clang 的话需要注意

  > 由于 LLVM 在 Windows 上缺失标准库，所以你仍需安装 MSVC 或 GCC。

- 对比 GCC，Clang 有几个优点：
  - 编译速度快
  - 内存占用小
  - 错误提示更清晰
- 本文参考：[【竞赛工具】——vscode xcpc 竞赛向配置教程](https://blog.csdn.net/Resot/article/details/147296133)

- 本文未包括程序调式的配置方法，有需求的话需要等等了，之后随缘更新。
- 大家在配置的时候出现的各种问题有两种解决方法
  - 重启一下 VScode
  - 把报错发给 AI， 让 AI 看看

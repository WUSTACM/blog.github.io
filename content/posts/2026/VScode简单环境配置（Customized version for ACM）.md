---
title: VScode简单环境配置（Customized version for ACM）
description: 面向 WUST ACM 新生的 Visual Studio Code C/C++ 简单环境配置，涵盖 VS Code、MinGW64、环境变量、CPH、Code Runner 与常用编辑器设置。
date: 2026-07-15 22:23:07
updated: 2026-07-15 22:23:07
permalink: /2026/vscode-acm-environment-setup
categories: [技术分享]
tags: [VSCode, C++, MinGW, CPH, 环境配置, WUSTACM]
---

## 1.下载与安装

首先搜索[Visual Studio Code官网](https://code.visualstudio.com/) 下载并安装，一路点击下一步（可以选择创建桌面快捷方式和注册资源管理器上下文菜单，看个人喜好）

然后耐心等待即可🥰

## 2.配置系统变量

::alert{type="tip" title="配置顺序"}
这时候我们可以先把vscode关掉~~扔一边~~，先配置编译环境<del>（推荐一定不要先打开VSCode）</del>
::

从 [蓝奏云](https://wwavk.lanzoub.com/ijOZo3wl71uf) `密码fd9o` / [Github](https://github.com/niXman/mingw-builds-binaries/releases/download/15.2.0-rt_v13-rev1/x86_64-15.2.0-release-posix-seh-ucrt-rt_v13-rev1.7z) 下载Mingw64，解压放在C盘根目录（如下图所示 ~~解压和复制巨量文件可能使你的风扇旋转~~）

![1784118439705](/images/vscode-acm-config/1784118439705.png)
点击`开始/搜索` -  键入 `编辑系统环境变量` -  点击右下角的`环境变量` -  双击下方`系统变量(S)`栏目的 `path` -  点击右方的`新建(N)` - 输入

`C:\mingw64\bin`{copy}（可以进入该路径复制，效果如下）- 然后一路点击确定关闭页面

![1784120077114](/images/vscode-acm-config/1784120077114.png)

## 3.配置vscode

### 3.1 切换语言

打开vscode后我们先进行第一步~~伟大~~的操作，切换语言到中文

![1784120961385](/images/vscode-acm-config/1784120961385.png)

搜索`Chinese`{copy}，点击`Chinese (Simplified) (简体中文) Language Pack for Visual Studio Code`的`Install`按钮，然后点击右下角的 `Change Language and Restart` 重启VSCode

### 3.2 安装插件


我们再次打开插件页面搜索安装 `C/C++` `Competitive Programming Helper (cph)` `Code Runner`

下面几个为可选美化插件 `Error Lens` `Material Icon Theme`

安装完后重启VSCode


![1784120973084](/images/vscode-acm-config/1784120973084.png)

### 3.3 配置VSCode编译选项

现在你可以挑选一个你心仪的位置创建一个名为`code`的文件夹📁作为以后存放代码的仓库，然后在VSCode中打开该文件夹

在VSCode页面同时按下 :key{ctrl shift code="P"}，然后键入 `C/C++`选择 `C/C++:Edit Configurations (UI) 或 C/C++:编辑配置(UI)` 更改以下配置

![1784121662598](/images/vscode-acm-config/1784121662598.png)

如果一致则无须任何改动



### 3.4  创建文件

现在我们将要创建第一个`.cpp`文件开始书写代码了！一定要写文件后缀`.cpp`

![1784122283582](/images/vscode-acm-config/1784122283582.png)

### 3.5 编译运行

此时我们可以现在代码书写区域粘贴以下内容

```cpp [A.cpp]
#include <bits/stdc++.h>
using namespace std;

int main()
{
    int a;
    cin >> a;
    cout << a * 2 << endl;
    cout << "Hello World!" << endl;
}
//含义是我们输入一个数字，会输出他的二倍，然后会再输出一行内容“Hello World!”
```



现在我们尝试调试出CPH窗口并把它放在合适的位置，点击 `创建题目 / 新建测试用例`![1784122691546](/images/vscode-acm-config/1784122691546.png)

如果不出意外，现在就会输出正确的结果

![1784122778830](/images/vscode-acm-config/1784122778830.png)

恭喜你完成了vscode的CPH版本配置！

## 4. 补充

::folding{title="可选的 VSCode 设置"}
通过探索，发现VSCode通过设置还可以玩出更多的花样来，这里推荐一些简单的设置来优化写代码时的体验

在VSCode页面按下 :key{ctrl code=","}（对的你没看错就是逗号`，`）

![1784124966947](/images/vscode-acm-config/1784124966947.png)

把下面的文字全部粘贴到 `{}`内部

```json [setting.json]

    /*editor*/
	,
    "editor.cursorBlinking": "smooth",//使编辑器光标的闪烁平滑，有呼吸感
    "editor.mouseWheelZoom": true, //使用Ctrl + 滚轮调整字体大小
    "editor.formatOnPaste": true,//在粘贴时格式化代码
    "editor.smoothScrolling": true,//使编辑器滚动变平滑
    "editor.tabCompletion": "on",//启用Tab补全
    "editor.fontFamily": "'Jetbrains Mono', '思源黑体'",//字体设置，个人喜欢Jetbrains Mono作英文字体，思源黑体作中文字体
    "editor.fontLigatures": true,//启用字体连字
    "editor.detectIndentation": false,//不基于文件内容选择缩进用制表符还是空格
    /*
    因为有时候VSCode的判断是错误的
    */
    "editor.insertSpaces": true,//敲下Tab键时插入4个空格而不是制表符
    "editor.copyWithSyntaxHighlighting": false,//复制代码时复制纯文本而不是连语法高亮都复制了
    "editor.suggest.snippetsPreventQuickSuggestions": false,//这个开不开效果好像都一样，据说是因为一个bug，建议关掉
    "editor.stickyTabStops": true,//在缩进上移动光标时四个空格一组来移动，就仿佛它们是制表符(\t)一样
    "editor.linkedEditing": true,//html标签自动重命名（喜大普奔！终于不需要Auto Rename Tag插件了！）
    "editor.wordWrap": "on",//在文件内容溢出vscode显示区域时自动折行
    "editor.cursorSmoothCaretAnimation": "on",//让光标移动、插入变得平滑
    "editor.renderControlCharacters": true,//编辑器中显示不可见的控制字符
    "editor.renderWhitespace": "boundary",//除了两个单词之间用于分隔单词的一个空格，以一个小灰点的样子使空格可见
    /*terminal*/
    "terminal.integrated.defaultProfile.windows": "Command Prompt",//将终端设为cmd，个人比较喜欢cmd作为终端
    "terminal.integrated.cursorBlinking": true,//终端光标闪烁
    "terminal.integrated.rightClickBehavior": "default",//在终端中右键时显示菜单而不是粘贴（个人喜好）
    /*files*/
    "files.autoGuessEncoding": true,//让VScode自动猜源代码文件的编码格式
    "files.autoSave": "onFocusChange",//在编辑器失去焦点时自动保存，这使自动保存近乎达到“无感知”的体验
    "files.exclude": {//隐藏一些碍眼的文件夹
        "**/.git": true,
        "**/.svn": true,
        "**/.hg": true,
        "**/CVS": true,
        "**/.DS_Store": true,
        "**/tmp": true,
        "**/node_modules": true,
        "**/bower_components": true
    },
    "files.watcherExclude": {//不索引一些不必要索引的大文件夹以减少内存和CPU消耗
        "**/.git/objects/**": true,
        "**/.git/subtree-cache/**": true,
        "**/node_modules/**": true,
        "**/tmp/**": true,
        "**/bower_components/**": true,
        "**/dist/**": true
    },
    /*workbench*/
    "workbench.list.smoothScrolling": true,//使文件列表滚动变平滑
    "workbench.editor.enablePreview": false,//打开文件时不是“预览”模式，即在编辑一个文件时打开编辑另一个文件不会覆盖当前编辑的文件而是新建一个标签页
    "workbench.editor.wrapTabs": true,//编辑器标签页在空间不足时以多行显示
    "workbench.editor.untitled.hint": "hidden",//隐藏新建无标题文件时的“选择语言？”提示（个人喜好，可以删掉此行然后Ctrl+N打开无标题新文件看看不hidden的效果）
    /*explorer*/
    "explorer.confirmDelete": false,//删除文件时不弹出确认弹窗（因为很烦）
    "explorer.confirmDragAndDrop": false,//往左边文件资源管理器拖动东西来移动/复制时不显示确认窗口（因为很烦）
    /*search*/
    "search.followSymlinks": false,//据说可以减少vscode的CPU和内存占用
    /*window*/
    "window.menuBarVisibility": "visible",//在全屏模式下仍然显示窗口顶部菜单（没有菜单很难受）
    "window.dialogStyle": "custom",//使用更具有VSCode的UI风格的弹窗提示（更美观）
    /*debug*/
    "debug.internalConsoleOptions": "openOnSessionStart",//每次调试都打开调试控制台，方便调试
    "debug.showBreakpointsInOverviewRuler": true,//在滚动条标尺上显示断点的位置，便于查找断点的位置
    "debug.toolBarLocation": "docked",//固定调试时工具条的位置，防止遮挡代码内容（个人喜好）
    "debug.saveBeforeStart": "nonUntitledEditorsInActiveGroup",//在启动调试会话前保存除了无标题文档以外的文档（毕竟你创建了无标题文档就说明你根本没有想保存它的意思（至少我是这样的。））
    "debug.onTaskErrors": "showErrors",//预启动任务出错后显示错误，并不启动调试
    /*html*/
    "html.format.indentHandlebars": true//在写包含形如{{xxx}}的标签的html文档时，也对标签进行缩进（更美观）

```

```json
    "code-runner.runInTerminal": true, //如果希望使用Code Runner请复制此行
```

除了使用非常方便的CPH外，我们还可以使用Code Runner来编译运行。开启上面的设置后可以直接使用 :key{ctrl alt code="N"} 来编译运行代码，之后即可在终端里面进行输入输出
::





::alert{type="tip" title="配置完成"}
至此恭喜你完成了Visual Studio Code的~~简单~~环境配置👏
::
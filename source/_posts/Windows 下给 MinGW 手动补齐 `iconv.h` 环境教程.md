---
title: Windows 下给 MinGW 手动补齐 `iconv.h` 环境教程
date: 2026-5-20
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
author: everlasting
references:
comments:
indexing:
breadcrumb:
leftbar:
rightbar: toc
h1:
type:
---

# Windows 下给 MinGW 手动补齐iconv.h环境教程

## 1. 问题背景

在 Windows 下使用 MinGW / WinLibs 编译 C++ 代码时，如果包含：

```cpp
#include <bits/extc++.h>
```

可能会遇到类似错误：

```text
fatal error: iconv.h: No such file or directory
```

错误链大概是：

```text
<bits/extc++.h>
    ↓
<ext/codecvt_specializations.h>
    ↓
<iconv.h>
    ↓
找不到 iconv.h
```

这个问题的本质不是 C++ 代码写错了，而是当前 MinGW 环境里缺少 `libiconv` 相关的头文件和库文件。

<!-- more -->

---

## 2. 适用环境

本教程适用于 Windows 下手动配置 MinGW / WinLibs 环境，并且不想安装完整 MSYS2，只想补齐 `iconv.h` 相关文件的情况。

可以通过下面命令查看自己的编译器信息：

```cmd
g++ -v
```

重点观察输出中的关键词，比如：

```text
x86_64-w64-mingw32
ucrt
mingw64
clang64
i686
```

根据自己的环境选择对应的 `libiconv` 包：

| 你的环境                      | 关键词                                       | 应下载的包                        |
| ----------------------------- | -------------------------------------------- | --------------------------------- |
| **普通 64 位 MinGW / MSVCRT** | `x86_64-w64-mingw32`、`mingw64`、没有 `ucrt` | `mingw-w64-x86_64-libiconv`       |
| **UCRT64**                    | `ucrt`、`ucrt64`                             | `mingw-w64-ucrt-x86_64-libiconv`  |
| **CLANG64**                   | `clang64`、`clang-x86_64`                    | `mingw-w64-clang-x86_64-libiconv` |
| **32 位 MinGW**               | `i686`、`mingw32`                            | `mingw-w64-i686-libiconv`         |

例如，如果 `g++ -v` 输出中有类似：

```text
MinGW-W64 x86_64-ucrt-posix-seh
```

说明你使用的是 **UCRT64 版本**，这种情况下应该下载：

```text
mingw-w64-ucrt-x86_64-libiconv
```

如果输出中没有 `ucrt`，而是普通的 64 位 MinGW 环境，一般应该下载：

```text
mingw-w64-x86_64-libiconv
```

---

## 3. 下载 libiconv 包

进入 MSYS2 Packages 页面，下载自己环境对应的 `libiconv` 包。

MSYS2 Packages 搜索页：

```text
https://packages.msys2.org/search?t=binpkg&q=libiconv
```

也可以根据自己的环境直接进入对应页面：

| 你的环境                      | 应下载的包                        | 下载页面                                                                                                                                 |
| ----------------------------- | --------------------------------- | ---------------------------------------------------------------------------------------------------------------------------------------- |
| **普通 64 位 MinGW / MSVCRT** | `mingw-w64-x86_64-libiconv`       | [https://packages.msys2.org/package/mingw-w64-x86_64-libiconv](https://packages.msys2.org/package/mingw-w64-x86_64-libiconv)             |
| **UCRT64**                    | `mingw-w64-ucrt-x86_64-libiconv`  | [https://packages.msys2.org/package/mingw-w64-ucrt-x86_64-libiconv](https://packages.msys2.org/package/mingw-w64-ucrt-x86_64-libiconv)   |
| **CLANG64**                   | `mingw-w64-clang-x86_64-libiconv` | [https://packages.msys2.org/package/mingw-w64-clang-x86_64-libiconv](https://packages.msys2.org/package/mingw-w64-clang-x86_64-libiconv) |
| **32 位 MinGW**               | `mingw-w64-i686-libiconv`         | [https://packages.msys2.org/package/mingw-w64-i686-libiconv](https://packages.msys2.org/package/mingw-w64-i686-libiconv)                 |

进入对应页面后，找到页面中的 `File` 一栏，下载 `.pkg.tar.zst` 文件。

例如 UCRT64 环境的页面中，文件名通常类似:
```text
mingw-w64-ucrt-x86_64-libiconv-1.19-1-any.pkg.tar.zst
```

普通 64 位 MinGW 环境的文件名通常类似：

```text
mingw-w64-x86_64-libiconv-1.19-1-any.pkg.tar.zst
```

注意：版本号可能会随着 MSYS2 更新而变化，所以实际下载时以页面中的 `File` 一栏为准。

---

## 4. 解压 `.pkg.tar.zst` 文件

下载后你会得到一个类似这样的文件：

```text
mingw-w64-ucrt-x86_64-libiconv-1.19-1-any.pkg.tar.zst
```

解压展开后一般会看到一个环境目录，例如：

```text
ucrt64
```

或者：

```text
mingw64
```

再展开后应该有：

```text
环境目录\bin
环境目录\include
环境目录\lib
```

例如 UCRT64 包中通常是：

```text
ucrt64\bin
ucrt64\include
ucrt64\lib
```

普通 MINGW64 包中通常是：

```text
mingw64\bin
mingw64\include
mingw64\lib
```

---

## 5. 复制文件到你的 MinGW 目录

假设你的 MinGW / WinLibs GCC 安装目录是：

```text
D:\gcc-14.2.0\mingw64
```

那么要把解压出来的环境目录中的文件复制到这个目录下。

例如你解压出来的是：

```text
ucrt64
```

就把 `ucrt64` 里面的 `include`、`lib`、`bin` 中的相关文件复制到：

```text
D:\gcc-14.2.0\mingw64\include
D:\gcc-14.2.0\mingw64\lib
D:\gcc-14.2.0\mingw64\bin
```

如果你解压出来的是：

```text
mingw64
```

也是同理，把里面对应的文件复制到你自己的 MinGW 安装目录。

---

## 5.1 复制 include 文件

从解压目录：

```text
环境目录\include
```

复制以下文件：

```text
iconv.h
libcharset.h
localcharset.h
```

到你的 MinGW include 目录：

```text
D:\gcc-14.2.0\mingw64\include
```

也就是最终应该存在：

```text
D:\gcc-14.2.0\mingw64\include\iconv.h
D:\gcc-14.2.0\mingw64\include\libcharset.h
D:\gcc-14.2.0\mingw64\include\localcharset.h
```

---

## 5.2 复制 lib 文件

从解压目录：

```text
环境目录\lib
```

复制以下文件：

```text
libiconv.a
libiconv.dll.a
libcharset.a
libcharset.dll.a
```

到你的 MinGW lib 目录：

```text
D:\gcc-14.2.0\mingw64\lib
```

最终应该存在：

```text
D:\gcc-14.2.0\mingw64\lib\libiconv.a
D:\gcc-14.2.0\mingw64\lib\libiconv.dll.a
D:\gcc-14.2.0\mingw64\lib\libcharset.a
D:\gcc-14.2.0\mingw64\lib\libcharset.dll.a
```

---

## 5.3 复制 bin 文件

从解压目录：

```text
环境目录\bin
```

复制以下文件：

```text
libiconv-2.dll
libcharset-1.dll
```

到你的 MinGW bin 目录：

```text
D:\gcc-14.2.0\mingw64\bin
```

最终应该存在：

```text
D:\gcc-14.2.0\mingw64\bin\libiconv-2.dll
D:\gcc-14.2.0\mingw64\bin\libcharset-1.dll
```

---

复制完后即可正常编译运行了
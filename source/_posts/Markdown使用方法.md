---
title: Markdown使用方法
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

# Markdown 使用方法

Markdown 是一种轻量级标记语言，常用于格式化文本。它易于阅读和编写，并且可以转换为有效的 HTML 文档。以下是 Markdown 的基本语法和使用方法。

<!-- more -->

## 目录

1. [标题](#标题)
2. [段落和换行](#段落和换行)
3. [强调](#强调)
4. [列表](#列表)
5. [链接和图片](#链接和图片)
6. [代码](#代码)
7. [引用](#引用)
8. [分隔线](#分隔线)
9. [表格](#表格)
10. [内嵌 HTML](#内嵌-html)
11. [数学符号及排版](#数学符号及排版)

## 标题

使用 `#` 符号来创建标题。`#` 的数量表示标题的级别。

```markdown
# 一级标题

## 二级标题

### 三级标题

#### 四级标题

##### 五级标题

###### 六级标题
```

## 段落和换行

段落由一个或多个连续的文本行组成，段落之间需要空一行。

```markdown
这是第一个段落。

这是第二个段落。
```

要在 Markdown 中换行，可以在行尾添加两个空格，或者使用 `<br>` 标签。

```markdown
这是第一行  
这是第二行
```

## 强调

使用 `*` 或 `_` 来表示斜体，使用 `**` 或 `__` 来表示粗体。

```markdown
_斜体_ 或 _斜体_

**粗体** 或 **粗体**
```

## 列表

### 无序列表

使用 `-`、`+` 或 `*` 来创建无序列表。

```markdown
- 项目一
- 项目二
  - 子项目
```

### 有序列表

使用数字加点来创建有序列表。

```markdown
1. 第一项
2. 第二项
   1. 子项
```

## 链接和图片

### 链接

使用 `[文本](URL)` 来创建链接。

```markdown
[Google](https://www.google.com)
```

### 图片

使用 `![替代文本](图片URL)` 来插入图片。

```markdown
![Markdown Logo](https://markdownlogo.com/logo.png)
```

## 代码

### 行内代码

使用 `` ` `` 包裹行内代码。

```markdown
这是 `行内代码` 示例。
```

### 代码块

使用 ` ` 包裹多行代码块。

````markdown
​```python
def hello_world():
print("Hello, World!")

```

```
````

## 引用

使用 `>` 来创建引用。

​```markdown

> 这是一个引用。

````

## 分隔线

使用 `-`、`*` 或 `_` 来创建分隔线。

```markdown
---
````

## 表格

使用 `|` 和 `-` 来创建表格。

```markdown
| 列 1   | 列 2   | 列 3   |
| ------ | ------ | ------ |
| 数据 1 | 数据 2 | 数据 3 |
```

## 内嵌 HTML

Markdown 支持内嵌 HTML 标签。

```markdown
<p style="color:red;">这是一个红色的段落。</p>
```

---

## 数学符号及排版

### 希腊字母

- 小写字母

  - $\alpha$ `\alpha`
  - $\beta$ `\beta`
  - $\gamma$ `\gamma`
  - $\delta$ `\delta`
  - $\epsilon$ `\epsilon`
  - $\zeta$ `\zeta`
  - $\eta$ `\eta`
  - $\theta$ `\theta`
  - $\iota$ `\iota`
  - $\kappa$ `\kappa`
  - $\lambda$ `\lambda`
  - $\mu$ `\mu`
  - $\nu$ `\nu`
  - $\xi$ `\xi`
  - $\pi$ `\pi`
  - $\rho$ `\rho`
  - $\sigma$ `\sigma`
  - $\tau$ `\tau`
  - $\upsilon$ `\upsilon`
  - $\phi$ `\phi`
  - $\chi$ `\chi`
  - $\psi$ `\psi`
  - $\omega$ `\omega`

- 大写字母
  - $\Gamma$ `\Gamma`
  - $\Delta$ `\Delta`
  - $\Theta$ `\Theta`
  - $\Lambda$ `\Lambda`
  - $\Xi$ `\Xi`
  - $\Pi$ `\Pi`
  - $\Sigma$ `\Sigma`
  - $\Upsilon$ `\Upsilon`
  - $\Phi$ `\Phi`
  - $\Psi$ `\Psi`
  - $\Omega$ `\Omega`

### 运算符

- 基本运算
  - $+$ `+`
  - $-$ `-`
  - $\times$ `\times`
  - $\div$ `\div`
  - $\cdot$ `\cdot`
  - $\pm$ `\pm`
  - $\mp$ `\mp`
- 关系运算符
  - $=$ `=`
  - $\neq$ `\neq`
  - $<$ `<`
  - $>$ `>`
  - $\leq$ `\leq`
  - $\geq$ `\geq`
  - $\approx$ `\approx`
  - $\equiv$ `\equiv`
  - $\propto$ `\propto`
- 集合运算符
  - $\in$ `\in`
  - $\notin$ `\notin`
  - $\subset$ `\subset`
  - $\subseteq$ `\subseteq`
  - $\supset$ `\supset`
  - $\supseteq$ `\supseteq`
  - $\cup$ `\cup`
  - $\cap$ `\cap`
  - $\emptyset$ `\emptyset`
- 逻辑运算符
  - $\land$ `\land`
  - $\lor$ `\lor`
  - $\lnot$ `\lnot`
  - $\Rightarrow$ `\Rightarrow`
  - $\Leftrightarrow$ `\Leftrightarrow`
- 几何关系
  - $\parallel$ `\parallel`
  - $\perp$`\perp`

### 上下标

- 上标

  - $x^2$ `x^2`
  - $e^{x+y}$ `e^{x+y}`

- 下标
  - $x_1$ `x_1`
  - $x_{i,j}$ `x_{i,j}`

### 分式与根式

- 分式

  - $\frac{a}{b}$ `\frac{a}{b}`
  - $\dfrac{a}{b}$ `\dfrac{a}{b}`

- 根式
  - $\sqrt{x}$ `\sqrt{x}`
  - $\sqrt[n]{x}$ `\sqrt[n]{x}`

### 积分与求和

- 积分

  - $\int$ `\int`
  - $\int_a^b$ `\int_a^b`
  - $\iint$ `\iint`
  - $\iiint$ `\iiint`

- 求和
  - $\sum$ `\sum`
  - $\sum_{i=1}^n$ `\sum_{i=1}^n`

### 极限与导数

- 极限

  - $\lim$ `\lim`
  - $\lim_{x \to \infty}$ `\lim_{x \to \infty}`

- 导数
  - $\frac{dy}{dx}$ `\frac{dy}{dx}`
  - $\frac{\partial f}{\partial x}$ `\frac{\partial f}{\partial x}`

### 矩阵与行列式

- 矩阵

  - $\begin{matrix} a & b \\ c & d \end{matrix}$ `\begin{matrix} a & b \\ c & d \end{matrix}`
  - $\begin{pmatrix} a & b \\ c & d \end{pmatrix}$ `\begin{pmatrix} a & b \\ c & d \end{pmatrix}`
  - $\begin{bmatrix} a & b \\ c & d \end{bmatrix}$ `\begin{bmatrix} a & b \\ c & d \end{bmatrix}`

- 行列式
  - $\begin{vmatrix} a & b \\ c & d \end{vmatrix}$ `\begin{vmatrix} a & b \\ c & d \end{vmatrix}`

### 其他符号

- 箭头
  - $\rightarrow$ `\rightarrow`
  - $\leftarrow$ `\leftarrow`
  - $\Rightarrow$ `\Rightarrow`
  - $\Leftarrow$ `\Leftarrow`
  - $\leftrightarrow$ `\leftrightarrow`
  - $\Leftrightarrow$`\leftrightarrow`
- 点

  - $\cdot$ `\cdot`
  - $\cdots$ `\cdots`
  - $\vdots$ `\vdots`
  - $\ddots$ `\ddots`

- 括号

  - $( )$ `( )`
  - $[ ]$ `[ ]`
  - $\{ \}$ `\{ \}`
  - $\langle \rangle$ `\langle \rangle`

- 其他
  - $\infty$ `\infty`
  - $\nabla$ `\nabla`
  - $\partial$ `\partial`
  - $\hbar$ `\hbar`

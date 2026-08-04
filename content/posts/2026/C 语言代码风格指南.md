---
title: C 语言代码风格指南
description: 介绍 C 语言代码的行长度、注释、头文件、控制结构、函数、缩进、指针、变量与结构体等风格约定。
date: 2026-08-04 16:14:07
updated: 2026-08-04 16:14:07
permalink: /2026/c-style-guide
categories: [技术分享]
tags: [C语言, 代码风格, CS50, 编程规范]
---

代码风格并不存在唯一的正确答案，但确实有许多错误的做法（或者至少是不好的做法）。尽管如此，CS50 仍要求你遵循下面的约定，以便可靠地分析代码风格。公司通常也会制定适用于全公司的代码风格规范。

## 行长度

按照惯例，C 代码每行最多写 80 个字符。这一限制源自早期计算机终端的标准尺寸：屏幕纵向可显示 24 行，横向可显示 80 个字符。现代设备已经不再需要严格限制在 80 个字符以内，但仍应把 80 个字符视为一道“软限制”。`style50` 等工具会强制执行 100 个字符的硬限制；超过后，代码可能无法通过风格检查。C 代码的一行确实不应超过 100 个字符，否则读者通常需要横向滚动。如果必须写到 100 个字符以上，或许应该重新考虑变量命名或整体设计。

```c
// These next lines of code first prompt the user to give two integer values and then multiplies those two integer values together so they can be used later in the program
int first_collected_integer_value_from_user = get_int("Integer please: ");
int second_collected_integer_value_from_user = get_int("Another integer please: ");
int product_of_the_two_integer_values_from_user = first_collected_integer_value_from_user * second_collected_integer_value_from_user;
```

在其他语言中，尤其是 JavaScript，限制每行的最大长度要困难得多。此时应在最有利于可读性和清晰度的位置换行，例如使用 `\n`。

## 注释

注释能提高代码的可读性，不仅方便其他人（例如助教）理解，也方便未来的自己阅读，尤其是在代码写完数小时、数天、数周、数月甚至数年之后。注释太少不好，太多也不好。怎样才合适？一个可行的原则是：每隔几行代码，或者每个值得说明的代码块，添加一次注释。注释应回答下面一个或两个问题：

1. 这段代码做什么？
2. 为什么要用这种方式实现这段代码？

在函数内部，请使用简短的“行内注释”（例如只写一行），否则即使有[语法高亮](https://en.wikipedia.org/wiki/Syntax_highlighting)，也很难区分注释和代码。注释应写在它所说明的代码行上方。注释不必是完整句子，但第一个单词的首字母应大写（除非它是函数名、变量名等），并且要在 `//` 与注释第一个字符之间留一个空格，例如：

```c
// Convert Fahrenheit to Celsius
float c = 5.0 / 9.0 * (f - 32.0);
```

换句话说，不要这样写：

```c
//Convert Fahrenheit to Celsius
float c = 5.0 / 9.0 * (f - 32.0);
```

也不要这样写：

```c
// convert Fahrenheit to Celsius
float c = 5.0 / 9.0 * (f - 32.0);
```

也不要这样写：

```c
float c = 5.0 / 9.0 * (f - 32.0); // Convert Fahrenheit to Celsius
```

每个 `.c` 和 `.h` 文件的顶部都应有一条注释，概括程序（或该文件）的用途，例如：

```c
// Says hello to the world
```

同时，每个函数（或许 `main` 除外）的上方都应有一条注释，概括该函数的作用，例如：

```c
// Returns the square of n
int square(int n)
{
    return n * n;
}
```

## 库头文件

引入的库头文件应按字母顺序排列，例如：

```c
#include <cs50.h>
#include <stdio.h>
#include <string.h>
```

这样可以一眼看出某个头文件是否已经引入，尤其是在头文件列表很长时。

## 条件语句

条件语句应采用下面的格式：

```c
if (x > 0)
{
    printf("x is positive\n");
}
else if (x < 0)
{
    printf("x is negative\n");
}
else
{
    printf("x is zero\n");
}
```

请注意：

- 花括号上下对齐，并且各自独占一行，从而清楚地表明分支中包含哪些代码；
- 每个 `if` 后有一个空格；
- 每次调用 `printf` 都缩进 4 个空格；
- `>` 和 `<` 两侧各有一个空格；并且
- 每个 `(` 后和每个 `)` 前都没有空格。

为了节省空间，有些程序员喜欢把第一个花括号与条件写在同一行。但这种格式更难阅读，因此不建议这样写：

```c
if (x < 0) {
    printf("x is negative\n");
} else if (x < 0) {
    printf("x is negative\n");
}
```

更不要这样写：

```c
if (x < 0)
    {
    printf("x is negative\n");
    }
else
    {
    printf("x is negative\n");
    }
```

## switch 语句

`switch` 语句应采用下面的格式：

```c
switch (n)
{
    case -1:
        printf("n is -1\n");
        break;

    case 1:
        printf("n is 1\n");
        break;

    default:
        printf("n is neither -1 nor 1\n");
        break;
}
```

请注意：

- 每个花括号都独占一行；
- `switch` 后有一个空格；
- 每个 `(` 后和每个 `)` 前都没有空格；
- `switch` 中的各个 `case` 缩进 4 个空格；
- `case` 的主体再额外缩进 4 个空格；并且
- 每个 `case`（包括 `default`）都以 `break` 结束。

## 函数

按照 [C11](https://en.wikipedia.org/wiki/C11_(C_standard_revision)) 标准，应使用下面的形式声明 `main`：

```c
int main(void)
{

}
```

不要使用下面的形式声明 `main`：

```c
int main()
{

}
```

或者写成：

```c
void main()
{

}
```

或者写成：

```c
main()
{

}
```

自己编写的函数也应采用类似格式：每个花括号独占一行，返回类型与函数名写在同一行，就像上面的 `main` 一样。

## 缩进

每一级代码缩进使用 4 个空格，以清楚表示代码块之间的嵌套关系。如果使用键盘上的 Tab 键缩进，请确认文本编辑器会把制表符（`\t`）转换成 4 个空格。不同编辑器显示 `\t` 的方式不同，否则代码在其他人的计算机上可能无法正确打印或显示。（如果使用 [cs50.dev](https://cs50.dev/)，可以直接按 Tab 键缩进，不必反复按空格键，因为它已经预先配置为把 `\t` 转换成 4 个空格。）

下面是一段缩进良好的代码：

```c
// Print command-line arguments one per line
printf("\n");
for (int i = 0; i < argc; i++)
{
    for (int j = 0, n = strlen(argv[i]); j < n; j++)
    {
        printf("%c\n", argv[i][j]);
    }
    printf("\n");
}
```

## 循环

### for

需要临时循环变量时，依次使用 `i`、`j`、`k`；但如果更具体的名称能提高可读性，就应使用更具体的名称：

```c
for (int i = 0; i < LIMIT; i++)
{
    for (int j = 0; j < LIMIT; j++)
    {
        for (int k = 0; k < LIMIT; k++)
        {
            // Do something
        }
    }
}
```

如果一个地方需要三个以上的循环变量，可能应该重新考虑程序设计了！

### while

`while` 循环应采用下面的格式：

```c
while (condition)
{
    // Do something
}
```

请注意：

- 每个花括号都独占一行；
- `while` 后有一个空格；
- `(` 后和 `)` 前都没有空格；并且
- 循环体（此处是一条注释）缩进 4 个空格。

### do … while

`do ... while` 循环应采用下面的格式：

```c
do
{
    // Do something
}
while (condition);
```

请注意：

- 每个花括号都独占一行；
- `while` 后有一个空格；
- `(` 后和 `)` 前都没有空格；并且
- 循环体（此处是一条注释）缩进 4 个空格。

## 指针

声明指针时，把 `*` 写在变量旁边，例如：

```c
int *p;
```

不要把它写在类型旁边，例如：

```c
int* p;
```

## 变量

由于 CS50 使用 [C11](https://en.wikipedia.org/wiki/C11_(C_standard_revision))，不要把所有变量都定义在函数最上方，而应在实际需要的位置定义。还应尽可能缩小变量的作用域。例如，如果 `i` 只用于某个循环，就在循环内部声明 `i`：

```c
for (int i = 0; i < LIMIT; i++)
{
    printf("%i\n", i);
}
```

循环变量使用 `i`、`j`、`k` 没有问题，但大多数变量都应使用更具体的名称。例如，对一组数值求和时，可以把变量命名为 `sum`。如果变量名需要两个单词（例如 `is_ready`），应使用下划线连接；这种约定在 C 中很常见，在其他语言中则不一定如此。

同时声明多个相同类型的变量时，可以把它们写在一起，例如：

```c
int quarters, dimes, nickels, pennies;
```

但不要只初始化其中一部分，例如：

```c
int quarters, dimes = 0, nickels = 0 , pennies;
```

还应注意把指针与非指针变量分开声明，例如：

```c
int *p;
int n;
```

不要在同一行中同时声明指针和非指针变量，例如：

```c
int *p, n;
```

## 结构体

把 `struct` 声明为一种类型时，应采用下面的格式：每个花括号独占一行，结构体成员在其中缩进，类型名称也单独写在一行：

```c
typedef struct
{
    string name;
    string dorm;
} student;
```

如果 `struct` 的某个成员是指向同类 `struct` 的指针，应为该 `struct` 声明一个与类型相同且不含下划线的名称：

```c
typedef struct node
{
    int n;
    struct node *next;
} node;
```

::meta-copyright{title="来源与许可"}
本文译自 [CS50 的 C 语言代码风格指南](https://cs50.readthedocs.io/style/c/)。原内容由 CS50 提供，并采用 [CC BY-NC-SA 4.0](https://creativecommons.org/licenses/by-nc-sa/4.0/deed.zh-hans) 许可发布。本页面是经过翻译修改的非官方中文版本，并以相同许可发布。
::

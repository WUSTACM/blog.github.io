---
title: 2026 | C++ 面向对象期末复习资料
description: C++ 面向对象程序设计期末复习详细笔记，涉及概念、语法、例子和考点，整理类、构造析构、继承、多态、模板、文件流与异常处理等内容。
date: 2026-06-27 21:19:34
updated: 2026-06-27 21:48:27
permalink: /2026/cpp-oop-final-review
image: /images/cpp-oop-final-review-cover.jpg
categories: [期末复习]
tags: [学习, "C++", 面向对象, 复习]
---

想着把 C++ 的内容重新整理一遍。文章里没有介绍入门语法，主要讲解了构造析构、复制控制、继承访问、多态、模板等内容。

## 0. 总知识点大纲

```text
C++ 基础差异
-> 函数增强
-> 类和对象
-> 数据共享与保护
-> 数组、指针、字符串、动态内存
-> 继承与派生
-> 多态与运算符重载
-> 模板和群体数据
-> STL、流、异常
```

## 1. C++ 基础差异

### 1.1 最小 C++ 程序

C++ 程序通常从 `main` 函数开始执行。

语法：

```cpp
#include <iostream>
using namespace std;

int main()
{
    cout << "Hello C++" << endl;
    return 0;
}
```

逐句看：

```cpp
#include <iostream>
```

表示使用标准输入输出流库。`cout`、`cin`、`endl` 都在这个库里。

```cpp
using namespace std;
```

表示使用标准命名空间。没有这一句时，要写：

```cpp
std::cout << "Hello" << std::endl;
```

```cpp
return 0;
```

表示程序正常结束，把状态码 0 返回给操作系统。

考试常见点：

- 标准 C++ 主函数写 `int main()`，不要写 `void main()`。
- C++ 标准库头文件多数不带 `.h`，例如 `<iostream>`、`<string>`、`<vector>`。
- 老式 C 头文件在 C++ 中常写成 `<cstdio>`、`<cmath>`，而不是 `<stdio.h>`、`<math.h>`。

### 1.2 `cout` 输出

`cout` 是 C++ 的标准输出流对象。

基本语法：

```cpp
cout << 输出内容;
```

例子：

```cpp
int x = 10;
double pi = 3.14;

cout << x << endl;
cout << "pi = " << pi << endl;
```

输出：

```text
10
pi = 3.14
```

`<<` 在这里叫插入运算符，含义是把右侧内容插入到输出流中。

可以连续输出：

```cpp
cout << "a = " << a << ", b = " << b << endl;
```

`endl` 的作用：

```cpp
cout << "hello" << endl;
```

它做两件事：

- 换行。
- 刷新输出缓冲区。

平时刷题常用 `'\n'`，因为更快：

```cpp
cout << "hello\n";
```

考试中看到 `endl`，按换行处理即可。

### 1.3 `cin` 输入

`cin` 是 C++ 的标准输入流对象。

基本语法：

```cpp
cin >> 变量;
```

例子：

```cpp
int a, b;
cin >> a >> b;
cout << a + b << endl;
```

如果输入：

```text
3 5
```

输出：

```text
8
```

`>>` 在这里叫提取运算符，含义是从输入流中提取数据放入变量。

注意：

- `cin >> s` 读字符串时，遇到空格、Tab、回车就停止。
- 要读整行字符串，用 `getline(cin, s)`。

### 1.4 命名空间 `namespace`

命名空间用来解决命名冲突。

语法：

```cpp
namespace A
{
    int x = 10;
}

namespace B
{
    int x = 20;
}
```

访问：

```cpp
cout << A::x << endl; // 10
cout << B::x << endl; // 20
```

`::` 是作用域解析运算符。

两种 `using`：

```cpp
using A::x;
```

只把 `A` 里的 `x` 引入当前作用域。

```cpp
using namespace A;
```

把 `A` 里的所有名字都引入当前作用域。

考试易错：

- `using namespace std;` 不是必须，只是方便。
- 引入太多命名空间可能导致同名冲突。

### 1.5 输出格式控制

C++ 可以控制输出宽度、进制、精度等。

需要头文件：

```cpp
#include <iomanip>
```

#### 1.5.1 `setw`

`setw(n)` 设置下一个输出项的宽度。

```cpp
cout << "(" << setw(5) << 100 << ")" << endl;
```

输出类似：

```text
(  100)
```

注意：`setw` 只影响紧跟着的一个输出项。

```cpp
cout << setw(5) << 1 << 2 << endl;
```

只有 `1` 会占 5 宽度，`2` 不受影响。

#### 1.5.2 `left` 和 `right`

```cpp
cout << left << setw(5) << 100 << endl;
cout << right << setw(5) << 100 << endl;
```

`left` 左对齐，`right` 右对齐。它们会持续生效，直到改回来。

#### 1.5.3 `setprecision`

```cpp
cout << setprecision(3) << 3.1415 << endl;
```

默认情况下，`setprecision(3)` 表示保留 3 位有效数字，不是小数点后 3 位。

输出：

```text
3.14
```

如果要固定小数位，通常配合 `fixed`：

```cpp
cout << fixed << setprecision(3) << 3.1415 << endl;
```

输出：

```text
3.142
```

#### 1.5.4 `dec`、`hex`、`oct`

```cpp
cout << dec << 100 << endl; // 十进制
cout << hex << 100 << endl; // 十六进制
cout << oct << 100 << endl; // 八进制
```

注意：这些操纵符会持续生效。

```cpp
cout << hex << 100 << " " << 200 << endl;
cout << dec << 100 << endl;
```

记忆：

```text
setw 只管下一个
setprecision 会持续
hex/oct/dec 会持续
left/right 会持续
```

### 1.6 `const` 常量

`const` 用来定义不能被修改的变量。

语法：

```cpp
const 类型 常量名 = 初值;
```

例子：

```cpp
const double PI = 3.1415926;
```

错误写法：

```cpp
const int N; // 错，const 必须初始化
N = 100;     // 错，const 不能再赋值
```

为什么要用 `const`？

- 语义清楚：告诉读代码的人这个值不该改变。
- 比宏常量更安全：有类型检查。

对比：

```cpp
#define PI 3.14
const double PI = 3.14;
```

一般更推荐 `const`。

### 1.7 强制类型转换

C 语言写法：

```cpp
int x = (int)y;
```

C++ 写法：

```cpp
int x = int(y);
```

标准 C++ 类型转换：

```cpp
static_cast<int>(y);
```

四种类型转换：

| 转换 | 用途 |
|---|---|
| `static_cast` | 普通合理转换，如 `double` 转 `int` |
| `dynamic_cast` | 类层次中的安全转换，和多态有关 |
| `const_cast` | 去掉或添加 `const` 属性 |
| `reinterpret_cast` | 非常底层、危险的重新解释 |

考试一般重点：

```cpp
static_cast<int>(3.14)
```

结果是：

```text
3
```

记忆：

```text
static_cast：正常转
dynamic_cast：继承转
const_cast：改 const
reinterpret_cast：危险转
```

### 1.8 `auto`

C++11 后，`auto` 用于根据初值推断变量类型。

语法：

```cpp
auto 变量名 = 初值;
```

例子：

```cpp
auto x = 1;      // int
auto y = 3.14;   // double
auto c = 'A';    // char
```

错误：

```cpp
auto x; // 错，无法推断类型
x = 10;
```

同一条声明中类型必须一致：

```cpp
auto a = 1, b = 2;   // 对，都是 int
auto x = 1, y = 2.0; // 错，一个 int 一个 double
```

算法竞赛里常见：

```cpp
for (auto x : v)
{
    cout << x << endl;
}
```

### 1.9 `decltype`

`decltype` 用来取得表达式的类型。

语法：

```cpp
decltype(表达式) 变量名;
```

例子：

```cpp
int i = 10;
decltype(i) j = 20; // j 是 int
```

`auto` 和 `decltype` 的区别：

```text
auto：根据初始化值推断，并定义变量
decltype：只分析表达式类型，不执行表达式
```

例子：

```cpp
int i = 0;
decltype(i) x = 1; // x 是 int
```

记忆：

```text
auto 看右边初值
decltype 看括号里的表达式类型
```

## 2. 函数

### 2.1 函数参数：值传递

值传递就是把实参的值复制一份给形参。

语法：

```cpp
void f(int x)
{
    x = 10;
}
```

例子：

```cpp
void change(int x)
{
    x = 100;
}

int main()
{
    int a = 5;
    change(a);
    cout << a << endl; // 5
}
```

为什么输出还是 5？

因为 `x` 是 `a` 的副本。函数里改的是副本，不是原变量。

交换函数错误示例：

```cpp
void swapValue(int a, int b)
{
    int t = a;
    a = b;
    b = t;
}
```

调用：

```cpp
int x = 5, y = 10;
swapValue(x, y);
cout << x << " " << y << endl; // 仍然是 5 10
```

记忆：

```text
值传递：复制一份，函数内改不到外面
```

### 2.2 函数参数：地址传递

地址传递就是把变量地址传给函数，函数通过指针访问原变量。

语法：

```cpp
void f(int *p)
{
    *p = 10;
}
```

例子：

```cpp
void change(int *p)
{
    *p = 100;
}

int main()
{
    int a = 5;
    change(&a);
    cout << a << endl; // 100
}
```

交换函数：

```cpp
void swapPointer(int *a, int *b)
{
    int t = *a;
    *a = *b;
    *b = t;
}
```

调用：

```cpp
swapPointer(&x, &y);
```

考试易错：

- 函数形参是 `int *a`，调用时要传地址 `&x`。
- 在函数内部要用 `*a` 访问原变量。

记忆：

```text
地址传递：传地址，用 * 改原变量
```

### 2.3 函数参数：引用传递

引用传递是 C++ 新增的重要内容。引用可以看成变量的别名。

语法：

```cpp
void f(int &x)
{
    x = 10;
}
```

例子：

```cpp
void change(int &x)
{
    x = 100;
}

int main()
{
    int a = 5;
    change(a);
    cout << a << endl; // 100
}
```

交换函数：

```cpp
void swapRef(int &a, int &b)
{
    int t = a;
    a = b;
    b = t;
}
```

调用：

```cpp
swapRef(x, y);
```

调用看起来和普通函数一样，所以判断是否引用传递不能看调用处，要看函数声明：

```cpp
void swapRef(int &a, int &b);
```

引用的基本规则：

```cpp
int a = 10;
int &r = a;
```

- 引用定义时必须初始化。
- 引用一旦绑定，不能再改绑。
- 引用类型必须匹配。
- 引用不是新对象，是原变量的别名。

错误：

```cpp
int &r;       // 错，未初始化
double &d = a; // 错，类型不匹配
```

记忆：

```text
引用传递：调用像值传递，效果像指针传递
```

### 2.4 内联函数

C++ 里的内联函数用关键字：

```cpp
inline
```

语法：

```cpp
inline 返回值类型 函数名(参数列表)
{
    函数体;
}
```

例子：

```cpp
inline int add(int a, int b)
{
    return a + b;
}
```

调用：

```cpp
int x = add(3, 5);
cout << x << endl; // 8
```

普通函数调用时，大致有：

```text
调用函数 -> 跳到函数代码处执行 -> 返回原位置
```

这个过程有函数调用开销。

内联函数的想法是：编译器在编译时尽量把函数体展开到调用处。

例子：

```cpp
inline int square(int x)
{
    return x * x;
}

int a = square(5);
```

编译器可能把它处理成类似：

```cpp
int a = 5 * 5;
```

适合情况：

- 函数短小。
- 函数简单。
- 函数调用频繁。

例子：

```cpp
inline int maxNum(int a, int b)
{
    return a > b ? a : b;
}
```

类里面直接定义的函数默认具有内联性质：

```cpp
class Student
{
private:
    int age;

public:
    int getAge()
    {
        return age;
    }
};
```

也可以类内声明，类外定义时加 `inline`：

```cpp
class Student
{
private:
    int age;

public:
    int getAge();
};

inline int Student::getAge()
{
    return age;
}
```

注意：

- 写了 `inline` 不保证一定内联，最终由编译器决定。
- 函数太复杂时不适合内联。
- 内联可能减少调用开销，也可能让代码体积变大。

不要把内联理解成“必然更快”。

记忆：

```text
inline：建议编译器在调用处展开函数体，适合短小频繁调用的函数
```

### 2.5 默认参数

默认参数就是在函数声明时给形参一个默认值。

语法：

```cpp
返回值类型 函数名(类型 参数1, 类型 参数2 = 默认值);
```

例子：

```cpp
int add(int x, int y = 5, int z = 6)
{
    return x + y + z;
}
```

调用：

```cpp
cout << add(10, 20, 30) << endl; // 60
cout << add(10, 20) << endl;     // 36
cout << add(10) << endl;         // 21
```

默认参数的规则：

默认值必须从右向左连续给出。

正确：

```cpp
int f(int x, int y = 1, int z = 2);
```

错误：

```cpp
int f(int x = 0, int y, int z = 2);
```

因为 `y` 没默认值，却在有默认值参数的右边。

默认参数通常只在函数声明中写一次：

```cpp
int add(int x, int y = 5);

int add(int x, int y)
{
    return x + y;
}
```

考试常考判断：

```cpp
int add1(int x, int y = 5, int z = 6); // 对
int add2(int x = 1, int y = 5, int z); // 错
int add3(int x = 1, int y, int z = 6); // 错
```

记忆：

```text
默认参数从右往左给，中间不能断
```

### 2.6 函数重载

函数重载指多个函数同名，但参数列表不同。

语法：

```cpp
int add(int a, int b);
double add(double a, double b);
int add(int a, int b, int c);
```

例子：

```cpp
int add(int a, int b)
{
    return a + b;
}

double add(double a, double b)
{
    return a + b;
}
```

调用：

```cpp
cout << add(1, 2) << endl;       // 调 int 版本
cout << add(1.5, 2.5) << endl;   // 调 double 版本
```

什么能构成重载？

- 参数个数不同。
- 参数类型不同。
- 参数顺序不同。

什么不能构成重载？

仅返回值不同不行：

```cpp
int f(int x);
double f(int x); // 错，不能只靠返回值区分
```

函数重载属于静态多态，编译时就决定调用哪个函数。

易错：

默认参数和重载一起用可能产生二义性。

```cpp
void f(int x);
void f(int x, int y = 0);

f(1); // 二义性
```

记忆：

```text
重载看参数，不看返回值
```

## 3. 类和对象

### 3.1 类是什么

类是用户自定义类型，是对数据和操作的封装。

例子：

```cpp
class Clock
{
public:
    void setTime(int h, int m, int s);
    void showTime();

private:
    int hour;
    int minute;
    int second;
};
```

这里：

- `hour/minute/second` 是数据成员，表示对象状态。
- `setTime/showTime` 是成员函数，表示对象行为。
- `private` 表示外部不能直接访问。
- `public` 表示对外接口。

类和对象的关系：

```cpp
Clock c1;
Clock c2;
```

`Clock` 是类型，`c1` 和 `c2` 是对象。

类定义本身不分配对象数据空间，创建对象时才分配。

重要点：

```text
对象占的内存主要存数据成员
成员函数代码所有对象共享一份
```

### 3.2 封装

封装就是把数据和操作数据的函数放在一起，并隐藏内部实现。

典型写法：

```cpp
class Student
{
private:
    int score;

public:
    void setScore(int s)
    {
        score = s;
    }

    int getScore()
    {
        return score;
    }
};
```

外部不能直接写：

```cpp
Student stu;
stu.score = 100; // 错，score 是 private
```

应该写：

```cpp
stu.setScore(100);
cout << stu.getScore() << endl;
```

为什么要封装？

- 防止外部随便改数据。
- 类内部实现可以改变，但接口不变。
- 代码更安全，更容易维护。

记忆：

```text
private 藏数据
public 给接口
```

### 3.3 访问控制：`public`、`private`、`protected`

类成员有三种访问权限。

```cpp
class A
{
public:
    int x;

protected:
    int y;

private:
    int z;
};
```

| 权限 | 类内 | 类外对象 | 派生类内部 |
|---|---|---|---|
| `public` | 可访问 | 可访问 | 可访问 |
| `protected` | 可访问 | 不可访问 | 可访问 |
| `private` | 可访问 | 不可访问 | 不可直接访问 |

对象访问：

```cpp
A a;
a.x = 1; // 对
a.y = 2; // 错
a.z = 3; // 错
```

`protected` 的意义主要在继承中体现：外部对象不能访问，但派生类内部可以访问。

考试常见：

```cpp
class A
{
protected:
    int x;
};

int main()
{
    A a;
    a.x = 5; // 错，protected 对对象不可见
}
```

### 3.4 成员函数类外定义

类内声明：

```cpp
class Clock
{
public:
    void setHour(int h);

private:
    int hour;
};
```

类外定义：

```cpp
void Clock::setHour(int h)
{
    hour = h;
}
```

这里的 `Clock::` 表示 `setHour` 属于 `Clock` 类。

`::` 叫作用域解析运算符。

为什么类外定义仍然能访问私有成员？

因为：

```cpp
void Clock::setHour(int h)
```

已经说明这个函数是 `Clock` 的成员函数，所以它有访问 `Clock` 私有成员的权限。

### 3.5 `this` 指针

`this` 是每个非静态成员函数中隐含存在的指针，指向当前调用该函数的对象。

例子：

```cpp
class Calendar
{
private:
    int year;
    int month;
    int day;

public:
    void SetDay(int year, int month, int day)
    {
        this->year = year;
        this->month = month;
        this->day = day;
    }
};
```

如果没有 `this->`：

```cpp
year = year;
```

左边和右边都可能被理解为形参 `year`，达不到给数据成员赋值的目的。

`this` 的常见用途：

1. 区分同名形参和数据成员。
2. 返回当前对象：

```cpp
return *this;
```

比如赋值运算符常写：

```cpp
A& operator=(const A &rhs)
{
    ...
    return *this;
}
```

记忆：

```text
this 指向当前对象
this->x 是当前对象的数据成员 x
*this 是当前对象本身
```

### 3.6 构造函数

构造函数用于对象创建时初始化对象。

语法特点：

```cpp
class 类名
{
public:
    类名(参数列表);
};
```

例子：

```cpp
class Clock
{
public:
    Clock(int h, int m, int s);

private:
    int hour;
    int minute;
    int second;
};

Clock::Clock(int h, int m, int s)
{
    hour = h;
    minute = m;
    second = s;
}
```

创建对象：

```cpp
Clock c(8, 30, 0);
```

构造函数规则：

- 名字和类名相同。
- 没有返回值，不能写 `void`。
- 创建对象时自动调用。
- 通常放在 `public`。
- 不能显式调用构造函数。

错误：

```cpp
Clock c;
c.Clock(1, 2, 3); // 错
```

默认构造函数：

```cpp
Clock()
{
}
```

如果类中没有声明任何构造函数，编译器会自动生成默认构造函数。

但是如果你写了任意一个构造函数：

```cpp
class A
{
public:
    A(int x);
};
```

那么：

```cpp
A a; // 错，没有默认构造函数
```

除非你自己补：

```cpp
A() {}
```

特别坑：

```cpp
Clock c3();
```

这不是创建对象，而是声明一个函数 `c3`，返回类型是 `Clock`。

记忆：

```text
构造函数：对象出生时自动调用
有参构造写了之后，默认构造不会自动生成
Clock c(); 是函数声明，不是对象
```

### 3.7 构造函数初始化列表

初始化列表写在构造函数参数表后、函数体前。

语法：

```cpp
类名::类名(参数列表) : 成员1(初值1), 成员2(初值2)
{
}
```

例子：

```cpp
Clock::Clock(int h, int m, int s)
    : hour(h), minute(m), second(s)
{
}
```

和函数体赋值的区别：

```cpp
Clock::Clock(int h, int m, int s)
{
    hour = h;
    minute = m;
    second = s;
}
```

这叫先默认初始化，再赋值。

初始化列表是直接初始化，效率更高。

必须使用初始化列表的情况：

1. `const` 数据成员。
2. 引用数据成员。
3. 没有默认构造函数的成员对象。

例子：

```cpp
class A
{
private:
    const int SIZE;
    int &ref;

public:
    A(int s, int &r) : SIZE(s), ref(r)
    {
    }
};
```

成员初始化顺序：

```cpp
class A
{
private:
    int x;
    int y;

public:
    A() : y(2), x(1) {}
};
```

虽然初始化列表写的是 `y` 再 `x`，实际初始化顺序仍按成员声明顺序：先 `x` 后 `y`。

记忆：

```text
初始化顺序看类内声明顺序，不看初始化列表书写顺序
const、引用、无默认构造成员必须用初始化列表
```

### 3.8 委托构造函数

委托构造函数是一个构造函数调用同类的另一个构造函数完成初始化。

例子：

```cpp
class X
{
private:
    string name;
    int code;

public:
    X(string n, int c) : name(n), code(c)
    {
    }

    X() : X("", 42)
    {
    }

    X(string s) : X(s, 0)
    {
    }
};
```

执行顺序：

```text
先执行被委托构造函数的初始化列表和函数体
再回到委托者自己的函数体
```

作用：

- 减少多个构造函数之间重复初始化代码。
- 让初始化逻辑集中在一个主构造函数里。

### 3.9 复制构造函数

复制构造函数用于用一个已有对象初始化一个新对象。

语法：

```cpp
类名(const 类名 &对象名);
```

例子：

```cpp
class Clock
{
private:
    int hour, minute, second;

public:
    Clock(const Clock &c)
    {
        hour = c.hour;
        minute = c.minute;
        second = c.second;
    }
};
```

触发复制构造的三种情况：

#### 情况一：用对象初始化新对象

```cpp
Clock c1(8, 10, 20);
Clock c2(c1);
Clock c3 = c1;
```

`c2`、`c3` 都调用复制构造。

#### 情况二：对象作为函数值参数

```cpp
void fun(Clock c)
{
}

fun(c1);
```

因为 `c` 是一个新形参对象，要用 `c1` 初始化它。

如果改成引用：

```cpp
void fun(const Clock &c)
{
}
```

不会调用复制构造。

#### 情况三：函数返回对象

```cpp
Clock makeClock()
{
    Clock c(1, 2, 3);
    return c;
}
```

理论上可能调用复制构造。但现代编译器常做返回值优化，实际输出未必能看到复制构造调用。

为什么参数通常写 `const Clock &c`？

- 引用避免再次复制。
- `const` 保证不会修改源对象。

记忆：

```text
复制构造：新对象诞生时，用旧对象初始化
```

### 3.10 析构函数

析构函数用于对象销毁前清理资源。

语法：

```cpp
~类名()
{
}
```

例子：

```cpp
class A
{
public:
    ~A()
    {
        cout << "析构" << endl;
    }
};
```

规则：

- 名字是 `~类名`。
- 没有返回值。
- 没有参数。
- 一个类只能有一个析构函数。
- 对象生命周期结束时自动调用。

何时调用析构：

```cpp
void f()
{
    A a;
} // 离开作用域，a 析构
```

动态对象：

```cpp
A *p = new A;
delete p; // delete 时调用析构
```

如果类中有 `new` 分配资源，通常要在析构函数中 `delete`。

记忆：

```text
构造：出生
析构：死亡
new 出来的对象 delete 时才析构
```

### 3.11 类组合

类组合就是一个类的数据成员是另一个类的对象。

例子：

```cpp
class Point
{
private:
    int x, y;
};

class Line
{
private:
    Point p1;
    Point p2;
    double len;
};
```

`Line` 包含两个 `Point` 对象。

构造顺序：

```text
先构造成员对象
再执行本类构造函数体
```

例子：

```cpp
Line::Line(Point a, Point b) : p1(a), p2(b)
{
    // 这里执行时，p1 和 p2 已经构造好了
}
```

成员对象构造顺序由成员声明顺序决定：

```cpp
class Line
{
private:
    Point p1;
    Point p2;
};
```

先 `p1`，再 `p2`。

析构顺序反过来：

```text
先执行 Line 的析构函数体
再析构 p2
再析构 p1
```

复制构造中，如果自己写了复制构造，要在初始化列表中初始化成员对象：

```cpp
Line::Line(const Line &L) : p1(L.p1), p2(L.p2)
{
    len = L.len;
}
```

记忆：

```text
组合构造：先人后己
组合析构：先己后人
```

### 3.12 前向引用声明

如果两个类互相引用，可以先声明类名。

语法：

```cpp
class B;
```

例子：

```cpp
class B;

class A
{
public:
    void f(B *b);
};
```

前向声明只告诉编译器：“有一个类叫 B”。

在完整定义前可以：

```cpp
B *p;
B &r;
```

不能：

```cpp
B obj; // 错，不知道 B 有多大
```

也不能在类内内联函数里访问 B 的成员：

```cpp
class B;

class A
{
public:
    void f(B *b)
    {
        b->g(); // 错，还不知道 B 里有没有 g
    }
};
```

要在 B 完整定义后再写函数体。

### 3.13 `struct` 和 `class`

C++ 中 `struct` 和 `class` 功能几乎一样。

区别主要是默认访问权限：

```cpp
struct S
{
    int x; // 默认 public
};

class C
{
    int x; // 默认 private
};
```

因此：

```cpp
S s;
s.x = 1; // 对

C c;
c.x = 1; // 错
```

记忆：

```text
struct 默认 public
class 默认 private
```

### 3.14 `union`

`union` 的多个成员共享同一片内存。

例子：

```cpp
union Mark
{
    char grade;
    bool pass;
    int percent;
};
```

如果 `int` 占 4 字节，则整个 `union` 通常占 4 字节，因为要容纳最大成员。

特点：

- 成员共用内存。
- 同一时刻一般只有一个成员有效。
- 给一个成员赋值会覆盖另一个成员的数据。

例子：

```cpp
union U
{
    int i;
    float f;
};

U u;
u.i = 10;
u.f = 2.2; // 此时 i 的值被覆盖
```

## 4. 数据的共享与保护

### 4.1 作用域

作用域指一个标识符有效的范围。

常见作用域：

- 函数原型作用域。
- 局部作用域。
- 类作用域。
- 文件作用域。
- 命名空间作用域。
- 枚举类限定作用域。

例子：

```cpp
int x = 1; // 文件作用域

void f()
{
    int x = 2; // 局部作用域
    cout << x << endl; // 2
}
```

内层同名变量会隐藏外层变量。

规则：

```text
先声明，后使用
同一作用域不能重复声明同名变量
内层同名隐藏外层同名
```

### 4.2 可见性

可见性是从某个位置能不能引用某个标识符。

例子：

```cpp
int i = 5;

int main()
{
    {
        int i = 7;
        cout << i << endl; // 7
    }
    cout << i << endl; // 5
}
```

虽然全局 `i` 的作用域包含整个文件，但在内层块中被局部 `i` 隐藏，所以暂时不可见。

作用域和可见性区别：

```text
作用域：理论上有效的区域
可见性：当前位置实际能不能看见它
```

### 4.3 对象生存期

生存期指对象从产生到销毁的时间。

静态生存期：

```cpp
int g = 1;

void f()
{
    static int cnt = 0;
    cnt++;
}
```

`g` 和 `cnt` 都有静态生存期，和程序运行期相同。

动态生存期：

```cpp
void f()
{
    int x = 0;
} // x 在这里结束
```

局部非 `static` 对象从声明处开始，到块结束结束。

记忆：

```text
static 活到程序结束
普通局部变量活到块结束
```

### 4.4 静态数据成员

静态数据成员属于类，不属于某个对象。

语法：

```cpp
class A
{
private:
    static int count;
};

int A::count = 0;
```

为什么需要静态数据成员？

假设要统计某个类创建了多少对象。如果把 `count` 放在每个对象里：

```cpp
class A
{
private:
    int count;
};
```

每个对象都有一个 `count`，不能表示全类总数。

所以用：

```cpp
static int count;
```

所有对象共享一份。

访问方式：

```cpp
A::count;
obj.count;
p->count;
```

如果是 `private`，外部不能访问，但类外初始化允许：

```cpp
int A::count = 0;
```

这是定义，不是普通访问。

考试重点：

- 静态数据成员类内声明。
- 一般类外定义并初始化。
- 所有对象共享一份。
- 静态数据成员有静态生存期。

### 4.5 静态成员函数

静态成员函数属于类，不依赖具体对象。

语法：

```cpp
class A
{
public:
    static void show();
};

void A::show()
{
}
```

调用：

```cpp
A::show();
```

也可以：

```cpp
A a;
a.show();
```

但本质上它不依赖对象。

重要规则：

静态成员函数没有 `this` 指针。

所以它不能直接访问非静态成员：

```cpp
class A
{
private:
    int x;
    static int y;

public:
    static void f()
    {
        y = 1; // 对
        x = 2; // 错，没有 this，不知道是哪个对象的 x
    }
};
```

如果想访问非静态成员，必须通过对象：

```cpp
static void f(A a)
{
    cout << a.x << endl;
}
```

静态成员函数也不能写成 `const`：

```cpp
static void f() const; // 错
```

因为 `const` 成员函数修饰的是 `this` 指向的对象，而静态函数没有 `this`。

### 4.6 友元函数

友元函数是定义在类外的普通函数，但它被某个类授权访问该类私有成员。

声明：

```cpp
class Point
{
private:
    double x, y;

public:
    friend double dist(Point &a, Point &b);
};
```

定义：

```cpp
double dist(Point &a, Point &b)
{
    double dx = a.x - b.x;
    double dy = a.y - b.y;
    return sqrt(dx * dx + dy * dy);
}
```

注意：

- `friend` 只在类内声明时写。
- 类外定义不要写 `friend`。
- 友元函数不是成员函数。
- 不能用 `p.dist()` 调用。
- 友元函数可以直接访问私有成员。

为什么要用友元？

有时某个函数逻辑上需要访问两个对象的私有数据，但它又不适合作为其中一个对象的成员函数。

比如求两点距离：

```cpp
dist(p1, p2);
```

比写成：

```cpp
p1.dist(p2);
```

有时更自然。

### 4.7 友元类

一个类可以把另一个类声明为友元类。

语法：

```cpp
class A
{
    friend class B;

private:
    int x;
};
```

这样 `B` 的所有成员函数都可以访问 `A` 的私有成员。

例子：

```cpp
class A
{
    friend class B;
private:
    int x;
};

class B
{
public:
    void set(A &a, int v)
    {
        a.x = v;
    }
};
```

友元关系的三个规则：

```text
不传递
不对称
不继承
```

解释：

- A 把 B 当友元，B 把 C 当友元，不代表 C 是 A 的友元。
- A 把 B 当友元，不代表 B 也把 A 当友元。
- 基类的友元关系不会自动传给派生类。

### 4.8 常对象

常对象是不能被修改的对象。

语法：

```cpp
const 类名 对象名(参数);
```

例子：

```cpp
const Point p(1, 2);
```

常对象的数据成员不能被修改。

常对象只能调用常成员函数。

```cpp
class Point
{
public:
    int getX() const;
    void setX(int x);
};

const Point p;
p.getX(); // 对
p.setX(1); // 错
```

为什么？

`setX` 可能修改对象，而 `p` 是常对象。

### 4.9 常成员函数

常成员函数承诺不修改目的对象。

语法：

```cpp
返回类型 函数名(参数列表) const;
```

声明和定义都要写 `const`：

```cpp
class Point
{
private:
    int x;

public:
    int getX() const;
};

int Point::getX() const
{
    return x;
}
```

常成员函数内部不能修改普通数据成员：

```cpp
int Point::getX() const
{
    x++; // 错
    return x;
}
```

也不能调用非 `const` 成员函数：

```cpp
void setX(int v);

int getX() const
{
    setX(1); // 错
}
```

`const` 可以参与重载：

```cpp
void print();
void print() const;
```

构造函数和析构函数不能是 `const`。

记忆：

```text
常对象只能调常函数
常函数不能改对象
声明和定义都写 const
```

### 4.10 常数据成员

常数据成员是类中的 `const` 数据成员。

例子：

```cpp
class A
{
private:
    const int SIZE;

public:
    A(int size) : SIZE(size)
    {
    }
};
```

常数据成员必须在初始化列表中初始化。

错误：

```cpp
A::A(int size)
{
    SIZE = size; // 错，函数体里是赋值，不是初始化
}
```

原因：

`const` 成员一旦初始化之后不能再赋值，所以必须在对象构造阶段直接初始化。

### 4.11 常引用

常引用语法：

```cpp
const 类型 &引用名 = 对象;
```

例子：

```cpp
void printPoint(const Point &p)
{
    cout << p.getX() << endl;
}
```

作用：

- 避免对象值传递带来的复制开销。
- 防止函数内部修改实参对象。

常引用可以绑定普通对象：

```cpp
Point p;
const Point &r = p;
```

也可以绑定常对象：

```cpp
const Point cp;
const Point &r = cp;
```

普通引用不能绑定常对象：

```cpp
Point &r = cp; // 错
```

通过常引用，只能调用常成员函数。

记忆：

```text
类对象参数优先考虑 const 引用
```

### 4.12 多文件结构

大程序通常拆成多个文件。

常见结构：

```text
ClassName.h      类声明
ClassName.cpp    类成员函数定义
main.cpp         使用类
```

例子：

`Point.h`：

```cpp
#ifndef POINT_H
#define POINT_H

class Point
{
private:
    int x, y;
public:
    Point(int x, int y);
    int getX() const;
};

#endif
```

`Point.cpp`：

```cpp
#include "Point.h"

Point::Point(int x, int y) : x(x), y(y)
{
}

int Point::getX() const
{
    return x;
}
```

`main.cpp`：

```cpp
#include <iostream>
#include "Point.h"
using namespace std;

int main()
{
    Point p(1, 2);
    cout << p.getX() << endl;
}
```

### 4.13 预处理和头文件保护

`#include`：

```cpp
#include <iostream>
#include "Point.h"
```

尖括号一般用于系统头文件，双引号一般用于自定义头文件。

宏定义：

```cpp
#define PI 3.14
```

但 C++ 中很多情况更推荐：

```cpp
const double PI = 3.14;
```

条件编译：

```cpp
#ifdef DEBUG
cout << "debug info" << endl;
#endif
```

头文件保护：

```cpp
#ifndef POINT_H
#define POINT_H

// 头文件内容

#endif
```

作用：防止同一个头文件被重复包含。

记忆：

```text
#ifndef 没定义才进入
#define 定义宏
#endif 结束
```

## 5. 数组、指针、字符串和动态内存

### 5.1 数组作为函数参数

数组名作为函数参数时，传递的是数组首地址。

例子：

```cpp
void change(int a[])
{
    a[0] = 100;
}

int main()
{
    int x[3] = {1, 2, 3};
    change(x);
    cout << x[0] << endl; // 100
}
```

所以数组作为参数时，函数内部修改会影响原数组。

二维数组参数：

```cpp
void f(int a[][4], int n)
{
}
```

第二维通常必须写，因为编译器要知道如何计算下标地址。

记忆：

```text
数组名传参 = 传首地址
二维数组参数要写后面的维度
```

### 5.2 对象数组

对象数组就是数组元素是对象。

语法：

```cpp
类名 数组名[大小];
```

例子：

```cpp
Clock c[2];
```

每个元素都是一个 `Clock` 对象。

初始化：

```cpp
Point p[2] = {Point(1, 2), Point(3, 4)};
```

如果只给一部分初值：

```cpp
Point p[2] = {Point(1, 2)};
```

第一个元素用 `Point(1,2)` 构造，第二个元素调用默认构造函数。

注意：

- 对象数组创建时，每个元素都调用构造函数。
- 对象数组销毁时，每个元素都调用析构函数。

如果类没有默认构造函数：

```cpp
class A
{
public:
    A(int x);
};

A a[10]; // 错，每个元素都需要默认构造，但没有
```

### 5.3 指针数组和数组指针

指针数组：

```cpp
int *p[10];
```

`p` 是数组，数组里每个元素是 `int*`。

数组指针：

```cpp
int (*p)[3];
```

`p` 是指针，指向一个含 3 个 `int` 的数组。

怎么区分？

看括号。

```cpp
int *p[10];   // [] 优先，p 先和 [] 结合，所以 p 是数组
int (*p)[10]; // p 先和 * 结合，所以 p 是指针
```

记忆：

```text
int *p[10]：十个 int 指针
int (*p)[10]：一个指向十个 int 数组的指针
```

### 5.4 对象指针

对象指针存放对象地址。

语法：

```cpp
类名 *指针名;
```

例子：

```cpp
Point p(1, 2);
Point *ptr = &p;
```

通过指针访问成员：

```cpp
ptr->getX();
```

等价于：

```cpp
(*ptr).getX();
```

记忆：

```text
对象.成员
对象指针->成员
```

### 5.5 成员指针

成员指针不是普通指针，它指向类中的某个成员。

指向数据成员：

```cpp
int Point::*p = &Point::x;
```

使用：

```cpp
Point a;
a.*p = 10;
```

如果是对象指针：

```cpp
Point *pa = &a;
pa->*p = 20;
```

指向成员函数：

```cpp
int (Point::*pf)() = &Point::getX;
```

调用：

```cpp
(a.*pf)();
(pa->*pf)();
```

这类语法不常写，但选择题可能考。

### 5.6 `new` 和 `delete`

`new` 在堆区申请内存，`delete` 释放内存。

单个变量：

```cpp
int *p = new int;
*p = 10;
delete p;
```

初始化：

```cpp
int *p1 = new int;    // 未初始化
int *p2 = new int();  // 初始化为 0
int *p3 = new int(5); // 初始化为 5
```

数组：

```cpp
int *a = new int[10];
delete[] a;
```

初始化为 0：

```cpp
int *a = new int[10]();
```

配对关系：

| 申请 | 释放 |
|---|---|
| `new T` | `delete p` |
| `new T[n]` | `delete[] p` |

错误：

```cpp
int *p = new int[10];
delete p; // 错，应该 delete[]
```

对象：

```cpp
Student *s = new Student;
delete s;
```

`new` 对象会调用构造函数，`delete` 对象会调用析构函数。

记忆：

```text
new 和 delete 一对一
new[] 和 delete[] 一对一
```

### 5.7 `vector`

`vector` 是标准库中的动态数组类模板。

头文件：

```cpp
#include <vector>
```

语法：

```cpp
vector<元素类型> 名字(大小);
```

例子：

```cpp
vector<int> a(10);
```

表示 10 个 `int`，默认初始化为 0。

指定初值：

```cpp
vector<int> b(10, 1);
```

10 个元素都为 1。

访问：

```cpp
a[0] = 5;
cout << a.size() << endl;
```

注意：

- `vector` 对象名不是数组首地址。
- `vector` 是对象，不是普通数组。
- `size()` 返回元素个数。

算法竞赛里你很熟，但考试会强调它是“类模板”和“封装的动态数组”。

### 5.8 浅复制

浅复制就是逐个复制数据成员。

如果类中只有普通数据成员，浅复制通常没问题：

```cpp
class A
{
    int x;
    double y;
};
```

默认复制构造会复制 `x` 和 `y`。

但如果类中有指针成员：

```cpp
class Array
{
private:
    int *p;
    int size;
};
```

默认复制只会复制指针值：

```text
a.p 和 b.p 指向同一片内存
```

问题：

- 两个对象共享同一内存。
- 一个对象修改，另一个也受影响。
- 两个对象析构时可能重复 `delete`。

### 5.9 深复制

深复制就是重新分配一片独立内存，并复制内容。

例子：

```cpp
class Array
{
private:
    int *p;
    int size;

public:
    Array(const Array &a)
    {
        size = a.size;
        p = new int[size];
        for (int i = 0; i < size; i++)
        {
            p[i] = a.p[i];
        }
    }
};
```

深复制后：

```text
a.p 指向一片内存
b.p 指向另一片内存
内容相同，但空间独立
```

只要类中有动态分配资源，通常要写：

- 析构函数。
- 复制构造函数。
- 赋值运算符。

这就是 Big Three。

### 5.10 `string`

`string` 是 C++ 标准库字符串类。

头文件：

```cpp
#include <string>
```

定义：

```cpp
string s1;
string s2("China");
string s3 = "Wust";
string s4(s2);
```

赋值：

```cpp
s1 = "hello";
s2 = s1;
```

拼接：

```cpp
string s = s1 + s2;
s += "!";
```

输入：

```cpp
cin >> s; // 遇到空格停止
```

读整行：

```cpp
getline(cin, s);
```

按分隔符读取：

```cpp
getline(cin, s, ',');
```

访问字符：

```cpp
s[0] = 'H';
s.at(1) = 'e';
```

`at` 会做越界检查，`[]` 通常不做。

## 6. 继承与派生

### 6.1 继承的基本概念

继承是在已有类基础上定义新类。

语法：

```cpp
class 派生类名 : 继承方式 基类名
{
};
```

例子：

```cpp
class Person
{
public:
    void eat();
};

class Student : public Person
{
public:
    void study();
};
```

`Student` 继承 `Person`，所以：

```cpp
Student s;
s.eat();
s.study();
```

继承的目的：

- 代码复用。
- 扩展已有类。
- 建立类之间的层次关系。

派生类生成过程：

```text
吸收基类成员
改造基类成员
添加新成员
```

构造函数和析构函数不会被继承。

### 6.2 继承方式

三种继承方式：

```cpp
class B : public A {};
class C : protected A {};
class D : private A {};
```

继承后访问权限变化：

| 基类成员 | `public` 继承 | `protected` 继承 | `private` 继承 |
|---|---|---|---|
| `public` | `public` | `protected` | `private` |
| `protected` | `protected` | `protected` | `private` |
| `private` | 不可访问 | 不可访问 | 不可访问 |

口诀：

```text
公保公不变
私私保保
私不访
```

解释：

- 公有继承最常见，表示“派生类是基类的一种”。
- 保护继承和私有继承主要改变外部访问权限。
- 基类 `private` 成员派生类不能直接访问，只能通过基类 `public/protected` 成员函数间接访问。

### 6.3 类型兼容规则

公有派生类对象可以当作基类对象使用。

例子：

```cpp
class Base {};
class Derived : public Base {};

Base b;
Derived d;

b = d;
Base &rb = d;
Base *pb = &d;
```

三种情况：

1. 派生类对象可以赋值给基类对象。
2. 基类引用可以绑定派生类对象。
3. 基类指针可以指向派生类对象。

反过来不行：

```cpp
Derived *pd = &b; // 错
```

替代后，只能使用基类部分。

```cpp
pb->baseFunc(); // 对
pb->derivedFunc(); // 错，pb 类型是 Base*
```

类型兼容是虚函数和动态多态的基础。

### 6.4 对象切片

对象切片指用派生类对象初始化或赋值给基类对象时，只保留基类部分。

```cpp
Derived d;
Base b = d;
```

此时 `b` 是一个真正的 `Base` 对象，不再和 `d` 的派生类部分有关。

即使有虚函数：

```cpp
b.display();
```

也调用 `Base::display()`，因为 `b` 本身就是基类对象。

记忆：

```text
指针/引用保留动态类型
对象赋值会切片
```

### 6.5 派生类构造函数

派生类构造时，要先构造基类部分。

语法：

```cpp
Derived::Derived(参数) : Base(基类参数), member(成员参数)
{
    // 派生类新增成员初始化
}
```

例子：

```cpp
class Base
{
public:
    Base(int x);
};

class Derived : public Base
{
private:
    int y;

public:
    Derived(int x, int y) : Base(x), y(y)
    {
    }
};
```

构造顺序：

```text
基类构造函数
成员对象构造函数
派生类构造函数体
```

如果有多个基类，按继承列表顺序构造：

```cpp
class D : public B1, public B2 {};
```

先 `B1`，再 `B2`。

### 6.6 派生类析构函数

析构顺序和构造相反：

```text
派生类析构函数体
成员对象析构函数
基类析构函数
```

例子：

```cpp
class Base
{
public:
    ~Base() { cout << "Base" << endl; }
};

class Derived : public Base
{
public:
    ~Derived() { cout << "Derived" << endl; }
};
```

```cpp
Derived d;
```

离开作用域时输出：

```text
Derived
Base
```

记忆：

```text
构造从上到下
析构从下到上
```

### 6.7 同名隐藏

派生类中定义了和基类同名的成员，会隐藏基类同名成员。

例子：

```cpp
class Base
{
public:
    void f(int);
};

class Derived : public Base
{
public:
    void f(double);
};
```

`Derived::f(double)` 会隐藏 `Base::f(int)`。

调用：

```cpp
Derived d;
d.f(3.14); // Derived::f(double)
d.f(1);    // 仍可能调用 Derived::f(double)，基类 f 被隐藏
```

如果要调用基类版本：

```cpp
d.Base::f(1);
```

重载和隐藏区别：

```text
重载：同一作用域，函数名相同，参数不同
隐藏：基类和派生类不同作用域，派生类同名成员挡住基类成员
```

### 6.8 多继承二义性

多继承时，如果多个基类有同名成员，派生类对象直接访问会二义。

例子：

```cpp
class A
{
public:
    void f();
};

class B
{
public:
    void f();
};

class C : public A, public B
{
};
```

调用：

```cpp
C c;
c.f(); // 错，不知道是 A::f 还是 B::f
```

解决：

```cpp
c.A::f();
c.B::f();
```

如果派生类自己定义同名函数：

```cpp
class C : public A, public B
{
public:
    void f();
};
```

那么：

```cpp
c.f(); // 调 C::f，无二义
```

### 6.9 `using` 引入基类成员

`using` 可以把基类成员引入派生类作用域。

例子：

```cpp
class D : public B1, public B2
{
public:
    using B1::fun;
    using B1::nV;
};
```

作用：

- 指定使用某个基类的同名成员。
- 让基类函数和派生类同名函数形成类似重载的效果。

例子：

```cpp
class B
{
public:
    void fun();
};

class D : public B
{
public:
    using B::fun;
    void fun(int);
};
```

这样：

```cpp
D d;
d.fun();  // B::fun
d.fun(1); // D::fun(int)
```

### 6.10 虚基类

虚基类用于解决菱形继承中共同基类被继承多份的问题。

普通菱形继承：

```cpp
class B0 {};
class B1 : public B0 {};
class B2 : public B0 {};
class D : public B1, public B2 {};
```

`D` 中有两份 `B0`。

如果访问 `B0` 成员，会二义。

使用虚基类：

```cpp
class B0 {};
class B1 : virtual public B0 {};
class B2 : virtual public B0 {};
class D : public B1, public B2 {};
```

现在 `D` 中只有一份 `B0`。

虚基类构造规则：

- 虚基类由最远派生类负责初始化。
- 中间类初始化虚基类的调用会被忽略。

构造顺序：

```text
虚基类
非虚基类
成员对象
派生类自身
```

析构顺序反过来。

记忆：

```text
菱形继承怕多份共同基类
virtual 让共同基类只保留一份
```

## 7. 多态与运算符重载

### 7.1 多态

多态是同一消息作用于不同对象，产生不同表现。

C++ 中常见多态：

- 函数重载。
- 运算符重载。
- 虚函数。
- 模板。

按绑定时间分：

| 类型 | 决定时间 | 例子 |
|---|---|---|
| 静态多态 | 编译时 | 函数重载、运算符重载、模板 |
| 动态多态 | 运行时 | 虚函数 |

记忆：

```text
重载：编译时决定
虚函数：运行时决定
```

### 7.2 运算符重载

运算符重载就是给已有运算符赋予适用于自定义类型的新含义。

语法：

```cpp
返回类型 operator 运算符(参数列表)
{
}
```

例子：

```cpp
class Complex
{
private:
    double real, imag;

public:
    Complex operator+(Complex c)
    {
        return Complex(real + c.real, imag + c.imag);
    }
};
```

调用：

```cpp
c3 = c1 + c2;
```

等价于：

```cpp
c3 = c1.operator+(c2);
```

限制：

- 不能创造新运算符。
- 不能改变运算符优先级。
- 不能改变操作数个数。
- 至少一个操作数是自定义类型。
- 不能重载：`.`、`.*`、`->*`、`::`、`sizeof`、`?:`。

记忆：

```text
运算符重载本质是函数重载
```

### 7.3 成员形式和友元形式

成员函数形式：

```cpp
Complex Complex::operator+(Complex c)
{
    return Complex(real + c.real, imag + c.imag);
}
```

非成员/友元形式：

```cpp
class Complex
{
    friend Complex operator+(Complex a, Complex b);
};

Complex operator+(Complex a, Complex b)
{
    return Complex(a.real + b.real, a.imag + b.imag);
}
```

区别：

| 形式 | 左操作数 | 参数个数 |
|---|---|---|
| 成员函数 | 当前对象 `*this` | 少一个 |
| 非成员函数 | 普通参数 | 和操作数个数相同 |

`<<` 和 `>>` 通常必须写成非成员/友元，因为左操作数是 `ostream` 或 `istream`，不能改标准库类。

### 7.4 前置和后置 `++`

前置：

```cpp
Clock& operator++()
{
    // 修改自己
    return *this;
}
```

后置：

```cpp
Clock operator++(int)
{
    Clock old = *this;
    ++(*this);
    return old;
}
```

区别：

```cpp
++a; // 先加，再用
a++; // 先用，再加
```

后置参数中的 `int` 没实际用途，只用来区分前置和后置。

为什么前置返回引用？

因为返回的是修改后的自己。

为什么后置返回对象？

因为要返回修改前的旧值，旧值通常是临时副本。

### 7.5 `<<` 和 `>>` 重载

输出运算符：

```cpp
friend ostream& operator<<(ostream &out, const Complex &c);
```

定义：

```cpp
ostream& operator<<(ostream &out, const Complex &c)
{
    out << "(" << c.real << "," << c.imag << ")";
    return out;
}
```

输入运算符：

```cpp
friend istream& operator>>(istream &in, Complex &c);
```

定义：

```cpp
istream& operator>>(istream &in, Complex &c)
{
    in >> c.real >> c.imag;
    return in;
}
```

为什么返回引用？

为了支持链式调用：

```cpp
cout << c1 << c2;
cin >> c1 >> c2;
```

为什么第一个参数是引用？

`ostream` 和 `istream` 不能复制，只能引用传递。

为什么输出第二个参数常写 `const`？

因为输出不应该修改对象。

为什么输入第二个参数不能是 `const`？

因为输入要修改对象。

### 7.6 赋值运算符 `operator=`

赋值运算符用于已有对象之间赋值。

语法：

```cpp
类名& operator=(const 类名 &rhs);
```

例子：

```cpp
String& String::operator=(const String &rhs)
{
    if (this != &rhs)
    {
        delete[] s;
        s = new char[strlen(rhs.s) + 1];
        strcpy(s, rhs.s);
    }
    return *this;
}
```

四步：

1. 检查自赋值。
2. 释放旧资源。
3. 分配新资源并复制。
4. 返回 `*this`。

为什么返回引用？

支持链式赋值：

```cpp
a = b = c;
```

为什么参数是 `const 引用`？

- 避免复制。
- 允许右侧是常对象或临时对象。
- 保证不修改右侧对象。

### 7.7 Big Three

如果类中有动态资源，通常要写三个函数：

```text
析构函数
复制构造函数
赋值运算符
```

例子：

```cpp
class String
{
private:
    char *s;

public:
    String(const char *str);
    String(const String &rhs);
    String& operator=(const String &rhs);
    ~String();
};
```

为什么？

默认复制构造和默认赋值都是浅复制。指针成员会导致多个对象指向同一片内存。

如果只写析构不写复制构造，复制对象后两个对象析构会重复释放。

记忆：

```text
有 new，就想 Big Three
```

### 7.8 复制构造和赋值的区别

复制构造：

```cpp
String a("hello");
String b = a;
String c(a);
```

此时 `b`、`c` 是新对象。

赋值：

```cpp
String a("hello");
String b("world");
b = a;
```

此时 `b` 已经存在。

判断口诀：

```text
新对象诞生：复制构造
老对象改值：赋值运算符
```

### 7.9 `operator+`、`operator+=`、`operator[]`

`operator+` 返回新对象：

```cpp
String String::operator+(const String &rhs)
{
    ...
    return ans;
}
```

不能返回局部对象引用。

`operator+=` 修改自己：

```cpp
String& String::operator+=(const String &rhs)
{
    ...
    return *this;
}
```

返回引用支持：

```cpp
s1 += s2 += s3;
```

`operator[]` 要返回引用：

```cpp
char& String::operator[](int i)
{
    return s[i];
}
```

这样才能：

```cpp
s[0] = 'A';
```

如果返回 `char`，就是返回副本，不能作为左值修改。

### 7.10 虚函数

虚函数用关键字 `virtual`。

语法：

```cpp
class Base
{
public:
    virtual void display();
};
```

派生类重写：

```cpp
class Derived : public Base
{
public:
    void display();
};
```

动态绑定：

```cpp
Base *p;
Derived d;
p = &d;
p->display(); // 调 Derived::display
```

条件：

1. 公有继承，满足类型兼容。
2. 基类中函数声明为 `virtual`。
3. 通过基类指针或引用调用。

如果直接对象调用：

```cpp
Base b = d;
b.display();
```

发生对象切片，调用 `Base::display()`。

注意：

- `virtual` 写在类内声明处。
- 类外定义时不写 `virtual`。
- 静态成员函数不能是虚函数。
- 构造函数不能是虚函数。

记忆：

```text
虚函数：基类指针/引用看实际对象类型
```

### 7.11 虚析构函数

如果可能通过基类指针删除派生类对象，基类析构函数要写成虚析构。

例子：

```cpp
class Base
{
public:
    virtual ~Base()
    {
    }
};

class Derived : public Base
{
public:
    ~Derived()
    {
    }
};
```

使用：

```cpp
Base *p = new Derived;
delete p;
```

如果基类析构不是虚函数，`delete p` 可能只调用 `Base` 析构，不调用 `Derived` 析构，造成资源泄漏。

规则：

- 构造函数不能虚。
- 析构函数可以虚。
- 如果一个类打算作为多态基类，析构函数通常应为 `virtual`。

### 7.12 纯虚函数和抽象类

纯虚函数语法：

```cpp
virtual 返回类型 函数名(参数列表) = 0;
```

例子：

```cpp
class Shape
{
public:
    virtual double area() = 0;
};
```

含有纯虚函数的类叫抽象类。

抽象类不能创建对象：

```cpp
Shape s; // 错
```

但可以定义指针或引用：

```cpp
Shape *p;
Shape &r = circle;
```

派生类必须实现纯虚函数，否则仍然是抽象类：

```cpp
class Circle : public Shape
{
private:
    double r;

public:
    double area()
    {
        return 3.14 * r * r;
    }
};
```

纯虚析构函数必须有函数体：

```cpp
class A
{
public:
    virtual ~A() = 0;
};

A::~A()
{
}
```

记忆：

```text
= 0 表示纯虚
有纯虚函数就是抽象类
抽象类不能实例化，但可以有指针和引用
```

## 8. 模板和群体数据

### 8.1 函数模板

函数模板让一个函数适用于多种类型。

语法：

```cpp
template <typename T>
返回类型 函数名(参数列表)
{
}
```

例子：

```cpp
template <typename T>
T myAbs(T x)
{
    return x < 0 ? -x : x;
}
```

调用：

```cpp
cout << myAbs(-5) << endl;     // T 是 int
cout << myAbs(-3.14) << endl;  // T 是 double
```

`typename` 也可以写成 `class`：

```cpp
template <class T>
```

函数模板本身不生成代码，只有被具体类型使用时才实例化。

注意：

模板定义通常放在头文件中。不能像普通函数那样只把声明放头文件、定义放 `.cpp`，否则其他文件实例化时看不到函数体。

记忆：

```text
模板 = 类型参数化
用到具体类型时才生成具体函数
```

### 8.2 多模板参数

模板可以有多个类型参数。

例子：

```cpp
template <typename T1, typename T2>
T1 myMin(const T1 &a, const T2 &b)
{
    return a < b ? a : b;
}
```

调用：

```cpp
myMin<int, double>(3, 5.0);
myMin<int>(3, 5.0);
myMin<double>(3, 5.0);
```

返回类型由 `T1` 决定。

考试要会判断模板参数推断结果。

### 8.3 类模板

类模板让类中的数据成员或成员函数参数类型可变。

语法：

```cpp
template <class T>
class Store
{
private:
    T item;

public:
    void PutElem(T x);
    T GetElem();
};
```

类外定义：

```cpp
template <class T>
void Store<T>::PutElem(T x)
{
    item = x;
}

template <class T>
T Store<T>::GetElem()
{
    return item;
}
```

使用：

```cpp
Store<int> s1;
Store<double> s2;
Store<Student> s3;
```

注意：

- 类名在类外定义时写 `Store<T>`。
- 创建对象时要写具体类型，如 `Store<int>`。

### 8.4 动态数组类模板

动态数组类模板的核心是：用一个指针管理堆上数组。

基本结构：

```cpp
template <class T>
class Array
{
private:
    T *list;
    int size;

public:
    Array(int sz = 50);
    Array(const Array<T> &a);
    ~Array();
    Array<T>& operator=(const Array<T> &rhs);
    T& operator[](int i);
    int getSize() const;
    void resize(int sz);
};
```

构造：

```cpp
template <class T>
Array<T>::Array(int sz)
{
    size = sz;
    list = new T[size];
}
```

析构：

```cpp
template <class T>
Array<T>::~Array()
{
    delete[] list;
}
```

复制构造：

```cpp
template <class T>
Array<T>::Array(const Array<T> &a)
{
    size = a.size;
    list = new T[size];
    for (int i = 0; i < size; i++)
    {
        list[i] = a.list[i];
    }
}
```

赋值：

```cpp
template <class T>
Array<T>& Array<T>::operator=(const Array<T> &rhs)
{
    if (this != &rhs)
    {
        delete[] list;
        size = rhs.size;
        list = new T[size];
        for (int i = 0; i < size; i++)
        {
            list[i] = rhs.list[i];
        }
    }
    return *this;
}
```

下标运算符：

```cpp
template <class T>
T& Array<T>::operator[](int i)
{
    return list[i];
}
```

为什么返回 `T&`？

因为要支持：

```cpp
a[3] = 10;
```

如果返回 `T`，只是返回副本，不能修改数组元素。

### 8.5 类型转换函数

类型转换函数可以把类对象转换成某种类型。

语法：

```cpp
operator 类型()
{
    return 某个该类型的值;
}
```

例子：

```cpp
template <class T>
Array<T>::operator T*()
{
    return list;
}
```

作用：

让 `Array<int>` 对象在需要 `int*` 的地方自动转换为内部数组首地址。

注意：

- 类型转换函数不写返回类型。
- 函数名里已经包含目标类型。

错误：

```cpp
T* operator T*(); // 错
```

正确：

```cpp
operator T*();
```

### 8.6 链表结点

链表由结点组成。

结点通常包含：

- 数据域。
- 指针域。

模板结点类：

```cpp
template <class T>
class Node
{
private:
    Node<T> *next;

public:
    T data;
    void InsertAfter(Node<T> *p);
    Node<T>* DeleteAfter();
};
```

插入当前结点之后：

```cpp
template <class T>
void Node<T>::InsertAfter(Node<T> *p)
{
    p->next = next;
    next = p;
}
```

删除当前结点之后：

```cpp
template <class T>
Node<T>* Node<T>::DeleteAfter()
{
    Node<T> *temp = next;
    if (next == NULL)
    {
        return NULL;
    }
    next = temp->next;
    return temp;
}
```

这里返回被删除结点指针，调用者可以继续处理或释放它。

### 8.7 栈

栈是只能从一端访问的线性结构。

特点：

```text
后进先出 LIFO
```

基本操作：

- `push` 入栈。
- `pop` 出栈。
- `peek` 看栈顶。
- `isEmpty` 判空。
- `isFull` 判满。

数组实现时可用 `top` 表示栈顶位置。

```cpp
template <class T, int SIZE = 50>
class Stack
{
private:
    T list[SIZE];
    int top;
};
```

### 8.8 队列

队列是一端入队、一端出队的线性结构。

特点：

```text
先进先出 FIFO
```

基本操作：

- 入队。
- 出队。
- 访问队首。
- 判空。
- 判满。

循环队列核心：

```cpp
front = (front + 1) % SIZE;
rear = (rear + 1) % SIZE;
```

为什么取余？

因为数组末尾之后要回到数组开头。

## 9. STL

### 9.1 STL 四大组件

STL 是标准模板库。

四大组件：

| 组件 | 含义 |
|---|---|
| 容器 | 存数据 |
| 迭代器 | 像指针一样访问容器 |
| 算法 | 通用函数模板 |
| 函数对象 | 像函数一样使用的对象 |

例子：

```cpp
#include <vector>
#include <algorithm>

vector<int> a = {3, 1, 2};
sort(a.begin(), a.end());
```

`a` 是容器，`a.begin()` 和 `a.end()` 是迭代器，`sort` 是算法。

### 9.2 容器

容器用于保存一组元素。

顺序容器：

- `vector`
- `deque`
- `list`

关联容器：

- `set`
- `multiset`
- `map`
- `multimap`

算法竞赛里最常用：

```cpp
vector<int> v;
set<int> s;
map<string, int> mp;
```

课程考试重点是知道它们都是 STL 容器，使用时要包含对应头文件。

### 9.3 迭代器

迭代器是泛化的指针。

例子：

```cpp
vector<int> v = {1, 2, 3};

for (vector<int>::iterator it = v.begin(); it != v.end(); ++it)
{
    cout << *it << endl;
}
```

现代写法：

```cpp
for (auto it = v.begin(); it != v.end(); ++it)
{
    cout << *it << endl;
}
```

迭代器作用：

```text
把容器和算法连接起来
```

算法不需要知道具体容器内部怎么存，只通过迭代器访问。

### 9.4 算法和函数对象

算法是函数模板。

例子：

```cpp
sort(v.begin(), v.end());
```

函数对象是重载了 `operator()` 的对象。

例子：

```cpp
struct Greater
{
    bool operator()(int a, int b)
    {
        return a > b;
    }
};

sort(v.begin(), v.end(), Greater());
```

标准库也有函数对象：

```cpp
#include <functional>
greater<int>()
less<int>()
negate<int>()
```

## 10. 流类库与输入输出

### 10.1 常用流对象

头文件：

```cpp
#include <iostream>
```

对象：

| 对象 | 含义 |
|---|---|
| `cin` | 标准输入 |
| `cout` | 标准输出 |
| `cerr` | 标准错误，非缓冲 |
| `clog` | 标准错误，缓冲 |

`cerr` 常用于立即输出错误信息。

`clog` 也是错误输出，但有缓冲。

### 10.2 文件输出

头文件：

```cpp
#include <fstream>
```

输出文件流：

```cpp
ofstream fout;
fout.open("out.txt");
```

完整步骤：

```cpp
#include <fstream>
#include <iostream>
using namespace std;

int main()
{
    ofstream fout("out.txt");
    if (!fout)
    {
        cout << "Error opening file" << endl;
        return -1;
    }

    fout << "hello" << endl;
    fout.close();
    return 0;
}
```

六步：

```text
包含头文件
定义文件流对象
打开文件
检查是否成功
读写数据
关闭文件
```

### 10.3 文件输入

输入文件流：

```cpp
ifstream fin("in.txt");
```

读取：

```cpp
string s;
getline(fin, s);
```

完整例子：

```cpp
#include <fstream>
#include <iostream>
#include <string>
using namespace std;

int main()
{
    ifstream fin("in.txt");
    if (!fin)
    {
        cout << "open failed" << endl;
        return -1;
    }

    string line;
    while (getline(fin, line))
    {
        cout << line << endl;
    }

    fin.close();
}
```

### 10.4 字符串流

字符串流把字符串当成输入输出流。

头文件：

```cpp
#include <sstream>
```

例子：

```cpp
istringstream iss("1 56.7");
int a;
double b;
iss >> a >> b;
```

输出：

```cpp
ostringstream oss;
oss << "a = " << 10;
string s = oss.str();
```

作用：

- 从字符串中解析数字。
- 把多个值拼成字符串。

## 11. 异常处理

### 11.1 异常处理思想

异常处理用于处理程序运行中的意外情况。

比如：

- 文件打开失败。
- 内存申请失败。
- 参数非法。
- 除数为 0。

异常处理让发现错误和处理错误分离。

底层函数：

```cpp
throw 异常;
```

上层代码：

```cpp
try
{
}
catch (...)
{
}
```

### 11.2 `try-throw-catch`

基本结构：

```cpp
try
{
    // 可能出错的代码
    throw 表达式;
}
catch (异常类型 变量名)
{
    // 处理异常
}
```

例子：

```cpp
try
{
    int milk = 0;
    int biscuits = 10;
    if (milk <= 0)
    {
        throw biscuits;
    }
}
catch (int e)
{
    cout << e << " biscuits, and no milk" << endl;
}
```

执行过程：

```text
进入 try
遇到 throw
停止 try 中后续语句
寻找匹配 catch
执行 catch
继续 catch 后面的代码
```

如果没有异常，`catch` 会被跳过。

### 11.3 多个 `catch`

一个 `try` 后可以接多个 `catch`。

```cpp
try
{
    ...
}
catch (int e)
{
}
catch (const char *s)
{
}
catch (...)
{
}
```

`catch(...)` 可以捕获任意异常，但必须放最后。

原因：

如果放前面，它会把所有异常都拦住，后面的具体 `catch` 永远用不到。

### 11.4 栈解旋

抛出异常后，程序会离开当前作用域。

离开过程中，已经构造好的局部对象会自动析构。

这个过程叫栈解旋。

例子：

```cpp
class A
{
public:
    ~A()
    {
        cout << "~A" << endl;
    }
};

void f()
{
    A a;
    throw 1;
}
```

当 `throw 1` 发生时，`a` 会被析构。

这也是异常机制重要价值之一：不会因为跳转而忘记析构局部对象。

### 11.5 异常接口声明

课件里提到旧式异常规格：

```cpp
void fun() throw(A, B, C);
void fun() throw();
```

按课件理解：

- `throw(A, B, C)` 表示函数只应该抛这些类型。
- `throw()` 表示函数不抛异常。

现代 C++ 中这种写法已经不推荐，但考试如果按课件问，要按课件规则答。

## 12. 程序阅读题套路

### 12.1 构造析构输出顺序

看到程序输出构造析构，按顺序画：

```text
基类
成员对象
本类
```

析构反过来：

```text
本类
成员对象
基类
```

含虚基类：

```text
虚基类
非虚基类
成员对象
本类
```

### 12.2 复制构造还是赋值

看对象是否正在创建。

```cpp
A b = a; // 复制构造
A b(a);  // 复制构造
b = a;   // 赋值，前提是 b 已存在
```

函数值传参：

```cpp
void f(A x);
f(a); // 复制构造
```

引用传参：

```cpp
void f(const A &x);
f(a); // 不复制
```

### 12.3 虚函数调用

三问：

1. 基类函数有没有 `virtual`？
2. 是不是通过基类指针或引用调用？
3. 指针或引用实际指向哪个对象？

如果是对象切片：

```cpp
Base b = derived;
b.f();
```

那 `b` 已经是 `Base` 对象。

### 12.4 运算符重载翻译

把表达式翻译成函数调用。

```cpp
a + b       -> a.operator+(b) 或 operator+(a, b)
++a         -> a.operator++()
a++         -> a.operator++(0)
cout << a   -> operator<<(cout, a)
a[i]        -> a.operator[](i)
```

再看返回值是对象还是引用。

## 13. 程序填空模板

### 13.1 `String` 类 Big Three

```cpp
class String
{
private:
    char *s;

public:
    String()
    {
        s = new char[1];
        s[0] = '\0';
    }

    String(const char *str)
    {
        s = new char[strlen(str) + 1];
        strcpy(s, str);
    }

    String(const String &rhs)
    {
        s = new char[strlen(rhs.s) + 1];
        strcpy(s, rhs.s);
    }

    ~String()
    {
        delete[] s;
    }

    String& operator=(const String &rhs)
    {
        if (this != &rhs)
        {
            delete[] s;
            s = new char[strlen(rhs.s) + 1];
            strcpy(s, rhs.s);
        }
        return *this;
    }
};
```

### 13.2 `operator+`

```cpp
String String::operator+(const String &rhs)
{
    char *tmp = new char[strlen(s) + strlen(rhs.s) + 1];
    strcpy(tmp, s);
    strcat(tmp, rhs.s);
    String ans(tmp);
    delete[] tmp;
    return ans;
}
```

返回对象，不返回引用。

### 13.3 `operator+=`

```cpp
String& String::operator+=(const String &rhs)
{
    char *tmp = new char[strlen(s) + strlen(rhs.s) + 1];
    strcpy(tmp, s);
    strcat(tmp, rhs.s);
    delete[] s;
    s = tmp;
    return *this;
}
```

返回引用。

### 13.4 `operator[]`

```cpp
char& String::operator[](int i)
{
    return s[i];
}
```

返回引用，才能作为左值。

### 13.5 `operator<<`

```cpp
ostream& operator<<(ostream &out, const String &str)
{
    out << str.s;
    return out;
}
```

返回 `ostream&`，支持连续输出。

### 13.6 `Array<T>` 下标

```cpp
template <class T>
T& Array<T>::operator[](int i)
{
    assert(i >= 0 && i < size);
    return list[i];
}
```

`const` 版本：

```cpp
template <class T>
const T& Array<T>::operator[](int i) const
{
    assert(i >= 0 && i < size);
    return list[i];
}
```

## 14. 最后一页速记

```text
inline：短小频繁函数，建议编译器展开
默认参数：从右往左给，中间不能断
函数重载：看参数，不看返回值
构造函数：对象出生时自动调用
析构函数：对象死亡时自动调用
复制构造：新对象用旧对象初始化
赋值运算符：两个旧对象之间赋值
初始化列表：const、引用、无默认构造成员必须用
static 数据成员：类内声明，类外定义
static 成员函数：无 this，不能直接访问非 static 成员
friend：单向、不传递、不继承
常对象：只能调用常成员函数
new/delete 配对，new[]/delete[] 配对
浅复制：复制指针地址
深复制：重新分配空间复制内容
继承权限：公保公不变，私私保保，私不访
对象切片：派生类赋给基类对象，只保留基类部分
虚函数：通过基类指针/引用调用，看实际对象
虚析构：多态基类最好写 virtual 析构
纯虚函数：=0，有纯虚函数就是抽象类
operator[] 返回引用，才能作为左值
operator<< 返回 ostream&
模板：类型参数化，定义通常放头文件
异常：try -> throw -> catch
```

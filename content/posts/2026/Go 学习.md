---
title: "Go 语法学习"
description: "本篇面向对 Go 语言感兴趣的读者，如果你也想了解下传说中的 GoLang 那么就来看下吧"
date: "2026-08-28 12:40:00"
updated: "2026-08-28 12:40:00"
permalink: /2026/go-learn
image: /assets/2026-08-28-go.png
categories: ["技术分享"]
tags: ["技术分享"]
---

# Go 语法学习

> 本篇面向对 Go 语言感兴趣的读者，如果你也想了解下传说中的 ~~CSGo~~ 那么就来看下吧
> 
> Chord-2026-08-28

## 目录

- [1. Go 文件基本结构](#_1-go-文件基本结构)
- [2. 基本语法规则](#_2-基本语法规则)
- [3. 变量](#_3-变量)
- [4. 常量与 iota](#_4-常量与-iota)
- [5. 基本数据类型](#_5-基本数据类型)
- [6. 数组](#_6-数组)
- [7. 切片 slice](#_7-切片-slice)
- [8. map](#_8-map)
- [9. 函数](#_9-函数)
- [10. defer](#_10-defer)
- [11. 匿名函数与闭包](#_11-匿名函数与闭包)
- [12. 指针、new 和 make](#_12-指针new-和-make)
- [13. 自定义类型与类型别名](#_13-自定义类型与类型别名)
- [14. 结构体 struct](#_14-结构体-struct)
- [15. JSON 序列化与反序列化](#_15-json-序列化与反序列化)
- [16. 方法与接收者](#_16-方法与接收者)
- [17. 流程控制](#_17-流程控制)
- [18. 包 package](#_18-包-package)
- [19. 时间 time](#_19-时间-time)
- [20. 文件操作](#_20-文件操作)
- [21. 接口 interface](#_21-接口-interface)
- [22. 并发 goroutine](#_22-并发-goroutine)
- [23. channel](#_23-channel)
- [24. select](#_24-select)
- [25. 锁与 sync 包](#_25-锁与-sync-包)
- [26. 反射 reflect](#_26-反射-reflect)
- [27. socket 编程](#_27-socket-编程)
- [28. 单元测试](#_28-单元测试)
- [29. 常见易错点](#_29-常见易错点)

---

## 1. Go 文件基本结构

一个最小 Go 程序通常长这样：

```go
package main

import "fmt"

func main() {
    fmt.Println("Hello, Go")
}
```

### 说明

- `package main`：声明当前文件属于 `main` 包。
- `import "fmt"`：导入标准库中的 `fmt` 包。
- `func main()`：程序入口函数。
- `fmt.Println()`：调用 `fmt` 包中的 `Println` 函数输出内容。

> `main` 包 + `main` 函数，通常表示这是一个可以直接运行的程序。

---

## 2. 基本语法规则

### 语句结束

Go 通常不需要手动写分号 `;`，因为 Go 会根据换行自动插入分号。

```go
fmt.Println("hello")
fmt.Println("world")
```

### 大括号不能随意换行

下面这种写法是正确的：

```go
if x > 0 {
    fmt.Println("positive")
}
```

下面这种写法通常会报错：

```go
if x > 0
{
    fmt.Println("positive")
}
```

> Go 对换行比较敏感，`{` 通常要跟在语句同一行。

---

## 3. 变量

### 3.1 普通声明

```go
var n int = 3
```

### 3.2 批量声明

```go
var (
    name string
    age  int
    ok   bool
)
```

### 3.3 类型推导

如果有初始值，Go 可以自动推导变量类型。

```go
var name = "hello"
var num = 1
```

### 3.4 短变量声明

短变量声明只能在函数内部使用。

```go
func main() {
    num := 10
    name := "hello"

    fmt.Println(num, name)
}
```

### 3.5 匿名变量 `_`

匿名变量用于忽略不需要的值。

```go
x, _ := 3, "quit"
fmt.Println(x)
```

> `_` 不会占用命名空间，也不会产生“重复定义”的问题。

---

## 4. 常量与 iota

### 4.1 普通常量

```go
const pi = 3.1415926
```

### 4.2 批量常量

```go
const (
    a = 4
    b = 5
    e = 2.7
)
```

如果常量没有显式赋值，会沿用上一行的表达式。

```go
const (
    n1 = 10
    n2
    n3
)

// n1、n2、n3 都是 10
```

### 4.3 iota

`iota` 是 Go 的常量计数器，只能在常量声明中使用。

```go
const (
    n1 = iota // 0
    n2        // 1
    _         // 2
    n4        // 3
)
```

如果在同一个 `const` 块中重新赋值，`iota` 仍然会继续计数。

```go
const (
    n1 = iota // 0
    n2        // 1
    n3 = 100  // 100
    n4 = iota // 3
)
```

多个常量也可以共用 `iota`。

```go
const (
    a, b = iota + 1, iota + 2 // 1, 2
    c, d                      // 2, 3
)
```

---

## 5. 基本数据类型

### 5.1 整型

```go
int8, int16, int32, int64
uint8, uint16, uint32, uint64
int
uint
uintptr
```

### 注意

- `int` 和 `uint` 的大小跟平台有关，通常在 64 位系统上是 64 位。
- `uintptr` 是无符号整数类型，常用于保存指针相关的数值，不建议新手随便用。

### 5.2 浮点型

```go
float32
float64
```

### 5.3 复数类型

```go
complex64
complex128
```

`complex64` 由两个 `float32` 组成：实部 32 位，虚部 32 位。

### 5.4 布尔类型

```go
var ok bool = true
```

布尔值只有：

```go
true
false
```

> Go 中 `0` 和 `1` 不能直接当成 `false` 和 `true` 使用。

### 5.5 字符串 string

Go 字符串默认使用 UTF-8 编码。

```go
s := "hello"
```

### 5.6 多行字符串

多行字符串使用反引号。

```go
s := `
多行字符串会原样保留内容
包括换行、空格、\n、\t 等字符
`
```

### 5.7 byte 与 rune

```go
byte // uint8 的别名，常用于处理字节
rune // int32 的别名，常用于处理 Unicode 字符
```

示例：

```go
s := "你好"

for i, r := range s {
    fmt.Println(i, r, string(r))
}
```

> 中文字符通常需要用 `rune` 来正确表示。

---

## 6. 数组

数组长度是类型的一部分。

```go
var a [3]int
```

只有长度和元素类型都相同的数组，才是同一种类型。

```go
var a [3]int
var b [3]int
var c [4]int

b = a // 可以
// c = a // 错误：[3]int 和 [4]int 是不同类型
```

### 自动推断数组长度

```go
var boolArray = [...]bool{true, false, true}
```

### 按索引初始化

```go
var langArray = [...]string{
    1: "Golang",
    3: "Python",
    7: "Java",
}
```

---

## 7. 切片 slice

切片是基于数组的封装，属于引用类型。

### 7.1 声明切片

```go
var nums []int
```

只声明未初始化的切片，其值为 `nil`。

```go
var nums []int
fmt.Println(nums == nil) // true
```

### 7.2 从数组生成切片

```go
a := [5]int{1, 2, 3, 4, 5}
b := a[1:4] // 取索引 [1, 4)，结果是 2, 3, 4
```

切片还可以继续切片。

```go
c := b[0:len(b)]
```

### 7.3 make 创建切片

```go
d := make([]int, 5, 10)
```

含义：

- 长度 `len(d)` 为 5。
- 容量 `cap(d)` 为 10。

### 7.4 append 添加元素

```go
nums := []int{1, 2, 3}
nums = append(nums, 4, 5, 6)
```

追加另一个切片时，需要使用 `...`。

```go
a := []int{1, 2}
b := []int{3, 4}

a = append(a, b...)
```

### 7.5 copy 复制切片

```go
src := []int{1, 2, 3}
dst := make([]int, len(src))

copy(dst, src)
```

### 7.6 删除切片元素

删除索引为 2 的元素：

```go
a := []string{"北京", "上海", "广州", "深圳"}
a = append(a[:2], a[3:]...)

fmt.Println(a) // [北京 上海 深圳]
```

### 注意

```go
b := a
```

这不是深拷贝，`a` 和 `b` 会共享同一个底层数组。

---

## 8. map

`map` 是键值对集合，属于引用类型，使用前需要初始化。

### 8.1 声明

```go
var m map[string]int
```

此时 `m` 是 `nil`，不能直接写入。

### 8.2 make 创建 map

```go
m := make(map[string]int)
m["score"] = 100
```

### 8.3 字面量创建 map

```go
m := map[int]bool{
    1: true,
    2: false,
}
```

### 8.4 判断键是否存在

```go
value, ok := m[1]
if ok {
    fmt.Println("存在", value)
} else {
    fmt.Println("不存在")
}
```

### 8.5 删除键值对

```go
delete(m, 1)
```

### 注意

`map` 遍历顺序不保证和插入顺序一致。

```go
for k, v := range m {
    fmt.Println(k, v)
}
```

---

## 9. 函数

### 9.1 基本语法

```go
func 函数名(参数列表) 返回值类型 {
    函数体
}
```

示例：

```go
func add(x int, y int) int {
    return x + y
}
```

参数类型相同时可以合并：

```go
func add(x, y int) int {
    return x + y
}
```

### 9.2 多返回值

```go
func calc(a, b int) (int, int) {
    return a + b, a - b
}
```

也可以使用命名返回值：

```go
func calc(a, b int) (sum, sub int) {
    sum = a + b
    sub = a - b
    return
}
```

### 9.3 可变参数

```go
func intSum(nums ...int) int {
    res := 0
    for _, value := range nums {
        res += value
    }
    return res
}
```

调用：

```go
fmt.Println(intSum(1, 2, 3, 4))
```

如果同时有固定参数和可变参数，可变参数必须放在最后。

```go
func test(name string, nums ...int) {
    fmt.Println(name, nums)
}
```

### 9.4 函数作为参数

```go
func add(x, y int) int {
    return x + y
}

func calc(x, y int, op func(int, int) int) int {
    return op(x, y)
}

func main() {
    res := calc(100, 200, add)
    fmt.Println(res)
}
```

---

## 10. defer

`defer` 会把语句延迟到函数即将返回前执行。

```go
func main() {
    fmt.Println(0)
    defer fmt.Println(1)
    defer fmt.Println(2)
    defer fmt.Println(3)
}
```

输出：

```text
0
3
2
1
```

> 多个 `defer` 按栈结构执行：先进后出。

---

## 11. 匿名函数与闭包

### 11.1 匿名函数立即执行

```go
func() {
    fmt.Println("匿名函数")
}()
```

### 11.2 匿名函数赋值给变量

```go
a := func() {
    fmt.Println("匿名函数")
}

a()
```

### 11.3 闭包

闭包 = 函数 + 对外层变量的引用。

```go
func outer() func() {
    name := "you"

    return func() {
        fmt.Println("hello", name)
    }
}

func main() {
    f := outer()
    f()
}
```

> `outer` 执行结束后，返回的匿名函数仍然能访问 `name`，这就是闭包。

---

## 12. 指针、new 和 make

### 12.1 指针

```go
x := 10
p := &x

fmt.Println(p)  // x 的地址
fmt.Println(*p) // 通过指针取值
```

### 12.2 new

`new` 用来分配内存，返回对应类型的指针。

```go
p := new(int)
*p = 100

fmt.Println(*p)
```

### 12.3 make

`make` 只用于创建：

```go
slice
map
channel
```

示例：

```go
s := make([]int, 0, 10)
m := make(map[string]int)
ch := make(chan int)
```

### new 和 make 的区别

| 函数 | 用途 | 返回值 |
|---|---|---|
| `new` | 分配内存 | 指针 |
| `make` | 初始化 slice、map、channel | 类型本身 |

---

## 13. 自定义类型与类型别名

### 13.1 自定义类型

```go
type MyInt int
```

此时 `MyInt` 是一个新的类型，不完全等同于 `int`。

### 13.2 类型别名

```go
type NewInt = int
```

此时 `NewInt` 只是 `int` 的别名。

---

## 14. 结构体 struct

结构体用于定义一组字段。

```go
type Person struct {
    Name string
    Age  int
}
```

### 14.1 键值对初始化

```go
p1 := Person{
    Name: "you",
    Age:  18,
}
```

### 14.2 按顺序初始化

```go
p2 := Person{"you", 18}
```

> 按顺序初始化必须严格按照字段定义顺序填写，不推荐在字段很多时使用。

### 14.3 匿名字段

```go
type Person struct {
    string
    int
}

p := Person{"you", 18}
fmt.Println(p.string, p.int)
```

匿名字段可以直接用类型名访问。

### 14.4 结构体嵌套

```go
type Address struct {
    Province string
    City     string
}

type Person struct {
    Name    string
    Gender  string
    Age     int
    Address Address
}
```

### 14.5 结构体 Tag

结构体标签使用反引号，不是单引号。

```go
type Student struct {
    Name string `json:"name" db:"name"`
    Age  int    `json:"age" db:"age"`
}
```

> Tag 常用于 JSON、数据库 ORM、参数绑定等场景。

---

## 15. JSON 序列化与反序列化

需要导入 `encoding/json` 包。

```go
import "encoding/json"
```

### 15.1 序列化 Marshal

结构体转 JSON：

```go
type Student struct {
    Name string `json:"name"`
    Age  int    `json:"age"`
}

func main() {
    s := Student{Name: "you", Age: 18}

    data, err := json.Marshal(s)
    if err != nil {
        fmt.Println(err)
        return
    }

    fmt.Println(string(data))
}
```

### 15.2 反序列化 Unmarshal

JSON 转结构体：

```go
jsonStr := `{"name":"you","age":18}`

var s Student
err := json.Unmarshal([]byte(jsonStr), &s)
if err != nil {
    fmt.Println(err)
    return
}

fmt.Println(s)
```

> `Unmarshal` 第二个参数要传地址，例如 `&s`。

---

## 16. 方法与接收者

方法是绑定到某个类型上的函数。

```go
func (接收者变量 接收者类型) 方法名(参数列表) 返回值列表 {
    函数体
}
```

### 16.1 值接收者

```go
type Person struct {
    Age int
}

func (p Person) SetAge(newAge int) {
    p.Age = newAge
}
```

值接收者不会修改原对象。

### 16.2 指针接收者

```go
func (p *Person) SetAge(newAge int) {
    p.Age = newAge
}
```

指针接收者可以修改原对象。

### 注意

只能给当前包中定义的类型添加方法，不能给非本地类型直接添加方法。

---

## 17. 流程控制

### 17.1 if

```go
if a := 5; a > 5 {
    fmt.Println("大于 5")
} else if a == 5 {
    fmt.Println("等于 5")
} else {
    fmt.Println("小于 5")
}
```

### 17.2 for

Go 没有 `while`，通常用 `for` 表示循环。

```go
for i := 0; i < 10; i++ {
    fmt.Println(i)
}
```

类似 while：

```go
i := 0
for i < 10 {
    fmt.Println(i)
    i++
}
```

死循环：

```go
for {
    fmt.Println("loop")
}
```

### 17.3 range

```go
s := "hello"

for idx, r := range s {
    fmt.Println(idx, r)
}
```

遍历字符串时，`range` 得到的是索引和 `rune`。

### 17.4 switch

```go
switch day := 1; day {
case 1:
    fmt.Println("Monday")
case 2:
    fmt.Println("Tuesday")
default:
    fmt.Println("Unknown")
}
```

---

## 18. 包 package

### 18.1 导入包

```go
import "fmt"
```

批量导入：

```go
import (
    "fmt"
    "time"
)
```

### 18.2 起别名

```go
import myFmt "fmt"

func main() {
    myFmt.Println("hello")
}
```

### 18.3 包外可见性

Go 通过首字母大小写控制可见性。

```go
Name // 包外可见
name // 仅包内可见
```

---

## 19. 时间 time

需要导入：

```go
import "time"
```

### 19.1 时间间隔

```go
t := 3
time.Sleep(time.Duration(t) * time.Second)
```

### 19.2 定时器

```go
ticker := time.Tick(time.Second)

for t := range ticker {
    fmt.Println(t)
}
```

### 19.3 解析时间字符串

Go 的时间格式模板必须使用固定时间：

```text
2006-01-02 15:04:05
```

示例：

```go
loc, err := time.LoadLocation("Asia/Shanghai")
if err != nil {
    fmt.Println(err)
    return
}

timeObj, err := time.ParseInLocation("2006/01/02 15:04:05", "2026/05/08 12:00:00", loc)
if err != nil {
    fmt.Println(err)
    return
}

fmt.Println(timeObj)
```

---

## 20. 文件操作

### 20.1 打开文件

```go
fileObj, err := os.Open("文件路径")
if err != nil {
    fmt.Println(err)
    return
}
defer fileObj.Close()
```

### 20.2 读取文件

```go
buf := make([]byte, 128)

for {
    n, err := fileObj.Read(buf)
    if err == io.EOF {
        break
    }
    if err != nil {
        fmt.Println(err)
        return
    }

    fmt.Print(string(buf[:n]))
}
```

### 20.3 bufio 读取

```go
reader := bufio.NewReader(fileObj)

for {
    line, err := reader.ReadString('\n')
    if err == io.EOF {
        fmt.Print(line)
        break
    }
    if err != nil {
        fmt.Println(err)
        return
    }
    fmt.Print(line)
}
```

### 20.4 直接读取整个文件

新版 Go 推荐使用 `os.ReadFile`。

```go
content, err := os.ReadFile("文件路径")
if err != nil {
    fmt.Println(err)
    return
}

fmt.Println(string(content))
```

### 20.5 写入文件

新版 Go 推荐使用 `os.WriteFile`。

```go
err := os.WriteFile("文件路径", []byte("hello"), 0644)
if err != nil {
    fmt.Println(err)
    return
}
```

### 20.6 OpenFile

```go
fileObj, err := os.OpenFile("文件路径", os.O_CREATE|os.O_WRONLY|os.O_APPEND, 0644)
if err != nil {
    fmt.Println(err)
    return
}
defer fileObj.Close()

fileObj.WriteString("hello\n")
```

常见打开模式：

| 模式 | 作用 |
|---|---|
| `os.O_RDONLY` | 只读 |
| `os.O_WRONLY` | 只写 |
| `os.O_RDWR` | 读写 |
| `os.O_CREATE` | 文件不存在时创建 |
| `os.O_TRUNC` | 打开时清空文件 |
| `os.O_APPEND` | 追加写入 |

常见权限：

```text
0644：文件所有者可读写，其他人只读
0755：文件所有者可读写执行，其他人可读可执行
```

---

## 21. 接口 interface

接口只关心一个类型实现了哪些方法，不关心它本身是什么类型。

```go
type Sayer interface {
    Say()
}
```

只要某个类型实现了 `Say()` 方法，就可以认为它实现了 `Sayer` 接口。

```go
type Dog struct{}

func (d Dog) Say() {
    fmt.Println("汪")
}

func main() {
    var s Sayer
    s = Dog{}
    s.Say()
}
```

### 21.1 接口嵌套

```go
type Mover interface {
    Move()
}

type Sayer interface {
    Say()
}

type Animal interface {
    Mover
    Sayer
}
```

### 21.2 类型断言

```go
var x interface{} = "hello"

res, ok := x.(string)
if ok {
    fmt.Println(res)
}
```

### 21.3 type switch

```go
func checkType(x interface{}) {
    switch v := x.(type) {
    case string:
        fmt.Println("是字符串", v)
    case int:
        fmt.Println("是 int", v)
    default:
        fmt.Println("未知类型")
    }
}
```

---

## 22. 并发 goroutine

`go` 关键字可以启动一个新的 goroutine。

```go
func hello() {
    fmt.Println("hello you!")
}

func main() {
    go hello()
    fmt.Println("hello main")
}
```

### 注意

主 goroutine 结束后，程序会直接退出，其他 goroutine 也会跟着结束。

### 22.1 WaitGroup

`sync.WaitGroup` 可以等待多个 goroutine 执行完成。

```go
var wg sync.WaitGroup

func hello() {
    defer wg.Done()
    fmt.Println("hello")
}

func main() {
    wg.Add(1)
    go hello()

    wg.Wait()
}
```

> 注意是 `wg.Done()`，不是 `wg.Down()`。

### 22.2 GOMAXPROCS

```go
runtime.GOMAXPROCS(1)
```

表示设置 Go 程序同时使用的 CPU 核心数。

---

## 23. channel

channel 用于 goroutine 之间通信，属于引用类型。

### 23.1 声明 channel

```go
var ch chan int
```

### 23.2 make 创建 channel

无缓冲通道：

```go
ch := make(chan int)
```

有缓冲通道：

```go
ch := make(chan int, 1)
```

### 23.3 发送和接收

```go
ch <- 10   // 发送数据
x := <-ch  // 接收数据并赋值
<-ch       // 接收数据但忽略结果
```

### 23.4 关闭 channel

```go
close(ch)
```

### 23.5 单向 channel

只能发送：

```go
func f1(ch chan<- int) {
    for i := 0; i < 100; i++ {
        ch <- i
    }
    close(ch)
}
```

只能接收：

```go
func f2(ch1 <-chan int, ch2 chan<- int) {
    for {
        tmp, ok := <-ch1
        if !ok {
            break
        }
        ch2 <- tmp * tmp
    }
    close(ch2)
}
```

完整示例：

```go
func f1(ch chan<- int) {
    for i := 0; i < 100; i++ {
        ch <- i
    }
    close(ch)
}

func f2(ch1 <-chan int, ch2 chan<- int) {
    for tmp := range ch1 {
        ch2 <- tmp * tmp
    }
    close(ch2)
}

func main() {
    ch1 := make(chan int, 100)
    ch2 := make(chan int, 100)

    go f1(ch1)
    go f2(ch1, ch2)

    for res := range ch2 {
        fmt.Println(res)
    }
}
```

---

## 24. select

`select` 用于处理多个 channel 操作，格式类似 `switch`。

```go
ch := make(chan int, 1)

for i := 0; i < 10; i++ {
    select {
    case x := <-ch:
        fmt.Println("接收", x)
    case ch <- i:
        fmt.Println("发送", i)
    }
}
```

如果多个 case 同时满足，`select` 会随机执行其中一个。

---

## 25. 锁与 sync 包

### 25.1 互斥锁 Mutex

```go
var lock sync.Mutex

lock.Lock()
// 临界区
lock.Unlock()
```

通常配合 `defer`：

```go
lock.Lock()
defer lock.Unlock()
```

### 25.2 读写锁 RWMutex

```go
var rwLock sync.RWMutex

rwLock.RLock()   // 加读锁
rwLock.RUnlock() // 解读锁

rwLock.Lock()    // 加写锁
rwLock.Unlock()  // 解写锁
```

### 25.3 sync.Once

只执行一次。

```go
var once sync.Once

once.Do(func() {
    fmt.Println("只执行一次")
})
```

### 25.4 sync.Map

并发安全的 map。

```go
var m sync.Map

m.Store("name", "you")
value, ok := m.Load("name")
fmt.Println(value, ok)
```

---

## 26. 反射 reflect

反射可以在运行时获取变量的类型和值。

```go
import "reflect"
```

### 26.1 TypeOf 和 ValueOf

```go
x := 100

t := reflect.TypeOf(x)
v := reflect.ValueOf(x)

fmt.Println(t.Name()) // int
fmt.Println(t.Kind()) // int
fmt.Println(v.Int())  // 100
```

### 26.2 修改值

要通过反射修改变量，必须传指针并使用 `Elem()`。

```go
x := 10
v := reflect.ValueOf(&x)

v.Elem().SetInt(100)
fmt.Println(x) // 100
```

### 26.3 IsNil 与 IsValid

```go
v.IsNil()   // 判断某些引用类型是否为 nil
v.IsValid() // 判断 Value 是否有效
```

> `IsNil` 只能用于 chan、func、interface、map、pointer、slice 等类型。

### 26.4 遍历结构体字段

```go
type Student struct {
    Name string `json:"name"`
    Age  int    `json:"age"`
}

s := Student{"you", 18}
t := reflect.TypeOf(s)

for i := 0; i < t.NumField(); i++ {
    fieldObj := t.Field(i)
    fmt.Println(fieldObj.Name, fieldObj.Type, fieldObj.Tag)
}
```

### 26.5 调用方法

```go
v := reflect.ValueOf(s)
method := v.MethodByName("SomeMethod")

if method.IsValid() {
    method.Call(nil)
}
```

---

## 27. socket 编程

### 27.1 TCP

TCP 是面向连接的协议。

#### 服务端监听

```go
listen, err := net.Listen("tcp", "127.0.0.1:20000")
if err != nil {
    fmt.Println(err)
    return
}
defer listen.Close()

conn, err := listen.Accept()
if err != nil {
    fmt.Println(err)
    return
}
defer conn.Close()
```

### 27.2 粘包

TCP 是流式协议，不保证一次发送对应一次接收。

常见解决方式：

- 封包：发送数据时加上包头，包头里保存数据长度。
- 拆包：接收数据时根据包头长度拆出完整数据。

### 27.3 UDP

UDP 是无连接协议。

#### UDP 服务端

```go
listen, err := net.ListenUDP("udp", &net.UDPAddr{
    IP:   net.IPv4(0, 0, 0, 0),
    Port: 30000,
})
if err != nil {
    fmt.Println(err)
    return
}
defer listen.Close()

buf := make([]byte, 1024)
n, addr, err := listen.ReadFromUDP(buf)
if err != nil {
    fmt.Println(err)
    return
}

fmt.Println("收到：", string(buf[:n]))

_, err = listen.WriteToUDP(buf[:n], addr)
if err != nil {
    fmt.Println(err)
    return
}
```

#### UDP 客户端

```go
conn, err := net.DialUDP("udp", nil, &net.UDPAddr{
    IP:   net.IPv4(127, 0, 0, 1),
    Port: 30000,
})
if err != nil {
    fmt.Println(err)
    return
}
defer conn.Close()
```

---

## 28. 单元测试

测试文件命名格式：

```text
xxx_test.go
```

### 28.1 测试函数

```go
func TestName(t *testing.T) {
    // 测试内容
}
```

测试函数必须以 `Test` 开头。

### 28.2 性能测试

```go
func BenchmarkName(b *testing.B) {
    for i := 0; i < b.N; i++ {
        // 测试内容
    }
}
```

### 28.3 Example

```go
func ExampleName() {
    fmt.Println("hello")
    // Output: hello
}
```

### 28.4 运行测试

```bash
go test
```

### 28.5 运行指定测试

```bash
go test -run TestName
```

### 28.6 运行性能测试

```bash
go test -bench=.
```

### 28.7 覆盖率

```bash
go test -cover
```

---

## 29. 常见易错点

### 29.1 `import` 不要写成 `improt`

```go
import (
    "fmt"
)
```

### 29.2 `else` 不能直接带条件

错误写法：

```go
if a > 5 {
    fmt.Println("大")
} else a < 5 {
    fmt.Println("小")
}
```

正确写法：

```go
if a > 5 {
    fmt.Println("大")
} else if a < 5 {
    fmt.Println("小")
} else {
    fmt.Println("等于")
}
```

### 29.3 `WaitGroup` 是 `Done`，不是 `Down`

```go
wg.Done()
```

### 29.4 channel 发送和接收不要被 Markdown 误改

正确写法：

```go
ch <- 10
x := <-ch
```

### 29.5 结构体 Tag 使用反引号

错误写法：

```go
Title string 'json:"title"'
```

正确写法：

```go
Title string `json:"title"`
```

### 29.6 `json.Unmarshal` 要传字节切片和目标地址

```go
err := json.Unmarshal(data, &target)
```

### 29.7 `ioutil` 已不推荐新代码继续使用

旧写法：

```go
ioutil.ReadFile("a.txt")
ioutil.WriteFile("a.txt", data, 0644)
```

新写法：

```go
os.ReadFile("a.txt")
os.WriteFile("a.txt", data, 0644)
```
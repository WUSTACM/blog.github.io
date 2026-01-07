---
title: Codeforces Hello 2026 题解 (div1 + 2)
date: 2026-1-8
tags: [题解]
categories: [题解]
cover: https://i.postimg.cc/ZnCzZKvr/2cb79efe667b08d4b12e3b103d67653.jpg
banner: https://i.postimg.cc/ZnCzZKvr/2cb79efe667b08d4b12e3b103d67653.jpg
topic: 题解
headline: 大标题
caption: 标题下方的小字
color: 标题颜色
mathjax: true
rightbar: toc
description:
poster:
sticky:
mermaid:
katex:
author: scandi
references:
comments:
indexing:
breadcrumb:
leftbar:
h1:
type:
---

# Codeforces Hello 2026 题解

## [Hello 2026](https://codeforces.com/contest/2183)

---

## A. Binary Array Game

### 题意:

输入$n$个$0$或者$1$的整数, alice 和 bob 一起在 n 个数上进行游戏, alice 先手, 每人每次可以选择连续至少一个数,然后用 $1-min(所选的所有数)$ 取代所选的连续数, 知道只剩下最后一个数. 如果最后一个数是$0$, 那么 alice 获胜,否则 bob 获胜.

<!-- more -->

### 分析:

倒着考虑, 以 alice 为主方思考, 如果 alice 获胜, 那么

- 最后一个元素是$0$, 那么
- 最后一次操作一定是 $1 - min(有1, 但没有0) = 1 - 1 = 0$, 那么
- 考虑到先手优势, alice 只有一次机会将所有数变成$1$, 否则就一定会输

- 则意味着, 只有开头或结尾至少有一个是$1$, alice 才是获胜

```c++
#include<bits/stdc++.h>
#define int long long
using namespace std;
using ll = long long;
using arr2 = array<int, 2>;
using arr3 = array<int, 3>;
const int N = (int)2e5 + 9;
const int M = (int)1e5 + 9;
const int mod = (int)1e9 + 7;

void solve() {
    int n;
    cin >> n;
    vector<int> a(n + 5);
    bool f1 = 0, f2 = 0;
    for (int i = 1; i <= n; i++) {
        cin >> a[i];
        if (i == 1 && a[i] == 1) {
            f1 = 1;
        }
        if (i == n && a[i] == 1) {
            f2 = 1;
        }
    }
    if ((f1 || f2)) {
        cout << "Alice\n";
        return ;
    }
    cout << "Bob\n";
}

signed main()
{
    ios::sync_with_stdio(false);
    cin.tie(0);
    int _ = 1;
    cin >> _;
    while(_--) {
        solve();
    }
    return 0;
}
```

## B. Yet Another MEX Problem

### 题意:

输入$n$个整数和一个$k$, 接下来进行$n - k + 1$次操作, 找出数组连续$k$个数, 必须是所有连续$k$个数中的$mex$最大的那$k$个, 如果$mex$最大有多组, 那么任意一组都可以, 选择后, 删除$k$个数中的任意一个. 那么意味着每次操作将减少一个数, 最后将剩下$k - 1$个数, 现在要使最后剩下的$k - 1$个数的$mex$最大

### 分析:

赛事思维没有跳出来, 复杂化去求了滑动最大$mex$了......导致一直 wa...

最后的答案一定是$min(k - 1, 全局mex)$, 为什么呢?

- 每次一定是对选择$k$个数,并删除其中一个对吧
- 那么,这连续$k$个数 一定只有两种情况
  - 第一种: 这$k$个数刚好是从$0$到$k - 1$的排列, 那么考虑删除一个元素, 一定会选择删除$k - 1$这个数
  - 第二种: 这$k$个数不是完整排列, 那么只需考虑删除的元素, 恰好是**构成全局 mex 的数之外的数即可**
- 这样最后保留下来的要么是从$0$到$k - 1$的排列, 或者就是构成全局 mex 的那些数.....其实不难发现前者也只是后者的一种特殊情况, 也完全可以不分两种情况对待
- 所以其实这题直接求$全局mex$即可

```c++
#include<bits/stdc++.h>
#define int long long
using namespace std;
using ll = long long;
using arr2 = array<int, 2>;
using arr3 = array<int, 3>;
const int N = (int)2e5 + 9;
const int M = (int)1e5 + 9;
const int mod = (int)1e9 + 7;

void solve() {
    int n, k;
    cin >> n >> k;
    vector<int> a(n + 5);
    multiset<int> st;
    int mx = 0;
    for (int i = 1; i <= n; i++) {
        cin >> a[i];
        mx = max(mx, a[i]);
    }
    for (int i = 0; i <= mx + 1; i++) st.insert(i);
    for (int i = 1; i <= n; i++) {
        if (st.count(a[i])) {
            st.erase(st.find(a[i]));
        }
    }
    int mxx = *st.begin();
    if (mxx >= k - 1) {
        cout << k - 1 << "\n";
        return ;
    }
    cout << mxx << "\n";
}

signed main()
{
    ios::sync_with_stdio(false);
    cin.tie(0);
    int _ = 1;
    cin >> _;
    while(_--) {
        solve();
    }
    return 0;
}
```

## C. War Strategy

### 题意:

一共有$n$个基地, $m$天的准备时间, 第$k$个基地是主基地. 主基地初始有$1$个人, 其余基地没有, 每天, 你会先后进行两个操作:

首先, 你会让某个基地的任意数量(可以为$0$)的士兵前往左右相邻的基地之一(不可分头行动)

然后, 主基地会多一个新士兵

至少有一个人驻守的基地为加强基地, 求$m$天后, 加强基地数量的最大值

### 分析:

暴力枚举+数学推理

考虑主基地左右两侧最终发展为加强基地的数量分别为$x$和$y$, 暴力枚举$x$, 然后, 再用时间限制以及主基地右侧剩余基地数共同决定$y$的大小, 数学推理如下:

- 暴力枚举主基地左侧有$x$座加强基地后, 那么不难算出对时间的花费为$t = x - 1 + x$, (手模下不难发现每次一个一个转移和先屯几天再一起向左转移效率是一样的, 先屯$x - 1$天后主基地就有$x$个人, 再花费$x$天就可以将这些人都转移到左边的$x$座基地了
- 一定要注意, 花费$x$天向左转移到时候, 这$x$天, 主基地也新来了$x$位士兵
- 那么随后同样逻辑, 考虑到右侧一定满足 $剩余时间 = 转移天数y + 囤积人数的时间$
- 考虑囤积人数的时间, 有可能之前囤积的已经够了, 也可能不够, 那么上面方程如下:
- $m - t = y + max(0, y - x)$
  - 情况一: $y \ge x$, 则化简公式得, $y = m - t = m - (x - 1 + x) \ge x$ 并且主基地右侧得有$y$座基地 即 $y \le n - k$
  - 情况二: $y \le x$, 则同理化简公式........
- 全局最大值$mx$维护 $x + y + 1$ 即可 (不要漏了主基地也是加强基地哦哈哈

```c++
#include<bits/stdc++.h>
#define int long long
using namespace std;
using ll = long long;
using arr2 = array<int, 2>;
using arr3 = array<int, 3>;
const int N = (int)2e5 + 9;
const int M = (int)1e5 + 9;
const int mod = (int)1e9 + 7;

void solve() {
    int n, m, k;
    cin >> n >> m >> k;
    int mx = 0;
    for (int i = 0; i <= k - 1; i++) {
        int t = i - 1 + i;
        int num = i;
        if (m - t <= num) {
            mx = max(mx, i + min(m - t, n - k));
        }
        if (m + i >= 2 * t + 1) {
            mx = max(mx, i + min((m + 1 - i) / 2, n - k));
        }
    }
    cout << mx + 1 << "\n";
}

signed main()
{
    ios::sync_with_stdio(false);
    cin.tie(0);
    int _ = 1;
    cin >> _;
    while(_--) {
        solve();
    }
    return 0;
}
```

## D1. Tree Coloring (Easy Version)

### 题意:

$n$个顶点, $n - 1$条边的树, 节点$1$是树的根, 要求将节点满足下面要求的分成尽可能少的组, 每组中的所有节点必须没有直接的边相连接, 并且 每个节点到根节点的距离是不同的, 求最少组的数量

### 分析:

将树按照距离根的距离划分层数, 宏观上不难发现, 所有层中的最大值最直接影响最后的组数, 同时不难观察到, 第一层根与第二层是连体关系, 考虑这个为初始化最大值即可. 后续直接广搜便利树获取每层的节点数量即可

```c++
#include<bits/stdc++.h>
#define int long long
using namespace std;
using ll = long long;
using arr2 = array<int, 2>;
using arr3 = array<int, 3>;
const int N = (int)2e5 + 9;
const int M = (int)1e5 + 9;
const int mod = 998244353;

void solve() {
    int n;
    cin >> n;
    vector<vector<int>> e(n + 5);
    for (int i = 1; i < n; i++) {
        int u, v;
        cin >> u >> v;
        e[u].push_back(v);
        e[v].push_back(u);
    }
    int mx = e[1].size() + 1;
    queue<arr2> q;
    vector<int> num(n + 5, 0);
    vector<bool> vis(n + 5);
    q.push({1, 1});
    vis[1] = 1;
    while (q.size()) {
        auto[u, cnt] = q.front();
        q.pop();
        num[cnt]++;
        mx = max(mx, (int)e[u].size());
        for (auto v : e[u]) {
            if (vis[v]) {
                continue;
            }
            vis[v] = 1;
            q.push({v, cnt + 1});
        }
    }
    for (auto i : num) {
        mx = max(i, mx);
    }
    cout << mx << "\n";
}

signed main()
{
    ios::sync_with_stdio(false);
    cin.tie(0);
    int _ = 1;
    cin >> _;
    while(_--) {
        solve();
    }
    return 0;
}
```

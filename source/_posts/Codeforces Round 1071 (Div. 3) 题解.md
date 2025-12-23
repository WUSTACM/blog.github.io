---
title: Codeforces Round 1071 (Div. 3) 题解
date: 2025-12-24
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

# [Codeforces Round 1071 (Div. 3) ](https://codeforces.com/contest/2179)

---

## A. Blackslex and Password

### 题意:

输入一个整数 $k$ 和 $x$ ,求不可构造的字符串的最小长度 $n$ . 其中

- $k$为构造可用的英文小写字母前$k$个
- 对于每个$1 \leq i  < j \leq n$ ,若$(j - i) \bmod x = 0$ ,则 $s_i$ 与 $s_j$不同

---

### 分析:

看到题目吓哭了....这还是 div3 的 A 题吗? 虽然不难发现样例 k 与 x 的乘积与样例答案刚好一致.....
又用了几分钟手模了样例发现最极限的情况是刚好能使用的每种字符刚好连续排列 x 次

<!-- more -->

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
    int k, x;
    cin >> k >> x;
    cout << x * k + 1 << "\n";
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

## B. Blackslex and Showering

### 题意:

给定$n$个整数组成的数组$a$, 选择其中一个索引$k$, 并去除$a_k$ , 剩余元素顺序组成数组$b$

求 $\sum_{i=1}^{n-2} \lvert b_i - b_{i+1} \rvert$ 的最小值

### 分析:

- 考虑到去除第一个元素或最后一个元素是特殊情况,因为只会导致单一影响
- 去除中间任意一个元素, 对结果的影响相当于少加了当前元素分别与前后的差值 并且 多加了前后间的差值

赛时没想清楚,导致改了好久,把代码写屎了.....

如官方题解那样, 先维护去除前的总和,再使用两种特殊情况去初始化$ans$, 后续按照常规情况 O(n) 遍历维护最小值即可

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

    int a[n+1];
    for (int i = 1; i <= n; i++) cin >> a[i];

    int sum = 0;
    for (int i = 2; i <= n; i++) sum += abs(a[i]-a[i-1]);

    int ans = min(sum - abs(a[2]-a[1]), sum - abs(a[n]-a[n-1]));
    for (int i = 2; i < n; i++) {
        ans = min(ans, sum - abs(a[i+1]-a[i]) - abs(a[i]-a[i-1]) + abs(a[i+1]-a[i-1]));
    }

    cout << ans << "\n";
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

## C. Blackslex and Number Theory

### 题意:

找到一个最大的$k$ , 使得长度为$n$ 的数组$a$ 中的每个元素都能各自找到一个$\ge k 的 x$ 执行 $a_i= a_i \bmod x$ , 最终数组$a$各元素都相等

### 分析:

- 很显然$k$的一种合法(但不一定最优)选择是数组 a 的最小值, 这样数组中每个元素都可以取到与个元素相等的$x$,最终使得数组全为 0.
- 很显然$k$ 的取值如果大于数组次小值, 那么最小值与次小值无论如何选择$x$,最终还是不变, 数组永远无法各元素相等

那么最大取值$k$一定会在数组$a$的最小值与次小值之间取到, 考虑到要使得最小值与次小值最终要相等,那么一种尽可能大的选择方式就是使得 $k = 次小值 - 最小值$ (当然前提是这样取得的$k\ge$最小值)

不难证明,其他更大的数组$a$中的元素,都可以用同样的方法取到对应合法的$x$

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
    for (int i = 1; i <= n; i++) {
        cin >> a[i];
    }
    sort(a.begin() + 1, a.begin() + 1 + n);
    if (a[2] - a[1] <= a[1]) {
        cout << a[1] << "\n";
        return ;
    }
    cout << a[2] - a[1] << "\n";
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

## D. Blackslex and Penguin Civilization

### 题意:

输入$n$, 请你构造一个关于$2^n - 1$ 的排列,使得$\sum_{i=0}^{2^n - 1}popcount(p_0 \& p_1 \&p_2 ...\&p_i)$值最大,并且排列的字典序最小

### 分析:

考虑到 $\&$ 的性质, 随着运算次数的增加,popcount 必然是不增的,考虑到要构造最大值, 不难想到让二进制尽可能多 1 的数放在前面.

#### 假设: n = 6

- 第一个位置放置 $111111$
- 第二个位置考虑到字典序最小, 放 $011111$ 是最优的
- 第三个位置考虑到字典序最小, 放 $001111$ 是最优的
- 第四个位置考虑到让值最大, 故继续保持低四位还是 1, 放 $101111$是最优的
- 第五个位置, 放 $000111$
- 第六个位置, 放 $010111$
- 第七个位置, 放 $100111$
- 第八个位置, 放 $110111$
- 第九个位置, 放 $000011$

**观察第三个位置和第四个位置, 他们的二进制前四位都是 1, 二进制第五位是 0, 二进制第六位类似枚举!没错!二进制枚举**

**再观察第五到第八个位置, 不难看出类似的,二进制前四位都一样, 剩下两位满足二进制枚举**

那么直接模拟构造即可

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
    int a = (1ll << n) - 1;
    vector<int> ans;
    ans.push_back(a);
    for (int i = n - 1; i >= 0; i--) {
        a = a ^ (1ll << i);
        for (int j = 0; j < (1 << (n - i - 1)); j++) {
            ans.push_back(a + (j << (i + 1)));
        }
    }
    for (auto i : ans) cout << i << " ";
    cout << "\n";

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

## E. Blackslex and Girls E. Blackslex 与 Girls

### 题意:

两个阵营, 有$x$人属于阵营 A, 有$y$人属于阵营 B, 现将所有人分成$n$组,同时一个长度为$n$的二进制字符串$s$, 0 表示该组阵营 A 人数必须严格大于阵营 B, 反之, 阵营 B 人数必须严格大于阵营 A. 同时给定数组$p$,必须满足第$i$个小组的总人数必须大于等于$p_i$
问是否能将两阵营的人共同构造出满足情况的分组方式, 能的话输出"YES"否则输出"NO"

### 分析:

观察样例的"NO"情况样例, 不难发现

- 数组$p$的总人数不能大于阵营总人数
- 考虑特殊情况, 如果所有分组都是阵营 A 获胜(字符串$s$全 0), 那么必须 $x - y \ge n$
- 分别考虑两个阵营可协调的最小需要人数, 如果某分组阵营 A 获胜, 那么此分组中,A 阵营最少需要$p_i \div 2 + 1$个人, 同理可以维护出两阵营总需要的最少人数

代码有点小 💩

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
    int n, x, y;
    cin >> n >> x >> y;
    string s;
    cin >> s;
    vector<int> p(n + 5);
    int sum = 0;
    for (int i = 1; i <= n; i++) {
        cin >> p[i];
        sum += p[i];
    }
    int cnta = 0, cntb = 0;
    int cba = 0, cbb = 0;
    for (int i = 0; i < s.size(); i++) {
        if (s[i] == '0') {
            cnta++;
            cba += p[i + 1] / 2 + 1;
        }
        else {
            cntb++;
            cbb += p[i + 1] / 2 + 1;
        }
    }
    if (cnta == n) {
        if (x - y < cnta) {
            cout << "NO\n";
            return ;
        }
    }
    if (cntb == n) {
        if (y - x < cntb) {
            cout << "NO\n";
            return ;
        }
    }
    if (x < cnta || y < cntb || x < cba || y < cbb) {
        cout << "NO\n";
        return ;
    }
    if (sum > x + y) {
        cout << "NO\n";
        return ;
    }
    cout << "YES\n";
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

---
title: Codeforces Round 1072 (Div. 3) 题解
date: 2026-1-13
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
author: scandi, everlasting
references:
comments:
indexing:
breadcrumb:
leftbar:
h1:
type:
---

# Codeforces Round 1072 (Div. 3) 题解

## [Codeforces Round 1072 (Div. 3)](https://codeforces.com/contest/2184)

## A. Social Experiment

### 题意：

将$n$个人分成两堆，求两堆人数的最小差值，每堆的人必须以多个团队的形式存在，每个团队必须由$2或3$个人组成。

<!-- more -->

### 分析：

注意特判即可，样例给了$n = 2$，别忘记同地位的题干条件 $n = 3$

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
    if (n == 2) {
        cout << "2\n";
        return ;
    }
    if (n == 3) {
        cout << "3\n";
        return ;
    }
    cout << n % 2 << "\n";
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

## B. Hourglass

### 题意：

完整沙漏耗时$s$，每间隔$k$分钟翻转沙漏，第$m$分钟后不再翻转，问$m$分钟后，多久沙漏将耗尽？

### 分析：

- 考虑经过 k 分钟，然后瞬间翻转为一个操作单元

- 不难发现，翻转第偶数次开始时，沙漏就会恢复原样
- 那么问题就可以分成两种情况
  - $cnt = m / k$ ，$ num = m \% k$
  - 第一：时间 m 够翻转偶数次，那么最后只需考虑$max(0, s - num)$
  - 第二：时间 m 够翻转奇数次，那么可以理解成先翻转偶数次恢复原样，然后再多进行一次操作（等待 k 分钟然后翻转）。这里要注意先考虑翻转次数结束时的剩余量$min(k, s)$， 那么再考虑最后的时间 $max(0, min(k, s) - num)$

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
    int s, k, m;
    cin >> s >> k >> m;
    int num = m / k;
    int x = m % k;
    if (num % 2 == 0) {
        cout << max(0ll, s - x) << "\n";
        return ;
    }
    cout << max(0ll, min(k, s) - x) << "\n";
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

## C. Huge Pile

### 题意：

一堆苹果有$n$个，每次操作可将苹果分成(两堆数量差距最小的)两堆，问最少操作几次可以得到一堆刚好$k$个的苹果堆，如果不能做到输出$-1$

## 分析：

注意！特判$n = k$时，直接输出$0$，_因为这个特判卡了好久。。。_

- 手模下样例$21$，只考虑出现的数种类，不考虑具体数量
  - 第一次操作：10 11
  - 第二次操作：5 6
  - 第三次操作：2 3
  - 第四次操作：1 2
- 不难发现吧，每次操作结束后，最多只有两种情况
- 考虑什么时候会出现两种数呢？其实就是第一次出现不能平均分的时候，即出现奇数时即可
- 那么问题就转化为，每次对$n$取半
  - 当$n$从未是奇数前，那么考虑$n 是否 = k$
  - 当 n 第一次出现奇数后，那么后续无论$n$是奇数或是偶数，都考虑$n是否 = k$以及$n+1是否 = k$

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
    int ans = 0;
    bool f = 0;
    if (n == k) {
        cout << "0\n";
        return ;
    }
    while (n) {
        ans++;
        if (n & 1) f = 1;
        n >>= 1;
        if (f && (n == k || n + 1 == k)) {
            cout << ans << "\n";
            return ;
        }
        if (!f && n == k) {
            cout << ans << "\n";
            return ;
        }
    }
    cout << "-1\n";

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

## D. Unfair Game

### 题意：

给定一个$2$的幂的数$n$，求从$1$到$n$有多少个数能在进行 k 次以上操作后，仍不变为$0$，每次操作考虑将数减半或者减去$1$，另外只有偶数可以进行减半操作

### 分析：

| 数       | 1   | 2   | 3   | 4   | 5   | 6   | 7   | 8    |
| -------- | --- | --- | --- | --- | --- | --- | --- | ---- |
| 二进制   | 1   | 10  | 11  | 100 | 101 | 110 | 111 | 1000 |
| 最小次数 | 1   | 2   | 3   | 3   | 4   | 4   | 5   | 4    |

手打下表，直接观察找出规律（bushi

- emmm 首先为什么考虑到二进制呢？题目中的操作是减半和减$1$，非常符合二进制的性质特点，所以考虑列出来观察
- 本题的操作目的是将数变成$0$，从二进制角度相当于目的是消除二进制的所有位

- 因为题目限制，只有偶数可以进行减半，减半操作可以直接减少二进制的位数，而减$1$操作可以当做辅助调整二进制为结尾是$0$（即偶数），以方便后续减半操作进行

- 那么是否可以这样理解

  - 二进制位如果是$0$的话，可以通过一次减半操作的代价直接消除

  - 二进制如果是$1$的话，则需要先减$1$操作，再减半，一共两次操作的代价将其消除

- 那么就可以得出结论，设二进制表示数中$1$的个数为$f(1)$, $0$的个数为$f(0)$, 那么将数变成$0$的最小操作次数 $cnt = f(1) \times 2 + f(0) - 1$, 对照表就可以验证了

### 代码思路：

- 考虑枚举二进制位数$i$
- 则$f(1) + f(0) = i$
- 则$cnt = f(1) \times 2 + i - f(1) - 1 = i + f(1) - 1$
- 那么只需记下 $cnt > k$ 的情况下的贡献即可
- 注意！
  - 计数过程中，需要用到组合数学，直接求阶层会爆 long long
  - 考虑求组合数时，采用乘法与除法同时进行，由定理“连续$k$个数的乘积必有因子$k$”，故过程中能够保证始终整除

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
    int tmp = 0;
    while (n) {
        tmp++;
        n >>= 1;
    }
    n = tmp;
    int ans = 0;
    for (int i = 0; i < n - 1; i++) {
        if (i + i + 1 <= k) continue;
        if (i + 1 > k) ans += (1 << i);
        else {
            int num = max(k - i, 0ll);
            int cnt = 1;
            auto sum = [](int num, int i) -> int {
                int cnt = 1;
                int k = 1;
                for (int j = i - num + 1; j <= i; j++) {
                    cnt *= j;
                    cnt /= k;
                    k++;
                }
                return cnt;
            };
            for (int j = num; j <= i; j++) {
                ans += sum(j, i);
            }
        }
    }
    if (2 + n - 2 > k) ans++;
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

早上要考习思想。。。。。。不能再写了，该复习了。。。。万恶的期末周（哭



**everlasting的E题题解：**

## E. Exquisite Array

### 题意：

定义精致数组-$k$为任意相邻两数之差至少为$k$的数组。

给定长度为$n$的排列$p$，对于每一个从$1$到$n - 1$的$k$，找出精致数组-$k$的数量。

### 思路：

题目要求: 寻找相邻差值至少为$k$的数组个数。

这可以转化为：寻找差分数组中某一子段的最小值至少为$k$的数组个数。

这仍然很麻烦。于是我们可以先统计出最小值为$k,k\in [1, n - 1]$的子段数，最后再做前缀和即可转换为最小值至少为$k$的数组个数。

关于统计最小值为$k$的子段数，我们可以对差分数组中的每一个数进行单独计算：

对于第$i$个差值，我们可以利用两次单调栈统计出第$i$个差值左侧最近的满足$d[l]<=d[i]$的$l$和右侧最近的满足$d[r]<d[i]$的$r$，这样即可以求出对于当前的$d[i]$，以$d[i]$为最小值的数组个数：$(i - l + 1 - 1) \times (r - i + 1 - 1)$，即：$(i - l) \times (r - i)$。

这样即可不重不漏地统计出所有最小值为$k$的子段数，最后再从$1$到$n$做前缀和即可求出最小值至少为$k$的数组个数。

### 代码：

``` c++
#include <bits/stdc++.h>
using namespace std;
using ld = long double;
#define int long long
#define fi first
#define se second

void solve ()
{
    int n; cin >> n;
    vector <int> v(n + 1), d(n + 3);
    for (int i = 1; i <= n; i++) {
        cin >> v[i];
        d[i] = abs(v[i] - v[i - 1]);
    }

    vector <int> al(n + 3, 1), br(n + 3, n + 1);
    vector <int> stk;

    for (int i = 2; i <= n; i++) {
        while (stk.size() && d[stk.back()] > d[i]) {
            stk.pop_back();
        }
        if (stk.size()) al[i] = stk.back();
        stk.push_back(i);
    }

    stk.clear();
    for (int i = n; i >= 2; i--) {
        while (stk.size() && d[stk.back()] >= d[i]) {
            stk.pop_back();
        }
        if (stk.size()) br[i] = stk.back();
        stk.push_back(i);
    }

    vector <int> ans(n + 1, 0);
    for (int i = 2; i <= n; i++) {
        ans[d[i]] += (br[i] - i) * (i - al[i]);
    }

    for (int i = n - 2; i >= 1; i--) {
        ans[i] += ans[i + 1];
    }

    for (int i = 1; i < n; i++) {
        cout << ans[i] << " \n"[i == n - 1];
    }
}   
    
signed main ()
{
    ios::sync_with_stdio(0);
    cin.tie(0);
    int _ = 1;
    cin >> _;
    while (_--) {
        solve();
    }
    return 0;
}
```




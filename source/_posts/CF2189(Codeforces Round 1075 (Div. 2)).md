---
title: Codeforces Round 1075 (Div. 2)A-C2题解
date: 2026-1-23
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
author: RoBin05
references:
comments:
indexing:
breadcrumb:
leftbar:
h1:
type:

---

# Codeforces Round 1075 (Div. 2)A-C2题解

题目链接 : [Codeforces Round 1075 (Div. 2)](https://codeforces.com/contest/2189)

## A Table with Numbers

### 题意

给你n个值，表示行或列，要你把他们配对，使得在$h \times l$的格点图里面有最多点的配对数

<!--more-->

### 思路

设$maxn = max(l,h) , minn = min(l,h)$ ，最多配对数为k，则k一定满足$min(maxn/2,minn)$

### 代码

```cpp
#include <bits/stdc++.h>
using ll = long long;
using namespace std;

void solve()
{
    int n, h, l;
    cin >> n >> h >> l;
    vector<int> a(n);
    for(auto &i : a){
        cin >> i;
    }
    sort(a.begin(), a.end());
    int maxn = max(h, l), minn = min(h, l);
    int lo = upper_bound(a.begin(), a.end(), minn) - a.begin() , hi = upper_bound(a.begin(), a.end(), maxn) - a.begin(); // 这里写麻烦了。。。
    cout << min({hi / 2, lo}) << endl;
}

int main()
{
    ios::sync_with_stdio(0);
    cin.tie(0), cout.tie(0);

    int _ = 1;
    cin >> _;
    while (_--)
    {
        solve();
    }

    return 0;
}
```

## B The Curse of the Frog

### 题意

给你n种跳跃方法(a,b,c)，让青蛙从0跳到x。当你使用第i种方法时，往前跳跃$a_i$步；每使用$b_i$次该方法，就先往后回滚$c_i$，再跳跃$a_i$步。判断青蛙是否能到达x，如果能，输出最少回滚次数，否则输出-1。

### 思路

对于$1\leq i \leq n$，青蛙可以先跳$b_i-1$步，这样不会产生回滚次数。然后找到一次回滚次数能前进步数的最大值，一直这样跳就是最优解了。（注意特判）

### 代码

``` cpp
#include <bits/stdc++.h>
using ll = long long;
using namespace std;

void solve()
{
    ll n, x;
    cin >> n >> x;
    vector<array<ll, 3>> va(n + 1);
    ll sum = 0;
    ll maxn = -1e18-7;
    for (int i = 1; i <= n; i++)
    {
        cin >> va[i][0] >> va[i][1] >> va[i][2];
        sum += va[i][0] * (va[i][1] - 1);
        maxn = max(maxn , va[i][0] * va[i][1] - va[i][2]);
    }
    // cout << maxn << ' ';

    if(sum>=x)
        return cout << 0 << endl, void();
    if (maxn <= 0)
        return cout << -1 << endl, void();
    cout << (x - sum + maxn - 1ll) / maxn << endl;
}

int main()
{
    ios::sync_with_stdio(0);
    cin.tie(0), cout.tie(0);

    int _ = 1;
    cin >> _;
    while (_--)
    {
        solve();
    }

    return 0;
}
``` 

## C1 XOR Convenience (Easy Version)

### 题意

找出一个长度为n的排列p，对于所有的$ i(2 \leq i \leq n-1) $都有 $j(i \leq j \leq n)$ ，$p_i = p_j$ ^ $  i$ 。

### 思路

首先，把题目的公式重写一下，就是$p_j = p_i$ ^ $i$。

不考虑1位置的元素，从2开始，每两个元素之间的异或和为1。那么把1放到最后一位，对于$ i(2 \leq i \leq n-1) $，使$p_i = i$ ^ $1$，最后把排列补全就是答案了。

### 代码
``` cpp
#include <bits/stdc++.h>
using ll = long long;
using namespace std;

void solve()
{
    int n;
    cin >> n;
    vector<int> vis(n + 1, 0), ans(n + 1, 0);
    vis[1] = 1;
    for (int i = 2; i < n; i++)
    {
        ans[i] = i ^ 1;
        vis[i ^ 1] = 1;
    }
    ans[n] = 1;
    for (int i = 1; i <= n;i++){
        if(!vis[i])
            ans[1] = i;
    }
    for (int i = 1; i <= n;i++){
        cout << ans[i] << ' ';
    }
    cout << endl;
}

int main()
{
    ios::sync_with_stdio(0);
    cin.tie(0), cout.tie(0);

    int _ = 1;
    cin >> _;
    while (_--)
    {
        solve();
    }

    return 0;
}
```

## C2 XOR Convenience (Hard Version)

### 题意

找出一个长度为n的排列p，对于所有的$ i(1 \leq i \leq n-1) $都有 $j(i \leq j \leq n)$ ，$p_i = p_j$ ^ $  i$ ， 如果没有这种排列，输出-1。

### 思路

在C1的基础上，只需要保证$p_1$ ^ $1 \leq n$。如果$p_1$ ^ $1>n$ ，易得$p_1$一定为偶数，且$p_i = n$，就可以执行这个操作：

``` swap(p[1], p[p[1]^(1<<__lg(n))]); ```

~~hyw~~为什么？

1. 首先观察交换后1位置的数字t，t一定是一个奇数$(p_1$ ^ $2^n$为偶数，以该值作为下标的数一定是奇数，因为对于$i(2 \leq i \leq n-1),p_i$ ^ $i = 1)$，那么t^1 = t-1 ，这个值一定可以在后续的数组中找到。

2. 然后是第二个下标所在位置的数字n，这个下标得到的异或值为$n$ ^ $n$ ^ $2^{log_2(n)} = 2^{log_2(n)}$，因为$n$ ^ $2^{log_2(n)}$ 一定小于 $2^{log_2(n)}$，所以一定存在大于i的下标的值为$2^{log_2(n)}$。

在第二种情况中，如果n正好等于$2^{log_2(n)}$，就是不存在的情况。

证明不难：
如果$n = 2^{log_2(n)}$，这个排列就只存在其本身最高位相同。

1. 若$p_n = n$ ，就不存在$p_{n-1}$ ^ $n-1 = n$ 或者 $n-1$ 。

2. 若$p_n \neq n$ , 无论$i(1 \leq i \leq n-1)$ , 都有$p_i$ ^ $i = p_i + i = n + i > n$

综上，代码就可以写出来了。

### 代码

``` cpp
#include <bits/stdc++.h>
using ll = long long;
using namespace std;

void solve()
{
    int n;
    cin >> n;
    if(n==(1<<__lg(n)))
        return cout << -1 << endl, void();

    vector<int> ans(n + 1, 0),vis(n+1,0);
    ans[n] = 1;
    vis[1] = 1;
    for (int i = n - 1; i >= 1; i--)
    {
        ans[i] = i ^ 1;
        vis[i ^ 1] = 1;
    }
    for (int i = 1;i<=n;i++){
        if(!vis[i])
            ans[1] = i;
    }

    if((ans[1]^1)>n)
        swap(ans[1], ans[ans[1]^(1<<__lg(n))]);
    for (int i = 1; i <= n; i++)
    {
        cout << ans[i] << ' ';
    }
    cout << endl;
}

int main()
{
    ios::sync_with_stdio(0);
    cin.tie(0), cout.tie(0);

    int _ = 1;
    cin >> _;
    while (_--)
    {
        solve();
    }

    return 0;
}
```


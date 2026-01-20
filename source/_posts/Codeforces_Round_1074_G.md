---
title: Codeforces Round 1074 (Div.4) G题题解
date: 2026-01-21
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
author: everlasting
references:
comments:
indexing:
breadcrumb:
leftbar:
h1:
type:
---

# Codeforces Round 1074 (Div.4) G题题解

## 题意：

<!-- more -->

给定$n$个数组$a_1, a_2, \ldots, a_n$。接下来从所有数组中任选一个数组，并任选一个数，将其添加到除自身所在的数组之外的任意一个数组的末端, 并从选择的数组中删除这个数。此次操作的值被定义为每个数组的$MEX$的和，即为：$\sum_{i=1} ^{n} \operatorname{MEX}(a_i)$。最后对所有可能的操作的值进行求和。其中所有数组的长度之和不超过$2 \cdot 10^5$。

## 思路：

显然我们不可能枚举所有可能。因此，我们从每个数组对答案的贡献的角度去考虑问题。

对于任意一个数组来说，会有两种情况。一种是自身没有参与任何的数字移动，另一种是自身参与了数字移动。

对于第一种情况而言，即经过操作之后没有来自其他数组的数且自己的数没有移动至别的数组，其对答案的贡献就是自身的$MEX$乘上贡献的次数。令所有数组中的数字个数为$total$，当前数组的数字个数为$cnt$，数组的个数为$n$。贡献的次数即为：$(total - cnt) \times (n - 2)$。表示从其他数组中共$(total - cnt)$个数中挑选一个数，之后乘上除挑选数的数组和选中没有参与的数组的另外$n - 2$个数组。而每一个数组的$MEX$都是可以预处理出来的。第一种情况的贡献即为：$(total - cnt) \times (n - 2) \times MEX$

对于第二种情况而言，自身参与数字移动可以分为两种情况：
- 把自己的数给出去
- 接收其他数组移动过来的数

若是把自身的数给出去，可以枚举数组中的数，若其在当前数组中的个数不止一个或者大于当前数组的$MEX$，则不会对数组的$MEX$产生影响。若小于当前数组的$MEX$且自身个数只有一个，则移出当前数字后的数组$MEX$即为这个数字本身。并且对于每一个移出去的数字，都有$(n - 1)$个数组可以进入。因此每一个数的贡献次数都是$(n - 1)$次。

若是接收其他数组移动过来的数，数字可以分为等于当前数组$MEX$的数字和其他数字。若移动过来的数不等于当前数组的$MEX$值，其对当前数组的$MEX$也不会有影响。若等于当前数组的$MEX$值，我们就可以依据新数组来计算新的$MEX$值。实际上，我们完全可以在输入时预处理出这个新的$MEX$值。因此，我们可以利用unordered_map的性质，预处理出其他数组中有多少个数字等于当前数组的$MEX$值。
令其他数组中等于当前数组的$MEX$的数字有$k$个，原$MEX$值为$t1$，新$MEX$值为$t2$，所有数字的个数为$total$，当前数组中的数字个数为$cnt$。这种情况对答案的贡献即为：$(total - k - cnt) \times t1 + k \times t2$。

于是，我们便可以遍历每一个数组，对于数组中每一个数字来说可以计算出自己移动至其他数组后对答案的贡献，对于整个数组来说，可以计算出自己不参与操作和参与接收移动的数字这两种情况对答案的贡献。最后累加即可。

时间复杂度:$O(N)$，$N$为所有数字的总个数。

## 代码：

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
    vector <vector <int> > v(n + 1);
    vector <array<int, 2> > mex(n + 1, {0, 0});
    int total = 0;
    unordered_map <int, int> mp;
    for (int i = 1; i <= n; i++) {
        int t; cin >> t;
        v[i].resize(t + 1);
        total += t;
        for (int j = 1; j <= t; j++) {
            cin >> v[i][j];
            mp[v[i][j]]++;
        }

        ranges::sort(v[i] | views::drop(1));
        int idx = t;
        for (int j = 1; j <= t; j++) {
            if (v[i][j] == mex[i][0]) mex[i][0]++;//处理数组原MEX
            else if (v[i][j] > mex[i][0]) {
                idx = j; 
                break;
            }
        }
        mex[i][1] = mex[i][0] + 1;
        for (int j = idx; j <= t; j++) {
            if (v[i][j] == mex[i][1]) mex[i][1]++;//处理数组新MEX
            else if (v[i][j] > mex[i][1]) break;
        }   
    }

    int ans = 0;
    for (int i = 1; i <= n; i++) {
        int cnt = v[i].size() - 1;
        ans += mex[i][0] * (total - cnt) * (n - 2); //对应第一种情况，数组没有接收数字或给出数字
        for (int j = 1; j <= cnt; j++) {//对应数字移动至其他数组的情况
            if (j + 1 <= cnt && v[i][j] == v[i][j + 1]) {
                ans += mex[i][0] * (n - 1);
            }else if (j >= 2 && v[i][j] == v[i][j - 1]) {
                ans += mex[i][0] * (n - 1);
            }else if (v[i][j] > mex[i][0]) {
                ans += mex[i][0] * (n - 1);
            }else {
                ans += v[i][j] * (n - 1);
            }
        }
        ans += mp[mex[i][0]] * mex[i][1] + (total - mp[mex[i][0]] - cnt) * mex[i][0];//对应数组接收来自其他数组的数字的情况
    }

    cout << ans << '\n';
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



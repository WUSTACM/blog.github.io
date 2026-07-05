---
title: "Codeforces Round 1075 (Div. 2) 题解"
description: "有一个$h$行$l$列初始值都为$0$的表格，从$n$个数中选$2k$个数并构成$k$对 如$(x, y)$，$(x, y)$会将表格中的第$x$行，第$y$列的数值加$1$，如果数对在表格范围外则无效，问最终表格和的最大可能和"
date: "2026-01-24 00:00:00"
updated: "2026-01-24 00:00:00"
permalink: "/2026/01/24/Codeforces Round 1075 (Div. 2) 题解"
categories: ["题解"]
tags: ["题解"]
---

# [Codeforces Round 1075 (Div. 2)](https://codeforces.com/contest/2189) 题解

## A. Table with Numbers

### 题意：

有一个$h$行$l$列初始值都为$0$的表格，从$n$个数中选$2k$个数并构成$k$对 如$(x, y)$，$(x, y)$会将表格中的第$x$行，第$y$列的数值加$1$，如果数对在表格范围外则无效，问最终表格和的最大可能和



### 分析：

其实这题问的就是选出来的$k$个数对，最多可以有多少个同时落在表格内

可以分别计数 n个数中

- 设$\le min(h, l)$的个数为$num$个
- 设$\ge min(h, l)  \&\& \le max(h, l)$的个数为$cnt$个

不然发现，两个$num$中的数字组成的数对一定满足，两个$cnt$中的数字组成的数对一定不满足，一个$num$中一个$cnt$中的数字组成的数对一定满足。

那么可以直接讨论$num$和$cnt$的大小关系即可，具体讨论见代码即可

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
    int n, h, l;
    cin >> n >> h >> l;
    vector<int> a(n + 5);
    int num = 0, cnt = 0;
    for (int i = 1; i <= n; i++) {
        cin >> a[i];
        if (a[i] <= min(h, l)) num++;
        else {
            if (a[i] <= max(h, l)) cnt++;
        }
    }
    if (cnt <= num) {
        cout << (num + cnt) / 2 << "\n";
        return ;
    }
    cout << num << "\n";

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

## B. The Curse of the Frog

### 题意：

一条无限长数轴，$0$为起点向右按照下面代价规则朝向目标点进发，如果可以到达目标点，输出最小代价，否则输出$-1$

规则：

- 有$n$种不同的最大前进值$a_i$，每种最大前进值都有对应的规则值$b_i$和$c_i$，对于某种最大前进值$a$，每当你要使用这种最大前进值$b$的整数倍次，你就需要在第$b$的整数倍次先后退$c$后，才可以继续前进$a$，每后退一次就会增加一次代价

### 分析：

**注意：最大前进值$a$，并非一定要走长度$a$，也可以走小于$a$的长度，所以后续探讨只要能否到达或者超过都算可以到达目标点**

首先考虑什么时候是到达不了目标点呢？

- 对于每种最大前进值$a$，如果一直选择$a$前进，那么它一定满足一种循环关系，先前行$b - 1$次$a$，然后后退$c$，再前行一次$a$，以此反复循环下去........那么不难发现，如果以单个循环的净前进值来看，花费一个代价可以前进的距离是可以直接算出来的，就是$a \times b - c$ 
- 如果所有的最大前进值对应的循环净前进值$a \times b - c$ 是$\le 0$的话，那么继续下去也不可能会再前进了

- 然后，不难想到，其实每种最大前进值$a$，我们都可以白嫖$b - 1$次，我们可以定义$cnt$为所有白嫖前进值的总和，如果$cnt < x$并且所有的最大前进值对应的循环净前进值$a \times b - c$ 是$\le 0$的，那么就永远不可能到达$x$。但如果$cnt \ge x$，那么我们将不需要花费任何代价也可以到达$x$。

 那么剩下的情况就是白嫖的够不着$x$，并且有最大前进值$a$的净前进值是正的，接下来就需要花费代价前进

由于本地考虑最小代价，所以后续选择完全可以只选择净前进值最大的，所以只需维护出净前进值最大的最大前进值$a$的净前进值$mx$即可，最后的整除问题你一定会！详见代码

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
    int n, x;
    cin >> n >> x;
    vector<arr3> a(n + 5);
    bool f = 0;
    int num = 0;
    int mx = 0, pos = -1;
    for (int i = 1; i <= n; i++) {
        cin >> a[i][0] >> a[i][1] >> a[i][2];
        if (a[i][0] * a[i][1] > a[i][2]) f = 1;
        num += (a[i][0] * (a[i][1] - 1));
        mx = max(mx, a[i][0] * a[i][1] - a[i][2]);
    }
    if (num >= x) {
        cout << "0\n";
        return ;
    }
    if (!f) {
        cout << "-1\n";
        return ;
    }
    if ((x - num) % mx)
        cout << (x - num) / mx + 1 << "\n";
    else cout << (x - num) / mx << "\n";
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

## C1. XOR Convenience (Easy Version)

### 题意：

找到一个长度为  *n* 的排列   *p* ，使得对每个  *i* （  $2 \le i \le n - 1$）存在一个  *j* （  $i \le j \le n$）使得  $p_i = p_j  \oplus i$

### 分析：

神秘构造题，突破口在于$i和j$的范围，$j$必须大于等于$i$，那么不难想到，如果$i = n - 1$，那么$j = n - 1$或者$j = n$，又因为一个数异或任何一个非$0$的数，都不可能得到它本身，所以$p_{n - 1} != p_{n - 1} \oplus (n - 1)$，所以此时$j = n$，故必有$p_{n - 1} = p_{n} \oplus (n - 1)$。

考虑到$1$异或一个数，相当于将这个数加一或者减一，那么不难想到直接令$p_n = 1$，那么对于 $2 \le i \le n - 2$的每一个$i$都可以尝试取$j = n$，因为都能保证异或值不大于$n$且互异（奇数减一，偶数加一刚好完美错开并完美覆盖所有数，手模如下）

- $p_{n - 2} = 1 \oplus (n - 2)$
- $p_{n - 3} = 1 \oplus (n - 3)$
- $p_{n - 4} = 1 \oplus (n - 4)$
- ...........
- $p_{2} = 1 \oplus (2)$

那么最后一个$p_1$其实是根据$n$的奇偶性取不同的值（$C2$的突破口），如果$n$是奇数，那么$p_1 = n - 1$，否则$p_1 = n$，当然没有发现也可以直接用一个$set$初始化$1到n$，将找到的数$erase$，那么最后剩下的数就是$p_1$的了

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
    vector<int> a(n + 5);
    vector<int> ans(n + 5);
    ans[n] = 1;
    set<int> st;
    for (int i = 2; i <= n; i++) st.insert(i);
    for (int i = n - 1; i >= 2; i--) {
        ans[i] = ans[n] ^ i; 
        st.erase(ans[i]);
    }
    ans[1] = *st.begin();
    for (int i = 1; i <= n; i++) {
        cout << ans[i] << " ";
    }
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

## C2. XOR-convenience (Hard Version)

## 题意：

找到一个长度为  *n* 的排列   *p* ，使得对每个  *i* （  $1 \le i \le n - 1$）存在一个  *j* （  $i \le j \le n$）使得  $p_i = p_j  \oplus i$，如果不存在合法排列，输出$-1$

### 分析：

本题其实就是在$C1$的基础上多加一个限制，$p_{1} = p_{j} \oplus 1$，（  $1 \le j \le n$）

那么如果按照$C1$的方法以及结论

- 如果$n$是奇数，那么$p_1 = n - 1$
- 如果$n$是偶数，那么$p_1 = n$

那么你会发现在本题中

- 如果$n$是奇数，那么$p_1 = n - 1 = n \oplus 1$，所以也是正确的构造

- 如果$n$是偶数，因为$p_1 = n \neq (1\le x \le n - 1) \oplus 1$ ，所以是错误构造

接下来讨论如果$n$是偶数，显然不能再使$p_1 = n$，所以$n$必然需要在之前被构造，那么问题就是，如果能在  *i* （  $2 \le i \le n$）中找到一个可以是使得$p_i = n$的，那么$C1$方法原先给这个$p_i$所构造的那个值就可以给$p_1$，刚好实现一个互换的效果，这样就成功构造。但如果找不到一个可以使得$p_i = n$的话，就不可能构造出来，直接输出$-1$即可。

那么代码该如何处理找到中找到一个$p_i = n$，（  $2 \le i \le n$）呢？

**异或运算性质**

- 要使得$p_i = n$
- 则$p_i = n = p_j \oplus i$，（$i\le j \le n$）
- 则只需保证之前的所有$p_j$ 中存在$n = p_j \oplus i$，即$n \oplus p_j= p_j \oplus i \oplus p_j$  ，即$n \oplus p_j = i$
- 那么只需要一个$vis$数组标记在$i$之前的所有$n \oplus p_j$，对每一个新的$i$判断是否之前有$j$可以使之满足$p_i = n$的条件，如果有，后续$i$不再需要判断，如果最终都没有，则无法构造出合法答案

值得一提的是，$vis$的数组大小需要开到$n$的两倍以上，刚好是可以大于二进制的满位情况，否则会RE一发......

当然现在看来，其实构造不出来的$n$一定是$2$的幂，如 $4, 8, 16.....$ 因为只有这种情况下，$n$的二进制最高位，是不可能通过小于它的数去异或得到的。但是$p_n$又不能等于$n$，所以必然无法构造出合法排列

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
    vector<int> a(n + 5);
    vector<int> ans(n + 5);
    if (n % 2) {
        ans[n] = 1;
        set<int> st;
        for (int i = 2; i <= n; i++) st.insert(i);
        for (int i = n - 1; i >= 2; i--) {
            ans[i] = ans[n] ^ i; 
            st.erase(ans[i]);
        }
        ans[1] = *st.begin();
        for (int i = 1; i <= n; i++) {
            cout << ans[i] << " ";
        }
        cout << "\n";
        return ;
    }
    ans[n] = 1;
    set<int> st;
    vector<bool> vis(n * 2 + 5);
    vis[1] = (1 ^ n);
    bool ff = 0;
    for (int i = 2; i <= n; i++) st.insert(i);
    for (int i = n - 1; i >= 2; i--) {
        if (!ff && vis[i]) {
            ans[i] = n;
            ff = 1;
        }
        else {
            ans[i] = ans[n] ^ i; 
            vis[ans[i] ^ n] = 1;
        }
        st.erase(ans[i]);
    }
    ans[1] = *st.begin();
    if (!ff) {
        cout << "-1\n";
        return ;
    }
    for (int i = 1; i <= n; i++) {
        cout << ans[i] << " ";
    }
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

困（


---
title: Codeforces Round 1077 (Div. 2)题解
date: 2026-1-30
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
author: scandi, yz
references:
comments:
indexing:
breadcrumb:
leftbar:
h1:
type:
---

# [Codeforces Round 1077 (Div. 2)](https://codeforces.com/contest/2188)题解

## A. Divisible Permutation

### 题意：

构造一个长度为$n$的排列$p$，使得 $1 \le i \le n - 1$ 都有 $|p_i - p_{i + 1}| \% i = 0$ 

<!-- more -->

### 分析：

考虑到最后两个位置的差要整除$n - 1$，则必然其中一个位置是$1$，另外一个位置是$n$

那么倒着手模后，不难找出奇偶位置分别的规律，直接模拟即可

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
    vector<int> ans(n + 5);
    int j = 1;
    for (int i = 1; i <= n + 4; i += 2) {
        ans[i] = j;
        j++;
    }
    j = n;
    for (int i = 2; i <= n + 4; i += 2) {
        ans[i] = j;
        j--;
    }
    for (int i = n; i >= 1; i--) {
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

## B. Seats

### 题意：

输入一段长为$n$的$01$字符串，其中$0$代表该位置无人，$1$代表该位置有人，规定相邻座位不能有人，问如何填充空位置，使得不能够再填充时，总人数最少

### 分析：

赛时第$56$分钟才成功$ac$这题......破防了

首先考虑特殊情况，如果字符串全是$0$，会有什么规律呢？

| n    | 填充前    | 填充后    | 最少人数 |
| ---- | --------- | --------- | -------- |
| 1    | 0         | 1         | 1        |
| 2    | 00        | 01        | 1        |
| 3    | 000       | 010       | 1        |
| 4    | 0000      | 0101      | 2        |
| 5    | 00000     | 01001     | 2        |
| 6    | 000000    | 010010    | 2        |
| 7    | 0000000   | 0100101   | 3        |
| 8    | 00000000  | 01001001  | 3        |
| 9    | 000000000 | 010010010 | 3        |

至此，不难发现最少人数$cnt$，满足$cnt = (n + 2) / 3$

那么字符串中如果有$1$，那么可以当做，字符串被多个$1$，分成多个连续的$0$段，这些$0$段一共只有三种可能出现的情况

- 第一种就像我们上面考虑到那种特殊情况，当整个字符串全是$0$时，那么连续$0$段的开头和结尾都没有被限制，那么$cnt = (n + 2) / 3$
- 第二种，如果连续$0$段出现在开头而后被$1$断隔开（非开头但是连续到结尾是一样的），这种情况的连续$0$段，有其中一端是和$1$相邻，所以不能安排人，相当于把这个$0$扣掉了，那么此时$cnt = (n + 1) / 3$
- 第三种，就是整个连续$0$段，被两端的$1$包裹起来，那么两端的$0$都被限制，直接扣掉两个$0$，即可得到$cnt = n / 3$

那么直接代码模拟实现即可

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
    string s;
    cin >> s;
    int cnt = 0, ans = 0;
    bool f = 0;
    for (int i = 0; i < n; i++) {
        if (s[i] == '0') {
            cnt++;
        }
        else {
            if (!f) {
                ans++;
                ans += (cnt + 1) / 3;
                cnt = 0;
                f = 1;
                continue;
            }
            ans++;
            ans += cnt / 3;
            cnt = 0;
        }
    }
    if (!f) {
        ans += (cnt + 2) / 3;
        cout << ans << "\n";
        return ;
    }
    ans += (cnt + 1) / 3;
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

## C. Restricted Sorting

### 题意：

找到一个最大可能值$k$，使得如果满足$|a_i - a_j| \ge k$，可以交换任意次数$a_i$和$a_j$，使得最后$a$排序为非降序，如果没有最大值（不用交换），直接输出$-1$

### 分析：

首先，最终是按照$a$的非降序排列，则每个数的最终位置是固定的，显然我们只需要对那些正处在错误位置的数考虑交换，位置正确的不需要考虑

那么，错误位置的数要如何交换呢？其实我们不用细究整个交换的过程，手模几个小数据不难发现，只要有在错误位置的数，我们都可以通过任何数作为媒介去把它移动到正确的位置上。

也就是说，我们只需考虑，哪些数作为媒介最优呢？显然不是最小的数就是最大的数。

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
    vector<int> a(n + 5), b(n + 5);
    for (int i = 1; i <= n; i++) {
        cin >> a[i];
        b[i] = a[i];
    }
    sort(b.begin() + 1, b.begin() + 1 + n);
    int mn = b[1];
    int mx = b[n];
    int k = 1e15;
    bool f = 0;
    int x = 0;
    for (int i = 1; i <= n; i++) {
        if (a[i] != b[i]) {
            f = 1;
            k = min(max(abs(mn - b[i]), abs(mx - b[i])), k);
        }
    }
    if (!f) {
        cout << "-1\n";
        return ;
    }
    cout << k << "\n";
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

## D. Shortest Statement Ever

### 题意：

输入$x$和$y$，找到两个非负整数$p$和$q$，其中$p \& q = 0$，使得$|x - p| + |y - q|$最小化

### 分析：

首先，$p \& q = 0$说明对于二进制位，同一个位的$1$，不能同时分给$p$和$q$

那么其实这就是一道考虑从高位到低位的二进制枚举，我们只需要考虑好，每一位的二进制$1$，该分给$p$或者是$q$即可

为了最小化两者的差值，在分的过程中，我们显然考虑让$p$和$q$都尽可能接近$x$和$y$

假设要让数$p$和数$x$相同，在二进制中其实就是让$p$的二进制在$x$二进制为$1$的位置上也为$1$即可，但是考虑到有些位置我们不能让$p$如愿，所以就会产生两种二进制中的靠近数$x$的方式（$q$和$y$同理）

- 如果某个二进制位，数$p$不能如愿为$1$，那么数$p$可以考虑先放置$0$，之后无论$x$的二进制位是否是$1$，我们都尽可能为$p$放置$1$，这样才能更加接近$x$，进而使得差值更小
- 如果某个二进制位，数$p$不能如愿为$1$，那么也可以考虑在数$p$的上几位中最接近当前位置的$0$的位置，变成$1$，这样使得$p > x$，之后所有位置放置$0$，即可最小化差值

这样一来，考虑的思路有了，该怎么实现呢？

难点在于第二种方式的“数$p$的上几位中最接近当前位置的$0$的位置，变成$1$”中的这个$0$的位置该怎么找到？赛时脑子转不动了......直接暴力！不想了！二进制枚举才32次，直接$32 * 32$的复杂度，考虑无论是$p$或者$q$，都把他们任何位置可能的第二种靠近方法计算出来，再全局取最小值即可

到这里其实可以直接上代码了......再稍微解释下我的代码思路（可结合下面代码看）

- 先换位，使得$y$始终大于$x$，方便后续二进制枚举判断
- 外层二进制枚举的作用其实就是维护$q$始终朝着与$y$值相等的值变化，维护所有二进制位中$y$为$0$的位置，都让$qq$在$q$的基础上，按照第二种靠近方法变大。
- 然后进入内层二进制枚举，考虑让所有$pp$按照第二种靠近方法变大的值放入数组，最后再把内层循环结束的$pp$，也就是按照第一种变小的靠近方法的数也放入数组
- 排序，最后得出的就是当前$qq$与最优的$pp$所构成的答案

- 维护全局最优答案即可，最后记得交换回来

有点啰嗦了......暴力方法应该不是正解，但还是希望对你有帮助

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
    int x, y;
    cin >> x >> y;
    if ((x & y) == 0) {
        cout << x << " " << y << "\n";
        return ;
    }
    int ans1 = 0, ans2 = 0;
    bool f = 0;
    if (x > y) {
        f = 1;
        swap(x, y);
    }
    int p = 0, q = 0;
    bool ff = 0, fff = 0;

    auto cmp = [&] (int a, int b) -> bool {
        return abs(a - x) < abs(b - x);
    };
    int mn = 1e18;

    for (int i = 31; i >= 0; i--) {
        
        if (y & (1 << i)) {
            vector<int> b;
            q += (1 << i);
            int qq = q;
            int pp = 0;
            fff = 0;
            for (int j = 31; j >= 0; j--) {
                if (qq & (1 << j)) {
                    if (x & (1 << j)) {
                        fff = 1;
                    }
                }
                else {
                    if (x & (1 << j)) {
                        pp += (1 << j);
                    }
                    else {
                        if (fff) {
                            pp += (1 << j);
                        }
                        else b.push_back(pp + (1 << j));
                    }
                }
            }
            b.push_back(pp);
            sort(b.begin(), b.end(), cmp);
            if (mn > abs(x - b[0]) + abs(y - qq)) {
                mn = abs(x - b[0]) + abs(y - qq);
                ans1 = b[0];
                ans2 = qq;
            }

        }
        vector<int> b;
        int qq = q + (1 << i);
        int pp = 0;
        fff = 0;
        for (int j = 31; j >= 0; j--) {
            if (qq & (1 << j)) {
                if (x & (1 << j)) {
                    fff = 1;
                }
            }
            else {
                if (x & (1 << j)) {
                    pp += (1 << j);
                }
                else {
                    if (fff) {
                        pp += (1 << j);
                    }
                    else b.push_back(pp + (1 << j));
                }
            }
        }
        b.push_back(pp);
        sort(b.begin(), b.end(), cmp);
        if (mn > abs(x - b[0]) + abs(y - qq)) {
            mn = abs(x - b[0]) + abs(y - qq);
            ans1 = b[0];
            ans2 = qq;
        }
    }
    if (f) swap(ans1, ans2);
    cout << ans1 << " " << ans2 << "\n";
    
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

## 法二（来自yz的解法

### D. Shortest Statement Ever

- 要使 $p\&q=0$ 也即两个数字在二进制每一位上都不同时为 $1$
- 考虑使得 $p , q$ 初始时等于 $x, y$ , 花最少的代价进行修改使得二者按位与为 $0$
- 两个数字在第 $i$ 位同时为 $1$ 时有两种修改方式
  - 将一个数字减去 `1 << i`  , 该数第 $i$ 位为零
  - 找到一个 $j$ 将一个数字加上 `1 << j` , 该数第 $i$ 位可以置零
  - $j$ 满足: 在 $i$ 之前, 同时第 $j$ 位上两数字都是 $0$
- 有三种修改组合: 只用第一种;  只用第二种;  $j$ 位之前用第一种, 之后用第二种
- 不难发现, 第一种修改方式和具体修改哪一个数字无关
- 第二种修改方式进行后可以解决第 $j$ 位之后的所有需要修改的位置
- 同时在后两种组合之中 第二种修改方法最多只会使用 $1$ 次
- 所以我们可以不动一个数, 求三种方法修改另一个数字得到的最小值
- 即: 设 $p = x$ 求 $min(abs(y - q))$ , 再设 $q = y$ 求 $min(abs(x - p))$, 最后取最小的方案
- 考虑最小值的求法:
  - 对于第一种, 从最高位到最地位, 同为 $1$ 时减去`1 << i`
  - 为了最小化结果, 减过一次之后, 如果后有面两数字同时为 $0$ 的位置 $k$ 可以加上 `1 << k`
  - 对于第二种, 将操作的数字的最高位向上推, 直到第一个另一个数字不为零的位置 $j$
  - 为了最小化结果, 该数字加上 `1 << j` 后, 之后为 $1$ 的位置都能减去, 也即使得该数字直接变成 `1 << j`
  - 对于第三种, 从高到低遍历, 同为 $1$ 时减去`1 << i` 
  - 对于每个同时为 $0$ 的位置 $j$  计算当前的值加上 `1 << j` , 减去后面为 $1$ 的位置, 不断取最小值

### 代码

```cpp
void solve() {
    int x, y;
    cin >> x >> y;
    
    auto f = [](int a, int b) -> int {
        if (a & b == 0) 
            return a;

        int cnt = 0;
        int a2 = a;
        while (a2) {
            ++cnt;
            a2 >>= 1;
        }

        while (cnt <= 31 && ((b >> cnt) & 1)) ++cnt;
        a2 = (1 << cnt); //先找到第二种


        int a1 = a;//第一种
        int aa = 0; //第三种
        int tag = 0;//第一种的标记

        for (int i = 31; i >= 0; --i) {            
            int pa = ((a1 >> i) & 1);
            int pb = ((b >> i) & 1);

            if (pa == 1) {
                aa += (1 << i); 
            }

            if (pa & pb == 1) { //同时为零
                a1 -= (1 << i);
                aa -= (1 << i);
                tag = 1;
            }
            if ((pa | pb) == 0) { //同时为一
                if (tag) a1 += (1 << i);
                if (aa + (1 << i) > a && aa + (1 << i) - a < abs(a2 - a)) {
                    a2 = aa + (1 << i);
                }
            }
        }

        if (a2 - a < a - a1) {
            return a2;
        }
        else {
            return a1;
        }
    };

    int p = f(x, y);
    int q = f(y, x);

    if (abs(q - y) < abs(p - x)) {
        cout << x << ' ' << q << '\n';
    }
    else {
        cout << p << ' ' << y << '\n';
    }
} 
```


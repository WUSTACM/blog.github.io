---
title: Educational Codeforces Round 187 (Rated for Div. 2)A-D题解
date: 2026-3-4
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

#  [Educational Codeforces Round 187 (Rated for Div. 2)](https://codeforces.com/contest/2203) A-D 题解

## [ A. Towers of Boxes ](https://codeforces.com/contest/2203/problem/A)

### 题意

使用n个质量为m，耐久度为d的箱子堆叠成塔。对于每个箱子，其上所有箱子的总重量不得超过该箱子的耐久度。 输出使用n个箱子可以达到的最小塔数。
<!--more-->

### 思路

由于只有一种箱子，只需要考虑最底部的箱子的承受个数，+1即为塔的最大高度。最小塔数= $\lceil$ n/塔的最大高度 $\rceil $。

### 代码

``` cpp
#include <bits/stdc++.h>
using namespace std;
using ll = long long;

void solve()
{
    ll n, m, d; cin >> n >> m >> d;
    ll t = d / m + 1;
    cout << (n + t - 1) / t << endl;
}

int main()
{
    ios::sync_with_stdio(0);
    cin.tie(0), cout.tie(0);

    ll _ = 1;
    cin >> _;
    while (_--)
    {
        solve();
    }

    return 0;
}
```

时间复杂度:$O(T)$

## [ B. Beautiful Numbers ](https://codeforces.com/contest/2203/problem/B)

### 题意

设$ F(x) $为$x$十进制每一位的数字之和，定义 **漂亮数** 为满足$F(F(x)) = F(x)$ 的 $x$。

给你一个整数x ， 你可以对这个整数执行如下操作：改变x某一位的数字，不能出现前导0。

求使得x变为 **漂亮数** 的最少操作数。

### 思路

令$y = F(x)$ ，可以知道 **漂亮数** 的满足$F(y) = y$ ，通过这个等式可以推出$ F(x) = y \leq 10$ 。

题目要求最少操作数，可以转化为$x$ 未被更改的位置的最大保留数，这些被保留的数字之和 $\leq 10$。

可以贪心的从小到大保留，注意特判前导0。

### 代码

```cpp
#include <bits/stdc++.h>
using namespace std;
using ll = long long;

void solve()
{
    string s;
    cin >> s; // 使用字符串输入方便拆位
    int f = s[0] - '0';
    auto a = vector(0, 0);
    for(auto c : s){
        a.push_back(c - '0');
    }
    sort(a.begin(), a.end());

    ll sum = 0, n = a.size(), i = 0;
    for (i = 0; i < n;i++){
        if(sum+a[i]>=10)
            break;
        sum += a[i];
    }
    i--;
    int ans = n - i - 1;
    if(a[i]>=f || (a[i]<f && sum<9)) // 正常判断+特判
        cout << ans << endl;
    else
        cout << ans + 1 << endl;
}

int main()
{
    ios::sync_with_stdio(0);
    cin.tie(0), cout.tie(0);

    ll _ = 1;
    cin >> _;
    while (_--)
    {
        solve();
    }

    return 0;
}
```

### 时间复杂度

$ log_{10}{10^{18}} = 18$ 可以近似为常数，时间复杂度为$O(T) / O(18T)$ 

## [ C. Test Generator ](https://codeforces.com/contest/2203/problem/C)

### 题意

给定两个整数$s,m$，构造一个长度为$n$数组$a$，使其满足：

1. $ \sum_{i=1}^{n}a_i = s$
2.  对于每个 $i$ ，$a_i \& m = a_i$ 

输出最小的可能长度$n$，或者报告不存在。

### 思路

每一个高位一定可以用更多的低位替换掉，即对于$i<j  \rightarrow 2^i = k*2^j$ ，所以可以从高位到低位枚举。长度$n$越大，可以表示的$s$就越多，答案具有单调性，故使用二分答案加速。

### 代码

```cpp
#include <bits/stdc++.h>
using namespace std;
using ll = long long;

void solve()
{
    ll s, m;
    cin >> s >> m;
    if(s%(m&-m)){ // 特判，高位无法表示低位
        return cout << -1 << endl, void();
    }

    auto check = [&](ll x) -> bool
    {
        ll tm = m;
        ll ts = s;

        while(tm){
            ll cur = 1ll << __lg(tm);
            if(cur<=ts/x){
                ts -= cur * x;
            }
            else{
                ts %= cur;
            }

            tm -= cur;
        }
        return ts == 0;
    };

    ll l = 1, r = 1e18, mid, ans = 0; // r可以设置为s
    while(l<=r){
        mid = (r - l) / 2 + l;
        if(check(mid)){
            ans = mid;
            r = mid - 1;
        }
        else{
            l = mid + 1;
        }
    }
    cout << ans << endl;
}

int main()
{
    ios::sync_with_stdio(0);
    cin.tie(0), cout.tie(0);

    ll _ = 1;
    cin >> _;
    while (_--)
    {
        solve();
    }

    return 0;
}
```

### 时间复杂度

二分答案复杂度：$O(logs)$

枚举行为：$O(logs)$

整体时间复杂度：$O(log^2s)$

## [ D. Divisibility Game ](https://codeforces.com/contest/2203/problem/D)

### 题意

Alice和Bob正在玩游戏，他们面前有两个数组$a,b$。轮到他们时，他们需要在数组$a$中选择$x$，在数组$b$中选择$y$。

- Alice选择的$x,y$需满足$y\%x=0$
- Bob选择的$x,y$需满足$y\%x\neq 0$

选择完$x,y$之后，删去$b$数组中的$y$，保留$a$数组中的$x$，有多个$y$仅删除一个，不能移动的玩家会输。判断谁会赢。

### 思路

可以把$y$分成3类：只有Alice能选的，只有Bob能选的，都能选的。

1. 第一类数$y1$要求数组$a$中的$x$，都有$y1\%x=0$ ，整合一下条件，得到$y1 = k*lcm(a_i),1\leq i \leq n, k$ 为任意整数
2. 第二类数$y2$要求数组$a$中的$x$，都有$y1\%x\neq0$ 
3. 第三类数$y3 = m-y1-y2$

在玩的最优的情况下，两人会先从$y3$开始选，再选只能各自选的。

### 代码

```cpp
#include <bits/stdc++.h>
using namespace std;
using ll = long long;
const ll inf = 1e9 + 7;

void solve()
{
	ll n, m;
	cin >> n >> m;
	vector<int> a(n + m + 1, 0), b(m + n + 1);
	ll lcm = 1;
	for (ll i = 1; i <= n;i++){
		ll t;
		cin >> t;
		lcm = min(inf, lcm*t/__gcd(lcm, t)); // 防溢出
		a[t] = 1;
	}
	for (ll i = 1; i <= m;i++){
		ll t;
		cin >> t;
		b[t]++;
	}

	vector<ll> vis(n + m + 1, 0); // 求第二类数的准备
	for (int j = 1; j <= n + m;j++) 
	{ 
		int x = j;
		if(vis[x] || !a[x])
			continue;
		for (int i = x; i <= n + m;i+=x){
			vis[i] = 1;
		}
	}
	// for (int i = 1; i <= n + m;i++){
	// 	cout << vis[i] << ' ';
	// }
	// cout << lcm << endl;

	ll ca = 0, cb = 0; // 第一类数，第二类数
	for (int i = 1; i <= n + m;i++)
	{
		int x = i, y = b[i];
		cb += !vis[x] ? y : 0;
		if(x%lcm==0){
			ca += y;
		}
	}
	

	int rest = m - ca - cb; // 第三类数
	if(rest&1) ca++; // Alice先手，多的是Alice拿
	// cout << ca << ' ' << cb << endl;
	if(ca>cb)
		cout << "Alice" << endl;
	else
		cout << "Bob" << endl;
}

int main()
{
	ios::sync_with_stdio(0);
	cin.tie(0), cout.tie(0);

	ll _ = 1;
	cin >> _;
	while (_--)
	{
		solve();
	}

	return 0;
}
```

### 时间复杂度

分析每一段循环：

```cpp
for (ll i = 1; i <= n;i++){
    ll t;
    cin >> t;
    lcm = min(inf, lcm*t/__gcd(lcm, t)); 
    a[t] = 1;
}
for (ll i = 1; i <= m;i++){
    ll t;
    cin >> t;
    b[t]++;
}
```

输入输出：$O(max(n,m))$

```cpp
for (int i = 1; i <= n + m;i++)
{
    int x = i, y = b[i];
    cb += !vis[x] ? y : 0;
    if(x%lcm==0){
        ca += y;
    }
}
```

计算答案：$O(m+n)$

```cpp
for (int j = 1; j <= n + m;j++) 
{ 
    int x = j;
    if(vis[x] || !a[x])
        continue;
    for (int i = x; i <= n + m;i+=x){
        vis[i] = 1;
    }
}
```

~~双层循环：O((n+m)^2)~~

注意内层循环：

```cpp
for (int i = x; i <= n + m;i+=x){
    vis[i] = 1;
}
```

这里循环的时候是$i+=x$ ，所以内层循环的复杂度为$O(\frac{n+m}{x})$

那么总时间复杂度为$(n+m) \sum_1^{m+n}\frac{1}{x}dx = (m+n)ln(m+n)$

即：$O((n+m)log(n+m))$


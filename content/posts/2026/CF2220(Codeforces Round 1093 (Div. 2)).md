---
title: "Codeforces Round 1093 (Div. 2)A-D题解"
description: "对于长度为n的数组a，如果$ai$可以被表示为$a{[1,i-1]}$的任意子集之和，则称数组a在i位置被阻塞$(1\\leq i \\leq n)$。"
date: "2026-04-14 00:00:00"
updated: "2026-04-14 00:00:00"
permalink: "/2026/04/14/CF2220(Codeforces Round 1093 (Div. 2))"
categories: ["题解"]
tags: ["题解"]
---

#  [Codeforces Round 1093 (Div. 2)](https://codeforces.com/contest/2220) A-D题解

## [ A. Blocked ](https://codeforces.com/problemset/problem/2220/A)

### 题意

对于长度为n的数组a，如果$a_i$可以被表示为$a_{[1,i-1]}$的任意子集之和，则称数组a在i位置被阻塞$(1\leq i \leq n)$。

找出可能的a的重排列，使得对于所有的$1\leq i\leq n$都不被阻塞，或者报告不存在这样的数组。


### 思路

我们可以从大到小排列a数组，这样对于任意的$i$，都有$a_{[1,i-1]}$的任意子集之和大于等于$a_i$。

当且仅当$a_{i-1}=a_i$时取等，特判去重的情况就行了。

### 代码

```cpp
#include <bits/stdc++.h>
using namespace std;
using ll = long long;

void solve()
{
    int n;
    cin >> n;
    vector<int> a(n);
    for(auto &i : a){
        cin >> i;
    }
    sort(a.begin(), a.end(), greater<>());
    vector<int> b = a;
    b.erase(unique(b.begin(), b.end()), b.end());
    if(b.size()!=a.size())
        return cout << -1 << endl, void();
    for(auto i : a){
        cout << i << ' ';
    }
    cout << endl;
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

## [ B. OIE Excursion ](https://codeforces.com/problemset/problem/2220/B)

### 题意

在最初(第0秒)时，第i位的计数器为$a_i,(1\leq i\leq n)$，每过一秒，所有计数器+1，如果计数器等于m，则计数器为0。

即在过去x秒之后，计数器的值为$(a_i+x)(\mod m),m\geq2$

Hector从0位置开始出发，目标是到达n+1位置。 在每一秒结束时，Hector可以选择停留在当前位置，向左移动一个位置，或者向右移动一个位置。注意，Hector不能走到位置 0 的左边。 

 当且仅当在一秒开始时，赫克托耳在位置 i，并且第一个志愿者的计时器为 0 时，赫克托耳被抓住。 

判断Hector能否成功逃脱。

### 思路

分两种情况讨论：

1. 当相邻两个计数器的计数不同时，由于每过一秒，计数器就会+1，所以总会出现$a_i\neq0 \&\& a_{i+1}=0(1\leq i\leq n-1)$的情况，此时Hector往右走，必有$a_{i+1}\neq0$
2. 当多个连续的计数器的计数相同时，计数器的检查周期为m，所以当连续计数器的数量大于等于m时，即为不合法答案，反之合法。

### 代码

```cpp
#include <bits/stdc++.h>
using namespace std;
using ll = long long;

void solve()
{
    ll n, m;
    cin >> n >> m;
    vector<ll> a(n + 1, 0);
    for (int i = 1; i <= n;i++){
        cin >> a[i];
    }

    ll cur = a[1];
    ll maxl = 1;
    ll l = 1;
    for (int i = 2; i <= n;i++){
        if(a[i]!=cur){
            cur = a[i];
            l = 1;
        }
        else{
            l++;
        }
        maxl = max(maxl, l);
    }
    if(maxl<m)
        cout << "YES" << endl;
    else
        cout << "NO" << endl;
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

## [ C. Grid L ](https://codeforces.com/problemset/problem/2220/C)

### 题意

给定p个一形，q个L形的图案(L形由两个一形图案90°拼接)。

判断是否可以利用这些碎片拼成n*m的网格。

### 思路

对于一个$n*m$的网络，假设有n行m列，可以拆分成$n*(m+1)$个纵边界和$(n+1)*m$个横边界。

- 对于L形，一定可以贡献q个纵边界和q个横边界。
- 对于一形，边界贡献总数为p。

设一形对纵边界的贡献数为$k(0\leq k \leq p)$，则有如下方程组：

- $n*m+n=q+k$
- $n*m+m=q+p-k$

分别消去$n*m,k$项得

- $n-m=p-2*k$
- $2*n*m+n+m=2*q+p$

对于一式，消去k的影响，有$abs(n-m)\leq p$

使用二分逼近二式，再通过$O(1)$判断是否符合一式。

### 代码

```cpp
#include <bits/stdc++.h>
using namespace std;
using ll = long long;

void solve()
{
    ll p, q;
    cin >> p >> q;

    for (ll m = 1; m <= sqrt(p + q);m++){
        auto check = [&](ll n) -> ll
        {
            return 2 * n * m + m + n >= 2*q+p;
        };

        ll l = 0, r = p + q, mid, ans = 0;
        while(l<=r){
            mid = l + r >> 1;
            if(check(mid)){
                r = mid - 1;
                ans = mid;
            }
            else{
                l = mid + 1;
            }
        }
        if(2*m*ans+m+ans==2*q+p && abs(ans-m)<=p){
            return cout << ans << ' ' << m << endl, void();
        }
    }
    cout << -1 << endl;
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

## [D. Unique Values ](https://codeforces.com/problemset/problem/2220/D2)

### 题意

给定长为2*n+1的隐藏数组，其中出现了1到n的整数，除了一个数出现了三次，其他数均出现了两次。

目标是找出出现三次的数字的下标。

- 查询："? k $s_1$ $s_2$ ... $s_k$"，返回子序列下标对应的集合$[a_{s_1},a_{s_2},...,a_{s_n}]$中出现不重复值的个数，最多查询33次。

### 思路

~~由于题目中最大数据为1000，而$lg(2001)\leq11$ ，故考虑二分~~

对于一个数，考虑其对子序列长度和子序列返回值奇偶性的贡献，设查询中有cnt个这个数：

- cnt=1，分别贡献奇数长度和奇数返回值
- cnt=2，分别贡献偶数长度和偶数返回值
- cnt=3，分别贡献**奇数长度**和**偶数返回值**

不难发现，当子序列中包含三个相同的数时，子序列长度和子序列返回值一定是奇偶性不同的，而数组中仅有一个可能的cnt为三的整数。

所以，根据从右到左的顺序先后二分三个坐标的值，每次查询前mid个坐标+之前出现过的目标坐标组成的子序列，如果子序列长度和子序列返回值奇偶性相同，向右扩展区间，否则向左缩小区间。按照这个步骤依次求出三个坐标，总操作数$op \leq 3*logn \leq 33$。

### 代码

```cpp
#include <bits/stdc++.h>
using namespace std;
using ll = long long;

int query(vector<int>& a){
	cout << "? " << a.size() << ' ';
	for(auto i : a){
		cout << i << ' ';
	}
	cout << endl;
	int res;
	cin >> res;
	return res;
}

void solve()
{
	int n;
	cin >> n;

	int l = 1, r = n * 2 + 1, mid;
	// cout << 'z' << endl;
	while(l<r){
		mid = l + r >> 1;
		vector<int> q;
		for (int i = 1;i<=mid;i++){
			q.push_back(i);
		}
		int t = q.size() - query(q);
		if(t&1){
			r = mid;
		}
		else{
			l = mid + 1;
		}
	}
	int z = l;

	// cout << 'y' << endl;
	l = 1, r = z - 1;
	while(l<r){
		mid = l + r >> 1;
		vector<int> q;
		for (int i = 1;i<=mid;i++){
			q.push_back(i);
		}
		q.push_back(z);
		int t = q.size() - query(q);
		if(t&1){
			r = mid;
		}
		else{
			l = mid + 1;
		}
	}
	int y = l;

	l = 1, r = y - 1;
	// cout << 'x' << endl;
	while(l<r){
		mid = l + r >> 1;
		vector<int> q;
		for (int i = 1;i<=mid;i++){
			q.push_back(i);
		}
		q.push_back(y);
		q.push_back(z);
		int t = q.size() - query(q);
		if(t&1){
			r = mid;
		}
		else{
			l = mid + 1;
		}
	}
	int x = l;
	cout << "! " << x << " " << y << " " << z << endl;
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


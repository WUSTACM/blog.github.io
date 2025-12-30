---
title: CF2182(Educational Codeforces Round 186)题解
date: 2025-12-30
tags: [题解]
categories: [算法]
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
comments: true
indexing:
breadcrumb:
leftbar:
h1:
type:
---

# CF2182(Educational Codeforces Round 186)题解

[比赛链接](https://codeforces.com/contest/2182)

## A

### 题意

给你一串仅包含'0','2','5','6'的字符串 s，当其包含子字符串“2026”，或不包含“2025”时称为“New Year”字符串，你可替换 s 中的任意字符为'0','2','5','6'，任意次，求使 s 成为“New Year”字符串的最小操作数。

<!--more-->

### 思路

这题可以枚举字符串的初始位置，判断是否出现过“2025”或者“2026”，由于答案只跟“2025”和“2026”有关，我们可以根据这两个字符串的出现情况进行情况分类讨论。

1. 当字符串中出现“2026”时，我们无需操作。
2. 当字符串中仅出现“2025”没出现“2026”时，我们只需操作一步将‘5’变成‘6’，这样出现了“2026”，就无需考虑其他“2025”了。

### 代码

```cpp
#include <bits/stdc++.h>
using namespace std;
using ll = long long;

void solve()
{
    int n;
    cin >> n;
    string s;
    cin >> s;
    s = ' ' + s;
    int flag = 0;
    for (int i = 1; i <= n-3;i++){ // 防越界
        string t = "";
        for (int j = 0; j < 4;j++){
            t = t + s[i+j];
        }
        if(t=="2025")
            flag = 1;
        if(t=="2026"){
            flag = 0;
            break;
        }
    }
    cout << flag << endl;
}

int main()
{
    ios::sync_with_stdio(0);
    cin.tie(0);
    cout.tie(0);

    int _ = 1;
    cin >> _;
    while (_--)
    {
        solve();
    }

    return 0;
}
```

## B

### 题意

给你两种巧克力原料公斤数 a,b，让你不能连续两层使用同一原料制作蛋糕，每一层使用$2^{i-1}$的原料，求蛋糕的最大层数。

### 思路

照着模拟就行

```cpp
#include <bits/stdc++.h>
using namespace std;
using ll = long long;

void solve()
{
    int a, b;
    cin >> a >> b;
    int ans = 0, cnt = 0;
    int ta = a, tb = b;
    while(1){
        if(cnt&1){
            if(ta>=(1<<cnt)){
                ta -= (1 << cnt);
                cnt++;
            }
            else
                break;
        }
        else{
            if(tb>=(1<<cnt)){
                tb -= (1 << cnt);
                cnt++;
            }
            else
                break;
        }
    }
    // cout << cnt << ' ';
    ans = max(ans, cnt);
    ta = a, tb = b;
    cnt = 0;
    while(1){
        if(cnt&1){
            if(tb>=(1<<cnt)){
                tb -= (1 << cnt);
                cnt++;
            }
            else
                break;
        }
        else{
            if(ta>=(1<<cnt)){
                ta -= (1 << cnt);
                cnt++;
            }
            else
                break;
        }
    }
    ans = max(ans, cnt);
    // cout << cnt << ' ';
    cout << ans << endl;
}

int main()
{
    ios::sync_with_stdio(0);
    cin.tie(0);
    cout.tie(0);

    int _ = 1;
    cin >> _;
    while (_--)
    {
        solve();
    }

    return 0;
}
```

## C

### 题意

给你三个循环数组 a,b,c，对于三元组(i,j,k)，求使得数组 a,b,c 满足$a_i<b_j<c_k,a_{i+1}<b_{j+1}<c_{k+1},...a_{i+n-1}<b_{j+n-1},c_{k+n-1}$ 的个数，下标均对 n 取余。

### 思路

由于这题 n 的范围不大，可以尝试$O(n^2)$解法。

对于三元组个数的问题，我们可以尝试从中间入手，先考虑 a,b 之间的关系，再考虑 a,c 之间的关系，这两个尝试都是$O(n^2)$的。由于满足 a,b 和 b,c 之间关系的每一个下标 i 都满足$a_i<b_i$且$b_i<c_i$，所以$a_i<c_i$。那么此时的方案数为满足两个关系的个数相乘。最后乘上循环数组的长度（即循环次数）就是最终答案了。

### 代码

```cpp
#include <bits/stdc++.h>
using namespace std;
using ll = long long;

void solve()
{
    int n;
    cin >> n;
    vector<int> a(n, 0), b(n, 0), c(n, 0);
    auto input = [&](vector<int> &arr) -> void
    { // 别学这个。。。
        for(auto &i : arr)
        {
            cin >> i;
        }
    };
    input(a), input(b), input(c);

    ll cnt1 = 0, cnt2 = 0;
    for (int i = 0; i < n;i++){
        // cout << a[i] << ' ';
        int add = 1;
        for (int j = 0; j < n;j++){
            if(b[j]<=a[(i+j)%n])
                add = 0;
        }
        cnt1 += add;
    }
    // cout << endl;


    for (int i = 0; i < n;i++){
        int add = 1;
        for (int j = 0; j < n;j++){
            if(c[j]<=b[(i+j)%n])
                add = 0;
        }
        cnt2 += add;
    }
    cout << cnt1 * cnt2 * n << endl;
}

int main()
{
    ios::sync_with_stdio(0);
    cin.tie(0);
    cout.tie(0);

    int _ = 1;
    cin >> _;
    while (_--)
    {
        solve();
    }

    return 0;
}
```

### 注意事项

STL 中的 map 和 set 单次操作次数均为$logn$，时间复杂度如果为$O(n^2logn)$会超时,请在代码中使用了这两个 STL 容器的同学自行回去重写代码。

还有一点就是答案会超过 int 的储存上限，记得开 long long。

## D

### 题意

某种排列顺序使得所有人都能挂上自己盒子内或公共盒子内的装饰品，求这种排列的个数。

### 思路

不妨假设所有人都优先从自己的盒子取出装饰品。$maxn$为除公共盒子之外的所有盒子的最大值，若这个人能挂上$maxn$个装饰品，则其他人必须挂上$maxn-1$个装饰品。此时我们可以预处理数组，从公共盒子中取出装饰品，使所有装饰品小于$maxn$的盒子的装饰品数量达到$maxn-1$，并记录装饰品等于$maxn$的盒子个数，称为$cnt$。

可以分为一下 3 种情况讨论

1. 公共盒子的装饰品个数不足以使所有非最大值盒子的数量达到$maxn-1$。这时这种排列就不存在，答案为 0 。
2. 公共盒子的数量可以使所有非最大值的数量达到$maxn$。这时所有人都可以挂上$maxn$个装饰品，后续每个人都必须从公共盒子取出装饰品，直到公共盒子的装饰品个数为 0，可以不论顺序之分，答案为$n!$。
3. 公共盒子的数量不能使所有非最大值的数量达到$maxn$。先确定最大值排列个数，为$cnt!$；再确定非最大值排列个数，为$(n-cnt)!$;最后根据公共盒子的装饰品数量，判断非最大值有多少个数可以插入到最大值排列中，根据观察，这种插入方法有$C(cnt+公共盒子装饰品数量，公共盒子装饰品数量)$，答案即为 3 者乘积。

### 代码

```cpp
#include <bits/stdc++.h>
using namespace std;
using ll = long long;
const ll mod = 998244353;

vector<ll> f(1e6 + 10, 1), inv(1e6 + 10, 1);

ll qpow(ll a,ll b){
	ll res = 1;
	while(b){
		if(b&1)
			res = res * a % mod;
		a = a * a % mod;
		b >>= 1;
	}
	return res;
}

ll C(ll n,ll m){
	if(n<m)
		return 0;
	return f[n] * inv[m] % mod * inv[n - m] % mod;
}

void solve()
{
	ll n; cin >> n;
	vector<ll> a(n + 1, 0);
	for(auto &i : a){
		cin >> i;
	}

	ll maxn = 0;
	for (ll i = 1; i <= n;i++){
		maxn = max(maxn, a[i]);
	}
	ll cnt = n;
	for (ll i = 1; i <= n;i++){
		if(a[i]<maxn){
			a[0] -= maxn - 1 - a[i];
			a[i] = maxn - 1;
			cnt--;
		}
	}
	// cout << cnt << ' ' << a[0] << endl;
	if(a[0]<0){
		return cout << 0 << endl, void();
	}
	if(n-cnt<=a[0]){
		return cout << f[n] << endl, void();
	}
	// cout << n - cnt << ' ' << cnt - a[0] << ' ';
	cout << f[n - cnt] * f[cnt] % mod * C(cnt + a[0], a[0]) % mod << endl;
}

int main()
{
	ios::sync_with_stdio(0);
	cin.tie(0);
	cout.tie(0);

	for (ll i = 1; i <= 1e6;i++){
		f[i] = f[i - 1] * i % mod;
		inv[i] = qpow(f[i], mod - 2);
	}

	ll _ = 1;
	cin >> _;
	while (_--)
	{
		solve();
	}

	return 0;
}
```

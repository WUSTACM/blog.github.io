---
title: "Codeforces Round 1082 (Div. 2)A-D题解"
description: "当你在点(a,b)时，你可以走到$(a+2,b+1),(a+3,b),(a+4,b-1)$，判断是否有一条$(0,0)-(x,y)$的路线"
date: "2026-02-24 00:00:00"
updated: "2026-02-24 00:00:00"
permalink: "/2026/02/24/CF2202(Codeforces Round 1082 (Div. 2))"
categories: ["题解"]
tags: ["题解"]
---

#  Codeforces Round 1082 (Div. 2)  题解(A-D)

## [ A. Parkour Design ](https://codeforces.com/contest/2202/problem/A)

### 题意

当你在点(a,b)时，你可以走到$(a+2,b+1),(a+3,b),(a+4,b-1)$，判断是否有一条$(0,0)->(x,y)$的路线


### 思路

对于这3个向量$(2,1),(3,0),(4,-1)$ ，可以看出$x+y \equiv 0(mod 3)$ ；所有满足条件的点一定是$-x/4 \leq y \leq x/2$ 的。

### 代码

``` cpp
#include <bits/stdc++.h>
using namespace std;
using ll = long long;

void solve()
{
    ll x,y;
    cin >> x >> y;
    if((x+y)%3==0 && y*2<=x && y*4>=-x)
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

## [ B. ABAB Construction ](https://codeforces.com/contest/2202/problem/B)

### 题意

存在字符串$T$ ，满足奇数位为$'a'$，偶数位为$'b'$。使用$T$按照如下方法生成字符串$S$。

1. 初始化$S$ 为空字符串。
2. 从$T$ 中删除**第一个**字母或**最后一个**字母，并将该字母附加到 $S$ 中。
3. 如果 为空，终止并返回字符串 $S$ 。否则，返回第二步。

给出字符串$S$，判断$S$ 是不是由$T$生成的。

### 思路

我们总有两个选项，取第一个字母或最后一个字母（若仅剩一个字母，看作两个不同的字母），取完一个字母之后，另一个字母的可选择数量就会增加。（例如：```ababa```取得```a```之后，变成```abab```或者```baba```，```a```的可选择数量-1，```b```的可选择数量+1)

设$a,b$分别为可选字符$'a','b'$的数量，则总是有$a+b=2$ ，分类讨论一下就只有3种状态：$(2,0),(1,1),(0,2)$。

从左到右$a--,b++$ ，从右到左$a++,b--$ 。

也就是说，通过字符串$S$，可以得到状态转移方程，并且在这个情况下，$a,b$的数量一定满足字符串$T$的要求。

接下来考虑终态，当仅剩一个字符时，状态只可能是$(2,0)$或者$(0,2)$ ，所以最后的状态一定是$(1,1)$才能满足答案。

### 代码

```cpp
#include <bits/stdc++.h>
using namespace std;
using ll = long long;

void solve()
{
    int n;
    cin >> n;
    string str;
    cin >> str;

    str = ' ' + str;
    auto dp = vector(n + 1, vector(3, -1)); // 记忆化搜索
    auto dfs = [&](auto self, int cur, int s) -> int
    {
        // cout << cur << ' ' << s << endl;
        if(cur==n+1)
        {
            return s == 1;
        }
        if(dp[cur][s]!=-1)
            return dp[cur][s];
        int res = 0;
        if(str[cur]!='a' && s>0)
        {
            res |= self(self, cur + 1, s - 1);
        }
        if(str[cur]!='b' && s<2)
        {
            res |= self(self, cur + 1, s + 1);
        }
        return dp[cur][s] = res;
    };

    if(dfs(dfs,1,n%2==0)) // 初态可能是(2,0),(1,1)
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

## [ C1. Lost Civilization (Easy Version) ](https://codeforces.com/contest/2202/problem/C1)

### 题意

你可以进行如下操作：

- 选择任意索引 $1≤i≤|x| $，并在元素$x_i$ 之后插入$ (x_i+1) $ 

给你一段长为n的数组a，找到生成a数组的最短序列的长度。

### 思路

这里提供一个并查集的思路。

由于操作的特殊性，如果索引$i+1$的数可以被之前的数生成，那么$ x_{find(i)} \leq x_{i+1}-1 \leq x_i$

记录不同下标的个数就是最终答案了。

### 代码

``` cpp
#include <bits/stdc++.h>
using namespace std;
using ll = long long;

vector<int> f(5e5 + 10, 0);

int find(int x) { return f[x] = f[x] == x ? f[x] : find(f[x]); }

void solve()
{
    int n;
    cin >> n;
    vector<int> a(n+1,0);
    for (int i = 1; i <= n;i++){
        f[i] = i;
        cin >> a[i];
    }

    for(int i = 2;i<=n;i++){
        int maxn = a[i - 1], minn = a[find(i - 1)];
        if(a[i]-1>=minn && a[i]-1<=maxn)
            f[i] = find(i - 1);
    }

    vector<int> vis(n+1,0);
    int ans = 0;
    for (int i = 1;i<=n;i++){
        ans += !vis[find(i)];
        vis[find(i)] = 1;
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

## [ C2. Lost Civilization (Hard Version) ](https://codeforces.com/contest/2202/problem/C2)

### 题意

在C1的基础上，求生成每一段子数组的最短序列的长度之和

### 思路

生成一个$prev$ 数组，表示当前位置可以被生成的最右下标，0表示不存在。

在$O(n)$的时间里统计每个下标在初始数组的贡献。

### 代码

```cpp
#include <bits/stdc++.h>
using namespace std;
using ll = long long;

vector<ll> f(5e5 + 10, 0);

ll find(ll x) { return f[x] = f[x] == x ? f[x] : find(f[x]); }

void solve()
{
    ll n;
    cin >> n;
    vector<ll> a(n + 1, 0);
    for (ll i = 1; i <= n; i++)
    {
        f[i] = i;
        cin >> a[i];
    }

    for (ll i = 2; i <= n; i++)
    {
        ll maxn = a[i - 1], minn = a[find(i - 1)];
        if (a[i] - 1 >= minn && a[i] - 1 <= maxn)
            f[i] = find(i - 1);
    }

    map<ll, ll> mp;
    vector<ll> prev(n + 1, 0);
    for (ll i = 1; i <= n; i++)
    {
        if (mp.count(a[i] - 1) && find(i)==find(i-1))
        {
            prev[i] = mp[a[i] - 1];
        }
        mp[a[i]] = i;
    }

    ll ans = 0;
    for (ll i = 1; i <= n; i++)
    {
        ans += (n - i + 1) * (i - prev[i]);
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

## [ D. Recollect Numbers ](https://codeforces.com/contest/2202/problem/D)

### 题意

有 $2n$ 卡片，上面写着数字 $1,1,2,2,…,n,n $ 。换句话说，对于所有 $j=1,2,…,n$ ，有**恰好**张编号为 $j $ 的 2 张牌。每张卡片的正面只写了一个数字。

你将玩一个抛牌游戏。最初，所有 $2n$ 牌都是背面的（没有数字的那一面）。在每一回合中，你正好翻转两张牌。如果两张牌的数字相同，你就丢弃这两张牌。否则，你把它们翻转回原来的位置。当所有 $2n$ 牌被丢弃时，你就赢了。请注意，你不必同时翻转两张牌，所以你可以在看到第一张牌上的数字后决定选择第二张牌。

- 如果有两张牌**你已经翻转**和**有相同的数字**，翻转这两张牌。 

- 否则，翻转**第一张牌** ，你从来没有翻转到第一张。假设这张卡的号码是 x 。

- 之后，如果有另一张你之前翻转过的卡片，并且数字是 x ，则翻转该卡。

- 否则，将**第一张牌** （**包括本回合**）翻转为第二张牌。


针对上述算法，您必须解决以下问题。

- 给定 n 和 k ，请找出 $2n$ 张牌的摆法，上面的算法需要 k 次才能赢得游戏，或者报告不存在。

### 思路

- 下限：要进行n组消除，所以是n
- 上限：当除2以外的偶数位出现之前出现过的数，且奇数位为没出现过的数时，会多消耗一步，加上2位置多消耗的一步，总共多了n-1步的不删牌操作，所以上限为2n-1

所以当$n \leq k \leq 2n-1$ 时，前k-n+1组构造多消耗一步，剩下的构造相邻的数

### 代码

``` cpp
#include <bits/stdc++.h>
using namespace std;
using ll = long long;

void solve()
{
	ll n, k;
	cin >> n >> k;
	if (k >= n && n * 2 > k)
	{
		cout << "YES" << endl;
		k -= n-1;
		for (int i = 0; i < k; i++)
		{
			cout << (i + 1) % k + 1 << ' ' << i + 1 << ' ';
		}
		for (int i = k; i < n; i++)
		{
			cout << i + 1 << ' ' << i + 1 << ' ';
		}
		cout << endl;
	}
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




---
title: Codeforces Round 1083 (Div. 2)A-D题解
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

#  [Codeforces Round 1083 (Div. 2)](https://codeforces.com/contest/2205) A-D题解

# [ A. Simons and Making It Beautiful ](https://codeforces.com/contest/2205/problem/A)



### 题意

给你一个长为n的排列，最多交换一次下标，使得$max(a_j) = i,1\leq j \leq i$的个数最小
<!--more-->

### 思路

把最大的数换到第一个位置，这样前缀最大值就是n，个数为1。可以证明这样的构造满足题意，对于一个长为n的排列，一定满足$max(a_j) = n,1\leq j \leq n$，所以答案一定大于1。

### 代码

```cpp
#include <bits/stdc++.h>
using namespace std;
using ll = long long;

void solve()
{
    int n;
    cin >> n;
    auto a = vector(n + 1, 0);
    for (int i = 1; i <= n; i++)
    {
        cin >> a[i];
    }
    for (int i = 1; i <= n; i++)
    {
        if (a[i] == n)
            swap(a[1], a[i]);
    }
    for (int i = 1; i <= n; i++)
    {
        cout << a[i] << ' ';
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

时间复杂度：$O(n)$

## [B. Simons and Cakes for Success](https://codeforces.com/contest/2205/problem/B)

### 题意

求出使 $n$ 是 $k^n$ 的约数的最小**正**整数 $k$ 。 

### 思路

对于任意正整数$n$，一定由小于$n$个整数质因子构成。将$n$拆成质因子即可。

### 代码

```cpp
#include <bits/stdc++.h>
using namespace std;
using ll = long long;

void solve()
{
    ll n;
    cin >> n;
    ll t = sqrt(n);
    ll ans = 1;
    for (int i = 2; i <= t;i++){
        if(n%i)
            continue;
        ans *= i;
        while(n%i==0){
            n /= i;
        }
    }
    if(n>1)
        ans *= n;
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

时间复杂度：$O(T*\sqrt{n})$

## [ C. Simons and Posting Blogs ](https://codeforces.com/contest/2205/problem/C)

### 题意

有 $n$ 博客。 第$i$个博客以数组 $a_i=[a_{i,1},a_{i,2},…,a_{i,l_i}]$ 的顺序提到了 $l_i$ 个用户。

您将发布所有 $n$ 博客。让我们维护一个序列 $Q$ 来描述您最近提到的用户列表。以下操作需要 $n$ 次：

-选择一个**未发布的**博客 $i ( 1≤i≤n )$，然后发布它。这将按顺序对每个 $1≤j≤l_i$ 进行以下操作：

—如果 $a_{i,j}$ 已经存在于 $Q$ 中，那么将 $a_{i,j}$ 移到 $Q$ 的开头。

—否则，在 $Q$ 开头插入 $a_{i,j}$ 。

在所有 $n$ 操作之后，查找字典顺序上最小的 $Q$  。

### 思路

$n$只有3000，考虑$O(n^2) / O(n^2logn)$解法。

后插入的值不会被先插入的值影响，故从后往前，按照字典序推。

枚举过程如下：

1. 将当前存在未访问过的用户的博客放入枚举列表中。
2. 枚举每一个枚举列表的博客的最尾端，找到字典序最小的数，构造出新的枚举列表。
3. 输出最小的数，将该用户标记为以访问。
4. 回到步骤2，直到新的枚举列表中出现不存在未访问过用户的博客，退出循环。

当所有用户都被访问时，输出答案即可。

### 代码

``` cpp
#include <bits/stdc++.h>
using namespace std;
using ll = long long;

void solve()
{
    int n;
    cin >> n;
    auto a = vector(n + 1, vector(0, 0));
    map<int, int> mp;
    for (int i = 1; i <= n; i++)
    {
        int l;
        cin >> l;
        while (l--)
        {
            int t;
            cin >> t;
            mp[t] = 1;
            a[i].push_back(t);
        }
    }

    map<int, int> vis;
    auto it = mp.begin();
    for (; it != mp.end();)
    {
        while(it!=mp.end() && vis[it->first]){
            it++;
        }
        if(it==mp.end())
            break;
        int x = it->first;
        vector<int> g(n + 1, 1);
        for (int i = 1; i <= n;i++){
            g[i] = a[i].size() ? 1 : 0;
        }
        // for (int i = 1; i <= n;i++){
        //     cout << g[i] << ' ';
        // }
        // cout << endl;

        int flag = 1;
        while(flag){
            int minn = 1e9 + 7;
            for (int i = 1; i <= n;i++){
                if(g[i])
                {
                    while (a[i].size() && vis[a[i].back()])
                    {
                        a[i].pop_back();
                    }
                    if(a[i].size()==0){
                        flag = 0;
                        break;
                    }
                    minn = min(minn, a[i].back());
                }
            }
            if(flag==0)
                break;

            vis[minn] = 1;
            cout << minn << ' ';
            for (int i = 1; i <= n;i++){
                if(g[i]){
                    if(a[i].back()==minn){
                        while(a[i].size() && vis[a[i].back()]){
                            a[i].pop_back();
                        }
                        flag &= (a[i].size() ? 1 : 0);
                    }
                    else
                        g[i] = 0;
                }
            }
        }
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

时间复杂度：$O(n^2)$

## [ D. Simons and Beating Peaks ](https://codeforces.com/contest/2205/problem/D)

### 题意

给你一个长度为$n$的排列，你可以进行如下操作：

- 选择索引$i (1<i<n)$满足$a_i = max(\{a_{i-1},a_{i},a_{i+1}\})$ 删除$a_{i-1}$ 或者$a_{i+1}$。

找出最小操作数，使得修改后的数组满足

- **不存在**索引$ i (1<i<m )$使得 $bi=max(\{b_{i−1},b_i,b_{i+1}\}) $。

### 思路

不难发现，最后的答案一定是一个呈"V"字形的数组，可以枚举谷底（"V"形的底部），$O(n)$得到答案。

对于"V"形的两条边，预处理一下就行了。结合操作，只能删除最近的边，可以发现使用单调栈最合适。

### 代码

``` cpp
#include <bits/stdc++.h>
using namespace std;
using ll = long long;

void solve()
{
	int n;
	cin >> n;
	vector<int> a(n + 1, 0);
	for (int i = 1; i <= n;i++){
		cin >> a[i];
	}

	vector<int> l(n + 1, 0), r(n + 1, 0);
	stack<int> stk; // 小压大，得到谷底向上看的答案
	for (int i = 1; i <= n;i++){
		while(stk.size() && a[stk.top()]<a[i]){
			stk.pop();
		}
		l[i] = stk.size();
		stk.push(i);
	}
	while(stk.size()){
		stk.pop();
	}
	for (int i = n; i >= 1;i--)
	{
		while (stk.size() && a[stk.top()] < a[i])
		{
			stk.pop();
		}
		r[i] = stk.size();
		stk.push(i);
	}
	int ans = 0;
	for (int i = 1; i <= n;i++){
		ans = max(l[i] + r[i] + 1, ans);
	}
	cout << n-ans << endl;
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

时间复杂度：$O(n)$
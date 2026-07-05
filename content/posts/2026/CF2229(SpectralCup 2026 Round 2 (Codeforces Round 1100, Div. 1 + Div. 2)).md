---
title: "Codeforces Round 1100 (Div.1 + Div. 2)A-D题解"
description: "行中有 $n$ 个黏液，其中黏液 $i$ 位于该行的位置 $ai$。您将执行以下操作几次（可能没有）："
date: "2026-05-26 00:00:00"
updated: "2026-05-26 00:00:00"
permalink: "/2026/05/26/cf2229-spectralcup-2026-round-2"
categories: ["题解"]
tags: ["题解"]
---

#  [Spectral::Cup 2026 Round 2 (Codeforces Round 1100, Div. 1 + Div. 2)](https://codeforces.com/contest/2229)  A-D题解

## [ A. Slimes on a Line ](https://codeforces.com/contest/2229/problem/A)

### 题意

- 行中有 $n$ 个黏液，其中黏液 $i$ 位于该行的位置 $a_i$。您将执行以下操作几次（可能没有）：

- 选择一个整数 $x$，然后对于每个 $j(1\leq j \leq n)$，让$a_j$往$x$方向靠近一个单位距离。

确定使所有黏液占据相同位置的最小操作数。


### 思路

注意到操作数取决于数组中的最大值和最小值，只需要让最大值最小值到达的时间最小即可，即答案为$\frac{max-min+1}2$

### 代码

```cpp
#include <bits/stdc++.h>
using namespace std;
using ll = long long;
const ll mod = 1e9 + 7;

void solve()
{
    int n;
    cin >> n;
    vector<int> a(n + 1, 0);
    for (int i = 1; i <= n;i++){
        cin >> a[i];
    }
    int maxn = *max_element(a.begin() + 1, a.end());
    int minn = *min_element(a.begin() + 1, a.end());
    cout << (maxn - minn + 1) / 2 << endl;
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
}
```

## [ B. Absolute Cinema ](https://codeforces.com/contest/2229/problem/B)

### 题意

给定两个数组$a,b$，可以选择下标$i(1\leq i \leq n), swap(a_i,b_i)$，求$max(a)+sum(b)$

### 思路

贪心的令$b_i = max(a_i,b_i)$，把最大可能的值都加入到答案中。

### 代码

```cpp
#include <bits/stdc++.h>
using namespace std;
using ll = long long;

void solve()
{
    int n;
    cin >> n;
    vector<ll> a(n + 1, 0), b(n + 1, 0);
    ll maxn = 0;
    for (int i = 1; i <= n;i++){
        cin >> a[i];
    }
    for (int i = 1; i <= n;i++){
        cin >> b[i];
        if(b[i]<a[i])
            swap(b[i], a[i]);
    }

    cout << accumulate(b.begin() + 1, b.end(), 0ll) + *max_element(a.begin() + 1, a.end()) << endl;
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
}
```

##  [C1.We Be Flipping (Easy Version)](https://codeforces.com/contest/2229/problem/C1) 

### 题意

给定长度为n的数组$a,a_i\neq0(1\leq i\leq n)$，你可以最多执行一下操作n次：

- 选择一个$i,a_i>0$
- 对于$j,1\leq j\leq i$，执行$a_j = -a_j$

求如何操作使得$sum(a)$最小

### 思路

当数组$a$中所有的数为负数时，$sum(a)$最小。

从后往前遍历，将所有改变后的正数改为负数即为答案。

### 代码

```cpp
#include <bits/stdc++.h>
using namespace std;
using ll = long long;

void solve()
{
    int n;
    cin >> n;
    vector<ll> a(n + 1, 0);
    for (int i = 1; i <= n;i++){
        cin >> a[i];
        a[i] = a[i] / abs(a[i]);
    }

    vector<int> op;
    int cur = 1; // 当前查询目标
    for (int i = n; i >= 1;i--){
        if(a[i]==cur){
            op.push_back(i);
            cur *= -1;
        }
    }
    cout << op.size() << endl;
    for(auto i : op){
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
}
```

##  [C2.We Be Flipping (Hard Version)](https://codeforces.com/contest/2229/problem/C2) 

### 题意

操作同C1

求如何操作使得$sum(a)$最大

### 思路

如果$i$位置是一个正整数，那么一定可以通过操作使得前$i-1$个数为正数，如果执行操作，则$i$位置变为负数。

所以单次操作的贡献可以看作如下公式:

- $(\sum^{i-1}_{j=1} -a_j[a_j<0] - a_i)*2$

即前$i-1$位负数转正的贡献减去第$i$位变为负数的贡献。

前$i-1$位的操作可以套用C1的代码

### 代码

```cpp
#include <bits/stdc++.h>
using namespace std;
using ll = long long;

void solve()
{
    int n;
    cin >> n;
    vector<ll> a(n + 1, 0), b(n + 1, 0);
    for (int i = 1; i <= n;i++){
        cin >> a[i];
        b[i] = a[i] / abs(a[i]);
    }
    vector<ll> sum(n + 1, 0);
    vector<ll> pos(n + 1, 0);
    for (int i = 1; i <= n;i++){
        sum[i] = max(0ll, -a[i]) + sum[i - 1];
        if(a[i]>0) pos[i] = sum[i] - a[i];
        else pos[i] = 0;
    }
    ll maxpos = 0, maxn = 0;
    for (int i = 1; i <= n;i++){
        if(maxn<pos[i]){
            maxn = pos[i];
            maxpos = i;
        }
    }
    if(maxpos==0){
        return cout << 0 << endl << endl,void();
    }

    vector<int> op;
    int cur = 1;
    for (int j = maxpos - 1; j >= 1;j--)
    {
        if(b[j]==cur){
            op.push_back(j);
            cur = -cur;
        }
    }
    op.push_back(maxpos);
    cout << op.size() << endl;
    for(auto i : op){
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
}
```

##  [D.Me When Median Problem](https://codeforces.com/contest/2229/problem/D) 

### 题意

给定两个正整数数组 $a,b$ ，长度均为 n 。您需要精确执行 n−1 次以下操作：

-设 m 为 a 和 b 的当前长度，注意长度总是相等的。

—选择整数 $i(1\leq i\leq m)$：

-设 S 为多集 $\{a_i,a_i+1,b_i,b_i+1\}$

-将 S 的元素排序为 $s_1 \leq s_2 \leq s_3 \leq s_4$。

-将 $a_i,a_i+1$ 替换为$s_2$ ，将 $b_i,b_i+1$ 替换为 $s_3$ 。更正式地说，将 $a$ 替换为 $[a_1,a_2,…,a_i−1,s_2,a_i+2,…,a_m]$ ，将 $b$ 替换为 $[b_1,b_2,…,b_i−1,s_3,b_i+2,…,b_m]$ 。

在执行所有操作之后， a 和 b 中将恰好剩下 1 元素。确定如果您以最佳方式执行操作，可以获得的最大值 $min(a_1,b_1)$ 。

### 二分答案

假定答案为$x$，令数组中小于答案的值为0，否则为1，那么数组的情况可以简化为以下三种情况:

- $11,01/10,00$

第2种情况合并之后无论如何还是第二种情况，所以只需考虑11和00.

贪心的合并00，结果依然是00，然后和11合并构造出第2种情况，如果能合并，x即为可能的最大值。

注意到答案有明显的单调性，使用二分答案即可在$O(nlogn)$的复杂度下求解

#### 代码

```cpp
#include <bits/stdc++.h>
using namespace std;
using ll = long long;
const ll mod = 1e9 + 7;

void solve()
{
    int n;
    cin >> n;
    vector<int> a(n + 1, 0), b(n + 1, 0);
    for (int i = 1; i <= n;i++){
        cin >> a[i];
    }
    for (int i = 1; i <= n;i++){
        cin >> b[i];
    }

    auto check = [&](int x) -> int
    {
        int z = 0, o = 0;
        for (int i = 1, type = 0,pre = -1; i <= n; i++)
        {
            type = 0;
            type += (a[i] >= x);
            type += (b[i] >= x);
            if(type==2){
                o++;
                pre = 1;
            }

            if(type==0){
                if(pre)
                    z++;
                pre = 0;
            }
        }
        return o > z;
    };

    ll l = 0, r = n * 2, mid, ans = 0;
    while(l<=r){
        mid = l + r >> 1;
        if(check(mid)){
            l = mid + 1;
            ans = mid;
        }
        else{
            r = mid - 1;
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
}
```

### 优先队列+双向链表

定义$c_i = min(a_i,b_i)$，根据操作，我们可以先删掉最小的元素，同时合并新的元素。

利用优先队列创建小根堆，达到$O(logn)$，查找最小元素，再利用双向链表查找其左右两端的元素，最后合并结果即为答案

#### 代码

```cpp
#include <bits/stdc++.h>
using namespace std;
using ll = long long;
const ll inf = 1e13;

void solve()
{
	int n;
	cin >> n;
	vector<array<ll, 4>> va(n + 2);
    /* 
    array<ll,4> 等价于
    struct node{
    	ll a,b;
    	struct node* l,r;
    };
    */
	// a,b,lnode,rnode
	for (int i = 1; i <= n;i++){
		cin >> va[i][0];
		va[i][2] = i - 1;
		va[i][3] = i + 1;
	}
	for (int i = 1; i <= n;i++){
		cin >> va[i][1];
	}
	va[0][0] = va[0][1] = va[n + 1][0] = va[n + 1][1] = inf;

	priority_queue<pair<ll, ll>, vector<pair<ll, ll>>, greater<>> q; // 小根堆
	for (int i = 1; i <= n;i++){
		auto [a, b, l, r] = va[i];
		q.push({min(a, b), i});
	}

	vector<ll> waste(n + 2, 0); // 废弃节点
	int cnt = 0;

	while(cnt<n-1){
		auto [val, t] = q.top();
		q.pop();
		if(waste[t])
			continue;
		ll l = va[t][2], r = va[t][3], tar;
		ll minl = min(va[l][1], va[l][0]);
		ll minr = min(va[r][1], va[r][0]);

		if(minl<minr){
			tar = l;
		}
		else if(minl>minr){
			tar = r;
		}
		else{ // 保留最大的
			if(max(va[l][1],va[l][0])>max(va[r][1],va[r][0])){
				tar = r;
			}
			else{
				tar = l;
			}
		}

		vector<ll> tmp;
		tmp.push_back(va[tar][0]);
		tmp.push_back(va[tar][1]);
		tmp.push_back(va[t][0]);
		tmp.push_back(va[t][1]);
		sort(tmp.begin(), tmp.end());
		va[t][0] = tmp[1], va[t][1] = tmp[2];
		q.push({min(tmp[1], tmp[2]), t});
		if(tar==l){
			ll next = va[l][2];
			va[t][2] = next;
			va[next][3] = va[tar][3];
		}
		else{
			ll next = va[r][3];
			va[t][3] = next;
			va[next][2] = va[tar][2];
		}
		waste[tar] = 1;
		cnt++;
	}

	for (int i = 1; i <= n;i++){
		if(!waste[i]){
			return cout << min(va[i][0], va[i][1]) << endl, void();
		}
	}
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
}
```

### 分治+ST表

- 代码来自@scandi

 每次选择区间内$min(a_i,b_i)$最大的元素作为 "核心"，先合并左右子区间，最后合并核心与左右结果 ，ST表维护区间最大值的位置。

最后再合并最大的元素，保证答案正确性。

#### 代码

```cpp
#include<bits/stdc++.h>
#include<bits/extc++.h>
using namespace std;
using namespace __gnu_pbds;
 
using ll = long long;
using ull = unsigned long long;
using i128 = __int128;
using arr2 = array<int, 2>;
using arr3 = array<int, 3>;
 
const int mod = 998244353;
 
void solve() {
    int n;
    cin >> n;
 
    vector<arr2> a(n + 5);
    vector<int> val(n + 5);
 
    for (int i = 1; i <= n; i++) {
        cin >> a[i][0];
    }
    for (int i = 1; i <= n; i++) {
        cin >> a[i][1];
    }
 
    for (int i = 1; i <= n; i++) {
        val[i] = min(a[i][0], a[i][1]);
    }
 
    // ---------- ST 表预处理 ----------
    vector<int> lg(n + 5);
    for (int i = 2; i <= n; i++) {
        lg[i] = lg[i >> 1] + 1;
    }
 
    int K = lg[n] + 1;
    vector<vector<int>> st(K, vector<int>(n + 5));
 
    auto better = [&](int x, int y) -> int {
        // 返回 val 更大的位置；如果相等，返回更靠左的位置
        if (val[x] != val[y]) return val[x] > val[y] ? x : y;
        return x < y ? x : y;
    };
 
    for (int i = 1; i <= n; i++) {
        st[0][i] = i;
    }
 
    for (int k = 1; k < K; k++) {
        int len = 1 << k;
        for (int i = 1; i + len - 1 <= n; i++) {
            st[k][i] = better(st[k - 1][i], st[k - 1][i + (len >> 1)]);
        }
    }
 
    auto query = [&](int l, int r) -> int {
        int len = r - l + 1;
        int k = lg[len];
        return better(st[k][l], st[k][r - (1 << k) + 1]);
    };
 
    auto cal = [&](const arr2& x, const arr2& y) -> arr2 {
        int mnx = min(x[0], x[1]);
        int mxx = max(x[0], x[1]);
        int mny = min(y[0], y[1]);
        int mxy = max(y[0], y[1]);
 
        return {min(mxx, mxy), max(mnx, mny)};
    };
 
    auto dfs = [&](auto&& dfs, int l, int r) -> arr2 {
        if (l == r) {
            return a[l];
        }
 
        int p = query(l, r);
 
        if (p == l) {
            arr2 rs = dfs(dfs, p + 1, r);
            return cal(rs, a[p]);
        }
 
        if (p == r) {
            arr2 ls = dfs(dfs, l, p - 1);
            return cal(ls, a[p]);
        }
 
        arr2 ls = dfs(dfs, l, p - 1);
        arr2 rs = dfs(dfs, p + 1, r);
 
        if (min(ls[0], ls[1]) <= min(rs[0], rs[1])) {
            arr2 res = ls;
            res = cal(res, a[p]);
            res = cal(res, rs);
            return res;
        } else {
            arr2 res = rs;
            res = cal(res, a[p]);
            res = cal(res, ls);
            return res;
        }
    };
 
    arr2 ans = dfs(dfs, 1, n);
    cout << min(ans[0], ans[1]) << "\n";
}
 
signed main() {
    ios::sync_with_stdio(false);
    cin.tie(nullptr);
 
    int T;
    cin >> T;
 
    while (T--) {
        solve();
    }
 
    return 0;
}
```

### 笛卡尔树

这两段代码本质上都可以用笛卡尔树代替，实现$O(n)$解法，这里不多赘述。

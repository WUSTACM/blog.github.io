---
title: Codeforces Round 1087 (Div. 2)A-E题解
date: 2026-3-23
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

# [Codeforces Round 1087 (Div. 2)](https://codeforces.com/contest/2209) A-E题解

## [ A. Flip Flops ](https://codeforces.com/contest/2209/problem/A)

### 题意

你将与n只战斗力为$a_i$的怪物战斗，你的初始战斗力为$c$，有$k$双人字拖~~??hyw??~~，你可以进行如下操作：

1. 杀死一只战斗力小于你的怪物，使你的战斗力+$a_i$($a_i\leq c$)
2. 对小怪使用人字拖，小怪战斗力+1

求出最大的最终战斗力。
<!--more-->

### 思路

根据题意，我们杀掉一只怪物最多提升$c$点战斗力，可以将怪物的战斗力从小到大排序，并对战斗力不足$c$的怪物使用人字拖，最大化提升战斗力。

### 代码

```cpp
#include <bits/stdc++.h>
using namespace std;
using ll = long long;

void solve()
{
    ll n, c, k;
    cin >> n >> c >> k;
    vector<ll> a(n + 1, 0);
    for (int i = 1; i <= n;i++){
        cin >> a[i];
    }
    sort(a.begin() + 1, a.end());
    for (int i = 1; i <= n;i++){
        ll diff = max(0ll,min(c - a[i], k));
        k -= diff;
        if(c>=diff+a[i]) c += a[i] + diff; 
    }
    cout << c << endl;
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

## [ B. Array ](https://codeforces.com/contest/2209/problem/B)

### 题意

给定一个长度为 $n$ 的整数数组 $a$ 。

对于每个索引 $i$，在 $k$ 的所有可能的整数值上，找出 $j>i$ 和 $|a_i−k|>|a_j−k|$ 的索引 $j$ 的最大个数。

### 思路

不妨设$a_i > a_j$ ，在数轴上很容易看出满足$|a_i−k|>|a_j−k|$的$k$的取值范围为$(\frac{(a_i+a_j)}{2},+\infty)$，当$a_j$无限接近于$a_i$时，取值范围可以表示为$(a_i,+\infty)$

同理可得$a_i<a_j$满足$|a_i−k|>|a_j−k|$的$k$的取值范围，不做解释了

所以只需要在$j>i$的范围内找出**大于$a_i$的个数**和**小于$a_i$的个数**的最大值就行了

这题的$n\leq5000$，可以用$O(n^2)$做法，也很容易想到用数据结构优化。

### 代码

```cpp
#include <bits/stdc++.h>
using namespace std;
using ll = long long;

void solve()
{
    int n;
    cin >> n;
    map<int, int> mp;
    vector<int> a(n + 1, 0);
    for (int i = 1; i <= n; i++)
    {
        int t;
        cin >> t;
        mp[t]++;
        a[i] = t;
    }
    vector<int> ans(n + 1, 0);
    for (int i = 1; i <= n; i++)
    {
        int t = a[i];
        int cnt = 0;
        int sz = 0;
        for(auto [x,y] : mp){
            if(x<t)
                cnt += y;
            else if(x==t)
                sz = y;
            else
                break;
        }

        ans[i] = max(cnt, n - i - sz + 1 - cnt);
        mp[t]--;
        if(mp[t]==0)
            mp.erase(t);
    }
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

    ll _ = 1;
    cin >> _;
    while (_--)
    {
        solve();
    }

    return 0;
}
```

时间复杂度：$O(n^2)$或$O(nlogn)$(树状数组，线段树，平衡树优化)

## [ C. Find the Zero ](https://codeforces.com/contest/2209/problem/C)

### 题意

这是一道交互题

 你得到一个整数 $n$ 。存在一个长度为 $2n$ 的隐藏数组 $n$ 。从 1 到 $n$ 的每个整数在 a 中恰好出现**一次**。其余的元素都是 0  

你可以进行最多**n+1**次查询：

- "? i j" ， 查询$a_i$是否与$a_j$相等，相等返回1，否则返回0

输出$k$，满足$a_k=0$

### 思路

因为只有$n+1$次查询，可以很容易的想到把长度为2n的数组两两分组

结合查询操作和数据特征，不难发现当查询返回1时，这两个下标都必定为0，当出现这种情况时，可直接输出答案

若返回值为0，则查询下标内最多存在1个$0$，最坏情况是每组查询都只有一个$0$，并且多的一次查询无法精准得到答案

预留最后两个数不行，就预留最后4个。

在这4个数里面最多出现两个$0$（否则会提前返回答案），使用最后3次查询查找(1,2)(2,3)(1,3)，若前3个数有2个$0$，在查询过程中一定可以返回答案，否则第4个数一定为$0$

### 代码

```cpp
#include <bits/stdc++.h>
using namespace std;
using ll = long long;

int query(int i,int j){
    cout << "? " << i << ' ' << j << endl;
    int res;
    cin >> res;
    return res;
}

void solve()
{
    int n;
    cin >> n;
    for (int i = 3; i <= n;i++){
        int res = query(i * 2 - 1, i * 2);
        if(res==1){
            return cout << "! " << i * 2 - 1 << endl, void();
        }
    }
    if(query(1,2))
        return cout << "! 1" << endl,void();
    if(query(2,3))
        return cout << "! 2" << endl,void();
    if(query(1,3))
        return cout << "! 3" << endl,void();
    cout << "! 4" << endl;
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

## [ D. Ghostfires ](https://codeforces.com/contest/2209/problem/D)

### 题意

OtterZ收集了 r 红色鬼火， g 绿色鬼火和 b 蓝色鬼火。他想构造一个字符串 s ，由字符‘R’， ‘G’和‘B’组成，满足以下条件：

- “R”、“G”和“B”在 s 中的出现次数分别不超过 r 、 g 和 b 。

- 对于所有 $1≤i≤|s|−1 ， si≠si+1$ 。

- 对于所有 $1≤i≤|s|−3 ， si≠si+3$ 。

求出s的最大可能长度

### 思路

对于$r,g,b>=3$，可以构造出循环节$"RGBGBRBRG","BRGRGBGBR"$ ，对于r,g,b，找到其中最大的值。

1. 让所有值都减少1，循环节数量加1，直到最大的值大于等于其他两个较小值之和
2. 将较大值的字符排成一排，较小值的字符插入其中，使得每一个较大值字符都间隔一个字符
3. 根据末端字符串构造循环节

### 代码

```cpp
#include <bits/stdc++.h>
using namespace std;
using ll = long long;

void solve()
{
	int r, g, b;
	cin >> r >> g >> b;
	vector<pair<char, int>> vp(3);
	vp[0] = {'R', r}, vp[1] = {'G', g}, vp[2] = {'B', b};

	sort(vp.begin(),vp.end(),[](pair<char,int>& a,pair<char,int>& b){
		return a.second>b.second;
	});

	int cnt = 0;
	while(vp[0].second<vp[1].second+vp[2].second && vp[2].second>0){
		vp[0].second--;
		vp[1].second--;
		vp[2].second--;
		cnt++;
		
		// sort(vp.begin(),vp.end(),[](pair<char,int>& a,pair<char,int>& b){
		// 	return a.second>b.second;
		// });
	}

	// cout << cnt << endl;

	vector<char> fin(2, ' ');
	while(vp[0].second>0){
		cout << vp[0].first;
		fin[0] = fin[1];
		fin[1] = vp[0].first;
		if(vp[1].second<=0)
			break;
		cout << vp[1].first;
		fin[0] = fin[1];
		fin[1] = vp[1].first;
		vp[0].second--, vp[1].second--;
		sort(vp.begin(),vp.end(),[](pair<char,int>& a,pair<char,int>& b){
			return a.second>b.second;
		});
	}

	vector<vector<string>> vs(3);
	vs[1] = {"GBR", "BRG", "RGB"};
	vs[2] = {"BGR", "GRB", "RBG"};

	int p = -1;
	string mod = "RGB";
	if (fin[0] == ' ')
	{
		if (fin[1] == ' ')
			fin[0] = 'R', fin[1] = 'G';
		else
		{
			for (auto ch : mod)
			{
				if (ch != fin[1])
				{
					fin[0] = ch;
					break;
				}
			}
		}
	}
	// cout << fin[0] << fin[1] << endl;
	int tar = 1;
	for (int i = 0; i < 3;i++)
	{
		string s = vs[1][i];
		// cout << s[0] << s[1] << ' ' << fin[0] << fin[1] << endl;
		if(s[0]==fin[0] && s[1]==fin[1]){
			p = i;
			break;
		}
	}
	if(p==-1){
		tar = 2;
		for (int i = 0; i < 3;i++){
			string s = vs[2][i];
			// cout << s[0] << s[1] << ' ' << fin[0] << fin[1] << endl;
			if (s[0] == fin[0] && s[1] == fin[1])
			{
				p = i;
				break;
			}
		}
	}
	// cout << tar << ' ' << p << endl;

	while(cnt--){
		cout << vs[tar][p];
		(p += 1) %= 3;
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

时间复杂度：$O(r+g+b)$

## [ E. A Trivial String Problem ](https://codeforces.com/contest/2209/problem/E)

### 题意

定义 $f(t)$ 作为字符串 $t$ 可以被分割成的部分的最大数量，使得每个部分都是 $t$ 的非空前缀。

你将得到一个长为$n$的字符串$s$，$s[x,y]$表示$s$从x到y范围的子字符串

你需要回答$q$次查询，每次查询$[l_i,r_i]$，查找$\sum^{r_i}_{j=l_i}f(s[l_i,j])$

### 思路

这题的时间复杂度可以达到$O(nq)$

我们从前往后推，设$dp_i = f(sub[1,i])$，sub为原始字符串的子串。

设$b_i$为以$i$位置结尾的字符串的最近前缀匹配下标，则$dp_i = dp_{i-b_i} + 1$

设$next_i$为以$i$位置结尾的字符串的最远前缀匹配下标，可以根据$next$数组推出$b$数组，$next$数组可以由kmp算法得到

### 代码

```cpp
#include <bits/stdc++.h>
using namespace std;
using ll = long long;

void solve()
{
    int n, q;
    string s;
    cin >> n >> q >> s;
    s = ' ' + s;

    while (q--)
    {
        int l, r;
        cin >> l >> r;
        int m = r - l + 1;
        string t = s.substr(l, r);
        vector<ll> next(m + 1, -1), dp(m + 1, 0), b(m + 1, 0);
        
        auto kmp = [&](string s) -> void
        {
            int cn = 0, i = 2;
            next[0] = -1, next[1] = 0;
            while (i <= m)
            {
                if (s[i - 1] == s[cn])
                {
                    next[i++] = ++cn;
                }
                else if (cn > 0)
                {
                    cn = next[cn];
                }
                else
                {
                    next[i++] = 0;
                }
            }
        };

        kmp(t);
        for (int i = 1; i <= m;i++){
            if(next[i]==0)
                b[i] = 0;
            else if(next[next[i]]==0){
                b[i] = next[i];
            }
            else{
                b[i] = b[next[i]];
            }
        }
        ll ans = 0;
        for (int i = 1; i <= m;i++){
            dp[i] = 1 + dp[i - b[i]];
            ans += dp[i];
        }
        cout << ans << endl;
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

    return 0;
}
```

时间复杂度：$O(nq)$
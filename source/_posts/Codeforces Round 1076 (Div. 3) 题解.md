---
title: Codeforces Round 1076 (Div. 3) 题解
date: 2026-1-26
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
author: scandi
references:
comments:
indexing:
breadcrumb:
leftbar:
h1:
type:
---

# [Codeforces Round 1076 (Div. 3)](https://codeforces.com/contest/2193) 题解

## A. DBMB and the Array

### 分析：

A题偷个懒......讨论数组初始总和 和给定的$s$比较即可

<!-- more -->

```c++
#include<bits/stdc++.h>
#define int long long
using namespace std;
using ll = long long;
using arr2 = array<int, 2>;
using arr3 = array<int, 3>;
const int N = (int)2e5 + 9;
const int M = (int)1e5 + 9;
const int mod = (int)1e9 + 7;

void solve() {
    int n, s, x;
    cin >> n >> s >> x;
    vector<int> a(n + 5);
    int sum = 0;
    for (int i = 1; i <= n; i++) {
        cin >> a[i];
        sum += a[i];
    }
    if (sum > s) {
        cout << "No\n";
        return ;
    }
    int num = s - sum;
    if (num % x == 0) {
        cout << "Yes\n";
    }
    else cout << "No\n";
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

## B. Reverse a Permutation

### 题意：

选择两个整数$l,r$作为区间端点，翻转排列$p$的这段区间，使得排列$p$字典序最大

### 分析：

- 考虑到每次翻转只能保证控制一个数放置在合适的位置

- 要使得字典序最大，排列越靠前的数要尽可能越大

- 那么只需从左到右遍历排列，找到第一个不是在最优位置的数，将此位置设置为区间左端点。然后找到最优应该放置在这个位置的数的位置，设置为区间右端点。
- 该区间倒序输出，其余正序输出即可。

```c++
#include<bits/stdc++.h>
#define int long long
using namespace std;
using ll = long long;
using arr2 = array<int, 2>;
using arr3 = array<int, 3>;
const int N = (int)2e5 + 9;
const int M = (int)1e5 + 9;
const int mod = (int)1e9 + 7;

void solve() {
    int n;
    cin >> n;
    vector<int> a(n + 5);
    for (int i = 1; i <= n; i++) {
        cin >> a[i];
    }
    int b = n;
    int p1 = 0, p2 = 0;
    for (int i = 1; i <= n; i++) {
        if (a[i] != b) {
            p1 = i;
            break;
        }
        b--;
    }
    if (b == 0) {
        for (int i = 1; i <= n; i++) {
            cout << a[i] << " ";
        }
        cout << "\n";
        return ;
    }
    for (int i = 1; i <= n; i++) {
        if (a[i] == b) {
            p2 = i;
            break;
        }
    }
    for (int i = 1; i < p1; i++) {
        cout << a[i] << " ";
    }
    for (int i = p2; i >= p1; i--) {
        cout << a[i] << " ";
    }
    for (int i = p2 + 1; i <= n; i++) {
        cout << a[i] << " ";
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

## C. Replace and Sum

### 题意：

给定两数组$a,b$，进行$q$次查询，每次查询数组$a$的一个区间和，查询前可以进行任意次以下两种操作，使得每次查询的区间和最大

- 让$a_i = a_i + 1$
- 让$a_i = b_i$

### 分析：

显然我们需要使用操作让数组$a$的每个数都变的尽可能大

观察两种操作的互相影响关系，不难发现，操作对数组$a$来说，只能后面对前面产生影响，前面对后面没有影响。

并且，如果对某个位置$i$先进行操作操作二，目的来看，我们将不会再使用操作二，因为之后使用操作一不会导致数组$a$的某个位置的数值变小的，所以也不会使用操作二

进而不难想到先对所有位置考虑是否使用操作二，如果更优就选择使用。再倒序使用操作一即可（因为影响是逆序的）

```c++
#include<bits/stdc++.h>
#define int long long
using namespace std;
using ll = long long;
using arr2 = array<int, 2>;
using arr3 = array<int, 3>;
const int N = (int)2e5 + 9;
const int M = (int)1e5 + 9;
const int mod = (int)1e9 + 7;

void solve() {
    int n, q;
    cin >> n >> q;
    vector<int> a(n + 5), b(n + 5), pre(n + 5);
    for (int i = 1; i <= n; i++) {
        cin >> a[i];
    }
    for (int i = 1; i <= n; i++) {
        cin >> b[i];
    }
    for (int i = 1; i <= n; i++) {
        a[i] = max(a[i], b[i]);
    }
    for (int i = n - 1; i >= 1; i--) {
        a[i] = max(a[i], a[i + 1]);
    }
    for (int i = 1; i <= n; i++) {
        pre[i] = pre[i - 1] + a[i];
    }
    while (q--) {
        int l, r;
        cin >> l >> r;
        cout << pre[r] - pre[l - 1] << " ";
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

## D. Monster Game

### 题意：

$n$把威力分别为$a_i$的剑，有$n$个关卡，每个关卡有拥有一只需要$b_i$次有效剑攻击的怪兽，每次攻击后剑都会消失。

你需要选择最低有效值$x$，使得只有威力$\ge x$的剑才会对怪兽造成攻击，假设通关数为$cnt$，那么本选择的最终得分将是$x \times cnt$。求最高可能得分是多少？

### 分析：

考虑到在同样数量有效剑的情况下，$x$的取值越大越有利，我们可以直接枚举所有$x = a_i$，这样刚好可以考虑到所有数量的情况。（当然要先对数组$a$进行排序）

枚举$x$后，相当于有效攻击次数就是已知的了，剩下只需考虑能杀死多少只累计怪兽数量即可

维护一个怪兽耐揍值前缀和数组，直接二分查找攻击次数可以杀死几只即可，最后全局$mx$求最大值。

```c++
#include<bits/stdc++.h>
#define int long long
using namespace std;
using ll = long long;
using arr2 = array<int, 2>;
using arr3 = array<int, 3>;
const int N = (int)2e5 + 9;
const int M = (int)1e5 + 9;
const int mod = (int)1e9 + 7;

void solve() {
    int n;
    cin >> n;
    vector<int> a(n + 5), b(n + 5), pre(n + 5);
    for (int i = 1; i <= n; i++) {
        cin >> a[i];
    }
    for (int i = 1; i <= n; i++) {
        cin >> b[i];
    }
    for (int i = 1; i <= n; i++) {
        pre[i] = pre[i - 1] + b[i];
    }
    sort(a.begin() + 1, a.begin() + 1 + n);
    int ans = 0;
    for (int i = 1; i <= n; i++) {
        int x = a[i];
        int num = n - i + 1;
        int cnt = upper_bound(pre.begin() + 1, pre.begin() + 1 + n, num) - pre.begin();
        cnt--;
        ans = max(ans, x * cnt);
    }
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

## E. Product Queries

### 题意：

给定$n$个数，问从$1$到$n$的每个数可以被几个给定的数通过乘积得到？如果不行输出$-1$

### 分析：

**注意，同一个数可以多次使用......**

考虑到每个数都是由比自己小的数乘积得来

对于一个给定存在数组中的数$x$，考虑从小到大枚举另外一个因数$i$，那么$x \times i$就可以通过$x$和$i$的次数和转移得来

故直接dp即可，详见代码

```C++
#include<bits/stdc++.h>
using namespace std;
#define int long long
using arr2 = array<int, 2>;
using arr3 = array<int, 3>;
const int N = 1e5 + 9;
const int mod = 1e9 + 7;

void solve() {
	int n;
	cin >> n;
	set<int>s;
	for (int i = 1; i <= n; i++) {
		int x;
		cin >> x;
		s.insert(x);
	}
	vector<int>dp(n + 5, 1e12);
	for (int x : s) {
		dp[x] = 1;
		for (int i = 2; i * x <= n; i++) {
			dp[x * i] = min(dp[x * i], dp[x] + dp[i]);
		}
	}
	for (int i = 1; i <= n; i++) {
		if (dp[i] == 1e12) cout << -1 << ' ';
		else cout << dp[i] << ' ';
	}
	cout << '\n';

}

signed main() {
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

## F. Pizza Delivery

### 题意：

在方格中，从起始点到目标点，中间有若干个必须经过的点，每次只能水平或者竖直移动一个单位，并且不能水平向左移动，问到达目标点的最少移动次数是多少？

### 分析：

考虑到不能左移，所以只须对所有含有点的横坐标位置进行停留并上下运动即可，并且每次都是在当前横坐标位置的所有点都扫完后，立即向右移动，这就必然导致，对于每个有点的横坐标位置，在扫完当前横坐标位置的所有点后，并然是在当前横坐标位置的最上方点或者最下方点的位置继续右移。

那么就可以以此为转移状态，设$dp[m][2]$，表示到达第$i$个有点的横坐标位置时，以最上方（或者最下方）位置离开的最少移动次数

```c++
// #include<bits/stdc++.h>
// #define int long long
// using namespace std;
// using ll = long long;
// using arr2 = array<int, 2>;
// using arr3 = array<int, 3>;
// const int N = (int)2e5 + 9;
// const int M = (int)1e5 + 9;
// const int mod = (int)1e9 + 7;

// void solve() {
//     int n, x0, y0, xn, yn;
//     cin >> n >> x0 >> y0 >> xn >> yn;
//     vector<arr2> p(n + 5);
//     vector<vector<arr2>> pp;
//     for (int i = 1; i <= n; i++) {
//         cin >> p[i][0];
//     }
//     for (int i = 1; i <= n; i++) {
//         cin >> p[i][1];
//     }
//     sort(p.begin() + 1, p.begin() + 1 + n);
//     pp.push_back({});
//     for (int i = 1; i <= n; i++) {
//         vector<arr2> tmp;
//         tmp.push_back(p[i]);
//         while (i + 1 <= n && p[i + 1][0] == p[i][0]) {
//             tmp.push_back(p[i + 1]);
//             i++;
//         }
//         if (tmp.size()) pp.push_back(tmp);
//     }
//     int dp[pp.size() + 5][2][2];
//     memset(dp, 0, sizeof(dp));
//     int mx = 0, mn = 1e10;
//     if (pp.size() == 1) {
//         cout << abs(x0 - xn) + abs(y0 - yn) << "\n";
//         return ;
//     }
//     for (auto [x, y] : pp[1]) {
//         mx = max(mx, y);
//         mn = min(mn, y);
//     }
//     dp[0][0][0] = dp[0][0][1] = abs(mn - y0);
//     dp[0][1][0] = dp[0][1][1] = abs(mx - y0);
//     int m = pp.size();
//     for (int i = 1; i < m - 1; i++) {
//         int xia = mn, shang = mx;
//         mx = 0, mn = 1e10;
//         for (auto [x, y] : pp[i + 1]) {
//             mx = max(mx, y);
//             mn = min(mn, y);
//         }
//         dp[i][1][0] = min(dp[i - 1][0][0], dp[i - 1][0][1]) + (shang - xia + abs(shang - mx));
//         dp[i][1][1] = min(dp[i - 1][1][0], dp[i - 1][1][1]) + (shang - xia + abs(xia - mx));
//         dp[i][0][0] = min(dp[i - 1][0][0], dp[i - 1][0][1]) + (shang - xia + abs(shang - mn));
//         dp[i][0][1] = min(dp[i - 1][1][0], dp[i - 1][1][1]) + (shang - xia + abs(xia - mn));
//     }
//     int xia = mn, shang = mx;
//     dp[m - 1][1][0] = min(dp[m - 2][0][0], dp[m - 2][0][1]) + (shang - xia + abs(shang - yn));
//     dp[m - 1][1][1] = min(dp[m - 2][1][0], dp[m - 2][1][1]) + (shang - xia + abs(xia - yn));
//     cout << min(dp[m - 1][1][0], dp[m - 1][1][1]) + xn - x0 << "\n";
// }

// signed main()
// {
//     ios::sync_with_stdio(false);
//     cin.tie(0);
//     int _ = 1;
//     cin >> _;
//     while(_--) {
//         solve();
//     }
//     return 0;
// }

#include <bits/stdc++.h>
#define int long long
using namespace std;
using arr2 = array<int, 2>;

void solve() {
    int n, x0, y0, xn, yn;
    cin >> n >> x0 >> y0 >> xn >> yn;
    vector<arr2> p(n + 5);
    vector<vector<arr2>> pp;

    for (int i = 1; i <= n; i++) cin >> p[i][0];
    for (int i = 1; i <= n; i++) cin >> p[i][1];

    sort(p.begin() + 1, p.begin() + 1 + n);

    pp.push_back({});
    for (int i = 1; i <= n; i++) {
        vector<arr2> tmp;
        tmp.push_back(p[i]);
        while (i + 1 <= n && p[i + 1][0] == p[i][0]) {
            tmp.push_back(p[i + 1]);
            i++;
        }
        if (!tmp.empty()) pp.push_back(tmp);
    }

    if (pp.size() == 1) { 
        cout << abs(x0 - xn) + abs(y0 - yn) << "\n";
        return;
    }

    int mx = 0, mn = (int)1e10;
    for (auto [x, y] : pp[1]) {
        mx = max(mx, y);
        mn = min(mn, y);
    }

    int m = (int)pp.size(); 
    const long long INF = (long long)4e18;

    vector<array<long long, 2>> dp(m + 5, {INF, INF});

    dp[0][0] = abs(mn - y0);
    dp[0][1] = abs(mx - y0);

    for (int i = 1; i < m - 1; i++) {
        int xia = mn, shang = mx;

        mx = 0; mn = (int)1e10;
        for (auto [x, y] : pp[i + 1]) {
            mx = max(mx, y);
            mn = min(mn, y);
        }

        long long f0 = dp[i - 1][0]; 
        long long f1 = dp[i - 1][1];

        dp[i][1] = min(f0 + (shang - xia + llabs(shang - mx)),
                       f1 + (shang - xia + llabs(xia - mx)));
        dp[i][0] = min(f0 + (shang - xia + llabs(shang - mn)),
                       f1 + (shang - xia + llabs(xia - mn)));
    }

    int xia = mn, shang = mx;
    long long f0 = dp[m - 2][0];
    long long f1 = dp[m - 2][1];

    long long ans = min(f0 + (shang - xia + llabs(shang - yn)),
                        f1 + (shang - xia + llabs(xia - yn)));

    cout << ans + (xn - x0) << "\n";
}

signed main() {
    ios::sync_with_stdio(false);
    cin.tie(nullptr);

    int T;
    cin >> T;
    while (T--) solve();
    return 0;
}

```


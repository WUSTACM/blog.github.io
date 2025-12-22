---
title: everlasting.关于2025菜鸟杯的个人题解
date: 2025-12-15
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
author: everlasting
references:
comments:
indexing:
breadcrumb:
leftbar:
h1:
type:
---

# everlasting.的个人题解

## A - hello

### 题意：

第一行输出“HELL0 WUSTACM!”，第二行输出“maintain integrity,think diligently, and challenge yourself”。

<!-- more -->

### 代码：

```c++
#include <bits/stdc++.h>
using namespace std;
using ll = long long;
using ld = long double;

#define fi first
#define se second

const ll MAXN = 1e7;
const ld eps = 1e-12;
const ll mod = 1e9 + 7;

ll n;

void solve ()
{
    cout << "HELL0 WUSTACM!" << '\n';
    cout << "maintain integrity,think diligently, and challenge yourself" << '\n';
}

int main ()
{
    ios::sync_with_stdio(0);
    cin.tie(0);
    int _ = 1;
    // cin >> _;
    while (_--) {
        solve();
    }
    return 0;
}
```

## C - 杨弟的电梯

### 题意：

输入一个整数 n 和 0 或 1，0 代表夏天，1 代表冬天。
夏天时人数不少于 10 人输出 hot，不到 10 人输出 cool。
冬天时人数不少于 10 人输出 warm，不到 10 人输出 cold。

### 代码：

```c++
#include <bits/stdc++.h>
using namespace std;
using ll = long long;
using ld = long double;

#define fi first
#define se second

const ll MAXN = 1e7;
const ld eps = 1e-12;
const ll mod = 1e9 + 7;

ll n, a;

void solve ()
{
    cin >> n >> a;
    if (n > 15) {
        cout << "error" << '\n';
        return;
    }
    if (a == 0) {
        if (n < 10) {
            cout << "cool" << '\n';
        }else {
            cout << "hot" << '\n';
        }
    }else {
        if (n < 10) {
            cout << "cold" << '\n';
        }else {
            cout << "warm" << '\n';
        }
    }
}

int main ()
{
    ios::sync_with_stdio(0);
    cin.tie(0);
    int _ = 1;
    // cin >> _;
    while (_--) {
        solve();
    }
    return 0;
}
```

## F - 猫猫

### 题意：

根据程序输出，程序如下：

```c++
miao_func(x):
    miaomiao (x < 1)
        miaomiaomiaowu 0
    miaomiaomiao (x & 1)
        miaomiaomiaowu x + miao_func(x - 2)
    miaomiaomioa
        miaomiaomiaowu miao_func(x - 2) - x
```

喵语：
miaomiao : if
miaomiaomiao : else if
miaomiaomioa : else
miaomiaomiaowu : return

### 代码：

```c++
#include <bits/stdc++.h>
using namespace std;
using ll = long long;
using ld = long double;

#define fi first
#define se second

const ll MAXN = 1e7;
const ld eps = 1e-12;
const ll mod = 1e9 + 7;

ll n;

void solve ()
{
    cin >> n;

    auto func = [&] (ll x, auto self) -> ll {
        if (x < 1) {
            return 0;
        }else if (x & 1) {
            return x + self(x - 2, self);
        }else {
            return self(x - 2, self) - x;
        }
    };

    ll ans = func(n, func);

    cout << ans << '\n';
}

int main ()
{
    ios::sync_with_stdio(0);
    cin.tie(0);
    int _ = 1;
    // cin >> _;
    while (_--) {
        solve();
    }
    return 0;
}
```

## D - 装糖果

### 题意：

给定 n 种类型的糖果，k 和每种类型糖果的数量，求至少买多少个袋子能满足以下限制条件：

- 每个袋子最多能装下 k 个糖果
- 每个袋子中同一种类的糖果至多只能有一个

### 思路：

贪心。考虑最后的袋子有两种可能，一种是包含多种糖果，一种是只有一种糖果。对于第一种情况，至少的袋子数量即为 ceil(sum / k),对于第二种情况，至少的袋子数量即为最大的糖果数量。两种情况取最大值即可。
时间复杂度：O(n)。

### 代码：

```c++
#include <bits/stdc++.h>
using namespace std;
using ll = long long;
using ld = long double;

#define fi first
#define se second

const ll MAXN = 1e7;
const ld eps = 1e-12;
const ll mod = 1e9 + 7;

ll n, k;

void solve ()
{
    cin >> n >> k;
    vector <ll> v(n + 1);
    ll mx = 0;
    ll sum = 0;
    for (int i = 1; i <= n; i++) {
        cin >> v[i];
        sum += v[i];
        mx = max(mx, v[i]);
    }

    ll t;
    if (sum % k == 0) {
        t = sum / k;
    }else {
        t = sum / k + 1;
    }

    cout << max(t, mx);
}

int main ()
{
    ios::sync_with_stdio(0);
    cin.tie(0);
    int _ = 1;
    // cin >> _;
    while (_--) {
        solve();
    }
    return 0;
}
```

## G - 礼包和 scandi

### 题意：

给定碗的数量和每个碗中的米饭量。scandi 要吃完所有米饭且想要米饭量尽量少，礼包想要 scandi 吃的米饭量尽量多。在开始吃饭前，两人可以轮流对米饭量进行调整，礼包先手，过程如下：

- 任选一个满足 a<sub>i</sub> != a<sub>i+1</sub>的 i。
- 将 a<sub>i</sub>变为 func(a<sub>i</sub>，a<sub>i+1</sub>)。
- 当无法找到满足要求的 i 时，调整环节结束。
  注意：对于 scandi 而言，func() = min()，对于礼包而言，func() = max()。

求最终 scandi 需要吃掉的米饭总量

### 思路：

诈骗题。手模样例后发现，当所有数等于最后一个数时才不会满足题意。直接输出即可。
时间复杂度：O(n)。

### 代码：

```c++
#include <bits/stdc++.h>
using namespace std;
using ll = long long;
using ld = long double;

#define fi first
#define se second

const ll MAXN = 1e7;
const ld eps = 1e-12;
const ll mod = 1e9 + 7;

ll n;

void solve ()
{
    cin >> n;
    vector <ll> v(n + 1, 0);
    for (int i = 1; i <= n; i++) {
        cin >> v[i];
    }

    cout << v[n] * n << '\n';
}

int main ()
{
    ios::sync_with_stdio(0);
    cin.tie(0);
    int _ = 1;
    // cin >> _;
    while (_--) {
        solve();
    }
    return 0;
}
```

## H - 凡安要当超级农民

### 题意：

给定矩阵的长和宽为 n 和 m，并给定次数 q。接下来的 q 行中，给定魔法生效点座标，延伸长度和魔法效果。
魔法效果：在生效点上，上下左右依次延伸 k 个点，使得每个点的产量增加 s(初始产量为 0)。
求最终矩阵中每个点的产量。

### 思路：

数据量不大，模拟即可。

### 代码：

```c++
#include <bits/stdc++.h>
using namespace std;
using ll = long long;
using ld = long double;

#define fi first
#define se second

const ll MAXN = 1e7;
const ld eps = 1e-12;
const ll mod = 1e9 + 7;

ll n, m, q;

void solve ()
{
    cin >> n >> m >> q;
    vector <vector <ll> > v(n + 1, vector <ll> (m + 1, 0));

    while (q--) {
        ll x, y, k, s;
        cin >> x >> y >> k >> s;
        v[x][y] += s;
        for (int i = x - k; i <= x + k; i++) {
            if (i == x) continue;
            ll xx = (i + n - 1) % n + 1;
            v[xx][y] += s;
        }
        for (int i = y - k; i <= y + k; i++) {
            if (i == y) continue;
            ll yy = (i + m - 1) % m + 1;
            v[x][yy] += s;
        }
    }

    for (int i = 1; i <= n; i++) {
        for (int j = 1; j <= m; j++) {
            cout << v[i][j] << ' ';
        }
        cout << '\n';
    }
}

int main ()
{
    ios::sync_with_stdio(0);
    cin.tie(0);
    int _ = 1;
    // cin >> _;
    while (_--) {
        solve();
    }
    return 0;
}
```

## L - 逃课计划

### 题意：

一周七天，每天有六节课，给定老师的具体查课时间，即第几天第几节。在两天不能逃同一节课的情况下，求出可能的逃课计划数量。

### 思路：

最大可能不超过 3e5 种情况，因此直接暴力 dfs 即可。

### 代码：

```c++
#include <bits/stdc++.h>
using namespace std;
using ll = long long;
using ld = long double;
using pi = pair<ll, ll>;

#define fi first
#define se second

const ll MAXN = 1e7;
const ld eps = 1e-12;
const ll mod = 1e9 + 7;

vector <vector <ll> > e(8);
ll n;
ll ans = 0;

void solve ()
{
    cin >> n;
    map <pair<ll, ll>, bool> mp;
    for (int i = 0; i < n; i++) {
        int a, b;
        cin >> a >> b;
        mp[{a, b}] = true;
    }

    for (int i = 1; i <= 7; i++) {
        for (int j = 1; j <= 6; j++) {
            if (!mp[{i, j}]) {
                e[i].push_back(j);
            }
        }
    }

    auto dfs = [&] (ll day, ll course, auto self) -> void {
        if (day == 7) {
            ans++;
            return;
        }

        for (auto x : e[day + 1]) {
            if (x == course) continue;
            self(day + 1, x, self);
        }
    };

    for (auto x : e[1]) {
        dfs(1, x, dfs);
    }

    cout << ans << '\n';
}

int main ()
{
    ios::sync_with_stdio(0);
    cin.tie(0);
    int _ = 1;
    // cin >> _;
    while (_--) {
        solve();
    }
    return 0;
}
```

## E - 比较 A 和 B 的大小

### 题意：

给定一种新的比较两数大小的方式：整数部分相同，但小数部分按整数来比较大小。例如：0.13 > 0.3, 0.50 > 0.5。
给定两个数，若新的方式与数学方式的比大小结果相同，输出"ni shi dui de"
否则，输出"ni cuo le, ying gai shi ‘正确答案’"。 “正确答案”为：<, >, =。

### 思路：

首先注意到若存在一个数是整数，两种比大小的结果一定相同。接下来先判断整数部分，若整数部分不同，比大小结果一定也相同。若相同再来比较小数部分。
小数部分中，分别将其根据数学方法和新的方式比较（注意前导 0 和后导 0 的讨论），查看两者结果是否不同即可。

### 代码：

```c++
#include <bits/stdc++.h>
using namespace std;
using ll = long long;
using ld = long double;
using pi = pair<ll, ll>;

#define fi first
#define se second

const int MAXN = 6e7;
const double eps = 1e-5;
const ll mod = 998244353;

string a1, a2;

void solve ()
{
    cin >> a1 >> a2;
    if (a1.find('.') == string::npos || a2.find('.') == string::npos) {
        cout << "ni shi dui de" << '\n';
        return;
    }
    string s1 = a1.substr(0, a1.find('.'));
    string s2 = a2.substr(0, a2.find('.'));

    if (s1 != s2) {
        cout << "ni shi dui de" << '\n';
        return;
    }

    string ss1 = a1.substr(a1.find('.') + 1);
    string ss2 = a2.substr(a2.find('.') + 1);

    int found2 = 0;//normal compare
    for (int i = 0; i < min(ss1.size(), ss2.size()); i++) {
        if (ss1[i] < ss2[i]) {
            found2 = 1;
            break;
        }else if (ss1[i] > ss2[i]) {
            found2 = 2;
            break;
        }
    }

    if (found2 == 0) {
        if (ss1.size() < ss2.size()) {
            bool foundd = false;
            for (int i = ss1.size(); i < ss2.size(); i++) {
                if (ss2[i] != '0') {
                    foundd = true;
                }
            }
            if (foundd) {
                found2 = 1;
            }
        }else if (ss1.size() > ss2.size()) {
            bool foundd = false;
            for (int i = ss2.size(); i < ss1.size(); i++) {
                if (ss1[i] != '0') {
                    foundd = true;
                }
            }
            if (foundd) {
                found2 = 2;
            }
        }
    }

    int found3 = 0;//require compare
    string t1; int index = 0;//remove 0 from front
    while (index < ss1.size()) {
        if (ss1[index] != '0') {
            break;
        }
        index++;
    }
    t1 = ss1.substr(index, ss1.size() - index);

    string t2; index = 0;
    while (index < ss2.size()) {
        if (ss2[index] != '0') {
            break;
        }
        index++;
    }
    t2 = ss2.substr(index, ss2.size() - index);

    if (t1.size() < t2.size()) {
        found3 = 1;
    }else if (t1.size() > t2.size()) {
        found3 = 2;
    }else {
        for (int i = 0; i < t1.size(); i++) {
            if (t1[i] < t2[i]) {
                found3 = 1;
                break;
            }else if (t1[i] > t2[i]) {
                found3 = 2;
                break;
            }
        }
    }

    if (found2 == found3) {
        cout << "ni shi dui de" << '\n';
    }else if (found2 == 0 && found3 == 1) {
        cout << "ni cuo le, ying gai shi <" << '\n';
    }else if (found2 == 0 && found3 == 2) {
        cout << "ni cuo le, ying gai shi >" << '\n';
    }else if (found2 == 1 && found3 == 0) {
        cout << "ni cuo le, ying gai shi =" << '\n';
    }else if (found2 == 1 && found3 == 2) {
        cout << "ni cuo le, ying gai shi >" << '\n';
    }else if (found2 == 2 && found3 == 0) {
        cout << "ni cuo le, ying gai shi =" << '\n';
    }else if (found2 == 2 && found3 == 1) {
        cout << "ni cuo le, ying gai shi <" << '\n';
    }
}

int main ()
{
    ios::sync_with_stdio(0);
    cin.tie(0);
    int _ = 1;
    //cin >> _;
    while (_--) {
        solve();
    }
    return 0;
}
```

## K - 小白的好数组

### 题意：

给定一个长度为 n 的数组，求至少需要进行多少次对一个数加 p 的操作，可以使得数组至少有 k 个数字相同。

### 思路:

首先可以知道，若两个数%p 的结果相同，则两个数之间一定可以通过+p 的形式边成一个数。若不同，则一定不行。
因此，可以根据此条件分成 p 个组，在每一组中排完序后，可能的最小的答案一定是连续的。因此，只需要以滑动窗口的形式来寻找答案即可。
时间复杂度：O(n)。

### 代码：

```c++
#include <bits/stdc++.h>
using namespace std;
using ll = long long;
using ld = long double;
using pi = pair<ll, ll>;

#define fi first
#define se second

const int MAXN = 6e7;
const double eps = 1e-5;
const ll mod = 998244353;

ll n, k, p;

void solve ()
{
    cin >> n >> k >> p;
    vector <vector <ll> > a(p);
    for (int i = 0; i < n; i++) {
        ll t;
        cin >> t;
        a[t % p].push_back(t);
    }

    bool found = false;
    ll ans = LLONG_MAX;
    for (int i = 0; i < p; i++) {
        if (a[i].size() < k) continue;
        else found = true;
        sort(a[i].begin(), a[i].end());

        ll mn = 0;
        for (int j = 0; j < k - 1; j++) {
            mn += (a[i][k - 1] - a[i][j]) / p;
        }

        ans = min(ans, mn);
        ll l = 1, r = k;
        while (r < a[i].size()) {
            mn -= (a[i][r - 1] - a[i][l - 1]) / p;
            mn += (a[i][r] - a[i][r - 1]) / p * (k - 1);
            ans = min(mn, ans);
            l++;
            r++;
        }
    }

    if (!found) {
        cout << "wuwuwu" << '\n';
    }else {
        cout << ans << '\n';
    }
}

int main ()
{
    ios::sync_with_stdio(0);
    cin.tie(0);
    int _ = 1;
    //cin >> _;
    while (_--) {
        solve();
    }
    return 0;
}
```

## B - 小李吃豆子

### 题意：

给定一个在 1e12 内的 n，求有多少个连续的数列相加后等于 n。

### 思路：

对于任意 n，假设其连续数列为 p，p + 1, p + 2,..., p + k - 1。对其求和后即可得到：(2p + k - 1) \* k / 2 = n。化简后即为：p = (2n / k - k + 1) / 2。即一个符合要求的 p，一定会满足以下两个条件：

- 2n % k == 0
- (2n / k - k + 1) % 2 == 0

因为范围为 1e12，考虑优化。2n / k - k + 1 >= 0 的条件为 p >= sqrt(2n)，即只需遍历 sqrt(2n)内的数即可。
时间复杂度：O(sqrt(2n))。

### 代码：

```c++
#include <bits/stdc++.h>
using namespace std;
using ll = long long;
using ld = long double;

#define fi first
#define se second

const ll MAXN = 1e7;
const ld eps = 1e-12;
const ll mod = 1e9 + 7;

ll n;

void solve ()
{
    cin >> n;
    ll m = sqrtl(2 * n);

    ll ans = 0;
    for (int i = 1; i <= m; i++) {
        if ((2 * n) % i == 0 && ((2 * n) / i - i + 1) % 2 == 0) {
            ans++;
        }
    }
    cout << ans << '\n';
}

int main ()
{
    ios::sync_with_stdio(0);
    cin.tie(0);
    int _ = 1;
    // cin >> _;
    while (_--) {
        solve();
    }
    return 0;
}
```

## I - 攻守兼备

### 题意：

给定 n 张卡牌，每张卡牌有攻击力和防御值。想要从这 n 张卡牌中找到两张卡，使得这两张卡的总攻击力和总防御力的最小值达到最大，输出总攻击力和总防御力的最小值的最大值。

### 思路：

这里采用贪心做法。具体思路见[wustacm](https://blog.wustacm.org/2025/12/15/2025%E8%8F%9C%E9%B8%9F%E6%9D%AF%E9%A2%98%E8%A7%A3/#%E8%B4%AA%E5%BF%83)

### 代码：

```c++
#include <bits/stdc++.h>
using namespace std;
using ll = long long;
using ld = long double;
using pi = pair<ll, ll>;

#define fi first
#define se second

const ll MAXN = 1e7;
const ld eps = 1e-12;
const ll mod = 1e9 + 7;

ll n;

void solve ()
{
    cin >> n;
    vector <pi> v(n);
    for (int i = 0; i < n; i++) {
        cin >> v[i].fi >> v[i].se;
    }
    sort(v.begin(), v.end(), [] (auto a1, auto b1) {
        return abs(a1.fi - a1.se) < abs(b1.fi - b1.se);
    });

    ll ans = 0, maxfi = 0, maxse = 0;
    for (int i = 0; i < n; i++) {
        if (v[i].fi > v[i].se) {
            ans = max(ans, maxse + v[i].se);
        }else {
            ans = max(ans, maxfi + v[i].fi);
        }
        maxfi = max(maxfi, v[i].fi);
        maxse = max(maxse, v[i].se);
    }

    cout << ans << '\n';
}

int main ()
{
    ios::sync_with_stdio(0);
    cin.tie(0);
    int _ = 1;
    // cin >> _;
    while (_--) {
        solve();
    }
    return 0;
}
```

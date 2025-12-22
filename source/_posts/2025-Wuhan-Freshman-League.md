---
title: 2025武汉新生赛部分题解及游记
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

# 2025武汉新生赛部分题解及游记

## 游记

2025年已经见底，今年最后一场参加的线下赛也告一段落。不知不觉已经过了快半年的时间，在这里先感谢这半年来帮助过我的学长，同学们，感谢他们作为我的领路人，帮助我应对大学里的事物，带我入门算法，学习计算机相关的知识。希望未来的自己能够争气点。

<!-- more -->

本次比赛仍需要反思的，首先是保持冷静。A题样例都没看就开始搓，最后发现时几乎是全部重写，浪费了大量时间。另外对于一些细节方面仍需注意。例如算式中存在的计算符的优先性。最后对于拿不太准的代码，应当多造样例多测，这样能避免很多不应该出现的罚时。

这次是第二次去华农参加的比赛。相对于第一次，这次抽到了怎么按也按不动的键盘，刚交完Wrong Answer后就蓝屏的电脑，运气还是差了点TAT。但这次发的面包好吃(~~虽然不咋饿~~)。这次仍然很幸运的拿到了签到题的一血，让我也不至于空手而归。另外，华农不愧是华“农”，比赛完在华农乱逛，田，一望无际的田~~



经历了这次比赛，意识到了自己与强者之间的差距真的很大。。。在算法这条路上仍是任重道远。希望自己以后加油吧！

## 部分题解

### L - 那我问你

#### 题意：

输入三个整数a，b，c，输出“The paper you submitted have a Pros and b Cons, so I have c Questions for you.”。

#### 代码：

``` c++
#include <bits/stdc++.h>
using namespace std;
using ll = long long;
using ld = long double;
using pi = pair<ll, ll>;

#define fi first
#define se second

const int MAXN = 6e7;
const double eps = 1e-5;
const ll mod = 1e9 + 7;

void solve ()
{
    ll a, b, c; cin >> a >> b >> c;
    cout << "The paper you submitted have " << a << " Pros and " << b << " Cons, so I have " << c << " Questions for you.";
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

### A - 昨日重现

#### 题意：

给定一个长度不超过100的字符串，在五所大学(HUST, WHU, WHUT, HZAU, CCNU)的缩写中，找出在字符串中作为子序列出现次数最多且字典序最小的一个，输出大学的缩写及最大次数。

#### 思路：

这里就不深究此题了，for循环足以解决。

#### 代码：

``` c++
#include <bits/stdc++.h>
using namespace std;
using ll = long long;
using ld = long double;
using pi = pair<ll, ll>;

#define fi first
#define se second

const int MAXN = 6e7;
const double eps = 1e-5;
const ll mod = 1e9 + 7;

void solve ()
{
    string s; cin >> s;
    vector <ll> cnt(5, 0);
    ll n = s.size();

    for (ll i = 0; i < n; i++) {
        if (s[i] == 'C') {
            for (ll j = i + 1; j < n; j++) {
                if (s[j] == 'C') {
                    for (ll k = j + 1; k < n; k++) {
                        if (s[k] == 'N') {
                            for (ll l = k + 1; l < n; l++) {
                                if (s[l] == 'U') cnt[0]++;
                            }
                        }
                    }
                }
            }
        }
    }

    for (ll i = 0; i < n; i++) {
        if (s[i] == 'H') {
            for (ll j = i + 1; j < n; j++) {
                if (s[j] == 'U') {
                    for (ll k = j + 1; k < n; k++) {
                        if (s[k] == 'S') {
                            for (ll l = k + 1; l < n; l++) {
                                if (s[l] == 'T') cnt[1]++;
                            }
                        }
                    }
                }
            }
        }
    }

    for (ll i = 0; i < n; i++) {
        if (s[i] == 'H') {
            for (ll j = i + 1; j < n; j++) {
                if (s[j] == 'Z') {
                    for (ll k = j + 1; k < n; k++) {
                        if (s[k] == 'A') {
                            for (ll l = k + 1; l < n; l++) {
                                if (s[l] == 'U') cnt[2]++;
                            }
                        }
                    }
                }
            }
        }
    }

    for (ll i = 0; i < n; i++) {
        if (s[i] == 'W') {
            for (ll j = i + 1; j < n; j++) {
                if (s[j] == 'H') {
                    for (ll k = j + 1; k < n; k++) {
                        if (s[k] == 'U') {
                            for (ll l = k + 1; l < n; l++) {
                                if (s[l] == 'T') cnt[4]++;
                            }
                        }
                    }
                }
            }
        }
    }

    for (ll i = 0; i < n; i++) {
        if (s[i] == 'W') {
            for (ll j = i + 1; j < n; j++) {
                if (s[j] == 'H') {
                    for (ll k = j + 1; k < n; k++) {
                        if (s[k] == 'U') cnt[3]++; 
                    }
                }
            }
        }
    }

    if (cnt[0] == max({cnt[0], cnt[1], cnt[2], cnt[3], cnt[4]})) {
        cout << "CCNU " << cnt[0] << '\n';
    }else if (cnt[1] == max({cnt[0], cnt[1], cnt[2], cnt[3], cnt[4]})) {
        if (cnt[0] == cnt[1]) {
            cout << "CCNU " << cnt[0] << '\n';
        }else {
            cout << "HUST " << cnt[1] << '\n';
        }
    }else if (cnt[2] == max({cnt[0], cnt[1], cnt[2], cnt[3], cnt[4]})) {
        if (cnt[0] == cnt[2]) {
            cout << "CCNU " << cnt[0] << '\n';
        }else if (cnt[1] == cnt[2]) {
            cout << "HUST " << cnt[1] << '\n';
        }else {
            cout << "HZAU " << cnt[2] << '\n';
        }
    }else if (cnt[3] == max({cnt[0], cnt[1], cnt[2], cnt[3], cnt[4]})) {
        if (cnt[0] == cnt[3]) {
            cout << "CCNU " << cnt[0] << '\n';
        }else if (cnt[1] == cnt[3]) {
            cout << "HUST " << cnt[1] << '\n';
        }else if (cnt[2] == cnt[3]) { 
            cout << "HZAU " << cnt[2] << '\n';
        }else {
            cout << "WHU " << cnt[3] << '\n';
        }
    }else if (cnt[4] == max({cnt[0], cnt[1], cnt[2], cnt[3], cnt[4]})) {
        if (cnt[0] == cnt[4]) {
            cout << "CCNU " << cnt[0] << '\n';
        }else if (cnt[1] == cnt[4]) {
            cout << "HUST " << cnt[1] << '\n';
        }else if (cnt[2] == cnt[4]) { 
            cout << "HZAU " << cnt[2] << '\n';
        }else if (cnt[3] == cnt[4]) {
            cout << "WHU " << cnt[3] << '\n';
        }else {
            cout << "WHUT " << cnt[4] << '\n';
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

### B - 易守难攻        

#### 题意：

给定一个空的n行m列的网格，需要往每一个格子填入一个$1$ ~ $n\times m$的高度值，满足有k个网格的高度值严格大于8个相邻格子的高度值，且这k个网格不位于边界上。输出满足条件的网格，或者报告不存在这样的分配方式。

#### 思路：

首先明确：将大数一个隔一个的放是最大化能放置网格的放置方法。手模几个样例可以发现，若$(n - 1) / 2 \times (m - 1) / 2 < k$，则放不下满足条件的k个网格。我们可以从最大数开始放置。先将大数一个隔一个数地放，保证大数之间不会互相干扰。再依次放置其他数即可，可以保证大数总是可以满足条件的，且其他数不会形成新的满足条件的网格。

#### 代码：

``` c++
#include <bits/stdc++.h>
using namespace std;
using ll = long long;
using ld = long double;
using pi = pair<ll, ll>;

#define fi first
#define se second

const int MAXN = 6e7;
const double eps = 1e-5;
const ll mod = 1e9 + 7;

void solve ()
{
    ll n, m, k; cin >> n >> m >> k;
    if (((n - 1) / 2) * ((m - 1) / 2) < k) {
        cout << "No" << '\n';
        return;
    }

    vector <vector <ll> > v(n + 1, vector <ll> (m + 1));
    vector <vector <bool> > vis(n + 1, vector <bool> (m + 1, false));

    ll t = n * m;
    if (k != 0) {
        ll cnt = 0;
        bool found = true;
        for (int i = 2; i < n; i += 2) {
            for (int j = 2; j < m; j += 2) {
                cnt++;
                v[i][j] = t--;
                vis[i][j] = true;
                if (cnt == k) found = false;
                if (!found) break;
            }
            if (!found) break;
        }
    }

    for (int i = 1; i <= n; i++) {
        for (int j = 1; j <= m; j++) {
            if (vis[i][j]) continue;
            v[i][j] = t--;
        }
    }

    cout << "Yes" << '\n';
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
    cin >> _;
    while (_--) {
        solve();
    }
    return 0;
}   
```
### F - Anon的疑问

#### 题意：

询问$q$次$(1 \leq q \leq 1e6)$，每次询问给定一个正整数$n(1 \leq n \leq 2e7)$，判断其能否被分解为两个正整数的平方和。

#### 思路：

这里给出两种思路。

第一种思路：首先可以观察到这里的数据量并不是很大，我们完全可以直接预处理平方在$2e7$内的数，然后枚举得到所有满足条件的正整数。
时间复杂度:$O(2e7)$。

第二种思路：可以利用两平方和定理：对于任意的正整数$n = a^2 + b^2(a, b \in Z)$，当且仅当在n的质因数分解中，所有形如$p \equiv 3 (mod 4)$的质数，其指数都是偶数。根据定理，我们可以先预处理出在$2e7$内所有数的最小质因数，然后再根据每个数判断其指数奇偶性。

但是这里由于询问次数可能很多，时间复杂度相对于暴力可能没有优势，且无法通过本题，仅供参考。

时间复杂度：$O(q\times nlogn)$。

#### 代码：

##### 思路一：

``` c++
#include <bits/stdc++.h>
using namespace std;
using ll = long long;
using ld = long double;
using pi = pair<ll, ll>;

#define fi first
#define se second

const int MAXN = 6e7;
const double eps = 1e-5;
const ll mod = 1e9 + 7;

bool vis[20000005];//这里如果用vector记录可能会被卡常

void solve ()
{
    ll n; cin >> n;
    if (vis[n]) {
        cout << "Yes" << '\n';
    }else {
        cout << "No" << '\n';
    }
}

int main ()
{
    ios::sync_with_stdio(0);
    cin.tie(0); cout.tie(0);
    int _ = 1;
    cin >> _;

    for (int i = 1; i < 4473; i++) {
        if (i * i > 2e7 + 2) break;
        for (int j = i; j < 4473; j++) {
            if (i * i + j * j > 2e7 + 2) break;
            vis[i * i + j * j] = true;
        }
    }

    while (_--) {
        solve();
    }
    return 0;
}    
``` 

##### 思路二：（仅供参考）

``` c++
#include <bits/stdc++.h>
using namespace std;
using ll = long long;
using ld = long double;
using pi = pair<ll, ll>;

#define fi first
#define se second

const int N = 2e7 + 1;
const double eps = 1e-5;
const ll mod = 1e9 + 7;

bool isprime[N];
int prime[N], mnp[N];
ll cnt = 0;

void get_mn_prime_factor ()
{
    mnp[1] = 1;
    for (int i = 2; i < N; i++) {
        if (!isprime[i]) {
            prime[cnt++] = i;
            mnp[i] = i;
        }
        for (int j = 0; j < cnt && i * prime[j] < N; j++) {
            isprime[i * prime[j]] = true;
            mnp[i * prime[j]] = prime[j];
            if (i % prime[j] == 0) break;
        }
    }
}

void solve ()
{
    ll n; cin >> n;

    auto check = [&] (int x) -> bool {
        ll t = x;
        while (t != 1) {
            ll p = mnp[t];
            ll cnt = 0;
            while (t % p == 0) {
                t /= p;
                cnt++;
            }                               
            if (p % 4 == 3 && cnt & 1) {
                return false;
            }
        }
        if ((ll)sqrtl(x) * (ll)sqrtl(x) == x) return false;//特判
        else return true;
    };

    cout << (check(n) ? "Yes" : "No") << '\n';
}

int main ()
{
    ios::sync_with_stdio(0);
    cin.tie(0);
    int _ = 1;
    cin >> _;
    get_mn_prime_factor();
    while (_--) {
        solve();
    }
    return 0;
}   
```

### G - 你好，世界

#### 题意：

有一个初始值为0的N位计数器，用来预测一条指令是否应当执行。

- 当扫描到一条指令时，若计数器的值小于$2^{N - 1}$，则预测该指令将不被执行，否则预测将被执行。
- 无论是否预测正确，如果当前指令的真实状况为需要执行，则计数器增加1，否则计数器减少1。
- 计数器的增加和减少不会超过$[0,2^N)$这一界限。
  
你需要构造一个长度为len的01字符串（指令），0代表不执行，1代表执行，使得预测错误的次数最大。


#### 思路：

诈骗题。理解题意后，不难发现只需要使前$2^{N - 1}$个指令执行，后面的指令只需不执行，执行(01循环)即可。

#### 代码：

``` c++
#include <bits/stdc++.h>
using namespace std;
using ll = long long;
using ld = long double;
using pi = pair<ll, ll>;

#define fi first
#define se second

const int MAXN = 6e7;
const double eps = 1e-5;
const ll mod = 1e9 + 7;

ll qpow (ll a, ll b)
{
    ll res = 1;
    while (b) {
        if (b & 1) res = res * a;
        a = a * a;
        b >>= 1;
    }
    return res;
}

void solve ()
{
    ll n, len; cin >> n >> len;
    ll tag = len;
    if (n <= 60) tag = min(qpow(2, n - 1), len);

    for (int i = 0; i < tag; i++) {
        cout << 1;
    }
    for (int i = 0; i < len - tag; i++) {
        cout << (i & 1);
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

### H - 哆啦A梦的神奇铜锣烧储存系统

#### 题意：

有$n$个宝箱，其中有$k$个宝箱里装有铜锣烧，哆啦A梦先从中选择$m$个他认为最有可能装有铜锣烧的宝箱，然后在剩下的$n - m$个宝箱中随机打开$n - (m + q)$个空箱子（若没有空箱子则不打开），最后剩下$q$个宝箱是关闭的。
求出剩下的未打开$q$个宝箱中铜锣烧的期望数量（模998244353）。

#### 思路：

简洁的思路是：我们考虑任意一个真箱子，在每一次选完$m$个后，这个箱子仍然存在于$n - m$个箱子的期望为$E[X_i] = \frac{n - m}{n}$。一共有$k$个真箱子，只需要将$k$个期望累加就能得出答案：$\frac{n - m}{n} \times k$。

<br>
详细过程：（鸣谢笔者ichooooooo！）

**首先，这是一道超几何分布题**

经典场景：总共有$N$个商品，其中$M$个特殊品，选取$n$个出来

1. 求$n$个商品中特殊商品期望
   设$X$是$n$个商品里的特殊品数量  $E = \sum_{X = 0}^{M}(X \times P(X))$

   这里$P(X)$是从$n$个中抽取$X$个特殊品的概率， $X \times P(X)$ 是抽到$i$个特殊元素时，特殊品数量的期望贡献，$(n - X) \times P(X)$ 则是抽到$i$个特殊元素时，非特殊品数量的期望贡献
   
2. 求$P(X)$
   超几何分布知识，我们用$\binom{k}{i}$表示$C(i, k)$，最终公式
   $$\frac{\binom{M}{X}\binom{N - M}{n - X}}{\binom{n}{m}}$$
   其中$\binom{M}{X}$表示从$X$个总特殊品选取$M$个，那么剩下$n - X$个是非特殊，再从$N - M$个总非特殊选取$n - X$个，相乘是“有利情况”，除总情况就是概率

3. 期望化简后求和结果
   $$\frac{M}{N} \times n$$

回到题目，根据上面我们最终需要得到**抽n个商品时，非特殊商品的期望**，即
$${\sum_{i = 0}^{min(k, m)}(k - i)} \times P(i)$$
展开得
$$\frac{\sum_{i = 0}^{min(k, m)}\binom{k}{i}\binom{n - k}{m - i}(k - i)}{\binom{n}{m}}$$
化简得
$$\frac{n - m}{n} \times k$$

**关于为什么q不会影响到最终结果**

q只抽取空箱子，不影响特殊品的数量，根据公式，P(i)不变，权值k - i也不变，所以结果不变

#### 代码：

##### 原始公式:

``` c++
#include <bits/stdc++.h>
using namespace std;
using ll = long long;
using ld = long double;
using pi = pair<ll, ll>;

#define fi first
#define se second

const int MAXN = 1e6 + 10;
const double eps = 1e-5;
const ll mod = 998244353;

vector <ll> f(MAXN), g(MAXN);

ll qpow (ll a, ll b)
{
    ll res = 1;
    while (b) {
        if (b & 1) res = res * a % mod;
        a = a * a % mod;
        b >>= 1;
    }
    return res % mod;
}

ll C (ll n, ll m)
{
    if (m < 0 || m > n) return 0;
    return f[n] * g[m] % mod * g[n - m] % mod;
}

void solve ()
{
    ll n, k, m, q; cin >> n >> k >> m >> q;
    ll a = 0, b = 0;
    for (int i = 0; i <= min(k, m); i++) {
        a = (a + C(k, i) * C(n - k, m - i) % mod * (k - i) % mod) % mod;
    }
    b = C(n, m);
    ll ans = a * qpow(b, mod - 2) % mod;
    cout << ans << '\n';
}

int main ()
{
    ios::sync_with_stdio(0);
    cin.tie(0);
    int _ = 1;
    // cin >> _;

    f[0] = 1, g[0] = 1;
    for (int i = 1; i < MAXN; i++) {
        f[i] = f[i - 1] * i % mod;
        g[i] = qpow(f[i], mod - 2) % mod;
    }

    while (_--) {
        solve();
    }
    return 0;
}      
```

##### 化简：

``` c++
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

ll qpow (ll a, ll b)
{
    ll res = 1;
    while (b) {
        if (b & 1) res = res * a % mod;
        a = a * a % mod;
        b >>= 1;
    }
    return res % mod;
}

void solve ()
{
    ll n, k, m, q; cin >> n >> k >> m >> q;
    cout << (n - m) * k % mod * qpow(n, mod - 2) % mod << '\n';
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
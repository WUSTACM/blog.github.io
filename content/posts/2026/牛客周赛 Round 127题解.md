---
title: "牛客周赛 Round 127题解"
description: "在一串数组中找到一个子序列，这个子序列要是从1开始一直到任意一个数，顺序不影响，求有多少种子序列"
date: "2026-01-20 00:00:00"
updated: "2026-01-20 00:00:00"
permalink: "/2026/01/20/牛客周赛 Round 127题解"
categories: ["题解"]
tags: ["题解"]
---

# 牛客周赛 Round 127D-F题解

## D.Permutation² Counting

### 题意
在一串数组中找到一个子序列，这个子序列要是从1开始一直到任意一个数，顺序不影响，求有多少种子序列

### 思路
直接考虑取数，从一开始取，如果当前这个数出现了两次以上就可以继续往后取，这个数则有$C^{2}_{k}$种取法,k表示当前数字出现个数，算组合数可以用组合数模板，另外要注意的是这题不是算最长自序列的取法而是所有可能的和，所以需要累加


### 参考代码
```c++
#include <bits/stdc++.h>
#define int long long
using namespace std;

const int mod = 998244353;
const int N = 2e5 + 10;

vector<int> fact(N + 1);       
vector<int> inv_fact(N + 1);

int ksm(int a, int b, int mod) {
    int res = 1;
    while (b > 0) {
        if (b & 1) res = (res * a) % mod;
        a = (a * a) % mod;
        b >>= 1;
    }
    return res;
}

void precompute() {
    fact[0] = 1;
    for (int i = 1; i <= N; i++) {
        fact[i] = (fact[i - 1] * i) % mod;
    }

    inv_fact[N] = ksm(fact[N], mod - 2, mod);
    for (int i = N - 1; i >= 0; i--) {
        inv_fact[i] = (inv_fact[i + 1] * (i + 1)) % mod;
    }
}

int comb(int n, int k) {
    if (k < 0 || k > n) return 0;
    return fact[n] * inv_fact[k] % mod * inv_fact[n - k] % mod;
}

void solve() {
    int n;
    cin >> n;
    vector <int> pn(N + 1, 0);
    vector <int> a(n + 1);
    for(int i = 1; i <= n; i++) {
        cin >> a[i];
        if(a[i] <= N) {
            pn[a[i]]++;
        }
    }
    int ans = 0;
    int ans1 = 1;
    for(int i = 1; i <= N; i++) {
        if(pn[i] < 2) break;
        if(i == 1) {
            ans = comb(pn[i], 2);
            ans1 = ans;
        }else {
            ans1 = ans1 * comb(pn[i], 2) % mod;
            ans += ans1;
            ans %= mod;
        }
    }
    cout << ans % mod << endl;
    
}

signed main() {
    ios::sync_with_stdio(false);
    cin.tie(nullptr);
    precompute();
    int _ = 1;
    cin >> _;
    while(_--) {
        solve();
    }

    return 0;
}
```

## E.Balanced 01-String

### 题意
给定一个字符串，由'0','1','?',组成，'?'可以修改为'1'或者'0',问有多少种修改方式使该字符串相邻两个字符相同的个数为偶数个

### 思路
考虑到使用dp，这里我使用的是三维dp，三个维度分别是前i个字符，当前字符是1或者0,当前字符串相邻元素个数是奇还是偶，因为问号可以转化为'1'或者'0',所以问号既要考虑1的也要考虑0。当该字符是1时，转移方程为:（前i个字符-第i个字符是0-前i个字符是相邻是偶数的情况） =（前i-1个字符-第i-1个字符是0-前i-1个字符是偶数个） + （前i-1个字符-第i-1个字符是1-前i-1个字符是奇数个），我们考虑的是当前这个字符对奇偶性的影响

### 参考代码
``` c++
#include <bits/stdc++.h>
#define int long long
using namespace std;
const int N = 5e5 + 10;
const int mod = 998244353;

void solve() {
    int dp[N][2][2];
    string s;
    cin >> s;
    int n = s.size();
    for(int i = 0; i < n; i++) {
        if(s[i] == '0') {
            if(i == 0) {
                dp[0][0][0] = 1;
                dp[0][0][1] = 0;
                dp[0][1][0] = 0;
                dp[0][1][1] = 0;
            }else {
                dp[i][0][0] = (dp[i - 1][0][1] + dp[i - 1][1][0]) % mod;
                dp[i][0][1] = (dp[i - 1][0][0] + dp[i - 1][1][1]) % mod;
                dp[i][1][0] = 0;
                dp[i][1][1] = 0;
            }
        }else if(s[i] == '1') {
            if(i == 0) {
                dp[0][0][0] = 0;
                dp[0][0][1] = 0;
                dp[0][1][0] = 1;
                dp[0][1][1] = 0;
            }else {
                dp[i][1][0] = (dp[i - 1][0][0] + dp[i - 1][1][1]) % mod;
                dp[i][1][1] = (dp[i - 1][0][1] + dp[i - 1][1][0]) % mod;
                dp[i][0][0] = 0;
                dp[i][0][1] = 0;
            }
        }else if(s[i] == '?') {
            if(i == 0) {
                dp[0][0][0] = 1;
                dp[0][0][1] = 0;
                dp[0][1][0] = 1;
                dp[0][1][1] = 0;
            }else {
                dp[i][1][0] = (dp[i - 1][0][0] + dp[i - 1][1][1]) % mod;
                dp[i][1][1] = (dp[i - 1][0][1] + dp[i - 1][1][0]) % mod;
                dp[i][0][0] = (dp[i - 1][0][1] + dp[i - 1][1][0]) % mod;
                dp[i][0][1] = (dp[i - 1][0][0] + dp[i - 1][1][1]) % mod;
            }
        }
    }
    cout << (dp[n - 1][1][0] + dp[n - 1][0][0]) % mod << endl;
}

signed main() {
    ios::sync_with_stdio(false);
    cin.tie(nullptr);
    int _ = 1;
    cin >> _;
    while(_--) {
        solve();
    }

    return 0;
}
```

## F.Matrix Coloring

### 题意
当一颗白子的上下左右至有两颗黑子，并且这两颗黑子的连通的，那么这个白子可以变为黑子，两颗子连通可以理解为这颗子通过上下左右或者走斜边的黑子的方式可以走到另一个子，这两颗子就是连通的，问最后棋盘的样子

### 思路
直接进行dfs模拟，若当前子在他的上方和右方或者上方和左方或者下方和右方或者下方和左方都有黑子，那么这颗子就可以变成黑子，再接着考虑这颗子有可能使哪些子变成黑子，易观察得知有可能会是上下左右四颗子变成黑子，递归模拟

### 参考代码
```c++
#include <bits/stdc++.h>
#define int long long
using namespace std;
const int N = 5e5 + 10;
const int mod = 998244353;
int n;
int dx[] = {1, 0, -1, 0};
int dy[] = {0, 1, 0, -1};

void color(int x, int y, vector <string> &pn) {
    if(pn[x][y] == '1') return ;
    if(x > 0 && y > 0 && pn[x-1][y] == '1' && pn[x][y - 1] == '1') {
        pn[x][y] = '1';
    }else if(x > 0 && y + 1 < n && pn[x - 1][y] == '1' && pn[x][y + 1] == '1') {
        pn[x][y] = '1';
    }else if(x + 1 < n && y > 0 && pn[x + 1][y] == '1' && pn[x][y - 1] == '1') {
        pn[x][y] = '1';
    }else if(x + 1 < n && y + 1 < n && pn[x + 1][y] == '1' && pn[x][y + 1] == '1') {
        pn[x][y] = '1';
    }
    if(pn[x][y] == '1') {
        if(x > 0) color(x - 1, y, pn);
        if(x + 1 < n) color(x + 1, y, pn);
        if(y > 0) color(x, y - 1, pn);
        if(y + 1 < n) color(x, y + 1, pn);
    }else {
        return ;
    }
    
}

void solve() {
    cin >> n;
    vector < string > pn(n + 1);
    for(int i = 0; i < n; i++) {
        cin >> pn[i];
    }
    for(int i = 0; i < n; i++) {
        for(int j = 0; j < n; j++) {
            color(i, j, pn);
        }
    }
    for(int i = 0; i < n; i++) {
        cout << pn[i] << endl;
    }

}

signed main() {
    ios::sync_with_stdio(false);
    cin.tie(nullptr);
    int _ = 1;
    cin >> _;
    while(_--) {
        solve();
    }

    return 0;
}
```

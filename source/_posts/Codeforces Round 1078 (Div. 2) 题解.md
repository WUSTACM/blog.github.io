---
title: Codeforces Round 1078 (Div. 2)题解
date: 2026-2-09
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

# [Codeforces Round 1078 (Div. 2)](https://codeforces.com/contest/2194) 题解

## A. Lawn Mower

### 题意：

一段连续$n$个木板组成的围栏，每个木板长$1$米，割草机宽$w$米，问最多拆除多少个木板，可以保证割草机不可以穿过围栏？

<!-- more -->

### 分析：

将长度为$n$的围栏分为若干个长为$w$的围栏块，根据左开有闭，每个围栏块保证最右边留下一个木板，其余可以全部拆除，这样就可以保证割草机出不去，并且最大化拆除数

```c++
#include<bits/stdc++.h>
#define int long long
using namespace std;
using ll = long long;
using arr2 = array<int, 2>;
using arr3 = array<int, 3>;
const int N = (int)2e5 + 9;
const int M = (int)1e5 + 9;
const int mod = 998244353;

void solve() {
    int n, w;
    cin >> n >> w;
    cout << n - n / w << "\n";
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



## B. Offshores

### 题意：

$n$个银行各存着些许钱，现在想要尽可能将钱转移到同一个银行中，并使这一个银行的金额最大，每次转移只能恰好转移$x$元，并且受到方银行只能受到$y$元（$x \ge y$）

### 分析：

样例解释害人不浅.....考虑贪心，对于每家银行，都考虑假设它不是最终的转入方，即它是要尽可能的转钱给其他银行的，那么维护每家银行的作为转出方的亏损值即可，亏损值最大的那家银行应该作为最终转入方（虽然样例解释的转移逻辑非常复杂，实际上，除$2$意外的其他银行之间转入给$2$号银行会同样得到样例一的正确答案，因为$2$号银行就是亏损值最大的银行）

```c++
#include<bits/stdc++.h>
#define int long long
using namespace std;
using ll = long long;
using arr2 = array<int, 2>;
using arr3 = array<int, 3>;
const int N = (int)2e5 + 9;
const int M = (int)1e5 + 9;
const int mod = 998244353;

bool cmp(arr2 a, arr2 b) {
    return a[0] > b[0];
}

void solve() {
    int n, x, y;
    cin >> n >> x >> y;
    vector<arr2> a(n + 5);
    int sum = 0;
    for (int i = 1; i <= n; i++) {
        cin >> a[i][1];
        sum += a[i][1];
        a[i][0] = a[i][1] % x + (a[i][1] / x * (x - y));
    }
    sort(a.begin() + 1, a.begin() + 1 + n);
    for (int i = 1; i < n; i++) {
        sum -= a[i][0];
    }
    cout << sum << "\n";
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



## C. Secret message

### 题意：

有$k$个长度为$n$的字符串，你需要从$n$个位置的每一个位置，选出对应的$k$个字符串的$k$个字符选出一个字符，组成一个新的长度为$n$的字符串，要使得这个字符串是能由尽可能短的单元字符串反复复制拼接形成。输出这个字符串

### 分析：

赛时题目补充结果字符串必须是由最小单元字符串完全复制不可剩余，意味着单元字符串长度必须是能被$n$整除的，并且我们要求最短合法单元字符串，不难想到直接从小到大暴力枚举最小单元长度，枚举要满足被$n$整除，所以复杂度只有$logn$

枚举固定最小单元长度为$len$后，只需要判断是否合法即可

- 意味着要能都选出前$len$个字符，使得其中每一个字符$s[j]$都满足 $s[j] = s[j + len] = s[j + 2 \times len].....$（其中选取的每个字符$s[j]$都是可以从$k$个字符串的同一个位置中选取）

时间复杂度就是 

$logn(枚举最短单元字符串长度) \times len(选取前len位作为单元字符串)$

 $\times \frac{k}{len}(对前len位的每一位字符枚举在后续的每个单元位置) \times k(前者枚举的每个单元位置在k个字符串中一一查找是否存在)$

总的就是$logn \times len \times \frac{k}{len} \times k = logn \times k \times k$

至此可能还是会超时，但是不难发现最后这个复杂度$k$的操作是可以直接预处理的，题目说保证所有数据$n \times k$的总和不超过$1e5$，所以直接$n \times k$预处理$1到n$的每个位置的$k$个字符串的字符都有哪些字符出现过即可，后续$O(1)$判断即可

则总时间就是$logn \times k$

详见代码注释

```c++
#include<bits/stdc++.h>
#define int long long
using namespace std;
using ll = long long;
using arr2 = array<int, 2>;
using arr3 = array<int, 3>;
const int N = (int)2e5 + 9;
const int M = (int)1e5 + 9;
const int mod = 998244353;

void solve() {
    int n, k;
    cin >> n >> k;
    vector<string> s(k);
    for (int i = 0; i < k; i++) cin >> s[i];
    //预处理
    vector<vector<bool>> vis(n + 5, vector<bool>(30, 0));
    for (int i = 0; i < n; i++) {
        for (int j = 0; j < k; j++) {
            vis[i][s[j][i] - 'a'] = 1;
        }
    }
    //枚举单元字符串长度
    for (int len = 1; len <= n; len++) {
        //注意continue
        if (n % len) continue;
        string tmp = "";
        bool fff = 0;
        //枚举前len位的字符选取
        for (int i = 0; i < len; i++) {
            bool f = 0;
            //每一位都从k个字符串在i这个位置的字符中选取
            for (int j = 0; j < k; j++) {
                //s[j][i]
                int xx = s[j][i] - 'a';
                bool ff = 0;
                //每个选取出来的字符判断是否可以在后续循环出现
                for (int p = i + len; p < n; p += len) {
                    if (!vis[p][xx]) {
                        ff = 1;
                        break;
                    }
                }
                if (!ff) {
                    tmp += s[j][i];
                    f = 1;
                    break;
                }
            }
            if (!f) {
                fff = 1;
                break;
            }
        }
        if (!fff) {
            int xxx = tmp.size();
            for (int i = 0; i < n; i++) {
                cout << tmp[i % xxx];
            }
            cout << "\n";
            return ;
        }
    }
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

## D. Table Cut

### 题意：

$n \times m$的$01$单元表格，你需要画出一条以左上角为起点，右下角为终点的分割线，划分只允许向下或者向右，使得分割的两部分分别的单元格总和的乘积最大化

### 分析：

显然，这是高中基本不等式的典型题，“和定积最大”，最终两块区域分别的单元格总和的和是定值（就是所有$1$单元格的数量$sum$），所以乘积最大就是就是让两块区域分别和越接近即可，即平均分，所以可以直接求得乘积最大值

- 由于分割线每次只能向下或者向右，那么其实只需维护一个二维前缀和，动态保证切割线的上方区域的和为$\frac{sum}{2}$
- 只需先考虑切割线一直向下走（假设向下走一步，切割先都是水平一刀切）直到水平切的上方区域和大于$\frac{sum}{2}$，意味着这一行不可以全部取，所以向下只能走到这一行的上一行，再考虑慢慢向右走，知道区域和等于$\frac{sum}{2}$，那么就是向下一步，然后一直向右到最右边，再一直向下到右下角即可

```c++
#include<bits/stdc++.h>
#define int long long
using namespace std;
using ll = long long;
using arr2 = array<int, 2>;
using arr3 = array<int, 3>;
const int N = (int)2e5 + 9;
const int M = (int)1e5 + 9;
const int mod = 998244353;

void solve() {
    int n, m;
    cin >> n >> m;
    vector<vector<int>> a(n + 5, vector<int> (m + 5));
    auto pre = a;
    int sum = 0;
    for (int i = 1; i <= n; i++) {
        for (int j = 1; j <= m; j++) {
            cin >> a[i][j];
            sum += a[i][j];
            pre[i][j] = pre[i - 1][j] + pre[i][j - 1] + a[i][j] - pre[i - 1][j - 1];
        }
    }
    if (sum == 0) {
        cout << 0 << "\n";
        for (int j = 1; j <= m; j++) cout << 'R';
        for (int i = 1; i <= n; i++) cout << 'D';
        cout << "\n";
        return ;
    }
    if (sum % 2) {
        cout << sum / 2 * (sum / 2 + 1) << "\n";
    }
    else cout << sum / 2 * (sum / 2) << "\n";
    int cnt = 0;
    int i = 1;
    string ans = "";
    while (i <= n) {
        cnt = pre[i][m];
        
        if (i != 1) ans += 'D';
        if (cnt > sum / 2) break; 
        i++;
    }
    int j = 1;
    int tmp = cnt;
    while (j <= m) {
        cnt = tmp - (pre[i][j] - pre[i - 1][j]);
        ans += 'R'; 
        if (cnt <= sum / 2) break;
        j++;
    }
    ans += 'D';
    i++;
    j++;
    for (j; j <= m; j++) ans += 'R';
    for (i; i <= n; i++) ans += 'D';
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

打的很抽象的一把，a题理所当然暴力t了一发，b题贪心第一版贪错了浪费好久，c题以为会是这场最后一题稳着开，神人题面wa两罚才看到补充信息说是必须完全复制不可以剩余，加一行continue后ac.....最后二十分钟才看到d题，发现竟然是个很简单的题秒出思路无语了，二维前缀和就可以了，然后没时间了，写一版没时间调试果然wa了（随后的牛客周赛又是神人发挥.....今天爆炸）继续加油了......
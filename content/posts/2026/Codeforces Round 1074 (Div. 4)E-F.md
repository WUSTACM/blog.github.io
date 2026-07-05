---
title: "Codeforces Round 1074 (Div. 4)E-F 题解"
description: "给你一个初始数组和一个极限值，每次对这个初始数组的一个数进行更改，如果超过了极限值，这个数组变为最初始的数组，最后输出这个数组"
date: "2026-01-20 00:00:00"
updated: "2026-01-20 00:00:00"
permalink: "/2026/01/20/Codeforces Round 1074 (Div. 4)E-F"
categories: ["题解"]
tags: ["题解"]
---

# Codeforces Round 1074 (Div. 4) D-F题题解
---
## D. OutOfMemoryError

### 题意
给你一个初始数组和一个极限值，每次对这个初始数组的一个数进行更改，如果超过了极限值，这个数组变为最初始的数组，最后输出这个数组

### 思路
这题纯模拟会出现超时的问题，我一开始就T4了，因为如果超过极限值，数组的每一个值都重新赋值太耗时了，可以考虑记录当前状态，每一次在加数前考虑其是否被清空成原数组了



### 参考代码
```c++
#include <bits/stdc++.h>
#define int long long
using namespace std;

const int mod = 998244353;

void solve() {
    int n, m, h;
    cin >> n >> m >> h;
    vector <int> p (n + 1);
    for(int i = 1; i <= n; i++) cin >> p[i];
    vector <int> add(n + 1);
    vector <int> biao(n + 1);
    int cnt = 0;
    for(int i = 1; i <= m; i++) {
        int b, c;
        cin >> b >> c;
        if(biao[b] < cnt) {
            biao[b] = cnt;
            add[b] = 0;
        }
        add[b] += c;
        if(add[b] + p[b] > h) {
            cnt++;
        }
    }
    for(int i = 1; i <= n; i++) {
        if(biao[i] == cnt) cout << p[i] + add[i] << ' ';
        else cout << p[i] << ' ';
    }
    cout << endl;
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

## E. The Robotic Rush

### 题意
有若干机器人和若干钉子，机器人每次执行向左一步或向右一步的操作，问每一次执行完有几个机器人没碰到钉子

### 思路
在一个数轴上找到每一个机器人左边的第一个钉子离它的距离和右边第一个钉子离他的距离，模拟每次移动判断有无碰到（分别按左边距离和右边距离的大小排序再查找），用map表示某个机器人有没有碰到钉子

### 参考代码
``` c++
#include <bits/stdc++.h>
#define int long long
using namespace std;

const int N = 2e5 + 10;

struct node{
    int id;
    int l;
    int r;
};

bool cmp(node a, node b) {
    return a.l < b.l;
}

bool cmp2(node a, node b) {
    return a.r < b.r;
}


void solve() {
    int n, m, k;
    cin >> n >> m >> k;
    vector <int> p(n + 1);
    vector <int> q(m + 1);
    for(int i = 1; i <= n; i++) {
        cin >> p[i];
    }
    for(int i = 1; i <= m; i++) {
        cin >> q[i];
    }
    sort(p.begin() + 1, p.end());
    sort(q.begin() + 1, q.end());
    vector <int> l(n + 1);
    vector <int> r(n + 1);
    int left = 1, right = 1;
    for(int i = 1; i <= n; i++) {
        while(left + 1 <= m && q[left + 1] <= p[i]) {
            left++;
        }
        while(right + 1 <= m && q[right] < p[i]) {
            right++;
        }

        if(p[i] < q[left]) l[i] = N;
        else l[i] = p[i] - q[left];
        if(q[right] <= p[i]) r[i] = N;
        else r[i] = q[right] - p[i];
    }
    vector <node> peo(n + 1);
    for(int i = 1; i <= n; i++) {
        peo[i].l = l[i];
        peo[i].r = r[i];
        peo[i].id = i;
    }
    sort(peo.begin() + 1, peo.end(), cmp);
    auto L = peo;
    sort(peo.begin() + 1,peo.end(), cmp2);
    auto R = peo;
    string s;
    cin >> s;
    int now = 0;
    map <int,int> mp;
    int ans = n;
    int j = 1, o = 1;
    for(int i = 0; i < k; i++) {
        if(s[i] == 'L')now--;
        else now++;
        if(now < 0) {
            for(j; j <= n; j++) {
                if(L[j].l <= -now) {
                    if(!mp[L[j].id]) {
                        mp[L[j].id] = 1;
                        ans--;
                    }
                }else{
                    break;
                }
            }
        }else if(now > 0) {
                for(o; o <= n; o++) {
                if(R[o].r <= now) {
                    if(!mp[R[o].id]) {
                        mp[R[o].id] = 1;
                        ans--;
                    }
                }else{
                    break;
                }
            }
        }
        cout << ans << ' ';
    }
    cout << endl;
    

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

## F. BattleCows

### 题意
有一串数字堆，每次两两比较大小，大的压在小的上面（相等时左边压在右边上面），每次比较大小比较的是每一堆数字的异或值，多次操作，每次操作独立，每次操作改变其中一个数的大小，问这个改变的数字上面有几个数字

### 思路
不管是大数压在小数上还是小数压在大数上，他们的异或值都是一样的，考虑使用前缀异或数组，这样可以快速求出一段数字的异或值，然后从中间开始分治（有点类似二分）包含中间那个点的那一边如果小于另一边那么最后的答案加上另一边的长度就行，修改点可以通过异或运算修改

### 参考代码
``` c++
#include <bits/stdc++.h>
#define int long long
using namespace std;

int mypow(int x) {
    int ans = 1;
    for(int i = 1; i <= x; i++) {
        ans *= 2;
    }
    return ans;
}

void solve() {
    int n, q;
    cin >> n >> q;
    int N = mypow(n);
    vector <int> p(N + 1);
    vector <int> pre(N + 1);
    for(int i = 1; i <= N; i++) cin >> p[i];
    for(int i = 1; i <= N; i++) pre[i] = pre[i - 1] ^ p[i];
    while(q--) {
        int b, c;
        cin >> b >> c;
        int left = 1, right = N;
        int ans = 0;
        while(left < right) {
            int mid = (left + right) >> 1;
            if(b <= mid) {
                int ans1 = pre[mid] ^ pre[left - 1] ^ p[b] ^ c;
                int ans2 = pre[mid] ^ pre[right];
                if(ans1 < ans2) ans += right - mid;
                right = mid;
                
            }else {
                int ans1 = pre[mid] ^ pre[left - 1];
                int ans2 = pre[mid] ^ pre[right] ^ p[b] ^ c;
                if(ans2 <= ans1) ans += right - mid;
                left = mid + 1;
            }

        }
        cout << ans << endl;
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

---
title: AtCoder Beginner Contest 440题解
date: 2026-1-11
tags: [题解]
categories: [算法]
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
author: Ichooooooo
references:
comments: true
indexing:
breadcrumb:
leftbar:
h1:
type:
---

# AtCoder Beginner Contest 440题解

## A

### 题意
求$X$翻倍$Y$次的结果  `是翻倍不是求幂QAQ`

### 思路
位运算或者$pow()$

### 代码
```cpp
void solve(){   
    int x, y;
    cin >> x >> y;
    // cout << x * pow(2, y) << endl;
    while (y --) x <<= 1; // 位运算
    cout << x << endl;
}
```

<!--more-->
## B

### 题意
给定长度为$N$数组, 求最大的三个值的编号

### 思路
结构体或者$pair$存储

### 代码
```cpp
void solve(){   
    int n; cin >> n;
    vector<PII> a(n + 1);
    for (int i = 1; i <= n; i ++) {
        cin >> a[i].first; 
        a[i].second = i;    //注意编码
    }
    sort(a.begin() + 1, a.end());   //注意条件
    cout << a[1].second << ' ' << a[2].second << ' ' << a[3].second << endl;
}
```

### 关于排序
1. 重载$cmp$最严谨写法
```cpp
sort(a.begin() + 1, a.end(), [](PII x, PII y) {
    if (x.first != y.first) return x.first < y.first; 
    else return x.second < y.second;    //根据具体题目
});
```
- 本题数组值都不一样, 重载时候不会出现键不同的情况, 不写分类不会报错
- $sort$本身对$pair$排序的时候先比较键, 后比较值

2. 逆序排序写法
```cpp
// 1-based排序
sort(a.begin() + 1, a.end(), greater<int>());

sort(a.begin() + 1, a.end());
reverse(a.begin() + 1, a.end());

//仅0-based排序可用
sort(v.rbegin(), v.rend());
```


## C

### 题意
给定一个数组，取任意的$x$，将$1  \leq i \leq N$ 的内所有整数 $i$中满足$ (i + x) $ 除以 $2W$的余数小于$ W $的数加上,求最小总和

### 思路

最简单的思路是枚举$x$, 然后求出总和比较, 注意到因为取模操作, $x < 2W$即可,时间复杂度$O(T \cdot W \cdot N)$

继续优化, 我们注意到取模操作会让范围都落在$[0, 2W - 1]$上, 且
$$(i + x) \% 2W = (i + x + 2W) \% 2W$$
将下标离散化为$[0, 2W - 1]$上, 问题转化为求$2W$长的数组中长度为$W$的最小连续子段和,用滑动窗口, 时间复杂度为$O(T \cdot (W + N))$

### 代码
```cpp
void solve(){   
    int n, w;
    cin >> n >> w;
    vector <int> a(n + 1);
    vector <int> b(2 * w);
    int m = 2 * w;

    for (int i = 1; i <= n; i ++) {
        cin >> a[i];
        b[i % m] += a[i];
    }

    int mn, cur, pas;
    mn = accumulate(b.begin(),b.begin() + w, 0LL);  
    pas = mn;
    

    for (int i = 1; i < 2 * w; i ++) {  
        cur = pas - b[i - 1] + b[(i + w - 1) % m];
        mn = min (cur, mn);
        pas = cur;
    }

    cout << mn << endl;
}
```

## D

### 题意
给定长度为$N$的数组$A$, $Q$次查询, 给定$X$, $Y$, 求值$ans$使得[$X$, $ans$]之间存在$Y$个不在数组中的数

### 思路
首先如果可以确定$ans$的值的情况下, 令[$X$, $ans$]之间$   \neq A_i$的值的个数为$an$, 如果我们知道$A$在[$X$, $ans$]的第一个下标$l$和最后一个下标$r$, 那么有
$$an = ans - x + 1 - (r - l + 1)$$

要求$an = y$. 那么最简单的想法, 二分答案$ans$, 预处理超过$A_{max}$的情况, 数组$A$的最大范围$m=1
e9$, 时间复杂度$O(mlogm)$, 需要优化

我们注意到, $ans$不可能是$A_i$, 我们的$an$遇到$A_i$就会改变, 根据上面表达式, 与数组$A$相关的其实只有$r$和$l$, 所以我们可以选择枚举$ans$的范围, 设$r$是第一个大于$ans$的值, 此时公式
$$an = A_r - x - (r - l)$$
求满足$an \geq ans$的最小$r$即可, 最终答案
$$ ans = x + y -1 + (r - l)$$
时间复杂度$O(nlogn)$

### 代码
```cpp
void solve(){   
    int n, q;
    cin >> n >> q;
    vector<int> a (n + 1);
    for (int i = 1; i <= n; i ++) {
        cin >> a[i];
    }
    ranges :: sort (a);
    int x, y;
    while (q --) {
        cin >> x >> y;

        int l = lower_bound(a.begin() + 1, a.end(), x) - a.begin();
        if (l > n) {
            cout << x + y - 1 << endl;
            continue;
        }
        int mn = l;
        int r = n;
        while (l <= r) {
            int mid = l + (r - l) / 2;
            int an = a[mid] - x - (mid - mn);
            if (an < y) {
                l = mid + 1;
            } else {
                r = mid - 1;
            }
        }
        
        if (l > n) {
            cout << x + y - 1 + (n - mn + 1) << endl;
        } else {
            cout << x + y - 1 + (l - mn) << endl;
        }
    }
}
```
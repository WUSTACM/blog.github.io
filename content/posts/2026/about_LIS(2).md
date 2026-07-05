---
title: "关于LIS(最长递增子序列)(2)"
description: "定义：在一个给定的数值序列中，找到一个子序列，使得这个子序列元素的数值依次递增，并且这个子序列的长度尽可能地大。"
date: "2026-02-06 00:00:00"
updated: "2026-02-06 00:00:00"
permalink: "/2026/02/06/about_LIS(2)"
categories: ["算法"]
tags: ["算法"]
---

# 关于LIS(最长递增子序列)(2)

- 定义：在一个给定的数值序列中，找到一个子序列，使得这个子序列元素的数值依次递增，并且这个子序列的长度尽可能地大。

在[关于LIS(最长递增子序列)](https://blog.wustacm.org/2026/01/16/about_LIS/)中，给出了$LIS$的$dp$+二分优化 $ O(nlogn) $ 解法，这里再提供一种**树状数组**的解法。



## 朴素的暴力尝试

```cpp
vector<int> dp(n+1,0),a(n+1,0);
int ans = 0;
for(int i = 1;i<=n;i++){
    for(int j = 1;j<i;j++){
        if(a[i]>a[j]){
            dp[i] = max(dp[j],dp[i]);
        }
    }
    dp[i]++;
    ans = max(ans , dp[i]);
}

```

$dp_i$的含义：以当前下标为结尾的$LIS$最大长度

这里我们得到了状态转移方程: $ dp_i = max_{a_i>a_j}(dp_j)+1 , 0\leq j < i$ 

但是这段代码的时间复杂度是$O(n^2)$，观察状态转移方程，可以发现需要一种快速求前缀最大值的方法，同时兼顾修改操作。

## 树状数组优化

树状数组仅能维护可差分信息，但是这题只需要查询前缀最大值(即从下标1到下标$i$的最大值)，使用树状数组仍能保证答案的正确性，故使用树状数组，感兴趣的可以试试使用线段树优化。

### dp数组重定义

在这里重新定义了$dp_i$的含义：以当前值为结尾的$LIS$的最大长度。这么定义$dp_i$有一个好处，就是把所有值大于等于$i$的数都排除在外，无需再做其他判断。

### 查询与更新答案

- 查询：查询$maxn = dp_j,0\leq j <i$的最大值
- 更新：更新$dp_i=maxn+1$

### 代码实现

```cpp
#include <bits/stdc++.h>
using ll = long long;
using namespace std;

struct BIT{
    int n;
    vector<int> bit;
    
    BIT(int n):n(n),bit(n+1,0){}
    
    int lowbit(int x){return x&-x;}
    
    void upd(int i,int k){ // 更新前缀最大值
        while(i<=n){
            bit[i] = max(bit[i],k);
            i += lowbit(i);
        }
    }
    
    int query(int i){ // 查询前缀最大值
        int res = 0;
        while(i){
            res = max(bit[i],res);
            i -= lowbit(i);
        }
        return res;
    }
};

int main(){
    int n; cin >> n;
    vector<int> a(n+1,0);
    int A = 0; // A为a数组中的最大值
    for(int i = 1;i<=n;i++){
        cin >> a[i];
        A = max(a[i],A);
    }
    
    BIT dp(A);
    for(int i = 1;i<=n;i++){
        dp.upd(a[i],dp.query(a[i]-1)+1);
    }
    cout << dp.query(A) << endl;
    return 0;
}
```

时间复杂度：$O(nlogA)$

空间复杂度：<span style="color : red;">O(A)​</span>

如果<span style="color : red;">数组中的值</span>过大，就会导致$MLE$，所以需要进一步优化

## 离散化+树状数组

注意到，当$A$过大时，树状数组中有很多没在原数组出现过的值，这些值并不会影响答案，也就是说原数组中最多出现$n$个不同的数。

离散化的作用就是将没出现过的值排除在外，只在树状数组中保留出现过的值，这样就可以降低空间复杂度至$O(n)$级别了。

### 离散化的步骤

1. 获取原数组的所有值，并排序。
2. 排序数组去重。
3. 使用快速查询原数组的值在排序数组中的下标的函数，使用二分可以达到$O(logn)$的单次查询。

### dp数组再重定义

根据离散化，再次重新定义$dp_i$的含义：以排序数组下标$i$对应原数组元素结尾的$LIS$的最大长度。

### 代码实现

```cpp
#include <bits/stdc++.h>
using ll = long long;
using namespace std;

struct BIT{
    int n;
    vector<ll> bit;
    
    BIT(int n):n(n),bit(n+1,0){}
    
    int lowbit(int x){return x&-x;}
    
    void upd(int i,int k){ // 更新前缀最大值
        while(i<=n){
            bit[i] = max(bit[i],k);
            i += lowbit(i);
        }
    }
    
    void query(int i){ // 查询前缀最大值
        int res = 0;
        while(i){
            res = max(bit[i],res);
            i -= lowbit(i);
        }
        return res;
    }
};

int main(){
    int n; cin >> n;
    vector<int> a(n+1,0);
    for(int i = 1;i<=n;i++){
        cin >> a[i];
    }
    
    vector<int> t = a;
    sort(t.begin(),t.end());
    int A = 1;
    // 可以使用t.erase(unique(t.begin(),t.end()),t.end())代替
    for(int i = 1;i<=n;i++){
        if(t[i]!=t[i-1]){ // 有序数组去重，时间复杂度O(n)
            t[A++] = t[i];
        }
    }
    
    auto rank = [&](int x)->int
    { // 二分，可以使用系统内置lower_bound函数代替，但是要确保下标从1开始
        int l = 1,r = A,mid ,ans = 0;
        while(l<=r){
            mid = l+r>>1;
            if(t[mid]>=x){
                ans = mid;
                r = mid-1;
            }
            else{
                l = mid+1;
            }
        }
        return res;
    };
    
    BIT dp(A);
    for(int i = 1;i<=n;i++){
        dp.upd(a[i],dp.query(rank(a[i])-1)+1); // 注意是查询下标
    }
    cout << dp.query(rank(A)) << endl;
}
```

时间复杂度：$O(n \times logmax(n,A))$

空间复杂度：$O(n)$

## 权值树状数组/线段树

- 权值数组定义：一个序列$a$的权值数组$b$，满足$b_x$的值为$x$ 在$a$中的出现次数。

例如：$a$=(1,3,4,3,4)的权值数组为$b$=(1,0,2,2)

权值数组是原数组无序性的一种表示：它重点描述数组的元素内容，忽略了数组的顺序，若两数组只是顺序不同，所含内容一致，则它们的权值数组相同。

在原数组的权值数组上构建树状数组，就是权值树状数组。

### 适用范围

- 需要动态统计某个数值范围内的元素个数 / 总和（比如 “比 x 小的元素有多少个”） 
-  问题核心是 “数值的频率 / 权重”，而非 “元素的位置”； 
-  数值范围可通过离散化映射到有限区间（1~n）。 

### 一般解题步骤

1. 对原数组做离散化
2. 实现树状数组/线段树的模板，更新与查询
3. 结合题目逻辑，汇总答案

代码实现都在$LIS$的模板里面了。

### 类似题目

[P1908 逆序对](https://www.luogu.com.cn/problem/P1908)

[P1439 两个排列的最长公共子序列](https://www.luogu.com.cn/problem/P1439)

[P1637 三元上升子序列](https://www.luogu.com.cn/problem/P1637)

[ 小苯的极大支配 ](https://ac.nowcoder.com/acm/contest/122724/F)


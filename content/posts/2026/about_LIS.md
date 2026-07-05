---
title: "关于LIS(最长递增子序列)"
description: "对于求一个数列的最长递增子序列，我们可以在外维护一个数组$a$，用来存放递增序列。从前到后遍历每一个$v[i]$，对于每一个$v[i]$，使用二分查找寻找其能在数组$a$中所能替换的位置，即第一个大于等于$v[i]$的位置，将其替换为$v[i]$。若$v[i]$大于数组中的..."
date: "2026-01-16 00:00:00"
updated: "2026-01-16 00:00:00"
permalink: "/2026/01/16/about_LIS"
categories: ["算法"]
tags: ["算法"]
---

# 关于LIS(最长递增子序列)

对于求一个数列的最长递增子序列，我们可以在外维护一个数组$a$，用来存放递增序列。从前到后遍历每一个$v[i]$，对于每一个$v[i]$，使用二分查找寻找其能在数组$a$中所能替换的位置，即第一个大于等于$v[i]$的位置，将其替换为$v[i]$。若$v[i]$大于数组中的所有数字，即可将其放到最后，此时数组长度会加一。答案即是数组$a$中有效的长度。

时间复杂度：$O(nlogn)$。

代码：

``` c++
#include <bits/stdc++.h>
using namespace std;
using ld = long double;
#define int long long
#define fi first
#define se second

void solve ()
{
    int n; cin >> n;
    vector <int> v(n + 1);
    for (int i = 1; i <= n; i++) {
        cin >> v[i];
    }

    vector <int> a(n + 1);
    a[1] = v[1];
    int ans = 1;
    for (int i = 2; i <= n; i++) {
        int pos = lower_bound(a.begin() + 1, a.begin() + 1 + ans, v[i]) - a.begin();
        a[pos] = v[i];
        if (pos > ans) ans++;
    }

    cout << ans << '\n';
}   
    
signed main ()
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

若为最长不下降子序列，为了让相等也能延长长度，我们要把相等元素放到后面一位，只用更改二分查找的pos即可：``` int pos = upper_bound(a.begin() + 1, a.begin() + 1 + ans, v[i]) - a.begin(); ```

同理，对于最长递减子序列，我们需要维护一个递减的数组。此时的pos即可改为：``` int pos = lower_bound(a.begin() + 1, a.begin() + 1 + ans, v[i], greater<int>()) - a.begin();``` 

最长不上升子序列：``` int pos = upper_bound(a.begin() + 1, a.begin() + 1 + ans, v[i], greater<int>()) - a.begin();```

另外，由于在插入的过程中会改变数组a原有的顺序，数组$a$只能表示递增子序列的结尾位置，其本身并非合法的子序列。

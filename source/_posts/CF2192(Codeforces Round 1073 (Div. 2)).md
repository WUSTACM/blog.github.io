---
title: CF2192 Codeforces Round 1073 (Div. 2)(A-D1)题解
date: 2026-1-20
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

# CF2192 Codeforces Round 1073 (Div. 2)(A-D1)题解

题目链接: [Codeforces Round 1073 (Div. 2)](https://codeforces.com/contest/2191)

## A Array Coloring

### 题意

给你n长度的**排列**，将它们全部染成<span style="color: red;">红</span><span style="color: blue;">蓝</span>两种颜色,求是否有染色方案，使得排序前后相邻两数颜色不同。

<!-- more -->

### 思路

不难看出，在只有两种颜色的情况下，只有两种种染色方案，且无论是先染<span style="color: red;">红色</span>还是先染<span style="color: blue;">蓝色</span>都对结果无影响，所以只能交替染色，保证相邻两数的颜色不同。由于是在**排列**中操作，相邻两数的奇偶性必然不同。故当且仅当排列满足:偶数下标奇偶性相同，且奇数下标奇偶性相同才有染色方案。

### 代码

``` cpp
#include <bits/stdc++.h>
using namespace std; 
using ll = long long; 

void solve(){
    int n; cin >> n;
    vector<int> a(n),odd,even;
    for(int i = 0;i<n;i++){
        cin >> a[i];
        i&1 ? odd.push_back(a[i]) : even.push_back(a[i]);
    }
    for(auto i : odd){
        if((i&1)!=(odd[0]&1)) return cout << "NO" << endl,void();
    }
    for(auto i : even){
        if((i&1)!=(even[0]&1)) return cout << "NO" << endl,void();
    }
    cout << "YES" << endl;
}

int main(){
    ios::sync_with_stdio(0);
    cin.tie(0),cout.tie(0);
    
    int _ = 1;
    cin >> _;
    while(_--){
        solve();
    }
    
    return 0;
}
```

## B MEX Reordering

### 题意

给你一个长度为n的数组(数组从1开始计数)，确认能否找到一种重排列方案，使得对于所有下标$i(1 \leq i < n)$，都有$mex(1,i) \neq mex(i+1,n)$。

### 思路

1. 首先思考如何让mex()不同。很容易就想出当数组中有 ***0*** 时，mex()>0。所以数组中必须有 ***0*** ，并且重排列后的 ***0*** 必须都放在数组的最左侧或者最右侧。
2. 若数组中只有0，则必然存在$i(1 \leq i < n)$,使$mex(1,i) = mex(i+1,n)$ ，所以数组中必须有 ***1*** ，让左右两边的mex值不相同。

### 代码
``` cpp
#include <bits/stdc++.h>
using namespace std; 
using ll = long long; 

void solve(){
    int n; cin >> n;
    vector<int > a(n+1,0),cnt(n+1,0);
    for(int i = 1;i<=n;i++){
        cin >> a[i];
        cnt[a[i]]++;
    }
    if(cnt[0]==1) return cout << "YES" << endl,void();
    if(cnt[0]>1 && cnt[1]) return cout << "YES" << endl,void();
    cout << "NO" << endl;
}

int main(){
    ios::sync_with_stdio(0);
    cin.tie(0),cout.tie(0);
    
    int _ = 1;
    cin >> _;
    while(_--){
        solve();
    }
    
    return 0;
}
```

## C Sorting Game

### 题意

给你一个仅包含01的数组，两人轮流进行操作：选择m个下标的数，保证在原数组中非递增，将这些下标的数以非递减的形式填回数组。当另一方无法操作时胜利。(无法操作指的是无论怎么操作数组不变)

### 思路

~~看似博弈，实则贪心~~ 首先，当数组为非递减数组时，无法操作，为必败态。然后，我们选取数组中前z个(z为0的个数)数字为1的下标，与后n-z个数字为0的下标(这样就可以保证非递增)，重排列之后，0一定都在1前面，即数组成为了非递减数组。

### 代码
``` cpp
#include <bits/stdc++.h>
using namespace std; 
using ll = long long; 

void solve(){
    int n; cin >> n;
    string s; cin >> s;
    ll z = 0,o = 0;
    for(auto c : s){
        c=='0' ? z++ : o++;
    }
    vector<int> ans;
    for(int i = 0;i<z;i++){
        if(s[i]=='1') ans.push_back(i+1);
    }
    for(int i = z;i<n;i++){
        if(s[i]=='0') ans.push_back(i+1);
    }
    
    if(!z || !o || !ans.size()) return cout << "Bob" << endl,void();
    cout << "Alice" << endl;
    cout << ans.size() << endl;
    for(auto i : ans){
        cout << i << ' ';
    }
    cout << endl;
}

int main(){
    ios::sync_with_stdio(0);
    cin.tie(0),cout.tie(0);
    
    int _ = 1;
    cin >> _;
    while(_--){
        solve();
    }
    
    return 0;
}
```

## D Sub-RBS (Easy Version)

### 题意

给你一个正则括号序列s，要你找出s的一个最长的子序列t，使得子序列t优于原序列s，且仍为正则子序列。
a优于b的定义
- b是a的前缀
- a的左括号比b的更靠前

### 思路

我们可以把最靠前的右括号和最靠后的左括号删除，这样依旧能保证t为正则括号序列。然后将t和s进行比较，就可以得到答案了。 ~~这题逃课了导致D2没思路~~

### 代码
``` cpp
#include <bits/stdc++.h>
using namespace std; 
using ll = long long; 

void solve(){
    int n; cin >> n;
	string s; cin >> s;
	
	int l = 0,r = n-1;
	while(s[l]=='('){
		l++;
	}
	while(s[r]==')'){
		r--;
	}

	string t = "";
	for(int i = 0;i<n;i++){
		if(i==l || i==r) continue;
		t+=s[i];
	}

	int flag = 0;
	for(int i = 0;i<n-2;i++){
		if(s[i]==t[i]) continue;
		if(t[i]=='(') return cout << n-2 << endl,void();
		else return cout << -1 << endl,void();
	}
	cout << -1 << endl;
}

int main(){
    ios::sync_with_stdio(0);
    cin.tie(0),cout.tie(0);
    
    int _ = 1;
    cin >> _;
    while(_--){
        solve();
    }
    
    return 0;
}
``` 
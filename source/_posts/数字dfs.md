---
title: 数字dfs
tags: [dfs]
categories: []
topic: 算法
headline: 大标题
caption: 标题下方的小字
color: 标题颜色
description:
cover: https://i.postimg.cc/ZnCzZKvr/2cb79efe667b08d4b12e3b103d67653.jpg
banner: https://i.postimg.cc/ZnCzZKvr/2cb79efe667b08d4b12e3b103d67653.jpg
poster:
sticky:
mermaid:
katex:
mathjax: true
author: kass
references:
comments:
indexing:
breadcrumb:
leftbar:
rightbar: toc
h1:
type:
---

# 数字 dfs

- **处理[l, r]区间内满足某种性质 P 的数**

- **一般 l < r < 1e18,我们无法直接 for(l, r)**

- **这时我们可以转移视角，不看这个数字，而是看数位，即看成 string,这时 1e18 也只有 19 位而已**

---

## [华农](https://ac.nowcoder.com/acm/contest/104226/G)

<!-- more -->

_波奇酱确实不喜欢数学，所以他希望可以从一个区间中找出一些他喜欢的数。_
_如果一个数所有的相邻位数的差的绝对值为 1, 那么波奇酱就会喜欢它。特别地，所有一位数都是波奇酱喜欢的数。_

_给定区间 [L,R]，请求出在这个区间内波奇酱喜欢的数的数量。_

_L,R(1≤L≤R≤1e18)，表示给定的区间。_

```c++
ll  l, r;
int ans;
void dfs(ll num){
    if(num > r)return;
    if(num>=l && num<=r)ans++;
    ll d = num%10;
    if(d-1>=0)dfs(num*10+d-1);
    if(d+1<=9)dfs(num*10+d+1);
    return ;
}

void solve(){
    cin >> l >> r;
    for(int i = 0; i <= 9; i++){
        dfs(i);
    }
    cout << ans << '\n';
    return ;
}
```

## [天梯](https://pintia.cn/problem-sets/994805046380707840/exam/problems/type/7?problemSetProblemId=1913922872972247051&page=1)

_本题就请你对任一给定的 n，求出给定区间内被 n 整除的 n 位数。_

_输入格式：_
_输入在一行中给出 3 个正整数：n（1<n≤15），以及闭区间端点 a 和 b（1≤a≤b<1e15）_

_输出格式：_
_按递增序输出区间 [a,b] 内被 n 整除的 n 位数，每个数字占一行。_

_若给定区间内没有解，则输出 No Solution_

```C++
ll n, prel[N], prer[N];
vector<ll>ans;
string l, r;

ll qpow(ll a, ll b){
	ll res = 1;
	while(b){
		if(b&1)res = a * res;
		a = a * a;
		b >>= 1;
	}
	return res;
}
string zh(ll sum){
	string s;
	while(sum){
		s.push_back(sum%10+'0');//加'0'转字符串
		sum/=10;
	}
	reverse(s.begin(), s.end());
	return s;
}
void dfs(ll val, ll pos){
	if(pos == n + 1){
		ans.push_back(val);
		return ;
	}
	ll sum = 0;
	for(ll i = 0; i <= 9; i++){
		sum = val * 10 + i;
		if(sum >= prel[pos] && sum <= prer[pos]){
			if(sum%pos==0)dfs(sum, pos+1);
		}
	}
	return ;
}
void solve(){
	cin >> n >> l >> r;
	ll op = 10;
	if(r.size() < n || l.size() > n){
		cout << "No Solution" << '\n';
		return ;
	}
	if(l.size() < n){
		l = zh(qpow(10, n-1));
	}
	if(r.size() > n){
		r = zh(qpow(10, n) - 1);
	}
    //特判处理
    // 3 10 1000 -> 3 100 999
	for(int i = 0; i < (int)l.size(); i++){
		prel[i + 1] = (l[i]-'0') + prel[i] *op;
	}
	for(int i = 0; i < (int)r.size(); i++){
		prer[i + 1] = (r[i]-'0') + prer[i] *op;
	}
	dfs(0, 1);
	if(ans.size()==0){
		cout << "No Solution" << '\n';
		return ;
	}
	for(ll v : ans)cout << v << '\n';
	return ;
}

```

## [蓝桥]( [P12835 [蓝桥杯 2025 国 B\] 蓝桥星数字 - 洛谷](https://www.luogu.com.cn/problem/P12835) )

**求第 n 个奇偶交替的数**

**1<=n<=1e12**

**注意到这种求满足特定要求的数的问题，大部分都可以考虑数位 dfs**

**本题有点小不同，且听我慢慢道来**

题目要我们求第 n 个数，显然从最低位去考虑是不行的，无法求出确实当前位后有多少数

所以我们考虑从最高位开始，一般数位 dfs 也都是从最高位开始

接下来我们手写几个数来看看

```c++
10  21 ... 101  121 ...
12  23     103  123
14  25     105  125
16  27     107  127
18  29     109  129
```

可以看出，对于 cnt 位的数 q，它的最高位可以取 1~9，其余的每一位可以取 0，2，4，6，8 或 1，3，5，7，9

即每一位有 5 种可能

接下来我们求第 n 个数有多少位

注意到 cnt 位的数有 9 \* $5 ^ {cnt-1}$个数 n <= 1e12, cnt <= 17，所以我们累加即可

我们记 q 为要求的第 n 个数

```c++
ll sum = 0;
for(int i = 2; i <= 17; i++){
	sum += 9 * qpow(5, i-1);
	if(sum>=n){
		cnt = i;
		break;
	}
}

if(cnt!=2)n -= (sum - 9 * qpow(5, cnt-1));
//这里n变为q在cnt位的数中是第几个

```

接着我们来确定最高位的数 op

同理，注意到 cnt 位，以 op 为最高位的数一共有$5 ^ {cnt-1}$个数，我们同样累加即可

```c++
sum = 0;
for(int i = 1; i <= 9; i++){
	sum += qpow(5, cnt - 1);
	if(sum >= n){
		op = i;
		break;
	}
}
if(op!=1)n -= (op-1)*qpow(5, cnt-1);
//这里同样的，我们把n变为q在cnt位，以op为最高位的数中是第几个
cout << op;
//这里我们直接把q当成字符串输出
```

接下来求其余位上的数，由于它们的取值都是一样的，我们开始我们的 dfs

同理，注意到 cnt 位，以 op 为最高位，op'为次高位的数一共有$5 ^ {pos-1}$个数，我们同样累加即可

```C++
void dfs(int pos){
	if(!pos)return ;
	ll sum = 0;
	for(int i = 1; i <= 5; i++){
		sum += qpow(5, pos-1);
		if(sum>=n){
			if(op&1)op = i * 2 - 2;
			else op = i * 2 - 1;
            //这里可以把op设为全局变量,也可以把dfs写成两个变量的
			cout << op;
            //这里同理直接把q当成字符串输出
			if(i!=1)n -= (i-1)*qpow(5, pos-1);
            //同样的，我们把n变为q在cnt位，以op为最高位，op'为次高位的数中是第几个
			dfs(pos-1);
			return ;
            //注意这里一定要return，因为这里q是唯一确定的数，这也是与之前的数位dfs不同的地方
		}
	}
}
```

```c++
ll n, m, op, cnt;

ll qpow(ll a, ll b){
	ll res = 1;
	while(b){
		if(b&1)res = res * a;
		a = a * a;
		b >>= 1;
	}
	return res;
}

void dfs(int pos){
	if(!pos)return ;
	ll sum = 0;
	for(int i = 1; i <= 5; i++){
		sum += qpow(5, pos-1);
		if(sum>=n){
			if(op&1)op = i * 2 - 2;
			else op = i * 2 - 1;
			cout << op;
			if(i!=1)n -= (i-1)*qpow(5, pos-1);
			dfs(pos-1);
			return ;
		}
	}
}
void solve(){
	cin >> n;
	ll sum = 0;
	for(int i = 2; i <= 17; i++){
		sum += 9 * qpow(5, i-1);
		if(sum>=n){
			cnt = i;
			break;
		}
	}
	if(cnt!=2)n -= (sum - 9 * qpow(5, cnt-1));
	sum = 0;
	for(int i = 1; i <= 9; i++){
		sum += qpow(5, cnt - 1);
		if(sum >= n){
			op = i;
			break;
		}
	}
	if(op!=1)n -= (op-1)*qpow(5, cnt-1);
	cout << op;
	dfs(cnt-1);
	return  ;
}
```

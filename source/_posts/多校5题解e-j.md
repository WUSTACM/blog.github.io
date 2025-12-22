---
title: 多校5题解e-j
date: 2025-6-15
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
author: kass
references:
comments:
indexing:
breadcrumb:
leftbar:
h1:
type:
---

## [暑期多校 5E](https://ac.nowcoder.com/acm/contest/108302/E)

<!-- more -->

求$\sum\sum$ $a_{i,j}$ 经典考虑每一位的贡献

设当前是 第 t 位， 则贡献为(1ll << t) 或者 0

思考(1ll << t)怎么产生

首先第 t 位的异或结果要是 1 ，即一个 1，一个 0

其次是异或结果第 t 位后面要有偶数个 1

考虑 x 与 y；x 第 t 位后面的一有 $cnt_x$ 个， y 第 t 位后面的一又 $cnt_y$ 个，x， y 第 t 位后面的同位一有 k 个

则异或结果第 t 位后面的一有 $cnt_x$ - k + $cnt_y$ - k = $cnt_x$ + $cnt_y$ - 2 \* k 个；

故 $cnt_x$， $cnt_y$ 奇偶性一致即可

下面是参考 jiangly 的代码后写的

```C++
ll n, a[N];

int cl(ll sum){
	ll ans = 0;
	while(sum){
		if(sum&1)ans++;
		sum>>=1;
	}
	return ans;
}

void solve(){
	cin >> n;
	for(int i = 1; i <= n; i++)cin >> a[i];
	ll ans = 0;
	for(int t = 0; t < 30; t++){
		int cnt[2][2] = {};
		for(int i = 1; i <= n; i++){
			cnt[(a[i] >> t) & 1][cl(a[i] & ((1 << t) - 1)) & 1]++;
		}
		ans += (1ll << t) * ((1ll * cnt[0][0] * cnt[1][0]) + (1ll * cnt[0][1] * cnt[1][1]));
        //计数原理
	}

	cout << ans << '\n';
}

```

## [暑期多校 5J](https://ac.nowcoder.com/acm/contest/108302/J)

最小化一个很复杂的东西的值，考虑二分

先 bfs 跑一遍求 dis[i] [j];

关键是 check 怎么写

对于 check(int d)，如果有 dis[i] [j] > d ，我们就要考虑用加的点去让 dis[i] [j] $\leq$ d;

设加的点是 x， y， 则有 | x - i | + | y - j| $ \leq$ d;

解方程，有

x - i + y - j $\leq$ d;

x - i + j - y $\leq$ d;

i - x + y - j $\leq$ d;

i - x + j - y $\leq$ d;

整理有

i + j - d $\leq$ x + y $\leq$ i + j + d

i - j - d $\leq$ x - y $\leq$ i - j + d

下面是参考 InfiniteDarkBee 的代码后写的

```C++
ll n, m, x;
int mo[6] = {1, 0, -1, 0, 1};
void solve(){
	cin >> n >> m;
	vector<vector<int>>dis(n+2, vector<int>(m+2, INF));
	queue<array<int, 2>>q;
	for(int i = 1; i <= n; i++){
		for(int j = 1; j <= m; j++){
			cin >> x;
			if(x==1){
				dis[i][j] = 0;
				q.push({i, j});
			}
		}
	}

	while(!q.empty()){
		auto it = q.front(); q.pop();
		int x = it[0], y = it[1];
		for(int i = 0; i < 4; i++){
			int xx = x + mo[i];
			int yy = y + mo[i+1];
			if(xx<1||xx>n||yy<1||yy>m)continue;
			if(dis[xx][yy] > dis[x][y] + 1){
				dis[xx][yy] = dis[x][y] + 1;
				q.push({xx, yy});
			}
		}
	}

	auto check =[&](int d) -> bool{
		int lx = -INF, rx = INF, ly = -INF, ry = INF;
		for(int i = 1; i <= n; i++){
			for(int j = 1; j <= m; j++){
				if(dis[i][j] > d){
					lx = max(lx, i + j - d);
					rx = min(rx, i + j + d);
					ly = max(ly, i - j - d);
					ry = min(ry, i - j + d);
				}
			}
		}
		for(int i = 1; i <= n; i++){
			for(int j = 1; j <= m; j++){
				if(i + j >= lx && i + j <= rx && i - j >= ly && i - j <= ry)return true;
			}
		}
		return false;
	};

	ll l = 0, r = INF;
	while(l <= r){
		ll mid = l + (r - l) / 2;
		if(check(mid))r = mid - 1;
		else l = mid + 1;
	}
	cout << l << '\n';
}

```

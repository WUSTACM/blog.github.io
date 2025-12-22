---
title: LCA笔记
date: 2025-6-15
tags: [LCA]
categories: [算法]
cover: https://i.postimg.cc/ZnCzZKvr/2cb79efe667b08d4b12e3b103d67653.jpg
banner: https://i.postimg.cc/ZnCzZKvr/2cb79efe667b08d4b12e3b103d67653.jpg
topic: 算法
headline: 大标题
caption: 标题下方的小字
color: 标题颜色
description:
poster:
sticky:
mermaid:
katex:
mathjax: true
author: yz
references:
comments:
indexing:
breadcrumb:
leftbar:
rightbar: toc
h1:
type:
---

# LCA 问题

[模板题](https://www.luogu.com.cn/problem/P3379)

> 最近公共祖先简称 LCA（Lowest Common Ancestor）。两个节点的最近公共祖先，就是这两个点的公共祖先里面，离根最远的那个。 ——oi wiki

<!-- more -->

## 朴素算法

**过程：**

每次找深度比较大的那个点，让它向上跳。这两个点最后一定会相遇，相遇的位置就是想要求的 LCA。

单次查询的时间复杂度为 O(n)，一般不被使用。（故省略代码

## 倍增算法

该算法是朴素算法的改进算法，也是最经典的 LCA 算法，本质上是增加朴素算法中跳跃的距离以减少操作次数。

时间复杂度：预处理 O(nlogn)，单次查询 O(logn)。

### 思路：

1. 预处理：

   - 利用 DFS 遍历树，记录每个节点的深度和每个节点的 2^k^级祖先。
   - 对于每个节点 u，记录它的 2^k^级祖先，k 从 0 到 $log_2N$.

2. 查询：

   对于每次查询的两个节点 a 和 b

   - 将深度较大的节点向上跳到与另一个节点相同的深度。
   - 向上跳 2^k^步，直到找到 LCA.

   **核心思想：**

- 利用二进制分解的思想，将跳跃步长分解为 2^k^ 的幂次。
- 例如，如果需要跳 5 步，可以分解为 2^0^+2^2^（即跳 1 步 + 跳 4 步）。
- 通过预处理每个节点的 2^k^ 级祖先，可以快速实现任意步长的跳跃。

### 具体步骤：

1. 调整深度
   - 如果两节点深度不同，将深度较大的节点跳到另一个节点相同的深度
2. 同时上跳
   - 两个节点深度相同时，同时上跳 2^k^ 步，知道找到 LCA。
   - 跳跃时，如果跳 2^k^ 步后两个节点的祖先不同，则跳；否则不跳。
   - 最终，两个节点会跳到 LCA 的直接子节点，此时它们的父节点就是 LCA。

### 代码：

**相关变量**

```CPP
const int Log = 20;
const int maxn = 500010;

vector<int> tree[maxn]; //邻接表存树,需要建双向边
int depth[maxn];		//记录深度
int up[maxn][Log];		//up[u][k] 表示节点 u 的 2^k 级祖先
```

**预处理部分**

- 计算深度：
  - `depth[u] = depth[fa] + 1`当前节点 `u` 的深度是其父节点 `parent` 的深度加 1。
  - 根节点深度为 0.
- 2^k^级祖先：
  - `up[u][0] = fa` 当前节点 `u` 的 2^0^ 父节点是 `fa`。
  - `up[u][k] = up[up[u][k - 1]][k - 1]`当前节点 `u` 的 2^k^ 级祖先可以通过其 2^k-1^级祖先的 2^k-1^ 级祖先得到。
- 递归遍历子树：
  - 对于当前节点 `u` 的每一个子节点 `v`，如果 `v` 不是父节点 `fa`，则递归调用 `dfs(v, u)`。

```cpp
void dfs(int u, int fa){
	depth[u] = depth[fa] + 1;
	up[u][0] = fa;
	for(int i=1 ; i<Log ; ++i){
		up[u][i] = up[up[u][i-1]][i-1];
	}
	for(int v : tree[u]){
		if(v!=fa){
			dfs(v, u);
		}
	}
}
```

**查询部分**

- 调整深度：

  - 如果 `depth[a] < depth[b]`，交换 `a` 和 `b`，确保 `a` 是深度较大的节点。
  - 计算深度差 `diff = depth[a] - depth[b]`。
  - 通过 `diff` 的二进制表示，将 `a` 跳到与 `b` 相同的深度。

- 检查是否找到：
  - 如果 `a` 和 `b` 已经相等，说明 `a`（或 `b`）就是 LCA，直接返回。
- 同步上跳：
  - 从最大的 k 开始（`Log - 1` 到 `0`），尝试将 `a` 和 `b` 同时向上跳 2^k^ 步。
  - 如果 `up[a][k] != up[b][k]`，说明跳 2^k^ 步后不会跳过 LCA，因此可以安全地跳。
  - 最终，`a` 和 `b` 会跳到 LCA 的直接子节点，此时 `up[a][0]` 就是 LCA。

```cpp
int lca(int a, int b){
	if(depth[a]<depth[b]) swap(a,b);

	int dif = depth[a] - depth[b];
	for(int i=0 ; i<Log ; ++i){
		if(dif & (1<<i)){
			a = up[a][i];
		}
	}

	if(a==b) return a;

	for(int i=Log-1 ; i>=0 ; --i){
		if(up[a][i] != up[b][i]){
			a = up[a][i];
			b = up[b][i];
		}
	}
	return up[a][0];
}
```

**主函数**

```cpp
int main()
{
	int x, y;
	int n, m, s;
	cin >> n >> m >> s;

	for(int i=1 ; i<n ; ++i){
		cin >> x >> y;
		tree[x].push_back(y);
		tree[y].push_back(x);
	}

	dfs(s, 0);

	for(int i=0 ; i<m ; ++i){
		cin >> x >> y;
		cout << lca(x,y) << '\n';
	}

	return 0;
}
```

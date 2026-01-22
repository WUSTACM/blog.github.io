---
title: 题解集_个人整理
date: 2026-1-23
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
author: yz
references:
comments: true
indexing:
breadcrumb:
leftbar:
h1:
type:
---
### 前言
- 这是一份以 **Codeforces 题目** 为核心整理的题集，覆盖博弈、构造、XOR、动态规划、数位分析、组合计数等常见但“刁钻”的竞赛主题。
- 每道题都提炼了**关键观察与核心转化**，力求从复杂描述中抓住真正起作用的结构，而非堆砌技巧。
- 题解风格偏向“**想法先行**”：强调为什么可以这样建模、为何贪心/二分/DP 在这里成立，以及哪些信息是冗余的、哪些是决定性的。
<!-- more -->
- 代码只是思想的落地，而不是结论本身。

- 本题集仍在持续更新中



### [2171C2](https://codeforces.com/problemset/problem/2171/C2)

#### 问题标签

- [Codeforces Round 1065 (Div. 3)](https://codeforces.com/contest/2171)
- XOR
- 思维
- 博弈
- 贪心

#### 题目大意

- 有两个玩家：Ajisai 和 Mai，轮流进行操作。Ajisai 在奇数回合操作，Mai 在偶数回合操作。
- 每个玩家在自己回合可以选择**交换两个数组对应位置的元素**，或者选择**不操作**。
- 游戏用两个数组 $A$ 和 $B$，长度为 $n$，在第 $i$ 回合，玩家只能操作第 $i$ 个索引的元素。
- 游戏结束时，两人分别计算自己数组的 **所有元素的 XOR 值**，数值大的获胜。
- 问题是：在双方都采取最优策略的情况下，谁会赢，或者是否会平局。

简单来说，就是一个**轮流可交换数组元素、最终比 XOR 值的博弈**，判断最优策略下的胜负或平局。

#### 解题思路

- 两个数组中 **所有元素的 XOR 和** 就 **等于** 两人最优状态下得到的 **两个 XOR 值的亦或和**
- **所有元素的 XOR 和** 的 **二进制最高位** 反映出了两人最后决出胜负的二进制数位
- **所有元素压缩为 *在决出胜负的数位上* 的二进制值** 后即可化为该问题的简单版本求解



#### 代码

```cpp
void solve() {
    int n; cin >> n;
    vector<int> a(n), b(n);

    int xsum = 0;
    for (int i = 0; i < n; ++i) {
        cin >> a[i];
        xsum ^= a[i];
    }

    for (int i = 0; i < n; ++i) {
        cin >> b[i];
        xsum ^= b[i];
    }

    int pos = -1;
    while (xsum) {
        ++pos;
        xsum >>= 1;
    }

    for (int i = 0; i < n; ++i) {
        a[i] = ((a[i] >> pos) & 1);
        b[i] = ((b[i] >> pos) & 1);
    }


    int tag = 0, sum = 0;
    for (int i = 0; i < n; ++i) {
        if (a[i] != b[i]) {
            ++sum;
            tag = (i & 1);
        }
    }

    if (sum & 1) {
        if (!tag) {
            cout << "Ajisai\n";
        } else {
            cout << "Mai\n"; 
        }
    } else {
        cout << "Tie\n";
    }
}
```



### [2157C](https://codeforces.com/problemset/problem/2157/c)

#### 问题标签

- [Codeforces Round 1066 (Div. 1 + Div. 2)](https://codeforces.com/contest/2157)
- 构造
- trick

#### 题目大意

- 构造一个长度为 $n$ 的数组 $a\ (0 \le a_i \le 10^9)$。
- 数组 $a$ 需要满足 $q$ 个区间约束，每个约束是一个三元组 $(c,l,r)$。
- 对于每个约束 $(c,l,r)$，要求子数组 $a_l,a_{l+1},\dots,a_r$ 满足：
  - 如果 $c=1$， $min(a_l,\dots,a_r)=k$
  - 如果 $c=2$，$mex(a_l,\dots,a_r)=k$
- 题目保证输入数据一定有解，构造并输出一个满足所有约束条件的数组。

#### 解题思路

- 本题数据量能直接从 $l$ 到 $r$ 遍历 $q$ 个区间
- 考虑每个位置的值，存在 **三种** 由于三元组约束导致的 **限制**
- 不存在该限制的位置可以为范围内的任意值
- 考虑如下限制：
  - 被 $min$ 覆盖 $\Rightarrow a_i := k$
  - 被 $min$ 和 $mex$ 覆盖 $\Rightarrow a_i := k + 1$
  - *被 $mex$ 覆盖 $\Rightarrow a_i :=\  i \mod k$

####  代码

```cpp
void solve() {
    int n, k, q;
    cin >> n >> k >> q;

    vector<int> a(n + 5);
    vector<arr2> tag(n + 5);
    for (int i = 0; i < q; ++i) {
        int c, l, r;
        cin >> c >> l >> r;

        for (int j = l; j <= r; ++j) {
            tag[j][c - 1] = 1;
        }
    }

    for (int i = 1; i <= n; ++i) {

        if (tag[i][0] + tag[i][1] == 2) {
            cout << k + 1;
        } 
        else if (tag[i][0] == 1) {
            cout << k;
        } 
        else {
            cout << i % k;
        }

        cout << " \n"[i == n];
    }  
}
```



*

> 为了满足 MEX 约束，必须至少包含 k 个这样的元素（因为它必须包含 0 到 k−1 之间的所有元素，而这会违反 min 约束）。特别地，为第 i 个这样的元素赋 i(modk) 值是可行的（如果一个 MEX 约束包含 k 个这样的元素，它们的值将是 [0,1,…,k−1]，可能经过偏移）。



### [2170C](https://codeforces.com/problemset/problem/2170/C)

#### 问题标签

- [Educational Codeforces Round 185 (Rated for Div. 2)](https://codeforces.com/contest/2170)
- 数学
- 二分
- 贪心

#### 题目大意

- 给定两个长度均为 $n$ 的整数数组 $q$  和 $r$，以及一个整数上界 $k$
- 可以进行任意次操作（包括 0 次）选择两个整数 $x, y$，满足：
  - $1 \leq y<x \leq k$
  - 在数组 $q$ 中，存在一个元素 $q_i =  \lfloor \frac{x}{y} \rfloor$
  - 在数组 $r$ 中，存在一个元素 $r_j = x \mod y$
- 在 $q $ 和 $r$ 中删去该元素，若某个值出现多次，只删除其中一个
- 需要**最大化可以执行的操作次数**

#### 解题思路

- 进行推导，发现构成对答案的限制的只有 $q,\ r $  ：

> $$
> r = x \ mod \ y \Leftrightarrow y \geq r + 1
> $$
>
> $$
> \Rightarrow x = q\times y + r \geq q\times (r + 1) + r
> $$
>
> $$
> \Rightarrow k\geq x \geq (q + 1)(r + 1) - 1
> $$

- 将二者排序（由小到大）考虑遍历 $r$ 二分找尽可能大的 $q$ 配对即可
- 这里二分有两种写法：
  - 二分查找：将 $q$ 用 $map$ 存，在其上二分找第一个 $ \leq \frac{k + 1}{r + 1} - 1$ 的元素并删除，统计答案
  - 二分结果， 可以直观的考虑可行性：
    - 若与 $r_1$ 能匹配的最大元素为 $q_i$ 那么$[q_1, q_i]$ 范围内都可以与 $r_1$ 匹配
    - 判断 $r_j\ (2 \leq j \leq i)$  能否与相对应的 $q[i - j + 1]$  (即尽可能大的元素)匹配
    - 如果可以， $i$ 即为最后的结果。否则可以通过**压缩** $i$ 来得到答案，发现符合二分答案的结构
    - 不考虑 $i$ 的初始位置，考虑其取值的上下界 $[0, n]$ ，在该范围二分答案
    - 对于一个可能的 $i$ ，在 $r$ 和 $q$ 上 利用 $k\geq (q + 1)(r + 1) - 1$ 遍历判断即可
- 两种解法相比前者直观但是常数稍大。

####  代码

```cpp
//二分查找解法
void solve() {
    ll n, k; cin >> n >> k;

    map<ll, int> q;
    vector<ll> r(n);

    for (auto& i : r) cin >> i;
    ranges::sort(r);
    
    for (int i = 1; i <= n; ++i) {
        int num; cin >> num;
        ++q[num];
    }

    int ans = 0;

    for (int i = 0; i < n; ++i) {
        auto it = q.upper_bound((k + 1) / (r[i] + 1) - 1);

        if (it == q.begin()) {
            break;
        }

        ++ans, --it; 

        auto& [num, cnt] = *it;

        if (cnt == 1) q.erase(num);
        else --cnt;
    }

    cout << ans << '\n';
}

//二分结果解法
void solve() {
    ll n, k; cin >> n >> k;

    vector<ll> r(n + 1), q(n + 1);

    for (int i = 1; i <= n; ++i) {
        cin >> r[i];
    }
    
    for (int i = 1; i <= n; ++i) {
        cin >> q[i];
    }

    sort(r.begin() + 1, r.end());
    sort(q.begin() + 1, q.end());

    int ans = 0;

    auto ck = [&](int len) -> bool {
        for (int i = 1; i <= len; ++i) {
            if ((r[i] + 1ll) * (q[len - i + 1] + 1ll) - 1ll > k) {
                return false;
            }
        }
        return true;
    };

    ll L = 0, R = n;
    while (L <= R) {
        ll mid = (L + R) / 2;

        if (ck(mid)) {
            L = mid + 1;
        }
        else { 
          R = mid - 1;
        }
    }

    cout << R << '\n';
} 
```



### [2158C](https://codeforces.com/problemset/problem/2158/C)

#### 问题标签

- [Codeforces Round 1067 (Div. 2)](https://codeforces.com/contest/2158)
- 博弈
- 动态规划

#### 题目大意

- 给定两个长度为 $n$ 的整数数组 $a$ 和 $b$，以及总回合数 $k$。

- Alice 和 Bob 轮流操作数组 $a$，Alice 先手，一共恰好进行 $k$ 次操作。

- 每一回合，当前玩家选择一个下标 $i$，并对 $a_i$ 执行一种操作：

  - 加法：$a_i := a_i + b_i$

  - 减法：$a_i := a_i - b_i$

- 所有回合结束后，计算最终数组 $a$ 的**最大非空子数组和**作为得分。

- Alice 的目标是**最大化**最终得分，Bob 的目标是**最小化**最终得分，双方都采取最优策略。

- 对每个测试用例，需要输出在最优博弈下的最终得分。

#### 解题思路

- A(Alice) 所作的操作必然是对自己有利的

- B(Bob) 只有在  A 的每一步之后进行相反操作，消除上一步 A 对结果产生的影响才能让结果不劣

- 由此不难发现博弈的核心在于回合数 $k$  的奇偶性，$k$ 为偶数时数组 $a$ 不会发生变化

- $k$ 为奇数时问题可以简化为： 选择一个 $i(1 \leq i \leq n)$ 使 $a_i := a_i + b_i$ 后求最大字段和

- 求最大子段和时考虑每一个 $a_i$ 有 

$$
ans = max(\{\  a_i, a_i + b_i\  \}[k\  \&\  1] + l + r)
$$

- 其中 $l, r$ 分别代表从 $i$ 向左/右取数能得到到的连续最大子段和。

#### 代码

```cpp
void solve() {
    ll n, k; cin >> n >> k;

    vector<ll> a(n + 2), b(n + 2);
    for (int i = 1; i <= n; ++i) cin >> a[i];
    for (int i = 1; i <= n; ++i) cin >> b[i];

    vector<ll> l(n + 2), r(n + 2);

    for (int i = 1; i <= n; ++i) {
        l[i] = max({(a[i] + l[i - 1]), a[i], 0ll});
    }

    for (int i = n; i > 0; --i) {
        r[i] = max({a[i] + r[i + 1], a[i], 0ll});
    }

    ll ans = INT_MIN;
    for (int i = 1; i <= n; ++i) {
        ll num = array{a[i], a[i] + b[i]}[k & 1];
        ans = max(ans, num + l[i - 1] + r[i + 1]);
    }

    cout << ans << '\n';
} 
```



### [2173B](https://codeforces.com/problemset/problem/2173/B)

#### 问题标签

- [Codeforces Round 1068 (Div. 2)](https://codeforces.com/contest/2173)
- 动态规划

#### 题目大意

- 有一个游戏，共进行 $n$ 轮操作，初始分数 $k = 0$

- 第 $i$ 轮给出两张卡牌：

  - 红卡：数值为 $a_i$

  - 蓝卡：数值为 $b_i$
- 每一轮必须**二选一**，并立即更新分数
  - 选红卡：新分数 $k = k - a_i$
  - 选蓝卡：新分数 $k = b_i - k$


- 更新后的分数会作为下一轮的输入分数
- 第 $n$ 轮结束后，游戏终止

- 目标是：**通过合理选择每一轮的卡牌，使最终分数最大**

#### 解题思路

- 希望在最后能得到最大结果，那么该结果来源有两种可能
  - 前者得到的最小值 $（b_i-min）$
  - 前者得到的最大值$（max-a_i）$
- 发现该思路能推广到整体，从头遍历维护 $min$ 和 $max$ 即可，最后的 $max$ 即为答案
- 不难写出递推式：$mx = max(mx - a[i], b[i] - mn)$，$mn = min(mn - a[i], b[i] - mx)$

#### 代码

```cpp
void solve() {
    int n; cin >> n;
    vector<ll> a(n), b(n);

    for (int i = 0; i < n; ++i) {
        cin >> a[i];
    }

    for (int i = 0; i < n; ++i) {
        cin >> b[i];
    }

    ll mn = 0, mx = 0;

    for (int i = 0; i < n; ++i) {
        ll nxtmx = max(mx - a[i], b[i] - mn);
        ll nxtmn = min(mn - a[i], b[i] - mx);

        mn = nxtmn; 
        mx = nxtmx;
    }
    
    cout << mx << '\n';

} 
```



### [2173D](https://codeforces.com/problemset/problem/2173/D)

#### 问题标签

- [Codeforces Round 1068 (Div. 2)](https://codeforces.com/contest/2173)
- 数位dp
- 动态规划

#### 题目大意

- 给定一个正整数 $n$ 和一个正整数 $k$，需要进行 **恰好 $k$ 次操作**。

- 每次操作中，可以任选一个非负整数 $\ell$，并将当前的 $n$ 更新为 $n ：= n + 2^\ell$

- 一次操作的得分，定义为：在 **二进制下** 计算 $n + 2^\ell$ 时，产生的 **进位次数**。

- 总得分是 **所有 $k$ 次操作得分之和**。

- 目标是：通过合理选择每一步的 $\ell$，使得在完成 $k$ 次操作后，**总得分最大化**

#### 解题思路

-  数位dp，从低到高遍历该数二进制的每一块连续的 $1$ ，考虑是否对其操作

- 设 $f(n, k)$  表示其最大总分，有:
> $$
>   num1 = f(n + lowbit(n), k-1) + popcount((n + lowbit(n))\oplus  n) - 1
> $$
>
> $$
>   num2 = (n + lowbit(n)) \oplus lowbit(n + lowbit(n))
> $$
>
> $$
> f(n,k) = max(num1, num2)
> $$

- 直接 $dfs$ 即可。 $k=0$ 时表示操作结束返回 $0$，$lowbit(n) = n$ 时直接返回 $k$. 

#### 代码

```cpp
using uint = uint32_t;

void solve() {
    uint n, k; cin >> n >> k;

    auto lowbit = [](uint x) { return (x & (-x)); };

    auto dfs = [&lowbit](auto&& dfs, uint n, uint k) -> int {
        if (k == 0) {
            return 0;
        }

        if (lowbit(n) == n) {
            return k;
        }

        uint num = n + lowbit(n);
        return max(dfs(dfs, num, k - 1) + popcount(num ^ n) - 1, dfs(dfs, num ^ lowbit(num), k));
    };

    cout << dfs(dfs, n, k) << '\n';
} 
```



### [2157B](https://codeforces.com/problemset/problem/2157/B)

#### 问题标签

- [Codeforces Round 1066 (Div. 1 + Div. 2)](https://codeforces.com/contest/2157)
- XOR
- trick
- 前缀和与差分

#### 题目大意

- 给定三个整数 $n, l, r$，需要构造一个长度为 $n$ 的正整数数组 $a$，其中 $1 \le a_i \le 10^9$

- 定义区间异或函数 $f(x,y) = a_x \oplus a_{x+1} \oplus \cdots \oplus a_y$

- 要求：

  - 当且仅当区间 $[x,y] = [l,r]$ 时，$f(x,y)=0$

  - 对于任意其他区间 $[x,y]\neq[l,r]$，都有 $f(x,y)\neq 0$

#### 解题思路

- > 谈到子段的异或值时，通常考虑前缀异或值会很有帮助。设 $b_i=a_1⊕a_2⊕…⊕a_i$ 为前缀异或数组，则子段异或值 $f$ 就是 $f(x,y)=b_y⊕b_{x−1}$

- 为达到要求，使得 $b_l = b_{r-1}$ 其余的 $b$ 中的元素都互不相等即可

- 一个可行解为：使得 $b_i=i$ ，同时让 $b_r = b_{l - 1}$ ， $l = 1$ 时让 $b_r = 0$

####  代码

```cpp
void solve() {
    int n, l, r;
    cin >> n >> l >> r;

    vector<int> b(n + 1);
    for (int i = 1; i <= n; ++i) {
        b[i] = i;
    }

    if (l == 1) b[r] = 0;
    else b[r] = b[l - 1];

    for (int i = 1; i <= n; ++i) {
        cout << (b[i] ^ b[i - 1]) << " \n"[i == n];
    }
} 
```



### [2180C](https://codeforces.com/problemset/problem/2180/C)

#### 问题标签

- [Codeforces Global Round 31 (Div. 1 + Div. 2)](https://codeforces.com/contest/2180)
- XOR
- 构造
- 贪心
- dp

#### 题目大意

- 定义一种新的分解方式：**XOR-factorization**
  
  给定整数 $n$，如果一组数 $a_1,a_2,\dots,a_k$ 满足 $a_1 \oplus a_2 \oplus \cdots \oplus a_k = n$ 
  
  就称它是 $n$ 的一次 XOR 分解（$\oplus$ 为按位异或）。
  
- 约束条件

  - 每个 $a_i$ 都必须满足 $0 \le a_i \le n$

  - 一共有 $k$ 个数

  - 题目保证在给定条件下一定存在解

- 在所有满足异或结果为 $n$ 的方案中，**最大化**
  $$
  a_1 + a_2 + \cdots + a_k
  $$

#### 解题思路

- $k$ 为奇数的时候全为 $n$ 即可
- $k$ 为偶数的时候需要构造，考虑 $n$ 的每一(二进制)位：
  - 该位为 $1$ 时，在该位为 $1$ 的个数必须为奇数
  - 该位为 $0$ 时，在该位为 $1$ 的个数必须为偶数
- 注意到存在限制： 每个 $a_i$ 都必须满足 $0 \le a_i \le n$ 
- 考虑维护一个计数器 $num$，记录当前不受限的 $a_i$ 的个数，从高到低遍历 $n$ 的每一位，
  - 该位为 $0$ 时，将 $k - 1$ 个数字的该位置设为 $1$。该位为 $0$ 的那个数字便不再受限，其之后的位置取值任意。
  - 该位为 $1$ 时，将那 $num$ 个数中的偶数个数字的该位上设为 $1$。

#### 代码

```cpp
void solve() {
    ll n, k; cin >> n >> k;

    vector<ll> ans(k + 5);

    if (k & 1) {
        for (int i = 1; i <= k; ++i) {
            ans[i] = n;
        }
    } else {
        ll num = 0;

        for (int pos = log2(n); pos >= 0; --pos) {
            if ((n >> pos) & 1) {
                for (int i = 1; i <= k; ++i) {
                    if (i != min(num + 1, k)) {
                        ans[i] |= (1ll << pos);
                    }
                }

                if (num < k) ++num;
            }
            else {
                for (int i = 1; i <= (num | 1) - 1; ++i) {
                    ans[i] |= (1ll << pos);
                }
            }
        }
    }

    for (int i = 1; i <= k; ++i) {
        cout << ans[i] << " \n"[i == k];
    }

} 

```



### [2182C](https://codeforces.com/problemset/problem/2182/C)

#### 问题标签

- [Educational Codeforces Round 186 (Rated for Div. 2)](https://codeforces.com/contest/2182)
- 暴力

#### 题目大意

- 要制作雪人，每个雪人由 **头、躯干、腿** 三个雪球组成，尺寸分别为 $a,b,c$

- 一个雪人 **稳定** 的充要条件是：**头 < 躯干 < 腿**，即 $a < b < c$

- 工厂里有 **三条传送带**，每条各有 $n$ 个雪球：

  - 第一条：$a_1,a_2,\dots,a_n$（头）

  - 第二条：$b_1,b_2,\dots,b_n$（躯干）

  - 第三条：$c_1,c_2,\dots,c_n$（腿）

- 三条传送带都是 **循环的**：第 $n+1$ 个等价于第 1 个，以此类推

- 选择三个起始位置参数 $i,j,k$（$1 \le i,j,k \le n$）后：

  - 第 1 个雪人使用 $a_i, b_j, c_k$

  - 第 2 个雪人使用 $a_{i+1}, b_{j+1}, c_{k+1}$

  - …

  - 第 $n$ 个雪人使用 $a_{i+n-1}, b_{j+n-1}, c_{k+n-1}$（下标按循环）

- **要求**：用这三个起始位置组装出的 **所有 $n$ 个雪人都必须稳定**
-  对每个测试用例，统计有多少种三元组 $(i,j,k)$，能使全部 $n$ 个雪人满足

$$
a_{i+t} < b_{j+t} < c_{k+t} \quad \text{（对所有 } t=0,1,\dots,n-1\text{）}
$$

#### 解题思路

- 考虑暴力：对于每一组 $i, j, k$ 都需要以 $O(n)$ 的复杂度检查，枚举加检查整体复杂度过高
- 发现对于 $b$ 可行的 $j$ 只用考虑其与 $a$ 的关系；对于 $c$ 可行的 $k$ 只用考虑其与 $b$ 的关系
- 考虑优化：单独统计 $b$ 中可行的 $j$ ；$c$ 中 同理，结果相乘即可。



#### 代码

```cpp
void solve() {
    int n; cin >> n;
    vector<int> a(n);
    vector<int> b(n);
    vector<int> c(n);

    for (auto& i : a) cin >> i;
    for (auto& i : b) cin >> i;
    for (auto& i : c) cin >> i;

    auto ck = [&](vector<int>& x, vector<int>& y, int p) -> bool {
        for (int i = 0; i < n; ++i) {
            if (x[i] >= y[(i + p) % n]) {
                return false;
            }
        }

        return true;
    };


    ll cnt[2] = {0};
    for (int i = 0; i < n; ++i) {
        cnt[0] += ck(a, b, i);
        cnt[1] += ck(b, c, i);
    }

    cout << cnt[0] * cnt[1] * n << '\n';
} 
```



### [2182D](https://codeforces.com/problemset/problem/2182/D)

#### 问题标签

- [Educational Codeforces Round 186 (Rated for Div. 2)](https://codeforces.com/contest/2182)

- 数学

- 贪心

#### 题目大意

- 有 $n$ 个人，编号为 $1 \sim n$，以及 $n+1$ 个装饰盒，编号为 $0 \sim n$

- 第 $i$ 个盒子里初始有 $a_i$ 个装饰品

- 给定一个长度为 $n$ 的排列 $p$，表示人工作的顺序，会不断按 $p_1,p_2,\dots,p_n$ 循环执行

- 每当轮到人 $i$ 工作时，他只能从 **盒子 0 或盒子 i** 中取一个装饰品并挂到树上

- 整个过程中，**不能出现**：轮到人 $i$ 时，盒子 0 和盒子 $i$ 都已经空了

- 如果存在一种取盒子方式，使得直到所有装饰品都被挂完都不出现上述“无可取”的情况，则称该排列是 **fair（公平）** 的

- 任务：对每个测试用例，计算 **fair 排列的数量**，结果对 $998244353$ 取模

#### 解题思路

- 整理题意：通过将编号 $1 \sim n$ 的盒子 重新排列， 在不断从左到右拿物品的过程中每一步都有拿的，直到全部拿完。
- 第 $0$ 个盒子起到替补作用，所以重点考虑盒子 $a_i (1 \leq i\leq n)$ 。
  - 设其中有 $cnt$ 个盒子有最大值， 最大值为 $mx$ ，$sum = \sum^{n}_{i = 1} a_i - mx \times cnt$
  - 不难发现：如果该排列可行，那么至少会进行 $mx - 1$ 轮。
  - 也即：每个盒子至少会被尝试拿取 $mx - 1$ 次，小于该值的盒子被拿空后依靠 $a_0$ 补位。
  - 于是能得到一个边界：$cost = (n - cnt) * (mx - 1)  - sum$，如果 $a_0 < cost$  那么结果为 $0$
- 在 $mx - 1$ 轮后最大的那些盒子还没有拿完，不妨将这 $n$ 个盒子分为两组，第一组被尝试拿取 $mx$ 次， 另一组试拿取 $mx - 1$ 次
- 值为 mx 的盒子必然在前者中，剩下的盒子能放多少个在第一组，取决于 $mx - 1$ 轮后 $a_0$ 还剩多少。不难算出： $frt = min(n-cnt, a_0 - cost)$
- 利用组合数计数，从 $n-cnt$ 个数字中选出 $frt$  个。将 $frt + cnt$ 个数字分为一组， $n - frt - cnt$ 分为一组，求全排列。


> $$
> sum = \sum^{n}_{i = 1} a_i - mx \times cnt
> $$
>
> $$
> cost = (n - cnt) * (mx - 1)  - sum
> $$
>
> $$
> frt = min(n-cnt, a_0 - cost)
> $$
>
> $$
> ans = C^{frt}_{n - cnt} \times (frt + cnt)! \times (n - frt - cnt)!
> $$



####  代码

```cpp
ll mod (ll x) {
    return x % MOD;
}

ll qpow (ll a, ll b) {
    ll fac = a;
    ll ans = 1;

    while (b) {
        if (b & 1) {
            ans = mod(ans * fac);
        }

        b >>= 1ll;
        fac = mod(fac * fac);
    }

    return ans;
};



void solve() {
    int n; cin >> n;
    vector<int> a(n + 1);
    int mx = 0;
    ll sum = 0;
    int cnt = 0;

    cin >> a[0];
    for (int i = 1; i <= n; ++i) {
        cin >> a[i];
        sum += a[i];
        if (a[i] > mx) {
            cnt = 1;
            mx = a[i];
        } else if (a[i] == mx) {
            ++cnt;
        }
    }

    sum -= cnt * mx;

    int cost = (n - cnt) * (mx - 1)  - sum;
    int frt = a[0] - cost;

    if (frt < 0) {
        cout << "0\n";
        return;
    }
 
    frt = min(frt, n - cnt);
    
    vector<ll> fc, inv(n + 1);
    fc.push_back(1);

    for (ll i = 1; i <= n; ++i) {
        fc.push_back(mod(fc.back() * i));
    }

    inv[n] = qpow(fc[n], MOD - 2);

    for (int i = n; i > 0; --i) {
        inv[i - 1] = mod(inv[i] * i);
    }

    auto C = [&](int k, int x) {
        return mod(mod(fc[k] * inv[x]) * inv[k - x]);
    };

    ll ans = mod(mod(fc[frt + cnt] * fc[n - frt - cnt]) * C(n - cnt, frt)); 
    
    cout << ans << '\n';
} 
```

> 另： 本题目最终计数方法多样，下面算式也可供参考
> $$
> ans = \sum^{frt}_{i=0} cnt\times (cnt-1+i)!\times(n-i-cnt)!
> $$
>

---
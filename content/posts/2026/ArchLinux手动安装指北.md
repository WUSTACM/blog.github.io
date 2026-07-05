---
title: ArchLinux手动安装指北
description: 本文系统性地介绍了在 UEFI 环境下使用 BTRFS 文件系统手动安装 Arch Linux 的完整流程，涵盖启动盘制作、网络与镜像配置、磁盘分区、基础系统安装、引导配置以及显卡与系统优化等关键步骤，适合希望深入理解 Arch Linux 安装与系统结构的用户参考。
date: 2026-01-16 14:13:44
updated: 2026-02-02 15:27:23
permalink: /2026/archlinux
image: https://jianges.com/wp-content/uploads/2026/01/1768551164-20260116161217_381_30-scaled.png
categories: [技术]
tags: [系统, 教程, Archlinux]
---


::alert{type="warning" title="开始前"}
手动安装系统会改写磁盘分区和引导项。操作前请备份重要数据，并确认自己处在 UEFI 环境。
::

::timeline
{准备介质}

下载 Arch Linux ISO，制作启动盘，关闭 Secure Boot。

{进入 live 环境}

确认 UEFI 启动，联网、同步时间、配置镜像源。

{分区与挂载}

确认目标硬盘，创建 ESP 和 BTRFS 根分区，挂载子卷。

{安装基础系统}

使用 `pacstrap` 安装基础包，生成 `fstab`，进入 `arch-chroot`。

{引导与桌面}

配置本地化、GRUB、网络、快照、驱动和 KDE Plasma。
::

::folding{title="安装前检查清单"}
- 已经备份目标磁盘上的重要文件。
- 清楚自己要操作的硬盘名称，例如 `/dev/nvme0n1`。
- 电脑使用 UEFI 启动，并已关闭 Secure Boot。
- 安装时能稳定联网，或者已经准备好有线网络/USB 网络共享。
- 如果是双系统，已经确认 Windows 的 EFI 分区和数据分区位置。
::

## 1. 制作启动盘

### 1.1 下载 ISO 镜像

浏览器搜索ArchLinux，找到Download页面（[或者通过这里直接跳转](https://archlinux.org/download/)）向下翻找到China地区镜像源，下载ISO镜像，推荐[hust.edu.cn](https://mirrors.hust.edu.cn/archlinux/iso/2026.01.01/)华中科技大学[开源镜像站](https://mirrors.hust.edu.cn/)，选择[archlinux-2026.01.01-x86_64.iso](https://mirrors.hust.edu.cn/archlinux/iso/2026.01.01/archlinux-2026.01.01-x86_64.iso)（日期可能变化）

::link-card
---
title: Arch Linux Downloads
description: 官方 ISO 下载页面，镜像日期会持续更新。
link: https://archlinux.org/download/
---
::

### 1.2 制作启动盘

Windows 下推荐使用 [Ventoy](https://www.ventoy.net/cn/doc_start.html)、[Rufus](https://rufus.ie/) 或者 [Power ISO](https://www.poweriso.com/download.php)EULA 进行 U 盘刻录。三者皆为免费使用的软件。具体操作都非常简单除此之外，如果你还嫌麻烦，还可以使用更为简单的安装盘制作工具 [balenaEtcher](https://www.balena.io/etcher/)。这里以Rufus为例

::card-list
- **Ventoy**：适合经常换 ISO，直接把镜像复制进 U 盘即可。
- **Rufus**：适合一次性制作启动盘，选项直接，本文以它为例。
- **balenaEtcher**：流程更简单，适合不想处理复杂选项的情况。
- **Power ISO** :badge[text="EULA"]：可用，但需要自行留意专有软件协议。
::

#### 1.2.1 下载 Rufus

浏览器搜索Rufus（[或者通过这里直接跳转](https://rufus.ie/zh_TW/#download)）向下反动找到Download选项，下载[`rufus-4.11.exe`](https://github.com/pbatard/rufus/releases/download/v4.11/rufus-4.11.exe)（随版本更新链接可能失效）

#### 1.2.2 使用 Rufus 制作启动盘

在这里你需要一个8G以上的U盘，当然读写速度越快越好，制作启动盘会清空U盘里面的所有数据，需要提前做好数据备份。等待制作完毕直接点击右下角的关闭即可 千万不要再点一遍开始。

## 2. 进入引导页面

### 2.1 关闭 Secure Boot（安全启动）

根据ArchWiki介绍，Arch是不支持安全启动的，而一般电脑默认开启安全启动，所以需要先到BIOS里面关闭安全启动( Secure Boot )，注意需要先关闭Windows的快速启动（powercfg /h off）。

::alert{type="info" title="Windows 快速启动"}
如果保留 Windows 双系统，可以先在管理员终端执行 :tip[powercfg /h off]{copy}，避免快速启动锁住分区状态。
::

不同品牌的主板进入BIOS的方式千奇百怪，需要去浏览器上搜索一下具体的按键。关闭安全启动，并且调整启动顺序后应该就可以正常进去live环境了

### 2.2 确定UEFI固件启动

::pic
---
src: https://jianges.com/wp-content/uploads/2026/01/1768396992-image-1024x633.png
caption: 主板 BIOS 固件界面
---
::

进入live环境后如何是以下界面说明是进入了主板的BIOS固件

::pic
---
src: https://jianges.com/wp-content/uploads/2026/01/1768397155-image.png
caption: Arch Linux UEFI 启动界面
---
::

这个页面说明是进入了UEFI固件

这篇教程主要是以UEFI的方式安装，如果你的主板是只支持BIOS的老设备，在分区和安装引导的部分可能不一样，网上有很多教程可以自己查一查。

::alert{type="warning" title="本文限定环境"}
后续分区、挂载和 GRUB 配置默认基于 UEFI + GPT + BTRFS。传统 BIOS/MBR 设备需要改用另一套引导方案。
::

## 3.正式安装（预备步骤）

### 3.1 禁用 reflector 服务

2020 年，archlinux 安装镜像中加入了 `reflector` 服务，它会自己更新 `mirrorlist`（软件包管理器 `pacman` 的软件源）。在特定情况下，它会误删某些有用的源信息。这里进入安装环境后的第一件事就是将其禁用。也许它是一个好用的工具，但是很明显，因为地理上造成的特殊网络环境，这项服务并不适合启用。

通过以下命令将该服务禁用：

```zsh
systemctl stop reflector.service
```

### 3.2 联网

进入ISO后第一步就是先链接网络，防止网卡被禁用，使用以下命令解除网卡禁用：

```zsh
rfkill unblock all
```

`ip a`可以列出当前的连接信息，有线网自动连接，如果没有有线网络可以通过USB分享手机网络。链接无线网络需要使用iwd提供的命令行工具。

```zsh
iwctl   # 进入交互式命令行
device list    # 列出无线网卡设备名，比如无线网卡看到叫 wlan0
station wlan0 scan    # 扫描网络
station wlan0 get-networks    # 列出所有 wifi 网络
station wlan0 connect 你的wifi名称    # 进行连接，注意这里无法输入中文。回车后输入密码即可
exit # 连接成功后退出
```

然后我们随便ping一个网站测试网络是否正常比如：

```zsh
ping -c 4 bilibili.com  #-c 4 指定次数 四次
```

### 3.3 更新系统时钟

连接网络后系统后台会自动激活网络时间协议（NTP）把时间同步到UTC世界时间。我们要通过使用`timedatectl`来确保开启了NTP，这一步**不是**可选的，正确的系统时间对于部分程序来说非常重要

```zsh
timedatectl set-ntp true # 将系统时间与网络时间进行同步
timedatectl status # 检查服务状态
```

### 3.4 配置镜像源

```zsh
reflector -a 12 -c cn -f 10 --sort score --verbose --save /etc/pacman.d/mirrorlist
```

::folding{title="reflector 参数说明"}
- `reflector`：自动筛选并写入 Arch 镜像源的工具。
- `-a 12`：只选择最近 12 小时内同步过的镜像。
- `-c cn`：限定中国大陆镜像。
- `-f 10`：从候选中取速度较快的 10 个。
- `--sort score`：按综合评分排序。
- `--verbose`：显示详细过程。
- `--save /etc/pacman.d/mirrorlist`：把结果写入 pacman 的镜像列表。
::

然后更新数据库并安装密钥

```zsh
pacman -Sy archlinux-keyring
```

::folding{title="pacman -Sy archlinux-keyring 做了什么"}
`-S` 是 `Sync`，可以简单理解为从软件仓库同步并安装软件包；`y` 会刷新本地软件包数据库；`archlinux-keyring` 是 Arch Linux 的密钥包。先更新它可以减少后续安装时遇到签名校验错误的概率。
::

## 4. 硬盘分区

### 4.1 明确分区状态

首先查看当前分区情况，找到自己使用的硬盘

```zsh
lsblk -pf    #-p完整列出设备名称 -f显示更多信息
```

如果不确定是不是自己使用的硬盘，可以使用 `fdisk -l 设备名` 查看该硬盘更详细的信息

```zsh
fdisk -l /dev/nvme0n1
```

出现了`Microsoft`或者`Windows`字样说明是`Windows`相关的分区，并且这块硬盘的第一个分区`EFI System`分区是`Windows`的启动分区，要小心操作

如果还不确定是不是自己想用的硬盘，可以使用 `cfdisk` 命令查看硬盘里面有没有之前预留的空间，注意`Size Type`的大小

```zsh
cfdisk /dev/nvme0n1
```

### 4.2 正式分区

明确使用那个硬盘之后我们使用cfdisk进行正式分区，如果你的硬盘是第一次使用会弹出几个选项让你选择分区模式，选择GPT即可

::pic
---
src: https://jianges.com/wp-content/uploads/2026/01/1768400160-image-1024x182.png
caption: cfdisk 分区模式选择，本文选择 GPT
---
::

我们首先要创建一个启动分区（当然我们可以让windows和linux共用一个引导分区，但是windows可能会搞坏linux的引导，保险起见我们为linux创建一个独立于windows的启动分区）

使用↑↓键来选中要使用的空闲空间，←→键选择`new`，创建一个`200mb`的分区，再选择`type`把类型改为`EFI System`

::alert{type="warning" title="分区写入前再确认"}
在 `cfdisk` 中选择 `write` 前，再核对一次硬盘名、分区大小和分区类型。写入之后再格式化，原数据就很难恢复。
::

::folding{title="cfdisk 按键提示"}
- 使用 :key{code="ArrowUp" icon} :key{code="ArrowDown" icon} 选择分区或空闲空间。
- 使用 :key{code="ArrowLeft" icon} :key{code="ArrowRight" icon} 切换底部操作。
- 选择 `write` 后需要输入 `yes` 才会真正写入。
- 选择 `quit` 退出，:key{ctrl code="L" icon} 可以清屏。
::

::alert{type="warning" title="转换分区表会清空现有分区"}
如果看不到 GPT 选项，目标盘大概率仍是 `MBR` 分区模式。更改分区模式会清除已有分区，只有在确认目标硬盘可以被重建时才继续。
::

::folding{title="如果看到的是 MBR 分区模式"}
需要先修改成 `GPT` 分区模式才能按以下步骤操作。

```zsh
fdisk /dev/nvme0n1
```

输入 `g` 创建 `GPT`。

```zsh
g
```

再输入 `w` 保存更改。

```zsh
w
```
::

::folding{title="ESP 挂载点和 BTRFS 快照的关系"}
启动分区的大小取决于你要把启动分区挂载到哪一个位置，启动分区的英文名是 `EFI System Partition`，简称 `ESP`，也叫 `EFI 分区`。

`ESP` 的常用挂载点有三个：`/boot`、`/boot/efi`、`/efi`。其中最常用的是 `/boot`，但 `boot` 目录会存放内核和系统初始化相关文件，内核文件体积通常较大，如果 `ESP` 挂载到 `/boot`，多内核环境下可能需要 1G 甚至 2G 空间。

本文使用 `BTRFS` 快照。因为 `ESP` 必须是 FAT 文件系统，如果希望用 `BTRFS` 管理系统快照，就不应该把 `ESP` 挂载到 `/boot` 下。这里选择 `/efi`，让 `ESP` 只存放引导相关文件。
::

然后我们来创建根分区，选中剩余空间，选择`new`，直接回车把所有空间分配到一个分区里，类型不需要更改

::alert{type="info" title="为什么这里选 BTRFS"}
`EXT4` 实用可靠，`BTRFS` 的优势是快照。对 Arch Linux 这种滚动发行版来说，快照可以在系统更新翻车时提供回滚余地，所以本文选择 `BTRFS`。
::

分区结束之后选择`write`保存 ，输入`yes`确定保存，最后`quit`保存退出 （`ctrl + l`清屏）

```zsh
lsblk -pf    #再次列出分区信息
```

接下来要通过格式化分区建立我们需要的文件系统，注意格式化的时候一定要确认设备名没有输错！

::alert{type="error" title="格式化会清空目标分区"}
下面两条命令会重建文件系统。执行前务必确认 `/dev/nvme0n1p1` 是新的 ESP，`/dev/nvme0n1p2` 是新的根分区，不要照抄到错误硬盘。
::

```zsh
mkfs.fat -F 32 /dev/nvme0n1p1    #把ESP格式化为FAT32
mkfs.btrfs /dev/nvme0n1p2    #把根分区格式化为BTRFS 
```

如果空间比较大的话可能需要一些时间，耐心等待一下

### 4.3 创建子卷

子卷是BTRFS的另一个特点，作用之一是设置快照的范围。如果我们不创建子卷，那么快照的时候就会把系统数据和用户数据一起存档。~~设想一下你只想要恢复系统数据却把你熬夜写的博客也一起恢复了 功夫白费~~

为了避免这种情况发生，我们需要创建两个同级的子卷，把系统数据和用户数据分开

```zsh
mount -t btrfs /dev/nvme0n1p2 /mnt    #把根分区挂载到mnt目录
```

::folding{title="mount 命令说明"}
`mount` 是挂载命令，`-t` 用来指定文件系统类型，例如这里的 `btrfs`。
::

```zsh
btrfs subvolume create /mnt/@    #用BTRFS管理工具创建root子卷 
btrfs subvolume create /mnt/@home    #用BTRFS管理工具创建home子卷 
```

::folding{title="为什么这里不单独创建 swap 分区"}
交换分区的主要用途是存储内存中的冷数据，也能在内存不够用时把硬盘当作虚拟内存，还可以用于 `Hibernate` 休眠到硬盘。

桌面端场景里，休眠到硬盘通常可以被 `Suspend` 睡眠取代。如果只是需要一点交换空间存放冷数据，也可以用 `zram` 把一部分内存压缩后作为交换空间。这样速度更快，也不会频繁写硬盘。

后面会介绍用 `zram` 配置内存压缩和交换空间。
::

再次运行lsblk -pf命令查看分区情况

```zsh
lsblk -pf
```

现在是根分区挂载到了mnt， 为了把root子卷挂载到mnt我们需要先取消挂载

```zsh
umount /mnt    #umount的意思是取消挂载
```

把root子卷挂载到mnt

```zsh
mount -t btrfs -o subvol=/@,compress=zstd /dev/nvme0n1p2 /mnt
```

::folding{title="BTRFS 挂载参数说明"}
`-o` 是 `option`，用来指定挂载参数，参数之间用逗号隔开。

- `subvol=/@`：指定要挂载的子卷。
- `compress=zstd`：启用透明压缩，压缩算法为 `zstd`。

透明压缩会在数据写入硬盘前先压缩数据，通常可以提高读写性能、节省空间，并减少写入量。
::

接着把home子卷挂载到/mnt/home， 由于/mnt里边没有home目录， 所以需要加上--mkdlir选项创建目录

```zsh
mount --mkdir -t btrfs -o subvol=/@home,compress=zstd /dev/nvme0n1p2 /mnt/home
```

最后我们要挂载ESP

```zsh
mount --mkdir /dev/nvme0n1p1 /mnt/efi
```

## 5. 正式安装系统

### 5.1安装系统

```zsh
pacstrap -K /mnt base base-devel linux-zen linux-firmware btrfs-progs
```

::folding{title="pacstrap 这一步安装了什么"}
`pacstrap` 会把软件安装到指定的根目录下。`-K` 用来复制密钥，`/mnt` 是当前挂载的新系统根目录。

- `base`：基础系统包。
- `base-devel`：编译 AUR 助手和软件时常用。
- `linux-zen`：性能特调内核。
- `linux-firmware`：基础固件。
- `btrfs-progs`：BTRFS 管理工具。

如果你是 Marvell 网卡，需要额外安装：

```zsh
pacstrap -K /mnt linux-firmware-marvell
```
::

然后我们还需要安装一些最基本的功能性软件

```zsh
pacstrap /mnt networkmanager vim sudo intel-ucode
```

::alert{type="info" title="CPU 微码包二选一"}
这里示例安装的是 `intel-ucode`。如果使用 AMD CPU，请把它换成 `amd-ucode`。
::

::folding{title="基础工具说明"}
- `networkmanager`：联网工具，主流桌面环境通常默认使用它。
- `vim`：终端文本编辑器，后面要用来编辑配置文件。
- `sudo`：普通用户提权工具。
- `intel-ucode` / `amd-ucode`：CPU 微码更新包。
::

在切换进系统前我们需要先生成fstab文件，系统在启动的时候会按照里面的内容自动完成挂载

```zsh
genfstab -U /mnt > /mnt/etc/fstab
```

::folding{title="fstab 命令说明"}
大写 `-U` 表示使用 UUID 指定分区。`>` 代表覆盖写入目标文件，如果是 `>>`，则代表在文件末尾追加写入。
::

### 5.2 进入新系统

现在用这段命令进入新安装的系统，可以注意到提示符发生了改变

```zsh
arch-chroot /mnt
```

### 5.3 初期配置

#### 5.3.1 设置时区

```zsh
ln -s /usr/share/zoneinfo/Asia/Shanghai /etc/localtime
```

除了手动创建链接我们还可以通过timedatectl设置时区

```zsh
timedatectl set-timezone Asia/Shanghai
```

运行`timedatectl`可以看到我们时区已经变成了上海

#### 5.3.2 系统的本地化设置

首先用vim文本编辑器编辑etc目录下的locale.conf文件

```zsh
vim /etc/locale.gen
```

::folding{title="Vim 最小操作表"}
- :key{code="/"} 搜索文本。
- :key{code="x"} 删除光标所在字符，适合取消行首 `#` 注释。
- :key{code="i"} 进入编辑模式。
- :key{code="Escape"} 退出编辑模式。
- :key{code="u"} 撤销上一步修改。
- 输入 `:wq` 保存并退出。
- 输入 `:q!` 放弃修改并退出。
::

按下`/`搜索`en_US`回车，光标移动到`#en_US.UTF-8 UTF-8`的开头，按下`x`剪切掉前面代表注释的`#`号；再次按下`/`搜索`zh_CN`回车 ，光标移动到`#zh_CN.UTF-8 UTF-8`的开头，按下`x`剪切掉前面代表注释的`#`号。如果你操作错误了可以按下u键撤销更改。修改完成后按下shift加分号键输入一个冒号，代表要运行命令，`w`是保存`q`是退出`wq`是保存并推出，回车。

```zsh
:wq
```

然后运行locale-gen命令生成本地化文件

```zsh
locale-gen
```

接着编辑locale.conf文件设置本地化

```zsh
vim /etc/locale.conf
```

按下i键进入编辑模式，左下角会出现代表编辑模式的字样`--INSERT--`，输入以下命令代表全局本地化使用英文

```zsh
LANG=en_US.UTF-8   
```

编辑完成后`ESC`退出编辑模式`:wq`保存并退出

接着我们编辑hostname文件设置主机名

```zsh
vim /etc/hostname
```

`i`键进入编辑模式，输入你喜欢的主机名

```zsh
archlinux     #主机名只能包含小写字母数字0-9还有短横-
```

编辑完成后`ESC`退出编辑模式`:wq`保存并退出，我们现在已经掌握了Vim的基本操作了

下一步我们要设置root账户的密码

```zsh
passwd    #不指定用户名的话默认就是修改root账户，密码存储在etc目录下的shadow文件里 
```

盲输密码*2

最后我们来安装Bootloader引导加载程序

```zsh
pacman -S grub efibootmgr
```

::folding{title="为什么这里选择 GRUB"}
`GRUB` 对初学者来说资料最多、兼容性最好，后面配置 Windows 共存、快照启动项和多内核启动也更方便。`efibootmgr` 用来管理 UEFI 固件里的 EFI 启动项。
::

接着使用grub-install命令安装引导

```zsh
grub-install --target=x86_64-efi --efi-directory=/efi --boot-directory=/efi --bootloader-id=eris
```

::folding{title="grub-install 参数说明"}
- `--target=x86_64-efi`：指定当前设备使用 x86_64 UEFI 固件。
- `--efi-directory=/efi`：指定 ESP 挂载点，本文前面已经把 ESP 挂载到 `/efi`。
- `--boot-directory=/efi`：把 GRUB 文件也放进 ESP。本文的 `/boot` 位于 BTRFS 根分区，系统早期阶段写入 BTRFS 可能导致部分 GRUB 功能异常。
- `--bootloader-id=eris`：自定义启动项名称。不写的话通常会使用 `arch`。
::

由于大部分软件会默认grub的安装位置在boot目录下，我们要grub的默认位置创建一个链接指向/efi/grub

```zsh
ln -s /efi/grub /boot/grub    #这样对/boot/grub的操作就会反映到/efi/grub里
```

接下来要生成grub的配置文件

```zsh
grub-mkconfig    
```

这条命令会扫描系统 生成具体的启动项和启动流程，直接运行的话结果会打印在终端，加上`-o`会将结果保存到文件

```zsh
grub-mkconfig -o /boot/grub/grub.cfg
```

::alert{type="warning" title="修改 GRUB 后要重新生成配置"}
后面只要编辑了 `/etc/default/grub`，都需要再次执行 `grub-mkconfig -o /boot/grub/grub.cfg`，否则修改不会写入最终启动配置。
::

#### 5.3.3 Windows共存

如果你安装了Windows的话接下来我们来配置双系统（两个系统在同一个物理盘内）

```zsh
pacman -S os-prober exfat-utils
```

::folding{title="Windows 共存相关软件"}
- `os-prober`：生成 GRUB 配置时搜索其他系统。
- `exfat-utils`：提供 exFAT 文件系统相关工具，便于识别和处理部分 Windows 分区。
::

这个时候运行`os-prober`就能找到Windows

```zsh
os-prober
```

然后我们需要编辑`/etc/default`里面的`grub`的源文件

```zsh
vim /etc/default/grub
```

按下`shift + g`键跳转到文件的最后一行， 按`x`键剪切掉这行开头的注释，允许Grub在生成配置文件的时候使用os-prober搜索其他系统。推荐再配置一下启动项记忆功能，让Grub记住你在启动菜单选择的是哪一项

```zsh
#取消这一行的注释 
GRUB_SAVEDEFAULT=true
```

#### 5.3.4 配置GRUB

再按两下`g`键跳转到文件的开头，光标移动到这里`GRUB_DEFAULT=0` 按下`c`键 再按`w`键代表`change word` 删除光标所在的单词并进入编辑模式输入`saved`， 编辑完成后`ESC`退出编辑模式。

然后我们要让系统启动的时候显示出日志 ~~只有日志刷屏别人才知道你使用的是Arch~~ 方便确认系统异常

`i`键进入编辑模式， 在`GRUB_CMDLINE_LINUX_DEFAULT="loglevel=3 quiet"`中编辑， 删除quiet，再把loglevel日志等级改成5， 编辑完成后`ESC`退出编辑模式`:wq`保存并退出

::folding{title="这里修改了哪些 GRUB 选项"}
- `GRUB_DEFAULT=saved`：让 GRUB 默认进入上一次选择的启动项。
- `GRUB_SAVEDEFAULT=true`：保存每次手动选择的启动项。
- 删除 `quiet`：启动时显示更多日志。
- `loglevel=5`：提高内核日志显示等级，方便排查启动异常。
::

然后再grub-mkconfig生成一次grub的配置文件

```zsh
grub-mkconfig -o /boot/grub/grub.cfg
```

#### 5.3.5 配置Zram内存压缩和交换空间

最后我们来配置`Zram`内存压缩和交换空间，这可以提升系统运行速度增加可用内存

先安装`zram-generator`， 它是自动化管理`Zram`的工具

```zsh
pacman -S zram-generator
```

然后编辑它的配置文件， 启用`zram`并配置`zram`的大小

```zsh
vim /etc/systemd/zram-generator.conf
```

写入以下内容

```zsh
[zram0]
zram-size = ram
compression-algorithm = zstd
```

::folding{title="zram-generator 配置说明"}
- `zram-size = ram`：设置 zram 设备的最大容量为物理内存大小。这里的容量指压缩前的数据量。
- `compression-algorithm = zstd`：使用 `zstd` 压缩算法。
- 编辑完成后按 :key{code="Escape"}，输入 `:wq` 保存并退出。
::

保存之后我们需要编辑grub的源文件， 在内核参数里边加上 `zswap.enabled=0`

在`GRUB_CMDLINE_LINUX_DEFAULT="loglevel=5"`中编辑加上`zswap.enabled=0`

```zsh
#编辑为：     （禁用zswap）
GRUB_CMDLINE_LINUX_DEFAULT="loglevel=5 zswap.enabled=0"
```

::alert{type="info" title="zram 与 zswap 二选一"}
`zswap` 会在数据写入交换空间前先压缩并暂存在内存中，功能上会与 `zram` 重叠。本文已经启用 `zram`，所以在 GRUB 内核参数里禁用 `zswap`。
::

编辑完成后按 :key{code="Escape"}，输入 `:wq` 保存并退出

每一次编辑完grub的源文件之后都记得要重新生成`grub.cfg` 让修改生效

```zsh
grub-mkconfig -o /boot/grub/grub.cfg
```

现在我们完成了所有的配置 `exit`退出`chroot`环境

```zsh
exit
```

reboot重启

```zsh
reboot
```

此时会自动卸载所有的挂载，进BIOS把Arch的启动项改成第一个（默认应该会自动修改）

#### 5.3.6 启用并启动 NetworkManager

进入系统之后登录root账户

开启networkmanager的系统服务

```zsh
systemctl enable --now NetworkManager
```

::folding{title="systemctl 参数说明"}
- `systemctl`：`systemd` 的命令行管理工具。
- `enable`：设置服务开机自启。
- `--now`：立即启动这个服务。
- `NetworkManager`：服务名区分大小写。
::

稍作等待后运行nmtui开连接网络的TUI界面

::folding{title="什么是 TUI"}
`TUI` 是基于终端的用户交互界面。`nmtui` 可以在没有桌面的情况下用方向键和回车配置网络。
::

`↑↓`键选择第二项连接wifi， 回车键可以选择， 连接完成后ESC退出

#### 5.3.7 测试网络并安装fastfetch

还记得如何测试网络连接吗

```zsh
ping -c 4 bilibili.com  #-c 4 指定次数 四次
```

然后我们安装`fastfetch`和`cmatrix`

国际惯例，fetch一下显示系统LOGO和信息

```zsh
fastfetch
```

恭喜我们完成了ArchLinux的手动安装 🥳

~~当然接下来我们还有几道难关需要攻克~~

## 6. 配置驱动和基础显示

在配置快照之前我们可以做一些基本的设置

### 6.0配置快照前的准备

#### 6.0.1确认系统是最新状态

```zsh
pacman -Syu    #小写u代表升级所有软件
```

#### 6.0.2编辑环境变量

```zsh
vim /etc/environment
```

用`EDITOR`环境变量设置（将系统默认文本编辑器设为vim），在最后一行加入：

```zsh
EDITOR=vim
```

保存后用exit退出登录

```zsh
exit
```

重新登录让环境变量生效

#### 6.0.3创建普通账户

很多软件出于安全考虑会拒绝在root权限下运行，所以普通用户是必须的

```zsh
useradd -mG wheel 你的名字   
```

::folding{title="普通用户和 wheel 组"}
- `useradd`：创建新用户。
- `-m`：同时创建用户的 home 目录。
- `-G wheel`：把用户加入 `wheel` 组。Arch 上通常通过这个组授予管理员权限。
- 用户名建议只使用小写英文、数字和短横线，不要用中文。
::

然后passwd加上用户名设置密码

```zsh
passwd 你的名字
```

再运行visudo设置管理员权限

```zsh
visudo
```

`/`搜索`wheel`， 取消这一行的注释`# %wheelALL=(ALL:ALL) ALL`， 记得保存

#### 6.0.4 开启32位软件源

32位软件源对桌面端用户来说是必须的， 这需要编辑Pacman的配置文件

```zsh
vim /etc/pacman.conf
```
`/`键搜索multilib

取消下面两行的注释（都要取消！）

```zsh
[multilib] 
Include = /etc/pacman.d/mirrorlist
```

#### 6.0.5 添加ArchlinuxCN源

ArchlinuxCN源和Archlinux用户仓库的效果类似， 可以方便我们安装软件

在文件的最底部按下`o`键新建一行， 写入以下内容（千万不能有拼写错误）

::alert{type="warning" title="软件源名称必须完全一致"}
`[archlinuxcn]`、`Server`、镜像地址和 `$arch` 都要准确输入。这里写错会导致后续同步数据库或安装密钥失败。
::

```zsh
[archlinuxcn]
Server = https://mirrors.ustc.edu.cn/archlinuxcn/$arch
```

保存之后同步数据并安装Archlinuxcn的密钥

```zsh
pacman -Sy archlinuxcn-keyring
```

配置好archlinuxcn之后可以顺便下载AUR助手

```zsh
pacman -S yay paru
```

### 6.1 正式配置快照

```zsh
pacman -S snapper snap-pac btrfs-assistant grub-btrfs inotify-tools
```

::folding{title="快照相关软件说明"}
- `snapper`：自动化管理快照的命令行工具，负责创建、查看、删除快照。
- `snap-pac`：在执行 `pacman` 操作前后自动创建快照。
- `btrfs-assistant`：图形化交互工具，也提供简单命令行，方便快照回档。
- `grub-btrfs`：把快照启动项加入 GRUB 菜单。
- `inotify-tools`：快照启动项更新功能的依赖。
::

开启快照启动项的`systemd`服务 ：

```zsh
systemctl enable --now grub-btrfsd
```

重启一次电脑让pacman自动创建快照的功能生效

```zsh
reboot
```

重启之后登录root账户， 创建根目录的配置

```zsh
snapper -c root create-config /
```

::folding{title="snapper 配置命令说明"}
`-c root` 指定配置名为 `root`；`create-config` 会创建这份配置；最后的 `/` 表示快照范围是根目录。
::

然后用一样的方式创建home的配置

```zsh
snapper -c home create-config /home
```

现在我们来创建第一个root快照

```zsh
snapper -c root create --description "helloworld"
```

::folding{title="手动创建快照命令说明"}
`create` 代表创建快照，`--description` 用来添加描述。描述写清楚之后，后续在 `btrfs-assistant` 或 GRUB 快照菜单里会更容易识别。
::

home的快照也是一样的方法

```zsh
snapper -c home create --description "helloworld"
```

为了进一步让系统变得可靠， 我们要安装一个LTS长期支持内核用来备用

```zsh
pacman -S linux-lts
```

::alert{type="info" title="LTS 内核是备用入口"}
`linux-lts` 更新频率更低。系统异常时，可以在快照回档前先尝试用 LTS 内核进入系统，判断问题是否来自新内核。
::

然后还需要运行一次grub-mkconfig命令， 在启动菜单添加快照的入口

```zsh
grub-mkconfig -o /boot/grub/grub.cfg
```

### 6.2配置显卡驱动

#### 6.2.1 NVIDIA显卡

首先先确认安装了自己使用的内核的头文件

```zsh
pacman -S --needed linux-zen-headers linux-lts-headers
```

::folding{title="为什么要安装内核头文件"}
`--needed` 会跳过已经安装的软件包。`linux-zen-headers` 和 `linux-lts-headers` 是 DKMS 编译 NVIDIA 驱动时需要的内核头文件。
::

浏览器搜索ArchWiki Nvidia Driver 找到N卡驱动的wiki页面， 确定自己显卡型号要安装的驱动包名

这里以50系显卡为例

::link-card
---
title: Nouveau CodeNames
description: 对照 NVIDIA 显卡代号，用来判断适合的驱动包。
link: https://nouveau.freedesktop.org/CodeNames.html
---
::

对照表可知 驱动的包名是`nvidia-open`

::folding{title="NVIDIA 驱动包选择"}
- `nvidia-open` 是近年快速发展的内核模块开源 NVIDIA 驱动，兼容性通常更好。
- 不同内核对应的包后缀不同，运行 `uname -r` 可以查看当前内核。
- 本文使用 `linux-zen`，所以选择 `nvidia-open-dkms`。
::

除了驱动包我们还需要安装`nvidia-utils`和`lib32-nvidia-utils` 这是库和工具集

```zsh
pacman -S nvidia-open-dkms nvidia-utils lib32-nvidia-utils
```

::alert{type="info" title="NVIDIA DKMS 编译需要等待"}
`lib32-` 前缀代表 32 位兼容库。DKMS 编译内核模块可能需要一些时间，等待命令正常结束即可。
::

#### 6.2.2 Intel和AMD显卡

Intel和AMD显卡的驱动安装要简单很多

Intel显卡需要安装这些包 ：

```zsh
pacman -S mesa lib32-mesa vulkan-intel lib32-vulkan-intel
```

AMD显卡需要安装这些包：

```zsh
pacman -S mesa lib32-mesa xf86-video-amdgpu vulkan-radeon lib32-vulkan-radeon
```

### 6.3 视频编解码驱动

Linux上通常使用`VAAPI`进行硬件视频加速

AMD一般不需要额外安装

Intel通常安装`intel-media-driver` 或者 `libva-intel-driver`

```zsh
pacman -S intel-media-driver libva-intel-driver
```

N卡由`nvidia-utils`提供， 但是为了让N卡支持`VAAPI`还需要安装`libva-nvidia-driver`提供`VAAPI`翻译

```zsh
pacman -S --needed nvidia-utils libva-nvidia-driver
```

驱动安装完成后需要重启电脑才能生效

```zsh
reboot
```

### 6.4音视频服务和蓝牙

登录普通账户

```zsh
sudo pacman -S sof-firmware alsa-ucm-conf alsa-firmware
```

::folding{title="音频固件包说明"}
- `sof-firmware`：为现代设备提供音频固件。
- `alsa-ucm-conf`：提供必要的 ALSA 配置文件。
- `alsa-firmware`：为一些不常见或较旧的设备提供固件，比如采集卡。
::

```zsh
sudo pacman -S pipewire wireplumber pipewire-pulse pipewire-alsa pipewire-jack
```

::folding{title="PipeWire 组件说明"}
- `pipewire`：音视频服务本体。
- `wireplumber`：PipeWire 的会话管理器。
- `pipewire-pulse`、`pipewire-alsa`、`pipewire-jack`：分别提供 PulseAudio、ALSA、JACK 兼容层。
::

启动pipewire服务

```zsh
systemctl --user enable pipewire wireplumber pipewire-pulse
```

::alert{type="info" title="--user 不需要 sudo"}
这里启用的是当前用户空间的服务，所以命令前不需要加 `sudo`。
::

安装蓝牙

```zsh
sudo pacman -S bluez
```

开启蓝牙服务

```zsh
sudo systemctl enable --now bluetooth
```

### 6.5 性能模式切换工具

```zsh
sudo pacman -S power-profiles-daemon    #这个工具几乎是各个桌面端通用的
```

开启服务

```zsh
sudo systemctl enable --now power-profiles-daemon
```

### 6.6 基础的字体

```zsh
sudo pacman -S noto-fonts noto-fonts-emoji adobe-source-han-sans-cn-fonts
```

::folding{title="基础字体选择"}
- `noto-fonts`：Google 开源的基础西文字体。
- `noto-fonts-emoji`：Emoji 字体。
- `adobe-source-han-sans-cn-fonts`：思源黑体中文字体。也可以用 `pacman -Ss source-han` 或 AUR 搜索自己偏好的中文字体包。
::

### 6.7 安装 Flatpak

```zsh
sudo pacman -S flatpak
```

::folding{title="为什么安装 Flatpak"}
Flatpak 覆盖了很多桌面应用。部分软件的 Flatpak 版本比 AUR 版本更省心，例如 OBS 和 EasyEffects。
::

把Flathub的源换成上交大

```zsh
sudo flatpak remote-modify flathub --url=https://mirrors.sjtu.edu.cn/flathub
```

重启电脑使用新的initramfs进入系统

```zsh
reboot
```

## 7. 安装桌面环境

现在你已经做好了所有安装图形化环境前的准备

### 7.0 安装桌面环境前的准备

#### 7.0.1 创建备份快照

用Snapper创建root和home的快照

::alert{type="info" title="安装桌面前先留回滚点"}
桌面环境会安装大量包。先给 `root` 和 `home` 各创建一个快照，后面如果显示服务、驱动或输入法配置出错，可以更容易回退。
::

```zsh
sudo snapper -c home create --description "before desktop"
sudo snapper -c root create --description "before desktop"
```

#### 7.0.2 选择适合你的桌面

Linux的图形化环境太过丰富， 篇幅原因能挑出当下最热门的图形化环境进行介绍

::folding{title="DE 和 WM 的区别"}
桌面环境（Desktop Environment，简称 DE）会提供完整的桌面体验，包含窗口管理、面板、设置、文件管理器等完整组件。

窗口管理器（Window Manager，简称 WM）在 Wayland 时代也常被叫做 Wayland 合成器。它主要负责窗口管理，任务栏、系统托盘、启动器、通知等功能通常需要自己搭建。主流 WM 同时支持平铺式和堆叠式布局，占用也通常更低。
::

::tab{:tabs='["GNOME","KDE Plasma","Sway","Niri","Hyprland","Quickshell"]'}
#tab1

GNOME 追求简洁，~~但简洁过头显得有些简陋~~，常常需要安装额外扩展来补全桌面功能。

#tab2

KDE Plasma 功能众多且实用，但刚上手会觉得 UI 和选项有点无从下手。本文后面以 KDE Plasma 为安装示例。

#tab3

Sway 是非常精简的 WM，开机后的 CPU 占用通常只有 0% - 1%，内存占用大约 500 MB 左右。

#tab4

Niri 也是一个很经典的 WM，占用比 Sway 高几十 MB，但提供了流畅动画和更丰富的窗口布局。

#tab5

Hyprland 是当下热门的 WM，~~不接受反驳~~，卖点是高度自定义，缺点是资源占用几乎接近完整桌面环境。

#tab6

如果你想要 WM 的独特窗口管理，但不想花大量时间自己配置，Quickshell 可以提供更接近开箱即用的桌面级 WM 体验。主流的 Quickshell 配置有 DMS 和 Noctalia。
::

### 7.1桌面环境的正式安装（KDE）

```zsh
sudo pacman -S plasma konsole dolphin kate ark haruna gwenview firefox
```

::card-list
- **plasma**：KDE Plasma 桌面的主要组件集合。
- **konsole**：KDE 标配终端。
- **dolphin**：KDE 标配文件管理器。
- **kate**：KDE 标配文本编辑器。
- **ark**：压缩与解压缩工具。
- **haruna**：基于 Qt 和 MPV 的视频播放器。
- **gwenview**：图片查看工具。
- **firefox**：浏览器。
::

回车安装全部， 选择第一项`ffmpeg`

配置SDDM显示管理器开机自启

```zsh
sudo systemctl enable --now sddm
```

::folding{title="显示管理器是什么"}
显示管理器负责图形化登录界面和桌面会话启动。KDE Plasma 常用 `sddm`。
::

至此所有的系统安装已经全部结束了🥳😘

~~但是什么软件几乎都没有安装~~

### 7.2简单的设置和应用安装

#### 7.2.1 设置系统为中文

打开 `System Settings` > `Language and Regional Settings` > 在 `Language` 中点击 `Add languages...` > 选择中文加入 `ADD`，再拖拽到第一位 > 点击 `Apply` （ 注销并重新登陆即可生效 ）

#### 7.2.2 安装输入法

安装相关软件包

```zsh
sudo pacman -S fcitx5-im # 输入法基础包组
sudo pacman -S fcitx5-chinese-addons # 官方中文输入引擎
```

设置环境变量。在这里我们通过使用`nano`来写入环境变量 `~/.config/environment.d/im.conf`

```zsh
sudo pacman -S nano    #安装nano
mkdir -p ~/.config/environment.d
nano ~/.config/environment.d/im.conf
```

在文件中加入以下内容并保存退出：

```zsh
# fix fcitx problem
GTK_IM_MODULE=fcitx
QT_IM_MODULE=fcitx
XMODIFIERS=@im=fcitx
SDL_IM_MODULE=fcitx
GLFW_IM_MODULE=ibus
```

打开 `系统设置` > `区域设置` > `输入法`

点击提示信息中的 `运行 Fcitx`

点击 `添加输入法` > 找到简体中文下的 `Pinyin` > 点击 `添加` 即可加入拼音输入法

接下来点击 `Pinyin` 右侧的配置按钮 > 点选 `云拼音` 和 `在程序中显示预编辑文本` > 最后点击 `应用`

注销重启即可

::alert{type="info" title="输入法主题可以换成 Breeze"}
默认输入法主题不太协调，[内置的 Breeze](https://planet.kde.org/weng-xuetian-2022-07-04-fcitx-5-plasma-theme-support/) 和 KDE Plasma 更搭。
::

打开 `系统设置` > `区域设置` > `输入法` > `配置附加组件` > `经典用户界面的⚙️` > `主题` >`KDE Plasma (Experimental)`

#### 7.2.3 以空会话启动

默认情况下，KDE 桌面环境中关机之后再开机会恢复先前保存的对话（如浏览器没有关掉，那么开机之后浏览器还在）。

如果你不喜欢这样，请按照以下步骤设置：

1. 打开 `系统设置` > 点击侧栏 `开机与关机` > `桌面会话`
2. 将 `登入时` 的选项改为 `以空会话启动`
3. 点击 `应用` 保存设置

#### 7.2.4 触控板

一般情况下，libinput 已经安装到你的电脑，触摸板应该可用。

但是默认情况下，触摸板并不启用 `轻触点击`、`自然滚动` 等功能，打开 `系统设置` > 点击侧栏 `输入设备` > `触摸板` 来修改你想要的触摸板行为。

#### 7.2.5 安装 Windows 字体

Windows 字体不仅日常可能会使用到，还可以让部分需要这些字体的应用（如 Wine）显示字体不会乱码。

- 从本地 Windows 获取字体文件

1. 首先需要挂载 Windows 下的 C 盘所在分区。若分区为 Bitlocker 上锁分区，可通过 Dolphin 使用对应的恢复密钥解锁
2. 建立 archlinux 下存放 Windows 字体的文件夹

```zsh
sudo mkdir /usr/share/fonts/WindowsFonts
```

进入 Windows 的 `Fonts` 文件夹，将字体复制到建立的文件夹并设置合理的权限：

```zsh
cd /path/to/C:/Windows/Fonts # 或者通过 Dolphin 在此文件夹下右键 > 点击 打开终端
sudo cp ./* /usr/share/fonts/WindowsFonts
sudo chmod 755 /usr/share/fonts/WindowsFonts/* # 设置合理的权限
```

刷新字体：

```zsh
fc-cache -vf # -v：显示过程
```

::folding{title="也可以从 AUR 安装 Windows 字体"}
通过以下命令安装 Windows 11 的中文字体：

```zsh
yay -S ttf-ms-win11-auto-zh_cn    # 原理是网络挂载 Windows 11 安装镜像并从中提取字体文件
```
::

#### 7.2.6 其他软件安装

其他软件的安装我们主要通过`AUR`来完成, 下面以 **`yay`** 为例演示

::folding{title="AUR、CN、EULA 角标说明"}
`AUR`（Arch User Repository）是 Arch Linux 社区维护的非官方软件仓库，用来补充官方仓库。用户提交 `PKGBUILD`，其他用户通过它编译、安装软件。

- :badge[AUR]{link="https://aur.archlinux.org/"}：来自 AUR，不在 Arch 官方支持范围内，可能出现更新不及时、无法安装或运行异常。
- :badge[CN]{link="https://www.archlinuxcn.org/archlinux-cn-repo-and-mirror/"}：来自 Arch Linux 中文社区仓库，也不属于 Arch 官方仓库。
- :badge[EULA]{link="https://www.gnu.org/proprietary/proprietary.html"}：专有软件，需要自行判断是否接受协议和使用风险。
::

##### 7.2.6.1 搜索 AUR 包

搜索包名或关键词（支持正则匹配）：

```zsh
yay -Ss 关键词  # 搜索官方仓库 + AUR 包（-s 表示搜索，-S 无实际意义）
# 示例：搜索 neovim 相关的 AUR 包
yay -Ss wechat
```

输出示例：

```zsh
aur/xchat-bin 1.0.0-6 (+0 0.00) 
    Unofficial WeChat client side built with React18 + Vite4, MobX and Electron27.(Prebuilt version.Use system-wide electron)使用 React18+Vite4、MobX 和 Electron27 构建的非官方WeChat微信客户端
aur/plasma-wechat-toggle 1.0.0-1 (+0 0.00) 
    Toggle WeChat window on KDE Plasma Wayland
aur/oba-live-tool-git 1.5.9.r0.g6c9ec63-1 (+0 0.00) 
    Live delivery tool,support Douyin,Buyin,Douyin group buying,Xiaohongshu Qianfan,WeChat Channels platform,can automatically pop up windows,automatically speak,AI help reply(Use system-wide electron)
aur/matrix-wechat-git 0.1.0.r2.g9abc502-6 (+0 0.00) (孤包) 
    A Matrix-WeChat puppeting bridge
aur/electronic-wechat 2.3.3-1 (+2 0.00) 
    Better WeChat client under Linux. Which used system Electron and removed the useless content in the package
aur/fake-deepin-file-manager 1.0-2 (+0 0.00) 
    Workaround the Show in Folder functionality for wechat
aur/mejituu-wine8 8.16_plus_Mejituu_2024012516-1 (+1 0.00) 
    wine8 for Wechat (Mejituu version)
aur/fcitx5-theme-wechat 0.0.1-1 (+1 0.03) 
    WeChat style fcitx5 theme
aur/electronic-wechat-uos-bin 2.3.2-11 (+13 0.00) 
    Linux下更好用的微信客户端. 更多功能, 更少bug. 使用系统Electron并利用UOS请求头修复了登陆问题.
aur/com.qq.weixin.spark 3.9.10deepin1.1-1 (+31 0.00) 
    Tencent WeChat Client from Spark Store
aur/wechat-callout-git r4.94f9e6c-1 (+0 0.00) 
    微信窗口快捷键唤出/隐藏
aur/wechat-devtools-appimage 1.06.2412050-2 (+1 0.00) (过时的: 2025-06-20) 
    The development tools for wechat projects
aur/wechat-devtools-bin 2:1.06.2412050_2-2 (+0 0.00) 
    WeChat Devtools For Linux.
aur/wechat-backup 1.0.0-2 (+0 0.00) (孤包) 
    微信聊天记录持久化备份本地硬盘，释放手机存储空间。
aur/wechat-devtools-git 2.01.2510260-3 (+3 0.00) 
    WeChat Devtools For Linux.
aur/wechatircd-git r85.bb8f354-1 (+0 0.00) 
    IRC server capable of controlling Web WeChat
aur/wechat-devtools 2:1.06.2308310-1 (+22 0.00) (孤包) (过时的: 2024-03-02) 
    WeChat Devtools For Linux.
aur/wechat-bin 4.1.0.13-1 (+15 2.51) (已安装)
    微信是一种生活方式. This is a repackage of WeChat.
aur/wechat-universal-bwrap 4.1.0.13-1 (+137 1.32) 
    WeChat (Universal) with bwrap sandbox
aur/wechat-appimage 4.1.0-2 (+19 3.29) 
    Wechat for Linux
archlinuxcn/wine-for-wechat-debug 11.0-1 (181.3 MiB 1.1 GiB) 
    Detached debugging symbols for wine-for-wechat
archlinuxcn/wine-for-wechat 11.0-1 (56.2 MiB 502.6 MiB) 
    A patched version of Wine for running Wechat and Netease Music without persistent shadow windows
aur/wechat 1:10-1 (+48 0.25) 
    Fixes and optional sandbox for WeChat.
```

##### 7.2.6.2 安装 AUR 包

基本语法：`yay -S 包名`（自动处理依赖、构建、安装）。

示例：安装 `wechat-bin`：

```zsh
yay -S wechat-bin
```

::timeline
{拉取源码}

`yay` 拉取 AUR 仓库源码，其中包含 `PKGBUILD`。

{检查构建脚本}

提示“是否编辑 PKGBUILD？”。普通使用可以选 `n`，首次安装不熟悉的软件建议选 `y` 检查内容。

{安装依赖}

自动执行类似 `makepkg -s` 的依赖安装流程。

{构建软件包}

调用 `makepkg` 构建二进制包。

{安装结果}

调用 `pacman -U` 安装生成的 `.pkg.tar.zst` 包。
::

##### 7.2.6.3 更新 AUR 包

AUR 包需手动更新，`yay` 可一键更新系统（官方 + AUR）：

```zsh
yay  # 等价于 yay -Syu（-y 更新数据库，-u 升级包）
```

仅更新 AUR 包（不更新官方仓库）：

```zsh
yay -Sua  # -a 仅处理 AUR 包
```

##### 7.2.6.4 卸载 AUR 包

与 `pacman` 语法一致，使用 `-Rns` 清除依赖和配置文件：

```zsh
yay -Rns wechat-bin  # -R 卸载，-n 清除配置，-s 清除未被依赖的依赖
```

##### 7.2.6.5 其他常用操作

| **功能**          | **命令（yay）**                             |
| ----------------- | ------------------------------------------- |
| 查看已安装 AUR 包 | `yay -Qm`（`-Q` 列出已安装，`-m` 来自 AUR） |
| 查看包详细信息    | `yay -Qi 包名`（`-Qi` 显示本地包信息）      |
| 清理构建缓存      | `yay -Sc`（`-c` 清理，`-S` 无意义）         |
| 强制重建包        | `yay -S --rebuild 包名`                     |

import type { FeedEntry } from './app/types/feed'

const basicConfig = {
	title: 'WUSTACM',
	subtitle: '武汉科技大学 ACM 俱乐部',
	description: '武汉科技大学 ACM 俱乐部博客，记录程序设计训练、竞赛题解、算法笔记、社团文档与技术分享。',
	author: {
		name: 'WUSTACM',
		avatar: '/assets/wustacm-logo.png',
		email: '',
		homepage: 'https://github.com/WUSTACM',
	},
	copyright: {
		abbr: 'CC BY-NC-SA 4.0',
		name: '署名-非商业性使用-相同方式共享 4.0 国际',
		url: 'https://creativecommons.org/licenses/by-nc-sa/4.0/deed.zh-hans',
	},
	favicon: '/assets/wustacm-logo.png',
	language: 'zh-CN',
	timeEstablished: '2025-06-15',
	timeZone: 'Asia/Shanghai',
	url: 'https://blog.wustacm.org/',
	defaultCategory: '未分类',
}

// 存储 nuxt.config 和 app.config 共用的配置
// 此处为启动时需要的配置，启动后可变配置位于 app/app.config.ts
// @keep-sorted
const blogConfig = {
	...basicConfig,

	article: {
		categories: {
			[basicConfig.defaultCategory]: { icon: 'tabler:circle-dashed' },
			'WUST-OJ': { icon: 'tabler:terminal-2', color: '#4f7cff' },
			cpp: { icon: 'tabler:brand-cpp', color: '#4f7cff' },
			学科复习: { icon: 'tabler:school', color: '#d9901f' },
			技术分享: { icon: 'tabler:tool', color: '#248bd2' },
			技巧: { icon: 'tabler:bulb', color: '#22a66a' },
			算法: { icon: 'tabler:binary-tree', color: '#22a66a' },
			题解: { icon: 'tabler:trophy', color: '#d94b4b' },
			高数: { icon: 'tabler:function', color: '#8f55cc' },
			离散数学: { icon: 'tabler:chart-dots', color: '#8f55cc' },
		},
		/** 文章版式，首个为默认版式 */
		types: {
			tech: {},
			story: {},
		},
		/** 分类排序方式，键为排序字段，值为显示名称 */
		order: {
			date: '创建日期',
			updated: '更新日期',
			// title: '标题',
		},
		/** 使用 pnpm new 新建文章时自动生成自定义链接（permalink/abbrlink） */
		useRandomPremalink: false,
		/** 隐藏基于文件路由（不是自定义链接）的 URL /post 路径前缀 */
		hidePostPrefix: true,
		/** 禁止搜索引擎收录的路径 */
		robotsNotIndex: ['/preview', '/previews/*'],
	},

	/** 博客 Atom 订阅源 */
	feed: {
		/** 订阅源最大文章数量 */
		limit: 50,
		/** 订阅源是否启用XSLT样式 */
		enableStyle: true,
	},

	/** 向 <head> 中添加脚本 */
	scripts: [],

	twikoo: {
		envId: '',
		preload: '',
	},
}

/** 用于生成 OPML 和友链页面配置 */
export const myFeed: FeedEntry = {
	author: blogConfig.author.name,
	sitenick: 'WUSTACM',
	title: blogConfig.title,
	desc: blogConfig.subtitle || blogConfig.description,
	link: blogConfig.url,
	feed: new URL('/atom.xml', blogConfig.url).toString(),
	icon: blogConfig.favicon,
	avatar: blogConfig.author.avatar,
	archs: ['Nuxt', 'GitHub Pages'],
	date: blogConfig.timeEstablished,
	comment: '武汉科技大学 ACM 俱乐部博客。',
}

export default blogConfig

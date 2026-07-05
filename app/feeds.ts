import type { FeedGroup } from '../app/types/feed'
import { myFeed } from '../blog.config'

export default [
	{
		name: 'WUSTACM',
		desc: '武汉科技大学 ACM 俱乐部相关站点。',
		entries: [
			myFeed,
			{
				author: 'WUSTACM',
				sitenick: 'GitHub',
				title: 'WUSTACM GitHub Organization',
				desc: '武汉科技大学 ACM 俱乐部的 GitHub 组织主页。',
				link: 'https://github.com/WUSTACM',
				icon: '/assets/wustacm-logo.png',
				avatar: '/assets/wustacm-logo.png',
				archs: ['GitHub Pages'],
				date: '2025-06-15',
				comment: '代码仓库、文档和博客项目集中维护处。',
			},
		],
	},
] satisfies FeedGroup[]

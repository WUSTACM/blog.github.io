import { resolve } from 'node:path'
import { arch, env, version as nodeVersion, platform } from 'node:process'
import { pathToFileURL } from 'node:url'
import { name as ciName, CLOUDFLARE_PAGES, GITHUB_ACTIONS, NETLIFY } from 'ci-info'
import { mapValues } from 'es-toolkit/object'
import { pascalCase } from 'es-toolkit/string'
import { Temporal } from 'temporal-polyfill'
import blogConfig from './blog.config'
import packageJson from './package.json'
import redirectList from './redirects.json'

function pluginPath(path: string) {
	return pathToFileURL(resolve(`./remark-plugins/${path}.ts`)).href
}

function encodeContentPath(path: string) {
	try {
		return encodeURI(decodeURI(path))
	}
	catch {
		return encodeURI(path)
	}
}

// 此处配置无需修改
export default defineNuxtConfig({
	app: {
		head: {
			style: [
				{
					children: `
@media not (max-width: 528px) { .phone-only { display: none !important; } }
@media (max-width: 528px) { .phone-hidden { display: none !important; } }
@media not (max-width: 768px) { .mobile-only { display: none !important; } }
@media (max-width: 768px) { .mobile-hidden { display: none !important; } }
@media not (max-width: 1080px) { .widescreen-only { display: none !important; } }
@media (max-width: 1080px) { .widescreen-hidden { display: none !important; } }
.skip-link { position: fixed; top: -100%; width: 80%; margin: 1rem; padding: .5rem; text-align: center; z-index: 2147483647; }
.skip-link:focus { top: auto; }
#blog-root { display: flex; justify-content: center; gap: 1rem; min-width: 0; }
#content { display: flex; gap: 1rem; width: 1080px; min-width: 0; }
#content > #main-content { flex-grow: 1; min-width: 0; }
#blog-sidebar, #blog-aside { flex: 0 0 280px; position: sticky; top: 0; height: 100vh; height: 100dvh; min-width: 0; scrollbar-width: thin; }
#blog-sidebar { display: flex; flex-direction: column; color: var(--c-text-2); }
#blog-aside { display: flex; flex-direction: column; gap: 1rem; overflow: auto; padding: .5rem; z-index: var(--z-index-popover); }
#blog-aside:empty { display: none; }
.blog-header { contain: layout; display: flex; align-items: center; gap: .5em; position: relative; margin: clamp(1rem, 2rem, 5vh) 1rem min(1rem, 5vh); line-height: 1.4; color: var(--c-text); user-select: none; }
.blog-logo { height: 3em; }
.blog-logo.circle { width: 3em; border-radius: 50%; box-shadow: var(--box-shadow-1), var(--box-shadow-3); }
.emoji-tail { display: grid; grid-template-columns: repeat(auto-fit, minmax(0, 1fr)); align-content: center; justify-items: center; position: absolute; opacity: .2; inset: 0; font-size: 4rem; filter: blur(2px); pointer-events: none; z-index: -2; }
.sidebar-nav { flex-grow: 1; padding: 0 5%; font-size: .9em; }
.sidebar-nav h3 { margin: 2em 0 1em 1em; font: inherit; color: var(--c-text-2); }
.sidebar-nav li { margin: .5em 0; }
.sidebar-nav-item { display: flex; align-items: center; gap: .5em; padding: .5em 1em; border-radius: .5em; }
.sidebar-nav-item > .iconify { font-size: 1.5em; }
.sidebar-nav-item > .nav-text { flex-grow: 1; overflow: hidden; white-space: nowrap; text-overflow: ellipsis; }
.search-btn { opacity: .5; margin: 1rem 0; outline: 2px solid var(--c-border); outline-offset: -2px; cursor: text; user-select: none; }
.sidebar-footer { display: grid; gap: clamp(.5rem, 3vh, 1rem); padding: clamp(.5rem, 3vh, 1rem); font-size: .8em; text-align: center; color: var(--c-text-2); }
#blog-panel { contain: paint; position: fixed; inset-inline-end: min(1rem, 5%); bottom: min(2rem, 5%); border-radius: .5rem; background-color: var(--c-bg-a50); font-size: 1.4rem; z-index: var(--z-index-popover); }
@media (max-width: 768px) { #blog-sidebar { position: fixed; inset-inline-start: 0; width: 320px; max-width: 100%; background-color: var(--ld-bg-blur); color: currentcolor; transform: var(--transform-start-far); z-index: var(--z-index-popover); } #blog-sidebar.show { transform: none; } }
@media (max-width: 1080px) { #blog-aside { position: fixed; inset-inline-end: 0; top: 0; width: 320px; height: auto; max-width: 100%; max-height: 100%; transform: var(--transform-end-far); } #blog-aside.show { transform: none; } }
`.trim(),
				},
			],
			meta: [
				{ name: 'author', content: [blogConfig.author.name, blogConfig.author.email].filter(Boolean).join(', ') },
				{ name: 'color-scheme', content: 'light dark' },
				// 此处为元数据的生成器标识，不建议修改
				{ 'name': 'generator', 'content': `${pascalCase(packageJson.name)} ${packageJson.version}`, 'data-github-repo': packageJson.homepage },
				{ name: 'mobile-web-app-capable', content: 'yes' },
			],
			link: [
				{ rel: 'icon', href: blogConfig.favicon },
				{ rel: 'alternate', type: 'application/atom+xml', href: '/atom.xml' },
				...(blogConfig.twikoo.preload ? [{ rel: 'preconnect', href: blogConfig.twikoo.preload }] : []),
				{ rel: 'stylesheet', href: 'https://lib.baomitu.com/KaTeX/0.16.9/katex.min.css', media: 'print', onload: 'this.media="all"' },
				// "InterVariable", "Inter", "InterDisplay"
				{ rel: 'stylesheet', href: 'https://rsms.me/inter/inter.css', media: 'print', onload: 'this.media="all"' },
				// "JetBrains Mono", 思源宋体 "Noto Serif SC"
				{ rel: 'preconnect', href: 'https://fonts.gstatic.cn', crossorigin: '' },
				{ rel: 'stylesheet', href: 'https://fonts.googleapis.cn/css2?family=JetBrains+Mono:ital,wght@0,100..800;1,100..800&family=Noto+Serif+SC:wght@200..900&display=swap', media: 'print', onload: 'this.media="all"' },
				// 抖音美好体 "DOUYINSANSBOLD-GB"
				{ rel: 'stylesheet', href: 'https://fonts.bytedance.com/dfd/api/v1/css?family=DOUYINSANSBOLD-GB&display=swap', media: 'print', onload: 'this.media="all"' },
			],
			templateParams: {
				separator: '|',
			},
			titleTemplate: `%s %separator ${blogConfig.title}`,
			script: blogConfig.scripts,
		},
		rootAttrs: {
			id: 'blog-root',
		},
	},

	compatibilityDate: '2024-08-03',

	components: [
		{ path: '~/components/partial', prefix: 'Z' },
		'~/components',
	],

	css: [
		'@/assets/css/animation.scss',
		'@/assets/css/article.scss',
		'@/assets/css/color.scss',
		'@/assets/css/font.scss',
		'@/assets/css/main.scss',
		'@/assets/css/reusable.scss',
	],

	// @keep-sorted
	experimental: {
		extractAsyncDataHandlers: true,
		typescriptPlugin: true,
	},

	features: {
		inlineStyles: false,
	},

	nitro: {
		prerender: {
			// 修复部分平台会在文章路径后添加 `/`，导致闪现 404 错误
			// https://github.com/nuxt/content/issues/2378
			autoSubfolderIndex: CLOUDFLARE_PAGES || GITHUB_ACTIONS || NETLIFY ? false : undefined,
		},
	},

	// @keep-sorted
	routeRules: {
		...mapValues(redirectList, to => ({ redirect: { to, statusCode: 308 as const } })),
		'/api/stats': { prerender: true, headers: { 'Content-Type': 'application/json' } },
		'/atom.xml': { prerender: true, headers: { 'Content-Type': 'application/xml' } },
		'/favicon.ico': { redirect: { to: blogConfig.favicon } },
		'/subscriptions.opml': { prerender: true, headers: { 'Content-Type': 'application/xml' } },
	},

	runtimeConfig: {
		// @keep-sorted
		public: {
			arch,
			buildTime: Temporal.Now.zonedDateTimeISO().toString(),
			// EdgeOne 检测暂时不可用
			ci: env.TENCENTCLOUD_RUNENV === 'SCF' ? 'EdgeOne' : ciName || '',
			nodeVersion,
			platform,
		},
	},

	/** 在生产环境启用 sourcemap */
	// sourcemap: true,

	typescript: {
		nodeTsConfig: {
			// @keep-sorted
			include: [
				'../remark-plugins/**/*.ts',
				'../scripts/**/*.ts',
			],
		},
	},

	vite: {
		css: {
			preprocessorOptions: {
				scss: {
					additionalData: '@use "@/assets/css/_variable.scss" as *;',
				},
			},
		},
		define: {
			/** 在生产环境启用 Vue DevTools */
			// __VUE_PROD_DEVTOOLS__: 'true',
			/** 在生产环境启用 Vue 水合不匹配详情 */
			// __VUE_PROD_HYDRATION_MISMATCH_DETAILS__: 'true',
		},
		optimizeDeps: {
			// @keep-sorted
			include: ['@shikijs/colorized-brackets', '@shikijs/transformers', '@unhead/schema-org/vue', '@vue/devtools-core', '@vue/devtools-kit', 'embla-carousel-autoplay', 'embla-carousel-vue', 'embla-carousel-wheel-gestures', 'es-toolkit/array', 'es-toolkit/math', 'es-toolkit/object', 'es-toolkit/promise', 'es-toolkit/string', 'minisearch', 'parse-domain', 'plain-shiki', 'shiki/themes/catppuccin-latte.mjs', 'shiki/themes/one-dark-pro.mjs', 'temporal-polyfill', 'vue-tippy'],
		},
		server: {
			allowedHosts: true,
		},
	},

	// @keep-sorted
	modules: [
		'@bikariya/image-viewer',
		'@bikariya/modals',
		'@bikariya/shiki',
		'@nuxt/a11y',
		'@nuxt/content',
		'@nuxt/icon',
		'@nuxt/image',
		'@nuxtjs/color-mode',
		'@nuxtjs/seo',
		'@pinia/nuxt',
		'@vueuse/nuxt',
		'nuxt-llms',
		'unplugin-yaml/nuxt',
	],

	colorMode: {
		preference: 'dark',
		fallback: 'dark',
		classSuffix: '',
	},

	content: {
		build: {
			markdown: {
				highlight: false,
				// @keep-sorted
				remarkPlugins: {
					[pluginPath('remark-music')]: {},
					'remark-math': {},
					'remark-reading-time': {},
				},
				// @keep-sorted
				rehypePlugins: {
					[pluginPath('rehype-meta-slots')]: {},
					'rehype-katex': {},
				},
				toc: { depth: 4, searchDepth: 4 },
			},
		},
		experimental: {
			sqliteConnector: 'native',
		},
	},

	dxup: {
		features: {
			namedLayoutSlots: true,
		},
	},

	hooks: {
		'ready': () => {
			console.info(`
================================
${pascalCase(packageJson.name)} ${packageJson.version}
${packageJson.homepage}
================================
`)
		},
		'content:file:afterParse': (ctx) => {
			const { permalink, path } = ctx.content as Record<string, string | undefined>
			// 优先使用自定义链接（permalink/abbrlink），其次隐藏基于文件路由的 URL 中的 /posts 前缀
			if (permalink)
				ctx.content.path = encodeContentPath(permalink)
			else if (blogConfig.article.hidePostPrefix && path?.startsWith('/posts/'))
				ctx.content.path = encodeContentPath(path.slice('/posts'.length))
		},
	},

	icon: {
		customCollections: [
			{ prefix: 'zi', dir: './app/assets/icons' },
		],
		clientBundle: {
			scan: {
				globInclude: ['**\/*.{vue,jsx,tsx,ts,md,mdc,mdx}'],
			},
		},
	},

	image: {
		// 尽量以这些密度点对点显示
		densities: [1, 1.5, 2],
		format: ['avif', 'webp'],
		// Neylify 下 netlify 处理器无法显示站外图片，ipx 处理器无法显示站内图片，需彻底禁用
		// https://github.com/nuxt/image/issues/1353
		provider: NETLIFY ? 'none' : undefined,
	},

	linkChecker: {
		// @keep-sorted
		skipInspections: [
			'no-baseless',
			'no-non-ascii-chars',
			'no-uppercase-chars',
		],
	},

	llms: {
		domain: blogConfig.url,
		title: blogConfig.title,
		description: blogConfig.description,
		contentRawMarkdown: false,
	},

	ogImage: {
		enabled: false,
	},

	robots: {
		disableNuxtContentIntegration: true,
		disallow: blogConfig.article.robotsNotIndex,
	},

	site: {
		name: blogConfig.title,
		url: blogConfig.url,
		defaultLocale: blogConfig.language,
	},
})

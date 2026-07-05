export default defineNuxtPlugin(() => {
	// 开发环境禁用常见统计脚本
	if (import.meta.client && import.meta.dev) {
		localStorage.setItem('umami.disabled', 'true')
	}
})

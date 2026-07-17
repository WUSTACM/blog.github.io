<script setup lang="ts">
const { timeEstablished } = useAppConfig()

const blogLog = [
	{ label: '2026-07-05', value: '第三代：基于 Clarity 3.7.0 重构为 Nuxt 4 + Nuxt Content v3' },
	{ label: '2025-12-21', value: '第二代：迁移为 Hexo + NexT/Gemini' },
	{ label: timeEstablished, value: '第一代：基于 Hexo + Anzhiyu 搭建' },
]
</script>

<template>
<BlogWidget card title="更新日志">
	<ZDlGroup size="large" :items="blogLog" />
</BlogWidget>
</template>

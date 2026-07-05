<script setup lang="ts">
const { timeEstablished } = useAppConfig()

const blogLog = [
	{ label: '2026-07-05', value: '基于 Clarity 3.7.0 重构为 Nuxt 4 + Nuxt Content v3' },
	{ label: timeEstablished, value: 'WUSTACM 博客开始发布文章' },
]
</script>

<template>
<BlogWidget card title="更新日志">
	<ZDlGroup size="large" :items="blogLog" />
</BlogWidget>
</template>

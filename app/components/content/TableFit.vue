<template>
<div class="table-fit">
	<slot />
</div>
</template>

<style lang="scss" scoped>
.table-fit {
	width: 100%;
	min-width: 0;
}

:deep(.md-table) {
	width: 100%;
	max-width: 100%;
	overflow: hidden;
}

:deep(.md-table table),
:deep(.md-table table.scroll) {
	contain: none;
	display: table;
	width: 100%;
	table-layout: fixed;
	white-space: normal;
	word-break: normal;
	overflow-wrap: anywhere;
}

@media (max-width: 600px) {
	:deep(.md-table) {
		font-size: 0.75rem;
		line-height: 1.3;
	}

	:deep(.md-table th),
	:deep(.md-table td) {
		padding: 0.35em 0.4em;
	}
}
</style>
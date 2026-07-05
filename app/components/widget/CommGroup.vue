<template>
<BlogWidget
	card
	dim
	title="社群"
	bg-img="/assets/wustacm-logo.png"
	bg-right
>
	<div class="title text-creative">
		WUSTACM
	</div>

	<Tip copy icon :tip-options="{ placement: 'left' }">
		<Icon name="ri:qq-fill" />687179975
	</Tip>
</BlogWidget>
</template>

<style lang="scss" scoped>
.title {
	background-clip: text;
	background-image: linear-gradient(60deg, var(--c-accent) -30%, var(--c-primary), var(--c-text-1));
	background-position: 100% 0;
	background-size: 200%;
	font-size: 1.8em;
	color: transparent;
	transition: background-position 0.2s;

	.blog-widget:hover & {
		background-position: 0 0;
	}
}

.tip {
	font-size: 0.9em;
	line-height: 2;
}

:deep(.bg-img).bg-img.bg-img {
	opacity: 0.5;
}
</style>

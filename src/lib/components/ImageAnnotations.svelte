<script lang="ts">
	import type { ImageAnnotation } from './image-annotations';

	let { annotations, motion = '' }: { annotations: ImageAnnotation[]; motion?: string } = $props();
	const uid = $props.id();
	let active = $state<ImageAnnotation | null>(null);
	let anchor = $state<HTMLElement | null>(null);
	let tooltip = $state<HTMLElement | null>(null);
	let position = $state({ x: 0, y: 0 });
	const regions = $derived(
		annotations.filter(
			(a) =>
				[a.x, a.y, a.width, a.height].every(Number.isFinite) &&
				a.x >= 0 &&
				a.y >= 0 &&
				a.width > 0 &&
				a.height > 0 &&
				a.x + a.width <= 100 &&
				a.y + a.height <= 100
		)
	);
	const portal = (node: HTMLElement) => {
		document.body.appendChild(node);
		return { destroy: () => node.remove() };
	};
	function reposition() {
		if (!anchor || !tooltip) return;
		const rect = anchor.getBoundingClientRect();
		const gap = 8;
		const w = tooltip.offsetWidth;
		const h = tooltip.offsetHeight;
		position = {
			x: Math.max(gap, Math.min(rect.left + rect.width / 2 - w / 2, window.innerWidth - w - gap)),
			y: Math.max(
				gap,
				Math.min(
					rect.top >= h + gap * 2 ? rect.top - h - gap : rect.bottom + gap,
					window.innerHeight - h - gap
				)
			)
		};
	}
	function show(event: Event, region: ImageAnnotation) {
		anchor = event.currentTarget as HTMLElement;
		active = region;
	}
	function hide() {
		active = null;
		anchor = null;
	}
	$effect(() => {
		if (active && tooltip) reposition();
	});
	// Dismiss before the image starts moving so a tooltip never floats over the wrong region.
	$effect(() => {
		void motion;
		hide();
	});
</script>

<svelte:window
	onresize={hide}
	onscroll={hide}
	onkeydown={(event) => {
		if (event.key === 'Escape') hide();
	}}
/>
<div class="annotations">
	{#each regions as region (region.id)}
		<button
			type="button"
			class="annotation"
			style:left={`${region.x}%`}
			style:top={`${region.y}%`}
			style:width={`${region.width}%`}
			style:height={`${region.height}%`}
			aria-label={region.text}
			aria-describedby={active?.id === region.id ? `${uid}-tooltip` : undefined}
			onpointerenter={(event) => show(event, region)}
			onpointerleave={hide}
			onpointerdown={(event) => event.stopPropagation()}
			onfocus={(event) => show(event, region)}
			onblur={hide}
			onclick={(event) => {
				event.stopPropagation();
				show(event, region);
			}}
			onkeydown={(event) => {
				if (event.key === 'Enter' || event.key === ' ') event.stopPropagation();
				if (event.key === 'Escape' && active) {
					event.stopPropagation();
					hide();
				}
			}}
		></button>
	{/each}
</div>
{#if active}
	<div
		use:portal
		bind:this={tooltip}
		id={`${uid}-tooltip`}
		role="tooltip"
		class="annotation-tooltip"
		style:left={`${position.x}px`}
		style:top={`${position.y}px`}
	>
		{active.tooltip ?? active.text}
	</div>
{/if}

<style>
	.annotations {
		position: absolute;
		inset: 0;
		pointer-events: none;
	}
	.annotation {
		position: absolute;
		pointer-events: auto;
		box-sizing: border-box;
		padding: 0;
		border: 1px solid rgba(28, 32, 40, 0.2);
		border-radius: 4px;
		background: rgba(28, 32, 40, 0.15);
		cursor: help;
	}
	.annotation:hover,
	.annotation:focus-visible {
		background: rgba(28, 32, 40, 0.25);
		outline: 2px solid #93c5fd;
		outline-offset: 1px;
	}
	.annotation-tooltip {
		position: fixed;
		z-index: 100;
		box-sizing: border-box;
		max-width: min(320px, calc(100vw - 16px));
		max-height: calc(100vh - 16px);
		overflow: auto;
		padding: 8px 12px;
		border-radius: 6px;
		background: rgba(20, 24, 32, 0.96);
		color: white;
		font-size: 13px;
		line-height: 1.5;
		overflow-wrap: anywhere;
		pointer-events: none;
		box-shadow: 0 2px 12px rgba(0, 0, 0, 0.3);
	}
</style>

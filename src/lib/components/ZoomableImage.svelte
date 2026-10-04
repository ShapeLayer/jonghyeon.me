<script lang="ts">
	import ImageAnnotations from './ImageAnnotations.svelte';
	import type { ImageAnnotation } from './image-annotations';
	import { tick } from 'svelte';
	import { fade } from 'svelte/transition';
	import { m } from '$lib/paraglide/messages';

	interface Props {
		/** Regions in percentages of the source image; text and tooltip may use locale messages. */
		annotations?: ImageAnnotation[];
		src: string;
		alt: string;
		width?: number;
		height?: number;
		/** CSS width of the inline zoom trigger, such as `80%` or `24rem`. */
		displayWidth?: string;
		/** Shown above the zoom controls in the full-screen viewer; nothing is shown when empty. */
		caption?: string;
	}
	let { src, alt, width, height, displayWidth, caption, annotations = [] }: Props = $props();
	const uid = $props.id();
	const captionId = `${uid}-caption`;
	let hasCaption = $derived(!!caption?.trim());
	let bottomControlsHeight = $state(0);

	const zoomLevels = [0.5, 0.75, 1, 1.5, 2, 3, 4];
	const defaultZoomIndex = zoomLevels.indexOf(1);

	let isOpen = $state(false);
	let zoomIndex = $state(defaultZoomIndex);
	let scale = $derived(zoomLevels[zoomIndex]);
	let offset = $state({ x: 0, y: 0 });
	let drag = $state<{
		pointerId: number;
		startX: number;
		startY: number;
		originX: number;
		originY: number;
	} | null>(null);

	let triggerElement: HTMLButtonElement | null = $state(null);
	let closeButtonElement: HTMLButtonElement | null = $state(null);
	let viewerImageElement: HTMLImageElement | null = $state(null);
	let previousBodyOverflow = '';

	/** Moves the viewer under <body> so no ancestor's transform or overflow can clip the fixed overlay. */
	const portal = (node: HTMLElement) => {
		document.body.appendChild(node);
		return { destroy: () => node.remove() };
	};

	/** Keeps the zoomed image covering the screen instead of letting it be dragged out of view. */
	const clampOffset = (x: number, y: number, s: number) => {
		if (!viewerImageElement) return { x: 0, y: 0 };
		const maxX = Math.max(0, (viewerImageElement.offsetWidth * s - window.innerWidth) / 2);
		const maxY = Math.max(0, (viewerImageElement.offsetHeight * s - window.innerHeight) / 2);
		return {
			x: Math.min(maxX, Math.max(-maxX, x)),
			y: Math.min(maxY, Math.max(-maxY, y))
		};
	};

	const setZoomIndex = (nextIndex: number) => {
		const next = Math.min(zoomLevels.length - 1, Math.max(0, nextIndex));
		if (next === zoomIndex) return;
		const ratio = zoomLevels[next] / scale;
		// Scale the pan with the zoom so the point at the center of the screen stays there.
		offset = clampOffset(offset.x * ratio, offset.y * ratio, zoomLevels[next]);
		zoomIndex = next;
	};
	const zoomIn = () => setZoomIndex(zoomIndex + 1);
	const zoomOut = () => setZoomIndex(zoomIndex - 1);

	const open = async () => {
		zoomIndex = defaultZoomIndex;
		offset = { x: 0, y: 0 };
		isOpen = true;
		previousBodyOverflow = document.body.style.overflow;
		document.body.style.overflow = 'hidden';
		await tick();
		closeButtonElement?.focus();
	};
	const close = () => {
		if (!isOpen) return;
		isOpen = false;
		drag = null;
		document.body.style.overflow = previousBodyOverflow;
		triggerElement?.focus();
	};

	const onTriggerClick = (event: MouseEvent) => {
		// The image sits inside a clickable career item; keep that item's popup from opening too.
		event.stopPropagation();
		open();
	};
	const onTriggerKeyDown = (event: KeyboardEvent) => {
		if (event.key === 'Enter' || event.key === ' ') event.stopPropagation();
	};

	const onImagePointerDown = (event: PointerEvent) => {
		if (scale <= 1 || event.button !== 0) return;
		event.preventDefault();
		(event.currentTarget as HTMLElement).setPointerCapture(event.pointerId);
		drag = {
			pointerId: event.pointerId,
			startX: event.clientX,
			startY: event.clientY,
			originX: offset.x,
			originY: offset.y
		};
	};
	const onImagePointerMove = (event: PointerEvent) => {
		if (!drag || drag.pointerId !== event.pointerId) return;
		offset = clampOffset(
			drag.originX + event.clientX - drag.startX,
			drag.originY + event.clientY - drag.startY,
			scale
		);
	};
	const onImagePointerUp = (event: PointerEvent) => {
		if (drag?.pointerId === event.pointerId) drag = null;
	};

	const onStageClick = (event: MouseEvent) => {
		if (event.target === event.currentTarget) close();
	};

	const onWindowResize = () => {
		if (isOpen) offset = clampOffset(offset.x, offset.y, scale);
	};

	$effect(() => {
		if (!isOpen) return;
		// Capture phase on window runs before other window keydown listeners (e.g. Popup's Escape handler).
		const onKeyDown = (event: KeyboardEvent) => {
			if (event.key === 'Escape') {
				event.preventDefault();
				event.stopPropagation();
				close();
			} else if (event.key === '+' || event.key === '=') {
				event.preventDefault();
				zoomIn();
			} else if (event.key === '-') {
				event.preventDefault();
				zoomOut();
			}
		};
		window.addEventListener('keydown', onKeyDown, true);
		return () => window.removeEventListener('keydown', onKeyDown, true);
	});

	$effect(() => () => {
		if (isOpen) document.body.style.overflow = previousBodyOverflow;
	});
</script>

<svelte:window onresize={onWindowResize} />

<div class="inline-image" style:width={displayWidth}>
	<button
		bind:this={triggerElement}
		type="button"
		class="zoomable-image-trigger"
		aria-label={`${m.image_viewer_open()}: ${alt}`}
		onclick={onTriggerClick}
		onkeydown={onTriggerKeyDown}
	>
		<img {src} {alt} {width} {height} loading="lazy" />
	</button>
</div>

{#if isOpen}
	<div
		use:portal
		class="image-viewer"
		role="dialog"
		aria-modal="true"
		aria-label={alt}
		aria-describedby={hasCaption ? captionId : undefined}
		transition:fade={{ duration: 150 }}
	>
		<div class="image-viewer-dim"></div>
		<!-- svelte-ignore a11y_click_events_have_key_events, a11y_no_static_element_interactions -->
		<div
			class="image-viewer-stage"
			style:--bottom-controls-height={`${bottomControlsHeight}px`}
			style:padding-bottom={hasCaption
				? `calc(var(--viewer-edge-gap) + ${bottomControlsHeight}px)`
				: undefined}
			onclick={onStageClick}
		>
			<!-- svelte-ignore a11y_no_static_element_interactions -->
			<div
				class="image-viewer-surface"
				style:transform={`translate(${offset.x}px, ${offset.y}px) scale(${scale})`}
				onpointerdown={onImagePointerDown}
				onpointermove={onImagePointerMove}
				onpointerup={onImagePointerUp}
				onpointercancel={onImagePointerUp}
				class:dragging={drag !== null}
			>
				<img
					bind:this={viewerImageElement}
					{src}
					{alt}
					{width}
					{height}
					class="image-viewer-image"
					class:with-caption={hasCaption}
					class:pannable={scale > 1}
					class:dragging={drag !== null}
					draggable="false"
				/>
				<ImageAnnotations {annotations} motion={`${scale}:${offset.x}:${offset.y}`} />
			</div>
		</div>
		<button
			bind:this={closeButtonElement}
			type="button"
			class="image-viewer-close"
			aria-label={m.image_viewer_close()}
			onclick={close}
		>
			<span class="material-symbols-outlined" aria-hidden="true">close</span>
		</button>
		<div class="image-viewer-bottom" bind:offsetHeight={bottomControlsHeight}>
			{#if hasCaption}
				<p id={captionId} class="image-viewer-caption">{caption}</p>
			{/if}
			<div class="image-viewer-toolbar">
				<button
					type="button"
					aria-label={m.image_viewer_zoom_out()}
					disabled={zoomIndex === 0}
					onclick={zoomOut}
				>
					<span class="material-symbols-outlined" aria-hidden="true">remove</span>
				</button>
				<span class="image-viewer-zoom-level" aria-live="polite">{Math.round(scale * 100)}%</span>
				<button
					type="button"
					aria-label={m.image_viewer_zoom_in()}
					disabled={zoomIndex === zoomLevels.length - 1}
					onclick={zoomIn}
				>
					<span class="material-symbols-outlined" aria-hidden="true">add</span>
				</button>
			</div>
		</div>
	</div>
{/if}

<style>
	.inline-image {
		position: relative;
	}
	.image-viewer-surface {
		position: relative;
		line-height: 0;
		transition: transform 0.15s ease-out;
	}
	.image-viewer-surface.dragging {
		transition: none;
	}
	.zoomable-image-trigger {
		width: 100%;
		display: block;
		padding: 0;
		margin: 0;
		border: none;
		background: none;
		cursor: zoom-in;
		min-width: 0;
	}
	.zoomable-image-trigger img {
		display: block;
		width: 100%;
		height: auto;
	}

	.image-viewer {
		position: fixed;
		inset: 0;
		z-index: 20;
	}
	.image-viewer-dim {
		position: absolute;
		inset: 0;
		background-color: rgba(0, 0, 0, 0.75);
	}
	.image-viewer-stage {
		position: absolute;
		inset: 0;
		display: flex;
		align-items: center;
		justify-content: center;
		overflow: hidden;
		box-sizing: border-box;
		touch-action: none;
		cursor: zoom-out;
	}
	.image-viewer-image {
		display: block;
		max-width: calc(100vw - 2em);
		max-height: calc(100vh - 6em);
		width: auto;
		height: auto;
		object-fit: contain;
		transform-origin: center;
		transition: transform 0.15s ease-out;
		user-select: none;
		cursor: default;
	}
	/* The stage is padded above the caption and controls, so the image is centered in the space left. */
	.image-viewer-image.with-caption {
		max-height: calc(100vh - 7em - var(--bottom-controls-height, 0px));
	}
	.image-viewer-image.pannable {
		cursor: grab;
	}
	.image-viewer-image.dragging {
		cursor: grabbing;
		transition: none;
	}

	.image-viewer {
		--viewer-icon-size: 14px;
		--viewer-button-padding: 4px;
		--viewer-edge-gap: 12px;
		--viewer-radius: 6px;
		--viewer-zoom-font-size: 11px;
		--viewer-caption-font-size: 12px;
	}
	/* Touch screens need larger targets than a mouse pointer. */
	@media (max-width: 600px), (pointer: coarse) {
		.image-viewer {
			--viewer-icon-size: 22px;
			--viewer-button-padding: 8px;
			--viewer-edge-gap: 12px;
			--viewer-radius: 8px;
			--viewer-zoom-font-size: 15px;
			--viewer-caption-font-size: 14px;
		}
	}

	.image-viewer button {
		display: flex;
		align-items: center;
		justify-content: center;
		padding: var(--viewer-button-padding);
		margin: 0;
		border: none;
		background: none;
		color: white;
		cursor: pointer;
	}
	.image-viewer button:disabled {
		opacity: 0.35;
		cursor: default;
	}
	.image-viewer .material-symbols-outlined {
		font-size: var(--viewer-icon-size);
	}
	.image-viewer-close {
		position: absolute;
		top: var(--viewer-edge-gap);
		right: var(--viewer-edge-gap);
	}
	.image-viewer-bottom {
		position: absolute;
		bottom: var(--viewer-edge-gap);
		left: var(--viewer-edge-gap);
		right: var(--viewer-edge-gap);
		display: flex;
		flex-direction: column;
		align-items: center;
		gap: 6px;
		/* The empty space around the controls still reaches the stage, so clicking it closes the viewer. */
		pointer-events: none;
	}
	.image-viewer-bottom > * {
		pointer-events: auto;
	}
	.image-viewer-caption {
		max-width: min(640px, 100%);
		margin: 0;
		padding: calc(var(--viewer-button-padding) * 1.25) calc(var(--viewer-button-padding) * 2.5);
		background-color: rgba(72, 72, 72, 0.92);
		border-radius: var(--viewer-radius);
		color: white;
		font-size: var(--viewer-caption-font-size);
		line-height: 1.45;
		text-align: center;
		word-break: keep-all;
		overflow-wrap: break-word;
	}
	.image-viewer-toolbar {
		display: flex;
		align-items: center;
		padding: 0 calc(var(--viewer-button-padding) * 1.5);
		background-color: rgba(72, 72, 72, 0.92);
		border-radius: var(--viewer-radius);
	}
	.image-viewer-zoom-level {
		min-width: 3.2em;
		text-align: center;
		font-size: var(--viewer-zoom-font-size);
		color: rgba(255, 255, 255, 0.6);
		font-variant-numeric: tabular-nums;
	}
</style>

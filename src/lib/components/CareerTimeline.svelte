<script lang="ts">
	import { getContext, onMount } from 'svelte';
	import { m } from '$lib/paraglide/messages';
	import { layoutTimeline, timelineItems, type TimelineItem } from '$lib/models/timeline';

	let {
		items = timelineItems,
		highlightedItemIds = []
	}: {
		items?: TimelineItem[];
		/** Additional highlights, including diagnostics or future selection modes. */
		highlightedItemIds?: string[];
	} = $props();
	let timelineElement: HTMLDivElement | null = $state(null);
	const navigation = getContext<{ navigate: (id: string) => Promise<void> }>(
		'career-item-navigation'
	);
	let selectedId = $state<string | null>(null);
	let hoveredId = $state<string | null>(null);
	let focusedId = $state<string | null>(null);
	let hoveredDate = $state<string | null>(null);
	let focusedDate = $state<string | null>(null);
	const now = new Date();
	const currentMonth = `${now.getFullYear()}.${String(now.getMonth() + 1).padStart(2, '0')}`;
	const layout = $derived(layoutTimeline(items, currentMonth));
	const activeColor = $derived(
		items.find((item) => item.id === (hoveredId ?? focusedId ?? selectedId))?.color
	);
	const activeDate = $derived(hoveredDate ?? focusedDate);
	const dateItemIds = $derived(
		new Set(
			items
				.filter(
					(item) =>
						activeDate !== null &&
						item.start <= activeDate &&
						(item.end ?? currentMonth) >= activeDate
				)
				.map((item) => item.id)
		)
	);
	const isActive = (item: TimelineItem) =>
		dateItemIds.has(item.id) || highlightedItemIds.includes(item.id) || item.color === activeColor;
	const activeItemIds = $derived(items.filter(isActive).map((item) => item.id));
	let floatingFrame = 0;
	function updateFloatingEntries() {
		if (!timelineElement) return;
		const header = timelineElement.closest('.careers')?.querySelector('.careers-header');
		const top = Math.max(0, header?.getBoundingClientRect().bottom ?? 0);
		const entries = [...timelineElement.querySelectorAll<HTMLElement>('.entry')];
		for (const entry of entries) {
			entry.style.transform = '';
			entry.removeAttribute('data-floating');
		}
		if (
			activeItemIds.length < 2 ||
			top >= window.innerHeight ||
			timelineElement.getBoundingClientRect().bottom <= top
		)
			return;
		const active = new Set(activeItemIds);
		const floating = entries
			.filter((entry) => active.has(entry.dataset.timelineId ?? ''))
			.map((entry) => ({
				entry,
				bounds: entry.getBoundingClientRect(),
				container: entry.parentElement!.getBoundingClientRect()
			}))
			.filter(({ bounds, container }) => bounds.top < top && container.bottom > top)
			.sort((a, b) => a.bounds.top - b.bounds.top);
		let nextTop = top;
		for (const { entry, bounds } of floating) {
			entry.style.transform = `translateY(${nextTop - bounds.top}px)`;
			entry.dataset.floating = 'true';
			nextTop += bounds.height;
		}
	}
	function scheduleFloatingEntries() {
		cancelAnimationFrame(floatingFrame);
		floatingFrame = requestAnimationFrame(updateFloatingEntries);
	}
	$effect(() => {
		void activeItemIds;
		void timelineElement;
		scheduleFloatingEntries();
	});
	onMount(() => {
		const observer = new ResizeObserver(scheduleFloatingEntries);
		if (timelineElement) {
			observer.observe(timelineElement);
			const header = timelineElement.closest('.careers')?.querySelector('.careers-header');
			if (header) observer.observe(header);
		}
		window.addEventListener('scroll', scheduleFloatingEntries, { passive: true, capture: true });
		window.addEventListener('resize', scheduleFloatingEntries);
		return () => {
			observer.disconnect();
			window.removeEventListener('scroll', scheduleFloatingEntries, true);
			window.removeEventListener('resize', scheduleFloatingEntries);
			cancelAnimationFrame(floatingFrame);
		};
	});
	function onTimelinePointerMove(event: PointerEvent) {
		if (event.pointerType === 'touch') return;
		const hits = document.elementsFromPoint(event.clientX, event.clientY);
		// A raised tail must not hide the main boxes underneath it from hover detection.
		const main = hits.find((element) => element.matches('.select-entry'));
		const tail = hits.find((element) => element.matches('.duration-band'));
		hoveredId =
			main?.closest<HTMLElement>('[data-timeline-id]')?.dataset.timelineId ??
			(tail as HTMLElement | undefined)?.dataset.durationId ??
			null;
	}
	function separateDateLabels(element: HTMLElement) {
		let frame = 0;
		const arrange = () => {
			cancelAnimationFrame(frame);
			frame = requestAnimationFrame(() => {
				const labels = [...element.querySelectorAll<HTMLElement>('.date span')];
				for (const label of labels) label.style.transform = '';
				let previousBottom = -Infinity;
				for (const label of labels) {
					const bounds = label.getBoundingClientRect();
					const offset = Math.max(0, previousBottom + 3 - bounds.top);
					label.style.transform = `translateY(${offset}px)`;
					previousBottom = bounds.bottom + offset;
				}
			});
		};
		const observer = new ResizeObserver(arrange);
		observer.observe(element);
		arrange();
		return {
			destroy() {
				observer.disconnect();
				cancelAnimationFrame(frame);
			}
		};
	}
	function activate(item: TimelineItem) {
		selectedId = item.id;
		if (item.opensItemId) void navigation.navigate(item.opensItemId);
	}
	function resetOnBackground(event: MouseEvent) {
		if (event.target instanceof Element && event.target.closest('.duration-band, .select-entry'))
			return;
		selectedId = null;
		hoveredId = null;
		focusedId = null;
	}
</script>

<svelte:window
	onclick={resetOnBackground}
	onpointermove={onTimelinePointerMove}
	onblur={() => (hoveredId = null)}
/>

<div
	bind:this={timelineElement}
	class="timeline"
	use:separateDateLabels
	style:--line-color={activeColor ?? '#636363'}
>
	{#each layout.bands as band (band.item.id)}
		<div
			class="timeline-item"
			class:active={isActive(band.item)}
			style:--item-color={band.item.color}
			style:--depth={band.depth}
			style:grid-row={`${band.firstRow} / ${band.lastRow}`}
		>
			<button
				type="button"
				tabindex="-1"
				aria-hidden="true"
				onclick={() => activate(band.item)}
				class="duration-band"
				class:active={isActive(band.item)}
				style:--item-color={band.item.color}
				style:--depth={band.depth}
				data-duration-id={band.item.id}
			></button>
			<div
				class="entry"
				class:active={isActive(band.item)}
				style:--item-color={band.item.color}
				data-timeline-id={band.item.id}
			>
				<button
					type="button"
					class="select-entry"
					aria-pressed={band.item.opensItemId ? undefined : selectedId === band.item.id}
					onfocus={() => (focusedId = band.item.id)}
					onblur={() => (focusedId = null)}
					onclick={() => activate(band.item)}
				>
					<span class="title"><span class="text-ink">{band.item.title()}</span></span>
					<span class="metadata">
						<span class="period"
							><span class="text-ink">{band.item.start} - {band.item.end ?? ''}</span></span
						>
						{#if band.item.subtitle}<span class="subtitle"
								><span class="text-ink">/ {band.item.subtitle()}</span></span
							>{/if}
					</span>
				</button>
			</div>
		</div>
	{/each}
	{#each layout.rows as row, index (row.date)}
		<button
			class="date"
			type="button"
			style:grid-row={index + 1}
			class:active={activeDate === row.date}
			class:compact-boundary={row.items.length === 0 && row.months <= 1}
			onmouseenter={() => (hoveredDate = row.date)}
			onmouseleave={() => (hoveredDate = null)}
			onfocus={() => (focusedDate = row.date)}
			onblur={() => (focusedDate = null)}
		>
			<span>{row.date === currentMonth ? m.timeline_ongoing() : row.date}</span>
		</button>
		<div class="entries" style:grid-row={index + 1} style:min-height={`${row.spacingRem}rem`}></div>
	{/each}
</div>

<style>
	.timeline {
		--date-width: 6rem;
		--lane-step: 0.85rem;
		--period-line-gap: 6px;
		--highlight-color-strength: 23%;
		--highlight-tail-opacity: 85%;
		isolation: isolate;
		position: relative;
		display: grid;
		grid-template-columns: var(--date-width) minmax(0, 1fr);
		margin: 0 1em;
		text-align: left;
	}
	.timeline::before {
		content: '';
		position: absolute;
		top: 0;
		bottom: 0;
		left: var(--date-width);
		width: 3px;
		background: var(--line-color);
		transition: background-color 160ms ease;
	}

	.timeline-item {
		--text-strength: 72%;
		grid-column: 2;
		display: grid;
		grid-template-rows: subgrid;
		position: relative;
		margin-left: calc(3px + var(--depth) * var(--lane-step));
		pointer-events: none;
	}
	.timeline-item.active {
		--text-strength: 100%;
		--item-surface: color-mix(
			in srgb,
			var(--item-color) var(--highlight-color-strength),
			var(--base-bg-color)
		);
	}
	.duration-band {
		position: absolute;
		inset: 0;
		background: var(--base-bg-color);
		border-radius: 0 3px 3px 0;
		padding: 0;
		pointer-events: auto;
		z-index: 0;
	}
	.duration-band::before {
		content: '';
		position: absolute;
		top: calc(var(--period-line-gap) / 2);
		bottom: calc(var(--period-line-gap) / 2);
		left: 0;
		width: 3px;
		background: var(--item-color);
	}
	.timeline-item.active .duration-band {
		z-index: 2;
		/* Keep the highlight's tint fixed; adjust only how much of the layer below shows. */
		background: color-mix(in srgb, var(--item-surface) var(--highlight-tail-opacity), transparent);
	}

	.date {
		align-self: start;
		grid-column: 1;
		padding: 0.5rem 0.6rem 0 0;
		font-size: 0.8em;
		color: var(--base-fg-color-brighter);
		font-variant-numeric: tabular-nums;
	}
	.date.compact-boundary {
		position: relative;
		height: 0;
		min-height: 0;
		padding: 0;
	}
	.date.compact-boundary span {
		position: absolute;
		bottom: 0;
		left: 0;
		line-height: 1.3;
		white-space: nowrap;
		padding-bottom: 0.15rem;
	}
	.date.active {
		color: var(--base-fg-color);
	}
	.date:focus-visible {
		outline-color: var(--base-fg-color);
	}
	.entries {
		display: grid;
		grid-template-columns: repeat(auto-fit, minmax(min(100%, 15rem), 1fr));
		grid-column: 2;
		align-items: start;
		position: relative;
		pointer-events: none;
		gap: 0.3rem;
		padding-left: calc(6px + var(--depth) * var(--lane-step));
		min-width: 0;
	}
	.entry {
		grid-row: 1;
		align-self: start;
		border-left: 3px solid var(--item-color);
		background: var(--base-bg-color);
		min-width: 0;
		position: relative;
		z-index: 1;
		pointer-events: auto;
	}
	.timeline-item.active .entry {
		z-index: 3;
	}
	.timeline-item .entry:global([data-floating]) {
		z-index: 4;
		box-shadow: 0 2px 4px #00000010;
	}
	.text-ink {
		background: var(--base-bg-color);
		box-decoration-break: clone;
		-webkit-box-decoration-break: clone;
		padding: 0.08em 0.12em;
	}

	.timeline-item.active .entry,
	.timeline-item.active .text-ink {
		background: var(--item-surface);
	}

	button {
		color: inherit;
		font: inherit;
		background: transparent;
		border: 0;
		cursor: pointer;
		text-align: left;
	}
	button:focus-visible {
		outline: 2px solid var(--item-color);
		outline-offset: 2px;
	}
	.select-entry {
		color: color-mix(in srgb, var(--base-fg-color) var(--text-strength), var(--base-bg-color));
		display: flex;
		flex-direction: column;
		gap: 0.15rem;
		width: 100%;
		padding: 0.45rem 0.6rem;
		overflow-wrap: anywhere;
	}
	.title {
		font-size: 0.9em;
		font-weight: 400;
		line-height: 1.5;
	}
	.date,
	.metadata {
		display: flex;
		flex-wrap: wrap;
		align-items: baseline;
		gap: 0.1rem 0.8rem;
	}
	.period {
		font-family:
			ui-monospace, SFMono-Regular, Menlo, Monaco, Consolas, 'Liberation Mono', monospace;
	}
	.period {
		font-size: 0.7em;
		font-variant-numeric: tabular-nums;
		white-space: nowrap;
	}
	.subtitle {
		font-size: 0.75em;
		color: color-mix(
			in srgb,
			var(--base-fg-color-brighter) var(--text-strength),
			var(--base-bg-color)
		);
	}
	@media (max-width: 600px) {
		.timeline {
			--date-width: 4.5rem;
			--lane-step: 0.65rem;
			margin: 0 0.5em;
		}
		.date {
			padding-right: 0.5rem;
			font-size: 0.7em;
		}
	}
	@media (prefers-reduced-motion: reduce) {
		.timeline::before {
			transition: none;
		}
	}
</style>

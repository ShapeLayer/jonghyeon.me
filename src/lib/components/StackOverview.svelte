<script lang="ts">
	import { getContext, onMount, tick } from 'svelte';
	import ExternalLink from '$lib/components/ExternalLink.svelte';
	import Popup from '$lib/components/Popup.svelte';
	import CareerItemDetailContent from '$lib/components/CareerItemDetailContent.svelte';
	import { m } from '$lib/paraglide/messages';
	import {
		layoutStackTreemap,
		softenStackColor,
		getStackShares,
		getStackReferences
	} from '$lib/models/stacks';

	const stacks = getStackShares().map((stack) => ({
		...stack,
		color: softenStackColor(stack.color)
	}));
	let portrait = $state(false);
	const columns = $derived(portrait ? 10 : 28);
	const rows = $derived(portrait ? 28 : 10);
	const regions = $derived(layoutStackTreemap(stacks, columns, rows));
	const tiles = $derived(
		regions.flatMap((region) =>
			Array.from({ length: region.width * region.height }, (_, index) => ({
				stack: region.stack,
				x: region.x + (index % region.width),
				y: region.y + Math.floor(index / region.width)
			}))
		)
	);
	onMount(() => {
		const query = window.matchMedia('(orientation: portrait)');
		const update = () => {
			portrait = query.matches;
		};
		update();
		query.addEventListener('change', update);
		return () => query.removeEventListener('change', update);
	});
	let hovered = $state<string | null>(null);
	let promotedStack = $state<string | null>(null);
	let selected = $state<(typeof stacks)[number] | null>(null);
	let popup: Popup | null = $state(null);
	const itemNavigation = getContext<{ navigate: (id: string) => Promise<void> }>(
		'career-item-navigation'
	);
	let navigating = false;
	async function openInner(ref: string) {
		if (navigating) return;
		navigating = true;
		try {
			await popup?.closeAndWait();
			await itemNavigation.navigate(ref);
		} finally {
			navigating = false;
		}
	}
	let tooltip = $state<{ name: string; x: number; y: number } | null>(null);
	const ordered = $derived(
		[...stacks].sort((a, b) => Number(b.id === promotedStack) - Number(a.id === promotedStack))
	);
	const percent = (share: number) => `${(share * 100).toFixed(1)}%`;
	function highlight(event: MouseEvent | FocusEvent, stack: (typeof stacks)[number]) {
		hovered = stack.id;
		promotedStack = stack.id;
		const bounds = (event.currentTarget as HTMLElement).getBoundingClientRect();
		tooltip = {
			name: stack.name,
			x: Math.max(60, Math.min(window.innerWidth - 60, bounds.left + bounds.width / 2)),
			y: bounds.top - 8
		};
	}
	function clear() {
		hovered = null;
		promotedStack = null;
		tooltip = null;
	}
	async function open(stack: (typeof stacks)[number]) {
		selected = stack;
		clear();
		await tick();
		popup?.open();
	}
</script>

<div class="stack-overview">
	<div
		class="tiles"
		style:--columns={columns}
		style:--rows={rows}
		aria-label={m.career_tab_stack()}
	>
		{#each tiles as tile, index (index)}
			{@const stack = tile.stack}
			<button
				type="button"
				class="tile"
				style:grid-column={tile.x + 1}
				style:grid-row={tile.y + 1}
				class:muted={hovered !== null && hovered !== stack.id}
				style:--tile-color={stack.color}
				aria-label={`${stack.name} ${m.stack_occurrences({ count: stack.projects.length })}`}
				onmouseenter={(event) => highlight(event, stack)}
				onmouseleave={clear}
				onfocus={(event) => highlight(event, stack)}
				onblur={clear}
				onclick={() => open(stack)}
			></button>
		{/each}
	</div>
	<p class="basis">{m.stack_basis()}</p>
	<div class="histograms">
		{#each ordered as stack (stack.id)}
			<button
				type="button"
				class="histogram"
				class:muted={hovered !== null && hovered !== stack.id}
				onmouseenter={() => (hovered = stack.id)}
				onmouseleave={clear}
				onfocus={() => (hovered = stack.id)}
				onblur={clear}
				onclick={() => open(stack)}
			>
				<span class="stack-name">{stack.name}</span>
				<span class="track"
					><span class="bar" style:width={percent(stack.share)} style:background={stack.color}
					></span></span
				>
				<span class="share">{stack.projects.length}</span>
			</button>
		{/each}
	</div>
</div>
{#if tooltip}
	<div
		class="stack-tooltip"
		role="tooltip"
		style:left={`${tooltip.x}px`}
		style:top={`${tooltip.y}px`}
	>
		{tooltip.name}
	</div>
{/if}
<Popup bind:this={popup}>
	{#if selected}
		<CareerItemDetailContent title={selected.name}>
			<ul class="project-list">
				{#each selected.projects as project (project.id)}
					{@const references = getStackReferences(project)}
					<li class="project-entry">
						<span class="project-title">{project.title()}</span>
						{#if project.description}<div class="project-description">
								{project.description()}
							</div>{/if}
						<ul class="project-references">
							{#each references as reference, index (`${reference.refType}:${reference.ref}`)}
								<li>
									<span class="reference-marker" aria-hidden="true">
										{#if reference.refType === 'external'}<span class="material-symbols-outlined"
												>open_in_new</span
											>{:else}→{/if}
									</span>
									{#if reference.refType === 'external'}
										<ExternalLink href={reference.ref} showIcon={false}
											>{m.career_detail_tooltip()}{references.length > 1
												? ` #${index + 1}`
												: ''}</ExternalLink
										>
									{:else}
										<button
											class="reference-link"
											type="button"
											onclick={() => openInner(reference.ref)}
											>{m.career_detail_tooltip()}{references.length > 1
												? ` #${index + 1}`
												: ''}</button
										>
									{/if}
								</li>
							{/each}
						</ul>
						<div class="project-stacks">
							{#each [...new Set(project.stacks)] as stackId (stackId)}
								{@const projectStack = stacks.find((stack) => stack.id === stackId)}
								{#if projectStack}
									<button class="stack-trigger" type="button" onclick={() => open(projectStack)}
										>{projectStack.name.replace(/\s+/g, '')}</button
									>
								{/if}
							{/each}
						</div>
					</li>
				{/each}
			</ul>
		</CareerItemDetailContent>
	{/if}
</Popup>

<style>
	.stack-overview {
		padding: 0 2em;
		max-width: 900px;
		text-align: left;
	}
	.tiles {
		display: grid;
		position: relative;
		grid-template-columns: repeat(var(--columns), minmax(0, 1fr));
		grid-template-rows: repeat(var(--rows), minmax(0, 1fr));
		aspect-ratio: var(--columns) / var(--rows);
		gap: 2px;
	}
	.tile {
		aspect-ratio: 1;
		box-sizing: border-box;
		background: color-mix(in srgb, var(--tile-color) 45%, transparent);
		border: 1px solid color-mix(in srgb, var(--tile-color) 55%, transparent);
		border-radius: 3px;
		padding: 0;
		cursor: pointer;
		transition: opacity 0.15s;
	}
	.tile:focus-visible {
		outline: none;
	}
	.muted {
		opacity: 0.25;
	}
	.basis {
		color: #777;
		font-size: 0.8rem;
		margin: 1rem 0;
	}
	.histograms {
		display: flex;
		flex-direction: column;
		gap: 0.35rem;
	}
	.histogram {
		display: flex;
		align-items: center;
		gap: 1rem;
		border: 0;
		background: transparent;
		padding: 0.4rem 0;
		color: inherit;
		font: inherit;
		text-align: left;
		cursor: pointer;
		transition: opacity 0.15s;
	}
	.stack-name {
		width: 7rem;
		flex-shrink: 0;
		font-size: 0.9rem;
	}
	.track {
		flex: 1;
	}
	.bar {
		display: block;
		height: 9px;
		border-radius: 2px;
	}
	.share {
		min-width: 4rem;
		flex-shrink: 0;
		white-space: nowrap;
		text-align: right;
		font-size: 0.85rem;
		font-variant-numeric: tabular-nums;
	}
	.stack-tooltip {
		position: fixed;
		transform: translate(-50%, -100%);
		background: #222;
		color: white;
		padding: 0.35rem 0.6rem;
		border-radius: 4px;
		font-size: 0.8rem;
		pointer-events: none;
		z-index: 20;
	}
	:where(.reference-link) {
		font: inherit;
		text-align: left;
		padding: 0;
		background: transparent;
		border: 0;
		cursor: pointer;
	}
	.project-list {
		margin: 0;
		padding-left: 1.2em;
	}
	.project-list > li:first-child {
		margin-top: 0;
	}
	.project-list > li {
		margin: 1.5em 0;
	}
	.project-entry {
		list-style-type: '»';
		margin: 1em 0;
		line-height: 1.5;
	}
	.project-entry::marker {
		font-weight: 400;
	}
	.project-description {
		font-size: 0.9em;
		color: var(--base-fg-color-brighter);
		margin-top: 0.4em;
	}
	.project-title {
		vertical-align: baseline;
	}
	.stack-trigger {
		font: inherit;
		color: #777;
		padding: 0;
		border: 0;
		background: transparent;
		text-decoration: none;
		cursor: pointer;
	}
	.stack-trigger:focus-visible {
		outline: 1px solid #777;
		outline-offset: 3px;
	}
	.project-stacks {
		display: flex;
		flex-wrap: wrap;
		gap: 0.25em 0.8em;
		margin-top: 0.1em;
		font-family:
			ui-monospace, SFMono-Regular, Menlo, Monaco, Consolas, 'Liberation Mono', monospace;
		font-size: 0.8em;
	}
	.project-references {
		padding-left: 0em;
	}
	.project-references li {
		display: flex;
		align-items: center;
		gap: 0.4em;
		list-style: none;
		padding-left: 0;
	}
	.reference-marker {
		display: inline-flex;
		align-items: center;
		justify-content: center;
		font-size: 0.8em;
		flex: 0 0 1em;
		text-align: center;
	}
	.reference-marker .material-symbols-outlined {
		font-size: 1em;
		vertical-align: middle;
	}
	@media (orientation: portrait) {
		.tiles {
			max-width: 360px;
			margin: 0 auto;
		}
	}
	@media (prefers-reduced-motion: reduce) {
		.tile,
		.histogram {
			transition: none;
		}
	}
</style>

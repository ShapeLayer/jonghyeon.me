import { m } from '$lib/paraglide/messages';

export type TimelineItem = {
	id: string;
	title: () => string;
	start: string;
	/** An omitted end means the activity is ongoing. Dates use YYYY.MM. */
	end?: string;
	subtitle?: () => string;
	color: string;
	/** Preferred horizontal position, counted from one. */
	lane?: number;
	/** Enables navigation through the same detail/highlight flow as stack references. */
	opensItemId?: string;
};

/** Increase to spread the palette further apart while retaining its colour families. */
export const timelineColorVariation = 1.4;

function varyTimelineColor(color: string): string {
	const anchor = [120, 128, 145];
	const channels = anchor.map((center, index) => {
		const channel = Number.parseInt(color.slice(1 + index * 2, 3 + index * 2), 16);
		return Math.round(
			Math.max(0, Math.min(255, center + (channel - center) * timelineColorVariation))
		)
			.toString(16)
			.padStart(2, '0');
	});
	return `#${channels.join('')}`;
}

export const timelineItems: TimelineItem[] = [
	{
		id: 'computer-engineering',
		title: () => m.timeline_title_degree(),
		start: '2021.03',
		subtitle: () => m.timeline_subtitle_university(),
		color: '#527cb0',
		opensItemId: 'edu-bachelor-chonnam-natl-univ-ce'
	},
	{
		id: 'disaster-nursing',
		title: () => m.detail_ktas_title(),
		start: '2025.09',
		end: '2026.09',
		subtitle: () => m.timeline_subtitle_nursing(),
		color: '#568c9f',
		opensItemId: 'project-ktas-trainer'
	},
	{
		id: 'sign-language',
		title: () => m.career_title_project_sign_language_client(),
		start: '2021.10',
		end: '2022.06',
		subtitle: () => m.timeline_subtitle_lab(),
		color: '#6387a5',
		opensItemId: 'project-sign-language-client'
	},
	{
		id: 'game-development-club',
		lane: 2,
		subtitle: () => m.timeline_subtitle_university(),
		title: () => m.timeline_title_club(),
		start: '2021.03',
		end: '2026.07',
		color: '#6685b2',
		opensItemId: 'activity-cnu-club-pimm'
	},
	{
		id: 'saga',
		title: () => m.timeline_title_saga(),
		start: '2025.10',
		end: '2026.03',
		color: '#597ead',
		opensItemId: 'edu-bachelor-exchange-saga',
		subtitle: () => m.timeline_subtitle_saga()
	},
	{
		id: 'army',
		title: () => m.timeline_title_army(),
		start: '2022.07',
		end: '2024.01',
		color: '#7a8d84',
		opensItemId: 'work-roka',
		subtitle: () => m.timeline_subtitle_army(),
		lane: 3
	},
	{
		id: 'pimm-president',
		title: () => m.timeline_title_president(),
		start: '2024.01',
		end: '2025.01',
		color: '#607dad',
		opensItemId: 'activity-cnu-club-pimm',
		lane: 3
	},
	{
		id: 'pimm23',
		title: () => m.timeline_title_pimm23(),
		start: '2023.06',
		end: '2023.09',
		color: '#8a789e',
		opensItemId: 'algorithm-contest-operations',
		subtitle: () => m.timeline_subtitle_contest()
	},
	{
		id: 'pimm24a',
		title: () => m.timeline_title_pimm24a(),
		start: '2024.01',
		end: '2024.03',
		color: '#80729b',
		opensItemId: 'algorithm-contest-operations',
		subtitle: () => m.timeline_subtitle_contest()
	},
	{
		id: 'gist24',
		title: () => m.timeline_title_gist24(),
		start: '2024.06',
		end: '2024.07',
		color: '#917ca2',
		opensItemId: 'algorithm-contest-operations',
		subtitle: () => m.timeline_subtitle_gist24()
	},
	{
		id: 'pimm24b',
		title: () => m.timeline_title_pimm24b(),
		start: '2024.07',
		end: '2024.09',
		color: '#8577a6',
		opensItemId: 'algorithm-contest-operations',
		subtitle: () => m.timeline_subtitle_contest()
	},
	{
		id: 'pimm25a',
		title: () => m.timeline_title_pimm25a(),
		start: '2025.01',
		end: '2025.03',
		color: '#7979a1',
		opensItemId: 'algorithm-contest-operations',
		subtitle: () => m.timeline_subtitle_contest()
	},
	{
		id: 'highschool',
		title: () => m.timeline_title_highschool(),
		start: '2018.03',
		end: '2021.02',
		color: '#567faf',
		opensItemId: 'edu-highschool-sdok'
	},
	{
		id: 'sdok-fetea',
		title: () => m.timeline_title_fetea(),
		start: '2019.02',
		end: '2019.09',
		color: '#688ca1',
		opensItemId: 'project-sdok-fetea'
	},
	{
		id: 'discord-booth',
		title: () => m.timeline_title_discord_booth(),
		start: '2019.03',
		end: '2019.05',
		color: '#897aa2',
		opensItemId: 'activity-gwangju-sw-festival19',
		subtitle: () => m.timeline_subtitle_discord_booth()
	},
	{
		id: 'zodiac-complex',
		title: () => m.timeline_title_zodiac(),
		start: '2025.07',
		end: '2025.08',
		color: '#668a9c',
		opensItemId: 'project-zodiac-complex',
		subtitle: () => m.timeline_subtitle_zodiac()
	}
].map((item) => ({ ...item, color: varyTimelineColor(item.color) }));

/** Group by end month, with ongoing entries first and stable ordering within each month. */
export function groupTimelineItems(items: TimelineItem[]) {
	const groups = new Map<string, TimelineItem[]>();
	for (const item of [...items].sort(
		(a, b) =>
			(b.end ?? '9999.99').localeCompare(a.end ?? '9999.99') || b.start.localeCompare(a.start)
	)) {
		const key = item.end ?? '';
		groups.set(key, [...(groups.get(key) ?? []), item]);
	}
	return [...groups].map(([end, items]) => ({ end, items }));
}

/** Month coordinates shared by duration bands and their labels. */
export function layoutTimeline(items: TimelineItem[], currentMonth: string) {
	const month = (value: string) => {
		const [year, month] = value.split('.').map(Number);
		return year * 12 + month - 1;
	};
	const dates = [
		...new Set([currentMonth, ...items.flatMap((item) => [item.start, item.end ?? currentMonth])])
	].sort((a, b) => month(b) - month(a));
	const groups = groupTimelineItems(items);
	const rows = dates.map((date, index) => {
		const months = index < dates.length - 1 ? month(date) - month(dates[index + 1]) : 0;
		return {
			date,
			items: groups.find((group) => (group.end || currentMonth) === date)?.items ?? [],
			months,
			// Consecutive months have no extra spacer; content still determines row height.
			spacingRem: months <= 1 ? 0 : Math.max(1.5, months * 0.45)
		};
	});

	const ordered = groups.flatMap((group) => group.items);
	const lanes = new Map<string, number>();
	const overlaps = (a: TimelineItem, b: TimelineItem) =>
		month(a.start) < month(b.end ?? currentMonth) && month(b.start) < month(a.end ?? currentMonth);
	// Reserve requested lanes before assigning the remaining activities.
	for (const item of ordered) if (item.lane) lanes.set(item.id, item.lane);
	for (const item of ordered) {
		if (lanes.has(item.id)) continue;
		let lane = 1;
		while (
			ordered.some(
				(other) => other.id !== item.id && lanes.get(other.id) === lane && overlaps(item, other)
			)
		)
			lane++;
		lanes.set(item.id, lane);
	}
	const bands = ordered
		.map((item) => ({
			item,
			depth: (lanes.get(item.id) ?? 1) - 1,
			firstRow: dates.indexOf(item.end ?? currentMonth) + 1,
			lastRow: dates.indexOf(item.start) + 1
		}))
		.sort((a, b) => a.depth - b.depth);

	return { rows, bands };
}

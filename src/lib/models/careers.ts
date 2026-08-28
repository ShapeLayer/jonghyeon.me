import { m } from '$lib/paraglide/messages';
import type { Date as CareerDate } from '$lib/models/date';

export type CareerTagKind = 'section' | 'topic';

export type CareerTag = {
  identifier: string;
  /** Localised, so both are resolved when the tag renders rather than when the model loads. */
  displayName: () => string;
  description: () => string;
  backgroundColor: string;
  foregroundColor: string;
  kind: CareerTagKind;
};

export type CareerItemData = {
  id: string;
  startsAt?: CareerDate;
  endsAt?: CareerDate;
  current?: boolean;
  /** Topic tags carried on top of the ones inherited from the section. */
  tagIdentifiers?: string[];
};

export type CareerSection = {
  identifier: string;
  /** Localised heading shown in the default (unsorted, unfiltered) view. */
  title: () => string;
  /** Tags every item of the section carries, including the section tag itself. */
  tagIdentifiers: string[];
  items: CareerItemData[];
};

/** The single source of truth for career tag labels and their presentation. */
export const careerTags: CareerTag[] = [
  { identifier: 'current', displayName: () => m.career_tag_current(), description: () => m.career_tag_current_description(), backgroundColor: '#eef7d9', foregroundColor: '#4f6b12', kind: 'section' },
  { identifier: 'education', displayName: () => m.career_tag_education(), description: () => m.career_tag_education_description(), backgroundColor: '#e0edff', foregroundColor: '#164c92', kind: 'section' },
  { identifier: 'work', displayName: () => m.career_tag_work(), description: () => m.career_tag_work_description(), backgroundColor: '#e8f7ee', foregroundColor: '#1d6a3a', kind: 'section' },
  { identifier: 'project', displayName: () => m.career_tag_project(), description: () => m.career_tag_project_description(), backgroundColor: '#fff0db', foregroundColor: '#915500', kind: 'section' },
  { identifier: 'achievement', displayName: () => m.career_tag_achievement(), description: () => m.career_tag_achievement_description(), backgroundColor: '#f5e8ff', foregroundColor: '#6d3193', kind: 'section' },
  { identifier: 'activity', displayName: () => m.career_tag_activity(), description: () => m.career_tag_activity_description(), backgroundColor: '#e4f6f7', foregroundColor: '#17656a', kind: 'section' },
  { identifier: 'contest-hosting', displayName: () => m.career_tag_contest_hosting(), description: () => m.career_tag_contest_hosting_description(), backgroundColor: '#ffe3f1', foregroundColor: '#8f2a63', kind: 'section' },
  { identifier: 'certification', displayName: () => m.career_tag_certification(), description: () => m.career_tag_certification_description(), backgroundColor: '#f2f2f2', foregroundColor: '#4a4a4a', kind: 'section' },
  { identifier: 'software', displayName: () => m.career_tag_software(), description: () => m.career_tag_software_description(), backgroundColor: '#e9edff', foregroundColor: '#344aa0', kind: 'topic' },
  { identifier: 'research', displayName: () => m.career_tag_research(), description: () => m.career_tag_research_description(), backgroundColor: '#fce8ee', foregroundColor: '#9a264a', kind: 'topic' },
  { identifier: 'game', displayName: () => m.career_tag_game(), description: () => m.career_tag_game_description(), backgroundColor: '#fff3c9', foregroundColor: '#715500', kind: 'topic' },
  { identifier: 'algorithm', displayName: () => m.career_tag_algorithm(), description: () => m.career_tag_algorithm_description(), backgroundColor: '#e5f5e4', foregroundColor: '#2a6c2e', kind: 'topic' },
  { identifier: 'language', displayName: () => m.career_tag_language(), description: () => m.career_tag_language_description(), backgroundColor: '#f4eaff', foregroundColor: '#74439a', kind: 'topic' },
  { identifier: 'cloud-data', displayName: () => m.career_tag_cloud_data(), description: () => m.career_tag_cloud_data_description(), backgroundColor: '#e0f5ff', foregroundColor: '#176882', kind: 'topic' }
];

/**
 * Career items grouped the way they are laid out in the default view.
 * The order of the sections and of their items is the rendering order,
 * and the tie-breaker whenever the sort conditions leave items equal.
 */
export const careerSections: CareerSection[] = [
  {
    identifier: 'current',
    title: () => m.career_section_current(),
    tagIdentifiers: ['current', 'education'],
    items: [
      { id: 'edu-bachelor-chonnam-natl-univ-ce', startsAt: { year: 2021, month: 3 }, current: true },
      { id: 'edu-bachelor-chonnam-natl-univ-jp', startsAt: { year: 2026, month: 3 }, current: true, tagIdentifiers: ['language'] }
    ]
  },
  {
    identifier: 'education',
    title: () => m.career_section_education(),
    tagIdentifiers: ['education'],
    items: [
      { id: 'edu-highschool-sdok', startsAt: { year: 2018, month: 3 }, endsAt: { year: 2021, month: 2 } },
      { id: 'edu-bachelor-unlv-short-term', startsAt: { year: 2024, month: 8 }, tagIdentifiers: ['language'] },
      { id: 'edu-bachelor-exchange-sage', startsAt: { year: 2025, month: 9 }, endsAt: { year: 2026, month: 2 }, tagIdentifiers: ['language'] }
    ]
  },
  {
    identifier: 'work',
    title: () => m.career_section_work(),
    tagIdentifiers: ['work'],
    items: [
      { id: 'work-imagelab', startsAt: { year: 2021, month: 6 }, endsAt: { year: 2022, month: 7 }, tagIdentifiers: ['research', 'software'] },
      { id: 'work-roka', startsAt: { year: 2022, month: 7 }, endsAt: { year: 2024, month: 1 } },
      { id: 'work-ielab', startsAt: { year: 2024, month: 3 }, endsAt: { year: 2025, month: 2 }, tagIdentifiers: ['research', 'software'] },
      { id: 'work-cnu-ucc-working-scholarship', startsAt: { year: 2025, month: 3 }, endsAt: { year: 2025, month: 8 } },
      { id: 'work-jamcoding-lecturer', startsAt: { year: 2024, month: 1 }, endsAt: { year: 2025, month: 9 }, tagIdentifiers: ['software'] }
    ]
  },
  {
    identifier: 'project',
    title: () => m.career_section_project(),
    tagIdentifiers: ['project', 'software'],
    items: [
      { id: 'career-project-prefix-gen', startsAt: { year: 2020, month: 5 } },
      { id: 'proejct-sign-language-client', startsAt: { year: 2021, month: 6 }, endsAt: { year: 2022, month: 7 }, tagIdentifiers: ['game', 'research'] },
      { id: 'project-hccc22-page', startsAt: { year: 2022, month: 6 } },
      { id: 'project-iwfcv22-page', startsAt: { year: 2022, month: 6 } },
      { id: 'project-zodiac-complex', startsAt: { year: 2025, month: 7 }, endsAt: { year: 2025, month: 8 }, tagIdentifiers: ['game'] }
    ]
  },
  {
    identifier: 'achievement',
    title: () => m.career_section_achievement(),
    tagIdentifiers: ['achievement'],
    items: [
      { id: 'achievement-cnu-startup21', startsAt: { year: 2021, month: 12 }, tagIdentifiers: ['software'] },
      { id: 'achievement-icpc-21', startsAt: { year: 2021, month: 11, day: 13 }, tagIdentifiers: ['software', 'algorithm'] },
      { id: 'paper-smart-media21', startsAt: { year: 2021, month: 11 }, tagIdentifiers: ['research'] },
      { id: 'paper-smart-media22', startsAt: { year: 2022, month: 6 }, tagIdentifiers: ['research'] },
      { id: 'achievement-cnu-algorithm-contest-6th', startsAt: { year: 2024, month: 5 }, tagIdentifiers: ['software', 'algorithm'] },
      { id: 'achievement-cnu-sw-club25', startsAt: { year: 2024, month: 10, day: 25 }, tagIdentifiers: ['software'] },
      { id: 'achievement-mirae-asset-33', startsAt: { year: 2025, month: 7 }, endsAt: { year: 2026, month: 2 } }
    ]
  },
  {
    identifier: 'activity',
    title: () => m.career_section_activity(),
    tagIdentifiers: ['activity'],
    items: [
      { id: 'activity-gwangju-sw-festival19', startsAt: { year: 2019, month: 5 }, tagIdentifiers: ['software'] },
      { id: 'activity-cnu-club-pimm', startsAt: { year: 2021, month: 3 }, current: true, tagIdentifiers: ['software', 'game'] },
      { id: 'activity-cnu-club-stolio', startsAt: { year: 2022, month: 3 }, endsAt: { year: 2025, month: 12 }, tagIdentifiers: ['software'] }
    ]
  },
  {
    identifier: 'contest-hosting',
    title: () => m.career_section_contest_hosting(),
    tagIdentifiers: ['activity', 'contest-hosting', 'software', 'algorithm'],
    items: [
      { id: 'algorithm-contest-pimm-23', startsAt: { year: 2023, month: 9 } },
      { id: 'algorithm-contest-pimm-24a', startsAt: { year: 2024, month: 3 } },
      { id: 'algorithm-contest-gist', startsAt: { year: 2024, month: 5 } },
      { id: 'algorithm-contest-pimm-24b', startsAt: { year: 2024, month: 9 } },
      { id: 'algorithm-contest-pimm-25a', startsAt: { year: 2025, month: 3 } }
    ]
  },
  {
    identifier: 'certification',
    title: () => m.career_section_certification(),
    tagIdentifiers: ['certification'],
    items: [
      { id: 'certification-toeic', startsAt: { year: 2021, month: 8, day: 8 }, tagIdentifiers: ['language'] },
      { id: 'certification-jlpt', startsAt: { year: 2024, month: 8, day: 13 }, tagIdentifiers: ['language'] },
      { id: 'certification-sqld', startsAt: { year: 2021, month: 10, day: 1 }, tagIdentifiers: ['cloud-data'] },
      { id: 'certification-aws-ccp', startsAt: { year: 2022, month: 1, day: 25 }, tagIdentifiers: ['cloud-data'] },
      { id: 'certification-aws-da', startsAt: { year: 2022, month: 10, day: 17 }, tagIdentifiers: ['cloud-data'] },
      { id: 'certification-cos-pro', startsAt: { year: 2021, month: 7, day: 18 }, tagIdentifiers: ['software', 'algorithm'] },
      { id: 'certification-network-manager' },
      { id: 'certification-topcit', startsAt: { year: 2025, month: 5, day: 24 }, tagIdentifiers: ['software'] }
    ]
  }
];

export type SortDirection = 'asc' | 'desc';
/** Whether the sort key is the identifier the items are grouped by, or the value of a concrete field. */
export type CareerSortKeySource = 'identifier' | 'field';
export type CareerSortField = 'startsAt' | 'endsAt';
/** Customize rule: the value kept at a fixed index whatever the basic rule computes. */
export type CareerSortPin = { index: number; value: string };

export type CareerSortCriterion = {
  identifier: string;
  /** Localised, so both are resolved when the menu renders rather than when the model loads. */
  displayName: () => string;
  description: () => string;
  /** Basic rule: where the comparable key comes from. */
  keySource: CareerSortKeySource;
  /** With keySource 'identifier': the tag kind whose identifiers group and order the items. */
  tagKind?: CareerTagKind;
  /** With keySource 'field': the item field that provides the key. */
  field?: CareerSortField;
  /** Basic rule: the direction the criterion runs in when it is first added. */
  defaultDirection: SortDirection;
  /**
   * Customize rules, applied on top of the basic ordering.
   * For an 'identifier' criterion the value is a tag identifier, so the whole group moves;
   * for a 'field' criterion it is a career item id.
   */
  pinnedValues?: CareerSortPin[];
};

/** Sort criteria offered in the filter menu, stackable in the order they are added. */
export const careerSortCriteria: CareerSortCriterion[] = [
  {
    identifier: 'period',
    displayName: () => m.career_sort_period(),
    description: () => m.career_sort_period_description(),
    keySource: 'field',
    field: 'startsAt',
    defaultDirection: 'desc'
  },
  {
    identifier: 'section',
    displayName: () => m.career_sort_section(),
    description: () => m.career_sort_section_description(),
    keySource: 'identifier',
    tagKind: 'section',
    defaultDirection: 'asc',
    pinnedValues: [{ index: 0, value: 'current' }]
  },
  {
    identifier: 'topic',
    displayName: () => m.career_sort_topic(),
    description: () => m.career_sort_topic_description(),
    keySource: 'identifier',
    tagKind: 'topic',
    defaultDirection: 'asc'
  }
];

export type CareerSortCondition = { criterionIdentifier: string; direction: SortDirection };

const sectionByItemId = new Map(
  careerSections.flatMap((section) => section.items.map((item) => [item.id, section] as const))
);
export const careerItems: CareerItemData[] = careerSections.flatMap((section) => section.items);
const itemById = new Map(careerItems.map((item) => [item.id, item]));

export const sectionTags: CareerTag[] = careerTags.filter((tag) => tag.kind === 'section');
export const topicTags: CareerTag[] = careerTags.filter((tag) => tag.kind === 'topic');

export function getCareerItem(id: string): CareerItemData | undefined {
  return itemById.get(id);
}

export function getCareerSection(id: string): CareerSection | undefined {
  return sectionByItemId.get(id);
}

export function getCareerTags(id: string): CareerTag[] {
  const identifiers = new Set([
    ...(sectionByItemId.get(id)?.tagIdentifiers ?? []),
    ...(itemById.get(id)?.tagIdentifiers ?? [])
  ]);
  return careerTags.filter((tag) => identifiers.has(tag.identifier));
}

/** True when the item carries at least one of the given tags, or when nothing is selected. */
export function matchesCareerTags(id: string, selectedTagIdentifiers: string[]): boolean {
  if (!selectedTagIdentifiers.length) return true;
  const tags = getCareerTags(id);
  return selectedTagIdentifiers.some((identifier) => tags.some((tag) => tag.identifier === identifier));
}

export function getCareerSortCriterion(identifier: string): CareerSortCriterion | undefined {
  return careerSortCriteria.find((criterion) => criterion.identifier === identifier);
}

/** The value an item is grouped by for a criterion: a tag identifier, or the item itself. */
function groupValueOf(item: CareerItemData, criterion: CareerSortCriterion): string {
  if (criterion.keySource === 'field') return item.id;
  /* An item belongs to exactly one section but to any number of topics, so the section it is
     declared in is its group, while topics fall back to the first one it carries. */
  if (criterion.tagKind === 'section') return sectionByItemId.get(item.id)?.identifier ?? '';
  return getCareerTags(item.id).find((tag) => tag.kind === criterion.tagKind)?.identifier ?? '';
}

/** The comparable key of a group. Groups without one always trail, whichever way the criterion runs. */
function sortKeyOf(value: string, criterion: CareerSortCriterion): number | string | undefined {
  if (criterion.keySource === 'identifier') return value || undefined;
  const item = itemById.get(value);
  const date = criterion.field === 'endsAt' ? item?.endsAt : item?.startsAt;
  return date ? date.year * 10000 + (date.month ?? 0) * 100 + (date.day ?? 0) : undefined;
}

/** Ranks every group of a criterion, basic rule first and customize rules on top. */
function rankGroups(criterion: CareerSortCriterion, direction: SortDirection): Map<string, number> {
  const values = [...new Set(careerItems.map((item) => groupValueOf(item, criterion)))];
  const keyed = values.map((value) => ({ value, key: sortKeyOf(value, criterion) }));
  const ranked = keyed
    .filter((entry) => entry.key !== undefined)
    .sort((a, b) => (a.key! < b.key! ? -1 : a.key! > b.key! ? 1 : 0))
    .map((entry) => entry.value);
  if (direction === 'desc') ranked.reverse();
  const keyless = keyed.filter((entry) => entry.key === undefined).map((entry) => entry.value).sort();
  const ordered = [...ranked, ...keyless];

  const pins = [...(criterion.pinnedValues ?? [])].sort((a, b) => a.index - b.index);
  const pinnedValues = pins.map((pin) => pin.value);
  const result = ordered.filter((value) => !pinnedValues.includes(value));
  for (const pin of pins) {
    if (!ordered.includes(pin.value)) continue;
    result.splice(Math.min(Math.max(pin.index, 0), result.length), 0, pin.value);
  }
  return new Map(result.map((value, index) => [value, index]));
}

/**
 * Item ids in the order the given conditions ask for.
 * Conditions are applied in the order they were added; the listed order breaks any remaining tie.
 */
export function sortCareerItemIds(conditions: CareerSortCondition[]): string[] {
  const applied = conditions
    .map((condition) => ({ criterion: getCareerSortCriterion(condition.criterionIdentifier), direction: condition.direction }))
    .filter((entry): entry is { criterion: CareerSortCriterion; direction: SortDirection } => Boolean(entry.criterion))
    .map(({ criterion, direction }) => ({ criterion, ranks: rankGroups(criterion, direction) }));
  const listed = careerItems.map((item, index) => ({ item, index }));
  if (!applied.length) return listed.map((entry) => entry.item.id);
  return listed
    .sort((a, b) => {
      for (const { criterion, ranks } of applied) {
        const rankA = ranks.get(groupValueOf(a.item, criterion)) ?? Number.MAX_SAFE_INTEGER;
        const rankB = ranks.get(groupValueOf(b.item, criterion)) ?? Number.MAX_SAFE_INTEGER;
        if (rankA !== rankB) return rankA - rankB;
      }
      return a.index - b.index;
    })
    .map((entry) => entry.item.id);
}

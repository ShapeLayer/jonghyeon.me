import { m } from '$lib/paraglide/messages';
import type { Date as CareerDate } from '$lib/models/date';

export type CareerTagKind = 'section' | 'topic' | 'era' | 'project' | 'ai' | 'stack';

export type CareerTag = {
  identifier: string;
  /** Localised, so both are resolved when the tag renders rather than when the model loads. */
  displayName: () => string;
  /** Omitted for tags that carry no tooltip, e.g. bare stack labels. */
  description?: () => string;
  backgroundColor: string;
  foregroundColor: string;
  kind: CareerTagKind;
  /** Career item id whose detail popup this tag opens when clicked, switching tabs first if needed. */
  opensItemId?: string;
};

/** An entry listed under its own subheading inside a parent item's detail view. */
export type CareerSubItemData = {
  id: string;
  /** Rolled up into the parent item, so filtering and sorting reach the parent through them. */
  tagIdentifiers?: string[];
};

export type CareerItemData = {
  id: string;
  startsAt?: CareerDate;
  endsAt?: CareerDate;
  current?: boolean;
  /** Topic tags carried on top of the ones inherited from the section. */
  tagIdentifiers?: string[];
  /** Entries the item's detail view breaks down into, each carrying tags of its own. */
  subItems?: CareerSubItemData[];
  /** Tucked behind the section's show-more toggle in the default view; always shown once filtered or sorted. */
  hidden?: boolean;
};

/** The tab a section is listed under: the career history, or the works list. */
export type CareerTabIdentifier = 'history' | 'works';

export type CareerSection = {
  identifier: string;
  /** The tab the section belongs to; sections without one are part of the history tab. */
  tab?: CareerTabIdentifier;
  /** Localised heading shown in the default (unsorted, unfiltered) view. */
  title: () => string;
  /** Tags every item of the section carries, including the section tag itself. */
  tagIdentifiers: string[];
  items: CareerItemData[];
};

export type CareerTab = {
  identifier: CareerTabIdentifier;
  /** Localised, so it is resolved when the tab bar renders rather than when the model loads. */
  label: () => string;
};

export const careerTabs: CareerTab[] = [
  { identifier: 'history', label: () => m.career_tab_history() },
  { identifier: 'works', label: () => m.career_tab_works() }
];

/** The single source of truth for career tag labels and their presentation. */
export const careerTags: CareerTag[] = [
  { identifier: 'current', displayName: () => m.career_tag_current(), description: () => m.career_tag_current_description(), backgroundColor: '#eef7d9', foregroundColor: '#4f6b12', kind: 'section' },
  { identifier: 'education', displayName: () => m.career_tag_education(), description: () => m.career_tag_education_description(), backgroundColor: '#e0edff', foregroundColor: '#164c92', kind: 'section' },
  { identifier: 'work', displayName: () => m.career_tag_work(), description: () => m.career_tag_work_description(), backgroundColor: '#e8f7ee', foregroundColor: '#1d6a3a', kind: 'section' },
  { identifier: 'achievement', displayName: () => m.career_tag_achievement(), description: () => m.career_tag_achievement_description(), backgroundColor: '#f5e8ff', foregroundColor: '#6d3193', kind: 'section' },
  { identifier: 'activity', displayName: () => m.career_tag_activity(), description: () => m.career_tag_activity_description(), backgroundColor: '#e4f6f7', foregroundColor: '#17656a', kind: 'section' },
  { identifier: 'contest-hosting', displayName: () => m.career_tag_contest_hosting(), description: () => m.career_tag_contest_hosting_description(), backgroundColor: '#ffe3f1', foregroundColor: '#8f2a63', kind: 'section' },
  { identifier: 'certification', displayName: () => m.career_tag_certification(), description: () => m.career_tag_certification_description(), backgroundColor: '#f2f2f2', foregroundColor: '#4a4a4a', kind: 'section' },
  { identifier: 'research', displayName: () => m.career_tag_research(), description: () => m.career_tag_research_description(), backgroundColor: '#fce8ee', foregroundColor: '#9a264a', kind: 'topic' },
  { identifier: 'game', displayName: () => m.career_tag_game(), description: () => m.career_tag_game_description(), backgroundColor: '#fff3c9', foregroundColor: '#715500', kind: 'topic' },
  { identifier: 'algorithm', displayName: () => m.career_tag_algorithm(), description: () => m.career_tag_algorithm_description(), backgroundColor: '#e5f5e4', foregroundColor: '#2a6c2e', kind: 'topic' },
  { identifier: 'language', displayName: () => m.career_tag_language(), description: () => m.career_tag_language_description(), backgroundColor: '#f4eaff', foregroundColor: '#74439a', kind: 'topic' },
  { identifier: 'japanese-literature', displayName: () => m.career_tag_japanese_literature(), description: () => m.career_tag_japanese_literature_description(), backgroundColor: '#f4eaff', foregroundColor: '#74439a', kind: 'topic' },
  { identifier: 'cloud-data', displayName: () => m.career_tag_cloud_data(), description: () => m.career_tag_cloud_data_description(), backgroundColor: '#e0f5ff', foregroundColor: '#176882', kind: 'topic' },
  { identifier: 'overseas', displayName: () => m.career_tag_overseas(), description: () => m.career_tag_overseas_description(), backgroundColor: '#ffe9d6', foregroundColor: '#a15816', kind: 'topic' },
  { identifier: 'era-minor', displayName: () => m.career_tag_era_minor(), description: () => m.career_tag_era_minor_description(), backgroundColor: '#ffe9e2', foregroundColor: '#a3401b', kind: 'era' },
  { identifier: 'era-university', displayName: () => m.career_tag_era_university(), description: () => m.career_tag_era_university_description(), backgroundColor: '#e2ecff', foregroundColor: '#1b3fa3', kind: 'era' },
  { identifier: 'pimm-algo-party', displayName: () => m.career_tag_pimm_algo_party(), description: () => m.career_tag_pimm_algo_party_description(), backgroundColor: '#e3f0ff', foregroundColor: '#0b5bb5', kind: 'project', opensItemId: 'algorithm-contest-pimm-party' },
  { identifier: 'ktas-trainer', displayName: () => m.career_tag_ktas_trainer(), description: () => m.career_tag_ktas_trainer_description(), backgroundColor: '#ffe8ec', foregroundColor: '#c11d3c', kind: 'project' },
  { identifier: 'sign-language', displayName: () => m.career_tag_sign_language(), description: () => m.career_tag_sign_language_description(), backgroundColor: '#e0f7f0', foregroundColor: '#0f7a63', kind: 'project' },
  { identifier: 'pre-ai', displayName: () => m.career_tag_ai_pre_ai(), description: () => m.career_tag_ai_pre_ai_description(), backgroundColor: '#eef0f2', foregroundColor: '#55606b', kind: 'ai' },
  { identifier: 'limited', displayName: () => m.career_tag_ai_limited(), description: () => m.career_tag_ai_limited_description(), backgroundColor: '#fff4dc', foregroundColor: '#8a5a00', kind: 'ai' },
  { identifier: 'driven', displayName: () => m.career_tag_ai_driven(), description: () => m.career_tag_ai_driven_description(), backgroundColor: '#f1e9ff', foregroundColor: '#6a3fb5', kind: 'ai' },
  { identifier: 'csharp', displayName: () => m.career_tag_csharp(), backgroundColor: '#eef2f6', foregroundColor: '#3c5068', kind: 'stack' },
  { identifier: 'c', displayName: () => m.career_tag_c(), backgroundColor: '#eef2f6', foregroundColor: '#3c5068', kind: 'stack' },
  { identifier: 'cpp', displayName: () => m.career_tag_cpp(), backgroundColor: '#eef2f6', foregroundColor: '#3c5068', kind: 'stack' },
  { identifier: 'r', displayName: () => m.career_tag_r(), backgroundColor: '#eef2f6', foregroundColor: '#3c5068', kind: 'stack' },
  { identifier: 'python', displayName: () => m.career_tag_python(), backgroundColor: '#eef2f6', foregroundColor: '#3c5068', kind: 'stack' },
  { identifier: 'flask', displayName: () => m.career_tag_flask(), backgroundColor: '#eef2f6', foregroundColor: '#3c5068', kind: 'stack' },
  { identifier: 'unity', displayName: () => m.career_tag_unity(), backgroundColor: '#eef2f6', foregroundColor: '#3c5068', kind: 'stack' },
  { identifier: 'naninovel', displayName: () => m.career_tag_naninovel(), description: () => m.career_tag_naninovel_description(), backgroundColor: '#eef2f6', foregroundColor: '#3c5068', kind: 'stack' },
  { identifier: 'jekyll', displayName: () => m.jekyll(), backgroundColor: '#eef2f6', foregroundColor: '#3c5068', kind: 'stack' },
  { identifier: 'rust', displayName: () => m.career_tag_rust(), backgroundColor: '#eef2f6', foregroundColor: '#3c5068', kind: 'stack' },
  { identifier: 'typescript', displayName: () => m.career_tag_typescript(), backgroundColor: '#eef2f6', foregroundColor: '#3c5068', kind: 'stack' },
  { identifier: 'typst', displayName: () => m.career_tag_typst(), backgroundColor: '#eef2f6', foregroundColor: '#3c5068', kind: 'stack' },
  { identifier: 'nodejs', displayName: () => m.career_tag_nodejs(), backgroundColor: '#eef2f6', foregroundColor: '#3c5068', kind: 'stack' },
  { identifier: 'nunjucks', displayName: () => m.career_tag_nunjucks(), description: () => m.career_tag_nunjucks_description(), backgroundColor: '#eef2f6', foregroundColor: '#3c5068', kind: 'stack' },
  { identifier: 'puppeteer', displayName: () => m.career_tag_puppeteer(), backgroundColor: '#eef2f6', foregroundColor: '#3c5068', kind: 'stack' }
];

/** The month an item is grouped as 'era-university' from onward; anything earlier is 'era-minor'. */
const UNIVERSITY_ERA_START_KEY = 2021 * 100 + 3;

/** Era tags are derived from an item's date rather than declared explicitly, so every dated item gets one for free. */
function eraTagIdentifierFor(item: CareerItemData): string | undefined {
  const date = item.startsAt ?? item.endsAt;
  if (!date) return undefined;
  const key = date.year * 100 + (date.month ?? 1);
  return key < UNIVERSITY_ERA_START_KEY ? 'era-minor' : 'era-university';
}

/**
 * Career items grouped the way they are laid out in the default view.
 * The order of the sections and of their items is the rendering order,
 * and the tie-breaker whenever the sort conditions leave items equal.
 */
export const careerSections: CareerSection[] = [
  {
    identifier: 'current',
    title: () => m.career_section_current(),
    tagIdentifiers: ['current'],
    items: [
      { id: 'edu-bachelor-chonnam-natl-univ-ce', startsAt: { year: 2021, month: 3 }, current: true, tagIdentifiers: ['education'] },
      { id: 'edu-bachelor-chonnam-natl-univ-jp', startsAt: { year: 2026, month: 3 }, current: true, tagIdentifiers: ['education', 'language'] },
      { id: 'work-dedam-math-science-lecturer', startsAt: { year: 2026, month: 7 }, current: true, tagIdentifiers: ['work'], hidden: true },
    ]
  },
  {
    identifier: 'education',
    title: () => m.career_section_education(),
    tagIdentifiers: ['education'],
    items: [
      { id: 'edu-highschool-sdok', startsAt: { year: 2018, month: 3 }, endsAt: { year: 2021, month: 2 }, hidden: true },
      { id: 'edu-bachelor-unlv-short-term', startsAt: { year: 2024, month: 8 }, tagIdentifiers: ['language', 'overseas'], hidden: true },
      { id: 'edu-bachelor-exchange-saga', startsAt: { year: 2025, month: 9 }, endsAt: { year: 2026, month: 2 }, tagIdentifiers: ['language', 'overseas'] }
    ]
  },
  {
    identifier: 'work',
    title: () => m.career_section_work(),
    tagIdentifiers: ['work'],
    items: [
      { id: 'work-imagelab', startsAt: { year: 2021, month: 6 }, endsAt: { year: 2022, month: 7 }, tagIdentifiers: ['research'] },
      { id: 'work-roka', startsAt: { year: 2022, month: 7 }, endsAt: { year: 2024, month: 1 }, hidden: true },
      { id: 'work-ielab', startsAt: { year: 2024, month: 3 }, endsAt: { year: 2025, month: 2 }, tagIdentifiers: ['research'] },
      { id: 'work-cnu-ucc-working-scholarship', startsAt: { year: 2025, month: 3 }, endsAt: { year: 2025, month: 8 } },
      { id: 'work-jamcoding-lecturer', startsAt: { year: 2024, month: 1 }, endsAt: { year: 2026, month: 6 } }
    ]
  },
  {
    identifier: 'achievement',
    title: () => m.career_section_achievement(),
    tagIdentifiers: ['achievement'],
    items: [
      { id: 'achievement-cnu-startup21', startsAt: { year: 2021, month: 12 }, hidden: true },
      { id: 'achievement-icpc-21', startsAt: { year: 2021, month: 11, day: 13 }, tagIdentifiers: ['algorithm'] },
      { id: 'paper-smart-media21', startsAt: { year: 2021, month: 11 }, tagIdentifiers: ['research', 'pre-ai', 'sign-language', 'csharp', 'unity'] },
      { id: 'paper-smart-media22', startsAt: { year: 2022, month: 6 }, tagIdentifiers: ['research', 'pre-ai', 'sign-language', 'csharp', 'unity'] },
      { id: 'achievement-cnu-algorithm-contest-6th', startsAt: { year: 2024, month: 5 }, tagIdentifiers: ['algorithm'] },
      { id: 'achievement-cnu-sw-club25', startsAt: { year: 2024, month: 10, day: 25 } }
    ]
  },
  {
    identifier: 'activity',
    title: () => m.career_section_activity(),
    tagIdentifiers: ['activity'],
    items: [
      { id: 'activity-gwangju-sw-festival19', startsAt: { year: 2019, month: 5 }, tagIdentifiers: ['python'] },
      { id: 'activity-cnu-club-pimm', startsAt: { year: 2021, month: 3 }, endsAt: { year: 2026, month: 3 }, tagIdentifiers: ['game'] },
      { id: 'activity-cnu-club-stolio', startsAt: { year: 2022, month: 3 }, endsAt: { year: 2025, month: 12 } }
    ]
  },
  {
    identifier: 'contest-hosting',
    title: () => m.career_section_contest_hosting(),
    tagIdentifiers: ['activity', 'contest-hosting', 'algorithm'],
    items: [
      {
        id: 'algorithm-contest-pimm-party',
        startsAt: { year: 2023, month: 9 },
        endsAt: { year: 2025, month: 3 },
        tagIdentifiers: ['pimm-algo-party'],
        subItems: [
          { id: 'algorithm-contest-pimm-23' },
          { id: 'algorithm-contest-pimm-24a' },
          { id: 'algorithm-contest-pimm-24b' },
          { id: 'algorithm-contest-pimm-25a' }
        ]
      },
      { id: 'algorithm-contest-gist', startsAt: { year: 2024, month: 5 } }
    ]
  },
  {
    identifier: 'certification',
    title: () => m.career_section_certification(),
    tagIdentifiers: ['certification'],
    items: [
      { id: 'certification-info-comm-engineer', startsAt: { year: 2026, month: 6, day: 12 } },
      { id: 'certification-topcit', startsAt: { year: 2025, month: 5, day: 24 } },
      { id: 'certification-computer', startsAt: { year: 2021, month: 7, day: 18 }, endsAt: { year: 2023, month: 10, day: 10 }, tagIdentifiers: ['algorithm', 'cloud-data'] },
      { id: 'certification-aws', startsAt: { year: 2022, month: 1, day: 25 }, endsAt: { year: 2022, month: 10, day: 17 }, tagIdentifiers: ['cloud-data'], hidden: true },
      { id: 'certification-language', startsAt: { year: 2021, month: 8, day: 8 }, endsAt: { year: 2026, month: 3, day: 29 }, tagIdentifiers: ['language'] }
    ]
  },
  {
    identifier: 'etc',
    title: () => m.career_section_etc(),
    tagIdentifiers: [],
    items: [
      { id: 'achievement-mirae-asset-33', startsAt: { year: 2025, month: 7 }, endsAt: { year: 2026, month: 2 } }
    ]
  },
  {
    identifier: 'works',
    tab: 'works',
    title: () => m.career_section_works(),
    tagIdentifiers: [],
    items: [
      { id: 'project-ktas-trainer', startsAt: { year: 2025, month: 8 }, current: true, tagIdentifiers: ['csharp', 'unity', 'ktas-trainer', 'research', 'game', 'era-university', 'driven'] },
      { id: 'project-zodiac-complex', startsAt: { year: 2025, month: 7 }, endsAt: { year: 2025, month: 8 }, tagIdentifiers: ['game', 'csharp', 'unity', 'naninovel'] },
      { id: 'works-typst-maintaining', startsAt: { year: 2024, month: 7 }, current: true, tagIdentifiers: ['typst'] },
      { id: 'project-hccc22-page', startsAt: { year: 2022, month: 6 }, tagIdentifiers: ['pre-ai', 'jekyll'], hidden: true },
      { id: 'project-iwfcv22-page', startsAt: { year: 2022, month: 6 }, tagIdentifiers: ['pre-ai', 'jekyll'], hidden: true },
      { id: 'project-sign-language-client', startsAt: { year: 2021, month: 6 }, endsAt: { year: 2022, month: 7 }, tagIdentifiers: ['game', 'research', 'pre-ai', 'sign-language', 'csharp', 'unity'] },
      { id: 'project-sdok-fetea', startsAt: { year: 2019 }, tagIdentifiers: ['python', 'flask', 'pre-ai'] },
    ]
  },
  {
    identifier: 'develops',
    tab: 'works',
    title: () => m.career_section_develops(),
    tagIdentifiers: [],
    items: [
      { id: 'project-hannlp', startsAt: { year: 2026, month: 6 }, endsAt: { year: 2026, month: 8 }, tagIdentifiers: ['c', 'r', 'driven'], hidden: true },
      { id: 'works-cellular', startsAt: { year: 2026, month: 8 }, tagIdentifiers: ['ktas-trainer', 'driven', 'rust', 'typescript'] },
      { id: 'project-unity-merge', startsAt: { year: 2026, month: 7 }, tagIdentifiers: ['cpp', 'ktas-trainer', 'driven'] },
      { id: 'project-namumark', startsAt: { year: 2025, month: 1 }, endsAt: { year: 2026, month: 1 }, tagIdentifiers: ['c', 'limited'] },
      { id: 'project-gfm2polygon-statement', startsAt: { year: 2024, month: 7 }, tagIdentifiers: ['cpp', 'pre-ai', 'pimm-algo-party', ], hidden: true },
      { id: 'works-turbo-waffle', startsAt: { year: 2023, month: 8 }, endsAt: { year: 2023, month: 9 }, tagIdentifiers: ['pimm-algo-party', 'pre-ai', 'nodejs', 'nunjucks', 'puppeteer'] },
      { id: 'career-project-prefix-gen', startsAt: { year: 2020, month: 5 }, tagIdentifiers: ['pre-ai'], hidden: true }
    ]
  }
];

export function getCareerSections(tab: CareerTabIdentifier): CareerSection[] {
  return careerSections.filter((section) => (section.tab ?? 'history') === tab);
}

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
  },
  {
    identifier: 'era',
    displayName: () => m.career_sort_era(),
    description: () => m.career_sort_era_description(),
    keySource: 'identifier',
    tagKind: 'era',
    defaultDirection: 'asc'
  },
  {
    identifier: 'project',
    displayName: () => m.career_sort_project(),
    description: () => m.career_sort_project_description(),
    keySource: 'identifier',
    tagKind: 'project',
    defaultDirection: 'asc'
  },
  {
    identifier: 'ai',
    displayName: () => m.career_sort_ai(),
    description: () => m.career_sort_ai_description(),
    keySource: 'identifier',
    tagKind: 'ai',
    defaultDirection: 'asc',
    pinnedValues: [{ index: 0, value: 'pre-ai' }, { index: 1, value: 'limited' }, { index: 2, value: 'driven' }]
  }
];

export type CareerSortCondition = { criterionIdentifier: string; direction: SortDirection };

const sectionByItemId = new Map(
  careerSections.flatMap((section) => section.items.map((item) => [item.id, section] as const))
);
export const careerItems: CareerItemData[] = careerSections.flatMap((section) => section.items);
const itemById = new Map(careerItems.map((item) => [item.id, item]));
const subItemById = new Map(
  careerItems.flatMap((item) => (item.subItems ?? []).map((subItem) => [subItem.id, subItem] as const))
);

export const sectionTags: CareerTag[] = careerTags.filter((tag) => tag.kind === 'section');
export const topicTags: CareerTag[] = careerTags.filter((tag) => tag.kind === 'topic');
export const eraTags: CareerTag[] = careerTags.filter((tag) => tag.kind === 'era');
export const projectTags: CareerTag[] = careerTags.filter((tag) => tag.kind === 'project');
export const aiTags: CareerTag[] = careerTags.filter((tag) => tag.kind === 'ai');

export function getCareerItem(id: string): CareerItemData | undefined {
  return itemById.get(id);
}

export function getCareerSection(id: string): CareerSection | undefined {
  return sectionByItemId.get(id);
}

/** Tags of one sub-entry alone, for the subheading it is rendered under. */
export function getCareerSubItemTags(id: string): CareerTag[] {
  const identifiers = new Set(subItemById.get(id)?.tagIdentifiers ?? []);
  return careerTags.filter((tag) => identifiers.has(tag.identifier));
}

/** Tags of an item, including the ones its sub-entries carry, so a filter reaches the item through them. */
export function getCareerTags(id: string): CareerTag[] {
  const item = itemById.get(id);
  const identifiers = new Set([
    ...(sectionByItemId.get(id)?.tagIdentifiers ?? []),
    ...(item?.tagIdentifiers ?? []),
    ...(item?.subItems ?? []).flatMap((subItem) => subItem.tagIdentifiers ?? [])
  ]);
  const eraTagIdentifier = item && eraTagIdentifierFor(item);
  if (eraTagIdentifier) identifiers.add(eraTagIdentifier);
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

function dateKey(date: CareerDate): number {
  return date.year * 10000 + (date.month ?? 0) * 100 + (date.day ?? 0);
}

/** The comparable key of a group. Groups without one always trail, whichever way the criterion runs. */
function sortKeyOf(value: string, criterion: CareerSortCriterion): number | string | undefined {
  if (criterion.keySource === 'identifier') return value || undefined;
  const item = itemById.get(value);
  const date = criterion.field === 'endsAt' ? item?.endsAt : item?.startsAt;
  return date ? dateKey(date) : undefined;
}

/** True when the item's [startsAt, endsAt] range overlaps the given period at all, or when no period is given. */
export function matchesCareerPeriod(id: string, start?: CareerDate, end?: CareerDate): boolean {
  if (!start || !end) return true;
  const item = itemById.get(id);
  if (!item?.startsAt) return false;
  const itemStartKey = dateKey(item.startsAt);
  const itemEndKey = item.endsAt ? dateKey(item.endsAt) : item.current ? Number.MAX_SAFE_INTEGER : itemStartKey;
  return itemStartKey <= dateKey(end) && itemEndKey >= dateKey(start);
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

<script lang="ts">
  import type { Component } from 'svelte';
  import { onMount, setContext } from 'svelte';
  import CareerAchievementCnuAlgorithmContest6th from '$lib/components/definitions/careers/CareerAchievementCnuAlgorithmContest6th.svelte';
  import CareerAchievementCnuStartup21 from '$lib/components/definitions/careers/CareerAchievementCnuStartup21.svelte';
  import CareerAchievementCnuSwClub24 from '$lib/components/definitions/careers/CareerAchievementCnuSwClub24.svelte';
  import CareerAchievementIcpc21 from '$lib/components/definitions/careers/CareerAchievementIcpc21.svelte';
  import CareerAchievementScholarshipMiraeAsset33 from '$lib/components/definitions/careers/CareerAchievementScholarshipMiraeAsset33.svelte';
  import CareerActivityCnuClubPimm from '$lib/components/definitions/careers/CareerActivityCnuClubPimm.svelte';
  import CareerActivityCnuClubStolio from '$lib/components/definitions/careers/CareerActivityCnuClubStolio.svelte';
  import CareerActivityGwangjuSwFestival19 from '$lib/components/definitions/careers/CareerActivityGwangjuSwFestival19.svelte';
  import CareerAlgorithmContestGist from '$lib/components/definitions/careers/CareerAlgorithmContestGist.svelte';
  import CareerAlgorithmContestPimmParty from '$lib/components/definitions/careers/CareerAlgorithmContestPimmParty.svelte';
  import CareerCertificationAws from '$lib/components/definitions/careers/CareerCertificationAws.svelte';
  import CareerCertificationComputer from '$lib/components/definitions/careers/CareerCertificationComputer.svelte';
  import CareerCertificationInfoCommEngineer from '$lib/components/definitions/careers/CareerCertificationInfoCommEngineer.svelte';
  import CareerCertificationLanguage from '$lib/components/definitions/careers/CareerCertificationLanguage.svelte';
  import CareerCertificationTopcit from '$lib/components/definitions/careers/CareerCertificationTopcit.svelte';
  import CareerEduBachelorCnuCe from '$lib/components/definitions/careers/CareerEduBachelorCnuCe.svelte';
  import CareerEduBachelorCnuJP from '$lib/components/definitions/careers/CareerEduBachelorCnuJP.svelte';
  import CareerEduBachelorExchangeSaga from '$lib/components/definitions/careers/CareerEduBachelorExchangeSaga.svelte';
  import CareerEduBachelorUnlvShortTerm from '$lib/components/definitions/careers/CareerEduBachelorUnlvShortTerm.svelte';
  import CareerEduHighSchoolSdok from '$lib/components/definitions/careers/CareerEduHighSchoolSdok.svelte';
  import CareerPaperSmartMedia21 from '$lib/components/definitions/careers/CareerPaperSmartMedia21.svelte';
  import CareerPaperSmartMedia22 from '$lib/components/definitions/careers/CareerPaperSmartMedia22.svelte';
  import CareerProjectHccc22Page from '$lib/components/definitions/project/CareerProjectHccc22Page.svelte';
  import CareerProjectIwfcv22Page from '$lib/components/definitions/project/CareerProjectIwfcv22Page.svelte';
  import CareerProjectSignLanguageClient from '$lib/components/definitions/project/CareerProjectSignLanguageClient.svelte';
  import CareerProjectKtasTrainer from '$lib/components/definitions/project/CareerProjectKtasTrainer.svelte';
  import CareerProjectPrefixGenerator from '$lib/components/definitions/project/CareerProjectPrefixGenerator.svelte';
  import CareerProjectZodiacComplex from '$lib/components/definitions/project/CareerProjectZodiacComplex.svelte';
  import CareerProjectNamumark from '$lib/components/definitions/project/CareerProjectNamumark.svelte';
  import CareerProjectUnityMerge from '$lib/components/definitions/project/CareerProjectUnityMerge.svelte';
  import CareerProjectGfm2polygonStatement from '$lib/components/definitions/project/CareerProjectGfm2polygonStatement.svelte';
  import CareerProjectHannlp from '$lib/components/definitions/project/CareerProjectHannlp.svelte';
  import CareerProjectSdokFetea from '$lib/components/definitions/project/CareerProjectSdokFetea.svelte';
  import CareerWorkCnuUccWorkingScholarship from '$lib/components/definitions/careers/CareerWorkCnuUccWorkingScholarship.svelte';
  import CareerWorkIeLab from '$lib/components/definitions/careers/CareerWorkIeLab.svelte';
  import CareerWorkImageLab from '$lib/components/definitions/careers/CareerWorkImageLab.svelte';
  import CareerWorkDedamMathScienceLecturer from '$lib/components/definitions/careers/CareerWorkDedamMathScienceLecturer.svelte';
  import CareerWorkJamcodingLecturer from '$lib/components/definitions/careers/CareerWorkJamcodingLecturer.svelte';
  import CareerWorkRoka from '$lib/components/definitions/careers/CareerWorkRoka.svelte';
  import WorkCellular from '$lib/components/definitions/project/WorkCellular.svelte';
  import WorkTurboWaffle from '$lib/components/definitions/project/WorkTurboWaffle.svelte';
  import WorkPackageMaintaining from '$lib/components/definitions/project/WorkPackageMaintaining.svelte';
  import ExternalLink from '$lib/components/ExternalLink.svelte';
  import SectionHeader from '$lib/components/SectionHeader.svelte';
  import { m } from '$lib/paraglide/messages';
  import type { Date as CareerDate } from '$lib/models/date';
  import type { CareersSectionTab } from '$lib/models/presets';
  import { aiTags, careerSortCriteria, careerTabs, careerTags, eraTags, getCareerSection, getCareerSections, matchesCareerPeriod, matchesCareerTags, projectTags, sectionTags, sortCareerItemIds, topicTags, type CareerTabIdentifier, type CareerTag, type CareerTagKind, type SortDirection } from '$lib/models/careers';

  let { opened = 'history', hiddenOverrides = {} }: { opened?: CareersSectionTab; hiddenOverrides?: Record<string, boolean> } = $props();

  /** Career item id to the component that defines it. */
  const careerComponents: Record<string, Component> = {
    'edu-bachelor-chonnam-natl-univ-ce': CareerEduBachelorCnuCe,
    'edu-bachelor-chonnam-natl-univ-jp': CareerEduBachelorCnuJP,
    'edu-highschool-sdok': CareerEduHighSchoolSdok,
    'edu-bachelor-unlv-short-term': CareerEduBachelorUnlvShortTerm,
    'edu-bachelor-exchange-saga': CareerEduBachelorExchangeSaga,
    'work-imagelab': CareerWorkImageLab,
    'work-roka': CareerWorkRoka,
    'work-ielab': CareerWorkIeLab,
    'work-cnu-ucc-working-scholarship': CareerWorkCnuUccWorkingScholarship,
    'work-jamcoding-lecturer': CareerWorkJamcodingLecturer,
    'work-dedam-math-science-lecturer': CareerWorkDedamMathScienceLecturer,
    'career-project-prefix-gen': CareerProjectPrefixGenerator,
    'project-ktas-trainer': CareerProjectKtasTrainer,
    'project-sign-language-client': CareerProjectSignLanguageClient,
    'project-hccc22-page': CareerProjectHccc22Page,
    'project-iwfcv22-page': CareerProjectIwfcv22Page,
    'project-zodiac-complex': CareerProjectZodiacComplex,
    'project-namumark': CareerProjectNamumark,
    'project-unity-merge': CareerProjectUnityMerge,
    'project-gfm2polygon-statement': CareerProjectGfm2polygonStatement,
    'project-hannlp': CareerProjectHannlp,
    'project-sdok-fetea': CareerProjectSdokFetea,
    'achievement-cnu-startup21': CareerAchievementCnuStartup21,
    'achievement-icpc-21': CareerAchievementIcpc21,
    'paper-smart-media21': CareerPaperSmartMedia21,
    'paper-smart-media22': CareerPaperSmartMedia22,
    'achievement-cnu-algorithm-contest-6th': CareerAchievementCnuAlgorithmContest6th,
    'achievement-cnu-sw-club25': CareerAchievementCnuSwClub24,
    'achievement-mirae-asset-33': CareerAchievementScholarshipMiraeAsset33,
    'activity-gwangju-sw-festival19': CareerActivityGwangjuSwFestival19,
    'activity-cnu-club-pimm': CareerActivityCnuClubPimm,
    'activity-cnu-club-stolio': CareerActivityCnuClubStolio,
    'algorithm-contest-pimm-party': CareerAlgorithmContestPimmParty,
    'algorithm-contest-gist': CareerAlgorithmContestGist,
    'certification-language': CareerCertificationLanguage,
    'certification-aws': CareerCertificationAws,
    'certification-computer': CareerCertificationComputer,
    'certification-info-comm-engineer': CareerCertificationInfoCommEngineer,
    'certification-topcit': CareerCertificationTopcit,
    'works-turbo-waffle': WorkTurboWaffle,
    'works-cellular': WorkCellular,
    'works-typst-maintaining': WorkPackageMaintaining
  };
  /** The note rendered at the end of a section, if it has one. */
  const sectionsWithGithubNote = ['works', 'develops'];

  /** Every dimension is picked through its own tag screen: section/topic/era show a checkbox list of values,
   *  period shows a date-range picker instead. Each tag screen also carries its own sort toggle at the top,
   *  independent of whether any value is picked below it. */
  type CareerConditionKind = CareerTagKind | 'period';
  type TagScreenCategory =
    | {
        kind: 'section' | 'topic' | 'era' | 'project' | 'ai';
        label: () => string;
        tags: CareerTag[];
      }
    | { kind: 'period'; label: () => string };
  /** A condition without a kind is still on the category-picking step. */
  type Condition = {
    id: number;
    kind?: CareerConditionKind;
    /** Selected tag identifiers, for a section/topic/era condition. Several values within one category OR together. */
    tagIdentifiers?: string[];
    /** Selected date range, for a period condition. */
    periodStart?: CareerDate;
    periodEnd?: CareerDate;
  };
  /** 'none' shows as a middle dot: the dimension takes no part in the sort until toggled to a direction. */
  type SortToggleState = 'none' | SortDirection;

  const tagScreenCategories: TagScreenCategory[] = [
    { kind: 'section', label: () => m.career_filter_sections(), tags: sectionTags },
    { kind: 'topic', label: () => m.career_filter_topics(), tags: topicTags },
    { kind: 'era', label: () => m.career_filter_eras(), tags: eraTags },
    { kind: 'project', label: () => m.career_filter_projects(), tags: projectTags },
    { kind: 'ai', label: () => m.career_filter_ai(), tags: aiTags },
    { kind: 'period', label: () => m.career_filter_period() }
  ];
  const categoryOf = (kind: CareerConditionKind | undefined) => (kind ? tagScreenCategories.find((category) => category.kind === kind) : undefined);

  let conditions: Condition[] = $state([]);
  let openMenuId: number | null = $state(null);
  let nextConditionId = 0;
  let controlsElement: HTMLDivElement | null = $state(null);
  let menuTooltip: { text: string; left: number; top: number; above: boolean } | null = $state(null);

  /** Renders outside the scrollable menu so descriptions are never clipped by its overflow boundary. */
  const showMenuTooltip = (event: MouseEvent | FocusEvent, text: string | undefined) => {
    if (!text) return;
    const bounds = (event.currentTarget as HTMLElement).getBoundingClientRect();
    const above = window.innerHeight - bounds.bottom < 96;
    menuTooltip = {
      text,
      left: Math.min(Math.max(12, bounds.left), Math.max(12, window.innerWidth - 230)),
      top: above ? bounds.top - 8 : bounds.bottom + 8,
      above
    };
  };
  const hideMenuTooltip = () => (menuTooltip = null);
  /** Every dimension's sort toggle, kept independent of the conditions array so it survives a tag screen closing
   *  without any value picked. Applied in careerSortCriteria's declared order whenever more than one is active. */
  let sortDirections: Record<string, SortToggleState> = $state(Object.fromEntries(careerSortCriteria.map((criterion) => [criterion.identifier, 'none' as SortToggleState])));
  const cycleSortDirection = (criterionIdentifier: string) => {
    const current = sortDirections[criterionIdentifier] ?? 'none';
    const next: SortToggleState = current === 'none' ? 'asc' : current === 'asc' ? 'desc' : 'none';
    sortDirections = { ...sortDirections, [criterionIdentifier]: next };
  };
  const clearSortDirection = (criterionIdentifier: string) => {
    sortDirections = { ...sortDirections, [criterionIdentifier]: 'none' };
  };

  /** The tab bar switches which sections the list below is built from; filters and sorts carry across. */
  let activeTab: CareerTabIdentifier = $state('history');
  let careersSectionElement: HTMLElement | null = $state(null);
  let careersHeaderElement: HTMLDivElement | null = $state(null);
  let isHeaderStuck = $state(false);
  let tabSections = $derived(getCareerSections(activeTab).map((section) => ({
    ...section,
    items: section.items.map((item) => item.id in hiddenOverrides ? { ...item, hidden: hiddenOverrides[item.id] } : item)
  })));
  let activeTabLabel = $derived(careerTabs.find((tab) => tab.identifier === activeTab)?.label() ?? '');
  let allItemIds = $derived(tabSections.flatMap((section) => section.items.map((item) => item.id)));
  /* Roving focus, as a tablist asks for: the arrow keys move between tabs rather than the Tab key. */
  const onTabKeyDown = (event: KeyboardEvent, index: number) => {
    const step = event.key === 'ArrowRight' ? 1 : event.key === 'ArrowLeft' ? -1 : 0;
    if (!step) return;
    event.preventDefault();
    const next = careerTabs[(index + step + careerTabs.length) % careerTabs.length];
    activeTab = next.identifier;
    document.getElementById(`career-tab-${next.identifier}`)?.focus();
  };
  let selectedTagIdentifiers = $derived(conditions.filter((condition) => condition.kind && condition.kind !== 'period').flatMap((condition) => condition.tagIdentifiers ?? []));
  let periodFilter = $derived(conditions.find((condition) => condition.kind === 'period' && condition.periodStart && condition.periodEnd));
  let sortConditions = $derived(
    careerSortCriteria
      .filter((criterion) => (sortDirections[criterion.identifier] ?? 'none') !== 'none')
      .map((criterion) => ({
        criterionIdentifier: criterion.identifier,
        direction: sortDirections[criterion.identifier] as SortDirection
      }))
  );
  let activeSortCriteria = $derived(careerSortCriteria.filter((criterion) => (sortDirections[criterion.identifier] ?? 'none') !== 'none'));
  let orderById = $derived(new Map(sortCareerItemIds(sortConditions).map((id, index) => [id, index])));
  /** Hidden entries remain excluded from filter and sort results unless explicitly included. */
  let excludeHiddenItems = $state(true);
  let includeHiddenItems = $derived(!excludeHiddenItems);
  /** Section headings only make sense while the list is laid out section by section. */
  let isFiltered = $derived(selectedTagIdentifiers.length > 0 || sortConditions.length > 0 || Boolean(periodFilter) || includeHiddenItems);
  let visibleItems = $derived(tabSections.flatMap((section) => section.items).filter((item) => includeHiddenItems || !item.hidden));
  let shownCount = $derived(visibleItems.filter((item) => matchesCareerTags(item.id, selectedTagIdentifiers) && matchesCareerPeriod(item.id, periodFilter?.periodStart, periodFilter?.periodEnd)).length);

  /** Hidden entries are collected below the active tab until the visitor asks to see them. */
  let hiddenItemsExpandedByTab: Record<CareerTabIdentifier, boolean> = $state({
    history: false,
    works: false
  });
  let hiddenItemsExpanded = $derived(hiddenItemsExpandedByTab[activeTab]);
  const toggleHiddenItems = () => {
    hiddenItemsExpandedByTab = { ...hiddenItemsExpandedByTab, [activeTab]: !hiddenItemsExpanded };
  };
  let hiddenItems = $derived(tabSections.flatMap((section) => section.items.filter((item) => item.hidden)));
  let hiddenSections = $derived(tabSections.filter((section) => section.items.some((item) => item.hidden)));

  /** A condition only becomes a real filter once it has a value; a bare category pick doesn't count yet. */
  const isConditionComplete = (condition: Condition) => (condition.kind === 'period' ? Boolean(condition.periodStart && condition.periodEnd) : Boolean(condition.kind) && (condition.tagIdentifiers?.length ?? 0) > 0);
  /** Categories left for a condition, excluding what the other conditions already use. */
  const availableCategoriesFor = (conditionId: number) => {
    const usedKinds = conditions.filter((condition) => condition.id !== conditionId && condition.kind).map((condition) => condition.kind);
    return tagScreenCategories.filter((category) => !usedKinds.includes(category.kind));
  };
  let canAddCondition = $derived(availableCategoriesFor(-1).length > 0);

  const addCondition = () => {
    const condition: Condition = { id: nextConditionId++ };
    conditions = [...conditions.filter(isConditionComplete), condition];
    openMenuId = condition.id;
  };
  /** Pick which category a condition's tag screen filters by. The menu stays open for the value/date step. */
  const pickCategory = (conditionId: number, kind: CareerConditionKind) => {
    conditions = conditions.map((condition) => (condition.id === conditionId ? (kind === 'period' ? { ...condition, kind, periodStart: undefined, periodEnd: undefined } : { ...condition, kind, tagIdentifiers: [] }) : condition));
  };
  /** Toggle one value of the chosen category in or out. */
  const toggleTagValue = (conditionId: number, tagIdentifier: string) => {
    conditions = conditions.map((condition) => {
      if (condition.id !== conditionId) return condition;
      const current = condition.tagIdentifiers ?? [];
      const next = current.includes(tagIdentifier) ? current.filter((identifier) => identifier !== tagIdentifier) : [...current, tagIdentifier];
      return { ...condition, tagIdentifiers: next };
    });
  };
  const parseDateInputValue = (value: string): CareerDate | undefined => {
    const [year, month, day] = value.split('-').map(Number);
    return year && month && day ? { year, month, day } : undefined;
  };
  const formatDateInputValue = (date?: CareerDate): string => (date ? `${String(date.year).padStart(4, '0')}-${String(date.month ?? 1).padStart(2, '0')}-${String(date.day ?? 1).padStart(2, '0')}` : '');
  const setPeriodBound = (conditionId: number, bound: 'periodStart' | 'periodEnd', value: string) => {
    const date = parseDateInputValue(value);
    conditions = conditions.map((condition) => (condition.id === conditionId ? { ...condition, [bound]: date } : condition));
  };
  const removeCondition = (conditionId: number) => {
    conditions = conditions.filter((condition) => condition.id !== conditionId);
    if (openMenuId === conditionId) openMenuId = null;
  };
  /** Clears every filter condition and every dimension's sort toggle, since the latter lives independently. */
  const resetAll = () => {
    conditions = [];
    openMenuId = null;
    sortDirections = Object.fromEntries(careerSortCriteria.map((criterion) => [criterion.identifier, 'none' as SortToggleState]));
    excludeHiddenItems = true;
  };
  /** Conditions left without a value when their menu goes away never became a filter. */
  const closeMenu = () => {
    conditions = conditions.filter(isConditionComplete);
    openMenuId = null;
  };
  const toggleMenu = (conditionId: number) => {
    if (openMenuId === conditionId) closeMenu();
    else {
      conditions = conditions.filter(isConditionComplete);
      openMenuId = conditionId;
    }
  };
  /* Dismissing on press would fire the moment a touch scroll begins, so an outside press only
     arms the dismissal and the release decides: a tap closes the menu, a drag was a scroll. */
  const tapSlop = 10;
  let outsidePointer: { id: number; x: number; y: number } | null = null;
  const onWindowPointerDown = (event: PointerEvent) => {
    if (openMenuId === null) return;
    outsidePointer = controlsElement?.contains(event.target as Node) ? null : { id: event.pointerId, x: event.clientX, y: event.clientY };
  };
  const onWindowPointerUp = (event: PointerEvent) => {
    if (!outsidePointer || event.pointerId !== outsidePointer.id) return;
    const travelled = Math.hypot(event.clientX - outsidePointer.x, event.clientY - outsidePointer.y);
    outsidePointer = null;
    if (openMenuId !== null && travelled <= tapSlop) closeMenu();
  };
  /* The browser cancels the pointer once it takes the gesture over for scrolling. */
  const abandonOutsidePointer = () => {
    outsidePointer = null;
  };
  const onWindowKeyDown = (event: KeyboardEvent) => {
    if (event.key === 'Escape' && openMenuId !== null) closeMenu();
  };
  const onWindowScroll = () => {
    abandonOutsidePointer();
    if (!careersSectionElement || !careersHeaderElement) return;
    const sectionBounds = careersSectionElement.getBoundingClientRect();
    const headerBounds = careersHeaderElement.getBoundingClientRect();
    isHeaderStuck = headerBounds.top <= 0 && sectionBounds.bottom > headerBounds.height;
  };
  onMount(() => {
    // `opened=projects` is the public URL name for the internally named works tab.
    // Any missing or unsupported value deliberately retains history as the default.
    if (new URLSearchParams(window.location.search).get('opened') === 'projects') activeTab = 'works';
    onWindowScroll();
  });
  $effect(() => {
    activeTab = opened === 'projects' ? 'works' : 'history';
  });
  const sortToggleGlyph = (state: SortToggleState) => (state === 'asc' ? '↑' : state === 'desc' ? '↓' : '•');
  const formatCareerDate = (date?: CareerDate): string => (date ? `${date.year}.${String(date.month ?? 1).padStart(2, '0')}.${String(date.day ?? 1).padStart(2, '0')}` : '');
  const conditionTags = (condition: Condition): CareerTag[] => (condition.kind && condition.kind !== 'period' ? (condition.tagIdentifiers ?? []).map((identifier) => careerTags.find((tag) => tag.identifier === identifier)).filter((tag): tag is CareerTag => Boolean(tag)) : []);
  /** The category name alone while no value is picked yet, then "<category>: <values>" once some are. */
  const conditionLabel = (condition: Condition): string => {
    if (!condition.kind) return '';
    const categoryLabel = categoryOf(condition.kind)?.label() ?? '';
    if (condition.kind === 'period') {
      return condition.periodStart && condition.periodEnd ? `${categoryLabel}: ${formatCareerDate(condition.periodStart)} ~ ${formatCareerDate(condition.periodEnd)}` : categoryLabel;
    }
    const tags = conditionTags(condition);
    return tags.length ? `${categoryLabel}: ${tags.map((tag) => tag.displayName()).join(', ')}` : categoryLabel;
  };

  setContext('career-list-controls', {
    get selectedTagIdentifiers() {
      return selectedTagIdentifiers;
    },
    get periodFilter() {
      return periodFilter ? { start: periodFilter.periodStart, end: periodFilter.periodEnd } : undefined;
    },
    get isFiltered() {
      return isFiltered;
    },
    orderOf: (id: string) => orderById.get(id) ?? 0
  });

  /** A project tag's click asks to open its target item's popup; if that item lives on the other tab,
   *  switch tabs first so the item mounts, then the item itself notices the pending id and opens. */
  let popupRequestId: string | null = $state(null);
  setContext('career-popup-request', {
    get pendingId() {
      return popupRequestId;
    },
    request: (id: string) => {
      activeTab = getCareerSection(id)?.tab ?? 'history';
      popupRequestId = id;
    },
    clear: () => {
      popupRequestId = null;
    }
  });
</script>

<style>
  section.careers {
    display: flex;
    flex-direction: column;
    gap: 1.2em;
  }

  .last-update {
    font-size: 0.8em;
    font-style: italic;
  }

  .careers-header {
    position: sticky;
    top: 0;
    z-index: 4;
    isolation: isolate;
    background-color: transparent;
  }
  .careers-header::before {
    position: absolute;
    z-index: -1;
    top: 0;
    bottom: 0;
    left: 50%;
    width: 100vw;
    content: '';
    background-color: var(--base-bg-color);
    opacity: 0;
    pointer-events: none;
    transform: translateX(-50%);
    transition: opacity 0.25s ease;
  }
  .careers-header.stuck {
    background-color: transparent;
  }
  .careers-header.stuck::before {
    opacity: 1;
  }

  ul.note {
    margin: 0.7em 0;
    padding-left: 0.5em;
  }

  .career-tabs {
    display: flex;
    flex-wrap: wrap;
    gap: 0.2em;
    margin: 1em 0 0;
    border-bottom: 1px solid var(--base-bg-color-darker);
  }
  .career-tab {
    /* Sits on the tablist's own bottom rule, so the selected tab can paint over it. */
    margin-bottom: -1px;
    padding: 0.5em 0.9em;
    border: none;
    border-bottom: 2px solid transparent;
    background: transparent;
    color: var(--base-fg-color-brighter);
    font: inherit;
    font-size: 0.85em;
    font-weight: 700;
    letter-spacing: 0.04em;
    line-height: 1;
    cursor: pointer;
    transition:
      color 0.15s,
      border-color 0.15s;
  }
  .career-tab:hover,
  .career-tab:focus-visible {
    color: var(--base-fg-color);
  }
  .career-tab[aria-selected='true'] {
    color: var(--base-fg-color);
    border-bottom-color: var(--base-fg-color);
  }

  /* Carries the section rhythm the sections had as direct children of the careers section. */
  .careers-panel {
    display: flex;
    flex-direction: column;
    gap: 1.2em;
  }

  .career-controls {
    display: flex;
    flex-direction: column;
    align-items: flex-end;
    gap: 0.4em;
    margin: 1em 0 0.3em;
    text-align: right;
  }
  .control-row {
    display: flex;
    flex-wrap: wrap;
    justify-content: flex-end;
    align-items: center;
    gap: 0.35em 0.5em;
  }
  .control-label {
    font-size: 0.75em;
    font-weight: 700;
    letter-spacing: 0.04em;
    text-transform: uppercase;
    color: var(--base-fg-color-brighter);
  }

  .condition {
    position: relative;
    display: inline-flex;
    align-items: center;
    border: 1px solid var(--base-bg-color-darker);
    border-radius: 999px;
    font-size: 0.75em;
    line-height: 1;
  }
  .condition.pending {
    border-style: dashed;
    border-color: var(--base-fg-color-brighter);
    min-width: 5em;
    min-height: 2.2em;
  }
  .condition.filled {
    border-color: transparent;
    background-color: var(--base-bg-color-dark);
    color: var(--base-fg-color);
  }
  .condition-label,
  .condition-remove,
  .add-condition,
  .reset-button {
    border: none;
    background: transparent;
    color: inherit;
    font: inherit;
    line-height: 1;
    cursor: pointer;
  }
  .condition-label {
    padding: 0.6em 0.3em 0.6em 0.8em;
    border-radius: 999px 0 0 999px;
  }
  .condition.pending .condition-label {
    flex: 1;
    padding-right: 0.8em;
    border-radius: 999px;
  }
  .condition-remove {
    padding: 0.6em 0.7em 0.6em 0.3em;
    border-radius: 0 999px 999px 0;
    opacity: 0.65;
  }
  .condition-remove:hover {
    opacity: 1;
  }

  .add-condition,
  .reset-button {
    border: 1px solid var(--base-bg-color-darker);
    border-radius: 999px;
    color: var(--base-fg-color-brighter);
    font-size: 0.75em;
    padding: 0.6em 0.8em;
    transition:
      border-color 0.15s,
      color 0.15s;
  }
  .add-condition {
    font-weight: 700;
    padding: 0.6em 0.85em;
  }
  .add-condition:hover:not(:disabled),
  .reset-button:hover {
    border-color: var(--base-fg-color-brighter);
    color: var(--base-fg-color);
  }
  .add-condition:disabled {
    cursor: default;
    opacity: 0.4;
  }

  .condition-menu {
    position: absolute;
    z-index: 6;
    top: calc(100% + 0.4em);
    right: 0;
    min-width: 13em;
    max-height: 60vh;
    overflow-y: auto;
    padding: 0.4em;
    text-align: left;
    /* The chip carries its tag colour, so the menu restores the page's own. */
    color: var(--base-fg-color);
    font-weight: normal;
    background: var(--base-bg-color);
    border: 1px solid var(--base-bg-color-darker);
    border-radius: 6px;
    box-shadow: 0 4px 14px rgba(0, 0, 0, 0.12);
  }
  .menu-group-label {
    margin: 1.1em 0.5em 0.5em;
    font-size: 0.9em;
    font-weight: 700;
    letter-spacing: 0.04em;
    text-transform: uppercase;
    color: var(--base-fg-color-brighter);
  }
  .menu-group-label:first-child {
    margin-top: 0.5em;
  }
  .menu-item {
    display: flex;
    align-items: center;
    gap: 0.5em;
    width: 100%;
    box-sizing: border-box;
    /* Keeps the sort rows, whose arrow buttons are taller than a line of text, on the tag rows' rhythm. */
    min-height: 2em;
    padding: 0.5em;
    border: none;
    border-radius: 4px;
    background: transparent;
    color: inherit;
    font: inherit;
    font-size: 1em;
    line-height: 1;
    text-align: left;
  }
  button.menu-item,
  label.menu-item {
    cursor: pointer;
  }
  button.menu-item:hover,
  button.menu-item:focus-visible,
  label.menu-item:hover,
  label.menu-item:focus-within {
    background-color: var(--base-bg-color-dark);
  }
  .menu-swatch {
    width: 0.8em;
    height: 0.8em;
    border-radius: 999px;
    flex: none;
  }
  .menu-item-sort-toggle {
    padding-block: 0.2em;
    /* Not a button itself, so it never gets the hover fill the pickable rows do. */
    cursor: default;
  }
  .menu-item-sort-toggle-label {
    font-weight: 700;
  }
  .sort-toggle-group {
    display: flex;
    align-items: center;
    gap: 0.35em;
    /* Absorbs the row's leftover space, so this group sits flush right of the category label. */
    margin-left: auto;
  }
  .menu-tooltip {
    position: fixed;
    box-sizing: border-box;
    width: max-content;
    max-width: min(16em, calc(100vw - 24px));
    padding: 0.55em 0.75em;
    border-radius: 6px;
    background: var(--base-fg-color);
    color: var(--base-bg-color);
    font-size: 0.85em;
    line-height: 1.45;
    white-space: normal;
    box-shadow: 0 6px 16px rgba(0, 0, 0, 0.2);
    pointer-events: none;
    z-index: 40;
  }
  .menu-tooltip.above {
    transform: translateY(-100%);
  }
  .menu-tooltip::before {
    content: '';
    position: absolute;
    left: 1em;
    top: -10px;
    border: 5px solid transparent;
    border-bottom-color: var(--base-fg-color);
  }
  .menu-tooltip.above::before {
    top: auto;
    bottom: -10px;
    border-top-color: var(--base-fg-color);
    border-bottom-color: transparent;
  }
  .sort-toggle-hint {
    font-size: 0.9em;
    color: var(--base-fg-color-brighter);
  }
  .sort-direction-toggle {
    border: 1px solid var(--base-hero-fg-color);
    border-radius: 4px;
    background: transparent;
    color: var(--base-fg-color-brighter);
    font: inherit;
    line-height: 1;
    padding: 0.2em 0.5em;
    cursor: pointer;
  }
  .sort-direction-toggle:hover,
  .sort-direction-toggle:focus-visible {
    border-color: var(--base-bg-color-darker);
    color: var(--base-fg-color);
  }
  .menu-divider {
    margin: 0.4em 0.2em 0.6em;
    border: none;
    border-top: 1px solid var(--base-bg-color-darker);
  }
  .menu-item-checkbox input[type='checkbox'] {
    flex: none;
  }
  .menu-item-period {
    display: flex;
    flex-direction: column;
    gap: 0.6em;
    cursor: default;
  }
  .period-field {
    display: flex;
    flex-direction: column;
    gap: 0.25em;
    font-size: 0.85em;
  }
  .period-field-label {
    font-size: 0.85em;
    color: var(--base-fg-color-brighter);
  }
  .period-field input[type='date'] {
    font: inherit;
    color: inherit;
    background: var(--base-bg-color);
    border: 1px solid var(--base-bg-color-darker);
    border-radius: 4px;
    padding: 0.35em 0.5em;
  }

  .result-count {
    font-size: 0.75em;
    font-style: italic;
    color: var(--base-fg-color-brighter);
  }
  .hidden-items-option input[type='checkbox'] {
    margin: 0;
  }

  .section-toggle {
    display: block;
    margin: 0.6em 0 0;
    border: 1px dashed var(--base-bg-color-darker);
    border-radius: 999px;
    background: transparent;
    color: var(--base-fg-color-brighter);
    font: inherit;
    font-size: 0.75em;
    line-height: 1;
    padding: 0.6em 0.9em;
    cursor: pointer;
    transition:
      border-color 0.15s,
      color 0.15s;
  }
  .hidden-sections {
    margin-top: 1.2em;
  }
  .hidden-sections .careers-content + .careers-content {
    margin-top: 1.2em;
  }
  .section-toggle:hover,
  .section-toggle:focus-visible {
    border-color: var(--base-fg-color-brighter);
    color: var(--base-fg-color);
  }

  /*
   * Sorting flattens the sections into a single flex list, where the item margins stop
   * collapsing and the section gap piles on top of them. Drop the margins and let a matching
   * flex gap carry the same rhythm the items have inside a section.
   */
  section.careers.list-view {
    gap: 0.3em;
  }
  .list-view :global(.career-entry .career-item) {
    margin: 0;
  }
  .list-view .careers-header {
    margin-bottom: 0.9em;
  } /* .9em + the .3em gap = the 1.2em of the default view */
  .list-view .careers-panel,
  .list-view .careers-content {
    display: contents;
  }
  .list-view .careers-content > h3 {
    display: none;
  }
  /* `display: contents` makes this note a flex item alongside sorted entries. Keep it below every entry. */
  .list-view .github-projects-note {
    order: 2147483647;
  }
  .list-view :global(.career-entry) {
    width: 100%;
  }
  /* A section left with nothing to show still needs its toggle reachable when hidden items are tucked behind it. */
  .careers-content:not(:has(:global(.career-entry:not([hidden])))):not(:has(.section-toggle)) {
    display: none;
  }

  @media (max-width: 600px) {
    .career-controls {
      align-items: flex-start;
      text-align: left;
    }
    .control-row {
      justify-content: flex-start;
    }
    .condition-menu {
      right: auto;
      left: 0;
    }
  }
</style>

<svelte:window onpointerdown={onWindowPointerDown} onpointerup={onWindowPointerUp} onpointercancel={abandonOutsidePointer} onscroll={onWindowScroll} onkeydown={onWindowKeyDown} />

<section bind:this={careersSectionElement} class:list-view={isFiltered} class="careers">
  <div bind:this={careersHeaderElement} class:stuck={isHeaderStuck} class="careers-header">
    <SectionHeader>{activeTabLabel}</SectionHeader>
    <p class="last-update">{m.last_update({ date: '2026-08-30' })}</p>
    <div class="career-tabs" role="tablist" aria-label={m.careers()}>
      {#each careerTabs as tab, index (tab.identifier)}
        <button class="career-tab" type="button" role="tab" id={`career-tab-${tab.identifier}`} aria-selected={activeTab === tab.identifier} aria-controls="career-tab-panel" tabindex={activeTab === tab.identifier ? 0 : -1} onclick={() => (activeTab = tab.identifier)} onkeydown={(event) => onTabKeyDown(event, index)}>{tab.label()}</button>
      {/each}
    </div>
    <div class="career-controls" bind:this={controlsElement} aria-label={m.career_filter_controls()}>
      <div class="control-row">
        <span class="control-label">{m.career_filter_label()}</span>
        {#each conditions as condition (condition.id)}
          {@const hasValue = isConditionComplete(condition)}
          <span class="condition" class:pending={!hasValue} class:filled={hasValue}>
            <button class="condition-label" type="button" aria-haspopup="menu" aria-expanded={openMenuId === condition.id} aria-label={condition.kind ? undefined : m.career_filter_choose()} title={condition.kind ? categoryOf(condition.kind)?.label() : undefined} onclick={() => toggleMenu(condition.id)}>{conditionLabel(condition)}</button>
            {#if hasValue}
              <button class="condition-remove" type="button" aria-label={m.career_filter_remove()} onclick={() => removeCondition(condition.id)}>×</button>
            {/if}
            {#if openMenuId === condition.id}
              <div class="condition-menu" role="menu" aria-label={m.career_filter_choose()} onscroll={hideMenuTooltip}>
                {#if !condition.kind}
                  <!-- Step 1: pick which dimension this tag screen filters by. -->
                  <p class="menu-group-label">{m.career_filter_label()}</p>
                  {#each availableCategoriesFor(condition.id) as category (category.kind)}
                    <button class="menu-item" type="button" role="menuitem" onclick={() => pickCategory(condition.id, category.kind)}>
                      {category.label()}
                    </button>
                  {/each}
                {:else}
                  <!-- Step 2: the tag screen for the chosen dimension — its own sort toggle above a divider,
                       then either a checkbox list of values (section/topic/era) or a date range (period). -->
                  {@const category = categoryOf(condition.kind)}
                  {@const sortState = sortDirections[condition.kind] ?? 'none'}
                  {@const sortTooltip = sortState === 'asc' ? m.career_sort_ascending_tooltip() : sortState === 'desc' ? m.career_sort_descending_tooltip() : m.career_sort_default_tooltip()}
                  <div class="menu-item menu-item-sort-toggle" role="group" aria-label={category?.label()}>
                    <span class="menu-item-sort-toggle-label">{category?.label()}</span>
                    <span class="sort-toggle-group">
                      <span class="sort-toggle-hint">{m.career_sort()}:</span>
                      <button class="sort-direction-toggle" type="button" aria-label={m.career_sort_flip_direction()} onmouseenter={(event) => showMenuTooltip(event, sortTooltip)} onmouseleave={hideMenuTooltip} onfocus={(event) => showMenuTooltip(event, sortTooltip)} onblur={hideMenuTooltip} onclick={() => cycleSortDirection(condition.kind ?? '')}>{sortToggleGlyph(sortState)}</button>
                    </span>
                  </div>
                  {#if condition.kind === 'period'}
                    <div class="menu-item menu-item-period">
                      <label class="period-field">
                        <span class="period-field-label">{m.career_period_start()}</span>
                        <input type="date" value={formatDateInputValue(condition.periodStart)} onchange={(event) => setPeriodBound(condition.id, 'periodStart', event.currentTarget.value)} />
                      </label>
                      <label class="period-field">
                        <span class="period-field-label">{m.career_period_end()}</span>
                        <input type="date" value={formatDateInputValue(condition.periodEnd)} onchange={(event) => setPeriodBound(condition.id, 'periodEnd', event.currentTarget.value)} />
                      </label>
                    </div>
                  {:else}
                    {#each category?.kind !== 'period' ? (category?.tags ?? []) : [] as tag (tag.identifier)}
                      <label class="menu-item menu-item-checkbox" onmouseenter={(event) => showMenuTooltip(event, tag.description?.())} onmouseleave={hideMenuTooltip} onfocusin={(event) => showMenuTooltip(event, tag.description?.())} onfocusout={hideMenuTooltip}>
                        <input type="checkbox" checked={(condition.tagIdentifiers ?? []).includes(tag.identifier)} onchange={() => toggleTagValue(condition.id, tag.identifier)} />
                        <span class="menu-swatch" style:background-color={tag.foregroundColor}></span>
                        {tag.displayName()}
                      </label>
                    {/each}
                  {/if}
                {/if}
                <label class="menu-item menu-item-checkbox hidden-items-option">
                  <input type="checkbox" bind:checked={excludeHiddenItems} />
                  {excludeHiddenItems ? m.career_filter_exclude_hidden() : m.career_filter_include_hidden()}
                </label>
              </div>
            {/if}
          </span>
        {/each}
        {#each activeSortCriteria as criterion (criterion.identifier)}
          {@const direction = sortDirections[criterion.identifier] as SortDirection}
          <span class="condition filled">
            <span class="condition-label">{criterion.displayName()} {sortToggleGlyph(direction)}</span>
            <button class="condition-remove" type="button" aria-label={m.career_filter_remove()} onclick={() => clearSortDirection(criterion.identifier)}>×</button>
          </span>
        {/each}
        {#if includeHiddenItems}
          <span class="condition filled">
            <span class="condition-label">{m.career_filter_include_hidden()}</span>
            <button class="condition-remove" type="button" aria-label={m.career_filter_remove()} onclick={() => (excludeHiddenItems = true)}>×</button>
          </span>
        {/if}
        <button class="add-condition" type="button" aria-label={m.career_filter_add()} title={m.career_filter_add()} disabled={!canAddCondition} onclick={addCondition}>+</button>
        {#if isFiltered}
          <button class="reset-button" type="button" onclick={resetAll}>{m.career_filter_reset()}</button>
        {/if}
      </div>
      {#if selectedTagIdentifiers.length || periodFilter}
        <p class="result-count">
          {m.career_filter_result_count({ shown: shownCount, total: allItemIds.length })}
        </p>
      {/if}
    </div>
  </div>
  <div class="careers-panel" id="career-tab-panel" role="tabpanel" aria-labelledby={`career-tab-${activeTab}`}>
    {#each tabSections as section (section.identifier)}
      <div class="careers-content" data-section={section.identifier}>
        <h3>{section.title()}</h3>
        {#each section.items as item (item.id)}
          {#if !item.hidden || (isFiltered && includeHiddenItems)}
            {@const CareerDefinition = careerComponents[item.id]}
            <CareerDefinition />
          {/if}
        {/each}
      </div>
    {/each}
    {#if hiddenItems.length > 0 && !isFiltered}
      <button class="section-toggle" type="button" aria-expanded={hiddenItemsExpanded} onclick={toggleHiddenItems}>{hiddenItemsExpanded ? `− ${m.career_section_hide()}` : `+ ${m.career_section_show_more({ count: hiddenItems.length })}`}</button>
      {#if hiddenItemsExpanded}
        <div class="hidden-sections">
          {#each hiddenSections as section (section.identifier)}
            <div class="careers-content" data-section={section.identifier}>
              <h3>{section.title()}</h3>
              {#each section.items.filter((item) => item.hidden) as item (item.id)}
                {@const CareerDefinition = careerComponents[item.id]}
                <CareerDefinition />
              {/each}
            </div>
          {/each}
        </div>
      {/if}
    {/if}
    <ul class="note github-projects-note">
      <li>
        {m.career_more_projects_github()}
        <ExternalLink href="https://github.com/ShapeLayer?tab=repositories">GitHub</ExternalLink>
      </li>
    </ul>
  </div>
  {#if menuTooltip}
    <div class="menu-tooltip" class:above={menuTooltip.above} role="tooltip" style:left={`${menuTooltip.left}px`} style:top={`${menuTooltip.top}px`}>
      {menuTooltip.text}
    </div>
  {/if}
</section>

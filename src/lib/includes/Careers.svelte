<script lang="ts">
  import type { Component } from 'svelte';
  import { setContext } from 'svelte';
  import CareerAchievementCnuAlgorithmContest6th from '$lib/components/definitions/careers/CareerAchievementCnuAlgorithmContest6th.svelte';
  import CareerAchievementCnuStartup21 from '$lib/components/definitions/careers/CareerAchievementCnuStartup21.svelte';
  import CareerAchievementCnuSwClub24 from '$lib/components/definitions/careers/CareerAchievementCnuSwClub24.svelte';
  import CareerAchievementIcpc21 from '$lib/components/definitions/careers/CareerAchievementIcpc21.svelte';
  import CareerAchievementScholarshipMiraeAsset33 from '$lib/components/definitions/careers/CareerAchievementScholarshipMiraeAsset33.svelte';
  import CareerActivityCnuClubPimm from '$lib/components/definitions/careers/CareerActivityCnuClubPimm.svelte';
  import CareerActivityCnuClubStolio from '$lib/components/definitions/careers/CareerActivityCnuClubStolio.svelte';
  import CareerActivityGwangjuSwFestival19 from '$lib/components/definitions/careers/CareerActivityGwangjuSwFestival19.svelte';
  import CareerAlgorithmContestGist from '$lib/components/definitions/careers/CareerAlgorithmContestGist.svelte';
  import CareerAlgorithmContestPimm23 from '$lib/components/definitions/careers/CareerAlgorithmContestPimm23.svelte';
  import CareerAlgorithmContestPimm24a from '$lib/components/definitions/careers/CareerAlgorithmContestPimm24a.svelte';
  import CareerAlgorithmContestPimm24b from '$lib/components/definitions/careers/CareerAlgorithmContestPimm24b.svelte';
  import CareerAlgorithmContestPimm25a from '$lib/components/definitions/careers/CareerAlgorithmContestPimm25a.svelte';
  import CareerCertificationAwsCcp from '$lib/components/definitions/careers/CareerCertificationAwsCcp.svelte';
  import CareerCertificationAwsDa from '$lib/components/definitions/careers/CareerCertificationAwsDa.svelte';
  import CareerCertificationCosPro from '$lib/components/definitions/careers/CareerCertificationCosPro.svelte';
  import CareerCertificationJlpt from '$lib/components/definitions/careers/CareerCertificationJlpt.svelte';
  import CareerCertificationNetworkManager from '$lib/components/definitions/careers/CareerCertificationNetworkManager.svelte';
  import CareerCertificationSqld from '$lib/components/definitions/careers/CareerCertificationSqld.svelte';
  import CareerCertificationToeic from '$lib/components/definitions/careers/CareerCertificationToeic.svelte';
  import CareerCertificationTopcit from '$lib/components/definitions/careers/CareerCertificationTopcit.svelte';
  import CareerEduBachelorCnuCe from '$lib/components/definitions/careers/CareerEduBachelorCnuCe.svelte';
  import CareerEduBachelorCnuJP from '$lib/components/definitions/careers/CareerEduBachelorCnuJP.svelte';
  import CareerEduBachelorExchangeSaga from '$lib/components/definitions/careers/CareerEduBachelorExchangeSaga.svelte';
  import CareerEduBachelorUnlvShortTerm from '$lib/components/definitions/careers/CareerEduBachelorUnlvShortTerm.svelte';
  import CareerEduHighSchoolSdok from '$lib/components/definitions/careers/CareerEduHighSchoolSdok.svelte';
  import CareerPaperSmartMedia21 from '$lib/components/definitions/careers/CareerPaperSmartMedia21.svelte';
  import CareerPaperSmartMedia22 from '$lib/components/definitions/careers/CareerPaperSmartMedia22.svelte';
  import CareerProjectHccc22Page from '$lib/components/definitions/careers/CareerProjectHccc22Page.svelte';
  import CareerProjectIwfcv22Page from '$lib/components/definitions/careers/CareerProjectIwfcv22Page.svelte';
  import CareerProjectPrefixGenerator from '$lib/components/definitions/careers/CareerProjectPrefixGenerator.svelte';
  import CareerProjectSignLanguageClient from '$lib/components/definitions/careers/CareerProjectSignLanguageClient.svelte';
  import CareerProjectZodiacComplex from '$lib/components/definitions/careers/CareerProjectZodiacComplex.svelte';
  import CareerWorkCnuUccWorkingScholarship from '$lib/components/definitions/careers/CareerWorkCnuUccWorkingScholarship.svelte';
  import CareerWorkIeLab from '$lib/components/definitions/careers/CareerWorkIeLab.svelte';
  import CareerWorkImageLab from '$lib/components/definitions/careers/CareerWorkImageLab.svelte';
  import CareerWorkJamcodingLecturer from '$lib/components/definitions/careers/CareerWorkJamcodingLecturer.svelte';
  import CareerWorkRoka from '$lib/components/definitions/careers/CareerWorkRoka.svelte';
  import ExternalLink from '$lib/components/ExternalLink.svelte';
  import SectionHeader from '$lib/components/SectionHeader.svelte';
  import { m } from '$lib/paraglide/messages';
  import {
    careerSections,
    careerSortCriteria,
    careerTags,
    getCareerSortCriterion,
    matchesCareerTags,
    sectionTags,
    sortCareerItemIds,
    topicTags,
    type CareerSortCriterion,
    type CareerTag,
    type SortDirection
  } from '$lib/models/careers';

  /** Career item id to the component that defines it. */
  const careerComponents: Record<string, Component> = {
    'edu-bachelor-chonnam-natl-univ-ce': CareerEduBachelorCnuCe,
    'edu-bachelor-chonnam-natl-univ-jp': CareerEduBachelorCnuJP,
    'edu-highschool-sdok': CareerEduHighSchoolSdok,
    'edu-bachelor-unlv-short-term': CareerEduBachelorUnlvShortTerm,
    'edu-bachelor-exchange-sage': CareerEduBachelorExchangeSaga,
    'work-imagelab': CareerWorkImageLab,
    'work-roka': CareerWorkRoka,
    'work-ielab': CareerWorkIeLab,
    'work-cnu-ucc-working-scholarship': CareerWorkCnuUccWorkingScholarship,
    'work-jamcoding-lecturer': CareerWorkJamcodingLecturer,
    'career-project-prefix-gen': CareerProjectPrefixGenerator,
    'proejct-sign-language-client': CareerProjectSignLanguageClient,
    'project-hccc22-page': CareerProjectHccc22Page,
    'project-iwfcv22-page': CareerProjectIwfcv22Page,
    'project-zodiac-complex': CareerProjectZodiacComplex,
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
    'algorithm-contest-pimm-23': CareerAlgorithmContestPimm23,
    'algorithm-contest-pimm-24a': CareerAlgorithmContestPimm24a,
    'algorithm-contest-gist': CareerAlgorithmContestGist,
    'algorithm-contest-pimm-24b': CareerAlgorithmContestPimm24b,
    'algorithm-contest-pimm-25a': CareerAlgorithmContestPimm25a,
    'certification-toeic': CareerCertificationToeic,
    'certification-jlpt': CareerCertificationJlpt,
    'certification-sqld': CareerCertificationSqld,
    'certification-aws-ccp': CareerCertificationAwsCcp,
    'certification-aws-da': CareerCertificationAwsDa,
    'certification-cos-pro': CareerCertificationCosPro,
    'certification-network-manager': CareerCertificationNetworkManager,
    'certification-topcit': CareerCertificationTopcit
  };
  /** The note rendered at the end of a section, if it has one. */
  const sectionsWithGithubNote = ['project'];

  type ConditionType = 'tag' | 'sort';
  /** A filter or sort condition added through the + button. A condition without a value is still being picked. */
  type Condition = { id: number; type?: ConditionType; value?: string; direction?: SortDirection };
  type MenuOption = { type: ConditionType; value: string; label: string; tag?: CareerTag; criterion?: CareerSortCriterion };
  type MenuGroup = { label: string; options: MenuOption[] };

  let conditions: Condition[] = $state([]);
  let openMenuId: number | null = $state(null);
  let nextConditionId = 0;
  let controlsElement: HTMLDivElement | null = $state(null);

  const allItemIds = careerSections.flatMap((section) => section.items.map((item) => item.id));
  let selectedTagIdentifiers = $derived(
    conditions.filter((condition) => condition.type === 'tag' && condition.value).map((condition) => condition.value as string)
  );
  /** Sort conditions stack in the order they were added. */
  let sortConditions = $derived(
    conditions
      .filter((condition) => condition.type === 'sort' && condition.value)
      .map((condition) => ({ criterionIdentifier: condition.value as string, direction: condition.direction ?? 'asc' }))
  );
  let orderById = $derived(new Map(sortCareerItemIds(sortConditions).map((id, index) => [id, index])));
  /** Section headings only make sense while the list is laid out section by section. */
  let isFiltered = $derived(selectedTagIdentifiers.length > 0 || sortConditions.length > 0);
  let shownCount = $derived(allItemIds.filter((id) => matchesCareerTags(id, selectedTagIdentifiers)).length);

  const tagOption = (tag: CareerTag): MenuOption => ({ type: 'tag', value: tag.identifier, label: tag.displayName(), tag });
  /** Options left for a condition, excluding what the other conditions already use. */
  const menuGroupsFor = (conditionId: number): MenuGroup[] => {
    const others = conditions.filter((condition) => condition.id !== conditionId);
    const usedValues = others.map((condition) => condition.value);
    const unused = <T extends { identifier: string }>(entries: T[]) =>
      entries.filter((entry) => !usedValues.includes(entry.identifier));
    return [
      { label: m.career_filter_sections(), options: unused(sectionTags).map(tagOption) },
      { label: m.career_filter_topics(), options: unused(topicTags).map(tagOption) },
      {
        label: m.career_sort(),
        options: unused(careerSortCriteria).map((criterion) => ({
          type: 'sort' as const,
          value: criterion.identifier,
          label: criterion.displayName(),
          criterion
        }))
      }
    ].filter((group) => group.options.length > 0);
  };
  let canAddCondition = $derived(menuGroupsFor(-1).length > 0);

  const addCondition = () => {
    const condition: Condition = { id: nextConditionId++ };
    conditions = [...conditions.filter((existing) => existing.value), condition];
    openMenuId = condition.id;
  };
  const selectOption = (conditionId: number, option: MenuOption, direction?: SortDirection) => {
    conditions = conditions.map((condition) =>
      condition.id === conditionId
        ? {
            ...condition,
            type: option.type,
            value: option.value,
            direction: option.type === 'sort' ? (direction ?? option.criterion?.defaultDirection ?? 'asc') : undefined
          }
        : condition
    );
    openMenuId = null;
  };
  const flipDirection = (conditionId: number) => {
    conditions = conditions.map((condition) =>
      condition.id === conditionId ? { ...condition, direction: condition.direction === 'asc' ? 'desc' : 'asc' } : condition
    );
  };
  const removeCondition = (conditionId: number) => {
    conditions = conditions.filter((condition) => condition.id !== conditionId);
    if (openMenuId === conditionId) openMenuId = null;
  };
  /** Conditions left empty when their menu goes away never became a filter. */
  const closeMenu = () => {
    conditions = conditions.filter((condition) => condition.value);
    openMenuId = null;
  };
  const toggleMenu = (conditionId: number) => {
    if (openMenuId === conditionId) closeMenu();
    else {
      conditions = conditions.filter((condition) => condition.value);
      openMenuId = conditionId;
    }
  };
  const onWindowPointerDown = (event: PointerEvent) => {
    if (openMenuId === null) return;
    if (!controlsElement?.contains(event.target as Node)) closeMenu();
  };
  const onWindowKeyDown = (event: KeyboardEvent) => {
    if (event.key === 'Escape' && openMenuId !== null) closeMenu();
  };
  const directionArrow = (direction: SortDirection) => (direction === 'asc' ? '↑' : '↓');
  const conditionLabel = (condition: Condition) =>
    (condition.type === 'sort'
      ? getCareerSortCriterion(condition.value ?? '')?.displayName()
      : careerTags.find((tag) => tag.identifier === condition.value)?.displayName()) ?? '';
  const conditionTag = (condition: Condition) =>
    condition.type === 'tag' ? careerTags.find((tag) => tag.identifier === condition.value) : undefined;

  setContext('career-list-controls', {
    get selectedTagIdentifiers() { return selectedTagIdentifiers; },
    get isFiltered() { return isFiltered; },
    orderOf: (id: string) => orderById.get(id) ?? 0
  });
</script>

<svelte:window onpointerdown={onWindowPointerDown} onkeydown={onWindowKeyDown} />

<style>
  section.careers {
    display: flex;
    flex-direction: column;
    gap: 1.2em;
  }

  .last-update {
    font-size: .8em;
    font-style: italic;
  }

  ul.note {
    margin: .7em 0;
    padding-left: .5em;
  }

  .career-controls {
    display: flex;
    flex-direction: column;
    align-items: flex-end;
    gap: .4em;
    margin: 1em 0 .3em;
    text-align: right;
  }
  .control-row {
    display: flex;
    flex-wrap: wrap;
    justify-content: flex-end;
    align-items: center;
    gap: .35em .5em;
  }
  .control-label {
    font-size: .75em;
    font-weight: 700;
    letter-spacing: .04em;
    text-transform: uppercase;
    color: var(--base-fg-color-brighter);
  }

  .condition {
    position: relative;
    display: inline-flex;
    align-items: center;
    border: 1px solid var(--base-bg-color-darker);
    border-radius: 999px;
    font-size: .75em;
    line-height: 1;
  }
  .condition.pending {
    border-style: dashed;
    border-color: var(--base-fg-color-brighter);
    min-width: 5em;
    min-height: 2.2em;
  }
  .condition.filled { border-color: transparent; }
  .condition.sort {
    background-color: var(--base-bg-color-dark);
    color: var(--base-fg-color);
  }
  .condition-label, .condition-direction, .condition-remove, .add-condition, .reset-button {
    border: none;
    background: transparent;
    color: inherit;
    font: inherit;
    line-height: 1;
    cursor: pointer;
  }
  .condition-label {
    padding: .6em .3em .6em .8em;
    border-radius: 999px 0 0 999px;
  }
  .condition.pending .condition-label {
    flex: 1;
    padding-right: .8em;
    border-radius: 999px;
  }
  .condition-direction {
    padding: .6em .15em;
    font-size: 1.1em;
  }
  .condition-remove {
    padding: .6em .7em .6em .3em;
    border-radius: 0 999px 999px 0;
    opacity: .65;
  }
  .condition-direction:hover, .condition-remove:hover { opacity: 1; }

  .add-condition, .reset-button {
    border: 1px solid var(--base-bg-color-darker);
    border-radius: 999px;
    color: var(--base-fg-color-brighter);
    font-size: .75em;
    padding: .6em .8em;
    transition: border-color .15s, color .15s;
  }
  .add-condition {
    font-weight: 700;
    padding: .6em .85em;
  }
  .add-condition:hover:not(:disabled), .reset-button:hover {
    border-color: var(--base-fg-color-brighter);
    color: var(--base-fg-color);
  }
  .add-condition:disabled {
    cursor: default;
    opacity: .4;
  }

  .condition-menu {
    position: absolute;
    z-index: 6;
    top: calc(100% + .4em);
    right: 0;
    min-width: 13em;
    max-height: 60vh;
    overflow-y: auto;
    padding: .4em;
    text-align: left;
    /* The chip carries its tag colour, so the menu restores the page's own. */
    color: var(--base-fg-color);
    font-weight: normal;
    background: var(--base-bg-color);
    border: 1px solid var(--base-bg-color-darker);
    border-radius: 6px;
    box-shadow: 0 4px 14px rgba(0, 0, 0, .12);
  }
  .menu-group-label {
    margin: 1.1em .5em .25em;
    font-size: .9em;
    font-weight: 700;
    letter-spacing: .04em;
    text-transform: uppercase;
    color: var(--base-fg-color-brighter);
  }
  .menu-group-label:first-child { margin-top: .2em; }
  .menu-item {
    display: flex;
    align-items: center;
    gap: .5em;
    width: 100%;
    box-sizing: border-box;
    /* Keeps the sort rows, whose arrow buttons are taller than a line of text, on the tag rows' rhythm. */
    min-height: 2em;
    padding: .5em;
    border: none;
    border-radius: 4px;
    background: transparent;
    color: inherit;
    font: inherit;
    font-size: 1em;
    line-height: 1;
    text-align: left;
  }
  button.menu-item { cursor: pointer; }
  button.menu-item:hover, button.menu-item:focus-visible {
    background-color: var(--base-bg-color-dark);
  }
  .menu-swatch {
    width: .8em;
    height: .8em;
    border-radius: 999px;
    flex: none;
  }
  .menu-item-sort {
    justify-content: space-between;
    padding-block: .2em;
  }
  .sort-directions {
    display: inline-flex;
    gap: .15em;
    margin-left: auto;
  }
  .sort-direction {
    border: 1px solid transparent;
    border-radius: 4px;
    background: transparent;
    color: var(--base-fg-color-brighter);
    font: inherit;
    line-height: 1;
    padding: .2em .35em;
    cursor: pointer;
  }
  .sort-direction:hover, .sort-direction:focus-visible {
    border-color: var(--base-bg-color-darker);
    color: var(--base-fg-color);
  }
  .sort-direction[aria-pressed="true"] {
    background-color: var(--base-fg-color);
    color: var(--base-bg-color);
  }

  .result-count {
    font-size: .75em;
    font-style: italic;
    color: var(--base-fg-color-brighter);
  }

  /*
   * Sorting flattens the sections into a single flex list, where the item margins stop
   * collapsing and the section gap piles on top of them. Drop the margins and let a matching
   * flex gap carry the same rhythm the items have inside a section.
   */
  section.careers.list-view { gap: .3em; }
  .list-view :global(.career-entry .career-item) { margin: 0; }
  .list-view .careers-header { margin-bottom: .9em; } /* .9em + the .3em gap = the 1.2em of the default view */
  .list-view .careers-content { display: contents; }
  .list-view .careers-content > h3,
  .list-view .careers-content > .note { display: none; }
  .list-view :global(.career-entry) { width: 100%; }
  .careers-content:not(:has(:global(.career-entry:not([hidden])))) { display: none; }

  @media (max-width: 600px) {
    .career-controls {
      align-items: flex-start;
      text-align: left;
    }
    .control-row { justify-content: flex-start; }
    .condition-menu {
      right: auto;
      left: 0;
    }
  }
</style>

<section class:list-view={isFiltered} class="careers">
  <div class="careers-header">
    <SectionHeader>{m.careers()}</SectionHeader>
    <p class="last-update">{m.last_update({ date: '2026-03-11' })}</p>
    <ul>
      <!--<li>{m.careers_page_link()}</li>-->
      <li>{m.career_detail_popup_guide()}</li>
    </ul>
    <div class="career-controls" bind:this={controlsElement} aria-label={m.career_filter_controls()}>
      <div class="control-row">
        <span class="control-label">{m.career_filter_label()}</span>
        {#each conditions as condition (condition.id)}
          {@const tag = conditionTag(condition)}
          <span
            class="condition"
            class:pending={!condition.value}
            class:filled={Boolean(condition.value)}
            class:sort={condition.type === 'sort'}
            style:background-color={tag?.backgroundColor}
            style:color={tag?.foregroundColor}
          >
            <button
              class="condition-label"
              type="button"
              aria-haspopup="menu"
              aria-expanded={openMenuId === condition.id}
              aria-label={condition.value ? undefined : m.career_filter_choose()}
              title={tag?.description() ?? getCareerSortCriterion(condition.value ?? '')?.description()}
              onclick={() => toggleMenu(condition.id)}
            >{conditionLabel(condition)}</button>
            {#if condition.type === 'sort'}
              <button
                class="condition-direction"
                type="button"
                aria-label={m.career_sort_flip_direction()}
                title={condition.direction === 'asc' ? m.career_sort_ascending() : m.career_sort_descending()}
                onclick={() => flipDirection(condition.id)}
              >{directionArrow(condition.direction ?? 'asc')}</button>
            {/if}
            {#if condition.value}
              <button
                class="condition-remove"
                type="button"
                aria-label={m.career_filter_remove()}
                onclick={() => removeCondition(condition.id)}
              >×</button>
            {/if}
            {#if openMenuId === condition.id}
              <div class="condition-menu" role="menu" aria-label={m.career_filter_choose()}>
                {#each menuGroupsFor(condition.id) as group (group.label)}
                  <p class="menu-group-label">{group.label}</p>
                  {#each group.options as option (option.value)}
                    {#if option.criterion}
                      <div class="menu-item menu-item-sort" role="group" aria-label={option.label}>
                        <span>{option.label}</span>
                        <span class="sort-directions">
                          {#each ['asc', 'desc'] as const as direction (direction)}
                            <button
                              class="sort-direction"
                              type="button"
                              aria-pressed={condition.value === option.value && condition.direction === direction}
                              aria-label={`${option.label} · ${direction === 'asc' ? m.career_sort_ascending() : m.career_sort_descending()}`}
                              title={direction === 'asc' ? m.career_sort_ascending() : m.career_sort_descending()}
                              onclick={() => selectOption(condition.id, option, direction)}
                            >{directionArrow(direction)}</button>
                          {/each}
                        </span>
                      </div>
                    {:else}
                      <button
                        class="menu-item"
                        type="button"
                        role="menuitem"
                        title={option.tag?.description()}
                        onclick={() => selectOption(condition.id, option)}
                      >
                        {#if option.tag}
                          <span class="menu-swatch" style:background-color={option.tag.foregroundColor}></span>
                        {/if}
                        {option.label}
                      </button>
                    {/if}
                  {/each}
                {/each}
              </div>
            {/if}
          </span>
        {/each}
        <button
          class="add-condition"
          type="button"
          aria-label={m.career_filter_add()}
          title={m.career_filter_add()}
          disabled={!canAddCondition}
          onclick={addCondition}
        >+</button>
        {#if isFiltered}
          <button class="reset-button" type="button" onclick={() => { conditions = []; openMenuId = null; }}>{m.career_filter_reset()}</button>
        {/if}
      </div>
      {#if selectedTagIdentifiers.length}
        <p class="result-count">{m.career_filter_result_count({ shown: shownCount, total: allItemIds.length })}</p>
      {/if}
    </div>
  </div>
  {#each careerSections as section (section.identifier)}
    <div class="careers-content" data-section={section.identifier}>
      <h3>{section.title()}</h3>
      {#each section.items as item (item.id)}
        {@const CareerDefinition = careerComponents[item.id]}
        <CareerDefinition />
      {/each}
      {#if sectionsWithGithubNote.includes(section.identifier)}
        <ul class="note">
          <li>
            {m.career_more_projects_github()}
            <ExternalLink href="https://github.com/ShapeLayer?tab=repositories">GitHub</ExternalLink>
          </li>
        </ul>
      {/if}
    </div>
  {/each}
</section>

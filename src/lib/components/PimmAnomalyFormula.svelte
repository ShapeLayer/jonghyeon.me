<script lang="ts">
  import { getLocale } from '$lib/paraglide/runtime';
  import { tick, type Snippet } from 'svelte';

  const locale = getLocale();
  const descriptions =
    locale === 'ko'
      ? {
          previous: 'c₁: 이전 제출',
          next: 'c₂: 이후 제출',
          delta: 'Δc: 이전 제출과 이후 제출 사이의 코드 diff',
          submissions: '어떤 문제에 대한 연이은 두 제출',
          diff: '두 제출 c₁, c₂의 코드 diff 길이',
          time: '두 제출 c₁, c₂의 Unix time 차이',
          language: 'l(c) = 제출 c의 언어',
          score: '두 제출의 이상 징후 점수',
          weightDiff: 'diff 크기의 가중치: wΔc = 10',
          weightTime: '제출 간 시간 차의 가중치: wΔt = 6'
        }
      : locale === 'ja'
        ? {
            previous: 'c₁: 前の提出',
            next: 'c₂: 後の提出',
            delta: 'Δc: 前後の提出間のコード diff',
            submissions: 'ある問題に対する連続した2つの提出',
            diff: '提出 c₁, c₂ のコードの diff の長さ',
            time: '提出 c₁, c₂ の Unix time の差',
            language: 'l(c) = 提出 c の言語',
            score: '2つの提出の異常兆候スコア',
            weightDiff: 'diff サイズの重み: wΔc = 10',
            weightTime: '提出間の時間差の重み: wΔt = 6'
          }
        : {
            previous: 'c₁: Previous submission',
            next: 'c₂: Subsequent submission',
            delta: 'Δc: Code diff between the previous and subsequent submissions',
            submissions: 'Two consecutive submissions for the same problem',
            diff: 'Length of the code diff between c₁ and c₂',
            time: 'Unix time difference between c₁ and c₂',
            language: 'l(c) = language of submission c',
            score: 'Anomaly score for the two submissions',
            weightDiff: 'Diff size weight: wΔc = 10',
            weightTime: 'Time difference weight: wΔt = 6'
          };
  type Term = keyof typeof descriptions | 'languageWeight';
  let active = $state<Term | null>(null);
  let position = $state({ left: 0, top: 0 });
  let below = $state(false);
  let tooltipElement = $state<HTMLDivElement>();
  let anchorElement: HTMLElement;
  async function show(term: Term, event: MouseEvent | FocusEvent) {
    event.stopPropagation();
    anchorElement = event.currentTarget as HTMLElement;
    active = term;
    await tick();
    if (active !== term || !tooltipElement) return;
    const rect = anchorElement.getBoundingClientRect();
    const { width, height } = tooltipElement.getBoundingClientRect();
    below = rect.top < height + 22;
    position = {
      left: Math.max(
        12,
        Math.min(rect.left + rect.width / 2 - width / 2, window.innerWidth - width - 12)
      ),
      top: below ? rect.bottom + 10 : rect.top - 10
    };
  }
  function leave(event: MouseEvent | FocusEvent) {
    event.stopPropagation();
    const target = event.relatedTarget;
    const enclosingTerm =
      target instanceof Element ? target.closest<HTMLElement>('[data-term]') : null;
    if (
      enclosingTerm &&
      event.currentTarget instanceof HTMLElement &&
      event.currentTarget.parentElement?.closest('[data-term]') === enclosingTerm
    ) {
      void show(
        enclosingTerm.dataset.term as Term,
        { currentTarget: enclosingTerm, stopPropagation() {} } as unknown as MouseEvent
      );
    } else {
      active = null;
    }
  }
</script>

{#snippet term(key: Term, label: string, content: Snippet)}
  <span
    role="button"
    tabindex="0"
    data-term={key}
    class="term"
    class:highlight={active === key}
    aria-label={label}
    aria-describedby={active === key ? 'pimm-formula-tooltip' : undefined}
    onmouseenter={(event) => show(key, event)}
    onmouseleave={leave}
    onfocus={(event) => show(key, event)}
    onblur={leave}
    onclick={(event) => show(key, event)}
    onkeydown={(event) => {
      event.stopPropagation();
      if (event.key === 'Escape') active = null;
      if (event.key === 'Enter' || event.key === ' ') {
        event.preventDefault();
        void show(key, event as unknown as MouseEvent);
      }
    }}
  >
    {@render content()}
  </span>
{/snippet}

<svelte:window onscroll={() => (active = null)} onresize={() => (active = null)} />

<div class="formula" aria-label="score(c₁, c₂) = wΔc len(Δc) / (wΔt Δt · wl(c₁, c₂)^1.5)">
  <span class="lhs">
    {@render term('score', descriptions.score, score)}({@render term(
      'submissions',
      descriptions.submissions,
      submissions
    )}) =
  </span>
  <span class="fraction">
    <span class="numerator">
      {@render term('weightDiff', descriptions.weightDiff, weightDiff)}
      {@render term('diff', descriptions.diff, diff)}
    </span>
    <span class="denominator">
      {@render term('weightTime', descriptions.weightTime, weightTime)}
      {@render term('time', descriptions.time, time)} ·
      <span
        >({@render term('languageWeight', descriptions.language, languageWeight)}<sup>1.5</sup
        >)</span
      >
    </span>
  </span>
</div>

{#snippet score()}score{/snippet}
{#snippet previous()}<i>c</i><sub>1</sub>{/snippet}
{#snippet next()}<i>c</i><sub>2</sub>{/snippet}
{#snippet delta()}Δ<i>c</i>{/snippet}
{#snippet submissions(interactive = true)}
  {#if interactive}
    {@render term('previous', descriptions.previous, previous)}, {@render term(
      'next',
      descriptions.next,
      next
    )}
  {:else}
    {@render previous()}, {@render next()}
  {/if}
{/snippet}
{#snippet weightDiff()}w<sub class="boxed-subscript"
    >{@render term('delta', descriptions.delta, delta)}</sub
  >{/snippet}
{#snippet diff()}len({@render term('delta', descriptions.delta, delta)}){/snippet}
{#snippet weightTime()}w<sub>Δ<i>t</i></sub>{/snippet}
{#snippet time()}Δ<i>t</i>{/snippet}
{#snippet languageWeight(interactive = true)}<i>w</i><sub><i class="language-symbol">l</i></sub
  >({@render submissions(interactive)}){/snippet}

{#snippet language(index: number)}<i class="language-symbol">l</i>(<i>c</i><sub>{index}</sub
  >){/snippet}

{#if active}
  <div
    bind:this={tooltipElement}
    id="pimm-formula-tooltip"
    class="tooltip"
    class:above={!below}
    role="tooltip"
    style:left={`${position.left}px`}
    style:top={`${position.top}px`}
  >
    {#if active === 'languageWeight'}
      <div>
        <span class="math"><i class="language-symbol">l</i>(<i>c</i>)</span> = {locale === 'ko'
          ? '제출 c의 언어'
          : locale === 'ja'
            ? '提出 c の言語'
            : 'language of submission c'}
      </div>
      <div class="piecewise math">
        <span>{@render languageWeight(false)} =</span>
        <span class="brace" aria-hidden="true">
          <svg viewBox="0 0 12 100" preserveAspectRatio="none">
            <path
              d="M11 1 C4 1 4 6 4 13 L4 40 C4 47 2 50 1 50 C2 50 4 53 4 60 L4 87 C4 94 4 99 11 99"
            />
          </svg>
        </span>
        <div class="cases">
          <span>0.05</span><span>if {@render language(1)} ≠ {@render language(2)}</span>
          <span>1.2</span><span>if {@render language(1)} = Java</span>
          <span>0.8</span><span>if {@render language(1)} = Python</span>
          <span>1</span><span>else</span>
        </div>
      </div>
    {:else}
      {descriptions[active]}
    {/if}
  </div>
{/if}

<style>
  .formula {
    display: flex;
    align-items: center;
    gap: 0.35em;
    margin: 0.85em 0;
    width: fit-content;
    max-width: 100%;
    font-family: 'Cambria Math', 'Times New Roman', serif;
    font-size: clamp(0.85rem, 2.8vw, 1.15rem);
    line-height: 1.4;
  }
  .lhs,
  .numerator,
  .denominator {
    white-space: nowrap;
  }
  .fraction {
    display: inline-flex;
    flex-direction: column;
    text-align: center;
  }
  .numerator {
    padding: 0 0.15em 0.22em;
    border-bottom: 1px solid currentColor;
  }
  .denominator {
    padding-top: 0.22em;
  }
  .term {
    display: inline-block;
    font: inherit;
    color: inherit;
    line-height: inherit;
    border: 1px solid color-mix(in srgb, var(--base-fg-color) 18%, transparent);
    border-radius: 4px;
    background: transparent;
    padding: 0.08em 0.16em;
    margin: 0.06em;
    cursor: help;
    transition:
      background 0.15s,
      border-color 0.15s;
  }
  .term.highlight,
  .term:focus-visible {
    background: color-mix(in srgb, var(--base-fg-color) 12%, var(--base-bg-color));
    border-color: var(--base-fg-color-brighter);
    outline: none;
  }
  sub,
  sup {
    font-size: 0.7em;
    line-height: 0;
    position: relative;
    vertical-align: baseline;
  }
  sub {
    bottom: -0.25em;
  }
  .boxed-subscript {
    display: inline-block;
    line-height: 1.2;
  }
  .boxed-subscript .term {
    line-height: 1.2;
    padding: 0.08em 0.2em;
    margin: 0 0.06em;
    vertical-align: baseline;
  }
  sup {
    top: -0.6em;
  }
  .tooltip {
    position: fixed;
    z-index: 40;
    width: max-content;
    max-width: calc(100vw - 24px);
    box-sizing: border-box;
    border-radius: 6px;
    padding: 0.65em 0.85em;
    background: var(--base-fg-color);
    color: var(--base-bg-color);
    font-size: 0.85rem;
    line-height: 1.5;
    font-weight: normal;
    box-shadow: 0 6px 16px #0003;
    pointer-events: none;
  }
  .tooltip.above {
    transform: translateY(-100%);
  }
  .math {
    font-family: 'Cambria Math', 'Times New Roman', serif;
  }
  .language-symbol {
    font-family: Georgia, serif;
    font-style: italic;
  }
  .piecewise {
    display: flex;
    align-items: center;
    gap: 0.35em;
    margin-top: 0.5em;
  }
  .brace {
    position: relative;
    align-self: stretch;
    width: 0.7em;
    flex: 0 0 0.7em;
  }
  .brace svg {
    position: absolute;
    inset: 0;
    width: 100%;
    height: 100%;
    overflow: visible;
  }
  .brace path {
    fill: none;
    stroke: currentColor;
    stroke-width: 1;
    vector-effect: non-scaling-stroke;
    stroke-linecap: round;
  }
  .cases {
    display: grid;
    grid-template-columns: auto 1fr;
    gap: 0.15em 0.8em;
    white-space: nowrap;
    font-family: 'Cambria Math', 'Times New Roman', serif;
  }
</style>

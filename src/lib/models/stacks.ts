import { m } from '$lib/paraglide/messages';

export type StackReference =
  | { refType: 'inner'; ref: string }
  | { refType: 'external'; ref: `https://${string}` | `http://${string}` };

/** Independent of career entries. One item owns one or more stacks (1:N).
 * Each distinct stack counts once per item; additional references do not affect counts. */
export type StackProject = {
  id: string;
  title: () => string;
  description?: () => string;
  stacks: [string, ...string[]];
  additionalRefs?: [StackReference, ...StackReference[]];
} & StackReference;

export function getStackReferences(project: StackProject): StackReference[] {
  return [
    { refType: project.refType, ref: project.ref } as StackReference,
    ...(project.additionalRefs ?? [])
  ];
}

export const stackProjects: StackProject[] = [
  {
    id: 'ktas',
    title: () => m.career_title_project_ktas_trainer(),
    stacks: ['csharp', 'unity'],
    refType: 'inner',
    ref: 'project-ktas-trainer'
  },
  {
    id: 'zodiac',
    title: () => m.career_title_project_zodiac_complex(),
    stacks: ['csharp', 'unity', 'naninovel'],
    refType: 'inner',
    ref: 'project-zodiac-complex'
  },
  {
    id: 'furiruby',
    title: () => 'furiruby',
    stacks: ['typst'],
    refType: 'inner',
    ref: 'works-package-maintaining'
  },
  {
    id: 'ucpc-solutions',
    title: () => 'ucpc-solutions',
    stacks: ['typst'],
    refType: 'inner',
    ref: 'works-package-maintaining'
  },
  {
    id: 'hccc',
    title: () => m.career_title_project_hccc22_page(),
    stacks: ['jekyll', 'ruby'],
    refType: 'inner',
    ref: 'project-hccc22-page'
  },
  {
    id: 'iwfcv',
    title: () => m.career_title_project_iwfcv22_page(),
    stacks: ['jekyll', 'ruby'],
    refType: 'inner',
    ref: 'project-iwfcv22-page'
  },
  {
    id: 'sign-language',
    title: () => m.career_title_project_sign_language_client(),
    stacks: ['csharp', 'unity'],
    refType: 'inner',
    ref: 'project-sign-language-client'
  },
  {
    id: 'fetea',
    title: () => m.career_title_project_sdok_fetea(),
    stacks: ['python', 'flask', 'oauth', 'sqlite3', 'docker'],
    refType: 'inner',
    ref: 'project-sdok-fetea'
  },
  {
    id: 'hannlp',
    title: () => m.career_title_project_hannlp(),
    stacks: ['c', 'r'],
    refType: 'inner',
    ref: 'project-hannlp'
  },
  {
    id: 'cellular',
    title: () => m.career_title_works_cellular(),
    stacks: ['rust', 'typescript', 'webcomponent'],
    refType: 'inner',
    ref: 'works-cellular'
  },
  {
    id: 'unity-merge',
    title: () => m.career_title_project_unity_merge(),
    stacks: ['cpp', 'unity'],
    refType: 'inner',
    ref: 'project-unity-merge'
  },
  {
    id: 'namumark',
    title: () => m.career_title_project_namumark(),
    stacks: ['c', 'homebrew'],
    refType: 'inner',
    ref: 'project-namumark',
    additionalRefs: [
      { refType: 'external', ref: 'https://github.com/ShapeLayer/homebrew-namumark' }
    ]
  },
  {
    id: 'gfm2polygon',
    title: () => m.career_title_project_gfm2polygon_statement(),
    stacks: ['cpp', 'nodejs', 'svelte', 'typescript'],
    refType: 'inner',
    ref: 'project-gfm2polygon-statement'
  },
  {
    id: 'turbo-waffle',
    title: () => m.career_title_works_turbo_waffle(),
    stacks: ['javascript', 'nodejs', 'puppeteer', 'nunjucks'],
    refType: 'inner',
    ref: 'works-turbo-waffle'
  },
  {
    id: 'algorithm-contest-editorials',
    title: () => m.stack_project_algorithm_contest_editorials(),
    stacks: ['typst'],
    refType: 'inner',
    ref: 'algorithm-contest-operations'
  },
  {
    id: 'jonghyeon-site',
    title: () => 'jonghyeon.me',
    stacks: ['nodejs', 'svelte', 'typescript'],
    refType: 'external',
    ref: 'https://github.com/ShapeLayer/jonghyeon.me'
  },
  {
    id: 'jonghyeon-blog',
    title: () => 'blog.jonghyeon.me',
    stacks: ['jekyll', 'shell', 'github-actions', 'python', 'rss'],
    refType: 'external',
    ref: 'https://github.com/ShapeLayer/blog.jonghyeon.me',
    additionalRefs: [
      { refType: 'external', ref: 'https://github.com/ShapeLayer/jekyll-theme' },
      {
        refType: 'external',
        ref: 'https://github.com/ShapeLayer/blog.jonghyeon.me-jonghyeon.me-embed-feed'
      }
    ]
  },
  {
    id: 'boosted-neural-decoders',
    title: () => 'Boosted Neural LDPC Decoders - torch',
    stacks: ['python', 'torch'],
    refType: 'external',
    ref: 'https://github.com/ShapeLayer/boosted-neural-decoders-torch',
    description: () => m.stack_project_boosted_decoders_description()
  },
  {
    id: 'namu-golf',
    title: () => 'Namu Golf',
    stacks: ['typescript', 'webcomponent', 'bun', 'caddy'],
    refType: 'external',
    ref: 'https://github.com/ShapeLayer/namu-golf',
    additionalRefs: [{ refType: 'external', ref: 'https://golf.jonghyeon.me' }]
  },
  {
    id: 'kilo-goal-plugin',
    title: () => 'Kilo /goal plugin',
    stacks: ['typescript', 'kilocode'],
    refType: 'inner',
    ref: 'works-package-maintaining'
  },
  {
    id: 'mass-spring-damper',
    title: () => 'Overfitting mass-spring-damper system in RTX 3050',
    stacks: ['cpp', 'cuda', 'csharp', 'unity'],
    refType: 'external',
    ref: 'https://github.com/ShapeLayer/overfitting-mass-spring-damper-model-rtx3050'
  },
  {
    id: 'git-gencommit',
    title: () => 'git-gencommit',
    stacks: ['cpp'],
    refType: 'external',
    ref: 'https://github.com/ShapeLayer/git-gencommit'
  },
  {
    id: 'persona-evaluation',
    title: () => m.stack_project_persona_evaluation(),
    stacks: ['python', 'llm', 'java', 'spark'],
    refType: 'external',
    ref: 'https://github.com/ShapeLayer/9axes-eval-using-nvidia-kr-persona',
    additionalRefs: [
      {
        refType: 'external',
        ref: 'https://github.com/ShapeLayer/election-result-8values-spark/blob/main/report.pdf'
      }
    ]
  },
  {
    id: 'simulate-ofdm',
    title: () => 'simulate-ofdm-tx-rx',
    stacks: ['c', 'typst'],
    refType: 'external',
    ref: 'https://github.com/ShapeLayer/simulate-ofdm-tx-rx'
  },
  {
    id: 'simple-irc',
    title: () => 'simple-irc',
    stacks: ['c'],
    refType: 'external',
    ref: 'https://github.com/ShapeLayer/simple-irc'
  },
  {
    id: 'nfd2nfc',
    title: () => 'nfd2nfc',
    stacks: ['dart'],
    refType: 'external',
    ref: 'https://github.com/ShapeLayer/nfd2nfc'
  },
  {
    id: 'rhythm-controller',
    title: () => m.stack_project_rhythm_controller(),
    stacks: ['c', 'cpp', 'dart', 'flutter'],
    refType: 'external',
    ref: 'https://blog.jonghyeon.me/posts/2025-07-20-keyboard-for-djmax/',
    additionalRefs: [
      { refType: 'external', ref: 'https://github.com/ShapeLayer/embedded-rhythm-game-controller' }
    ]
  },
  {
    id: 'prefix-generator',
    title: () => m.career_title_project_prefix_generator(),
    stacks: ['javascript'],
    refType: 'inner',
    ref: 'career-project-prefix-gen'
  },
  {
    id: 'game-academy',
    title: () => m.stack_project_game_academy(),
    stacks: ['csharp', 'unity'],
    refType: 'external',
    ref: 'https://github.com/ShapeLayer/2021-jnu-gameacademy-tasks'
  },
  {
    id: 'advanced-sticky-note',
    title: () => 'advanced sticky note',
    stacks: ['javascript', 'electron'],
    refType: 'external',
    ref: 'https://github.com/ShapeLayer/advanced-sticky-note'
  }
];
/** Language colors from GitHub Linguist languages.yml (2026-10-04).
 * https://github.com/github-linguist/linguist/blob/main/lib/linguist/languages.yml
 * Node.js uses JavaScript, Jekyll uses Ruby, and Docker uses Dockerfile.
 * Frameworks, protocols and tools without a Linguist entry use explicit fallback colors. */
export const stackDefinitions = [
  { id: 'csharp', name: 'C#', color: '#178600' },
  { id: 'unity', name: 'Unity', color: '#555555' },
  { id: 'naninovel', name: 'Naninovel', color: '#a36ac7' },
  { id: 'r', name: 'R', color: '#198ce7' },
  { id: 'nodejs', name: 'Node.js', color: '#f1e05a' },
  { id: 'typst', name: 'Typst', color: '#239dad' },
  { id: 'jekyll', name: 'Jekyll', color: '#701516' },
  { id: 'python', name: 'Python', color: '#3572a5' },
  { id: 'flask', name: 'Flask', color: '#6e9f8c' },
  { id: 'c', name: 'C', color: '#555555' },
  { id: 'rust', name: 'Rust', color: '#dea584' },
  { id: 'typescript', name: 'TypeScript', color: '#3178c6' },
  { id: 'cpp', name: 'C++', color: '#f34b7d' },
  { id: 'nunjucks', name: 'Nunjucks', color: '#3d8137' },
  { id: 'puppeteer', name: 'Puppeteer', color: '#00a389' },
  { id: 'javascript', name: 'JavaScript', color: '#f1e05a' },
  { id: 'svelte', name: 'Svelte', color: '#ff3e00' },
  { id: 'ruby', name: 'Ruby', color: '#701516' },
  { id: 'shell', name: 'Shell', color: '#89e051' },
  { id: 'github-actions', name: 'GitHub Actions', color: '#2088ff' },
  { id: 'rss', name: 'RSS', color: '#f26522' },
  { id: 'torch', name: 'PyTorch', color: '#ee4c2c' },
  { id: 'webcomponent', name: 'Web Components', color: '#29abe2' },
  { id: 'bun', name: 'Bun', color: '#b7a28d' },
  { id: 'caddy', name: 'Caddy', color: '#1f88c0' },
  { id: 'kilocode', name: 'Kilo Code', color: '#d0ad22' },
  { id: 'cuda', name: 'CUDA', color: '#3a4e3a' },
  { id: 'homebrew', name: 'Homebrew', color: '#b88b4a' },
  { id: 'llm', name: 'LLM', color: '#8b5cf6' },
  { id: 'java', name: 'Java', color: '#b07219' },
  { id: 'spark', name: 'Apache Spark', color: '#e25a1c' },
  { id: 'dart', name: 'Dart', color: '#00b4ab' },
  { id: 'flutter', name: 'Flutter', color: '#54c5f8' },
  { id: 'electron', name: 'Electron', color: '#47848f' },
  { id: 'oauth', name: 'OAuth', color: '#596579' },
  { id: 'sqlite3', name: 'SQLite3', color: '#003b57' },
  { id: 'docker', name: 'Docker', color: '#384d54' }
];
export function getStackShares(projects: StackProject[] = stackProjects) {
  const entries = stackDefinitions.map((stack) => ({
    ...stack,
    projects: projects.filter((project) => project.stacks.includes(stack.id))
  }));
  const total = entries.reduce((sum, entry) => sum + entry.projects.length, 0);
  return entries
    .filter((entry) => entry.projects.length > 0)
    .map((entry) => ({ ...entry, share: entry.projects.length / total }))
    .sort((a, b) => b.share - a.share);
}
/** Largest remainders preserve the exact tile count while minimizing rounding error. */
export function allocateStackTiles(entries: ReturnType<typeof getStackShares>, count: number) {
  const quotas = entries.map((entry, index) => ({
    entry,
    index,
    count: Math.floor(entry.share * count),
    remainder: (entry.share * count) % 1
  }));
  const remaining = count - quotas.reduce((sum, quota) => sum + quota.count, 0);
  [...quotas]
    .sort((a, b) => b.remainder - a.remainder || a.index - b.index)
    .slice(0, remaining)
    .forEach((quota) => quota.count++);
  return quotas.flatMap((quota) => Array.from({ length: quota.count }, () => quota.entry));
}

/** Reduce saturation by mixing toward equal-channel gray, keeping the source hue. */
export function softenStackColor(color: string) {
  const channels = [1, 3, 5].map((offset) => parseInt(color.slice(offset, offset + 2), 16));
  const gray = channels.reduce((sum, value) => sum + value, 0) / 3;
  return `#${channels
    .map((value) =>
      Math.round(value * 0.65 + gray * 0.35)
        .toString(16)
        .padStart(2, '0')
    )
    .join('')}`;
}

type StackShare = ReturnType<typeof getStackShares>[number];
export type StackRegion = {
  stack: StackShare;
  x: number;
  y: number;
  width: number;
  height: number;
};

/** Binary treemap: split the longer side near half the aggregate weight.
 * Integer boundaries keep tiles square and every stack in a single connected block.
 * Areas are quantized to the grid; the histogram retains the exact project share.
 * Reference: https://d3js.org/d3-hierarchy/treemap#treemapBinary */
export function layoutStackTreemap(
  entries: StackShare[],
  width: number,
  height: number
): StackRegion[] {
  if (!entries.length) return [];
  if (width * height < entries.length)
    throw new Error('The grid must have at least one tile per stack.');
  const regions: StackRegion[] = [];
  function split(items: StackShare[], x: number, y: number, w: number, h: number) {
    if (items.length === 1) {
      regions.push({ stack: items[0], x, y, width: w, height: h });
      return;
    }
    const total = items.reduce((sum, item) => sum + item.share, 0);
    let weight = 0;
    let bestIndex = 1;
    let bestDistance = Infinity;
    let bestWeight = 0;
    for (let index = 1; index < items.length; index++) {
      weight += items[index - 1].share;
      const distance = Math.abs(total / 2 - weight);
      if (distance < bestDistance) {
        bestDistance = distance;
        bestIndex = index;
        bestWeight = weight;
      }
    }
    const horizontal = w >= h;
    const length = horizontal ? w : h;
    const breadth = horizontal ? h : w;
    const min = Math.ceil(bestIndex / breadth);
    const max = length - Math.ceil((items.length - bestIndex) / breadth);
    const boundary = Math.max(min, Math.min(max, Math.round((length * bestWeight) / total)));
    if (horizontal) {
      split(items.slice(0, bestIndex), x, y, boundary, h);
      split(items.slice(bestIndex), x + boundary, y, w - boundary, h);
    } else {
      split(items.slice(0, bestIndex), x, y, w, boundary);
      split(items.slice(bestIndex), x, y + boundary, w, h - boundary);
    }
  }
  split(entries, 0, 0, width, height);
  return regions;
}

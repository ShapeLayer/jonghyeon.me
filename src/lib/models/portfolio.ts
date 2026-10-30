import { getCareerSections } from './careers';

/** Entries whose shared Details panel is the natural project boundary in the PDF. */
const sharedDetails = [
  { id: 'project-ktas-trainer', items: ['project-unity-merge', 'works-cellular'] },
  { id: 'algorithm-contest-operations', items: ['project-gfm2polygon-statement', 'works-turbo-waffle'] }
];

export function getPortfolioGroups(hiddenOverrides: Record<string, boolean>) {
  const visible = getCareerSections('works').flatMap((section) => section.items)
    .filter((item) => !(hiddenOverrides[item.id] ?? item.hidden));
  const added = new Set<string>();
  return visible.flatMap((item) => {
    const shared = sharedDetails.find((group) => group.id === item.id || group.items.includes(item.id));
    const group = shared ?? { id: item.id, items: [] };
    if (added.has(group.id)) return [];
    added.add(group.id);
    // Once selected, include every project in the shared panel, even collapsed entries.
    return [group];
  });
}

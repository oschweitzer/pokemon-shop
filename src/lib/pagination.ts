export type PageItem = number | 'start-ellipsis' | 'end-ellipsis';

const range = (from: number, to: number): number[] =>
  Array.from({ length: to - from + 1 }, (_, index) => from + index);

/**
 * The page links to display: always the first and the last page, the current page
 * with `siblings` pages on each side, and ellipses for the gaps. The number of
 * slots stays constant (`2 * siblings + 5`) so the pagination does not jump around.
 */
export function getPageItems(current: number, total: number, siblings = 2): PageItem[] {
  if (total < 1) {
    return [];
  }
  const slots = siblings * 2 + 5;
  if (total <= slots) {
    return range(1, total);
  }
  const edge = siblings * 2 + 3;
  const nearStart = current - siblings <= 3;
  const nearEnd = current + siblings >= total - 2;

  if (nearStart) {
    return [...range(1, edge), 'end-ellipsis', total];
  }
  if (nearEnd) {
    return [1, 'start-ellipsis', ...range(total - edge + 1, total)];
  }
  return [
    1,
    'start-ellipsis',
    ...range(current - siblings, current + siblings),
    'end-ellipsis',
    total,
  ];
}

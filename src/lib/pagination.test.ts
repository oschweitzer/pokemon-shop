import { describe, expect, it } from 'vitest';
import { getPageItems } from './pagination';

describe('getPageItems', () => {
  it('returns nothing when there are no pages', () => {
    expect(getPageItems(1, 0)).toEqual([]);
  });

  it('lists every page when they all fit', () => {
    expect(getPageItems(1, 1)).toEqual([1]);
    expect(getPageItems(3, 9)).toEqual([1, 2, 3, 4, 5, 6, 7, 8, 9]);
  });

  it('collapses the end when near the start', () => {
    expect(getPageItems(1, 50)).toEqual([1, 2, 3, 4, 5, 6, 7, 'end-ellipsis', 50]);
    expect(getPageItems(5, 50)).toEqual([1, 2, 3, 4, 5, 6, 7, 'end-ellipsis', 50]);
  });

  it('collapses both sides in the middle', () => {
    expect(getPageItems(25, 50)).toEqual([
      1,
      'start-ellipsis',
      23,
      24,
      25,
      26,
      27,
      'end-ellipsis',
      50,
    ]);
  });

  it('collapses the start when near the end', () => {
    expect(getPageItems(50, 50)).toEqual([1, 'start-ellipsis', 44, 45, 46, 47, 48, 49, 50]);
    expect(getPageItems(46, 50)).toEqual([1, 'start-ellipsis', 44, 45, 46, 47, 48, 49, 50]);
  });

  it('always uses the same number of slots', () => {
    for (let current = 1; current <= 50; current += 1) {
      expect(getPageItems(current, 50)).toHaveLength(9);
    }
  });

  it('never repeats a page', () => {
    for (let current = 1; current <= 50; current += 1) {
      const items = getPageItems(current, 50);
      expect(new Set(items).size).toBe(items.length);
    }
  });

  it('honors the siblings option', () => {
    expect(getPageItems(10, 20, 1)).toEqual([1, 'start-ellipsis', 9, 10, 11, 'end-ellipsis', 20]);
  });
});

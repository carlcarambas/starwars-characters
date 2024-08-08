
// Unit test for removeDuplicates function
// import { describe, it, expect, } from 'jest';
import { removeDuplicates } from "@/lib/utils";

describe('removeDuplicates', () => {
  it('should remove duplicate planets based on name', () => {
    const planets: Planet[] = [
      { name: 'Tatooine', url: 'url1' },
      { name: 'Alderaan', url: 'url2' },
      { name: 'Tatooine', url: 'url3' },
      { name: 'Hoth', url: 'url4' },
    ];

    const result = removeDuplicates(planets);

    expect(result).toHaveLength(3);
    expect(result).toEqual([
      { name: 'Tatooine', url: 'url1' },
      { name: 'Alderaan', url: 'url2' },
      { name: 'Hoth', url: 'url4' },
    ]);
  });

  it('should return an empty array when given an empty array', () => {
    const result = removeDuplicates([]);
    expect(result).toEqual([]);
  });

  it('should return the same array when there are no duplicates', () => {
    const planets: Planet[] = [
      { name: 'Tatooine', url: 'url1' },
      { name: 'Alderaan', url: 'url2' },
      { name: 'Hoth', url: 'url3' },
    ];

    const result = removeDuplicates(planets);

    expect(result).toEqual(planets);
  });
});
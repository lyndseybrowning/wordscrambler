import utils from '../utils';

describe('getRandomItemFromArray', () => {
  it('returns null when no array is passed', () => {
    expect(utils.getRandomItemFromArray()).toBeNull();
  });

  it('returns a random item from the passed in array', () => {
    const array = ['a', 'b', 'c'];
    const randomItem = utils.getRandomItemFromArray(array);
    const randomItem2 = utils.getRandomItemFromArray(array);

    expect(array.includes(randomItem)).toBe(true);
    expect(array.includes(randomItem2)).toBe(true);
  });
});

import config from '../scripts/config';
import wordscrambler from '../scripts/wordscrambler';

const { NUM_LETTERS } = config;

describe('createLetters', () => {
  it('returns an array of objects containing an id and a letter', () => {
    const letters = wordscrambler.createLetters();
    const allItemsHaveAnIdAndALetter = letters.every(item => typeof item.id === 'number' && typeof item.letter === 'string');

    expect(Array.isArray(letters)).toBe(true);
    expect(allItemsHaveAnIdAndALetter).toBe(true);
  });

  test('the length of the returned array is determined by config if it is not set', () => {
    const letters = wordscrambler.createLetters();

    expect(letters.length).toBe(NUM_LETTERS);
  });

  test('the length of the returned array can be customised', () => {
    const numberOfLetters = 5;
    const letters = wordscrambler.createLetters(numberOfLetters);

    expect(letters.length).toBe(numberOfLetters);
  });

  test('a letter cannot exist more times than is specified in the tile distribution', () => {
    const distribution = Array.from('AABBCDE');
    const letters = wordscrambler.createLetters(NUM_LETTERS, distribution);
    const getTimesInArray = (arr, item) => arr.filter(x => x.letter === item).length;

    letters.forEach((letter) => {
      const timesInLetters = getTimesInArray(letters, letter);
      const timesInDistribution = getTimesInArray(distribution, letter);

      expect(timesInLetters).toBeLessThanOrEqual(timesInDistribution);
    });
  });
});

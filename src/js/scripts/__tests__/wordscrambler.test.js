import config from '../config';
import wordscrambler from '../wordscrambler';

const { NUM_LETTERS } = config;

describe('createLetters', () => {
  it('should return an array of objects containing an id and a letter', () => {
    const letters = wordscrambler.createLetters();
    const allItemsHaveAnIdAndALetter = letters.every(({ id, letter }) => typeof id === 'number' && letter);

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

  test('a letter cannot exceed the limit specified in the tile distribution', () => {
    const distribution = Array.from('AABBCDEOPRDSTEUY');
    const letters = wordscrambler.createLetters(NUM_LETTERS, distribution);
    const uniqueLetters = letters.reduce((arr, { letter }) => {
      if (!arr.includes(letter)) {
        arr.push(letter);
      }

      return arr;
    }, []);

    uniqueLetters.forEach((letter) => {
      const countInLetters = letters.filter(x => x.letter === letter).length;
      const countInDistribution = distribution.filter(item => item === letter).length;

      expect(countInLetters).toBeLessThanOrEqual(countInDistribution);
    });
  });
});

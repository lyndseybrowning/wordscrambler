import config from './config';
import utils from './utils';

const { TILE_DISTRIBUTION, NUM_LETTERS } = config;

function wordscrambler() {
  function createLetters(numLetters = NUM_LETTERS, tileDistribution = TILE_DISTRIBUTION) {
    const distribution = [...tileDistribution];
    const letters = [];

    while (letters.length < numLetters) {
      const letter = utils.getRandomItemFromArray(distribution);

      // remove the letter from the copy of the tile distribution
      distribution.splice(distribution.indexOf(letter), 1);

      letters.push({
        id: letters.length,
        letter,
      });
    }

    return letters;
  }

  return {
    createLetters,
  };
}

export default wordscrambler();

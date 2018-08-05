const utils = {
  getRandomItemFromArray(array) {
    if (!array || array.length === 0) {
      return null;
    }

    const randomItem = Math.floor(Math.random() * array.length);

    return array[randomItem];
  },
};

export default utils;

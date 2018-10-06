import config from '../config';

it('should be read only', () => {
  expect(() => {
    config.NUM_LETTERS = 20;
  }).toThrow();
});

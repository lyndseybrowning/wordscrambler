import React from 'react';
import Letter from '../Letter';

it('should render correctly', () => {
  const letter = shallow(<Letter letter="A" />);

  expect(letter).toMatchSnapshot();
});

it('should render the provided letter', () => {
  const letter = shallow(<Letter letter="B" />);

  expect(letter.find('[data-test-id="letter"]').text()).toBe('B');
});

it('should render the letter to uppercase', () => {
  const letter = shallow(<Letter letter="b" />);

  expect(letter.find('[data-test-id="letter"]').text()).toBe('B');
});

it('should toggle the modifier class when clicked or touched', () => {
  const letter = shallow(<Letter letter="L" />);
  const button = letter.find('[data-test-id="letter"]');

  expect(button.hasClass('c-letter--selected')).toBe(false);

  button.simulate('click');

  expect(letter.find('[data-test-id="letter"]').hasClass('c-letter--selected')).toBe(true);

  button.simulate('touchStart');

  expect(letter.find('[data-test-id="letter"]').hasClass('c-letter--selected')).toBe(false);
});

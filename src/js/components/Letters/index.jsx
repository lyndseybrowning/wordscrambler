import React from 'react';
import PropTypes from 'prop-types';
import Letter from './Letter';

const Letters = ({ letters }) => (
  <div className="o-grid o-grid--gutter">
    {letters.map(({ id, letter }) => <Letter key={id} letter={letter} width={letters.length} />)}
  </div>
);

Letters.propTypes = {
  letters: PropTypes.arrayOf(PropTypes.shape({
    id: PropTypes.number.isRequired,
    letter: PropTypes.string.isRequired,
  })).isRequired,
};

export default Letters;

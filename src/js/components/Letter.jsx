import React from 'react';
import PropTypes from 'prop-types';

const Letter = ({ letter }) => (
  <span className="c-letter">{letter}</span>
);

Letter.propTypes = {
  letter: PropTypes.string.isRequired,
};

export default Letter;

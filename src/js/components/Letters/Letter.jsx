import React, { Component } from 'react';
import PropTypes from 'prop-types';
import config from '../../scripts/config';

class Letter extends Component {
  state = {
    selected: false,
  };

  toggleSelected = () => {
    this.setState({
      selected: !this.state.selected,
    });
  };

  render() {
    const letter = this.props.letter.toUpperCase();
    const cls = this.state.selected ? 'c-letter c-letter--selected' : 'c-letter';

    return (
      <div className={`o-grid__item u-1/${this.props.width}`}>
        <button
          className={cls}
          data-test-id="letter"
          onClick={this.toggleSelected}
          onTouchStart={this.toggleSelected}
        >
          {letter}
        </button>
      </div>
    );
  }
}

Letter.defaultProps = {
  width: config.NUM_LETTERS,
};

Letter.propTypes = {
  letter: PropTypes.string.isRequired,
  width: PropTypes.number,
};

export default Letter;

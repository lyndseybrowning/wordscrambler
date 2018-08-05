import React, { Component } from 'react';
import PropTypes from 'prop-types';

class Letter extends Component {
  constructor() {
    super();

    this.state = {
      selected: false,
    };

    this.toggleSelected = this.toggleSelected.bind(this);
  }

  toggleSelected() {
    this.setState({
      selected: !this.state.selected,
    });
  }

  render() {
    const cls = this.state.selected ? 'c-letter c-letter--selected' : 'c-letter';

    return (
      <button className={cls} onClick={this.toggleSelected} onTouchStart={this.toggleSelected}>
        {this.props.letter}
      </button>
    );
  }
}

Letter.propTypes = {
  letter: PropTypes.string.isRequired,
};

export default Letter;

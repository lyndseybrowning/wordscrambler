import React, { Fragment, Component } from 'react';
import PropTypes, { shape } from 'prop-types';
import Letters from '../components/Letters';

class Game extends Component {
  state = {
    letters: this.props.letters,
  };

  render() {
    return (
      <Fragment>
        <Letters letters={this.state.letters} />
      </Fragment>
    );
  }
}

Game.propTypes = {
  letters: PropTypes.arrayOf(shape({
    id: PropTypes.number.isRequired,
    letter: PropTypes.string.isRequired,
  })).isRequired,
};

export default Game;

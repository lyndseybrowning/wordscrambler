import React, { Fragment, Component } from 'react';
import PropTypes, { shape } from 'prop-types';
import Letter from '../components/Letter';

class Game extends Component {
  state = {
    letters: this.props.letters,
  };

  renderLetters() {
    const { letters } = this.state;

    return letters.map(({ id, letter }) => (
      <Letter key={id} letter={letter} width={letters.length} />
    ));
  }

  render() {
    return (
      <Fragment>
        <div className="o-grid o-grid--gutter">{this.renderLetters()}</div>
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

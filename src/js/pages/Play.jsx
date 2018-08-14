import React, { Fragment, Component } from 'react';
import Letter from '../components/Letter';

class Game extends Component {
  constructor({ letters }) {
    super();

    this.state = {
      letters,
    };
  }

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

export default Game;

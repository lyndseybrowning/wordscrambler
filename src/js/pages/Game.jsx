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

    return letters.map(item => (
      <div className={`o-grid__item u-1/${letters.length}`} key={item.id}>
        <Letter letter={item.letter} />
      </div>
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

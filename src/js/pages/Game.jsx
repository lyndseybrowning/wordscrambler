import React, { Component } from 'react';
import Letter from '../components/Letter';

class Game extends Component {
  constructor({ letters }) {
    super();

    this.state = {
      letters,
    };
  }

  renderLetters() {
    return this.state.letters.map(item => <Letter letter={item.letter} key={item.id} />);
  }

  render() {
    return (
      <div className="o-grid">
        <div className="o-grid__item">{this.renderLetters()}</div>
        <button onClick={this.reorder} />
      </div>
    );
  }
}

export default Game;

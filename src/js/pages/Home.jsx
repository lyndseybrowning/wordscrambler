import React, { Fragment } from 'react';
import { Link } from 'react-router-dom';

const Home = () => (
  <Fragment>
    <h1>How to Play</h1>
    <p>
      Use your mouse or keyboard to find as many words as you can
      before the timer runs out!
    </p>
    <p>Ready to play? Click the button below.</p>
    <Link to="/play">
      <button type="button" className="c-button">Start Game</button>
    </Link>
  </Fragment>
);

export default Home;

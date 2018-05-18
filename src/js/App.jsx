import React, { Fragment } from 'react';
import { BrowserRouter as Router, Link } from 'react-router-dom';
import logo from '../img/logo.svg';

const App = () => (
  <Router>
    <Fragment>
      <header className="c-header">
        <div className="o-wrapper">
          <Link to="/">
            <img src={logo} alt="Word Scrambler Logo" aria-roledescription="logo" />
          </Link>
        </div>
      </header>
      <main>
        <div className="o-wrapper">
          <h1>How to Play</h1>
          <p>
            Use your mouse or keyboard to find as many words as you can before the timer runs out!
          </p>
          <p>Ready to play? Click the button below.</p>
          <button type="button" className="c-button">Start Game</button>
        </div>
      </main>
      <footer className="c-footer" />
    </Fragment>
  </Router>
);

export default App;

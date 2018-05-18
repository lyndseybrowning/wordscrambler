import React, { Fragment } from 'react';
import { BrowserRouter as Router, Link, Route } from 'react-router-dom';
import logo from '../img/logo.svg';
import HomePage from './pages/Home';
import GamePage from './pages/Game';

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
          <Route path="/" component={HomePage} exact />
          <Route path="/play" component={GamePage} />
        </div>
      </main>
      <footer className="c-footer" />
    </Fragment>
  </Router>
);

export default App;

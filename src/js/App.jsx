import React, { Fragment } from 'react';
import logo from '../img/logo.svg';

const App = () => (
  <Fragment>
    <header className="c-header">
      <div className="o-wrapper">
        <img src={logo} alt="Word Scrambler Logo" aria-roledescription="logo" />
      </div>
    </header>
    <main>
      <div className="o-wrapper">
        Main content area
      </div>
    </main>
    <footer className="c-footer" />
  </Fragment>
);

export default App;

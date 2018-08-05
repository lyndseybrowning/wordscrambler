import React, { Fragment } from 'react';
import { Link } from 'react-router-dom';

const Home = () => (
  <Fragment>
    <Link to="/play">
      <button type="button" className="c-button">
        Start Game
      </button>
    </Link>
  </Fragment>
);

export default Home;

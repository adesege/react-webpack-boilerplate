import React from 'react';
import { Route } from 'react-router-dom';
import Homepage from 'components/Homepage';
import NotFound from 'components/NotFound';
import logo from 'assets/images/logo-banner.png';
import 'assets/scss/styles.scss';
import NavLinks from './NavLinks';

/**
 * App component
 *
 * @param {object} props
 *
 * @returns {JSX} JSX
 */
const App = (props) => (
  <div className="container">
    <div className="wrapper">
      <img
        src={logo}
        className="wrapper-logo move"
        alt="React + Webpack banner"
      />
      <Route exact path="/" component={Homepage}/>
      <Route exact path="/404" component={NotFound}/>
      <NavLinks {...props} />
    </div>
  </div>
);

export default App;

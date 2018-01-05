import React from 'react';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';

const propTypes = {
  location: PropTypes.object.isRequired
};

/**
 * Navigation links componenet
 *
 * @param {object} props
 *
 * @returns {JSX} JSX
 */
const NavLinks = (props) => (
  <ul className="nav-links">
    <li>
      <a
        href="https://github.com/adesege/react-webpack-boilerplate">
      Read the tutorial
      </a>
    </li>
    {props.location.pathname !== '/404' ?
      <li>
        <Link to="/404">404 Page</Link>
      </li> :
      <li>
        <Link to="/">Homepage</Link>
      </li>
    }
    <li>
      <a href="http://twitter.com/adesege_">Tweet @adesege_</a>
    </li>
  </ul>

);

NavLinks.propTypes = propTypes;

export default NavLinks;

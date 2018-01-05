import React from 'react';
import { render } from 'react-dom';
import { Router, Route } from 'react-router-dom';
import createBrowserHistory from 'history/createBrowserHistory';
import App from 'components/App';
import registerServiceWorker from './registerServiceWorker';

const history = createBrowserHistory();

render(
  <Router history={history}>
    <Route path="/" component={App}/>
  </Router>,
  document.getElementById('app')
);

registerServiceWorker();

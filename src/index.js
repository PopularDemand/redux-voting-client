import React from 'react';
import ReactDOM from 'react-dom';
import { Router, Route, hashHistory } from 'react-router';
import { createStore } from 'redux';
import { Provider } from 'react-redux';
import io from 'socket.io-client';
import reducer from './reducer';
import { setState } from './action-creators.js';
import App from './components/app';
import { ConnectedVoting } from './components/voting';
import { ConnectedResults } from './components/results';

const store = createStore(reducer);
const socket = io(`${location.protocol}//${location.hostname}:8080`);

const globals = {};
globals.store = store;
globals.setState = setState;

socket.on('state', (state) => {
  globals.store.dispatch(globals.setState(state));
});

const routes = (
  <Route component={App}>
    <Route path="/results" component={ConnectedResults} />
    <Route path="/" component={ConnectedVoting} />
  </Route>
);

ReactDOM.render(
  <Provider store={store}>
    <Router history={hashHistory}>{routes}</Router>
  </Provider>,
  document.getElementById('app')
);

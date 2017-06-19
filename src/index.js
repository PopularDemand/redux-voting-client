import React from 'react';
import ReactDOM from 'react-dom';
import { Router, Route, hashHistory } from 'react-router';
import { createStore } from 'redux';
import {Provider} from 'react-redux';
import io from 'socket.io-client';
import reducer from './reducer';
import App from './components/app';
import { ConnectedVoting } from './components/voting';
import { ConnectedResults } from './components/results';

const store = createStore(reducer);
const socket = io(`${location.protocol}//${location.hostname}:8090`);

socket.on('state', (state) => {
  store.dispatch({
    type: 'SET_STATE',
    state
  });
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

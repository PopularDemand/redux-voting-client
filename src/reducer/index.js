import { Map, List } from 'immutable';
import {
  setState,
  vote
} from './core';

export default function reducer(state = Map(), action) {
  switch (action.type) {
  case 'SET_STATE':
    return setState(state, action.state);
  case 'VOTE':
    return vote (state, action.entry);
  }
  return state;
};

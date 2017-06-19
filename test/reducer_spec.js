import { List, Map, fromJS } from 'immutable';
import { expect } from 'chai';

import reducer from '../src/reducer';

describe('reducer', () => {

  // SET STATE
  it('handles SET_STATE', () => {
    const initialState = new Map();
    const action = {
      type: 'SET_STATE',
      state: Map({
        vote: Map({
          pair: List.of('Train', '28 Days'),
          tally: Map({Train: 1})
        })
      })
    };
    const nextState = reducer(initialState, action);

    expect(nextState).to.equal(fromJS({
      vote: {
        pair: ['Train', '28 Days'],
        tally: { Train: 1 }
      }
    }));
  });

  it('handles SET_STATE with plain js payload', ()=> {
    const initialState = new Map();
    const action = {
      type: 'SET_STATE',
      state: {
        vote: {
          pair: ['Train', '28 Days'],
          tally: {Train: 1}
        }
      }
    };
    const nextState = reducer(initialState, action);

    expect(nextState).to.equal(fromJS({
      vote: {
        pair: ['Train', '28 Days'],
        tally: {Train: 1}
      }
    }));
  });

  it('handles SET_STATE without an initial State', () => {
    const action = {
      type: 'SET_STATE',
      state: {
        vote: {
          pair: ['Train', '28 Days'],
          tally: {Train: 1}
        }
      }
    };
    const nextState = reducer(undefined, action);

    expect(nextState).to.equal(fromJS({
      vote: {
        pair: ['Trainspotting', '28 Days Later'],
        tally: {Trainspotting: 1}
      }
    }));
  });

  // VOTE
  it('handles vote by setting hasVoted', () => {
    const state = fromJS({
      vote: {
        pair: ['Train', '28 Days'],
        tally: {Train: 1}
      }
    });
    const action = {type: 'VOTE', entry: 'Train'};
    const nextState = reducer(action);

    expect(nextState).to.equal(fromJS({
      vote: {
        pair: ['Train', '28 Days'],
        tally: {Train: 1}
      },
      hasVoted: 'Train'
    }));
  });

  it('does not set hasVoted for invalid entry', () => {
    const state = fromJS({
      vote: {
        pair: ['Train', '28 Days'],
        tally: {Train: 1}
      }
    });
    const action = {type: 'VOTE', entry: 'Sunshine'};
    const nextState = reducer(action);

    expect(nextState).to.equal(fromJS({
      vote: {
        pair: ['Train', '28 Days'],
        tally: {Train: 1}
      }
    }));
  })
});

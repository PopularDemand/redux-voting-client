import React from 'react';
import ReactDOM from 'react-dom';
import {
  renderIntoDocument,
  scryRenderedDOMComponentsWithTag,
  Simulate
} from 'react-addons-test-utils';
import { expect } from 'chai';
import { List } from 'immutable';

import Voting from '../../src/components/voting';
import Vote from '../../src/components/voting/vote';
import VotePane from '../../src/components/voting/votePane';

/* Voting */
describe('Voting', () => {
  const defaultProps = {
    pair: List.of('Train', '28 Days'),
    voteCallback: entry => entry
  }

  it('renders a pair of buttons when there is no winner', () => {
    const component = renderIntoDocument(
      <Voting {...defaultProps} />
    );
    const buttons = scryRenderedDOMComponentsWithTag(component, 'button');

    expect(buttons.length).to.equal(2);
    expect(buttons[0].textContent).to.equal('Train');
    expect(buttons[1].textContent).to.equal('28 Days');
  });

  it('renders the winner when there is one', () => {
    const winnerProps = Object.assign({}, defaultProps, {winner: 'Train'});
    const component = renderIntoDocument(
      <Voting {...winnerProps} />
    );

    const buttons = scryRenderedDOMComponentsWithTag(component, 'button');
    const winner = ReactDOM.findDOMNode(component.refs.winner);

    expect(winner).to.be.ok;
    expect(winner.textContent).to.contain('Train');
    expect(buttons.length).to.equal(0);
  });

});

/* Vote */
describe('Vote', () => {
  const defaultProps = {
    pair: List.of('Train', '28 Days'),
    voteCallback: entry => entry
  };

  afterEach(() => {
    defaultProps.pair = List.of('Train', '28 Days');
    defaultProps.voteCallback = entry => entry;
  });

  it('renders as a pure component', () => {
    const container = document.createElement('div');
    let component = ReactDOM.render(
      <Vote {...defaultProps} />,
      container
    );

    let firstButton = scryRenderedDOMComponentsWithTag(component, 'button')[0];
    expect(firstButton.textContent).to.equal('Train');

    defaultProps.pair[0] = 'Sunshine';
    component = ReactDOM.render(
      <Vote {...defaultProps} />,
      container
    );
    firstButton = scryRenderedDOMComponentsWithTag(component, 'button')[0];
    expect(firstButton.textContent).to.equal('Train');
  });
});

/* Vote Pane */
describe('Voting pane', () => {
  let votedWith;
  const vote = (entry) => votedWith = entry;
  const defaultProps = {
    entry: 'Train',
    voteCallback: entry => entry
  };

  it('invokes callback when clicked', () => {
    let votedWith;
    const vote = (entry) => votedWith = entry;

    const customVoteProps = {voteCallback: vote};
    const customProps = Object.assign({}, defaultProps, customVoteProps);

    const component = renderIntoDocument(
      <VotePane {...customProps} />
    );
    const buttons = scryRenderedDOMComponentsWithTag(component, 'button');

    Simulate.click(buttons[0]);
    expect(votedWith).to.equal('Train');
  });

  it('disables the button when the user has voted', () => {
    const withVoteProps = Object.assign({}, defaultProps, {hasVoted: 'Train'});
    const component = renderIntoDocument(
      <VotePane {...withVoteProps} />
    );

    const button = scryRenderedDOMComponentsWithTag(component, 'button')[0];
    expect(button.hasAttribute('disabled')).to.equal(true);
  });

  it('adds a label to the voted entry', () =>{
    const withVoteProps = Object.assign({}, defaultProps, {hasVoted: 'Train'});
    const component = renderIntoDocument(
      <VotePane {...withVoteProps} />
    );
    const button = scryRenderedDOMComponentsWithTag(component, 'button')[0];

    expect(button.textContent).to.contain('Voted');
  });

  it('does not add label to unvoted entry', () => {
    const unVotedProps = Object.assign({}, defaultProps, {hasVoted: null});
    const component = renderIntoDocument(
      <VotePane {...unVotedProps} />
    );
    const button = scryRenderedDOMComponentsWithTag(component, 'button')[0];

    expect(button.textContent).to.not.contain('Voted');
  });

});

import React from 'react';
import ReactDOM from 'react-dom';
import {
  renderIntoDocument,
  scryRenderedDOMComponentsWithClass,
  scryRenderedDOMComponentsWithTag,
  Simulate
} from 'react-addons-test-utils';
import { expect } from 'chai';
import { List, Map } from 'immutable';

import Results from '../../src/components/results';


describe('Results component', () => {
  const pair = List.of('Train', '28 Days');
  const tally = Map({
    'Train': 3,
    '28 Days': 0
  });
  const next = () => true;
  const defaultProps = { pair, tally, next };

  it('renders a div and tally for each entry', () => {
    const component = renderIntoDocument(<Results {...defaultProps} />);
    const entries = scryRenderedDOMComponentsWithClass(component, 'entry');
    const [train, days] = entries.map(e => e.textContent);

    expect(entries.length).to.equal(2);
    expect(train).to.contain('Train');
    expect(train).to.contain('3');
    expect(days).to.contain('28 Days');
    expect(days).to.contain('0');
  });

  it('calls the next callback when button clicked', () => {
    let nextInvoked = false;
    const next = () => nextInvoked = true;
    const component = renderIntoDocument(<Results {...defaultProps}
                                                  next={next} />);

    Simulate.click(ReactDOM.findDOMNode(component.refs.next));

    expect(nextInvoked).to.equal(true);
  });

  it('renders the winner when there is one', () => {
    const component = renderIntoDocument(<Results
                                         {...defaultProps}
                                         winner="Train" />);
    const winner = ReactDOM.findDOMNode(component.refs.winner);

    expect(winner).to.be.ok;
    expect(winner.textContent).to.contain('Train');
  });
});

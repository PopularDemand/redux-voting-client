import React, { PureComponent } from 'react';
import { List, Map } from 'immutable';

const pair = List.of('Train', '28 Days');
const tally = new Map({'Train': 2, '28 Days': 1});
const voteCallback = entry => entry;
const next = (entry) => console.log(entry);

export default class App extends React.Component {
  render() {
    return React.cloneElement(this.props.children, {
      pair,
      voteCallback,
      tally,
      next
    });
  }
};

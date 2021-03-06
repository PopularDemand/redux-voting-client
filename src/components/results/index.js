import React, { PureComponent } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { List, Map } from 'immutable';

import * as actionCreators from '../../actionCreators';

import Winner from '../winner';
import Tally from './tally';

export class Results extends PureComponent {
  render() {
    return this.props.winner ?
      <Winner ref="winner" winner={this.props.winner} /> :
      <div className="results">
        <Tally
          pair={this.props.pair}
          tally={this.props.tally}
        />
        <div className="management">
          <button
            ref="next"
            className="next-button"
            onClick={this.props.next}>
            Next
          </button>
        </div>
      </div>
  }
};

Results.propTypes = {
  tally: PropTypes.instanceOf(Map),
  pair: PropTypes.instanceOf(List),
  next: PropTypes.func.isRequired,
  winner: PropTypes.string
};

function mapStatetoProps(state) {
  return {
    winner: state.get('winner'),
    pair: state.getIn(['vote', 'pair'], List()),
    tally: state.getIn(['vote', 'tally'], Map())
  };
}

export const ConnectedResults = connect(
  mapStatetoProps,
  actionCreators
)(Results);

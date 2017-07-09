import React, { PureComponent } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { List, Map } from 'immutable';

import * as actionCreators from '../../actionCreators';

import Vote from './vote'
import VotePane from './votePane';
import Winner from '../winner';

export class Voting extends PureComponent {
  getPair() {
    return this.props.pair;
  }

  render() {
    return (
      <div className="voting">
        {this.props.winner ?
          <Winner winner={this.props.winner}
                  ref="winner" /> :
          <Vote pair={this.props.pair}
                voteCallback={this.props.voteCallback}
                hasVoted={this.props.hasVoted}
                tally={this.props.tally} />}
      </div>
    );
  }
}

Voting.propTypes = {
  pair: PropTypes.instanceOf(List).isRequired,
  hasVoted: PropTypes.string,
  winner: PropTypes.string,
  tally: PropTypes.instanceOf(Map)
};

function mapStateToProps(state) {
  return {
    pair: state.getIn(['vote', 'pair'], List()),
    winner: state.get('winner'),
    hasVoted: state.get('hasVoted'),
    tally: state.getIn(['vote', 'tally'], Map())
  };
}

// the second parameter is an object of action creators
// connect will wrap each in a dispatch() call
 export const ConnectedVoting = connect(
   mapStateToProps,
   actionCreators
 )(Voting);

import React, { PureComponent } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { List } from 'immutable';

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
                hasVoted={this.props.hasVoted} />}
      </div>
    );
  }
}

Voting.propTypes = {
  pair: PropTypes.instanceOf(List).isRequired,
  voteCallback: PropTypes.func.isRequired,
  hasVoted: PropTypes.string,
  winner: PropTypes.string
};

function mapStatetoProps(state) {
  return {
    pair: state.getIn(['vote', 'pair']),
    winner: state.get('winner')
  };
}

 export const ConnectedVoting = connect(mapStatetoProps)(Voting);

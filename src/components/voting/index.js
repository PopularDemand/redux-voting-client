import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import { List } from 'immutable';

import Vote from './vote'
import VotePane from './votePane';
import Winner from '../winner';

export default class Voting extends PureComponent {
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

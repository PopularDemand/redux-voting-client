import React, { PureComponent } from 'react';
import { List, Map } from 'immutable';
import PropTypes from 'prop-types';
import VotePane from './votePane';

export default class Vote extends PureComponent {
  getPair() {
    return this.props.pair;
  }

  render() {
    return (
      <div className="vote">
        { this.getPair().map((entry) => {
          return <VotePane entry={entry}
                           key={entry}
                           voteCallback={this.props.voteCallback}
                           hasVoted={this.props.hasVoted}
                           tally={this.props.tally} />
        })}
      </div>
    );
  }
}

Vote.propTypes = {
  pair: PropTypes.instanceOf(List).isRequired,
  voteCallback: PropTypes.func.isRequired,
  hasVoted: PropTypes.string,
  tally: PropTypes.instanceOf(Map)
};

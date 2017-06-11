import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import VotePane from './votePane';

export default class Voting extends PureComponent {
  getPair() {
    return this.props.pair || [];
  }

  render() {
    return (
      <div className="voting">
        { this.getPair().map((entry) => {
          return <VotePane entry={entry}
                           key={entry}
                           voteCallback={this.props.voteCallback} />
        })}
      </div>
    );
  }
}

Voting.propTypes = {
  pair: PropTypes.array.isRequired,
  voteCallback: PropTypes.func.isRequired
}

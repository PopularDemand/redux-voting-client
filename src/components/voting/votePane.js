import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';

export default class VotePane extends PureComponent {
  render() {
    const entry = this.props.entry;
    return (
      <button key={entry}
              onClick={() => this.props.voteCallback(entry)}>
        <h1>{entry}</h1>
      </button>
    )
  }
}

VotePane.propTypes = {
  entry: PropTypes.string.isRequired,
  voteCallback: PropTypes.func.isRequired
};

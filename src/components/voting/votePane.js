import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';

export default class VotePane extends PureComponent {

  _handleClick(evt) {
    this.props.voteCallback(this.props.entry);
  }

  _isDisabled() {
    return !!this.props.hasVoted;
  }

  _votedFor() {
    return this.props.hasVoted === this.props.entry;
  }

  _hasVotedFor(entry) {
    return entry === this.props.hasVoted;
  }

  render() {
    const entry = this.props.entry;
    return (
      <button key={entry}
              onClick={(evt) => this._handleClick(evt)}
              disabled={this._isDisabled()}>
        <h1>{entry}</h1>
        {this._hasVotedFor(entry) ?
          <div className="label">Voted</div> :
          null}
      </button>
    )
  }
}

VotePane.propTypes = {
  entry: PropTypes.string.isRequired,
  voteCallback: PropTypes.func.isRequired,
  hasVoted: PropTypes.string
};

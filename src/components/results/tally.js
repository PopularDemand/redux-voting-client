import React, { PureComponent } from 'react';
import { List } from 'immutable';
import PropTypes from 'prop-types';

export default class Tally extends PureComponent {
  getPair() {
    return this.props.pair;
  }

  getVotes(entry) {
    if (this.props.tally && this.props.tally.has(entry)) {
      return this.props.tally.get(entry);
    }
    return 0;
  }

  render() {
    return (
      <div className="tally">
        {this.getPair().map(entry =>
          <div key={entry} className="entry">
            <h1>{entry}</h1>
            <div className="voteCount">
              {this.getVotes(entry)}
            </div>
          </div>
        )}
      </div>
    );
  }
};

Tally.propTypes = {
  pair: PropTypes.instanceOf(List).isRequired,
  tally: PropTypes.instanceOf(Map).isRequired
};

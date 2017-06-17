import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';

export default class Winner extends PureComponent {
  render() {
    return (
      <div className="winner">
        The winner is {this.props.winner}!
      </div>
    );
  }
}

Winner.propTypes = {
  winner: PropTypes.string.isRequired
}

import React from 'react';
import ReactDOM from 'react-dom';
import Voting from './components/voting';

const pair = ['Train', '28 Days'];

ReactDOM.render(
  <Voting pair={pair}
          voteCallback={(entry) => console.log(entry)} />,
  document.getElementById('app')
);

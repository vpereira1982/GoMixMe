import React from 'react';
import ReactDOM from 'react-dom';
import Profile from './Profile.jsx';

const Results = (props) => (
  <div>
    {props.users.reverse().map((each, i) =>
      <Profile key={each.id} profileAttributes={each} />
    )}
  </div>
)

export default Results;
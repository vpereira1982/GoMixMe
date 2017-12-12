import React from 'react';
import ReactDOM from 'react-dom';
import Main from './Main.jsx';
import Profile from './Profile.jsx';

const Results = (props) => (
  <div>
    {props.users.reverse().map(function(each, i) {
      return <Profile key={each.id} profileAttributes={each} />
    })}
  </div>
)

export default Results;
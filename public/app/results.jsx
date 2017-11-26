import React from 'react';
import ReactDOM from 'react-dom';
import Main from './Main.jsx';
import Profile from './profile.jsx';


class Results extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <div>
        {this.props.users.reverse().map(function(each, i) {
          return <Profile key={each.id} profileAttributes={each} />
        })}
      </div>
    )
  }
}

export default Results;
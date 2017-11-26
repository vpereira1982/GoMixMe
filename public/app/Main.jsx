import React from 'react';
import ReactDOM from 'react-dom';
import $ from 'jquery';
import App from './index.jsx';
import Search from './search.jsx';
import Results from './results.jsx';
import APIcall from '../apicall/ajax.js'

class Main extends React.Component {
  constructor(props) {
    super(props);
    let currentUser = props.username !== undefined ? this.props.username : props.location.state.username;

    this.state = {
      loggeduser: currentUser,
      users: []
    };
    window.query = '';
  }

  componentDidMount() {
    var data = window.query === '' ? {} : window.query;
    APIcall.fetch(data,'/api/all', (data) => {
      this.setState({
        users: JSON.parse(data)
      });
    });
  }

  handleSearch(query) {
    window.query = {'query': query};
    setTimeout(
      this.componentDidMount.bind(this), 500
    );
  }

  render () {
    return (
      <div>
        <div className="search col-offset-4 col-6">
          <Search username={this.state.loggeduser} handleSearch={this.handleSearch.bind(this)} />
        </div>
        <div className="container result">
          <Results users={this.state.users}/>
        </div>
      </div>
    )
  }
}


export default Main;

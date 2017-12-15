import React from 'react';
import ReactDOM from 'react-dom';
import App from './App.jsx';
import Header from './Header.jsx';
import Results from './Results.jsx';
import APIcall from '../apicall/ajax.js'
// LOAD REACT-ROUTER MODULES
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import createBrowserHistory from 'history/createBrowserHistory'
const customHistory = createBrowserHistory();

class Main extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      loggeduser: props.username,
      usersTracks: [],
      contentBody: ''
    };
    this.handleSearch = this.handleSearch.bind(this);

    window.query = '';
  }

  componentDidMount() {
    let data = window.query === '' ? {} : window.query;
    APIcall.fetch(data,'/api/all', (data) => {
      this.setState({
        usersTracks: JSON.parse(data)
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
          <Header username={this.state.loggeduser} handleSearch={this.handleSearch} />
        </div>
        <div className="container contentBody">
          <Results users={this.state.usersTracks} />
        </div>
      </div>
    )
  }
}


export default Main;

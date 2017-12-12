import React from 'react';
import ReactDOM from 'react-dom';
import $ from 'jquery';
import App from './App.jsx';
import Header from './Header.jsx';
import Results from './Results.jsx';
import Upload from './Upload.jsx';
import APIcall from '../apicall/ajax.js'
// LOAD REACT-ROUTER MODULES
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import createBrowserHistory from 'history/createBrowserHistory'
const customHistory = createBrowserHistory();

class Main extends React.Component {
  constructor(props) {
    super(props);
    //let currentUser = props.username !== undefined ? this.props.username : props.location.state.username;

    this.state = {
      loggeduser: props.username !== undefined ? this.props.username : props.location.state.username,
      usersTracks: [],
      contentBody: ''
    };
    this.handleUpload = this.handleUpload.bind(this);
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

  handleUpload() {
    this.setState({
      contentBody: <Upload />
    })
  }

  render () {
    return (
      <div>
        <div className="search col-offset-4 col-6">
          <Header username={this.state.loggeduser} handleSearch={this.handleSearch} handleUpload={this.handleUpload} />
        </div>
        <div className="container contentBody">
          {this.state.contentBody || <Results users={this.state.usersTracks} />}
        </div>
      </div>
    )
  }
}


export default Main;

import React from 'react';
import ReactDOM from 'react-dom';
import App from './App.jsx';
import Results from './Results.jsx';
import APIcall from '../apicall/ajax.js'
import { BrowserRouter, Route, Switch } from 'react-router-dom';

class Main extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      firstname: props.userInfo.firstname,
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
      <div className="container contentBody">
        <Results users={this.state.usersTracks} />
      </div>
    )
  }
}

export default Main;

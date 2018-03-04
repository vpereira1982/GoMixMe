import React from 'react';
import ReactDOM from 'react-dom';
import App from './App.jsx';
import Results from './Results.jsx';
import APIcall from '../apicall'
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import { connect } from 'react-redux';
import * as Actions from './actions';

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
    setTimeout(this.componentDidMount.bind(this), 500);
  }

  render () {
    return (
      <div className="container contentBody">
        <Results users={this.state.usersTracks} />
      </div>
    )
  }
}

const MapStateToProps = (state) => {
  return {
    userDetails: state.userDetails
  }
}

export default connect(MapStateToProps, Actions)(Main);

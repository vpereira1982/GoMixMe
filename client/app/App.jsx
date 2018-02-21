import React from 'react';
import ReactDOM from 'react-dom';
import APIcall from '../apicall/ajax.js'
import Header from './Header.jsx';
import Signup from './Signup.jsx';
import Main from './Main.jsx';
import Login from './Login.jsx';
import Upload from './Upload.jsx';
import ErrorMessage from './Error.jsx';
import { connect } from 'react-redux';
import * as Actions from './actions';

// LOAD REACT-ROUTER MODULES
import { BrowserRouter, Route, Switch, Redirect } from 'react-router-dom';
import createBrowserHistory from 'history/createBrowserHistory'

const customHistory = createBrowserHistory();

class App extends React.Component {
  constructor (props) {
    super(props);

    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleChange = this.handleChange.bind(this);
    this.props.checkIfLogged(false);
  }

  componentDidMount () {
    APIcall.fetch('','/api/session', (data) => {
      if (data) {
        let parsedData = JSON.parse(data);
        let isLogged = parsedData.hasOwnProperty('id') ? true : false;

        // Call Redux Action Creators:
        this.props.changeFirstName(parsedData.firstname);
        this.props.changeLastName(parsedData.lastname);
        this.props.checkIfLogged(isLogged);
        this.props.changeEmail(parsedData.email);
      } else {
        this.props.checkIfLogged(false);
      }
    });
  }

  //************************
  // Login
  //************************

  handleChange (event) {
    if (event.target.name === 'email') {
      this.props.changeEmail(event.target.value);
    } else {
      this.props.changePw(event.target.value);
    }
  }

  handleSubmit (e) {
    e.preventDefault();

    APIcall.fetch(this.props.userDetails,'/api/login', (data) => {
      if (data) {
        let parsedData = JSON.parse(data);

        // If user is valid (i.e. data), redirect to the main page:
        customHistory.push('/');

        // Call Redux Action Creators:
        this.props.checkIfLogged(true);
        this.props.isReturning(false);
        this.props.changeFirstName(parsedData.firstname);
        this.props.changeLastName(parsedData.lastname);
        this.props.changeEmail(parsedData.email)
      } else {
        let errorMsg = document.querySelector('.errorMsg');
        errorMsg.style.visibility = 'visible';
      }
    });
  }

  render () {
    const {
      firstname,
      lastname,
      email,
      pw,
      isLogged,
      isReturning
    } = this.props.userDetails;

    //*************
    // User-Auth Conditional Rendering
    //*************

    if (isLogged === '') {
      return (<h6>Loading...</h6>);
    } else if (isLogged) {
      return (
        <BrowserRouter>
          <div>
            <Header userInfo={this.props.userDetails} />
            <Switch>
              <Route
                path="/"
                exact={isReturning}
                render={(props) => <Main {...props}
                  history={customHistory}
                  userInfo={this.props.userDetails}
                />}
              />
              <Route
                path="/upload"
                exact
                render={(props) => <Upload {...props}
                  history={customHistory}
                  userInfo={this.props.userDetails}
                />}
              />
              <Route component={ErrorMessage} />
            </Switch>
          </div>
        </BrowserRouter>
      )
    } else {
      return (
        <BrowserRouter>
          <Switch>
            <Route
              exact path="/"
              render={(props) => <Login
                handleSubmit={this.handleSubmit}
                handleChange={this.handleChange}
                email={email}
                pw={pw}
              />}
            />
            <Route
              exact path="/signup"
              render={(props) => <Signup
                handleSubmit={this.handleSubmit}
                handleChange={this.handleChange}
                email={email}
                pw={pw}
              />}
            />
            <Route component={ErrorMessage} />
          </Switch>
        </BrowserRouter>
      )
    }
  }
}

const MapStateToProps = (state) => {
  return {
    userDetails: state.userDetails
  }
}

export default connect(MapStateToProps, Actions)(App);
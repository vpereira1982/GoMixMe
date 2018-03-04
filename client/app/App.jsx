import React from 'react';
import ReactDOM from 'react-dom';
import APIcall from '../apicall'
import Header from './Header.jsx';
import Signup from './Signup.jsx';
import Main from './Main.jsx';
import Login from './Login.jsx';
import Upload from './uploadComponents/index.jsx';
import Loading from './Loading.jsx';
import ErrorMessage from './Error.jsx';
import { connect } from 'react-redux';
import * as Actions from './actions';

// LOAD REACT-ROUTER MODULES
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import createBrowserHistory from 'history/createBrowserHistory'

const customHistory = createBrowserHistory();

class App extends React.Component {
  constructor (props) {
    super(props);
    this.handleLogin = this.handleLogin.bind(this);
    this.loggedHomePage = this.loggedHomePage.bind(this);
    this.loginHomePage = this.loginHomePage.bind(this);
  }

  // If the user is valid, pull his info right away.
  componentDidMount () {
    APIcall.fetch('','/api/session', (data) => {
      if (data) {
        let parsedData = JSON.parse(data);

        // Call Redux Action Creators:
        this.props.changeFirstName(parsedData.firstname);
        this.props.changeLastName(parsedData.lastname);
        this.props.checkIfLogged(parsedData.hasOwnProperty('id'));
        this.props.changeEmail(parsedData.email);
      } else {
        this.props.checkIfLogged(false);
      }
    });
  }

  //************************
  // Login Functions
  //************************

  handleChange(e) {
    this.setState({
      [e.target.name]: e.target.value
    });
  }

  handleLogin(e) {
    e ? e.preventDefault() : null;

    const { email, pw } = this.props.userDetails;

    APIcall.fetch({email, pw},'/api/login', (data) => {
      if (data) {
        let parsedData = JSON.parse(data);

        // If user is valid (i.e. data), redirect to the main page:
        customHistory.push('/');

        // Call Redux Action Creators:
        this.props.checkIfLogged(true);
        this.props.isReturning(false);
        this.props.changeFirstName(parsedData.firstname);
        this.props.changeLastName(parsedData.lastname);
        //!!!!!!!!!!!!!!********** ADD AN ACTION TO SAVE THE USER PROFILE PICTURE LATER!!!!!
      } else if (e) {
        let errorMsg = document.querySelector('.errorMsg');
        errorMsg.style.visibility = 'visible';
      }
    });
  }

  //************************
  // Conditional Homepage Routing
  //************************

  loggedHomePage(props) {
    return <Main {...props} history={customHistory} userInfo={this.props.userDetails} />
  }

  loginHomePage() {
    return <Login handleLogin={this.handleLogin} handleChange={this.handleChange} />
  }

  render() {
    const { isLogged, isReturning } = this.props.userDetails;

    if (isLogged === '') {
      return <Loading />
    } else {
      return (
        <BrowserRouter>
          <div>
            {isLogged ? <Header userInfo={this.props.userDetails} /> : null}
            <Switch>
              <Route
                path="/upload"
                exact
                render={(props) => <Upload handleChange={this.handleChange} />}
              />
              <Route
                path="/"
                exact={isReturning ? true : false}
                render={isLogged ? this.loggedHomePage : this.loginHomePage}
              />
              <Route
                path="/signup"
                exact
                render={
                  (props) => (
                    <Signup {...props}
                      handleLogin={this.handleLogin}
                      handleChange={this.handleChange}
                    />
                  )
                }
              />
              <Route component={ErrorMessage} />
            </Switch>
          </div>
        </BrowserRouter>
      )
    }
  }
}

const MapStateToProps = (state) => {
  return {userDetails: state.userDetails}
}

export default connect(MapStateToProps, Actions)(App);
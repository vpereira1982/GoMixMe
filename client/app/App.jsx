import React from 'react';
import ReactDOM from 'react-dom';
import APIcall from '../apicall/ajax.js'
import Header from './Header.jsx';
import Signup from './Signup.jsx';
import Main from './Main.jsx';
import Login from './Login.jsx';
import Upload from './Upload.jsx';
import ErrorMessage from './Error.jsx';

// LOAD REACT-ROUTER MODULES
import { BrowserRouter, Route, Switch, Redirect } from 'react-router-dom';
import createBrowserHistory from 'history/createBrowserHistory'

const customHistory = createBrowserHistory();

class App extends React.Component {
  constructor (props) {
    super(props);
    this.state = {
      isLogged: '',
      firstname: '',
      lastname: '',
      email: '',
      pw: '',
      isReturning: true
    }

    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleChange = this.handleChange.bind(this);
  }

  componentDidMount () {
    APIcall.fetch('','/api/session', (data) => {
      if (data) {
      let parsedData = JSON.parse(data);
        this.setState({
          isLogged: parsedData.hasOwnProperty('id') ? true : false,
          firstname: parsedData.firstname,
          lastname: parsedData.lastname,
          email: parsedData.email
        });
      } else {
        this.setState({
          isLogged: false
        });
      }
    });
  }

  //************************
  // Login
  //************************

  handleChange (event) {
    this.setState({
      [event.target.name]: event.target.value
    });
  }

  handleSubmit (e) {
    e.preventDefault();

    APIcall.fetch(this.state,'/api/login', (data) => {
      if (data) {
        let parsedData = JSON.parse(data);

        // If user is valid (i.e. data), redirect to the main page:
        customHistory.push('/');
        this.setState({
          isLogged: true,
          returningUser: false,
          firstname: parsedData.firstname,
          lastname: parsedData.lastname,
          email: parsedData.email,
          isReturning: false
        });
      } else {
        let errorMsg = document.querySelector('.errorMsg');
        errorMsg.style.visibility = 'visible';
      }
    });
  }

  render () {
    if (this.state.isLogged === '') {
      return (<h6>Loading...</h6>);
    } else if (this.state.isLogged) {
      return (
        <BrowserRouter>
          <div>
            <Header userInfo={this.state} />
            <Switch>
              <Route
                path="/" exact={this.state.isReturning}
                render={(props) => <Main {...props} history={customHistory} userInfo={this.state} />}
              />
              <Route
                path="/upload" exact
                render={(props) => <Upload {...props} history={customHistory} userInfo={this.state} />}
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
              render={(props) => <Login handleSubmit={this.handleSubmit} handleChange={this.handleChange} email={this.state.email} pw={this.state.pw} />}
            />
            <Route
              exact path="/signup"
              render={(props) => <Signup handleSubmit={this.handleSubmit} handleChange={this.handleChange} email={this.state.email} pw={this.state.pw} />}
            />
            <Route component={ErrorMessage} />
          </Switch>
        </BrowserRouter>
      )
    }
  }
}

export default App;
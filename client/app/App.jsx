import React from 'react';
import ReactDOM from 'react-dom';
import Signup from './Signup.jsx';
import Main from './Main.jsx';
import Login from './Login.jsx';
import Upload from './Upload.jsx';
import APIcall from '../apicall/ajax.js'
import errorMessage from './errorMessage.jsx';
import Header from './Header.jsx';

// LOAD REACT-ROUTER MODULES
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import createBrowserHistory from 'history/createBrowserHistory'
const customHistory = createBrowserHistory();

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      isLogged: '',
      firstname: '',
      lastname: '',
      email: ''
    }
  }

  componentDidMount() {
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

  render () {
    if (this.state.isLogged === '') {
      return (<h6>Loading...</h6>);
    } else {
      return (
        <BrowserRouter>
          <Switch>
            <Route
              exact path="/"
              render=
              {
                this.state.isLogged ?
                (props) => <Main {...props} history={customHistory} userInfo={this.state} /> :
                (props) => <Login {...props} userInfo={this.state} />
              }/>
            <Route
              exact path="/upload/"
              render={(props) => <Upload {...props} history={customHistory} userInfo={this.state} />
              }/>
            <Route
              exact path="/main"
              render={(props) => <Main {...props} history={customHistory} userInfo={this.state} />
              }/>
            <Route component={errorMessage} />
          </Switch>
        </BrowserRouter>
      )
    }
  }
}

ReactDOM.render(<App />, document.getElementById('app'));
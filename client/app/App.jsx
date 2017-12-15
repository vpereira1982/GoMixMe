import React from 'react';
import ReactDOM from 'react-dom';
import Signup from './Signup.jsx';
import Main from './Main.jsx';
import Login from './Login.jsx';
import Upload from './Upload.jsx';
import APIcall from '../apicall/ajax.js'
import errorMessage from './errorMessage.jsx';

// LOAD REACT-ROUTER MODULES
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import createBrowserHistory from 'history/createBrowserHistory'
const customHistory = createBrowserHistory();

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      isLogged: '',
      username: '',
      email: '',
      pw: ''
    }
  }

  componentDidMount() {
    APIcall.fetch('','/api/session', (data) => {
      if (data) {
      let parsedData = JSON.parse(data);
        this.setState({
          isLogged: parsedData.hasOwnProperty('id') ? true : false,
          username: parsedData.firstname
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
                (props) => <Main {...props} history={customHistory} username={this.state.username} /> :
                (props) => <Login {...props} userInfo={this.state} />
              }/>
            <Route
              exact path="/upload"
              render={(props) => <Upload {...props} username={this.state.username} />}
              />
            <Route exact path="/signup" component={Signup} />
            <Route component={errorMessage} />
          </Switch>
        </BrowserRouter>
      )
    }
  }
}

ReactDOM.render(<App />, document.getElementById('app'));
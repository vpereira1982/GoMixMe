import React from 'react';
import ReactDOM from 'react-dom';
import $ from 'jquery';
import Signup from './Signup.jsx';
import Main from './Main.jsx';
import Login from './Login.jsx';
import APIcall from '../apicall/ajax.js'

// LOAD REACT-ROUTER MODULES
import { BrowserRouter, Route, Redirect } from 'react-router-dom';
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
              console.log('this is the data back from the session endpoint', parsedData);

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
    } else if (this.state.isLogged) {
      const MainLogged = (props) => <Main history={customHistory} username={this.state.username} {...props} />;
      return (
        <BrowserRouter>
            <Route exact path="/" render={MainLogged} />
        </BrowserRouter>)
    } else if (!this.state.isLogged) {
      return (
        <BrowserRouter>
          <div>
            <Route
              exact path="/"
              render={ (routeProps) => <Login {...routeProps} userInfo={this.state} /> }
            />
            <Route exact path="/signup" component={Signup} />
            <Route exact path="/main" history={customHistory} component={Main} />
          </div>
        </BrowserRouter>
      )
    }
  }
}

ReactDOM.render(<App />, document.getElementById('app'));
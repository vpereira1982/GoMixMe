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

class Index extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      isLogged: '',
      username: ''
    }
  }

  componentDidMount() {
    if (!localStorage.length) {
      this.setState({
        isLogged: false,
      });
      return;
    }

    APIcall.fetch({'localStorage': localStorage.getItem("userid")},'/api/session', (data) => {
      if (data) {
        let parsedData = JSON.parse(data);
        this.setState({
          isLogged: localStorage.getItem("userid") === parsedData.id.toString() || false,
          username: localStorage.getItem("userid") === parsedData.id.toString() ? parsedData.firstname.toString() : ''
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
            <Route exact path="/" history={customHistory} component={Login} />
            <Route exact path="/signup" component={Signup} />
            <Route exact path="/main" history={customHistory} component={Main} />
          </div>
        </BrowserRouter>
      )
    }
  }
}

ReactDOM.render(<Index />, document.getElementById('app'));
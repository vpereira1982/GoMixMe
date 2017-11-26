import React from 'react';
import ReactDOM from 'react-dom';
import $ from 'jquery';
import Signup from './Signup.jsx';
import Main from './Main.jsx';
import { BrowserRouter, Route, Link, Redirect, withRouter } from 'react-router-dom';
import APIcall from '../apicall/ajax.js';
import createBrowserHistory from 'history/createBrowserHistory'

//const customHistory = createBrowserHistory();

class Login extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      email: '',
      pw: ''
    }
  }

  handleChange(event) {
    this.setState({
      [event.target.name]: event.target.value
    })
  }

  handleSubmit(e) {
    e.preventDefault();

    APIcall.fetch(this.state,'/api/login', (data) => {
      if (data) {
        let parsedData = JSON.parse(data);

        //CREATES THE USER SESSION
        window.localStorage.setItem("userid", JSON.stringify(parsedData.id));
        //REDIRECTS USER TO THE MAIN PAGE
        self.props.history.push({pathname: '/main', state: {username: parsedData.firstname}});
      } else {
        alert('User name and password do not match. Sign up if you are a new user.');
      }
    });
  }

  render() {
    return (
      <div className="col-md-4 col-md-offset-4 login bg-primary">
        <h2> Log In </h2> <br />
        <form onSubmit={this.handleSubmit.bind(this)}>
          <div className="form-group">
            <input className="form-control form-control-lg" value={this.state.email} onChange={this.handleChange.bind(this)} type="text" name="email" placeholder="Email" />
          </div>
          <div className="form-group">
            <input className="form-control form-control-lg" value={this.state.pw} onChange={this.handleChange.bind(this)} type="password" name="pw" placeholder="Password" />
          </div>
          <br />
          <button className="btn btn-success" type="submit" placeholder="Submit">Submit</button><span>   </span>
          <Link to="/signup"><button type="button" className="btn btn-danger" placeholder="Submit">Sign Up</button></Link>
        </form>
      </div>

    )
  }
}

export default withRouter(Login);

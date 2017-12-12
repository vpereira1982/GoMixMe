import React from 'react';
import ReactDOM from 'react-dom';
import $ from 'jquery';
import Signup from './Signup.jsx';
import Main from './Main.jsx';
import { BrowserRouter, Route, Link, Redirect, withRouter } from 'react-router-dom';
import APIcall from '../apicall/ajax.js';
import createBrowserHistory from 'history/createBrowserHistory'

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
    });
  }

  handleSubmit(e) {
    e.preventDefault();

    APIcall.fetch(this.state,'/api/login', (data) => {
      if (data) {
        let parsedData = JSON.parse(data);

        // If user is valid (i.e. data), redirect to the main page:
        this.props.history.push({pathname: '/main', state: {username: parsedData.firstname}});
      } else {
        let errorMsg = document.getElementsByClassName('errorMsg')[0];
        errorMsg.style.visibility = 'visible';
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
          <button className="btn btn-success" type="submit" placeholder="Submit">Sign In</button><span>   </span>
          <Link to="/signup"><button type="button" className="btn btn-danger" placeholder="Submit">Sign Up</button></Link>
        </form>
        <p className='errorMsg' style={{visibility: 'hidden', 'color': 'red'}}>User name and password do not match. Please try again or sign-up.</p>
      </div>

    )
  }
}

export default withRouter(Login);

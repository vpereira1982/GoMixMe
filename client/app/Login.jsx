import React from 'react';
import ReactDOM from 'react-dom';
import axios from 'axios';
import { connect } from 'react-redux';
import { persistUser } from './actions';
import { Link } from 'react-router-dom';
import SignUp from './SignUp.jsx';
import '../css/login.css';

class Login extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      firstname: '',
      lastname: '',
      loginEmail: '',
      loginPw: '',
      email: '',
      pw: '',
      confirmPw: '',
      isSignUp: false
    }
    this.handleChange = this.props.handleChange.bind(this);
    this.handleLogin = this.handleLogin.bind(this);
    this.handleSignUp = this.handleSignUp.bind(this);
  }

  handleSignUp(e) {
    e.preventDefault();
    const { pw, confirmPw } = this.state;

    // if both passwords don't match, error
    if (pw !== confirmPw) {
      document.querySelector('.sign-up-error').classList.remove('d-none');
      return;
    }
    this.setState({ isSignUp: true });
  }

  //************************
  // Login Function
  //************************
  handleLogin(e, email = this.state.loginEmail, pw = this.state.loginPw) {
    // if <Login>, prevent e.default and use state values; it's from <SignUp>
    e ? e.preventDefault() : null;

    axios.post('/api/login', { email, pw })
      .then(user => {
        // If user is valid (i.e. data), redirects to the main page:
        this.props.customHistory.push('/');
        this.props.persistUser(user.data);
      })
     .catch(error => {
        e ? document.querySelector('.login-error').classList.remove('d-none') : null;
      });
  }

  render() {
    const { isSignUp } = this.state;

    if(!isSignUp) {
      return (
        <div className="container">
          {/*NAV BAR*/}
          <div className="row">
            <nav className="login-nav fixed-top text-white bg-navy">
              <div className="container">
                <div className="row">
                  <div className="col-1 pl-0">
                    <Link to="/"><img className="logo-lg" src="../images/logo.svg" /></Link>
                  </div>

                  <div className="col-11 mt-4 pr-0">
                    <form className="form-inline float-right" onSubmit={this.handleLogin}>
                      <div className="form-group">
                        <input
                          type="text"
                          className="form-control mx-1"
                          name="loginEmail"
                          maxLength="200"
                          placeholder="Email"
                          value={this.state.loginEmail}
                          onChange={this.handleChange}
                        />
                      </div>
                      <div className="form-group">
                        <input
                          type="password"
                          className="form-control mx-1"
                          name="loginPw"
                          maxLength="30"
                          placeholder="Password"
                          value={this.state.loginPw}
                          onChange={this.handleChange}
                          autoComplete="off"
                        />
                      </div>
                      <button type="submit" className="btn btn-success ml-1" placeholder="Submit">
                        Sign In
                      </button>
                      <div className="login-error alert-danger d-none mt-1 ml-1">
                        User name and password do not match. Please try again or sign-up.
                      </div>
                    </form>
                  </div>
                </div>
              </div>
            </nav>
          </div>
          <div className="row middle-content">
            <div className="col-8 login-body-content ml-0 pb-0">
              <div className="row">
                <div className="col-12">
                  <h1 className="login-headline display-2">A community for<br/>audio recording enthusiasts</h1>
                </div>
              </div>
              <div className="row login-icons-group">
                <div className="col-4 pl-0 pr-2">
                  <img className="login-icons mx-auto d-block" src="../images/icon-share.svg" />
                  <p className="text-center login-icon-text">Share</p>
                </div>
                <div className="col-4 pl-0 pr-2">

                  <img className="login-icons mx-auto d-block" src="../images/icon-mix.svg" />
                  <p className="text-center login-icon-text">Mix</p>
                </div>
                <div className="col-4 pl-0">
                  <img className="login-icons mx-auto d-block" src="../images/icon-collaborate.svg" />
                  <p className="text-center login-icon-text">Collaborate</p>
                </div>
              </div>
              <div className="row">
                <div className="col-12 mt-4 pt-3 pb-3 shar_mix_col">
                  <h4 className="font-weight-light login-text-gray">Share your Multitrack Sessions</h4>
                </div>
                <div className="col-12 mt-3 pb-3 shar_mix_col">
                  <h4 className="font-weight-light login-text-gray">Make your Mixes</h4>
                </div>
                <div className="col-12 mt-3 shar_mix_col">
                  <h4 className="font-weight-light login-text-gray">Collaborate</h4>
                </div>
              </div>
            </div>

            {/*SIGN UP FORM*/}
            <div className="col-4 login bg-light">
              <h2 className="signUp-text">Sign Up</h2>
              <br />
              <form onSubmit={this.handleSignUp}>
                <div className="form-group">
                  <input
                    type="text"
                    className="form-control form-control-lg"
                    name="firstname"
                    maxLength="15"
                    placeholder="First Name"
                    value={this.state.firstname}
                    onChange={this.handleChange}
                    required
                  />
                </div>
                <div className="form-group">
                  <input
                    type="text"
                    className="form-control form-control-lg"
                    name="lastname"
                    maxLength="15"
                    placeholder="Last Name"
                    value={this.state.lastname}
                    onChange={this.handleChange}
                    required
                  />
                </div>
                <div className="form-group">
                  <input
                    type="text"
                    className="form-control form-control-lg"
                    name="email"
                    maxLength="200"
                    placeholder="Email"
                    value={this.state.email}
                    onChange={this.handleChange}
                    required
                  />
                </div>
                <div className="form-group">
                  <input
                    type="password"
                    className="form-control form-control-lg"
                    name="pw"
                    maxLength="30"
                    placeholder="Password"
                    value={this.state.pw}
                    onChange={this.handleChange}
                    autoComplete="off"
                    required
                  />
                </div>
                <div className="form-group">
                  <input
                    type="password"
                    className="form-control form-control-lg"
                    name="confirmPw"
                    maxLength="30"
                    placeholder="Confirm Password"
                    value={this.state.confirmPw}
                    onChange={this.handleChange}
                    autoComplete="off"
                    required
                  />
                </div>
                <div className="sign-up-error alert-danger d-none mt-3 mb-2">
                  Passwords don't match. Please try again.
                </div>
                <small className="login-text-gray font-weight-light">
                  By clicking on create account, you agree with our <Link to="terms">terms</Link>
                </small>
                <button type="submit" className="btn btn-danger btn-lg mt-3 d-block" placeholder="Submit">
                  Create Account
                </button>
              </form>
            </div>
        </div>

        {/*FOOTER*/}
        <div className="row">
          <footer className="footer fixed-bottom text-white bg-navy">
            <div className="container">
              <div className="row footer-p">
                <div className="col-4 pl-0">
                  <small className="float-left">GoMixMe &#9400; 2018. v1.0 BETA</small>
                </div>
                <div className="col-8 pr-0 float-right">
                  <small className="float-right"><a href="mailto:support@gomixme.com">Contact Us</a></small>
                  <small className="float-right mr-4"><a href="#">Terms</a></small>
                  <small className="float-right mr-4"><a href="#">Careers</a></small>
                  <small className="float-right mr-4"><a href="#">Cookie Use</a></small>
                </div>
              </div>
            </div>
          </footer>
        </div>
      </div>
      )
    } else {
      return (
        <SignUp
          handleChange={this.props.handleChange}
          handleLogin={this.handleLogin}
          userInfo={this.state}
        />
      )
    }
  }
}


export default connect(null, { persistUser })(Login);

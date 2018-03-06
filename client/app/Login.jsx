import React from 'react';
import ReactDOM from 'react-dom';
import { connect } from 'react-redux';
import { changeEmail, changePw } from './actions';
import { Link } from 'react-router-dom';

const Login = ({ email, pw, handleLogin, changePw, changeEmail }) => {
  let callActionCreators = (e) => {
    if (e.target.name === 'email') {
      changeEmail(e.target.value);
    } else {
      changePw(e.target.value);
    }
  }

  return (
    <div className="col-md-6 offset-md-3 login bg-navy">
      <h2>Log In</h2>
      <br />
      <form onSubmit={handleLogin}>
        <div className="form-group">
          <input
            type="text"
            className="form-control form-control-lg"
            name="email"
            placeholder="Email"
            value={email}
            onChange={callActionCreators}
          />
        </div>
        <div className="form-group">
          <input
            type="password"
            className="form-control form-control-lg"
            name="pw"
            placeholder="Password"
            value={pw}
            onChange={callActionCreators}
          />
        </div>
        <br />
        <button type="submit" className="btn btn-success" placeholder="Submit">Sign In</button>
        <Link to="/signup">
          <button type="button" className="btn btn-danger" placeholder="Submit">Sign Up</button>
        </Link>
      </form>
      <div className='errorMsg' style={{visibility: 'hidden', 'color': 'red'}}>
        User name and password do not match. Please try again or sign-up.
      </div>
    </div>
  )
}

const MapStateToProps = (state) => {
  return {
    email: state.email,
    pw: state.pw
  }
}

export default connect(MapStateToProps, { changeEmail, changePw })(Login);

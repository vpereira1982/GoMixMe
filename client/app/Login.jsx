import React from 'react';
import ReactDOM from 'react-dom';
import { connect } from 'react-redux';
import { updateEmail, updatePw } from './actions';
import { Link } from 'react-router-dom';

const Login = ({ email, pw, handleLogin, updatePw, updateEmail }) => {
  let callActionCreators = (e) => {
    if (e.target.name === 'email') {
      updateEmail(e.target.value);
    } else {
      updatePw(e.target.value);
    }
  }

  return (
    <div className="col-md-6 offset-md-3 login text-white bg-navy">
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
        <div className='errorMsg alert-danger d-none mt-3'>
          User name and password do not match. Please try again or sign-up.
        </div>
        <br />
        <button type="submit" className="btn btn-success" placeholder="Submit">Sign In</button>
        <Link to="/signup">
          <button type="button" className="btn btn-danger ml-3" placeholder="Submit">Sign Up</button>
        </Link>
      </form>
    </div>
  )
}

const MapStateToProps = (state) => {
  return {
    email: state.email,
    pw: state.pw
  }
}

export default connect(MapStateToProps, { updateEmail, updatePw })(Login);

import React from 'react';
import ReactDOM from 'react-dom';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import * as Actions from './actions';

const Login = (props) => {
  const { email, pw } = props.userDetails;

  return (
    <div className="col-md-4 col-md-offset-4 login bg-primary">
      <h2> Log In </h2> <br />
      <form onSubmit={props.handleSubmit}>
        <div className="form-group">
          <input className="form-control form-control-lg" value={email} onChange={props.handleChange} type="text" name="email" placeholder="Email" />
        </div>
        <div className="form-group">
          <input className="form-control form-control-lg" value={pw} onChange={props.handleChange} type="password" name="pw" placeholder="Password" />
        </div>
        <br />
        <button className="btn btn-success" type="submit" placeholder="Submit">Sign In</button><span>   </span>
        <Link to="/signup"><button type="button" className="btn btn-danger" placeholder="Submit">Sign Up</button></Link>
      </form>
      <p className='errorMsg' style={{visibility: 'hidden', 'color': 'red'}}>User name and password do not match. Please try again or sign-up.</p>
    </div>
  )
}

const MapStateToProps = (state) => {
  return {
    userDetails: state.userDetails
  }
}

export default connect(MapStateToProps, Actions)(Login);

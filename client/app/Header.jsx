import React from 'react';
import ReactDOM from 'react-dom';
import axios from 'axios';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import { pullTracks, isLogged } from './actions';

const Header = (props) => {
  let clickToSearch = () => {
    let query = document.getElementById('searchbox').value;
    props.pullTracks(query);
    query = '';
  }

  let handleLogout = () => {
    axios.get('/api/destroyCookie')
      .then(res => {
        props.isLogged(false)
      });
  }

  return (
    <nav className="navbar navbar-light text-white bg-navy">
      <div className="container justify-content-between">
        <Link to="/"><img className="navbar-brand" src="../images/logo.png" /></Link>
        <form className="form-inline">
          <input className="form-control" type="text" size="65" placeholder="Search" id="searchbox" />
          <button className="btn btn-success ml-2" id="button-search" type="button" onClick={clickToSearch}>Search</button>
          <a href='/upload'><button className="btn btn-info ml-2" id="button-upload" type="button">Upload</button></a>
        </form>
        <span className="navbar-text">
          <img className="headerProfilePic" src={`http://localhost:8080/userfiles/${props.profilePic}`} />
          <span className="username">{props.firstname} </span>
          <span className="pipe"> | </span>
          <a href="" className="logout" onClick={handleLogout}>Log Out</a>
        </span>
      </div>
    </nav>
  )
}

const MapStateToProps = (state) => {
  const { firstname, profilePic } = state.userDetails;
  return { firstname, profilePic };
}

export default connect(MapStateToProps, { pullTracks, isLogged })(Header);
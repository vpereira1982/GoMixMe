import React from 'react';
import ReactDOM from 'react-dom';
import axios from 'axios';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import { pullTracks, isLogged } from './actions';
import '../css/header.css';

const Header = (props) => {
  const search = document.getElementById('searchbox');

  const clickToSearch = (e) => {
    e.preventDefault();
    window.location = `/search?q=${search.value}`;
    search.value = '';
  }

  const handleLogout = () => {
    axios.get('/api/destroyCookie')
      .then(res => {
        props.isLogged(false)
      });
  }

  return (
    <nav className="navbar navbar-light fixed-top text-white bg-navy">
      <div className="container justify-content-between">
        <Link to="/"><img className="navbar-brand" src="../images/logo.png" /></Link>
        <form className="form-inline" onSubmit={clickToSearch}>
          <input className="form-control" type="text" size="55" placeholder="Search" id="searchbox" />
          <button className="btn btn-success" id="button-search" type="button" onClick={clickToSearch}>
            Search
          </button>
          <a href='/upload'>
            <button className="btn btn-info" id="button-upload" type="button">
              Upload
            </button>
          </a>
        </form>
        <span className="navbar-text">
          <Link to={`/${props.displayname}`} onClick={() => location.reload()}>
            <img className="headerProfilePic" src={`http://localhost:8080/userfiles/${props.profilepic}`} />
            <span className="username">{props.firstname} </span>
          </Link>
          <span className="pipe font-weight-light"> | </span>
          <Link to={`/settings/${props.displayname}`}>
            <i className="material-icons settings">settings</i>
          </Link>
          <span className="pipe font-weight-light"> | </span>
          <a href="#" className="logout" onClick={handleLogout}>Log Out</a>
        </span>
      </div>
    </nav>
  )
}

const MapStateToProps = (state) => (state.userDetails);

export default connect(MapStateToProps, { pullTracks, isLogged })(Header);
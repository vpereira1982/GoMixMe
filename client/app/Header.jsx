import React from 'react';
import ReactDOM from 'react-dom';
import APIcall from '../apicall/ajax.js';
import { Link } from 'react-router-dom';

const Header = (props) => {
  let clickToSearch = () => {
    let query = document.getElementById('searchbox');
    props.handleSearch(query.value);
    query.value = '';
  }

  let handleLogout = () => {
    // Request server to Delete cookies
    APIcall.fetch('', '/api/destroyCookie', () => {
      console.log('cookie has been destroyed');
    });

    // Refresh after logout
    window.open('/');
  }

  return (
    <nav className="navbar-light text-white bg-primary">
      <div className="container">
        <span className="navbar-brand clickable" id="navbar-brand" onClick={() => { window.location.reload(); }}>GoMixMe</span>
        <form className="form-inline" id="searchbar">
          <input className="form-control" type="text" size="65" placeholder="Search" id="searchbox" />
          <button className="btn btn-success ml-2" id="button-search" type="button" onClick={clickToSearch}>Search</button>
          <Link to="/upload"><button className="btn btn-info ml-2" id="button-upload" type="button">Upload Multitrack</button></Link>
          <a href="" className="logout" onClick={handleLogout}>Log Out</a>
          <span className="pipe"> | </span>
          <span className="username">{props.userInfo.firstname} </span>
        </form>
      </div>
    </nav>
  )
}

export default Header;
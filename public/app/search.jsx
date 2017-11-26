import React from 'react';
import ReactDOM from 'react-dom';
import Main from './Main.jsx';

class Search extends React.Component {
  constructor(props) {
    super(props)
  }

  handleSubmit(event) {
    let query = document.getElementById('searchbox').value;

    this.props.handleSearch(query);
    event.preventDefault();
  }

  handleLogout() {
    window.localStorage.setItem("userid", null);
    location.assign("/");
    location.reload();
  }

  render() {
    return (
      <nav className="navbar-light text-white bg-primary">
        <div className="container">
          <span className="navbar-brand clickable" id="navbar-brand" onClick={() => { window.location.reload(); }}>Songbook</span>
          <form className="form-inline" id="searchbar" onSubmit={this.handleSubmit.bind(this)}>
            <input className="form-control" type="text" size="65" placeholder="Search" id="searchbox" />
            <button className="btn btn-outline-success btn-success ml-2" id="button-search" type="submit">Search</button>
            <a href="" className="logout" onClick={this.handleLogout.bind(this)}>Log Out</a>
            <span className="pipe"> | </span>
            <span className="username">{this.props.username}</span>
          </form>
        </div>
      </nav>
    )
  }
}

export default Search;
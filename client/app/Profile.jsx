import React from 'react';
import ReactDOM from 'react-dom';
import axios from 'axios';
import Loading from './Loading.jsx';
import { connect } from 'react-redux';

class Profile extends React.Component {
  constructor(props) {
    super(props);
    this.state = {userDetails: null};
    this.URLname = this.props.match.params.uname;
    this.path = 'http://127.0.0.1:8080/userfiles/'
  }

  componentDidMount() {
    axios.get('/api/uploadUser', { params: { displayname: this.URLname }})
      .then(res => {
        this.setState({ userDetails: res.data[0] })
      });
  }

  render() {
    if (!this.state.userDetails) {
      return <Loading />
    } else {
      console.log(this.state.userDetails)
      const {
        firstname,
        lastname,
        displayname,
        genre,
        description,
        profilepic } = this.state.userDetails
      const image = this.path + profilepic;
      return (
        <div className="bg-light">
          <div className="container bg-white content-body">
            <div className="row">
              <div className="col-4">
                <img className="border rounded track-main-img" src={`${image}`} />
              </div>
              <div className="col-8">
                <h5 className="header-custom">{displayname}</h5>
                <h4 className="font-weight-light mb-4">{`${firstname} ${lastname}`}</h4>
                <h5 className="font-weight-light mt-4 mb-4">Favorite Genre:
                  <span className="artwork-genre ml-3">{genre}</span>
                </h5>
                <p className="mt-4"> {description} </p>
              </div>
            </div>
          </div>
        </div>
      )
    }
  }
}


export default Profile;

import React from 'react'
import ReactDOM from 'react-dom';
import { connect } from 'react-redux';

class Settings extends React.Component {
  constructor (props) {
    super(props);
  }

  render() {
    const {
      profilePic,
      firstname,
      lastname,
      displayname,
      description,
      genre
    } = this.props.userDetails;
    console.log(this.props.userDetails)
    return (
        <div className="bg-light">
          <div className="container bg-white content-body">
            <div className="row">
              <div className="col-4 mt-2 mb-2">
                <img className="rounded track-main-img" src={`http://localhost:8080/userfiles/${profilePic}`} />
              </div>
              <div className="col-8">
                <h3 className="profile-headline">{displayname}</h3>
                <h4 className="font-weight-light mb-4 text-white">Settings Page</h4>
                <h5 className="font-weight-light mt-4 mb-4 text-white">Favorite Genre:
                  <span className="artwork-genre ml-3">{genre}</span>
                </h5>
                <p className="mt-4">{description}</p>
              </div>
            </div>
          </div>
        </div>
      )
  }
}

const MapStateToProps = (state) => {
  return {
    userDetails: state.userDetails
  }
}

export default connect(MapStateToProps, null)(Settings);

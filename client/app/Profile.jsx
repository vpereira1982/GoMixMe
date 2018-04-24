import React from 'react';
import ReactDOM from 'react-dom';
import axios from 'axios';
import Loading from './Loading.jsx';
import Mixes from './ListComponents/Mixes.jsx';
import Multitracks from './ListComponents/Multitracks.jsx';
import '../css/profile.css';

class Profile extends React.Component {
  constructor(props) {
    super(props);
    this.state = { userDetails: null };
    this.URLname = this.props.match.params.uname;
    this.mixes = [];
    this.multitracks = [];
    this.path = 'https://gomixme.s3.us-east-2.amazonaws.com/'
  }

  componentDidMount() {
    axios.get('/api/uploadUser', { params: { displayname: this.URLname }})
      .then(res => {
        res.data.forEach((track) => {
          if (track.src === 'mixes') {
            this.mixes.push(track);
          } else if (track.src === 'multitracks') {
            this.multitracks.push(track);
          }
        })
        this.setState({ userDetails: res.data[0] });
      });
  }

  render() {
    if (!this.state.userDetails) {
      return <Loading />
    } else {
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
            <div className="row profile-bckgnd">
              <div className="col-4 mt-2 mb-2">
                <img className="rounded profile-pic" src={`${image}`} />
              </div>
              <div className="col-8">
                <h3 className="profile-headline">{displayname}</h3>
                <h4 className="font-weight-light mb-4 text-white">{`${firstname} ${lastname}`}</h4>
                <h5 className="font-weight-light mt-4 mb-4 text-white">Favorite Genre:
                  <span className="artwork-genre ml-3">{genre}</span>
                </h5>
                <p className="mt-4 text-white"><small>{description}</small></p>
              </div>
            </div>
            <div className="row mt-3">
              <div className="col-5">
                <h4 className="display-4 header-custom mt-3">{firstname}'s Mixes</h4>
                {this.mixes.length ?
                  <Mixes mixes={this.mixes} /> :
                  'No Mixes yet'
                 }
              </div>
                <div className="col-1">
                  <div className="col-12 border-right border-main"></div>
                </div>
              <div className="col-5">
                <h4 className="display-4 header-custom mt-3">{firstname}'s Multitrack Sessions</h4>
                {this.multitracks.length ?
                  <Multitracks multitracks={this.multitracks} /> :
                  'No Multitracks yet'
                }
              </div>
            </div>
          </div>
        </div>
      )
    }
  }
}


export default Profile;

import React from 'react';
import ReactDOM from 'react-dom';
import axios from 'axios';
import AudioPlayer from 'react-responsive-audio-player';
import { connect } from 'react-redux';
import Loading from '../Loading.jsx';
import { pullTrackInfo, clearTrackInfo } from '../actions';
import '../../css/audioplayer.css';
import '../../css/track.css';


class TrackPage extends React.Component {
  constructor(props) {
    super(props);
    this.path = 'http://127.0.0.1:8080/userfiles/';
  }

  componentWillMount() {
    const { type, uname, track } = this.props.match.params;
    const { thisTrack, pullTrackInfo } = this.props;
    pullTrackInfo(uname, track, type === 'mix');
  }

  componentWillUnmount() {
    this.props.clearTrackInfo();
  }

  render() {
    if (!this.props.thisTrack) {
      return <Loading />
    } else {
      const { thisTrack, userPic } = this.props;
      const uploadUserPic = this.path + thisTrack.profilepic;
      const trackImg = this.path + JSON.parse(thisTrack.image).filename;
      const filePath = this.path + JSON.parse(thisTrack.file).filename;
      const curUserPic = this.path + userPic;
      const playlist = [{url: filePath, title: `${thisTrack.artist} - ${thisTrack.title}`}];

      return (
        <div className="bg-light">
          <div className="container bg-white content-body">
            <div className="row">
              <div className="col-8">
                <div className="row">
                  <div className="col-1">
                    <i className="header-custom material-icons track-play-icon">play_circle_filled</i>
                  </div>
                  <div className="col-11">
                    <span className="header-custom pl-1">{thisTrack.title}</span>
                    <small className="text-muted ml-2">Mix</small>
                  </div>
                </div>
                <div className="row">
                  <div className="offset-md-1 col-11">
                    <p className="track-play-info">Uploaded by:
                      <a href="#" className="font-weight-light pl-2">{thisTrack.displayname}</a>
                    </p>
                    <p><span className="artwork-genre">{thisTrack.genre}</span></p>
                  </div>
                </div>
                <div className="row">
                  <div className="track-player col-12">
                    <AudioPlayer playlist={playlist} />
                  </div>
                </div>
              </div>
              <div className="col-4">
                <img className="rounded float-right track-main-img" src={`${trackImg}`} />
              </div>
            </div>

            <div className="row mt-3">
              <div className="col-12">
                <form className="form-inline">
                  <div className="track-add-comment">
                    <img className="track-img-comment" src={`${curUserPic}`} />
                    <input
                      type="text"
                      className="track-input form-control mr-2"
                      name="comment"
                      placeholder="Add a Comment"
                    />
                  </div>
                </form>
                <hr/>
              </div>
            </div>

            <div className="row mt-2">
              <div className="col-2">
                <img className="track-uploader-img" src={`${uploadUserPic}`} />
              </div>
              <div className="col-10">
                <div className="ml-4">
                  <h5 className="track-uploader">{thisTrack.displayname}'s Track Details:</h5>
                  <small className="text-muted">{thisTrack.description}</small>
                </div>
              </div>
            </div>

            <div className="row">
              <div className="col-2">
              </div>
              <div className="col-10">
                <div className="ml-4">
                  <hr/>
                  <h5 className="track-uploader">Comments:</h5>
                </div>
              </div>
            </div>

          </div>
        </div>
      )
    }
  }
}

const MapStateToProps = (state) => {
  console.log('this is state', state);
  return {
    userPic: state.userDetails.profilePic,
    thisTrack: state.thisTrack
  };
}

export default connect(MapStateToProps, { pullTrackInfo, clearTrackInfo })(TrackPage);
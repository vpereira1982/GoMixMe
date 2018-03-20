import React from 'react';
import ReactDOM from 'react-dom';
import axios from 'axios';
import AudioPlayer from 'react-responsive-audio-player';
import { connect } from 'react-redux';
import Loading from '../Loading.jsx';
import { storeSingleTrack } from '../actions';
import '../../css/audioplayer.css';

class MixTrack extends React.Component {
  constructor(props) {
    super(props);
    this.path = 'http://127.0.0.1:8080/userfiles/';
  }

  componentDidMount() {
    const { track, storeSingleTrack, id } = this.props;

    if (!track) {
      // if user reloaded or went straight to Mix Page, get ID and pull track Info.
      storeSingleTrack(null, id, true);
    } else if (Array.isArray(track)) {

      for (let i = 0; i < track.length; i++) {
        if (track[i].id === id) {
          storeSingleTrack([track[i]]);
          break;
        }
      }
    }
  }

  render() {
    if (!this.props.track) {
      return <Loading />
    } else {
      const { track, pullUploader, profilePic } = this.props;
      const imgPath = track.image ? this.path + JSON.parse(track.image).filename : null;
      const filePath = track.file ? this.path + JSON.parse(track.file).filename : null;
      const playlist = [{url: filePath, title: `${track.artist} - ${track.title}`}];

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
                    <span className="header-custom pl-1">{track.title}</span>
                    <span className="track-play-type font-weight-bold align-baseline pl-3">mix</span>
                  </div>
                </div>
                <div className="row">
                  <div className="offset-md-1 col-11">
                    <p className="track-play-info">Uploaded by:<a href="#" className="font-weight-light pl-2">{track.displayName}</a></p>
                    <p><span className="artwork-genre">{track.genre}</span></p>
                  </div>
                </div>
                <div className="row">
                  <div className="track-player col-12">
                    <AudioPlayer playlist={playlist} />
                  </div>
                </div>
              </div>
              <div className="col-4">
                <img className="rounded float-right track-page" src={imgPath} />
              </div>
            </div>

            <div className="row mt-3">
              <div className="col-12">
                <form className="form-inline">
                  <div className="track-input">
                    <img className="track-img-comment" src={`http://127.0.0.1:8080/userfiles/${profilePic}`} />
                    <input type="text" className="form-control mr-2" name="comment" placeholder="Add a Comment" style={{'width': '90%'}} />
                  </div>
                </form>
              </div>
            </div>

            <div className="row mt-4">
              <div className="col-4">
                <img className="track-img-comment" src={`http://127.0.0.1:8080/userfiles/${profilePic}`} />
              </div>
              <div className="col-8">
              </div>
            </div>


          </div>
        </div>
      )
    }
  }
}

const MapStateToProps = (state) => {
  const { track } = state.currentTrack;
  const { tracks } = state.tracklist;
  const id = Number(location.href[location.href.length - 1]);
  let mixes = null;

  if (track && track.id === id) {
    mixes = track;
  } else if (tracks) {
    mixes = tracks.mixes;
  }
  console.log(mixes);
  return {
    profilePic: state.userDetails.profilePic,
    track: mixes,
    id
  };
}

export default connect(MapStateToProps, { storeSingleTrack })(MixTrack);
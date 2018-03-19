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
      console.log(this.props.tracks);
      const { image, displayName, genre, file } = this.props.track;
      const imgPath = image ? '../../userfiles/' + JSON.parse(image).filename : null;
      const filePath = file ? 'http://localhost:8080/userfiles/' + JSON.parse(file).filename : null;
      const playlist = [{url: filePath, title: 'Winter Of None'}];
      console.log(playlist)

      return (
        <div className="bg-light">
          <div className="container bg-white content-body">
            <div className="row">
              <div className="col-8">
                <div className="row">
                  <div className="col-1">
                    <i className="header-custom material-icons align-bottom pr-2 track-play-icon">play_circle_filled</i>
                  </div>
                  <div className="col-11">
                    <span className="header-custom pr-1">{this.props.track.artist}</span>
                    <span className="track-play-type font-weight-bold align-baseline pl-4">MIX</span>
                  </div>
                </div>
                <div className="row">
                  <div className="offset-md-1 col-11">
                    <p className="track-play-info">Uploaded By:<a href="#" className="font-weight-light pl-3">{displayName}</a></p>
                    <p><span className="artwork-genre">{genre}</span></p>
                  </div>                </div>

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
                <form className="">
                  <div className="form-group track-input">
                    <input type="email" className="form-control" name="track-comment" placeholder="Add Comment" />
                  </div>
                </form>
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

  return {
    track: mixes,
    id
  };
}

export default connect(MapStateToProps, { storeSingleTrack })(MixTrack);
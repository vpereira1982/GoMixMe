import React from 'react';
import ReactDOM from 'react-dom';
import axios from 'axios';
import { storeSingleTrack } from '../actions';
import { connect } from 'react-redux';
import Loading from '../Loading.jsx';

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
      return (
        <div className="bg-light">
          <div className="container bg-white content-body">
            <h1>{this.props.track.artist}</h1>
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
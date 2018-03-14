import React from 'react';
import ReactDOM from 'react-dom';
import App from './App.jsx';
import Mixes from './listComponents/Mixes.jsx';
import Multitracks from './listComponents/Multitracks.jsx';
import { connect } from 'react-redux';
import { pullTracks } from './actions';

class Main extends React.Component {
  constructor(props) {
    super(props);
  }

  componentDidMount() {
    if (!this.props.tracklist) {
      this.props.pullTracks('');
    }
  }

  render () {
    const { tracklist } = this.props;
    if (tracklist) {
      return (
        <div className="bg-light">
          <div className="container bg-white content-body">
            <div className="row">
              <div className="col-5">
                <h1 className="display-4 header-custom mt-3">Mixes</h1>
                <Mixes mixes={tracklist.mixes} />
              </div>
              <div className="col-1">
                <div className="row">
                  <div className="col-6 border-right border-main"></div>
                </div>
              </div>
              <div className="col-5">
                <h1 className="display-4 header-custom mt-3">Multitrack Sessions</h1>
                <Multitracks multitracks={tracklist.multitracks} />
              </div>
            </div>
          </div>
        </div>
      )
    } else {
      return null;
    }
  }
}

const MapStateToProps = (state) => {
  return {
    searchQuery: state.searchQuery,
    profilePic: state.userDetails.profilePic,
    tracklist: state.tracklist.tracks
  };
}

export default connect(MapStateToProps, { pullTracks })(Main);
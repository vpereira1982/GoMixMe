import React from 'react';
import ReactDOM from 'react-dom';
import App from './App.jsx';
import Mixes from './listComponents/Mixes.jsx';
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
    console.log(this.props.tracklist)
    if (this.props.tracklist) {
      return (
        <div className="bg-light">
          <div className="container bg-white content-body">
            <div className="row">
              <div className="col">
                <h1 class="display-4 header-custom mt-3">Mixes</h1>

                <Mixes mixes={this.props.tracklist} />
              </div>
                <div className="col">
                    {[1,2,3,4,5].map((i) =>
                      <p> {i} </p>
                    )}
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
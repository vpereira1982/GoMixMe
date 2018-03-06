import React from 'react';
import ReactDOM from 'react-dom';
import App from './App.jsx';
import Results from './Results.jsx';
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
    if (this.props.tracklist) {
      return (
        <div className="container">
          <Results users={this.props.tracklist} />
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
    tracklist: state.tracklist.tracks
  };
}

export default connect(MapStateToProps, { pullTracks })(Main);
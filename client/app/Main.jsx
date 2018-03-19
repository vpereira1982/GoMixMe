import React from 'react';
import ReactDOM from 'react-dom';
import App from './App.jsx';
import axios from 'axios';
import { connect } from 'react-redux';
import { pullTracks } from './actions';
import List from './ListComponents/List.jsx';

class Main extends React.Component {
  constructor(props) {
    super(props);
    this.state = {page: 0};
    this.handleScrolling = this.handleScrolling.bind(this);
  }

  componentDidMount() {
    // 'onScroll' does not work well in React + CSS.
    window.addEventListener('scroll', this.handleScrolling);

    // Pull page 1 tracks
    if (!this.props.tracklist) {
      this.props.pullTracks();
    }
  }

  componentWillUnmount() {
    window.removeEventListener('scroll', this.handleScrolling);
  }

  handleScrolling() {
    // InnerHeight of the browser window's viewport
    const windowHeight = window.innerHeight;
    const docHeight = document.documentElement.offsetHeight;
    const windowBottom = windowHeight + window.pageYOffset;

    // Give 1 pixel buffer
    if (windowBottom >= docHeight - 1) {
      this.setState({page: this.state.page + 1});
      this.props.pullTracks(null, this.state.page);
    }
  }

  render () {
    const { tracklist } = this.props;

    if (tracklist) {
      return (
        <div className="bg-light">
          <div className="container bg-white main-body">
            <List tracklist={tracklist} />
          </div>
        </div>
      )
    } else {
      return null;
    }
  }
}

const MapStateToProps = (state) => {
  return {tracklist: state.tracklist.tracks};
}

export default connect(MapStateToProps, { pullTracks })(Main);
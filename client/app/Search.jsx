import React from 'react';
import ReactDOM from 'react-dom';
import { connect } from 'react-redux';
import { pullTracks } from './actions';
import Mixes from './ListComponents/Mixes.jsx';
import Multitracks from './ListComponents/Multitracks.jsx';

class Search extends React.Component {
  constructor(props) {
    super(props);
    this.query = location.search.slice(3);
  }

  componentWillMount() {
    this.props.pullTracks(this.query, 0, true);
  }

  render() {
    const { searchResults } = this.props;
    if (searchResults) {
      return (
        <div className="bg-light">
          <div className="container bg-white content-body">
            <div className="row">
              <div className="col-12">
                <h1 className="display-4 header-custom mt-3">Search results for <span className="text-dark font-weight-normal">"{this.query}"</span></h1>
                <hr/>
                <h6>Mixes</h6>
                {searchResults.mixes.length || 'No Results Found'}
                <Mixes mixes={searchResults.mixes} />
                <hr/>
                <h6>Multitracks</h6>
                {searchResults.multitracks.length || 'No Results Found'}
                <Multitracks multitracks={searchResults.multitracks} />
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
  console.log(state);
  return { searchResults: state.searchResults.tracks };
}

export default connect(MapStateToProps, { pullTracks })(Search);
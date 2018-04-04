import { combineReducers } from 'redux';
import UserReducer from './UserReducer.js';
import TracklistReducer from './TracklistReducer.js';
import SearchReducer from './SearchReducer.js';


export default combineReducers({
  userDetails: UserReducer,
  trackList: TracklistReducer,
  searchResults: SearchReducer
});


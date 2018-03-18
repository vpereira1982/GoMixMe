import { combineReducers } from 'redux';
import UserReducer from './UserReducer.js';
import TracklistReducer from './TracklistReducer.js';
import TrackReducer from './TrackReducer.js';

export default combineReducers({
  userDetails: UserReducer,
  tracklist: TracklistReducer,
  currentTrack: TrackReducer
});


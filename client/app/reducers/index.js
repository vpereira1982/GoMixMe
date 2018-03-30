import { combineReducers } from 'redux';
import UserReducer from './UserReducer.js';
import TracklistReducer from './TracklistReducer.js';

export default combineReducers({
  userDetails: UserReducer,
  trackList: TracklistReducer
});


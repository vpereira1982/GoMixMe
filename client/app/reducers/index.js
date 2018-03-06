import { combineReducers } from 'redux';
import UserReducer from './UserReducer.js';
import UploadReducer from './UploadReducer.js';
import TracklistReducer from './TracklistReducer.js';

export default combineReducers({
  userDetails: UserReducer,
  uploadDetails: UploadReducer,
  tracklist: TracklistReducer
});


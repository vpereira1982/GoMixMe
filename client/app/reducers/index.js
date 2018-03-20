import { combineReducers } from 'redux';
import UserReducer from './UserReducer.js';
import TracklistReducer from './TracklistReducer.js';
import TrackReducer from './TrackReducer.js';
import UploadUserReducer from './UploadUserReducer.jsx';

export default combineReducers({
  userDetails: UserReducer,
  uploaderDetails: UploadUserReducer,
  tracklist: TracklistReducer,
  currentTrack: TrackReducer
});


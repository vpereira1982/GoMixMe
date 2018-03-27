import { combineReducers } from 'redux';
import UserReducer from './UserReducer.js';
import TracklistReducer from './TracklistReducer.js';
import TrackReducer from './TrackReducer.js';
import CommentsReducer from './CommentsReducer.js';

export default combineReducers({
  trackComments: CommentsReducer,
  userDetails: UserReducer,
  trackList: TracklistReducer,
  thisTrack: TrackReducer
});


import { combineReducers } from 'redux';
import UserReducer from './UserReducer.js';
import UploadReducer from './UploadReducer.js';


export default combineReducers({
  userDetails: UserReducer,
  uploadDetails: UploadReducer
});


import { combineReducers } from 'redux';
import UserDetailsReducer from './UserDetailsReducer.js';

export default combineReducers({
  userDetails: UserDetailsReducer
});


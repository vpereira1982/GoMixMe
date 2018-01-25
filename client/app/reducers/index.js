import { combineReducers } from 'redux';
import { currentUserInfoRed } from '../actions/index.js';

export default combineReducers({
  currentUserInfo: () => []
});
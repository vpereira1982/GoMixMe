import path from 'path';

const defaultState = {
        isLogged: '',
        firstname: '',
        lastname: '',
        displayname: '',
        email: '',
        pw: '',
        id: '',
        profilePic: '../images/default-profile.png',
        isReturning: true
      }


export default (state = defaultState, action) => {
  switch (action.type) {
    case 'first_name':
      return Object.assign({}, state, {firstname: action.payload});

    case 'last_name':
      return Object.assign({}, state, {lastname: action.payload});

    case 'display_name':
      return Object.assign({}, state, {displayname: action.payload});

    case 'isLogged':
      return Object.assign({}, state, {isLogged: action.payload});

    case 'email':
      return Object.assign({}, state, {email: action.payload});

    case 'pw':
      return Object.assign({}, state, {pw: action.payload});

    case 'isReturning':
      return Object.assign({}, state, {isReturning: action.payload});

    case 'ProfilePic':
      return Object.assign({}, state, {profilePic: action.payload});

    case 'storeId':
      return Object.assign({}, state, {id: action.payload});

    default:
      return state;
  }
}
const defaultState = {
        isLogged: '',
        firstname: '',
        lastname: '',
        displayname: '',
        email: '',
        pw: '',
        id: '',
        profilepic: '../images/default-profile.png',
        isReturning: true
      }

export default (state = defaultState, action) => {
  switch (action.type) {
    case 'persist_user':
      const userInfo = action.payload;
      if (!userInfo) {
        return Object.assign({}, state, { isLogged: false });
      }
      userInfo.isLogged = userInfo.hasOwnProperty('id');
      return Object.assign({}, state, userInfo);

    case 'email':
      return Object.assign({}, state, {email: action.payload});

    case 'pw':
      return Object.assign({}, state, {pw: action.payload});

    case 'isLogged':
      return Object.assign({}, state, {isLogged: action.payload});

    default:
      return state;
  }
}
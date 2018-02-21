const defaultState = {
        isLogged: '',
        firstname: '',
        lastname: '',
        email: '',
        pw: '',
        isReturning: true
      }


export default (state = defaultState, action) => {
  switch (action.type) {
    case 'first_name':
      return Object.assign({}, state, {firstname: action.payload});

    case 'last_name':
      return Object.assign({}, state, {lastname: action.payload});

    case 'isLogged':
      return Object.assign({}, state, {isLogged: action.payload});

    case 'email':
      return Object.assign({}, state, {email: action.payload});

    case 'pw':
      return Object.assign({}, state, {pw: action.payload});

    case 'isReturning':
      return Object.assign({}, state, {isReturning: action.payload});

    default:
      return state;
  }
}
const defaultState = null;

export default (state = defaultState, action) => {
  switch (action.type) {

    case 'pullComments': {
      return Object.assign({}, state, action.payload);
    }

    case 'clearComments':
      return defaultState;

    default:
      return state;
  }
}
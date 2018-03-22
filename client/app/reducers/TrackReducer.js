const defaultState = null;

export default (state = defaultState, action) => {
  switch (action.type) {

    case 'pullTrackInfo':
      return Object.assign({}, state, action.payload);

    case 'clearTrackInfo':
      return defaultState;

    default:
      return state;
  }
}
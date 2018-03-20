const defaultState = {
  track: null
}

export default (state = defaultState, action) => {
  switch (action.type) {

    case "singleTrack":
      return Object.assign({}, state, {track: action.payload[0]});

    default:
      return state;
  }
}
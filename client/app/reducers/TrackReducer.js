const defaultState = {
  track: null
}

export default (state = defaultState, action) => {
  switch (action.type) {

    case "singleTrack":
    console.log('inside the reducer', action.payload)
      return Object.assign({}, state, {track: action.payload[0]});

    default:
      return state;
  }
}
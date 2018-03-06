const defaultState = {
  tracks: false
}

export default (state = defaultState, action) => {
  switch (action.type) {
    case "pullTracks":
      return Object.assign({}, state, {tracks: action.payload})

    default:
      return state;
  }
}
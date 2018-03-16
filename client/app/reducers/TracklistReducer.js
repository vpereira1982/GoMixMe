const defaultState = {
  tracks: null
}

export default (state = defaultState, action) => {
  switch (action.type) {

    case "pullTracks":
      // if state = null, render the first tracks from 0. Else, concat AllTracks
      if (state.tracks) {
        const { mixes: stateMx, multitracks: stateMt } = state.tracks;
        const { mixes: payloadMx, multitracks: payloadMt } = action.payload;
        action.payload = {
          mixes: stateMx.concat(payloadMx),
          multitracks: stateMt.concat(payloadMt)
        }
      }

      return Object.assign({}, state, {tracks: action.payload});

    default:
      return state;
  }
}
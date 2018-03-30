const defaultState = false


export default (state = defaultState, action) => {
  switch (action.type) {

    case 'isPlaying':
      // if state = null, render the first tracks from 0. Else, concat AllTracks
      return action.payload;

    default:
      return state;
  }
}
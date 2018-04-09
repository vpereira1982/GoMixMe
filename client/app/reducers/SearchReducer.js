import genTracklistState from '../helperFunctions/genTracklistState';

export default (state = { tracks: null }, action) => {
  switch (action.type) {
    case 'search':
      // if state = null, render the first tracks from 0. Else, concat AllTracks
      return genTracklistState(state, action.payload);

    default:
      return state;
  }
}
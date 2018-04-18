export default (state, payload) => {
  if (state.tracks) {
    const { mixes: stateMx, multitracks: stateMt } = state.tracks;
    const { mixes: payloadMx, multitracks: payloadMt } = payload;
    payload = {
      mixes: stateMx.concat(payloadMx),
      multitracks: stateMt.concat(payloadMt),
    }
  }
  return Object.assign({}, state, {tracks: payload});
}
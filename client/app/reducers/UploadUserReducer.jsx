const defaultState = null;

const UploadUserReducer = (state = defaultState, action) => {
  switch(action.type) {
    case 'pullUploader':
      return Object.assign({}, state, action.payload);

    default:
      return state;
  }
}

export default UploadUserReducer;
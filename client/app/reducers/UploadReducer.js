const defaultState = {
  isMix: false,
  isMultitrack: false,
  sessionPreviewFile: '',
  isSessionSynced: false,
  sessionFiles: [],
  mixFile: ''/*,
  imgSrc: '../../images/default-profile.jpg'*/
}

export default (state = defaultState, action) => {
  switch(action.type) {
    case 'UploadType':
      const uploadType = action.payload

      if (uploadType === 'Mix') {
        return Object.assign({}, state, { isMix: true });
      } else {
        return Object.assign({}, state, { isMultitrack: true });
      }

    case 'saveFileDetails':
      const fileDetails = {};

      for (var item of action.payload) {
        fileDetails[item[0]] = item[1];
      }
      return Object.assign({}, state, { MixFile: fileDetails.MixFile });

    default:
      return state;
  }
}
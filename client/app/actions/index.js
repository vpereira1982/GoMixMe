import axios from 'axios';

export const updateFirstName = (name) => {
  return {
    type: 'first_name',
    payload: name
  }
}

export const updateLastName = (name) => {
  return {
    type: 'last_name',
    payload: name
  }
}

export const updateDisplayName = (name) => {
  return {
    type: 'display_name',
    payload: name
  }
}

export const isLogged = (bool) => {
  return {
    type: 'isLogged',
    payload: bool
  }
}

export const updateEmail = (email) => {
  return {
    type: 'email',
    payload: email
  }
}

export const updatePw = (pw) => {
  return {
    type: 'pw',
    payload: pw
  }
}

export const storeId = (id) => {
  return {
    type: 'storeId',
    payload: id
  }
}

export const isReturning = (bool) => {
  return {
    type: 'isReturning',
    payload: bool
  }
}

export const selectUploadType = (name) => {
  return {
    type: 'UploadType',
    payload: name
  }
}

export const updateFileData = (formData) => {
  return {
    type: 'saveFileDetails',
    payload: formData
  }
}

export const updateProfilePic = (image) => {
  return {
    type: 'ProfilePic',
    payload: image
  }
}

export const pullTracks = (search = '', page = 0) => {
  return (
    axios.get('/api/tracks', { params: { search, page } })
      .then(res => ({
        type: 'pullTracks',
        payload: res.data
      }))
  )
}

export const pullTrackInfo = (user, title, isMix) => {
  title = title.replace(/-/g, " ");

  return (
    axios.get('/api/trackDetails', { params: { isMix, user, title } })
      .then(res => ({
        type: 'pullTrackInfo',
        payload: res.data[0]
      }))
  )
}

export const pullComments = (trackId, isMix) => {
  return (
    axios.get('/api/trackComments', { params: { isMix, trackId } })
      .then(res => ({
        type: 'pullComments',
        payload: res.data
      }))
  )
}


export const clearTrackInfo = () => {
  return {
    type: 'clearTrackInfo',
    payload: null
  }
}

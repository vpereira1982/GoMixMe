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
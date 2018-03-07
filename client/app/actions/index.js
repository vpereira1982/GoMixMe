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

export const pullTracks = (request) => {
  return axios.get('/api/all', { params: { query: request } })
  .then(res => ({type: 'pullTracks', payload: res.data}) );
}
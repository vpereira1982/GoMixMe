import axios from 'axios';

export const changeFirstName = (name) => {
  return {
    type: 'first_name',
    payload: name
  }
}

export const changeLastName = (name) => {
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

export const changeEmail = (email) => {
  return {
    type: 'email',
    payload: email
  }
}

export const changePw = (pw) => {
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

export const handleFileData = (formData) => {
  return {
    type: 'saveFileDetails',
    payload: formData
  }
}

export const handleUploadImage = (image) => {
  return {
    type: 'handleUploadImage',
    payload: image
  }
}

export const pullTracks = (request) => {
  return axios.get('/api/all', { params: { query: request } })
  .then(res => ({type: 'pullTracks', payload: res.data}) );
}
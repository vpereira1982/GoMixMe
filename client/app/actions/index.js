import axios from 'axios';

export const persistUser = (info) => {
  return {
    type: 'persist_user',
    payload: info
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

export const updateProfilePic = (image) => {
  return {
    type: 'ProfilePic',
    payload: image
  }
}

export const pullTracks = (search = '', page = 0, isSearch = false) => {
  return (
    axios.get('/api/tracks', { params: { search, page } })
      .then(res => ({
        type: isSearch ? 'search' : 'mainTracks',
        payload: res.data,
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

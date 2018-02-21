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

export const checkIfLogged = (bool) => {
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

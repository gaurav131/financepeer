const api = 'http://localhost:5000'

export const loginApi = (email, password) =>
  fetch(`${api}/login/`, {
    method: 'post',
    body: JSON.stringify({'email': email, 'password': password})
  })
    .then(res => res.json()).then(res => res)

export const createAccountApi = (userid, password, name) =>
  fetch(`${api}/signup/`, {
    method: 'post',
    body: JSON.stringify({'email': userid, 'password': password, 'name': name})
  })
    .then(res => res.json()).then(res => res)

export const addDataApi = (data, email, token) =>
  fetch(`${api}/addData/`, {
    method: 'post',
    headers: {'Accept': 'application/json', 'Authorization': 'Bearer '+token},
    body: JSON.stringify({'data': data, 'email': email})
  })
    .then(res => res.json()).then(res => res)

export const getDataApi = (email, token) =>
  fetch(`${api}/getData/`, {
    method: 'post',
    headers: {'Accept': 'application/json', 'Authorization': 'Bearer '+token},
    body: JSON.stringify({'email': email})
  })
    .then(res => res.json()).then(res => res['data'])

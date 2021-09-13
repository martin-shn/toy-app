// const axios = require('axios');
import Axios from 'axios'
// import { storageService } from './async-storage.service.js'

// const STORAGE_KEY = 'user'
const BASE_USER_URL = (process.env.NODE_ENV == 'production')
 ? '/api/'
 : '/localhost:3030/api/';

const STORAGE_KEY_LOGGEDIN = 'loggedinUser'

export const userService = {
    login,
    logout,
    signup,
    update,
    getLoggedinUser
}

const axios = Axios.create({
    withCredentials: true
});

window.userService = userService;

function login(credentials) {
    return axios.post(`${BASE_USER_URL}login`,credentials)
    .then(res=>res.data)
    .then(user =>{
        sessionStorage.setItem(STORAGE_KEY_LOGGEDIN, JSON.stringify(user))
        return user;
    })
    .catch(err=>console.log('Cannot login',err))
}

function signup(credentials) {
    return axios.post(`${BASE_USER_URL}signup`, {credentials}).then(res => res.data)
    .then(user => {
        sessionStorage.setItem(STORAGE_KEY_LOGGEDIN, JSON.stringify(user))
        return user
    })
}

function update(credentials) {
    return axios.post(`${BASE_USER_URL}signup`, {credentials,activeUser:getLoggedinUser()}).then(res => res.data)
    .then(user => {
        sessionStorage.setItem(STORAGE_KEY_LOGGEDIN, JSON.stringify(user))
        return user
    })
}

function logout() {
    return axios.post(`${BASE_USER_URL}logout`).then(() =>
            sessionStorage.setItem(STORAGE_KEY_LOGGEDIN, null)
        )
        .catch(err=>{
            sessionStorage.setItem(STORAGE_KEY_LOGGEDIN, null)
            return Promise.resolve()
        })
}

function getLoggedinUser() {
    return JSON.parse(sessionStorage.getItem(STORAGE_KEY_LOGGEDIN))
}

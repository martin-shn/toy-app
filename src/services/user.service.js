// const axios = require('axios');
import Axios from 'axios'
// import { storageService } from './async-storage.service.js'

// const STORAGE_KEY = 'user'
const BASE_USER_URL = (process.env.NODE_ENV === 'production')
 ? '/api/auth/'
 : 'http://localhost:3030/api/auth/';

const STORAGE_KEY_LOGGEDIN = 'loggedinUser'

export const userService = {
    login,
    logout,
    signup,
    // update,
    getLoggedinUser
}

const axios = Axios.create({
    withCredentials: true
});

window.userService = userService;

async function login(credentials) {
    try{
        const res = await axios.post(`${BASE_USER_URL}login`,credentials)
        const user = res.data
        sessionStorage.setItem(STORAGE_KEY_LOGGEDIN, JSON.stringify(user))
        return user;
    } catch (err) {
        console.log('Cannot login (service)',err)
        throw err
    }
}

async function signup(credentials) {
    try {
        const res = await axios.post(`${BASE_USER_URL}signup`, {credentials})
        const user = res.data
        sessionStorage.setItem(STORAGE_KEY_LOGGEDIN, JSON.stringify(user))
        return user
    } catch (err){
        console.log('Cannot signup (service)', err)
        throw err
    }
}

async function logout() {
    try{
        await axios.post(`${BASE_USER_URL}logout`)
        sessionStorage.setItem(STORAGE_KEY_LOGGEDIN, null)
    } catch(err){
        sessionStorage.setItem(STORAGE_KEY_LOGGEDIN, null)
        return Promise.resolve()
    }
}

function getLoggedinUser() {
    return JSON.parse(sessionStorage.getItem(STORAGE_KEY_LOGGEDIN))
}

// const axios = require('axios');
import Axios from 'axios'
// import { storageService } from './async-storage.service.js'

// const STORAGE_KEY = 'user'
const BASE_AUTH_URL = (process.env.NODE_ENV === 'production')
 ? '/api/auth/'
 : 'http://localhost:3030/api/auth/';
const BASE_USER_URL = (process.env.NODE_ENV === 'production')
 ? '/api/user/'
 : 'http://localhost:3030/api/user/';

const STORAGE_KEY_LOGGEDIN = 'loggedinUser'

export const userService = {
    userQuery,
    login,
    logout,
    signup,
    update,
    getLoggedinUser,
    getUserById,
    removeUser
}

const axios = Axios.create({
    withCredentials: true
});

window.userService = userService;

async function userQuery(filterBy={}){
    try{
        const res = await axios.get(`${BASE_USER_URL}`, {params:filterBy})
        return res.data
    } catch(err){
        console.log('Cannot query users', err)
        throw err
    }
}

async function getUserById(userId){
    try{
        const res = await axios.get(`${BASE_USER_URL}/${userId}`)
        return res.data
    } catch(err){
        console.log('Cannot get user by Id', err)
        throw err
    }
}

async function update(user){
    try{
        const res = await axios.put(`${BASE_USER_URL}`, {user})
        return res.data
    } catch (err) {
        console.log('Cannot update user', err);
        throw err
    }
}

async function removeUser(user){
    try{
        const res = await axios.delete(`${BASE_USER_URL}/${user._id}`)
        return res.data
    } catch (err) {
        console.log('Cannot remove user', err);
        throw err
    }
}

async function login(credentials) {
    try{
        const res = await axios.post(`${BASE_AUTH_URL}login`,credentials)
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
        const res = await axios.post(`${BASE_AUTH_URL}signup`, {credentials})
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
        await axios.post(`${BASE_AUTH_URL}logout`)
        sessionStorage.setItem(STORAGE_KEY_LOGGEDIN, null)
    } catch(err){
        sessionStorage.setItem(STORAGE_KEY_LOGGEDIN, null)
    }
    return Promise.resolve()
}

function getLoggedinUser() {
    return JSON.parse(sessionStorage.getItem(STORAGE_KEY_LOGGEDIN))
}

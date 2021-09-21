import { httpService } from './http.service'

// const BASE_AUTH_URL = (process.env.NODE_ENV === 'production')
//  ? '/api/auth/'
//  : 'http://localhost:3030/api/auth/';
// const BASE_USER_URL = (process.env.NODE_ENV === 'production')
//  ? '/api/user/'
//  : 'http://localhost:3030/api/user/';

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

async function userQuery(filterBy={}){
    try{
        // const res = await axios.get(`${BASE_USER_URL}`, {params:filterBy})
        // return res.data
        return httpService.get('user/', filterBy)
    } catch(err){
        console.log('Cannot query users', err)
        throw err
    }
}

async function getUserById(userId){
    try{
        // const res = await axios.get(`${BASE_USER_URL}/${userId}`)
        // return res.data
        return httpService.get(`user/${userId}`)
    } catch(err){
        console.log('Cannot get user by Id', err)
        throw err
    }
}

async function update(user){
    try{
        // const res = await axios.put(`${BASE_USER_URL}`, {user})
        // return res.data
        user = await httpService.put(`user/`, user)
        if (getLoggedinUser()._id === user._id) _saveLocalUser(user)
        return user;
    } catch (err) {
        console.log('Cannot update user', err);
        throw err
    }
}

async function removeUser(user){
    try{
        // const res = await axios.delete(`${BASE_USER_URL}/${user._id}`)
        // return res.data
        return httpService.delete(`user/${user._id}`)
    } catch (err) {
        console.log('Cannot remove user', err);
        throw err
    }
}

async function login(credentials) {
    try{
        // const res = await axios.post(`${BASE_AUTH_URL}login`,credentials)
        // const user = res.data
        const user = await httpService.post('auth/login', credentials)
        if (user) return _saveLocalUser(user)
    } catch (err) {
        console.log('Cannot login (service)',err)
        throw err
    }
}

async function signup(credentials) {
    try {
        // const res = await axios.post(`${BASE_AUTH_URL}signup`, {credentials})
        // const user = res.data
        // sessionStorage.setItem(STORAGE_KEY_LOGGEDIN, JSON.stringify(user))
        // return user
        const user = await httpService.post('auth/signup', {credentials})
        return _saveLocalUser(user)
    } catch (err){
        console.log('Cannot signup (service)', err)
        throw err
    }
}

async function logout() {
    try{
        // await axios.post(`${BASE_AUTH_URL}logout`)
        await httpService.post('auth/logout')
        sessionStorage.setItem(STORAGE_KEY_LOGGEDIN, null)
    } catch(err){
        sessionStorage.setItem(STORAGE_KEY_LOGGEDIN, null)
    }
    return Promise.resolve()
}

function getLoggedinUser() {
    return JSON.parse(sessionStorage.getItem(STORAGE_KEY_LOGGEDIN))
}

function _saveLocalUser(user){
    sessionStorage.setItem(STORAGE_KEY_LOGGEDIN, JSON.stringify(user))
    return user
}

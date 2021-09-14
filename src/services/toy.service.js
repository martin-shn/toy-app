import { userService } from './user.service.js'
// const axios = require('axios');
import Axios from 'axios'
// import { storageService } from './async-storage.service.js'
// import { utilService } from './util.service.js'

// const STORAGE_KEY = 'toy'

const BASE_URL = (process.env.NODE_ENV === 'production')
 ? '/api/toy/'
 : 'http://localhost:3030/api/toy/';

export const toyService = {
    query,
    getById,
    add,
    update,
    remove
}

const axios = Axios.create({
    withCredentials: true
});

window.ts = toyService;


async function query(filterBy={}) {
    try{
        const res = await axios.get(`${BASE_URL}`,{params:filterBy})
        return res.data
    } catch(err){
        console.log('Cannot query toys', err)
        throw err
    }
}

async function getById(toyId) {
    try{
        const res = await axios.get(`${BASE_URL}${toyId}`)
        if (!res.data) return {}
        res.data.reviews = ['Great toy','Amazing...','What a blast']
        return res.data
    } catch(err){
        console.log('Cannot get toy by id', err)
        throw err
    }
}

async function remove(toy) {
    try{
        const user = userService.getLoggedinUser()
        if (user._id!==toy.createdBy._id && !user.isAdmin) throw new Error('Cannot remove todo - auth issue');
        return await axios.delete(`${BASE_URL}${toy._id}`)
    } catch(err){
        console.log('Cannot remove toy', err)
        throw err
    }
}

async function update(toy) {
    try{
        const user = userService.getLoggedinUser()
        const res = await axios.put(`${BASE_URL}`,{toy,user})
        return await res.data
    } catch(err){
        console.log('Cannot update toy', err)
        throw err
    }
} 

async function add(toy){
    try{
        const user = userService.getLoggedinUser()
        const res = await axios.post(`${BASE_URL}`,{toy,user})
        return await res.data
    } catch(err){
        console.log('Cannot add toy (service)', err)
        throw err
    }
}

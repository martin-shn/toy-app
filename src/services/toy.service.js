import { userService } from './user.service.js'
// const axios = require('axios');
import Axios from 'axios'
// import { storageService } from './async-storage.service.js'
// import { utilService } from './util.service.js'

// const STORAGE_KEY = 'toy'

export const toyService = {
    query,
    getById,
    save,
    remove
}

const axios = Axios.create({
    withCredentials: true
});

window.ts = toyService;


function query(filterBy={}) {
    return axios.get('http://localhost:3030/api/toy',{params:filterBy})
    .then(res=>res.data)
}

function getById(toyId) {
    return axios.get(`http://localhost:3030/api/toy/${toyId}`)
    .then(res=>{
        if (!res.data) return {}
        res.data.reviews = ['Great toy','Amazing...','What a blast']
        return res.data
    })
}

function remove(toy) {
    const user = userService.getLoggedinUser()
    if (user.username!==toy.owner.username&&!user.isAdmin) return Promise.reject('Cannot remove todo - auth issue');
    return axios.delete(`http://localhost:3030/api/toy/${toy._id}`)
}

function save(toy) {
    if (toy._id) {
        //EDIT
        return axios.put('http://localhost:3030/api/toy',{toy})
        .then(res=>res.data)
    } else {
        //ADD
        toy.owner = userService.getLoggedinUser()
        return axios.post('http://localhost:3030/api/toy',toy)
        .then(res=>res.data)
        .catch(err=>{
            console.log('Cannot add toy (service)',err)
        })
    }
}



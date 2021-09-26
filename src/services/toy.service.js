import { userService } from './user.service.js'
import { httpService } from './http.service'

// const BASE_URL = (process.env.NODE_ENV === 'production')
//  ? '/api/toy/'
//  : 'http://localhost:3030/api/toy/';

export const toyService = {
    query,
    getById,
    add,
    update,
    remove,
    updateChat
}

async function query(filterBy={}) {
    try{
        // const res = await axios.get(`${BASE_URL}`,{params:filterBy})
        // return res.data
        return httpService.get('toy/', filterBy)
    } catch(err){
        console.log('Cannot query toys', err)
        throw err
    }
}

async function getById(toyId) {
    try{
        // const res = await axios.get(`${BASE_URL}${toyId}`)
        // if (!res.data) return {}
        const res = await httpService.get(`toy/${toyId}`)
        if (!res) return {}
        return res
    } catch(err){
        console.log('Cannot get toy by id', err)
        throw err
    }
}

async function remove(toy) {
    try{
        const user = userService.getLoggedinUser()
        if (user._id!==toy.createdBy._id && !user.isAdmin) throw new Error('Cannot remove todo - auth issue');
        // return await axios.delete(`${BASE_URL}${toy._id}`)
        return await httpService.delete(`toy/${toy._id}`)
    } catch(err){
        console.log('Cannot remove toy', err)
        throw err
    }
}

async function update(toy) {
    try{
        // const res = await axios.put(`${BASE_URL}`,{toy})
        // return await res.data
        return await httpService.put('toy/', {toy})
    } catch(err){
        console.log('Cannot update toy', err)
        throw err
    }
} 
async function updateChat(toy) {
    try{
        // const res = await axios.put(`${BASE_URL}`,{toy})
        // return await res.data
        return await httpService.put(`toy/${toy._id}`, {toy})
    } catch(err){
        console.log('Cannot update toy', err)
        throw err
    }
} 

async function add(toy){
    try{
        // const user = userService.getLoggedinUser()
        // const res = await axios.post(`${BASE_URL}`,{toy,user})
        // return await res.data
        return await httpService.post('toy/', {toy})
    } catch(err){
        console.log('Cannot add toy (service)', err)
        throw err
    }
}

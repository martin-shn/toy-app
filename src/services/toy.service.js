
import { storageService } from './async-storage.service.js'
// import { utilService } from './util.service.js'
import { userService } from './user.service.js'

const STORAGE_KEY = 'toy'
const listeners = []

export const toyService = {
    query,
    getById,
    save,
    remove,
    subscribe
    
}
window.ts = toyService;


function query() {
    return storageService.query(STORAGE_KEY)
}

function getById(toyId) {
    return storageService.get(STORAGE_KEY, toyId)
    .then(toy=>{
        if(!toy) return {}
        toy.reviews = ['Great toy','Amazing...','What a blast']
        return toy
    })
}

function remove(toyId) {
    return storageService.remove(STORAGE_KEY, toyId)
}

function save(toy) {
    if (toy._id) {
        //EDIT
        return storageService.put(STORAGE_KEY, toy)
    } else {
        //ADD
        toy.owner = userService.getLoggedinUser()
        delete toy.owner.password
        return storageService.post(STORAGE_KEY, toy)
    }
}


function subscribe(listener) {
    listeners.push(listener)
}

function _notifySubscribersToysChanged(toys) {
    console.log('Notifying Listeners');
    listeners.forEach(listener => listener(toys))
}

window.addEventListener('storage', () => {
    console.log('Storage Changed from another Browser!');
    query()
        .then(toys => {
            _notifySubscribersToysChanged(toys)
        }) 
})

// TEST DATA
// storageService.post(STORAGE_KEY, {vendor: 'Subali Rahok 2', price: 980}).then(x => console.log(x))





import { toyService } from "../services/toy.service.js";
import { showSuccessMsg, showErrorMsg } from '../services/event-bus.service.js'

export function loadToys(filterBy={}) {
    return (dispatch) => {
        toyService.query(filterBy)
        .then(toys=>{
                dispatch({
                    type: 'SET_TOYS',
                    toys
                })
            })
        .catch(err => {
            showErrorMsg('Cannot load toys')
            console.log('Cannot load toys', err)
        })
    }
}

export function onRemoveToy(toy) {
    return (dispatch) => {
        toyService.remove(toy)
            .then(() => {
                console.log('Deleted Succesfully!');
                dispatch({
                    type: 'REMOVE_TOY',
                    toyId: toy._id
                })
                showSuccessMsg('Toy removed')
            })
            .catch(err => {
                showErrorMsg('Cannot remove toy')
                console.log('Cannot remove toy', err)
            })
    }
}

export function onAddToy(toy) {
    return (dispatch) => {
        toyService.save(toy)
            .then(savedToy => {
                console.log('Added Toy', savedToy);
                dispatch({
                    type: 'ADD_TOY',
                    toy: savedToy
                })
                showSuccessMsg('Toy added')
            })
            .catch(err => {
                showErrorMsg('Cannot add toy')
                console.log('Cannot add toy (action)', err)
            })
    }
}

export function onEditToy(toyToSave) {
    return (dispatch) => {
        return toyService.save(toyToSave)
            .then(savedToy => {
                console.log('Updated Toy:', savedToy);
                dispatch({
                    type: 'UPDATE_TOY',
                    toy: savedToy
                })
                showSuccessMsg('Toy updated')
                return Promise.resolve()
            })
            .catch(err => {
                showErrorMsg('Cannot update toy')
                console.log('Cannot save toy', err)
            })
    }
}



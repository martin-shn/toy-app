import { toyService } from "../services/toy.service.js";

export function loadToys(filterBy={}) {
    return async (dispatch) => {
        try{
            const toys = await toyService.query(filterBy)
            dispatch({
                type: 'SET_TOYS',
                toys
            })
            return toys
        } catch(err){
            console.log('Cannot load toys', err)
        }
    }
}

export function onRemoveToy(toy) {
    return async (dispatch) => {
        try {
            await toyService.remove(toy)
            console.log('Deleted Succesfully!');
            return dispatch({
                type: 'REMOVE_TOY',
                toyId: toy._id
            })
        } catch (err) {
                console.log('Cannot remove toy', err)
        }
    }
}

export function onAddToy(toy) {
    return async (dispatch) => {
        try{
            const res = await toyService.add(toy)
            const savedToy = await toyService.getById(res.insertedId)
            return dispatch({
                type: 'ADD_TOY',
                toy: savedToy
            })
        } catch(err) {
            console.log('Cannot add toy (action)', err)
            throw err
        }
    }
}

export function onEditToy(toyToSave) {
    return async (dispatch) => {
        try{
            const savedToy = await toyService.update(toyToSave)
            // const savedToy = await toyService.getById(savedToy._id)
            return dispatch({
                    type: 'UPDATE_TOY',
                    toy: savedToy
            })
        } catch (err){
                console.log('Cannot save toy', err)
                throw err
        }
    }
}

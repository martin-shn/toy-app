import { toyService } from "../services/toy.service.js";
import { showSuccessMsg, showErrorMsg } from '../services/event-bus.service.js'

export function loadToys(filterBy={}) {
    return (dispatch) => {
        toyService.query()
            .then(toys => {
                if(filterBy.txt){
                    const regex = new RegExp(filterBy.txt, 'i');
                    toys = toys.filter((toy) => regex.test(toy.name));
                }
                if(filterBy.inStock){
                    switch(filterBy.inStock){
                        case 'inStock':
                            toys=toys.filter((toy)=>toy.inStock)
                            break;
                        case 'outStock':
                            toys=toys.filter((toy)=>!toy.inStock)
                            break;
                        default:
                    }
                }
                if(filterBy.labels && filterBy.labels.length>0){
                    toys=toys.filter(toy=>filterBy.labels.every(label=>toy.labels.map(label=>label.value).includes(label.value)))
                }
                if(filterBy.sort){
                    switch (filterBy.sort){
                        case 'name':
                            toys.sort((a,b)=>a.name.localeCompare(b.name, 'en', {ignorePunctuation:true}))
                            break
                        case 'price':
                            toys.sort((a,b)=>+a.price-+b.price)
                            break
                        case 'created':
                            toys.sort((a,b)=>+b.createdAt-+a.createdAt)
                            break
                        default:
                    }
                    // console.log(toys);
                }
                // console.log('Toys from DB:', toys)
                dispatch({
                    type: 'SET_TOYS',
                    toys
                })
            })
            .catch(err => {
                showErrorMsg('Cannot load toys')
                console.log('Cannot load toys', err)
            })

        toyService.subscribe((toys) => {
            console.log('Got notified');
            dispatch({
                type: 'SET_TOYS',
                toys
            })
        })
    }
}

export function onRemoveToy(toyId) {
    return (dispatch, getState) => {
        toyService.remove(toyId)
            .then(() => {
                console.log('Deleted Succesfully!');
                dispatch({
                    type: 'REMOVE_TOY',
                    toyId
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
                console.log('Cannot add toy', err)
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



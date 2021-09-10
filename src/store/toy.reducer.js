const initialState = {
    toys: [],
    lastRemovedToy: null,
    filterBy:{}
}

export function toyReducer(state = initialState, action) {
    var newState = state
    var toys
    switch (action.type) {
        case 'SET_TOYS':
            newState = { ...state, toys: action.toys }
            break
        case 'REMOVE_TOY':
            const lastRemovedToy = state.toys.find(toy => toy._id === action.toyId)
            toys = state.toys.filter(toy => toy._id !== action.toyId)
            newState = { ...state, toys, lastRemovedToy}
            break
        case 'ADD_TOY':
            newState = { ...state, toys:[...state.toys, action.toy]}
            break
        case 'UPDATE_TOY':
            toys = state.toys.map(toy => (toy._id === action.toy._id)? action.toy : toy)
            newState = { ...state, toys}
            break
        case 'UNDO_REMOVE_TOY':
            if (state.lastRemovedToy) {
                newState = { ...state, toys: [...state.toys, state.lastRemovedToy], lastRemovedToy: null}
            }
            break
        case 'SET_FILTER':
            newState={...state,filterBy:action.filterBy}
            break
        default:
    }
    // For debug:
    window.toyState = newState
    // console.log('Prev State:', state)
    // console.log('Action:', action)
    // console.log('New State:', newState)
    return newState

}

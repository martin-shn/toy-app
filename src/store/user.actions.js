import { userService } from "../services/user.service.js";

export function onLogin(credentials) {
    return async (dispatch) => {
        try{
            const user = await userService.login(credentials)
            return dispatch({
                type: 'SET_USER',
                user
            })
        } catch(err){
            console.log('Cannot login (actions)', err)
            throw err
        }
    }
}

export function onSignup(credentials) {
    return async (dispatch) => {
        try {
            const user = await userService.signup(credentials)
            return dispatch({
                type: 'SET_USER',
                user
            })
        } catch(err) {
            console.log('Cannot signup (actions)', err)
            throw err
        }
    }
}

export function onLogout() {
    return async (dispatch) => {
        try {
            await userService.logout()
            return dispatch({
                type: 'SET_USER',
                user: null
            })
        } catch(err) {
                console.log('Cannot logout', err)
                throw err
        }
    }
}

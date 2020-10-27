import axios from 'axios'

const initialState = {
    user: {userId: 0, username: ''},
    isLoggedIn: false
}

const GET_USER = 'GET_USER'
const LOGOUT_USER = 'LOGOUT_USER'

export function getUser() {
 const user = axios.get('/auth/user')
    return {
        type: GET_USER,
        payload: user
    }
}

export function logoutUser() {
    const logout = axios.post('/auth/logout')
        return {
            type: LOGOUT_USER,
            payload: logout
        }
}

export default function userReducer(state = initialState, action) {
    const {type, payload} = action
    switch(type) {
        case GET_USER + "REJECTED":
            return state;
        case GET_USER + "PENDING":
            return state;
        case GET_USER + "FULFILLED":
            return {...state, user:payload, isLoggedIn: true}  
        case LOGOUT_USER + "REJECTED":
            return state;
        case LOGOUT_USER + "FULFILLED":
            return state;
        case LOGOUT_USER + "PENDING":
            return state;
        default:
            return state;
    }
}
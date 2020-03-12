import { ALL_TODO, PENDING_TODO, COMPLETE_TODO, CHANGE_FILTER, TOGGLE_STATUS } from './types';
import axios from 'axios';


export const allTodo = () => dispatch => {
    axios.get("http://localhost:3001/appData")
        .then(res => {
            console.log("wwaaa", res)
            dispatch({
                type: ALL_TODO,
                payload: res.data.homePage
            })
        })
}

export const allDone = status => dispatch => {
    dispatch({
        type: COMPLETE_TODO,
        payload: status
    })
}

export const allPending = status => dispatch => {
    dispatch({
        type: PENDING_TODO,
        payload: status
    })
}

export const changeFilter = status => dispatch => {
    dispatch({
        type: CHANGE_FILTER,
        payload: status
    })
}

export const toggleStatus = (status, id) => dispatch => {
    dispatch({
        type: TOGGLE_STATUS,
        status,
        payload: id
    })
}
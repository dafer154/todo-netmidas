import { ALL_TODO, PENDING_TODO, COMPLETE_TODO, CHANGE_FILTER } from '../actions/types';

const initialState = {
    allTodo: [],
    pendingTodo: [],
    completeTodo: [],
    filters: [],
    status: 'all'
}

const todoReducer = (state = initialState, action) => {
    switch (action.type) {
        case ALL_TODO:
            return {
                ...state,
                allTodo: action.payload.todos,
                filters: action.payload.filters,
                status: 'all'
            }
        case COMPLETE_TODO:
            return {
                ...state,
                completeTodo: state.allTodo.filter(todo => todo.status === action.payload),
                status: 'done'
            }
        case PENDING_TODO:
            console.log('jujuju');
            return {
                ...state,
                pendingTodo: state.allTodo.filter(todo => todo.status === action.payload),
                status: 'pending'
            }
        case CHANGE_FILTER:
            return {
                ...state,
                status: action.payload
            }
        default:
            return state
    }
}

export default todoReducer;
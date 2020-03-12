import { ALL_TODO, PENDING_TODO, COMPLETE_TODO, CHANGE_FILTER, TOGGLE_STATUS } from '../actions/types';

const initialState = {
    allTodo: [],
    pendingTodo: [],
    completeTodo: [],
    filters: [],
    status: 'all',
    uniqueStatus: '',
    labelStatus: ''
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
        case TOGGLE_STATUS:
            if(action.status === 'pending'){
                const filterStatus = state.completeTodo.filter(todoFilter => todoFilter.id !== action.payload);

                const filterAll = state.allTodo.map(todoAll => {
                    if (todoAll.id === action.payload) {
                             todoAll['status'] = action.status
                     }});

                return {
                    ...state,
                    completeTodo: filterStatus,
                    allTodo: filterAll,
                    status: 'pending'
                }
            } else {
                const filterStatus = state.pendingTodo.filter(todoFilter => todoFilter.id !== action.payload);

                const filterAll = state.allTodo.map(todoAll => {
                    if (todoAll.id === action.payload) {
                             todoAll['status'] = action.status
                     }});
                     
                return {
                    ...state,
                    pendingTodo: filterStatus,
                    allTodo: filterAll,
                    status: 'pending'
                }
            }    
        

        default:
            return state
    }
}

export default todoReducer;
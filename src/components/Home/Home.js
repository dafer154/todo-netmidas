import React, { Component } from 'react';
import ListTodo from './ListTodo';
import './styles/Home.css';
import axios from 'axios';
import { connect } from 'react-redux';
import { allTodo, allPending, allDone, changeFilter } from '../../actions/todoActions';

export class Home extends Component {

    state = {
        filters: [],
        todosAll: [],
        todosPending: [],
        todosDone: [],

        activeButton: '#ff80b0',
        colorButton: '#a55372',
    }

    componentDidMount() {

        this.props.allTodo();
        // axios.get("http://localhost:3001/appData")
        //     .then(res => {
        //         const filters = res.data.homePage.filters
        //         console.log("juju", filters)
        //         const todos = res.data.homePage.todos
        //         this.setState({ filters, todosAll: todos })
        //     })
    }

    filterTodo = (status) => {
        if (status === 'pending') {
            // const filterStatus = this.state.todosAll.filter(todo => todo.status === status)
            // return this.setState({ todosPending: filterStatus, status })
            this.props.allPending(status);
        }
        if (status === 'done') {
            // const filterStatus = this.state.todosAll.filter(todo => todo.status === status)
            // return this.setState({ todosDone: filterStatus, status })
            this.props.allDone(status);
        } else if (status === 'all') {
            this.props.changeFilter();
        }
    }

    callBackFunction = (status, todo) => {
        if (status === 'pending') {
            const idTodo = todo.id
            const filterStatus = this.state.todosDone.filter(todoFilter => todoFilter.id !== idTodo);

            const filterAll = this.state.todosAll.map(todoAll => {
                if (todoAll.id === todo.id) {
                    todoAll['status'] = status
                }
                return todoAll;
            });

            return setTimeout(() => {
                return this.setState({ todosDone: filterStatus, todosAll: filterAll })
            }, 1000);
        }
        if (status === 'done') {
            const idTodo = todo.id
            const filterStatus = this.state.todosPending.filter(todo => todo.id !== idTodo)

            const filterAll = this.state.todosAll.map(todoAll => {
                if (todoAll.id === todo.id) {
                    todoAll['status'] = status
                }
                return todoAll;
            });

            return setTimeout(() => {
                return this.setState({ todosPending: filterStatus, todosAll: filterAll })
            }, 1000);
        }

    }




    render() {

        const { filters, todoAll, status, pendingTodo, completeTodo } = this.props;

        const FilterButtons = () => {
            return (
                <div className="wrapp-buttons responsive-buttons">
                    {filters.map(filter => {
                        return (<div key={filter.type} className="container-button">
                            <button className="button-custon" style={activeButton} onClick={() => this.filterTodo(filter.type)}>{filter.name}</button>
                        </div>)
                    })}
                </div>
            )
        }






        const activeButton = {
            background: `${this.state.activeButton}`,
            color: `${this.state.colorButton}`
        }

        return (
            <div className="wrapp">
                <FilterButtons />
                {status === 'all' ?
                    (<div className="container-listTodo">
                        <div className="wrapptitle-list"><span className="title-lisTodo">List All</span></div>
                        <ListTodo todos={todoAll} changeTodo={this.callBackFunction} /></div>)
                    : status === 'pending'
                        ? (<div className="container-listTodo">
                            <div className="wrapptitle-list"><span className="title-lisTodo">List {status}</span></div>
                            <ListTodo todos={pendingTodo} changeTodo={this.callBackFunction} /></div>)
                        : status === 'done'
                            ? (<div className="container-listTodo">
                                <div className="wrapptitle-list"><span className="title-lisTodo">List {status}</span></div>
                                <ListTodo todos={completeTodo} changeTodo={this.callBackFunction} /></div>)
                            : (<div className="container-listTodo">
                                <div className="wrapptitle-list"><span className="title-lisTodo">List All</span></div>
                                <ListTodo todos={todoAll} changeTodo={this.callBackFunction} /></div>)}
            </div>
        )
    }
}

const mapStateToProps = state => ({
    todoAll: state.todoReducer.allTodo,
    filters: state.todoReducer.filters,
    status: state.todoReducer.status,
    pendingTodo: state.todoReducer.pendingTodo,
    completeTodo: state.todoReducer.completeTodo
})

export default connect(mapStateToProps, { allTodo, allPending, allDone, changeFilter })(Home)

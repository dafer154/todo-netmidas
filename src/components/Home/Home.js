import React, { Component } from 'react';
import ListTodo from './ListTodo';
import './styles/Home.css';
import axios from 'axios';

export class Home extends Component {

    state = {
        filters: [],
        todosAll: [],
        todosPending: [],
        todosDone: [],
        status: 'all',
        activeButton: '#ff80b0',
        colorButton: '#a55372',
    }

    componentDidMount() {

        axios.get("http://localhost:3001/appData")
            .then(res => {
                const filters = res.data.homePage.filters
                const todos = res.data.homePage.todos
                this.setState({ filters, todosAll: todos })
            })
    }

    filterTodo = (status) => {
        if (status === 'pending') {
            const filterStatus = this.state.todosAll.filter(todo => todo.status === status)
            return this.setState({ todosPending: filterStatus, status })
        }
        if (status === 'done') {
            const filterStatus = this.state.todosAll.filter(todo => todo.status === status)
            return this.setState({ todosDone: filterStatus, status })
        } else if (status === 'all') {
            return this.setState({ status });
        }
    }

    callBackFunction = (status, todo) => {
        if (status === 'pending') {
            const idTodo = todo.id
            const filterStatus = this.state.todosDone.filter(todoFilter => todoFilter.id !== idTodo);

            const filterAll = this.state.todosAll.map(todoAll =>{
                if(todoAll.id === todo.id){
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
            
            const filterAll = this.state.todosAll.map(todoAll =>{
                if(todoAll.id === todo.id){
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
        const FilterButtons = () => {
            return (
                <div className="wrapp-buttons responsive-buttons">
                    {this.state.filters.map(filter => {
                        return (<div key={filter.type} className="container-button">
                            <button className="button-custon" style={activeButton} onClick={() => this.filterTodo(filter.type)}>{filter.name}</button>
                        </div>)
                    })}
                </div>
            )
        }




        const { status } = this.state

        const activeButton = {
            background : `${this.state.activeButton}`,
            color: `${this.state.colorButton}`
        }

        return (
            <div className="wrapp">
                <FilterButtons />
                {status === 'all' ?
                    (<div className="container-listTodo">
                        <div className="wrapptitle-list"><span className="title-lisTodo">List All</span></div>
                        <ListTodo todos={this.state.todosAll} changeTodo={this.callBackFunction} /></div>)
                    : status === 'pending'
                        ? (<div className="container-listTodo">
                            <div className="wrapptitle-list"><span className="title-lisTodo">List {status}</span></div>
                            <ListTodo todos={this.state.todosPending} changeTodo={this.callBackFunction} /></div>)
                        : status === 'done'
                            ? (<div className="container-listTodo">
                                <div className="wrapptitle-list"><span className="title-lisTodo">List {status}</span></div>
                                <ListTodo todos={this.state.todosDone} changeTodo={this.callBackFunction} /></div>)
                            : (<div className="container-listTodo">
                                <div className="wrapptitle-list"><span className="title-lisTodo">List All</span></div>
                                <ListTodo todos={this.state.todosAll} changeTodo={this.callBackFunction} /></div>)}
            </div>
        )
    }
}

export default Home

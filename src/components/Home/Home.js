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
        } else if(status === 'all'){
            return this.setState({ status });
        }
    }

    callBackFunction = (status, todo) => {
        console.log('tiki');
        console.log(status);
        console.log(todo);
        console.log("nooo", todo);
        if (status === 'pending') {
            const idTodo = todo.id
            const filterStatus = this.state.todosDone.filter(todoFilter => todoFilter.id !== idTodo);
            const filterPending = this.state.todosAll.filter(todo => todo.status === status);
            
            console.log("todooo", filterPending);

            return setTimeout(() => {
                return this.setState({ todosDone: filterStatus, todosPending: [...filterPending, todo] })
            }, 1000);
        }
        if (status === 'done') {
            const idTodo = todo.id
            const filterStatus = this.state.todosDone.filter(todo => todo.id !== idTodo)
            return this.setState({ todosDone: filterStatus, status })
        }

    }


    render() {

        const FilterButtons = () => {
            return (
                <div className="wrapp-buttons">
                    {this.state.filters.map(filter => {
                        return (<div key={filter.type} className="container-button">
                            <button className="button-custon" onClick={() => this.filterTodo(filter.type)}>{filter.name}</button>
                        </div>)
                    })}
                </div>
            )
        }

        const { status } = this.state

        return (
            <div className="wrapp">
                <FilterButtons />
                {status === 'all' ?
                    <ListTodo todos={this.state.todosAll} changeTodo={this.callBackFunction} />
                    : status === 'pending'
                        ? <ListTodo todos={this.state.todosPending} changeTodo={this.callBackFunction} />
                        : status === 'done'
                            ? <ListTodo todos={this.state.todosDone} changeTodo={this.callBackFunction} />
                            : <ListTodo todos={this.state.todosAll} changeTodo={this.callBackFunction} />}
            </div>
        )
    }
}

export default Home

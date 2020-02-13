import React, { Component } from 'react'
import './styles/ItemTodo.css';

class ItemTodo extends Component {

    state = { status: this.props.todo.status, labelStatus: this.props.todo.status, todo: this.props.todo }

    sendOption = (e) => {
        const value = e.target.value;
        if (value === 'pending') {
            const value = 'done'
            this.setState({ status: value, labelStatus: value })
            this.props.changeTodo(value, this.state.todo);
        } else {
            const value = 'pending'
            this.setState({ status: value, labelStatus: value })
            this.props.changeTodo(value, this.state.todo);
        }

    }

    render() {
        const { status, todo, labelStatus } = this.state

        const styleBackgroundDone = {
            background: '#a5e3ff'
        }

        const styleBackgroundPending = {
            background: 'none'
        }

        return (
            <div className="card-todo">
                <div className="header-todo" style={status === 'done' ? styleBackgroundDone : styleBackgroundPending}>
                    <div className="title-todo">
                        <h2>{todo.title}</h2>
                    </div>
                    <div className="description-todo">
                        <p className="description">{todo.description}</p>
                    </div>
                </div>
                <div className="footer-todo">
                    <div className="wrapp-footer">
                        <div className="status">
                            <span>Status: {labelStatus}</span>
                        </div>
                        <div className="checkStyle">
                            <input type="checkbox" onChange={this.sendOption} value={status} checked={status === 'done' ? true : false} />
                        </div>
                    </div>
                </div>
            </div>
        )
    }

}

export default ItemTodo

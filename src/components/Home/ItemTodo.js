import React, { Component } from 'react'
import './styles/ItemTodo.css';
import { connect } from 'react-redux';
import { toggleStatus } from '../../actions/todoActions';

class ItemTodo extends Component {

    state = { status: this.props.todo.status, labelStatus: this.props.todo.status, todo: this.props.todo }

    sendOption = (e) => {
        const value = e.target.value;
        console.log("tooodo", this.props.todo.id);
        console.log('weee', value)
        if (value === 'pending') {
            const value = 'done'
            // this.props.toggleStatus(value, this.props.todo.id)
            this.setState({ status: value, labelStatus: value })
            this.props.changeTodo(value, this.state.todo);
        } else {
            const value = 'pending'
            // this.props.toggleStatus(value, this.props.todo.id)
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
                            <span>Status: <span className="italic-status">{labelStatus}</span></span>
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

const mapStateToProps = state => ({
    status: state.todoReducer.status,
    labelStatus: state.todoReducer.labelStatus
})

export default connect(mapStateToProps, { toggleStatus })(ItemTodo)

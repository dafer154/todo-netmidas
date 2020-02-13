import React from 'react';
import ItemTodo from './ItemTodo';
import './styles/ListTodo.css';

const ListTodo = ({todos, changeTodo}) => {


    const callBackFunction = (status, todo) =>{
        changeTodo(status, todo);
    }

    return (
        <div className="wrappList">
        {todos.map(todo =>{
           return <ItemTodo todo={todo} key={todo.id} changeTodo={callBackFunction}/>
        })}
        </div>

    )
}

export default ListTodo

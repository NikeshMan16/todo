import React, { useState, useEffect } from "react";

import TodoInput from "./components/Todoinput";
import TodoList from "./components/TodoList";


function App() {


  const [todos,setTodos] = useState([])
  const [todoValue, setTodoValue] = useState('')


  function persistData(newList){
    localStorage.setItem('todos', JSON.stringify({todos: newList}))
  }

  function handleAddTodos(newTodo){
    const newTodoList = [...todos, newTodo]
    persistData(newTodoList)
    setTodos(newTodoList)
  }

  function handleDeleteTodos(index) {
    const  newTodoList = todos.filter((todo, todoIndex)=> {
      return todoIndex!= index
    })
    persistData(newTodoList)
    setTodos(newTodoList)

  }

  function handleEditTodos(index){
    const valueTobeEdited = todos [index]
    setTodoValue(valueTobeEdited)
    handleDeleteTodos(index)
  }

  useEffect(()=>{
    if (!localStorage) {
      return
    }

    let localTodos = localStorage.getItem('todos')
    if (!localTodos){
      return
    }
      localTodos = JSON.parse(localTodos).todos
      setTodos(localTodos)
  },[])

  return (
    <>
    
    <>
      <h1 className="main-header" style={{fontFamily: "inter",margin: "1.5rem"}}> Demo Todo App</h1>
      <TodoInput 
      todoValue={todoValue}
      setTodoValue= {setTodoValue} 
      handleAddTodos={handleAddTodos}/>
      
      <TodoList 
      handleDeleteTodos= {handleDeleteTodos} 
      todos={todos}
      handleEditTodos = {handleEditTodos}
      />
    </>
      
    </>
  )
}

export default App

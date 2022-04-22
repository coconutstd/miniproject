import React from "react"
import TodoListItem from "./TodoListItem"

const TodoList = ({ todos, onRemove, onToggle }) => {
  return (
    <div className="TodoList min-h-[320px] max-h-[513px] overflow-y-auto divide-y divide-solid divide-[#dee2e6]">
      {todos.map((todo) => (
        <TodoListItem
          todo={todo}
          key={todo.id}
          onRemove={onRemove}
          onToggle={onToggle}
        ></TodoListItem>
      ))}
    </div>
  )
}

export default TodoList

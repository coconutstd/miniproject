import React from "react"
import {
  MdCheckBoxOutlineBlank,
  MdCheckBox,
  MdRemoveCircleOutline,
} from "react-icons/md"
import cn from "classnames"

const TodoListItem = ({ todo, onRemove, onToggle }) => {
  const { id, text, checked } = todo

  return (
    <div className="TodoListItem p-4 flex items-center even:bg-[#f8f9fa]">
      <div className={`checkbox cursor-pointer flex flex-1 items-center`}>
        {checked ? (
          <MdCheckBox className={`text-2xl text-green-400`} />
        ) : (
          <MdCheckBoxOutlineBlank className=" text-2xl" />
        )}
        <div
          onClick={() => onToggle(id)}
          className={`text ml-2 flex-1 ${cn({
            "line-through #adb5bd": checked,
          })}`}
        >
          {text}
        </div>
        <div
          onClick={() => onRemove(id)}
          className="remove flex items-center text-2xl text-[#ff6b6b] cursor-pointer hover:text-[#ff8787]"
        >
          <MdRemoveCircleOutline />
        </div>
      </div>
    </div>
  )
}

export default TodoListItem

import React, { useCallback, useState } from "react"
import { MdAdd } from "react-icons/md"

const TodoInsert = ({ onInsert }) => {
  const [value, setValue] = useState("")

  const onChange = useCallback((e) => {
    setValue(e.target.value)
  }, [])

  const onSubmit = useCallback(
    (e) => {
      onInsert(value)
      setValue("")
      e.preventDefault()
    },
    [onInsert, value]
  )

  return (
    <form className="TodoInsert flex bg-[#495057]" onSubmit={onSubmit}>
      <input
        className=" bg-transparent outline-none border-none p-2 text-lg leading-6 text-white placeholder-[#dee2e6] flex-1"
        placeholder="할 일을 입력하세요"
        value={value}
        onChange={onChange}
      ></input>
      <button
        className="bg-none outline-none border-none bg-[#868e96] text-white px-4 text-2xl flex items-center cursor-pointer transition duration-100 ease-in hover:bg-[#adb5bd]"
        type="submit"
      >
        <MdAdd />
      </button>
    </form>
  )
}

export default TodoInsert

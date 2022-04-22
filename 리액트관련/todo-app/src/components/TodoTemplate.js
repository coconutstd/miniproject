import React from "react"

const TodoTemplate = ({ children }) => {
  return (
    <div className="TodoTemplate w-[512px] mx-auto mt-24 rounded overflow-hidden">
      <div className="app-title bg-[#22b8cf] text-white h-16 text-2xl flex items-center justify-center">
        일정 관리
      </div>
      <div className="content bg-white">{children}</div>
    </div>
  )
}

export default TodoTemplate

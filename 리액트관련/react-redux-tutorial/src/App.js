import React from "react"
import CounterContainer from "./containers/CounterContainer"
import TodoContainers from "./containers/TodoContainers"

const App = () => {
  return (
    <div>
      <CounterContainer />
      <hr />
      <TodoContainers />
    </div>
  )
}

export default App

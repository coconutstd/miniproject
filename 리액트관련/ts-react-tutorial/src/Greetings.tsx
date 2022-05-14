import React from "react"

type GreetingsProps = {
  name: string
  mark: string
  optional?: string
  onClick: (name: string) => void
}

function Greetings({ name, mark, optional, onClick }: GreetingsProps) {
  return (
    <div>
      Hello, {name} {mark}
      {optional && <p>{optional}</p>}
      <div>
        <button onClick={() => onClick(name)}>Click Me</button>
      </div>
    </div>
  )
}

Greetings.defaultProps = {
  mark: "!",
}

export default Greetings

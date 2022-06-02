import React from "react"
import { AnimatePresence } from "framer-motion"
import {
  BrowserRouter as Router,
  Redirect,
  Route,
  Switch,
} from "react-router-dom"
import { ChatList } from "./page/ChatList"
import { ChatRoom } from "./page/ChatRoom"

function App() {
  return (
    <AnimatePresence>
      <Router>
        <Switch>
          <Route exact path="/">
            <Redirect to="/list" />
          </Route>
          <Route path="/list">
            <ChatList />
          </Route>
          <Route path="/room/:room_id">
            <ChatRoom />
          </Route>
        </Switch>
      </Router>
    </AnimatePresence>
  )
}

export default App

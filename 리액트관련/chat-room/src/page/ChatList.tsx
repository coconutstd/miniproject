import React, { useState, useEffect, useCallback } from "react"
import styled from "styled-components"
import { Chat } from "../entities/chat.entity"
import { useHistory } from "react-router-dom"
import { GiHamburgerMenu } from "react-icons/gi"
import { MdPersonOutline } from "react-icons/md"
import { ChatItem } from "../components/ChatItem"
import chatData from "../data/chat.json"
import AnimatedPage from "./AnimatedPage"

const ChatListBlock = styled.div`
  position: relative;
  width: 23.438rem;
  background-color: white;
`

const NavigationBlock = styled.div`
  width: 23.438rem;
  height: 2.75rem;
  background-color: #5b36ac;
`

const Navigation = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding-left: 0.75rem;
  padding-right: 0.75rem;
  padding-top: 0.5rem;
  padding-bottom: 0.75rem;

  span {
    color: white;
    letter-spacing: -0.12px;
    font-size: 1.063rem;
    font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto;
    transition: 0.2s;
  }

  svg {
    width: 1.5rem;
    height: 1.5rem;
    color: white;
    transition: 0.2s;
  }
`

const ChatItemsBlock = styled.div`
  margin-top: 1.25rem;
  padding-left: 1rem;
  padding-right: 1rem;
  transition: 0.2s;
`

export function ChatList() {
  const history = useHistory()
  const [chatlist, setChatList] = useState<Chat[]>([])
  const [chatItemsBlockClass, setChatItemsBlockClass] = useState<string>()
  const [navigationBlockClass, setNavigationBlockClass] = useState<string>()

  useEffect(() => {
    const fetchList = async () => {
      setChatList(chatData)
    }
    fetchList()
  }, [])

  const onClickChat = useCallback(
    (id: number) => {
      setChatItemsBlockClass("paging")
      setNavigationBlockClass("paging")
      setTimeout(() => {
        history.push(`/room/${id}`)
      }, 200)
    },
    [history]
  )

  return (
    <ChatListBlock>
      <NavigationBlock className={navigationBlockClass}>
        <Navigation>
          <GiHamburgerMenu />
          <span className={`${navigationBlockClass} Text-Style-3`}>채팅</span>
          <MdPersonOutline className={navigationBlockClass} />
        </Navigation>
      </NavigationBlock>
      <AnimatedPage>
        <ChatItemsBlock className={chatItemsBlockClass}>
          {chatlist.map((chat) => {
            return (
              <ChatItem key={chat.id} chat={chat} onClickChat={onClickChat} />
            )
          })}
        </ChatItemsBlock>
      </AnimatedPage>
    </ChatListBlock>
  )
}

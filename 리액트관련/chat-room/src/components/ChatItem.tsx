import React from "react"
import styled from "styled-components"
import { Chat } from "../entities/chat.entity"

const ChatItemBlock = styled.div`
  display: flex;
  align-items: center;
  padding: 0.563rem 0;
  cursor: pointer;
`

const Profile = styled.img`
  width: 3.5rem;
  height: 3.5rem;
  border-radius: 28px;
`

const TextBox = styled.div`
  display: flex;
  flex-direction: column;
  margin-left: 0.938rem;
  margin-right: auto;
`

const InfoBox = styled.div`
  display: flex;
  width: 1.813rem;
  flex-direction: column;
  align-items: center;
  white-space: nowrap;

  .time {
    font-size: 0.688rem;
    font-weight: 600;
    color: #363a42;
    margin-bottom: 0.375rem;
    color: var(--cool-grey);
  }

  .unread {
    display: flex;
    align-items: center;
    justify-content: center;
    width: 1.125rem;
    height: 1.125rem;
    background-color: #5b36ac;
    border-radius: 10.5px;
    color: white;
    font-size: 0.625rem;
    text-align: center;
    vertical-align: center;
  }
`

const Name = styled.div`
  letter-spacing: -0.2px;
  font-size: 1rem;
  color: var(--charcoal-grey);
  font-weight: bold;
`

const RecentMessage = styled.div`
  font-family: AppleSDGothicNeo;
  font-size: 0.813rem;
  letter-spacing: -0.1px;
  color: var(--cool-grey);
  font-weight: 500;
`

export function ChatItem({
  chat,
  onClickChat,
}: {
  chat: Chat
  onClickChat: (id: number) => void
}) {
  return (
    <ChatItemBlock onClick={() => onClickChat(chat.id)}>
      <Profile src={chat.profile_image} />
      <TextBox>
        <Name className="Text-Style-3">{chat.name}</Name>
        <RecentMessage>{chat.recent_message}</RecentMessage>
      </TextBox>
      <InfoBox>
        <span className="time">{chat.last_time}</span>
        {chat.unread && <div className="unread">{chat.unread}</div>}
      </InfoBox>
    </ChatItemBlock>
  )
}

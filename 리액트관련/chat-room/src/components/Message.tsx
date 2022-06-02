import React from "react"
import styled from "styled-components"
import { Message } from "../entities/chat-room.entity"

const MessageItemBlock = styled.div`
  display: flex;
  align-items: center;
  height: 2.563rem;
  max-width: 20rem;
  margin-bottom: 0.625rem;

  p {
    padding: 0.75rem;
    background-color: white;
    border-radius: 12px;
    color: #363a42;
    font-size: 0.875rem;
    font-weight: bold;
    box-shadow: 0 2px 4px 0 var(--black-10);
  }

  span {
    font-size: 0.75rem;
    color: #363a42;
    font-family: AppleSDGothicNeo;
    font-weight: 500;
    opacity: 40%;
  }

  .time {
    display: flex;
    align-items: end;
    height: 100%;
  }

  &.received p {
    margin-right: var(--spacing-xxs);
  }

  &.sent {
    flex-direction: row-reverse;
  }

  &.sent p {
    background-color: #5b36ac;
    color: white;
    margin-left: var(--spacing-xxs);
  }
`

const ImageBlock = styled.div`
  display: flex;
  margin-right: 1rem;
  position: relative;
  flex-direction: row-reverse;
  margin-bottom: 0.625rem;

  span {
    font-size: 0.75rem;
    color: #363a42;
    font-family: AppleSDGothicNeo;
    font-weight: 500;
    opacity: 40%;
  }

  .time {
    display: flex;
    align-items: end;
  }
`

const Image = styled.img`
  width: 12.5rem;
  height: 12.5rem;
  border-radius: 12px;
  margin-left: var(--spacing-xxs);
`

export function MessageItem({
  message,
  messageItemClass,
}: {
  message: Message
  messageItemClass: string
}) {
  const time = message.time.split(" ")[3]
  return message.isImage ? (
    <ImageBlock>
      <Image src={message.image} alt="이미지" />
      <div className="time">
        <span>{time}</span>
      </div>
    </ImageBlock>
  ) : (
    <MessageItemBlock
      className={`${
        message.type === "received" ? "received" : "sent"
      } ${messageItemClass}`}
    >
      <p className="Text-Style-2">{message.text}</p>
      <div className="time">
        <span>{time}</span>
      </div>
    </MessageItemBlock>
  )
}

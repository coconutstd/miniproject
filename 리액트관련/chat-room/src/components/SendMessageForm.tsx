import React from "react"
import styled from "styled-components"
import { HiOutlineMail } from "react-icons/hi"

const SendMessageBlock = styled.form`
  position: absolute;
  height: 3.125rem;
  display: flex;
  bottom: 1.25rem;

  input {
    width: 17.563rem;
    outline: none;
    border: none;
    border-radius: 25px;
    padding-left: 1rem;
    padding-top: 1.063rem;
    padding-bottom: 1rem;
    margin-right: var(--spacing-xxs);
  }

  svg {
    width: 50%;
    height: 50%;
    color: white;
  }

  .send-icon {
    width: 3.125rem;
    height: 3.125rem;
    background-color: #5b36ac;
    border-radius: 25px;
    display: flex;
    align-items: center;
    justify-content: center;
  }
`

export function SendMessageForm() {
  return (
    <SendMessageBlock>
      <input placeholder="메시지를 입력하세요.." />
      <div className="send-icon">
        <HiOutlineMail />
      </div>
    </SendMessageBlock>
  )
}

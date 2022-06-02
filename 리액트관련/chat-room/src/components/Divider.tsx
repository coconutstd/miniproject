import React from "react"
import styled from "styled-components"

const DividerBlock = styled.div`
  display: flex;
  width: 21.438rem;
  height: 0.938rem;
  margin-bottom: 0.625rem;
  background-color: var(--pale-grey);
  justify-content: center;
  align-items: center;

  .left {
    width: 7.5rem;
    height: 0.063rem;
    margin: 0.438rem 0.625rem 0.438rem 0;
    background-color: var(--pale-lilac);
  }
  .right {
    width: 7.5rem;
    height: 0.063rem;
    background-color: var(--pale-lilac);
  }
  span {
    width: 4.875rem;
    height: 0.938rem;
    margin: 0 0.938rem 0 0.625rem;
    opacity: 0.4;
    font-family: AppleSDGothicNeo;
    font-size: 0.75rem;
    font-weight: 500;
    font-stretch: normal;
    font-style: normal;
    line-height: normal;
    letter-spacing: normal;
    color: #363a42;
    white-space: nowrap;
  }
`

export function Divider({ date }: { date: string }) {
  return (
    <DividerBlock>
      <div className="left"></div>
      <span>{date}</span>
      <div className="right"></div>
    </DividerBlock>
  )
}

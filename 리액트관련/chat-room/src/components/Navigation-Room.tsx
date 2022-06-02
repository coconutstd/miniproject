import React from "react"
import styled from "styled-components"
import { AiOutlineLeft } from "react-icons/ai"
import { CgImage } from "react-icons/cg"
import { AiOutlineSearch } from "react-icons/ai"
import { useHistory } from "react-router-dom"
const NavigationBlock = styled.div`
  width: 23.438rem;
  height: 2.75rem;
  background-color: #5b36ac;
`

const NavigationContainer = styled.div`
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
  }

  svg {
    width: 1.5rem;
    height: 1.5rem;
    color: white;
    cursor: pointer;
    margin-right: var(--spacing-xxs);
  }
`

export function Navigation({
  name,
  onImageGalleryClick,
}: {
  name: string | undefined
  onImageGalleryClick: () => any
}) {
  const history = useHistory()

  return (
    <NavigationBlock>
      <NavigationContainer>
        <AiOutlineLeft onClick={() => history.goBack()} />
        <span className="Text-Style-3">{name}</span>
        <div className="icons">
          <CgImage onClick={onImageGalleryClick} />
          <AiOutlineSearch />
        </div>
      </NavigationContainer>
    </NavigationBlock>
  )
}

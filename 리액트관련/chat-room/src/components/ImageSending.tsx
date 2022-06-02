import React from "react"
import styled from "styled-components"

const ImageSendingBlock = styled.div`
  display: flex;
  margin-right: 1rem;
  position: relative;
  flex-direction: row-reverse;

  button {
    position: absolute;
    display: flex;
    align-items: center;
    justify-content: center;
    background-color: black;
    opacity: 80%;
    color: white;
    width: 2.5rem;
    height: 2.5rem;
    border-radius: 26.5px;
    top: 5.125rem;
    right: 5.25rem;
  }
`

const SendingImage = styled.img`
  width: 12.5rem;
  height: 12.5rem;
  border-radius: 12px;
`

const ProgressContainer = styled.div`
  width: 12.5rem;
  height: 0.375rem;
  background-color: #e5e5e7;
  border-radius: 3px;
`

const Progress = styled.div`
  width: 0%;
  height: 0.375rem;
  background-color: #5b36ac;
  border-radius: 3px;
  transition: 1.5s;
  -webkit-transition: 1.5s;
  &.loading {
    width: 100%;
  }
`

export function ImageSeding({
  selectedImage,
  progressClass,
}: {
  selectedImage: string | undefined
  progressClass: string | undefined
}) {
  return (
    <ImageSendingBlock>
      <div>
        <SendingImage src={selectedImage} />
        <button>X</button>
        <ProgressContainer>
          <Progress className={progressClass}></Progress>
        </ProgressContainer>
      </div>
    </ImageSendingBlock>
  )
}

import React from "react"
import styled from "styled-components"
import { Image } from "../entities/image.entity"

const ImageGalleryBlock = styled.div`
  width: 100%;
  height: 0%;
  background-color: #5b36ac;
  display: flex;
  align-items: center;
  transition: 0.2s;
  &.open {
    height: 4.25rem;
    img {
      width: 2.875rem;
      height: 2.875rem;
    }
  }
`

const ImageContainer = styled.div`
  width: max-content;
  padding-left: 1rem;
  display: flex;
  overflow-x: hidden;
  justify-content: space-between;
`

const ImageCard = styled.img`
  width: 0rem;
  height: 0rem;
  border-radius: 5px;
  margin-right: 0.625rem;
  transition: 0.2s;

  cursor: pointer;
`

export function ImageGallery({
  images,
  imageClass,
  onImageClick,
}: {
  images: Image[] | undefined
  imageClass: string
  onImageClick: (image: Image) => any
}) {
  return (
    <ImageGalleryBlock className={imageClass}>
      <ImageContainer>
        {images?.map((image) => {
          return (
            <ImageCard
              key={image.id}
              src={image.image}
              alt="갤러리"
              onClick={() => onImageClick(image)}
            ></ImageCard>
          )
        })}
      </ImageContainer>
    </ImageGalleryBlock>
  )
}

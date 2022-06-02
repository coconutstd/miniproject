import React, { useState, useEffect, useRef, useCallback } from "react"
import { Message, Room } from "../entities/chat-room.entity"
import { useParams } from "react-router-dom"
import styled from "styled-components"
import { MessageItem } from "../components/Message"
import { ImageSeding } from "../components/ImageSending"
import { Navigation } from "../components/Navigation-Room"
import { Image } from "../entities/image.entity"
import roomData from "../data/room.json"
import imagesData from "../data/images.json"
import { Divider } from "../components/Divider"
import { ImageGallery } from "../components/ImageGallery"
import { SendMessageForm } from "../components/SendMessageForm"
import AnimatedPage from "./AnimatedPage"

const ChatRoomBlock = styled.div`
  position: relative;
  width: 23.438rem;
  height: 41.688rem;
  background-color: var(--pale-grey);
  overflow-y: scroll;
  ::-webkit-scrollbar {
    display: none;
  }
`

const MessageBlock = styled.div`
  margin-top: 1.25rem;
  padding-left: 1rem;
`

export function ChatRoom() {
  const [roomInfo, setRoomInfo] = useState<Room>()
  const [messages, setMessages] = useState<Message[]>()
  const [isImageGalleryOpen, setIsImageGalleryOpen] = useState<boolean>(false)
  const [imageClass, setImageClass] = useState<string>("")
  const [images, setImages] = useState<Image[]>()
  const [isImageSending, setIsImageSending] = useState<boolean>(false)
  const [selectedImage, setSelectedImage] = useState<string>()
  const [progressClass, setProgressState] = useState<string>("")
  const [messageItemClass, setMessageItemClass] = useState<string>("")
  const { room_id }: { room_id: string } = useParams()
  let messageIndex = useRef<number>(0)

  useEffect(() => {
    const fetchRoom = async () => {
      setRoomInfo(roomData[Number(room_id) - 1])
      setMessages(roomData[Number(room_id) - 1].messages)
      messageIndex.current = roomData[Number(room_id) - 1].messages.length
      setTimeout(() => {
        setMessageItemClass("paging")
      }, 200)
    }
    fetchRoom()
  }, [room_id])

  const onImageGalleryClick = useCallback(async () => {
    setIsImageGalleryOpen(!isImageGalleryOpen)
    if (!isImageGalleryOpen) {
      if (images?.length === 0 || !images) {
        setImages(imagesData)
      }
      setTimeout(() => {
        setImageClass("open")
      }, 25)
    } else {
      setImageClass("")
    }
  }, [images, isImageGalleryOpen])

  const onImageClick = useCallback(
    async (image: Image) => {
      const nextImages = images?.filter((item) => image.id !== item.id)
      setImages(nextImages)
      setIsImageSending(true)
      setSelectedImage(image.image)
      setTimeout(() => {
        setProgressState("loading")
      }, 1)
      setProgressState("")
      setTimeout(() => {
        setIsImageSending(false)
        setMessages(
          messages?.concat({
            id: messageIndex.current++,
            type: "sent",
            time: "2022년 5월 6일 02:35",
            isImage: true,
            image: image.image,
          })
        )
      }, 1500)
    },
    [images, messages]
  )

  return (
    <ChatRoomBlock>
      <Navigation
        name={roomInfo?.name}
        onImageGalleryClick={onImageGalleryClick}
      />
      <ImageGallery
        imageClass={imageClass}
        images={images}
        onImageClick={onImageClick}
      />
      <AnimatedPage>
        <MessageBlock>
          {messages &&
            messages.map((message, index, orig) => {
              if (index + 1 !== orig.length) {
                // 1분 안에 같은 메세지를 보냈을 경우
                if (orig[index].time === orig[index + 1].time) {
                  const copyMessage = { ...message, time: "" }
                  return (
                    <MessageItem
                      key={message.id}
                      message={copyMessage}
                      messageItemClass={messageItemClass}
                    ></MessageItem>
                  )
                }

                // 날짜가 변경 되었을 경우
                const currentDate = orig[index].time
                  .split(" ")
                  .slice(0, -1)
                  .join(" ")
                const nextDate = orig[index + 1].time
                  .split(" ")
                  .slice(0, -1)
                  .join(" ")
                if (currentDate !== nextDate) {
                  return (
                    <>
                      <MessageItem
                        key={message.id}
                        message={message}
                        messageItemClass={messageItemClass}
                      ></MessageItem>
                      <Divider date={nextDate} />
                    </>
                  )
                }
              }
              return (
                <MessageItem
                  key={message.id}
                  message={message}
                  messageItemClass={messageItemClass}
                ></MessageItem>
              )
            })}
          {isImageSending && (
            <ImageSeding
              selectedImage={selectedImage}
              progressClass={progressClass}
            ></ImageSeding>
          )}
        </MessageBlock>
      </AnimatedPage>
      <SendMessageForm />
    </ChatRoomBlock>
  )
}

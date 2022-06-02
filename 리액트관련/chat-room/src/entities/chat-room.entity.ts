export interface Message {
  id: number
  text?: string
  time: string
  type: string
  isImage?: boolean
  image?: string
}

export interface Room {
  id: number
  name: string
  messages: Message[]
}

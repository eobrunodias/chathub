import { getTimeFrom } from "../utils/get-time-from"
import { Message } from "./TopicRoom"

type MessageBoxProps = {
  message: Message
}

export function MessageBox({ message }: MessageBoxProps) {
  return (
    <div className={message.author ? "message" : "system-message"}>
      <span>{message.author && `[${getTimeFrom(message.createdAt)}]`}</span>
      <b>{message.author && ` ${message.author.name}: `}</b>
      <span>{message.content}</span>
    </div>
  )
}

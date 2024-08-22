import {
  Dispatch,
  FormEvent,
  SetStateAction,
  useContext,
  useEffect,
  useState,
} from "react"
import { Topic } from "./Home"
import io from "socket.io-client"
import { User, UserContext } from "../App"
import { MessageBox } from "./MessageBox"

import { PiKeyReturn } from "react-icons/pi"
import { LuSendHorizonal } from "react-icons/lu"

type TopicRoomProps = {
  topic: Topic
  setOpenTopic: Dispatch<SetStateAction<Topic | null>>
}

export type Message = {
  _id: string
  content: string
  author?: User
  createdAt: string
}

const socket = io("ws://localhost:3000")

export function TopicRoom({ topic, setOpenTopic }: TopicRoomProps) {
  const { user } = useContext(UserContext)
  const [messages, setMessages] = useState<Message[]>([])

  useEffect(() => {
    loadMessages()
  }, [])

  useEffect(() => {
    socket.emit("join_room", { name: user?.name, topicId: topic._id })

    socket.on("new_message", (newMessage: Message) => {
      setMessages((mostRecentState) => [...mostRecentState, newMessage])
    })

    return () => {
      socket.emit("leave_room", { name: user?.name, topicId: topic._id })
      socket.off("new_message")
    }
  }, [socket])

  async function loadMessages() {
    const data = await fetch(`http://localhost:3000/topics/${topic._id}`).then(
      (res) => res.json(),
    )
    setMessages(data.messages)
  }

  async function handleSubmit(ev: FormEvent<HTMLFormElement>) {
    ev.preventDefault()

    const formData = new FormData(ev.currentTarget)
    const content = formData.get("message")!.toString()
    ev.currentTarget.reset()

    socket.emit("send_message", { content, author: user, topicId: topic._id })
  }

  return (
    <main className="min-h-screen bg-slate-900 py-8">
      <div className="flex flex-col items-center max-w-3xl mx-auto my-0 rounded-[10px] bg-slate-800 p-8">
        <header className="bg-slate-600 rounded-[10px] p-4 text-white font-bold flex justify-between w-full">
          <h2 className="text-3xl">{topic.title}</h2>
          <button
            className="bg-accent py-1 px-2 rounded-[10px]"
            onClick={() => setOpenTopic(null)}
          >
            <PiKeyReturn size={32} />
          </button>
        </header>

        <section className="p-8 text-white text-xl ">
          {messages.map((message) => (
            <MessageBox message={message} />
          ))}
        </section>

        <form className="w-full flex justify-center" onSubmit={handleSubmit}>
          <input
            className="input-text "
            type="text"
            name="message"
            id="message"
            placeholder="Digite sua mensagem..."
            required
          />
          <button className="btn-input-text">
            <LuSendHorizonal size={24} />
          </button>
        </form>
      </div>
    </main>
  )
}

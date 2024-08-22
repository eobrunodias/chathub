import { FormEvent, useContext, useEffect, useState } from "react"
import { UserContext } from "../App"
import TopicRoom from "./TopicRoom"
import TopicsList from "./TopicsList"

import { IoMdCreate } from "react-icons/io"
import { PiKeyReturn } from "react-icons/pi"

export type Topic = {
  _id: string
  title: string
}

export default function Home() {
  const { user, logout } = useContext(UserContext)
  const [topics, setTopics] = useState<Topic[]>([])
  const [openTopic, setOpenTopic] = useState<Topic | null>(null)

  async function fetchTopics() {
    const data = await fetch("http://localhost:3000/topics").then((res) =>
      res.json(),
    )
    setTopics(data)
  }

  useEffect(() => {
    fetchTopics()
  }, [])

  async function handleSubmit(ev: FormEvent<HTMLFormElement>) {
    ev.preventDefault()

    const formData = new FormData(ev.currentTarget)
    const title = formData.get("title")!.toString()
    ev.currentTarget.reset()

    const data = await fetch("http://localhost:3000/topics", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ title }),
    }).then((res) => res.json())

    setTopics([...topics, data])
  }

  if (openTopic)
    return <TopicRoom topic={openTopic} setOpenTopic={setOpenTopic} />

  return (
    <div className="bg-slate-700 min-h-screen">
      <header className="flex justify-evenly items-center bg-slate-900 ">
        <h2 className="px-4 py-10 text-3xl bg-slate-900 text-white">
          Hello, <strong>{user?.name}!</strong> 👋
        </h2>
        <button
          className="bg-accent text-white font-bold rounded-[10px] py-1 px-2"
          onClick={logout}
        >
          <PiKeyReturn size={32} />
        </button>
      </header>

      <form className="inline-form" onSubmit={handleSubmit}>
        <div className=" p-8 bg-slate-800 flex flex-col items-center">
          <h3 className="form-title text-center text-2xl text-white mb-4">
            Create a topic to chat about your favorite subjects
          </h3>
          <div className="flex justify-center">
            <input
              className="py-1 px-2 outline-none border-white border-2 border-r-0 rounded-r-none rounded-[10px] w-[25rem] input-placeholder"
              type="text"
              name="title"
              id="title"
              required
              placeholder="Type a topic here"
            />
            <button className="btn-input-text">
              <IoMdCreate size={22} />
            </button>
          </div>
        </div>
      </form>

      <h3 className="bg-slate-700 text-white text-center font-bold p-8 text-2xl mb-4">
        Rooms
      </h3>

      <TopicsList
        topics={topics}
        setTopics={setTopics}
        setOpenTopic={setOpenTopic}
      />
    </div>
  )
}

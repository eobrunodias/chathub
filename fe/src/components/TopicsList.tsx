import { Dispatch, SetStateAction } from "react"
import { Topic } from "./Home"

import { BsArrowRightSquare } from "react-icons/bs"
import { RiDeleteBinLine } from "react-icons/ri"

type TopicsListProps = {
  topics: Topic[]
  setTopics: Dispatch<SetStateAction<Topic[]>>
  setOpenTopic: Dispatch<SetStateAction<Topic | null>>
}

export default function TopicsList({
  topics,
  setTopics,
  setOpenTopic,
}: TopicsListProps) {
  async function deleteTopic(id: string) {
    await fetch(`http://localhost:3000/topics/${id}`, { method: "DELETE" })
    const updatedTopics = topics.filter((t) => t._id !== id)
    setTopics(updatedTopics)
  }

  return (
    <main>
      {topics.length === 0 ? (
        <h3 className="text-center text-2xl text-white">Create a topic room</h3>
      ) : (
        topics.map((topic) => (
          <div key={topic._id} className=" bg-slate-900">
            <div className="py-8 text-white font-bold text-center flex items-center border-gradient max-w-7xl my-0 mx-auto">
              <h2 className="text-2xl w-[50%]">{topic.title}</h2>
              <div className="w-[50%] flex justify-center">
                <button
                  className="bg-primary mr-2 font-bold text-white py-2 px-2 rounded-[10px]"
                  onClick={() => setOpenTopic(topic)}
                >
                  <BsArrowRightSquare size={24} />
                </button>
                <button
                  className="bg-accent font-bold text-white py-2 px-2 rounded-[10px]"
                  onClick={() => deleteTopic(topic._id)}
                >
                  <RiDeleteBinLine size={24} />
                </button>
              </div>
            </div>
          </div>
        ))
      )}
    </main>
  )
}

type TopicsListProps = {
  topics: Topic[]
  setTopics: Dispatch<SetStateAction<Topic[]>>
  setOpenTopic: Dispatch<SetStateAction<Topic | null>>
}

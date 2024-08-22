import http from "node:http"
import { Topic } from "./models/Topic"
import { routes } from "./routes"
import { connect } from "./database"

import cors from "cors"
import express from "express"
import mongoose from "mongoose"
import { Server } from "socket.io"

const app = express()
const server = http.createServer(app)
const io = new Server(server, { cors: { origin: "http://localhost:5173" } })

app.use(cors())
app.use(express.json())
app.use(routes)

io.on("connection", (socket) => {
  console.log(`Nova conexão: ${socket.id}`)

  socket.on("join_room", async ({ name, topicId }) => {
    socket.join(topicId)

    const systemMessage = {
      _id: new mongoose.Types.ObjectId(),
      content: `${name} entrou na sala`,
      createdAt: new Date(),
    }

    io.to(topicId).emit("new_message", systemMessage)
  })

  socket.on("send_message", async ({ content, author, topicId }) => {
    const topic = await Topic.findById(topicId)

    const message = {
      _id: new mongoose.Types.ObjectId(),
      content,
      author,
      createdAt: new Date(),
    }
    topic?.messages.push(message)
    await topic?.save()

    io.to(topicId).emit("new_message", message)
  })

  socket.on("leave_room", async ({ name, topicId }) => {
    socket.leave(topicId)

    const systemMessage = {
      _id: new mongoose.Types.ObjectId(),
      content: `${name} saiu da sala`,
      createdAt: new Date(),
    }

    io.to(topicId).emit("new_message", systemMessage)
  })

  socket.on("disconnect", () => {
    console.log(`${socket.id} desconectou-se`)
  })
})

connect()

const port = process.env.PORT || 3000

server.listen(port, () => console.log(`Started on http://localhost:${port}`))

import express from "express"
import cors from "cors"
import { routes } from "./routes"
import { connect } from "./database"

const app = express()

app.use(cors())
app.use(express.json())
app.use(routes)

connect()

const port = process.env.PORT || 3000

app.listen(port, () => console.log(`Started on http://localhost:${port}`))

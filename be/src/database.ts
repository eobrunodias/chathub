import dotenv from "dotenv"

dotenv.config()

import mongoose from "mongoose"

mongoose.set("strictQuery", true)
mongoose.set("strictPopulate", false)

const mongodburl = process.env.MONGODB_URL
console.log(mongodburl)

export async function connect() {
  try {
    const connection = await mongoose.connect(`${process.env.MONGODB_URL}`)
    console.log("Connected to MongoDB")
    return connection
  } catch (err) {
    if (err instanceof Error) console.log(err.message)
  }
}

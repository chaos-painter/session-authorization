import mongoose from 'mongoose'
import dotenv from 'dotenv'

dotenv.config()

const MONGO_URI = process.env.MONGO_URI

const connectMongoDB = async () => {
  try {
    const conn = await mongoose.connect(MONGO_URI, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    })
    console.log(`Connected to MongoDB! ${conn.connection.host}`)
    console.log(`Mongo uri: ${MONGO_URI}`)
  } catch (error) {
    console.log(`Could not connect to the database. Error: ${error.message}`)
  }
  
}

export default connectMongoDB

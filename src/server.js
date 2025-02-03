import express from 'express'
import dotenv from 'dotenv'

const app = express()

dotenv.config()

app.get('/', (req, res) => {
  res.send("Hello")
})

const PORT = process.env.PORT
app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`)
})

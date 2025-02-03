import express from 'express'
import dotenv from 'dotenv'
import connectMongoDB from './mongoConnection.js'
import AuthController from './controllers/AuthController.js'
import { body } from 'express-validator'
import session from "express-session"
import cookieParser from 'cookie-parser'

const app = express()
connectMongoDB()

app.set('view engine', 'ejs')
app.use(express.json())
app.use(express.urlencoded({ extended: true }))

app.use(cookieParser())

app.use(session({
  secret: "secret",
  resave: false,
  saveUninitialized: true,
  cookie: { secure: false }
}))

dotenv.config()

app.get('/', (req, res) => {
  const username = req.session.username
  let title = "Hello"
  if (username) {
    title = `Hello ${username}`
  }
  res.render("index", { title })
})

app.get('/login', (req, res) => {
  res.render("login", {title: "Login" })
})

app.get('/signup', (req, res) => {
  res.render("signup", {title: "Singup" })
})

app.post('/signup', AuthController.signup)
app.post('/login', AuthController.login)
app.post('/logout', AuthController.logout)

const PORT = process.env.PORT
app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`)
})

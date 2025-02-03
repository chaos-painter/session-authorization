import User from "../models/User.js"
import bcrypt from "bcrypt"


class AuthController {
  async signup(req, res) {
    try {
      const { username, email, password } = req.body

      const candidate = await User.findOne({ username })

      if (candidate) {
        return res.send("User already exists.")
      }
      const hashedPassword = bcrypt.hashSync(password, 12)
      const user = new User({username, email, password: hashedPassword})
      await user.save()
      console.log("User added!")
      res.redirect('/login')

    } catch (error) {
      console.log("Failed creating a user:" + error.message)
    }
    
  }


  async login(req, res) {
    try {
      const { email, password } = req.body

      const candidate = await User.findOne({ email: email })

      if (!candidate) {
        return res.send("User does not exist.")
      }
      const passwordMatch = bcrypt.compare(password, candidate.password)
      
      if (passwordMatch) {
        req.session.username = candidate.username
        res.cookie("sessionID", req.sessionID, { httpOnly: true });
        return res.redirect('/')
      } else {
        return res.send("Wrong password.")
      }
      
    } catch (error) {
      console.log("Failed to login." + error.message)
    }
    
  }

  async logout(req, res) {
    req.session.destroy((err) => {
      if (err) return res.status(500).json({ message: "Logout failed" })
      res.clearCookie("sessionID")
      res.json({ message: "Logged out successfully" })
    })
  }

}

export default new AuthController()

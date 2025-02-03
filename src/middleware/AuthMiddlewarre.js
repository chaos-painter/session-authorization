
const AuthMiddleware = (req, res, next) => {
  const username = req.session.username
  if (username) {
    console.log("Successfully authenticated user: " + username )
  } else {
    console.log("Could not autheticate user " + username)
  }

}

export default AuthMiddleware
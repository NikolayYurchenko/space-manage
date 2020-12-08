import authConfig from '../config/auth'
const jwt = require('jsonwebtoken')

const getToken = (req, res) => {
  const authHeader = req.get('Authorization')
  !authHeader && res.status(401).json({ msg : "Required header Authorization is missed" })
  const token = authHeader.replace('Bearer ', '')

  return token
} 

exports.authPrincipal = (req, res, next) =>  {
   const token = getToken(req, res)

    try {
      let decodeToken = jwt.verify(token, authConfig.localAuth.jwtSecret)
      req.userId = decodeToken.id   
    } catch (err)  {
       if (err instanceof jwt.JsonWebTokenError)  {
           res.status(401).json({ msg: "Invalid token"})
       }
    }

    next()
}

exports.destroyToken = (req, res) => {
  const token = getToken(req, res)
  jwt.destroy(token)
}
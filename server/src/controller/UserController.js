// models
import User from '../model/User'
import UserNotFoundException from '../exception/UserNotFoundException'
import UserNotValidException from '../exception/UserNotValidException'
// configs and helers
import { hashPassword } from '../../helpers/HashPassword'
import { logInfo } from '../../helpers/LogInfo'
import { converUserToUserModel, buildGoogleUser, buildLocalUser } from '../../helpers/Convertor'
import authConfig from '../config/auth'
// modules
const axios = require("axios")
const jwt = require('jsonwebtoken')

// => loginType - receive requests to login and define login type 
exports.createOrGetUser = (req,res) => { 
  let loginType = req.query.loginType
  loginType === "googleLogin" ? googleLogin(req,res) : localLogin(req,res)
}

// user <= google login
let googleLogin = (req,res) => {
   // get user info by token
   let path = `https://www.googleapis.com/oauth2/v3/tokeninfo?id_token=${req.query.id}`
   let googleUser 

   axios.get(path).then(response => {
      googleUser = response.data
      googleUser && User.findOne({'google.id': googleUser.sub}).then(user => {
         if (user) {
            logInfo(`Found user by username - [${user.google.name}]`)
            const token = jwt.sign({id:user._id.toString()}, authConfig.localAuth.jwtSecret, {expiresIn:'10h'})
            res.status(200).json(converUserToUserModel(token,user.google.name, user.google.picturePath ))
         } else {
           createNewGoogleUser(googleUser, res)
         }
      }).catch(err => {
         logInfo(`Failed google login - [${err.message}]`)
      })
   }) .catch(err => {
       logInfo(err)
   }) 
}

// user <= login using username && password
let localLogin = (req,res) => {
   let username = req.query.username
   let password = req.query.password

   validateUser(username, password).then(() => {
      User.findOne({'local.username': username}).then(user => {
         if (user) {
           if (user.local.password === hashPassword(password)) { 
              const token = jwt.sign({id:user._id.toString()}, authConfig.localAuth.jwtSecret, {expiresIn: '10h'})
              res.json(converUserToUserModel(token, user.local.username, '')) 
            } else {
              res.status(403).json({msg:'Invalid password'})
              throw new UserNotValidException("Invalid user credentials")
            }
         } else {
           res.status(403).json({msg:'Not found any user'})
           throw new UserNotFoundException (`Not found any user by user name - [${username}]`)
         }
      }).catch(err => {
         logInfo(`Failed local login - [${err.message}]`)
      })
   }).catch(err => {
      res.status(500).json({msg: err})
      throw new UserNotValidException(err)
   })
}

// user <= create new google user if doesnt exist in db
let createNewGoogleUser = (user, res) => {
   let userModel = buildGoogleUser(user);

   let userDomain = new User()
   userDomain.google = userModel
   
   userDomain.save().then(user => {
      logInfo(`Create new google user by id - [${user._id}]`)
      const token = jwt.sign({id:user._id.toString()}, authConfig.localAuth.jwtSecret, {expiresIn: '10h'})
      res.send(converUserToUserModel(token, user.google.name, user.google.picturePath))
   }).catch(err => {
      logInfo(`Failed save google user - ${err}`)
   })
   
}
// user <= create new local user if doesnt exist in db
exports.createlocalUser = (req,res) => {
   validateUser(req.body.username, req.body.password).then(() => {
      User.findOne({'local.username': req.body.username}).then(user => {
         if (!user) {
            let userModel = buildLocalUser(req.body.username, hashPassword(req.body.password))
   
            let user = new User()
            user.local = userModel
   
            user.save().then(user => {
               logInfo(`Create new local user by id - [${user._id}]`)
               const token = jwt.sign({id:user._id.toString()}, authConfig.localAuth.jwtSecret, {expiresIn: '10h'})
               res.status(200).json(converUserToUserModel(token, user.local.username, '')) 
            }) .catch(err => {
               logInfo(`Failed create user, cause - [${err}]`)
            })
         } else {
            res.status(409).json({msg:`user with user name - [${req.body.username}] already exist`})
            throw new UserNotValidException(`user with user name - [${req.body.username}] already exist`)
         }
      })
   }).catch(err => {
      res.status(500).json({msg: err})
      throw new UserNotValidException(err)
   })
}

// validate user | receive => name , password and array of arguments
const validateUser = (name, password, ...args) => {
   return new Promise((resolve, reject) => {
      !name && reject('Expect user name')
      !password &&  reject('Expect user password')
      args.forEach(argument => !argument && reject(`Invalid user credentials - [${argument}]`))
      
      resolve()
   })
}
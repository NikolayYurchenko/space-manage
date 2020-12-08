import express from 'express'
import mongoose from 'mongoose'
import cors from 'cors'
import corsOptions from './static'
import bodyParser from 'body-parser'
import { authPrincipal, destroyToken } from '../middleware/auth' // check token before request handle
import resize from './resize' // resize images before save
import { upload } from '../middleware/uploadImage' // parse form data to save images
//modules
const app = new express()
const path = require('path')
const jwt = require('jsonwebtoken')

// Controllers imports
import todoListController from '../controller/TodoListController'
import spaceController from '../controller/SpaceController'
import userController from '../controller/UserController'

// Connect to database
try {
  mongoose.connect('mongodb://localhost/space-manage',  { useNewUrlParser: true });
} catch(e) {
  console.log(`Failed connect to database, cause - [${e}]`)
}

// register modules
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(express.json());
app.use(cors())
app.use(function(err, req, res, next) { // handle exceptions
    if (err.code === "WRONG_FILE_TYPE") {
        res.status(422).json({msg: "Wrong type of file"})
    }
})
// static folder options
app.use(express.static(path.join(__dirname, '..', '..',  './')))
corsOptions(app)

app.listen(8090, () => {
    console.log("server start on port 8090")
})

/* -----------------------------------
POST requests  */
app.post('/create-user', userController.createlocalUser)
app.post('/create-space', authPrincipal, spaceController.addSpace)
app.post('/create-todoList', authPrincipal, todoListController.addTodoList)
app.post('/upload-image', upload.single('file'), resize.resizeImage)


/* -----------------------------------
PUT requests  */
app.put('/edit-todo/:id', authPrincipal, todoListController.editTodo)
app.put('/edit-space/:id', authPrincipal, spaceController.editSpace)

/* -----------------------------------
GET requests  */

app.get('/login', userController.createOrGetUser)
app.get('/logout', destroyToken, (req, res) => res.status(200).json({}))
app.get('/user-spaces', authPrincipal, spaceController.findSpacesByUserId)
app.get('/user-todoLists', authPrincipal, todoListController.findAllTodoListsBySpaceId)
app.get('/space/:space', authPrincipal, (req,res) => {res.json("Some message")})

/* -----------------------------------
DELETE requests  */

app.delete('/delete-space/:id', authPrincipal, spaceController.deleteSpace)
app.delete('/delete-todoList/:id', todoListController.deleteTodoList)





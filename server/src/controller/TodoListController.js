// models
import todoList from '../model/TodoList'
import NotValidTodoListException from '../exception/NotValidTodoListException'
// helpers functions
import { buildTodoList } from '../../helpers/Convertor'
import { logInfo } from '../../helpers/LogInfo'


// return <= todo list || create todo list || receive => todo list model
exports.addTodoList = (req, res) => {
    const userId = req.userId ? req.userId : ''

    let domain = new todoList(buildTodoList(req.body, userId))
    validateTodoList(userId, req.body.spaceId, req.body.name, req.body.content).then(() => {
        domain.save().then((todoList) => {
            logInfo(`create new todo list for space by id - [${todoList.spaceId}], todo list id - [${todoList.id}]`)
            res.send(todoList)
        }).catch(err => {
            logInfo(`Failed save todo list cause ${err}`)
            res.status(500).json({msg:err})
        })
    }).catch(err => {
        res.status(500).json({msg: err})
        throw new NotValidTodoListException(err)
    })
}

// return <= edited todo list || edit todo list || receive => todo list model
exports.editTodo = (req, res) => {
    const id = req.params.id
    const userId = req.userId
    const model = req.body

    logInfo(`Try search todo list by id - [${id}], user id - [${userId}]`)
    
    validateTodoList(model.name).then(() => { 
        todoList.findByIdAndUpdate({'_id':id, 'userId': userId}, {'$set': {'name': model.name, 'content' : model.content}}, {new: true})
        .then(todo => {
            if (userId !== todo.userId) {
                res.json(403).json({msg: "You cant edit this todo"})
                throw new NotValidTodoListException(`User - [${userId}] cannot edit todo by id - [${id}]`)
            }
            logInfo(`Success update todo list by id - [${id}], user id - [${userId}]`)
            res.json(todo)
        }).catch(err => {
            logInfo(`Failed edit todo list by id - [${id}], user id - [${userId}] cause ${err}`)
            res.status(500).json({msg:err})
        })
    }).catch(err => {
        res.status(500).json({msg: err})
        throw new NotValidTodoListException(err)
    })
}
// => receive todo list id
exports.deleteTodoList = (req, res) => {
    const userId = req.userId;
    const todoListId = req.params.id

    logInfo(`Try delete todo by  id - [${todoListId}]`)

    todoList.deleteOne({'_id': todoListId, 'userId': userId}).then(() => {
        res.status(200).json({msg: "ok"})
    }).catch(err => {
        logInfo(`Failed to delete todoList by id - [${todoListId}], cause - [${err}]`)
        res.status(500).json({msg: err})
    })
}

exports.findAllTodoListsBySpaceId = (req, res) => {
    const spaceId = req.query.spaceId
    const userId = req.userId? req.userId : ''

    logInfo(`Try search all todo lists by space id - [${spaceId}]`)
    todoList.find({'spaceId': spaceId, 'userId': userId}).then(spaces => {
        res.send(spaces ? spaces : [])
    }).catch(err => {
        res.status(500).json({msg: err})
        logInfo(`Failed to find all todo lists by space id - [${spaceId}], cause - [${err}]`)
    })
}

// validate todo list model |  receive => name, description, cover path
const validateTodoList = (...args) => {
    return new Promise((resolve, reject) => {
        args.forEach(argument => !argument && reject(`Expected - ${argument}`))
        resolve()
    })
}
// models
import Space from '../model/Space'
import SpaceNotValidException from '../exception/NotVaildSpaceException'
// config and helpers
import { logInfo } from '../../helpers/LogInfo'
import { convertListSpaceToListSpaceModel, convertSpaceToSpaceModel, buildSpaceModel } from '../../helpers/Convertor'
import { modelNames } from 'mongoose'

// space <= create space 
exports.addSpace = (req, res) => {
    let spaceModel = req.body
    let userId = req.userId

    logInfo(`Receive space by name - [${spaceModel.name}], try save`)

    let model = new Space(buildSpaceModel(spaceModel))
    model.userId = userId
    
    validateSpace(spaceModel.name, spaceModel.description, spaceModel.coverPath).then(() => {
       model.save().then((space) => {
           logInfo(`Successfullys create space by name - [${spaceModel.name}]`)
           res.json(convertSpaceToSpaceModel(space))
       }).catch(err => {
           logInfo(`something went wrong when save space - cause ${err.message}`)
       })
    }).catch(err => {
        res.status(500).json({msg:err})
        throw new SpaceNotValidException(err)
    })
}

// array of space <= find all spaces by user id
exports.findSpacesByUserId = (req, res) => {
    let userId = req.userId
    logInfo(`Try search all spaces for user by id - [${userId}]`)

    Space.find({'userId':userId}).then((spaces) => {
        if (spaces) { 
            logInfo(`Found all spaces for user by id - [${userId}]`)
            res.json(convertListSpaceToListSpaceModel(spaces)) 
        }
    }) .catch((err) => {
        logInfo(err)
    }) 
}

// updated space <= | receive => space data to update
exports.editSpace = (req,res) => {
    const userId = req.userId
    const spaceId = req.params.id
    const model = req.body

    logInfo(`Try search space by id - [${spaceId}] for update`)

    validateSpace(model.name, model.description, model.coverPath).then(() => {
       Space.findByIdAndUpdate({'_id':spaceId, 'userId': userId}, {'$set': {'name': model.name, 'description' : model.description, 'coverPath': model.coverPath}}, {new: true})
         .then(space => {
             logInfo(`Success updated space by id - [${spaceId}], userId - [${userId}]`)
             res.send(convertSpaceToSpaceModel(space))
         }).catch(err => {
            logInfo(`Failed edit space by id - [${spaceId}], user id - [${userId}] cause ${err}`)
            res.status(500).json({msg:err})
         })
    }).catch(err => {
        res.status(500).json({msg: err})
        throw new SpaceNotValidException(err)
    })
} 

// => receive space id && userId
exports.deleteSpace = (req, res) => {
    const userId = req.userId;
    const spaceId = req.params.id

    logInfo(`Try delete space by id - [${spaceId}]`)

    Space.deleteOne({'_id': spaceId, "userId": userId}).then(() => {
        res.status(200).json({msg: "ok"})
    }).catch(err => {
        logInfo(`Failed delete space by id - [${spaceId}], cause - [${err}]`)
        res.status(500).json({msg: err})
    })
}

// validate space model |  receive => name, description, cover path
const validateSpace = (name, description, coverPath) => {
    return new Promise((resolve, reject) => {
        !name && reject("Expected space name")
        !description && reject("Expected space description")
        !coverPath && reject("Expected space image")

        resolve()
    })
}
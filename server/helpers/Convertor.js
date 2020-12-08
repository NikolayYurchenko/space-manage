// return - <= converted object user | receive => token , username , picturePath
exports.converUserToUserModel = (token, username, picturePath) => {
    return {
            username:username,
            token:token,
            path: picturePath,
    }
}
// return - <= array of converted space objects | receive => list of spaces, userId
exports.convertListSpaceToListSpaceModel = (spaces) => {
    return spaces.map(space => {
     return {
            id: space.id,
            name: space.name,
            coverPath: space.coverPath,
            description: space.description,
            createDate: space.createdAt
        }
    })
}

// build models for save in db

// return - <= space model for db | receive => space
exports.buildSpaceModel = (spaceData) => {
    return {
        name: spaceData.name,
        description: spaceData.description,
        coverPath: spaceData.coverPath
    }
}

//return - <= space model for ui | receive => space domain
exports.convertSpaceToSpaceModel = (space) => {
    return {
        id: space._id,
        name: space.name,
        description: space.description,
        coverPath: space.coverPath
    }
}
// return - <= object google user for db | receive => user
exports.buildGoogleUser = (user) => {
    return  {
            id: user.sub,
            name: user.given_name,
            email: user.email,
            picturePath: user.picture,
        }
}
// return - <= object local user for db | receive => username, password
exports.buildLocalUser = (username, password) => {
    return {
        username: username,
        password: password
    }
}


// return - <= todo list domain | receive - => todo list model 
exports.buildTodoList = (model, userId) => {
    return {
        userId: userId,
        spaceId:model.spaceId,
        name: model.name,
        content:model.content
    }
}
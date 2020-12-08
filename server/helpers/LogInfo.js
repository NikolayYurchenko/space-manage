// return - <= nothing | receive => message
exports.logInfo = (message) => {
    console.log(`${new Date()} --- ${message} `)
}
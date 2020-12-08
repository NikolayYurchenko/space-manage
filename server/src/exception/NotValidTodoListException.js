import { logInfo } from '../../helpers/LogInfo'

class NotValidTodoListException extends Error {
    constructor(message) {
        logInfo(message)
        super(message)
    }
}

module.exports = NotValidTodoListException
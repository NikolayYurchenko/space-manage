import { logInfo } from '../../helpers/LogInfo'

class UserNotValidException extends Error {
    constructor(message) {
        logInfo(message)
        super(message)
    }
}

module.exports = UserNotValidException
import { logInfo } from '../../helpers/LogInfo'

class UserNotFoundException extends Error {
    constructor(message) {
        logInfo(message)
        super(message)
    }
}

module.exports = UserNotFoundException
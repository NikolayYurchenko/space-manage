import { logInfo } from '../../helpers/LogInfo'

class NotValidSpaceException extends Error {
    constructor(message) {
        logInfo(message)
        super(message)
    }
}

module.exports = NotValidSpaceException
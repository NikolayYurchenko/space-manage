// return - <= hash password | receive => password
const crypto = require('crypto')
exports.hashPassword = (password) => {
    return crypto.createHmac('sha256', password)
           .digest('hex');
}
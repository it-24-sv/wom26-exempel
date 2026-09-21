
const jwt = require('jsonwebtoken')

module.exports = (req, res, next) => {

    const authHeader = req.headers['authorization']

    console.log(`Authorize JWT: ${authHeader}`)
    next()
}
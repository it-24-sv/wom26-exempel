module.exports = (req, res, next) => {
    console.log(`Remote IP: ${req.ip}, method: ${req.method}`)
    next()
}